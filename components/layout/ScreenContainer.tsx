import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function ScreenContainer({
  children,
  className,
  noPadding = false,
}: ScreenContainerProps) {
  return (
    <div className={cn(
      "min-h-full",
      !noPadding && "px-4 py-6",
      className
    )}>
      {children}
    </div>
  );
}
