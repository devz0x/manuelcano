'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

const equipmentItems = [
  {
    image: '/img/products/mc-backpack.png',
    labelKey: 'nav.bags',
    slug: 'mochilas',
  },
  {
    image: '/img/products/mc-cleat-black.png',
    labelKey: 'nav.accessories',
    slug: 'accesorios',
  },
  {
    image: '/img/products/mc-backpack-red.png',
    labelKey: 'nav.bags',
    slug: 'mochilas',
  },
  {
    image: '/img/products/mc-backpack-black.png',
    labelKey: 'nav.bags',
    slug: 'mochilas',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

        {/* Product Showcase Strip */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
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
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-diamond-navy/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block bg-stadium-crimson px-4 py-2 text-center font-headline text-xs uppercase tracking-wider text-white">
                  {t('products.viewAll')}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
