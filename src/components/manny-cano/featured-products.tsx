'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function FeaturedProducts() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        // Show up to 8 featured products on homepage (prioritize bestsellers)
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

  return (
    <section id="productos" className="bg-bone-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-diamond-navy">
            {t('products.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-tobacco-leather">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-lg bg-muted" />
                <div className="mt-3 space-y-2 p-1">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                  <div className="h-6 w-1/3 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
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

        {/* View All Link */}
        {!loading && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => navigate('shop')}
              className="font-headline uppercase tracking-wider text-stadium-crimson underline-offset-4 transition-colors hover:text-stadium-crimson/80 hover:underline"
            >
              {t('products.viewAll')}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
