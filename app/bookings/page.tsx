"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AppShell from "@/components/layout/AppShell";
import ScreenContainer from "@/components/layout/ScreenContainer";
import EmptyState from "@/components/common/EmptyState";
import { Calendar } from "lucide-react";

export default function BookingsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell title="My Bookings" showBottomNav>
      <ScreenContainer>
        <EmptyState
          icon={Calendar}
          title="No bookings yet"
          description="Browse services and make your first booking to get started"
          action={{
            label: "Explore Services",
            onClick: () => router.push("/explore"),
          }}
        />
      </ScreenContainer>
    </AppShell>
  );
}
