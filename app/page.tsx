"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Clock, Shield } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Top Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <Logo className="text-6xl mb-4" />
        <p className="text-xl text-muted-foreground mb-12">
          Premium home services at your doorstep
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
          {[
            { icon: Sparkles, text: "Verified Pros" },
            { icon: Clock, text: "Instant Booking" },
            { icon: Heart, text: "Top Rated" },
            { icon: Shield, text: "Secure Payment" },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-soft">
                <Icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 space-y-3 safe-bottom">
        <Button
          size="lg"
          className="w-full h-14 text-base"
          onClick={() => router.push("/auth/login")}
        >
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full h-14 text-base"
          onClick={() => router.push("/auth/register")}
        >
          Create Account
        </Button>
        <p className="text-center text-xs text-muted-foreground pt-2">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
