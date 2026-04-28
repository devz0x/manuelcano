'use client';

import { Minus, Plus, Trash2, Truck, Gift } from 'lucide-react';
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
import { useNavigationStore } from '@/lib/navigation-store';
import { MCLogo } from './mc-logo';

const FREE_SHIPPING_THRESHOLD = 100;

function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function FreeShippingBar({ total }: { total: number }) {
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);
  const qualified = total >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="space-y-2 px-6 pb-4 pt-1">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium text-dugout-charcoal">
          <Truck className="h-3.5 w-3.5 text-field-green" />
          {qualified ? (
            <span className="text-field-green">Free shipping unlocked!</span>
          ) : (
            <span>
              Add <span className="font-bold text-stadium-crimson">{formatPrice(remaining)}</span> for free shipping
            </span>
          )}
        </div>
        {!qualified && (
          <span className="text-neutral-400">{formatPrice(total)} / {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
        )}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            qualified ? 'bg-field-green' : 'bg-stadium-crimson'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
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
        className="flex w-full flex-col p-0 sm:max-w-[420px]"
      >
        {/* Header */}
        <SheetHeader className="border-b border-neutral-100 px-6 py-4">
          <SheetTitle className="font-headline text-base uppercase tracking-widest text-diamond-navy">
            {t('cart.title')}
            {items.length > 0 && (
              <span className="ml-2 text-sm font-body normal-case tracking-normal text-neutral-400">
                ({items.length})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-bone-cream">
              <MCLogo height={40} iconOnly />
            </div>
            <div>
              <p className="font-headline text-base uppercase tracking-wide text-dugout-charcoal">
                {t('cart.empty')}
              </p>
              <p className="mt-1.5 text-sm text-neutral-400">
                {t('cart.emptyDesc')}
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-1 h-11 w-full max-w-[240px] border-diamond-navy font-headline text-xs uppercase tracking-widest text-diamond-navy hover:bg-diamond-navy hover:text-white"
              onClick={closeCart}
            >
              {t('cart.continueShopping')}
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            <FreeShippingBar total={total()} />

            {/* Items List */}
            <ScrollArea className="flex-1">
              <div className="flex flex-col">
                {items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-4 px-6 py-4">
                      {/* Thumbnail */}
                      <button
                        onClick={() => {
                          closeCart();
                          navigate('product', { slug: item.name.toLowerCase().replace(/\s+/g, '-') });
                        }}
                        className="relative size-[72px] shrink-0 overflow-hidden rounded-md bg-bone-cream transition-opacity hover:opacity-80"
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="72px"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center">
                            <MCLogo height={28} iconOnly />
                          </div>
                        )}
                      </button>

                      {/* Info */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="truncate text-sm font-medium text-dugout-charcoal">
                              {item.name}
                            </h4>
                            {item.size && (
                              <p className="text-xs text-neutral-400">
                                {t('cart.size')}: {item.size}
                              </p>
                            )}
                            {item.color && (
                              <p className="text-xs text-neutral-400">
                                {t('cart.color')}: {item.color}
                              </p>
                            )}
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="shrink-0 p-1 text-neutral-300 transition-colors hover:text-stadium-crimson"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-neutral-200">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="flex h-7 w-7 items-center justify-center text-neutral-400 transition-colors hover:text-dugout-charcoal"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-medium text-dugout-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex h-7 w-7 items-center justify-center text-neutral-400 transition-colors hover:text-dugout-charcoal"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-dugout-charcoal">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {index < items.length - 1 && (
                      <Separator className="mx-6 bg-neutral-100" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-neutral-100 px-6 py-5">
              {/* Gift promo */}
              {total() < FREE_SHIPPING_THRESHOLD && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-bone-cream px-3 py-2.5">
                  <Gift className="h-4 w-4 shrink-0 text-stadium-crimson" />
                  <p className="text-xs text-tobacco-leather">
                    Add <span className="font-bold">{formatPrice(FREE_SHIPPING_THRESHOLD - total())}</span> more for free shipping!
                  </p>
                </div>
              )}

              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-neutral-500">
                  {t('cart.total')}
                </span>
                <span className="font-headline text-lg tracking-wide text-diamond-navy">
                  {formatPrice(total())}
                </span>
              </div>

              <Button
                onClick={() => {
                  closeCart();
                  navigate('checkout');
                }}
                className="mb-2 h-12 w-full bg-diamond-navy font-headline text-sm uppercase tracking-widest text-bone-cream hover:bg-diamond-navy/90"
              >
                {t('cart.checkout')}
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  closeCart();
                  navigate('cart');
                }}
                className="w-full text-xs uppercase tracking-widest text-neutral-400 hover:text-dugout-charcoal"
              >
                {t('cart.viewCart')}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
