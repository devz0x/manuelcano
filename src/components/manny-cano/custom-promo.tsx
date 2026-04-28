'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function CustomPromo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="custom"
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden"
      ref={ref}
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
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center"
      >
        {/* Label */}
        <p className="font-headline text-sm uppercase tracking-[0.3em] text-gold-glove">
          Custom Pro-Fit
        </p>

        {/* Headline */}
        <h2 className="mt-6 font-display text-4xl font-bold text-white md:text-5xl">
          Diseña tu guante. Pieza por pieza.
        </h2>

        {/* Body */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-bone-cream/80">
          Más de 40 partes personalizables: cuero, web, palma, lacing, color,
          bordados. Entrega en 6-8 semanas. Construido para tus manos.
        </p>

        {/* Price Range */}
        <p className="mt-6 font-headline text-xl text-gold-glove">
          RD$8,500 - RD$22,000
        </p>

        {/* CTA Button */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-block bg-stadium-crimson px-10 py-4 font-headline uppercase tracking-wider text-white transition-colors hover:bg-stadium-crimson/90"
        >
          Empezar diseño
        </motion.a>
      </motion.div>
    </section>
  );
}
