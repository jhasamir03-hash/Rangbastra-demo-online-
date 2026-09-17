import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_DETAILS } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [minimized, setMinimized] = useState(false);

  const handleClick = () => {
    window.open(BRAND_DETAILS.createGeneralWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {!minimized && (
        <div className="hidden sm:flex items-center gap-2.5 bg-[#FFFFFF] border border-[rgba(184,147,88,0.35)] text-[#1C1817] px-3.5 py-2 rounded-full shadow-xl backdrop-blur-md text-xs font-sans animate-in fade-in slide-in-from-right-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="tracking-wide font-medium">Atelier WhatsApp &bull; Bhagirathi</span>
          <button
            onClick={() => setMinimized(true)}
            className="text-[#6E6259] hover:text-[#1C1817] ml-1 p-0.5 cursor-pointer"
            aria-label="Dismiss label"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <button
        id="floating-whatsapp-btn"
        onClick={handleClick}
        aria-label="Chat with Rangbastra on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-hidden cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="sr-only">Chat on WhatsApp</span>
      </button>
    </div>
  );
};
