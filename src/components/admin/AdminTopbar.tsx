import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

interface AdminTopbarProps {
  onToggleSidebar: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onToggleSidebar }) => {
  const {
    setCurrentView,
    setAdminSection,
    setCommandPaletteOpen,
    setThemeStudioOpen,
    setNotificationsOpen,
    setQuickAddOpen,
    appearanceMode,
    setAppearanceMode,
    addToast,
    adminLogout
  } = useCommerce();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {
        addToast('Fullscreen not available in this browser', 'exclamation-triangle');
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[var(--topbg)] backdrop-blur-md border-b border-[var(--line)] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 transition-colors duration-200">
      {/* Left: Mobile trigger & Welcome heading */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-lg border border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)] bg-[var(--inner)]"
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-list text-lg"></i>
        </button>

        <div>
          <div className="text-xs sm:text-sm font-bold text-[var(--text)]">
            Welcome back, Muhammad
          </div>
          <div className="text-[11px] text-[var(--muted)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
            <span>Store operations: live data</span>
          </div>
        </div>
      </div>

      {/* Middle: Quick Link buttons */}
      <div className="hidden md:inline-flex items-center rounded-lg border border-[var(--line)] bg-[var(--inner)] p-0.5 text-xs font-semibold">
        <button
          onClick={() => setCurrentView('storefront')}
          className="px-2.5 py-1 text-[var(--navtext)] hover:text-[var(--text)] hover:bg-[var(--chip)] rounded-md transition-colors flex items-center gap-1.5"
          title="Open Customer Storefront"
        >
          <i className="bi bi-shop text-[var(--cyan)]"></i>
          <span>Store</span>
        </button>
        <button
          onClick={() => setAdminSection('crm')}
          className="px-2.5 py-1 text-[var(--navtext)] hover:text-[var(--text)] hover:bg-[var(--chip)] rounded-md transition-colors flex items-center gap-1.5"
        >
          <i className="bi bi-chat-dots text-[var(--amber)]"></i>
          <span>CRM</span>
        </button>
        <button
          onClick={() => setAdminSection('whatsapp')}
          className="px-2.5 py-1 text-[var(--navtext)] hover:text-[var(--text)] hover:bg-[var(--chip)] rounded-md transition-colors flex items-center gap-1.5"
        >
          <i className="bi bi-whatsapp text-[var(--green)]"></i>
          <span>Meta CRM</span>
        </button>
        <button
          onClick={() => setAdminSection('routes')}
          className="px-2.5 py-1 text-[var(--navtext)] hover:text-[var(--text)] hover:bg-[var(--chip)] rounded-md transition-colors flex items-center gap-1.5"
        >
          <i className="bi bi-link-45deg text-[var(--amber)]"></i>
          <span>URL Index</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Command palette search trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          title="Open Command Palette (Ctrl+K)"
        >
          <i className="bi bi-search text-xs"></i>
          <span>Search…</span>
          <kbd className="text-[10px] bg-[var(--chip)] px-1.5 py-0.5 rounded border border-[var(--line)] mono">
            Ctrl K
          </kbd>
        </button>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="sm:hidden p-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-[var(--muted)] hover:text-[var(--text)]"
          aria-label="Search"
        >
          <i className="bi bi-search"></i>
        </button>

        {/* Appearance Switcher (Light / Auto / Dark) */}
        <div className="flex items-center bg-[var(--chip)] border border-[var(--line)] rounded-full p-0.5">
          <button
            onClick={() => setAppearanceMode('light')}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
              appearanceMode === 'light'
                ? 'bg-[var(--panel)] text-[var(--accent)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
            title="Light mode"
            aria-label="Light mode"
          >
            <i className="bi bi-sun"></i>
          </button>
          <button
            onClick={() => setAppearanceMode('auto')}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
              appearanceMode === 'auto'
                ? 'bg-[var(--panel)] text-[var(--accent)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
            title="Auto mode"
            aria-label="Auto mode"
          >
            <i className="bi bi-circle-half"></i>
          </button>
          <button
            onClick={() => setAppearanceMode('dark')}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
              appearanceMode === 'dark'
                ? 'bg-[var(--panel)] text-[var(--accent)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
            title="Dark mode"
            aria-label="Dark mode"
          >
            <i className="bi bi-moon-stars"></i>
          </button>
        </div>

        {/* Theme Studio Button */}
        <button
          onClick={() => setThemeStudioOpen(true)}
          className="px-2.5 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-xs font-semibold text-[var(--navtext)] hover:text-[var(--text)] transition-colors flex items-center gap-1.5"
          title="Open Theme Studio"
        >
          <i className="bi bi-palette text-[var(--accent)]"></i>
          <span className="hidden lg:inline">Theme</span>
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="hidden md:inline-flex p-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          title="Toggle Fullscreen"
          aria-label="Toggle Fullscreen"
        >
          <i className="bi bi-arrows-fullscreen"></i>
        </button>

        {/* Quick Add */}
        <button
          onClick={() => setQuickAddOpen(true)}
          className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-white text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-1"
        >
          <i className="bi bi-plus-lg"></i>
          <span className="hidden sm:inline">Quick Add</span>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setNotificationsOpen(true)}
          className="relative p-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-xs text-[var(--text)] hover:text-[var(--accent)] transition-colors"
          aria-label="Notifications"
        >
          <i className="bi bi-bell"></i>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--amber)] text-black text-[9px] font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 pl-2 text-right focus:outline-none"
            aria-label="User profile menu"
          >
            <div className="hidden sm:block leading-tight">
              <div className="text-xs font-bold text-[var(--text)]">Muhammad Uzair</div>
              <div className="text-[10px] text-[var(--muted)] mono">Administrator</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center font-bold text-xs">
              MU
            </div>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[var(--panel)] border border-[var(--line)] shadow-xl p-1.5 z-50 text-xs">
              <button
                onClick={() => {
                  setAdminSection('settings');
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-[var(--navtext)] hover:text-[var(--text)] hover:bg-[var(--hover)] flex items-center gap-2"
              >
                <i className="bi bi-person"></i>
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  setAdminSection('settings');
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-[var(--navtext)] hover:text-[var(--text)] hover:bg-[var(--hover)] flex items-center gap-2"
              >
                <i className="bi bi-gear"></i>
                <span>Account Settings</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('storefront');
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-[var(--navtext)] hover:text-[var(--text)] hover:bg-[var(--hover)] flex items-center gap-2"
              >
                <i className="bi bi-shop text-[var(--accent)]"></i>
                <span>Switch to Storefront</span>
              </button>
              <hr className="my-1 border-[var(--line)]" />
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  adminLogout();
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-[var(--red)] hover:bg-[var(--hover)] flex items-center gap-2 font-semibold"
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
