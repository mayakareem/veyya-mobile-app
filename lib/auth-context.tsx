"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for stored auth on mount (client-side only)
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("veyya_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsInitialized(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = {
      id: "1",
      name: "Demo User",
      email,
      avatar: undefined,
    };

    setUser(mockUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("veyya_user", JSON.stringify(mockUser));
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = {
      id: "1",
      name,
      email,
      avatar: undefined,
    };

    setUser(mockUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("veyya_user", JSON.stringify(mockUser));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("veyya_user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  // During SSR or if provider is not available, return safe defaults
  if (context === undefined) {
    // Only throw error in development on client-side
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.warn("useAuth is being used outside of AuthProvider");
    }

    // Return safe default values
    return {
      user: null,
      isAuthenticated: false,
      login: async () => {},
      register: async () => {},
      logout: () => {},
    };
  }

  return context;
}
