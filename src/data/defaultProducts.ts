import { Product, StoreSettings } from '../types';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'TACTICAL GEAR',
  whatsappNumber: '3202364730',
  countryCode: '57',
  bannerNotice: '⚡ Envíos a todo el país con opción de pago contraentrega | Atención inmediata por WhatsApp',
  shippingNotice: 'Despachos diarios a toda Colombia por Servientrega, Interrapidísimo y Envía (1 a 3 días hábiles).',
  warrantyNotice: 'Garantía por costuras y materiales de fábrica + Cambio de talla asistido.',
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-chaqueta-softshell-navy',
    name: 'Chaqueta Táctica Softshell Térmica Impermeable',
    category: 'Chaquetas',
    gender: 'Hombre',
    price: 235000,
    originalPrice: 270000,
    badge: 'Más Vendida',
    inStock: true,
    shortDescription: 'Membrana cortavientos e impermeable con forro térmico micropolar respirable y bolsillos tácticos.',
    fullDescription: 'Concebida para misiones operativas, seguridad privada, patrullaje y outdoor en condiciones climáticas exigentes. Construida con tejido softshell trilaminado repelente al agua con cremalleras impermeables termoselladas, paneles de velcro para insignias en ambos brazos y compartimentos interiores de acceso táctico rápido.',
    mainImage: '/assets/aistudio/Multimedia__15__72375835.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__15__72375835.jpeg',
      '/assets/aistudio/Multimedia__14__21c82603.jpeg',
      '/assets/aistudio/Multimedia__5__326beee6.jpeg',
      '/assets/aistudio/Multimedia__11__23c8b4d3.jpeg',
      '/assets/aistudio/Multimedia__10__96a32817.jpeg'
    ],
    colors: ['Azul Táctico / Navy', 'Negro Comando', 'Coyote / Verde Oliva'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Tela Softshell trilaminada impermeable y cortavientos',
      'Forro térmico interior en micropolar transpirable',
      '6 bolsillos tácticos con cremalleras de tracción rápida',
      'Bolsillo interior oculto para documentos o equipo',
      'Capota ergonómica ajustable con cordón elástico',
      'Paneles de velcro en ambas mangas para parches e identificadores 3LS',
      'Puños ajustables con tiras de velcro de alto agarre'
    ],
    fabricSpecs: 'Softshell 94% Poliéster + 6% Spandex con revestimiento hidrofóbico DWR, forro micropolar 100% poliéster 260g/m².'
  },
  {
    id: 'prod-pantalon-cargo-elite-black',
    name: 'Pantalón Táctico Cargo Elite Ripstop Negro',
    category: 'Pantalones',
    gender: 'Hombre',
    price: 175000,
    originalPrice: 195000,
    badge: 'Uso Rudo',
    inStock: true,
    shortDescription: 'Construcción ripstop antidesgarro con 8 bolsillos tácticos, rodillas reforzadas y ajuste ergonómico.',
    fullDescription: 'El pantalón insignia para personal operativo y fuerzas de seguridad. Su corte recto táctico permite máxima movilidad en operaciones, con bolsillos laterales de fuelle con cierre de velcro, bolsillos traseros con pestaña de seguridad y tela con tratamiento hidrorrepelente que resiste enganches de ramas y alambre.',
    mainImage: '/assets/aistudio/Multimedia__13__5fa0c313.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__13__5fa0c313.jpeg',
      '/assets/aistudio/Multimedia__14__21c82603.jpeg',
      '/assets/aistudio/Multimedia__9__922f464e.jpeg'
    ],
    colors: ['Negro Asfalto', 'Verde Oliva Ranger', 'Coyote Táctico'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    features: [
      'Tejido Ripstop antidesgarro de alta tenacidad',
      '8 bolsillos tácticos distribuidos estratégicamente',
      'Compartimento para rodilleras internas de neopreno',
      'Cintura autoajustable con elásticos laterales',
      'Costuras dobles y triples en zonas de alta tensión',
      'Tratamiento antimanchas y secado rápido'
    ],
    fabricSpecs: 'Ripstop 65% Poliéster, 35% Algodón peinado de alto gramaje con acabado teflonado repelente a salpicaduras.'
  },
  {
    id: 'prod-pantalon-tactico-mujer-gris',
    name: 'Pantalón Táctico Femenino Ripstop Grey Fit',
    category: 'Pantalones',
    gender: 'Mujer',
    price: 175000,
    originalPrice: 195000,
    badge: 'Línea Femenina',
    inStock: true,
    shortDescription: 'Corte anatómico diseñado para la fisonomía femenina con tela ripstop stretch, bolsillos de carga discretos y alta durabilidad.',
    fullDescription: 'Desarrollado para oficiales, escoltas y profesionales de la seguridad femenina. Ofrece un calce estilizado y ergonómico sin perder capacidad táctica, con bolsillos laterales de bajo perfil, pretina reforzada para cinturón de dotación y refuerzo anti-fricción.',
    mainImage: '/assets/aistudio/Multimedia__10__96a32817.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__10__96a32817.jpeg',
      '/assets/aistudio/Multimedia__16__f1b63756.jpeg',
      '/assets/aistudio/Multimedia__4__75d74353.jpeg'
    ],
    colors: ['Gris Táctico', 'Negro Comando', 'Coyote'],
    sizes: ['6 (28)', '8 (30)', '10 (32)', '12 (34)', '14 (36)'],
    features: [
      'Patrón anatómico femenino con tiro medio confortable',
      'Tela Ripstop flexible que no limita agacharse ni correr',
      'Bolsillos laterales planos con cremallera y cierre silencioso',
      'Cintura autoajustable que no se deforma con el peso del equipo',
      'Acabado repelente al polvo y salpicaduras'
    ],
    fabricSpecs: 'Ripstop 63% Poliéster, 34% Algodón, 3% Elastano stretch de grado profesional.'
  },
  {
    id: 'prod-chaqueta-softshell-mujer-slim',
    name: 'Chaqueta Táctica Softshell Dama Slim Fit',
    category: 'Chaquetas',
    gender: 'Mujer',
    price: 235000,
    originalPrice: 265000,
    badge: 'Exclusivo Dama',
    inStock: true,
    shortDescription: 'Corte entallado para mujer, impermeable y térmica con forro micropolar y velcros para insignias.',
    fullDescription: 'Diseñada con especificaciones tácticas pero con una confección entallada para la mujer operativa. Ofrece protección impermeable y térmica total contra lluvia y bajas temperaturas, cremalleras invertidas termoselladas y bolsillos interiores de acceso rápido.',
    mainImage: '/assets/aistudio/Multimedia__8__fa0145de.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__8__fa0145de.jpeg',
      '/assets/aistudio/Multimedia__10__96a32817.jpeg',
      '/assets/aistudio/Multimedia__14__21c82603.jpeg'
    ],
    colors: ['Negro Táctico', 'Gris Grafito', 'Verde Oliva'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'Corte femenino ergonómico entallado',
      'Membrana trilaminada cortavientos e impermeable',
      'Forro térmico en micropolar liviano de secado veloz',
      'Velcros tácticos en mangas para identificación 3LS',
      'Puños ajustables con tiras de contacto'
    ],
    fabricSpecs: 'Softshell trilaminado 92% Poliéster + 8% Spandex con membrana impermeable DWR.'
  },
  {
    id: 'prod-camisa-tactica-mujer-patrol',
    name: 'Camisa Táctica Femenina Operativa Patrol',
    category: 'Camisas',
    gender: 'Mujer',
    price: 135000,
    badge: 'Línea Femenina',
    inStock: true,
    shortDescription: 'Confección respirable de corte anatómico para oficiales y personal de seguridad femenina.',
    fullDescription: 'Camisa táctica de alta durabilidad adaptada para la morfología femenina. Presenta solapas con cierre seguro, tejido ripstop stretch transpirable y trabillas en mangas para uso cómodo en climas cálidos y templados.',
    mainImage: '/assets/aistudio/Multimedia__9__922f464e.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__9__922f464e.jpeg',
      '/assets/aistudio/Multimedia__11__23c8b4d3.jpeg',
      '/assets/aistudio/Multimedia__10__96a32817.jpeg'
    ],
    colors: ['Negro Táctico', 'Coyote Dama', 'Azul Navy'],
    sizes: ['XS', 'S', 'M', 'L'],
    features: [
      'Silueta estilizada para mujer sin restringir movilidad',
      'Tejido Ripstop flexible de rápida evacuación de sudor',
      'Bolsillos frontales con acceso rápido para documentos',
      'Protección solar certificada UPF 40+'
    ],
    fabricSpecs: 'Ripstop stretch 65% Algodón, 32% Poliéster, 3% Spandex con tratamiento antibacterial.'
  },
  {
    id: 'prod-pantalon-ripstop-coyote',
    name: 'Pantalón Táctico Ripstop Operativo Coyote / Khaki',
    category: 'Pantalones',
    gender: 'Hombre',
    price: 175000,
    badge: 'Operativo',
    inStock: true,
    shortDescription: 'Acabado en tono Coyote / Khaki con D-Ring metálico táctico y bolsillos de rápida extracción.',
    fullDescription: 'Pantalón de combate en color Coyote / Caqui ideal para terrenos agrestes, patrullaje en clima templado o cálido y operaciones de campo. Incorpora anilla en D para mosquetones, costuras triples en zonas de tensión y compartimento dedicado para smartphone o navaja táctica.',
    mainImage: '/assets/aistudio/Multimedia__6__629edc9b.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__6__629edc9b.jpeg',
      '/assets/aistudio/Multimedia__4__75d74353.jpeg',
      '/assets/aistudio/Multimedia__9__922f464e.jpeg'
    ],
    colors: ['Coyote / Khaki', 'Negro Comando', 'Verde Oliva'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    features: [
      'Anilla D-Ring frontal para sujeción de llaves, guantes o equipo',
      'Costuras dobles y triples de seguridad en tiros y entrepierna',
      'Bolsillos laterales con ángulo ergonómico para fácil acceso sentado o de pie',
      'Resistente a la abrasión en matorrales y suelo pedregoso',
      'Tejido fresco y respirable para jornadas extensas'
    ],
    fabricSpecs: 'Ripstop 65% Algodón, 35% Poliéster de grado militar antidesgaste.'
  },
  {
    id: 'prod-camisa-tactica-operativa-gris',
    name: 'Camisa Táctica Operativa Ripstop Manga Larga',
    category: 'Camisas',
    gender: 'Hombre',
    price: 135000,
    originalPrice: 155000,
    badge: 'Secado Rápido',
    inStock: true,
    shortDescription: 'Camisa táctica formal-operativa con bolsillos dobles en pecho, trabilla para bolígrafo y ventilación.',
    fullDescription: 'Presentación impecable con ADN operativo. Ideal para escoltas, supervisores de seguridad y personal que requiere un aspecto corporativo pulcro pero con toda la funcionalidad táctica: bolsillos dobles de fuelle con cierre de seguridad, ventilación dorsal en malla y trabillas internas para fijar las mangas enrolladas.',
    mainImage: '/assets/aistudio/Multimedia__12__453ff7f3.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__12__453ff7f3.jpeg',
      '/assets/aistudio/Multimedia__14__21c82603.jpeg',
      '/assets/aistudio/Multimedia__4__75d74353.jpeg'
    ],
    colors: ['Gris Táctico', 'Negro Comando', 'Azul Oscuro Policial'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Bolsillos dobles con solapas y compartimento oculto para pasaporte o credencial',
      'Ventilación en espalda con malla transpirable CoolMax',
      'Trabillas interiores para fijar manga corta enrollada',
      'Botones de resina de alta resistencia que no se desprenden con el roce',
      'Protección solar UPF 40+ y tratamiento de secado veloz'
    ],
    fabricSpecs: 'Ripstop liviano ultra transpirable 65/35 con tratamiento antibacteriano y secado acelerado.'
  },
  {
    id: 'prod-botas-delta-desert',
    name: 'Botas Tácticas Militares Delta Desert Coyote',
    category: 'Calzado',
    gender: 'Unisex',
    price: 290000,
    originalPrice: 320000,
    badge: 'Uso Extremo',
    inStock: true,
    shortDescription: 'Calzado táctico caña media con gamuza de alta resistencia, tejido Agearskin y suela antideslizante.',
    fullDescription: 'Diseñadas para brindar tracción insuperable y amortiguación en cualquier superficie. Elaboradas con gamuza seleccionada y paneles textiles Agearskin de alta ventilación, plantilla anatómica con absorción de impactos en talón y suela con tacos multidireccionales para barro y gravilla.',
    mainImage: '/assets/aistudio/Multimedia__7__58d4212d.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__7__58d4212d.jpeg',
      '/assets/aistudio/Multimedia__4__75d74353.jpeg',
      '/assets/aistudio/Multimedia__6__629edc9b.jpeg'
    ],
    colors: ['Desert Coyote', 'Negro Asfalto'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    features: [
      'Gamuza hidrófuga combinada con tejido transpirable Agearskin',
      'Suela todoterreno con ranuras profundas antideslizantes',
      'Puntera y talón reforzados contra impactos y tropiezos',
      'Caña de 8 pulgadas que brinda estabilidad total al tobillo',
      'Ojales metálicos reforzados y cordones tácticos de paracaídas',
      'Peso liviano para reducir la fatiga en marchas largas'
    ],
    fabricSpecs: 'Cuero gamuzado 1.8mm + Nylon balístico Agearskin + Suela de goma vulcanizada EVA.'
  },
  {
    id: 'prod-combo-uniforme-3ls',
    name: 'Kit Completo Uniforme Táctico 3LS (Chaqueta + Pantalón)',
    category: 'Kits',
    gender: 'Hombre',
    price: 385000,
    originalPrice: 410000,
    badge: 'Ahorra $25.000',
    inStock: true,
    shortDescription: 'Conjunto completo de Chaqueta Softshell + Pantalón Ripstop + Parche 3LS de obsequio.',
    fullDescription: 'La combinación definitiva para profesionales de la seguridad, escoltas y entusiastas tácticos. Incluye la chaqueta térmica impermeable Softshell con el parche bordado 3LS y el pantalón cargo táctico en los colores y tallas de tu preferencia.',
    mainImage: '/assets/aistudio/Multimedia__16__f1b63756.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__16__f1b63756.jpeg',
      '/assets/aistudio/Multimedia__4__75d74353.jpeg',
      '/assets/aistudio/Multimedia__9__922f464e.jpeg',
      '/assets/aistudio/Multimedia__10__96a32817.jpeg',
      '/assets/aistudio/Multimedia__17__1f3ce484.jpeg'
    ],
    colors: ['Kit Verde Oliva / Coyote', 'Kit Negro Comando', 'Kit Bicolor Navy/Gris'],
    sizes: ['S (P:28-30)', 'M (P:32)', 'L (P:34)', 'XL (P:36-38)'],
    features: [
      'Ahorro directo de $25.000 COP frente a compras individuales',
      'Incluye 1 Chaqueta Softshell + 1 Pantalón Cargo + 1 Parche Bordado 3LS',
      'Posibilidad de combinar colores y tallas diferentes para chaqueta y pantalón',
      'Listo para misiones de campo, patrullaje urbano o actividades tácticas',
      'Envío prioritario con seguimiento en vivo por WhatsApp'
    ],
    fabricSpecs: 'Softshell térmico tricapa + Ripstop militar antidesgarro con certificación de durabilidad.'
  },
  {
    id: 'prod-parche-militar-3ls',
    name: 'Parche Militar Bordado 3D "3LS Tactical Shield"',
    category: 'Accesorios',
    gender: 'Unisex',
    price: 25000,
    badge: 'Insignia Oficial',
    inStock: true,
    shortDescription: 'Parche bordado táctico con velcro macho de alta densidad para uniformes, chalecos y mochilas.',
    fullDescription: 'Insignia de alta distinción militar con bordado de relieve 3D sobre base textil reforzada. Cuenta con sistema de gancho velcro ultra adherente para fijar en chaquetas, chalecos portaplacas, morrales o gorras.',
    mainImage: '/assets/aistudio/Multimedia__17__1f3ce484.jpeg',
    galleryImages: [
      '/assets/aistudio/Multimedia__17__1f3ce484.jpeg',
      '/assets/aistudio/Multimedia__10__96a32817.jpeg',
      '/assets/aistudio/Multimedia__8__fa0145de.jpeg'
    ],
    colors: ['Verde Oliva & Plata', 'Negro Táctico & Grafito'],
    sizes: ['Única (8.5 cm x 7 cm)'],
    features: [
      'Bordado 3D de alta densidad con hilos de resistencia militar',
      'Respaldo de velcro macho (gancho) de acople seguro',
      'Borde ribeteado Overlock para evitar deshilaches con el tiempo',
      'Resistente a la lluvia, barro y lavado frecuente'
    ],
    fabricSpecs: 'Hilos de poliamida militar sobre fieltro de alta densidad con gancho de nylon Velcro.'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sgto. Andrés Ramírez',
    role: 'Supervisor de Seguridad Privada',
    city: 'Bogotá D.C.',
    comment: 'La chaqueta softshell es excelente para el frío y la lluvia de la sabana. Los bolsillos son muy amplios para el radio y la linterna. Hice el pedido por WhatsApp y me llegó al día siguiente contraentrega.',
    rating: 5,
    product: 'Chaqueta Softshell Térmica'
  },
  {
    id: 2,
    name: 'Carlos Mario Henao',
    role: 'Instructor de Tiro y Escolta',
    city: 'Medellín, Antioquia',
    comment: 'Los pantalones ripstop aguantan de todo. Muy cómodos en las rodillas para desenfundar en movimiento. La atención por el WhatsApp 3202364730 fue rápida y resolvieron mis dudas de tallas al instante.',
    rating: 5,
    product: 'Pantalón Cargo Elite'
  },
  {
    id: 3,
    name: 'Teniente (R) Jhon J. Osorio',
    role: 'Operaciones Especiales',
    city: 'Cali, Valle',
    comment: 'Las botas Delta llegaron en su caja original, super livianas para caminar horas seguidas. El kit completo 3LS vale cada peso. Recomendados al 100%.',
    rating: 5,
    product: 'Botas Tácticas Delta'
  }
];

export const FAQS = [
  {
    q: '¿Cómo realizo un pedido sin tarjeta ni carrusel de pagos?',
    a: 'Es muy sencillo y seguro: selecciona el producto, tu talla y color, y presiona el botón "Pedir por WhatsApp". El sistema te abrirá una conversación directa con nuestro asesor al 3202364730 con todos los datos de tu pedido para coordinar el despacho inmediato.'
  },
  {
    q: '¿Tienen servicio de Pago Contraentrega?',
    a: '¡Sí! Puedes pagar en efectivo cuando recibas tu paquete en la puerta de tu casa o trabajo en la mayoría de ciudades y municipios de Colombia.'
  },
  {
    q: '¿Cuánto tarda en llegar mi pedido?',
    a: 'Para ciudades principales (Bogotá, Medellín, Cali, Barranquilla, Bucaramanga) el tiempo es de 24 a 48 horas hábiles. Para otras zonas del país tarda entre 2 y 4 días hábiles mediante transportadoras autorizadas (Servientrega, Interrapidísimo o Envía).'
  },
  {
    q: '¿Qué pasa si la talla que elegí no me queda bien?',
    a: 'No te preocupes. Contamos con garantía de cambio de talla. Solo nos escribes al WhatsApp 3202364730 dentro de los primeros 5 días de recibido y gestionamos el reemplazo de forma rápida.'
  },
  {
    q: '¿Puedo comprar para dotaciones de empresas de seguridad o esquemas?',
    a: 'Sí, manejamos precios especiales por volumen a partir de 6 unidades para empresas de seguridad, escoltas y clubes de tiro. Consúltanos directamente por WhatsApp para cotización formal.'
  }
];
