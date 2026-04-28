'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function PressBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const outlets = [
    'ESPN Deportes',
    'MLB Network Latino',
    'Diario Libre',
    'Listín Diario',
    'El Caribe',
  ];

  return (
    <section className="border-y border-bone-cream bg-white py-10 px-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl"
      >
        <p className="mb-8 text-center font-headline text-xs uppercase tracking-[0.3em] text-tobacco-leather/60">
          Como se ha visto en
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {outlets.map((outlet, i) => (
            <motion.span
              key={outlet}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
