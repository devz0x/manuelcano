'use client';

import { useState, useEffect, useCallback } from 'react';
import { Truck, ShieldCheck, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const announcementKeys = [
  { key: 'utility.announcement1', icon: Truck },
  { key: 'utility.announcement2', icon: ShieldCheck },
  { key: 'utility.announcement3', icon: Globe },
];

export function UtilityBar() {
  const { t, locale, setLocale } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const rotate = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % announcementKeys.length);
      setIsAnimating(false);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(rotate, 4000);
    return () => clearInterval(interval);
  }, [rotate]);

  const activeAnnouncement = announcementKeys[activeIndex];
  const Icon = activeAnnouncement.icon;

  return (
    <div className="flex items-center justify-between bg-diamond-navy px-4 py-2 text-xs text-bone-cream/80 sm:px-6">
      {/* Left: Rotating announcements */}
      <div className="relative flex min-h-[20px] flex-1 items-center overflow-hidden">
        <div
          className={`flex w-full items-center gap-2 font-medium tracking-wide transition-all duration-400 ease-in-out ${
            isAnimating
              ? 'absolute translate-y-full opacity-0'
              : 'relative translate-y-0 opacity-100'
          }`}
        >
          <Icon className="size-3.5 shrink-0 text-gold-glove" />
          <span>{t(activeAnnouncement.key)}</span>
        </div>
      </div>

      {/* Right: Language toggle */}
      <div className="flex items-center gap-1.5 ml-4 pl-4 border-l border-bone-cream/20 shrink-0">
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
  );
}
