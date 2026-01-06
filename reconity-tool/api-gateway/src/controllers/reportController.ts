import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all reports for a specific target
export const getReports = async (req: any, res: Response) => {
    try {
        const { targetId } = req.params;
        const userId = req.user.userId;

        // Verify target belongs to user
        const target = await prisma.target.findFirst({
            where: { id: targetId, userId }
        });

        if (!target) {
            return res.status(404).json({ message: 'Target not found' });
        }

        const reports = await prisma.scanResult.findMany({
            where: { targetId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                scanType: true,
                summary: true,
                vulnScore: true,
                createdAt: true
            }
        });

        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get Single Report Details
export const getReportDetails = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Fetch result with target to verify ownership
        const result = await prisma.scanResult.findUnique({
            where: { id },
            include: { target: true }
        });

        if (!result || result.target.userId !== userId) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
