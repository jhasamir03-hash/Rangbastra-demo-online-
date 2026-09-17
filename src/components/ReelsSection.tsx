import React, { useState } from 'react';
import { AtelierReel, Product } from '../types';
import { ProductImage } from './ProductImage';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  MessageCircle,
  Eye,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Flame,
} from 'lucide-react';
import { BRAND_DETAILS } from '../data/products';

interface ReelsSectionProps {
  reels: AtelierReel[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
  activeReel: AtelierReel | null;
  setActiveReel: (reel: AtelierReel | null) => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({
  reels,
  products,
  onSelectProduct,
  activeReel,
  setActiveReel,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Filter reels based on selected product tab
  const filteredReels =
    selectedProductId === 'all'
      ? reels
      : reels.filter((r) => r.productId === selectedProductId);

  const selectedProduct =
    selectedProductId !== 'all'
      ? products.find((p) => p.id === selectedProductId)
      : null;

  const currentReelProduct = activeReel
    ? products.find((p) => p.id === activeReel.productId)
    : null;

  const currentReelIndex = activeReel
    ? reels.findIndex((r) => r.id === activeReel.id)
    : -1;

  const handleNextReel = () => {
    if (currentReelIndex >= 0 && currentReelIndex < reels.length - 1) {
      setActiveReel(reels[currentReelIndex + 1]);
    } else {
      setActiveReel(reels[0]);
    }
  };

  const handlePrevReel = () => {
    if (currentReelIndex > 0) {
      setActiveReel(reels[currentReelIndex - 1]);
    } else {
      setActiveReel(reels[reels.length - 1]);
    }
  };

  const handleWhatsAppFromReel = (reel: AtelierReel) => {
    const text = `Hi Rangbastra, I watched the reel "${reel.title}" featuring the ${reel.productName} (${reel.productPrice}). Please share more video clips and custom fitting details.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="reels-section"
      className="w-full bg-[#FAF8F5] text-[#1C1817] py-18 sm:py-24 border-b border-[rgba(184,147,88,0.22)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#9B2226]/10 text-[#9B2226] text-[10px] font-sans font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-[#B89358]" />
              <span>DEDICATED REELS FOR EACH PRODUCT</span>
            </div>
            <h2
              id="reels-section-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1817] tracking-tight"
            >
              CRAFT & FLARE REELS
            </h2>
            <p className="text-xs sm:text-sm text-[#574F48] font-sans font-normal mt-2 max-w-lg">
              Explore dedicated video reels for each Rangbastra creation. Experience 360° circular flares, royal zari shimmer, and garment movement for festive Garba nights.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#B89358]">
            <Play className="w-3.5 h-3.5 text-[#9B2226] fill-current" />
            <span>Click any reel to watch in full 9:16 vertical motion</span>
          </div>
        </div>

        {/* Dedicated Product Tab Filter (Allows customer to view reel separately for each product) */}
        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E6259] font-sans font-semibold block mb-2.5">
            SELECT PRODUCT TO VIEW DEDICATED REEL:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedProductId('all')}
              className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer font-semibold ${
                selectedProductId === 'all'
                  ? 'bg-[#1C1817] text-[#FFFFFF] shadow-sm'
                  : 'bg-[#FFFFFF] text-[#574F48] border border-[rgba(184,147,88,0.25)] hover:border-[#B89358]'
              }`}
            >
              All Reels ({reels.length})
            </button>

            {products.map((p, idx) => {
              const isSelected = selectedProductId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer font-semibold flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#9B2226] text-[#FFFFFF] shadow-sm'
                      : 'bg-[#FFFFFF] text-[#574F48] border border-[rgba(184,147,88,0.25)] hover:border-[#B89358]'
                  }`}
                >
                  <span>0{idx + 1} &bull; {p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* If a single product is selected, display a dedicated featured reel spotlight banner */}
        {selectedProduct && filteredReels[0] && (
          <div className="mb-8 p-6 bg-[#FFFFFF] border border-[rgba(184,147,88,0.3)] rounded-xs shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-20 bg-[#1C1817] rounded-xs overflow-hidden shrink-0 relative">
                <ProductImage
                  product={selectedProduct}
                  aspectRatio="portrait"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#080808]/30 flex items-center justify-center">
                  <Play className="w-4 h-4 text-[#FFFFFF] fill-current" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B2226] font-sans font-semibold block">
                  Dedicated Reel for {selectedProduct.name}
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1C1817]">
                  {filteredReels[0].title}
                </h4>
                <p className="text-xs text-[#574F48] font-sans mt-0.5">
                  {filteredReels[0].caption}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setActiveReel(filteredReels[0])}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#1C1817] hover:bg-[#332D29] text-[#FFFFFF] text-xs font-sans font-semibold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
              >
                Watch 9:16 Video
              </button>
              <button
                onClick={() => onSelectProduct(selectedProduct)}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#F3EFE8] border border-[rgba(184,147,88,0.35)] text-[#1C1817] text-xs font-sans font-semibold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
              >
                View Piece Details
              </button>
            </div>
          </div>
        )}

        {/* Reels Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5 sm:gap-5">
          {filteredReels.map((reel) => {
            const product = products.find((p) => p.id === reel.productId);
            return (
              <div
                key={reel.id}
                id={`reel-card-${reel.id}`}
                onClick={() => setActiveReel(reel)}
                className="group relative cursor-pointer aspect-[9/16] rounded-xs overflow-hidden bg-[#FFFFFF] border border-[rgba(184,147,88,0.25)] hover:border-[#B89358] transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {/* Background Image / Motion Asset */}
                {product && (
                  <ProductImage
                    product={product}
                    aspectRatio="portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Vignette Overlay for crisp text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1817] via-transparent to-[#1C1817]/40" />

                {/* Duration & Views Badge */}
                <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FFFFFF]/90 text-[#1C1817] text-[9px] font-sans font-bold shadow-xs">
                  <span>{reel.duration}</span>
                </div>

                {/* Center Play Button Pulse on Hover */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFFFFF]/90 border border-[#B89358] text-[#1C1817] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#9B2226] group-hover:text-[#FFFFFF] group-hover:border-[#9B2226] transition-all shadow-lg">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Caption & Product info */}
                <div className="absolute inset-x-0 bottom-0 p-3 z-20 space-y-1">
                  <span className="text-[8px] uppercase tracking-wider text-[#D8C0A0] font-sans font-semibold block line-clamp-1">
                    {reel.productName}
                  </span>
                  <p className="text-[11px] font-serif text-[#FFFFFF] font-semibold leading-tight line-clamp-2">
                    {reel.title}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[9px] text-[#FFFFFF]/80 font-sans border-t border-white/15">
                    <span>{reel.views} views</span>
                    <span className="text-[#D8C0A0] font-bold">{reel.productPrice}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Full-Screen 9:16 Luxury Reel Modal Player */}
      {activeReel && currentReelProduct && (
        <div
          id="reel-modal-player-backdrop"
          className="fixed inset-0 z-50 bg-[#1C1817]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveReel(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveReel(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-[#FFFFFF] text-[#1C1817] hover:text-[#9B2226] border border-[rgba(184,147,88,0.3)] shadow-lg transition-colors cursor-pointer"
            aria-label="Close reel"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Right navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevReel();
            }}
            className="hidden sm:flex absolute left-6 z-50 p-3 rounded-full bg-[#FFFFFF] text-[#1C1817] hover:text-[#B89358] border border-[rgba(184,147,88,0.3)] shadow-lg transition-colors cursor-pointer"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextReel();
            }}
            className="hidden sm:flex absolute right-6 z-50 p-3 rounded-full bg-[#FFFFFF] text-[#1C1817] hover:text-[#B89358] border border-[rgba(184,147,88,0.3)] shadow-lg transition-colors cursor-pointer"
            aria-label="Next reel"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Vertical Reel Container */}
          <div
            id="active-reel-card"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[400px] aspect-[9/16] bg-[#1C1817] border border-[rgba(184,147,88,0.35)] rounded-xs overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Top Progress bar indicator */}
            <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-30 overflow-hidden">
              <div
                className={`h-full bg-[#D8C0A0] ${
                  isPlaying ? 'w-full transition-all duration-[20000ms] ease-linear' : 'w-1/2'
                }`}
              />
            </div>

            {/* Video Stage / Animated Motion Display */}
            <div
              className="absolute inset-0 z-10 overflow-hidden cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <div
                className={`w-full h-full transition-transform duration-[6000ms] ease-in-out ${
                  isPlaying ? 'scale-110' : 'scale-100'
                }`}
              >
                <ProductImage
                  product={currentReelProduct}
                  aspectRatio="portrait"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Scrims for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1817] via-[#1C1817]/20 to-[#1C1817]/70 pointer-events-none" />

              {/* Play pause indicator when tapped */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="p-4 rounded-full bg-[#1C1817]/80 text-[#D8C0A0] border border-[#D8C0A0]">
                    <Pause className="w-8 h-8" />
                  </div>
                </div>
              )}
            </div>

            {/* Top Reel Bar */}
            <div className="relative z-30 p-4 flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm tracking-wider text-[#FFFFFF] font-bold uppercase">
                  {BRAND_DETAILS.brandName}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D8C0A0]" />
                <span className="text-[10px] text-[#D8C0A0] tracking-wider uppercase font-medium">In Motion</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-full bg-[#1C1817]/70 text-[#FFFFFF] hover:text-[#D8C0A0] border border-white/20 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bottom Reel Narrative & Actions */}
            <div className="relative z-30 p-5 space-y-3 bg-gradient-to-t from-[#1C1817] via-[#1C1817]/90 to-transparent">
              <div>
                <span className="text-[9px] tracking-[0.24em] uppercase text-[#D8C0A0] font-sans font-semibold block mb-0.5">
                  {currentReelProduct.category} &bull; {activeReel.views} VIEWS
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FFFFFF] font-bold leading-snug">
                  {activeReel.title}
                </h3>
                <p className="text-xs text-[#E8E4DD] font-sans font-normal mt-1 line-clamp-2">
                  {activeReel.caption}
                </p>
              </div>

              {/* Featured Piece Bar */}
              <div className="p-3 bg-[#FFFFFF]/10 backdrop-blur-xs border border-[rgba(216,192,160,0.3)] rounded-xs flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#D8C0A0] block font-medium">
                    Featured Piece:
                  </span>
                  <span className="text-xs font-serif text-[#FFFFFF] font-bold">
                    {currentReelProduct.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-sm text-[#D8C0A0] font-bold block">
                    {currentReelProduct.price}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => {
                    setActiveReel(null);
                    onSelectProduct(currentReelProduct);
                  }}
                  className="py-2.5 px-3 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#1C1817] rounded-xs text-[11px] uppercase tracking-wider font-sans font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#B89358]" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => handleWhatsAppFromReel(activeReel)}
                  className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] font-bold rounded-xs text-[11px] uppercase tracking-wider font-sans flex items-center justify-center gap-1.5 transition-colors shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Enquire</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
