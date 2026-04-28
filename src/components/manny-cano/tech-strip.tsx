'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Scissors, Target, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Cuero Premium Curado',
    description: '12 meses de curado natural antes de cortar.',
  },
  {
    icon: Scissors,
    title: 'Costura Doble Reforzada',
    description: 'Cada lacing pasa por 4 controles de tensión.',
  },
  {
    icon: Target,
    title: 'Pro-Fit System',
    description:
      'Patrones ajustados a la mano dominicana, ideales para el jugador latino.',
  },
  {
    icon: Award,
    title: 'Garantía Pro 1 Año',
    description: 'Defectos de fábrica cubiertos. Sin letra chica.',
  },
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
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function TechStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-16 px-6 sm:py-20" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="font-headline text-2xl uppercase tracking-wider text-diamond-navy text-center sm:text-3xl">
          Por qué Manny Cano se siente diferente
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
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="text-center"
            >
              {/* Icon */}
              <div className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-full bg-bone-cream">
                <feature.icon className="h-8 w-8 text-tobacco-leather" />
              </div>

              {/* Title */}
              <h3 className="mt-4 font-headline text-xs uppercase tracking-wider text-diamond-navy sm:text-sm">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-relaxed text-dugout-charcoal/70 sm:text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
