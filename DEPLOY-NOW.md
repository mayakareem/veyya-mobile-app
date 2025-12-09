# 🚀 Deploy Veyya Mobile App - Step by Step

## Quick Deploy to Vercel (5 minutes)

### **Method 1: Deploy via Vercel Website (RECOMMENDED - Easiest)**

1. **Open your browser** and go to: https://vercel.com/new

2. **Login/Sign up** with your GitHub account

3. **Import Project**:
   - Click "Add New..." → "Project"
   - If you have the code on GitHub: Select the repository
   - If NOT on GitHub: Click "Import Third-Party Git Repository" or upload folder

4. **Configure**:
   - **Project Name**: Type `veyya` (this gives you veyya.vercel.app)
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `pnpm build` (should auto-detect)
   - **Install Command**: `pnpm install` (should auto-detect)
   - **Output Directory**: `.next` (auto-detected)

5. **Click "Deploy"** button

6. **Wait 2-3 minutes** for deployment to complete

7. **Done!** You'll get a URL like: `https://veyya.vercel.app`

---

### **Method 2: Push to GitHub First, Then Deploy**

If you want to use GitHub (recommended for continuous deployment):

#### Step A: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `veyya-mobile-app`
3. Keep it **Private** or **Public** (your choice)
4. **Do NOT** initialize with README
5. Click "Create repository"

#### Step B: Push Your Code

Open terminal and run:

```bash
cd /Users/sindhusreenath/Projects/veyya/app-mobile

# Add GitHub as remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/veyya-mobile-app.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

#### Step C: Deploy from GitHub to Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `veyya-mobile-app` repository
4. Configure:
   - Project Name: `veyya`
   - Framework: Next.js (auto-detected)
5. Click "Deploy"

---

### **Method 3: Use Vercel CLI (Manual Login Required)**

```bash
cd /Users/sindhusreenath/Projects/veyya/app-mobile

# Login (opens browser for auth)
vercel login

# Deploy
vercel --prod

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (Choose your account)
# - Link to existing project? N
# - Project name? veyya
# - Directory? ./
# - Override settings? N
```

---

## ✅ What You'll Get

After deployment, you'll have:
- **Production URL**: https://veyya.vercel.app (or similar)
- **Auto-deploy**: Every git push triggers new deployment (if using GitHub)
- **Preview URLs**: For testing before production
- **Analytics**: Built-in performance monitoring
- **SSL**: Automatic HTTPS certificate

---

## 📱 Features Deployed

Your app includes:
- ✅ 8 service categories (Beauty, Nails, Hair, Makeup, Pet Care, etc.)
- ✅ 100+ services with detailed information
- ✅ Healthcare services (23 services) with full details
- ✅ Pet Care services (16 services) with dog/cat filtering
- ✅ Dynamic pricing for pet grooming (size/hair type)
- ✅ Shopping cart with quantity controls
- ✅ Service detail pages with tabs
- ✅ Mobile-responsive design
- ✅ Toast notifications

---

## 🎯 After Deployment

1. **Test your app** at the Vercel URL
2. **Share the link**: `https://veyya.vercel.app`
3. **Custom domain** (optional): Add your own domain in Vercel settings

---

## 💡 Pro Tips

- **Free Tier**: Vercel's free tier is perfect for this app
- **Automatic HTTPS**: SSL included automatically
- **Fast CDN**: Global edge network for fast loading
- **Zero Config**: Next.js apps deploy with zero configuration

---

## ❓ Need Help?

If you get stuck:
1. Make sure you're logged into Vercel
2. Check that the build succeeds locally: `pnpm build`
3. Verify all files are committed: `git status`

---

**Ready to deploy?** Choose Method 1 above (Vercel website) - it's the fastest! 🚀
