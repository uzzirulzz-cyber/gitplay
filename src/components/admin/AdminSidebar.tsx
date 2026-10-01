import React from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { PlayBeatLogo } from '../common/PlayBeatLogo.tsx';

interface AdminSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { adminSection, setAdminSection, orders, products, setCurrentView, adminLogout } = useCommerce();

  const menu = [
    {
      group: 'MAIN',
      items: [
        { id: 'dashboard', icon: 'grid', label: 'Dashboard', badge: undefined, active: adminSection === 'dashboard' },
        { id: 'health', icon: 'activity', label: 'System Health', badge: undefined, active: adminSection === 'health' },
        { id: 'audit', icon: 'journal-text', label: 'Audit Log', badge: undefined, active: adminSection === 'audit' },
        { id: 'routes', icon: 'compass', label: 'Routing URL Index', badge: undefined, active: adminSection === 'routes' }
      ]
    },
    {
      group: 'PORTALS & CRM',
      items: [
        { id: 'crm', icon: 'chat-square-text', label: 'Employee CRM', badge: undefined, active: adminSection === 'crm' },
        { id: 'whatsapp', icon: 'whatsapp', label: 'Meta CRM (WhatsApp)', badge: 'LIVE', active: adminSection === 'whatsapp' }
      ]
    },
    {
      group: 'PAYMENTS',
      items: [
        { id: 'payments', icon: 'credit-card', label: 'Payment Gateway', badge: undefined, active: adminSection === 'payments' }
      ]
    },
    {
      group: 'WEBSITE & ANALYTICS',
      items: [
        { id: 'storefront-importer', icon: 'file-earmark-zip', label: 'Storefront ZIP Inspector', badge: 'SOURCE', active: adminSection === 'storefront-importer' },
        { id: 'website-builder', icon: 'globe', label: 'Website Builder CMS', badge: undefined, active: adminSection === 'website-builder' },
        { id: 'seo', icon: 'search', label: 'SEO & Indexing', badge: undefined, active: adminSection === 'seo' },
        { id: 'analytics', icon: 'bar-chart', label: 'Analytics & Traffic', badge: undefined, active: adminSection === 'analytics' },
        { id: 'whatsapp-biz', icon: 'whatsapp', label: 'WhatsApp Business', badge: undefined, active: adminSection === 'whatsapp-biz' }
      ]
    },
    {
      group: 'COMMERCE & INVENTORY',
      items: [
        { id: 'orders', icon: 'bag', label: 'Orders & Fulfillment', badge: orders.length, active: adminSection === 'orders' },
        { id: 'catalog', icon: 'box', label: 'Catalog Products', badge: products.length, active: adminSection === 'catalog' },
        { id: 'inventory', icon: 'boxes', label: 'Inventory & Stock', badge: undefined, active: adminSection === 'inventory' },
        { id: 'licenses', icon: 'key', label: 'Digital License Vault', badge: 'Vault', active: adminSection === 'licenses' },
        { id: 'subscriptions', icon: 'arrow-repeat', label: 'Subscriptions', badge: undefined, active: adminSection === 'subscriptions' },
        { id: 'coupons', icon: 'tag', label: 'Discounts & Coupons', badge: undefined, active: adminSection === 'coupons' }
      ]
    },
    {
      group: 'CUSTOMERS & SUPPORT',
      items: [
        { id: 'customers', icon: 'people', label: 'Customer Accounts', badge: 0, active: adminSection === 'customers' },
        { id: 'tickets', icon: 'chat-left', label: 'Support Tickets', badge: undefined, active: adminSection === 'tickets' },
        { id: 'chat', icon: 'chat-dots', label: 'Live Chat Box', badge: undefined, active: adminSection === 'chat' }
      ]
    },
    {
      group: 'PLATFORM',
      items: [
        { id: 'integrations', icon: 'link-45deg', label: 'Social Integrations', badge: undefined, active: adminSection === 'integrations' },
        { id: 'settings', icon: 'person-gear', label: 'Profile Settings', badge: undefined, active: adminSection === 'settings' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`sidebar fixed inset-y-0 left-0 w-[var(--pb-sidebar-width,260px)] bg-[var(--sidebg)] border-r border-[var(--line)] overflow-y-auto z-40 transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="p-4 border-b border-[var(--line)]">
          <div className="flex items-center justify-between">
            <PlayBeatLogo size="sm" />
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30">
              LIVE
            </span>
          </div>
          <div className="text-[10px] font-semibold text-[var(--muted)] tracking-wider mt-1.5">
            COMMERCE OS TERMINAL
          </div>
        </div>

        {/* Storefront Quick Jump Banner */}
        <div className="p-3 mx-2 my-2 rounded-xl bg-[var(--inner)] border border-[var(--line)]">
          <div className="text-[11px] font-bold text-[var(--text)] mb-1 flex items-center justify-between">
            <span>Customer Storefront</span>
            <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
          </div>
          <p className="text-[10px] text-[var(--muted)] leading-tight mb-2">
            Switch to the live customer-facing digital subscription shop.
          </p>
          <button
            onClick={() => setCurrentView('storefront')}
            className="w-full py-1.5 px-2.5 rounded-lg bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 text-[var(--accent)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <i className="bi bi-shop"></i>
            <span>View Storefront</span>
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="nav flex-column pb-6 space-y-1">
          {menu.map((group, gIdx) => (
            <div key={gIdx}>
              <div className="grp text-[10px] font-bold text-[var(--muted)] px-4 pt-3 pb-1 tracking-wider uppercase">
                {group.group}
              </div>
              {group.items.map((item) => {
                const isActive = item.active;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setAdminSection(item.id);
                      onCloseMobile();
                    }}
                    className={`w-[calc(100%-1rem)] mx-2 my-0.5 px-3 py-1.5 rounded-lg flex items-center gap-2.5 text-xs font-medium transition-all text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-[var(--accent2)] to-[var(--accent)] text-white shadow-sm font-semibold'
                        : 'text-[var(--navtext)] hover:bg-[var(--hover)] hover:text-[var(--text)]'
                    }`}
                  >
                    <i className={`bi bi-${item.icon} text-sm flex-none`}></i>
                    <span className="truncate flex-1">{item.label}</span>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-auto ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[var(--chip)] text-[var(--navtext)]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer Logout Button */}
        <div className="p-3 border-t border-[var(--line)] mt-auto">
          <button
            onClick={() => {
              onCloseMobile();
              adminLogout();
            }}
            className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--inner)] hover:bg-[var(--chip)] text-xs text-rose-400 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out of Terminal</span>
          </button>
        </div>
      </aside>
    </>
  );
};
