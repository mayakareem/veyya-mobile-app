"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Veyya
          </h1>
          <p className="text-muted-foreground">Welcome! How would you like to continue?</p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-4">
          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary group"
            onClick={() => router.push("/login/user")}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">I'm a Client</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Book trusted services from verified providers
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <span>Continue as Client</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary group"
            onClick={() => router.push("/login/provider")}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">I'm a Service Provider</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Grow your business and reach more customers
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <span>Continue as Provider</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
