"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Home, Briefcase, Plus, CreditCard, X, Check } from "lucide-react";
import Link from "next/link";

type AddressType = "home" | "work" | "other";

interface Address {
  id: string;
  type: AddressType;
  label: string;
  address: string;
}

export default function UserLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1: Name
  const [name, setName] = useState("");

  // Step 2: Addresses
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [currentLocation, setCurrentLocation] = useState("Sukhumvit, Bangkok");
  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddressType, setNewAddressType] = useState<AddressType>("home");
  const [newAddressLabel, setNewAddressLabel] = useState("");
  const [newAddressText, setNewAddressText] = useState("");

  // Auto-add home address based on location
  useEffect(() => {
    if (addresses.length === 0 && currentLocation) {
      setAddresses([
        {
          id: "1",
          type: "home",
          label: "Home",
          address: currentLocation,
        },
      ]);
    }
  }, []);

  const handleAddAddress = () => {
    if (!newAddressLabel || !newAddressText) return;

    const newAddress: Address = {
      id: Date.now().toString(),
      type: newAddressType,
      label: newAddressLabel,
      address: newAddressText,
    };

    setAddresses([...addresses, newAddress]);
    setAddingAddress(false);
    setNewAddressLabel("");
    setNewAddressText("");
  };

  const handleRemoveAddress = (id: string) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter((addr) => addr.id !== id));
    }
  };

  const handleContinueToPayment = () => {
    setStep(3);
  };

  const handleSkipPayment = async () => {
    setLoading(true);
    try {
      await login("demo@email.com", "password", "user");
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = async () => {
    setLoading(true);
    try {
      // Simulate payment setup
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await login("demo@email.com", "password", "user");
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAddressIcon = (type: AddressType) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />;
      case "work":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white p-4 pb-24">
      <div className="max-w-md mx-auto">
        {/* Progress Bar */}
        <div className="mb-8 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 3</span>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
              Cancel
            </Link>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Name */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">What's your name?</h1>
              <p className="text-muted-foreground">Let's get to know you better</p>
            </div>

            <Card className="p-6 space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => setStep(2)}
                disabled={!name.trim()}
              >
                Continue
              </Button>
            </Card>
          </div>
        )}

        {/* Step 2: Addresses */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Save your addresses</h1>
              <p className="text-muted-foreground">
                At least one address is required
              </p>
            </div>

            <div className="space-y-3">
              {addresses.map((addr) => (
                <Card key={addr.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {getAddressIcon(addr.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{addr.label}</span>
                        {addr.id === "1" && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                            Auto-selected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{addr.address}</p>
                    </div>
                    {addresses.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                        onClick={() => handleRemoveAddress(addr.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}

              {addingAddress ? (
                <Card className="p-4 space-y-3">
                  <div>
                    <Label>Address Type</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant={newAddressType === "home" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewAddressType("home")}
                      >
                        <Home className="w-4 h-4 mr-1" />
                        Home
                      </Button>
                      <Button
                        variant={newAddressType === "work" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewAddressType("work")}
                      >
                        <Briefcase className="w-4 h-4 mr-1" />
                        Work
                      </Button>
                      <Button
                        variant={newAddressType === "other" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewAddressType("other")}
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        Other
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="label">Label</Label>
                    <Input
                      id="label"
                      placeholder="e.g., Home, Office, Mom's House"
                      value={newAddressLabel}
                      onChange={(e) => setNewAddressLabel(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter full address"
                      value={newAddressText}
                      onChange={(e) => setNewAddressText(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setAddingAddress(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleAddAddress}
                      disabled={!newAddressLabel || !newAddressText}
                    >
                      Add Address
                    </Button>
                  </div>
                </Card>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setAddingAddress(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Address
                </Button>
              )}
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleContinueToPayment}
              disabled={addresses.length === 0}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Add payment method</h1>
              <p className="text-muted-foreground">
                Secure and fast checkout for your bookings
              </p>
            </div>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <CreditCard className="w-8 h-8 text-primary" />
                <div className="flex-1">
                  <p className="font-semibold">Credit or Debit Card</p>
                  <p className="text-sm text-muted-foreground">
                    Visa, Mastercard, Amex accepted
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" type="text" placeholder="123" className="mt-2" />
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleAddPayment}
                disabled={loading}
              >
                {loading ? "Setting up..." : "Add Payment Method"}
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={handleSkipPayment}
                disabled={loading}
              >
                Skip for now
              </Button>
            </Card>

            <div className="text-center text-xs text-muted-foreground">
              <p>🔒 Your payment information is secure and encrypted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
