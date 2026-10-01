import React from 'react';
import { Product } from '../../types.ts';
import { useCommerce } from '../../context/CommerceContext.tsx';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useCommerce();

  return (
    <article className="group bg-[#091227] border border-[#18264e] hover:border-[#2f437c] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/40">
      {/* Top Media Container */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-[4/3] bg-[#050a18] overflow-hidden cursor-pointer flex items-center justify-center p-3"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        {product.badge && (
          <div
            className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md ${
              product.badge.includes('HOT')
                ? 'bg-red-600 text-white'
                : product.badge.includes('BEST') || product.badge.includes('POPULAR') || product.badge.includes('INSTANT')
                ? 'bg-[#facc15] text-black font-extrabold'
                : 'bg-blue-600 text-white'
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Region Tag if available */}
        {product.duration.includes('USA') && (
          <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white mono">
            $50 USA
          </div>
        )}

        {/* Hover quick overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
          <span className="text-xs font-bold text-white px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/20">
            Quick View
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-sm sm:text-base font-bold text-white group-hover:text-[#facc15] cursor-pointer transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle / Region */}
          <div className="text-xs text-slate-400 mt-0.5 font-medium truncate">
            {product.duration}
          </div>

          {/* Price */}
          <div className="mt-2.5">
            <span className="text-base sm:text-lg font-black text-white mono font-syne">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
            <div className="flex text-[#facc15] text-[11px]">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
            </div>
            <span className="font-semibold text-slate-300">{product.rating}</span>
            <span className="text-[11px] text-slate-500">
              ({product.reviewCount > 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
            </span>
          </div>
        </div>

        {/* Action Button: Add to Cart */}
        <div className="pt-2">
          <button
            onClick={() => {
              if (product.variants.length > 1) {
                onSelect(product);
              } else {
                addToCart(product, product.variants[0]?.id, 1);
              }
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-[#0e1b38] hover:bg-[#1a2d59] border border-[#213360] hover:border-[#facc15] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-[#142347]"
          >
            <i className="bi bi-cart3 text-sm text-[#facc15]"></i>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
