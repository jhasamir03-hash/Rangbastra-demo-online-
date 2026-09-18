import React from 'react';
import { ArrowDown, Sparkles, Compass, Flame } from 'lucide-react';
import { BRAND_DETAILS } from '../data/products';

interface HeroSectionProps {
  onExploreCollections: () => void;
  onExploreProducts: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollections,
  onExploreProducts,
}) => {
  return (
    <section
      id="brand-hero-section"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#F7F3EC] text-[#1C1817] py-8 sm:py-16 md:py-24 border-b border-[rgba(184,147,88,0.22)] flex items-center justify-center"
    >
      {/* Festive ambient glow strictly constrained to avoid overflow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[min(100vw,700px)] h-[min(60vh,480px)] bg-[radial-gradient(ellipse_at_center,rgba(200,169,126,0.18)_0%,rgba(155,34,38,0.04)_40%,transparent_75%)]" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#F7F3EC] to-transparent" />
      </div>

      {/* Hero Editorial Content */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Navratri Festive Announcement Badge (Wraps naturally on mobile without cut off) */}
        <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[rgba(184,147,88,0.35)] shadow-xs mb-4 sm:mb-6 max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-[#B89358] shrink-0" />
          <span className="text-[9.5px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.2em] uppercase text-[#9B2226] font-sans font-semibold text-center leading-normal">
            NAVRATRI & FESTIVE BRIDAL EDIT &bull; CURATED BY BHAGIRATHI
          </span>
        </div>

        {/* Grand Brand Headline in Playfair / Serif with Fluid Clamp */}
        <h1
          id="hero-brand-title"
          className="font-serif text-[clamp(1.75rem,7.5vw,4.5rem)] font-bold tracking-[0.08em] sm:tracking-[0.16em] text-[#1C1817] uppercase leading-[1.1] mb-3 sm:mb-5 max-w-full break-words"
        >
          {BRAND_DETAILS.brandName}
        </h1>

        {/* Editorial Subtitle & Mission Statement with Clamp and constrained width */}
        <p
          id="hero-narrative"
          className="text-xs sm:text-base md:text-lg text-[#574F48] font-sans font-normal leading-relaxed max-w-[min(100%,580px)] mx-auto mb-6 sm:mb-9 px-1 sm:px-0"
        >
          Nine nights of festive celebration, royal circular flares, and hand-embroidered zardozi crafted for vibrant Garba twirls and ceremonial splendour.
        </p>

        {/* Hero Action CTAs - Responsive horizontal/centered buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-[min(100%,360px)] sm:max-w-none mx-auto mb-8 sm:mb-12">
          <button
            id="hero-explore-collections-btn"
            onClick={onExploreCollections}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-[#1C1817] hover:bg-[#332D29] text-[#FFFFFF] transition-colors text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase font-sans font-semibold rounded-xs shadow-md flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
          >
            <span>EXPLORE COLLECTIONS</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B89358] group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            id="hero-view-products-btn"
            onClick={onExploreProducts}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#1C1817] border border-[rgba(184,147,88,0.45)] hover:border-[#B89358] transition-colors text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase font-sans font-semibold rounded-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Compass className="w-3.5 h-3.5 text-[#B89358]" />
            <span>VIEW ALL 7 PIECES</span>
          </button>
        </div>

        {/* Festive Atelier Pillars - Robust 2-Col Grid on Mobile, 4-Col on Desktop with Equal Width Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 pt-5 sm:pt-8 border-t border-[rgba(184,147,88,0.22)] w-full max-w-4xl text-center">
          <div className="p-2.5 sm:p-3 bg-[#FFFFFF]/70 sm:bg-transparent rounded-xs border border-[rgba(184,147,88,0.18)] sm:border-0 shadow-xs sm:shadow-none min-w-0">
            <span className="block font-serif text-base sm:text-xl lg:text-2xl text-[#1C1817] font-semibold truncate leading-tight">Handcrafted</span>
            <span className="text-[8.5px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.18em] uppercase text-[#6E6259] font-sans font-medium block mt-1 truncate">Artisanal Zardozi</span>
          </div>
          <div className="p-2.5 sm:p-3 bg-[#FFFFFF]/70 sm:bg-transparent rounded-xs border border-[rgba(184,147,88,0.18)] sm:border-0 shadow-xs sm:shadow-none min-w-0">
            <span className="block font-serif text-base sm:text-xl lg:text-2xl text-[#1C1817] font-semibold truncate leading-tight">Bespoke</span>
            <span className="text-[8.5px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.18em] uppercase text-[#6E6259] font-sans font-medium block mt-1 truncate">Made To Measure</span>
          </div>
          <div className="p-2.5 sm:p-3 bg-[#FFFFFF]/70 sm:bg-transparent rounded-xs border border-[rgba(184,147,88,0.18)] sm:border-0 shadow-xs sm:shadow-none min-w-0">
            <span className="block font-serif text-base sm:text-xl lg:text-2xl text-[#9B2226] font-semibold truncate leading-tight">Navratri Twirl</span>
            <span className="text-[8.5px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.18em] uppercase text-[#6E6259] font-sans font-medium block mt-1 truncate">360° Ghera Flares</span>
          </div>
          <div className="p-2.5 sm:p-3 bg-[#FFFFFF]/70 sm:bg-transparent rounded-xs border border-[rgba(184,147,88,0.18)] sm:border-0 shadow-xs sm:shadow-none min-w-0">
            <span className="block font-serif text-base sm:text-xl lg:text-2xl text-[#1C1817] font-semibold truncate leading-tight">Personal</span>
            <span className="text-[8.5px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.18em] uppercase text-[#6E6259] font-sans font-medium block mt-1 truncate">Atelier Consults</span>
          </div>
        </div>

      </div>
    </section>
  );
};
