# Veyya Mobile App - Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the app-mobile directory:
```bash
cd /Users/sindhusreenath/Projects/veyya/app-mobile
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - Project name: **veyya-mobile** (or your choice)
   - Directory: **./** (current directory)
   - Override settings? **N**

5. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository (GitHub/GitLab/Bitbucket)
3. Or upload the `app-mobile` folder directly
4. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install` (default)
5. Click "Deploy"

## 📋 Pre-Deployment Checklist

- ✅ Next.js app builds successfully (`pnpm build`)
- ✅ No TypeScript errors
- ✅ Service data integrated (Healthcare, Pet Care)
- ✅ Cart functionality working
- ✅ Toast notifications configured
- ✅ Mobile-responsive UI

## 🎯 App Features

### Current Implementation:
- **Service Browsing**: 8 categories with 100+ services
- **Detailed Service Pages**: Healthcare (23 services), Pet Care (16 services)
- **Shopping Cart**: Add/remove items with quantity control
- **Pet Care Filtering**: Dog/Cat filtering with dynamic pricing
- **Service Details**: Tabbed interface with Overview, Steps, Products, Benefits
- **Mobile-First Design**: Optimized for touch, responsive layouts

### Pages Available:
- `/` - Splash screen
- `/home` - User dashboard
- `/explore` - Browse all categories
- `/explore/category/[name]` - Category detail with services
- `/service/[id]` - Individual service details
- `/cart` - Shopping cart
- `/bookings` - User bookings
- `/profile` - User profile

## 🔧 Environment Variables (Optional)

Create a `.env.local` file if needed:
```env
# Add any API keys or environment-specific variables here
# NEXT_PUBLIC_API_URL=https://api.veyya.com
```

## 📱 Post-Deployment

After deployment, Vercel will provide:
- **Production URL**: `https://veyya-mobile.vercel.app` (or similar)
- **Preview URLs**: For each Git branch/PR
- **Analytics**: Performance metrics
- **Logs**: Real-time application logs

## 🛠 Future Enhancements

To match the full Vercel deployment:
1. **Booking Flow**: Multi-step booking with date/time selection
2. **Checkout**: Payment integration (Stripe/PromptPay)
3. **Provider Mode**: Switch between user/provider roles
4. **Real-time Updates**: Booking status, notifications
5. **Authentication**: Phone/email OTP login

## 📞 Support

- Local dev server: `pnpm dev` → http://localhost:3000
- Build production: `pnpm build`
- Start production: `pnpm start`

---
Built with ❤️ using Next.js 16, TypeScript, and Tailwind CSS
