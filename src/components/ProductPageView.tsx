import React, { useState, useEffect } from 'react';
import { Product, AtelierReel } from '../types';
import { ProductImage } from './ProductImage';
import {
  ArrowLeft,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Ruler,
  Star,
  Scissors,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { BRAND_DETAILS, REELS_DATA } from '../data/products';

interface ProductPageViewProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
  onOpenReel: (reel: AtelierReel) => void;
}

const SIZES = [
  { id: 'bespoke', label: 'Bespoke (Made-to-Measure)', note: 'Recommended for bridal & festive fit' },
  { id: 'xs', label: 'XS', note: 'Bust 32" • Waist 26"' },
  { id: 's', label: 'S', note: 'Bust 34" • Waist 28"' },
  { id: 'm', label: 'M', note: 'Bust 36" • Waist 30"' },
  { id: 'l', label: 'L', note: 'Bust 38" • Waist 32"' },
  { id: 'xl', label: 'XL', note: 'Bust 40" • Waist 34"' },
];

export const ProductPageView: React.FC<ProductPageViewProps> = ({
  product,
  onBack,
  onSelectProduct,
  allProducts,
  onOpenReel,
}) => {
  const [selectedSize, setSelectedSize] = useState('bespoke');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeImageAngle, setActiveImageAngle] = useState(0);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewOccasion, setNewReviewOccasion] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [productReviews, setProductReviews] = useState(product.reviews || []);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');

  // Dedicated Product Reel State
  const [isProductReelPlaying, setIsProductReelPlaying] = useState(true);
  const [isProductReelMuted, setIsProductReelMuted] = useState(true);

  // Scroll to top when this product page is mounted
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setProductReviews(product.reviews || []);
    setReviewSubmitted(false);
    setIsProductReelPlaying(true);
  }, [product.id]);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const matchedReel =
    REELS_DATA.find((r) => r.productId === product.id) ||
    REELS_DATA[0];

  const otherReels = REELS_DATA.filter((r) => r.productId !== product.id);

  const handleOpenWhatsApp = () => {
    const sizeNote = selectedSize === 'bespoke' ? 'Bespoke Custom Fitting' : `Size ${selectedSize.toUpperCase()}`;
    const url = BRAND_DETAILS.createProductWhatsAppUrl(product.name, product.price, sizeNote);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBookConsultation = () => {
    const text = `Hi Bhagirathi, I would like to book a showroom video consultation to discuss custom measurements and fabric for the ${product.name} (${product.price}).`;
    const url = BRAND_DETAILS.createGeneralWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReelWhatsApp = (reel: AtelierReel) => {
    const text = `Hi Rangbastra, I watched the dedicated motion reel "${reel.title}" for ${product.name} (${product.price}). Please share more video clips and custom fitting details.`;
    const url = BRAND_DETAILS.createGeneralWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      reviewer: newReviewAuthor.trim(),
      location: newReviewCity.trim() || 'India',
      occasion: newReviewOccasion.trim() || 'Navratri & Wedding Occasion',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewText.trim(),
      verified: true,
    };

    setProductReviews([newRev, ...productReviews]);
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewOccasion('');
    setNewReviewText('');
    setReviewSubmitted(true);
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div id="product-page-container" className="w-full bg-[#FAF8F5] text-[#1C1817] min-h-screen pb-20 sm:pb-0">
      
      {/* Top Breadcrumb & Back Bar */}
      <div className="w-full bg-[#FFFFFF] border-b border-[rgba(184,147,88,0.2)] py-3.5 px-4 sm:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            id="product-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#574F48] hover:text-[#B89358] transition-colors font-sans font-semibold py-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#B89358]" />
            <span>Back to All Pieces</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#6E6259] font-sans">
            <span className="font-semibold text-[#1C1817]">Rangbastra</span>
            <span>/</span>
            <span className="text-[#B89358] uppercase tracking-wider font-medium">{product.category}</span>
            <span>/</span>
            <span className="text-[#1C1817] font-semibold">{product.name}</span>
          </div>

          <div className="text-[11px] text-[#B89358] tracking-widest uppercase font-sans font-semibold">
            SKU: {product.sku}
          </div>
        </div>
      </div>

      {/* Main Product Showcase: Normal E-Commerce Flow where images scroll naturally down the page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Product Photography & Perspectives */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Main Image Frame */}
            <div className="relative bg-[#FFFFFF] border border-[rgba(184,147,88,0.25)] rounded-xs overflow-hidden shadow-md">
              <ProductImage
                product={product}
                aspectRatio="portrait"
                className="w-full h-auto min-h-[480px] sm:min-h-[620px] max-h-[820px] object-cover"
              />

              {/* Photo Asset Tag */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-[10px] tracking-widest uppercase px-3 py-1 bg-[#FFFFFF]/90 text-[#1C1817] border border-[rgba(184,147,88,0.35)] shadow-xs font-sans font-medium">
                  Atelier Photo: {product.filename}
                </span>
              </div>

              {/* Navratri Twirl Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1 text-[9px] tracking-wider uppercase px-2.5 py-1 bg-[#9B2226] text-[#FFFFFF] font-sans font-semibold shadow-xs">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Navratri Garba Ready</span>
                </span>
              </div>

              {/* Quick Jump to Dedicated Reel */}
              <a
                href="#product-dedicated-reel-section"
                className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] text-[#1C1817] border border-[rgba(184,147,88,0.45)] hover:border-[#B89358] rounded-full text-xs font-sans tracking-wider uppercase transition-all shadow-md font-semibold"
              >
                <Play className="w-3 h-3 text-[#9B2226] fill-current" />
                <span>Watch Reel in Motion ({matchedReel.duration})</span>
              </a>
            </div>

            {/* Gallery Perspective Angles */}
            <div className="grid grid-cols-3 gap-3">
              <div
                onClick={() => setActiveImageAngle(0)}
                className={`p-3 bg-[#FFFFFF] border rounded-xs cursor-pointer transition-all ${
                  activeImageAngle === 0
                    ? 'border-[#B89358] shadow-sm ring-1 ring-[#B89358]'
                    : 'border-[rgba(184,147,88,0.25)] hover:border-[#B89358]'
                }`}
              >
                <span className="text-[10px] tracking-wider uppercase text-[#B89358] block font-sans font-semibold">Angle 01</span>
                <span className="text-xs text-[#1C1817] font-semibold font-sans">Full Silhouette & Flare</span>
              </div>

              <div
                onClick={() => setActiveImageAngle(1)}
                className={`p-3 bg-[#FFFFFF] border rounded-xs cursor-pointer transition-all ${
                  activeImageAngle === 1
                    ? 'border-[#B89358] shadow-sm ring-1 ring-[#B89358]'
                    : 'border-[rgba(184,147,88,0.25)] hover:border-[#B89358]'
                }`}
              >
                <span className="text-[10px] tracking-wider uppercase text-[#B89358] block font-sans font-semibold">Angle 02</span>
                <span className="text-xs text-[#1C1817] font-semibold font-sans">Zari & Hem Craft</span>
              </div>

              <div
                onClick={() => setActiveImageAngle(2)}
                className={`p-3 bg-[#FFFFFF] border rounded-xs cursor-pointer transition-all ${
                  activeImageAngle === 2
                    ? 'border-[#B89358] shadow-sm ring-1 ring-[#B89358]'
                    : 'border-[rgba(184,147,88,0.25)] hover:border-[#B89358]'
                }`}
              >
                <span className="text-[10px] tracking-wider uppercase text-[#B89358] block font-sans font-semibold">Angle 03</span>
                <span className="text-xs text-[#1C1817] font-semibold font-sans">Blouse & Dupatta Drape</span>
              </div>
            </div>

            {/* In-Depth Visual Architecture Breakdown */}
            <div className="p-6 bg-[#FFFFFF] border border-[rgba(184,147,88,0.22)] rounded-xs space-y-4 shadow-sm">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#9B2226] font-sans font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B89358]" />
                <span>Outfit Architecture & Specifications</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-sans">
                <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[rgba(184,147,88,0.18)]">
                  <span className="text-[#6E6259] uppercase tracking-wider text-[10px] block mb-1 font-medium">
                    Palette Harmony
                  </span>
                  <span className="text-[#1C1817] font-semibold leading-relaxed">
                    {product.visualDetails.palette}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[rgba(184,147,88,0.18)]">
                  <span className="text-[#6E6259] uppercase tracking-wider text-[10px] block mb-1 font-medium">
                    Silhouette & Cut
                  </span>
                  <span className="text-[#1C1817] font-semibold leading-relaxed">
                    {product.visualDetails.silhouette}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[rgba(184,147,88,0.18)]">
                  <span className="text-[#6E6259] uppercase tracking-wider text-[10px] block mb-1 font-medium">
                    Embroidery Technique
                  </span>
                  <span className="text-[#1C1817] font-semibold leading-relaxed">
                    {product.visualDetails.embroidery}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[rgba(184,147,88,0.18)]">
                  <span className="text-[#6E6259] uppercase tracking-wider text-[10px] block mb-1 font-medium">
                    Dupatta Styling
                  </span>
                  <span className="text-[#1C1817] font-semibold leading-relaxed">
                    {product.visualDetails.dupattaStyling}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: E-Commerce Product Details, Sizing, and WhatsApp Conversion */}
          <div className="lg:col-span-5 space-y-7">
            
            {/* Title & Brand Header */}
            <div className="space-y-3 border-b border-[rgba(184,147,88,0.22)] pb-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.24em] uppercase text-[#B89358] font-sans font-semibold">
                  RANGBASTRA ATELIER &bull; {product.category}
                </span>
                
                {/* Star Rating summary */}
                <div className="flex items-center gap-1 text-[#CA8A04] text-xs font-sans">
                  <div className="flex text-[#CA8A04]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#1C1817] ml-1">{product.rating}</span>
                  <span className="text-[#6E6259]">({product.reviewCount})</span>
                </div>
              </div>

              <h1
                id="product-page-title"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1817] font-bold tracking-tight leading-tight"
              >
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 pt-1">
                <span
                  id="product-page-price"
                  className="font-serif text-3xl sm:text-4xl text-[#1C1817] font-bold tracking-wide"
                >
                  {product.price}
                </span>
                <span className="text-xs text-[#574F48] font-sans font-medium">
                  Inclusive of all taxes &bull; Bespoke Made to Order
                </span>
              </div>
            </div>

            {/* Narrative Overview */}
            <p className="text-sm text-[#574F48] font-sans font-normal leading-relaxed">
              {product.description}
            </p>

            {/* Sizing & Fit Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-[#1C1817] font-sans font-semibold">
                  Select Fit & Sizing:
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="inline-flex items-center gap-1 text-xs text-[#B89358] hover:text-[#9B2226] underline underline-offset-4 font-sans font-medium transition-colors cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SIZES.map((size) => {
                  const isSelected = selectedSize === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-3 rounded-xs border text-left transition-all font-sans cursor-pointer ${
                        isSelected
                          ? 'border-[#B89358] bg-[#FAF8F5] text-[#1C1817] shadow-sm ring-1 ring-[#B89358]'
                          : 'border-[rgba(184,147,88,0.25)] bg-[#FFFFFF] text-[#574F48] hover:border-[#B89358]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider block">
                          {size.label}
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-[#B89358]" />}
                      </div>
                      <span className="text-[10px] text-[#6E6259] block mt-0.5 font-normal">
                        {size.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Buttons (Auto message appears ONLY in WhatsApp) */}
            <div className="space-y-3.5 pt-1">
              <button
                id="product-enquire-whatsapp-cta"
                onClick={handleOpenWhatsApp}
                title="Enquire on WhatsApp: 091737 85595"
                className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] font-sans font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-xs transition-all duration-200 shadow-lg flex items-center justify-center gap-3 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>ENQUIRE ON WHATSAPP &bull; 091737 85595</span>
              </button>

              <button
                id="product-book-consult-cta"
                onClick={handleBookConsultation}
                className="w-full py-3.5 px-6 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#1C1817] border border-[rgba(184,147,88,0.4)] hover:border-[#B89358] font-sans font-semibold text-xs tracking-[0.18em] uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Scissors className="w-4 h-4 text-[#B89358]" />
                <span>Book Video Measurement Consultation</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6E6259] font-sans pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89358]" />
                <span>Direct consultation with Founder Bhagirathi &bull; Rangbastra</span>
              </div>
            </div>

            {/* Product Specifications Accordions */}
            <div className="border-t border-[rgba(184,147,88,0.22)] pt-4 space-y-2.5">
              
              {/* Accordion 1: Components & Fabric */}
              <div className="border border-[rgba(184,147,88,0.22)] rounded-xs overflow-hidden bg-[#FFFFFF]">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full p-4 flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1817] hover:text-[#B89358] cursor-pointer"
                >
                  <span>Fabric & Composition</span>
                  {openAccordion === 'fabric' ? <ChevronUp className="w-4 h-4 text-[#B89358]" /> : <ChevronDown className="w-4 h-4 text-[#B89358]" />}
                </button>
                {openAccordion === 'fabric' && (
                  <div className="p-4 pt-0 text-xs text-[#574F48] font-sans space-y-2 border-t border-[rgba(184,147,88,0.15)] bg-[#FAF8F5]">
                    <p className="pt-2"><strong className="text-[#1C1817]">Base Fabric:</strong> {product.fabricCare.fabric}</p>
                    <p><strong className="text-[#1C1817]">Lining:</strong> {product.fabricCare.lining}</p>
                    <p><strong className="text-[#1C1817]">Components Included:</strong> {product.fabricCare.components}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Hand Craftsmanship & Zardozi */}
              <div className="border border-[rgba(184,147,88,0.22)] rounded-xs overflow-hidden bg-[#FFFFFF]">
                <button
                  onClick={() => toggleAccordion('craft')}
                  className="w-full p-4 flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1817] hover:text-[#B89358] cursor-pointer"
                >
                  <span>Hand Zardozi & Embellishments</span>
                  {openAccordion === 'craft' ? <ChevronUp className="w-4 h-4 text-[#B89358]" /> : <ChevronDown className="w-4 h-4 text-[#B89358]" />}
                </button>
                {openAccordion === 'craft' && (
                  <div className="p-4 pt-0 text-xs text-[#574F48] font-sans space-y-2 border-t border-[rgba(184,147,88,0.15)] bg-[#FAF8F5]">
                    <p className="pt-2"><strong className="text-[#1C1817]">Embroidery:</strong> {product.fabricCare.embellishment}</p>
                    <p><strong className="text-[#1C1817]">Care Instructions:</strong> {product.fabricCare.washCare}</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Bespoke Measurement Process (Delivery Time Removed) */}
              <div className="border border-[rgba(184,147,88,0.22)] rounded-xs overflow-hidden bg-[#FFFFFF]">
                <button
                  onClick={() => toggleAccordion('bespoke')}
                  className="w-full p-4 flex items-center justify-between text-left font-sans text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1817] hover:text-[#B89358] cursor-pointer"
                >
                  <span>Bespoke Made-To-Measure Process</span>
                  {openAccordion === 'bespoke' ? <ChevronUp className="w-4 h-4 text-[#B89358]" /> : <ChevronDown className="w-4 h-4 text-[#B89358]" />}
                </button>
                {openAccordion === 'bespoke' && (
                  <div className="p-4 pt-0 text-xs text-[#574F48] font-sans space-y-2 border-t border-[rgba(184,147,88,0.15)] bg-[#FAF8F5]">
                    <p className="pt-2">Every piece is tailored to your custom bust, waist, hip, and lehenga length measurements. Bhagirathi and our master pattern-makers coordinate directly with you on WhatsApp to ensure an immaculate royal fit.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            DEDICATED REEL SECTION SEPARATELY FOR THIS PRODUCT
            ========================================================================= */}
        <section
          id="product-dedicated-reel-section"
          className="mt-16 sm:mt-24 p-6 sm:p-10 bg-[#FFFFFF] border border-[rgba(184,147,88,0.3)] rounded-xs shadow-md scroll-mt-24"
        >
          <div className="max-w-5xl mx-auto">
            
            {/* Header for this product's reel */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[rgba(184,147,88,0.22)] mb-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#9B2226]/10 text-[#9B2226] text-[10px] font-sans font-semibold tracking-wider uppercase">
                  <Play className="w-3 h-3 fill-current" />
                  <span>DEDICATED PRODUCT REEL IN MOTION</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1817] font-bold">
                  {product.name} &bull; The 360° Flare Reel
                </h2>
                <p className="text-xs sm:text-sm text-[#574F48] font-sans mt-1">
                  Watch this exact piece twirl in motion — experiencing the hand-embroidered zari shimmer, ghera volume, and graceful drape.
                </p>
              </div>

              <button
                onClick={() => onOpenReel(matchedReel)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F5] hover:bg-[#F3EFE8] border border-[rgba(184,147,88,0.4)] text-[#1C1817] rounded-xs text-xs font-sans font-semibold tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#B89358]" />
                <span>Fullscreen Reel View</span>
              </button>
            </div>

            {/* Interactive Reel Presentation Stage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Vertical 9:16 Video Player Card */}
              <div className="md:col-span-6 lg:col-span-5 flex justify-center">
                <div
                  className="relative w-full max-w-[340px] aspect-[9/16] bg-[#1C1817] border border-[rgba(184,147,88,0.35)] rounded-xs overflow-hidden shadow-2xl group flex flex-col justify-between"
                  onClick={() => setIsProductReelPlaying(!isProductReelPlaying)}
                >
                  {/* Top Progress bar indicator */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-30 overflow-hidden">
                    <div
                      className={`h-full bg-[#D8C0A0] ${
                        isProductReelPlaying ? 'w-full transition-all duration-[18000ms] ease-linear' : 'w-1/3'
                      }`}
                    />
                  </div>

                  {/* Animated Motion Display Stage */}
                  <div className="absolute inset-0 z-10 overflow-hidden cursor-pointer">
                    <div
                      className={`w-full h-full transition-transform duration-[7000ms] ease-in-out ${
                        isProductReelPlaying ? 'scale-110' : 'scale-100'
                      }`}
                    >
                      <ProductImage
                        product={product}
                        aspectRatio="portrait"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Gradient Scrims for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1817] via-transparent to-[#1C1817]/60 pointer-events-none" />

                    {/* Play / Pause Toggle Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {!isProductReelPlaying ? (
                        <div className="p-4 rounded-full bg-[#1C1817]/80 text-[#D8C0A0] border border-[#D8C0A0] shadow-xl">
                          <Play className="w-8 h-8 fill-current ml-0.5" />
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-full bg-[#1C1817]/60 text-[#FFFFFF]">
                          <Pause className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Top Header inside Reel */}
                  <div className="relative z-30 p-4 flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm tracking-wider text-[#FFFFFF] font-bold uppercase">
                        {BRAND_DETAILS.brandName}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8C0A0]" />
                      <span className="text-[10px] text-[#D8C0A0] tracking-wider uppercase font-medium">Navratri Edit</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsProductReelMuted(!isProductReelMuted);
                      }}
                      className="p-1.5 rounded-full bg-[#1C1817]/70 text-[#FFFFFF] hover:text-[#D8C0A0] border border-white/20 cursor-pointer"
                      title="Audio Ambiance"
                    >
                      {isProductReelMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Bottom Reel Caption and Badges */}
                  <div className="relative z-30 p-4 space-y-2 bg-gradient-to-t from-[#1C1817] via-[#1C1817]/90 to-transparent">
                    <div className="flex items-center justify-between text-[10px] font-sans">
                      <span className="text-[#D8C0A0] uppercase tracking-wider font-semibold">
                        {matchedReel.views} Twirl Views
                      </span>
                      <span className="text-[#FFFFFF] bg-[#9B2226] px-2 py-0.5 rounded-full font-medium text-[9px]">
                        {matchedReel.duration}
                      </span>
                    </div>
                    <p className="text-xs font-serif text-[#FFFFFF] font-medium leading-snug line-clamp-2">
                      {matchedReel.title}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {matchedReel.tags.map((tag) => (
                        <span key={tag} className="text-[9px] text-[#D8C0A0] font-sans">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Reel Details, Twirl Breakdown & Conversion CTA */}
              <div className="md:col-span-6 lg:col-span-7 space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#B89358] font-sans font-semibold">
                    FABRIC MOVEMENT & GHERA ANALYSIS
                  </span>
                  <h3 className="font-serif text-2xl text-[#1C1817] font-bold">
                    {matchedReel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#574F48] font-sans leading-relaxed">
                    {matchedReel.caption}
                  </p>
                </div>

                {/* Reel Highlights Pill Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                  <div className="p-3 bg-[#FAF8F5] border border-[rgba(184,147,88,0.2)] rounded-xs">
                    <span className="text-[10px] text-[#6E6259] uppercase block mb-0.5 font-medium">Twirl Ghera Volume</span>
                    <span className="text-[#1C1817] font-semibold">Full Circular Fall & Can-can Lift</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[rgba(184,147,88,0.2)] rounded-xs">
                    <span className="text-[10px] text-[#6E6259] uppercase block mb-0.5 font-medium">Zari Lighting Response</span>
                    <span className="text-[#1C1817] font-semibold">Muted Antique Gold Shimmer</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[rgba(184,147,88,0.2)] rounded-xs">
                    <span className="text-[10px] text-[#6E6259] uppercase block mb-0.5 font-medium">Weight & Comfort</span>
                    <span className="text-[#1C1817] font-semibold">Balanced for Navratri Garba Nights</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border border-[rgba(184,147,88,0.2)] rounded-xs">
                    <span className="text-[10px] text-[#6E6259] uppercase block mb-0.5 font-medium">Drape Flexibility</span>
                    <span className="text-[#1C1817] font-semibold">Pleated & Free Shoulder Styling</span>
                  </div>
                </div>

                {/* Direct Action for this Reel */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleReelWhatsApp(matchedReel)}
                    className="flex-1 py-3.5 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] font-sans font-bold text-xs tracking-[0.18em] uppercase rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enquire About This Twirl Reel</span>
                  </button>

                  <button
                    onClick={() => onOpenReel(matchedReel)}
                    className="py-3.5 px-5 bg-[#FAF8F5] hover:bg-[#F3EFE8] border border-[rgba(184,147,88,0.35)] text-[#1C1817] font-sans font-semibold text-xs tracking-[0.18em] uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-[#9B2226] fill-current" />
                    <span>Play in 9:16 Modal</span>
                  </button>
                </div>

                {/* Subtext */}
                <p className="text-[11px] text-[#6E6259] font-sans">
                  Need a video showing a specific angle, embroidery close-up, or dupatta draping style? Bhagirathi shares custom high-resolution clips directly over WhatsApp.
                </p>
              </div>

            </div>

            {/* Other Product Reels Quick Strip */}
            {otherReels.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[rgba(184,147,88,0.2)]">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#6E6259] font-sans font-semibold block mb-3">
                  WATCH MOTION REELS FOR OTHER RANGBASTRA CREATIONS:
                </span>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {otherReels.map((or) => {
                    const reelProduct = allProducts.find((p) => p.id === or.productId);
                    if (!reelProduct) return null;
                    return (
                      <button
                        key={or.id}
                        onClick={() => onSelectProduct(reelProduct)}
                        className="flex items-center gap-3 p-2 bg-[#FAF8F5] hover:bg-[#F5F0E6] border border-[rgba(184,147,88,0.22)] rounded-xs shrink-0 text-left transition-colors cursor-pointer group"
                      >
                        <div className="w-10 h-14 bg-[#1C1817] rounded-xs overflow-hidden shrink-0 relative">
                          <ProductImage
                            product={reelProduct}
                            aspectRatio="portrait"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-[#080808]/30 flex items-center justify-center">
                            <Play className="w-3 h-3 text-[#FFFFFF] fill-current" />
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#1C1817] group-hover:text-[#B89358] block line-clamp-1">
                            {or.productName}
                          </span>
                          <span className="text-[10px] text-[#6E6259] block font-sans">
                            {or.duration} &bull; {or.views} views
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Product Specific Reviews & Ratings Section */}
        <div id="product-reviews-section" className="mt-16 sm:mt-24 pt-12 border-t border-[rgba(184,147,88,0.22)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#9B2226] font-sans font-semibold block mb-1">
                AUTHENTIC CLIENT TESTIMONIALS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1817] font-bold">
                Ratings & Reviews ({productReviews.length})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#CA8A04]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-serif text-2xl text-[#1C1817] font-bold">
                {product.rating} <span className="text-xs font-sans text-[#6E6259] font-normal">out of 5</span>
              </span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {productReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-[#FFFFFF] border border-[rgba(184,147,88,0.22)] rounded-xs space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1C1817] text-sm font-sans">{rev.reviewer}</span>
                      {rev.verified && (
                        <span className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#1E7E34]/10 text-[#1E7E34] border border-[#1E7E34]/25 font-sans font-semibold">
                          Verified Client
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#6E6259] font-sans block mt-0.5">
                      {rev.location} &bull; {rev.occasion}
                    </span>
                  </div>

                  <div className="flex text-[#CA8A04]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#574F48] font-sans font-normal leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="text-[10px] text-[#B89358] font-sans font-medium">
                  {rev.date}
                </div>
              </div>
            ))}
          </div>

          {/* Add a Review Form */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[rgba(184,147,88,0.25)] rounded-xs max-w-2xl shadow-sm">
            <h3 className="font-serif text-xl text-[#1C1817] font-bold mb-1.5">Share Your Atelier Experience</h3>
            <p className="text-xs text-[#574F48] font-sans mb-5">
              Have you ordered or tried this piece? Leave a note on the craftsmanship, fit, and twirl movement.
            </p>

            {reviewSubmitted ? (
              <div className="p-4 bg-[#FAF8F5] border border-[#1E7E34]/40 text-[#1E7E34] text-xs font-sans rounded-xs flex items-center gap-2 font-medium">
                <Check className="w-4 h-4" />
                <span>Thank you! Your verified review has been recorded for this piece.</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1C1817] font-medium mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Pooja Singhania"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1C1817] font-medium mb-1">City / Country</label>
                    <input
                      type="text"
                      value={newReviewCity}
                      onChange={(e) => setNewReviewCity(e.target.value)}
                      placeholder="e.g. Mumbai / London"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1C1817] font-medium mb-1">Occasion Worn</label>
                    <input
                      type="text"
                      value={newReviewOccasion}
                      onChange={(e) => setNewReviewOccasion(e.target.value)}
                      placeholder="e.g. Navratri Garba, Wedding Reception"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1C1817] font-medium mb-1">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                    >
                      <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                      <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                      <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1C1817] font-medium mb-1">Your Review & Fit Feedback</label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Describe the fabric feel, hand embroidery detail, and twirl comfort..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1C1817] hover:bg-[#332D29] text-[#FFFFFF] font-semibold tracking-wider uppercase text-[11px] rounded-xs transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>

        {/* More Complementary Pieces from Rangbastra Collection */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[rgba(184,147,88,0.22)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#B89358] font-sans font-semibold block mb-1">
                COMPLEMENTARY ATELIER PIECES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1817] font-bold">
                Explore Other Showroom Creations
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs uppercase tracking-wider text-[#B89358] hover:text-[#9B2226] underline underline-offset-4 font-sans font-semibold cursor-pointer"
            >
              View All 7 Pieces &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel)}
                className="group cursor-pointer bg-[#FFFFFF] border border-[rgba(184,147,88,0.22)] hover:border-[#B89358] rounded-xs overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="relative overflow-hidden bg-[#FAF8F5]">
                  <ProductImage
                    product={rel}
                    aspectRatio="portrait"
                    className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#FFFFFF]/90 text-[#1C1817] text-[9px] uppercase font-sans font-medium border border-[rgba(184,147,88,0.3)]">
                    {rel.category}
                  </div>
                </div>
                <div className="p-4 bg-[#FFFFFF]">
                  <h4 className="font-serif text-base text-[#1C1817] group-hover:text-[#B89358] transition-colors font-bold">
                    {rel.name}
                  </h4>
                  <p className="font-serif text-sm text-[#B89358] font-semibold mt-1">
                    {rel.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal Popup */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1817]/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="w-full max-w-lg bg-[#FFFFFF] border border-[rgba(184,147,88,0.35)] p-6 sm:p-8 rounded-xs text-[#1C1817] space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[rgba(184,147,88,0.2)] pb-3">
              <h3 className="font-serif text-2xl text-[#1C1817] font-bold">Bespoke Measurement Guide</h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-[#6E6259] hover:text-[#1C1817] text-sm font-semibold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-xs text-[#574F48] font-sans leading-relaxed">
              Rangbastra offers custom made-to-measure tailoring for all bridal and festive lehengas. Standard sizes are reference guides below:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left font-sans border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(184,147,88,0.25)] text-[#B89358]">
                    <th className="py-2">Size</th>
                    <th className="py-2">Bust</th>
                    <th className="py-2">Waist</th>
                    <th className="py-2">Hip</th>
                    <th className="py-2">Lehenga Length</th>
                  </tr>
                </thead>
                <tbody className="text-[#574F48] divide-y divide-[rgba(184,147,88,0.12)]">
                  <tr><td className="py-2 font-bold text-[#1C1817]">XS</td><td>32"</td><td>26"</td><td>36"</td><td>42"</td></tr>
                  <tr><td className="py-2 font-bold text-[#1C1817]">S</td><td>34"</td><td>28"</td><td>38"</td><td>42"</td></tr>
                  <tr><td className="py-2 font-bold text-[#1C1817]">M</td><td>36"</td><td>30"</td><td>40"</td><td>43"</td></tr>
                  <tr><td className="py-2 font-bold text-[#1C1817]">L</td><td>38"</td><td>32"</td><td>42"</td><td>43"</td></tr>
                  <tr><td className="py-2 font-bold text-[#1C1817]">XL</td><td>40"</td><td>34"</td><td>44"</td><td>44"</td></tr>
                  <tr className="text-[#9B2226] font-semibold"><td className="py-2">Bespoke</td><td colSpan={4}>Customized directly with Bhagirathi on WhatsApp</td></tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="px-6 py-2 bg-[#1C1817] hover:bg-[#332D29] text-xs text-[#FFFFFF] tracking-wider uppercase rounded-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Enquire Bar (Mobile Optimization) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FFFFFF]/98 backdrop-blur-md border-t border-[rgba(184,147,88,0.3)] px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div className="min-w-0 flex-1">
          <span className="text-[9px] uppercase tracking-wider text-[#6E6259] block font-sans truncate font-medium">
            {product.name}
          </span>
          <span className="font-serif text-sm font-bold text-[#1C1817] block">
            {product.price}
          </span>
        </div>

        <button
          onClick={handleOpenWhatsApp}
          title="Enquire on WhatsApp: 091737 85595"
          className="py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] font-bold text-xs uppercase tracking-wider font-sans rounded-xs flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp 091737 85595</span>
        </button>
      </div>

    </div>
  );
};
