import React from 'react';
import {
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  MapPin,
  Clock,
  ArrowUp,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { BRAND_DETAILS } from '../data/products';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open(BRAND_DETAILS.createGeneralWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <footer
      id="showroom-footer"
      className="w-full bg-[#1C1817] text-[#FAF8F5] border-t border-[rgba(184,147,88,0.25)] pt-16 sm:pt-20 pb-12 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 pb-14 border-b border-white/10">
          
          {/* Brand Identity & Founder Column (5 cols) */}
          <div className="md:col-span-5 space-y-5 text-center md:text-left">
            <div>
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.22em] text-[#FAF8F5] uppercase block font-bold">
                {BRAND_DETAILS.brandName}
              </span>
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#D8C0A0] mt-1 font-semibold">
                HAUTE COUTURE &bull; BRIDAL & FESTIVE ATELIER
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#C8C2BC] font-normal leading-relaxed max-w-sm mx-auto md:mx-0">
              Timeless ceremonial lehengas, vibrant Navratri Garba twirls, intricate hand-zardozi craftsmanship, and bespoke made-to-measure couture.
            </p>

            <div className="pt-1 text-xs text-[#C8C2BC]">
              <span className="text-[#D8C0A0] block text-[11px] uppercase tracking-wider font-semibold">
                Showroom Lead & Founder:
              </span>
              <span className="font-semibold text-[#FAF8F5] text-sm font-serif">
                Bhagirathi
              </span>
            </div>

            {/* Social Media Channels in Footer */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.26em] text-[#D8C0A0] block mb-3 font-semibold">
                Follow Atelier Journey
              </span>
              <div className="flex items-center justify-center md:justify-start gap-3">
                {/* Instagram */}
                <a
                  href="https://instagram.com/rangbastra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#2A2422] hover:bg-[#38312E] border border-[rgba(184,147,88,0.3)] hover:border-[#D8C0A0] text-[#D8C0A0] hover:text-[#FAF8F5] transition-all"
                  aria-label="Rangbastra on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  className="p-2.5 rounded-full bg-[#2A2422] hover:bg-[#38312E] border border-[rgba(184,147,88,0.3)] hover:border-[#25D366] text-[#D8C0A0] hover:text-[#25D366] transition-all cursor-pointer"
                  aria-label="WhatsApp Concierge"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#2A2422] hover:bg-[#38312E] border border-[rgba(184,147,88,0.3)] hover:border-[#D8C0A0] text-[#D8C0A0] hover:text-[#FAF8F5] transition-all"
                  aria-label="Rangbastra on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#2A2422] hover:bg-[#38312E] border border-[rgba(184,147,88,0.3)] hover:border-[#D8C0A0] text-[#D8C0A0] hover:text-[#FAF8F5] transition-all"
                  aria-label="Rangbastra on Pinterest"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#2A2422] hover:bg-[#38312E] border border-[rgba(184,147,88,0.3)] hover:border-[#D8C0A0] text-[#D8C0A0] hover:text-[#FAF8F5] transition-all"
                  aria-label="Rangbastra on YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bespoke Concierge & Direct Consultation (4 cols) */}
          <div className="md:col-span-4 space-y-4 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.24em] text-[#D8C0A0] block font-semibold">
              Bespoke Concierge
            </span>

            <ul className="space-y-3 text-xs text-[#C8C2BC]">
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#D8C0A0] shrink-0" />
                <span>Showroom & Digital Video Consults Daily</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#D8C0A0] shrink-0" />
                <span>Pan-India Courier & International Express Shipping</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D8C0A0] shrink-0" />
                <span>Made-to-Order Custom Blouse & Ghera Sizing</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D8C0A0] shrink-0" />
                <span>Direct consultation with Bhagirathi</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                id="footer-whatsapp-btn"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] font-semibold rounded-full text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: Enquire with Bhagirathi</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between items-center md:items-end text-center md:text-right space-y-6">
            <div className="space-y-2.5 text-xs">
              <span className="text-xs uppercase tracking-[0.24em] text-[#D8C0A0] block font-semibold">
                Atelier Navigation
              </span>
              <p className="text-[#C8C2BC] hover:text-[#FAF8F5] transition-colors cursor-pointer" onClick={scrollToTop}>
                The Festive Edit
              </p>
              <p className="text-[#C8C2BC] hover:text-[#FAF8F5] transition-colors cursor-pointer" onClick={scrollToTop}>
                Occasion Wear Lehengas
              </p>
              <p className="text-[#C8C2BC] hover:text-[#FAF8F5] transition-colors cursor-pointer" onClick={scrollToTop}>
                Client Diaries & Reviews
              </p>
              <p className="text-[#C8C2BC] hover:text-[#FAF8F5] transition-colors cursor-pointer" onClick={scrollToTop}>
                Atelier In-Motion Reels
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-[#2A2422] hover:bg-[#38312E] border border-[rgba(184,147,88,0.3)] text-[#D8C0A0] hover:border-[#D8C0A0] transition-colors cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A98F7A]">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_DETAILS.brandName}. All rights reserved. Brand curated by {BRAND_DETAILS.ownerName}.
          </p>
          <p className="text-[#D8C0A0] tracking-wider uppercase font-medium">
            Luxury Indian Bridal & Navratri Festive Haute Couture
          </p>
        </div>

      </div>
    </footer>
  );
};
