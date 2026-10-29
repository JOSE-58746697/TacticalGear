import React from 'react';
import { StoreSettings } from '../types';
import { generateWhatsAppGeneralUrl } from '../utils/whatsapp';
import { Building2, MessageSquare, CheckCircle } from 'lucide-react';

interface InstitutionalSectionProps {
  settings: StoreSettings;
}

export const InstitutionalSection: React.FC<InstitutionalSectionProps> = ({ settings }) => {
  const whatsappUrl = generateWhatsAppGeneralUrl(
    settings.whatsappNumber,
    settings.countryCode,
    '¡Hola TACTICAL GEAR! Me contacto para solicitar una cotización institucional / dotación empresarial para nuestro esquema de seguridad.'
  );

  return (
    <section id="dotaciones" className="py-16 military-filigree border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#223526] bg-[#111713] p-8 lg:p-12 shadow-2xl text-white">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-md">
                <Building2 className="w-3.5 h-3.5" />
                <span>División Institucional & Corporativa</span>
              </div>

              <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                Dotaciones Tácticas para Empresas de Seguridad & Esquemas
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Suministramos dotación táctica de alta especificación para empresas de vigilancia privada, escoltas, clubes de tiro, protección de dignatarios y entidades operativas en toda Colombia.
              </p>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Precios especiales por volumen desde 6 unidades</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Personalización con parches y bordados 3LS</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Facturación y certificados de materiales</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Despachos consolidados a nivel nacional</span>
                </div>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-emerald-950/60"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Cotizar Dotación por WhatsApp ({settings.whatsappNumber})</span>
                </a>

                <span className="text-xs text-slate-300 text-center sm:text-left">
                  Respuesta inmediata con asesor comercial especializado.
                </span>
              </div>
            </div>

            {/* Right Column: Visual badge with operators */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-600 shadow-2xl">
                <img
                  src="/assets/aistudio/Multimedia__4__75d74353.jpeg"
                  alt="Dotaciones tácticas para seguridad privada"
                  className="w-full h-80 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur rounded-xl border border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/aistudio/Multimedia__17__1f3ce484.jpeg"
                      alt="Badge 3LS"
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <p className="text-xs font-bold text-white uppercase">Dotaciones 3LS Tactical</p>
                      <p className="text-[10px] text-emerald-400">Hombre & Mujer Operativo</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded font-mono font-bold">
                    Bogotá · Colombia
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
