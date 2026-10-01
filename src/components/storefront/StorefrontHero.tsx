import React from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

interface StorefrontHeroProps {
  onBrowseClick: () => void;
  onExploreClick: () => void;
}

export const StorefrontHero: React.FC<StorefrontHeroProps> = ({
  onBrowseClick,
  onExploreClick
}) => {
  const { products, addToCart, setSelectedProduct } = useCommerce();

  const handleQuickAdd = (keyword: string) => {
    const found = products.find((p) => p.name.toLowerCase().includes(keyword.toLowerCase()));
    if (found) {
      setSelectedProduct(found);
    } else {
      onExploreClick();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#040919] text-white pt-8 pb-12 sm:pb-16 border-b border-[#111c38]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#facc15]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Editorial Typography & Stats */}
          <div className="lg:col-span-6 space-y-6 z-10">
            {/* Top Cyan Micro Header */}
            <div className="inline-block text-[11px] sm:text-xs font-black tracking-[0.18em] text-[#38bdf8] uppercase">
              PREMIUM DIGITAL PRODUCTS &amp; SUBSCRIPTIONS
            </div>

            {/* Giant Headline: YOUR WORLD OF DIGITAL POSSIBILITIES */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl xl:text-[56px] font-black tracking-tight text-white uppercase font-syne leading-[1.08]">
                YOUR WORLD OF
              </h1>
              <h1 className="text-4xl sm:text-6xl xl:text-[68px] font-black tracking-tight uppercase font-syne leading-[1.05]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f97316] drop-shadow-[0_0_35px_rgba(250,204,21,0.4)]">
                  DIGITAL
                </span>{' '}
                <span className="text-white">POSSIBILITIES</span>
              </h1>
            </div>

            {/* Subline with dots */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-bold text-slate-300 tracking-wide">
              <span>Movies</span>
              <span className="text-slate-500">•</span>
              <span>Streaming</span>
              <span className="text-slate-500">•</span>
              <span>Software</span>
              <span className="text-slate-500">•</span>
              <span>Games</span>
              <span className="text-slate-500">•</span>
              <span>Gadgets</span>
            </div>

            {/* Paragraph */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
              All in One Place. Genuine Products. Instant Delivery. Best Rates.
            </p>

            {/* 4 Trust Pillars with Gold Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-shield-check text-[#facc15] text-lg flex-none"></i>
                <span className="text-xs font-bold text-slate-200">Genuine Products</span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="bi bi-lightning-charge-fill text-[#facc15] text-lg flex-none"></i>
                <span className="text-xs font-bold text-slate-200">Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="bi bi-tag-fill text-[#facc15] text-lg flex-none"></i>
                <span className="text-xs font-bold text-slate-200">Best Rates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="bi bi-headset text-[#facc15] text-lg flex-none"></i>
                <span className="text-xs font-bold text-slate-200">24/7 Support</span>
              </div>
            </div>

            {/* Action Buttons: Explore Products & Browse Categories */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={onExploreClick}
                className="px-7 py-3 rounded-full bg-[#facc15] hover:bg-[#fde047] text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#facc15]/25 flex items-center gap-2 hover:scale-102 active:scale-95 transition-all"
              >
                <span>Explore Products</span>
                <i className="bi bi-arrow-right font-bold"></i>
              </button>

              <button
                onClick={onBrowseClick}
                className="px-6 py-3 rounded-full bg-[#0a1226] hover:bg-[#121f42] text-white border border-[#1e2f5b] hover:border-[#38bdf8] font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 transition-all"
              >
                <i className="bi bi-grid-3x3-gap-fill text-[#38bdf8]"></i>
                <span>Browse Categories</span>
              </button>
            </div>

            {/* Bottom 4-Column Stats with Vertical Dividers */}
            <div className="pt-6 border-t border-[#121f3d] grid grid-cols-4 gap-2 sm:gap-4 max-w-xl text-center sm:text-left">
              <div>
                <div className="text-base sm:text-xl font-black text-white font-syne">10K+</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Happy Customers</div>
              </div>
              <div className="border-l border-[#16254a] pl-2 sm:pl-4">
                <div className="text-base sm:text-xl font-black text-white font-syne">500+</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Digital Products</div>
              </div>
              <div className="border-l border-[#16254a] pl-2 sm:pl-4">
                <div className="text-base sm:text-xl font-black text-white font-syne">99%</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Secure Checkout</div>
              </div>
              <div className="border-l border-[#16254a] pl-2 sm:pl-4">
                <div className="text-base sm:text-xl font-black text-white font-syne">24/7</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Customer Support</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Royal Crown & Orbiting Subscription Badges Artwork */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* The High-Tech Crown & Pedestal Image Container */}
            <div className="relative w-full max-w-[620px] rounded-3xl overflow-hidden shadow-2xl border border-[#1b2b52] bg-[#070e24] group">
              <img
                src="/src/assets/images/crown_subscription_podium_1790853129584.jpg"
                alt="PlayBeat Digital royal crown and subscription passes"
                className="w-full h-auto object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Radiant neon gradient scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040919] via-transparent to-transparent opacity-60" />

              {/* Interactive Floating Brand Pills Overlay */}
              <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between">
                {/* Top Badges */}
                <div className="flex justify-between items-start">
                  <button
                    onClick={() => handleQuickAdd('netflix')}
                    className="pointer-events-auto px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-red-500/40 text-white text-[11px] font-black flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <span className="text-red-500 font-syne font-black text-xs">N</span>
                    <span>NETFLIX</span>
                  </button>

                  <button
                    onClick={() => handleQuickAdd('chatgpt')}
                    className="pointer-events-auto px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-[#10a37f]/50 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <i className="bi bi-robot text-[#10a37f]"></i>
                    <span>ChatGPT</span>
                  </button>

                  <button
                    onClick={() => handleQuickAdd('youtube')}
                    className="pointer-events-auto px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-red-600/50 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <i className="bi bi-youtube text-red-500"></i>
                    <span>YouTube Premium</span>
                  </button>
                </div>

                {/* Bottom Badges */}
                <div className="flex justify-between items-end pb-2">
                  <button
                    onClick={() => handleQuickAdd('spotify')}
                    className="pointer-events-auto px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-[#1db954]/50 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <i className="bi bi-spotify text-[#1db954]"></i>
                    <span>Spotify</span>
                  </button>

                  <button
                    onClick={() => handleQuickAdd('canva')}
                    className="pointer-events-auto px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-purple-500/50 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <i className="bi bi-brush text-purple-400"></i>
                    <span>Canva Pro</span>
                  </button>

                  <button
                    onClick={() => handleQuickAdd('nordvpn')}
                    className="pointer-events-auto px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-blue-500/50 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <i className="bi bi-shield-lock text-blue-400"></i>
                    <span>NordVPN</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
