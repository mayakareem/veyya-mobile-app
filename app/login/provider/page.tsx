"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building,
  User,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  Upload,
  Check,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function ProviderLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1: Business Info
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");

  // Step 2: Personal Info
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // Step 3: Service Location
  const [serviceArea, setServiceArea] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [mobileService, setMobileService] = useState(false);

  // Step 4: Services
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [serviceDescription, setServiceDescription] = useState("");

  // Step 5: Documents
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [certifications, setCertifications] = useState<File[]>([]);

  // Step 6: Banking
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const serviceCategories = [
    "Hair Styling",
    "Makeup",
    "Nails",
    "Massage",
    "Facial",
    "Waxing",
    "Pet Grooming",
    "House Cleaning",
    "Personal Training",
    "Yoga",
  ];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate onboarding submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await login("provider@email.com", "password", "provider");
      router.push("/hub/provider");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const canContinueStep = () => {
    switch (step) {
      case 1:
        return businessName && businessType && yearsInBusiness;
      case 2:
        return fullName && phoneNumber && email;
      case 3:
        return serviceArea && businessAddress;
      case 4:
        return selectedCategories.length > 0 && serviceDescription;
      case 5:
        return idDocument && businessLicense;
      case 6:
        return bankName && accountNumber && accountName;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white p-4 pb-24">
      <div className="max-w-md mx-auto">
        {/* Progress Bar */}
        <div className="mb-8 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 6</span>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
              Cancel
            </Link>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Business Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Building className="w-12 h-12 mx-auto text-primary" />
              <h1 className="text-2xl font-bold">Business Information</h1>
              <p className="text-muted-foreground">Tell us about your business</p>
            </div>

            <Card className="p-6 space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Your Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Input
                  id="businessType"
                  placeholder="e.g., Salon, Spa, Freelancer"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                <Input
                  id="yearsInBusiness"
                  type="number"
                  placeholder="Number of years"
                  value={yearsInBusiness}
                  onChange={(e) => setYearsInBusiness(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => setStep(2)}
                disabled={!canContinueStep()}
              >
                Continue
              </Button>
            </Card>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <User className="w-12 h-12 mx-auto text-primary" />
              <h1 className="text-2xl font-bold">Personal Information</h1>
              <p className="text-muted-foreground">Your contact details</p>
            </div>

            <Card className="p-6 space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+66 XX XXX XXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setStep(3)}
                  disabled={!canContinueStep()}
                >
                  Continue
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Service Location */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 mx-auto text-primary" />
              <h1 className="text-2xl font-bold">Service Location</h1>
              <p className="text-muted-foreground">Where do you provide services?</p>
            </div>

            <Card className="p-6 space-y-4">
              <div>
                <Label htmlFor="serviceArea">Service Area *</Label>
                <Input
                  id="serviceArea"
                  placeholder="e.g., Bangkok, Sukhumvit"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="businessAddress">Business Address *</Label>
                <Textarea
                  id="businessAddress"
                  placeholder="Full business address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="mobileService"
                  checked={mobileService}
                  onChange={(e) => setMobileService(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="mobileService" className="cursor-pointer">
                  I provide mobile/at-home services
                </Label>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setStep(4)}
                  disabled={!canContinueStep()}
                >
                  Continue
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 4: Services */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Briefcase className="w-12 h-12 mx-auto text-primary" />
              <h1 className="text-2xl font-bold">Your Services</h1>
              <p className="text-muted-foreground">What services do you offer?</p>
            </div>

            <Card className="p-6 space-y-4">
              <div>
                <Label>Select Categories *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {serviceCategories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategories.includes(category) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => toggleCategory(category)}
                      className="justify-start"
                    >
                      {selectedCategories.includes(category) && (
                        <Check className="w-4 h-4 mr-1" />
                      )}
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="serviceDescription">Service Description *</Label>
                <Textarea
                  id="serviceDescription"
                  placeholder="Describe your services, experience, and what makes you unique..."
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setStep(5)}
                  disabled={!canContinueStep()}
                >
                  Continue
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 5: Documents */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <FileText className="w-12 h-12 mx-auto text-primary" />
              <h1 className="text-2xl font-bold">Verification Documents</h1>
              <p className="text-muted-foreground">Upload required documents</p>
            </div>

            <Card className="p-6 space-y-4">
              <div>
                <Label htmlFor="idDocument">Government ID *</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="idDocument"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, setIdDocument)}
                    className="hidden"
                  />
                  <label htmlFor="idDocument" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    {idDocument ? (
                      <p className="text-sm font-medium text-primary">
                        ✓ {idDocument.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm font-medium">Upload ID</p>
                        <p className="text-xs text-muted-foreground">
                          Passport, Driver's License, or National ID
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="businessLicense">Business License *</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="businessLicense"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, setBusinessLicense)}
                    className="hidden"
                  />
                  <label htmlFor="businessLicense" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    {businessLicense ? (
                      <p className="text-sm font-medium text-primary">
                        ✓ {businessLicense.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm font-medium">Upload License</p>
                        <p className="text-xs text-muted-foreground">
                          Business registration or operating permit
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(4)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setStep(6)}
                  disabled={!canContinueStep()}
                >
                  Continue
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 6: Banking Info */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <DollarSign className="w-12 h-12 mx-auto text-primary" />
              <h1 className="text-2xl font-bold">Banking Information</h1>
              <p className="text-muted-foreground">For receiving payments</p>
            </div>

            <Card className="p-6 space-y-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  placeholder="e.g., Bangkok Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  placeholder="Your bank account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="accountName">Account Name *</Label>
                <Input
                  id="accountName"
                  placeholder="Name as it appears on bank account"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  🔒 Your banking information is encrypted and secure. Payments are
                  processed weekly.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(5)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={!canContinueStep() || loading}
                >
                  {loading ? "Submitting..." : "Complete Registration"}
                </Button>
              </div>
            </Card>

            <div className="text-center text-xs text-muted-foreground">
              <p>
                By completing registration, you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
