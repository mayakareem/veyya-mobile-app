"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  User,
  Briefcase,
  ShoppingBag,
  Calendar,
  Settings,
  FileText,
  Heart,
  Search,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  Gift,
  Tag,
  LogIn,
  Building,
  Package,
  TrendingUp,
  DollarSign,
  Shield,
} from "lucide-react";
import Link from "next/link";

interface PageLink {
  href: string;
  label: string;
  icon: any;
  description: string;
  badge?: string;
}

interface Section {
  title: string;
  description: string;
  links: PageLink[];
}

export default function HubPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const sections: Section[] = [
    {
      title: "🔐 Authentication & Login",
      description: "User and provider login flows",
      links: [
        {
          href: "/login",
          label: "Main Login",
          icon: LogIn,
          description: "Choose between Client or Provider",
          badge: "NEW",
        },
        {
          href: "/login/user",
          label: "Client Onboarding",
          icon: User,
          description: "Name, addresses, payment setup",
          badge: "NEW",
        },
        {
          href: "/login/provider",
          label: "Provider Onboarding",
          icon: Briefcase,
          description: "6-step registration process",
          badge: "NEW",
        },
        {
          href: "/auth/login",
          label: "Legacy Login",
          icon: LogIn,
          description: "Old login page",
        },
        {
          href: "/auth/register",
          label: "Legacy Register",
          icon: User,
          description: "Old registration page",
        },
      ],
    },
    {
      title: "🏠 Main Pages",
      description: "Core user experience",
      links: [
        {
          href: "/",
          label: "Landing Page",
          icon: Home,
          description: "Main landing with search and categories",
        },
        {
          href: "/explore",
          label: "Explore Services",
          icon: Search,
          description: "Browse all available services",
        },
        {
          href: "/search",
          label: "Search",
          icon: Search,
          description: "Search for services",
        },
        {
          href: "/cart",
          label: "Shopping Cart",
          icon: ShoppingBag,
          description: "View cart and checkout",
        },
        {
          href: "/checkout",
          label: "Checkout",
          icon: CreditCard,
          description: "Complete your booking",
        },
        {
          href: "/confirmation",
          label: "Confirmation",
          icon: Calendar,
          description: "Booking confirmation page",
        },
      ],
    },
    {
      title: "👤 User Dashboard",
      description: "Client account and bookings",
      links: [
        {
          href: "/profile",
          label: "Profile",
          icon: User,
          description: "User profile with Contact Us",
        },
        {
          href: "/bookings",
          label: "My Bookings",
          icon: Calendar,
          description: "View all bookings",
        },
      ],
    },
    {
      title: "💼 Provider Dashboard",
      description: "Service provider tools",
      links: [
        {
          href: "/hub/provider",
          label: "Provider Hub",
          icon: TrendingUp,
          description: "Stats, bookings, revenue overview",
        },
        {
          href: "/provider",
          label: "Provider Profile",
          icon: Briefcase,
          description: "Public provider page",
        },
        {
          href: "/provider/bookings",
          label: "Provider Bookings",
          icon: Calendar,
          description: "Manage customer bookings",
        },
        {
          href: "/provider/calendar",
          label: "Availability",
          icon: Calendar,
          description: "Set available time slots",
        },
        {
          href: "/provider/services",
          label: "Manage Services",
          icon: Package,
          description: "Edit service offerings",
        },
        {
          href: "/provider/onboarding",
          label: "Provider Onboarding",
          icon: FileText,
          description: "Registration process",
        },
      ],
    },
    {
      title: "📂 Service Categories",
      description: "Browse by category",
      links: [
        {
          href: "/category/Hair",
          label: "Hair Services",
          icon: Heart,
          description: "Cuts, color, styling",
        },
        {
          href: "/category/Makeup",
          label: "Makeup",
          icon: Heart,
          description: "Bridal, party makeup",
        },
        {
          href: "/category/Nails",
          label: "Nails",
          icon: Heart,
          description: "Manicure, pedicure",
        },
        {
          href: "/category/Wellness",
          label: "Wellness",
          icon: Heart,
          description: "Massage, yoga",
        },
        {
          href: "/category/Pet%20Care",
          label: "Pet Care",
          icon: Heart,
          description: "Grooming, training",
        },
        {
          href: "/category/Cleaning",
          label: "Cleaning",
          icon: Heart,
          description: "Home cleaning services",
        },
      ],
    },
    {
      title: "🎉 Events & Special",
      description: "Event-specific bookings",
      links: [
        {
          href: "/events/weddings",
          label: "Weddings",
          icon: Gift,
          description: "Wedding day services",
        },
        {
          href: "/events/corporate",
          label: "Corporate Events",
          icon: Building,
          description: "Office wellness, team activities",
        },
        {
          href: "/events/parties",
          label: "Parties",
          icon: Gift,
          description: "Party services",
        },
        {
          href: "/events/photoshoots",
          label: "Photoshoots",
          icon: Gift,
          description: "Camera-ready services",
        },
      ],
    },
    {
      title: "🛍️ Offers & Rewards",
      description: "Deals and programs",
      links: [
        {
          href: "/referrals",
          label: "Referrals",
          icon: Gift,
          description: "Refer friends and earn",
        },
      ],
    },
    {
      title: "🔧 Admin Tools",
      description: "Administrative pages",
      links: [
        {
          href: "/admin",
          label: "Admin Dashboard",
          icon: Shield,
          description: "Main admin panel",
        },
        {
          href: "/admin/providers",
          label: "Provider Management",
          icon: Briefcase,
          description: "Approve and manage providers",
        },
        {
          href: "/admin/bookings",
          label: "Booking Management",
          icon: Calendar,
          description: "Monitor all bookings",
        },
      ],
    },
    {
      title: "ℹ️ Information Pages",
      description: "Help and legal",
      links: [
        {
          href: "/about",
          label: "About Us",
          icon: FileText,
          description: "Company information",
        },
        {
          href: "/help",
          label: "Help Center",
          icon: HelpCircle,
          description: "FAQs and support",
        },
        {
          href: "/contact",
          label: "Contact",
          icon: Bell,
          description: "Get in touch",
        },
        {
          href: "/terms",
          label: "Terms of Service",
          icon: FileText,
          description: "Legal terms",
        },
        {
          href: "/privacy",
          label: "Privacy Policy",
          icon: Shield,
          description: "Privacy information",
        },
        {
          href: "/safety",
          label: "Safety",
          icon: Shield,
          description: "Safety guidelines",
        },
      ],
    },
  ];

  // Filter sections based on search query
  const filteredSections = sections
    .map((section) => ({
      ...section,
      links: section.links.filter(
        (link) =>
          link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.href.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.links.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white p-4 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-8 space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Veyya Navigation Hub
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick access to all pages, features, and tools in the Veyya platform.
            Use the search below to find what you need.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {sections.reduce((acc, s) => acc + s.links.length, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Pages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{sections.length}</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">New Features</div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {filteredSections.map((section) => (
            <div key={section.title}>
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-1">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.href} href={link.href}>
                      <Card className="p-4 hover:shadow-lg transition-all border hover:border-primary group cursor-pointer h-full">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                {link.label}
                              </h3>
                              {link.badge && (
                                <Badge className="text-xs px-1.5 py-0 h-5">
                                  {link.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {link.description}
                            </p>
                            <p className="text-xs text-primary/60 mt-1 font-mono">
                              {link.href}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchQuery && filteredSections.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No pages found</h3>
            <p className="text-sm text-muted-foreground">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8 mt-12 border-t">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
