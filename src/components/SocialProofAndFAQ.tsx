import React, { useState } from 'react';
import { FAQS, TESTIMONIALS } from '../data/defaultProducts';
import { StoreSettings } from '../types';
import { generateWhatsAppGeneralUrl } from '../utils/whatsapp';
import { Star, ChevronDown, MessageSquare, ShieldCheck } from 'lucide-react';

interface SocialProofAndFAQProps {
  settings: StoreSettings;
}

export const SocialProofAndFAQ: React.FC<SocialProofAndFAQProps> = ({ settings }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const whatsappUrl = generateWhatsAppGeneralUrl(
    settings.whatsappNumber,
    settings.countryCode,
    'Hola TACTICAL GEAR, tengo una pregunta antes de hacer mi pedido.'
  );

  return (
    <div className="space-y-16 py-16 military-filigree border-b border-slate-200">
      {/* 1. TESTIMONIALS SECTION */}
      <section id="testimonios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-widest">
            Confianza y Experiencia Comprobada
          </span>
          <h2 className="font-condensed text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Clientes y Operadores Satisfechos
          </h2>
          <p className="text-sm text-slate-300 font-normal">
            Seguridad privada, escoltas y entusiastas tácticos en toda Colombia confían en Tactical Gear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl hover:border-emerald-600 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-slate-500 font-mono ml-2 font-bold">5.0 / 5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">{t.name}</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold">{t.role}</p>
                  <p className="text-[10px] text-slate-500">{t.city}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-slate-100 border border-slate-300 text-slate-700 font-semibold px-2 py-1 rounded">
                    {t.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. FAQ SECTION */}
      <section id="preguntas" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-widest">
            Respuestas Claras
          </span>
          <h2 className="font-condensed text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm text-slate-300 font-normal">
            Todo lo que necesitas saber sobre despachos, medios de pago y asesoría por WhatsApp.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-colors shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-emerald-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/60 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Box on White Surface */}
        <div className="mt-8 p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-3 shadow-sm">
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            ¿Tienes otra pregunta sobre tallas, disponibilidad o despachos urgentes?
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide rounded-xl transition-colors shadow-md shadow-emerald-700/20"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Hablar con un Asesor al {settings.whatsappNumber}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
