'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Diamond,
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

/* ------------------------------------------------------------------ */
/*  Mega Menu Data                                                      */
/* ------------------------------------------------------------------ */

interface MegaMenuColumn {
  title: string;
  links: string[];
}

interface MegaMenuData {
  label: string;
  columns: MegaMenuColumn[];
}

const megaMenuData: MegaMenuData[] = [
  {
    label: 'Guantes',
    columns: [
      {
        title: 'Por Posición',
        links: ['Infield', 'Outfield', 'Pitcher', 'Primera Base', 'Catcher'],
      },
      {
        title: 'Por Serie',
        links: ['Profesional', 'Heritage', 'Diamante', 'Cantera'],
      },
    ],
  },
  {
    label: 'Bates',
    columns: [
      {
        title: 'Por Material',
        links: ['Madera', 'Aluminio', 'Compuesto'],
      },
      {
        title: 'Por Certificación',
        links: ['BBCOR', 'USSSA', 'USA'],
      },
    ],
  },
  {
    label: 'Catcher',
    columns: [
      { title: 'Equipos Completos', links: ['Serie Profesional', 'Serie Cantera'] },
      {
        title: 'Piezas Individuales',
        links: ['Mascara', 'Pechera', 'Espinilleras', 'Guante de Catcher', 'Mitones'],
      },
    ],
  },
  {
    label: 'Pelotas',
    columns: [
      {
        title: 'Por Uso',
        links: ['Partido', 'Práctica', 'Softball', 'Entrenamiento'],
      },
      { title: 'Por Cantidad', links: ['1 Docena', '3 Docenas', 'Balde'] },
    ],
  },
  {
    label: 'Mochilas',
    columns: [
      {
        title: 'Por Tipo',
        links: ['Bat Pack', 'Catcher Bag', 'Roller Bag', 'Mochila de Día', 'Gym Bag'],
      },
    ],
  },
  {
    label: 'Accesorios',
    columns: [
      { title: 'Bateo', links: ['Batting Gloves', 'Donas', 'Pesos de Bate'] },
      { title: 'Cuidado', links: ['Aceite de Cuero', 'Condicionador', 'Cepillo'] },
      { title: 'Vestimenta', links: ['Camisetas', 'Pantalones', 'Sudaderas', ' Gorras'] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Navbar Component                                                    */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemCount = useCartStore((s) => s.itemCount);
  const openCart = useCartStore((s) => s.openCart);

  /* Hover handlers for mega menu */
  const handleMouseEnter = useCallback((label: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setActiveMenu(label);
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

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Left: Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <Diamond className="size-6 text-stadium-crimson transition-transform group-hover:rotate-12" />
            <span className="font-headline text-xl uppercase tracking-wider text-diamond-navy">
              Manny Cano
            </span>
          </a>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:block" onMouseLeave={handleMouseLeave}>
            <ul className="flex items-center gap-1">
              {megaMenuData.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 font-headline text-sm uppercase tracking-wide text-dugout-charcoal transition-colors hover:text-stadium-crimson"
                    onClick={() =>
                      setActiveMenu(activeMenu === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-200 ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Panel */}
                  {activeMenu === item.label && (
                    <div
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-[560px] rounded-lg border border-bone-cream bg-white p-6 shadow-xl">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                          {item.columns.map((col) => (
                            <div key={col.title}>
                              <h4 className="mb-2 font-headline text-xs uppercase tracking-widest text-tobacco-leather">
                                {col.title}
                              </h4>
                              <ul className="space-y-1.5">
                                {col.links.map((link) => (
                                  <li key={link}>
                                    <a
                                      href="#"
                                      className="block text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
                                    >
                                      {link}
                                    </a>
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
              className="text-dugout-charcoal hover:text-stadium-crimson"
              aria-label="Buscar"
            >
              <Search className="size-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex text-dugout-charcoal hover:text-stadium-crimson"
              aria-label="Cuenta"
            >
              <User className="size-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-dugout-charcoal hover:text-stadium-crimson"
              aria-label="Carrito"
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
              className="lg:hidden text-dugout-charcoal hover:text-stadium-crimson"
              aria-label="Menú"
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
              <Diamond className="size-5 text-stadium-crimson" />
              <SheetTitle className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
                Menú
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="px-4 py-4">
            <Accordion type="single" collapsible className="w-full">
              {megaMenuData.map((item) => (
                <AccordionItem key={item.label} value={item.label}>
                  <AccordionTrigger className="font-headline text-sm uppercase tracking-wide text-dugout-charcoal hover:text-stadium-crimson hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.columns.map((col) => (
                      <div key={col.title} className="mb-3">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-tobacco-leather">
                          {col.title}
                        </p>
                        <ul className="space-y-1.5 pl-1">
                          {col.links.map((link) => (
                            <li key={link}>
                              <a
                                href="#"
                                className="block text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {link}
                              </a>
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

            <div className="flex items-center gap-4 px-1">
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
              >
                <User className="size-4" />
                Mi Cuenta
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
              >
                <Search className="size-4" />
                Buscar
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-dugout-charcoal transition-colors hover:text-stadium-crimson"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
              >
                <ShoppingBag className="size-4" />
                Carrito
                {itemCount() > 0 && (
                  <Badge className="bg-stadium-crimson text-white border-0 px-1.5 py-0">
                    {itemCount()}
                  </Badge>
                )}
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
