# Server Deployment Setup

This document describes how to set up automatic deployment on your DigitalOcean droplet with WireGuard-only SSH access.

## Architecture

- **GitHub Actions**: Builds the site and pushes to `deploy` branch
- **Server**: Pulls from `deploy` branch via HTTPS (outbound only, no incoming SSH needed)
- **Security**: No ports opened, SSH remains WireGuard-only

## Setup Instructions

### 1. Create deploy user on server

```bash
# Connect via WireGuard VPN first
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG www-data deploy
```

### 2. Set up web directory permissions

```bash
sudo mkdir -p /var/www/davidstrnadel.lol
sudo chown -R deploy:www-data /var/www/davidstrnadel.lol
sudo chmod -R 755 /var/www/davidstrnadel.lol
```

### 3. Copy deploy script to server

```bash
# From your local machine (connected via WireGuard):
scp server/deploy.sh deploy@10.8.0.1:/home/deploy/
ssh deploy@10.8.0.1 "chmod +x /home/deploy/deploy.sh"
```

### 4. Test the deploy script

```bash
ssh deploy@10.8.0.1
./deploy.sh
```

### 5. Set up automatic deployment (choose one)

#### Option A: Cron (Simple, runs every 2 minutes)

```bash
sudo -u deploy crontab -e
```

Add this line:
```
*/2 * * * * /home/deploy/deploy.sh >> /home/deploy/deploy.log 2>&1
```

#### Option B: Webhook (Advanced, instant deployment)

Create webhook receiver:

```bash
sudo apt install webhook
```

Create `/home/deploy/hooks.json`:
```json
[
  {
    "id": "deploy-pq-priv",
    "execute-command": "/home/deploy/deploy.sh",
    "command-working-directory": "/home/deploy",
    "response-message": "Deploying...",
    "trigger-rule": {
      "match": {
        "type": "payload-hmac-sha256",
        "secret": "YOUR_WEBHOOK_SECRET_HERE",
        "parameter": {
          "source": "header",
          "name": "X-Hub-Signature-256"
        }
      }
    }
  }
]
```

Start webhook service:
```bash
webhook -hooks /home/deploy/hooks.json -port 9000
```

Configure Nginx to proxy webhook:
```nginx
location /webhook/deploy {
    proxy_pass http://localhost:9000/hooks/deploy-pq-priv;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Add webhook in GitHub:
- URL: `https://davidstrnadel.lol/webhook/deploy`
- Content type: `application/json`
- Secret: (same as in hooks.json)
- Events: Just the push event

## How it works

1. You push to `main` branch
2. GitHub Actions builds the site
3. Built files are pushed to `deploy` branch
4. Server pulls from `deploy` branch (via cron or webhook)
5. Files are synced to `/var/www/davidstrnadel.lol/`
6. Site is updated! 🎉

## Security Benefits

- ✅ No SSH port exposed to internet
- ✅ No incoming connections needed
- ✅ Server only makes outbound HTTPS calls
- ✅ WireGuard VPN remains your only access point
- ✅ Deploy user has minimal privileges

## Troubleshooting

Check deploy logs:
```bash
tail -f /home/deploy/deploy.log
```

Manual deployment:
```bash
sudo -u deploy /home/deploy/deploy.sh
```

Check permissions:
```bash
ls -la /var/www/davidstrnadel.lol/
ls -la /home/deploy/site-deploy/
```
