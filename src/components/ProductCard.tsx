import React from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/whatsapp';
import { MessageSquare, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onDirectOrder,
}) => {
  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;

  // Helper color map for swatches
  const getColorHex = (c: string) => {
    const lower = c.toLowerCase();
    if (lower.includes('negro') || lower.includes('asfalto')) return '#18181b';
    if (lower.includes('coyote') || lower.includes('tan') || lower.includes('khaki') || lower.includes('caqui') || lower.includes('desert') || lower.includes('beige')) return '#927958';
    if (lower.includes('verde') || lower.includes('oliva')) return '#445136';
    if (lower.includes('azul') || lower.includes('navy')) return '#1e293b';
    if (lower.includes('gris') || lower.includes('grafito') || lower.includes('grey')) return '#64748b';
    return '#334155';
  };

  return (
    <article className="group flex flex-col bg-white border border-slate-200 hover:border-emerald-600 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-xs">
      {/* Product Image Box */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 bg-black/85 backdrop-blur text-emerald-400 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-md">
              {product.badge}
            </span>
          )}
          {discountAmount > 0 && (
            <span className="px-2 py-0.5 bg-amber-500 text-black text-[10px] font-black uppercase rounded shadow-sm">
              - {formatCurrency(discountAmount)}
            </span>
          )}
        </div>

        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg shadow-lg border border-slate-200">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ver Fotos y Ficha</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Metadata Row: Category & Gender */}
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="uppercase tracking-widest font-extrabold text-emerald-700">
                {product.category}
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                product.gender === 'Mujer'
                  ? 'bg-fuchsia-50 text-fuchsia-800 border border-fuchsia-200'
                  : product.gender === 'Hombre'
                  ? 'bg-slate-900 text-white'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {product.gender === 'Mujer' ? '🛡️ Mujer' : product.gender === 'Hombre' ? '🪖 Hombre' : '🌐 Unisex'}
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Disponible</span>
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Color preview dots */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500 font-medium">Colores:</span>
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 4).map((c, i) => (
                  <span
                    key={i}
                    title={c}
                    className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block shadow-xs"
                    style={{ backgroundColor: getColorHex(c) }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] text-slate-400 font-bold">+{product.colors.length - 4}</span>
                )}
              </div>
            </div>

            <div className="text-[11px] text-slate-500">
              <span>Tallas: </span>
              <span className="font-mono font-semibold text-slate-800">{product.sizes.slice(0, 3).join(', ')}{product.sizes.length > 3 ? '...' : ''}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-slate-500 font-medium">Precio:</span>
            <div className="text-right">
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through mr-2 font-mono tabular-nums">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              <span className="text-lg font-black text-slate-950 font-mono tabular-nums tracking-tight">
                {formatCurrency(product.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-950 rounded-xl transition-colors border border-slate-300"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Detalles</span>
          </button>

          <button
            onClick={() => onDirectOrder(product)}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-md shadow-emerald-700/20"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>Pedir</span>
          </button>
        </div>
      </div>
    </article>
  );
};
