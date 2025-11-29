"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import AppShell from "@/components/layout/AppShell";
import ScreenContainer from "@/components/layout/ScreenContainer";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { getTotalItems } = useCart();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell title="Veyya" showBottomNav>
      <ScreenContainer noPadding>
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-6">
          <h1 className="text-2xl font-bold mb-1">
            Hello, {user?.name?.split(" ")[0] || "there"}! 👋
          </h1>
          <p className="text-muted-foreground">
            What service do you need today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Popular Services</h2>
            <button
              onClick={() => router.push("/explore")}
              className="text-sm text-primary font-medium"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SERVICE_CATEGORIES.slice(0, 4).map((category) => {
              const Icon = category.Icon;
              return (
                <Card
                  key={category.name}
                  className="p-4 cursor-pointer hover:shadow-soft-lg transition-shadow"
                  onClick={() => router.push(`/explore?category=${encodeURIComponent(category.name)}`)}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Featured Deals */}
        <div className="px-4 py-6 bg-secondary/30">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Featured Deals</h2>
          </div>

          <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <Badge className="mb-2 bg-primary">20% OFF</Badge>
            <h3 className="font-semibold mb-1">First Booking Special</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get 20% off on your first service booking with Veyya
            </p>
            <button className="text-sm text-primary font-medium">
              View Offer →
            </button>
          </Card>
        </div>

        {/* Trending Now */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Trending Now</h2>
          </div>

          <div className="space-y-3">
            {[
              { name: "Thai Massage", category: "Wellness", price: "฿1,000" },
              { name: "Gel Manicure", category: "Nails", price: "฿500" },
              { name: "Bridal Makeup", category: "Makeup", price: "฿3,500" },
            ].map((service, idx) => (
              <Card
                key={idx}
                className="p-4 flex items-center justify-between cursor-pointer hover:shadow-soft transition-shadow"
                onClick={() => router.push("/explore")}
              >
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{service.price}</p>
                  <p className="text-xs text-muted-foreground">per session</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ScreenContainer>
    </AppShell>
  );
}
