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
  Menu,
  Star,
  Clock,
  X,
  Check
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
    duration: 180,
    process: "Our Complete Glow Package starts with a deep cleansing facial to refresh your skin, followed by a Swedish massage to release tension, and finishes with a professional gel manicure for polished perfection.",
    services: [
      { name: "Deep Cleansing Facial", duration: 60, description: "Customized facial treatment with extraction and mask" },
      { name: "Swedish Massage", duration: 60, description: "Full-body relaxation massage with essential oils" },
      { name: "Gel Manicure", duration: 60, description: "Professional nail shaping, cuticle care, and gel polish" }
    ]
  },
  {
    id: "bridal-beauty",
    name: "Bridal Beauty Bundle",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop",
    description: "Complete bridal look with trial session included",
    originalPrice: 16000,
    price: 12000,
    discount: 25,
    duration: 360,
    process: "Perfect your wedding day look with a pre-wedding trial session, then enjoy full bridal makeup and hair styling on your special day, with a touch-up kit to stay flawless all day long.",
    services: [
      { name: "Pre-Wedding Trial", duration: 120, description: "Test your makeup and hair look before the big day" },
      { name: "Bridal Makeup", duration: 120, description: "HD airbrush makeup with false lashes and contouring" },
      { name: "Bridal Hair Styling", duration: 90, description: "Elegant updo or flowing waves with accessories" },
      { name: "Touch-up Kit", duration: 30, description: "Personalized kit for day-long perfection" }
    ]
  },
  {
    id: "wellness-week",
    name: "Weekly Wellness",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=200&h=200&fit=crop",
    description: "4 sessions of massage and yoga for stress relief",
    originalPrice: 5600,
    price: 3920,
    discount: 30,
    duration: 240,
    process: "Recharge with our weekly wellness plan: alternate between deep tissue massage sessions and hot stone massage, complemented by two restorative yoga classes for complete mind-body balance.",
    services: [
      { name: "Deep Tissue Massage", duration: 60, description: "Targeted pressure to release muscle knots and tension" },
      { name: "Hot Stone Massage", duration: 60, description: "Heated stones for deep relaxation and circulation" },
      { name: "Yoga Session (2x)", duration: 60, description: "Guided yoga flows for flexibility and stress relief" }
    ]
  },
  {
    id: "party-ready",
    name: "Party Ready Package",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200&h=200&fit=crop",
    description: "Makeup, hair, and nails for your special night",
    originalPrice: 3500,
    price: 2625,
    discount: 25,
    duration: 135,
    process: "Get party-ready with glamorous makeup tailored to your outfit, a stunning hairstyle that lasts all night, and a fresh gel manicure to complete your look.",
    services: [
      { name: "Party Makeup", duration: 45, description: "Bold eyes, flawless base, and long-lasting finish" },
      { name: "Party Hairstyling", duration: 45, description: "Curls, braids, or sleek styles with setting spray" },
      { name: "Gel Manicure", duration: 45, description: "Chip-resistant polish in your choice of color" }
    ]
  },
  {
    id: "pet-pamper",
    name: "Pet Pampering Day",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200&h=200&fit=crop",
    description: "Full grooming and spa treatment for your furry friend",
    originalPrice: 2000,
    price: 1400,
    discount: 30,
    duration: 120,
    process: "Treat your pet to a full spa day with professional grooming, a gentle bath with premium shampoo, nail trimming for comfort, and ear cleaning for complete hygiene.",
    services: [
      { name: "Professional Grooming", duration: 45, description: "Breed-specific cut and styling" },
      { name: "Premium Bath", duration: 30, description: "Organic shampoo and conditioner treatment" },
      { name: "Nail Trimming", duration: 15, description: "Safe trimming and filing for comfort" },
      { name: "Ear Cleaning", duration: 30, description: "Gentle cleaning to prevent infections" }
    ]
  },
  {
    id: "home-spa",
    name: "Home Spa Experience",
    image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=200&h=200&fit=crop",
    description: "Transform your home into a luxurious spa retreat",
    originalPrice: 6000,
    price: 4500,
    discount: 25,
    duration: 180,
    process: "Enjoy a complete spa experience in the comfort of your home with aromatherapy massage, rejuvenating facial, pedicure with exfoliation, and finishing with a classic manicure.",
    services: [
      { name: "Aromatherapy Massage", duration: 60, description: "Essential oils massage for deep relaxation" },
      { name: "Rejuvenating Facial", duration: 45, description: "Anti-aging treatment with serums and masks" },
      { name: "Spa Pedicure", duration: 45, description: "Exfoliation, massage, and polish" },
      { name: "Classic Manicure", duration: 30, description: "Nail care and classic polish" }
    ]
  }
];

// Previously Booked Vendors
const PREVIOUS_VENDORS = [
  {
    id: 1,
    name: "Sarah Chen",
    service: "Deep Tissue Massage",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rating: 4.9,
    reviewCount: 127,
    lastServed: "2025-11-28",
    pricePerSession: 1200,
    duration: 60,
    bio: "Certified massage therapist with 8 years of experience specializing in deep tissue and sports massage.",
    nextAvailable: [
      { date: "2025-12-13", time: "10:00 AM" },
      { date: "2025-12-13", time: "2:00 PM" },
      { date: "2025-12-14", time: "9:00 AM" },
      { date: "2025-12-14", time: "4:00 PM" }
    ]
  },
  {
    id: 2,
    name: "Maya Rodriguez",
    service: "Bridal Makeup",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    rating: 5.0,
    reviewCount: 89,
    lastServed: "2025-11-15",
    pricePerSession: 3500,
    duration: 120,
    bio: "Award-winning makeup artist specializing in bridal and editorial looks. Featured in Vogue Thailand.",
    nextAvailable: [
      { date: "2025-12-15", time: "11:00 AM" },
      { date: "2025-12-16", time: "10:00 AM" },
      { date: "2025-12-17", time: "1:00 PM" }
    ]
  },
  {
    id: 3,
    name: "Priya Sharma",
    service: "Gel Manicure",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    rating: 4.8,
    reviewCount: 156,
    lastServed: "2025-12-05",
    pricePerSession: 500,
    duration: 45,
    bio: "Nail artist with expertise in gel techniques and intricate nail art designs.",
    nextAvailable: [
      { date: "2025-12-13", time: "11:00 AM" },
      { date: "2025-12-13", time: "3:00 PM" },
      { date: "2025-12-14", time: "10:00 AM" },
      { date: "2025-12-14", time: "2:00 PM" }
    ]
  },
  {
    id: 4,
    name: "Emma Watson",
    service: "Hair Styling",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    rating: 4.9,
    reviewCount: 143,
    lastServed: "2025-11-22",
    pricePerSession: 900,
    duration: 60,
    bio: "Creative hair stylist specializing in modern cuts, coloring, and event styling.",
    nextAvailable: [
      { date: "2025-12-13", time: "1:00 PM" },
      { date: "2025-12-14", time: "11:00 AM" },
      { date: "2025-12-15", time: "3:00 PM" }
    ]
  },
  {
    id: 5,
    name: "Lisa Anderson",
    service: "Facial Treatment",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop",
    rating: 5.0,
    reviewCount: 201,
    lastServed: "2025-12-01",
    pricePerSession: 1500,
    duration: 75,
    bio: "Licensed esthetician with advanced training in anti-aging treatments and skin analysis.",
    nextAvailable: [
      { date: "2025-12-14", time: "10:00 AM" },
      { date: "2025-12-14", time: "3:00 PM" },
      { date: "2025-12-15", time: "9:00 AM" }
    ]
  },
  {
    id: 6,
    name: "Nina Patel",
    service: "Hot Stone Massage",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
    rating: 4.7,
    reviewCount: 98,
    lastServed: "2025-11-18",
    pricePerSession: 1400,
    duration: 90,
    bio: "Holistic therapist combining hot stone therapy with aromatherapy for ultimate relaxation.",
    nextAvailable: [
      { date: "2025-12-13", time: "2:00 PM" },
      { date: "2025-12-14", time: "1:00 PM" },
      { date: "2025-12-15", time: "10:00 AM" }
    ]
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
  const [expandedBundle, setExpandedBundle] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(true);
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState<typeof PREVIOUS_VENDORS[0] | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{date: string; time: string} | null>(null);

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
          <div className="sticky top-[72px] z-10 bg-white/95 backdrop-blur-lg py-2 mt-3">
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

      {/* Bundled Offers */}
      <section className="pb-6">
        <div className="px-4 mb-3">
          <h2 className="text-base font-semibold">Special Bundles</h2>
          <p className="text-xs text-muted-foreground">Save more with our curated packages</p>
        </div>

        {/* Horizontal Scroll */}
        <div className="overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-4 pb-2">
            {BUNDLED_OFFERS.map((offer) => {
              const isExpanded = expandedBundle === offer.id;
              return (
                <Card
                  key={offer.id}
                  className="flex-shrink-0 w-80 border-border/50 overflow-hidden"
                >
                  {/* Bundle Header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                    onClick={() => setExpandedBundle(isExpanded ? null : offer.id)}
                  >
                    <div className="flex gap-3 mb-3">
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
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{offer.duration} min</span>
                        </div>
                        <span>•</span>
                        <span>{offer.services.length} services</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>

                    {/* Quick Add to Cart (when collapsed) */}
                    {!isExpanded && (
                      <Button
                        className="w-full mt-3 rounded-full"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            name: offer.name,
                            price: offer.price,
                            duration: offer.duration,
                            category: "Bundles",
                            subcategory: "Special Package",
                            description: offer.description,
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-border/50 p-4 bg-muted/5 space-y-4">
                      {/* Process Description */}
                      <div>
                        <p className="text-xs font-semibold mb-2 text-muted-foreground">What to Expect</p>
                        <p className="text-xs text-foreground leading-relaxed">{offer.process}</p>
                      </div>

                      {/* Services Breakdown */}
                      <div>
                        <p className="text-xs font-semibold mb-2 text-muted-foreground">Services Included</p>
                        <div className="space-y-2">
                          {offer.services.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-border/50">
                              <div className="flex items-start justify-between mb-1">
                                <p className="text-sm font-medium flex-1">{service.name}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  <span>{service.duration} min</span>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">{service.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total Duration */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-blue-900">Total Duration</p>
                            <p className="text-xs text-blue-700">Approximately {Math.floor(offer.duration / 60)}h {offer.duration % 60}min</p>
                          </div>
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        className="w-full rounded-full"
                        size="lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            name: offer.name,
                            price: offer.price,
                            duration: offer.duration,
                            category: "Bundles",
                            subcategory: "Special Package",
                            description: offer.description,
                          });
                          setExpandedBundle(null);
                        }}
                      >
                        Add to Cart - ฿{offer.price}
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Book Again Section */}
      <section className="pb-6">
        <div className="px-4 mb-3">
          <h2 className="text-base font-semibold">Book Again</h2>
          <p className="text-xs text-muted-foreground">Your favorite providers are waiting</p>
        </div>

        <div className="overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
            {PREVIOUS_VENDORS.map((vendor) => (
              <Card
                key={vendor.id}
                className="flex-shrink-0 w-64 p-4 border-border/50 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => router.push(`/providers/${vendor.id}`)}
              >
                <div className="flex gap-3 mb-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                    <Image
                      src={vendor.image}
                      alt={vendor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate">{vendor.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1 truncate">{vendor.service}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{vendor.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Last served: {new Date(vendor.lastServed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">฿{vendor.pricePerSession}</span>
                  <Button size="sm" className="rounded-full">
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book Special Events Section */}
      <section className="pb-6">
        <div className="px-4 mb-3">
          <h2 className="text-base font-semibold">Book Special Events</h2>
          <p className="text-xs text-muted-foreground">Perfect for your memorable occasions</p>
        </div>

        <div className="px-4">
          <div className="grid grid-cols-2 gap-3">
            <Link href="/events/weddings">
              <Card className="p-4 hover:shadow-lg transition-all border-border/50 cursor-pointer group">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop"
                    alt="Weddings"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white font-semibold text-sm">Weddings</span>
                </div>
                <p className="text-xs text-muted-foreground">Bridal makeup, hair & more</p>
              </Card>
            </Link>

            <Link href="/events/corporate">
              <Card className="p-4 hover:shadow-lg transition-all border-border/50 cursor-pointer group">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop"
                    alt="Corporate Events"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white font-semibold text-sm">Corporate</span>
                </div>
                <p className="text-xs text-muted-foreground">Wellness & team activities</p>
              </Card>
            </Link>

            <Link href="/events/parties">
              <Card className="p-4 hover:shadow-lg transition-all border-border/50 cursor-pointer group">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop"
                    alt="Parties"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white font-semibold text-sm">Parties</span>
                </div>
                <p className="text-xs text-muted-foreground">Makeup, hair & nails</p>
              </Card>
            </Link>

            <Link href="/events/photoshoots">
              <Card className="p-4 hover:shadow-lg transition-all border-border/50 cursor-pointer group">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1554080353-a576cf803bda?w=400&h=300&fit=crop"
                    alt="Photoshoots"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white font-semibold text-sm">Photoshoots</span>
                </div>
                <p className="text-xs text-muted-foreground">Camera-ready looks</p>
              </Card>
            </Link>
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
