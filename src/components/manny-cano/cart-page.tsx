'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Shield,
  RotateCcw,
  Award,
  ChevronRight,
  Home,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCartStore, type CartItem } from '@/lib/store';
import { useNavigationStore } from '@/lib/navigation-store';
import { useI18n } from '@/lib/i18n';
import { toast } from 'sonner';

/* ------------------------------------------------------------------ */
/*  Price formatter (USD)                                               */
/* ------------------------------------------------------------------ */

function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/* ------------------------------------------------------------------ */
/*  Cart Page                                                           */
/* ------------------------------------------------------------------ */

export function CartPage() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) => s.total);
  const clearCart = useCartStore((s) => s.clearCart);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const isEmpty = items.length === 0;
  const subtotal = total();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const taxEstimate = subtotal * 0.08;
  const orderTotal = subtotal + shipping;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    // Demo promo code handling
    setPromoApplied(true);
    toast.success(t('cartPage.promoApplied') || `Promo code "${promoCode}" applied!`);
  };

  const handleRemoveItem = (item: CartItem) => {
    removeItem(item.id);
    toast.success(t('cartPage.itemRemoved') || `${item.name} removed from cart`);
  };

  /* ---- Empty Cart State ---- */
  if (isEmpty) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate('home')}
                className="cursor-pointer font-body text-sm text-tobacco-leather transition-colors hover:text-diamond-navy"
              >
                <Home className="mr-1 size-4" />
                {t('cartPage.breadcrumbHome') || 'Home'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-body text-sm font-medium text-dugout-charcoal">
                {t('cartPage.title') || 'Cart'}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 flex size-28 items-center justify-center rounded-full bg-bone-cream">
            <ShoppingBag className="size-14 text-tobacco-leather/40" />
          </div>
          <h1 className="mb-2 font-headline text-3xl uppercase tracking-wider text-diamond-navy">
            {t('cartPage.emptyTitle') || 'Your cart is empty'}
          </h1>
          <p className="mb-8 max-w-md font-body text-base text-tobacco-leather">
            {t('cartPage.emptyDesc') ||
              'Looks like you haven\'t added anything to your cart yet. Explore our collection of professional baseball equipment.'}
          </p>
          <Button
            onClick={() => navigate('shop')}
            className="bg-stadium-crimson px-8 font-headline uppercase tracking-wide text-white hover:bg-stadium-crimson/90"
          >
            {t('cartPage.continueShopping') || 'Continue Shopping'}
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    );
  }

  /* ---- Cart with Items ---- */
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('home')}
              className="cursor-pointer font-body text-sm text-tobacco-leather transition-colors hover:text-diamond-navy"
            >
              <Home className="mr-1 size-4" />
              {t('cartPage.breadcrumbHome') || 'Home'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-body text-sm font-medium text-dugout-charcoal">
              {t('cartPage.title') || 'Cart'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl uppercase tracking-wider text-diamond-navy lg:text-4xl">
            {t('cartPage.title') || 'Your Cart'}
          </h1>
          <p className="mt-1 font-body text-sm text-tobacco-leather">
            {items.length} {items.length === 1 ? (t('cartPage.item') || 'item') : (t('cartPage.items') || 'items')}
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={clearCart}
          className="font-body text-sm text-tobacco-leather hover:text-stadium-crimson"
        >
          <Trash2 className="mr-1 size-4" />
          {t('cartPage.clearCart') || 'Clear Cart'}
        </Button>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-0 divide-y divide-bone-cream rounded-lg border border-bone-cream bg-white">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 sm:gap-6 sm:p-6">
                {/* Image */}
                <div className="relative size-16 flex-shrink-0 overflow-hidden rounded-md bg-bone-cream sm:size-[64px]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <ShoppingBag className="size-6 text-tobacco-leather/30" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-dugout-charcoal sm:text-base">
                        {item.name}
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {item.size && (
                          <Badge
                            variant="outline"
                            className="border-bone-cream bg-bone-cream/50 font-body text-xs text-tobacco-leather"
                          >
                            {t('cart.size') || 'Size'}: {item.size}
                          </Badge>
                        )}
                        {item.color && (
                          <Badge
                            variant="outline"
                            className="border-bone-cream bg-bone-cream/50 font-body text-xs text-tobacco-leather"
                          >
                            {t('cart.color') || 'Color'}: {item.color}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="flex-shrink-0 p-1 text-tobacco-leather/50 transition-colors hover:text-stadium-crimson"
                      aria-label={t('cartPage.removeItem') || 'Remove item'}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex size-7 items-center justify-center rounded-md border border-bone-cream text-dugout-charcoal transition-colors hover:border-stadium-crimson hover:text-stadium-crimson"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-8 text-center font-body text-sm font-medium text-dugout-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex size-7 items-center justify-center rounded-md border border-bone-cream text-dugout-charcoal transition-colors hover:border-stadium-crimson hover:text-stadium-crimson"
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="font-headline text-base font-semibold text-diamond-navy sm:text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping Link */}
          <div className="mt-6">
            <button
              onClick={() => navigate('shop')}
              className="group inline-flex items-center gap-1 font-body text-sm text-tobacco-leather transition-colors hover:text-diamond-navy"
            >
              <ChevronRight className="size-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
              {t('cartPage.continueShopping') || 'Continue Shopping'}
            </button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6 rounded-lg border border-bone-cream bg-white p-6">
            <h2 className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
              {t('cartPage.orderSummary') || 'Order Summary'}
            </h2>

            {/* Promo Code */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-tobacco-leather/40" />
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={t('cartPage.promoPlaceholder') || 'Enter promo code'}
                    className="pl-9 font-body"
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  className="border-diamond-navy font-headline uppercase tracking-wide text-diamond-navy hover:bg-diamond-navy hover:text-white"
                >
                  {promoApplied
                    ? (t('cartPage.promoAppliedBtn') || 'Applied')
                    : (t('cartPage.promoApply') || 'Apply')}
                </Button>
              </div>
            </div>

            <Separator className="bg-bone-cream" />

            {/* Price Breakdown */}
            <div className="space-y-3 font-body">
              <div className="flex items-center justify-between text-sm">
                <span className="text-tobacco-leather">
                  {t('cartPage.subtotal') || 'Subtotal'}
                </span>
                <span className="font-medium text-dugout-charcoal">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-tobacco-leather">
                  {t('cartPage.shipping') || 'Shipping'}
                </span>
                <span
                  className={`font-medium ${shipping === 0 ? 'text-field-green' : 'text-dugout-charcoal'}`}
                >
                  {shipping === 0
                    ? (t('cartPage.freeShipping') || 'FREE')
                    : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-tobacco-leather/70">
                  {t('cartPage.freeShippingNote') || `Free shipping on orders over $100`}
                </p>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-tobacco-leather">
                  {t('cartPage.tax') || 'Estimated Tax'}
                </span>
                <span className="font-medium text-dugout-charcoal">
                  {formatPrice(taxEstimate)}
                </span>
              </div>
            </div>

            <Separator className="bg-bone-cream" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="font-headline text-base uppercase tracking-wide text-diamond-navy">
                {t('cartPage.total') || 'Total'}
              </span>
              <span className="font-headline text-xl font-bold text-diamond-navy">
                {formatPrice(orderTotal)}
              </span>
            </div>

            {/* Proceed to Checkout */}
            <Button
              onClick={() => navigate('checkout')}
              className="w-full bg-stadium-crimson py-6 font-headline text-base uppercase tracking-wide text-white hover:bg-stadium-crimson/90"
            >
              {t('cartPage.proceedToCheckout') || 'Proceed to Checkout'}
              <ChevronRight className="ml-1 size-4" />
            </Button>

            <Separator className="bg-bone-cream" />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Shield className="size-5 text-gold-glove" />
                <span className="font-body text-[10px] leading-tight text-tobacco-leather">
                  {t('cartPage.trustSecurePayment') || 'Secure Payment'}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <RotateCcw className="size-5 text-gold-glove" />
                <span className="font-body text-[10px] leading-tight text-tobacco-leather">
                  {t('cartPage.trustFreeReturns') || 'Free Returns'}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Award className="size-5 text-gold-glove" />
                <span className="font-body text-[10px] leading-tight text-tobacco-leather">
                  {t('cartPage.trustProWarranty') || 'Pro Warranty'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
