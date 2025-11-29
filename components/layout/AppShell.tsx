"use client";

import { ReactNode } from "react";
import TopBar from "./TopBar";
import BottomTabNav from "./BottomTabNav";

interface AppShellProps {
  children: ReactNode;
  showHeader?: boolean;
  showBottomNav?: boolean;
  title?: string;
  backButton?: boolean;
}

export default function AppShell({
  children,
  showHeader = true,
  showBottomNav = true,
  title,
  backButton = false,
}: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-background">
      {showHeader && <TopBar title={title} backButton={backButton} />}

      <main className="flex-1 overflow-y-auto hide-scrollbar pb-safe-bottom">
        {children}
      </main>

      {showBottomNav && <BottomTabNav />}
    </div>
  );
}
