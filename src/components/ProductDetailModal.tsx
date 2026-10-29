import React, { useState, useEffect } from 'react';
import { Product, StoreSettings } from '../types';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { X, MessageSquare, Shield, Check, Ruler, Truck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  settings: StoreSettings;
  onClose: () => void;
  onOpenOrder: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  settings,
  onClose,
  onOpenOrder,
  onOpenSizeGuide,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColor(product.colors[0] || '');
      setSelectedSize(product.sizes[0] || '');
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentImage = product.galleryImages[activeImageIndex] || product.mainImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#11141a] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full transition-colors border border-slate-700"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Gallery */}
          <div className="md:col-span-6 p-6 bg-slate-950/60 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
            <div>
              {/* Main Preview Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 text-emerald-400 text-xs font-bold uppercase rounded border border-emerald-500/40">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.galleryImages.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-2">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-emerald-400 scale-102 ring-2 ring-emerald-500/30'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Guarantees in modal */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Despacho inmediato a toda Colombia</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Pago contraentrega y garantía de fábrica</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Order Trigger */}
          <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                  {product.category} · Tactical Gear 3LS
                </span>
                <h2 className="text-2xl font-black text-white uppercase font-condensed tracking-wide mt-1">
                  {product.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-2xl font-black text-white font-mono tabular-nums">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                  Stock Disponible
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Color selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Color Seleccionado: <span className="text-white font-bold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        selectedColor === c
                          ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Talla Seleccionada: <span className="text-white font-bold">{selectedSize}</span>
                  </label>
                  <button
                    onClick={onOpenSizeGuide}
                    className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 underline"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Ver Tabla de Medidas</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-10 px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                        selectedSize === s
                          ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold uppercase text-slate-400">
                  Especificaciones Tácticas:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {product.fabricSpecs && (
                <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  <strong>Composición técnica:</strong> {product.fabricSpecs}
                </p>
              )}
            </div>

            {/* Direct Order Button */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenOrder(product, selectedColor, selectedSize);
                }}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl transition-all shadow-lg shadow-emerald-950/60"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Pedir por WhatsApp ({settings.whatsappNumber})</span>
              </button>
              <p className="text-[11px] text-center text-slate-400">
                Al hacer clic se prepara tu mensaje con color <strong className="text-slate-200">{selectedColor}</strong> y talla <strong className="text-slate-200">{selectedSize}</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
