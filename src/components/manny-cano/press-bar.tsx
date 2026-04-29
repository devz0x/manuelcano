'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export function PressBar() {
  const { t } = useI18n();

  const outlets = [
    'ESPN Deportes',
    'MLB Network Latino',
    'Diario Libre',
    'Listín Diario',
    'El Caribe',
  ];

  return (
    <section className="border-y border-bone-cream bg-white py-10 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl"
      >
        <p className="mb-8 text-center font-headline text-xs uppercase tracking-[0.3em] text-tobacco-leather/60">
          {t('press.title')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {outlets.map((outlet, i) => (
            <motion.span
              key={outlet}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="font-headline text-base uppercase tracking-wider text-dugout-charcoal/30 sm:text-lg"
            >
              {outlet}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
