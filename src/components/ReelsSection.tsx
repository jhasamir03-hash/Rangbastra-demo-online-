import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import { AtelierReel, Product } from '../types';
import { ProductImage } from './ProductImage';
import {
  Pause,
  Volume2,
  VolumeX,
  X,
  MessageCircle,
  Eye,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Maximize2,
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Touch gesture tracking for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalReels = reels.length;
  const activeSlideReel = reels[currentSlideIndex] || reels[0];
  const activeSlideProduct = products.find((p) => p.id === activeSlideReel.productId);

  // Adjacent slides for luxury carousel preview
  const prevSlideIndex = (currentSlideIndex - 1 + totalReels) % totalReels;
  const nextSlideIndex = (currentSlideIndex + 1) % totalReels;
  const prevReel = reels[prevSlideIndex];
  const nextReel = reels[nextSlideIndex];
  const prevProduct = products.find((p) => p.id === prevReel.productId);
  const nextProduct = products.find((p) => p.id === nextReel.productId);

  const goToSlide = useCallback((newIndex: number, dir?: number) => {
    const direction = dir !== undefined ? dir : newIndex > currentSlideIndex ? 1 : -1;
    setSlideDirection(direction);
    setCurrentSlideIndex(newIndex);
    setProgress(0);
  }, [currentSlideIndex]);

  const handleNextSlide = useCallback(() => {
    setSlideDirection(1);
    setCurrentSlideIndex((prev) => (prev + 1) % totalReels);
    setProgress(0);
  }, [totalReels]);

  const handlePrevSlide = useCallback(() => {
    setSlideDirection(-1);
    setCurrentSlideIndex((prev) => (prev - 1 + totalReels) % totalReels);
    setProgress(0);
  }, [totalReels]);

  // Autoplay timer: progress updates every 100ms when playing and not hovered
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextSlide();
          return 0;
        }
        // Advance ~1.1% every 100ms (approx 9 seconds per reel)
        return prev + 1.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, handleNextSlide]);

  // Keyboard navigation when user is interacting
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const reelsSection = document.getElementById('reels-section');
      if (!reelsSection) return;
      const rect = reelsSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  // Touch swipe event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    // 40px threshold for swipe trigger
    if (diff > 40) {
      handleNextSlide();
    } else if (diff < -40) {
      handlePrevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleWhatsAppFromReel = (reel: AtelierReel) => {
    const text = `Hi Rangbastra, I watched the reel "${reel.title}" featuring the ${reel.productName} (${reel.productPrice}). Please share more video clips and custom fitting details.`;
    const url = BRAND_DETAILS.createGeneralWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Slide animation variants
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      zIndex: 2,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 1,
      x: direction < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.22 },
      },
    }),
  };

  return (
    <section
      id="reels-section"
      className="w-full bg-[#FAF8F5] text-[#1C1817] py-10 sm:py-20 md:py-24 border-b border-[rgba(184,147,88,0.22)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-5 mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5 px-3 py-1 rounded-full bg-[#9B2226]/10 text-[#9B2226] text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-[#B89358]" />
              <span>INTERACTIVE SLIDESHOW &bull; WATCH ONE BY ONE</span>
            </div>
            <h2
              id="reels-section-heading"
              className="font-serif text-[clamp(1.75rem,5.5vw,3rem)] font-bold text-[#1C1817] tracking-tight"
            >
              CRAFT & FLARE REELS
            </h2>
            <p className="text-xs sm:text-sm text-[#574F48] font-sans font-normal mt-1.5 sm:mt-2 max-w-lg leading-relaxed">
              Swipe through dedicated couture video reels one by one. Experience 360° circular flares, royal zari shimmer, and garment movement for festive Garba nights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Slide Position Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[rgba(184,147,88,0.3)] rounded-full text-xs font-sans font-semibold text-[#1C1817] shadow-xs">
              <span className="text-[#9B2226]">Reel {String(currentSlideIndex + 1).padStart(2, '0')}</span>
              <span className="text-[#B89358]">&bull;</span>
              <span className="text-[#6E6259]">0{totalReels}</span>
            </div>

            {/* Prev / Next Header Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevSlide}
                aria-label="Previous reel slide"
                className="w-9 h-9 rounded-full bg-[#FFFFFF] hover:bg-[#1C1817] text-[#1C1817] hover:text-[#FFFFFF] border border-[rgba(184,147,88,0.3)] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextSlide}
                aria-label="Next reel slide"
                className="w-9 h-9 rounded-full bg-[#FFFFFF] hover:bg-[#1C1817] text-[#1C1817] hover:text-[#FFFFFF] border border-[rgba(184,147,88,0.3)] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Outfit Selector Pill Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
            <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#6E6259] font-sans font-semibold">
              SELECT OUTFIT TO WATCH REEL:
            </span>
            <span className="text-[10px] text-[#B89358] font-sans font-medium hidden sm:inline-block">
              Swipe on card or click tabs to advance
            </span>
          </div>

          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {reels.map((reel, idx) => {
              const isSelected = currentSlideIndex === idx;
              return (
                <button
                  key={reel.id}
                  onClick={() => goToSlide(idx)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-sans tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer font-semibold flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#9B2226] text-[#FFFFFF] shadow-sm scale-102'
                      : 'bg-[#FFFFFF] text-[#574F48] border border-[rgba(184,147,88,0.25)] hover:border-[#B89358]'
                  }`}
                >
                  <span className={isSelected ? 'text-[#D8C0A0]' : 'text-[#B89358]'}>
                    0{idx + 1}
                  </span>
                  <span>&bull;</span>
                  <span>{reel.productName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ONE-BY-ONE SLIDESHOW THEATER STAGE WITH SWIPE SUPPORT */}
        <div className="relative py-2 sm:py-6 flex items-center justify-center">
          
          {/* Desktop Left Flanking Slide Preview (Clickable to switch) */}
          <div
            onClick={handlePrevSlide}
            className="hidden lg:block absolute left-8 xl:left-14 top-1/2 -translate-y-1/2 w-[240px] xl:w-[280px] aspect-[9/16] rounded-sm overflow-hidden opacity-40 hover:opacity-75 transition-all duration-300 scale-90 cursor-pointer border border-[rgba(184,147,88,0.2)] bg-[#1C1817] shadow-lg select-none group"
            title={`Previous: ${prevReel.title}`}
          >
            {prevProduct && (
              <ProductImage
                product={prevProduct}
                aspectRatio="portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1817] via-[#1C1817]/40 to-transparent" />
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#FFFFFF]/80 text-[#1C1817] text-[9px] font-sans font-bold flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" />
              <span>PREVIOUS</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 text-left text-white">
              <span className="text-[8px] uppercase tracking-wider text-[#D8C0A0] block font-sans">
                {prevReel.productName}
              </span>
              <p className="text-xs font-serif font-semibold truncate text-[#FFFFFF]">
                {prevReel.title}
              </p>
            </div>
          </div>

          {/* Desktop Right Flanking Slide Preview (Clickable to switch) */}
          <div
            onClick={handleNextSlide}
            className="hidden lg:block absolute right-8 xl:right-14 top-1/2 -translate-y-1/2 w-[240px] xl:w-[280px] aspect-[9/16] rounded-sm overflow-hidden opacity-40 hover:opacity-75 transition-all duration-300 scale-90 cursor-pointer border border-[rgba(184,147,88,0.2)] bg-[#1C1817] shadow-lg select-none group"
            title={`Next: ${nextReel.title}`}
          >
            {nextProduct && (
              <ProductImage
                product={nextProduct}
                aspectRatio="portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1817] via-[#1C1817]/40 to-transparent" />
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#FFFFFF]/80 text-[#1C1817] text-[9px] font-sans font-bold flex items-center gap-1">
              <span>NEXT</span>
              <ChevronRight className="w-3 h-3" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 text-left text-white">
              <span className="text-[8px] uppercase tracking-wider text-[#D8C0A0] block font-sans">
                {nextReel.productName}
              </span>
              <p className="text-xs font-serif font-semibold truncate text-[#FFFFFF]">
                {nextReel.title}
              </p>
            </div>
          </div>

          {/* Main Active One-by-One Slide Reel Frame */}
          <div
            id="active-slideshow-container"
            className="relative w-full max-w-[400px] aspect-[9/16] z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Navigation Floating Arrows Beside the Active Card */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous reel"
              className="hidden sm:flex absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#FFFFFF] hover:bg-[#9B2226] text-[#1C1817] hover:text-[#FFFFFF] border border-[rgba(184,147,88,0.35)] shadow-xl items-center justify-center transition-all hover:scale-105 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextSlide}
              aria-label="Next reel"
              className="hidden sm:flex absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#FFFFFF] hover:bg-[#9B2226] text-[#1C1817] hover:text-[#FFFFFF] border border-[rgba(184,147,88,0.35)] shadow-xl items-center justify-center transition-all hover:scale-105 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <AnimatePresence initial={false} custom={slideDirection} mode="wait">
              <motion.div
                key={activeSlideReel.id}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.x < -40 || velocity.x < -300) {
                    handleNextSlide();
                  } else if (offset.x > 40 || velocity.x > 300) {
                    handlePrevSlide();
                  }
                }}
                className="w-full h-full relative rounded-sm sm:rounded-md overflow-hidden bg-[#1C1817] border border-[rgba(184,147,88,0.35)] shadow-2xl flex flex-col justify-between select-none cursor-grab active:cursor-grabbing"
              >
                {/* 1. Top Story Segment Progress Bars (One segment per reel) */}
                <div className="absolute top-2 inset-x-3 z-30 flex gap-1.5">
                  {reels.map((_, idx) => {
                    let fill = '0%';
                    if (idx < currentSlideIndex) fill = '100%';
                    else if (idx === currentSlideIndex) fill = `${progress}%`;

                    return (
                      <div
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToSlide(idx);
                        }}
                        className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                      >
                        <div
                          className="h-full bg-[#D8C0A0] transition-all duration-100 ease-linear"
                          style={{ width: fill }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* 2. Top Header Overlay with Brand, Sound, Views & Expand */}
                <div className="relative z-30 pt-6 px-4 pb-3 flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xs sm:text-sm tracking-wider text-[#FFFFFF] font-bold uppercase">
                      {BRAND_DETAILS.brandName}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    <span className="text-[10px] text-[#D8C0A0] tracking-wider uppercase font-semibold">
                      IN MOTION
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded-full bg-[#1C1817]/70 text-[#D8C0A0] border border-white/20 text-[10px] font-medium font-sans">
                      {activeSlideReel.views} views
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="p-1.5 rounded-full bg-[#1C1817]/80 text-[#FFFFFF] hover:text-[#D8C0A0] border border-white/20 transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#25D366]" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveReel(activeSlideReel);
                      }}
                      className="p-1.5 rounded-full bg-[#1C1817]/80 text-[#FFFFFF] hover:text-[#D8C0A0] border border-white/20 transition-colors cursor-pointer"
                      aria-label="Open in full screen theater mode"
                      title="Full Screen Theater"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 3. Main Stage Visual Image with Cinematic Motion */}
                <div
                  className="absolute inset-0 z-10 overflow-hidden cursor-pointer"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {activeSlideProduct && (
                    <div
                      className={`w-full h-full transition-transform duration-[7000ms] ease-out ${
                        isPlaying ? 'scale-110' : 'scale-100'
                      }`}
                    >
                      <ProductImage
                        product={activeSlideProduct}
                        aspectRatio="portrait"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Gradient Scrims for pristine readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1817] via-[#1C1817]/25 to-[#1C1817]/70 pointer-events-none" />

                  {/* Tap to Play/Pause Center Indicator when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="p-4 rounded-full bg-[#1C1817]/85 text-[#D8C0A0] border border-[#D8C0A0]/60 shadow-xl backdrop-blur-xs">
                        <Pause className="w-8 h-8" />
                      </div>
                    </div>
                  )}

                  {/* Gentle Floating Swipe Hint on Mobile */}
                  <div className="sm:hidden absolute top-14 inset-x-0 flex justify-center pointer-events-none z-20">
                    <span className="px-2.5 py-1 rounded-full bg-[#080808]/60 text-white/90 text-[10px] font-sans font-medium backdrop-blur-xs tracking-wider">
                      &larr; Swipe to view next reel &rarr;
                    </span>
                  </div>
                </div>

                {/* 4. Bottom Reel Narrative & Interactive Action Bar */}
                <div className="relative z-30 p-4 sm:p-5 space-y-3 bg-gradient-to-t from-[#1C1817] via-[#1C1817]/95 to-transparent">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] tracking-[0.24em] uppercase text-[#D8C0A0] font-sans font-semibold">
                        {activeSlideProduct?.category || 'HAUTE COUTURE'} &bull; DURATION {activeSlideReel.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl text-[#FFFFFF] font-bold leading-snug">
                      {activeSlideReel.title}
                    </h3>
                    <p className="text-xs text-[#E8E4DD] font-sans font-normal mt-1 line-clamp-2">
                      {activeSlideReel.caption}
                    </p>
                  </div>

                  {/* Featured Piece Card Pill */}
                  {activeSlideProduct && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(activeSlideProduct);
                      }}
                      className="p-2.5 bg-[#FFFFFF]/10 backdrop-blur-md border border-[rgba(216,192,160,0.35)] hover:border-[#D8C0A0] rounded-xs flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-10 rounded-xs overflow-hidden shrink-0 bg-[#1C1817]">
                          <ProductImage
                            product={activeSlideProduct}
                            aspectRatio="portrait"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-wider text-[#D8C0A0] block font-medium">
                            Featured Lehenga:
                          </span>
                          <span className="text-xs font-serif text-[#FFFFFF] font-semibold truncate block group-hover:text-[#D8C0A0] transition-colors">
                            {activeSlideProduct.name}
                          </span>
                        </div>
                      </div>

                      <div className="text-right pl-2 shrink-0">
                        <span className="font-serif text-xs text-[#D8C0A0] font-bold block">
                          {activeSlideProduct.price}
                        </span>
                        <span className="text-[9px] text-white/70 underline group-hover:text-white">
                          View details &rarr;
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Reel CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeSlideProduct) {
                          onSelectProduct(activeSlideProduct);
                        }
                      }}
                      className="py-2.5 px-3 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#1C1817] rounded-xs text-[11px] uppercase tracking-wider font-sans font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-97"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#9B2226]" />
                      <span>View Piece</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppFromReel(activeSlideReel);
                      }}
                      className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] font-bold rounded-xs text-[11px] uppercase tracking-wider font-sans flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-97"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Bottom Slideshow Pagination Dots and Swipe Guidance */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {reels.map((_, idx) => {
              const isActive = currentSlideIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Jump to reel ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-7 h-2 bg-[#9B2226]'
                      : 'w-2 h-2 bg-[#1C1817]/25 hover:bg-[#1C1817]/50'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#6E6259] font-sans">
            <span>Tip: Swipe horizontally or use arrow buttons to watch each reel</span>
          </div>
        </div>

      </div>

      {/* Full-Screen 9:16 Luxury Reel Modal Player (Triggered when user clicks Fullscreen icon) */}
      {activeReel && (
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
              const currentIndex = reels.findIndex((r) => r.id === activeReel.id);
              const prev = (currentIndex - 1 + reels.length) % reels.length;
              setActiveReel(reels[prev]);
            }}
            className="hidden sm:flex absolute left-6 z-50 p-3 rounded-full bg-[#FFFFFF] text-[#1C1817] hover:text-[#B89358] border border-[rgba(184,147,88,0.3)] shadow-lg transition-colors cursor-pointer"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = reels.findIndex((r) => r.id === activeReel.id);
              const next = (currentIndex + 1) % reels.length;
              setActiveReel(reels[next]);
            }}
            className="hidden sm:flex absolute right-6 z-50 p-3 rounded-full bg-[#FFFFFF] text-[#1C1817] hover:text-[#B89358] border border-[rgba(184,147,88,0.3)] shadow-lg transition-colors cursor-pointer"
            aria-label="Next reel"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Vertical Reel Container */}
          {(() => {
            const currentReelProduct = products.find((p) => p.id === activeReel.productId);
            return (
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
                    {currentReelProduct && (
                      <ProductImage
                        product={currentReelProduct}
                        aspectRatio="portrait"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1817] via-[#1C1817]/20 to-[#1C1817]/70 pointer-events-none" />

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
                    <span className="text-[10px] text-[#D8C0A0] tracking-wider uppercase font-medium">Theater Mode</span>
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
                      {currentReelProduct?.category} &bull; {activeReel.views} VIEWS
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FFFFFF] font-bold leading-snug">
                      {activeReel.title}
                    </h3>
                    <p className="text-xs text-[#E8E4DD] font-sans font-normal mt-1 line-clamp-2">
                      {activeReel.caption}
                    </p>
                  </div>

                  {/* Featured Piece Bar */}
                  {currentReelProduct && (
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
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        setActiveReel(null);
                        if (currentReelProduct) {
                          onSelectProduct(currentReelProduct);
                        }
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
            );
          })()}
        </div>
      )}

    </section>
  );
};
