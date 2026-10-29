import React, { useState } from 'react';
import { StoreSettings } from '../types';
import { generateWhatsAppGeneralUrl } from '../utils/whatsapp';
import { MessageSquare, Search, Sliders, Menu, X, Phone, Shield, ChevronDown } from 'lucide-react';

interface NavbarProps {
  settings: StoreSettings;
  searchQuery: string;
  selectedGender?: 'Hombre' | 'Mujer' | 'Todos';
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectGender: (gender: 'Hombre' | 'Mujer' | 'Todos') => void;
  onOpenAdmin: () => void;
  onOpenQuickOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  searchQuery,
  selectedGender = 'Todos',
  onSearchChange,
  onSelectCategory,
  onSelectGender,
  onOpenAdmin,
  onOpenQuickOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = generateWhatsAppGeneralUrl(
    settings.whatsappNumber,
    settings.countryCode,
    '¡Hola TACTICAL GEAR! Me gustaría recibir asesoría sobre productos tácticos.'
  );

  const handleNavClick = (cat: string, gender?: 'Hombre' | 'Mujer' | 'Todos') => {
    if (gender) onSelectGender(gender);
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* 1. Top Strip in High-Contrast Tactical Green / Black */}
      <div className="bg-[#111713] text-slate-200 text-[11px] py-1.5 px-4 tracking-wide font-medium border-b border-[#1b251e]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-white">ENVÍOS SEGUROS A TODA COLOMBIA</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">Opción de Pago Contraentrega</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-slate-400">Línea Oficial WhatsApp:</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-bold text-emerald-400 hover:text-emerald-300 underline"
            >
              {settings.whatsappNumber}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header on Crisp White Surface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 lg:gap-8 bg-white">
        
        {/* Brand Logo & Wordmark (American Tactical style) */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="relative">
            <img
              src="/assets/aistudio/Multimedia__17__1f3ce484.jpeg"
              alt="3LS Tactical Badge"
              className="w-10 h-10 object-contain rounded-lg border border-slate-300 group-hover:border-emerald-600 transition-colors shadow-sm bg-black"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-condensed text-2xl lg:text-3xl font-black uppercase tracking-wider text-slate-900 leading-none">
              {settings.storeName}
            </span>
            <span className="text-[10px] tracking-widest text-emerald-700 font-extrabold uppercase">
              Equipamiento Militar & Policial
            </span>
          </div>
        </a>

        {/* Center: Search Bar with Clean Light Style */}
        <div className="hidden md:flex flex-1 max-w-lg relative">
          <input
            type="text"
            placeholder="Buscar por botas, chaquetas softshell, pantalones ripstop..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-emerald-600 text-slate-900 placeholder:text-slate-500 text-xs rounded-xl pl-10 pr-4 py-2.5 transition-colors focus:outline-none shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900"
            >
              ×
            </button>
          )}
        </div>

        {/* Right: Contact Hotline & Admin */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin Gear Button */}
          <button
            onClick={onOpenAdmin}
            title="Panel de Administración (Modificar Precios y WhatsApp)"
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors"
            aria-label="Panel de Administración"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* WhatsApp Direct Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-700/20"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="font-mono">{settings.whatsappNumber}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg border border-slate-300"
            aria-label="Menú de Navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Secondary Category Menu Bar (Dark Tactical Contrast Bar) */}
      <nav className="hidden md:block bg-[#111713] border-t border-[#1b251e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-6 text-xs font-bold text-slate-300 uppercase tracking-wider py-2 overflow-x-auto">
            {/* Division Hombres */}
            <li>
              <button
                onClick={() => handleNavClick('Todos', 'Hombre')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  selectedGender === 'Hombre'
                    ? 'bg-emerald-600 text-white font-black shadow-md shadow-emerald-700/30'
                    : 'bg-slate-900/90 text-slate-200 hover:text-emerald-400 border border-slate-800'
                }`}
              >
                <span>🪖 LÍNEA HOMBRES</span>
              </button>
            </li>

            {/* Division Mujeres */}
            <li>
              <button
                onClick={() => handleNavClick('Todos', 'Mujer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  selectedGender === 'Mujer'
                    ? 'bg-emerald-600 text-white font-black shadow-md shadow-emerald-700/30'
                    : 'bg-slate-900/90 text-slate-200 hover:text-emerald-400 border border-slate-800'
                }`}
              >
                <span>🛡️ LÍNEA MUJERES</span>
              </button>
            </li>

            <span className="text-slate-700">|</span>

            <li>
              <button
                onClick={() => handleNavClick('Todos', 'Todos')}
                className={`hover:text-emerald-400 transition-colors whitespace-nowrap ${
                  selectedGender === 'Todos' ? 'text-white underline underline-offset-4' : 'text-slate-400'
                }`}
              >
                Todo el Catálogo
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Calzado')}
                className="hover:text-emerald-400 transition-colors whitespace-nowrap"
              >
                Calzado & Botas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Chaquetas')}
                className="hover:text-emerald-400 transition-colors whitespace-nowrap"
              >
                Chaquetas Softshell
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Pantalones')}
                className="hover:text-emerald-400 transition-colors whitespace-nowrap"
              >
                Pantalones Ripstop
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Camisas')}
                className="hover:text-emerald-400 transition-colors whitespace-nowrap"
              >
                Camisas Tácticas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Kits')}
                className="hover:text-emerald-400 transition-colors whitespace-nowrap text-amber-400 font-extrabold"
              >
                Combos & Uniformes
              </button>
            </li>
            <li>
              <a
                href="#dotaciones"
                className="hover:text-emerald-400 transition-colors whitespace-nowrap text-emerald-400"
              >
                Dotaciones Institucionales
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 space-y-4 shadow-xl">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en el catálogo táctico..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-xs rounded-xl pl-9 pr-3 py-2.5"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <ul className="space-y-2 text-xs font-bold text-slate-800 uppercase tracking-wide">
            <li>
              <button
                onClick={() => handleNavClick('Todos', 'Todos')}
                className="w-full text-left py-2 px-3 rounded hover:bg-slate-100"
              >
                Ver Todo el Catálogo
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Todos', 'Hombre')}
                className="w-full text-left py-2 px-3 rounded hover:bg-slate-100"
              >
                Línea Hombre
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Todos', 'Mujer')}
                className="w-full text-left py-2 px-3 rounded hover:bg-slate-100 text-emerald-700"
              >
                Línea Mujer (Pantalones & Chaquetas)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Calzado')}
                className="w-full text-left py-2 px-3 rounded hover:bg-slate-100"
              >
                Botas Tácticas Delta
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Chaquetas')}
                className="w-full text-left py-2 px-3 rounded hover:bg-slate-100"
              >
                Chaquetas Softshell Térmicas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Pantalones')}
                className="w-full text-left py-2 px-3 rounded hover:bg-slate-100"
              >
                Pantalones Cargo Ripstop
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('Kits')}
                className="w-full text-left py-2 px-3 rounded hover:bg-slate-100 text-amber-700"
              >
                Combos & Uniformes 3LS
              </button>
            </li>
          </ul>

          <div className="pt-2 border-t border-slate-200">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Contactar Asesor WhatsApp ({settings.whatsappNumber})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
