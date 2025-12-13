"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  Home,
  CalendarDays,
  Tag,
  Gift as GiftIcon,
  User as UserIcon,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample booking data
const UPCOMING_BOOKINGS = [
  {
    id: "1",
    serviceName: "Deep Tissue Massage",
    providerName: "Sarah Chen",
    providerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    date: "2025-12-15",
    time: "10:00 AM",
    duration: 60,
    price: 1200,
    location: "Sukhumvit, Bangkok",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    serviceName: "Bridal Makeup",
    providerName: "Maya Rodriguez",
    providerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    date: "2025-12-20",
    time: "2:00 PM",
    duration: 120,
    price: 3500,
    location: "Client's Home",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    serviceName: "Gel Manicure",
    providerName: "Priya Sharma",
    providerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    date: "2025-12-18",
    time: "3:00 PM",
    duration: 45,
    price: 500,
    location: "Nail Studio, Thonglor",
    status: "pending",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
  },
];

const PAST_BOOKINGS = [
  {
    id: "4",
    serviceName: "Swedish Massage",
    providerName: "Sarah Chen",
    providerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    date: "2025-11-28",
    time: "10:00 AM",
    duration: 60,
    price: 1000,
    location: "Sukhumvit, Bangkok",
    status: "completed",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    serviceName: "Facial Treatment",
    providerName: "Lisa Anderson",
    providerImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop",
    date: "2025-12-01",
    time: "11:00 AM",
    duration: 75,
    price: 1500,
    location: "Spa Center, Asoke",
    status: "completed",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    serviceName: "Hair Styling",
    providerName: "Emma Watson",
    providerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    date: "2025-11-22",
    time: "1:00 PM",
    duration: 60,
    price: 900,
    location: "Hair Salon, Siam",
    status: "completed",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    serviceName: "Pet Grooming",
    providerName: "Nina Patel",
    providerImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
    date: "2025-11-10",
    time: "9:00 AM",
    duration: 90,
    price: 800,
    location: "Pet Spa, Ekkamai",
    status: "cancelled",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop",
  },
];

export default function BookingsPage() {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const bookingsToShow = activeTab === "upcoming" ? UPCOMING_BOOKINGS : PAST_BOOKINGS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Bookings</h1>
            <p className="text-sm text-muted-foreground">Track your appointments</p>
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

      {/* Tabs */}
      <div className="sticky top-[72px] z-10 bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex gap-2 bg-muted/30 p-1 rounded-full">
            <Button
              variant={activeTab === "upcoming" ? "default" : "ghost"}
              className={`flex-1 rounded-full transition-all ${
                activeTab === "upcoming"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted/50 text-muted-foreground"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming ({UPCOMING_BOOKINGS.length})
            </Button>
            <Button
              variant={activeTab === "past" ? "default" : "ghost"}
              className={`flex-1 rounded-full transition-all ${
                activeTab === "past"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted/50 text-muted-foreground"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past ({PAST_BOOKINGS.length})
            </Button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {bookingsToShow.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No {activeTab} bookings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {activeTab === "upcoming"
                ? "Book a service to get started"
                : "Your past bookings will appear here"}
            </p>
            {activeTab === "upcoming" && (
              <Button onClick={() => router.push("/")}>Browse Services</Button>
            )}
          </div>
        ) : (
          bookingsToShow.map((booking) => (
            <Card key={booking.id} className="overflow-hidden border-border/50">
              <div className="flex gap-3 p-4">
                {/* Service Image */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={booking.image}
                    alt={booking.serviceName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Booking Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{booking.serviceName}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  {/* Provider Info */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={booking.providerImage}
                        alt={booking.providerName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{booking.providerName}</span>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{booking.time}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{booking.location}</span>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-primary">฿{booking.price}</span>
                    {activeTab === "upcoming" ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Reschedule
                        </Button>
                        <Button size="sm" className="text-xs">
                          View Details
                        </Button>
                      </div>
                    ) : booking.status === "completed" ? (
                      <Button size="sm" variant="outline" className="text-xs">
                        Book Again
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Sticky Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white safe-bottom">
        <div className="max-w-md mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            <Link href="/" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <Home className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Home</span>
            </Link>
            <Link href="/bookings" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <CalendarDays className="w-6 h-6 text-primary" />
              <span className="text-xs font-medium text-primary">Bookings</span>
            </Link>
            <Link href="/offers" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <Tag className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Offers</span>
            </Link>
            <Link href="/gift" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <GiftIcon className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Gift</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]">
              <UserIcon className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
