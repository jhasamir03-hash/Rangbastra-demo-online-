import React, { useState } from 'react';
import { Product } from '../types';
import { usePhotos } from '../context/PhotoContext';
import { Sparkles, Camera, ArrowUpRight } from 'lucide-react';

interface ProductImageProps {
  product: Product;
  className?: string;
  aspectRatio?: 'portrait' | 'square' | 'hero';
  showOverlay?: boolean;
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  product,
  className = '',
  aspectRatio = 'portrait',
  showOverlay = true,
}) => {
  const { getPhotoSrc } = usePhotos();
  const [loadError, setLoadError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const photoSrc = product.image ? getPhotoSrc(product.image) : getPhotoSrc(product.filename);

  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[3/4.2]'
      : aspectRatio === 'hero'
      ? 'aspect-[3/4] md:aspect-[16/10]'
      : 'aspect-[1/1]';

  return (
    <div
      id={`product-image-container-${product.id}`}
      className={`relative w-full ${aspectClass} overflow-hidden bg-[#181818] select-none ${className}`}
    >
      {/* Primary Image attempt with referrerPolicy="no-referrer" */}
      {!loadError && (
        <img
          id={`product-img-${product.id}`}
          src={photoSrc}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setLoadError(true)}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Elegant Editorial Canvas Fallback if file is awaiting local drop or loading */}
      {(loadError || !imageLoaded) && (
        <div
          id={`fallback-${product.id}`}
          className={`absolute inset-0 flex flex-col justify-between p-6 transition-opacity duration-500 ${
            imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            background: `radial-gradient(circle at 50% 25%, ${product.colorHex}dd 0%, #121212 90%)`,
          }}
        >
          {/* Subtle Luxury Pattern / Texture Overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${product.accentHex} 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Top meta tags */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded bg-[#0A0A0A]/70 text-[#C5A880] border border-[#C5A880]/30 font-sans backdrop-blur-xs">
              {product.category}
            </span>
            <span className="text-[11px] tracking-wider text-[#A0A0A0] font-sans">
              {product.filename}
            </span>
          </div>

          {/* Center Artistic Silhouette & Color Harmony */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border border-[#C5A880]/40 shadow-2xl relative"
              style={{
                boxShadow: `0 0 35px ${product.colorHex}88`,
                backgroundColor: `${product.colorHex}99`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full border border-dashed border-[#C5A880]/60 flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-[#C5A880]" />
              </div>
            </div>

            <h4 className="font-serif text-xl sm:text-2xl text-[#F5F2EC] tracking-wide max-w-[260px] leading-snug">
              {product.name}
            </h4>
            <p className="text-xs text-[#C5A880] tracking-[0.2em] uppercase mt-1 font-sans">
              {product.color}
            </p>
            <p className="text-[11px] text-[#A0A0A0] max-w-[220px] mt-2 line-clamp-2 italic font-serif">
              "{product.visualDetails.embroidery}"
            </p>
          </div>

          {/* Bottom Card Footer */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-xs">
            <span className="text-sm font-serif text-[#F5F2EC] tracking-wider font-semibold">
              {product.price}
            </span>
            <div className="flex items-center gap-1.5 text-[#C5A880] text-[11px] font-sans tracking-wide">
              <span>Rangbastra</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      )}

      {/* Editorial Gradient Overlay for Text Legibility on hover / touch */}
      {showOverlay && imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
};
