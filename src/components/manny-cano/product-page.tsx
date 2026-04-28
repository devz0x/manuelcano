'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
  ChevronRight,
  Home,
  PackageOpen,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductCard } from './product-card';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

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

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Collection {
  id: number;
  name: string;
  slug: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getProductType(product: Product): 'glove' | 'bat' | 'other' {
  const cat = product.categoryId;
  if (cat === 1) return 'glove';   // Guantes
  if (cat === 2) return 'bat';     // Bates
  return 'other';
}

function getImages(product: Product): string[] {
  try {
    const gallery: string[] = JSON.parse(product.gallery);
    if (gallery.length > 0) return gallery;
  } catch {
    // fallback to single image
  }
  return [product.images];
}

function getSizes(type: 'glove' | 'bat' | 'other'): string[] {
  switch (type) {
    case 'glove':
      return ['11"', '11.25"', '11.5"', '11.75"', '12"'];
    case 'bat':
      return ['31"', '32"', '33"', '34"'];
    default:
      return ['S', 'M', 'L', 'XL'];
  }
}

function getColors(type: 'glove' | 'bat' | 'other'): string[] {
  switch (type) {
    case 'glove':
      return ['Brown', 'Black', 'Tan'];
    case 'bat':
      return ['Natural', 'Black'];
    default:
      return ['Black', 'Navy', 'Red'];
  }
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.round(rating)
                ? 'fill-gold-glove text-gold-glove'
                : 'fill-none text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-tobacco-leather">
        {rating.toFixed(1)} ({reviewCount} {t('product.reviews')})
      </span>
    </div>
  );
}

function BadgeOverlay({ badges }: { badges: string }) {
  const { t } = useI18n();
  const badgeConfig: Record<string, { labelKey: string; className: string }> = {
    bestseller: {
      labelKey: 'products.moreSold',
      className: 'bg-stadium-crimson',
    },
    nuevo: {
      labelKey: 'products.new',
      className: 'bg-field-green',
    },
    premium: {
      labelKey: 'products.premium',
      className: 'bg-gold-glove text-diamond-navy',
    },
  };

  const badgeList = badges
    ? badges
        .split(',')
        .map((b) => b.trim().toLowerCase())
        .filter((b) => badgeConfig[b])
    : [];

  if (badgeList.length === 0) return null;

  return (
    <div className="absolute left-3 top-3 flex flex-col gap-1.5">
      {badgeList.map((key) => {
        const cfg = badgeConfig[key];
        return (
          <span
            key={key}
            className={`${cfg.className} px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white`}
          >
            {t(cfg.labelKey)}
          </span>
        );
      })}
    </div>
  );
}

function TrustBadges() {
  const { t } = useI18n();
  const badges = [
    { icon: Truck, label: t('product.freeShipping'), sub: '$100+' },
    { icon: Shield, label: t('product.warranty') },
    { icon: RotateCcw, label: t('product.returns') },
    { icon: CreditCard, label: t('product.securePayment') },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {badges.map(({ icon: Icon, label, sub }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1.5 rounded-lg bg-bone-cream/60 px-3 py-3 text-center"
        >
          <Icon className="h-5 w-5 text-tobacco-leather" />
          <span className="text-xs font-medium text-dugout-charcoal">{label}</span>
          {sub && (
            <span className="text-[10px] text-tobacco-leather">{sub}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function SpecsTable({ specsJson }: { specsJson: string }) {
  const { t } = useI18n();
  let specs: Record<string, string> = {};
  try {
    specs = JSON.parse(specsJson);
  } catch {
    return null;
  }

  const entries = Object.entries(specs);
  if (entries.length === 0) return null;

  return (
    <div>
      <h3 className="mb-3 font-headline text-sm uppercase tracking-wider text-diamond-navy">
        {t('product.specifications')}
      </h3>
      <div className="overflow-hidden rounded-lg border border-bone-cream">
        {entries.map(([key, value], i) => (
          <div
            key={key}
            className={`flex items-start justify-between gap-4 px-4 py-3 text-sm ${
              i % 2 === 0 ? 'bg-bone-cream/50' : 'bg-white'
            }`}
          >
            <span className="font-medium capitalize text-dugout-charcoal">
              {key}
            </span>
            <span className="text-right text-tobacco-leather">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
};

/* ------------------------------------------------------------------ */
/*  Product Page                                                       */
/* ------------------------------------------------------------------ */

export function ProductPage() {
  const { t } = useI18n();
  const { params, navigate } = useNavigationStore();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const slug = params.slug;

  /* ---- Fetch data ---- */
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setAllProducts(data.products || []);
        setCategories(data.categories || []);
        setCollections(data.collections || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ---- Derive current product ---- */
  const product = useMemo(
    () => allProducts.find((p) => p.slug === slug) ?? null,
    [allProducts, slug],
  );

  const productType = product ? getProductType(product) : 'other';
  const images = product ? getImages(product) : [];
  const sizes = getSizes(productType);
  const colors = getColors(productType);

  const collection = useMemo(
    () =>
      product?.collectionId
        ? collections.find((c) => c.id === product.collectionId) ?? null
        : null,
    [product, collections],
  );

  /* ---- Related products ---- */
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCategory = allProducts.filter(
      (p) => p.categoryId === product.categoryId && p.id !== product.id,
    );
    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }
    const others = allProducts.filter(
      (p) => p.categoryId !== product.categoryId && p.id !== product.id,
    );
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    return [...sameCategory, ...shuffled].slice(0, 4);
  }, [allProducts, product]);

  /* ---- Reset selections when product changes ---- */
  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);
  }, [slug]);

  /* ---- Handlers ---- */
  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images,
        size: selectedSize ?? undefined,
        color: selectedColor ?? undefined,
      });
    }
    toast.success(`${product.name} ${t('cart.added')}`);
    openCart();
  };

  /* ---- Loading state ---- */
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="animate-pulse">
          {/* Breadcrumb skeleton */}
          <div className="mb-8 flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-4 w-4 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-4 w-4 rounded bg-muted" />
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
          {/* Main skeleton */}
          <div className="grid gap-10 md:grid-cols-2">
            <div className="aspect-square rounded-lg bg-muted" />
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-8 w-3/4 rounded bg-muted" />
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-6 w-24 rounded bg-muted" />
              <div className="h-16 w-full rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---- Not found ---- */
  if (!product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex size-24 items-center justify-center rounded-full bg-bone-cream">
            <PackageOpen className="h-12 w-12 text-tobacco-leather/60" />
          </div>
          <h1 className="font-display text-2xl font-bold text-diamond-navy md:text-3xl">
            {t('product.notFound')}
          </h1>
          <p className="max-w-md text-tobacco-leather">
            {t('product.notFoundDesc')}
          </p>
          <Button
            onClick={() => navigate('shop')}
            className="bg-diamond-navy font-headline uppercase tracking-wider text-white hover:bg-diamond-navy/90"
          >
            {t('product.backToShop')}
          </Button>
        </motion.div>
      </div>
    );
  }

  /* ---- Render ---- */
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      {/* ---- Breadcrumb ---- */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex items-center gap-1.5 text-sm text-tobacco-leather md:mb-10"
        aria-label="Breadcrumb"
      >
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1 transition-colors hover:text-diamond-navy"
        >
          <Home className="h-3.5 w-3.5" />
          <span>{t('product.breadcrumbHome')}</span>
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        <button
          onClick={() => navigate('shop')}
          className="transition-colors hover:text-diamond-navy"
        >
          {t('product.breadcrumbShop')}
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="truncate font-medium text-diamond-navy">
          {product.name}
        </span>
      </motion.nav>

      {/* ---- Main Product Section ---- */}
      <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* ======== Left Column: Image Gallery ======== */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          {/* Main Image */}
          <div className="group relative aspect-square overflow-hidden rounded-lg bg-bone-cream">
            {images.length > 0 && (
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
            <BadgeOverlay badges={product.badges} />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square w-20 overflow-hidden rounded-md border-2 transition-all md:w-24 ${
                    selectedImage === i
                      ? 'border-stadium-crimson ring-1 ring-stadium-crimson/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ======== Right Column: Product Info ======== */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="flex flex-col"
        >
          {/* Collection Badge */}
          {collection && (
            <span className="mb-2 inline-block w-fit rounded-full bg-gold-glove/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-glove">
              {collection.name}
            </span>
          )}

          {/* Product Name */}
          <h1 className="font-display text-2xl font-bold leading-tight text-diamond-navy md:text-3xl">
            {product.name}
          </h1>

          {/* Star Rating */}
          <div className="mt-3">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-headline text-3xl tracking-wide text-diamond-navy">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <>
                <span className="text-lg text-stadium-crimson line-through decoration-stadium-crimson/60">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span className="rounded-md bg-stadium-crimson/10 px-2 py-0.5 text-xs font-semibold text-stadium-crimson">
                  {t('product.save')} {formatPrice(product.compareAtPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Short Description */}
          <p className="mt-4 leading-relaxed text-tobacco-leather">
            {product.description}
          </p>

          <Separator className="my-6 bg-bone-cream" />

          {/* ---- Size Selector ---- */}
          <div className="mb-5">
            <label className="mb-2.5 block text-sm font-semibold uppercase tracking-wider text-dugout-charcoal">
              {t('product.size')}: <span className="font-normal normal-case tracking-normal text-tobacco-leather">{selectedSize || ''}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'border-stadium-crimson bg-stadium-crimson/10 text-diamond-navy'
                      : 'border-bone-cream bg-white text-dugout-charcoal hover:border-tobacco-leather/40'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ---- Color Selector ---- */}
          <div className="mb-6">
            <label className="mb-2.5 block text-sm font-semibold uppercase tracking-wider text-dugout-charcoal">
              {t('product.color')}: <span className="font-normal normal-case tracking-normal text-tobacco-leather">{selectedColor || ''}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                    selectedColor === color
                      ? 'border-stadium-crimson bg-stadium-crimson/10 text-diamond-navy'
                      : 'border-bone-cream bg-white text-dugout-charcoal hover:border-tobacco-leather/40'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* ---- Quantity Selector ---- */}
          <div className="mb-6">
            <label className="mb-2.5 block text-sm font-semibold uppercase tracking-wider text-dugout-charcoal">
              {t('product.quantity')}
            </label>
            <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-bone-cream">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-10 items-center justify-center text-tobacco-leather transition-colors hover:bg-bone-cream hover:text-diamond-navy"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex h-10 w-14 items-center justify-center border-x border-bone-cream text-sm font-semibold text-dugout-charcoal">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="flex size-10 items-center justify-center text-tobacco-leather transition-colors hover:bg-bone-cream hover:text-diamond-navy"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-xs text-tobacco-leather/70">
              {t('product.inStock')} {product.stock}
            </p>
          </div>

          {/* ---- Add to Cart ---- */}
          <Button
            onClick={handleAddToCart}
            className="h-12 w-full gap-2 bg-stadium-crimson font-headline text-base uppercase tracking-widest text-white transition-all hover:bg-stadium-crimson/90 active:scale-[0.98] md:h-14 md:text-lg"
          >
            <ShoppingCart className="h-5 w-5" />
            {t('product.addToCart')}
          </Button>

          {/* ---- Trust Badges ---- */}
          <div className="mt-6">
            <TrustBadges />
          </div>

          {/* ---- Specifications (desktop) ---- */}
          <div className="mt-8 hidden md:block">
            <SpecsTable specsJson={product.specs} />
          </div>

          {/* ---- Accordion (mobile) ---- */}
          <div className="mt-6 md:hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description" className="border-bone-cream">
                <AccordionTrigger className="font-headline text-sm uppercase tracking-wider text-diamond-navy">
                  {t('product.description')}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-relaxed text-tobacco-leather">
                    {product.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specs" className="border-bone-cream">
                <AccordionTrigger className="font-headline text-sm uppercase tracking-wider text-diamond-navy">
                  {t('product.specifications')}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-hidden rounded-lg border border-bone-cream">
                    {(() => {
                      let specs: Record<string, string> = {};
                      try {
                        specs = JSON.parse(product.specs);
                      } catch {
                        return null;
                      }
                      return Object.entries(specs).map(([key, value], i) => (
                        <div
                          key={key}
                          className={`flex items-start justify-between gap-4 px-4 py-2.5 text-sm ${
                            i % 2 === 0 ? 'bg-bone-cream/50' : 'bg-white'
                          }`}
                        >
                          <span className="font-medium capitalize text-dugout-charcoal">{key}</span>
                          <span className="text-right text-tobacco-leather">{value}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>
      </div>

      {/* ---- Related Products ---- */}
      {relatedProducts.length > 0 && (
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 md:mt-24"
        >
          <h2 className="mb-8 font-display text-2xl font-bold text-diamond-navy md:text-3xl">
            {t('product.youMayAlsoLike')}
          </h2>

          {/* Mobile: horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 md:hidden scrollbar-none">
            {relatedProducts.map((rp) => (
              <div key={rp.id} className="w-64 flex-shrink-0">
                <button
                  onClick={() => navigate('product', { slug: rp.slug })}
                  className="w-full text-left"
                >
                  <ProductCard
                    id={rp.id}
                    name={rp.name}
                    price={rp.price}
                    compareAtPrice={rp.compareAtPrice ?? undefined}
                    image={rp.images}
                    rating={rp.rating}
                    reviewCount={rp.reviewCount}
                    badges={rp.badges}
                    slug={rp.slug}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Desktop: 4-col grid */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-6">
            {relatedProducts.map((rp) => (
              <button
                key={rp.id}
                onClick={() => navigate('product', { slug: rp.slug })}
                className="text-left"
              >
                <ProductCard
                  id={rp.id}
                  name={rp.name}
                  price={rp.price}
                  compareAtPrice={rp.compareAtPrice ?? undefined}
                  image={rp.images}
                  rating={rp.rating}
                  reviewCount={rp.reviewCount}
                  badges={rp.badges}
                  slug={rp.slug}
                />
              </button>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
