import React from 'react';
import { StoreSettings } from '../types';
import { generateWhatsAppGeneralUrl } from '../utils/whatsapp';
import { Shield, Droplets, Wind, Zap, MessageSquare, CheckCircle2 } from 'lucide-react';

interface TrustSectionProps {
  settings: StoreSettings;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ settings }) => {
  const whatsappUrl = generateWhatsAppGeneralUrl(
    settings.whatsappNumber,
    settings.countryCode,
    'Hola TACTICAL GEAR, tengo dudas sobre los materiales y resistencia de las prendas.'
  );

  return (
    <section id="caracteristicas" className="py-16 military-filigree border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-widest">
            Ingeniería Operativa · Línea 3LS Tactical
          </span>
          <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
            Diseñadas para Exigencia Real
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Cada prenda y accesorio pasa por rigurosos controles de resistencia,
            costura y repelencia hídrica. No son réplicas decorativas: son prendas de trabajo
            y combate pensadas para durar.
          </p>
        </div>

        {/* 4 Feature Cards with Real Photos on White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Impermeabilidad Softshell */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:border-emerald-600 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/Multimedia__5__326beee6.jpeg"
                alt="Detalle de cremalleras impermeables"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 mb-1">
                  <Droplets className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Cremalleras Selladas</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Softshell Hidrofóbico</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Tratamiento que repele lloviznas y salpicaduras directas sin comprometer la respiración corporal.
                </p>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Cremalleras termoselladas</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ajuste hermético en puños</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Aislamiento Térmico */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:border-emerald-600 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/Multimedia__11__23c8b4d3.jpeg"
                alt="Forro interior térmico y bolsillo oculto"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 mb-1">
                  <Wind className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Forro Micropolar</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Retención de Calor</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Malla térmica interna que conserva el calor en noches frías y disipa la humedad durante patrullaje activo.
                </p>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Bolsillo interno para documentos</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Forro no abrasivo anti-rozaduras</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Tejido Ripstop */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:border-emerald-600 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/Multimedia__6__629edc9b.jpeg"
                alt="Pantalón táctico ripstop con anilla"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 mb-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Antidesgarro</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Ripstop Militar</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Entramado cuadriculado reforzado que detiene cualquier rasgadura provocada por alambres o vegetación.
                </p>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Anilla porta mosquetón D-Ring</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Costuras dobles y triples de tiro</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4: Calzado Delta */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:border-emerald-600 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/Multimedia__7__58d4212d.jpeg"
                alt="Botas Delta Desert con tejido Agearskin"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Tracción Todoterreno</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Botas Tácticas Delta</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Construcción ultra liviana con paneles Agearskin respirables y suela dentada de agarre en terreno suelto.
                </p>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Soporte firme de tobillo 8"</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Plantilla anatómica anti-impacto</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Consultation Banner in Clean High-Contrast Tactical Green */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#111713] to-[#18241b] border border-[#223526] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg text-white">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white font-condensed tracking-wide uppercase">
              ¿Requieres dotación para tu equipo o empresa de seguridad?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Manejamos cotizaciones inmediatas y descuentos por volumen a partir de 6 piezas con despacho a todo el país.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0 shadow-lg"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
