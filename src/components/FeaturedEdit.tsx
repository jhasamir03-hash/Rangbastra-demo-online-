import React from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { BRAND_DETAILS } from '../data/products';

interface FeaturedEditProps {
  featuredProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const FeaturedEdit: React.FC<FeaturedEditProps> = ({
  featuredProducts,
  onSelectProduct,
}) => {
  if (featuredProducts.length === 0) return null;

  const leadPiece = featuredProducts[0];
  const secondaryPieces = featuredProducts.slice(1, 3);

  return (
    <section
      id="featured-occasion-edit-section"
      className="w-full bg-[#0F0F0F] text-[#F5F2EC] py-16 sm:py-24 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#C5A880] font-sans block mb-2">
            CURATED SELECTION
          </span>
          <h2
            id="featured-edit-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#F5F2EC]"
          >
            FEATURED OCCASION EDIT
          </h2>
          <p className="text-sm sm:text-base text-[#A8A59C] font-sans font-light mt-3">
            An editorial lookbook spotlighting three signature ceremonial silhouettes.
          </p>
        </div>

        {/* Editorial Composition: Asymmetrical Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Spotlight (Left 7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              id={`featured-lead-${leadPiece.id}`}
              onClick={() => onSelectProduct(leadPiece)}
              className="group relative flex-grow cursor-pointer overflow-hidden rounded-xs border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 bg-[#161616]"
            >
              <ProductImage
                product={leadPiece}
                aspectRatio="portrait"
                className="w-full h-full min-h-[480px] lg:min-h-[620px]"
              />

              {/* Bottom Editorial Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-sans">
                    EDITORIAL ATELIER FOCUS
                  </span>
                  <span className="w-4 h-px bg-[#C5A880]/60" />
                  <span className="text-xs text-[#EAE5D9] font-sans">
                    {leadPiece.color}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EC] font-normal leading-tight group-hover:text-[#C5A880] transition-colors">
                  {leadPiece.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#B0ADA4] font-sans font-light mt-2 max-w-lg line-clamp-2">
                  {leadPiece.description}
                </p>

                <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="font-serif text-2xl text-[#F5F2EC] font-medium tracking-wide">
                    {leadPiece.price}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          BRAND_DETAILS.createProductWhatsAppUrl(leadPiece.name, leadPiece.price),
                          '_blank',
                          'noopener,noreferrer'
                        );
                      }}
                      className="px-4 py-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/50 text-[#F5F2EC] rounded-full text-xs tracking-wider uppercase font-sans flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Enquire</span>
                    </button>

                    <span className="text-xs text-[#C5A880] font-sans flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Editorial Pair (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {secondaryPieces.map((piece) => (
              <div
                key={piece.id}
                id={`featured-secondary-${piece.id}`}
                onClick={() => onSelectProduct(piece)}
                className="group relative cursor-pointer overflow-hidden rounded-xs border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 bg-[#161616] flex-1 flex flex-col"
              >
                <div className="relative">
                  <ProductImage
                    product={piece}
                    aspectRatio="square"
                    className="w-full max-h-[280px]"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-xs bg-[#0A0A0A]/80 text-[#F5F2EC] border border-white/10 backdrop-blur-xs font-sans">
                      {piece.price}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-[#141414] flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans block mb-1">
                      {piece.color}
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl text-[#F5F2EC] group-hover:text-[#C5A880] transition-colors leading-snug">
                      {piece.name}
                    </h4>
                    <p className="text-xs text-[#9E9B93] font-sans font-light mt-1.5 line-clamp-2">
                      {piece.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#A0A0A0] font-sans">
                      View Silhouette & Details &rarr;
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          BRAND_DETAILS.createProductWhatsAppUrl(piece.name, piece.price),
                          '_blank',
                          'noopener,noreferrer'
                        );
                      }}
                      className="text-[#25D366] hover:text-[#3ce47c] flex items-center gap-1 font-sans font-medium"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
