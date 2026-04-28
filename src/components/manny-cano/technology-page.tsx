'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ChevronRight,
  Eye,
  Droplets,
  Scissors,
  Hand,
  CheckCircle,
  XCircle,
  Cpu,
  MessageSquare,
  Leaf,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                    */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

/* ------------------------------------------------------------------ */
/*  Reusable animated section wrapper                                   */
/* ------------------------------------------------------------------ */

function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function FadeUp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Process step                                                         */
/* ------------------------------------------------------------------ */

function ProcessStep({
  number,
  icon: Icon,
  title,
  description,
  isLast,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <FadeUp className="relative flex flex-col items-center text-center">
      {/* Connector line (desktop) */}
      {!isLast && (
        <div className="absolute left-1/2 top-16 hidden h-[calc(100%-4rem)] w-0.5 -translate-x-1/2 bg-gold-glove/30 lg:block" />
      )}

      {/* Icon circle */}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-glove bg-white shadow-md">
        <Icon className="h-7 w-7 text-tobacco-leather" />
      </div>

      {/* Step number badge */}
      <div className="mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-stadium-crimson">
        <span className="font-headline text-xs font-bold text-white">{number}</span>
      </div>

      {/* Content */}
      <h3 className="mt-3 font-headline text-lg uppercase tracking-wide text-diamond-navy">
        {title}
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-dugout-charcoal/80">{description}</p>
    </FadeUp>
  );
}

/* ------------------------------------------------------------------ */
/*  Innovation pillar                                                   */
/* ------------------------------------------------------------------ */

function InnovationPillar({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <FadeUp className="group rounded-xl border border-gold-glove/20 bg-white/5 p-8 backdrop-blur-sm transition-transform hover:scale-[1.02]">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-glove/20">
        <Icon className="h-7 w-7 text-gold-glove" />
      </div>
      <h3 className="text-center font-headline text-lg uppercase tracking-wide text-white">
        {title}
      </h3>
      <p className="mt-3 text-center text-sm leading-relaxed text-bone-cream/80">{description}</p>
    </FadeUp>
  );
}

/* ------------------------------------------------------------------ */
/*  Technology Page                                                     */
/* ------------------------------------------------------------------ */

export function TechnologyPage() {
  const { t } = useI18n();
  const { navigate } = useNavigationStore();

  const processSteps = [
    {
      icon: Eye,
      title: t('technology.process.step1.title'),
      description: t('technology.process.step1.description'),
    },
    {
      icon: Droplets,
      title: t('technology.process.step2.title'),
      description: t('technology.process.step2.description'),
    },
    {
      icon: Scissors,
      title: t('technology.process.step3.title'),
      description: t('technology.process.step3.description'),
    },
    {
      icon: Hand,
      title: t('technology.process.step4.title'),
      description: t('technology.process.step4.description'),
    },
  ];

  const proFitFeatures = [
    { icon: Hand, title: t('technology.profit.feature1.title'), description: t('technology.profit.feature1.description') },
    { icon: Cpu, title: t('technology.profit.feature2.title'), description: t('technology.profit.feature2.description') },
    { icon: Eye, title: t('technology.profit.feature3.title'), description: t('technology.profit.feature3.description') },
    { icon: Leaf, title: t('technology.profit.feature4.title'), description: t('technology.profit.feature4.description') },
  ];

  const comparisonRows = [
    { feature: t('technology.comparison.rows.leather'), mannycano: true },
    { feature: t('technology.comparison.rows.stitching'), mannycano: true },
    { feature: t('technology.comparison.rows.breakin'), mannycano: true },
    { feature: t('technology.comparison.rows.durability'), mannycano: true },
    { feature: t('technology.comparison.rows.warranty'), mannycano: true },
  ];

  const innovationPillars = [
    { icon: Cpu, title: t('technology.innovation.pillar1.title'), description: t('technology.innovation.pillar1.description') },
    { icon: MessageSquare, title: t('technology.innovation.pillar2.title'), description: t('technology.innovation.pillar2.description') },
    { icon: Leaf, title: t('technology.innovation.pillar3.title'), description: t('technology.innovation.pillar3.description') },
  ];

  return (
    <div className="min-h-screen font-body">
      {/* ============================================================ */}
      {/*  Breadcrumb                                                    */}
      {/* ============================================================ */}
      <div className="border-b border-bone-cream bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-dugout-charcoal/60 lg:px-8">
          <button
            onClick={() => navigate('home')}
            className="transition-colors hover:text-diamond-navy"
          >
            {t('technology.breadcrumb.home')}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-diamond-navy">{t('technology.breadcrumb.technology')}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  1. Hero Section                                               */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden md:min-h-[70vh]">
        <Image
          src="/img/products/mc-pro-glove-detail.jpg"
          alt={t('technology.hero.imageAlt')}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,26,47,0.80)] via-[rgba(10,26,47,0.60)] to-[rgba(10,26,47,0.85)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-headline text-sm uppercase tracking-[0.3em] text-gold-glove"
          >
            {t('technology.hero.label')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            {t('technology.hero.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bone-cream/80 md:text-lg"
          >
            {t('technology.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Leather Curing Process                                     */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-bone-cream py-20 px-4 md:py-28">
        <div className="mx-auto max-w-5xl">
          <FadeUp className="text-center">
            <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
              {t('technology.process.label')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
              {t('technology.process.headline')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-glove" />
          </FadeUp>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.title}
                number={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isLast={index === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  3. Pro-Fit System                                             */}
      {/* ============================================================ */}
      <AnimatedSection className="relative w-full bg-white">
        <div className="flex flex-col lg:flex-row">
          {/* Left Image */}
          <div className="relative w-full min-h-[350px] lg:w-[50%] lg:min-h-[550px]">
            <Image
              src="/img/products/mc-glove-main.jpg"
              alt={t('technology.profit.label')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right Content */}
          <div className="flex w-full flex-col justify-center px-6 py-14 lg:w-[50%] lg:px-16 lg:py-20">
            <FadeUp>
              <Badge variant="outline" className="w-fit border-gold-glove/40 font-headline text-xs uppercase tracking-[0.15em] text-gold-glove">
                {t('technology.profit.label')}
              </Badge>
            </FadeUp>

            <FadeUp>
              <h2 className="mt-5 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
                {t('technology.profit.headline')}
              </h2>
            </FadeUp>

            <FadeUp>
              <p className="mt-5 text-base leading-relaxed text-dugout-charcoal/80">
                {t('technology.profit.body')}
              </p>
            </FadeUp>

            {/* Feature Grid */}
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {proFitFeatures.map((feature) => (
                <FadeUp key={feature.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stadium-crimson/10">
                    <feature.icon className="h-5 w-5 text-stadium-crimson" />
                  </div>
                  <div>
                    <h3 className="font-headline text-sm uppercase tracking-wide text-diamond-navy">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-dugout-charcoal/70">
                      {feature.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  4. Materials Comparison                                       */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-white py-20 px-4 md:py-28">
        <div className="mx-auto max-w-4xl">
          <FadeUp className="text-center">
            <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
              {t('technology.comparison.label')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
              {t('technology.comparison.headline')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-glove" />
          </FadeUp>

          <FadeUp className="mt-12">
            <Card className="overflow-hidden border border-bone-cream shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-diamond-navy hover:bg-diamond-navy">
                    <TableHead className="font-headline text-sm uppercase tracking-wider text-white">
                      {t('technology.comparison.headers.feature')}
                    </TableHead>
                    <TableHead className="text-center font-headline text-sm uppercase tracking-wider text-gold-glove">
                      {t('technology.comparison.headers.mannycano')}
                    </TableHead>
                    <TableHead className="text-center font-headline text-sm uppercase tracking-wider text-white">
                      {t('technology.comparison.headers.standard')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonRows.map((row, index) => (
                    <TableRow
                      key={row.feature}
                      className={index % 2 === 0 ? 'bg-bone-cream/40' : 'bg-white'}
                    >
                      <TableCell className="font-body text-sm text-dugout-charcoal">
                        {row.feature}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="hidden text-sm font-medium text-green-700 sm:inline">
                            {t('technology.comparison.yes')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <XCircle className="h-5 w-5 text-red-400" />
                          <span className="hidden text-sm font-medium text-red-500 sm:inline">
                            {t('technology.comparison.no')}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </FadeUp>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  5. Innovation Lab                                             */}
      {/* ============================================================ */}
      <AnimatedSection className="relative overflow-hidden py-20 px-4 md:py-28">
        <Image
          src="/img/products/mc-gloves-collection-turf.jpg"
          alt="Innovation Lab"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(10,26,47,0.88)]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <FadeUp className="text-center">
            <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
              {t('technology.innovation.label')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              {t('technology.innovation.headline')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-glove" />
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {innovationPillars.map((pillar) => (
              <InnovationPillar
                key={pillar.title}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  6. CTA Section                                                */}
      {/* ============================================================ */}
      <section className="relative bg-stadium-crimson py-20 px-4 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl font-bold text-white md:text-4xl"
          >
            {t('technology.cta.headline')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80"
          >
            {t('technology.cta.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Button
              size="lg"
              onClick={() => navigate('shop')}
              className="bg-white font-headline text-sm uppercase tracking-wider text-stadium-crimson shadow-lg transition-all hover:bg-bone-cream hover:shadow-xl"
            >
              {t('technology.cta.button')}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
