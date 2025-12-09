"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import AppShell from "@/components/layout/AppShell";
import ScreenContainer from "@/components/layout/ScreenContainer";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Plus, Minus, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { cart, addToCart, removeFromCart, clearCart, getTotalPrice } = useCart();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (cart.length === 0) {
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

  const totalPrice = getTotalPrice();
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

  return (
    <AppShell title="Cart" backButton showBottomNav={false}>
      <ScreenContainer noPadding>
        <div className="flex-1 px-4 py-4 space-y-3">
          {cart.map((item) => (
            <Card key={item.name} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {item.category} • {item.subcategory}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {item.duration} min
                    </div>
                    <div className="font-semibold text-sm text-primary">
                      ฿{item.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-primary/10 rounded-lg p-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        removeFromCart(item.name);
                        if (item.quantity === 1) {
                          toast.success("Removed from cart");
                        }
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        addToCart(item);
                        toast.success("Updated quantity");
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Total for this item */}
              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Item total:</span>
                <span className="font-semibold">
                  ฿{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="border-t bg-white p-4 pb-6 safe-bottom space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">฿{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee (5%)</span>
              <span className="font-medium">฿{serviceFee.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-primary">
                ฿{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full h-12"
            onClick={() => {
              // TODO: Navigate to checkout
              toast.info("Checkout coming soon!");
            }}
          >
            Proceed to Checkout
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="w-full"
            onClick={() => {
              clearCart();
              toast.success("Cart cleared");
              router.push("/explore");
            }}
          >
            Clear Cart
          </Button>
        </div>
      </ScreenContainer>
    </AppShell>
  );
}
