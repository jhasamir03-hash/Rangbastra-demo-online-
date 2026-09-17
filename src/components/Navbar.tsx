import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
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

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md border-b border-[rgba(184,147,88,0.25)] py-3'
          : 'bg-[#FAF8F5] border-b border-[rgba(184,147,88,0.18)] py-3.5 sm:py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1817] hover:text-[#B89358] transition-colors focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Brand Wordmark with Navratri Festive Elegance */}
        <div
          id="brand-logo-container"
          className="flex flex-col items-center md:items-start text-center md:text-left cursor-pointer group"
          onClick={onNavigateHome}
        >
          <span
            id="brand-wordmark"
            className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#1C1817] font-semibold uppercase group-hover:text-[#B89358] transition-colors"
          >
            {BRAND_DETAILS.brandName}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.32em] text-[#B89358] uppercase font-sans font-medium -mt-0.5">
            HAUTE COUTURE &bull; BRIDAL ATELIER
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            id="nav-link-collections"
            onClick={onNavigateToCollection}
            className="text-[11px] lg:text-xs tracking-[0.2em] uppercase text-[#574F48] hover:text-[#B89358] transition-colors font-sans font-medium"
          >
            Collections
          </button>
          <button
            id="nav-link-products"
            onClick={onNavigateToProducts}
            className="text-[11px] lg:text-xs tracking-[0.2em] uppercase text-[#574F48] hover:text-[#B89358] transition-colors font-sans font-medium"
          >
            All Pieces
          </button>
          <button
            id="nav-link-reels"
            onClick={onNavigateToReels}
            className="text-[11px] lg:text-xs tracking-[0.2em] uppercase text-[#574F48] hover:text-[#B89358] transition-colors font-sans font-medium flex items-center gap-1.5"
          >
            <span>Atelier Reels</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#9B2226]/10 text-[#9B2226] text-[9px] font-semibold">Motion</span>
          </button>
          <button
            id="nav-link-reviews"
            onClick={onNavigateToReviews}
            className="text-[11px] lg:text-xs tracking-[0.2em] uppercase text-[#574F48] hover:text-[#B89358] transition-colors font-sans font-medium"
          >
            Client Reviews
          </button>
        </nav>

        {/* Right Subtle Atelier Touch / Lead Name & Navratri Festive Pill */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9B2226]/8 border border-[#9B2226]/20 text-[#9B2226] text-[10px] font-sans font-medium tracking-wider">
            <Sparkles className="w-3 h-3 text-[#9B2226]" />
            <span>NAVRATRI EDIT</span>
          </div>
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#6E6259] font-sans">
            BY <span className="text-[#1C1817] font-semibold">{BRAND_DETAILS.ownerName}</span>
          </span>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="md:hidden bg-[#FFFFFF] border-b border-[rgba(184,147,88,0.22)] px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="text-center pb-3 border-b border-[rgba(184,147,88,0.15)]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#9B2226]/10 text-[#9B2226] text-[9px] font-sans font-semibold tracking-widest uppercase mb-1">
              Navratri Festive Collection
            </div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#B89358] font-medium font-sans">RANGBASTRA ATELIER</p>
            <p className="text-xs text-[#6E6259] mt-0.5 font-sans">Curated by Bhagirathi</p>
          </div>

          <button
            id="mobile-nav-collections"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToCollection();
            }}
            className="block w-full text-left py-2.5 text-xs tracking-[0.2em] uppercase text-[#1C1817] hover:text-[#B89358] border-b border-black/5 font-sans font-medium"
          >
            The Collections
          </button>
          <button
            id="mobile-nav-products"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToProducts();
            }}
            className="block w-full text-left py-2.5 text-xs tracking-[0.2em] uppercase text-[#1C1817] hover:text-[#B89358] border-b border-black/5 font-sans font-medium"
          >
            All Products & Categories
          </button>
          <button
            id="mobile-nav-reels"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToReels();
            }}
            className="block w-full text-left py-2.5 text-xs tracking-[0.2em] uppercase text-[#1C1817] hover:text-[#B89358] border-b border-black/5 font-sans font-medium"
          >
            Atelier Reels (In Motion per Product)
          </button>
          <button
            id="mobile-nav-reviews"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToReviews();
            }}
            className="block w-full text-left py-2.5 text-xs tracking-[0.2em] uppercase text-[#1C1817] hover:text-[#B89358] font-sans font-medium"
          >
            Client Diaries & Reviews
          </button>
        </div>
      )}
    </header>
  );
};
