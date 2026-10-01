import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { Product, ProductCategory } from '../../types.ts';

export const AdminCatalog: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, setCurrentView } = useCommerce();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('entertainment');
  const [price, setPrice] = useState(2400);
  const [duration, setDuration] = useState('12 Months');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('entertainment');
    setPrice(2000);
    setDuration('12 Months');
    setBadge('Hot Deal');
    setDescription('High-speed digital subscription with immediate email invite and full warranty.');
    setFeatures('Instant activation\nAd-free uninterrupted playback\nOfficial warranty support');
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price);
    setDuration(p.duration);
    setBadge(p.badge || '');
    setDescription(p.description);
    setFeatures(p.features.join('\n'));
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const featArray = features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const catLabels: Record<ProductCategory, string> = {
      entertainment: 'Entertainment Subscriptions',
      iptv: 'IPTV & Streaming',
      software: 'AI & Productivity',
      gaming_vpn: 'Gaming & Security'
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        category,
        categoryLabel: catLabels[category],
        price: Number(price),
        duration,
        badge: badge || undefined,
        description,
        features: featArray
      });
    } else {
      addProduct({
        name,
        category,
        categoryLabel: catLabels[category],
        price: Number(price),
        originalPrice: Math.round(Number(price) * 1.3),
        duration,
        rating: 4.9,
        reviewCount: 12,
        salesCount: 1,
        inStock: true,
        stockCount: 50,
        status: 'published',
        badge: badge || undefined,
        description,
        features: featArray,
        variants: [
          { id: `var-1`, name: `${duration} Plan`, duration, price: Number(price) }
        ],
        imageUrl: '/src/assets/images/product_youtube_premium_1790851865048.jpg',
        licenseType: 'account_invite'
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 max-w-[var(--pb-content-width,1600px)] mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-[var(--text)] font-syne">
              Catalog Products
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30">
              {products.length} PRODUCTS (68 PUBLISHED)
            </span>
          </div>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            Manage your subscription catalog, prices, duration tiers, and publish status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('storefront')}
            className="px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            <i className="bi bi-eye me-1.5"></i>Preview Storefront
          </button>
          <button
            onClick={openAddModal}
            className="px-3.5 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <i className="bi bi-plus-lg"></i>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-[var(--panel)] border border-[var(--line)] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--text)]">
            <thead className="bg-[var(--inner)] text-[var(--muted)] uppercase text-[10px] tracking-wider border-b border-[var(--line)]">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Base Price</th>
                <th className="py-3 px-4">Sales</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--hover)] transition-colors">
                  {/* Product title & thumbnail */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover flex-none border border-[var(--line)]"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-[var(--text)] truncate">{p.name}</div>
                        {p.badge && (
                          <span className="text-[10px] text-[var(--accent)] font-semibold">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-[var(--muted)]">{p.categoryLabel}</td>

                  {/* Duration */}
                  <td className="py-3 px-4 mono">{p.duration}</td>

                  {/* Price */}
                  <td className="py-3 px-4 font-bold mono text-sm text-[var(--text)]">
                    Rs {p.price.toLocaleString()}
                  </td>

                  {/* Sales count */}
                  <td className="py-3 px-4 mono text-[var(--green)]">
                    {p.salesCount} sold
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-semibold text-[var(--green)] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
                      <span>{p.stockCount} in stock</span>
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        updateProduct(p.id, {
                          status: p.status === 'published' ? 'draft' : 'published'
                        })
                      }
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors ${
                        p.status === 'published'
                          ? 'bg-[var(--green)]/15 text-[var(--green)] border-[var(--green)]/30'
                          : 'bg-[var(--chip)] text-[var(--muted)] border-[var(--line)]'
                      }`}
                    >
                      {p.status === 'published' ? 'Published' : 'Draft'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-[var(--muted)] hover:text-[var(--text)]"
                        title="Edit product"
                      >
                        <i className="bi bi-pencil text-xs"></i>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                        }}
                        className="p-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-[var(--muted)] hover:text-[var(--red)]"
                        title="Delete product"
                      >
                        <i className="bi bi-trash text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
              <h3 className="text-sm font-bold text-[var(--text)]">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[var(--muted)] hover:text-[var(--text)]"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[var(--muted)] mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
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
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)] mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[var(--muted)] mb-1">Duration / Tier</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="12 Months / Lifetime"
                    className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[var(--muted)] mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="4K UHD / Bestseller"
                    className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">
                  Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg p-2 text-[var(--text)]"
                />
              </div>

              <div className="pt-3 border-t border-[var(--line)] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[var(--accent)] text-white font-semibold hover:brightness-110"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
