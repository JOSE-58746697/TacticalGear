import React from 'react';
import { StoreSettings } from '../types';
import { generateWhatsAppGeneralUrl } from '../utils/whatsapp';
import { MessageSquare, Shield, Truck, Sliders, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  settings: StoreSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const whatsappUrl = generateWhatsAppGeneralUrl(
    settings.whatsappNumber,
    settings.countryCode
  );

  return (
    <footer className="bg-[#090b0e] border-t border-slate-800 text-slate-400 text-xs">
      {/* Top Footer Strip: National Logistics */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-slate-900 border border-slate-800 text-emerald-400 rounded-lg shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase">Envíos a Toda Colombia</h4>
              <p className="text-[11px] text-slate-400">Despachos asegurados en 24 a 48 horas hábiles.</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-slate-900 border border-slate-800 text-emerald-400 rounded-lg shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase">Pago Seguro Contraentrega</h4>
              <p className="text-[11px] text-slate-400">Pagas en efectivo al recibir tu paquete.</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-slate-900 border border-slate-800 text-emerald-400 rounded-lg shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase">Asesoría Directa 1 a 1</h4>
              <p className="text-[11px] text-slate-400">Atención personalizada al {settings.whatsappNumber}.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/Multimedia__17__1f3ce484.jpeg"
              alt="Logo 3LS"
              className="w-10 h-10 object-contain rounded border border-emerald-500/30"
            />
            <div>
              <span className="font-condensed text-2xl font-black text-white tracking-wider uppercase block leading-none">
                {settings.storeName}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                Línea 3LS Tactical
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Especialistas en indumentaria militar, chaquetas térmicas softshell, pantalones tácticos ripstop y botas de combate de alta exigencia.
          </p>
        </div>

        {/* Contact direct */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contacto & Pedidos</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp:</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold hover:text-emerald-400 underline font-mono"
              >
                {settings.whatsappNumber}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Cobertura nacional: Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Eje Cafetero y municipios.</span>
            </li>
          </ul>
        </div>

        {/* Operating policy */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sin Carrusel de Pagos</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Esta tienda no requiere registro de tarjetas de crédito en la web. Todos los pedidos se tramitan de persona a persona mediante WhatsApp con verificación directa de talla y dirección.
          </p>
        </div>

        {/* Admin and tools */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Administración</h4>
          <p className="text-xs text-slate-400">
            ¿Eres el administrador de la tienda? Puedes ajustar precios, stock y teléfono en cualquier momento:
          </p>
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors text-xs font-semibold"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Panel de Administración</span>
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800/80 py-6 text-center text-slate-500 text-[11px]">
        <p>© {new Date().getFullYear()} {settings.storeName} · Todos los derechos reservados. Colombia.</p>
      </div>
    </footer>
  );
};
