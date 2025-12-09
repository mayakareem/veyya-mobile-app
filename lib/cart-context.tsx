"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
  name: string;
  price: number;
  duration: number;
  category: string;
  subcategory: string;
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

  useEffect(() => {
    const storedCart = localStorage.getItem("veyya_cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("veyya_cart", JSON.stringify(cart));
  }, [cart]);

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
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
