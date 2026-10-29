import React, { useState } from 'react';
import { Product, StoreSettings } from '../types';
import { formatCurrency } from '../utils/whatsapp';
import { TACTICAL_IMAGES, TacticalImageItem } from '../data/tacticalImages';
import { 
  X, Save, Plus, Trash2, Edit2, RotateCcw, ShieldAlert, Check, Phone, DollarSign, 
  Lock, User, KeyRound, LogOut, Image as ImageIcon, Users, CheckCircle2, Upload, Camera
} from 'lucide-react';

interface AdminPanelModalProps {
  settings: StoreSettings;
  products: Product[];
  onSaveSettings: (newSettings: StoreSettings) => void;
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetDefaults: () => void;
  onClose: () => void;
}

// Client-side image processor: resizes to max 1200px and compresses to high-quality JPEG
const processImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('El archivo seleccionado no es una imagen válida.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as clean JPEG with 0.85 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('No se pudo procesar la imagen seleccionada.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo desde el disco.'));
    reader.readAsDataURL(file);
  });
};

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  settings,
  products,
  onSaveSettings,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onResetDefaults,
  onClose,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('tactical_gear_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab & Filter states
  const [activeTab, setActiveTab] = useState<'products' | 'new-product' | 'images' | 'settings'>('products');
  const [productFilterGender, setProductFilterGender] = useState<'Todos' | 'Hombre' | 'Mujer'>('Todos');
  const [galleryGenderTab, setGalleryGenderTab] = useState<'hombres' | 'mujeres' | 'unisex'>('hombres');
  const [pickerGenderTab, setPickerGenderTab] = useState<'hombres' | 'mujeres' | 'unisex'>('hombres');

  // Custom uploaded images from user's PC persisted in localStorage
  const [customImages, setCustomImages] = useState<TacticalImageItem[]>(() => {
    try {
      const stored = localStorage.getItem('tactical_custom_images');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [localSettings, setLocalSettings] = useState<StoreSettings>({ ...settings });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<boolean>(true);
  const [editBadge, setEditBadge] = useState<string>('');
  const [editGender, setEditGender] = useState<'Hombre' | 'Mujer' | 'Unisex'>('Hombre');
  const [editImage, setEditImage] = useState<string>('');
  const [savedNotice, setSavedNotice] = useState(false);
  const [uploadingNotice, setUploadingNotice] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Chaquetas',
    gender: 'Hombre',
    price: 150000,
    inStock: true,
    badge: 'Nuevo',
    shortDescription: '',
    fullDescription: '',
    mainImage: '/assets/aistudio/Multimedia__13__5fa0c313.jpeg',
    colors: ['Negro', 'Coyote', 'Verde'],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Tejido táctico de alta resistencia', 'Costuras reforzadas'],
  });

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(localSettings);
    triggerSaved();
  };

  const triggerSaved = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleStartEdit = (p: Product) => {
    setEditingProductId(p.id);
    setEditPrice(p.price);
    setEditStock(p.inStock);
    setEditBadge(p.badge || '');
    setEditGender(p.gender || 'Hombre');
    setEditImage(p.mainImage);
  };

  const handleSaveProductEdit = (p: Product) => {
    const updated: Product = {
      ...p,
      price: editPrice,
      inStock: editStock,
      badge: editBadge,
      gender: editGender,
      mainImage: editImage || p.mainImage,
      galleryImages: editImage ? [editImage, ...p.galleryImages.filter((img) => img !== editImage)] : p.galleryImages,
    };
    onUpdateProduct(updated);
    setEditingProductId(null);
    triggerSaved();
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category as any,
      gender: newProduct.gender || 'Hombre',
      price: Number(newProduct.price),
      badge: newProduct.badge || undefined,
      inStock: true,
      shortDescription: newProduct.shortDescription || 'Producto táctico de alto rendimiento.',
      fullDescription: newProduct.fullDescription || 'Equipamiento táctico concebido para máxima durabilidad.',
      mainImage: newProduct.mainImage || '/assets/aistudio/Multimedia__13__5fa0c313.jpeg',
      galleryImages: [newProduct.mainImage || '/assets/aistudio/Multimedia__13__5fa0c313.jpeg'],
      colors: typeof newProduct.colors === 'string' ? (newProduct.colors as string).split(',').map((s) => s.trim()) : (newProduct.colors || ['Negro']),
      sizes: typeof newProduct.sizes === 'string' ? (newProduct.sizes as string).split(',').map((s) => s.trim()) : (newProduct.sizes || ['M', 'L']),
      features: ['Material resistente de uso táctico', 'Diseño ergonómico operativo'],
    };

    onAddProduct(created);
    setActiveTab('products');
    triggerSaved();
  };

  const handleSelectImageForProduct = (url: string) => {
    setNewProduct((prev) => ({ ...prev, mainImage: url }));
  };

  const handleUseImageForNewProduct = (item: TacticalImageItem) => {
    setNewProduct((prev) => ({
      ...prev,
      mainImage: item.url,
      gender: item.gender,
      category: (['Chaquetas', 'Pantalones', 'Camisas', 'Calzado', 'Accesorios', 'Kits'].includes(item.category) ? item.category : 'Chaquetas') as any,
      name: item.title.replace(/ - (Hombre|Mujer|Unisex)/g, '').trim(),
      shortDescription: item.description,
    }));
    setPickerGenderTab(item.gender === 'Hombre' ? 'hombres' : item.gender === 'Mujer' ? 'mujeres' : 'unisex');
    setActiveTab('new-product');
  };

  // UPLOAD FROM PC: Handler for New Product Form
  const handleUploadImageForNewProduct = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingNotice(true);
      const dataUrl = await processImageFile(file);

      // Set directly as new product's image
      setNewProduct((prev) => ({ ...prev, mainImage: dataUrl }));

      // Also register into custom images gallery
      const newImageItem: TacticalImageItem = {
        id: `custom-${Date.now()}`,
        url: dataUrl,
        title: file.name.replace(/\.[^/.]+$/, '').trim() || 'Foto cargada desde PC',
        category: newProduct.category || 'Chaquetas',
        gender: newProduct.gender || 'Hombre',
        description: 'Imagen personalizada cargada directamente desde el computador.',
      };

      setCustomImages((prev) => {
        const updated = [newImageItem, ...prev];
        try {
          localStorage.setItem('tactical_custom_images', JSON.stringify(updated));
        } catch (err) {
          console.error(err);
        }
        return updated;
      });

      triggerSaved();
    } catch (err: any) {
      alert(err.message || 'Error al cargar la foto');
    } finally {
      setUploadingNotice(false);
      e.target.value = '';
    }
  };

  // UPLOAD FROM PC: Handler for Dedicated Gallery Tab
  const handleUploadImageToGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingNotice(true);
      const dataUrl = await processImageFile(file);
      const assignedGender = galleryGenderTab === 'hombres' ? 'Hombre' : galleryGenderTab === 'mujeres' ? 'Mujer' : 'Unisex';

      const newImageItem: TacticalImageItem = {
        id: `custom-${Date.now()}`,
        url: dataUrl,
        title: file.name.replace(/\.[^/.]+$/, '').trim() || 'Foto cargada desde PC',
        category: 'Personalizada',
        gender: assignedGender,
        description: `Foto subida desde PC para la división ${assignedGender}.`,
      };

      setCustomImages((prev) => {
        const updated = [newImageItem, ...prev];
        try {
          localStorage.setItem('tactical_custom_images', JSON.stringify(updated));
        } catch (err) {
          console.error(err);
        }
        return updated;
      });

      triggerSaved();
    } catch (err: any) {
      alert(err.message || 'Error al cargar la foto');
    } finally {
      setUploadingNotice(false);
      e.target.value = '';
    }
  };

  // UPLOAD FROM PC: Handler for Editing existing product
  const handleUploadImageForEditProduct = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingNotice(true);
      const dataUrl = await processImageFile(file);
      setEditImage(dataUrl);
      triggerSaved();
    } catch (err: any) {
      alert(err.message || 'Error al cargar la foto');
    } finally {
      setUploadingNotice(false);
      e.target.value = '';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === 'Marin.nn' && passwordInput === 'Colombia2026') {
      setIsAuthenticated(true);
      setLoginError('');
      try {
        sessionStorage.setItem('tactical_gear_auth', 'true');
      } catch (err) {
        console.error(err);
      }
    } else {
      setLoginError('Usuario o contraseña incorrectos. Verifique sus credenciales.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
    try {
      sessionStorage.removeItem('tactical_gear_auth');
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered products in admin list
  const filteredAdminProducts = products.filter((p) => {
    if (productFilterGender === 'Todos') return true;
    return p.gender === productFilterGender;
  });

  // Combined images for gallery (built-in + user-uploaded from PC)
  const getImagesForTab = (tab: 'hombres' | 'mujeres' | 'unisex') => {
    const assignedGender = tab === 'hombres' ? 'Hombre' : tab === 'mujeres' ? 'Mujer' : 'Unisex';
    const customForTab = customImages.filter((img) => img.gender === assignedGender);
    return [...customForTab, ...TACTICAL_IMAGES[tab]];
  };

  // If not authenticated, render the secure login gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
        <div
          className="relative w-full max-w-md bg-[#11141a] border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden my-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 rounded-lg">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white uppercase font-condensed tracking-wide">
                  Acceso Restringido · Administrador
                </h3>
                <p className="text-[11px] text-slate-400">
                  Autenticación requerida para modificar contenido
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {loginError && (
              <div className="p-3 bg-red-950/70 border border-red-500/60 rounded-xl text-xs text-red-200 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Usuario Administrador:</span>
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Ingresa tu usuario..."
                autoFocus
                className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contraseña de Seguridad:</span>
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Ingresar al Panel de Administración</span>
              </button>
            </div>

            <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-center">
              <p className="text-[11px] text-slate-400">
                Línea de autenticación oficial · <strong className="text-slate-300">TACTICAL GEAR 3LS</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#11141a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white uppercase font-condensed tracking-wide flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              <span>Panel de Control del Administrador</span>
            </h3>
            <p className="text-xs text-slate-400">
              Gestiona el número de WhatsApp, precios, división Hombres/Mujeres y fotos personalizadas desde tu PC.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/60">
              <User className="w-3.5 h-3.5" />
              <span>Marin.nn</span>
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Cerrar Sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigator */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-950/40 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-t border-x whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-[#11141a] text-emerald-400 border-slate-700'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Catálogo & Precios ({products.length})
          </button>
          
          <button
            onClick={() => setActiveTab('new-product')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-t border-x flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'new-product'
                ? 'bg-[#11141a] text-emerald-400 border-slate-700'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Producto</span>
          </button>

          {/* New Tab: IMÁGENES HOMBRES / MUJERES */}
          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-t border-x flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'images'
                ? 'bg-[#11141a] text-emerald-400 border-slate-700'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Galería de Imágenes</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-t border-x whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#11141a] text-emerald-400 border-slate-700'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            WhatsApp & Ajustes
          </button>

          {uploadingNotice && (
            <span className="ml-auto inline-flex items-center gap-1 text-xs text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800 shrink-0 animate-pulse">
              <Camera className="w-3.5 h-3.5" />
              <span>Cargando imagen desde PC...</span>
            </span>
          )}

          {savedNotice && !uploadingNotice && (
            <span className="ml-auto inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800 shrink-0">
              <Check className="w-3.5 h-3.5" />
              <span>¡Guardado con Éxito!</span>
            </span>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-6">

          {/* TAB 1: PRODUCT LIST WITH GENDER FILTER & IMAGE EDITING */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {/* Gender Filter Controls in Admin */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Filtrar por División:
                  </span>
                  <div className="flex items-center gap-1">
                    {(['Todos', 'Hombre', 'Mujer'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setProductFilterGender(g)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                          productFilterGender === g
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {g === 'Todos' ? `Todos (${products.length})` : g === 'Hombre' ? `Hombres (${products.filter(p => p.gender === 'Hombre').length})` : `Mujeres (${products.filter(p => p.gender === 'Mujer').length})`}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onResetDefaults}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 text-xs self-end sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer Catálogo Original</span>
                </button>
              </div>

              <div className="space-y-3">
                {filteredAdminProducts.map((p) => {
                  const isEditing = editingProductId === p.id;
                  return (
                    <div
                      key={p.id}
                      className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative group shrink-0">
                          <img
                            src={isEditing ? (editImage || p.mainImage) : p.mainImage}
                            alt={p.name}
                            className="w-16 h-16 object-cover rounded-lg border border-slate-700 shrink-0"
                          />
                          {isEditing && (
                            <label
                              htmlFor={`edit-file-${p.id}`}
                              className="absolute inset-0 bg-black/60 rounded-lg flex flex-col items-center justify-center text-white text-[10px] cursor-pointer hover:bg-black/75 transition-colors"
                              title="Cambiar foto desde PC"
                            >
                              <Upload className="w-4 h-4 text-emerald-400 mb-0.5" />
                              <span>Cambiar</span>
                              <input
                                id={`edit-file-${p.id}`}
                                type="file"
                                accept="image/*"
                                onChange={handleUploadImageForEditProduct}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-emerald-400">
                              {p.category}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              p.gender === 'Mujer' ? 'bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-800/50' : 'bg-slate-800 text-slate-300'
                            }`}>
                              {p.gender || 'Hombre'}
                            </span>
                            {p.badge && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded">
                                {p.badge}
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                p.inStock
                                  ? 'bg-emerald-950 text-emerald-300'
                                  : 'bg-rose-950 text-rose-300'
                              }`}
                            >
                              {p.inStock ? 'En Stock' : 'Agotado'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-0.5">{p.name}</h4>
                          <p className="text-xs font-mono font-bold text-slate-300 tabular-nums">
                            {formatCurrency(p.price)}
                          </p>
                        </div>
                      </div>

                      {/* Editing Mode */}
                      {isEditing ? (
                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400">División:</label>
                            <select
                              value={editGender}
                              onChange={(e) => setEditGender(e.target.value as any)}
                              className="bg-slate-950 border border-slate-700 text-white text-xs px-2 py-1.5 rounded"
                            >
                              <option value="Hombre">Hombre</option>
                              <option value="Mujer">Mujer</option>
                              <option value="Unisex">Unisex</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400">Precio COP:</label>
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              className="w-28 bg-slate-950 border border-emerald-500 text-white text-xs px-2 py-1.5 rounded"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400">Etiqueta:</label>
                            <input
                              type="text"
                              value={editBadge}
                              onChange={(e) => setEditBadge(e.target.value)}
                              placeholder="Ej: Oferta"
                              className="w-24 bg-slate-950 border border-slate-700 text-white text-xs px-2 py-1.5 rounded"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400">Stock:</label>
                            <select
                              value={editStock ? 'true' : 'false'}
                              onChange={(e) => setEditStock(e.target.value === 'true')}
                              className="bg-slate-950 border border-slate-700 text-white text-xs px-2 py-1.5 rounded"
                            >
                              <option value="true">Disponible</option>
                              <option value="false">Agotado</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-1 pt-4">
                            <button
                              onClick={() => handleSaveProductEdit(p)}
                              className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold"
                              title="Guardar"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingProductId(null)}
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
                              title="Cancelar"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg text-xs flex items-center gap-1"
                            title="Editar Precio y Datos"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-2 text-rose-400 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 rounded-lg text-xs"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW PRODUCT WITH FILE UPLOAD FROM PC + GENDER GALLERY */}
          {activeTab === 'new-product' && (
            <form onSubmit={handleCreateProduct} className="space-y-5">
              
              {/* Product Info Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-bold">Nombre del Producto:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Chaqueta Táctica Softshell Dama"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-bold">Línea / Género:</label>
                  <select
                    value={newProduct.gender || 'Hombre'}
                    onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value as any })}
                    className="w-full bg-slate-900 border border-emerald-500 text-white text-xs rounded-lg px-3 py-2.5 font-bold"
                  >
                    <option value="Hombre">🪖 Hombre (Línea Masculina)</option>
                    <option value="Mujer">🛡️ Mujer (Línea Femenina)</option>
                    <option value="Unisex">🌐 Unisex (Ambos)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-bold">Categoría:</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5"
                  >
                    <option value="Chaquetas">Chaquetas</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Camisas">Camisas</option>
                    <option value="Calzado">Calzado</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Kits">Kits & Uniformes</option>
                  </select>
                </div>
              </div>

              {/* SECTION: FOTO DEL PRODUCTO - SUBIR DESDE PC O ELEGIR DE GALERÍA */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                
                {/* 1. PC FILE UPLOADER BOX */}
                <div className="p-4 bg-slate-950/90 border-2 border-dashed border-emerald-500/50 hover:border-emerald-400 rounded-xl transition-all">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Active Image Thumbnail */}
                    <div className="relative group shrink-0">
                      <img
                        src={newProduct.mainImage || '/assets/aistudio/Multimedia__13__5fa0c313.jpeg'}
                        alt="Previsualización"
                        className="w-24 h-24 object-cover rounded-xl border-2 border-emerald-500 shadow-md bg-slate-900"
                      />
                      <span className="absolute -bottom-2 -right-1 px-1.5 py-0.5 bg-emerald-600 text-white text-[9px] font-bold rounded shadow uppercase">
                        Activa
                      </span>
                    </div>

                    <div className="space-y-1.5 text-center sm:text-left flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          Subir Foto desde tu Computador (PC)
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300">
                        Selecciona cualquier foto JPG, PNG o WEBP de tu computador. Se optimizará y asignará de inmediato a este producto.
                      </p>

                      <div className="pt-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <label
                          htmlFor="pc-file-upload"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-md shadow-emerald-700/20 hover:-translate-y-0.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Examinar Archivos en esta PC</span>
                        </label>
                        <input
                          id="pc-file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleUploadImageForNewProduct}
                          className="hidden"
                        />
                        <span className="text-[11px] text-slate-500">
                          (O puedes seleccionar una foto de la galería oficial abajo)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. OR SELECT FROM CLASSIFIED GALLERY */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span>O selecciona una foto de la Galería Táctica:</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Fotos divididas por línea para agilizar la creación.
                      </p>
                    </div>

                    {/* Gender Selector for Photos */}
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setPickerGenderTab('hombres')}
                        className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                          pickerGenderTab === 'hombres'
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        🪖 Hombres ({getImagesForTab('hombres').length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setPickerGenderTab('mujeres')}
                        className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                          pickerGenderTab === 'mujeres'
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        🛡️ Mujeres ({getImagesForTab('mujeres').length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setPickerGenderTab('unisex')}
                        className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                          pickerGenderTab === 'unisex'
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        🌐 Unisex ({getImagesForTab('unisex').length})
                      </button>
                    </div>
                  </div>

                  {/* Thumbnails Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 max-h-56 overflow-y-auto p-1 bg-slate-950/60 rounded-xl border border-slate-800">
                    {getImagesForTab(pickerGenderTab).map((img) => {
                      const isSelected = newProduct.mainImage === img.url;
                      return (
                        <div
                          key={img.id}
                          onClick={() => handleSelectImageForProduct(img.url)}
                          className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all group ${
                            isSelected
                              ? 'border-emerald-500 ring-2 ring-emerald-500/50 shadow-lg'
                              : 'border-slate-800 hover:border-slate-600 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <div className="aspect-[4/3] bg-slate-950 overflow-hidden">
                            <img
                              src={img.url}
                              alt={img.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="p-2 bg-slate-950/95 text-[11px]">
                            <p className="font-bold text-white truncate">{img.title}</p>
                            <span className="text-[10px] text-emerald-400 font-mono">{img.category}</span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-emerald-600 text-white p-1 rounded-full shadow-md">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Price & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-bold">Precio en Pesos Colombianos (COP):</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-bold">Etiqueta Especial (Opcional):</label>
                  <input
                    type="text"
                    placeholder="Ej: Nuevo Lanzamiento, Edición Limitada"
                    value={newProduct.badge}
                    onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-bold">Descripción Corta:</label>
                <textarea
                  rows={2}
                  value={newProduct.shortDescription}
                  onChange={(e) => setNewProduct({ ...newProduct, shortDescription: e.target.value })}
                  placeholder="Resumen para la tarjeta de producto..."
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-bold">Colores (separados por coma):</label>
                  <input
                    type="text"
                    defaultValue="Negro, Coyote, Verde Oliva"
                    onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-bold">Tallas (separadas por coma):</label>
                  <input
                    type="text"
                    defaultValue="S, M, L, XL"
                    onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publicar Artículo en el Catálogo</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: DEDICATED IMAGES GALLERY WITH PC UPLOAD */}
          {activeTab === 'images' && (
            <div className="space-y-5">
              {/* Header with Upload From PC Button */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>Galería Multimedia Oficial (Hombres & Mujeres)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Explora las fotos disponibles o sube fotos reales de tus prendas desde tu computador.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <label
                    htmlFor="gallery-pc-upload"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Foto a esta Categoría desde mi PC</span>
                  </label>
                  <input
                    id="gallery-pc-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImageToGallery}
                    className="hidden"
                  />

                  {/* Gender Selector Buttons */}
                  <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setGalleryGenderTab('hombres')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                        galleryGenderTab === 'hombres'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🪖 Hombres ({getImagesForTab('hombres').length})
                    </button>
                    <button
                      onClick={() => setGalleryGenderTab('mujeres')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                        galleryGenderTab === 'mujeres'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🛡️ Mujeres ({getImagesForTab('mujeres').length})
                    </button>
                    <button
                      onClick={() => setGalleryGenderTab('unisex')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                        galleryGenderTab === 'unisex'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🌐 Unisex ({getImagesForTab('unisex').length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {getImagesForTab(galleryGenderTab).map((item) => {
                  const isCustom = item.id.startsWith('custom-');
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/80 rounded-xl overflow-hidden flex flex-col justify-between transition-all group shadow-sm hover:shadow-xl"
                    >
                      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 bg-black/80 backdrop-blur text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase rounded">
                            {item.gender} · {item.category}
                          </span>
                          {isCustom && (
                            <span className="px-2 py-0.5 bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold uppercase rounded">
                              Subida por ti
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-white leading-snug">{item.title}</h5>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-slate-500 truncate max-w-[120px]">
                            {item.url.startsWith('data:') ? 'Foto desde PC' : item.url.split('/').pop()}
                          </span>
                          <button
                            onClick={() => handleUseImageForNewProduct(item)}
                            className="px-2.5 py-1.5 bg-emerald-600/90 hover:bg-emerald-600 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm shrink-0"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Crear Producto</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: STORE SETTINGS & WHATSAPP PHONE */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveStoreSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 flex items-center gap-1.5 font-bold">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Número de WhatsApp para Pedidos (Colombia):</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={localSettings.whatsappNumber}
                    onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-emerald-500/80 text-white font-mono font-bold text-sm rounded-lg px-3 py-2.5 focus:border-emerald-400"
                  />
                  <p className="text-[11px] text-slate-400">
                    Actualmente: <strong>{localSettings.whatsappNumber}</strong>. Todos los botones de la página envían los pedidos a esta línea.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-bold">Nombre de la Tienda:</label>
                  <input
                    type="text"
                    value={localSettings.storeName}
                    onChange={(e) => setLocalSettings({ ...localSettings, storeName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-bold">Aviso Superior de Despachos:</label>
                <input
                  type="text"
                  value={localSettings.bannerNotice}
                  onChange={(e) => setLocalSettings({ ...localSettings, bannerNotice: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-bold">Política de Envíos Nacionales:</label>
                <input
                  type="text"
                  value={localSettings.shippingNotice}
                  onChange={(e) => setLocalSettings({ ...localSettings, shippingNotice: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Configuración General</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
