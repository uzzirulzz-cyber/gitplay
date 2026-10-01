import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    setCheckoutOpen,
    addToast
  } = useCommerce();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  if (!cartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'PLAYBEAT10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      addToast('Coupon PLAYBEAT10 applied: 10% discount!', 'tag');
    } else if (clean === 'WELCOME20') {
      setDiscountPercent(20);
      setCouponApplied(true);
      addToast('Coupon WELCOME20 applied: 20% discount!', 'tag');
    } else {
      addToast('Invalid coupon code. Try PLAYBEAT10', 'exclamation-circle');
    }
  };

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const finalTotal = cartSubtotal - discountAmount;

  const handleProceedToCheckout = () => {
    setCartDrawerOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--panel)] border-l border-[var(--line)] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="bi bi-bag text-[var(--accent)] text-lg"></i>
              <h2 className="text-base font-bold text-[var(--text)]">Your Shopping Bag</h2>
              <span className="text-xs text-[var(--muted)] mono">({cart.length} items)</span>
            </div>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-1.5 text-[var(--muted)] hover:text-[var(--text)] rounded-lg"
              aria-label="Close cart"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[var(--inner)] mx-auto flex items-center justify-center text-[var(--muted)] text-2xl">
                  <i className="bi bi-bag-x"></i>
                </div>
                <div className="text-sm font-semibold text-[var(--text)]">Your bag is empty</div>
                <p className="text-xs text-[var(--muted)] max-w-xs mx-auto">
                  Browse our subscriptions and digital licenses to add items to your cart.
                </p>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl bg-[var(--inner)] border border-[var(--line)]"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover flex-none border border-[var(--line)]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-[var(--text)] truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[var(--muted)] hover:text-[var(--red)] text-xs"
                          title="Remove item"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                      <div className="text-[11px] text-[var(--muted)] truncate">
                        {item.variantName || item.product.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[var(--line)] rounded-md bg-[var(--panel)]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[var(--muted)] hover:text-[var(--text)]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-[var(--text)] mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[var(--muted)] hover:text-[var(--text)]"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-xs font-bold text-[var(--text)] mono">
                        Rs {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[var(--line)] bg-[var(--panel)] space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. PLAYBEAT10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[var(--inner)] border border-[var(--line)] rounded-lg px-3 py-1.5 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[var(--inner)] border border-[var(--line)] text-xs font-semibold text-[var(--navtext)] hover:text-[var(--text)]"
                >
                  Apply
                </button>
              </form>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Subtotal:</span>
                  <span className="mono">Rs {cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[var(--green)]">
                    <span>Discount ({discountPercent}%):</span>
                    <span className="mono">-Rs {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-[var(--text)] pt-2 border-t border-[var(--line)]">
                  <span>Total:</span>
                  <span className="text-[var(--accent)] mono">
                    Rs {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 rounded-xl bg-[var(--accent)] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <i className="bi bi-shield-lock-fill"></i>
                <span>Proceed to Instant Checkout</span>
              </button>

              <div className="text-center text-[10px] text-[var(--muted)]">
                Instant license dispatch via WhatsApp &amp; Email upon payment
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
