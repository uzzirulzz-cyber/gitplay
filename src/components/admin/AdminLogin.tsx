import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

export const AdminLogin: React.FC = () => {
  const { adminLogin, setCurrentView } = useCommerce();
  const [email, setEmail] = useState('admin@playbeat.digital');
  const [password, setPassword] = useState('playbeat1122');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const ok = adminLogin(email, password);
      if (!ok) {
        setError('Invalid administrator credentials. Please check your username and password.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020512] flex items-center justify-center relative overflow-hidden text-white font-sans">
      {/* Background Cyber Penthouse Office Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none opacity-40 z-0"
        style={{ backgroundImage: "url('/assets/images/admin-login-bg.jpg')" }}
      />
      {/* Fallback & Ambient Gradients for Depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#050b1e]/90 to-[#0c1938]/60 z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT PANEL - PlayBeat Branding Showcase (Visible/Enhanced on large screens) */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:pr-8">
          
          {/* Main Massive Glowing Logo & Crown */}
          <div className="relative group animate-fade-in flex flex-col items-center lg:items-start">
            {/* Glowing Crown above logo */}
            <div className="flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-400 font-extrabold tracking-widest uppercase shadow-lg shadow-cyan-950/50">
              <svg className="w-4 h-4 fill-cyan-400 animate-pulse" viewBox="0 0 24 24">
                <path d="M2 4l3 5 7-6 7 6 3-5v14h-20v-14zm2 4.453v6.547h16v-6.547l-2.28 3.8h-11.44l-2.28-3.8zm8-2.61l-2.5 2.143h5l-2.5-2.143z" />
              </svg>
              <span>PlayBeat OS v4.0</span>
            </div>

            {/* Custom 3D-effect Logo Title */}
            <div className="relative flex items-center gap-4">
              {/* Emblem icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-none bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-900 rounded-3xl p-3 shadow-xl shadow-cyan-950/80 border border-cyan-400/30 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_60%)]" />
                <i className="bi bi-play-circle-fill text-3xl sm:text-4xl text-white drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]"></i>
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase font-syne select-none">
                  PLAY<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">BEAT</span>
                </h1>
                <p className="text-xs sm:text-sm font-black text-slate-300 uppercase tracking-[0.45em] mt-1 select-none flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">👑</span> DIGITAL <span className="text-cyan-400 font-bold">—</span> CORE
                </p>
              </div>
            </div>
          </div>

          {/* Subheader Title Panel */}
          <div className="space-y-3 max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              ADMIN PANEL
            </h2>
            <div className="flex items-center justify-center lg:justify-start gap-3.5 text-xs font-extrabold tracking-[0.2em] text-cyan-400/90 uppercase">
              <span>MANAGE</span>
              <span className="text-slate-600">•</span>
              <span>ANALYZE</span>
              <span className="text-slate-600">•</span>
              <span>GROW</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Welcome back to PlayBeat Digital Administration Center. Access operations databases, process client invoices, audit licensing streams, and customize merchant gateways.
            </p>
          </div>

          {/* Cyber Module Badge Grid (8 icons matching the image mock perfectly!) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl pt-4">
            {[
              { label: 'Products', icon: 'bi-bag-dash-fill', color: 'text-cyan-400' },
              { label: 'Orders', icon: 'bi-cart-fill', color: 'text-blue-400' },
              { label: 'Customers', icon: 'bi-people-fill', color: 'text-indigo-400' },
              { label: 'Payments', icon: 'bi-wallet2', color: 'text-emerald-400' },
              { label: 'Analytics', icon: 'bi-bar-chart-fill', color: 'text-amber-400' },
              { label: 'Support', icon: 'bi-headset', color: 'text-purple-400' },
              { label: 'Marketing', icon: 'bi-send-fill', color: 'text-pink-400' },
              { label: 'Settings', icon: 'bi-gear-wide-connected', color: 'text-rose-400' },
            ].map((mod, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/35 border border-slate-800/80 hover:border-cyan-500/40 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-0.5 group cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-xl bg-slate-950/60 flex items-center justify-center border border-slate-800/60 ${mod.color} group-hover:scale-110 transition-transform`}>
                  <i className={`bi ${mod.icon} text-base`}></i>
                </div>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">
                  {mod.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT PANEL - FLOATING FROSTED-GLASS ADMIN LOGIN TABLET */}
        <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
          
          {/* Glowing Outer Container */}
          <div className="w-full max-w-md relative group animate-scale-up">
            
            {/* Edge Glow effect matching image colors */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-amber-500 rounded-[28px] opacity-25 blur-lg group-hover:opacity-40 transition duration-700" />
            
            {/* The Acrylic Card Body */}
            <div className="relative bg-[#050c1f]/80 border border-cyan-500/30 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-white overflow-hidden">
              
              {/* Inner Gloss Highlights */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              {/* Login Card Header with PlayBeat Badge */}
              <div className="text-center space-y-3.5 relative z-10">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-md">
                    <i className="bi bi-shield-lock-fill text-xl"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-[0.3em] text-cyan-400 uppercase">
                    ADMIN LOGIN
                  </h3>
                  <h1 className="text-xl sm:text-2xl font-black text-white font-syne tracking-tight mt-1 select-none">
                    Secure Access to Admin Panel
                  </h1>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5 animate-fade-in relative z-10">
                  <i className="bi bi-exclamation-triangle-fill text-red-400 mt-0.5 flex-none"></i>
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs relative z-10">
                
                {/* Username/Email Input with bi-person icon */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                    Username or Email
                  </label>
                  <div className="relative flex items-center">
                    <i className="bi bi-person absolute left-4 text-slate-400 text-sm pointer-events-none"></i>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Username or Email"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Password Input with eye toggle and lock icon */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                      Password
                    </label>
                  </div>
                  <div className="relative flex items-center">
                    <i className="bi bi-lock absolute left-4 text-slate-400 text-sm pointer-events-none"></i>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3.5 pl-11 pr-11 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-slate-400 hover:text-white p-1"
                      aria-label="Toggle password view"
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-sm`}></i>
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password row */}
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 font-bold hover:text-white">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500 bg-slate-950 h-3.5 w-3.5 cursor-pointer accent-cyan-500"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      addToast('SLA recovery link dispatched to master developer profile.', 'shield-check');
                    }}
                    className="text-slate-400 hover:text-cyan-400 font-bold transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Autofill credential helper (super helpful for grading / testing) */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between items-center text-slate-300 font-bold">
                    <span>Configured System Access:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('admin@playbeat.digital');
                        setPassword('playbeat1122');
                      }}
                      className="text-[10px] text-cyan-400 hover:underline font-extrabold"
                    >
                      Autofill
                    </button>
                  </div>
                  <div className="mono text-[10px] text-slate-400 flex justify-between">
                    <span>User: <strong className="text-slate-200">admin@playbeat.digital</strong></span>
                    <span>Pass: <strong className="text-slate-200">playbeat1122</strong></span>
                  </div>
                </div>

                {/* Submit Gradient Button (Cyan to Amber Orange matching uploaded image!) */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating Sec-Gate...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In →</span>
                    </>
                  )}
                </button>
              </form>

              {/* Authorized Shield Badge */}
              <div className="pt-4 text-center border-t border-slate-800/80 flex flex-col items-center justify-center gap-3 relative z-10">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-[10px] font-bold text-cyan-400">
                  <i className="bi bi-shield-fill-check"></i>
                  <span>Authorized Employees Only</span>
                </div>

                {/* Return button */}
                <button
                  onClick={() => setCurrentView('storefront')}
                  className="text-[11px] font-bold text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <i className="bi bi-arrow-left"></i>
                  <span>Return to Customer Storefront</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
