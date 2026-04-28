'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

export function HeroSection() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/img/hero/stadium-night.jpg"
        alt="Estadio de béisbol bajo las luces nocturnas"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,26,47,0.85)] to-[rgba(10,26,47,0.4)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-headline text-sm uppercase tracking-[0.3em] text-gold-glove"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 font-display text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
        >
          {t('hero.headline')}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-bone-cream/80 md:text-xl"
        >
          {t('hero.subheadline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => navigate('shop')}
            className="bg-stadium-crimson px-8 py-3 font-headline uppercase tracking-wider text-white transition-colors hover:bg-stadium-crimson/90"
          >
            {t('hero.cta1')}
          </button>
          <a
            href="#custom"
            className="border-2 border-white/50 px-8 py-3 font-headline uppercase tracking-wider text-white transition-colors hover:border-white"
          >
            {t('hero.cta2')}
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 pt-2"
        >
          <div className="h-2 w-1 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
