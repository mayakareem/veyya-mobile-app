"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AppShell from "@/components/layout/AppShell";
import ScreenContainer from "@/components/layout/ScreenContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, FileText, Activity, Heart } from "lucide-react";
import { getHealthcareServiceDetail } from "@/lib/constants/healthcareDetails";
import { getPetCareServiceDetail } from "@/lib/constants/petCareDetails";
import { DETAILED_SERVICES } from "@/lib/constants/categories";
import { toast } from "sonner";

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const serviceId = decodeURIComponent(resolvedParams.id);

  // Try to get detailed service info
  const healthcareDetail = getHealthcareServiceDetail(serviceId);
  const petCareDetail = getPetCareServiceDetail(serviceId);

  // States for dynamic pricing (Pet Care)
  const [dogSize, setDogSize] = useState<"small" | "medium" | "large">("small");
  const [catHairType, setCatHairType] = useState<"short" | "long">("short");

  const isHealthcare = !!healthcareDetail;
  const isPetCare = !!petCareDetail;

  // Check if this service needs size/hair selection
  const needsSizeSelection = serviceId === "basic-grooming-dog" ||
    serviceId === "full-grooming-dog" ||
    serviceId === "bath-blow-dry-dog";

  const needsHairSelection = serviceId === "basic-grooming-cat" ||
    serviceId === "full-grooming-cat" ||
    serviceId === "bath-blow-dry-cat";

  // Calculate dynamic price
  const getAdjustedPrice = () => {
    if (!petCareDetail) return 0;
    const basePrice = petCareDetail.price;

    if (needsSizeSelection) {
      const sizeMultipliers = { small: 1, medium: 1.5, large: 2 };
      return Math.round(basePrice * sizeMultipliers[dogSize]);
    }

    if (needsHairSelection) {
      const hairMultipliers = { short: 1, long: 1.6 };
      return Math.round(basePrice * hairMultipliers[catHairType]);
    }

    return basePrice;
  };

  if (!isHealthcare && !isPetCare) {
    // Try to find in general services
    const allServices = Object.values(DETAILED_SERVICES).flat();
    const service = allServices.find(s =>
      s.name.toLowerCase().replace(/\s+/g, '-') === serviceId.toLowerCase() ||
      s.name === serviceId
    );

    if (service) {
      return (
        <AppShell title={service.name} backButton>
          <ScreenContainer noPadding>
            <div className="px-4 py-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{service.name}</h1>
                <p className="text-muted-foreground">{service.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">Duration</div>
                  <div className="font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.duration} min
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">Price</div>
                  <div className="font-semibold text-primary text-lg">
                    ฿{service.price.toLocaleString()}
                  </div>
                </Card>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  toast.info("Booking coming soon!");
                }}
              >
                Book Now
              </Button>
            </div>
          </ScreenContainer>
        </AppShell>
      );
    }

    return (
      <AppShell title="Service" backButton>
        <ScreenContainer>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Service not found</p>
            <Button onClick={() => router.back()} className="mt-4">
              Go Back
            </Button>
          </div>
        </ScreenContainer>
      </AppShell>
    );
  }

  return (
    <AppShell title={isHealthcare ? healthcareDetail.name : petCareDetail!.name} backButton>
      <ScreenContainer noPadding>
        {/* Healthcare Detail */}
        {isHealthcare && healthcareDetail && (
          <div className="pb-24">
            {/* Header with Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-green-100">
              {healthcareDetail.image && (
                <Image
                  src={healthcareDetail.image}
                  alt={healthcareDetail.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="px-4 py-4">
              <h1 className="text-2xl font-bold mb-2">{healthcareDetail.name}</h1>
              <p className="text-muted-foreground mb-4">{healthcareDetail.shortDescription}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Card className="p-3">
                  <div className="text-xs text-muted-foreground mb-1">Duration</div>
                  <div className="font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {healthcareDetail.duration} min
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="text-xs text-muted-foreground mb-1">Price</div>
                  <div className="font-semibold text-primary text-lg">
                    ฿{(healthcareDetail.price / 100).toFixed(2)}
                  </div>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                  <TabsTrigger value="procedure" className="text-xs">Steps</TabsTrigger>
                  <TabsTrigger value="benefits" className="text-xs">Benefits</TabsTrigger>
                  <TabsTrigger value="prep" className="text-xs">Prep</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        About This Service
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{healthcareDetail.fullDescription}</p>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">What's Included:</h4>
                        <ul className="space-y-1">
                          {healthcareDetail.whatIsIncluded.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="procedure" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">How It Works</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-0">
                        {healthcareDetail.procedure.map((step, index) => (
                          <div key={index} className="flex gap-3 py-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs">
                              {index + 1}
                            </div>
                            <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="benefits" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Heart className="w-4 h-4 text-primary" />
                        Key Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {healthcareDetail.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="prep" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Preparation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {healthcareDetail.preparation.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t safe-bottom">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  toast.info("Booking coming soon!");
                }}
              >
                Book Appointment - ฿{(healthcareDetail.price / 100).toFixed(2)}
              </Button>
            </div>
          </div>
        )}

        {/* Pet Care Detail */}
        {isPetCare && petCareDetail && (
          <div className="pb-24">
            {/* Header with Image */}
            <div className="relative h-48">
              <Image
                src={petCareDetail.image}
                alt={petCareDetail.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="px-4 py-4">
              <h1 className="text-2xl font-bold mb-2">{petCareDetail.name}</h1>
              <p className="text-muted-foreground mb-4">{petCareDetail.shortDescription}</p>

              {/* Size/Hair Selection */}
              {needsSizeSelection && (
                <Card className="p-4 mb-4">
                  <h3 className="font-semibold text-sm mb-3">Select Dog Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={dogSize === "small" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDogSize("small")}
                    >
                      Small
                    </Button>
                    <Button
                      variant={dogSize === "medium" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDogSize("medium")}
                    >
                      Medium
                    </Button>
                    <Button
                      variant={dogSize === "large" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDogSize("large")}
                    >
                      Large
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Small: &lt;10kg • Medium: 10-25kg • Large: &gt;25kg
                  </p>
                </Card>
              )}

              {needsHairSelection && (
                <Card className="p-4 mb-4">
                  <h3 className="font-semibold text-sm mb-3">Select Hair Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={catHairType === "short" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCatHairType("short")}
                    >
                      Short Hair
                    </Button>
                    <Button
                      variant={catHairType === "long" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCatHairType("long")}
                    >
                      Long Hair
                    </Button>
                  </div>
                </Card>
              )}

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Card className="p-3">
                  <div className="text-xs text-muted-foreground mb-1">Duration</div>
                  <div className="font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {petCareDetail.duration} min
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="text-xs text-muted-foreground mb-1">Price</div>
                  <div className="font-semibold text-primary text-lg">
                    ฿{(getAdjustedPrice() / 100).toFixed(2)}
                  </div>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                  <TabsTrigger value="steps" className="text-xs">Steps</TabsTrigger>
                  <TabsTrigger value="products" className="text-xs">Products</TabsTrigger>
                  <TabsTrigger value="benefits" className="text-xs">Benefits</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">About This Service</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{petCareDetail.fullDescription}</p>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">What's Included:</h4>
                        <ul className="space-y-1">
                          {petCareDetail.whatIsIncluded.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <h4 className="font-semibold text-sm text-blue-900 mb-1">Suitable For:</h4>
                        <ul className="space-y-1">
                          {petCareDetail.suitableFor.map((item, index) => (
                            <li key={index} className="text-xs text-blue-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="steps" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Service Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-0">
                        {petCareDetail.steps.map((step, index) => (
                          <div key={index} className="flex gap-3 py-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs">
                              {index + 1}
                            </div>
                            <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="products" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Products Used
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {petCareDetail.productsUsed.map((product, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{product}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="benefits" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Heart className="w-4 h-4 text-primary" />
                        Key Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {petCareDetail.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t safe-bottom">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  toast.info("Booking coming soon!");
                }}
              >
                Book Service - ฿{(getAdjustedPrice() / 100).toFixed(2)}
              </Button>
            </div>
          </div>
        )}
      </ScreenContainer>
    </AppShell>
  );
}
