import React, { useState } from 'react';
import { useCustomerAuth } from '../../context/CustomerAuthContext.tsx';
import { PlayBeatLogo } from '../common/PlayBeatLogo.tsx';

export const SignUpSection: React.FC = () => {
  const { customer, signUp, openProfileModal, openAuthModal } = useCustomerAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await signUp(name, email, phone, password);
    setLoading(false);
    if (!res.success) {
      setError(res.error || 'Failed to register account.');
    }
  };

  return (
    <section className="relative py-12 sm:py-16 bg-[#040817] overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#091128] via-[#0c1638] to-[#0a122e] border border-[#1e2f5b] shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          {/* Top neon glow line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#06b6d4]" />

          {customer ? (
            // LOGGED-IN CUSTOMER CARD
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  <i className="bi bi-patch-check-fill text-emerald-400"></i>
                  <span>Active Member: {customer.memberTier} Tier</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Welcome back, <span className="text-[#a855f7]">{customer.name}</span>!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  You have <strong className="text-white">{customer.rewardPoints} Reward Points</strong> available for your next subscription renewal. Access your active digital keys and invoices anytime.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openProfileModal('overview')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#06b6d4] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-purple-950/60 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <i className="bi bi-person-circle text-base"></i>
                  <span>Open My Customer Portal</span>
                </button>
              </div>
            </div>
          ) : (
            // GUEST SIGN UP EXPERIENCE
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Value Proposition & Benefits */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-ping" />
                  <span>Exclusive Member Program</span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Join PlayBeat Digital & Unlock <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#06b6d4] bg-clip-text text-transparent">
                      VIP Discounts & Instant Keys
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                    Create your free account today. Receive automated WhatsApp license key deliveries, 100% replacement warranty, and 500 bonus reward points ($5.00 store credit).
                  </p>
                </div>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#070e24]/80 border border-[#162547]">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[#a855f7] flex items-center justify-center flex-none">
                      <i className="bi bi-lightning-charge-fill"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">60s Key Delivery</h4>
                      <p className="text-[11px] text-slate-400">Instant codes via WhatsApp & Email.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#070e24]/80 border border-[#162547]">
                    <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/30 text-[#ec4899] flex items-center justify-center flex-none">
                      <i className="bi bi-gift-fill"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">500 Reward Points</h4>
                      <p className="text-[11px] text-slate-400">Bonus credits credited on registration.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#070e24]/80 border border-[#162547]">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-[#06b6d4] flex items-center justify-center flex-none">
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">100% Warranty</h4>
                      <p className="text-[11px] text-slate-400">Guaranteed replacement if issues arise.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#070e24]/80 border border-[#162547]">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-none">
                      <i className="bi bi-whatsapp"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Direct WhatsApp Desk</h4>
                      <p className="text-[11px] text-slate-400">Fast 24/7 priority customer support.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Instant Registration Card */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#070e24] border border-[#1e305e] shadow-xl relative">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <i className="bi bi-person-plus-fill text-[#a855f7]"></i>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Create Free Account
                      </span>
                    </div>
                    <button
                      onClick={() => openAuthModal('signin')}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                      Already a member? Sign In →
                    </button>
                  </div>

                  {error && (
                    <div className="mt-3 p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <i className="bi bi-exclamation-triangle-fill text-red-400"></i>
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleQuickSignUp} className="mt-4 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Zain Malik"
                        className="w-full bg-[#0a1430] border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-[#0a1430] border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                        <span>WhatsApp Number</span>
                        <span className="text-[10px] text-emerald-400 font-normal">For license keys</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 332 1049333"
                        className="w-full bg-[#0a1430] border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Password (Min 6 chars)
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-[#0a1430] border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 mt-1 rounded-xl bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#06b6d4] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-purple-950/60 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <span>Sign Up & Claim 500 Points</span>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-400 text-center pt-1">
                      Instant automatic key dispatch system enabled. No credit card required to register.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
