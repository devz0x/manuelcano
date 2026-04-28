'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

const categorySlugs = [
  { nameKey: 'nav.gloves', image: '/img/cat/guantes.jpg', slug: 'guantes' },
  { nameKey: 'nav.bats', image: '/img/cat/bates.jpg', slug: 'bates' },
  { nameKey: 'nav.balls', image: '/img/cat/pelotas.jpg', slug: 'pelotas' },
  { nameKey: 'nav.catcher', image: '/img/cat/catcher.jpg', slug: 'catcher' },
  { nameKey: 'nav.bags', image: '/img/cat/mochilas.jpg', slug: 'mochilas' },
  { nameKey: 'nav.accessories', image: '/img/cat/accesorios.jpg', slug: 'accesorios' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function CategoryGrid() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl uppercase tracking-wider text-diamond-navy">
            {t('categories.title')}
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-gold-glove" />
        </div>

        {/* Category Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3"
        >
          {categorySlugs.map((category) => (
            <motion.button
              key={category.nameKey}
              onClick={() => navigate('shop', { category: category.slug })}
              variants={cardVariants}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg text-left"
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={t(category.nameKey)}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/50 group-hover:via-black/10" />

              {/* Category Name */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <span className="font-headline text-xl uppercase text-white md:text-2xl">
                  {t(category.nameKey)}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
