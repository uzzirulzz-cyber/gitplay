import React from 'react';

interface CategoryBrowseProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const CategoryBrowse: React.FC<CategoryBrowseProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  const categories = [
    {
      id: 'all',
      name: 'Digital Products',
      icon: 'bi-gift-fill',
      color: 'bg-blue-600/20 text-blue-400 border-blue-500/30'
    },
    {
      id: 'gaming_vpn',
      name: 'Gift Cards',
      icon: 'bi-credit-card-2-front-fill',
      color: 'bg-red-600/20 text-red-400 border-red-500/30'
    },
    {
      id: 'entertainment',
      name: 'Streaming Subscriptions',
      icon: 'bi-play-circle-fill',
      color: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'gaming_vpn',
      name: 'Gaming',
      icon: 'bi-controller',
      color: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
    },
    {
      id: 'software',
      name: 'Software',
      icon: 'bi-windows',
      color: 'bg-sky-600/20 text-sky-400 border-sky-500/30'
    },
    {
      id: 'iptv',
      name: 'IPTV & Services',
      icon: 'bi-tv-fill',
      color: 'bg-violet-600/20 text-violet-400 border-violet-500/30'
    }
  ];

  return (
    <section id="categories" className="py-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-syne tracking-tight">
            Browse Top Categories
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Find your favorite digital subscriptions and genuine software.</p>
        </div>
        <button
          onClick={() => onSelectCategory('all')}
          className="text-xs sm:text-sm font-bold text-slate-300 hover:text-[#facc15] flex items-center gap-1.5 transition-colors"
        >
          <span>View All</span>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>

      {/* 6 Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {categories.map((cat, idx) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={idx}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-5 rounded-2xl border text-center flex flex-col items-center justify-center gap-3 transition-all duration-200 group ${
                isSelected
                  ? 'border-[#facc15] bg-[#121c38] shadow-lg shadow-[#facc15]/10 scale-[1.02]'
                  : 'border-[#1b284e] bg-[#091227] hover:border-[#2d4077] hover:bg-[#0e1936] hover:-translate-y-1'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border shadow-inner transition-transform group-hover:scale-110 ${cat.color}`}
              >
                <i className={`bi ${cat.icon}`}></i>
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors leading-snug">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
