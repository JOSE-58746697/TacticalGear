import React, { useState, useEffect } from 'react';
import { StoreSettings } from '../types';
import { generateWhatsAppGeneralUrl } from '../utils/whatsapp';
import { MessageSquare, ChevronLeft, ChevronRight, Truck, ShieldCheck, RefreshCw, Award, ArrowRight } from 'lucide-react';

interface HeroProps {
  settings: StoreSettings;
  onExploreCatalog: () => void;
  onOpenQuickOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onExploreCatalog,
  onOpenQuickOrder,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      kicker: 'Campaña Oficial 3LS Tactical',
      title: 'EQUÍPATE PARA CUALQUIER DESAFÍO',
      subtitle: 'Indumentaria táctica de élite probada en terreno. Chaquetas softshell impermeables, pantalones ripstop y dotaciones completas para personal operativo y esquemas de seguridad.',
      image: '/assets/aistudio/Multimedia__16__f1b63756.jpeg',
      imageAlt: 'Operadores tácticos 3LS - Equípate para cualquier desafío',
      highlightBadge: 'Póster Oficial de Campaña',
      specs: ['Tricapa Impermeable', 'Resistencia al Desgarro', 'Uso Profesional'],
      primaryBtnText: 'Pedir por WhatsApp',
    },
    {
      kicker: 'Calzado Táctico de Alto Rendimiento',
      title: 'BOTAS MILITARES DELTA DESERT',
      subtitle: 'Construidas con cuero gamuzado hidrófugo y tejido transpirable Agearskin. Suela con tacos multidireccionales para máxima tracción en roca, asfalto y barro.',
      image: '/assets/aistudio/Multimedia__7__58d4212d.jpeg',
      imageAlt: 'Botas militares Delta Desert en caja con etiqueta Agearskin',
      highlightBadge: 'Suela Antideslizante Todoterreno',
      specs: ['Cuero Gamuzado 1.8mm', 'Tejido Agearskin', 'Plantilla Ergonómica'],
      primaryBtnText: 'Consultar Tallas de Botas',
    },
    {
      kicker: 'Protección Térmica & Cortavientos',
      title: 'CHAQUETA SOFTSHELL IMPERMEABLE',
      subtitle: 'Membrana hidrofóbica que bloquea el viento y la lluvia con forro interior térmico micropolar, bolsillos tácticos de acceso rápido y paneles de velcro para insignias 3LS.',
      image: '/assets/aistudio/Multimedia__15__72375835.jpeg',
      imageAlt: 'Chaqueta táctica Softshell térmica azul navy con velcros',
      highlightBadge: '100% Térmica e Impermeable',
      specs: ['Forro Micropolar', 'Cremalleras Termoselladas', 'Bolsillo Oculto'],
      primaryBtnText: 'Pedir Chaqueta por WhatsApp',
    },
    {
      kicker: 'Dotación Completa Operativa',
      title: 'UNIFORMES TÁCTICOS HOMBRE & MUJER',
      subtitle: 'Conjuntos ergonómicos diseñados para total libertad de movimiento en patrullaje y combate. Disponibles en tonos Coyote, Negro Comando, Verde Oliva y Gris Urbano.',
      image: '/assets/aistudio/Multimedia__4__75d74353.jpeg',
      imageAlt: 'Uniformes tácticos completos hombre y mujer 3LS',
      highlightBadge: 'Línea Masculina & Femenina',
      specs: ['Pantalón Cargo 8 Bolsillos', 'Argolla D-Ring Táctica', 'Refuerzo en Rodillas'],
      primaryBtnText: 'Cotizar Uniforme Completo',
    },
  ];

  // Auto-slide every 5.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const activeSlide = slides[currentSlide];

  const whatsappUrl = generateWhatsAppGeneralUrl(
    settings.whatsappNumber,
    settings.countryCode,
    `¡Hola TACTICAL GEAR! Me interesa información sobre: ${activeSlide.title}`
  );

  return (
    <section
      className="relative military-filigree border-b border-slate-200 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
        
        {/* Main Split Carousel Stage: Left Text, Right Hero Image (The Protagonist) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clean Left-Aligned Typography on White with Military Watermark */}
          <div className="lg:col-span-5 text-left space-y-6 flex flex-col justify-center order-2 lg:order-1">
            
            {/* Kicker badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{activeSlide.kicker}</span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>

            {/* Headline: strictly left-aligned in high-contrast crisp white */}
            <h1 className="font-condensed text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black uppercase text-white tracking-tight leading-[1.05] text-left">
              {activeSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-left max-w-xl font-normal">
              {activeSlide.subtitle}
            </p>

            {/* Spec pills for quick credibility */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeSlide.specs.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-semibold rounded-md flex items-center gap-1.5 shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {spec}
                </span>
              ))}
            </div>

            {/* Direct WhatsApp & Catalog CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-emerald-700/25 hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>{activeSlide.primaryBtnText} ({settings.whatsappNumber})</span>
              </a>

              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 border border-slate-300 font-bold text-sm rounded-xl transition-all shadow-xs hover:-translate-y-0.5"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

            {/* Carousel Controls & Slide Thumbnails */}
            <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                  className="p-2.5 text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors shadow-xs"
                  aria-label="Diapositiva anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  className="p-2.5 text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors shadow-xs"
                  aria-label="Siguiente diapositiva"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-slate-400 ml-1">
                  Cambio automático · Pausa al pasar el cursor
                </span>
              </div>

              {/* Thumbnail Selector */}
              <div className="flex items-center gap-2">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative w-11 h-11 rounded-lg overflow-hidden border-2 transition-all shadow-xs ${
                      currentSlide === idx
                        ? 'border-emerald-600 scale-105 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-300 opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Ver diapositiva ${idx + 1}`}
                  >
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: The High-Resolution Protagonist Image Showcase */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-slate-300 bg-white shadow-xl shadow-slate-300/60 group">
              
              {/* Main Image in full crisp illumination (NO darkening filters) */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/11] w-full overflow-hidden bg-slate-100">
                <img
                  key={activeSlide.image}
                  src={activeSlide.image}
                  alt={activeSlide.imageAlt}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                  loading="eager"
                />

                {/* Subtle natural frame border */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl lg:rounded-3xl pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                {/* Highlight Badge on Image */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1.5 bg-black/85 backdrop-blur text-emerald-400 border border-emerald-500/50 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                    {activeSlide.highlightBadge}
                  </span>
                </div>

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur border border-slate-200 rounded-xl flex items-center justify-between z-10 shadow-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/aistudio/Multimedia__17__1f3ce484.jpeg"
                      alt="Logo 3LS"
                      className="w-9 h-9 object-contain rounded bg-black border border-emerald-500/30"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                        {activeSlide.title}
                      </h4>
                      <p className="text-[11px] text-emerald-700 font-bold">
                        Garantía Oficial · Despacho Inmediato
                      </p>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap shadow-sm"
                  >
                    Pedir Ahora
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 2. American Tactical 4-Pillar Trust Bar on White Surface */}
      <div className="bg-slate-50/90 border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="flex items-center gap-3.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wide">Envíos a Toda Colombia</h4>
                <p className="text-[11px] text-slate-600">Servientrega, Envía e Interrapidísimo.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wide">Pago Contraentrega</h4>
                <p className="text-[11px] text-slate-600">Pagas en efectivo al recibir tu paquete.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wide">Cambio de Talla Rápido</h4>
                <p className="text-[11px] text-slate-600">Garantía y cambio asistido sin demoras.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wide">Calidad 3LS Garantizada</h4>
                <p className="text-[11px] text-slate-600">Costuras y materiales de grado militar.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
