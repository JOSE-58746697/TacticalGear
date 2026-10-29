import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryBannerGridProps {
  onSelectCategory: (category: string) => void;
  onSelectGender?: (gender: 'Hombre' | 'Mujer' | 'Todos') => void;
}

export const CategoryBannerGrid: React.FC<CategoryBannerGridProps> = ({
  onSelectCategory,
  onSelectGender,
}) => {
  const categories = [
    {
      title: 'Calzado & Botas Tácticas',
      subtitle: 'Suela antideslizante todoterreno y tejido Agearskin',
      category: 'Calzado',
      image: '/assets/aistudio/Multimedia__7__58d4212d.jpeg',
      tag: 'Alta Tracción',
    },
    {
      title: 'Chaquetas Softshell Térmicas',
      subtitle: 'Membrana impermeable tricapa y forro micropolar',
      category: 'Chaquetas',
      image: '/assets/aistudio/Multimedia__15__72375835.jpeg',
      tag: 'Impermeable',
    },
    {
      title: 'Pantalones Ripstop de Combate',
      subtitle: '8 bolsillos tácticos, rodillas reforzadas y corte ergonómico',
      category: 'Pantalones',
      image: '/assets/aistudio/Multimedia__13__5fa0c313.jpeg',
      tag: 'Antidesgarro',
    },
    {
      title: 'Línea Femenina & Kits 3LS',
      subtitle: 'Uniformes completos operativos adaptados para mujer y dama',
      category: 'Kits',
      gender: 'Mujer' as const,
      image: '/assets/aistudio/Multimedia__10__96a32817.jpeg',
      tag: 'Operativo',
    },
  ];

  return (
    <section className="py-12 military-filigree border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Categorías Principales
            </span>
            <h2 className="font-condensed text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              Colecciones Destacadas
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            Explora las líneas de mayor demanda utilizadas por personal de seguridad, escoltas y operadores tácticos en Colombia.
          </p>
        </div>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (cat.gender && onSelectGender) {
                  onSelectGender(cat.gender);
                }
                onSelectCategory(cat.category);
                const el = document.getElementById('catalogo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-80 rounded-2xl overflow-hidden border border-slate-300 hover:border-emerald-600 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              {/* Background Image with dark gradient scrim */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* Tag in top-left */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 bg-black/85 backdrop-blur text-emerald-400 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {cat.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                <h3 className="font-condensed text-xl font-black uppercase text-white tracking-wide group-hover:text-emerald-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Ver Colección</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
