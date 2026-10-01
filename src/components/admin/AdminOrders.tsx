import React, { useState, useMemo } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { OrderStatus } from '../../types.ts';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, addToast, setCurrentView } = useCommerce();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => {
        if (filterStatus === 'all') return true;
        return o.status === filterStatus;
      })
      .filter((o) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.customerPhone.toLowerCase().includes(q)
        );
      });
  }, [orders, filterStatus, searchQuery]);

  return (
    <div className="p-4 sm:p-6 max-w-[var(--pb-content-width,1600px)] mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-[var(--text)] font-syne">
              Orders &amp; Fulfillment
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30">
              {orders.length} TOTAL
            </span>
          </div>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            Manage customer subscription orders, dispatch digital license keys, and track status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('storefront')}
            className="px-3.5 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-xs font-semibold text-[var(--text)] hover:border-[var(--accent)] transition-colors flex items-center gap-1.5"
          >
            <i className="bi bi-cart text-[var(--accent)]"></i>
            <span>Test Customer Checkout</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status segmented buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'completed', label: 'Completed', count: orders.filter((o) => o.status === 'completed').length },
            { id: 'processing', label: 'Processing', count: orders.filter((o) => o.status === 'processing').length },
            { id: 'pending', label: 'Pending', count: orders.filter((o) => o.status === 'pending').length }
          ].map((tab) => {
            const isActive = filterStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'bg-[var(--inner)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--line)]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[var(--chip)] text-[var(--muted)]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <i className="bi bi-search absolute left-3 top-2.5 text-xs text-[var(--muted)]"></i>
          <input
            type="text"
            placeholder="Search order #, customer, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-xl py-1.5 pl-8 pr-3 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[var(--panel)] border border-[var(--line)] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--text)]">
            <thead className="bg-[var(--inner)] text-[var(--muted)] uppercase text-[10px] tracking-wider border-b border-[var(--line)]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Subscriptions / Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">License Key</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[var(--hover)] transition-colors">
                    {/* Order ID & Date */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[var(--accent)]">
                      <div>{order.orderNumber}</div>
                      <div className="text-[10px] text-[var(--muted)] font-normal">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[var(--text)]">{order.customerName}</div>
                      <div className="text-[11px] text-[var(--muted)]">{order.customerEmail}</div>
                      <div className="text-[10px] text-[var(--muted)] mono">{order.customerPhone}</div>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4 max-w-xs">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="truncate">
                          <span className="font-bold text-[var(--text)]">{it.quantity}x</span>{' '}
                          <span>{it.product.name}</span>
                          <span className="text-[10px] text-[var(--muted)] block truncate">
                            {it.variantName || it.product.duration}
                          </span>
                        </div>
                      ))}
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-4 font-bold mono text-sm text-[var(--text)]">
                      Rs {order.total.toLocaleString()}
                    </td>

                    {/* Payment */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-[var(--chip)] text-[var(--navtext)] border border-[var(--line)] text-[10px] font-semibold uppercase">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className={`text-[10px] font-bold px-2 py-1 rounded-md border focus:outline-none cursor-pointer ${
                          order.status === 'completed'
                            ? 'bg-[var(--green)]/15 text-[var(--green)] border-[var(--green)]/30'
                            : order.status === 'processing'
                            ? 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30'
                            : order.status === 'pending'
                            ? 'bg-[var(--amber)]/15 text-[var(--amber)] border-[var(--amber)]/30'
                            : 'bg-[var(--red)]/15 text-[var(--red)] border-[var(--red)]/30'
                        }`}
                      >
                        <option value="completed" className="bg-[var(--panel)] text-[var(--text)]">
                          Completed
                        </option>
                        <option value="processing" className="bg-[var(--panel)] text-[var(--text)]">
                          Processing
                        </option>
                        <option value="pending" className="bg-[var(--panel)] text-[var(--text)]">
                          Pending
                        </option>
                        <option value="cancelled" className="bg-[var(--panel)] text-[var(--text)]">
                          Cancelled
                        </option>
                      </select>
                    </td>

                    {/* License Key */}
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {order.licenseKey ? (
                        <div className="flex items-center gap-1.5">
                          <span className="truncate max-w-[120px] text-[var(--accent)]">
                            {order.licenseKey}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(order.licenseKey || '');
                              addToast('Key copied', 'clipboard-check');
                            }}
                            className="p-1 text-[var(--muted)] hover:text-[var(--text)]"
                            title="Copy License Key"
                          >
                            <i className="bi bi-copy text-xs"></i>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[var(--muted)] italic">Awaiting key</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${order.customerName}! Your PlayBeat order ${order.orderNumber} is ${order.status}. License: ${order.licenseKey || 'Preparing'}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[var(--green)]/20 text-[var(--green)] hover:bg-[var(--green)]/30 transition-colors"
                          title="Message customer on WhatsApp"
                        >
                          <i className="bi bi-whatsapp text-xs"></i>
                        </a>
                        <button
                          onClick={() => {
                            const newKey = `PB-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-REFRESHED`;
                            updateOrderStatus(order.id, 'completed', newKey);
                            addToast(`New license issued for ${order.orderNumber}`, 'key');
                          }}
                          className="p-1.5 rounded-lg bg-[var(--inner)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--line)]"
                          title="Generate/Re-issue License Key"
                        >
                          <i className="bi bi-arrow-repeat text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[var(--muted)]">
                    No orders match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
