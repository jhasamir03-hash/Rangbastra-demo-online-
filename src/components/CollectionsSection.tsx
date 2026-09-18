import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product, CategoryType } from '../types';
import { ProductImage } from './ProductImage';

interface CollectionsSectionProps {
  products: Product[];
  onSelectCategory: (category: CategoryType) => void;
  onSelectProduct: (product: Product) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  products,
  onSelectCategory,
  onSelectProduct,
}) => {
  // Select hero representative pieces for the 3 categories
  const lehengaPiece = products.find((p) => p.id === 'product-1') || products[0];
  const festivePiece = products.find((p) => p.id === 'product-5') || products[4]; // Rani pink or Cerulean
  const occasionPiece = products.find((p) => p.id === 'product-2') || products[1];

  const collections = [
    {
      title: 'ROYAL LEHENGAS',
      category: 'LEHENGAS' as CategoryType,
      piece: lehengaPiece,
      subtitle: 'Voluminous Circular Flares & Hand Zardozi',
      desc: 'Heritage ceremonial silhouettes featuring intricate gold temple borders and rich bridal hues.',
      count: '3 Master Pieces',
    },
    {
      title: 'NAVRATRI & FESTIVE EDIT',
      category: 'FESTIVE EDIT' as CategoryType,
      piece: festivePiece,
      subtitle: '360° Garba Twirls & Vibrant Blossoms',
      desc: 'Pure silk georgettes and delicate floral embroideries crafted for festive Navratri nights and joyful dancing.',
      count: '2 Curated Pieces',
    },
    {
      title: 'OCCASION WEAR',
      category: 'OCCASION WEAR' as CategoryType,
      piece: occasionPiece,
      subtitle: 'Plush Micro-Velvets & Contrasting Drapes',
      desc: 'Rich jewel tones paired with statement dupattas and contemporary choli cuts for cocktail and sangeet celebrations.',
      count: '2 Statement Pieces',
    },
  ];

  return (
    <section
      id="collections-section"
      className="w-full bg-[#FAF8F5] text-[#1C1817] py-10 sm:py-20 md:py-24 border-b border-[rgba(184,147,88,0.2)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-5 sm:w-6 h-px bg-[#B89358]" />
            <span className="text-[9.5px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.28em] uppercase text-[#9B2226] font-sans font-semibold">
              CURATED ATELIER EDITS
            </span>
            <span className="w-5 sm:w-6 h-px bg-[#B89358]" />
          </div>

          <h2
            id="collections-heading"
            className="font-serif text-[clamp(1.75rem,5.5vw,3rem)] font-bold tracking-tight text-[#1C1817]"
          >
            THE COLLECTIONS
          </h2>

          <p className="text-xs sm:text-base text-[#574F48] font-sans font-normal mt-2 sm:mt-2.5 max-w-lg mx-auto leading-relaxed">
            Three distinct design languages woven with pure silk, artisanal embroidery, and bespoke made-to-measure tailoring.
          </p>
        </div>

        {/* 3-Card Editorial Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {collections.map((item, idx) => (
            <div
              key={item.category}
              id={`collection-card-${item.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="group flex flex-col bg-[#FFFFFF] border border-[rgba(184,147,88,0.25)] hover:border-[#B89358] rounded-xs overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {/* Card Image Stage */}
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => onSelectProduct(item.piece)}
              >
                <ProductImage
                  product={item.piece}
                  aspectRatio="portrait"
                  className="w-full h-[280px] xs:h-[320px] sm:h-[380px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-102"
                />

                {/* Top category tag */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                  <span className="text-[8.5px] sm:text-[9px] tracking-[0.14em] sm:tracking-[0.22em] uppercase px-2.5 sm:px-3 py-1 bg-[#FFFFFF]/90 text-[#1C1817] border border-[rgba(184,147,88,0.35)] shadow-xs font-sans font-semibold">
                    0{idx + 1} &bull; {item.count}
                  </span>
                </div>

                {/* Bottom Quick Look */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-[#1C1817]/90 via-[#1C1817]/60 to-transparent flex items-center justify-between">
                  <span className="text-xs text-[#FFFFFF] font-serif font-medium tracking-wide truncate mr-2">
                    {item.piece.name}
                  </span>
                  <span className="text-xs text-[#D8C0A0] font-sans font-semibold shrink-0">
                    {item.piece.price}
                  </span>
                </div>
              </div>

              {/* Card Information */}
              <div className="p-4 sm:p-6 lg:p-7 flex flex-col flex-grow justify-between bg-[#FFFFFF]">
                <div>
                  <span className="text-[9.5px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.24em] uppercase text-[#B89358] font-sans font-semibold block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-serif text-lg sm:text-2xl text-[#1C1817] font-bold leading-snug tracking-wide mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#574F48] font-sans font-normal leading-relaxed mb-4 sm:mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[rgba(184,147,88,0.2)] flex items-center justify-between">
                  <button
                    id={`view-collection-${item.category.toLowerCase().replace(/\s+/g, '-')}-btn`}
                    onClick={() => onSelectCategory(item.category)}
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.18em] uppercase text-[#1C1817] hover:text-[#B89358] font-sans font-semibold transition-colors cursor-pointer"
                  >
                    <span>View Category</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B89358]" />
                  </button>

                  <button
                    onClick={() => onSelectProduct(item.piece)}
                    className="text-[11px] text-[#6E6259] hover:text-[#1C1817] underline underline-offset-4 font-sans font-medium cursor-pointer"
                  >
                    Inspect Piece
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
