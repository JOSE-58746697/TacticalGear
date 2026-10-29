import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#11141a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white uppercase font-condensed tracking-wide">
              Guía Oficial de Tallas y Medidas (Colombia)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Chaquetas Softshell */}
          <div className="space-y-2">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs">
              1. Chaquetas Softshell Térmicas
            </h4>
            <div className="overflow-x-auto border border-slate-800 rounded-lg">
              <table className="w-full text-left font-mono tabular-nums">
                <thead className="bg-slate-900 text-slate-400 text-[11px] uppercase">
                  <tr>
                    <th className="p-2.5">Talla</th>
                    <th className="p-2.5">Pecho (cm)</th>
                    <th className="p-2.5">Manga (cm)</th>
                    <th className="p-2.5">Largo (cm)</th>
                    <th className="p-2.5">Contextura Aprox.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white">S</td>
                    <td className="p-2.5">98 - 104</td>
                    <td className="p-2.5">62</td>
                    <td className="p-2.5">68</td>
                    <td className="p-2.5 font-sans">Delgada (55-68 kg)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white">M</td>
                    <td className="p-2.5">105 - 110</td>
                    <td className="p-2.5">64</td>
                    <td className="p-2.5">70</td>
                    <td className="p-2.5 font-sans">Media (69-78 kg)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white">L</td>
                    <td className="p-2.5">111 - 116</td>
                    <td className="p-2.5">66</td>
                    <td className="p-2.5">72</td>
                    <td className="p-2.5 font-sans">Atlética (79-88 kg)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white">XL</td>
                    <td className="p-2.5">117 - 124</td>
                    <td className="p-2.5">68</td>
                    <td className="p-2.5">74</td>
                    <td className="p-2.5 font-sans">Robusta (89-100 kg)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white">XXL</td>
                    <td className="p-2.5">125 - 132</td>
                    <td className="p-2.5">70</td>
                    <td className="p-2.5">76</td>
                    <td className="p-2.5 font-sans">Ancha (&gt;100 kg)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pantalones Tácticos Ripstop */}
          <div className="space-y-2">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs">
              2. Pantalones Tácticos Cargo Ripstop (Tallas Numéricas)
            </h4>
            <div className="overflow-x-auto border border-slate-800 rounded-lg">
              <table className="w-full text-left font-mono tabular-nums">
                <thead className="bg-slate-900 text-slate-400 text-[11px] uppercase">
                  <tr>
                    <th className="p-2.5">Talla</th>
                    <th className="p-2.5">Cintura (cm)</th>
                    <th className="p-2.5">Cadera (cm)</th>
                    <th className="p-2.5">Largo Total (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">28</td><td className="p-2.5">74 - 78</td><td className="p-2.5">94</td><td className="p-2.5">102</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">30</td><td className="p-2.5">79 - 83</td><td className="p-2.5">98</td><td className="p-2.5">104</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">32</td><td className="p-2.5">84 - 88</td><td className="p-2.5">102</td><td className="p-2.5">105</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">34</td><td className="p-2.5">89 - 93</td><td className="p-2.5">106</td><td className="p-2.5">106</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">36</td><td className="p-2.5">94 - 99</td><td className="p-2.5">110</td><td className="p-2.5">108</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">38</td><td className="p-2.5">100 - 105</td><td className="p-2.5">115</td><td className="p-2.5">109</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              *Nota: Los pantalones cuentan con elástico lateral autoajustable que permite expandir hasta 4 cm adicionales de cintura.
            </p>
          </div>

          {/* Botas Militares Delta */}
          <div className="space-y-2">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs">
              3. Calzado Táctico Delta (Talla Nacional Colombia)
            </h4>
            <div className="overflow-x-auto border border-slate-800 rounded-lg">
              <table className="w-full text-left font-mono tabular-nums">
                <thead className="bg-slate-900 text-slate-400 text-[11px] uppercase">
                  <tr>
                    <th className="p-2.5">Talla Colombia</th>
                    <th className="p-2.5">Longitud de Pie (cm)</th>
                    <th className="p-2.5">Equivalente US</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">38</td><td className="p-2.5">24.5 cm</td><td className="p-2.5">6.5 US</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">39</td><td className="p-2.5">25.0 cm</td><td className="p-2.5">7.0 US</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">40</td><td className="p-2.5">26.0 cm</td><td className="p-2.5">8.0 US</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">41</td><td className="p-2.5">26.5 cm</td><td className="p-2.5">8.5 US</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">42</td><td className="p-2.5">27.5 cm</td><td className="p-2.5">9.5 US</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-2.5 font-bold text-white">43</td><td className="p-2.5">28.5 cm</td><td className="p-2.5">10.5 US</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors"
          >
            Entendido, volver a comprar
          </button>
        </div>
      </div>
    </div>
  );
};
