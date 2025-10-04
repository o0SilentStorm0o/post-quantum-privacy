#!/bin/bash
# Deploy script for PQ-PRIV website
# This script pulls the latest build from the 'deploy' branch and syncs it to the web directory
# Run this via cron or webhook

set -e

REPO_URL="https://github.com/o0SilentStorm0o/post-quantum-privacy.git"
WORKDIR="/home/deploy/site-deploy"
WEB_DIR="/var/www/davidstrnadel.lol"
DEPLOY_BRANCH="deploy"

echo "[$(date)] Starting deployment..."

# Clone or update the deploy branch
if [ ! -d "$WORKDIR/.git" ]; then
    echo "Cloning repository for the first time..."
    git clone --depth=1 --branch "$DEPLOY_BRANCH" "$REPO_URL" "$WORKDIR"
else
    echo "Updating existing repository..."
    cd "$WORKDIR"
    git fetch origin "$DEPLOY_BRANCH" --depth=1
    git reset --hard "origin/$DEPLOY_BRANCH"
fi

# Sync to web directory
echo "Syncing files to $WEB_DIR..."
rsync -a --delete --exclude='.git' "$WORKDIR/" "$WEB_DIR/"

echo "[$(date)] Deployment completed successfully!"
