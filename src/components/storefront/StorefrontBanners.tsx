import React from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

interface StorefrontBannersProps {
  onShopNow: () => void;
}

export const StorefrontBanners: React.FC<StorefrontBannersProps> = ({ onShopNow }) => {
  const { products, addToCart } = useCommerce();

  const handleBuyPSN = () => {
    const psProduct = products.find((p) => p.name.includes('PlayStation'));
    if (psProduct) {
      addToCart(psProduct, psProduct.variants[0]?.id, 1);
    } else {
      onShopNow();
    }
  };

  return (
    <section className="py-6 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Dual Side-by-Side Banners (Image 2 style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Banner 1: Instant Digital Delivery */}
        <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#1b2b54] bg-gradient-to-r from-[#040a1c] via-[#091538] to-[#040a1c] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-4 z-10 max-w-sm">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-[#facc15] text-black text-2xl font-black flex items-center justify-center shadow-lg shadow-[#facc15]/20 flex-none">
                <i className="bi bi-lightning-charge-fill"></i>
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white uppercase font-syne tracking-tight">
                  INSTANT DIGITAL DELIVERY
                </h3>
                <p className="text-xs text-slate-300">Get your product in seconds.</p>
              </div>
            </div>

            <button
              onClick={onShopNow}
              className="px-6 py-2.5 rounded-full bg-[#facc15] hover:bg-[#fde047] text-black font-extrabold text-xs tracking-wide shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Shop Now</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          {/* Right Checklist & Graphic */}
          <div className="z-10 bg-[#070e24]/80 backdrop-blur-sm border border-[#1d2b52] rounded-2xl p-4 space-y-2 text-xs text-slate-200 min-w-[190px]">
            <div className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill text-[#facc15]"></i>
              <span className="font-semibold">Real Accounts</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill text-[#facc15]"></i>
              <span className="font-semibold">Official Licenses</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill text-[#facc15]"></i>
              <span className="font-semibold">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill text-[#facc15]"></i>
              <span className="font-semibold">24/7 Live Support</span>
            </div>
          </div>

          {/* Background Lightning Effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        </div>

        {/* Banner 2: PlayStation Gift Cards */}
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[#003791] bg-gradient-to-r from-[#003087] via-[#00439c] to-[#001f54] p-6 sm:p-8 flex flex-col justify-between shadow-xl text-white">
          <div className="space-y-2 z-10">
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-black/40 text-blue-200 uppercase tracking-wider">
              GAME ON
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase font-syne tracking-tight">
              PLAYSTATION GIFT CARDS
            </h3>
            <p className="text-xs text-blue-100 font-semibold">Play More. Pay Less.</p>
          </div>

          <div className="pt-6 flex items-center justify-between z-10">
            <button
              onClick={handleBuyPSN}
              className="px-6 py-2.5 rounded-full bg-[#facc15] hover:bg-[#fde047] text-black font-extrabold text-xs tracking-wide shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Shop Now</span>
              <i className="bi bi-arrow-right"></i>
            </button>

            {/* Badges preview */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold">
              <span className="px-2 py-0.5 rounded bg-white/20">$25</span>
              <span className="px-2 py-0.5 rounded bg-white/20">$50</span>
              <span className="px-2 py-0.5 rounded bg-white/20">$100</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
