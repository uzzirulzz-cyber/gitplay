import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { useCustomerAuth } from '../../context/CustomerAuthContext.tsx';
import { PlayBeatLogo } from '../common/PlayBeatLogo.tsx';

interface StorefrontHeaderProps {
  onSearchChange: (q: string) => void;
  onCategorySelect: (catId: string) => void;
}

export const StorefrontHeader: React.FC<StorefrontHeaderProps> = ({
  onSearchChange,
  onCategorySelect
}) => {
  const {
    cartCount,
    setCartDrawerOpen,
    wishlist,
    setWishlistOpen
  } = useCommerce();

  const {
    customer,
    isAuthenticated,
    openAuthModal,
    openProfileModal
  } = useCustomerAuth();

  const [activeNav, setActiveNav] = useState('Home');
  const [selectedSearchCat, setSelectedSearchCat] = useState('All Categories');
  const [searchVal, setSearchVal] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { id: 'Home', label: 'Home', icon: 'bi-house-door-fill', isHome: true },
    { id: 'software', label: 'AI & Productivity', icon: 'bi-stars' },
    { id: 'software', label: 'Video Editing', icon: 'bi-camera-reels-fill' },
    { id: 'gaming_vpn', label: 'Gift Cards', icon: 'bi-gift-fill' },
    { id: 'entertainment', label: 'Streaming Accounts', icon: 'bi-trophy-fill' },
    { id: 'iptv', label: 'IPTV', icon: 'bi-tv-fill' },
    { id: 'smart-projectors', label: 'Smart Projectors', icon: 'bi-projector-fill' },
    { id: 'all', label: 'All Products', icon: 'bi-grid-fill' }
  ];

  const searchCategories = [
    'All Categories',
    'AI & Productivity',
    'Video Editing',
    'Gift Cards',
    'Streaming Accounts',
    'IPTV',
    'Smart Projectors'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchVal);
    const el = document.getElementById('popular-products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (item: typeof mainNavItems[0]) => {
    setActiveNav(item.label);
    if (item.isHome) {
      const top = document.getElementById('top');
      if (top) top.scrollIntoView({ behavior: 'smooth' });
      onCategorySelect('all');
    } else {
      onCategorySelect(item.id);
      const el = document.getElementById('popular-products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#040817] border-b border-[#111c38] text-white transition-colors duration-200 shadow-xl">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          {/* ROW 1: Logo + Search Bar + Wishlist + Account/Profile + Cart */}
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Logo: PlayBeat DIGITAL with sound wave equalizer effects */}
            <a href="#top" className="flex items-center gap-2 flex-none group select-none">
              <PlayBeatLogo size="md" animated={true} />
            </a>

            {/* Central Rounded Search Bar with Dropdown */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 max-w-2xl hidden md:flex items-center bg-[#070f26] border border-[#1d2d57] rounded-full p-1 pl-4 pr-1 text-xs focus-within:border-[#a855f7] focus-within:ring-1 focus-within:ring-[#a855f7] transition-all"
            >
              <i className="bi bi-search text-slate-400 text-sm mr-2.5"></i>
              <input
                type="text"
                placeholder="Search for Netflix, ChatGPT, YouTube, Projectors..."
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  onSearchChange(e.target.value);
                }}
                className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-xs"
              />

              {/* Vertical divider */}
              <div className="w-[1px] h-5 bg-[#1e2f5b] mx-2" />

              {/* Category dropdown inside search bar */}
              <div className="relative">
                <select
                  value={selectedSearchCat}
                  onChange={(e) => {
                    setSelectedSearchCat(e.target.value);
                    if (e.target.value === 'All Categories') onCategorySelect('all');
                    else onCategorySelect('software');
                  }}
                  className="bg-transparent text-slate-300 font-semibold pr-4 text-xs cursor-pointer focus:outline-none"
                >
                  {searchCategories.map((c, i) => (
                    <option key={i} value={c} className="bg-[#0b1429] text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            {/* Right Utilities: Wishlist, Profile/Sign Up, Cart */}
            <div className="flex items-center gap-2.5 sm:gap-4 flex-none">
              {/* Wishlist */}
              <button
                onClick={() => setWishlistOpen(true)}
                className="hidden sm:flex flex-col items-center gap-0.5 text-slate-300 hover:text-white transition-colors text-center group"
                title="View Wishlist"
              >
                <div className="relative">
                  <i className="bi bi-heart text-red-400 text-lg group-hover:scale-110 transition-transform"></i>
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-200">
                  Wishlist
                </span>
              </button>

              {/* User Account / Profile Section Buttons */}
              {isAuthenticated && customer ? (
                // LOGGED-IN CUSTOMER PROFILE BUTTON
                <button
                  onClick={() => openProfileModal('overview')}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-[#0a1430] border border-[#203260] hover:border-[#a855f7] text-left transition-all group"
                  title="Open Customer Portal & Licenses"
                >
                  <div className="relative">
                    <img
                      src={
                        customer.avatarUrl ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                      }
                      alt={customer.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#a855f7]"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#070d1e]" />
                  </div>
                  <div className="hidden sm:flex flex-col leading-tight">
                    <span className="text-xs font-bold text-white group-hover:text-purple-300 max-w-[85px] truncate">
                      {customer.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-amber-300 font-semibold flex items-center gap-0.5">
                      <span>👑 {customer.memberTier}</span>
                    </span>
                  </div>
                </button>
              ) : (
                // GUEST: SIGN IN & SIGN UP BUTTONS
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="hidden sm:inline-flex px-3 py-1.5 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => openAuthModal('signup')}
                    className="px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white font-bold text-xs shadow-md shadow-purple-950/60 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <i className="bi bi-person-plus-fill"></i>
                    <span>Sign Up</span>
                    <span className="hidden lg:inline-block px-1.5 py-0.2 bg-white/20 rounded-full text-[9px]">
                      🎁 500 Pts
                    </span>
                  </button>
                </div>
              )}

              {/* Yellow Cart Button: Cart (0) */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="px-3.5 sm:px-5 py-2 rounded-full bg-[#facc15] hover:bg-[#fde047] text-black font-extrabold text-xs tracking-wide shadow-md shadow-[#facc15]/20 flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap"
              >
                <i className="bi bi-cart3 text-base"></i>
                <span className="hidden sm:inline">Cart</span>
                <span>({cartCount})</span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} text-base`}></i>
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden pt-1">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-[#070f26] border border-[#1d2d57] rounded-full p-1 pl-3 pr-2 text-xs"
            >
              <i className="bi bi-search text-slate-400 text-xs mr-2"></i>
              <input
                type="text"
                placeholder="Search products & subscriptions..."
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  onSearchChange(e.target.value);
                }}
                className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-xs"
              />
            </form>
          </div>

          {/* ROW 2: Main Navigation Bar with Category Pills */}
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold pt-1">
            {mainNavItems.map((item, idx) => {
              const isSelected = activeNav === item.label;
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item)}
                  className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white shadow-md shadow-purple-950 font-extrabold'
                      : 'bg-[#091129] border border-[#142247] text-slate-300 hover:text-white hover:border-[#a855f7]'
                  }`}
                >
                  <i className={`bi ${item.icon} text-xs`}></i>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* User Profile / Sign Up quick pill in nav bar */}
            {isAuthenticated ? (
              <button
                onClick={() => openProfileModal('overview')}
                className="px-3.5 py-1.5 rounded-full flex items-center gap-2 whitespace-nowrap transition-all bg-[#140f30] border border-[#8b5cf6]/50 text-purple-300 hover:text-white hover:border-[#a855f7]"
              >
                <i className="bi bi-person-circle text-[#ec4899]"></i>
                <span>User Profile</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('signup')}
                className="px-3.5 py-1.5 rounded-full flex items-center gap-2 whitespace-nowrap transition-all bg-[#140f30] border border-[#8b5cf6]/50 text-purple-300 hover:text-white hover:border-[#a855f7]"
              >
                <i className="bi bi-stars text-yellow-400"></i>
                <span>Sign Up Perks</span>
              </button>
            )}
          </nav>

          {/* ROW 3: Instant Live Notifications & Guaranteed WhatsApp Delivery */}
          <div className="hidden sm:flex items-center justify-between text-[11px] text-slate-300 pt-1 pb-0.5 border-t border-[#0e1730]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Instant Digital Dispatch (60s via WhatsApp)</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                Official PlayBeat Helpdesk: <strong className="text-white">+92 332 1049333</strong>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    openProfileModal('overview');
                  } else {
                    openAuthModal('signup');
                  }
                }}
                className="flex items-center gap-1.5 text-purple-300 hover:text-white font-semibold transition-colors"
              >
                <i className="bi bi-gift-fill text-pink-400"></i>
                <span>{isAuthenticated ? '500 Reward Points' : 'Sign Up Bonus: 500 Reward Points'}</span>
              </button>

              <button
                onClick={() => {
                  onCategorySelect('all');
                  const el = document.getElementById('popular-products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 hover:text-[#facc15] whitespace-nowrap transition-colors"
              >
                <i className="bi bi-stars text-cyan-400"></i>
                <span>Fresh Arrivals</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#060c20] p-4 space-y-3 animate-fade-in">
            {isAuthenticated && customer ? (
              <div
                onClick={() => {
                  openProfileModal('overview');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#0a1430] border border-[#203260]"
              >
                <img
                  src={
                    customer.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                  }
                  alt={customer.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#a855f7]"
                />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-white">{customer.name}</h4>
                  <p className="text-[10px] text-amber-300">👑 {customer.memberTier} · {customer.rewardPoints} Pts</p>
                </div>
                <span className="text-xs font-bold text-purple-400">Open Profile →</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    openAuthModal('signin');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openAuthModal('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-xl bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-xs font-bold text-white text-center shadow-md shadow-purple-950"
                >
                  Sign Up (500 Pts)
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 space-y-1">
              <a
                href="https://wa.me/923321049333"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 text-xs font-semibold text-emerald-400 hover:bg-slate-900/50 rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <i className="bi bi-whatsapp"></i>
                  <span>WhatsApp Helpdesk</span>
                </span>
                <span className="text-[10px] text-slate-400">+92 332 1049333</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
