"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import AppShell from "@/components/layout/AppShell";
import ScreenContainer from "@/components/layout/ScreenContainer";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { items, getTotalPrice } = useCart();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <AppShell title="Cart" backButton>
        <ScreenContainer>
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Add services to your cart to continue"
            action={{
              label: "Browse Services",
              onClick: () => router.push("/explore"),
            }}
          />
        </ScreenContainer>
      </AppShell>
    );
  }

  return (
    <AppShell title="Cart" backButton showBottomNav={false}>
      <ScreenContainer>
        <div className="flex-1">
          {/* Cart items would go here */}
          <p className="text-center text-muted-foreground">
            {items.length} item(s) in cart
          </p>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4 safe-bottom">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold text-primary">
              ฿{getTotalPrice().toLocaleString()}
            </span>
          </div>
          <Button
            size="lg"
            className="w-full h-12"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      </ScreenContainer>
    </AppShell>
  );
}
