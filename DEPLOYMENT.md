# GhostShare - Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- Vercel account (free tier is sufficient)
- GitHub account

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: GhostShare MVP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ghostshare.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and log in
   - Click "Add New Project"
   - Import your `ghostshare` repository
   - Click "Deploy"

3. **That's it!**
   - Vercel will automatically:
     - Install dependencies
     - Build the Next.js app
     - Deploy to a global CDN
   - You'll get a live URL like `https://ghostshare.vercel.app`

### Environment Variables (Optional for Phase 1)
For Phase 1 with the mock database, no environment variables are needed.

### Custom Domain (Optional)
1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

---

## Manual Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Using Docker (Optional)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t ghostshare .
docker run -p 3000:3000 ghostshare
```

---

## Production Considerations

### Phase 2+: Database Migration
When ready to migrate from mock database to Supabase:

1. Create a Supabase project
2. Set up these tables:
   - `ghost_links` (id, code, original_url, created_at)
   - `link_stats` (code, human_clicks, private_shares, tracking_data, last_tracked_at)

3. Update environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Update `src/lib/database.ts` to use `SupabaseDatabaseAdapter`

### Monitoring
- Enable Vercel Analytics
- Set up error tracking (Sentry)
- Monitor uptime (UptimeRobot or similar)

---

## Scaling Notes

### Current Architecture (Phase 1)
- Serverless functions (Vercel)
- File-based JSON database
- Ideal for: < 1,000 links/day

### Recommended for High Traffic
- Switch to Supabase or PostgreSQL
- Add Redis for caching
- Implement rate limiting
- Add CDN caching headers

---

## Troubleshooting

### Build Errors
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

### Database Issues
- Ensure `src/data/database.json` is writable
- Check file permissions
- Consider adding database backup cron job

### Crawler Detection Issues
- Test with user-agent strings from actual crawlers
- Update `DARK_SOCIAL_BOTS` list in `src/lib/dark-social.ts`

---

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/YOUR_USERNAME/ghostshare/issues)
- Review the code documentation in `src/lib/`
