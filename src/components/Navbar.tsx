import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { BRAND_DETAILS } from '../data/products';

interface NavbarProps {
  onNavigateToCollection: () => void;
  onNavigateToProducts: () => void;
  onNavigateToReels: () => void;
  onNavigateToReviews: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToCollection,
  onNavigateToProducts,
  onNavigateToReels,
  onNavigateToReviews,
  onNavigateHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickWhatsApp = () => {
    window.open(BRAND_DETAILS.createGeneralWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/98 backdrop-blur-md shadow-sm border-b border-[rgba(184,147,88,0.25)] py-2 sm:py-2.5'
          : 'bg-[#FAF8F5] border-b border-[rgba(184,147,88,0.2)] py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Responsive Grid Header: Left Navigation / Mobile Toggle | Center Logo | Right Links & Contact */}
        <div className="flex items-center justify-between relative min-h-[44px] sm:min-h-[48px]">
          
          {/* LEFT SECTION (Desktop Nav or Mobile Hamburger Button) */}
          <div className="flex items-center w-10 sm:w-12 md:w-auto md:flex-1 justify-start shrink-0">
            {/* Mobile Hamburger Button (44px min touch target) */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#1C1817] hover:text-[#B89358] transition-colors rounded-xs focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Left Nav Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <button
                id="nav-link-collections"
                onClick={onNavigateToCollection}
                className="text-[11px] lg:text-xs tracking-[0.2em] uppercase text-[#574F48] hover:text-[#B89358] transition-colors font-sans font-medium py-1 cursor-pointer"
              >
                Collections
              </button>
              <button
                id="nav-link-products"
                onClick={onNavigateToProducts}
                className="text-[11px] lg:text-xs tracking-[0.2em] uppercase text-[#574F48] hover:text-[#B89358] transition-colors font-sans font-medium py-1 cursor-pointer"
              >
                All Pieces
              </button>
              <button
                id="nav-link-reels"
                onClick={onNavigateToReels}
                className="text-[11px] lg:text-xs tracking-[0.2em] uppercase text-[#574F48] hover:text-[#B89358] transition-colors font-sans font-medium py-1 cursor-pointer flex items-center gap-1.5"
              >
                <span>Atelier Reels</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#9B2226]/10 text-[#9B2226] text-[9px] font-semibold">Motion</span>
              </button>
            </nav>
          </div>

          {/* CENTER SECTION: Centered Text Logo for both Mobile & Desktop */}
          <div
            id="brand-logo-container"
            className="flex-1 flex flex-col items-center justify-center text-center cursor-pointer group px-1 sm:px-2 select-none min-w-0"
            onClick={onNavigateHome}
          >
            <span
              id="brand-wordmark"
              className="font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl tracking-[0.1em] sm:tracking-[0.22em] text-[#1C1817] font-semibold uppercase group-hover:text-[#B89358] transition-colors leading-tight truncate max-w-[200px] xs:max-w-[260px] sm:max-w-none"
            >
              {BRAND_DETAILS.brandName}
            </span>
            <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] md:text-[10px] tracking-[0.14em] sm:tracking-[0.32em] text-[#B89358] uppercase font-sans font-medium -mt-0.5 whitespace-nowrap">
              HAUTE COUTURE &bull; BRIDAL ATELIER
            </span>
          </div>

          {/* RIGHT SECTION: Desktop Extra Nav & WhatsApp Concierge / Mobile Right Quick WhatsApp Button */}
          <div className="flex items-center w-10 sm:w-12 md:w-auto md:flex-1 justify-end gap-3 lg:gap-5 shrink-0">
            
            {/* Mobile Right Action: Quick WhatsApp Action (balanced with left toggle button to maintain exact center logo) */}
            <div className="md:hidden flex justify-end">
              <button
                id="mobile-quick-whatsapp-btn"
                onClick={handleQuickWhatsApp}
                aria-label="Contact on WhatsApp: 091737 85595"
                title="WhatsApp: 091737 85595"
                className="w-10 h-10 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 flex items-center justify-center text-[#1E7E34] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
              </button>
            </div>

            {/* Desktop Right Nav Links & Badges */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              <button
                id="nav-link-reviews"
                onClick={onNavigateToReviews}
                className="text-[11px] lg:text-xs tracking-[0.2em] uppercase text-[#574F48] hover:text-[#B89358] transition-colors font-sans font-medium py-1 cursor-pointer"
              >
                Reviews
              </button>

              <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9B2226]/8 border border-[#9B2226]/20 text-[#9B2226] text-[10px] font-sans font-semibold tracking-wider">
                <Sparkles className="w-3 h-3 text-[#9B2226]" />
                <span>NAVRATRI EDIT</span>
              </div>

              {/* Direct WhatsApp Concierge with Phone Number in Tooltip */}
              <button
                id="desktop-header-whatsapp-btn"
                onClick={handleQuickWhatsApp}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] text-[11px] font-sans font-semibold tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
                title="WhatsApp: 091737 85595"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>091737 85595</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Smooth, accessible, touch-friendly) */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="md:hidden bg-[#FFFFFF] border-b border-[rgba(184,147,88,0.22)] px-5 py-5 space-y-3.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="text-center pb-3 border-b border-[rgba(184,147,88,0.15)]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#9B2226]/10 text-[#9B2226] text-[9px] font-sans font-semibold tracking-widest uppercase mb-1">
              Navratri Festive Collection
            </div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#B89358] font-medium font-sans">
              RANGBASTRA ATELIER
            </p>
            <p className="text-xs text-[#6E6259] mt-0.5 font-sans">
              Curated by Bhagirathi
            </p>
          </div>

          <nav className="space-y-1">
            <button
              id="mobile-nav-collections"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToCollection();
              }}
              className="w-full text-left py-3 px-2 text-xs tracking-[0.2em] uppercase text-[#1C1817] hover:text-[#B89358] border-b border-black/5 font-sans font-semibold flex items-center justify-between"
            >
              <span>The Collections</span>
              <span className="text-[#B89358] text-sm">&rarr;</span>
            </button>
            <button
              id="mobile-nav-products"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToProducts();
              }}
              className="w-full text-left py-3 px-2 text-xs tracking-[0.2em] uppercase text-[#1C1817] hover:text-[#B89358] border-b border-black/5 font-sans font-semibold flex items-center justify-between"
            >
              <span>All Pieces & Categories</span>
              <span className="text-[#B89358] text-sm">&rarr;</span>
            </button>
            <button
              id="mobile-nav-reels"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToReels();
              }}
              className="w-full text-left py-3 px-2 text-xs tracking-[0.2em] uppercase text-[#1C1817] hover:text-[#B89358] border-b border-black/5 font-sans font-semibold flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>Atelier Reels in Motion</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#9B2226]/10 text-[#9B2226] text-[9px]">Video</span>
              </div>
              <span className="text-[#B89358] text-sm">&rarr;</span>
            </button>
            <button
              id="mobile-nav-reviews"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToReviews();
              }}
              className="w-full text-left py-3 px-2 text-xs tracking-[0.2em] uppercase text-[#1C1817] hover:text-[#B89358] font-sans font-semibold flex items-center justify-between"
            >
              <span>Client Diaries & Reviews</span>
              <span className="text-[#B89358] text-sm">&rarr;</span>
            </button>
          </nav>

          {/* Direct WhatsApp Call to Action in Mobile Menu */}
          <div className="pt-2 border-t border-[rgba(184,147,88,0.15)]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleQuickWhatsApp();
              }}
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] font-bold rounded-xs text-xs uppercase tracking-wider font-sans flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp: 091737 85595</span>
            </button>
            <p className="text-[10px] text-[#6E6259] text-center mt-2 font-sans">
              Chat directly with Bhagirathi for custom measurements & showroom videos
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
