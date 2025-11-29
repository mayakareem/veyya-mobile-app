"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AppShell from "@/components/layout/AppShell";
import ScreenContainer from "@/components/layout/ScreenContainer";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams?.get("category") || null
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const filteredCategories = selectedCategory
    ? SERVICE_CATEGORIES.filter((cat) => cat.name === selectedCategory)
    : SERVICE_CATEGORIES;

  const searchFiltered = searchQuery
    ? filteredCategories.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredCategories;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell title="Explore" showBottomNav>
      <ScreenContainer>
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Categories */}
        <div className="space-y-3">
          {searchFiltered.map((category) => {
            const Icon = category.Icon;
            return (
              <Card
                key={category.name}
                className="p-4 cursor-pointer hover:shadow-soft-lg transition-shadow"
                onClick={() => router.push(`/explore/category/${encodeURIComponent(category.name)}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {category.services.slice(0, 3).map((service, idx) => (
                        <span key={idx} className="text-xs text-muted-foreground">
                          {service}
                          {idx < 2 && idx < category.services.length - 1 && " •"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScreenContainer>
    </AppShell>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
