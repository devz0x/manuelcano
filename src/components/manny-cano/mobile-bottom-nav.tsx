'use client';

import { House, ShoppingBag, Palette, Search, User } from 'lucide-react';
import { useNavigationStore } from '@/lib/navigation-store';
import { useI18n } from '@/lib/i18n';

interface MobileBottomNavProps {
  onSearchOpen?: () => void;
}

const tabs = [
  { view: 'home' as const, icon: House, labelKey: 'mobile.home' },
  { view: 'shop' as const, icon: ShoppingBag, labelKey: 'mobile.shop' },
  { view: 'configurator' as const, icon: Palette, labelKey: 'mobile.custom' },
  { view: '_search' as const, icon: Search, labelKey: 'mobile.search' },
  { view: 'about' as const, icon: User, labelKey: 'mobile.account' },
];

export function MobileBottomNav({ onSearchOpen }: MobileBottomNavProps) {
  const view = useNavigationStore((s) => s.view);
  const navigate = useNavigationStore((s) => s.navigate);
  const { t } = useI18n();

  const handleTabClick = (tab: (typeof tabs)[number]) => {
    if (tab.view === '_search') {
      onSearchOpen?.();
    } else {
      navigate(tab.view);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-bone-cream bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex h-[60px] items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            tab.view === '_search'
              ? false
              : view === tab.view;
          const Icon = tab.icon;

          return (
            <button
              key={tab.view}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors duration-200 ${
                isActive
                  ? 'text-stadium-crimson'
                  : 'text-dugout-charcoal/50 hover:text-dugout-charcoal'
              }`}
              aria-label={t(tab.labelKey)}
            >
              <Icon className="size-[22px]" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium leading-none">
                {t(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
