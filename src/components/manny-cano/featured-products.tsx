'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './product-card';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

interface Product {
  id: number;
  name: string;
  price: number;
  compareAtPrice: number | null;
  images: string;
  rating: number;
  reviewCount: number;
  badges: string;
  slug: string;
}

export function FeaturedProducts() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const all = data.products || [];
        const featured = all
          .sort((a: Product, b: Product) => {
            const aBs = a.badges?.includes('bestseller') ? 1 : 0;
            const bBs = b.badges?.includes('bestseller') ? 1 : 0;
            if (bBs !== aBs) return bBs - aBs;
            return b.rating - a.rating;
          })
          .slice(0, 8);
        setProducts(featured);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="productos" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 flex items-end justify-between md:mb-14">
          <div>
            <p className="mb-2 font-headline text-xs uppercase tracking-[0.25em] text-gold-glove">
              {t('hero.tagline')}
            </p>
            <h2 className="font-display text-3xl font-bold text-diamond-navy md:text-4xl">
              {t('products.title')}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
              {t('products.subtitle')}
            </p>
          </div>

          {/* View All Button - desktop */}
          <button
            onClick={() => navigate('shop')}
            className="hidden items-center gap-2 border-b-2 border-diamond-navy pb-1 font-headline text-xs uppercase tracking-widest text-diamond-navy transition-colors hover:border-stadium-crimson hover:text-stadium-crimson md:flex"
          >
            {t('products.viewAll')}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] rounded-md bg-neutral-100" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-neutral-100" />
                  <div className="h-3 w-1/2 rounded bg-neutral-100" />
                  <div className="h-5 w-1/3 rounded bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
                }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice ?? undefined}
                  image={product.images}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  badges={product.badges}
                  slug={product.slug}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All - mobile only */}
        {!loading && products.length > 0 && (
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-2 border border-diamond-navy px-6 py-3 font-headline text-xs uppercase tracking-widest text-diamond-navy transition-colors hover:bg-diamond-navy hover:text-white"
            >
              {t('products.viewAll')}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
