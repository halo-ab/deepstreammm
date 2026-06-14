# DeepStream

Mobile-friendly Fancode live streaming player with HLS proxy.

## Project structure

```
deepstream/
├── api/
│   ├── hls.js          # Edge HLS proxy (streams video through Vercel)
│   └── playlist.js     # Edge playlist fetcher (auto-updates from GitHub)
├── index.html          # Main page
├── app.js              # Player + channel UI
├── styles.css          # Mobile-first styles
├── fancode.m3u         # Offline fallback playlist
├── vercel.json         # Vercel config
└── package.json
```

## Deploy to GitHub + Vercel

### 1. Push to GitHub

```bash
cd "project s"
git init
git add .
git commit -m "Initial DeepStream release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/deepstream.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Import your `deepstream` repository
4. Leave settings as default (Framework: Other, no build command)
5. Click **Deploy**

Your site will be live at `https://your-project.vercel.app`

The `/api/hls` serverless function handles Fancode stream proxying automatically on Vercel.

### 3. Use on phone

Open your Vercel URL on your phone. Tap **Channels** to pick a stream.

## Auto-updating matches

On every visit, DeepStream fetches the latest playlist via `/api/playlist` (server-side from GitHub). It also refreshes every **5 minutes** while the page is open.

**Important:** Push this update to GitHub and redeploy on Vercel for auto-update to work. After deploying, hard-refresh your phone browser (or clear cache).

If GitHub is unreachable, it falls back to the bundled `fancode.m3u`.

## Manual fallback (optional)

Only edit `fancode.m3u` if you want a custom offline fallback list. Normal use does not require this.

## Notes

- Streams may be geo-blocked or expire when events end
- Vercel free tier has a 60s function timeout (enough for HLS segments)
