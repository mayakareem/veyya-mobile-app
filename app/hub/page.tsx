"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function HubPage() {
  const router = useRouter();
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (role === "provider") {
      router.push("/hub/provider");
    } else {
      router.push("/");
    }
  }, [role, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
