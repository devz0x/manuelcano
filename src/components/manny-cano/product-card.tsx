'use client';

import Image from 'next/image';
import { Star, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
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

const badgeConfig: Record<string, { label: string; className: string }> = {
  bestseller: {
    label: 'MÁS VENDIDO',
    className: 'bg-stadium-crimson',
  },
  nuevo: {
    label: 'NUEVO',
    className: 'bg-field-green',
  },
  premium: {
    label: 'PREMIUM',
    className: 'bg-gold-glove',
  },
};

function formatPrice(price: number): string {
  return `RD$${price.toLocaleString('es-DO')}`;
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
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const badgeList = badges ? badges.split(',').map((b) => b.trim()) : [];
  const firstBadge = badgeConfig[badgeList[0]];

  const handleAddToCart = () => {
    addItem({
      productId: id,
      name,
      price,
      image,
    });
    openCart();
    toast.success(`${name} agregado al carrito`);
  };

  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
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
            {firstBadge.label}
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
            ({reviewCount})
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
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
