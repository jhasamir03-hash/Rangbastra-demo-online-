import React from 'react';
import { CategoryType } from '../types';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  productCounts: Record<CategoryType, number>;
}

const CATEGORIES: CategoryType[] = ['ALL', 'LEHENGAS', 'FESTIVE EDIT', 'OCCASION WEAR'];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  productCounts,
}) => {
  return (
    <div id="category-filter-bar" className="w-full flex justify-center px-3 sm:px-4 mb-8 sm:mb-12">
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 bg-[#FFFFFF] p-1.5 rounded-2xl sm:rounded-full border border-[rgba(184,147,88,0.3)] max-w-2xl shadow-sm">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count = productCounts[cat] || 0;

          return (
            <button
              key={cat}
              id={`filter-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 xs:px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-sans tracking-[0.08em] sm:tracking-[0.16em] uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#1C1817] text-[#FFFFFF] font-semibold shadow-xs'
                  : 'text-[#574F48] hover:text-[#B89358] hover:bg-[#FAF8F5]'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[9.5px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                  isActive ? 'bg-[#FFFFFF]/20 text-[#FFFFFF]' : 'bg-[#FAF8F5] text-[#6E6259] border border-[rgba(184,147,88,0.2)]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
