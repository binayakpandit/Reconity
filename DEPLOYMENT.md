# Reconity Deployment Guide 🚀

Reconity is a full-stack platform consisting of two front-ends and a Node.js backend cluster. Here is how to host it.

---

## 1. Cloud Deployment (The "Pro" Way)

### 🛸 Front-Ends (Netlify / Vercel)
Both `reconity-web` and `web-client` are static React apps. You can connect your GitHub repo and deploy them easily.
- **Base Directory**: Set this to the specific folder (e.g., `reconity-web`).
- **Build Command**: `npm run build`.
- **Publish Directory**: `dist`.

### 🗄️ Backend (Railway / Heroku / VPS)
The `api-gateway` and `scan-worker` require a Node.js environment.
- **Environment Variables**: You MUST set `DATABASE_URL`, `JWT_SECRET`, and `REDIS_URL`.
- **Database**: Use a managed PostgreSQL or MySQL for production.

---

## 2. Immediate Sharing (Local Tunnel)

If you just want to show the website to someone right now without deploying to the cloud, you can "tunnel" your localhost to a public URL.

1. **Run your local server** (already running in your terminal).
2. **Open a new terminal** and run:
   ```bash
   npx localtunnel --port 5175
   ```
3. This will give you a URL like `https://funny-monkeys-run.loca.lt` that anyone can visit.

---

## 3. Deployment Configuration (`netlify.toml`)

I have added a `netlify.toml` file to your marketing site to automate the deployment settings.

### Required Environment Variables for Platform (`web-client`)
- `VITE_API_URL`: The public URL of your deployed `api-gateway`.
