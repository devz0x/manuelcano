'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';
import { Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  images: string;
  rating: number;
  reviewCount: number;
  badges: string;
  categoryId: number;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const trendingTerms = [
  { es: 'Guante Infield', en: 'Infield Glove' },
  { es: 'Bate Madera', en: 'Wood Bat' },
  { es: 'Catcher Set', en: 'Catcher Set' },
  { es: 'Bat Pack', en: 'Bat Pack' },
  { es: 'Pelotas Pro', en: 'Pro Balls' },
];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const { t, locale } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all products on mount
  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
        }
      })
      .catch(() => {});
  }, []);

  // Focus input when dialog opens and reset on close
  const prevOpenRef = useRef(open);
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    prevOpenRef.current = open;
  }, [open]);

  // Reset search state when dialog closes (handled via timeout to avoid cascading renders)
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Defer state reset to after the close animation
      setTimeout(() => {
        setQuery('');
        setResults([]);
      }, 50);
    }
    onOpenChange(newOpen);
  };

  // Search products
  const searchProducts = useCallback(
    (searchQuery: string) => {
      if (searchQuery.trim().length < 2) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      const q = searchQuery.toLowerCase();

      const filtered = products.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const badgeMatch = p.badges.toLowerCase().includes(q);
        return nameMatch || badgeMatch;
      });

      // Small delay for UX feel
      setTimeout(() => {
        setResults(filtered);
        setIsSearching(false);
      }, 200);
    },
    [products]
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, searchProducts]);

  const handleProductClick = (slug: string) => {
    handleOpenChange(false);
    navigate('product', { slug });
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
  };

  const getBadgeLabel = (badge: string) => {
    if (badge === 'bestseller') return t('products.moreSold');
    if (badge === 'nuevo') return t('products.new');
    if (badge === 'premium') return t('products.premium');
    return badge;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0 sm:max-w-2xl">
        {/* Search Input */}
        <div className="flex items-center border-b border-bone-cream px-4 py-3">
          <Search className="mr-3 size-5 text-tobacco-leather" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 bg-transparent text-lg text-diamond-navy placeholder:text-tobacco-leather/50 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Escape') handleOpenChange(false);
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="ml-2 rounded-full p-1 text-tobacco-leather/50 hover:text-dugout-charcoal"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <DialogHeader className="sr-only">
          <DialogTitle>{t('search.title')}</DialogTitle>
        </DialogHeader>

        {/* Results / Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            /* Trending / Popular */
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="size-4 text-gold-glove" />
                <h3 className="font-headline text-sm uppercase tracking-widest text-tobacco-leather">
                  {t('search.trending')}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTerms.map((term) => (
                  <button
                    key={term.en}
                    onClick={() => handleTrendingClick(locale === 'es' ? term.es : term.en)}
                    className="rounded-full border border-bone-cream bg-bone-cream/50 px-4 py-2 text-sm text-dugout-charcoal transition-colors hover:border-gold-glove hover:text-diamond-navy"
                  >
                    {locale === 'es' ? term.es : term.en}
                  </button>
                ))}
              </div>
            </div>
          ) : isSearching ? (
            /* Loading skeleton */
            <div className="space-y-3 p-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg p-2">
                  <div className="size-16 animate-pulse rounded-lg bg-bone-cream" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-bone-cream" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-bone-cream" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            /* Search Results */
            <div className="divide-y divide-bone-cream/50">
              <div className="px-4 py-2">
                <p className="text-sm text-tobacco-leather">
                  {results.length} {t('search.resultsFor')} &quot;{query}&quot;
                </p>
              </div>
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.slug)}
                  className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-bone-cream/30"
                >
                  <div className="relative size-16 flex-shrink-0 overflow-hidden rounded-lg bg-bone-cream">
                    <Image
                      src={product.images}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    {product.badges && (
                      <Badge className="absolute left-1 top-1 bg-stadium-crimson px-1.5 py-0 text-[9px] text-white border-0">
                        {getBadgeLabel(product.badges.split(',')[0])}
                      </Badge>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-diamond-navy">
                      {product.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-headline text-sm font-semibold text-stadium-crimson">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-tobacco-leather/50 line-through">
                          ${product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="flex items-center gap-0.5 text-xs text-tobacco-leather/70">
                        <Star className="size-3 fill-gold-glove text-gold-glove" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="size-4 flex-shrink-0 text-tobacco-leather/40" />
                </button>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-bone-cream">
                <Search className="size-7 text-tobacco-leather/40" />
              </div>
              <h3 className="font-headline text-lg text-diamond-navy">
                {t('search.noResults')}
              </h3>
              <p className="mt-1 max-w-sm text-sm text-tobacco-leather/70">
                {t('search.noResultsDesc')}
              </p>
              <button
                onClick={() => {
                  handleOpenChange(false);
                  navigate('shop');
                }}
                className="mt-4 font-headline text-sm uppercase tracking-wide text-stadium-crimson hover:underline"
              >
                {t('products.viewAll')} →
              </button>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-bone-cream bg-bone-cream/30 px-4 py-2">
          <p className="text-center text-xs text-tobacco-leather/50">
            <kbd className="rounded border border-bone-cream bg-white px-1.5 py-0.5 font-mono text-[10px]">
              ESC
            </kbd>{' '}
            to close ·{' '}
            <kbd className="rounded border border-bone-cream bg-white px-1.5 py-0.5 font-mono text-[10px]">
              ↵
            </kbd>{' '}
            to search
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
