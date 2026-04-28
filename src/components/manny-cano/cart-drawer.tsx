'use client';

import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
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

/* ------------------------------------------------------------------ */
/*  Price formatter                                                     */
/* ------------------------------------------------------------------ */

function formatPrice(amount: number): string {
  return `RD$${amount.toLocaleString('es-DO', { minimumFractionDigits: 0 })}`;
}

/* ------------------------------------------------------------------ */
/*  Cart Drawer                                                         */
/* ------------------------------------------------------------------ */

export function CartDrawer() {
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
            Tu Carrito
            {items.length > 0 && (
              <span className="ml-2 text-sm font-body normal-case tracking-normal text-tobacco-leather">
                ({items.length} {items.length === 1 ? 'artículo' : 'artículos'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-bone-cream">
              <ShoppingBag className="size-8 text-tobacco-leather/50" />
            </div>
            <div>
              <p className="font-headline text-lg uppercase tracking-wide text-dugout-charcoal">
                Tu carrito está vacío
              </p>
              <p className="mt-1 text-sm text-tobacco-leather">
                Explora nuestra selección de equipamiento profesional.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-2 border-diamond-navy font-headline uppercase tracking-wide text-diamond-navy hover:bg-diamond-navy hover:text-white"
              onClick={closeCart}
            >
              Seguir Comprando
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
                            <ShoppingBag className="size-6 text-tobacco-leather/30" />
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
                              Talla: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-xs text-tobacco-leather">
                              Color: {item.color}
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
                              aria-label="Disminuir cantidad"
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
                              aria-label="Aumentar cantidad"
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
                        aria-label="Eliminar artículo"
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
                  Total
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
                  Ver Carrito
                </Button>
                <Button className="w-full bg-stadium-crimson font-headline uppercase tracking-wide text-white hover:bg-stadium-crimson/90">
                  Checkout
                </Button>
              </div>

              <p className="mt-3 text-center text-xs text-tobacco-leather/70">
                Envío y calculado en el checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
