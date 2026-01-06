#!/bin/bash
rsync -av --exclude 'node_modules' --exclude '.git' --exclude 'dist' /home/binayak/.gemini/antigravity/scratch/reconity-tool/ /tmp/reconity-sync/
