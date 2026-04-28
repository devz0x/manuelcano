'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Scissors, Target, Award } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const featureIcons = [Shield, Scissors, Target, Award];

const featureKeyMap = [
  { titleKey: 'tech.feature1Title', descKey: 'tech.feature1Desc' },
  { titleKey: 'tech.feature2Title', descKey: 'tech.feature2Desc' },
  { titleKey: 'tech.feature3Title', descKey: 'tech.feature3Desc' },
  { titleKey: 'tech.feature4Title', descKey: 'tech.feature4Desc' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function TechStrip() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-16 px-6 sm:py-20" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="font-headline text-2xl uppercase tracking-wider text-diamond-navy text-center sm:text-3xl">
          {t('tech.title')}
        </h2>

        {/* Gold Separator */}
        <div className="mx-auto mt-6 h-[2px] w-16 bg-gold-glove" />

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8 sm:mt-14"
        >
          {featureKeyMap.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.div
                key={feature.titleKey}
                variants={cardVariants}
                className="text-center"
              >
                {/* Icon */}
                <div className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-full bg-bone-cream">
                  <Icon className="h-8 w-8 text-tobacco-leather" />
                </div>

                {/* Title */}
                <h3 className="mt-4 font-headline text-xs uppercase tracking-wider text-diamond-navy sm:text-sm">
                  {t(feature.titleKey)}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-dugout-charcoal/70 sm:text-sm">
                  {t(feature.descKey)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
