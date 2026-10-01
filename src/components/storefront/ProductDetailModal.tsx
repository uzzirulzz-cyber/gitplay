import React, { useState } from 'react';
import { Product } from '../../types.ts';
import { useCommerce } from '../../context/CommerceContext.tsx';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCommerce();
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);

  const activeVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const currentPrice = activeVariant ? activeVariant.price : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVariantId, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Close modal"
        >
          <i className="bi bi-x-lg text-sm"></i>
        </button>

        {/* Left Side: Product Imagery & Badges */}
        <div className="md:w-5/12 bg-[var(--inner)] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[var(--line)]">
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4 border border-[var(--line)]">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 text-white text-[10px] font-semibold">
                  {product.badge}
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <i className="bi bi-shield-check text-[var(--green)]"></i>
                <span>100% Genuine Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="bi bi-lightning-charge text-[var(--accent)]"></i>
                <span>Instant dispatch within 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="bi bi-whatsapp text-[var(--green)]"></i>
                <span>Direct WhatsApp live verification</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--line)] mt-4">
            <span className="text-[11px] text-[var(--muted)] block">Delivery Method:</span>
            <span className="text-xs font-semibold text-[var(--text)]">
              {product.licenseType === 'account_invite'
                ? 'Official Direct Account Upgrade'
                : product.licenseType === 'code'
                ? 'Instant Digital Retail Key'
                : product.licenseType === 'm3u_stream'
                ? 'Xtream & M3U Playlist Portal'
                : 'Dedicated Private Credentials'}
            </span>
          </div>
        </div>

        {/* Right Side: Contiguous Purchase Module */}
        <div className="md:w-7/12 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-1">
                <span>{product.categoryLabel}</span>
                <span>·</span>
                <span className="text-[var(--amber)]">★ {product.rating} ({product.reviewCount} reviews)</span>
              </div>
              <h2 className="text-2xl font-bold text-[var(--text)] tracking-tight">
                {product.name}
              </h2>
              <div className="mt-2 text-xl font-extrabold text-[var(--accent)] mono">
                Rs {currentPrice.toLocaleString()}{' '}
                <span className="text-xs font-normal text-[var(--muted)]">
                  / {activeVariant ? activeVariant.duration : product.duration}
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {product.description}
            </p>

            {/* Plan / Duration Variants */}
            {product.variants.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-[var(--text)] mb-2">
                  Select Subscription Plan / Duration:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariantId === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)] shadow-sm'
                            : 'border-[var(--line)] bg-[var(--inner)] text-[var(--muted)] hover:border-[var(--muted)]'
                        }`}
                      >
                        <div className="text-xs font-bold">{variant.name}</div>
                        <div className="text-[11px] font-mono mt-0.5 text-[var(--accent)] font-semibold">
                          Rs {variant.price.toLocaleString()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key Features List */}
            <div>
              <div className="text-xs font-semibold text-[var(--text)] mb-2">
                Included Features:
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--muted)]">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <i className="bi bi-check2 text-[var(--accent)] mt-0.5 flex-none"></i>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-[var(--muted)]">Qty:</span>
              <div className="flex items-center border border-[var(--line)] rounded-lg bg-[var(--inner)]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-[var(--muted)] hover:text-[var(--text)] text-sm"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-[var(--text)] mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-[var(--muted)] hover:text-[var(--text)] text-sm"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-[var(--muted)] ml-auto">
                Total:{' '}
                <b className="text-[var(--text)] mono">
                  Rs {(currentPrice * quantity).toLocaleString()}
                </b>
              </div>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="pt-6 border-t border-[var(--line)] mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[var(--line)] text-[var(--navtext)] hover:text-[var(--text)] text-xs font-semibold transition-colors"
            >
              Back to Catalog
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-2 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <i className="bi bi-bag-plus"></i>
              <span>Add to Shopping Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
