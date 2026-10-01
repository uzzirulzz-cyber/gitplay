import React, { useState, useMemo } from 'react';
import { Product } from '../../types.ts';
import { ProductCard } from './ProductCard.tsx';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
  selectedCategoryFromParent?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  searchQuery,
  selectedCategoryFromParent
}) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const tabs = [
    { id: 'All', label: 'All' },
    { id: 'Gift Cards', label: 'Gift Cards' },
    { id: 'Streaming', label: 'Streaming' },
    { id: 'Gaming', label: 'Gaming' },
    { id: 'Software', label: 'Software' },
    { id: 'AI Tools', label: 'AI Tools' },
    { id: 'IPTV', label: 'IPTV' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.status === 'published')
      .filter((p) => {
        // If parent passed category
        if (selectedCategoryFromParent && selectedCategoryFromParent !== 'all') {
          if (p.category !== selectedCategoryFromParent) return false;
        }

        // Active tab matching
        if (activeTab === 'All') return true;
        if (activeTab === 'Gift Cards') return p.categoryLabel.toLowerCase().includes('gift');
        if (activeTab === 'Streaming') return p.category === 'entertainment';
        if (activeTab === 'Gaming') return p.category === 'gaming_vpn' || p.name.includes('Steam') || p.name.includes('PlayStation');
        if (activeTab === 'Software') return p.category === 'software';
        if (activeTab === 'AI Tools') return p.categoryLabel.toLowerCase().includes('ai') || p.name.includes('ChatGPT');
        if (activeTab === 'IPTV') return p.category === 'iptv';
        return true;
      })
      .filter((p) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.duration.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.salesCount - a.salesCount;
      });
  }, [products, activeTab, selectedCategoryFromParent, searchQuery, sortBy]);

  return (
    <section id="popular-products" className="py-12 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Heading & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-white font-syne tracking-tight">
          Popular Products
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          Verified. Genuine. Instant Delivery.
        </p>
      </div>

      {/* Filter Tabs & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 pb-8 border-b border-[#141f3d]">
        {/* Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#facc15] text-black shadow-md shadow-[#facc15]/20'
                    : 'bg-[#0b1429] text-slate-300 hover:text-white border border-[#1b2950] hover:border-[#2f437c]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs text-slate-400 justify-end">
          <span className="font-semibold text-slate-300">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0b1429] text-white border border-[#1b2950] rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[#facc15]"
          >
            <option value="featured">Featured ▾</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 pt-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#091227] border border-[#1b284e] rounded-2xl my-8">
          <i className="bi bi-search text-3xl text-slate-500 mb-3 block"></i>
          <h3 className="text-sm font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query or selecting a different tab.
          </p>
          <button
            onClick={() => setActiveTab('All')}
            className="mt-4 px-4 py-2 rounded-xl bg-[#facc15] text-black text-xs font-bold"
          >
            Show All Products
          </button>
        </div>
      )}
    </section>
  );
};
