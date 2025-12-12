"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  ShoppingBag,
  LogOut,
  Search,
  MapPin,
  Calendar as CalendarIcon,
  Plus,
  Minus,
  ChevronRight,
  Home,
  CalendarDays,
  Tag,
  Gift,
  User,
  Menu
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Demo names for greeting
const DEMO_NAMES = ["Alex", "Moom", "Sin"];

// Get random demo name or use logged in name
function getDemoName(userName: string | undefined): string {
  if (userName && DEMO_NAMES.includes(userName)) {
    return userName;
  }
  return DEMO_NAMES[Math.floor(Math.random() * DEMO_NAMES.length)];
}

// Get time-based greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Bundled Offers
const BUNDLED_OFFERS = [
  {
    id: "glow-package",
    name: "Complete Glow Package",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop",
    description: "Facial, massage, and manicure for ultimate relaxation",
    originalPrice: 4500,
    price: 3150,
    discount: 30,
    services: ["Facial Treatment", "Swedish Massage", "Gel Manicure"]
  },
  {
    id: "bridal-beauty",
    name: "Bridal Beauty Bundle",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop",
    description: "Complete bridal look with trial session included",
    originalPrice: 16000,
    price: 12000,
    discount: 25,
    services: ["Bridal Makeup", "Hair Styling", "Trial Session", "Touch-up Kit"]
  },
  {
    id: "wellness-week",
    name: "Weekly Wellness",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=200&h=200&fit=crop",
    description: "4 sessions of massage and yoga for stress relief",
    originalPrice: 5600,
    price: 3920,
    discount: 30,
    services: ["Deep Tissue Massage", "Hot Stone Massage", "Yoga Session x2"]
  },
  {
    id: "party-ready",
    name: "Party Ready Package",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200&h=200&fit=crop",
    description: "Makeup, hair, and nails for your special night",
    originalPrice: 3500,
    price: 2625,
    discount: 25,
    services: ["Party Makeup", "Hairstyling", "Gel Manicure"]
  },
  {
    id: "pet-pamper",
    name: "Pet Pampering Day",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200&h=200&fit=crop",
    description: "Full grooming and spa treatment for your furry friend",
    originalPrice: 2000,
    price: 1400,
    discount: 30,
    services: ["Pet Grooming", "Pet Bath", "Nail Trimming", "Ear Cleaning"]
  },
  {
    id: "home-spa",
    name: "Home Spa Experience",
    image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=200&h=200&fit=crop",
    description: "Transform your home into a luxurious spa retreat",
    originalPrice: 6000,
    price: 4500,
    discount: 25,
    services: ["Aromatherapy Massage", "Facial Treatment", "Pedicure", "Manicure"]
  }
];

// Top/Trending Services
const TOP_SERVICES = [
  { id: 1, name: "Deep Tissue Massage", price: 1200, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop" },
  { id: 2, name: "Gel Manicure", price: 500, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop" },
  { id: 3, name: "Bridal Makeup", price: 3500, image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop" },
  { id: 4, name: "Pet Grooming", price: 800, image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200&h=200&fit=crop" },
  { id: 5, name: "Swedish Massage", price: 1000, image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=200&h=200&fit=crop" },
  { id: 6, name: "Facial Treatment", price: 1500, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop" },
  { id: 7, name: "Hair Styling", price: 900, image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop" },
  { id: 8, name: "Pedicure", price: 600, image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=200&h=200&fit=crop" },
  { id: 9, name: "Hot Stone Massage", price: 1400, image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=200&h=200&fit=crop" },
  { id: 10, name: "Aromatherapy", price: 1100, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=200&fit=crop" },
  { id: 11, name: "Hair Coloring", price: 2500, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop" },
  { id: 12, name: "Eyelash Extensions", price: 1800, image: "https://images.unsplash.com/photo-1583001308904-cd63e54f7f8f?w=200&h=200&fit=crop" },
];

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user, role, logout } = useAuth();
  const { getTotalItems, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(true);
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const demoName = getDemoName(user?.name);
  const greeting = getGreeting();

  // Typing animation placeholders
  const placeholderExamples = [
    "deep tissue massage near me",
    "bridal makeup for wedding",
    "dog grooming at home",
    "gel manicure this weekend",
    "facial treatment downtown",
    "hair coloring and highlights",
  ];

  // Typing animation effect
  useEffect(() => {
    const currentText = placeholderExamples[placeholderIndex];
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      if (!isDeleting && currentCharIndex <= currentText.length) {
        setPlaceholderText(currentText.substring(0, currentCharIndex));
        currentCharIndex++;
        typingSpeed = 100;
      } else if (isDeleting && currentCharIndex >= 0) {
        setPlaceholderText(currentText.substring(0, currentCharIndex));
        currentCharIndex--;
        typingSpeed = 50;
      } else if (!isDeleting && currentCharIndex > currentText.length) {
        // Pause before deleting
        setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000);
        return;
      } else if (isDeleting && currentCharIndex < 0) {
        // Move to next placeholder
        isDeleting = false;
        setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
        return;
      }

      setTimeout(type, typingSpeed);
    };

    const timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, [placeholderIndex]);

  useEffect(() => {
    // Redirect providers to their hub
    if (isAuthenticated && role === "provider") {
      router.push("/hub/provider");
    }
  }, [isAuthenticated, role, router]);

  useEffect(() => {
    const handleScroll = () => {
      setShowGreeting(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white">
        <div className="max-w-md mx-auto px-4 py-3">
          {/* Location */}
          <div className="flex items-center gap-1 mb-2">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Sukhumvit, Bangkok</span>
          </div>

          {/* Search Bar Row */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <Link href="/search" className="flex-1">
              <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-2.5 border border-border/50">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {placeholderText || "Search services..."}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg flex-shrink-0 relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Top Services Section */}
      <section className="pt-4 pb-4">
        <div className="px-4 mb-3">
          <h2 className="text-base font-semibold">Top Services</h2>
        </div>
        <div className="overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
            {TOP_SERVICES.map((service) => (
              <Link key={service.id} href={`/service/${service.id}`}>
                <div className="flex flex-col items-center gap-2 w-20">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-border/50 hover:border-primary transition-all shadow-sm hover:shadow-md">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center w-full">
                    <p className="text-xs font-medium line-clamp-2 mb-0.5">{service.name}</p>
                    <p className="text-xs font-bold text-primary">฿{service.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category - Compact */}
      <section className="pb-4">
        <div className="px-4 mb-2">
          <h2 className="text-base font-semibold">Browse by Category</h2>
        </div>

        {/* Category Pills */}
        <div className="px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {SERVICE_CATEGORIES.map((category) => {
              const Icon = category.Icon;
              const isSelected = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(isSelected ? null : category.name)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/50"
                      : "bg-white border-border/50 hover:shadow-md"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Sub-categories */}
        {selectedCategory && (
          <div className="sticky top-[72px] z-10 bg-white/95 backdrop-blur-lg border-b border-border/50 py-2 mt-3">
            <div className="px-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {SERVICE_CATEGORIES.find(c => c.name === selectedCategory)?.services?.map((sub) => (
                  <Link
                    key={sub}
                    href={`/category/${encodeURIComponent(selectedCategory)}?sub=${encodeURIComponent(sub)}`}
                  >
                    <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full text-xs">
                      {sub}
                    </Button>
                  </Link>
                )) || (
                  <p className="text-sm text-muted-foreground">No services available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Bundled Offers Marquee */}
      <section className="pb-6 overflow-hidden">
        <div className="px-4 mb-3">
          <h2 className="text-base font-semibold">Special Bundles</h2>
          <p className="text-xs text-muted-foreground">Save more with our curated packages</p>
        </div>

        {/* Scrolling Marquee */}
        <div className="relative">
          <div className="flex gap-4 animate-marquee">
            {[...BUNDLED_OFFERS, ...BUNDLED_OFFERS].map((offer, index) => (
              <Card
                key={`${offer.id}-${index}`}
                className="flex-shrink-0 w-72 p-4 border-border/50 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => router.push(`/offers/${offer.id}`)}
              >
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={offer.image}
                      alt={offer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-sm">{offer.name}</h3>
                      <Badge className="text-xs bg-green-500">{offer.discount}% OFF</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{offer.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground line-through">฿{offer.originalPrice}</span>
                      <span className="text-sm font-bold text-primary">฿{offer.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{offer.services.length} services included</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white safe-bottom">
        <div className="max-w-md mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            <Link href="/" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <Home className="w-6 h-6 text-primary" />
              <span className="text-xs font-medium text-primary">Home</span>
            </Link>
            <Link href="/bookings" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <CalendarDays className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Bookings</span>
            </Link>
            <Link href="/offers" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <Tag className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Offers</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px] relative">
              <Gift className="w-6 h-6 text-muted-foreground" />
              {getTotalItems() > 0 && (
                <Badge className="absolute top-1 right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
                  {getTotalItems()}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">Gift</span>
            </Link>
            <Link href={isAuthenticated ? "/profile" : "/auth/login"} className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <User className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
