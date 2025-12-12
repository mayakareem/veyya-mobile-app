"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Star,
  MapPin,
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  Sparkles,
  Heart,
  Home,
  CalendarDays,
  Tag,
  Gift,
  User as UserIcon,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Service data - matches TOP_SERVICES from homepage
const SERVICES_DATA: Record<string, {
  id: number;
  name: string;
  price: number;
  duration: number;
  category: string;
  subcategory: string;
  description: string;
  fullDescription: string;
  image: string;
  rating: number;
  reviewCount: number;
  benefits: string[];
  includes: string[];
}> = {
  "1": {
    id: 1,
    name: "Deep Tissue Massage",
    price: 1200,
    duration: 60,
    category: "Spa & Wellness",
    subcategory: "Massage",
    description: "Intensive therapeutic massage targeting deep muscle tension",
    fullDescription: "Our Deep Tissue Massage uses firm pressure and slow strokes to reach deeper layers of muscle and fascia. Perfect for chronic aches and pain, this treatment helps improve posture, flexibility, and overall muscle health.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 342,
    benefits: [
      "Relieves chronic muscle tension and pain",
      "Improves blood circulation and reduces inflammation",
      "Breaks down scar tissue and adhesions",
      "Reduces stress and promotes relaxation",
      "Improves posture and flexibility"
    ],
    includes: [
      "60-minute professional massage session",
      "Premium massage oils and aromatherapy",
      "Warm towel treatment",
      "Post-massage herbal tea",
      "Complimentary shower facilities"
    ]
  },
  "2": {
    id: 2,
    name: "Gel Manicure",
    price: 500,
    duration: 45,
    category: "Beauty",
    subcategory: "Nails",
    description: "Long-lasting gel polish manicure with professional nail care",
    fullDescription: "Get salon-perfect nails with our Gel Manicure service. Our professional nail technicians will shape, file, and polish your nails with high-quality gel polish that lasts up to 3 weeks without chipping.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 567,
    benefits: [
      "Lasts 2-3 weeks without chipping",
      "High-gloss, professional finish",
      "Strengthens natural nails",
      "Quick drying time",
      "Wide range of colors available"
    ],
    includes: [
      "Nail shaping and filing",
      "Cuticle care and treatment",
      "Hand massage with moisturizer",
      "Premium gel polish application",
      "UV/LED curing"
    ]
  },
  "3": {
    id: 3,
    name: "Bridal Makeup",
    price: 3500,
    duration: 120,
    category: "Beauty",
    subcategory: "Makeup",
    description: "Professional bridal makeup for your special day",
    fullDescription: "Look absolutely stunning on your wedding day with our professional bridal makeup service. Our experienced makeup artists use premium products and techniques to create a flawless, long-lasting look that photographs beautifully.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
    rating: 5.0,
    reviewCount: 189,
    benefits: [
      "Professional, camera-ready finish",
      "Long-lasting, sweat-proof formula",
      "Customized to match your wedding theme",
      "Includes trial session",
      "Touch-up kit provided"
    ],
    includes: [
      "Pre-wedding makeup trial",
      "Full face bridal makeup",
      "False lashes application",
      "Hair styling (basic)",
      "Touch-up kit for the day",
      "Setting spray for long wear"
    ]
  },
  "4": {
    id: 4,
    name: "Pet Grooming",
    price: 800,
    duration: 90,
    category: "Pet Care",
    subcategory: "Grooming",
    description: "Complete grooming service for your beloved pet",
    fullDescription: "Treat your furry friend to a complete spa experience! Our professional pet groomers provide gentle, caring service that keeps your pet looking and feeling their best.",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 234,
    benefits: [
      "Reduces shedding and matting",
      "Healthier skin and coat",
      "Early detection of skin issues",
      "Stress-free, gentle handling",
      "Professional hygiene care"
    ],
    includes: [
      "Bath with premium pet shampoo",
      "Blow dry and brush out",
      "Nail trimming and filing",
      "Ear cleaning",
      "Sanitary trim",
      "Cologne and bow/bandana"
    ]
  },
  "5": {
    id: 5,
    name: "Swedish Massage",
    price: 1000,
    duration: 60,
    category: "Spa & Wellness",
    subcategory: "Massage",
    description: "Relaxing full-body massage with gentle, flowing strokes",
    fullDescription: "Experience ultimate relaxation with our Swedish Massage. Using gentle, long strokes combined with kneading and circular movements, this classic massage promotes relaxation and eases muscle tension.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 445,
    benefits: [
      "Promotes deep relaxation and stress relief",
      "Improves blood circulation",
      "Eases muscle tension and pain",
      "Boosts immune system function",
      "Improves sleep quality"
    ],
    includes: [
      "60-minute relaxation massage",
      "Choice of aromatherapy oils",
      "Warm towel service",
      "Herbal tea",
      "Relaxation room access"
    ]
  },
  "6": {
    id: 6,
    name: "Facial Treatment",
    price: 1500,
    duration: 75,
    category: "Beauty",
    subcategory: "Skincare",
    description: "Luxurious facial treatment for glowing, healthy skin",
    fullDescription: "Revitalize your skin with our signature facial treatment. Our expert aestheticians analyze your skin type and customize the treatment to address your specific concerns, leaving you with radiant, refreshed skin.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 398,
    benefits: [
      "Deep cleanses and purifies pores",
      "Hydrates and nourishes skin",
      "Reduces fine lines and wrinkles",
      "Improves skin texture and tone",
      "Promotes healthy, glowing complexion"
    ],
    includes: [
      "Skin analysis and consultation",
      "Deep cleansing and exfoliation",
      "Customized mask treatment",
      "Facial massage",
      "Serum and moisturizer application",
      "Complimentary skincare samples"
    ]
  },
  "7": {
    id: 7,
    name: "Hair Styling",
    price: 900,
    duration: 60,
    category: "Beauty",
    subcategory: "Hair",
    description: "Professional hair styling for any occasion",
    fullDescription: "Look your best with our professional hair styling service. Whether it's for a special event or everyday elegance, our skilled stylists create beautiful looks tailored to your hair type and preferences.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 312,
    benefits: [
      "Professional styling techniques",
      "Long-lasting hold",
      "Customized to your face shape",
      "Premium products used",
      "Style tips and recommendations"
    ],
    includes: [
      "Hair wash and conditioning",
      "Blow dry and styling",
      "Hot tools styling (if needed)",
      "Finishing products",
      "Style maintenance tips"
    ]
  },
  "8": {
    id: 8,
    name: "Pedicure",
    price: 600,
    duration: 45,
    category: "Beauty",
    subcategory: "Nails",
    description: "Relaxing pedicure with foot massage and polish",
    fullDescription: "Pamper your feet with our luxurious pedicure service. Enjoy a relaxing soak, exfoliation, massage, and beautiful polish application for happy, healthy feet.",
    image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 429,
    benefits: [
      "Softens and smooths rough skin",
      "Improves foot and nail health",
      "Promotes circulation",
      "Relaxing and stress-relieving",
      "Beautiful, polished appearance"
    ],
    includes: [
      "Warm foot soak with aromatics",
      "Exfoliation and callus removal",
      "Nail shaping and cuticle care",
      "Foot and calf massage",
      "Polish application",
      "Moisturizing treatment"
    ]
  },
  "9": {
    id: 9,
    name: "Hot Stone Massage",
    price: 1400,
    duration: 75,
    category: "Spa & Wellness",
    subcategory: "Massage",
    description: "Therapeutic massage using heated stones for deep relaxation",
    fullDescription: "Experience the ancient healing art of hot stone massage. Smooth, heated stones are placed on key points and used as massage tools to melt away tension and promote deep relaxation.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 276,
    benefits: [
      "Melts away deep muscle tension",
      "Promotes profound relaxation",
      "Improves circulation and detoxification",
      "Reduces stress and anxiety",
      "Eases chronic pain conditions"
    ],
    includes: [
      "75-minute hot stone massage",
      "Aromatherapy enhancement",
      "Warm towel service",
      "Herbal tea",
      "Extended relaxation time"
    ]
  },
  "10": {
    id: 10,
    name: "Aromatherapy",
    price: 1100,
    duration: 60,
    category: "Spa & Wellness",
    subcategory: "Massage",
    description: "Massage therapy with essential oils for holistic wellness",
    fullDescription: "Indulge in the therapeutic benefits of aromatherapy massage. We blend premium essential oils customized to your needs, combining massage techniques with the healing properties of aromatics.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 367,
    benefits: [
      "Balances mind and body",
      "Reduces stress and anxiety",
      "Improves sleep quality",
      "Boosts mood and energy",
      "Supports immune system"
    ],
    includes: [
      "Custom essential oil blend consultation",
      "60-minute aromatherapy massage",
      "Take-home oil sample",
      "Warm towel treatment",
      "Herbal tea"
    ]
  },
  "11": {
    id: 11,
    name: "Hair Coloring",
    price: 2500,
    duration: 120,
    category: "Beauty",
    subcategory: "Hair",
    description: "Professional hair coloring service with premium products",
    fullDescription: "Transform your look with our professional hair coloring service. Using premium, salon-quality color products, our expert colorists create beautiful, long-lasting results customized to your style.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 245,
    benefits: [
      "Professional, even color application",
      "Long-lasting, vibrant results",
      "Minimal hair damage",
      "Custom color matching",
      "Expert color advice"
    ],
    includes: [
      "Color consultation",
      "Premium hair color products",
      "Full application service",
      "Deep conditioning treatment",
      "Blow dry and style",
      "Color maintenance tips"
    ]
  },
  "12": {
    id: 12,
    name: "Eyelash Extensions",
    price: 1800,
    duration: 90,
    category: "Beauty",
    subcategory: "Makeup",
    description: "Semi-permanent eyelash extensions for fuller, longer lashes",
    fullDescription: "Wake up to beautiful lashes every day! Our certified lash technicians apply individual extensions with precision, creating a natural or dramatic look that lasts 4-6 weeks.",
    image: "https://images.unsplash.com/photo-1583001308904-cd63e54f7f8f?w=400&h=300&fit=crop",
    rating: 5.0,
    reviewCount: 412,
    benefits: [
      "Fuller, longer lashes without mascara",
      "Waterproof and sweat-proof",
      "Customizable length and volume",
      "Lasts 4-6 weeks",
      "No daily makeup needed"
    ],
    includes: [
      "Lash consultation",
      "Individual lash application",
      "Premium synthetic lashes",
      "Aftercare kit",
      "Maintenance instructions",
      "Touch-up discount voucher"
    ]
  }
};

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "benefits" | "includes">("overview");

  const serviceId = decodeURIComponent(resolvedParams.id);
  const service = SERVICES_DATA[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
        <header className="sticky top-0 z-20 bg-white border-b">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Service Not Found</h1>
          </div>
        </header>
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground mb-4">Sorry, we couldn't find this service.</p>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        name: service.name,
        price: service.price,
        duration: service.duration,
        description: service.description,
        ...(service.category && { category: service.category }),
        ...(service.subcategory && { subcategory: service.subcategory }),
      });
    }
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-32">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold truncate">{service.name}</h1>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Title & Rating */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl font-bold flex-1">{service.name}</h2>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{service.rating}</span>
              <span className="text-sm text-muted-foreground">({service.reviewCount} reviews)</span>
            </div>
          </div>
          <p className="text-muted-foreground">{service.description}</p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3">
            <div className="flex flex-col items-center text-center">
              <Clock className="w-5 h-5 text-primary mb-1" />
              <p className="text-xs text-muted-foreground mb-0.5">Duration</p>
              <p className="text-sm font-semibold">{service.duration} min</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-5 h-5 text-primary mb-1" />
              <p className="text-xs text-muted-foreground mb-0.5">Location</p>
              <p className="text-sm font-semibold">Your Place</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex flex-col items-center text-center">
              <Star className="w-5 h-5 text-primary mb-1" />
              <p className="text-xs text-muted-foreground mb-0.5">Category</p>
              <p className="text-sm font-semibold">{service.subcategory}</p>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div>
          <div className="flex gap-2 mb-4 border-b">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("benefits")}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "benefits"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              Benefits
            </button>
            <button
              onClick={() => setActiveTab("includes")}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "includes"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              What's Included
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                About This Service
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.fullDescription}
              </p>
            </Card>
          )}

          {activeTab === "benefits" && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                Key Benefits
              </h3>
              <ul className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {activeTab === "includes" && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {service.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Quantity Selector */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold mb-1">Quantity</p>
              <p className="text-xs text-muted-foreground">How many sessions?</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
              >
                +
              </Button>
            </div>
          </div>
        </Card>

        {/* Price Summary */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Price per session</span>
            <span className="font-semibold">฿{service.price.toLocaleString()}</span>
          </div>
          {quantity > 1 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Quantity</span>
              <span className="font-semibold">× {quantity}</span>
            </div>
          )}
          <div className="border-t border-blue-300 pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ฿{(service.price * quantity).toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t p-4 safe-bottom">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 rounded-full"
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </Button>
          <Button
            size="lg"
            className="flex-1 rounded-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Footer Navigation */}
      <nav className="fixed bottom-20 left-0 right-0 z-20 bg-white border-t safe-bottom">
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
              <Gift className="w-6 h-6 text-muted-foreground" />
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
