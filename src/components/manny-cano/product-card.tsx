'use client';

import Image from 'next/image';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';
import { toast } from 'sonner';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badges?: string;
  slug: string;
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function ProductCard({
  id,
  name,
  price,
  compareAtPrice,
  image,
  rating,
  reviewCount,
  badges,
  slug,
}: ProductCardProps) {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const badgeConfig: Record<string, { labelKey: string; className: string }> = {
    bestseller: {
      labelKey: 'products.moreSold',
      className: 'bg-diamond-navy',
    },
    nuevo: {
      labelKey: 'products.new',
      className: 'bg-field-green',
    },
    premium: {
      labelKey: 'products.premium',
      className: 'bg-gold-glove text-diamond-navy',
    },
  };

  const badgeList = badges ? badges.split(',').map((b) => b.trim()) : [];
  const firstBadge = badgeConfig[badgeList[0]];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId: id,
      name,
      price,
      image,
    });
    openCart();
    toast.success(`${name} ${t('cart.added')}`);
  };

  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((compareAtPrice! - price) / compareAtPrice!) * 100)
    : 0;

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate('product', { slug })}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-bone-cream">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge - top left */}
        {firstBadge && (
          <span
            className={`absolute left-3 top-3 ${firstBadge.className} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white`}
          >
            {t(firstBadge.labelKey)}
          </span>
        )}

        {/* Discount badge - top right */}
        {hasDiscount && (
          <span className="absolute right-3 top-3 bg-stadium-crimson px-2 py-1 text-[10px] font-bold text-white">
            -{discountPct}%
          </span>
        )}

        {/* Wishlist button - always visible */}
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-dugout-charcoal opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-stadium-crimson group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>

        {/* Quick Add Overlay - bottom, slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 bg-diamond-navy/95 py-3 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-diamond-navy"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {t('products.addToCart')}
          </button>
        </div>
      </div>

      {/* Content - minimal, clean */}
      <div className="mt-3 space-y-1.5">
        {/* Product Name */}
        <h3 className="truncate text-sm font-medium text-dugout-charcoal">
          {name}
        </h3>

        {/* Rating - subtle */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(rating)
                    ? 'fill-gold-glove text-gold-glove'
                    : 'fill-none text-neutral-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-neutral-400">
            {reviewCount}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-dugout-charcoal">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
