# Veyya Mobile App

iOS-style mobile application for Veyya premium home services platform.

## Features

### ✨ Core Features
- **Authentication**: Login and registration with mock API
- **Home Dashboard**: Quick access to popular services and featured deals
- **Service Exploration**: Browse all 8 service categories (Beauty, Nails, Hair, Makeup, Pet Care, Cleaning, Wellness, Fitness)
- **Bookings Management**: View and manage service bookings
- **Shopping Cart**: Add services to cart and checkout
- **User Profile**: Edit profile, manage settings, and logout

### 🎨 Design System
- **iOS-Style White Theme**: Clean, modern interface inspired by iOS design
- **Colors**:
  - Background: #FFFFFF
  - Primary: #2563EB (Blue)
  - Secondary: #F5F5F5
  - Text: #0F172A / #6B7280
- **Components**: Built with shadcn/ui
- **Responsive**: Mobile-first, PWA-ready design

## Tech Stack

- **Next.js 16** with App Router and Turbopack
- **React 19** with TypeScript
- **TailwindCSS 4** for styling
- **shadcn/ui** components
- **Lucide React** icons
- **Context API** for state management

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

The app will be available at `http://localhost:3000`

## Navigation

### Bottom Tab Navigation
- **Home**: Dashboard with quick actions
- **Explore**: Browse all services by category
- **Bookings**: View booking history
- **Profile**: User account and settings

## State Management

### Auth Context (`useAuth`)
- Login, register, and logout functionality
- User session management

### Cart Context (`useCart`)
- Add/remove items
- Update quantities
- Calculate totals

Built with ❤️ using Next.js 16 and React 19
