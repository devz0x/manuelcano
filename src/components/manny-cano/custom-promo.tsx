'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

export function CustomPromo() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <section
      id="custom"
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/img/custom/glove-design-tool.jpg)',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[rgba(10,26,47,0.75)]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' as const }}
        className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center"
      >
        {/* Label */}
        <p className="font-headline text-sm uppercase tracking-[0.3em] text-gold-glove">
          {t('custom.label')}
        </p>

        {/* Headline */}
        <h2 className="mt-6 font-display text-4xl font-bold text-white md:text-5xl">
          {t('custom.headline')}
        </h2>

        {/* Body */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-bone-cream/80">
          {t('custom.body')}
        </p>

        {/* Price Range */}
        <p className="mt-6 font-headline text-xl text-gold-glove">
          {t('custom.price')}
        </p>

        {/* CTA Button */}
        <motion.button
          onClick={() => navigate('configurator')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-block bg-stadium-crimson px-10 py-4 font-headline uppercase tracking-wider text-white transition-colors hover:bg-stadium-crimson/90"
        >
          {t('custom.cta')}
        </motion.button>
      </motion.div>
    </section>
  );
}
