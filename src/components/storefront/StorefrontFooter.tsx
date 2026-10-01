import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { PlayBeatLogo } from '../common/PlayBeatLogo.tsx';

export const StorefrontFooter: React.FC = () => {
  const { addToast } = useCommerce();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    addToast('Thank you for subscribing to PlayBeat updates!', 'envelope-check');
    setEmailInput('');
  };

  return (
    <footer className="relative bg-[#020512] text-slate-300 text-xs overflow-hidden transition-colors duration-200">
      {/* Top Glowing Laser Beam Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent shadow-[0_0_18px_#38bdf8]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* COLUMN 1: Crown Shield Logo & Trust Pills (3.5 cols) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Crown Shield Logo */}
            <div className="flex items-center gap-3">
              <PlayBeatLogo size="md" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Premium Digital Subscriptions, Software, Tools &amp; More — All in One Place.
            </p>

            {/* 3 Rounded Trust Badges in a Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="px-3 py-1.5 rounded-full bg-[#071330] border border-[#1b3164] text-slate-300 text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                <i className="bi bi-shield-check text-[#38bdf8]"></i>
                <span>Secure Checkout</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#071330] border border-[#1b3164] text-slate-300 text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                <i className="bi bi-lightning-charge-fill text-[#facc15]"></i>
                <span>Instant Delivery</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#071330] border border-[#1b3164] text-slate-300 text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                <i className="bi bi-headset text-[#38bdf8]"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-bold text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <a href="#top" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#38bdf8]">&gt;</span> Home
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#38bdf8]">&gt;</span> Categories
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#38bdf8]">&gt;</span> Subscriptions
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#38bdf8]">&gt;</span> AI Tools
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#38bdf8]">&gt;</span> Softwares
                </a>
              </li>
              <li>
                <a href="#instant-delivery-banner" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#38bdf8]">&gt;</span> Coming Soon
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-[#facc15] transition-colors flex items-center gap-1.5">
                  <span className="text-[#38bdf8]">&gt;</span> Hot Products
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Categories with cyan outline icons (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-bold text-white tracking-wide">Categories</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-grid-fill text-[#38bdf8] text-xs"></i>
                  <span>All Products</span>
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-play-circle text-[#38bdf8] text-xs"></i>
                  <span>Video Editing</span>
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-palette text-[#38bdf8] text-xs"></i>
                  <span>Graphic Design</span>
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-lightning text-[#38bdf8] text-xs"></i>
                  <span>Productivity</span>
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-mortarboard text-[#38bdf8] text-xs"></i>
                  <span>Educational</span>
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-controller text-[#38bdf8] text-xs"></i>
                  <span>Gaming</span>
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-gear text-[#38bdf8] text-xs"></i>
                  <span>Software Tools</span>
                </a>
              </li>
              <li>
                <a href="#popular-products" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-three-dots text-[#38bdf8] text-xs"></i>
                  <span>More Categories</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Contact Us 4 Glowing Icon Cards (2.5 cols) */}
          <div className="lg:col-span-2.5 space-y-3.5">
            <h4 className="text-sm font-bold text-white tracking-wide">Contact Us</h4>
            <div className="space-y-2.5 text-xs">
              {/* Email Us */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#08183a] border border-[#38bdf8]/40 text-[#38bdf8] flex items-center justify-center text-sm shadow-sm flex-none">
                  <i className="bi bi-envelope"></i>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Email Us</div>
                  <a
                    href="mailto:support@playbeat.digital"
                    className="font-bold text-white hover:text-[#38bdf8] transition-colors truncate block"
                  >
                    support@playbeat.digital
                  </a>
                </div>
              </div>

              {/* WhatsApp / Support */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#08241b] border border-[#25d366]/40 text-[#25d366] flex items-center justify-center text-base shadow-sm flex-none">
                  <i className="bi bi-whatsapp"></i>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">WhatsApp / Support</div>
                  <a
                    href="https://wa.me/923321049333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-[#25d366] transition-colors"
                  >
                    +92 332 1049333
                  </a>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#08183a] border border-[#38bdf8]/40 text-[#38bdf8] flex items-center justify-center text-sm shadow-sm flex-none">
                  <i className="bi bi-telephone"></i>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Call Us</div>
                  <a href="tel:+923321049333" className="font-bold text-white hover:text-[#38bdf8] transition-colors">
                    +92 332 1049333
                  </a>
                </div>
              </div>

              {/* Visit Our Office */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#261f08] border border-[#facc15]/40 text-[#facc15] flex items-center justify-center text-sm shadow-sm flex-none mt-0.5">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Visit Our Office</div>
                  <div className="font-bold text-white">Abbottabad, Pakistan</div>
                  <a
                    href="https://maps.google.com/?q=Abbottabad,Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#facc15] hover:underline text-[11px] font-semibold inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Open in Maps</span>
                    <i className="bi bi-box-arrow-up-right text-[9px]"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 5: Stay Connected & Socials & Payments (2 cols) */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wide">Stay Connected</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get the latest updates, offers and new releases straight to your inbox.
            </p>

            {/* Email Subscribe Input */}
            <form onSubmit={handleSubscribe} className="relative flex items-center bg-[#071330] border border-[#1b3164] rounded-full p-1 pl-3 text-xs focus-within:border-[#38bdf8] transition-all">
              <i className="bi bi-envelope text-slate-400 text-xs mr-2"></i>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-xs pr-2"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-[#facc15] hover:bg-[#fde047] text-black font-extrabold text-[11px] tracking-wide flex items-center gap-1.5 shadow-md flex-none active:scale-95 transition-all"
              >
                <i className="bi bi-send-fill text-[10px]"></i>
                <span>Subscribe</span>
              </button>
            </form>

            {/* 5 Social Media Buttons: Facebook, Instagram, YouTube, TikTok, X */}
            <div className="flex items-center gap-2 pt-1">
              {/* Facebook */}
              <a
                href="https://facebook.com/playbeat.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#1877f2] text-white flex items-center justify-center text-sm shadow-sm hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/playbeat.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white flex items-center justify-center text-sm shadow-sm hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@playbeatdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#ff0000] text-white flex items-center justify-center text-sm shadow-sm hover:scale-110 transition-transform"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube"></i>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@playbeatdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-black border border-[#25f4ee]/30 text-white flex items-center justify-center text-sm shadow-sm hover:scale-110 transition-transform"
                aria-label="TikTok"
              >
                <i className="bi bi-tiktok"></i>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/playbeatdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-black border border-white/20 text-white flex items-center justify-center text-sm shadow-sm hover:scale-110 transition-transform"
                aria-label="X"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>

            {/* We Accept Payment Icons */}
            <div className="pt-2">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-wider">
                We Accept
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#071330] border border-[#1b3164] text-[10px] font-black text-white tracking-wider">
                  VISA
                </span>
                <span className="px-2.5 py-1 rounded bg-[#071330] border border-[#1b3164] text-[10px] font-bold text-white flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block -mr-1" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block opacity-80" />
                  <span className="text-[9px]">Mastercard</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#071330] border border-[#1b3164] text-[10px] font-bold text-[#0079c1]">
                  PayPal
                </span>
                <span className="px-2.5 py-1 rounded bg-[#071330] border border-[#1b3164] text-[10px] font-bold text-[#facc15]">
                  JazzCash
                </span>
                <span className="px-2.5 py-1 rounded bg-[#071330] border border-[#1b3164] text-[10px] font-bold text-[#22c55e]">
                  easypaisa
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Laser divider, copyright, policies, and gold slogan */}
        <div className="mt-14 pt-6 border-t border-[#122248] flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          {/* Left: Copyright */}
          <div className="flex items-center gap-1.5">
            <i className="bi bi-c-circle text-xs"></i>
            <span>2025 PlayBeat Digital. All rights reserved.</span>
          </div>

          {/* Center: Legal Links */}
          <div className="flex items-center gap-5 text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Refund Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms &amp; Conditions</span>
          </div>

          {/* Right: Golden Script + Crown Insignia */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#facc15] italic font-syne">
              Powering Your Digital Lifestyle
            </span>
            <span className="text-sm">👑</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              PLAYBEAT DIGITAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
