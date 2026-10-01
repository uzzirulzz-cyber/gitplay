import React, { useState } from 'react';
import { useCustomerAuth } from '../../context/CustomerAuthContext.tsx';
import { PlayBeatLogo } from '../common/PlayBeatLogo.tsx';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    signIn,
    signUp,
    socialLogin
  } = useCustomerAuth();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authModalTab === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreeTerms) {
        setError('Please accept terms of service to create your account.');
        return;
      }

      setLoading(true);
      const res = await signUp(name, email, phone, password);
      setLoading(false);
      if (!res.success) {
        setError(res.error || 'Failed to sign up.');
      }
    } else {
      if (!email || !password) {
        setError('Please enter your email and password.');
        return;
      }
      setLoading(true);
      const res = await signIn(email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.error || 'Invalid email or password.');
      }
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    await signIn('zain.malik@playbeat.digital', 'playbeat2026');
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={closeAuthModal} />

      {/* Main Auth Container */}
      <div className="relative z-10 w-full max-w-md bg-[#070d1e] border border-[#1d2d57] rounded-3xl shadow-2xl shadow-purple-950/40 overflow-hidden my-auto">
        {/* Neon top accent glow bar */}
        <div className="h-1 bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#06b6d4]" />

        {/* Header with Close Button */}
        <div className="p-5 sm:p-6 pb-2 sm:pb-3 flex items-center justify-between">
          <PlayBeatLogo size="md" />
          <button
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="Close"
          >
            <i className="bi bi-x-lg text-xs"></i>
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="px-5 sm:px-6 pt-1">
          <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800/80">
            <button
              type="button"
              onClick={() => {
                setAuthModalTab('signup');
                setError('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authModalTab === 'signup'
                  ? 'bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white shadow-md shadow-purple-950/80'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="bi bi-person-plus-fill"></i>
              <span>Create Account</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalTab('signin');
                setError('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authModalTab === 'signin'
                  ? 'bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white shadow-md shadow-purple-950/80'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Sign In</span>
            </button>
          </div>
        </div>

        {/* Subtitle & Value Proposition Banner */}
        <div className="px-5 sm:px-6 pt-3 pb-1">
          {authModalTab === 'signup' ? (
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-start gap-2.5">
              <span className="text-base flex-none">🎁</span>
              <div className="text-[11px] leading-snug">
                <span className="font-bold text-purple-300 block">500 Bonus Reward Points ($5.00 Off)</span>
                <span className="text-slate-400">
                  Instant license delivery to WhatsApp & Email + priority replacement warranty.
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">
              Access your digital subscriptions, instant activation codes, and purchase history.
            </p>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-5 sm:mx-6 mt-3 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-shake">
            <i className="bi bi-exclamation-octagon-fill text-red-400 flex-none"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 pt-3">
          {authModalTab === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <i className="bi bi-person text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"></i>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Zain Malik"
                  className="w-full bg-[#0a1228] border border-slate-700/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <i className="bi bi-envelope text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"></i>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#0a1228] border border-slate-700/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
              />
            </div>
          </div>

          {authModalTab === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>WhatsApp Number</span>
                <span className="text-[10px] text-emerald-400 font-normal">For Instant Keys Delivery</span>
              </label>
              <div className="relative">
                <i className="bi bi-whatsapp text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"></i>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 332 1049333"
                  className="w-full bg-[#0a1228] border border-slate-700/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Password</span>
              {authModalTab === 'signin' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your registered email.')}
                  className="text-[10px] text-[#38bdf8] hover:underline"
                >
                  Forgot?
                </button>
              )}
            </label>
            <div className="relative">
              <i className="bi bi-lock text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0a1228] border border-slate-700/60 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-xs`}></i>
              </button>
            </div>
          </div>

          {authModalTab === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <i className="bi bi-shield-check text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0a1228] border border-slate-700/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
                />
              </div>

              {/* Preferences Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsappAlerts}
                    onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-[#a855f7] focus:ring-0"
                  />
                  <span>Send instant digital credentials & renewal alerts via WhatsApp</span>
                </label>

                <label className="flex items-center gap-2 text-[11px] text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-[#a855f7] focus:ring-0"
                  />
                  <span>
                    I agree to PlayBeat terms of service & digital license agreements.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#06b6d4] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-purple-950/60 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Account...</span>
              </>
            ) : (
              <span>{authModalTab === 'signup' ? 'Create Free Account' : 'Sign In to Portal'}</span>
            )}
          </button>

          {/* Quick Demo Sign In option for convenience */}
          {authModalTab === 'signin' && (
            <button
              type="button"
              onClick={handleDemoSignIn}
              disabled={loading}
              className="w-full py-2 px-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-900/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <i className="bi bi-lightning-charge-fill text-yellow-400"></i>
              <span>One-Click Demo Customer Sign In</span>
            </button>
          )}

          {/* Social Authentication */}
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="flex-1 h-[1px] bg-slate-800" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Or Continue With
              </span>
              <div className="flex-1 h-[1px] bg-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => socialLogin('Google')}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.694 0-8.503-3.809-8.503-8.503s3.809-8.503 8.503-8.503c2.28 0 4.12.8 5.56 2.15l3.22-3.22C18.12 1.34 15.35 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.91 0 12.24-4.87 12.24-12.24 0-.82-.08-1.42-.24-1.95H12.24z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => socialLogin('Meta')}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Meta / FB</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
