"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gift as GiftIcon,
  Copy,
  Check,
  Share2,
  Users,
  Sparkles,
  Home,
  CalendarDays,
  Tag,
  User as UserIcon,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function GiftPage() {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const [copied, setCopied] = useState(false);

  // Generate unique referral code (in real app, this would come from backend)
  const referralCode = "VEYYA-GIFT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const shareUrl = `https://veyya.com/join/${referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Get 15% off your first Veyya service!",
          text: `Use my code ${referralCode} to get 15% off your first booking on Veyya. I'll get 15% off too!`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      handleCopyCode();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gift Veyya</h1>
            <p className="text-sm text-muted-foreground">Share the love, earn rewards</p>
          </div>
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
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-6">
        {/* Hero Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-white border-primary/20">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <GiftIcon className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Give 15%, Get 15%</h2>
              <p className="text-sm text-muted-foreground">
                Share your unique code with friends. When they book their first service,
                you both get 15% off!
              </p>
            </div>
          </div>
        </Card>

        {/* Your Unique Code */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Your Unique Code
              </p>
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 mb-3">
                <p className="text-2xl font-bold text-primary tracking-wider">
                  {referralCode}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this code with friends and family
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                onClick={handleCopyCode}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
              <Button
                className="flex-1 rounded-full"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </Card>

        {/* How It Works */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            How It Works
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Share Your Code</p>
                <p className="text-xs text-muted-foreground">
                  Send your unique code to friends via WhatsApp, LINE, or any messaging app
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">They Book a Service</p>
                <p className="text-xs text-muted-foreground">
                  Your friend uses your code when booking their first service
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">You Both Save!</p>
                <p className="text-xs text-muted-foreground">
                  They get 15% off their first booking, and you get 15% off your next booking
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Rewards Summary */}
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-900 mb-1">
                Your Rewards
              </p>
              <p className="text-xs text-green-700">
                Total friends referred
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-xs text-green-700">friends</p>
            </div>
          </div>
        </Card>

        {/* Terms */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Terms & Conditions:</strong> Discount applies to first booking only for new users.
            15% discount has a maximum value of ฿500. Cannot be combined with other offers.
            Both referrer and referee must complete their bookings to receive rewards.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to book your next service?
          </p>
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => router.push("/")}
          >
            Browse Services
          </Button>
        </div>
      </div>

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
              <Tag className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Offers</span>
            </Link>
            <Link href="/gift" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <GiftIcon className="w-6 h-6 text-primary" />
              <span className="text-xs font-medium text-primary">Gift</span>
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
