import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { X, MessageCircle, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { BRAND_DETAILS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const prefilledMessage = `Hi Rangbastra, I'm interested in the ${product.name} priced at ${product.price}. Please share more details.`;
  const whatsappUrl = BRAND_DETAILS.createProductWhatsAppUrl(product.name, product.price);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(prefilledMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id={`product-detail-card-${product.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#141414] border border-white/10 rounded-none sm:rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[100vh] sm:max-h-[90vh] text-[#F5F2EC]"
      >
        {/* Close Button Top Right */}
        <button
          id="close-product-detail-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#121212]/80 hover:bg-[#252525] text-[#F5F2EC] hover:text-[#C5A880] border border-white/10 transition-colors shadow-lg"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Generous Product Photography Stage */}
        <div className="w-full md:w-1/2 bg-[#0F0F0F] relative flex items-center justify-center overflow-hidden min-h-[380px] sm:min-h-[480px]">
          <ProductImage
            product={product}
            aspectRatio="portrait"
            className="w-full h-full max-h-[50vh] md:max-h-none object-cover"
          />

          {/* Photo Identification Badge */}
          <div className="absolute bottom-3 left-3 z-20">
            <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-xs bg-[#0A0A0A]/80 text-[#C5A880] border border-[#C5A880]/30 backdrop-blur-xs font-sans">
              Photo: {product.filename}
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Product Narrative & Enquiry Workflow */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#141414]">
          <div className="space-y-6">
            {/* Header: Category & Tone */}
            <div className="border-b border-white/5 pb-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-sans">
                  RANGBASTRA ATELIER &bull; {product.category}
                </span>
              </div>

              <h2
                id="modal-product-title"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F2EC] font-normal tracking-tight mt-2 leading-tight"
              >
                {product.name}
              </h2>

              {/* Exact Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8C8C8C] font-sans">
                  Showroom Price
                </span>
                <span
                  id="modal-product-price"
                  className="font-serif text-2xl sm:text-3xl text-[#F5F2EC] font-semibold tracking-wide"
                >
                  {product.price}
                </span>
              </div>
            </div>

            {/* Short Visual Description */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-sans mb-1.5">
                Overview
              </h3>
              <p className="text-sm text-[#C8C5BC] font-sans font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Visual Breakdown (Exact physical outfit characteristics) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-sans flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Visual Breakdown</span>
              </h3>

              <div className="grid grid-cols-1 gap-2.5 text-xs font-sans">
                <div className="p-3 bg-[#1A1A1A] rounded-xs border border-white/5">
                  <span className="text-[#A0A0A0] uppercase tracking-wider text-[10px] block mb-0.5">
                    Color Palette
                  </span>
                  <span className="text-[#F5F2EC] font-medium">
                    {product.visualDetails.palette}
                  </span>
                </div>

                <div className="p-3 bg-[#1A1A1A] rounded-xs border border-white/5">
                  <span className="text-[#A0A0A0] uppercase tracking-wider text-[10px] block mb-0.5">
                    Silhouette & Cut
                  </span>
                  <span className="text-[#F5F2EC] font-medium">
                    {product.visualDetails.silhouette}
                  </span>
                </div>

                <div className="p-3 bg-[#1A1A1A] rounded-xs border border-white/5">
                  <span className="text-[#A0A0A0] uppercase tracking-wider text-[10px] block mb-0.5">
                    Embroidery & Embellishments
                  </span>
                  <span className="text-[#F5F2EC] font-medium">
                    {product.visualDetails.embroidery}
                  </span>
                </div>

                <div className="p-3 bg-[#1A1A1A] rounded-xs border border-white/5">
                  <span className="text-[#A0A0A0] uppercase tracking-wider text-[10px] block mb-0.5">
                    Dupatta Styling
                  </span>
                  <span className="text-[#F5F2EC] font-medium">
                    {product.visualDetails.dupattaStyling}
                  </span>
                </div>
              </div>
            </div>

            {/* Pre-filled WhatsApp Message Preview */}
            <div className="p-3.5 bg-[#0F0F0F] rounded-xs border border-[#C5A880]/30 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-sans">
                <span className="text-[#C5A880] font-medium uppercase tracking-wider flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  Pre-filled WhatsApp Message:
                </span>
                <button
                  onClick={handleCopyMessage}
                  className="text-[#A0A0A0] hover:text-[#F5F2EC] flex items-center gap-1 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#25D366]" />
                      <span className="text-[#25D366]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#D8D5CC] italic bg-[#161616] p-2.5 rounded-xs border border-white/5 font-sans leading-normal">
                "{prefilledMessage}"
              </p>
            </div>
          </div>

          {/* Primary Action Button Bar */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
            <button
              id="modal-whatsapp-enquiry-cta"
              onClick={handleOpenWhatsApp}
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-[#0A0A0A] font-sans font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-xs transition-all duration-200 shadow-xl flex items-center justify-center gap-2.5 hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>ENQUIRE ON WHATSAPP</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#A0A0A0] font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Direct enquiry with owner Bhagirathi &bull; Rangbastra</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
