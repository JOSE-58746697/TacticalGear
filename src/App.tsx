import React, { useState, useEffect, useMemo } from 'react';
import { Product, StoreSettings } from './types';
import { DEFAULT_PRODUCTS, DEFAULT_STORE_SETTINGS } from './data/defaultProducts';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBannerGrid } from './components/CategoryBannerGrid';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderWhatsAppModal } from './components/OrderWhatsAppModal';
import { InstitutionalSection } from './components/InstitutionalSection';
import { TrustSection } from './components/TrustSection';
import { SocialProofAndFAQ } from './components/SocialProofAndFAQ';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Search, ShieldCheck, Ruler, MessageSquare, Users, Layers, Sparkles } from 'lucide-react';
import { generateWhatsAppGeneralUrl } from './utils/whatsapp';

export default function App() {
  // Load settings with localStorage persistence for the administrator
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const stored = localStorage.getItem('tactical_gear_settings');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // Load products with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('tactical_gear_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_PRODUCTS.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PRODUCTS;
  });

  // Filter and search state
  const [selectedGender, setSelectedGender] = useState<'Todos' | 'Hombre' | 'Mujer'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [orderModalData, setOrderModalData] = useState<{
    product: Product;
    color?: string;
    size?: string;
  } | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Sync settings and products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tactical_gear_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('tactical_gear_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Categories list
  const categories = ['Todos', 'Chaquetas', 'Pantalones', 'Camisas', 'Calzado', 'Accesorios', 'Kits'];

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Gender filter
      const matchesGender =
        selectedGender === 'Todos' ||
        p.gender === selectedGender ||
        p.gender === 'Unisex' ||
        !p.gender;

      // Category filter
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;

      // Search query
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.colors.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesGender && matchesCategory && matchesSearch;
    });
  }, [products, selectedGender, selectedCategory, searchQuery]);

  // Handlers for Admin changes
  const handleSaveSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('¿Deseas eliminar este producto del catálogo?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleResetDefaults = () => {
    if (confirm('¿Restablecer todo el catálogo original y ajustes predeterminados?')) {
      setProducts(DEFAULT_PRODUCTS);
      setSettings(DEFAULT_STORE_SETTINGS);
      localStorage.removeItem('tactical_gear_products');
      localStorage.removeItem('tactical_gear_settings');
    }
  };

  const handleExploreCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenOrder = (product: Product, color?: string, size?: string) => {
    setOrderModalData({ product, color, size });
  };

  const generalWhatsappUrl = generateWhatsAppGeneralUrl(
    settings.whatsappNumber,
    settings.countryCode
  );

  return (
    <div className="min-h-screen military-filigree text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* 1. American Tactical Dual Navigation Bar */}
      <Navbar
        settings={settings}
        searchQuery={searchQuery}
        selectedGender={selectedGender}
        onSearchChange={setSearchQuery}
        onSelectCategory={setSelectedCategory}
        onSelectGender={setSelectedGender}
        onOpenAdmin={() => setShowAdmin(true)}
        onOpenQuickOrder={() => {
          if (products[0]) handleOpenOrder(products[0]);
        }}
      />

      {/* 2. Hero Campaign Carousel with 4-Pillar Trust Bar */}
      <Hero
        settings={settings}
        onExploreCatalog={handleExploreCatalog}
        onOpenQuickOrder={() => {
          if (products[0]) handleOpenOrder(products[0]);
        }}
      />

      {/* 3. American Tactical Style Category Tiles Grid */}
      <CategoryBannerGrid
        onSelectCategory={setSelectedCategory}
        onSelectGender={setSelectedGender}
      />

      {/* 4. Product Catalog Section on White Military Filigree Surface */}
      <main id="catalogo" className="flex-1 py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Section Heading & Guarantees */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-700/80 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Tienda Oficial TACTICAL GEAR 3LS</span>
            </div>
            <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              Catálogo de Indumentaria & Calzado Militar
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Sin registros ni carruseles de pago: selecciona tu prenda y coordina talla y entrega directa por WhatsApp al <strong className="text-emerald-400 font-mono font-bold">{settings.whatsappNumber}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowSizeGuide(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700 text-xs font-bold transition-colors shadow-xs"
            >
              <Ruler className="w-4 h-4 text-emerald-400" />
              <span>Tabla de Medidas</span>
            </button>
            <a
              href={generalWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-emerald-700/20"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Asesoría por Chat</span>
            </a>
          </div>
        </div>

        {/* PROMINENT DEPARTMENT DIVISION: HOMBRES / MUJERES / TODAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card Hombres */}
          <button
            onClick={() => {
              setSelectedGender('Hombre');
              setSelectedCategory('Todos');
            }}
            className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group shadow-xl ${
              selectedGender === 'Hombre'
                ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-[#121614] border-emerald-500 ring-2 ring-emerald-500/50 shadow-emerald-950/40'
                : 'bg-slate-900/90 hover:bg-slate-900 border-slate-700/80 hover:border-slate-500'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-black tracking-widest uppercase text-emerald-400">
                  División Táctica
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono font-bold border border-emerald-800/60">
                  {products.filter((p) => p.gender === 'Hombre' || p.gender === 'Unisex' || !p.gender).length} Artículos
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-condensed uppercase text-white tracking-wide">
                LÍNEA HOMBRES
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2">
                Pantalones cargo ripstop, chaquetas softshell y dotación táctica masculina.
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border transition-colors ml-3 shrink-0 ${
              selectedGender === 'Hombre'
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 group-hover:bg-slate-700'
            }`}>
              <Users className="w-6 h-6" />
            </div>
          </button>

          {/* Card Mujeres */}
          <button
            onClick={() => {
              setSelectedGender('Mujer');
              setSelectedCategory('Todos');
            }}
            className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group shadow-xl ${
              selectedGender === 'Mujer'
                ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-[#121614] border-emerald-500 ring-2 ring-emerald-500/50 shadow-emerald-950/40'
                : 'bg-slate-900/90 hover:bg-slate-900 border-slate-700/80 hover:border-slate-500'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-pulse"></span>
                <span className="text-[11px] font-black tracking-widest uppercase text-fuchsia-300">
                  División Femenina
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-950 text-fuchsia-200 font-mono font-bold border border-fuchsia-800/60">
                  {products.filter((p) => p.gender === 'Mujer' || p.gender === 'Unisex' || !p.gender).length} Artículos
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-condensed uppercase text-white tracking-wide">
                LÍNEA MUJERES
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2">
                Corte anatómico femenino, pantalones Grey Fit y chaquetas entalladas para dama.
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border transition-colors ml-3 shrink-0 ${
              selectedGender === 'Mujer'
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 group-hover:bg-slate-700'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
          </button>

          {/* Card Todas las Líneas */}
          <button
            onClick={() => {
              setSelectedGender('Todos');
              setSelectedCategory('Todos');
            }}
            className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group shadow-xl ${
              selectedGender === 'Todos'
                ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-[#121614] border-emerald-500 ring-2 ring-emerald-500/50 shadow-emerald-950/40'
                : 'bg-slate-900/90 hover:bg-slate-900 border-slate-700/80 hover:border-slate-500'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span className="text-[11px] font-black tracking-widest uppercase text-slate-300">
                  Catálogo Global
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-bold border border-slate-700">
                  {products.length} Artículos
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-condensed uppercase text-white tracking-wide">
                TODAS LAS LÍNEAS
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2">
                Visualiza el catálogo militar unificado, botas unisex y accesorios operativos.
              </p>
            </div>
            <div className={`p-3.5 rounded-xl border transition-colors ml-3 shrink-0 ${
              selectedGender === 'Todos'
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 group-hover:bg-slate-700'
            }`}>
              <Layers className="w-6 h-6" />
            </div>
          </button>
        </div>

        {/* Filter Controls: Department (Hombre / Mujer) + Category Pills */}
        <div className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            {/* Department tabs: Hombre / Mujer / Todos */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mr-1">
                Línea:
              </span>
              {(['Todos', 'Hombre', 'Mujer'] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    selectedGender === gender
                      ? 'bg-slate-900 text-white shadow-xs font-extrabold'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                  }`}
                >
                  {gender === 'Todos' ? 'Todas las Líneas' : gender}
                </button>
              ))}
            </div>

            {/* Quick search input */}
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar por nombre o modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:border-emerald-600 focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                        : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-slate-300'
                    }`}
                  >
                    {cat === 'Todos' ? 'Todas las Categorías' : cat}
                  </button>
                );
              })}
            </div>

            <span className="text-xs text-slate-500 font-mono font-medium">
              <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> artículos encontrados
            </span>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setDetailProduct(p)}
                onDirectOrder={(p) => handleOpenOrder(p)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xs">
            <p className="text-base text-slate-800 font-bold">
              No se encontraron productos con los filtros seleccionados
            </p>
            <p className="text-xs text-slate-500">
              Intenta restablecer la categoría o buscar otro término.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                  setSelectedGender('Todos');
                }}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 border border-slate-300"
              >
                Limpiar Filtros
              </button>
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>Consultar Disponibilidad por WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* 5. Institutional & Dotaciones Section (American Tactical corporate division) */}
      <InstitutionalSection settings={settings} />

      {/* 6. Real Materials & Tactical Engineering Showcase */}
      <TrustSection settings={settings} />

      {/* 7. Customer Testimonials & Interactive FAQs */}
      <SocialProofAndFAQ settings={settings} />

      {/* 8. American Tactical Multi-column Footer */}
      <Footer settings={settings} onOpenAdmin={() => setShowAdmin(true)} />

      {/* 9. Floating WhatsApp Quick Chat Widget */}
      <FloatingWhatsApp settings={settings} />

      {/* Modals */}
      {/* Product Detail Modal */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          settings={settings}
          onClose={() => setDetailProduct(null)}
          onOpenOrder={(p, color, size) => handleOpenOrder(p, color, size)}
          onOpenSizeGuide={() => setShowSizeGuide(true)}
        />
      )}

      {/* WhatsApp Direct Order Composer Modal */}
      {orderModalData && (
        <OrderWhatsAppModal
          product={orderModalData.product}
          initialColor={orderModalData.color}
          initialSize={orderModalData.size}
          settings={settings}
          onClose={() => setOrderModalData(null)}
        />
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}

      {/* Admin Panel Modal */}
      {showAdmin && (
        <AdminPanelModal
          settings={settings}
          products={products}
          onSaveSettings={handleSaveSettings}
          onUpdateProduct={handleUpdateProduct}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetDefaults={handleResetDefaults}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}
