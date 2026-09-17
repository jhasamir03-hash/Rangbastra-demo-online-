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
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#F7F3EC] text-[#1C1817] py-16 sm:py-24 md:py-32 border-b border-[rgba(184,147,88,0.22)] flex items-center justify-center min-h-[70vh]"
    >
      {/* Festive ambient glow with warm champagne and royal festive warmth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(200,169,126,0.18)_0%,rgba(155,34,38,0.04)_40%,transparent_75%)]" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#F7F3EC] to-transparent" />
      </div>

      {/* Hero Editorial Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Navratri Festive Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[rgba(184,147,88,0.35)] shadow-xs mb-6 sm:mb-8 animate-in fade-in duration-500">
          <Sparkles className="w-3.5 h-3.5 text-[#B89358]" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#9B2226] font-sans font-semibold">
            NAVRATRI & FESTIVE BRIDAL EDIT &bull; CURATED BY BHAGIRATHI
          </span>
        </div>

        {/* Grand Brand Headline in Montserrat */}
        <h1
          id="hero-brand-title"
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-[#1C1817] uppercase leading-[1.08] mb-5 sm:mb-7"
        >
          {BRAND_DETAILS.brandName}
        </h1>

        {/* Editorial Subtitle & Mission Statement */}
        <p
          id="hero-narrative"
          className="text-base sm:text-lg md:text-xl text-[#574F48] font-sans font-normal leading-relaxed max-w-2xl mx-auto mb-9 sm:mb-11"
        >
          Nine nights of festive celebration, royal circular flares, and hand-embroidered zardozi crafted for vibrant Garba twirls and ceremonial splendour.
        </p>

        {/* Hero Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto mb-12 sm:mb-14">
          <button
            id="hero-explore-collections-btn"
            onClick={onExploreCollections}
            className="w-full sm:w-auto px-9 py-4 bg-[#1C1817] hover:bg-[#332D29] text-[#FFFFFF] transition-all duration-200 text-xs tracking-[0.22em] uppercase font-sans font-semibold rounded-xs shadow-lg flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>EXPLORE COLLECTIONS</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B89358] group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            id="hero-view-products-btn"
            onClick={onExploreProducts}
            className="w-full sm:w-auto px-8 py-4 bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#1C1817] border border-[rgba(184,147,88,0.45)] hover:border-[#B89358] transition-all duration-200 text-xs tracking-[0.22em] uppercase font-sans font-semibold rounded-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#B89358]" />
            <span>VIEW ALL 7 PIECES</span>
          </button>
        </div>

        {/* Festive Atelier Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-[rgba(184,147,88,0.22)] w-full max-w-4xl text-center">
          <div>
            <span className="block font-serif text-xl sm:text-2xl text-[#1C1817] font-semibold">Handcrafted</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#6E6259] font-sans font-medium">Artisanal Zardozi</span>
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl text-[#1C1817] font-semibold">Bespoke</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#6E6259] font-sans font-medium">Made To Measure</span>
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl text-[#9B2226] font-semibold">Navratri Twirl</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#6E6259] font-sans font-medium">360° Ghera Flares</span>
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl text-[#1C1817] font-semibold">Personal</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#6E6259] font-sans font-medium">Atelier Consults</span>
          </div>
        </div>

      </div>
    </section>
  );
};
