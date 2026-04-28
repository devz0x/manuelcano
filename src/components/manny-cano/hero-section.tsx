'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

export function HeroSection() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden md:min-h-screen">
      {/* Background Image */}
      <Image
        src="/img/hero/stadium-night.jpg"
        alt="Baseball stadium under night lights"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Clean gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,26,47,0.8)] via-[rgba(10,26,47,0.45)] to-[rgba(10,26,47,0.65)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-headline text-xs uppercase tracking-[0.35em] text-gold-glove sm:text-sm"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {t('hero.headline')}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-bone-cream/70 sm:text-lg"
        >
          {t('hero.subheadline')}
        </motion.p>

        {/* CTA Buttons - minimal, refined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={() => navigate('shop')}
            className="bg-white px-8 py-3 text-sm font-semibold tracking-wide text-diamond-navy transition-all hover:bg-bone-cream"
          >
            {t('hero.cta1')}
          </button>
          <button
            onClick={() => navigate('configurator')}
            className="border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/10"
          >
            {t('hero.cta2')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
