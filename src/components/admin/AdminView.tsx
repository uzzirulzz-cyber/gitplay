import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { AdminLogin } from './AdminLogin.tsx';
import { AdminSidebar } from './AdminSidebar.tsx';
import { AdminTopbar } from './AdminTopbar.tsx';
import { AdminOverview } from './AdminOverview.tsx';
import { AdminStorefrontImporter } from './AdminStorefrontImporter.tsx';
import { AdminOrders } from './AdminOrders.tsx';
import { AdminCatalog } from './AdminCatalog.tsx';
import { AdminLicenseVault } from './AdminLicenseVault.tsx';
import { AdminThemeStudio } from './AdminThemeStudio.tsx';
import { AdminCommandPalette } from './AdminCommandPalette.tsx';
import { AdminNotifications } from './AdminNotifications.tsx';
import { AdminQuickAddModal } from './AdminQuickAddModal.tsx';

export const AdminView: React.FC = () => {
  const { adminSection, setAdminSection, setCurrentView, isAdminAuthenticated } = useCommerce();
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  // If not authenticated, require Admin Login
  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={sidebarMobileOpen}
        onCloseMobile={() => setSidebarMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:ml-[var(--pb-sidebar-width,260px)] min-h-screen flex flex-col transition-[margin-left] duration-200">
        {/* Topbar */}
        <AdminTopbar onToggleSidebar={() => setSidebarMobileOpen(!sidebarMobileOpen)} />

        {/* Dynamic Section Rendering */}
        <main className="flex-1 pb-16">
          {adminSection === 'dashboard' && <AdminOverview />}
          {adminSection === 'storefront-importer' && <AdminStorefrontImporter />}
          {adminSection === 'orders' && <AdminOrders />}
          {adminSection === 'catalog' && <AdminCatalog />}
          {adminSection === 'licenses' && <AdminLicenseVault />}
          {adminSection === 'whatsapp' && <AdminOverview />}
          {adminSection === 'integrations' && <AdminOverview />}

          {/* URL Indexing Route Section */}
          {adminSection === 'routes' && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-[#38bdf8] flex items-center justify-center text-xl">
                  <i className="bi bi-compass"></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">System URL Indexing &amp; Routing</h2>
                  <p className="text-xs text-slate-400">Canonical endpoints and access controls for PlayBeat.</p>
                </div>
              </div>

              <div className="bg-[var(--panel)] border border-[var(--line)] rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Configured Routes</div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[var(--inner)] border border-[var(--line)] flex justify-between items-center">
                    <div>
                      <div className="font-mono font-bold text-emerald-400">/ or /storefront</div>
                      <div className="text-[11px] text-[var(--muted)]">Public Consumer Storefront (No administrative chrome)</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">PUBLIC</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--inner)] border border-[var(--line)] flex justify-between items-center">
                    <div>
                      <div className="font-mono font-bold text-[#38bdf8]">/admin</div>
                      <div className="text-[11px] text-[var(--muted)]">
                        Commerce OS Portal (Protected by admin@playbeat.digital)
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">AUTHENTICATED</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for secondary sub-routes */}
          {![
            'dashboard',
            'storefront-importer',
            'orders',
            'catalog',
            'licenses',
            'whatsapp',
            'integrations',
            'routes'
          ].includes(adminSection) && (
            <div className="p-6 max-w-2xl mx-auto my-12 text-center bg-[var(--panel)] border border-[var(--line)] rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--inner)] text-[var(--accent)] mx-auto flex items-center justify-center text-2xl">
                <i className="bi bi-gear"></i>
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text)] capitalize">
                  {adminSection.replace('-', ' ')} Module
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1">
                  This Commerce OS sub-portal is synchronized with your active catalog and storefront.
                </p>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => setAdminSection('dashboard')}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold"
                >
                  Return to Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('storefront')}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] text-xs text-[var(--text)]"
                >
                  View Storefront
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <AdminThemeStudio />
      <AdminCommandPalette />
      <AdminNotifications />
      <AdminQuickAddModal />
    </div>
  );
};
