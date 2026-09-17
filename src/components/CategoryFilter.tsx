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
    <div id="category-filter-bar" className="w-full flex justify-center px-4 mb-10 sm:mb-14">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 bg-[#FFFFFF] p-1.5 rounded-full border border-[rgba(184,147,88,0.3)] max-w-2xl shadow-sm">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count = productCounts[cat] || 0;

          return (
            <button
              key={cat}
              id={`filter-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-[0.16em] uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#1C1817] text-[#FFFFFF] font-semibold shadow-xs'
                  : 'text-[#574F48] hover:text-[#B89358] hover:bg-[#FAF8F5]'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
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
