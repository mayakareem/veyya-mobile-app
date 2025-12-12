"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tag,
  Clock,
  Sparkles,
  TrendingUp,
  Gift,
  Calendar,
  Home,
  CalendarDays,
  User as UserIcon,
  Gift as GiftIcon,
  Copy,
  Check,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample offers data
const ACTIVE_OFFERS = [
  {
    id: "first-booking",
    title: "First Booking Special",
    description: "Get 20% off your first service booking",
    discount: "20% OFF",
    discountValue: 20,
    code: "FIRST20",
    validUntil: "2025-12-31",
    minSpend: 500,
    maxDiscount: 1000,
    image: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=400&h=300&fit=crop",
    category: "New User",
    terms: "Valid for new users only. One-time use. Cannot be combined with other offers.",
  },
  {
    id: "weekend-wellness",
    title: "Weekend Wellness",
    description: "15% off all massage and spa services on weekends",
    discount: "15% OFF",
    discountValue: 15,
    code: "WEEKEND15",
    validUntil: "2025-12-31",
    minSpend: 0,
    maxDiscount: 500,
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop",
    category: "Weekend Only",
    terms: "Valid on Saturdays and Sundays only. Applies to massage and spa services.",
  },
  {
    id: "bundle-save",
    title: "Bundle & Save",
    description: "Book 3+ services and save 25%",
    discount: "25% OFF",
    discountValue: 25,
    code: "BUNDLE25",
    validUntil: "2025-12-31",
    minSpend: 2000,
    maxDiscount: 1500,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    category: "Bundle Deal",
    terms: "Minimum 3 services required in a single booking. Services can be scheduled on different dates.",
  },
  {
    id: "early-bird",
    title: "Early Bird Special",
    description: "10% off bookings made before 10 AM",
    discount: "10% OFF",
    discountValue: 10,
    code: "EARLY10",
    validUntil: "2025-12-31",
    minSpend: 300,
    maxDiscount: 300,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    category: "Time-Based",
    terms: "Booking must be scheduled between 6 AM - 10 AM. Valid for all services.",
  },
  {
    id: "bridal-package",
    title: "Bridal Bliss Package",
    description: "30% off complete bridal packages",
    discount: "30% OFF",
    discountValue: 30,
    code: "BRIDE30",
    validUntil: "2025-12-31",
    minSpend: 5000,
    maxDiscount: 3000,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
    category: "Wedding",
    terms: "Valid for bridal makeup and hair packages only. Trial session included.",
  },
  {
    id: "pet-care",
    title: "Pampered Pets",
    description: "20% off all pet grooming services",
    discount: "20% OFF",
    discountValue: 20,
    code: "PETS20",
    validUntil: "2025-12-31",
    minSpend: 400,
    maxDiscount: 400,
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop",
    category: "Pet Care",
    terms: "Applies to all pet grooming and spa services. Valid for dogs and cats.",
  },
];

const TRENDING_OFFERS = [
  {
    id: "flash-sale",
    title: "Flash Sale - 48 Hours Only!",
    description: "Extra 10% off all services this weekend",
    discount: "10% OFF",
    discountValue: 10,
    code: "FLASH10",
    validUntil: "2025-12-15",
    minSpend: 0,
    maxDiscount: 500,
    endsIn: "2 days",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
    category: "Limited Time",
    terms: "Valid for 48 hours only. Applies to all services. Cannot be combined with other offers.",
  },
];

export default function OffersPage() {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "trending">("all");

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const offersToShow = activeTab === "all" ? ACTIVE_OFFERS : TRENDING_OFFERS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Special Offers</h1>
          <p className="text-sm text-muted-foreground">Save more on your favorite services</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[72px] z-10 bg-white">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              className="flex-1 rounded-full"
              onClick={() => setActiveTab("all")}
            >
              All Offers ({ACTIVE_OFFERS.length})
            </Button>
            <Button
              variant={activeTab === "trending" ? "default" : "outline"}
              className="flex-1 rounded-full"
              onClick={() => setActiveTab("trending")}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Trending ({TRENDING_OFFERS.length})
            </Button>
          </div>
        </div>
      </div>

      {/* Trending Banner */}
      {activeTab === "trending" && TRENDING_OFFERS.length > 0 && (
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <p className="font-bold">Limited Time Offers</p>
            </div>
            <p className="text-sm opacity-90">Grab these deals before they expire!</p>
          </div>
        </div>
      )}

      {/* Offers List */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {offersToShow.map((offer) => (
          <Card key={offer.id} className="overflow-hidden border-border/50">
            <div className="flex">
              {/* Offer Image */}
              <div className="relative w-28 h-40 flex-shrink-0">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-green-500 text-white">
                    {offer.discount}
                  </Badge>
                </div>
              </div>

              {/* Offer Details */}
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1 leading-tight">
                        {offer.title}
                      </h3>
                      <Badge variant="outline" className="text-xs mb-2">
                        {offer.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {offer.description}
                  </p>

                  {/* Code Display */}
                  <div className="bg-muted/50 rounded-md p-2 mb-2 border border-dashed border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">
                          Promo Code
                        </p>
                        <p className="text-sm font-bold font-mono">
                          {offer.code}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7"
                        onClick={() => handleCopyCode(offer.code)}
                      >
                        {copiedCode === offer.code ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Valid Until */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>Valid until {new Date(offer.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  {/* Terms hint */}
                  <details className="text-xs">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Terms & Conditions
                    </summary>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                      {offer.terms}
                      {offer.minSpend > 0 && ` Minimum spend: ฿${offer.minSpend}.`}
                      {offer.maxDiscount && ` Maximum discount: ฿${offer.maxDiscount}.`}
                    </p>
                  </details>
                </div>

                {/* Action Button */}
                <Button
                  size="sm"
                  className="w-full rounded-full mt-2 h-7 text-xs"
                  onClick={() => router.push("/")}
                >
                  Browse Services
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {offersToShow.length === 0 && (
        <div className="text-center py-12 px-4">
          <Tag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">No offers available</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check back soon for new deals and promotions
          </p>
          <Button onClick={() => router.push("/")}>Browse Services</Button>
        </div>
      )}

      {/* Sticky Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white safe-bottom">
        <div className="max-w-md mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            <Link href="/" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <Home className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Home</span>
            </Link>
            <Link href="/bookings" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <CalendarDays className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Bookings</span>
            </Link>
            <Link href="/offers" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <Tag className="w-6 h-6 text-primary" />
              <span className="text-xs font-medium text-primary">Offers</span>
            </Link>
            <Link href="/gift" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <GiftIcon className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Gift</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <UserIcon className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
