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
import { useNavigationStore } from '@/lib/navigation-store';
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
/*  Footer Link                                                          */
/* ------------------------------------------------------------------ */

function FooterLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-left text-sm text-bone-cream/60 transition-colors hover:text-white"
      >
        {children}
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer Component                                                    */
/* ------------------------------------------------------------------ */

const categorySlugs: Record<string, string> = {
  'nav.gloves': 'guantes',
  'nav.bats': 'bates',
  'nav.catcher': 'catcher',
  'nav.balls': 'pelotas',
  'nav.bags': 'mochilas',
  'nav.accessories': 'accesorios',
};

export function Footer() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);

  const handleLogoClick = () => {
    navigate('home');
  };

  const handleShopLink = (linkKey: string) => {
    const slug = categorySlugs[linkKey];
    if (slug) {
      navigate('shop', { category: slug });
    }
  };

  const handleBrandLink = (linkKey: string) => {
    switch (linkKey) {
      case 'footer.ourHistory':
        navigate('about');
        break;
      case 'footer.athletes':
        navigate('athletes');
        break;
      case 'footer.technology':
        navigate('technology');
        break;
      case 'footer.sustainability':
        navigate('about');
        break;
    }
  };

  const handleCommunityLink = (linkKey: string) => {
    switch (linkKey) {
      case 'footer.blog':
        navigate('blog');
        break;
      default:
        break;
    }
  };

  const shopLinks = ['nav.gloves', 'nav.bats', 'nav.catcher', 'nav.balls', 'nav.bags', 'nav.accessories'];
  const brandLinks = ['footer.ourHistory', 'footer.athletes', 'footer.technology', 'footer.sustainability'];
  const supportLinks = [
    'footer.sizeGuide',
    'footer.gloveCare',
    'footer.shipping',
    'footer.returns',
    'footer.warranty',
    'footer.faq',
  ];
  const communityLinks = [
    'footer.canteraProgram',
    'footer.sponsorship',
    'footer.showcases',
    'footer.blog',
    'footer.rewards',
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
            <button onClick={handleLogoClick} className="transition-transform hover:scale-105">
              <MCLogo height={42} invert />
            </button>
            <p className="text-sm text-bone-cream/60 md:ml-4">
              {t('footer.tagline')}
            </p>
          </div>

          {/* 4-column grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {/* Shop Column */}
            <div>
              <h3 className="mb-4 font-headline text-xs uppercase tracking-widest text-gold-glove">
                {t('footer.shop')}
              </h3>
              <ul className="space-y-2.5">
                {shopLinks.map((linkKey) => (
                  <FooterLink key={linkKey} onClick={() => handleShopLink(linkKey)}>
                    {t(linkKey)}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* Brand Column */}
            <div>
              <h3 className="mb-4 font-headline text-xs uppercase tracking-widest text-gold-glove">
                {t('footer.brand')}
              </h3>
              <ul className="space-y-2.5">
                {brandLinks.map((linkKey) => (
                  <FooterLink key={linkKey} onClick={() => handleBrandLink(linkKey)}>
                    {t(linkKey)}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="mb-4 font-headline text-xs uppercase tracking-widest text-gold-glove">
                {t('footer.support')}
              </h3>
              <ul className="space-y-2.5">
                {supportLinks.map((linkKey) => (
                  <FooterLink key={linkKey} onClick={() => linkKey === 'footer.faq' ? navigate('contact') : undefined}>
                    {t(linkKey)}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* Community Column */}
            <div>
              <h3 className="mb-4 font-headline text-xs uppercase tracking-widest text-gold-glove">
                {t('footer.community')}
              </h3>
              <ul className="space-y-2.5">
                {communityLinks.map((linkKey) => (
                  <FooterLink key={linkKey} onClick={() => handleCommunityLink(linkKey)}>
                    {t(linkKey)}
                  </FooterLink>
                ))}
              </ul>
            </div>
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
                  target="_blank"
                  rel="noopener noreferrer"
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
