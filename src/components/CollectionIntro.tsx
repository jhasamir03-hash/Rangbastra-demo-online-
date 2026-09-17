import React from 'react';
import { Sparkles } from 'lucide-react';

export const CollectionIntro: React.FC = () => {
  return (
    <div id="catalogue-intro-section" className="text-center max-w-3xl mx-auto px-4 pt-14 pb-8 sm:pt-20 sm:pb-10">
      <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[rgba(184,147,88,0.3)] shadow-xs">
        <Sparkles className="w-3 h-3 text-[#B89358]" />
        <span className="text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#9B2226] font-sans font-semibold">
          NAVRATRI & FESTIVE ATELIER CATALOGUE
        </span>
      </div>

      <h2
        id="catalogue-section-heading"
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1817] tracking-tight mb-2.5"
      >
        ALL ATELIER CREATIONS
      </h2>

      <p
        id="catalogue-supporting-text"
        className="text-sm sm:text-base text-[#574F48] font-sans font-normal tracking-wide max-w-lg mx-auto"
      >
        Explore the 7 handcrafted ceremonial and festive lehengas by Rangbastra. Each piece is tailored bespoke to your measurements.
      </p>
    </div>
  );
};
