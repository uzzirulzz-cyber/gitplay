import React, { useEffect } from 'react';
import { CommerceProvider, useCommerce } from './context/CommerceContext.tsx';
import { CustomerAuthProvider } from './context/CustomerAuthContext.tsx';
import { StorefrontView } from './components/storefront/StorefrontView.tsx';
import { AdminView } from './components/admin/AdminView.tsx';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, toasts, removeToast } = useCommerce();

  // Support hotkey (Alt + A) for direct administrator console entry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+A or Ctrl+Shift+A
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setCurrentView(currentView === 'storefront' ? 'admin' : 'storefront');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, setCurrentView]);

  return (
    <div className="relative min-h-screen">
      {/* Active Screen: Storefront or Admin Dashboard (No admin buttons on storefront) */}
      {currentView === 'storefront' ? <StorefrontView /> : <AdminView />}

      {/* Global Toast Notifications Stack */}
      <div
        className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[var(--panel)] border border-[var(--line)] border-l-4 border-l-[var(--accent)] rounded-xl p-3 shadow-xl text-xs text-[var(--text)] flex items-start gap-2.5 animate-toast"
          >
            <i
              className={`bi bi-${toast.icon || 'check-circle-fill'} text-[var(--accent)] text-sm flex-none mt-0.5`}
            ></i>
            <div className="flex-1 font-medium">{toast.msg}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[var(--muted)] hover:text-[var(--text)] p-0.5"
              aria-label="Dismiss notification"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CommerceProvider>
      <CustomerAuthProvider>
        <AppContent />
      </CustomerAuthProvider>
    </CommerceProvider>
  );
}
