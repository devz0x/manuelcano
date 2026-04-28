'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, Clock, Scissors, Hand, Shield, Heart, Users, Award } from 'lucide-react';
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
/*  Timeline milestone                                                  */
/* ------------------------------------------------------------------ */

function TimelineMilestone({
  year,
  title,
  description,
  imageSrc,
  imageAlt,
  imageSide,
}: {
  year: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imageSide?: 'left' | 'right';
}) {
  return (
    <FadeUp className="relative flex items-start gap-6 md:gap-10">
      {/* Left content */}
      <div
        className={`flex-1 ${
          imageSide === 'left' ? 'hidden md:block md:text-right md:pr-8' : 'order-1 md:order-none'
        }`}
      >
        {imageSide === 'left' ? (
          <>
            <span className="font-headline text-3xl text-stadium-crimson md:text-4xl">{year}</span>
            <h3 className="mt-2 font-headline text-lg uppercase tracking-wide text-diamond-navy">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-dugout-charcoal/80">{description}</p>
          </>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      {/* Image (side) */}
      {imageSrc && imageAlt && (
        <div
          className={`absolute top-0 w-28 shrink-0 overflow-hidden rounded-lg shadow-lg md:w-36 lg:w-44 ${
            imageSide === 'left' ? '-left-10 md:relative md:left-0 md:-ml-52 lg:-ml-64' : '-right-10 md:relative md:right-0 md:-mr-52 lg:-mr-64'
          } hidden md:block`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={176}
            height={220}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Center dot + line */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="h-4 w-4 rounded-full border-2 border-gold-glove bg-bone-cream" />
      </div>

      {/* Right content */}
      <div
        className={`flex-1 ${
          imageSide === 'right' ? 'hidden md:block md:pl-8' : 'order-0 md:order-none'
        }`}
      >
        {imageSide === 'right' ? (
          <>
            <span className="font-headline text-3xl text-stadium-crimson md:text-4xl">{year}</span>
            <h3 className="mt-2 font-headline text-lg uppercase tracking-wide text-diamond-navy">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-dugout-charcoal/80">{description}</p>
          </>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      {/* Mobile layout – always show content to the right of the dot */}
      <div className="absolute left-6 top-0 ml-4 md:hidden">
        <span className="font-headline text-2xl text-stadium-crimson">{year}</span>
        <h3 className="mt-1 font-headline text-base uppercase tracking-wide text-diamond-navy">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-dugout-charcoal/80">{description}</p>
      </div>
    </FadeUp>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature card                                                        */
/* ------------------------------------------------------------------ */

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <FadeUp className="group rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-transform hover:scale-[1.02]">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-glove/20">
        <Icon className="h-7 w-7 text-gold-glove" />
      </div>
      <h3 className="text-center font-headline text-lg uppercase tracking-wide text-white">
        {title}
      </h3>
      <p className="mt-2 text-center text-sm leading-relaxed text-bone-cream/80">{description}</p>
    </FadeUp>
  );
}

/* ------------------------------------------------------------------ */
/*  Value card                                                          */
/* ------------------------------------------------------------------ */

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <FadeUp className="rounded-xl border border-bone-cream bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-stadium-crimson/10">
        <Icon className="h-6 w-6 text-stadium-crimson" />
      </div>
      <h3 className="font-headline text-xl uppercase tracking-wide text-diamond-navy">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-dugout-charcoal/80">{description}</p>
    </FadeUp>
  );
}

/* ------------------------------------------------------------------ */
/*  About Page                                                          */
/* ------------------------------------------------------------------ */

export function AboutPage() {
  const { t } = useI18n();
  const { navigate } = useNavigationStore();

  const milestones = [
    {
      year: t('about.timeline.1956.year'),
      title: t('about.timeline.1956.title'),
      description: t('about.timeline.1956.description'),
    },
    {
      year: t('about.timeline.1985.year'),
      title: t('about.timeline.1985.title'),
      description: t('about.timeline.1985.description'),
      imageSrc: '/img/about/dominican-baseball-history.jpg',
      imageAlt: t('about.timeline.1985.imageAlt'),
      imageSide: 'left' as const,
    },
    {
      year: t('about.timeline.2010.year'),
      title: t('about.timeline.2010.title'),
      description: t('about.timeline.2010.description'),
      imageSrc: '/img/about/leather-sourcing.jpg',
      imageAlt: t('about.timeline.2010.imageAlt'),
      imageSide: 'right' as const,
    },
    {
      year: t('about.timeline.2019.year'),
      title: t('about.timeline.2019.title'),
      description: t('about.timeline.2019.description'),
    },
    {
      year: t('about.timeline.2024.year'),
      title: t('about.timeline.2024.title'),
      description: t('about.timeline.2024.description'),
    },
  ];

  const craftFeatures = [
    { icon: Clock, title: t('about.craft.feature1.title'), description: t('about.craft.feature1.description') },
    { icon: Scissors, title: t('about.craft.feature2.title'), description: t('about.craft.feature2.description') },
    { icon: Hand, title: t('about.craft.feature3.title'), description: t('about.craft.feature3.description') },
  ];

  const values = [
    { icon: Award, title: t('about.values.authenticity.title'), description: t('about.values.authenticity.description') },
    { icon: Shield, title: t('about.values.quality.title'), description: t('about.values.quality.description') },
    { icon: Heart, title: t('about.values.community.title'), description: t('about.values.community.description') },
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
            {t('about.breadcrumb.home')}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-diamond-navy font-medium">{t('about.breadcrumb.about')}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  1. Hero Section                                               */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden md:min-h-[70vh]">
        <Image
          src="/img/products/mc-gloves-collection-flat.jpg"
          alt={t('about.hero.imageAlt')}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,26,47,0.75)] via-[rgba(10,26,47,0.55)] to-[rgba(10,26,47,0.80)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-headline text-sm uppercase tracking-[0.3em] text-gold-glove"
          >
            {t('about.hero.label')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            {t('about.hero.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bone-cream/80 md:text-lg"
          >
            {t('about.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Mission Section                                            */}
      {/* ============================================================ */}
      <AnimatedSection className="relative w-full bg-white">
        <div className="flex flex-col lg:flex-row">
          {/* Left Image */}
          <div className="relative w-full min-h-[350px] lg:w-[50%] lg:min-h-[550px]">
            <Image
              src="/img/products/mc-gloves-pair-grass.jpg"
              alt={t('about.mission.imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right Content */}
          <div className="flex w-full flex-col justify-center px-6 py-14 lg:w-[50%] lg:px-16 lg:py-20">
            <FadeUp>
              <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
                {t('about.mission.label')}
              </p>
            </FadeUp>

            <FadeUp>
              <h2 className="mt-4 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
                {t('about.mission.headline')}
              </h2>
            </FadeUp>

            <FadeUp>
              <p className="mt-6 text-base leading-relaxed text-dugout-charcoal/80">
                {t('about.mission.body')}
              </p>
            </FadeUp>

            {/* Stats Row */}
            <FadeUp>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gold-glove/20 pt-8">
                <div>
                  <p className="font-headline text-2xl font-bold text-stadium-crimson md:text-3xl lg:text-4xl">
                    {t('about.mission.stat1.value')}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-tobacco-leather sm:text-sm">
                    {t('about.mission.stat1.label')}
                  </p>
                </div>
                <div>
                  <p className="font-headline text-2xl font-bold text-stadium-crimson md:text-3xl lg:text-4xl">
                    {t('about.mission.stat2.value')}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-tobacco-leather sm:text-sm">
                    {t('about.mission.stat2.label')}
                  </p>
                </div>
                <div>
                  <p className="font-headline text-2xl font-bold text-stadium-crimson md:text-3xl lg:text-4xl">
                    {t('about.mission.stat3.value')}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-tobacco-leather sm:text-sm">
                    {t('about.mission.stat3.label')}
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  3. Timeline Section                                           */}
      {/* ============================================================ */}
      <AnimatedSection id="timeline" className="bg-bone-cream py-20 px-4 md:py-28">
        <div className="mx-auto max-w-5xl">
          <FadeUp className="text-center">
            <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
              {t('about.timeline.label')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
              {t('about.timeline.headline')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-glove" />
          </FadeUp>

          {/* Timeline */}
          <div className="relative mt-14">
            {/* Vertical line (hidden on mobile) */}
            <div className="absolute left-[7px] top-0 hidden h-full w-0.5 bg-gold-glove md:left-1/2 md:block md:-translate-x-px" />
            {/* Vertical line (mobile) */}
            <div className="absolute left-[7px] top-0 block h-full w-0.5 bg-gold-glove md:hidden" />

            <div className="flex flex-col gap-12 md:gap-16">
              {milestones.map((m) => (
                <TimelineMilestone
                  key={m.year}
                  year={m.year}
                  title={m.title}
                  description={m.description}
                  imageSrc={m.imageSrc}
                  imageAlt={m.imageAlt}
                  imageSide={m.imageSide}
                />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  4. Craftsmanship Section                                      */}
      {/* ============================================================ */}
      <AnimatedSection className="relative overflow-hidden py-20 px-4 md:py-28">
        <Image
          src="/img/products/mc-glove-main.jpg"
          alt={t('about.craft.imageAlt')}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(10,26,47,0.82)]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <FadeUp className="text-center">
            <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
              {t('about.craft.label')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              {t('about.craft.headline')}
            </h2>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {craftFeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  5. Values Section                                             */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-white py-20 px-4 md:py-28">
        <div className="mx-auto max-w-5xl">
          <FadeUp className="text-center">
            <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
              {t('about.values.label')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
              {t('about.values.headline')}
            </h2>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((v) => (
              <ValueCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                description={v.description}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  6. Team Section                                               */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-bone-cream py-20 px-4 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12">
            {/* Team Photo */}
            <FadeUp className="relative h-[340px] w-full shrink-0 overflow-hidden rounded-xl shadow-lg md:h-[420px] md:w-[45%]">
              <Image
                src="/img/products/mc-catcher-mitt-blue.jpg"
                alt={t('about.team.imageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </FadeUp>

            {/* Team Text */}
            <div className="text-center md:w-[55%] md:text-left">
              <FadeUp>
                <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
                  {t('about.team.label')}
                </p>
              </FadeUp>
              <FadeUp>
                <h2 className="mt-3 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
                  {t('about.team.headline')}
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-5 text-base leading-relaxed text-dugout-charcoal/80">
                  {t('about.team.body')}
                </p>
              </FadeUp>
              <FadeUp>
                <p className="mt-4 text-base leading-relaxed text-dugout-charcoal/80">
                  {t('about.team.body2')}
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  7. CTA Section                                                */}
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
            {t('about.cta.headline')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80"
          >
            {t('about.cta.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <button
              onClick={() => navigate('shop')}
              className="inline-block bg-white px-10 py-3.5 font-headline text-sm uppercase tracking-wider text-stadium-crimson shadow-lg transition-all hover:bg-bone-cream hover:shadow-xl"
            >
              {t('about.cta.button')}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
