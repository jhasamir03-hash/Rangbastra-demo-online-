import React, { useState, useMemo, useRef } from 'react';
import { PRODUCTS, REELS_DATA } from './data/products';
import { Product, CategoryType, AtelierReel } from './types';
import { PhotoProvider } from './context/PhotoContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CollectionsSection } from './components/CollectionsSection';
import { CollectionIntro } from './components/CollectionIntro';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductPageView } from './components/ProductPageView';
import { ReelsSection } from './components/ReelsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');
  const [activeReel, setActiveReel] = useState<AtelierReel | null>(null);

  const collectionsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Category counts
  const productCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      ALL: PRODUCTS.length,
      LEHENGAS: 0,
      'FESTIVE EDIT': 0,
      'OCCASION WEAR': 0,
    };
    PRODUCTS.forEach((p) => {
      p.categories.forEach((cat) => {
        if (cat !== 'ALL') {
          counts[cat] = (counts[cat] || 0) + 1;
        }
      });
    });
    return counts;
  }, []);

  // Filtered products strictly preserving 1-7 sequence
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') {
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  const scrollToCollections = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
      setTimeout(() => {
        collectionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      collectionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToProducts = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
      setTimeout(() => {
        productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToReels = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
      setTimeout(() => {
        reelsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      reelsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToReviews = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
      setTimeout(() => {
        reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategoryFromCollections = (category: CategoryType) => {
    setActiveCategory(category);
    scrollToProducts();
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToCatalogue = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PhotoProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] flex flex-col font-sans selection:bg-[#B89358] selection:text-[#FFFFFF]">
        
        {/* Navigation (Announcement bar removed, WhatsApp button removed from header) */}
        <Navbar
          onNavigateToCollection={scrollToCollections}
          onNavigateToProducts={scrollToProducts}
          onNavigateToReels={scrollToReels}
          onNavigateToReviews={scrollToReviews}
          onNavigateHome={() => {
            setSelectedProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Main Content Area */}
        <main className="flex-grow">
          {selectedProduct ? (
            /* Dedicated Normal Clothing Website Product Page View (Images and details scroll naturally together) */
            <ProductPageView
              product={selectedProduct}
              onBack={handleBackToCatalogue}
              onSelectProduct={handleOpenProduct}
              allProducts={PRODUCTS}
              onOpenReel={(reel) => setActiveReel(reel)}
            />
          ) : (
            /* Standard Brand Showroom Flow:
               1. Normal Hero Section (no isolated product)
               2. The Collections Section
               3. Products + Categories Section
               4. Atelier Reels Section (In Motion / Videos with separate product tabs)
               5. Client Reviews & Ratings Section
            */
            <>
              {/* 1. Normal Hero Section */}
              <HeroSection
                onExploreCollections={scrollToCollections}
                onExploreProducts={scrollToProducts}
              />

              {/* 2. The Collections Section */}
              <div ref={collectionsRef} className="scroll-mt-20">
                <CollectionsSection
                  products={PRODUCTS}
                  onSelectCategory={handleSelectCategoryFromCollections}
                  onSelectProduct={handleOpenProduct}
                />
              </div>

              {/* 3. Products + Categories Section */}
              <div ref={productsRef} className="scroll-mt-20">
                <CollectionIntro />

                {/* Category Filter Tabs */}
                <CategoryFilter
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  productCounts={productCounts}
                />

                {/* Product Catalogue Grid (Responsive 1-col on mobile, 2-col on sm/md, 3-col on lg) */}
                <section
                  id="products-catalogue-grid"
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {filteredProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        onSelect={handleOpenProduct}
                      />
                    ))}
                  </div>

                  {/* Micro Editorial Summary */}
                  <div className="mt-14 pt-8 border-t border-[rgba(184,147,88,0.2)] text-center text-xs text-[#6E6259] font-sans">
                    <p>
                      Presenting {filteredProducts.length} of {PRODUCTS.length} curated showroom creations &bull; Handcrafted made-to-measure Navratri & bridal couture
                    </p>
                  </div>
                </section>
              </div>

              {/* 4. Atelier Reels Section (In Motion / Product Videos) */}
              <div ref={reelsRef} className="scroll-mt-20">
                <ReelsSection
                  reels={REELS_DATA}
                  products={PRODUCTS}
                  onSelectProduct={handleOpenProduct}
                  activeReel={activeReel}
                  setActiveReel={setActiveReel}
                />
              </div>

              {/* 5. Ratings & Reviews Section */}
              <div ref={reviewsRef} className="scroll-mt-20">
                <ReviewsSection />
              </div>
            </>
          )}
        </main>

        {/* 6. Luxury Footer with Social Icons */}
        <Footer />

        {/* Persistent Floating WhatsApp Action */}
        <FloatingWhatsApp />

      </div>
    </PhotoProvider>
  );
}
