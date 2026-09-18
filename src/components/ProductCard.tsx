import React from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { MessageCircle, Eye, Star, Play } from 'lucide-react';
import { BRAND_DETAILS, REELS_DATA } from '../data/products';

interface ProductCardProps {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onSelect,
}) => {
  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = BRAND_DETAILS.createProductWhatsAppUrl(product.name, product.price);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const matchedReel = REELS_DATA.find((r) => r.productId === product.id);

  return (
    <article
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-[#FFFFFF] border border-[rgba(184,147,88,0.22)] hover:border-[#B89358] rounded-xs overflow-hidden transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl"
    >
      {/* Top Image Stage (Natural Aspect Ratio) */}
      <div className="relative overflow-hidden bg-[#FAF7F2]">
        <ProductImage
          product={product}
          aspectRatio="portrait"
          className="w-full h-auto max-h-[500px] object-cover transition-transform duration-500 group-hover:scale-102"
        />

        {/* Sequence Indicator */}
        <div className="absolute top-3 left-3 z-20">
          <span className="text-[10px] tracking-widest font-sans font-semibold px-2 py-0.5 rounded-xs bg-[#FFFFFF]/90 text-[#1C1817] border border-[rgba(184,147,88,0.35)] shadow-xs">
            0{index + 1}
          </span>
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          {matchedReel && (
            <span className="inline-flex items-center gap-1 text-[9px] tracking-wider font-sans uppercase px-2 py-0.5 rounded-xs bg-[#9B2226] text-[#FFFFFF] shadow-xs">
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Reel</span>
            </span>
          )}
          <span className="text-[9px] tracking-[0.18em] font-sans uppercase px-2.5 py-0.5 rounded-xs bg-[#FFFFFF]/90 text-[#1C1817] border border-[rgba(184,147,88,0.3)] shadow-xs font-medium">
            {product.category}
          </span>
        </div>

        {/* Hover Quick Actions Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#1C1817]/90 via-[#1C1817]/70 to-transparent flex items-center justify-between gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button
            id={`card-view-details-btn-${product.id}`}
            onClick={() => onSelect(product)}
            className="flex-1 py-2 px-3 bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#1C1817] text-[11px] tracking-[0.18em] uppercase font-sans font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#B89358]" />
            <span>VIEW PIECE</span>
          </button>

          <button
            id={`card-quick-enquire-btn-${product.id}`}
            onClick={handleDirectWhatsApp}
            title="Enquire on WhatsApp: 091737 85595"
            className="p-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] rounded-xs transition-colors cursor-pointer"
            aria-label="Enquire on WhatsApp: 091737 85595"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Information Block */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow justify-between bg-[#FFFFFF]">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] tracking-[0.22em] text-[#B89358] uppercase font-sans font-semibold">
              {product.color}
            </span>

            {/* Micro star rating */}
            <div className="flex items-center gap-1 text-[11px] text-[#CA8A04] font-sans">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[#1C1817] font-semibold">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1817] group-hover:text-[#B89358] transition-colors leading-snug tracking-wide">
            {product.name}
          </h3>

          <p className="text-xs text-[#574F48] font-sans font-normal mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-[rgba(184,147,88,0.2)] flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#6E6259] block font-sans font-medium">
              Showroom Price
            </span>
            <span className="font-serif text-base sm:text-xl font-bold text-[#1C1817] tracking-wide">
              {product.price}
            </span>
          </div>

          <button
            id={`card-whatsapp-link-${product.id}`}
            onClick={handleDirectWhatsApp}
            title="Enquire on WhatsApp: 091737 85595"
            className="inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-xs bg-[#25D366]/12 hover:bg-[#25D366]/22 text-xs text-[#1E7E34] font-sans font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current text-[#25D366]" />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </article>
  );
};
