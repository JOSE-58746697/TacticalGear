import React, { useState } from 'react';
import { StoreSettings } from '../types';
import { generateWhatsAppGeneralUrl } from '../utils/whatsapp';
import { MessageSquare, X, Send } from 'lucide-react';

interface FloatingWhatsAppProps {
  settings: StoreSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultUrl = generateWhatsAppGeneralUrl(
    settings.whatsappNumber,
    settings.countryCode,
    customMsg || '¡Hola TACTICAL GEAR! Me gustaría recibir asesoría sobre productos y disponibilidad.'
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Floating Chat Bubble Popup */}
      {isOpen && (
        <div className="mb-3 w-80 max-w-[calc(100vw-2.5rem)] bg-[#11141a] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/assets/aistudio/Multimedia__17__1f3ce484.jpeg"
                  alt="Asesor Tactical Gear"
                  className="w-10 h-10 rounded-full border border-white/40 object-contain bg-black"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-950"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold">Asesor TACTICAL GEAR</h4>
                <p className="text-[11px] text-emerald-200">En línea · Responde en minutos</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-emerald-700/50"
              aria-label="Cerrar chat flotante"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-950/80 space-y-3">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 leading-relaxed">
              <p>
                ¡Hola! 👋 Bienvenido a <strong>TACTICAL GEAR</strong>. ¿En qué podemos ayudarte hoy?
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Línea oficial: <strong className="text-emerald-400">{settings.whatsappNumber}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Escribe tu consulta aquí..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.open(defaultUrl, '_blank', 'noopener,noreferrer');
                    setIsOpen(false);
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 focus:border-emerald-500 focus:outline-none"
              />

              <a
                href={defaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Iniciar Chat en WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-full shadow-2xl shadow-emerald-950 transition-all hover:scale-105"
        aria-label="Abrir chat de WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>

        <MessageSquare className="w-5 h-5 fill-white text-white" />
        <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
          WhatsApp {settings.whatsappNumber}
        </span>
      </button>
    </div>
  );
};
