'use client';

import { Ruler, ShieldCheck, Truck, Globe } from 'lucide-react';

export function UtilityBar() {
  return (
    <div className="hidden md:flex items-center justify-between bg-diamond-navy px-6 py-2 text-xs text-bone-cream/80">
      {/* Left: Promo text */}
      <div className="flex items-center gap-2 font-medium tracking-wide">
        <Truck className="size-3.5 text-gold-glove" />
        <span>
          ENVÍO GRATIS DENTRO DE RD EN COMPRAS DE{' '}
          <span className="text-gold-glove font-semibold">RD$5,000+</span>
        </span>
      </div>

      {/* Right: Links */}
      <div className="flex items-center gap-5">
        <a
          href="#"
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <Ruler className="size-3" />
          Guía de Tallas
        </a>
        <a
          href="#"
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <ShieldCheck className="size-3" />
          Garantía Pro
        </a>
        <a
          href="#"
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <Truck className="size-3" />
          Rastrear Pedido
        </a>
        <div className="flex items-center gap-1.5 ml-2 pl-4 border-l border-bone-cream/20">
          <Globe className="size-3" />
          <button className="font-semibold text-white transition-colors hover:text-gold-glove">
            ES
          </button>
          <span className="text-bone-cream/40">/</span>
          <button className="transition-colors hover:text-white">EN</button>
        </div>
      </div>
    </div>
  );
}
