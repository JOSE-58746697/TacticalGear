import React, { useState } from 'react';
import { Product, StoreSettings, OrderRequest } from '../types';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { X, MessageSquare, Check, Copy, ShieldCheck, MapPin, Truck } from 'lucide-react';

interface OrderWhatsAppModalProps {
  product: Product;
  initialColor?: string;
  initialSize?: string;
  settings: StoreSettings;
  onClose: () => void;
}

export const OrderWhatsAppModal: React.FC<OrderWhatsAppModalProps> = ({
  product,
  initialColor,
  initialSize,
  settings,
  onClose,
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor || product.colors[0] || 'Estándar');
  const [selectedSize, setSelectedSize] = useState(initialSize || product.sizes[0] || 'Única');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Contraentrega' | 'Transferencia Bancolombia / Nequi' | 'A convenir'>('Contraentrega');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const orderData: OrderRequest = {
    productId: product.id,
    productName: product.name,
    color: selectedColor,
    size: selectedSize,
    quantity,
    price: product.price,
    customerName,
    customerCity,
    customerAddress,
    paymentMethod,
    notes,
  };

  const whatsappUrl = generateWhatsAppOrderUrl(
    settings.whatsappNumber,
    settings.countryCode,
    orderData
  );

  const totalAmount = product.price * quantity;

  const handleCopyText = async () => {
    const rawText = decodeURIComponent(whatsappUrl.split('text=')[1] || '');
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#11141a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <MessageSquare className="w-5 h-5 fill-emerald-400 text-emerald-400" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white uppercase font-condensed tracking-wide">
                Completar Pedido Directo por WhatsApp
              </h3>
              <p className="text-xs text-slate-400">
                Atención personalizada al número <strong className="text-emerald-400">{settings.whatsappNumber}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Cerrar modal de pedido"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Selected Product Summary Box */}
          <div className="flex items-center gap-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <img
              src={product.mainImage}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg border border-slate-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-emerald-400 font-semibold uppercase">{product.category}</p>
              <h4 className="text-sm font-bold text-white truncate">{product.name}</h4>
              <p className="text-sm font-mono font-bold text-slate-200 tabular-nums">
                {formatCurrency(product.price)} c/u
              </p>
            </div>
          </div>

          {/* Configuration Form: Color, Size, Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
              >
                {product.colors.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Talla:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Cantidad:</label>
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-l-lg transition-colors font-bold"
                >
                  -
                </button>
                <span className="flex-1 text-center font-mono font-bold text-white text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-r-lg transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Customer Delivery Details for Colombian Shipments */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tus datos de despacho (Opcional para cotizar envío):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Tu Nombre Completo:</label>
                <input
                  type="text"
                  placeholder="Ej: Andrés Gómez"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Ciudad / Municipio (Colombia):</label>
                <input
                  type="text"
                  placeholder="Ej: Bogotá, Medellín, Cali..."
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Dirección o Barrio (Opcional):</label>
                <input
                  type="text"
                  placeholder="Ej: Calle 45 # 12-30"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Método de Pago Preferido:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Contraentrega">💵 Pago Contraentrega (Al recibir)</option>
                  <option value="Transferencia Bancolombia / Nequi">📱 Transferencia (Bancolombia / Nequi)</option>
                  <option value="A convenir">🤝 A convenir con el asesor</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300">Notas o preguntas (Opcional):</label>
              <input
                type="text"
                placeholder="Ej: Necesito saber si tienen despacho prioritario para hoy..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Live Message Preview */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Vista previa del mensaje a WhatsApp:
              </span>
              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar texto'}</span>
              </button>
            </div>

            <div className="p-3 bg-[#0c1410] border border-emerald-900/60 rounded-xl text-xs text-emerald-200 font-mono whitespace-pre-wrap leading-relaxed">
              {`Hola TACTICAL GEAR, deseo realizar el siguiente pedido:
• Producto: ${product.name}
• Color: ${selectedColor} | Talla: ${selectedSize} | Cantidad: ${quantity}
• Valor Total: ${formatCurrency(totalAmount)}
• Cliente: ${customerName || '(A indicar)'} | Ciudad: ${customerCity || '(A indicar)'}
• Pago: ${paymentMethod}`}
            </div>
          </div>

          {/* Total Bar */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Total a coordinar:</span>
              <span className="text-2xl font-black text-white font-mono tabular-nums">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <div className="text-right text-xs text-slate-400">
              <span className="text-emerald-400 font-semibold block">Envío y pago seguro</span>
              <span>Sin pasarelas de cobro externas</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-900/90 border-t border-slate-800 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl transition-all shadow-xl shadow-emerald-950/60"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>Enviar Pedido a WhatsApp ({settings.whatsappNumber})</span>
          </a>

          <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chat directo con nuestro asesor. No te pediremos claves ni tarjetas bancarias.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
