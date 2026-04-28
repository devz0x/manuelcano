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
      "Professional roebuck leather glove, handcrafted in the Dominican Republic. Pro I-Web pattern for infield, with customizable fit and triple-stitch reinforced seams.",
    price: 329.99,
    compareAtPrice: 399.99,
    categoryId: 1,
    collectionId: 1,
    images: "/img/products/mc-pro-glove-detail.jpg",
    specs: JSON.stringify({
      material: "Premium roebuck leather",
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
      "Northern white ash wood bat with perfect balance for contact hitters. Classic 271 profile with traditional knob and braided leather grip.",
    price: 159.99,
    compareAtPrice: 189.99,
    categoryId: 2,
    collectionId: 1,
    images: "/img/products/mc-pro-bat-271.jpg",
    specs: JSON.stringify({
      material: "Northern White Ash",
      model: "271",
      length: '33"',
      weight: "30oz",
      grip: "Braided leather",
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
      "Youth training bat in poplar wood. Designed to develop correct swing mechanics. Ideal for players aged 8-14.",
    price: 89.99,
    compareAtPrice: null,
    categoryId: 2,
    collectionId: null,
    images: "/img/products/mc-cantera-bat.jpg",
    specs: JSON.stringify({
      material: "Poplar",
      length: '30"',
      weight: "22oz",
      ageRange: "8-14 years",
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
      "Complete catcher gear set: protective helmet, chest protector, and leg guards. High-density foam padding with polycarbonate shell.",
    price: 569.99,
    compareAtPrice: 679.99,
    categoryId: 5,
    collectionId: 1,
    images: "/img/products/mc-catcher-set.jpg",
    specs: JSON.stringify({
      helmet: "Polycarbonate with acrylic visor",
      chest: "High-density PE padding",
      shins: "Double-layer foam",
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
      "Box of 12 professional baseballs with genuine leather cover. High-tension red cotton stitching, approved for professional league use.",
    price: 44.99,
    compareAtPrice: 54.99,
    categoryId: 3,
    collectionId: null,
    images: "/img/products/mc-pelotas-pro.jpg",
    specs: JSON.stringify({
      quantity: "12 baseballs",
      material: "Genuine leather",
      core: "Cork and rubber",
      stitching: "Red, 108 stitches",
      certification: "Pro league approved",
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
      "Sports backpack with compartment for 2 bats, ventilated space for helmet and gloves, and multiple organizer pockets. Water-resistant material.",
    price: 109.99,
    compareAtPrice: null,
    categoryId: 4,
    collectionId: null,
    images: "/img/products/mc-backpack.jpg",
    specs: JSON.stringify({
      capacity: "45L",
      batSlots: 2,
      material: "600D waterproof polyester",
      compartments: 6,
      laptop: 'Up to 15.6"',
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
    description: "Professional baseball gloves for all positions",
    image: "/img/cat/guantes.jpg",
    sortOrder: 1,
  },
  {
    id: 2,
    name: "Bates",
    slug: "bates",
    description: "High quality wood and aluminum bats",
    image: "/img/cat/bates.jpg",
    sortOrder: 2,
  },
  {
    id: 3,
    name: "Pelotas",
    slug: "pelotas",
    description: "Professional and training baseballs",
    image: "/img/cat/pelotas.jpg",
    sortOrder: 3,
  },
  {
    id: 4,
    name: "Mochilas",
    slug: "mochilas",
    description: "Bags and accessories to carry your gear",
    image: "/img/cat/mochilas.jpg",
    sortOrder: 4,
  },
  {
    id: 5,
    name: "Catcher",
    slug: "catcher",
    description: "Complete professional catcher gear",
    image: "/img/cat/catcher.jpg",
    sortOrder: 5,
  },
  {
    id: 6,
    name: "Accesorios",
    slug: "accesorios",
    description: "Complementary accessories for the player",
    image: "/img/cat/accesorios.jpg",
    sortOrder: 6,
  },
];

const collections = [
  {
    id: 1,
    name: "Serie Dominicana",
    slug: "serie-dominicana",
    tagline: "Handcrafted in the cradle of Caribbean baseball",
    description:
      "Our flagship line, artisanally crafted in the Dominican Republic with the finest materials in the world.",
    priceRange: "$89.99 - $569.99",
    color: "#C9A24B",
  },
  {
    id: 2,
    name: "Cantera",
    slug: "cantera",
    tagline: "For the next generation of stars",
    description:
      "Quality gear for young prospects taking their first steps on the diamond.",
    priceRange: "$44.99 - $159.99",
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
