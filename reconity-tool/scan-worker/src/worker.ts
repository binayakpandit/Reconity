import { Worker, Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import util from 'util';
import path from 'path';

const execPromise = util.promisify(exec);
const prisma = new PrismaClient();

const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379')
};

const worker = new Worker('scan-queue', async (job: Job) => {
    const { targetId, domain } = job.data;
    console.log(`Processing scan for ${domain}...`);

    try {
        // Update status to SCANNING
        await prisma.target.update({
            where: { id: targetId },
            data: { status: 'SCANNING' }
        });

        // Run Subfinder
        // Using local binary in bin directory
        const subfinderPath = path.resolve(__dirname, '../../scan-worker/bin/subfinder');
        const { stdout, stderr } = await execPromise(`${subfinderPath} -d ${domain} -silent`);

        if (stderr) {
            console.warn('Subfinder stderr:', stderr);
        }

        const subdomains = stdout.split('\n').filter(Boolean);
        console.log(`Found ${subdomains.length} subdomains for ${domain}`);

        // Calculate Mock Risk Score (just based on count for MVP)
        const vulnScore = Math.min(subdomains.length * 2, 100);

        // Save Result to DB
        await prisma.scanResult.create({
            data: {
                targetId,
                scanType: 'FULL',
                summary: JSON.stringify({ count: subdomains.length, domain }),
                details: JSON.stringify({ subdomains }),
                vulnScore
            }
        });

        // Update status to COMPLETED
        await prisma.target.update({
            where: { id: targetId },
            data: { status: 'COMPLETED' }
        });

        return { subdomains };

    } catch (error) {
        console.error(`Scan failed for ${domain}:`, error);
        await prisma.target.update({
            where: { id: targetId },
            data: { status: 'FAILED' }
        });
        throw error;
    }
}, { connection });

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    if (job) {
        console.log(`${job.id} has failed with ${err.message}`);
    } else {
        console.log(`Job failed with ${err.message}`);
    }
});

console.log('Scan Worker started...');
