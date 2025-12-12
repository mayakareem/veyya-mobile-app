"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
  name: string;
  price: number;
  duration: number;
  category?: string;
  subcategory?: string;
  description: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  items: CartItem[]; // Alias for backwards compatibility
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (name: string) => void;
  getItemQuantity: (name: string) => number;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  // Legacy aliases
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load cart from localStorage on mount (client-side only)
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("veyya_cart");
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes (client-side only)
    if (typeof window !== "undefined" && isInitialized) {
      localStorage.setItem("veyya_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.name !== name);
    });
  };

  const getItemQuantity = (name: string) => {
    const item = cart.find((i) => i.name === name);
    return item?.quantity || 0;
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Legacy aliases for backwards compatibility
  const addItem = addToCart;
  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.name !== id));
  };
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.name === id ? { ...i, quantity } : i))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        items: cart, // Alias
        addToCart,
        removeFromCart,
        getItemQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        // Legacy aliases
        addItem,
        removeItem,
        updateQuantity,
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
      items: [],
      addToCart: () => {},
      removeFromCart: () => {},
      getItemQuantity: () => 0,
      clearCart: () => {},
      getTotalItems: () => 0,
      getTotalPrice: () => 0,
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
    };
  }

  return context;
}
