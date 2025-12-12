"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
const APP_VERSION = "2.1.0";
const LATEST_VERSION = "2.2.0"; // This would come from API in real app
const HAS_UPDATE = APP_VERSION !== LATEST_VERSION;

export default function ProfilePage() {
  const router = useRouter();
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
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">My Account</h1>
          <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
        </div>
      </header>

      {/* App Update Banner */}
      {HAS_UPDATE && (
        <div className="max-w-md mx-auto px-4 pt-4">
          <Card className="bg-primary text-white border-0 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <div>
                  <p className="font-semibold text-sm">Update Available</p>
                  <p className="text-xs opacity-90">Version {LATEST_VERSION} is ready</p>
                </div>
              </div>
              <Button size="sm" variant="secondary" className="rounded-full">
                Update
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Profile Header Card with Photo */}
        <Card className="p-6 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            {USER_DATA.photo ? (
              <Image
                src={USER_DATA.photo}
                alt={USER_DATA.name}
                fill
                className="rounded-full object-cover ring-4 ring-primary/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-primary/20">
                <span className="text-3xl font-bold text-primary">
                  {USER_DATA.name.charAt(0)}
                </span>
              </div>
            )}
            <button
              onClick={handlePhotoUpload}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-xl font-bold mb-1">{USER_DATA.name}</h2>
          <p className="text-sm text-muted-foreground mb-1">{USER_DATA.email}</p>
          <p className="text-sm text-muted-foreground">{USER_DATA.phone}</p>
          <Button
            size="sm"
            variant="outline"
            className="mt-4 rounded-full"
            onClick={() => router.push("/profile/edit")}
          >
            <Edit className="w-3 h-3 mr-2" />
            Edit Profile
          </Button>
        </Card>

        {/* Stats Card */}
        <Card className="p-4">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold text-primary">{USER_DATA.totalBookings}</span>
              </div>
              <p className="text-xs text-muted-foreground">Bookings</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold text-primary">{USER_DATA.loyaltyPoints}</span>
              </div>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold text-primary">{USER_DATA.favorites}</span>
              </div>
              <p className="text-xs text-muted-foreground">Favorites</p>
            </div>
          </div>
        </Card>

        {/* Account Management */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
            Account Management
          </h3>
          <div className="space-y-2">
            {/* Profile Information */}
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
              onClick={() => router.push("/profile/information")}
            >
              <div className="flex items-center gap-3">
                <UserCircle className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Profile Information</p>
                  <p className="text-xs text-muted-foreground">Update your name, email, and phone</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            {/* Favorites */}
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
              onClick={() => router.push("/profile/favorites")}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Favorites</p>
                  <p className="text-xs text-muted-foreground">{USER_DATA.favorites} saved providers & services</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          </div>
        </div>

        {/* Saved Addresses */}
        <Card className="overflow-hidden">
          <div
            className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/20 transition-colors"
            onClick={() => setShowAddresses(!showAddresses)}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Addresses</p>
                <p className="text-xs text-muted-foreground">
                  {USER_DATA.savedAddresses.length} saved addresses
                </p>
              </div>
            </div>
            <ChevronRight
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                showAddresses ? "rotate-90" : ""
              }`}
            />
          </div>
          {showAddresses && (
            <div className="border-t border-border/50 bg-muted/5 p-4 space-y-3">
              {USER_DATA.savedAddresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white rounded-lg p-3 border border-border/50"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{address.type}</p>
                      {address.isDefault && (
                        <Badge className="text-xs px-1.5 py-0 h-4 bg-green-500">
                          Default
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 text-xs">
                      Edit
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {address.address}
                  </p>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full rounded-full">
                + Add New Address
              </Button>
            </div>
          )}
        </Card>

        {/* Payment Methods */}
        <Card className="overflow-hidden">
          <div
            className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/20 transition-colors"
            onClick={() => setShowPayments(!showPayments)}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Payment Details</p>
                <p className="text-xs text-muted-foreground">
                  {USER_DATA.paymentMethods.length} saved cards
                </p>
              </div>
            </div>
            <ChevronRight
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                showPayments ? "rotate-90" : ""
              }`}
            />
          </div>
          {showPayments && (
            <div className="border-t border-border/50 bg-muted/5 p-4 space-y-3">
              {USER_DATA.paymentMethods.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-white rounded-lg p-3 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {payment.brand} •••• {payment.last4}
                      </p>
                      {payment.isDefault && (
                        <Badge className="text-xs px-1.5 py-0 h-4 bg-green-500">
                          Default
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 text-xs">
                      Edit
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{payment.type}</p>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full rounded-full">
                + Add New Card
              </Button>
            </div>
          )}
        </Card>

        {/* Gift Card */}
        <Card
          className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
          onClick={() => router.push("/profile/gift-card")}
        >
          <div className="flex items-center gap-3">
            <GiftIcon className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Gift Card</p>
              <p className="text-xs text-muted-foreground">Balance: ฿{USER_DATA.giftCardBalance}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Card>

        {/* Settings Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
            Settings
          </h3>
          <div className="space-y-2">
            {/* Notifications */}
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
              onClick={() => router.push("/profile/notifications")}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">Manage push & email alerts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            {/* Password & Security */}
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
              onClick={() => router.push("/profile/security")}
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Password & Security</p>
                  <p className="text-xs text-muted-foreground">Change password & security settings</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            {/* Account Information */}
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
              onClick={() => router.push("/profile/account-info")}
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Account Information</p>
                  <p className="text-xs text-muted-foreground">View account details & history</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            {/* General Settings */}
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
              onClick={() => router.push("/profile/settings")}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">General Settings</p>
                  <p className="text-xs text-muted-foreground">Language, region & preferences</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          </div>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
            Help & Support
          </h3>
          <div className="space-y-2">
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
              onClick={() => window.open("https://line.me/ti/p/~veyya", "_blank")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-medium block">Contact via LINE</span>
                  <span className="text-xs text-muted-foreground">
                    Chat with us on LINE
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
              onClick={() => window.open("https://wa.me/66123456789", "_blank")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-medium block">Contact via WhatsApp</span>
                  <span className="text-xs text-muted-foreground">
                    Message us on WhatsApp
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-between"
              onClick={() => router.push("/help")}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Help Center</p>
                  <p className="text-xs text-muted-foreground">FAQs & support articles</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="destructive"
          size="lg"
          className="w-full rounded-full h-12"
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
