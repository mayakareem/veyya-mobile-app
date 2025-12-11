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
  ChevronRight
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

// Event types for booking
const EVENTS = [
  {
    id: "wedding",
    name: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    description: "Complete wedding day services",
    subcategories: [
      { id: "bridal-makeup", name: "Bridal Makeup", price: 8500, duration: 180 },
      { id: "bridal-hair", name: "Bridal Hair Styling", price: 4500, duration: 120 },
      { id: "bridesmaid-makeup", name: "Bridesmaid Makeup", price: 2500, duration: 60 },
      { id: "mehendi", name: "Bridal Mehendi", price: 3500, duration: 240 },
    ],
    addons: [
      { id: "trial-session", name: "Pre-Wedding Trial", price: 3000 },
      { id: "touch-up-kit", name: "Touch-up Kit", price: 800 },
    ]
  },
  {
    id: "corporate",
    name: "Corporate Event",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
    description: "Professional corporate services",
    subcategories: [
      { id: "wellness-session", name: "Office Wellness Session", price: 5000, duration: 60 },
      { id: "chair-massage", name: "Chair Massage (per person)", price: 800, duration: 15 },
      { id: "team-yoga", name: "Team Yoga Class", price: 3500, duration: 60 },
    ],
    addons: [
      { id: "aromatherapy", name: "Aromatherapy Diffusers", price: 1200 },
      { id: "wellness-kits", name: "Wellness Gift Kits", price: 500 },
    ]
  },
  {
    id: "party",
    name: "Party",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    description: "Make your party memorable",
    subcategories: [
      { id: "party-makeup", name: "Party Makeup", price: 2000, duration: 45 },
      { id: "hairstyling", name: "Party Hairstyling", price: 1500, duration: 45 },
      { id: "group-mani", name: "Group Manicure", price: 800, duration: 45 },
      { id: "group-pedi", name: "Group Pedicure", price: 1000, duration: 60 },
    ],
    addons: [
      { id: "glitter-kit", name: "Glitter & Accessories", price: 400 },
      { id: "photo-props", name: "Photo Booth Props", price: 600 },
    ]
  },
  {
    id: "photoshoot",
    name: "Photoshoot",
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=400&h=300&fit=crop",
    description: "Look camera-ready",
    subcategories: [
      { id: "photo-makeup", name: "Photography Makeup", price: 3500, duration: 90 },
      { id: "photo-hair", name: "Editorial Hairstyling", price: 2500, duration: 60 },
      { id: "look-changes", name: "Multiple Look Changes", price: 2000, duration: 60 },
    ],
    addons: [
      { id: "false-lashes", name: "Premium False Lashes", price: 300 },
      { id: "touch-up-service", name: "On-Set Touch-ups", price: 1500 },
    ]
  },
];

// Top/Trending Services
const TOP_SERVICES = [
  { id: 1, name: "Deep Tissue Massage", price: 1200, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop" },
  { id: 2, name: "Gel Manicure", price: 500, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop" },
  { id: 3, name: "Bridal Makeup", price: 3500, image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop" },
  { id: 4, name: "Pet Grooming", price: 800, image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200&h=200&fit=crop" },
];

export default function UserHubPage() {
  const router = useRouter();
  const { isAuthenticated, user, role, logout } = useAuth();
  const { getTotalItems, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [eventQuantities, setEventQuantities] = useState<Record<string, number>>({});
  const [eventAddons, setEventAddons] = useState<Record<string, boolean>>({});
  const [showGreeting, setShowGreeting] = useState(true);

  const demoName = getDemoName(user?.name);
  const greeting = getGreeting();

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

  const updateQuantity = (itemId: string, delta: number) => {
    setEventQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + delta)
    }));
  };

  const toggleAddon = (addonId: string) => {
    setEventAddons(prev => ({
      ...prev,
      [addonId]: !prev[addonId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-20">
      {/* Sticky Search Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-md mx-auto px-4 py-3">
          {/* Greeting - fades on scroll */}
          {showGreeting && (
            <div className="mb-3 transition-all duration-300">
              <p className="text-lg font-semibold">
                {greeting}, <span className="text-primary">{demoName}</span>
              </p>
            </div>
          )}

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <Link href="/search" className="flex-1">
              <div className="flex items-center gap-3 bg-muted/50 rounded-full px-4 py-2.5 border border-border/50">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Search services...</span>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full flex-shrink-0"
              onClick={() => router.push("/cart")}
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full flex-shrink-0"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full flex-shrink-0"
                onClick={() => router.push("/auth/login")}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Top Services Section */}
      <section className="pt-4 pb-4">
        <div className="px-4 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold">Top Services</h2>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {TOP_SERVICES.map((service) => (
              <Link key={service.id} href={`/service/${service.id}`}>
                <Card className="flex-shrink-0 w-32 overflow-hidden border-border/50 hover:shadow-md transition-shadow">
                  <div className="relative h-32 w-full">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium line-clamp-2 mb-1">{service.name}</p>
                    <p className="text-xs font-bold text-primary">฿{service.price}</p>
                  </div>
                </Card>
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
                      ? "bg-primary text-white border-primary"
                      : "bg-white border-border/50"
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

      {/* Events Booking Section */}
      <section className="pb-6">
        <div className="px-4 mb-3">
          <h2 className="text-base font-semibold">Book for Events</h2>
          <p className="text-xs text-muted-foreground">Perfect for special occasions</p>
        </div>

        <div className="px-4 space-y-3">
          {EVENTS.map((event) => {
            const isExpanded = expandedEvent === event.id;

            return (
              <Card key={event.id} className="overflow-hidden border-border/50">
                {/* Event Header */}
                <button
                  onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/20 transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{event.name}</h3>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    <p className="text-xs text-primary mt-1">{event.subcategories.length} services available</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-border/50 p-4 space-y-4 bg-muted/5">
                    {/* Subcategories */}
                    <div>
                      <p className="text-xs font-semibold mb-2 text-muted-foreground">Services</p>
                      <div className="space-y-2">
                        {event.subcategories.map((sub) => {
                          const qty = eventQuantities[`${event.id}-${sub.id}`] || 0;
                          return (
                            <div key={sub.id} className="bg-white rounded-lg p-3 border border-border/50">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{sub.name}</p>
                                  <p className="text-xs text-muted-foreground">{sub.duration} min</p>
                                </div>
                                <p className="text-sm font-bold text-primary">฿{sub.price}</p>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-2 bg-muted/50 rounded-full">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 rounded-full"
                                    onClick={() => updateQuantity(`${event.id}-${sub.id}`, -1)}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="text-sm font-medium w-6 text-center">{qty}</span>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 rounded-full"
                                    onClick={() => updateQuantity(`${event.id}-${sub.id}`, 1)}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>

                                {qty > 0 && (
                                  <div className="flex-1 grid grid-cols-2 gap-2">
                                    <Input
                                      type="date"
                                      className="h-7 text-xs"
                                      placeholder="Date"
                                    />
                                    <div className="relative">
                                      <MapPin className="absolute left-2 top-1.5 w-3 h-3 text-muted-foreground" />
                                      <Input
                                        type="text"
                                        className="h-7 text-xs pl-6"
                                        placeholder="Location"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Add-ons */}
                    {event.addons.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold mb-2 text-muted-foreground">Add-ons</p>
                        <div className="space-y-2">
                          {event.addons.map((addon) => {
                            const isSelected = eventAddons[`${event.id}-${addon.id}`];
                            return (
                              <button
                                key={addon.id}
                                onClick={() => toggleAddon(`${event.id}-${addon.id}`)}
                                className={`w-full bg-white rounded-lg p-3 border transition-all text-left ${
                                  isSelected ? 'border-primary bg-primary/5' : 'border-border/50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{addon.name}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-primary">฿{addon.price}</p>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                      isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                                    }`}>
                                      {isSelected && <Plus className="w-3 h-3 text-white" />}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <Button className="w-full rounded-full" size="lg">
                      Add to Cart
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
