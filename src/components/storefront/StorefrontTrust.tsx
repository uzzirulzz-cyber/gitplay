import React from 'react';

export const StorefrontTrust: React.FC = () => {
  return (
    <section className="py-12 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Why Choose PlayBeat Digital */}
      <div className="bg-[#091227] border border-[#18264e] rounded-3xl p-8 sm:p-10 shadow-lg">
        <div className="text-center sm:text-left space-y-1 pb-8 border-b border-[#141f3d]">
          <h2 className="text-xl sm:text-2xl font-black text-white font-syne tracking-tight">
            Why Choose PlayBeat Digital?
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Your trusted partner for all digital needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#facc15]/15 border border-[#facc15]/40 text-[#facc15] flex items-center justify-center text-xl shadow-md">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>
            <h3 className="text-sm font-bold text-white pt-1">Instant Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get your product in seconds with our automated dispatch engine.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#facc15]/15 border border-[#facc15]/40 text-[#facc15] flex items-center justify-center text-xl shadow-md">
              <i className="bi bi-shield-check"></i>
            </div>
            <h3 className="text-sm font-bold text-white pt-1">Secure Checkout</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% safe &amp; trusted payments via JazzCash, EasyPaisa, and bank transfer.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#facc15]/15 border border-[#facc15]/40 text-[#facc15] flex items-center justify-center text-xl shadow-md">
              <i className="bi bi-tag-fill"></i>
            </div>
            <h3 className="text-sm font-bold text-white pt-1">Best Prices</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unbeatable regional value &amp; authentic verified subscriptions.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#facc15]/15 border border-[#facc15]/40 text-[#facc15] flex items-center justify-center text-xl shadow-md">
              <i className="bi bi-headset"></i>
            </div>
            <h3 className="text-sm font-bold text-white pt-1">24/7 Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We are here to help whenever you need activation or guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Friendly App Banner (Matches Image 2 & 3) */}
      <div className="relative rounded-3xl overflow-hidden border border-[#1b2b54] bg-gradient-to-r from-[#091433] via-[#0b173b] to-[#060e24] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-lg z-10 text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-[#facc15] text-black text-[10px] font-black uppercase tracking-wider">
            MOBILE FRIENDLY
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-syne tracking-tight leading-tight">
            Shop Anytime, Anywhere
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Get the PlayBeat Digital app and enjoy a seamless digital subscription shopping experience with instant push notifications for digital key dispatches.
          </p>

          {/* App Store and Google Play Download Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="px-4 py-2 rounded-xl bg-black border border-white/20 text-white flex items-center gap-2.5 shadow-md cursor-pointer hover:border-[#facc15] transition-colors">
              <i className="bi bi-apple text-2xl"></i>
              <div className="text-left leading-none">
                <div className="text-[9px] text-slate-400">Download on the</div>
                <div className="text-xs font-bold font-syne">App Store</div>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-black border border-white/20 text-white flex items-center gap-2.5 shadow-md cursor-pointer hover:border-[#facc15] transition-colors">
              <i className="bi bi-google-play text-xl text-[#facc15]"></i>
              <div className="text-left leading-none">
                <div className="text-[9px] text-slate-400">GET IT ON</div>
                <div className="text-xs font-bold font-syne">Google Play</div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Phone Mockup */}
        <div className="w-full md:w-80 relative flex-none flex items-center justify-center z-10">
          <img
            src="/src/assets/images/playbeat_mobile_phones_1790852612387.jpg"
            alt="PlayBeat Mobile Application"
            className="w-full max-w-[280px] h-auto object-contain rounded-2xl shadow-2xl border border-white/10"
          />
        </div>

        {/* Ambient Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};
