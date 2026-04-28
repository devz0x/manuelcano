'use client';

import { UtilityBar } from '@/components/manny-cano/utility-bar';
import { Navbar } from '@/components/manny-cano/navbar';
import { CartDrawer } from '@/components/manny-cano/cart-drawer';
import { HeroSection } from '@/components/manny-cano/hero-section';
import { CategoryGrid } from '@/components/manny-cano/category-grid';
import { FeaturedProducts } from '@/components/manny-cano/featured-products';
import { BrandStory } from '@/components/manny-cano/brand-story';
import { CustomPromo } from '@/components/manny-cano/custom-promo';
import { TechStrip } from '@/components/manny-cano/tech-strip';
import { Testimonials } from '@/components/manny-cano/testimonials';
import { PressBar } from '@/components/manny-cano/press-bar';
import { Footer } from '@/components/manny-cano/footer';

export default function Home() {
  return (
    <>
      {/* Site Header */}
      <header className="sticky top-0 z-50">
        <UtilityBar />
        <Navbar />
      </header>

      {/* Cart Drawer (global overlay) */}
      <CartDrawer />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero - Full viewport with stadium background */}
        <HeroSection />

        {/* Shop by Category - 6 category cards */}
        <CategoryGrid />

        {/* Featured Products - Professional line showcase */}
        <FeaturedProducts />

        {/* Brand Story - Dominican baseball heritage */}
        <BrandStory />

        {/* Custom Glove Design - CTA banner */}
        <CustomPromo />

        {/* Technology Features - 4 key differentiators */}
        <TechStrip />

        {/* Testimonials - Customer quotes */}
        <Testimonials />

        {/* Press / As Seen In */}
        <PressBar />
      </main>

      {/* Footer with newsletter */}
      <Footer />
    </>
  );
}
