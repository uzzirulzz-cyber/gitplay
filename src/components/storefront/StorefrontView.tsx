import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { StorefrontHeader } from './StorefrontHeader.tsx';
import { StorefrontHero } from './StorefrontHero.tsx';
import { CategoryBrowse } from './CategoryBrowse.tsx';
import { ProductGrid } from './ProductGrid.tsx';
import { StorefrontBanners } from './StorefrontBanners.tsx';
import { StorefrontTrust } from './StorefrontTrust.tsx';
import { ProductDetailModal } from './ProductDetailModal.tsx';
import { CartDrawer } from './CartDrawer.tsx';
import { WishlistDrawer } from './WishlistDrawer.tsx';
import { CheckoutModal } from './CheckoutModal.tsx';
import { OrderSuccessModal } from './OrderSuccessModal.tsx';
import { StorefrontFooter } from './StorefrontFooter.tsx';
import { StorefrontFloatingChat } from './StorefrontFloatingChat.tsx';

export const StorefrontView: React.FC = () => {
  const { products, selectedProduct, setSelectedProduct } = useCommerce();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const scrollToPopular = () => {
    const el = document.getElementById('popular-products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#040817] text-white transition-colors duration-200">
      {/* Header: 3-row layout (Search + Cart + Nav pills + Trending strip) */}
      <StorefrontHeader
        onSearchChange={(q) => {
          setSearchQuery(q);
        }}
        onCategorySelect={(catId) => {
          setActiveCategoryFilter(catId);
          scrollToPopular();
        }}
      />

      {/* Main Hero Section: YOUR WORLD OF DIGITAL POSSIBILITIES + Royal Crown Pedestal */}
      <StorefrontHero
        onBrowseClick={scrollToCategories}
        onExploreClick={scrollToPopular}
      />

      {/* Browse Top Categories Section */}
      <CategoryBrowse
        activeCategory={activeCategoryFilter}
        onSelectCategory={(catId) => {
          setActiveCategoryFilter(catId);
          scrollToPopular();
        }}
      />

      {/* Popular Products Catalog Grid */}
      <ProductGrid
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        searchQuery={searchQuery}
        selectedCategoryFromParent={activeCategoryFilter}
      />

      {/* Promotional Banners (Instant Digital Delivery + PlayStation Gift Cards) */}
      <StorefrontBanners onShopNow={scrollToPopular} />

      {/* Why Choose PlayBeat Digital? + Mobile App Showcase */}
      <StorefrontTrust />

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <StorefrontFloatingChat />

      {/* Footer */}
      <StorefrontFooter />
    </div>
  );
};
