"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ServiceDetail } from "@/lib/constants/categories";

export type CartItem = ServiceDetail & {
  quantity: number;
  bookingDate?: string; // ISO date string
  bookingTime?: string; // Time slot like "09:00"
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (service: ServiceDetail, bookingDate?: string, bookingTime?: string) => void;
  removeFromCart: (serviceName: string) => void;
  updateQuantity: (serviceName: string, quantity: number) => void;
  updateBookingDetails: (serviceName: string, bookingDate: string, bookingTime: string) => void;
  clearCart: () => void;
  getItemQuantity: (serviceName: string) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalDuration: () => number;
  getPrimaryService: () => CartItem | undefined;
  getSecondaryServices: () => CartItem[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize on mount (client-side only)
    if (typeof window !== "undefined") {
      setIsInitialized(true);
    }
  }, []);

  const addToCart = (service: ServiceDetail, bookingDate?: string, bookingTime?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === service.name);
      if (existing) {
        return prev.map((item) =>
          item.name === service.name
            ? { ...item, quantity: item.quantity + 1, bookingDate, bookingTime }
            : item
        );
      }
      return [...prev, { ...service, quantity: 1, bookingDate, bookingTime }];
    });
  };

  const updateBookingDetails = (serviceName: string, bookingDate: string, bookingTime: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === serviceName
          ? { ...item, bookingDate, bookingTime }
          : item
      )
    );
  };

  const removeFromCart = (serviceName: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === serviceName);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((item) =>
          item.name === serviceName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return prev.filter((item) => item.name !== serviceName);
    });
  };

  const updateQuantity = (serviceName: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.name !== serviceName));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.name === serviceName ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (serviceName: string) => {
    const item = cart.find((item) => item.name === serviceName);
    return item?.quantity || 0;
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalDuration = () => {
    return cart.reduce((sum, item) => sum + (item.duration * item.quantity), 0);
  };

  const getPrimaryService = () => {
    return cart.length > 0 ? cart[0] : undefined;
  };

  const getSecondaryServices = () => {
    return cart.length > 1 ? cart.slice(1) : [];
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateBookingDetails,
        clearCart,
        getItemQuantity,
        getTotalItems,
        getTotalPrice,
        getTotalDuration,
        getPrimaryService,
        getSecondaryServices,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  // During SSR or if provider is not available, return safe defaults
  if (context === undefined) {
    // Only throw error in development on client-side
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.warn("useCart is being used outside of CartProvider");
    }

    // Return safe default values
    return {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      updateBookingDetails: () => {},
      clearCart: () => {},
      getItemQuantity: () => 0,
      getTotalItems: () => 0,
      getTotalPrice: () => 0,
      getTotalDuration: () => 0,
      getPrimaryService: () => undefined,
      getSecondaryServices: () => [],
    };
  }

  return context;
}
