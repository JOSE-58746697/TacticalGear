import { OrderRequest } from '../types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppOrderUrl(
  phone: string,
  countryCode: string,
  order: OrderRequest
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const total = order.price * order.quantity;

  const lines = [
    `*¡Hola TACTICAL GEAR! Deseo realizar el siguiente pedido:*`,
    ``,
    `🛡️ *Producto:* ${order.productName}`,
    `🎨 *Color:* ${order.color}`,
    `📏 *Talla:* ${order.size}`,
    `🔢 *Cantidad:* ${order.quantity}`,
    `💰 *Valor Total:* ${formatCurrency(total)}`,
    ``,
    `👤 *Nombre del Cliente:* ${order.customerName || 'Por coordinar'}`,
    `📍 *Ciudad / Destino:* ${order.customerCity || 'Por definir'}`,
    order.customerAddress ? `🏠 *Dirección:* ${order.customerAddress}` : null,
    `📦 *Método de Pago Preferido:* ${order.paymentMethod}`,
    order.notes ? `📝 *Observaciones:* ${order.notes}` : null,
    ``,
    `¿Tienen disponibilidad para coordinar el despacho? ¡Muchas gracias!`
  ].filter(Boolean).join('\n');

  return `https://wa.me/${countryCode}${cleanPhone}?text=${encodeURIComponent(lines)}`;
}

export function generateWhatsAppGeneralUrl(
  phone: string,
  countryCode: string,
  message?: string
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const text = message || '¡Hola TACTICAL GEAR! Me gustaría recibir asesoría sobre sus productos militares y catálogo disponible.';
  return `https://wa.me/${countryCode}${cleanPhone}?text=${encodeURIComponent(text)}`;
}
