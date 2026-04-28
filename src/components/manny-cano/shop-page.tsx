'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronUp,
  X,
  Home,
  ChevronRight,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: number;
  collectionId: number | null;
  images: string;
  specs: string;
  stock: number;
  rating: number;
  reviewCount: number;
  badges: string;
  isActive: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
}

interface Collection {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  priceRange: string;
  color: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PRODUCTS_PER_PAGE = 8;

const PRICE_RANGES = [
  { key: 'under50', min: 0, max: 50 },
  { key: '50to150', min: 50, max: 150 },
  { key: '150to300', min: 150, max: 300 },
  { key: 'over300', min: 300, max: Infinity },
] as const;

type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'rating';

type ViewMode = 'grid' | 'list';

// ─── Animation variants ─────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

// ─── Filter Sidebar ─────────────────────────────────────────────────────────

interface FilterSidebarProps {
  categories: Category[];
  collections: Collection[];
  selectedCategories: number[];
  selectedCollections: number[];
  selectedPriceRanges: string[];
  selectedBadges: string[];
  onSaleOnly: boolean;
  onCategoryToggle: (id: number) => void;
  onCollectionToggle: (id: number) => void;
  onPriceRangeToggle: (key: string) => void;
  onBadgeToggle: (badge: string) => void;
  onSaleToggle: () => void;
  onClearAll: () => void;
  t: (key: string) => string;
}

function FilterSidebar({
  categories,
  collections,
  selectedCategories,
  selectedCollections,
  selectedPriceRanges,
  selectedBadges,
  onSaleOnly,
  onCategoryToggle,
  onCollectionToggle,
  onPriceRangeToggle,
  onBadgeToggle,
  onSaleToggle,
  onClearAll,
  t,
}: FilterSidebarProps) {
  const hasFilters =
    selectedCategories.length > 0 ||
    selectedCollections.length > 0 ||
    selectedPriceRanges.length > 0 ||
    selectedBadges.length > 0 ||
    onSaleOnly;

  return (
    <div className="space-y-6">
      {/* Header + Clear All */}
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-sm uppercase tracking-wider text-diamond-navy">
          {t('shop.filters')}
        </h3>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-xs font-medium text-stadium-crimson transition-colors hover:text-stadium-crimson/80"
          >
            {t('shop.clearAll')}
          </button>
        )}
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h4 className="mb-3 font-headline text-xs uppercase tracking-wider text-tobacco-leather">
          {t('shop.category')}
        </h4>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => onCategoryToggle(cat.id)}
                className="data-[state=checked]:border-diamond-navy data-[state=checked]:bg-diamond-navy"
              />
              <span className="text-dugout-charcoal">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Collections */}
      <div>
        <h4 className="mb-3 font-headline text-xs uppercase tracking-wider text-tobacco-leather">
          {t('shop.collection')}
        </h4>
        <div className="space-y-2.5">
          {collections.map((col) => (
            <label
              key={col.id}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <Checkbox
                checked={selectedCollections.includes(col.id)}
                onCheckedChange={() => onCollectionToggle(col.id)}
                className="data-[state=checked]:border-diamond-navy data-[state=checked]:bg-diamond-navy"
              />
              <span className="text-dugout-charcoal">{col.name}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="mb-3 font-headline text-xs uppercase tracking-wider text-tobacco-leather">
          {t('shop.priceRange')}
        </h4>
        <div className="space-y-2.5">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.key}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <Checkbox
                checked={selectedPriceRanges.includes(range.key)}
                onCheckedChange={() => onPriceRangeToggle(range.key)}
                className="data-[state=checked]:border-diamond-navy data-[state=checked]:bg-diamond-navy"
              />
              <span className="text-dugout-charcoal">
                {t(`shop.price.${range.key}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Badges */}
      <div>
        <h4 className="mb-3 font-headline text-xs uppercase tracking-wider text-tobacco-leather">
          {t('shop.badges')}
        </h4>
        <div className="space-y-2.5">
          {['bestseller', 'nuevo', 'premium'].map((badge) => (
            <label
              key={badge}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <Checkbox
                checked={selectedBadges.includes(badge)}
                onCheckedChange={() => onBadgeToggle(badge)}
                className="data-[state=checked]:border-diamond-navy data-[state=checked]:bg-diamond-navy"
              />
              <span className="text-dugout-charcoal">
                {t(`shop.badge.${badge}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* On Sale */}
      <div>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <Checkbox
            checked={onSaleOnly}
            onCheckedChange={onSaleToggle}
            className="data-[state=checked]:border-stadium-crimson data-[state=checked]:bg-stadium-crimson"
          />
          <span className="font-medium text-stadium-crimson">
            {t('shop.onSale')}
          </span>
        </label>
      </div>
    </div>
  );
}

// ─── Active Filter Badges ───────────────────────────────────────────────────

interface ActiveFiltersProps {
  categories: Category[];
  collections: Collection[];
  selectedCategories: number[];
  selectedCollections: number[];
  selectedPriceRanges: string[];
  selectedBadges: string[];
  onSaleOnly: boolean;
  onRemoveCategory: (id: number) => void;
  onRemoveCollection: (id: number) => void;
  onRemovePriceRange: (key: string) => void;
  onRemoveBadge: (badge: string) => void;
  onRemoveSale: () => void;
  onClearAll: () => void;
  t: (key: string) => string;
}

function ActiveFilters({
  categories,
  collections,
  selectedCategories,
  selectedCollections,
  selectedPriceRanges,
  selectedBadges,
  onSaleOnly,
  onRemoveCategory,
  onRemoveCollection,
  onRemovePriceRange,
  onRemoveBadge,
  onRemoveSale,
  onClearAll,
  t,
}: ActiveFiltersProps) {
  const hasFilters =
    selectedCategories.length > 0 ||
    selectedCollections.length > 0 ||
    selectedPriceRanges.length > 0 ||
    selectedBadges.length > 0 ||
    onSaleOnly;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {selectedCategories.map((id) => {
        const cat = categories.find((c) => c.id === id);
        if (!cat) return null;
        return (
          <Badge
            key={`cat-${id}`}
            variant="secondary"
            className="cursor-pointer gap-1 bg-bone-cream pr-1 text-tobacco-leather hover:bg-bone-cream/80"
          >
            {cat.name}
            <button
              onClick={() => onRemoveCategory(id)}
              className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      })}

      {selectedCollections.map((id) => {
        const col = collections.find((c) => c.id === id);
        if (!col) return null;
        return (
          <Badge
            key={`col-${id}`}
            variant="secondary"
            className="cursor-pointer gap-1 bg-bone-cream pr-1 text-tobacco-leather hover:bg-bone-cream/80"
          >
            {col.name}
            <button
              onClick={() => onRemoveCollection(id)}
              className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      })}

      {selectedPriceRanges.map((key) => (
        <Badge
          key={`price-${key}`}
          variant="secondary"
          className="cursor-pointer gap-1 bg-bone-cream pr-1 text-tobacco-leather hover:bg-bone-cream/80"
        >
          {t(`shop.price.${key}`)}
          <button
            onClick={() => onRemovePriceRange(key)}
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {selectedBadges.map((badge) => (
        <Badge
          key={`badge-${badge}`}
          variant="secondary"
          className="cursor-pointer gap-1 bg-bone-cream pr-1 text-tobacco-leather hover:bg-bone-cream/80"
        >
          {t(`shop.badge.${badge}`)}
          <button
            onClick={() => onRemoveBadge(badge)}
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {onSaleOnly && (
        <Badge
          variant="secondary"
          className="cursor-pointer gap-1 bg-stadium-crimson/10 pr-1 text-stadium-crimson hover:bg-stadium-crimson/20"
        >
          {t('shop.onSale')}
          <button
            onClick={onRemoveSale}
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      <button
        onClick={onClearAll}
        className="text-xs font-medium text-stadium-crimson transition-colors hover:text-stadium-crimson/80"
      >
        {t('shop.clearAll')}
      </button>
    </div>
  );
}

// ─── Pagination ─────────────────────────────────────────────────────────────

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  t: (key: string) => string;
}

function Pagination({ currentPage, totalPages, onPageChange, t }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | 'ellipsis')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }

  return (
    <nav
      aria-label={t('shop.pagination')}
      className="mt-10 flex items-center justify-center gap-1.5"
    >
      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="font-headline text-xs uppercase tracking-wider"
      >
        {t('shop.prev')}
      </Button>

      {/* Page Numbers */}
      {pages.map((page, idx) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? 'bg-diamond-navy font-headline text-xs uppercase tracking-wider hover:bg-diamond-navy/90'
                : 'font-headline text-xs uppercase tracking-wider'
            }
          >
            {page}
          </Button>
        ),
      )}

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="font-headline text-xs uppercase tracking-wider"
      >
        {t('shop.next')}
      </Button>
    </nav>
  );
}

// ─── Main Shop Page ─────────────────────────────────────────────────────────

export function ShopPage() {
  const { t } = useI18n();
  const { navigate, params } = useNavigationStore((s) => s);
  const isMobile = useIsMobile();

  // ── Data State ──
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ── Filter State ──
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ── Pre-select category from navigation params ──
  useEffect(() => {
    if (params.category && categories.length > 0) {
      const cat = categories.find((c) => c.slug === params.category);
      if (cat) {
        setSelectedCategories([cat.id]);
      }
    }
  }, [params.category, categories]);

  // ── Fetch Products ──
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(
          (data.products || []).filter((p: Product) => p.isActive),
        );
        setCategories(data.categories || []);
        setCollections(data.collections || []);
      } catch (err) {
        console.error('Error fetching shop data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ── Back to top scroll listener ──
  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 600);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Reset page on filter / sort change ──
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedCollections, selectedPriceRanges, selectedBadges, onSaleOnly, sortBy]);

  // ── Filter handlers ──
  const toggleCategory = useCallback((id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }, []);

  const toggleCollection = useCallback((id: number) => {
    setSelectedCollections((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }, []);

  const togglePriceRange = useCallback((key: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(key) ? prev.filter((r) => r !== key) : [...prev, key],
    );
  }, []);

  const toggleBadge = useCallback((badge: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge],
    );
  }, []);

  const toggleOnSale = useCallback(() => {
    setOnSaleOnly((prev) => !prev);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedCollections([]);
    setSelectedPriceRanges([]);
    setSelectedBadges([]);
    setOnSaleOnly(false);
    setCurrentPage(1);
  }, []);

  // ── Filter + Sort ──
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.categoryId),
      );
    }

    // Collection filter
    if (selectedCollections.length > 0) {
      result = result.filter(
        (p) => p.collectionId && selectedCollections.includes(p.collectionId),
      );
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) => {
        return selectedPriceRanges.some((key) => {
          const range = PRICE_RANGES.find((r) => r.key === key);
          if (!range) return false;
          return p.price >= range.min && p.price < range.max;
        });
      });
    }

    // Badge filter
    if (selectedBadges.length > 0) {
      result = result.filter((p) => {
        const productBadges = p.badges
          ? p.badges.split(',').map((b) => b.trim().toLowerCase())
          : [];
        return selectedBadges.some((b) => productBadges.includes(b));
      });
    }

    // On sale filter
    if (onSaleOnly) {
      result = result.filter(
        (p) => p.compareAtPrice && p.compareAtPrice > p.price,
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Featured: bestsellers first, then by rating
        result.sort((a, b) => {
          const aBs = a.badges?.includes('bestseller') ? 1 : 0;
          const bBs = b.badges?.includes('bestseller') ? 1 : 0;
          if (bBs !== aBs) return bBs - aBs;
          return b.rating - a.rating;
        });
        break;
    }

    return result;
  }, [products, selectedCategories, selectedCollections, selectedPriceRanges, selectedBadges, onSaleOnly, sortBy]);

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  // ── Helpers ──
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sidebarProps = {
    categories,
    collections,
    selectedCategories,
    selectedCollections,
    selectedPriceRanges,
    selectedBadges,
    onSaleOnly,
    onCategoryToggle: toggleCategory,
    onCollectionToggle: toggleCollection,
    onPriceRangeToggle: togglePriceRange,
    onBadgeToggle: toggleBadge,
    onSaleToggle: toggleOnSale,
    onClearAll: clearAllFilters,
    t,
  };

  const activeFilterProps = {
    categories,
    collections,
    selectedCategories,
    selectedCollections,
    selectedPriceRanges,
    selectedBadges,
    onSaleOnly,
    onRemoveCategory: toggleCategory,
    onRemoveCollection: toggleCollection,
    onRemovePriceRange: togglePriceRange,
    onRemoveBadge: toggleBadge,
    onRemoveSale: toggleOnSale,
    onClearAll: clearAllFilters,
    t,
  };

  return (
    <div className="min-h-screen bg-bone-cream">
      {/* ─── Hero Banner ─── */}
      <section className="relative h-52 overflow-hidden sm:h-64 md:h-72">
        <Image
          src="/img/shop/shop-hero.jpg"
          alt="Shop"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-diamond-navy/70 via-diamond-navy/50 to-diamond-navy/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {t('shop.title')}
          </h1>
          <p className="mt-2 font-headline text-sm uppercase tracking-[0.3em] text-gold-glove">
            {t('shop.subtitle')}
          </p>
        </div>
      </section>

      {/* ─── Breadcrumb ─── */}
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-sm sm:px-6">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-diamond-navy"
          >
            <Home className="h-3.5 w-3.5" />
            <span>{t('shop.breadcrumb.home')}</span>
          </button>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span className="font-medium text-diamond-navy">
            {t('shop.breadcrumb.shop')}
          </span>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex gap-8">
          {/* ── Desktop Sidebar ── */}
          {!isMobile && (
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-lg border bg-white p-5 shadow-sm">
                <FilterSidebar {...sidebarProps} />
              </div>
            </aside>
          )}

          {/* ── Main Column ── */}
          <div className="min-w-0 flex-1">
            {/* Toolbar: Mobile filter button, Sort, View toggle, Count */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Left: Mobile filter button + product count */}
              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                {isMobile && (
                  <Sheet
                    open={mobileFiltersOpen}
                    onOpenChange={setMobileFiltersOpen}
                  >
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 font-headline text-xs uppercase tracking-wider"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        {t('shop.filters')}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] overflow-y-auto p-0">
                      <SheetHeader className="border-b px-5 py-4">
                        <SheetTitle className="font-headline text-base uppercase tracking-wider text-diamond-navy">
                          {t('shop.filters')}
                        </SheetTitle>
                        <SheetDescription className="sr-only">
                          {t('shop.filterDescription')}
                        </SheetDescription>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100vh-80px)]">
                        <div className="p-5">
                          <FilterSidebar {...sidebarProps} />
                        </div>
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>
                )}

                {/* Product count */}
                <p className="text-sm text-muted-foreground">
                  {t('shop.showing')}{' '}
                  <span className="font-medium text-diamond-navy">
                    {filteredProducts.length}
                  </span>{' '}
                  {t('shop.of')}{' '}
                  <span className="font-medium text-diamond-navy">
                    {products.length}
                  </span>{' '}
                  {t('shop.products')}
                </p>
              </div>

              {/* Right: Sort + View toggle */}
              <div className="flex items-center gap-3">
                {/* Sort dropdown */}
                <Select
                  value={sortBy}
                  onValueChange={(val) => setSortBy(val as SortOption)}
                >
                  <SelectTrigger size="sm" className="w-[160px] font-body text-sm">
                    <SelectValue placeholder={t('shop.sortBy')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">
                      {t('shop.sort.featured')}
                    </SelectItem>
                    <SelectItem value="price-asc">
                      {t('shop.sort.priceAsc')}
                    </SelectItem>
                    <SelectItem value="price-desc">
                      {t('shop.sort.priceDesc')}
                    </SelectItem>
                    <SelectItem value="newest">
                      {t('shop.sort.newest')}
                    </SelectItem>
                    <SelectItem value="rating">
                      {t('shop.sort.rating')}
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* View toggle */}
                <div className="hidden items-center rounded-md border bg-white sm:flex">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`rounded-l-md p-2 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-diamond-navy text-white'
                        : 'text-muted-foreground hover:bg-bone-cream hover:text-diamond-navy'
                    }`}
                    aria-label={t('shop.gridView')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`rounded-r-md p-2 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-diamond-navy text-white'
                        : 'text-muted-foreground hover:bg-bone-cream hover:text-diamond-navy'
                    }`}
                    aria-label={t('shop.listView')}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <ActiveFilters {...activeFilterProps} />

            {/* Loading State */}
            {loading && (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'
                    : 'flex flex-col gap-4'
                }
              >
                {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                  <div
                    key={i}
                    className={`animate-pulse overflow-hidden rounded-lg bg-white shadow-sm ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div
                      className={`bg-muted ${
                        viewMode === 'list' ? 'h-40 w-40 shrink-0 sm:h-48 sm:w-48' : 'aspect-square'
                      }`}
                    />
                    <div className="space-y-2 p-4">
                      <div className="h-4 w-3/4 rounded bg-muted" />
                      <div className="h-3 w-1/2 rounded bg-muted" />
                      <div className="h-6 w-1/3 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No results */}
            {!loading && filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-white py-20 text-center">
                <div className="mb-4 text-5xl">&#9888;</div>
                <h3 className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
                  {t('shop.noResults')}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  {t('shop.noResultsDesc')}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="mt-6 gap-2 font-headline text-xs uppercase tracking-wider"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {t('shop.clearAll')}
                </Button>
              </div>
            )}

            {/* Product Grid / List */}
            {!loading && filteredProducts.length > 0 && (
              <>
                <motion.div
                  key={`layout-${viewMode}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4'
                      : 'flex flex-col gap-4'
                  }
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product) =>
                      viewMode === 'grid' ? (
                        <motion.div
                          key={product.id}
                          variants={itemVariants}
                          layout
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="cursor-pointer"
                          onClick={() =>
                            navigate('product', { slug: product.slug })
                          }
                        >
                          <ProductCard
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            compareAtPrice={product.compareAtPrice ?? undefined}
                            image={product.images}
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                            badges={product.badges}
                            slug={product.slug}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key={product.id}
                          variants={itemVariants}
                          layout
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg"
                          onClick={() =>
                            navigate('product', { slug: product.slug })
                          }
                        >
                          <div className="flex">
                            {/* Image */}
                            <div className="relative h-40 w-36 shrink-0 overflow-hidden bg-bone-cream sm:h-48 sm:w-52">
                              <Image
                                src={product.images}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 640px) 144px, 208px"
                              />
                              {product.badges && (
                                <span className="absolute left-2 top-2 bg-stadium-crimson px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                                  {t(
                                    `shop.badge.${product.badges.split(',')[0].trim().toLowerCase()}`,
                                  )}
                                </span>
                              )}
                            </div>
                            {/* Info */}
                            <div className="flex flex-1 flex-col justify-between p-4">
                              <div>
                                <h3 className="font-headline text-sm uppercase tracking-wide text-diamond-navy">
                                  {product.name}
                                </h3>
                                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                  {product.description}
                                </p>
                              </div>
                              <div className="mt-3 flex items-center gap-3">
                                <span className="font-headline text-lg text-diamond-navy">
                                  ${product.price.toFixed(2)}
                                </span>
                                {product.compareAtPrice &&
                                  product.compareAtPrice > product.price && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      ${product.compareAtPrice.toFixed(2)}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ),
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  t={t}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── Back to Top ─── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-diamond-navy text-white shadow-lg transition-colors hover:bg-diamond-navy/90"
            aria-label={t('shop.backToTop')}
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
