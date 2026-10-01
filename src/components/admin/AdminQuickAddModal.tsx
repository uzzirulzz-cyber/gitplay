import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { ProductCategory, PaymentMethod } from '../../types.ts';

export const AdminQuickAddModal: React.FC = () => {
  const { quickAddOpen, setQuickAddOpen, addProduct, addOrder, products, addToast } = useCommerce();
  const [tab, setTab] = useState<'product' | 'order'>('product');

  // Product Fields
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState<ProductCategory>('entertainment');
  const [pPrice, setPPrice] = useState(2500);
  const [pDuration, setPDuration] = useState('12 Months');

  // Order Fields
  const [oCustomer, setOCustomer] = useState('');
  const [oEmail, setOEmail] = useState('');
  const [oPhone, setOPhone] = useState('');
  const [oProductIndex, setOProductIndex] = useState(0);
  const [oPayment, setOPayment] = useState<PaymentMethod>('jazzcash');

  if (!quickAddOpen) return null;

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName) return;

    const catLabels: Record<ProductCategory, string> = {
      entertainment: 'Entertainment Subscriptions',
      iptv: 'IPTV & Streaming',
      software: 'AI & Productivity',
      gaming_vpn: 'Gaming & Security'
    };

    addProduct({
      name: pName,
      category: pCategory,
      categoryLabel: catLabels[pCategory],
      price: Number(pPrice),
      duration: pDuration,
      rating: 5.0,
      reviewCount: 1,
      salesCount: 0,
      inStock: true,
      stockCount: 100,
      status: 'published',
      description: 'Quick added digital subscription package with immediate activation warranty.',
      features: ['Instant activation', 'Full warranty support'],
      variants: [{ id: 'v1', name: `${pDuration} Plan`, duration: pDuration, price: Number(pPrice) }],
      imageUrl: '/src/assets/images/product_youtube_premium_1790851865048.jpg',
      licenseType: 'account_invite'
    });

    setQuickAddOpen(false);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oCustomer || !oEmail) return;

    const chosen = products[oProductIndex] || products[0];

    addOrder({
      customerName: oCustomer,
      customerEmail: oEmail,
      customerPhone: oPhone || '+92 300 0000000',
      items: [
        {
          id: `${chosen.id}-quick`,
          product: chosen,
          variantName: chosen.duration,
          price: chosen.price,
          quantity: 1
        }
      ],
      total: chosen.price,
      discount: 0,
      status: 'completed',
      paymentMethod: oPayment,
      notes: 'Manually created by administrator in Quick Add'
    });

    setQuickAddOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-2xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold">
              <i className="bi bi-plus-lg"></i>
            </span>
            <h3 className="text-sm font-bold text-[var(--text)]">Quick Add Center</h3>
          </div>
          <button
            onClick={() => setQuickAddOpen(false)}
            className="text-[var(--muted)] hover:text-[var(--text)]"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-xl bg-[var(--inner)] border border-[var(--line)] text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab('product')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              tab === 'product'
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            New Product
          </button>
          <button
            type="button"
            onClick={() => setTab('order')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              tab === 'order'
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            Log Manual Order
          </button>
        </div>

        {tab === 'product' ? (
          <form onSubmit={handleProductSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] text-[var(--muted)] mb-1">Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Disney+ Hotstar 12M"
                value={pName}
                onChange={(e) => setPName(e.target.value)}
                className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">Category *</label>
                <select
                  value={pCategory}
                  onChange={(e) => setPCategory(e.target.value as ProductCategory)}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
                >
                  <option value="entertainment">Streaming &amp; Music</option>
                  <option value="iptv">IPTV &amp; Streaming</option>
                  <option value="software">AI &amp; Productivity</option>
                  <option value="gaming_vpn">Gaming &amp; Security</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">Price (Rs PKR) *</label>
                <input
                  type="number"
                  required
                  value={pPrice}
                  onChange={(e) => setPPrice(Number(e.target.value))}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)] mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[var(--muted)] mb-1">Duration</label>
              <input
                type="text"
                value={pDuration}
                onChange={(e) => setPDuration(e.target.value)}
                placeholder="12 Months"
                className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setQuickAddOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--line)] text-xs text-[var(--muted)] hover:text-[var(--text)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[var(--accent)] text-white font-semibold hover:brightness-110"
              >
                Create Product
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOrderSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] text-[var(--muted)] mb-1">Customer Name *</label>
              <input
                type="text"
                required
                placeholder="Customer Name"
                value={oCustomer}
                onChange={(e) => setOCustomer(e.target.value)}
                className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">Customer Email *</label>
                <input
                  type="email"
                  required
                  placeholder="customer@email.com"
                  value={oEmail}
                  onChange={(e) => setOEmail(e.target.value)}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">WhatsApp Phone</label>
                <input
                  type="text"
                  placeholder="+92 300 1234567"
                  value={oPhone}
                  onChange={(e) => setOPhone(e.target.value)}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">Product Item *</label>
                <select
                  value={oProductIndex}
                  onChange={(e) => setOProductIndex(Number(e.target.value))}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)] truncate"
                >
                  {products.map((p, idx) => (
                    <option key={p.id} value={idx}>
                      {p.name} - Rs {p.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">Payment Method</label>
                <select
                  value={oPayment}
                  onChange={(e) => setOPayment(e.target.value as PaymentMethod)}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)] uppercase"
                >
                  <option value="jazzcash">JazzCash</option>
                  <option value="easypaisa">EasyPaisa</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="whatsapp">WhatsApp Direct</option>
                  <option value="card">Card</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setQuickAddOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--line)] text-xs text-[var(--muted)] hover:text-[var(--text)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[var(--accent)] text-white font-semibold hover:brightness-110"
              >
                Record Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
