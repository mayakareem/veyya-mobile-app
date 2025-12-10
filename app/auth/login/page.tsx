"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/lib/auth-context";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, User, Briefcase } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, role);
      router.push("/hub");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center h-14 px-4 border-b safe-top">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <Logo className="text-4xl mb-2" />
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-muted-foreground mb-8">
          Sign in to continue booking premium services
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex items-center gap-2 justify-center p-4 rounded-xl border-2 transition-all ${
                  role === "user"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white"
                }`}
              >
                <User className={`w-5 h-5 ${role === "user" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-medium text-sm ${role === "user" ? "text-primary" : "text-foreground"}`}>
                  Customer
                </span>
              </button>
              <button
                type="button"
                onClick={() => setRole("provider")}
                className={`flex items-center gap-2 justify-center p-4 rounded-xl border-2 transition-all ${
                  role === "provider"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white"
                }`}
              >
                <Briefcase className={`w-5 h-5 ${role === "provider" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-medium text-sm ${role === "provider" ? "text-primary" : "text-foreground"}`}>
                  Provider
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <button
            type="button"
            className="text-sm text-primary font-medium"
          >
            Forgot Password?
          </button>

          <Button
            type="submit"
            size="lg"
            className="w-full h-12"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-sm text-muted-foreground">
            Don't have an account?{" "}
          </span>
          <button
            onClick={() => router.push("/auth/register")}
            className="text-sm text-primary font-medium"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
