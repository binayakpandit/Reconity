import { Queue } from 'bullmq';

const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379')
};

export const scanQueue = new Queue('scan-queue', { connection });

export const addScanJob = async (targetId: string, domain: string) => {
    await scanQueue.add('recon-scan', { targetId, domain });
};
