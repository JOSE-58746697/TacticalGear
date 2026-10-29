export interface TacticalImageItem {
  id: string;
  url: string;
  title: string;
  category: string;
  gender: 'Hombre' | 'Mujer' | 'Unisex';
  description: string;
}

export const TACTICAL_IMAGES: {
  hombres: TacticalImageItem[];
  mujeres: TacticalImageItem[];
  unisex: TacticalImageItem[];
} = {
  hombres: [
    {
      id: 'img-h-pantalon-negro',
      url: '/assets/aistudio/Multimedia__13__5fa0c313.jpeg',
      title: 'Pantalón Cargo Elite Ripstop Negro - Hombre',
      category: 'Pantalones',
      gender: 'Hombre',
      description: 'Corte recto táctico masculino con 8 bolsillos de alta capacidad.',
    },
    {
      id: 'img-h-pantalon-coyote',
      url: '/assets/aistudio/Multimedia__6__629edc9b.jpeg',
      title: 'Pantalón Ripstop Coyote / Khaki - Hombre',
      category: 'Pantalones',
      gender: 'Hombre',
      description: 'Acabado en tono Coyote con anilla D-Ring para equipo táctico.',
    },
    {
      id: 'img-h-camisa-manga-larga',
      url: '/assets/aistudio/Multimedia__12__453ff7f3.jpeg',
      title: 'Camisa Táctica Operativa Ripstop - Hombre',
      category: 'Camisas',
      gender: 'Hombre',
      description: 'Camisa formal-operativa manga larga con bolsillos dobles de fuelle.',
    },
    {
      id: 'img-h-chaqueta-softshell',
      url: '/assets/aistudio/Multimedia__15__72375835.jpeg',
      title: 'Chaqueta Softshell Térmica Navy - Hombre',
      category: 'Chaquetas',
      gender: 'Hombre',
      description: 'Membrana trilaminada impermeable con velcros para insignias 3LS.',
    },
    {
      id: 'img-h-uniforme-kit',
      url: '/assets/aistudio/Multimedia__16__f1b63756.jpeg',
      title: 'Uniforme Completo Táctico 3LS - Hombre',
      category: 'Kits',
      gender: 'Hombre',
      description: 'Conjunto coordinado chaqueta + pantalón de combate operativo.',
    },
    {
      id: 'img-h-detalle-manga',
      url: '/assets/aistudio/Multimedia__14__21c82603.jpeg',
      title: 'Detalle de Mangas y Cremalleras Softshell',
      category: 'Chaquetas',
      gender: 'Hombre',
      description: 'Panel de velcro y tiradores de cremallera de tracción rápida.',
    },
    {
      id: 'img-h-terreno-botas',
      url: '/assets/aistudio/Multimedia__4__75d74353.jpeg',
      title: 'Indumentaria Masculina y Botas en Terreno',
      category: 'Calzado',
      gender: 'Hombre',
      description: 'Detalle de pantalón táctico y botas militares en acción.',
    },
  ],
  mujeres: [
    {
      id: 'img-m-pantalon-grey-fit',
      url: '/assets/aistudio/Multimedia__10__96a32817.jpeg',
      title: 'Pantalón Táctico Femenino Grey Fit - Mujer',
      category: 'Pantalones',
      gender: 'Mujer',
      description: 'Corte anatómico diseñado para la silueta femenina con pretina reforzada.',
    },
    {
      id: 'img-m-chaqueta-slim',
      url: '/assets/aistudio/Multimedia__8__fa0145de.jpeg',
      title: 'Chaqueta Táctica Térmica Dama Slim - Mujer',
      category: 'Chaquetas',
      gender: 'Mujer',
      description: 'Chaqueta softshell adaptada con entalle femenino y forro polar.',
    },
    {
      id: 'img-m-uniforme-femenino',
      url: '/assets/aistudio/Multimedia__9__922f464e.jpeg',
      title: 'Uniforme Operativo para Seguridad Dama - Mujer',
      category: 'Kits',
      gender: 'Mujer',
      description: 'Conjunto táctico completo para esquemas y personal femenino.',
    },
    {
      id: 'img-m-indumentaria-patrullaje',
      url: '/assets/aistudio/Multimedia__11__23c8b4d3.jpeg',
      title: 'Prenda Táctica de Patrullaje Femenina - Mujer',
      category: 'Camisas',
      gender: 'Mujer',
      description: 'Tejido elástico respirable con ajuste cómodo para mujer.',
    },
  ],
  unisex: [
    {
      id: 'img-u-botas-delta',
      url: '/assets/aistudio/Multimedia__7__58d4212d.jpeg',
      title: 'Botas Militares Delta Desert Coyote - Unisex',
      category: 'Calzado',
      gender: 'Unisex',
      description: 'Suela todoterreno y cuero gamuzado hidrófugo apto para hombre y mujer.',
    },
    {
      id: 'img-u-parche-shield',
      url: '/assets/aistudio/Multimedia__17__1f3ce484.jpeg',
      title: 'Parche Militar Bordado 3D 3LS Tactical Shield',
      category: 'Accesorios',
      gender: 'Unisex',
      description: 'Insignia oficial con velcro de alta densidad para cualquier prenda.',
    },
    {
      id: 'img-u-cremalleras-selladas',
      url: '/assets/aistudio/Multimedia__5__326beee6.jpeg',
      title: 'Detalle de Cremalleras y Costuras Herméticas',
      category: 'Accesorios',
      gender: 'Unisex',
      description: 'Tecnología de impermeabilidad y termosellado aplicada a la línea 3LS.',
    },
  ],
};
