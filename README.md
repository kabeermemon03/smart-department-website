# Smart Department Website

Department Information Website is a web-based platform designed to provide centralized academic information for a university department. It allows users to access faculty details, academic resources, notices, and result documents, with optional admin features for controlled content management.

## Vercel Deployment Instructions

### Initial Setup
1. Connect your GitHub repository to Vercel
2. Set the **Root Directory** to `frontend`
3. Set the **Framework Preset** to `Angular`
4. Deploy from the `changed-design` branch

### Vercel Configuration Settings
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist/frontend/browser` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Redeployment
1. Push changes to the `changed-design` branch
2. Vercel will automatically redeploy
3. Or manually redeploy from Vercel dashboard

### Firebase Configuration
**Important**: Add your Vercel preview URL to Firebase authorized domains:
1. Go to Firebase Console → Authentication → Settings → Authorized domains
2. Add your Vercel URL (e.g., `your-app-name.vercel.app`)
3. This enables Firebase Auth to work on the deployed site

### Troubleshooting
- If routes return 404 on refresh, check that `vercel.json` is in the `frontend` folder
- Ensure the root directory is set to `frontend` in Vercel settings
- Verify Firebase authorized domains include your Vercel URL