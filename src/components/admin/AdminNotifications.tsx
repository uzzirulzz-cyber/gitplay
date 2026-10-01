import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

export const AdminNotifications: React.FC = () => {
  const { notificationsOpen, setNotificationsOpen, addToast, orders } = useCommerce();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!notificationsOpen) return null;

  const categories = ['All', 'Orders', 'Payments', 'Customers', 'System', 'Security', 'CRM'];

  const notifications = [
    {
      id: 'notif-1',
      cat: 'Orders',
      title: `Order ${orders[0]?.orderNumber || 'PB-1011'} confirmed`,
      sub: `${orders[0]?.customerName || 'Hamza'} paid Rs ${orders[0]?.total.toLocaleString() || '2,400'} for ${orders[0]?.items[0]?.product.name || 'YouTube Premium'}.`,
      time: '10 mins ago',
      icon: 'bi-bag-check-fill',
      color: 'text-[var(--green)]'
    },
    {
      id: 'notif-2',
      cat: 'CRM',
      title: 'WhatsApp message received',
      sub: 'Customer inquired about Netflix 4K private profiles.',
      time: '25 mins ago',
      icon: 'bi-whatsapp',
      color: 'text-[var(--green)]'
    },
    {
      id: 'notif-3',
      cat: 'System',
      title: 'Storefront ZIP source-of-truth active',
      sub: 'All frontend routes and products synchronized with Commerce OS.',
      time: '1 hour ago',
      icon: 'bi-shield-check',
      color: 'text-[var(--accent)]'
    },
    {
      id: 'notif-4',
      cat: 'Payments',
      title: 'JazzCash payment verified',
      sub: 'Rs 2,400 credited to business account.',
      time: '2 hours ago',
      icon: 'bi-credit-card-2-front',
      color: 'text-[var(--amber)]'
    }
  ];

  const filtered = notifications.filter(
    (n) => activeCategory === 'All' || n.cat === activeCategory
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setNotificationsOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-[var(--panel)] border-l border-[var(--line)] shadow-2xl flex flex-col justify-between text-[var(--text)]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="bi bi-bell text-[var(--accent)] text-lg"></i>
              <h2 className="text-base font-bold text-[var(--text)]">Notifications</h2>
            </div>
            <button
              onClick={() => setNotificationsOpen(false)}
              className="p-1.5 text-[var(--muted)] hover:text-[var(--text)] rounded-lg"
              aria-label="Close notifications"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Categories & Actions */}
          <div className="p-4 sm:p-5 border-b border-[var(--line)] space-y-3">
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                      isActive
                        ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                        : 'bg-[var(--inner)] text-[var(--muted)] border-[var(--line)] hover:text-[var(--text)]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => addToast('All notifications marked as read', 'check2-all')}
                className="text-xs text-[var(--accent)] hover:underline font-semibold"
              >
                Mark all as read
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] flex gap-3 hover:border-[var(--accent)] transition-colors"
              >
                <div className={`text-xl flex-none ${item.color}`}>
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[var(--text)]">{item.title}</div>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-0.5">
                    {item.sub}
                  </p>
                  <span className="text-[10px] text-[var(--muted)] mono mt-1 block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--line)] bg-[var(--panel)] text-center text-xs text-[var(--muted)]">
            Commerce OS Notifications Center
          </div>
        </div>
      </div>
    </div>
  );
};
