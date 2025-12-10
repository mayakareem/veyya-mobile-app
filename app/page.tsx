"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import Image from "next/image";
import AISearchBar from "@/components/search/AISearchBar";
import PopularServices from "@/components/home/PopularServices";
import { SERVICE_CATEGORIES } from "@/lib/constants/categories";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function MobileAppHome() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/hub/user");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Mobile App Hero */}
      <section className="px-4 pt-8 pb-6">
        <div className="text-center space-y-4 max-w-md mx-auto">
          <div className="inline-block">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Veyya
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            Book trusted services,<br />fast.
          </h1>
          <p className="text-sm text-muted-foreground px-4">
            Real availability, transparent pricing, and vetted providers right to your door.
          </p>
        </div>

        {/* Quick Features */}
        <div className="grid grid-cols-4 gap-3 mt-6 max-w-md mx-auto">
          {[
            { icon: "✓", label: "Verified" },
            { icon: "⚡", label: "Instant" },
            { icon: "⭐", label: "Top Rated" },
            { icon: "🔒", label: "Secure" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-border/50">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs font-medium text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Search */}
      <section className="px-4 pb-6">
        <div className="max-w-md mx-auto">
          <AISearchBar />
        </div>
      </section>

      {/* Popular Services - Mobile Horizontal Scroll */}
      <section className="pb-6">
        <div className="px-4 mb-3">
          <h2 className="text-lg font-semibold">Popular Services</h2>
        </div>
        <div className="px-4">
          <PopularServices />
        </div>
      </section>

      {/* Categories - Mobile Grid */}
      <section className="px-4 pb-6">
        <div className="mb-3">
          <h2 className="text-lg font-semibold">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = category.Icon;
            return (
              <Link
                key={category.name}
                href={`/category/${encodeURIComponent(category.name)}`}
                className="bg-white rounded-2xl p-4 border border-border/50 active:scale-95 transition-transform"
              >
                <Icon className="w-8 h-8 mb-2 text-primary" />
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works - Mobile Compact */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">How Veyya Works</h2>
            <p className="text-sm text-muted-foreground">Three simple steps</p>
          </div>

          <div className="space-y-4">
            {[
              { num: "1", title: "Search & Browse", desc: "Find verified providers near you" },
              { num: "2", title: "Book Instantly", desc: "See real-time availability and book in seconds" },
              { num: "3", title: "Enjoy & Review", desc: "Get premium service and share your experience" },
            ].map((step) => (
              <div key={step.num} className="flex gap-4 bg-white rounded-2xl p-4 border border-border/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.num}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button size="lg" className="rounded-full px-8" onClick={() => router.push("/auth/register")}>
              Start Booking Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Partners - Mobile Horizontal Scroll */}
      <section className="py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              Premium Partners
            </div>
            <h2 className="text-xl font-bold">Brand Collaborations</h2>
          </div>

          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
              {[
                { href: "/collaborations/loreal", img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=80&fit=crop", name: "L'Oréal" },
                { href: "/collaborations/opi", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=80&fit=crop", name: "OPI" },
                { href: "/collaborations/aveda", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=80&fit=crop", name: "Aveda" },
                { href: "/collaborations/dermalogica", img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=80&fit=crop", name: "Dermalogica" },
                { href: "/collaborations/ghd", img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200&h=80&fit=crop", name: "ghd" },
                { href: "/collaborations/kerastase", img: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200&h=80&fit=crop", name: "Kérastase" },
              ].map((brand) => (
                <Link
                  key={brand.href}
                  href={brand.href}
                  className="flex-shrink-0 w-32 bg-white rounded-2xl p-4 border border-border/50 active:scale-95 transition-transform"
                >
                  <div className="h-16 flex items-center justify-center mb-2 grayscale">
                    <Image
                      src={brand.img}
                      alt={brand.name}
                      width={80}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold text-center">{brand.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bundled Vouchers - Mobile Cards */}
      <section className="py-8 px-4 bg-gradient-to-b from-muted/20 to-transparent">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">Exclusive Bundles</h2>
            <p className="text-sm text-muted-foreground">Save more with our packages</p>
          </div>

          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
              {[
                { color: "from-pink-100 to-purple-100", badge: "bg-pink-500", save: "25%", title: "Beauty Complete", items: "Manicure + Pedicure + Facial", old: "฿3,500", new: "฿2,625", accent: "text-pink-600" },
                { color: "from-blue-100 to-cyan-100", badge: "bg-blue-500", save: "20%", title: "Hair Luxury", items: "Cut + Color + Treatment", old: "฿4,000", new: "฿3,200", accent: "text-blue-600" },
                { color: "from-green-100 to-emerald-100", badge: "bg-green-500", save: "30%", title: "Wellness Week", items: "4 Massages + 2 Yoga", old: "฿5,000", new: "฿3,500", accent: "text-green-600" },
                { color: "from-orange-100 to-amber-100", badge: "bg-orange-500", save: "15%", title: "Pet Pamper", items: "Grooming + Bath + Nails", old: "฿2,000", new: "฿1,700", accent: "text-orange-600" },
                { color: "from-purple-100 to-pink-100", badge: "bg-purple-500", save: "35%", title: "Full Spa Day", items: "Massage + Facial + Scrub", old: "฿6,000", new: "฿3,900", accent: "text-purple-600" },
              ].map((voucher, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-72 bg-gradient-to-br ${voucher.color} rounded-3xl p-5 border border-border/50`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`${voucher.badge} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                      SAVE {voucher.save}
                    </div>
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{voucher.title}</h4>
                  <p className="text-xs text-muted-foreground mb-4">{voucher.items}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-muted-foreground line-through">{voucher.old}</span>
                    <span className={`text-2xl font-bold ${voucher.accent}`}>{voucher.new}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Mobile Compact */}
      <section className="py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">What Customers Say</h2>
            <p className="text-sm text-muted-foreground">Thousands of happy users</p>
          </div>

          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
              {[
                { name: "Sarah M.", location: "Bangkok", initial: "SM", review: "Amazing service! The groomer was professional and caring for my Golden Retriever." },
                { name: "Preeti K.", location: "Sukhumvit", initial: "PK", review: "Love seeing real availability upfront. No more back-and-forth calls!" },
                { name: "James L.", location: "Silom", initial: "JL", review: "Finding a reliable house cleaner was so easy. Quality has been excellent." },
                { name: "Araya N.", location: "Thonglor", initial: "AN", review: "As a busy professional, Veyya has been a lifesaver. Everything comes to me!" },
                { name: "Maria C.", location: "Sathorn", initial: "MC", review: "The verification process gives me peace of mind every time I book." },
              ].map((review, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-72 bg-white rounded-2xl p-5 border border-border/50"
                >
                  <div className="flex items-center gap-1 text-yellow-500 mb-3">
                    {'⭐'.repeat(5)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{review.review}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-sm">
                      {review.initial}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press Mentions - Mobile Compact */}
      <section className="py-6 px-4 bg-muted/20">
        <div className="max-w-md mx-auto">
          <p className="text-xs text-center text-muted-foreground mb-4">Featured in</p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {["TechCrunch", "Forbes", "Bangkok Post", "Tech in Asia"].map((press) => (
              <div key={press} className="text-sm font-semibold text-muted-foreground/60 grayscale">
                {press}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-4 py-8 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-md mx-auto space-y-3">
          <Button
            size="lg"
            className="w-full h-14 text-base rounded-full"
            onClick={() => router.push("/auth/register")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full h-14 text-base rounded-full"
            onClick={() => router.push("/auth/login")}
          >
            Sign In
          </Button>
          <p className="text-center text-xs text-muted-foreground pt-2">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link> &{" "}
            <Link href="/privacy" className="underline">Privacy</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
