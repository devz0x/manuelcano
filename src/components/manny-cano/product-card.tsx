'use client';

import Image from 'next/image';
import { Star, ShoppingBag } from 'lucide-react';
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < Math.round(rating)
              ? 'fill-gold-glove text-gold-glove'
              : 'fill-none text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
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
      className: 'bg-stadium-crimson',
    },
    nuevo: {
      labelKey: 'products.new',
      className: 'bg-field-green',
    },
    premium: {
      labelKey: 'products.premium',
      className: 'bg-gold-glove',
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

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
      onClick={() => navigate('product', { slug })}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-bone-cream">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {firstBadge && (
          <span
            className={`absolute left-3 top-3 ${firstBadge.className} px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white`}
          >
            {t(firstBadge.labelKey)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="line-clamp-2 font-headline text-sm uppercase tracking-wide text-diamond-navy">
          {name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={rating} />
          <span className="text-xs text-muted-foreground">
            ({reviewCount} {t('products.reviews')})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-headline text-xl text-diamond-navy">
            {formatPrice(price)}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-3 flex w-full items-center justify-center gap-2 bg-diamond-navy py-2 font-headline text-xs uppercase tracking-wider text-white transition-colors hover:bg-diamond-navy/90"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          {t('products.addToCart')}
        </button>
      </div>
    </div>
  );
}
