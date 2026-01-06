import { Router } from 'express';
import { addTarget, getTargets, quickScan, fullScan } from '../controllers/targetController';
import jwt from 'jsonwebtoken';

const router = Router();

// Auth Middleware (Should be extracted to separate file in real app)
const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

router.use(authenticate);

router.get('/', getTargets);
router.post('/', addTarget);
router.post('/:id/quick-scan', quickScan);
router.post('/:id/full-scan', fullScan);

export default router;
