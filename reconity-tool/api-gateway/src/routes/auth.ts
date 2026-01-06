import { Router } from 'express';
import { login, register, setupMfa, verifyMfa, forgotPassword, resetPassword } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation Schemas
const AuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

// Middleware for validation
const validateAuth = (req: any, res: any, next: any) => {
    try {
        AuthSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error });
    }
};

router.post('/register', validateAuth, register);
router.post('/login', login); // Removed validateAuth as password length might vary during login for MFA checks or just simplify

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/mfa/setup', authenticateToken, setupMfa);
router.post('/mfa/verify', authenticateToken, verifyMfa);

export default router;
