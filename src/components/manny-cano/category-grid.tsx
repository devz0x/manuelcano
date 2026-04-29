'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

const categorySlugs = [
  { nameKey: 'nav.gloves', image: '/img/cat/guantes.jpg', slug: 'guantes' },
  { nameKey: 'nav.bats', image: '/img/cat/bates.jpg', slug: 'bates' },
  { nameKey: 'nav.catcher', image: '/img/cat/catcher.jpg', slug: 'catcher' },
  { nameKey: 'nav.bags', image: '/img/cat/mochilas.jpg', slug: 'mochilas' },
  { nameKey: 'nav.accessories', image: '/img/cat/accesorios.jpg', slug: 'accesorios' },
  { nameKey: 'nav.balls', image: '/img/cat/pelotas.jpg', slug: 'pelotas' },
];

export function CategoryGrid() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <section className="bg-bone-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-display text-3xl font-bold text-diamond-navy md:text-4xl">
            {t('categories.title')}
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
          {categorySlugs.map((category, i) => (
            <motion.button
              key={category.nameKey}
              onClick={() => navigate('shop', { category: category.slug })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const }}
              className={`group relative cursor-pointer overflow-hidden rounded-lg text-left ${
                i === 0 || i === 5 ? 'aspect-[4/3]' : 'aspect-square'
              }`}
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={t(category.nameKey)}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Clean overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-all duration-300 group-hover:from-black/60" />

              {/* Category Name */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <span className="font-headline text-lg uppercase tracking-wide text-white md:text-xl">
                  {t(category.nameKey)}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
