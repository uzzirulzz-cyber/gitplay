import React, { useState } from 'react';
import { useCustomerAuth } from '../../context/CustomerAuthContext.tsx';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { PlayBeatLogo } from '../common/PlayBeatLogo.tsx';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
];

export const UserProfileModal: React.FC = () => {
  const {
    customer,
    licenses,
    isProfileModalOpen,
    closeProfileModal,
    activeProfileTab,
    setActiveProfileTab,
    updateProfile,
    signOut
  } = useCustomerAuth();

  const { orders } = useCommerce();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [nameVal, setNameVal] = useState(customer?.name || '');
  const [phoneVal, setPhoneVal] = useState(customer?.phone || '');
  const [currencyVal, setCurrencyVal] = useState(customer?.preferredCurrency || 'PKR');
  const [avatarVal, setAvatarVal] = useState(customer?.avatarUrl || AVATAR_PRESETS[0]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password fields
  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  if (!isProfileModalOpen || !customer) return null;

  const handleCopy = (keyText: string, licId: string) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKey(licId);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameVal,
      phone: phoneVal,
      preferredCurrency: currencyVal,
      avatarUrl: avatarVal
    });
    setEditingProfile(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curPass || !newPass) {
      setPassMsg('Please enter both current and new password.');
      return;
    }
    if (newPass.length < 6) {
      setPassMsg('New password must be at least 6 characters.');
      return;
    }
    setPassMsg('Password successfully updated!');
    setCurPass('');
    setNewPass('');
    setTimeout(() => setPassMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={closeProfileModal} />

      {/* Main Profile Modal Card */}
      <div className="relative z-10 w-full max-w-4xl bg-[#070d1e] border border-[#1d2d57] rounded-3xl shadow-2xl shadow-purple-950/40 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Neon Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#06b6d4] flex-none" />

        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 pb-4 border-b border-slate-800/80 flex items-center justify-between flex-none bg-[#091128]/70">
          <div className="flex items-center gap-3">
            <PlayBeatLogo size="sm" />
            <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest hidden sm:inline-block">
              Customer Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={signOut}
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/20 hover:border-red-500/40 transition-colors"
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Sign Out</span>
            </button>

            <button
              onClick={closeProfileModal}
              className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              title="Close"
            >
              <i className="bi bi-x-lg text-xs"></i>
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* Customer Overview Banner */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0c1635] via-[#091128] to-[#070d1e] border border-[#203260] overflow-hidden">
            {/* Ambient background bloom */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-600/15 via-pink-600/10 to-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              {/* Avatar + Info */}
              <div className="flex items-center gap-4">
                <div className="relative group/avatar cursor-pointer" onClick={() => setEditingProfile(true)}>
                  <img
                    src={customer.avatarUrl || AVATAR_PRESETS[0]}
                    alt={customer.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#a855f7] shadow-lg shadow-purple-950/60"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#070d1e] flex items-center justify-center" title="Online & Verified">
                    <i className="bi bi-check text-black text-xs font-black"></i>
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity text-[10px] font-bold text-white">
                    Edit
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {customer.name}
                    </h2>
                    {customer.isVerified && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-bold text-cyan-300 flex items-center gap-1">
                        <i className="bi bi-patch-check-fill text-cyan-400"></i>
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-2">
                    <i className="bi bi-envelope"></i>
                    <span>{customer.email}</span>
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-2">
                    <i className="bi bi-whatsapp text-emerald-400"></i>
                    <span>{customer.phone || 'No WhatsApp phone linked'}</span>
                  </p>
                </div>
              </div>

              {/* Badges: Tier & Reward Points */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 gap-3">
                <div className="text-left sm:text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    <span>👑 {customer.memberTier} Tier</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Member since {customer.memberSince}
                  </p>
                </div>

                <div className="text-right bg-slate-950/60 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                  <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5 justify-end">
                    <i className="bi bi-gem"></i>
                    <span>{customer.rewardPoints} Reward Points</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 block font-medium">
                    = PKR {(customer.rewardPoints * 1.5).toLocaleString()} Store Credit
                  </span>
                </div>
              </div>
            </div>

            {/* Loyalty XP Progress Bar */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <i className="bi bi-speedometer2 text-cyan-400"></i>
                  <span>Tier Progression</span>
                </span>
                <span className="text-slate-400">
                  <strong className="text-white">1,420 XP</strong> / 2,000 XP to Diamond VIP
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  style={{ width: '71%' }}
                />
              </div>
            </div>
          </div>

          {/* Profile Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 border-b border-slate-800/80 no-scrollbar">
            <button
              onClick={() => setActiveProfileTab('overview')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeProfileTab === 'overview'
                  ? 'bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white shadow-md shadow-purple-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <i className="bi bi-key-fill"></i>
              <span>Active Subscriptions ({licenses.length})</span>
            </button>

            <button
              onClick={() => setActiveProfileTab('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeProfileTab === 'orders'
                  ? 'bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white shadow-md shadow-purple-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <i className="bi bi-receipt"></i>
              <span>Order History</span>
            </button>

            <button
              onClick={() => setActiveProfileTab('settings')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeProfileTab === 'settings'
                  ? 'bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white shadow-md shadow-purple-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <i className="bi bi-gear-fill"></i>
              <span>Settings & WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveProfileTab('security')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeProfileTab === 'security'
                  ? 'bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white shadow-md shadow-purple-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <i className="bi bi-shield-lock-fill"></i>
              <span>Security</span>
            </button>
          </div>

          {/* TAB 1: LICENSES & ACTIVE SUBSCRIPTIONS */}
          {activeProfileTab === 'overview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Your Digital Subscriptions & Activation Keys</h3>
                  <p className="text-xs text-slate-400">
                    Instant access to credentials, family invite links, and renewal guarantees.
                  </p>
                </div>
                <a
                  href="https://wa.me/923321049333?text=Hello%20PlayBeat%2C%20I%20need%20assistance%20with%20my%20active%20subscriptions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30"
                >
                  <i className="bi bi-whatsapp"></i>
                  <span>WhatsApp Helpdesk</span>
                </a>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {licenses.map((lic) => (
                  <div
                    key={lic.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#091128]/80 border border-[#1b2b52] hover:border-[#a855f7]/50 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center flex-none">
                          <i className="bi bi-stars text-[#a855f7] text-lg"></i>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-white">{lic.productName}</h4>
                            <span className="px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                              {lic.duration}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 block">
                            Order Ref: {lic.orderNumber} · Active until {lic.expiresAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Active</span>
                        </span>
                      </div>
                    </div>

                    {/* License Key Box */}
                    <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0 font-mono text-xs text-cyan-300 truncate select-all">
                        {lic.licenseKey}
                      </div>

                      <button
                        onClick={() => handleCopy(lic.licenseKey, lic.id)}
                        className={`flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          copiedKey === lic.id
                            ? 'bg-emerald-500 text-black'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                        }`}
                      >
                        <i className={`bi ${copiedKey === lic.id ? 'bi-check-lg' : 'bi-copy'}`}></i>
                        <span>{copiedKey === lic.id ? 'Copied!' : 'Copy Key'}</span>
                      </button>
                    </div>

                    {/* Instructions */}
                    <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60 flex items-start gap-2">
                      <i className="bi bi-info-circle text-[#38bdf8] flex-none mt-0.5"></i>
                      <span>{lic.instructions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeProfileTab === 'orders' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Your Orders & Digital Receipts</h3>
                <p className="text-xs text-slate-400">
                  Real-time status of all digital transactions processed on PlayBeat Digital.
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                  No orders placed yet. Browse the catalog to grab exclusive subscriptions!
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-2xl bg-[#091128]/70 border border-[#1b2b52] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white">{order.orderNumber}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">
                          {order.createdAt} · Payment: <span className="uppercase text-slate-300 font-semibold">{order.paymentMethod}</span>
                        </p>
                        <p className="text-slate-300 text-[11px]">
                          {order.items.map(it => `${it.product.name} (x${it.quantity})`).join(', ')}
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <div className="text-sm font-bold text-yellow-400">
                          PKR {order.total.toLocaleString()}
                        </div>
                        <button
                          onClick={() => alert(`Receipt for order ${order.orderNumber} has been dispatched to ${customer.email} and WhatsApp.`)}
                          className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center gap-1"
                        >
                          <i className="bi bi-file-earmark-arrow-down"></i>
                          <span>Receipt</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SETTINGS & WHATSAPP */}
          {activeProfileTab === 'settings' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Profile Details & Notification Preferences</h3>
                <p className="text-xs text-slate-400">
                  Update your contact details for automated WhatsApp digital delivery.
                </p>
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* Avatar Preset Chooser */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Choose Profile Avatar</label>
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {AVATAR_PRESETS.map((av, idx) => (
                      <img
                        key={idx}
                        src={av}
                        alt="Avatar choice"
                        onClick={() => setAvatarVal(av)}
                        className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                          avatarVal === av
                            ? 'border-[#ec4899] scale-105 shadow-md shadow-pink-950'
                            : 'border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={nameVal}
                      onChange={(e) => setNameVal(e.target.value)}
                      className="w-full bg-[#0a1228] border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Phone Number</label>
                    <input
                      type="text"
                      value={phoneVal}
                      onChange={(e) => setPhoneVal(e.target.value)}
                      className="w-full bg-[#0a1228] border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Currency</label>
                    <select
                      value={currencyVal}
                      onChange={(e) => setCurrencyVal(e.target.value)}
                      className="w-full bg-[#0a1228] border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                    >
                      <option value="PKR">Pakistani Rupee (PKR)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="AED">UAE Dirham (AED)</option>
                      <option value="SAR">Saudi Riyal (SAR)</option>
                    </select>
                  </div>
                </div>

                {/* Notifications Toggles */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Automated Alerts</h4>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5 text-xs">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-300">WhatsApp Instant Key Delivery</span>
                      <input
                        type="checkbox"
                        checked={customer.notificationPrefs.whatsapp}
                        onChange={(e) =>
                          updateProfile({
                            notificationPrefs: { ...customer.notificationPrefs, whatsapp: e.target.checked }
                          })
                        }
                        className="rounded bg-slate-900 border-slate-700 text-[#a855f7]"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-300">Email Invoices & Renewal Reminders</span>
                      <input
                        type="checkbox"
                        checked={customer.notificationPrefs.email}
                        onChange={(e) =>
                          updateProfile({
                            notificationPrefs: { ...customer.notificationPrefs, email: e.target.checked }
                          })
                        }
                        className="rounded bg-slate-900 border-slate-700 text-[#a855f7]"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white font-bold text-xs shadow-md shadow-purple-950 hover:brightness-110 active:scale-95 transition-all"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: SECURITY */}
          {activeProfileTab === 'security' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Account Password & Security</h3>
                <p className="text-xs text-slate-400">
                  Manage your credentials and view protected login protocols.
                </p>
              </div>

              {passMsg && (
                <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
                  <i className="bi bi-info-circle-fill"></i>
                  <span>{passMsg}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-3.5 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={curPass}
                    onChange={(e) => setCurPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0a1228] border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0a1228] border border-slate-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs transition-colors"
                >
                  Update Password
                </button>
              </form>

              {/* 2FA Security status */}
              <div className="pt-4 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <i className="bi bi-shield-check text-emerald-400 text-xl"></i>
                    <div>
                      <h4 className="font-bold text-white">WhatsApp 2-Factor Authentication</h4>
                      <p className="text-[11px] text-slate-400">Critical key dispatches require instant WhatsApp OTP verification.</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                    ENABLED
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
