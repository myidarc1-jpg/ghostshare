# GhostShare - Vercel Deployment Guide

## Overview
GhostShare is a Next.js application that provides link shortening with Dark Social tracking capabilities. This guide will help you deploy your GhostShare application to Vercel.

## Prerequisites
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository with your GhostShare code
- Node.js installed locally (for testing)

## Deployment Steps

### 1. Prepare Your Application

#### Environment Variables
Create a `.env.local` file in your project root with the following variables:

```env
# Base URL for your deployed application
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app

# Optional: Add any other environment variables you might need
# For example, if you want to use Supabase instead of local JSON:
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Update Database Path (Optional)
For production deployment, you might want to update the database path in `src/lib/database.ts`:

```typescript
// Change from local file to a more production-ready solution
const DB_PATH = process.env.NODE_ENV === 'production' 
  ? '/tmp/db.json'  // Use /tmp for Vercel serverless functions
  : 'db.json';
```

### 2. Push to Git Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial GhostShare deployment"

# Add your remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/ghostshare.git

# Push to main branch
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Connect GitHub Repository (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project settings:
   - Framework Preset: `Next.js` (should be auto-detected)
   - Root Directory: `/` (default)
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install`
5. Click "Deploy"

#### Option B: Deploy from CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project

### 4. Configure Environment Variables in Vercel

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `NEXT_PUBLIC_BASE_URL`: Your deployed URL (e.g., `https://ghostshare.vercel.app`)

### 5. Production Considerations

#### Database Persistence
⚠️ **Important**: The current implementation uses a local JSON file for storage, which has limitations in a serverless environment:

- **Vercel Limitations**: Serverless functions have ephemeral storage. The `/tmp` directory is the only writable location, but data doesn't persist between deployments.
- **Recommendation**: For production, consider migrating to a proper database like:
  - Supabase (PostgreSQL)
  - PlanetScale (MySQL)
  - MongoDB Atlas
  - Firebase

#### Performance Optimization
1. **Enable Image Optimization**: Vercel automatically optimizes images
2. **Use Edge Runtime**: Consider using Next.js Edge Runtime for faster responses
3. **Caching**: Implement proper caching strategies for better performance

### 6. Custom Domain (Optional)

1. In your Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., `links.yourdomain.com`)
3. Configure DNS settings as instructed by Vercel
4. Wait for DNS propagation (usually a few minutes to a few hours)

### 7. SSL and Security

- Vercel automatically provides SSL certificates
- Ensure your application uses HTTPS URLs
- Consider adding security headers in `next.config.js`:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};
```

## Testing Your Deployment

1. Visit your deployed URL
2. Test link creation functionality
3. Verify the redirect works correctly
4. Check the analytics dashboard
5. Test with different User-Agents (use browser developer tools to simulate)

## Monitoring and Analytics

- Use Vercel Analytics to monitor performance
- Set up error tracking with services like Sentry
- Monitor database usage and consider scaling options

## Troubleshooting

### Common Issues

1. **Database Not Persisting**: This is expected with the current JSON file approach. Consider migrating to a proper database.
2. **Environment Variables Not Loading**: Ensure they're set in Vercel dashboard, not just locally.
3. **Build Failures**: Check Vercel logs for specific error messages.
4. **Redirect Issues**: Verify `NEXT_PUBLIC_BASE_URL` is correctly set.

### Getting Help

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- GhostShare Issues: Check GitHub repository for known issues

## Next Steps

1. **Database Migration**: Implement a proper database solution for production
2. **Authentication**: Add user authentication for link management
3. **API Endpoints**: Create API endpoints for programmatic access
4. **Advanced Analytics**: Add more detailed analytics and reporting
5. **Custom Branding**: Customize the UI with your brand colors and logo

## Support

For issues specific to this GhostShare implementation, please check the project repository or create an issue.

For Vercel-related issues, visit [vercel.com/support](https://vercel.com/support).