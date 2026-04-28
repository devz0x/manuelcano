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
  gallery: string;
  specs: string;
  stock: number;
  rating: number;
  reviewCount: number;
  badges: string;
  isActive: boolean;
}

const products: Product[] = [
  /* ───────────── GLOVES ───────────── */
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
    images: "/img/products/mc-glove-main.jpg",
    gallery: JSON.stringify([
      "/img/products/mc-glove-main.jpg",
      "/img/products/mc-pro-glove-detail.jpg",
      "/img/products/mc-pro-glove-angle2.jpg",
    ]),
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
    id: 10,
    sku: "MC-GLV-BLU",
    name: "MC Pro Glove - Blue Edition",
    slug: "mc-pro-glove-blue-edition",
    description:
      "Same professional quality as our flagship Serie Dominicana glove, in a bold blue colorway. Premium leather with reinforced I-Web pattern, handcrafted in the Dominican Republic.",
    price: 329.99,
    compareAtPrice: null,
    categoryId: 1,
    collectionId: 1,
    images: "/img/products/mc-gloves-pair-grass.jpg",
    gallery: JSON.stringify([
      "/img/products/mc-gloves-pair-grass.jpg",
      "/img/products/mc-glove-main.jpg",
    ]),
    specs: JSON.stringify({
      material: "Premium roebuck leather",
      position: "Infield / Outfield",
      pattern: "I-Web",
      size: '11.5" / 12"',
      weight: "520g",
      color: "Blue",
    }),
    stock: 15,
    rating: 4.7,
    reviewCount: 42,
    badges: "nuevo",
    isActive: true,
  },
  {
    id: 11,
    sku: "MC-GLV-GRN",
    name: "MC Pro Glove - Green Cantera",
    slug: "mc-pro-glove-green-cantera",
    description:
      "Cantera series fielding glove in vibrant green. Lightweight poplar-core construction ideal for developing players transitioning to pro-level leather.",
    price: 249.99,
    compareAtPrice: null,
    categoryId: 1,
    collectionId: 2,
    images: "/img/products/mc-gloves-collection-turf.jpg",
    gallery: JSON.stringify([
      "/img/products/mc-gloves-collection-turf.jpg",
      "/img/products/mc-gloves-collection-flat.jpg",
    ]),
    specs: JSON.stringify({
      material: "Hybrid leather",
      position: "Infield / Outfield",
      pattern: "Modified Trap-Eze",
      size: '11.75"',
      weight: "490g",
      color: "Green",
    }),
    stock: 12,
    rating: 4.6,
    reviewCount: 28,
    badges: "nuevo",
    isActive: true,
  },
  /* ───────────── BATS ───────────── */
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
    gallery: JSON.stringify([
      "/img/products/mc-pro-bat-271.jpg",
      "/img/products/mc-pro-bat-detail2.jpg",
    ]),
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
    gallery: JSON.stringify(["/img/products/mc-cantera-bat.jpg"]),
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
  /* ───────────── BALLS ───────────── */
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
    gallery: JSON.stringify(["/img/products/mc-pelotas-pro.jpg"]),
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
  /* ───────────── BAGS ───────────── */
  {
    id: 6,
    sku: "MC-BPK-NAV",
    name: "MC Mochila Pro Bat Pack",
    slug: "mc-mochila-pro-bat-pack",
    description:
      "Sports backpack with compartment for 2 bats, ventilated space for helmet and gloves, and multiple organizer pockets. Water-resistant 600D polyester with orange accent zippers.",
    price: 109.99,
    compareAtPrice: null,
    categoryId: 4,
    collectionId: null,
    images: "/img/products/mc-backpack.jpg",
    gallery: JSON.stringify([
      "/img/products/mc-backpack.jpg",
      "/img/products/mc-backpack-navy.jpg",
      "/img/products/mc-backpack-angle2.png",
      "/img/products/mc-backpack-detail.png",
      "/img/products/mc-backpack-side.png",
    ]),
    specs: JSON.stringify({
      capacity: "45L",
      batSlots: 2,
      material: "600D waterproof polyester",
      compartments: 6,
      laptop: 'Up to 15.6"',
      color: "Navy with orange accents",
    }),
    stock: 42,
    rating: 4.4,
    reviewCount: 78,
    badges: "bestseller",
    isActive: true,
  },
  {
    id: 7,
    sku: "MC-BPK-RED",
    name: "MC Mochila Pro Bat Pack - Red",
    slug: "mc-mochila-pro-bat-pack-red",
    description:
      "MANNY CANÓ sports backpack in striking red with black accents. Same Pro Bat Pack design with 2 bat compartments, ventilated pockets, and 6 organizer sections.",
    price: 109.99,
    compareAtPrice: null,
    categoryId: 4,
    collectionId: null,
    images: "/img/products/mc-backpack-red.jpg",
    gallery: JSON.stringify(["/img/products/mc-backpack-red.jpg"]),
    specs: JSON.stringify({
      capacity: "45L",
      batSlots: 2,
      material: "600D waterproof polyester",
      compartments: 6,
      laptop: 'Up to 15.6"',
      color: "Red with black accents",
    }),
    stock: 28,
    rating: 4.4,
    reviewCount: 34,
    badges: "nuevo",
    isActive: true,
  },
  {
    id: 8,
    sku: "MC-BPK-BLK",
    name: "MC Mochila Pro Bat Pack - Black",
    slug: "mc-mochila-pro-bat-pack-black",
    description:
      "MANNY CANÓ sports backpack in classic black. Pro Bat Pack design with 2 bat compartments, ventilated pockets, USB charging port, and 6 organizer sections.",
    price: 109.99,
    compareAtPrice: null,
    categoryId: 4,
    collectionId: null,
    images: "/img/products/mc-backpack-black.jpg",
    gallery: JSON.stringify(["/img/products/mc-backpack-black.jpg"]),
    specs: JSON.stringify({
      capacity: "45L",
      batSlots: 2,
      material: "600D waterproof polyester",
      compartments: 6,
      laptop: 'Up to 15.6"',
      color: "Black",
      features: "USB charging port",
    }),
    stock: 31,
    rating: 4.4,
    reviewCount: 22,
    badges: "nuevo",
    isActive: true,
  },
  /* ───────────── CATCHER ───────────── */
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
    gallery: JSON.stringify(["/img/products/mc-catcher-set.jpg"]),
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
    id: 12,
    sku: "MC-CTH-MIT-BLU",
    name: "MC Catcher Mitt - Blue",
    slug: "mc-catcher-mitt-blue",
    description:
      "Professional catcher's mitt in blue with white stitching. Extra-deep pocket design with reinforced palm padding for game after game of use behind the plate.",
    price: 279.99,
    compareAtPrice: null,
    categoryId: 5,
    collectionId: 1,
    images: "/img/products/mc-catcher-mitt-blue.jpg",
    gallery: JSON.stringify(["/img/products/mc-catcher-mitt-blue.jpg"]),
    specs: JSON.stringify({
      material: "Premium steerhide leather",
      pattern: "Single-post with closed web",
      size: '33.5"',
      weight: "620g",
      palm: "Reinforced dual-density padding",
      color: "Blue with white stitching",
    }),
    stock: 10,
    rating: 4.8,
    reviewCount: 18,
    badges: "nuevo",
    isActive: true,
  },
  /* ───────────── ACCESSORIES ───────────── */
  {
    id: 9,
    sku: "MC-CLT-BLK",
    name: "MC Cleat Pro Black",
    slug: "mc-cleat-pro-black",
    description:
      "Professional baseball cleat with M2 technology. Lightweight synthetic upper with reinforced toe box, metal spike configuration for maximum traction on dirt and grass.",
    price: 129.99,
    compareAtPrice: 159.99,
    categoryId: 6,
    collectionId: null,
    images: "/img/products/mc-cleat-black.jpg",
    gallery: JSON.stringify(["/img/products/mc-cleat-black.jpg"]),
    specs: JSON.stringify({
      upper: "Synthetic leather with mesh",
      sole: "Metal spikes (9)",
      weight: "310g",
      closure: "Lace-up",
      technology: "M2 Cushioning System",
      colors: "Black / Green / Orange accents",
    }),
    stock: 19,
    rating: 4.6,
    reviewCount: 45,
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
    priceRange: "$44.99 - $249.99",
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
