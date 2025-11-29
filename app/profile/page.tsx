"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AppShell from "@/components/layout/AppShell";
import ScreenContainer from "@/components/layout/ScreenContainer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, CreditCard, Bell, HelpCircle, LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const menuItems = [
    { icon: User, label: "Edit Profile", path: "/profile/edit" },
    { icon: CreditCard, label: "Payment Methods", path: "/profile/payments" },
    { icon: Bell, label: "Notifications", path: "/profile/notifications" },
    { icon: HelpCircle, label: "Help & Support", path: "/profile/help" },
  ];

  return (
    <AppShell title="Profile" showBottomNav>
      <ScreenContainer>
        {/* Profile Header */}
        <Card className="p-6 mb-6 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold mb-1">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.path}
                className="p-4 cursor-pointer hover:shadow-soft transition-shadow flex items-center justify-between"
                onClick={() => router.push(item.path)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Card>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button
          variant="destructive"
          size="lg"
          className="w-full h-12"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Version 1.0.0
        </p>
      </ScreenContainer>
    </AppShell>
  );
}
