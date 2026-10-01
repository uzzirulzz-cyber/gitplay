import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
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

  const [activeNav, setActiveNav] = useState('Home');
  const [selectedSearchCat, setSelectedSearchCat] = useState('All Categories');
  const [searchVal, setSearchVal] = useState('');
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const [customer, setCustomer] = useState<{ name: string; email: string; phone?: string } | null>(() => {
    try {
      const saved = localStorage.getItem('pb-customer-session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [custEmail, setCustEmail] = useState('');
  const [custName, setCustName] = useState('');
  const [custPass, setCustPass] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custEmail || !custPass) {
      setAuthError('Please fill out all required fields.');
      return;
    }
    setAuthError('');
    setAuthLoading(true);
    setTimeout(() => {
      const name = custEmail.split('@')[0];
      const dummyCust = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: custEmail,
        phone: custPhone || '+92 332 1049333'
      };
      setCustomer(dummyCust);
      localStorage.setItem('pb-customer-session', JSON.stringify(dummyCust));
      setAuthLoading(false);
      setAccountModalOpen(false);
    }, 800);
  };

  const handleCustomerSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custEmail || !custPass) {
      setAuthError('Please fill out all required fields.');
      return;
    }
    setAuthError('');
    setAuthLoading(true);
    setTimeout(() => {
      const dummyCust = {
        name: custName,
        email: custEmail,
        phone: custPhone || '+92 332 1049333'
      };
      setCustomer(dummyCust);
      localStorage.setItem('pb-customer-session', JSON.stringify(dummyCust));
      setAuthLoading(false);
      setAccountModalOpen(false);
    }, 800);
  };

  const handleSocialLogin = (provider: 'Google' | 'Meta') => {
    setAuthLoading(true);
    setTimeout(() => {
      const dummyCust = {
        name: provider === 'Google' ? 'Google PlayBeat User' : 'Meta PlayBeat User',
        email: provider === 'Google' ? 'google.user@playbeat.digital' : 'meta.user@playbeat.digital',
        phone: '+92 300 0000000'
      };
      setCustomer(dummyCust);
      localStorage.setItem('pb-customer-session', JSON.stringify(dummyCust));
      setAuthLoading(false);
      setAccountModalOpen(false);
    }, 900);
  };

  const handleCustomerLogout = () => {
    setCustomer(null);
    localStorage.removeItem('pb-customer-session');
    setAccountModalOpen(false);
  };

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
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3.5">
          {/* ROW 1: Logo + Big Rounded Search Bar + Wishlist + Account + Cart */}
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Logo: Official Metallic 3D PlayBeat Logo */}
            <a href="#top" className="flex items-center gap-2 flex-none group select-none">
              <PlayBeatLogo size="md" />
            </a>

            {/* Central Rounded Search Bar with Dropdown */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 max-w-2xl hidden md:flex items-center bg-[#070f26] border border-[#1d2d57] rounded-full p-1 pl-4 pr-1 text-xs focus-within:border-[#38bdf8] focus-within:ring-1 focus-within:ring-[#38bdf8] transition-all"
            >
              <i className="bi bi-search text-slate-400 text-sm mr-2.5"></i>
              <input
                type="text"
                placeholder="Search for products, brands or categories..."
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

            {/* Right Utilities: Wishlist, Account, Cart */}
            <div className="flex items-center gap-3 sm:gap-5 flex-none">
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

              {/* Account */}
              <button
                onClick={() => setAccountModalOpen(true)}
                className="hidden sm:flex flex-col items-center gap-0.5 text-slate-300 hover:text-white transition-colors text-center group"
                title={customer ? `Profile: ${customer.name}` : "Customer Account"}
              >
                <div className="relative">
                  {customer ? (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white font-extrabold text-[9px] flex items-center justify-center border border-cyan-400 shadow-md shadow-cyan-500/20">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <i className="bi bi-person-circle text-[#38bdf8] text-lg group-hover:scale-110 transition-transform"></i>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-200 max-w-[65px] truncate mt-0.5">
                  {customer ? customer.name.split(' ')[0] : 'Account'}
                </span>
              </button>

              {/* Yellow Cart Button: Cart (0) */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="px-4 sm:px-5 py-2 rounded-full bg-[#facc15] hover:bg-[#fde047] text-black font-extrabold text-xs tracking-wide shadow-md shadow-[#facc15]/20 flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap"
              >
                <i className="bi bi-cart3 text-base"></i>
                <span>Cart ({cartCount})</span>
              </button>
            </div>
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
                      ? 'bg-[#facc15] text-black shadow-md shadow-[#facc15]/15'
                      : 'bg-transparent text-slate-300 hover:text-white hover:bg-[#0c1630]'
                  }`}
                >
                  <i className={`bi ${item.icon} text-sm ${isSelected ? 'text-black' : 'text-[#facc15]'}`}></i>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ROW 3: Sub-Nav / Trending Strip */}
          <div className="rounded-xl bg-[#070e24]/90 border border-[#16254a] px-4 sm:px-6 py-2 flex items-center justify-between gap-3 text-[11px] sm:text-xs font-bold text-slate-300 overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                onCategorySelect('all');
                document.getElementById('popular-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 hover:text-[#facc15] whitespace-nowrap transition-colors"
            >
              <i className="bi bi-fire text-amber-500"></i>
              <span>Trending Now</span>
            </button>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <button
              onClick={() => {
                onCategorySelect('gaming_vpn');
                document.getElementById('popular-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 hover:text-[#facc15] whitespace-nowrap transition-colors"
            >
              <i className="bi bi-tag-fill text-[#38bdf8]"></i>
              <span>Hot Deals</span>
            </button>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <button
              onClick={() => {
                onCategorySelect('entertainment');
                document.getElementById('popular-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 hover:text-[#facc15] whitespace-nowrap transition-colors"
            >
              <i className="bi bi-trophy-fill text-yellow-400"></i>
              <span>Best Value</span>
            </button>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <button
              onClick={() => {
                onCategorySelect('software');
                document.getElementById('popular-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 hover:text-[#facc15] whitespace-nowrap transition-colors"
            >
              <i className="bi bi-percent text-emerald-400 font-extrabold"></i>
              <span>Discounts</span>
            </button>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <button
              onClick={() => {
                onCategorySelect('iptv');
                document.getElementById('popular-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 hover:text-[#facc15] whitespace-nowrap transition-colors"
            >
              <i className="bi bi-stars text-cyan-400"></i>
              <span>Fresh Arrivals</span>
            </button>
          </div>
        </div>
      </header>

      {/* Account Modal (Sleek Storefront Client Login / Register & Support) */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#070d22] border border-cyan-500/20 p-6 sm:p-8 shadow-2xl space-y-6 text-white relative">
            
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-1/4 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-[#14203e]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/50 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <i className="bi bi-person-badge-fill"></i>
                </div>
                <div>
                  <h3 className="text-sm font-black text-white tracking-wide">PlayBeat Customer Center</h3>
                  <p className="text-[10px] text-slate-400">Premium Digital Subscriptions Portal</p>
                </div>
              </div>
              <button
                onClick={() => setAccountModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <i className="bi bi-x-lg text-lg"></i>
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-[11px] flex gap-2">
                <i className="bi bi-exclamation-circle-fill text-red-400 mt-0.5"></i>
                <span>{authError}</span>
              </div>
            )}

            {/* CONDITIONAL BODY: NOT SIGNED IN vs SIGNED IN */}
            {!customer ? (
              <div className="space-y-4">
                
                {/* Tabs switcher */}
                <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-900">
                  <button
                    onClick={() => { setAuthTab('signin'); setAuthError(''); }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      authTab === 'signin' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setAuthTab('signup'); setAuthError(''); }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      authTab === 'signup' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Register Account
                  </button>
                </div>

                {/* Tab Forms */}
                <form onSubmit={authTab === 'signin' ? handleCustomerLogin : handleCustomerSignup} className="space-y-3.5 text-xs">
                  
                  {authTab === 'signup' && (
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="e.g. Zain Malik"
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Password</label>
                    <input
                      type="password"
                      required
                      value={custPass}
                      onChange={(e) => setCustPass(e.target.value)}
                      placeholder="••••••••••"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">WhatsApp Number (For License Alerts)</label>
                    <input
                      type="tel"
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      placeholder="e.g. +92 332 1049333"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Primary submit action */}
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60"
                  >
                    {authLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Secure Access...</span>
                      </>
                    ) : (
                      <span>{authTab === 'signin' ? 'Sign In' : 'Create PlayBeat Account'}</span>
                    )}
                  </button>
                </form>

                {/* OR Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-[1px] bg-slate-800" />
                  <span className="text-[10px] font-bold text-slate-500">OR CONNECT WITH</span>
                  <div className="flex-1 h-[1px] bg-slate-800" />
                </div>

                {/* Social Login Buttons (Google, Meta) */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    disabled={authLoading}
                    className="py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/40 hover:bg-slate-900 transition-colors flex items-center justify-center gap-2.5 text-xs font-bold text-slate-300"
                  >
                    <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.694 0-8.503-3.809-8.503-8.503s3.809-8.503 8.503-8.503c2.28 0 4.12.8 5.56 2.15l3.22-3.22C18.12 1.34 15.35 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.91 0 12.24-4.87 12.24-12.24 0-.82-.08-1.42-.24-1.95H12.24z"/>
                    </svg>
                    <span>Google</span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Meta')}
                    disabled={authLoading}
                    className="py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition-colors flex items-center justify-center gap-2.5 text-xs font-bold text-slate-300"
                  >
                    <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Meta / FB</span>
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-[10px] text-slate-500">
                    By accessing PlayBeat Customer Center, you agree to automatic secure key delivery protocols.
                  </p>
                </div>

              </div>
            ) : (
              // SIGNED IN CUSTOMER VIEW
              <div className="space-y-4 animate-fade-in">
                
                {/* Profile Card */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full blur-2xl opacity-10 pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white font-extrabold text-base flex items-center justify-center border border-cyan-400 shadow-lg shadow-cyan-500/20">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <h4 className="text-sm font-bold text-white">{customer.name}</h4>
                    <p className="text-[11px] text-slate-400">{customer.email}</p>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="px-2 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-[9px] font-black text-yellow-400 uppercase">
                        👑 Gold Member
                      </span>
                      <span className="text-[9px] text-slate-400">XP: 1,420 pts</span>
                    </div>
                  </div>
                </div>

                {/* Subscriptions Stream Panel */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Subscriptions</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <i className="bi bi-youtube text-red-500 text-base"></i>
                        <div>
                          <p className="font-bold">YouTube Premium (12M)</p>
                          <p className="text-[10px] text-slate-400">Renewal: Oct 2027</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase">
                        Active
                      </span>
                    </div>

                    <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <i className="bi bi-film text-cyan-400 text-base"></i>
                        <div>
                          <p className="font-bold">Netflix Combo (1M)</p>
                          <p className="text-[10px] text-slate-400">Order Ref: PB-1011</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold text-amber-400 uppercase">
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Helpdesk actions */}
                <div className="space-y-2 pt-2">
                  <a
                    href="https://wa.me/923321049333?text=Hello%20PlayBeat%2C%20I%20would%20like%20to%20verify%20my%20subscription%20credentials."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#25d366] text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all shadow-md"
                  >
                    <i className="bi bi-whatsapp"></i>
                    <span>Direct WhatsApp Support Desk</span>
                  </a>

                  <button
                    onClick={handleCustomerLogout}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <i className="bi bi-box-arrow-right text-red-400"></i>
                    <span>Sign Out of Account</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
