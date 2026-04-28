'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useI18n } from '@/lib/i18n';

const testimonialKeyMap = [
  { quoteKey: 'testimonials.quote1', authorKey: 'testimonials.author1', roleKey: 'testimonials.role1' },
  { quoteKey: 'testimonials.quote2', authorKey: 'testimonials.author2', roleKey: 'testimonials.role2' },
  { quoteKey: 'testimonials.quote3', authorKey: 'testimonials.author3', roleKey: 'testimonials.role3' },
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

export function Testimonials() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-bone-cream py-16 px-6 sm:py-20" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="font-display text-3xl font-bold text-diamond-navy text-center md:text-4xl">
          {t('testimonials.title')}
        </h2>

        {/* Gold Separator */}
        <div className="mx-auto mt-6 h-[2px] w-16 bg-gold-glove" />

        {/* Testimonial Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {testimonialKeyMap.map((testimonial) => (
            <motion.div
              key={testimonial.authorKey}
              variants={cardVariants}
              className="rounded-lg bg-white p-8 shadow-sm"
            >
              {/* Quote Mark */}
              <span className="font-display text-6xl leading-none text-stadium-crimson">
                &ldquo;
              </span>

              {/* Quote Text */}
              <p className="mt-2 text-base italic leading-relaxed text-dugout-charcoal/80">
                {t(testimonial.quoteKey)}
              </p>

              {/* Divider */}
              <div className="my-6 h-[1px] bg-gold-glove/20" />

              {/* Author */}
              <p className="font-headline text-sm uppercase tracking-wider text-diamond-navy">
                {t(testimonial.authorKey)}
              </p>

              {/* Role */}
              <p className="mt-1 text-sm text-tobacco-leather">
                {t(testimonial.roleKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
