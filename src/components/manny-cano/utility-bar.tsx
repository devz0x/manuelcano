'use client';

import { Ruler, ShieldCheck, Truck, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function UtilityBar() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="hidden md:flex items-center justify-between bg-diamond-navy px-6 py-2 text-xs text-bone-cream/80">
      {/* Left: Promo text */}
      <div className="flex items-center gap-2 font-medium tracking-wide">
        <Truck className="size-3.5 text-gold-glove" />
        <span>
          {t('utility.freeShipping').replace(t('utility.freeShippingHighlight'), '')}
          <span className="text-gold-glove font-semibold">{t('utility.freeShippingHighlight')}</span>
        </span>
      </div>

      {/* Right: Links */}
      <div className="flex items-center gap-5">
        <a
          href="#"
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <Ruler className="size-3" />
          {t('utility.sizeGuide')}
        </a>
        <a
          href="#"
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <ShieldCheck className="size-3" />
          {t('utility.warranty')}
        </a>
        <a
          href="#"
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <Truck className="size-3" />
          {t('utility.trackOrder')}
        </a>
        <div className="flex items-center gap-1.5 ml-2 pl-4 border-l border-bone-cream/20">
          <Globe className="size-3" />
          <button
            className={`transition-colors ${locale === 'es' ? 'font-semibold text-white' : 'hover:text-white'}`}
            onClick={() => setLocale('es')}
          >
            ES
          </button>
          <span className="text-bone-cream/40">/</span>
          <button
            className={`transition-colors ${locale === 'en' ? 'font-semibold text-white' : 'hover:text-white'}`}
            onClick={() => setLocale('en')}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}
