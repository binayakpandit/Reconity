import { Router } from 'express';
import { getReports, getReportDetails } from '../controllers/reportController';
import jwt from 'jsonwebtoken';

const router = Router();

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

router.get('/target/:targetId', getReports);
router.get('/:id', getReportDetails);

export default router;
