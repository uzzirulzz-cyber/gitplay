import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { PaymentMethod } from '../../types.ts';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutOpen,
    setCheckoutOpen,
    cart,
    cartSubtotal,
    addOrder,
    clearCart
  } = useCommerce();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('jazzcash');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!checkoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addOrder({
        customerName,
        customerEmail,
        customerPhone,
        items: [...cart],
        total: cartSubtotal,
        discount: 0,
        status: 'completed',
        paymentMethod,
        notes: notes || 'Instant customer checkout from Storefront.'
      });
      clearCart();
      setIsSubmitting(false);
      setCheckoutOpen(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold">
              <i className="bi bi-shield-check"></i>
            </span>
            <h2 className="text-base font-bold text-[var(--text)]">Instant Checkout</h2>
          </div>
          <button
            onClick={() => setCheckoutOpen(false)}
            className="p-1 text-[var(--muted)] hover:text-[var(--text)]"
            aria-label="Close checkout"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-[var(--text)]">
              <span>Order Items ({cart.length}):</span>
              <span className="text-[var(--accent)] mono font-bold">
                Rs {cartSubtotal.toLocaleString()}
              </span>
            </div>
            <div className="text-[11px] text-[var(--muted)] space-y-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="truncate pr-2">
                    {item.quantity}x {item.product.name} ({item.variantName || item.product.duration})
                  </span>
                  <span className="mono flex-none">Rs {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Credentials */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--text)]">Customer &amp; Delivery Details</h3>
            <div>
              <label className="block text-[11px] text-[var(--muted)] mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Muhammad Hamza"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg px-3 py-2 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">
                  Gmail / Delivery Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="hamza@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg px-3 py-2 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[var(--muted)] mb-1">
                  WhatsApp Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg px-3 py-2 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[var(--muted)] mb-1">
                Account Notes / Custom Instructions
              </label>
              <input
                type="text"
                placeholder="e.g. Please activate on existing account or new profile"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-lg px-3 py-2 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          {/* Payment Gateway */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-[var(--text)]">Select Payment Channel</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'jazzcash', label: 'JazzCash', icon: 'bi-phone' },
                { id: 'easypaisa', label: 'EasyPaisa', icon: 'bi-wallet2' },
                { id: 'bank_transfer', label: 'Bank / Raast', icon: 'bi-bank' },
                { id: 'whatsapp', label: 'WhatsApp Agent', icon: 'bi-whatsapp' },
                { id: 'card', label: 'Debit / Card', icon: 'bi-credit-card' }
              ].map((p) => {
                const isSelected = paymentMethod === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id as PaymentMethod)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)] font-semibold'
                        : 'border-[var(--line)] bg-[var(--inner)] text-[var(--muted)] hover:border-[var(--muted)]'
                    }`}
                  >
                    <i className={`bi ${p.icon} text-[var(--accent)]`}></i>
                    <span className="text-xs">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="py-2.5 px-4 rounded-xl border border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)] text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing License...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Confirm Order · Rs {cartSubtotal.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
