'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

const equipmentItems = [
  {
    image: '/img/products/mc-glove-main.jpg',
    labelKey: 'nav.gloves',
    slug: 'guantes',
  },
  {
    image: '/img/products/mc-backpack.jpg',
    labelKey: 'nav.bags',
    slug: 'mochilas',
  },
  {
    image: '/img/products/mc-cleat-black.jpg',
    labelKey: 'nav.accessories',
    slug: 'accesorios',
  },
  {
    image: '/img/products/mc-backpack-red.jpg',
    labelKey: 'nav.bags',
    slug: 'mochilas',
  },
  {
    image: '/img/products/mc-catcher-mitt-blue.jpg',
    labelKey: 'nav.catcher',
    slug: 'catcher',
  },
  {
    image: '/img/products/mc-backpack-black.jpg',
    labelKey: 'nav.bags',
    slug: 'mochilas',
  },
];

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

export function EquipmentShowcase() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="bg-diamond-navy py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <p className="font-headline text-xs uppercase tracking-[0.3em] text-gold-glove">
            {t('hero.tagline')}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            {t('products.title')}
          </h2>
        </div>

        {/* Product Showcase Strip — 6 items: 3x2 on mobile, 6x1 on desktop */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4"
        >
          {equipmentItems.map((item, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              onClick={() => navigate('shop', { category: item.slug })}
              className="group relative aspect-square overflow-hidden rounded-lg bg-bone-cream/10"
            >
              <Image
                src={item.image}
                alt={t(item.labelKey)}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-diamond-navy/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block bg-stadium-crimson px-3 py-1.5 text-center font-headline text-[10px] uppercase tracking-wider text-white md:px-4 md:py-2 md:text-xs">
                  {t(item.labelKey)}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
