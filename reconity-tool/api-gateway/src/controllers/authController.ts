import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
// If the above still fails in your environment, use:
// const { authenticator } = require('otplib');

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long and include: 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
            });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'ANALYST',
                mfaSecret: authenticator.generateSecret()
            }
        });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, mfaCode } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check account lockout
        if (user.lockUntil && user.lockUntil > new Date()) {
            return res.status(403).json({ message: 'Account locked. Try again later.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const attempts = user.loginAttempts + 1;
            const updateData: any = { loginAttempts: attempts };

            if (attempts >= 3) {
                updateData.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lock
                updateData.loginAttempts = 0;
            }

            await prisma.user.update({
                where: { id: user.id },
                data: updateData
            });

            return res.status(400).json({
                message: `Invalid credentials. ${attempts >= 3 ? 'Account locked for 15 mins.' : `Attempt ${attempts}/3`}`
            });
        }

        // MFA Check
        if (user.mfaEnabled) {
            if (!mfaCode) {
                return res.status(200).json({ mfaRequired: true, userId: user.id });
            }

            const isValidMfa = authenticator.check(mfaCode, user.mfaSecret!);
            if (!isValidMfa) {
                return res.status(400).json({ message: 'Invalid MFA code' });
            }
        }

        // Reset attempts on success
        await prisma.user.update({
            where: { id: user.id },
            data: { loginAttempts: 0, lockUntil: null }
        });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, email: user.email, role: user.role, mfaEnabled: user.mfaEnabled } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const setupMfa = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const otpauth = authenticator.keyuri(user.email, 'Reconity', user.mfaSecret!);
        const qrCodeUrl = await qrcode.toDataURL(otpauth);

        res.json({ qrCodeUrl, secret: user.mfaSecret });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const verifyMfa = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        const userId = (req as any).user.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValid = authenticator.check(code, user.mfaSecret!);
        if (!isValid) return res.status(400).json({ message: 'Invalid code' });

        await prisma.user.update({
            where: { id: userId },
            data: { mfaEnabled: true }
        });

        res.json({ message: 'MFA enabled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        await prisma.user.update({
            where: { id: user.id },
            data: { resetToken, resetTokenExpiry }
        });

        // In a real app, send email here. For now, return token for testing/demo.
        res.json({ message: 'Reset token generated', resetToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                message: 'Password must include: 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
            });
        }

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() }
            }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
                loginAttempts: 0,
                lockUntil: null
            }
        });

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
