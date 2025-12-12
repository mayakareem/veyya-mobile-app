"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Calendar,
  Clock,
  Home as HomeIcon,
  MapPin,
  CreditCard,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  CalendarDays,
  Tag,
  Gift as GiftIcon,
  Home,
  ArrowLeft,
} from "lucide-react";

type CheckoutStep = "review" | "datetime" | "address" | "payment";

interface SavedAddress {
  id: string;
  label: string;
  address: string;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Generate time slots
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 20) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export default function CartPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, updateQuantity, getTotalPrice, getTotalDuration } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("review");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Saved addresses
  const [savedAddresses] = useState<SavedAddress[]>([
    {
      id: "1",
      label: "Home",
      address: "123 Sukhumvit Road, Khlong Toei, Bangkok 10110",
    },
    {
      id: "2",
      label: "Work",
      address: "456 Silom Road, Silom, Bangrak, Bangkok 10500",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    district: "",
    city: "Bangkok",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "promptpay">("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const totalPrice = getTotalPrice();
  const totalDuration = getTotalDuration();
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    return date < today;
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const canGoToPrevMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    const todayMonth = new Date(today.getFullYear(), today.getMonth());
    return prevMonth >= todayMonth;
  };

  const handleDateTimeConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }
    setCurrentStep("address");
  };

  const handleAddressConfirm = () => {
    if (!selectedAddressId && !showNewAddressForm) {
      alert("Please select or add an address");
      return;
    }
    if (
      showNewAddressForm &&
      (!newAddress.street || !newAddress.district || !newAddress.postalCode)
    ) {
      alert("Please fill in all address fields");
      return;
    }
    setCurrentStep("payment");
  };

  const handlePaymentConfirm = () => {
    if (paymentMethod === "card") {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill in all card details");
        return;
      }
    }

    // Navigate to confirmation
    router.push("/confirmation");
  };

  const getSelectedAddress = () => {
    if (selectedAddressId) {
      return savedAddresses.find((addr) => addr.id === selectedAddressId);
    }
    if (showNewAddressForm && newAddress.street) {
      return {
        ...newAddress,
        address: `${newAddress.street}, ${newAddress.district}, ${newAddress.city} ${newAddress.postalCode}`,
      };
    }
    return null;
  };

  const steps = [
    { key: "review", label: "Review", icon: ShoppingBag },
    { key: "datetime", label: "Date & Time", icon: Calendar },
    { key: "address", label: "Address", icon: HomeIcon },
    { key: "payment", label: "Payment", icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);
  const days = getDaysInMonth(currentMonth);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="p-2 hover:bg-muted/50 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <p className="text-sm text-muted-foreground">Your selected services</p>
              </div>
            </div>
          </div>
        </header>

        {/* Empty State */}
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Add some services to get started
          </p>
          <Button size="lg" className="rounded-full" onClick={() => router.push("/")}>
            Browse Services
          </Button>
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
                <CalendarDays className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Bookings</span>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 hover:bg-muted/50 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p className="text-sm text-muted-foreground">
                {cart.length} {cart.length === 1 ? "service" : "services"} • ฿
                {grandTotal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = index < currentStepIndex;
            const isCurrent = step.key === currentStep;

            return (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center min-w-[60px]">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isCurrent
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <p
                    className={`text-[10px] mt-1.5 font-medium text-center ${
                      isCurrent ? "text-primary" : isCompleted ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-1 ${
                      index < currentStepIndex ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pb-4 space-y-4">
        {/* Step 1: Review Cart */}
        {currentStep === "review" && (
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.name} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex gap-3 mb-3">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-primary/40" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.duration} min • ฿{item.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => removeFromCart(item.name)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-primary">
                        ฿{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => updateQuantity(item.name, 0)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Summary Card */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">฿{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee (5%)</span>
                  <span className="font-medium">฿{serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Duration</span>
                  <span className="font-medium">{totalDuration} min</span>
                </div>
                <div className="border-t border-primary/20 pt-2 flex justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">฿{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Button size="lg" className="w-full rounded-full" onClick={() => setCurrentStep("datetime")}>
              Continue to Date & Time
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {currentStep === "datetime" && (
          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                Select Date
              </h2>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                    )
                  }
                  disabled={!canGoToPrevMonth()}
                  className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-semibold">
                  {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                    )
                  }
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar */}
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-7 bg-muted/30">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day} className="text-center text-xs font-medium py-2 text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                  {days.map((date, index) => {
                    const disabled = isDateDisabled(date);
                    const selected = isSameDay(date, selectedDate);
                    const isToday = date && isSameDay(date, today);

                    return (
                      <button
                        key={index}
                        onClick={() => !disabled && setSelectedDate(date)}
                        disabled={disabled}
                        className={`aspect-square p-2 text-sm border-b border-r transition-all ${
                          disabled
                            ? "text-muted-foreground/30 cursor-not-allowed bg-muted/20"
                            : "hover:bg-muted/50 cursor-pointer"
                        } ${selected ? "!bg-primary text-primary-foreground font-bold" : ""} ${
                          isToday && !selected ? "border-2 border-primary" : ""
                        }`}
                      >
                        {date ? date.getDate() : ""}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xs font-semibold text-green-700">Selected Date</div>
                  <div className="text-sm text-green-600">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                Select Time
              </h3>

              {!selectedDate ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Please select a date first</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                    {TIME_SLOTS.map((time) => {
                      const selected = time === selectedTime;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 px-2 text-sm rounded-lg border transition-all ${
                            selected
                              ? "!bg-primary text-primary-foreground border-primary font-semibold"
                              : "hover:bg-muted hover:border-primary/50"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {selectedTime && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-xs font-semibold text-green-700">Selected Time</div>
                      <div className="text-sm text-green-600">{selectedTime}</div>
                    </div>
                  )}
                </>
              )}
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setCurrentStep("review")}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button
                className="flex-1 rounded-full"
                onClick={handleDateTimeConfirm}
                disabled={!selectedDate || !selectedTime}
              >
                Continue to Address
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Address Selection */}
        {currentStep === "address" && (
          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <HomeIcon className="w-5 h-5 text-primary" />
                Service Address
              </h2>

              <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
                <div className="space-y-3">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedAddressId === address.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => {
                        setSelectedAddressId(address.id);
                        setShowNewAddressForm(false);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value={address.id} id={address.id} className="mt-0.5" />
                        <div className="flex-1">
                          <Label htmlFor={address.id} className="font-medium cursor-pointer text-sm">
                            {address.label}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {address.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <Button
                variant="outline"
                className="w-full mt-3 rounded-full"
                onClick={() => {
                  setShowNewAddressForm(!showNewAddressForm);
                  setSelectedAddressId("");
                }}
              >
                {showNewAddressForm ? "Cancel" : "+ Add New Address"}
              </Button>

              {showNewAddressForm && (
                <div className="mt-3 p-4 border rounded-lg space-y-3 bg-muted/20">
                  <div className="space-y-2">
                    <Label htmlFor="new-street" className="text-xs">Street Address *</Label>
                    <Input
                      id="new-street"
                      placeholder="123 Sukhumvit Road, Apt 45"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      className="text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="new-district" className="text-xs">District *</Label>
                      <Input
                        id="new-district"
                        placeholder="Watthana"
                        value={newAddress.district}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, district: e.target.value })
                        }
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-postal" className="text-xs">Postal Code *</Label>
                      <Input
                        id="new-postal"
                        placeholder="10110"
                        value={newAddress.postalCode}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, postalCode: e.target.value })
                        }
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-city" className="text-xs">City *</Label>
                    <Input
                      id="new-city"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Selected Summary */}
            {(selectedDate || getSelectedAddress()) && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <h3 className="text-sm font-semibold mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  {selectedDate && selectedTime && (
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          at {selectedTime}
                        </p>
                      </div>
                    </div>
                  )}
                  {getSelectedAddress() && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Service Location</p>
                        <p className="text-xs text-muted-foreground">
                          {getSelectedAddress()?.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setCurrentStep("datetime")}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button
                className="flex-1 rounded-full"
                onClick={handleAddressConfirm}
                disabled={!selectedAddressId && (!showNewAddressForm || !newAddress.street)}
              >
                Continue to Payment
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {currentStep === "payment" && (
          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </h2>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as "card" | "promptpay")}
              >
                <div className="space-y-3">
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      paymentMethod === "card" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="font-medium cursor-pointer text-sm">
                        Credit / Debit Card
                      </Label>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      paymentMethod === "promptpay"
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setPaymentMethod("promptpay")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="promptpay" id="promptpay" />
                      <Label htmlFor="promptpay" className="font-medium cursor-pointer text-sm">
                        PromptPay
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="card-number" className="text-xs">Card Number *</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-name" className="text-xs">Cardholder Name *</Label>
                    <Input
                      id="card-name"
                      placeholder="JOHN DOE"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      className="text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="card-expiry" className="text-xs">Expiry Date *</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-cvv" className="text-xs">CVV *</Label>
                      <Input
                        id="card-cvv"
                        placeholder="123"
                        type="password"
                        maxLength={3}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "promptpay" && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700">
                    You will receive a PromptPay QR code after placing your order
                  </p>
                </div>
              )}
            </Card>

            {/* Final Summary */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <h3 className="text-sm font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                {selectedDate && selectedTime && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-xs">Date & Time</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {selectedTime}
                      </p>
                    </div>
                  </div>
                )}
                {getSelectedAddress() && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-xs">Location</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {getSelectedAddress()?.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-primary/20 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>฿{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>฿{serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1.5 border-t border-primary/20">
                  <span>Total</span>
                  <span className="text-primary">฿{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setCurrentStep("address")}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button className="flex-1 rounded-full" onClick={handlePaymentConfirm}>
                Complete Order
                <CheckCircle2 className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
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
              <CalendarDays className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Bookings</span>
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
