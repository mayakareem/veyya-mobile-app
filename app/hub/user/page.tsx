"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  ShoppingBag,
  Calendar,
  User as UserIcon,
  LogOut,
  Search
} from "lucide-react";
import Link from "next/link";

export default function UserHubPage() {
  const router = useRouter();
  const { isAuthenticated, user, role, logout } = useAuth();
  const { getTotalItems } = useCart();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    } else if (role === "provider") {
      router.push("/hub/provider");
    }
  }, [isAuthenticated, role, router]);

  if (!isAuthenticated || role !== "user") {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-border/50 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <p className="text-xs text-muted-foreground">Welcome back</p>
            <h1 className="text-lg font-bold">{user?.name || "User"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={() => router.push("/cart")}
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className="px-4 pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <Link href="/search">
            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-border/50 shadow-sm">
              <Search className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search for services...</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 pb-6">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
          <Link href="/bookings">
            <Card className="p-4 hover:shadow-md transition-shadow border-border/50">
              <Calendar className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">My Bookings</h3>
              <p className="text-xs text-muted-foreground mt-1">View & manage</p>
            </Card>
          </Link>
          <Link href="/profile">
            <Card className="p-4 hover:shadow-md transition-shadow border-border/50">
              <UserIcon className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">Profile</h3>
              <p className="text-xs text-muted-foreground mt-1">Settings & info</p>
            </Card>
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 pb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold">Trending Services</h2>
          </div>
          <div className="bg-gradient-to-br from-primary/10 via-purple-50/50 to-pink-50/50 rounded-3xl p-5 border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <Badge className="bg-primary text-white">HOT</Badge>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Deep Tissue Massage</h3>
            <p className="text-sm text-muted-foreground mb-4">60-min professional massage at your doorstep</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">฿1,200</span>
              <Button size="sm" className="rounded-full">Book Now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="px-4 pb-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-base font-semibold mb-3">Browse Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {SERVICE_CATEGORIES.slice(0, 6).map((category) => {
              const Icon = category.Icon;
              return (
                <Link
                  key={category.name}
                  href={`/category/${encodeURIComponent(category.name)}`}
                >
                  <Card className="p-4 hover:shadow-md transition-shadow border-border/50">
                    <Icon className="w-6 h-6 text-primary mb-2" />
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {category.description}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <Link href="/explore">
              <Button variant="outline" className="rounded-full">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
