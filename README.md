# Veyya Mobile App

On-demand home services marketplace - Mobile app for users and service providers.

## 🚀 Deployment

**Production**: https://veyya.vercel.app
**Repository**: https://github.com/mayakareem/veyya-mobile-app

## 📱 Features

- **Service Categories**: 8 categories with 100+ services
  - Beauty, Nails, Hair, Makeup
  - Healthcare (23 detailed services)
  - Pet Care (16 services with dog/cat filtering)
  - Wellness, Fitness, Home Care

- **Service Details**: Comprehensive tabbed interface
  - Healthcare: Overview, Procedure, Benefits, Preparation
  - Pet Care: Overview, Steps, Products, Benefits with dynamic pricing

- **Dynamic Pricing**:
  - Dog grooming: Small/Medium/Large (1x/1.5x/2x)
  - Cat grooming: Short/Long hair (1x/1.6x)

- **Shopping Cart**:
  - Add/remove items with quantity controls
  - Price breakdown with service fees
  - Toast notifications

- **Mobile-First Design**: Optimized for touch, responsive layouts

## 🛠 Tech Stack

- **Framework**: Next.js 16.0.8 (React 19.2.1)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Notifications**: Sonner
- **Package Manager**: pnpm

## 🏃 Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Access at: http://localhost:3000

## 📂 Project Structure

```
app/
├── (auth)/           # Authentication pages
├── explore/          # Browse categories
│   └── category/     # Category details with services
├── service/          # Service detail pages
├── cart/             # Shopping cart
├── home/             # User dashboard
├── bookings/         # User bookings
└── profile/          # User profile

lib/
├── constants/        # Service data, categories
└── cart-context.tsx  # Cart state management

components/
├── layout/           # AppShell, ScreenContainer
└── ui/               # shadcn/ui components
```

## 🔗 Related Projects

- **Web Prototype**: https://veyya-app.vercel.app ([veyya-app repo](https://github.com/mayakareem/veyya-app))
- **Mobile App**: https://veyya.vercel.app (this repo)

## 📝 Notes

- This is the mobile-optimized version designed for both users and service providers
- The web prototype (veyya-app) is maintained separately for desktop experience
- Both projects share similar service data but have different UX optimizations
