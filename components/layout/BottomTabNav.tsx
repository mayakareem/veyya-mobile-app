"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Search, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: Calendar, label: "Bookings", path: "/bookings" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomTabNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="sticky bottom-0 bg-white border-t border-border safe-bottom shadow-soft-lg">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.path || pathname?.startsWith(tab.path + "/");

          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn(
                "text-xs",
                isActive && "font-semibold"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
