"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  LogOut,
  Settings,
  Package,
  Clock,
  Users,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function ProviderHubPage() {
  const router = useRouter();
  const { isAuthenticated, user, role, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    } else if (role === "user") {
      router.push("/hub/user");
    }
  }, [isAuthenticated, role, router]);

  if (!isAuthenticated || role !== "provider") {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Mock stats
  const stats = {
    todayBookings: 3,
    weekRevenue: "฿12,450",
    rating: 4.8,
    completedJobs: 127,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-border/50 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <p className="text-xs text-muted-foreground">Provider Dashboard</p>
            <h1 className="text-lg font-bold">{user?.name || "Provider"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.push("/provider")}
            >
              <Settings className="w-5 h-5" />
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

      {/* Stats Overview */}
      <section className="px-4 pt-6 pb-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Today's Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-blue-200/50">
              <Calendar className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-blue-900">{stats.todayBookings}</p>
              <p className="text-xs text-blue-700">Bookings Today</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50/50 to-green-100/50 border-green-200/50">
              <DollarSign className="w-5 h-5 text-green-600 mb-2" />
              <p className="text-2xl font-bold text-green-900">{stats.weekRevenue}</p>
              <p className="text-xs text-green-700">This Week</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-yellow-50/50 to-yellow-100/50 border-yellow-200/50">
              <Star className="w-5 h-5 text-yellow-600 mb-2" />
              <p className="text-2xl font-bold text-yellow-900">{stats.rating}</p>
              <p className="text-xs text-yellow-700">Average Rating</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50/50 to-purple-100/50 border-purple-200/50">
              <CheckCircle2 className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-2xl font-bold text-purple-900">{stats.completedJobs}</p>
              <p className="text-xs text-purple-700">Completed</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 pb-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/provider/bookings">
              <Card className="p-4 hover:shadow-md transition-shadow border-border/50 bg-white">
                <Calendar className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-sm">Bookings</h3>
                <p className="text-xs text-muted-foreground mt-1">Manage schedule</p>
              </Card>
            </Link>
            <Link href="/provider/calendar">
              <Card className="p-4 hover:shadow-md transition-shadow border-border/50 bg-white">
                <Clock className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-sm">Availability</h3>
                <p className="text-xs text-muted-foreground mt-1">Set your hours</p>
              </Card>
            </Link>
            <Link href="/provider/services">
              <Card className="p-4 hover:shadow-md transition-shadow border-border/50 bg-white">
                <Package className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-sm">Services</h3>
                <p className="text-xs text-muted-foreground mt-1">Edit offerings</p>
              </Card>
            </Link>
            <Link href="/provider">
              <Card className="p-4 hover:shadow-md transition-shadow border-border/50 bg-white">
                <Users className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold text-sm">Profile</h3>
                <p className="text-xs text-muted-foreground mt-1">View public page</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Bookings */}
      <section className="px-4 pb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground">Upcoming Bookings</h2>
            <Link href="/provider/bookings">
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </Link>
          </div>

          {/* Mock booking card */}
          <Card className="p-4 mb-3 border-border/50 bg-white">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-sm">Deep Tissue Massage</p>
                <p className="text-xs text-muted-foreground">Sarah Martinez</p>
              </div>
              <Badge className="bg-green-500/10 text-green-700 border-green-500/20">Confirmed</Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Today, 2:00 PM</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>฿1,200</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/50 bg-white">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-sm">Gel Manicure</p>
                <p className="text-xs text-muted-foreground">Preeti Kapoor</p>
              </div>
              <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20">Pending</Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Tomorrow, 10:00 AM</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>฿800</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Performance Insights */}
      <section className="px-4 pb-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground">This Month</h2>
          <Card className="p-5 bg-gradient-to-br from-primary/5 via-purple-50/50 to-pink-50/50 border-border/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-primary">฿48,650</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold">42</p>
                <p className="text-xs text-muted-foreground">Bookings</p>
              </div>
              <div>
                <p className="text-lg font-bold">98%</p>
                <p className="text-xs text-muted-foreground">Completion</p>
              </div>
              <div>
                <p className="text-lg font-bold">4.8</p>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
