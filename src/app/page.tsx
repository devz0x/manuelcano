'use client';

import { useNavigationStore, ViewType } from '@/lib/navigation-store';
import { UtilityBar } from '@/components/manny-cano/utility-bar';
import { Navbar } from '@/components/manny-cano/navbar';
import { CartDrawer } from '@/components/manny-cano/cart-drawer';
import { SearchDialog } from '@/components/manny-cano/search-dialog';
import { Footer } from '@/components/manny-cano/footer';

/* Homepage sections */
import { HeroSection } from '@/components/manny-cano/hero-section';
import { CategoryGrid } from '@/components/manny-cano/category-grid';
import { FeaturedProducts } from '@/components/manny-cano/featured-products';
import { BrandStory } from '@/components/manny-cano/brand-story';
import { CustomPromo } from '@/components/manny-cano/custom-promo';
import { Testimonials } from '@/components/manny-cano/testimonials';
import { PressBar } from '@/components/manny-cano/press-bar';

/* Page views */
import { ShopPage } from '@/components/manny-cano/shop-page';
import { ProductPage } from '@/components/manny-cano/product-page';
import { AboutPage } from '@/components/manny-cano/about-page';
import { AthletesPage } from '@/components/manny-cano/athletes-page';
import { TechnologyPage } from '@/components/manny-cano/technology-page';
import { ContactPage } from '@/components/manny-cano/contact-page';
import { BlogPage } from '@/components/manny-cano/blog-page';
import { BlogPostPage } from '@/components/manny-cano/blog-post-page';
import { CartPage } from '@/components/manny-cano/cart-page';
import { CheckoutPage } from '@/components/manny-cano/checkout-page';
import { CustomGlovePage } from '@/components/manny-cano/custom-glove-page';

import { useState, useEffect } from 'react';
import { MobileBottomNav } from '@/components/manny-cano/mobile-bottom-nav';

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <CustomPromo />
      <BrandStory />
      <Testimonials />
      <PressBar />
    </>
  );
}

function ViewRouter() {
  const view = useNavigationStore((s) => s.view);
  const params = useNavigationStore((s) => s.params);

  switch (view) {
    case 'shop':
      return <ShopPage />;
    case 'product':
      return <ProductPage />;
    case 'about':
      return <AboutPage />;
    case 'athletes':
      return <AthletesPage />;
    case 'technology':
      return <TechnologyPage />;
    case 'contact':
      return <ContactPage />;
    case 'blog':
      return <BlogPage />;
    case 'blogPost':
      return <BlogPostPage />;
    case 'configurator':
      return <CustomGlovePage />;
    case 'cart':
      return <CartPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'search':
      return <ShopPage />;
    case 'home':
    default:
      return <HomePage />;
  }
}

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const view = useNavigationStore((s) => s.view);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Expose search open function globally for navbar
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__mcOpenSearch = () =>
      setSearchOpen(true);
    return () => {
      delete (window as unknown as Record<string, unknown>).__mcOpenSearch;
    };
  }, []);

  // Update document title based on view
  useEffect(() => {
    const titles: Record<ViewType, string> = {
      home: 'Manny Canó | Professional Baseball Equipment',
      shop: 'Shop All | Manny Canó',
      product: 'Product | Manny Canó',
      about: 'Our Story | Manny Canó',
      athletes: 'Athletes | Manny Canó',
      technology: 'Technology | Manny Canó',
      contact: 'Contact | Manny Canó',
      blog: 'Blog | Manny Canó',
      blogPost: 'Blog | Manny Canó',
      configurator: 'Custom Glove | Manny Canó',
      cart: 'Cart | Manny Canó',
      checkout: 'Checkout | Manny Canó',
      search: 'Search | Manny Canó',
    };
    document.title = titles[view] || titles.home;
  }, [view]);

  return (
    <>
      {/* Site Header */}
      <header className="sticky top-0 z-50">
        <UtilityBar />
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
      </header>

      {/* Cart Drawer (global overlay) */}
      <CartDrawer />

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Main Content - switches based on navigation state */}
      <main className="flex-1">
        <ViewRouter />
      </main>

      {/* Footer with newsletter */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onSearchOpen={() => setSearchOpen(true)} />
    </>
  );
}
