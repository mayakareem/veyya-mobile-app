"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Bell, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  title?: string;
  backButton?: boolean;
  showActions?: boolean;
  cartCount?: number;
}

export default function TopBar({
  title,
  backButton = false,
  showActions = true,
  cartCount = 0
}: TopBarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border safe-top">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2 flex-1">
          {backButton && (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          <h1 className="text-xl font-bold text-foreground truncate">
            {title || "Veyya"}
          </h1>
        </div>

        {showActions && (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center px-1 bg-primary text-white text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
