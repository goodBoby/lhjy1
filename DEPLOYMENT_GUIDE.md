# ChinaMediGuide - Setup and Deployment Guide

## Step 1: Authenticate with GitHub

Run this command and follow the prompts:

```bash
gh auth login
```

Select:
- GitHub.com → Continue
- HTTPS → Login with web browser
- Copy the one-time code
- Authorize on browser

## Step 2: Push to GitHub

```bash
cd D:\D-J-MyProject\opencode_pj1
git push -u origin main
```

## Step 3: Deploy to Vercel

```bash
vercel login
# Use your email to login

vercel --prod
# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your username
# - Link to existing project? No
# - Project name: lhjy1
# - Directory? ./
# - Want to modify settings? No

```

## Alternative: One-command push

```bash
cd D:\D-J-MyProject\opencode_pj1
.\push-to-github.bat
```

---

**After deployment, Vercel will give you a URL like:**
`https://lhjy1.vercel.app`
