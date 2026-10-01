import React from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    wishlistOpen,
    setWishlistOpen,
    products,
    addToCart
  } = useCommerce();

  if (!wishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#091227] border-l border-[#1a264a] shadow-2xl flex flex-col justify-between text-white">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#141f3d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="bi bi-heart-fill text-red-500 text-lg"></i>
              <h2 className="text-base font-bold">Your Wishlist</h2>
              <span className="text-xs text-slate-400 mono">({wishlistProducts.length} items)</span>
            </div>
            <button
              onClick={() => setWishlistOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              aria-label="Close wishlist"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#0e1834] mx-auto flex items-center justify-center text-slate-500 text-2xl">
                  <i className="bi bi-heart"></i>
                </div>
                <div className="text-sm font-semibold text-white">Your wishlist is empty</div>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the heart icon on any product to save it here for later.
                </p>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-[#facc15] text-black text-xs font-bold"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl bg-[#0e1936] border border-[#1b2a52] flex items-center gap-3.5"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover flex-none border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                    <div className="text-[11px] text-slate-400 truncate">{p.duration}</div>
                    <div className="text-xs font-extrabold text-[#facc15] mono mt-1">
                      Rs. {p.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-none">
                    <button
                      onClick={() => {
                        addToCart(p, p.variants[0]?.id, 1);
                        setWishlistOpen(false);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#facc15] text-black text-[11px] font-bold hover:brightness-110 flex items-center gap-1"
                    >
                      <i className="bi bi-cart-plus"></i>
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="px-2 py-1 text-slate-400 hover:text-red-400 text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#141f3d] bg-[#070e22] flex items-center justify-between">
            <span className="text-xs text-slate-400">PlayBeat Saved Favorites</span>
            <button
              onClick={() => setWishlistOpen(false)}
              className="text-xs font-bold text-[#facc15] hover:underline"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
