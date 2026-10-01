import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

export const OrderSuccessModal: React.FC = () => {
  const { lastOrder, setLastOrder, addToast } = useCommerce();
  const [copied, setCopied] = useState(false);

  if (!lastOrder) return null;

  const handleCopy = () => {
    if (lastOrder.licenseKey) {
      navigator.clipboard.writeText(lastOrder.licenseKey);
      setCopied(true);
      addToast('License key copied to clipboard!', 'clipboard-check');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const waText = encodeURIComponent(
    `Hello PlayBeat! I placed order ${lastOrder.orderNumber} for Rs ${lastOrder.total.toLocaleString()}. Please verify activation for ${lastOrder.customerEmail}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-2xl p-6 sm:p-8 text-center space-y-5">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[var(--green)]/20 text-[var(--green)] mx-auto flex items-center justify-center text-3xl">
          <i className="bi bi-check-circle-fill"></i>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--text)] font-syne">
            Order Confirmed &amp; Dispatched!
          </h2>
          <p className="text-xs text-[var(--muted)] mt-1">
            Order Reference:{' '}
            <span className="text-[var(--text)] font-bold mono">{lastOrder.orderNumber}</span>
          </p>
        </div>

        {/* License Key Box */}
        <div className="p-4 rounded-xl bg-[var(--inner)] border border-[var(--line)] text-left space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[var(--muted)]">Digital License Key / Verification Code:</span>
            <span className="text-[10px] text-[var(--green)] font-semibold">Active</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 p-2.5 rounded-lg bg-[var(--panel)] border border-[var(--line)] text-xs font-mono text-[var(--accent)] font-bold truncate">
              {lastOrder.licenseKey}
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-2.5 rounded-lg bg-[var(--inner)] hover:bg-[var(--chip)] border border-[var(--line)] text-xs font-semibold text-[var(--text)] transition-colors flex items-center gap-1.5"
            >
              <i className={`bi ${copied ? 'bi-check2' : 'bi-copy'}`}></i>
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="text-[11px] text-[var(--muted)] leading-relaxed">
            Activation instructions have also been sent to{' '}
            <b className="text-[var(--text)]">{lastOrder.customerEmail}</b> and WhatsApp{' '}
            <b className="text-[var(--text)]">{lastOrder.customerPhone}</b>.
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 pt-2">
          <a
            href={`https://wa.me/923000000000?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-[var(--green)] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <i className="bi bi-whatsapp"></i>
            <span>Confirm Instant Delivery via WhatsApp</span>
          </a>

          <div className="pt-1">
            <button
              onClick={() => setLastOrder(null)}
              className="w-full py-2.5 rounded-xl border border-[var(--line)] bg-[var(--inner)] hover:bg-[var(--chip)] text-[var(--text)] text-xs font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
