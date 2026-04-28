'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  ChevronDown,
  Users,
  Cpu,
  BookOpen,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';
import { MCLogo } from './mc-logo';

/* ------------------------------------------------------------------ */
/*  Mega Menu Data (uses translation keys)                              */
/* ------------------------------------------------------------------ */

interface MegaMenuColumn {
  titleKey: string;
  linkKeys: string[];
}

interface MegaMenuData {
  labelKey: string;
  slug: string;
  columns: MegaMenuColumn[];
}

const megaMenuData: MegaMenuData[] = [
  {
    labelKey: 'nav.gloves',
    slug: 'guantes',
    columns: [
      {
        titleKey: 'nav.byPosition',
        linkKeys: ['nav.infield', 'nav.outfield', 'nav.pitcher', 'nav.firstBase', 'nav.catcherMitt'],
      },
      {
        titleKey: 'nav.bySeries',
        linkKeys: ['nav.professional', 'nav.heritage', 'nav.diamond', 'nav.cantera'],
      },
    ],
  },
  {
    labelKey: 'nav.bats',
    slug: 'bates',
    columns: [
      {
        titleKey: 'nav.byMaterial',
        linkKeys: ['nav.wood', 'nav.aluminum', 'nav.composite'],
      },
      {
        titleKey: 'nav.byCert',
        linkKeys: ['nav.bbcor', 'nav.usssa', 'nav.usa'],
      },
    ],
  },
  {
    labelKey: 'nav.catcher',
    slug: 'catcher',
    columns: [
      { titleKey: 'nav.completeSets', linkKeys: ['nav.proSet', 'nav.canteraSet'] },
      {
        titleKey: 'nav.individualPieces',
        linkKeys: ['nav.mask', 'nav.chestProtector', 'nav.legGuards', 'nav.catcherGlove', 'nav.kneeSavers'],
      },
    ],
  },
  {
    labelKey: 'nav.balls',
    slug: 'pelotas',
    columns: [
      {
        titleKey: 'nav.byUse',
        linkKeys: ['nav.game', 'nav.practice', 'nav.training'],
      },
      { titleKey: 'nav.byQuantity', linkKeys: ['nav.dozen', 'nav.threeDozen', 'nav.bucket'] },
    ],
  },
  {
    labelKey: 'nav.bags',
    slug: 'mochilas',
    columns: [
      {
        titleKey: 'nav.byType',
        linkKeys: ['nav.batPack', 'nav.catcherBag', 'nav.rollerBag', 'nav.dayPack', 'nav.gymBag'],
      },
    ],
  },
  {
    labelKey: 'nav.accessories',
    slug: 'accesorios',
    columns: [
      { titleKey: 'nav.batting', linkKeys: ['nav.battingGloves', 'nav.batWeights'] },
      { titleKey: 'nav.care', linkKeys: ['nav.leatherOil', 'nav.conditioner', 'nav.brush'] },
      { titleKey: 'nav.apparel', linkKeys: ['nav.tshirts', 'nav.pants', 'nav.hoodies', 'nav.caps'] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Navbar Component                                                    */
/* ------------------------------------------------------------------ */

interface NavbarProps {
  onSearchOpen?: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
  const view = useNavigationStore((s) => s.view);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemCount = useCartStore((s) => s.itemCount);
  const openCart = useCartStore((s) => s.openCart);

  const isHome = view === 'home';
  const isTransparent = isHome && !scrolled;

  /* Scroll listener for transparent-to-solid transition */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Sync scrolled state with navigation view changes */
  useEffect(() => {
    // Scroll listener handles scrolled state; this ensures
    // we check scroll position after view transitions
    const check = () => setScrolled(window.scrollY > 100);
    // Run immediately after the navigation store scrolls to top
    requestAnimationFrame(check);
  }, [view]);

  /* Hover handlers for mega menu */
  const handleMouseEnter = useCallback((labelKey: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setActiveMenu(labelKey);
  }, []);

  const handleMouseLeave = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  const handleCategoryClick = (slug: string) => {
    setActiveMenu(null);
    navigate('shop', { category: slug });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('home');
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent'
            : scrolled
              ? 'bg-white/95 shadow-sm backdrop-blur-md'
              : 'bg-white'
        }`}
      >
        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between px-4 lg:px-8">
          {/* Left: Logo */}
          <button onClick={handleLogoClick} className="flex items-center group">
            <MCLogo
              height={36}
              className="transition-transform group-hover:scale-105"
            />
          </button>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:block" onMouseLeave={handleMouseLeave}>
            <ul className="flex items-center gap-1">
              {megaMenuData.map((item) => (
                <li
                  key={item.labelKey}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.labelKey)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 font-headline text-sm uppercase tracking-wide transition-colors hover:text-stadium-crimson ${
                      isTransparent
                        ? 'text-white'
                        : 'text-dugout-charcoal'
                    }`}
                    onClick={() =>
                      setActiveMenu(activeMenu === item.labelKey ? null : item.labelKey)
                    }
                  >
                    {t(item.labelKey)}
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-200 ${
                        activeMenu === item.labelKey ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Panel */}
                  {activeMenu === item.labelKey && (
                    <div
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
                      onMouseEnter={() => handleMouseEnter(item.labelKey)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-[560px] rounded-lg border border-bone-cream bg-white p-6 shadow-xl">
                        {/* View All link at top */}
                        <button
                          onClick={() => handleCategoryClick(item.slug)}
                          className="mb-4 block text-xs font-semibold uppercase tracking-widest text-stadium-crimson transition-colors hover:text-stadium-crimson/80"
                        >
                          {t('products.viewAll')} →
                        </button>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                          {item.columns.map((col) => (
                            <div key={col.titleKey}>
                              <h4 className="mb-2 font-headline text-xs uppercase tracking-widest text-tobacco-leather">
                                {t(col.titleKey)}
                              </h4>
                              <ul className="space-y-1.5">
                                {col.linkKeys.map((linkKey) => (
                                  <li key={linkKey}>
                                    <button
                                      onClick={() => handleCategoryClick(item.slug)}
                                      className="block text-left text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
                                    >
                                      {t(linkKey)}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors hover:text-stadium-crimson ${
                isTransparent ? 'text-white' : 'text-dugout-charcoal'
              }`}
              aria-label={t('mobile.search')}
              onClick={() => onSearchOpen?.()}
            >
              <Search className="size-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`hidden transition-colors hover:text-stadium-crimson sm:inline-flex ${
                isTransparent ? 'text-white' : 'text-dugout-charcoal'
              }`}
              aria-label={t('mobile.account')}
            >
              <User className="size-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`relative transition-colors hover:text-stadium-crimson ${
                isTransparent ? 'text-white' : 'text-dugout-charcoal'
              }`}
              aria-label={t('mobile.cart')}
              onClick={openCart}
            >
              <ShoppingBag className="size-5" />
              {itemCount() > 0 && (
                <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center bg-stadium-crimson px-1 text-[10px] text-white border-0">
                  {itemCount()}
                </Badge>
              )}
            </Button>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden transition-colors hover:text-stadium-crimson ${
                isTransparent ? 'text-white' : 'text-dugout-charcoal'
              }`}
              aria-label={t('mobile.menu')}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          className="w-[320px] overflow-y-auto p-0 sm:max-w-[360px]"
        >
          <SheetHeader className="border-b border-bone-cream px-4 py-4">
            <div className="flex items-center gap-2">
              <MCLogo height={24} iconOnly />
              <SheetTitle className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
                {t('mobile.menu')}
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="px-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              {megaMenuData.map((item) => (
                <AccordionItem key={item.labelKey} value={item.labelKey}>
                  <AccordionTrigger
                    className="font-headline text-sm uppercase tracking-wide text-dugout-charcoal hover:text-stadium-crimson hover:no-underline"
                    onClick={() => handleCategoryClick(item.slug)}
                  >
                    {t(item.labelKey)}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.columns.map((col) => (
                      <div key={col.titleKey} className="mb-3">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-tobacco-leather">
                          {t(col.titleKey)}
                        </p>
                        <ul className="space-y-1.5 pl-1">
                          {col.linkKeys.map((linkKey) => (
                            <li key={linkKey}>
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  handleCategoryClick(item.slug);
                                }}
                                className="block text-left text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
                              >
                                {t(linkKey)}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Separator className="my-4 bg-bone-cream" />

            <div className="flex flex-col gap-3 px-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('about');
                }}
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
              >
                <User className="size-4" />
                {t('footer.ourHistory')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('athletes');
                }}
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
              >
                <Users className="size-4" />
                {t('footer.athletes')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('technology');
                }}
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
              >
                <Cpu className="size-4" />
                {t('footer.technology')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('blog');
                }}
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
              >
                <BookOpen className="size-4" />
                {t('footer.blog')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('contact');
                }}
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
              >
                <Mail className="size-4" />
                {t('contact.breadcrumb.contact')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSearchOpen?.();
                }}
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
              >
                <Search className="size-4" />
                {t('mobile.search')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('cart');
                }}
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
              >
                <ShoppingBag className="size-4" />
                {t('mobile.cart')}
                {itemCount() > 0 && (
                  <Badge className="bg-stadium-crimson text-white border-0 px-1.5 py-0">
                    {itemCount()}
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
