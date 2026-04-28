import { NextResponse } from "next/server";

interface Product {
  id: number;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: number;
  collectionId: number | null;
  images: string;
  specs: string;
  stock: number;
  rating: number;
  reviewCount: number;
  badges: string;
  isActive: boolean;
}

const products: Product[] = [
  {
    id: 1,
    sku: "MC-GLV-001",
    name: "MC Pro Glove Serie Dominicana",
    slug: "mc-pro-glove-serie-dominicana",
    description:
      "Guante profesional de cuero de piel de corzo, diseñado a mano en República Dominicana. Patrón Pro I-Web para infield, con ajuste personalizable y costuras reforzadas de triple puntada.",
    price: 18999,
    compareAtPrice: 22999,
    categoryId: 1,
    collectionId: 1,
    images: "/img/products/mc-pro-glove-detail.jpg",
    specs: JSON.stringify({
      material: "Cuero de corzo premium",
      position: "Infield",
      pattern: "I-Web",
      size: '11.5"',
      weight: "520g",
    }),
    stock: 24,
    rating: 4.8,
    reviewCount: 127,
    badges: "bestseller,personalizado",
    isActive: true,
  },
  {
    id: 2,
    sku: "MC-BAT-271",
    name: "MC Pro Bat Modelo 271",
    slug: "mc-pro-bat-modelo-271",
    description:
      "Bate de madera de fresno northern white con balance perfecto para contact hitters. Perfil 271 clásico con knob tradicional y grip de cuero trenzado.",
    price: 8999,
    compareAtPrice: 10999,
    categoryId: 2,
    collectionId: 1,
    images: "/img/products/mc-pro-bat-271.jpg",
    specs: JSON.stringify({
      material: "Fresno Northern White",
      model: "271",
      length: '33"',
      weight: "30oz",
      grip: "Cuero trenzado",
    }),
    stock: 18,
    rating: 4.7,
    reviewCount: 89,
    badges: "bestseller",
    isActive: true,
  },
  {
    id: 3,
    sku: "MC-BAT-CNT",
    name: "MC Cantera Bat JUV",
    slug: "mc-cantera-bat-juv",
    description:
      "Bate de entrenamiento para jóvenes en madera de álamo. Diseñado para desarrollar mecánica de swing correcta. Ideal para jugadores de 8-14 años.",
    price: 4999,
    compareAtPrice: null,
    categoryId: 2,
    collectionId: null,
    images: "/img/products/mc-cantera-bat.jpg",
    specs: JSON.stringify({
      material: "Álamo",
      length: '30"',
      weight: "22oz",
      ageRange: "8-14 años",
    }),
    stock: 35,
    rating: 4.5,
    reviewCount: 56,
    badges: "nuevo",
    isActive: true,
  },
  {
    id: 4,
    sku: "MC-CTH-SET",
    name: "MC Catcher Set Pro",
    slug: "mc-catcher-set-pro",
    description:
      "Set completo de equipo de catcher: casco protector, pechera y espinilleras. Acolchado de espuma de alta densidad con shell de policarbonato.",
    price: 32999,
    compareAtPrice: 38999,
    categoryId: 5,
    collectionId: 1,
    images: "/img/products/mc-catcher-set.jpg",
    specs: JSON.stringify({
      helmet: "Policarbonato con visor de acrílico",
      chest: "Acolchado PE de alta densidad",
      shins: "Doble capa de espuma",
      sizes: "S / M / L",
    }),
    stock: 8,
    rating: 4.9,
    reviewCount: 34,
    badges: "premium",
    isActive: true,
  },
  {
    id: 5,
    sku: "MC-BAL-PRX",
    name: "MC Pelotas Pro X",
    slug: "mc-pelotas-pro-x",
    description:
      "Caja de 12 pelotas de béisbol profesionales con cubierta de cuero genuino. Costura roja de algodón de alta tensión, aprobadas para uso en liga profesional.",
    price: 2499,
    compareAtPrice: 2999,
    categoryId: 3,
    collectionId: null,
    images: "/img/products/mc-pelotas-pro.jpg",
    specs: JSON.stringify({
      quantity: "12 pelotas",
      material: "Cuero genuino",
      core: "Corcho y hule",
      stitching: "Rojo, 108 puntadas",
      certification: "LMB aprobada",
    }),
    stock: 50,
    rating: 4.6,
    reviewCount: 201,
    badges: "bestseller",
    isActive: true,
  },
  {
    id: 6,
    sku: "MC-BPK-PRO",
    name: "MC Mochila Pro Bat Pack",
    slug: "mc-mochila-pro-bat-pack",
    description:
      "Mochila deportiva con compartimento para 2 bates, espacio ventilado para casco y guantes, y múltiples bolsillos organizadores. Material resistente al agua.",
    price: 5999,
    compareAtPrice: null,
    categoryId: 4,
    collectionId: null,
    images: "/img/products/mc-backpack.jpg",
    specs: JSON.stringify({
      capacity: "45L",
      batSlots: 2,
      material: "Poliester 600D impermeable",
      compartments: 6,
      laptop: 'Hasta 15.6"',
    }),
    stock: 42,
    rating: 4.4,
    reviewCount: 78,
    badges: "nuevo",
    isActive: true,
  },
];

const categories = [
  {
    id: 1,
    name: "Guantes",
    slug: "guantes",
    description: "Guantes profesionales de béisbol para todas las posiciones",
    image: "/img/cat/guantes.jpg",
    sortOrder: 1,
  },
  {
    id: 2,
    name: "Bates",
    slug: "bates",
    description: "Bates de madera y aluminio de alta calidad",
    image: "/img/cat/bates.jpg",
    sortOrder: 2,
  },
  {
    id: 3,
    name: "Pelotas",
    slug: "pelotas",
    description: "Pelotas de béisbol profesionales y de entrenamiento",
    image: "/img/cat/pelotas.jpg",
    sortOrder: 3,
  },
  {
    id: 4,
    name: "Mochilas",
    slug: "mochilas",
    description: "Mochilas y accesorios para llevar tu equipo",
    image: "/img/cat/mochilas.jpg",
    sortOrder: 4,
  },
  {
    id: 5,
    name: "Catcher",
    slug: "catcher",
    description: "Equipo completo de catcher profesional",
    image: "/img/cat/catcher.jpg",
    sortOrder: 5,
  },
  {
    id: 6,
    name: "Accesorios",
    slug: "accesorios",
    description: "Accesorios complementarios para el jugador",
    image: "/img/cat/accesorios.jpg",
    sortOrder: 6,
  },
];

const collections = [
  {
    id: 1,
    name: "Serie Dominicana",
    slug: "serie-dominicana",
    tagline: "Hecho a mano en la cuna del beisbol caribeño",
    description:
      "Nuestra línea insignia, fabricada artesanalmente en República Dominicana con los mejores materiales del mundo.",
    priceRange: "$4,999 - $32,999",
    color: "#C9A24B",
  },
  {
    id: 2,
    name: "Cantera",
    slug: "cantera",
    tagline: "Para la próxima generación de estrellas",
    description:
      "Equipo de calidad para jóvenes promesas que están dando sus primeros pasos en el diamante.",
    priceRange: "$2,499 - $8,999",
    color: "#2E5D3A",
  },
];

export async function GET() {
  return NextResponse.json({
    products,
    categories,
    collections,
  });
}
