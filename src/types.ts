export interface Product {
  id: string;
  name: string;
  category: 'Chaquetas' | 'Pantalones' | 'Camisas' | 'Calzado' | 'Accesorios' | 'Kits';
  gender?: 'Hombre' | 'Mujer' | 'Unisex';
  price: number; // in COP
  originalPrice?: number;
  badge?: string;
  inStock: boolean;
  shortDescription: string;
  fullDescription: string;
  mainImage: string;
  galleryImages: string[];
  colors: string[];
  sizes: string[];
  features: string[];
  fabricSpecs?: string;
}

export interface StoreSettings {
  storeName: string;
  whatsappNumber: string; // e.g. "3202364730"
  countryCode: string; // "57"
  bannerNotice: string;
  shippingNotice: string;
  warrantyNotice: string;
}

export interface OrderRequest {
  productId: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  customerName: string;
  customerCity: string;
  customerAddress: string;
  paymentMethod: 'Contraentrega' | 'Transferencia Bancolombia / Nequi' | 'A convenir';
  notes?: string;
}
