"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  CalendarDays,
  Tag,
  Gift as GiftIcon,
  User as UserIcon,
  ChevronRight,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  MessageCircle,
  Phone,
  Mail,
  Edit,
  Award,
  Star,
  ShoppingBag,
  Camera,
  Heart,
  Lock,
  Download,
  Info,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample user data - in real app this would come from auth context
const USER_DATA = {
  name: "Sarah Johnson",
  email: "sarah.johnson@gmail.com",
  phone: "+66 81 234 5678",
  photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  memberSince: "2024-01-15",
  totalBookings: 12,
  favorites: 5,
  savedAddresses: [
    {
      id: "1",
      type: "Home",
      address: "123 Sukhumvit Road, Khlong Toei, Bangkok 10110",
      isDefault: true,
    },
    {
      id: "2",
      type: "Work",
      address: "456 Silom Road, Silom, Bangrak, Bangkok 10500",
      isDefault: false,
    },
  ],
  paymentMethods: [
    {
      id: "1",
      type: "Credit Card",
      last4: "4242",
      brand: "Visa",
      isDefault: true,
    },
    {
      id: "2",
      type: "Credit Card",
      last4: "5555",
      brand: "Mastercard",
      isDefault: false,
    },
  ],
  giftCardBalance: 500,
  loyaltyPoints: 450,
};

// App version check
const APP_VERSION: string = "2.1.0";
const LATEST_VERSION: string = "2.2.0"; // This would come from API in real app
const HAS_UPDATE: boolean = APP_VERSION !== LATEST_VERSION;

export default function ProfilePage() {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const [showAddresses, setShowAddresses] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const handlePhotoUpload = () => {
    // In real app, this would trigger file upload
    alert("Photo upload functionality - integrate with your backend");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Account</h1>
            <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg flex-shrink-0 relative"
            onClick={() => router.push("/cart")}
          >
            <ShoppingBag className="w-5 h-5" />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-3 space-y-3">
        {/* App Update Banner - Compact */}
        {HAS_UPDATE && (
          <div className="bg-primary text-white rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <div>
                <p className="font-semibold text-xs">Update Available - v{LATEST_VERSION}</p>
              </div>
            </div>
            <Button size="sm" variant="secondary" className="rounded-full h-7 text-xs px-3">
              Update
            </Button>
          </div>
        )}
        {/* Profile Header - Compact */}
        <Card className="p-3">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 flex-shrink-0">
              {USER_DATA.photo ? (
                <Image
                  src={USER_DATA.photo}
                  alt={USER_DATA.name}
                  fill
                  className="rounded-full object-cover ring-2 ring-primary/20"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                  <span className="text-2xl font-bold text-primary">
                    {USER_DATA.name.charAt(0)}
                  </span>
                </div>
              )}
              <button
                onClick={handlePhotoUpload}
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold truncate">{USER_DATA.name}</h2>
              <p className="text-xs text-muted-foreground truncate">{USER_DATA.email}</p>
              <p className="text-xs text-muted-foreground">{USER_DATA.phone}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full h-8 px-3"
              onClick={() => router.push("/profile/edit")}
            >
              <Edit className="w-3 h-3" />
            </Button>
          </div>
        </Card>

        {/* Stats - Inline Compact */}
        <div className="flex gap-2">
          <Card className="flex-1 p-2 text-center">
            <div className="flex items-center justify-center gap-1">
              <CalendarDays className="w-3 h-3 text-primary" />
              <span className="text-lg font-bold text-primary">{USER_DATA.totalBookings}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Bookings</p>
          </Card>
          <Card className="flex-1 p-2 text-center">
            <div className="flex items-center justify-center gap-1">
              <Award className="w-3 h-3 text-primary" />
              <span className="text-lg font-bold text-primary">{USER_DATA.loyaltyPoints}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Points</p>
          </Card>
          <Card className="flex-1 p-2 text-center">
            <div className="flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 text-primary" />
              <span className="text-lg font-bold text-primary">{USER_DATA.favorites}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Favorites</p>
          </Card>
        </div>

        {/* Account Management - Compact List */}
        <Card className="divide-y">
          <div
            className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
            onClick={() => router.push("/profile/information")}
          >
            <div className="flex items-center gap-2.5">
              <UserCircle className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Profile Information</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
            onClick={() => router.push("/profile/favorites")}
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Favorites</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{USER_DATA.favorites}</Badge>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </Card>

        {/* Saved Addresses - Compact */}
        <Card className="overflow-hidden">
          <div
            className="px-3 py-2.5 cursor-pointer flex items-center justify-between hover:bg-muted/20 transition-colors"
            onClick={() => setShowAddresses(!showAddresses)}
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Addresses</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{USER_DATA.savedAddresses.length}</Badge>
              <ChevronRight
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  showAddresses ? "rotate-90" : ""
                }`}
              />
            </div>
          </div>
          {showAddresses && (
            <div className="border-t border-border/50 bg-muted/5 p-2 space-y-2">
              {USER_DATA.savedAddresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white rounded-md p-2 border border-border/30"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium">{address.type}</p>
                      {address.isDefault && (
                        <Badge className="text-[10px] px-1 py-0 h-3.5 bg-green-500">
                          Default
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="h-5 text-[10px] px-2">
                      Edit
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    {address.address}
                  </p>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full rounded-full h-7 text-xs">
                + Add Address
              </Button>
            </div>
          )}
        </Card>

        {/* Payment Methods - Compact */}
        <Card className="overflow-hidden">
          <div
            className="px-3 py-2.5 cursor-pointer flex items-center justify-between hover:bg-muted/20 transition-colors"
            onClick={() => setShowPayments(!showPayments)}
          >
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Payment Details</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{USER_DATA.paymentMethods.length}</Badge>
              <ChevronRight
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  showPayments ? "rotate-90" : ""
                }`}
              />
            </div>
          </div>
          {showPayments && (
            <div className="border-t border-border/50 bg-muted/5 p-2 space-y-2">
              {USER_DATA.paymentMethods.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-white rounded-md p-2 border border-border/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium">
                        {payment.brand} •••• {payment.last4}
                      </p>
                      {payment.isDefault && (
                        <Badge className="text-[10px] px-1 py-0 h-3.5 bg-green-500">
                          Default
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="h-5 text-[10px] px-2">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full rounded-full h-7 text-xs">
                + Add Card
              </Button>
            </div>
          )}
        </Card>

        {/* Gift Card - Compact */}
        <Card
          className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
          onClick={() => router.push("/profile/gift-card")}
        >
          <div className="flex items-center gap-2.5">
            <GiftIcon className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium">Gift Card</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] h-4 px-1.5">฿{USER_DATA.giftCardBalance}</Badge>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>

        {/* Settings - Compact List */}
        <Card className="divide-y">
          <div
            className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
            onClick={() => router.push("/profile/notifications")}
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Notifications</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
            onClick={() => router.push("/profile/security")}
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Password & Security</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
            onClick={() => router.push("/profile/account-info")}
          >
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Account Information</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
            onClick={() => router.push("/profile/settings")}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">General Settings</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>

        {/* Help & Support - Compact List */}
        <Card className="divide-y">
          <div
            className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
            onClick={() => window.open("https://line.me/ti/p/~veyya", "_blank")}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-sm font-medium">Contact via LINE</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
            onClick={() => window.open("https://wa.me/66123456789", "_blank")}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-sm font-medium">Contact via WhatsApp</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className="px-3 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors flex items-center justify-between"
            onClick={() => router.push("/help")}
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Help Center</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>

        {/* Logout Button - Compact */}
        <Button
          variant="destructive"
          size="lg"
          className="w-full rounded-full h-10"
          onClick={() => {
            // In real app: logout();
            router.push("/");
          }}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>

        {/* App Version Info */}
        <div className="text-center py-4 space-y-1">
          <p className="text-xs text-muted-foreground">
            Member since {new Date(USER_DATA.memberSince).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-xs text-muted-foreground">
            App Version {APP_VERSION}
          </p>
        </div>
      </div>

      {/* Sticky Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white safe-bottom border-t">
        <div className="max-w-md mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]"
            >
              <Home className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Home</span>
            </Link>
            <Link
              href="/bookings"
              className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]"
            >
              <CalendarDays className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                Bookings
              </span>
            </Link>
            <Link
              href="/offers"
              className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]"
            >
              <Tag className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Offers</span>
            </Link>
            <Link
              href="/gift"
              className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]"
            >
              <GiftIcon className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Gift</span>
            </Link>
            <Link
              href="/profile"
              className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]"
            >
              <UserIcon className="w-6 h-6 text-primary" />
              <span className="text-xs font-medium text-primary">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
