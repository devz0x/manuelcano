'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ChevronRight,
  Instagram,
  Twitter,
  Quote,
  Trophy,
  Users,
  Globe,
  Award,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  Heart,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
/*  Athlete Card                                                        */
/* ------------------------------------------------------------------ */

const AVATAR_COLORS = [
  'bg-stadium-crimson',
  'bg-diamond-navy',
  'bg-tobacco-leather',
  'bg-gold-glove text-diamond-navy',
  'bg-dugout-charcoal',
  'bg-stadium-crimson/80',
];

function AthleteCard({
  index,
  name,
  position,
  positionLabel,
  team,
  quote,
  equipment,
  avatarColor,
}: {
  index: number;
  name: string;
  position: string;
  positionLabel: string;
  team: string;
  quote: string;
  equipment: string;
  avatarColor: string;
}) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .filter((_, i) => i < 2)
    .join('');

  return (
    <FadeUp>
      <Card className="group h-full overflow-hidden border-bone-cream/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="p-6">
          {/* Avatar + Info */}
          <div className="flex items-start gap-4">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${avatarColor} font-display text-xl font-bold text-white shadow-md`}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-headline text-lg uppercase tracking-wide text-diamond-navy">
                {name}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="border-gold-glove/30 bg-gold-glove/10 font-headline text-xs text-tobacco-leather"
                >
                  {position}
                </Badge>
                <span className="text-xs text-dugout-charcoal/60">{positionLabel}</span>
              </div>
              <p className="mt-1 text-xs text-dugout-charcoal/70">{team}</p>
            </div>
          </div>

          <Separator className="my-4 bg-bone-cream" />

          {/* Quote */}
          <p className="text-sm leading-relaxed italic text-dugout-charcoal/80">{quote}</p>

          {/* Equipment */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-headline uppercase tracking-wider text-gold-glove">
                {positionLabel}
              </p>
              <p className="mt-0.5 text-xs font-medium text-diamond-navy">{equipment}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-dugout-charcoal/40 transition-colors hover:bg-bone-cream hover:text-diamond-navy"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-dugout-charcoal/40 transition-colors hover:bg-bone-cream hover:text-diamond-navy"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeUp>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Banner                                                        */
/* ------------------------------------------------------------------ */

function StatItem({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gold-glove/15">
        <Icon className="h-6 w-6 text-gold-glove" />
      </div>
      <p className="font-headline text-3xl font-bold text-white md:text-4xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-bone-cream/70 sm:text-sm">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Athletes Page                                                       */
/* ------------------------------------------------------------------ */

export function AthletesPage() {
  const { t } = useI18n();
  const { navigate } = useNavigationStore();

  const athletes = [
    {
      name: t('athletes.athlete1.name'),
      position: t('athletes.athlete1.position'),
      positionLabel: t(`athletes.positions.${t('athletes.athlete1.position')}`),
      team: t('athletes.athlete1.team'),
      quote: t('athletes.athlete1.quote'),
      equipment: t('athletes.athlete1.equipment'),
    },
    {
      name: t('athletes.athlete2.name'),
      position: t('athletes.athlete2.position'),
      positionLabel: t(`athletes.positions.${t('athletes.athlete2.position')}`),
      team: t('athletes.athlete2.team'),
      quote: t('athletes.athlete2.quote'),
      equipment: t('athletes.athlete2.equipment'),
    },
    {
      name: t('athletes.athlete3.name'),
      position: t('athletes.athlete3.position'),
      positionLabel: t(`athletes.positions.${t('athletes.athlete3.position')}`),
      team: t('athletes.athlete3.team'),
      quote: t('athletes.athlete3.quote'),
      equipment: t('athletes.athlete3.equipment'),
    },
    {
      name: t('athletes.athlete4.name'),
      position: t('athletes.athlete4.position'),
      positionLabel: t(`athletes.positions.${t('athletes.athlete4.position')}`),
      team: t('athletes.athlete4.team'),
      quote: t('athletes.athlete4.quote'),
      equipment: t('athletes.athlete4.equipment'),
    },
    {
      name: t('athletes.athlete5.name'),
      position: t('athletes.athlete5.position'),
      positionLabel: t(`athletes.positions.${t('athletes.athlete5.position')}`),
      team: t('athletes.athlete5.team'),
      quote: t('athletes.athlete5.quote'),
      equipment: t('athletes.athlete5.equipment'),
    },
    {
      name: t('athletes.athlete6.name'),
      position: t('athletes.athlete6.position'),
      positionLabel: t(`athletes.positions.${t('athletes.athlete6.position')}`),
      team: t('athletes.athlete6.team'),
      quote: t('athletes.athlete6.quote'),
      equipment: t('athletes.athlete6.equipment'),
    },
  ];

  const stats = [
    { icon: Users, value: t('athletes.stats.totalAthletes.value'), label: t('athletes.stats.totalAthletes.label') },
    { icon: Trophy, value: t('athletes.stats.mlbAffiliates.value'), label: t('athletes.stats.mlbAffiliates.label') },
    { icon: Globe, value: t('athletes.stats.countries.value'), label: t('athletes.stats.countries.label') },
    { icon: Award, value: t('athletes.stats.championships.value'), label: t('athletes.stats.championships.label') },
  ];

  const spotlightStats = [
    { value: t('athletes.spotlight.stats.avg.value'), label: t('athletes.spotlight.stats.avg.label') },
    { value: t('athletes.spotlight.stats.hr.value'), label: t('athletes.spotlight.stats.hr.label') },
    { value: t('athletes.spotlight.stats.rbi.value'), label: t('athletes.spotlight.stats.rbi.label') },
    { value: t('athletes.spotlight.stats.sb.value'), label: t('athletes.spotlight.stats.sb.label') },
  ];

  const spotlightEquipment = [
    t('athletes.spotlight.equipment.glove'),
    t('athletes.spotlight.equipment.bat'),
    t('athletes.spotlight.equipment.bag'),
    t('athletes.spotlight.equipment.cleats'),
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
            {t('athletes.breadcrumb.home')}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-diamond-navy">{t('athletes.breadcrumb.athletes')}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  1. Hero Section                                               */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden md:min-h-[70vh]">
        <Image
          src="/img/products/mc-gloves-collection-flat.jpg"
          alt={t('athletes.hero.imageAlt')}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,26,47,0.78)] via-[rgba(10,26,47,0.58)] to-[rgba(10,26,47,0.82)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-headline text-sm uppercase tracking-[0.3em] text-gold-glove"
          >
            {t('athletes.hero.label')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            {t('athletes.hero.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bone-cream/80 md:text-lg"
          >
            {t('athletes.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Featured Athletes Grid                                     */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-bone-cream py-20 px-4 md:py-28">
        <div className="mx-auto max-w-7xl">
          <FadeUp className="text-center">
            <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
              {t('athletes.hero.label')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
              {t('athletes.featured')}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-dugout-charcoal/70 md:text-base">
              {t('athletes.featuredSubtitle')}
            </p>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-glove" />
          </FadeUp>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {athletes.map((athlete, i) => (
              <AthleteCard
                key={athlete.name}
                index={i}
                name={athlete.name}
                position={athlete.position}
                positionLabel={athlete.positionLabel}
                team={athlete.team}
                quote={athlete.quote}
                equipment={athlete.equipment}
                avatarColor={AVATAR_COLORS[i]}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  3. Stats Banner                                               */}
      {/* ============================================================ */}
      <section className="bg-diamond-navy py-16 px-4 md:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <StatItem
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. Athlete Spotlight                                          */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-white py-20 px-4 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeUp className="text-center">
            <Badge
              variant="outline"
              className="border-gold-glove/30 font-headline text-xs uppercase tracking-[0.2em] text-gold-glove"
            >
              {t('athletes.spotlight.label')}
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
              {t('athletes.spotlight.headline')}
            </h2>
          </FadeUp>

          <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-16">
            {/* Left – Image area */}
            <FadeUp className="relative w-full shrink-0 overflow-hidden rounded-xl shadow-lg lg:w-[45%]">
              <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-diamond-navy to-dugout-charcoal">
                <Image
                  src="/img/products/mc-glove-main.jpg"
                  alt={t('athletes.spotlight.headline')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              {/* Position badge overlay */}
              <div className="absolute bottom-4 left-4">
                <Badge className="border-0 bg-stadium-crimson px-3 py-1 font-headline text-xs uppercase tracking-wider text-white shadow-md">
                  {t('athletes.spotlight.position')}
                </Badge>
              </div>
            </FadeUp>

            {/* Right – Content */}
            <div className="flex flex-col justify-center lg:w-[55%]">
              <FadeUp>
                <p className="text-xs text-dugout-charcoal/60">{t('athletes.spotlight.team')}</p>
              </FadeUp>

              <FadeUp>
                <div className="mt-4 flex items-start gap-3">
                  <Quote className="mt-1 h-6 w-6 shrink-0 text-gold-glove" />
                  <blockquote className="text-lg leading-relaxed italic text-dugout-charcoal/90 md:text-xl">
                    {t('athletes.spotlight.quote')}
                  </blockquote>
                </div>
              </FadeUp>

              <FadeUp>
                <p className="mt-6 text-sm leading-relaxed text-dugout-charcoal/70">
                  {t('athletes.spotlight.bio')}
                </p>
              </FadeUp>

              {/* Season Stats */}
              <FadeUp>
                <div className="mt-8 grid grid-cols-4 gap-4 rounded-xl bg-bone-cream p-6">
                  {spotlightStats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-headline text-2xl font-bold text-stadium-crimson md:text-3xl">
                        {s.value}
                      </p>
                      <p className="mt-1 text-[10px] font-headline uppercase tracking-wider text-tobacco-leather md:text-xs">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* Equipment List */}
              <FadeUp>
                <div className="mt-8">
                  <h4 className="mb-3 font-headline text-sm uppercase tracking-wider text-diamond-navy">
                    {t('athletes.spotlight.equipment.title')}
                  </h4>
                  <ul className="space-y-2">
                    {spotlightEquipment.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-dugout-charcoal/80">
                        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-glove" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              {/* Social links */}
              <FadeUp>
                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-dugout-charcoal/20 gap-2 text-xs text-dugout-charcoal hover:border-diamond-navy hover:bg-diamond-navy hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-dugout-charcoal/20 gap-2 text-xs text-dugout-charcoal hover:border-diamond-navy hover:bg-diamond-navy hover:text-white"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Button>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  5. Cantera Program                                            */}
      {/* ============================================================ */}
      <AnimatedSection className="relative overflow-hidden py-20 px-4 md:py-28">
        <Image
          src="/img/products/mc-gloves-pair-grass.jpg"
          alt={t('athletes.cantera.headline')}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(10,26,47,0.85)]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeUp>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-glove/20">
              <GraduationCap className="h-7 w-7 text-gold-glove" />
            </div>
          </FadeUp>

          <FadeUp>
            <Badge
              variant="outline"
              className="mx-auto border-gold-glove/30 font-headline text-xs uppercase tracking-[0.2em] text-gold-glove"
            >
              {t('athletes.cantera.label')}
            </Badge>
          </FadeUp>

          <FadeUp>
            <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
              {t('athletes.cantera.headline')}
            </h2>
          </FadeUp>

          <FadeUp>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bone-cream/80 md:text-lg">
              {t('athletes.cantera.body')}
            </p>
          </FadeUp>

          <FadeUp>
            <div className="mt-10">
              <button
                onClick={() => navigate('about')}
                className="inline-flex items-center gap-2 rounded border border-gold-glove bg-transparent px-8 py-3 font-headline text-sm uppercase tracking-wider text-gold-glove transition-all hover:bg-gold-glove hover:text-diamond-navy"
              >
                {t('athletes.cantera.cta')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </FadeUp>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  6. CTA Section                                                */}
      {/* ============================================================ */}
      <section className="relative bg-stadium-crimson py-20 px-4 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10"
          >
            <Heart className="h-8 w-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl font-bold text-white md:text-4xl"
          >
            {t('athletes.cta.headline')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80"
          >
            {t('athletes.cta.subtitle')}
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
              {t('athletes.cta.button')}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
