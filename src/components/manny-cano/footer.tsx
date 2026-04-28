'use client';

import { useState } from 'react';
import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { MCLogo } from './mc-logo';

/* Custom TikTok icon since lucide-react doesn't have it */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

/* ------------------------------------------------------------------ */
/*  Social Links                                                        */
/* ------------------------------------------------------------------ */

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/mannycano' },
  { icon: TikTokIcon, label: 'TikTok', href: 'https://tiktok.com/@mannycano' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@mannycano' },
  { icon: Twitter, label: 'X', href: 'https://x.com/mannycano' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/mannycano' },
];

/* ------------------------------------------------------------------ */
/*  Newsletter Section                                                  */
/* ------------------------------------------------------------------ */

function NewsletterSection() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({
      title: t('footer.subscribed'),
      description: t('footer.subscribedDesc'),
    });
    setEmail('');
  };

  return (
    <section className="bg-bone-cream px-6 py-12">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-display text-3xl font-bold text-diamond-navy md:text-4xl">
          {t('footer.newsletterTitle')}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-tobacco-leather md:text-base">
          {t('footer.newsletterDesc')}
        </p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 flex-1 border-bone-cream bg-white placeholder:text-tobacco-leather/40 focus-visible:border-stadium-crimson focus-visible:ring-stadium-crimson/30"
          />
          <Button
            type="submit"
            className="h-11 bg-diamond-navy font-headline uppercase tracking-wide text-bone-cream hover:bg-diamond-navy/90"
          >
            {t('footer.subscribe')}
          </Button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer Component                                                    */
/* ------------------------------------------------------------------ */

export function Footer() {
  const { t } = useI18n();

  const footerColumns = [
    {
      titleKey: 'footer.shop',
      linkKeys: ['nav.gloves', 'nav.bats', 'nav.catcher', 'nav.balls', 'nav.bags', 'nav.accessories'],
    },
    {
      titleKey: 'footer.brand',
      linkKeys: ['footer.ourHistory', 'footer.athletes', 'footer.technology', 'footer.sustainability'],
    },
    {
      titleKey: 'footer.support',
      linkKeys: [
        'footer.sizeGuide',
        'footer.gloveCare',
        'footer.shipping',
        'footer.returns',
        'footer.warranty',
        'footer.faq',
      ],
    },
    {
      titleKey: 'footer.community',
      linkKeys: [
        'footer.canteraProgram',
        'footer.sponsorship',
        'footer.showcases',
        'footer.blog',
        'footer.rewards',
      ],
    },
  ];

  const trustBadgeItems = [
    { icon: ShieldCheck, labelKey: 'footer.trustPayment' },
    { icon: Truck, labelKey: 'footer.trustShipping' },
    { icon: RotateCcw, labelKey: 'footer.trustReturns' },
    { icon: Award, labelKey: 'footer.trustWarranty' },
  ];

  return (
    <footer className="mt-auto">
      {/* Newsletter */}
      <NewsletterSection />

      {/* Main Footer */}
      <div className="bg-diamond-navy px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Logo + Tagline */}
          <div className="mb-10 flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
            <div className="flex items-center gap-2">
              <MCLogo size="md" variant="white" />
              <span className="font-headline text-xl uppercase tracking-wider text-bone-cream">
                MANNY CANÓ
              </span>
            </div>
            <p className="text-sm text-bone-cream/60 md:ml-4">
              {t('footer.tagline')}
            </p>
          </div>

          {/* 4-column grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {footerColumns.map((col) => (
              <div key={col.titleKey}>
                <h3 className="mb-4 font-headline text-xs uppercase tracking-widest text-gold-glove">
                  {t(col.titleKey)}
                </h3>
                <ul className="space-y-2.5">
                  {col.linkKeys.map((linkKey) => (
                    <li key={linkKey}>
                      <a
                        href="#"
                        className="text-sm text-bone-cream/60 transition-colors hover:text-white"
                      >
                        {t(linkKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustBadgeItems.map((badge) => (
              <div
                key={badge.labelKey}
                className="flex items-center justify-center gap-2 rounded-lg border border-bone-cream/10 bg-bone-cream/5 px-3 py-3"
              >
                <badge.icon className="size-4 text-gold-glove" />
                <span className="text-xs font-medium text-bone-cream/80">
                  {t(badge.labelKey)}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-8 bg-bone-cream/10" />

          {/* Bottom Bar */}
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-bone-cream/15 text-bone-cream/60 transition-colors hover:border-gold-glove hover:text-gold-glove"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-center text-xs text-bone-cream/40">
              {t('footer.copyright')}
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-xs text-bone-cream/40 transition-colors hover:text-bone-cream/70"
              >
                {t('footer.terms')}
              </a>
              <a
                href="#"
                className="text-xs text-bone-cream/40 transition-colors hover:text-bone-cream/70"
              >
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
