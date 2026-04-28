'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  ShoppingCart,
  Save,
  Palette,
  Hand,
  Layers,
  Type,
  CheckCircle,
  Shield,
  Clock,
  Award,
  Settings,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                    */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

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
/*  Types & Constants                                                    */
/* ------------------------------------------------------------------ */

type GloveStyle = 'infield' | 'outfield' | 'firstBase' | 'catcher' | 'pitcher';
type LeatherType = 'roebuck' | 'kip' | 'steerhide';
type GloveColor = 'brown' | 'black' | 'tan' | 'red' | 'navy' | 'green' | 'white' | 'orange';
type WebPattern = 'iweb' | 'hweb' | 'trapeze' | 'modified' | 'singlePost' | 'basket' | 'crossBar';
type EmbroideryColor = 'black' | 'white' | 'gold' | 'red';
type StepIndex = 0 | 1 | 2 | 3 | 4 | 5;

interface GloveConfig {
  style: GloveStyle;
  leather: LeatherType;
  palmColor: GloveColor;
  backColor: GloveColor;
  webColor: GloveColor;
  lacingColor: GloveColor;
  wristColor: GloveColor;
  webPattern: WebPattern;
  playerName: string;
  playerNumber: string;
  embroideryColor: EmbroideryColor;
  position: string;
}

const COLOR_MAP: Record<GloveColor, string> = {
  brown: '#8B5E3C',
  black: '#1A1A2E',
  tan: '#D4A574',
  red: '#C41E3A',
  navy: '#1B2A4A',
  green: '#2D6A4F',
  white: '#F5F0EB',
  orange: '#E07B39',
};

const EMBROIDERY_COLOR_MAP: Record<EmbroideryColor, string> = {
  black: '#1A1A2E',
  white: '#F5F0EB',
  gold: '#D4AF37',
  red: '#C41E3A',
};

const LEATHER_PRICES: Record<LeatherType, number> = {
  roebuck: 499,
  kip: 599,
  steerhide: 399,
};

const DEFAULT_CONFIG: GloveConfig = {
  style: 'infield',
  leather: 'roebuck',
  palmColor: 'brown',
  backColor: 'brown',
  webColor: 'brown',
  lacingColor: 'tan',
  wristColor: 'brown',
  webPattern: 'iweb',
  playerName: '',
  playerNumber: '',
  embroideryColor: 'white',
  position: '',
};

const COLOR_OPTIONS: GloveColor[] = ['brown', 'black', 'tan', 'red', 'navy', 'green', 'white', 'orange'];

const WEB_PATTERNS: WebPattern[] = ['iweb', 'hweb', 'trapeze', 'modified', 'singlePost', 'basket', 'crossBar'];

const POSITIONS = [
  { value: '', label: 'Select Position', labelEs: 'Seleccionar Posición' },
  { value: 'SS', label: 'Shortstop', labelEs: 'Shortstop' },
  { value: '2B', label: 'Second Base', labelEs: 'Segunda Base' },
  { value: '3B', label: 'Third Base', labelEs: 'Tercera Base' },
  { value: 'OF', label: 'Outfield', labelEs: 'Jardinero' },
  { value: '1B', label: 'First Base', labelEs: 'Primera Base' },
  { value: 'P', label: 'Pitcher', labelEs: 'Pitcher' },
  { value: 'C', label: 'Catcher', labelEs: 'Catcher' },
];

/* ------------------------------------------------------------------ */
/*  Glove SVG Component                                                  */
/* ------------------------------------------------------------------ */

function GloveSVG({ config }: { config: GloveConfig }) {
  const { palmColor, backColor, webColor, lacingColor, wristColor } = config;
  const palm = COLOR_MAP[palmColor];
  const back = COLOR_MAP[backColor];
  const web = COLOR_MAP[webColor];
  const lacing = COLOR_MAP[lacingColor];
  const wrist = COLOR_MAP[wristColor];

  // Determine glove shape based on style
  const isCatcher = config.style === 'catcher';
  const isPitcher = config.style === 'pitcher';

  return (
    <svg
      viewBox="0 0 400 480"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xl"
      style={{ transition: 'all 0.5s ease' }}
    >
      <defs>
        <filter id="glove-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
        <linearGradient id="palm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palm} stopOpacity="1" />
          <stop offset="100%" stopColor={palm} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="back-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={back} stopOpacity="1" />
          <stop offset="100%" stopColor={back} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Wrist strap */}
      <path
        d="M140 420 L140 460 Q140 470 150 470 L250 470 Q260 470 260 460 L260 420 Q260 410 250 410 L150 410 Q140 410 140 420 Z"
        fill={wrist}
        stroke={lacing}
        strokeWidth="1.5"
        style={{ transition: 'fill 0.5s ease, stroke 0.5s ease' }}
      />
      {/* Wrist strap stitching */}
      <path
        d="M155 415 L155 465 M170 415 L170 465 M185 415 L185 465 M200 415 L200 465 M215 415 L215 465 M230 415 L230 465 M245 415 L245 465"
        stroke={lacing}
        strokeWidth="0.8"
        strokeDasharray="4 3"
        opacity="0.6"
        style={{ transition: 'stroke 0.5s ease' }}
      />
      {/* Wrist buckle */}
      <rect x="190" y="432" width="20" height="12" rx="3" fill={lacing} opacity="0.8" style={{ transition: 'fill 0.5s ease' }} />

      {/* Palm area (main body) */}
      <path
        d={
          isCatcher
            ? `M100 180 Q80 250 85 320 Q88 380 120 410 L280 410 Q312 380 315 320 Q320 250 300 180 Q280 120 200 110 Q120 120 100 180 Z`
            : `M120 170 Q100 230 105 300 Q108 360 130 410 L270 410 Q292 360 295 300 Q300 230 280 170 Q260 110 200 100 Q140 110 120 170 Z`
        }
        fill="url(#palm-gradient)"
        stroke={lacing}
        strokeWidth="1.5"
        filter="url(#glove-shadow)"
        style={{ transition: 'fill 0.5s ease, stroke 0.5s ease' }}
      />

      {/* Back of hand overlay (slightly offset for depth) */}
      <path
        d={
          isCatcher
            ? `M105 185 Q88 250 92 315 Q95 375 125 405 L275 405 Q305 375 308 315 Q312 250 295 185 Q275 128 200 118 Q125 128 105 185 Z`
            : `M125 175 Q108 232 112 298 Q115 355 135 405 L265 405 Q285 355 288 298 Q292 232 275 175 Q258 118 200 108 Q142 118 125 175 Z`
        }
        fill="url(#back-gradient)"
        opacity="0.92"
        style={{ transition: 'fill 0.5s ease' }}
      />

      {/* Finger outlines on back */}
      {[0, 1, 2, 3].map((i) => {
        const offsetX = 130 + i * 22;
        return (
          <path
            key={`finger-${i}`}
            d={`M${offsetX} 170 Q${offsetX - 5} 110 ${offsetX + 8} 60 Q${offsetX + 15} 40 ${offsetX + 22} 50 Q${offsetX + 30} 65 ${offsetX + 25} 170`}
            fill="none"
            stroke={lacing}
            strokeWidth="1.2"
            opacity="0.5"
            style={{ transition: 'stroke 0.5s ease' }}
          />
        );
      })}

      {/* Thumb */}
      <path
        d="M120 180 Q80 170 60 130 Q50 100 65 80 Q80 60 100 75 Q115 88 125 130 Q130 155 125 175"
        fill="url(#back-gradient)"
        stroke={lacing}
        strokeWidth="1.5"
        style={{ transition: 'fill 0.5s ease, stroke 0.5s ease' }}
      />

      {/* Web area between thumb and index */}
      {isPitcher ? (
        /* Closed web (pitcher) */
        <path
          d="M100 130 Q120 90 150 70 L200 60 L250 70 Q280 90 300 130 L280 170 Q260 130 200 115 Q140 130 120 170 Z"
          fill={web}
          stroke={lacing}
          strokeWidth="1.5"
          style={{ transition: 'fill 0.5s ease, stroke 0.5s ease' }}
        />
      ) : isCatcher ? (
        /* Solid catcher web */
        <path
          d="M85 140 Q110 80 155 55 L200 45 L245 55 Q290 80 315 140 L295 185 Q270 130 200 110 Q130 130 105 185 Z"
          fill={web}
          stroke={lacing}
          strokeWidth="1.5"
          style={{ transition: 'fill 0.5s ease, stroke 0.5s ease' }}
        />
      ) : (
        <>
          {/* Open web pattern */}
          {config.webPattern === 'iweb' && (
            <>
              <line x1="110" y1="135" x2="150" y2="75" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="150" y1="75" x2="190" y2="55" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="190" y1="55" x2="230" y2="75" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="230" y1="75" x2="290" y2="135" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              {/* Cross lacing */}
              <line x1="140" y1="120" x2="200" y2="85" stroke={lacing} strokeWidth="1" opacity="0.6" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="200" y1="85" x2="260" y2="120" stroke={lacing} strokeWidth="1" opacity="0.6" style={{ transition: 'stroke 0.5s ease' }} />
            </>
          )}
          {config.webPattern === 'hweb' && (
            <>
              <line x1="130" y1="80" x2="130" y2="160" stroke={web} strokeWidth="3" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="200" y1="50" x2="200" y2="130" stroke={web} strokeWidth="3" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="270" y1="80" x2="270" y2="160" stroke={web} strokeWidth="3" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="105" y1="140" x2="295" y2="140" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
            </>
          )}
          {config.webPattern === 'trapeze' && (
            <>
              <line x1="100" y1="135" x2="130" y2="75" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="130" y1="75" x2="200" y2="50" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="200" y1="50" x2="270" y2="75" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="270" y1="75" x2="300" y2="135" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="130" y1="75" x2="150" y2="150" stroke={web} strokeWidth="2" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="270" y1="75" x2="250" y2="150" stroke={web} strokeWidth="2" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="150" y1="150" x2="250" y2="150" stroke={web} strokeWidth="2" style={{ transition: 'stroke 0.5s ease' }} />
            </>
          )}
          {(config.webPattern === 'modified' || config.webPattern === 'crossBar') && (
            <>
              <line x1="100" y1="135" x2="135" y2="70" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="135" y1="70" x2="200" y2="50" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="200" y1="50" x2="265" y2="70" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="265" y1="70" x2="300" y2="135" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="115" y1="125" x2="285" y2="125" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
            </>
          )}
          {config.webPattern === 'singlePost' && (
            <>
              <line x1="100" y1="135" x2="140" y2="70" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="140" y1="70" x2="200" y2="50" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="200" y1="50" x2="260" y2="70" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="260" y1="70" x2="300" y2="135" stroke={web} strokeWidth="2.5" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="200" y1="50" x2="200" y2="155" stroke={web} strokeWidth="3" style={{ transition: 'stroke 0.5s ease' }} />
            </>
          )}
          {config.webPattern === 'basket' && (
            <>
              <path
                d="M105 130 Q120 85 155 60 L200 48 L245 60 Q280 85 295 130 L275 165 Q255 125 200 110 Q145 125 125 165 Z"
                fill={web}
                opacity="0.3"
                style={{ transition: 'fill 0.5s ease' }}
              />
              <line x1="105" y1="130" x2="295" y2="130" stroke={web} strokeWidth="2" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="115" y1="110" x2="285" y2="110" stroke={web} strokeWidth="1.5" opacity="0.6" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="125" y1="90" x2="275" y2="90" stroke={web} strokeWidth="1.5" opacity="0.6" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="140" y1="70" x2="260" y2="70" stroke={web} strokeWidth="1.5" opacity="0.6" style={{ transition: 'stroke 0.5s ease' }} />
              <line x1="160" y1="55" x2="240" y2="55" stroke={web} strokeWidth="1.5" opacity="0.6" style={{ transition: 'stroke 0.5s ease' }} />
            </>
          )}
        </>
      )}

      {/* Lacing around pocket */}
      <path
        d="M130 175 Q140 200 160 210 Q180 220 200 218 Q220 220 240 210 Q260 200 270 175"
        fill="none"
        stroke={lacing}
        strokeWidth="1.5"
        strokeDasharray="5 3"
        opacity="0.7"
        style={{ transition: 'stroke 0.5s ease' }}
      />

      {/* Edge lacing along fingers */}
      <path
        d="M130 170 L135 100 Q140 60 155 40 M175 170 L180 90 Q185 50 195 35 M220 170 L225 90 Q230 50 240 35 M260 170 L265 100 Q270 60 285 40"
        fill="none"
        stroke={lacing}
        strokeWidth="1.2"
        strokeDasharray="4 4"
        opacity="0.5"
        style={{ transition: 'stroke 0.5s ease' }}
      />

      {/* Back detail line */}
      <path
        d="M150 200 Q200 250 250 200"
        fill="none"
        stroke={lacing}
        strokeWidth="1"
        opacity="0.3"
        style={{ transition: 'stroke 0.5s ease' }}
      />

      {/* Personalization text */}
      {config.playerName && (
        <text
          x="200"
          y="320"
          textAnchor="middle"
          fontSize="14"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="2"
          fill={EMBROIDERY_COLOR_MAP[config.embroideryColor]}
          style={{ transition: 'fill 0.5s ease' }}
        >
          {config.playerName.toUpperCase()}
        </text>
      )}
      {config.playerNumber && (
        <text
          x="200"
          y="345"
          textAnchor="middle"
          fontSize="22"
          fontFamily="serif"
          fontWeight="bold"
          fill={EMBROIDERY_COLOR_MAP[config.embroideryColor]}
          style={{ transition: 'fill 0.5s ease' }}
        >
          {config.playerNumber}
        </text>
      )}

      {/* MC Logo on wrist */}
      <text
        x="200"
        y="400"
        textAnchor="middle"
        fontSize="11"
        fontFamily="serif"
        fontWeight="bold"
        letterSpacing="3"
        fill={lacing}
        opacity="0.6"
        style={{ transition: 'fill 0.5s ease' }}
      >
        MC
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Color Swatch Component                                               */
/* ------------------------------------------------------------------ */

function ColorSwatch({
  color,
  selected,
  onSelect,
  label,
}: {
  color: string;
  selected: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all hover:scale-105 ${
        selected
          ? 'bg-diamond-navy/5 ring-2 ring-diamond-navy ring-offset-2'
          : 'hover:bg-bone-cream/50'
      }`}
      title={label}
    >
      <div
        className="h-8 w-8 rounded-full border-2 shadow-sm transition-transform"
        style={{
          backgroundColor: COLOR_MAP[color as GloveColor],
          borderColor: selected ? '#0A1A2F' : '#E8E0D4',
        }}
      />
      <span className="text-[10px] font-medium text-dugout-charcoal/70">{label}</span>
      {selected && (
        <CheckCircle className="absolute -right-1 -top-1 h-4 w-4 text-diamond-navy" />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Step Indicator                                                       */
/* ------------------------------------------------------------------ */

function StepIndicator({
  currentStep,
  steps,
  onStepClick,
}: {
  currentStep: StepIndex;
  steps: { key: string; icon: React.ElementType }[];
  onStepClick: (step: StepIndex) => void;
}) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:gap-2">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const Icon = step.icon;
        return (
          <button
            key={step.key}
            onClick={() => onStepClick(idx as StepIndex)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              isCurrent
                ? 'bg-diamond-navy text-white shadow-md'
                : isCompleted
                  ? 'bg-diamond-navy/10 text-diamond-navy'
                  : 'bg-bone-cream text-dugout-charcoal/50 hover:bg-bone-cream/80'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t(step.key)}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step Content Components                                              */
/* ------------------------------------------------------------------ */

function StyleStep({
  config,
  onChange,
}: {
  config: GloveConfig;
  onChange: (key: keyof GloveConfig, value: string) => void;
}) {
  const { t } = useI18n();
  const styles: { key: GloveStyle; icon: string }[] = [
    { key: 'infield', icon: '⚾' },
    { key: 'outfield', icon: '🧤' },
    { key: 'firstBase', icon: '🥎' },
    { key: 'catcher', icon: '🧤' },
    { key: 'pitcher', icon: '⭐' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {styles.map((s) => (
        <button
          key={s.key}
          onClick={() => onChange('style', s.key)}
          className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:shadow-md ${
            config.style === s.key
              ? 'border-diamond-navy bg-diamond-navy/5 shadow-md'
              : 'border-bone-cream bg-white hover:border-diamond-navy/30'
          }`}
        >
          <span className="text-2xl">{s.icon}</span>
          <span className="text-xs font-medium text-dugout-charcoal">{t(`configurator.style.${s.key}`)}</span>
        </button>
      ))}
    </div>
  );
}

function LeatherStep({
  config,
  onChange,
}: {
  config: GloveConfig;
  onChange: (key: keyof GloveConfig, value: string) => void;
}) {
  const { t } = useI18n();
  const leathers: { key: LeatherType; badge: string }[] = [
    { key: 'roebuck', badge: 'PREMIUM' },
    { key: 'kip', badge: 'PRO' },
    { key: 'steerhide', badge: 'CLASSIC' },
  ];

  return (
    <div className="flex flex-col gap-3">
      {leathers.map((l) => (
        <button
          key={l.key}
          onClick={() => onChange('leather', l.key)}
          className={`flex items-center justify-between rounded-xl border-2 p-4 transition-all hover:shadow-md ${
            config.leather === l.key
              ? 'border-diamond-navy bg-diamond-navy/5 shadow-md'
              : 'border-bone-cream bg-white hover:border-diamond-navy/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-12 w-12 rounded-lg"
              style={{
                backgroundColor: l.key === 'roebuck' ? '#6B3A2A' : l.key === 'kip' ? '#8B5E3C' : '#5C3A1E',
              }}
            />
            <div className="text-left">
              <p className="font-headline text-sm font-medium text-diamond-navy">
                {t(`configurator.leather.${l.key}`)}
              </p>
              <Badge variant="secondary" className="mt-1 text-[10px]">
                {l.badge}
              </Badge>
            </div>
          </div>
          <p className="font-display text-xl font-bold text-stadium-crimson">
            {t(`configurator.leather.${l.key}.price`)}
          </p>
        </button>
      ))}
    </div>
  );
}

function ColorsStep({
  config,
  onChange,
}: {
  config: GloveConfig;
  onChange: (key: keyof GloveConfig, value: string) => void;
}) {
  const { t } = useI18n();
  const colorParts: { key: keyof GloveConfig; labelKey: string }[] = [
    { key: 'palmColor', labelKey: 'configurator.colors.palm' },
    { key: 'backColor', labelKey: 'configurator.colors.back' },
    { key: 'webColor', labelKey: 'configurator.colors.web' },
    { key: 'lacingColor', labelKey: 'configurator.colors.lacing' },
    { key: 'wristColor', labelKey: 'configurator.colors.wrist' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {colorParts.map((part) => (
        <div key={part.key}>
          <p className="mb-2 text-sm font-medium text-diamond-navy">{t(part.labelKey)}</p>
          <div className="flex flex-wrap gap-2">
            {COLOR_OPTIONS.map((c) => (
              <ColorSwatch
                key={c}
                color={c}
                selected={config[part.key] === c}
                onSelect={() => onChange(part.key, c)}
                label={t(`configurator.colors.${c}`)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function WebStep({
  config,
  onChange,
}: {
  config: GloveConfig;
  onChange: (key: keyof GloveConfig, value: string) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {WEB_PATTERNS.map((wp) => (
        <button
          key={wp}
          onClick={() => onChange('webPattern', wp)}
          className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all hover:shadow-md ${
            config.webPattern === wp
              ? 'border-diamond-navy bg-diamond-navy/5 shadow-md'
              : 'border-bone-cream bg-white hover:border-diamond-navy/30'
          }`}
        >
          <Layers className="h-6 w-6 text-tobacco-leather" />
          <span className="text-center text-xs font-medium text-dugout-charcoal">
            {t(`configurator.webPattern.${wp}`)}
          </span>
        </button>
      ))}
    </div>
  );
}

function PersonalizeStep({
  config,
  onChange,
}: {
  config: GloveConfig;
  onChange: (key: keyof GloveConfig, value: string) => void;
}) {
  const { t, locale } = useI18n();
  const embColors: EmbroideryColor[] = ['black', 'white', 'gold', 'red'];

  return (
    <div className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-diamond-navy">
          {t('configurator.personalize.name')}
        </label>
        <Input
          value={config.playerName}
          onChange={(e) => {
            if (e.target.value.length <= 15) onChange('playerName', e.target.value);
          }}
          placeholder={t('configurator.personalize.namePlaceholder')}
          className="max-w-xs border-bone-cream bg-white focus-visible:ring-diamond-navy/30"
        />
        <p className="mt-1 text-[10px] text-dugout-charcoal/50">{config.playerName.length}/15</p>
      </div>

      {/* Number */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-diamond-navy">
          {t('configurator.personalize.number')}
        </label>
        <Input
          value={config.playerNumber}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, '');
            if (val.length <= 3) onChange('playerNumber', val);
          }}
          placeholder={t('configurator.personalize.numberPlaceholder')}
          className="max-w-[120px] border-bone-cream bg-white focus-visible:ring-diamond-navy/30"
        />
        <p className="mt-1 text-[10px] text-dugout-charcoal/50">{config.playerNumber.length}/3</p>
      </div>

      {/* Embroidery Color */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-diamond-navy">
          {t('configurator.personalize.embroideryColor')}
        </label>
        <div className="flex gap-3">
          {embColors.map((ec) => (
            <button
              key={ec}
              onClick={() => onChange('embroideryColor', ec)}
              className={`h-8 w-8 rounded-full border-2 transition-all ${
                config.embroideryColor === ec ? 'scale-110 border-diamond-navy ring-2 ring-diamond-navy/30' : 'border-bone-cream'
              }`}
              style={{ backgroundColor: EMBROIDERY_COLOR_MAP[ec] }}
              title={ec.charAt(0).toUpperCase() + ec.slice(1)}
            />
          ))}
        </div>
      </div>

      {/* Position */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-diamond-navy">
          {t('configurator.personalize.position')}
        </label>
        <select
          value={config.position}
          onChange={(e) => onChange('position', e.target.value)}
          className="max-w-xs rounded-lg border border-bone-cream bg-white px-3 py-2 text-sm text-dugout-charcoal outline-none focus:ring-2 focus:ring-diamond-navy/30"
        >
          {POSITIONS.map((pos) => (
            <option key={pos.value} value={pos.value}>
              {locale === 'es' ? pos.labelEs : pos.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function SummaryStep({
  config,
  onAddToCart,
  onSaveDesign,
  addedToCart,
}: {
  config: GloveConfig;
  onAddToCart: () => void;
  onSaveDesign: () => void;
  addedToCart: boolean;
}) {
  const { t } = useI18n();
  const basePrice = LEATHER_PRICES[config.leather];
  const hasPersonalization = config.playerName || config.playerNumber;
  const embroideryFee = hasPersonalization ? 50 : 0;
  const total = basePrice + embroideryFee;

  return (
    <div className="flex flex-col gap-4">
      <Card className="border-bone-cream bg-white p-5">
        <h4 className="mb-3 font-headline text-sm uppercase tracking-wider text-diamond-navy">
          {t('configurator.summary.title')}
        </h4>

        <div className="flex flex-col gap-3 text-sm">
          {/* Style */}
          <div className="flex justify-between">
            <span className="text-dugout-charcoal/70">{t('configurator.summary.style')}</span>
            <span className="font-medium text-diamond-navy">{t(`configurator.style.${config.style}`)}</span>
          </div>
          <Separator className="bg-bone-cream" />

          {/* Leather */}
          <div className="flex justify-between">
            <span className="text-dugout-charcoal/70">{t('configurator.summary.leather')}</span>
            <span className="font-medium text-diamond-navy">
              {t(`configurator.leather.${config.leather}`)} — ${basePrice}
            </span>
          </div>
          <Separator className="bg-bone-cream" />

          {/* Colors */}
          <div className="flex justify-between">
            <span className="text-dugout-charcoal/70">{t('configurator.summary.colors')}</span>
            <div className="flex gap-1.5">
              {[config.palmColor, config.backColor, config.webColor, config.lacingColor, config.wristColor].map(
                (c, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 rounded-full border border-bone-cream"
                    style={{ backgroundColor: COLOR_MAP[c] }}
                  />
                )
              )}
            </div>
          </div>
          <Separator className="bg-bone-cream" />

          {/* Web Pattern */}
          <div className="flex justify-between">
            <span className="text-dugout-charcoal/70">{t('configurator.summary.web')}</span>
            <span className="font-medium text-diamond-navy">{t(`configurator.webPattern.${config.webPattern}`)}</span>
          </div>

          {/* Personalization */}
          {hasPersonalization && (
            <>
              <Separator className="bg-bone-cream" />
              <div className="flex justify-between">
                <span className="text-dugout-charcoal/70">{t('configurator.summary.personalization')}</span>
                <span className="font-medium text-diamond-navy">
                  {config.playerName && `${config.playerName}`}
                  {config.playerName && config.playerNumber && ' / '}
                  {config.playerNumber && `#${config.playerNumber}`}
                  {config.position && ` (${config.position})`}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-dugout-charcoal/50">Embroidery</span>
                <span className="text-dugout-charcoal/50">+$50</span>
              </div>
            </>
          )}

          <Separator className="bg-bone-cream" />

          {/* Total */}
          <div className="flex justify-between">
            <span className="font-headline text-base font-bold text-diamond-navy">{t('configurator.summary.total')}</span>
            <span className="font-display text-2xl font-bold text-stadium-crimson">${total}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={onAddToCart}
            className="flex-1 bg-stadium-crimson font-headline text-sm uppercase tracking-wider text-white hover:bg-stadium-crimson/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {addedToCart ? t('configurator.summary.addedToCart') : t('configurator.summary.addToCart')}
          </Button>
          <Button
            onClick={onSaveDesign}
            variant="outline"
            className="border-diamond-navy/20 font-headline text-sm uppercase tracking-wider text-diamond-navy hover:bg-diamond-navy/5"
          >
            <Save className="mr-2 h-4 w-4" />
            {t('configurator.summary.saveDesign')}
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                           */
/* ------------------------------------------------------------------ */

export function CustomGlovePage() {
  const { t } = useI18n();
  const { navigate } = useNavigationStore();
  const { addItem, openCart } = useCartStore();
  const { toast } = useToast();

  const [config, setConfig] = useState<GloveConfig>({ ...DEFAULT_CONFIG });
  const [currentStep, setCurrentStep] = useState<StepIndex>(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const steps = [
    { key: 'configurator.steps.style', icon: Hand },
    { key: 'configurator.steps.leather', icon: Settings },
    { key: 'configurator.steps.colors', icon: Palette },
    { key: 'configurator.steps.web', icon: Layers },
    { key: 'configurator.steps.personalize', icon: Type },
    { key: 'configurator.steps.summary', icon: CheckCircle },
  ];

  const handleChange = useCallback((key: keyof GloveConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setAddedToCart(false);
  }, []);

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((prev) => (prev + 1) as StepIndex);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => (prev - 1) as StepIndex);
  };

  const handleStepClick = (step: StepIndex) => {
    setCurrentStep(step);
  };

  const handleStartOver = () => {
    setConfig({ ...DEFAULT_CONFIG });
    setCurrentStep(0);
    setAddedToCart(false);
  };

  const handleAddToCart = () => {
    const basePrice = LEATHER_PRICES[config.leather];
    const hasPersonalization = config.playerName || config.playerNumber;
    const total = basePrice + (hasPersonalization ? 50 : 0);

    addItem({
      productId: 9999,
      name: `MC Custom Pro-Fit — ${t(`configurator.style.${config.style}`)}`,
      price: total,
      image: '/img/brand/logo.png',
      color: config.palmColor,
    });

    setAddedToCart(true);
    toast({
      title: t('configurator.summary.addedToCart'),
      description: `$${total} — ${t(`configurator.leather.${config.leather}`)}`,
    });

    setTimeout(() => openCart(), 600);
  };

  const handleSaveDesign = () => {
    toast({
      title: '✓',
      description: 'Design saved to your account.',
    });
  };

  const features = [
    { icon: Clock, label: t('configurator.features.handcrafted') },
    { icon: Settings, label: t('configurator.features.delivery') },
    { icon: Shield, label: t('configurator.features.warranty') },
    { icon: Award, label: t('configurator.features.engraving') },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StyleStep config={config} onChange={handleChange} />;
      case 1:
        return <LeatherStep config={config} onChange={handleChange} />;
      case 2:
        return <ColorsStep config={config} onChange={handleChange} />;
      case 3:
        return <WebStep config={config} onChange={handleChange} />;
      case 4:
        return <PersonalizeStep config={config} onChange={handleChange} />;
      case 5:
        return (
          <SummaryStep
            config={config}
            onAddToCart={handleAddToCart}
            onSaveDesign={handleSaveDesign}
            addedToCart={addedToCart}
          />
        );
      default:
        return null;
    }
  };

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
            {t('configurator.breadcrumb.home')}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-diamond-navy">{t('configurator.breadcrumb.title')}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Hero Section                                                  */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A1A2F] to-[#0F2440]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-headline text-sm uppercase tracking-[0.3em] text-gold-glove"
          >
            {t('configurator.hero.label')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            {t('configurator.hero.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-bone-cream/80 md:text-lg"
          >
            {t('configurator.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Configurator Tool                                             */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-white py-10 px-4 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator
              currentStep={currentStep}
              steps={steps}
              onStepClick={handleStepClick}
            />
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left Column — Visual Preview */}
            <div className="lg:w-[58%]">
              <Card className="sticky top-4 border-bone-cream bg-gradient-to-b from-bone-cream/40 to-white p-6 md:p-10">
                <div className="mx-auto aspect-[5/6] max-w-md lg:aspect-auto lg:h-[520px] lg:max-w-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`glove-${config.style}-${config.webPattern}-${config.palmColor}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="h-full w-full"
                    >
                      <GloveSVG config={config} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Color legend */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {[
                    { color: config.palmColor, label: 'Palm' },
                    { color: config.backColor, label: 'Back' },
                    { color: config.webColor, label: 'Web' },
                    { color: config.lacingColor, label: 'Lacing' },
                    { color: config.wristColor, label: 'Wrist' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <div
                        className="h-3.5 w-3.5 rounded-full border border-bone-cream/80"
                        style={{ backgroundColor: COLOR_MAP[item.color], transition: 'background-color 0.5s ease' }}
                      />
                      <span className="text-[11px] text-dugout-charcoal/60">{item.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column — Configuration Panel */}
            <div className="lg:w-[42%]">
              <Card className="border-bone-cream bg-white p-5 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[300px]"
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-6 flex items-center justify-between border-t border-bone-cream pt-4">
                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <Button
                        onClick={handlePrev}
                        variant="ghost"
                        size="sm"
                        className="text-dugout-charcoal/70 hover:text-diamond-navy"
                      >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        {t('configurator.previous')}
                      </Button>
                    )}
                    <Button
                      onClick={handleStartOver}
                      variant="ghost"
                      size="sm"
                      className="text-dugout-charcoal/50 hover:text-stadium-crimson"
                    >
                      <RotateCcw className="mr-1 h-3.5 w-3.5" />
                      {t('configurator.startOver')}
                    </Button>
                  </div>
                  {currentStep < 5 && (
                    <Button
                      onClick={handleNext}
                      className="bg-diamond-navy font-headline text-sm uppercase tracking-wider text-white hover:bg-diamond-navy/90"
                    >
                      {t('configurator.next')}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  Features Strip                                                */}
      {/* ============================================================ */}
      <section className="border-y border-bone-cream bg-bone-cream/50 py-8 px-4">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <FadeUp key={idx} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <Icon className="h-5 w-5 text-diamond-navy" />
                </div>
                <span className="text-xs font-medium text-dugout-charcoal/80">{feature.label}</span>
              </FadeUp>
            );
          })}
        </div>
      </section>
    </div>
  );
}
