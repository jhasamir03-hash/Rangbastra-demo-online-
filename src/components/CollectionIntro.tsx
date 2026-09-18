import React from 'react';
import { Sparkles } from 'lucide-react';

export const CollectionIntro: React.FC = () => {
  return (
    <div id="catalogue-intro-section" className="text-center max-w-3xl mx-auto px-4 pt-8 pb-4 sm:pt-16 sm:pb-8">
      <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[rgba(184,147,88,0.3)] shadow-xs">
        <Sparkles className="w-3 h-3 text-[#B89358]" />
        <span className="text-[9.5px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.24em] uppercase text-[#9B2226] font-sans font-semibold">
          NAVRATRI & FESTIVE ATELIER CATALOGUE
        </span>
      </div>

      <h2
        id="catalogue-section-heading"
        className="font-serif text-[clamp(1.5rem,5vw,2.75rem)] font-bold text-[#1C1817] tracking-tight mb-2"
      >
        ALL ATELIER CREATIONS
      </h2>

      <p
        id="catalogue-supporting-text"
        className="text-xs sm:text-base text-[#574F48] font-sans font-normal tracking-wide max-w-[min(100%,540px)] mx-auto leading-relaxed"
      >
        Explore the 7 handcrafted ceremonial and festive lehengas by Rangbastra. Each piece is tailored bespoke to your measurements.
      </p>
    </div>
  );
};
