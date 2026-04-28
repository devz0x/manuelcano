'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCartStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { MCLogo } from './mc-logo';

/* ------------------------------------------------------------------ */
/*  Price formatter (USD)                                               */
/* ------------------------------------------------------------------ */

function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/* ------------------------------------------------------------------ */
/*  Cart Drawer                                                         */
/* ------------------------------------------------------------------ */

export function CartDrawer() {
  const { t } = useI18n();
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) => s.total);

  const isEmpty = items.length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        {/* Header */}
        <SheetHeader className="border-b border-bone-cream px-6 py-4">
          <SheetTitle className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
            {t('cart.title')}
            {items.length > 0 && (
              <span className="ml-2 text-sm font-body normal-case tracking-normal text-tobacco-leather">
                ({items.length} {items.length === 1 ? t('cart.item') : t('cart.items')})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-bone-cream">
              <MCLogo height={48} iconOnly />
            </div>
            <div>
              <p className="font-headline text-lg uppercase tracking-wide text-dugout-charcoal">
                {t('cart.empty')}
              </p>
              <p className="mt-1 text-sm text-tobacco-leather">
                {t('cart.emptyDesc')}
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-2 border-diamond-navy font-headline uppercase tracking-wide text-diamond-navy hover:bg-diamond-navy hover:text-white"
              onClick={closeCart}
            >
              {t('cart.continueShopping')}
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-0">
                {items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-4 px-6 py-4">
                      {/* Thumbnail */}
                      <div className="relative size-20 flex-shrink-0 overflow-hidden rounded-md bg-bone-cream">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center">
                            <MCLogo height={32} iconOnly />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <h4 className="truncate text-sm font-semibold text-dugout-charcoal">
                            {item.name}
                          </h4>
                          {item.size && (
                            <p className="text-xs text-tobacco-leather">
                              {t('cart.size')}: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-xs text-tobacco-leather">
                              {t('cart.color')}: {item.color}
                            </p>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-semibold text-diamond-navy">
                            {formatPrice(item.price)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="flex size-7 items-center justify-center rounded-md border border-bone-cream text-dugout-charcoal transition-colors hover:border-stadium-crimson hover:text-stadium-crimson"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-dugout-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex size-7 items-center justify-center rounded-md border border-bone-cream text-dugout-charcoal transition-colors hover:border-stadium-crimson hover:text-stadium-crimson"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start p-1 text-tobacco-leather/50 transition-colors hover:text-stadium-crimson"
                        aria-label="Remove item"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    {index < items.length - 1 && (
                      <Separator className="mx-6 bg-bone-cream" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-bone-cream px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-headline text-sm uppercase tracking-wide text-tobacco-leather">
                  {t('cart.total')}
                </span>
                <span className="font-headline text-xl tracking-wide text-diamond-navy">
                  {formatPrice(total())}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full border-diamond-navy font-headline uppercase tracking-wide text-diamond-navy hover:bg-diamond-navy hover:text-white"
                >
                  {t('cart.viewCart')}
                </Button>
                <Button className="w-full bg-stadium-crimson font-headline uppercase tracking-wide text-white hover:bg-stadium-crimson/90">
                  {t('cart.checkout')}
                </Button>
              </div>

              <p className="mt-3 text-center text-xs text-tobacco-leather/70">
                {t('cart.shippingNote')}
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
