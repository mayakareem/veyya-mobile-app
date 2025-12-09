"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import ScreenContainer from "@/components/layout/ScreenContainer";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { DETAILED_SERVICES } from "@/lib/constants/categories";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export default function CategoryDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const categoryName = decodeURIComponent(resolvedParams.name);
  const { cart, addToCart, removeFromCart, getItemQuantity } = useCart();

  const [petTypeFilter, setPetTypeFilter] = useState<"all" | "dog" | "cat">("all");

  // Get category
  const category = SERVICE_CATEGORIES.find(c => c.name === categoryName);
  const services = DETAILED_SERVICES[categoryName] || [];

  // Filter pet care services by type
  let filteredServices = services;
  if (categoryName === "Pet Care" && petTypeFilter !== "all") {
    filteredServices = services.filter(service => {
      const lowerName = service.name.toLowerCase();
      if (petTypeFilter === "dog") {
        return lowerName.includes("dog") ||
               lowerName.includes("walking") ||
               lowerName.includes("training") ||
               (!lowerName.includes("cat") && lowerName.includes("sitting"));
      }
      if (petTypeFilter === "cat") {
        return lowerName.includes("cat") ||
               (!lowerName.includes("dog") && lowerName.includes("sitting"));
      }
      return true;
    });
  }

  if (!category) {
    return (
      <AppShell title="Category" backButton>
        <ScreenContainer>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Category not found</p>
            <Button onClick={() => router.back()} className="mt-4">
              Go Back
            </Button>
          </div>
        </ScreenContainer>
      </AppShell>
    );
  }

  const Icon = category.Icon;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppShell title={category.name} backButton>
      <ScreenContainer noPadding>
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{category.name}</h1>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          </div>
          <Badge variant="secondary" className="mt-2">
            {filteredServices.length} services available
          </Badge>
        </div>

        {/* Pet Type Filter */}
        {categoryName === "Pet Care" && (
          <div className="px-4 py-3 bg-muted/30 border-b">
            <div className="flex gap-2">
              <Button
                variant={petTypeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setPetTypeFilter("all")}
              >
                All Pets
              </Button>
              <Button
                variant={petTypeFilter === "dog" ? "default" : "outline"}
                size="sm"
                onClick={() => setPetTypeFilter("dog")}
              >
                Dogs
              </Button>
              <Button
                variant={petTypeFilter === "cat" ? "default" : "outline"}
                size="sm"
                onClick={() => setPetTypeFilter("cat")}
              >
                Cats
              </Button>
            </div>
          </div>
        )}

        {/* Services List */}
        <div className="px-4 py-4 space-y-3 pb-24">
          {filteredServices.map((service, idx) => {
            const quantity = getItemQuantity(service.name);
            const cartItem = {
              name: service.name,
              price: service.price,
              duration: service.duration,
              category: categoryName,
              subcategory: category.name,
              description: service.description,
            };

            return (
              <Card key={idx} className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{service.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {service.duration} min
                      </div>
                      <div className="font-semibold text-primary">
                        ฿{service.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Add/Remove Buttons */}
                  {quantity === 0 ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        addToCart(cartItem);
                        toast.success("Added to cart");
                      }}
                      className="h-8"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1 bg-primary/10 rounded-lg p-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(service.name)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center font-semibold text-sm">
                        {quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          addToCart(cartItem);
                          toast.success("Added to cart");
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Floating Cart Button */}
        {cartItemCount > 0 && (
          <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 pointer-events-none">
            <Button
              size="lg"
              className="w-full pointer-events-auto shadow-lg h-14"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              View Cart ({cartItemCount})
            </Button>
          </div>
        )}
      </ScreenContainer>
    </AppShell>
  );
}
