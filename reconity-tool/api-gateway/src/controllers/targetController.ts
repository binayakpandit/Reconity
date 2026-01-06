import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { fetchSubdomains } from '../services/crtshService';

const prisma = new PrismaClient();

// Validation Scheme
const AddTargetSchema = z.object({
    domain: z.string().min(3).regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid domain format")
});

export const getTargets = async (req: any, res: Response) => {
    try {
        const userId = req.user.userId;
        const targets = await prisma.target.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(targets);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const addTarget = async (req: any, res: Response) => {
    try {
        const userId = req.user.userId;
        const { domain } = AddTargetSchema.parse(req.body);

        const existingTarget = await prisma.target.findUnique({
            where: { domain }
        });

        if (existingTarget) {
            // In MVP, if it exists, simply return error or check ownership
            if (existingTarget.userId !== userId) {
                return res.status(400).json({ message: 'Target claimed by another user' });
            }
            return res.status(400).json({ message: 'Target already exists' });
        }

        const target = await prisma.target.create({
            data: {
                domain,
                userId,
                status: 'PENDING'
            }
        });

        res.status(201).json(target);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: (error as any).errors[0].message });
        }
        res.status(500).json({ message: 'Server error', error });
    }
};

export const quickScan = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const target = await prisma.target.findFirst({
            where: { id, userId }
        });

        if (!target) {
            return res.status(404).json({ message: 'Target not found' });
        }

        // Perform Quick Scan (crt.sh)
        const subdomains = await fetchSubdomains(target.domain);

        // Update status
        await prisma.target.update({
            where: { id },
            data: { status: 'SCANNED (Quick)' }
        });

        res.json({ message: 'Scan complete', count: subdomains.length, subdomains });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Scan failed' });
    }
};

import { addScanJob } from '../services/queueService';

export const fullScan = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const target = await prisma.target.findFirst({
            where: { id, userId }
        });

        if (!target) {
            return res.status(404).json({ message: 'Target not found' });
        }

        // Add to Queue
        await addScanJob(target.id, target.domain);

        // Update status
        await prisma.target.update({
            where: { id },
            data: { status: 'QUEUED' }
        });

        res.json({ message: 'Full scan queued' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to queue scan' });
    }
};
