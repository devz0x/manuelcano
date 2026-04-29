---
Task ID: 1
Agent: Main Orchestrator
Task: Full e-commerce site development - All pages, SPA routing, search, i18n expansion

Work Log:
- Created SPA navigation store (src/lib/navigation-store.ts) with Zustand for client-side view routing (home, shop, product, about, cart, checkout, search)
- Refactored src/app/page.tsx to use ViewRouter pattern - switches main content based on navigation store state
- Built Shop page (src/components/manny-cano/shop-page.tsx): Full catalog with category/collection/price/badge filters, sort dropdown, grid/list toggle, pagination (8 per page), mobile filter Sheet, back-to-top button, active filter badges
- Built Product Detail page (src/components/manny-cano/product-page.tsx): Image gallery with thumbnails, badge overlays, star ratings, size/color selectors (category-aware), quantity controls, add-to-cart with toast, trust badges, specs table, related products section
- Built About page (src/components/manny-cano/about-page.tsx): 8 sections - hero, mission with stats, timeline (5 milestones 1956-2024), craftsmanship features, 3 value cards, team section, CTA
- Built Cart page (src/components/manny-cano/cart-page.tsx): Two-column layout, item management (quantity/remove), promo code input, order summary with free shipping threshold, empty state
- Built Checkout page (src/components/manny-cano/checkout-page.tsx): Shipping form with validation, shipping method radio, payment form, demo notice, order success state with random order number
- Built Search dialog (src/components/manny-cano/search-dialog.tsx): Full-text search with trending terms, debounced results, product cards in results, keyboard shortcut (Cmd+K)
- Updated Navbar to accept onSearchOpen prop, use navigation store for logo/category links
- Updated Footer to use navigation store for shop/brand links, logo click to home
- Updated Hero section CTA to navigate to shop
- Updated Category grid cards to navigate to shop with category filter
- Updated Featured products "View All" to navigate to shop
- Updated Brand Story CTA to navigate to about
- Updated Custom Promo CTA to navigate to shop
- Updated Product Card to navigate to product detail on click
- Expanded i18n with ~150 new translation keys per locale (ES/EN) for all new pages
- Generated 10 additional images: about page (workshop, sandlot, leather detail, team, history, sourcing), shop hero, product angles, checkout success
- Fixed framer-motion ease type warnings across all components (added 'as const')
- Fixed ESLint react-hooks/set-state-in-effect error in search dialog

Stage Summary:
- Complete e-commerce SPA with 7 views: Home, Shop, Product, About, Cart, Checkout, Search
- Full navigation flow: Homepage → Shop (with filters) → Product Detail → Add to Cart → Cart → Checkout → Order Success
- All navigation wired through Zustand store with scroll-to-top on view change
- All text bilingual (ES/EN) with ~400 total translation keys
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean, all routes 200 OK
- 25+ component files in total
- 25 AI-generated images across all sections

---
Task ID: 2
Agent: Main Orchestrator
Task: Integrate real uploaded product photos and logo across the entire site

Work Log:
- Analyzed all 11 uploaded images using VLM to identify content (logo, red backpack, black backpack, 5 navy backpack angles, black cleat, logo PNG)
- Copied high-res logo (Logo hi res.jpg) to /public/img/brand/logo.jpg and logo PNG to /public/img/brand/logo.png
- Replaced all brand product images: backpack-red.png, backpack-black.png, backpack-navy.png, cleat-black.png
- Copied navy backpack multi-angle photos to /public/img/products/ (mc-backpack.png, mc-backpack-angle2.png, mc-backpack-detail.png, mc-backpack-side.png, mc-backpack-open.png, mc-backpack-back.png)
- Copied color variant backpacks to /public/img/products/ (mc-backpack-red.png, mc-backpack-black.png)
- Copied cleat photo to /public/img/products/mc-cleat-black.png
- Updated Mochilas category image (/public/img/cat/mochilas.jpg) with real navy backpack photo
- Expanded product API (src/app/api/products/route.ts) from 6 to 9 products:
  - Added Product 7: MC Mochila Pro Bat Pack - Red ($109.99)
  - Added Product 8: MC Mochila Pro Bat Pack - Black ($109.99)
  - Added Product 9: MC Cleat Pro Black ($129.99, was $159.99)
- Added `gallery` JSON field to all products for multi-image support
- Navy backpack product now has 5 gallery images (front, angle2, detail, side, open)
- Updated Product Detail page (product-page.tsx) to use gallery field instead of hardcoded paths
- Updated Featured Products section to show max 8 products (sorted by bestseller/rating)
- Created new Equipment Showcase component (equipment-showcase.tsx) displaying real product photos in a dark navy strip
- Added Equipment Showcase section between Hero and Category Grid on homepage

Stage Summary:
- All 11 uploaded images now integrated across the site
- 9 total products in catalog (3 backpack colors, 2 bats, 1 glove, 1 catcher set, 1 balls, 1 cleat)
- Product detail pages support multi-image galleries from API
- New Equipment Showcase section on homepage features real navy backpack, red backpack, black backpack, and cleat photos
- Category "Mochilas" image now shows real product photo
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean, all routes 200 OK

---
Task ID: 3
Agent: Main Orchestrator
Task: Integrate second batch of 10 real equipment photos (bags, cleats, gloves)

Work Log:
- Analyzed all 10 new images using VLM (Bag black, bag blue orange, Bag red, clips black, Guante 1, guante blue, guantes 2 b, guantes 2, Guantes 4, guantes 5)
- Identified: 3 backpack color variants (black, navy+orange, red), 1 black cleat, 1 catcher's mitt (brown), 1 blue catcher's mitt, 4 group/collection photos of gloves
- Replaced all backpack images with higher-quality JPEG versions (.jpg instead of .png)
- Replaced cleat image with detailed photo showing M2 logo and metal spikes
- Replaced Guantes category image with real glove photo
- Updated product API from 9 to 12 products:
  - Updated Product 1 (MC Pro Glove) main image to real glove photo with 3-image gallery
  - Added Product 10: MC Pro Glove - Blue Edition ($329.99) - with grass pair photo gallery
  - Added Product 11: MC Pro Glove - Green Cantera ($249.99) - with turf/flat collection galleries
  - Added Product 12: MC Catcher Mitt - Blue ($279.99) - standalone catcher mitt product
  - Updated all 3 backpack products with .jpg images instead of .png
  - Updated cleat product with .jpg image and improved specs
- Updated Equipment Showcase: expanded from 4 to 6 items (3x2 mobile, 6x1 desktop), added glove + catcher mitt
- Updated Brand Story section image to real gloves-on-turf collection photo
- Updated About page all 4 images with real product photos (glove collections, pair on grass, single glove, blue catcher mitt)
- Updated Mochilas category image with navy+orange backpack showing MANNY CANÓ branding

Stage Summary:
- 12 total products in catalog with real photography throughout
- 5 glove-related products (3 field gloves + 1 blue catcher mitt + 1 catcher set)
- 3 backpack color variants, all with real photos showing MANNY CANÓ branding
- 1 cleat product with detailed photo
- All backpack .png images replaced with higher-quality .jpg uploads
- Homepage Equipment Showcase now shows 6 real products (glove, navy bag, cleat, red bag, catcher mitt, black bag)
- Brand Story and About page all use real product photography
- Category images updated: Guantes = real glove, Mochilas = real navy backpack
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean, all routes 200 OK

---
Task ID: 4-a
Agent: Frontend Developer
Task: Create Athletes page component (src/components/manny-cano/athletes-page.tsx)

Work Log:
- Created athletes-page.tsx following exact same pattern as about-page.tsx (animation helpers, AnimatedSection, FadeUp, useI18n, useNavigationStore)
- Added 80+ athletes translation keys to EN section of i18n.tsx (ES translations already existed from previous agent)
- Built 6 sections: Breadcrumb, Hero with dark overlay, Featured Athletes Grid (3x2 with 6 athlete cards), Stats Banner (navy strip with 4 stats), Athlete Spotlight (large layout with quote/bio/stats/equipment), Cantera Program (dark bg with gold accents), CTA Section
- Each athlete card: colored avatar with initials, name, position badge, team, quote, equipment, social icon links
- Spotlight section: left image area, right content with quote, bio, 4 stat boxes, equipment list, social buttons
- Responsive design: 1 col mobile, 2 col tablet, 3 col desktop for athlete grid
- All text uses i18n translation keys via t('athletes.*')
- Uses existing shadcn/ui components (Card, Badge, Button, Separator)
- Uses lucide-react icons (Instagram, Twitter, Quote, Trophy, Users, Globe, Award, GraduationCap, Heart, ArrowRight)
- Brand color system used throughout: diamond-navy, stadium-crimson, gold-glove, bone-cream, tobacco-leather, dugout-charcoal

Stage Summary:
- Athletes page component created at src/components/manny-cano/athletes-page.tsx
- 80+ EN translation keys added to i18n.tsx (matching existing ES translations)
- 6 athletes featured: Manny Reyes (SS), Carlos Gómez (2B), Josué Martínez (C), Roberto Sánchez (OF), David Arias (P), Miguel Torres (1B)
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean, no errors

---
Task ID: 4-d
Agent: Full-Stack Developer
Task: Create Contact page component and Contact API

Work Log:
- Created Contact API route (src/app/api/contact/route.ts):
  - POST endpoint accepting name, email, subject, message
  - Validates required fields (name, email, message) and email format
  - Returns structured JSON responses with success/error states
  - Graceful error handling with try/catch
- Created Contact Page component (src/components/manny-cano/contact-page.tsx):
  - 6 sections: Breadcrumb, Hero, Contact Form + Info sidebar, Contact Info Cards, FAQ Accordion, Social Media Strip
  - Two-column form layout (form left, contact info right)
  - Subject dropdown with 7 options using shadcn Select component
  - Form validation with inline error messages
  - Submit with loading state (Loader2 spinner)
  - Toast notifications on success/error using useToast()
  - 3 contact info cards (Email, Phone, Address) using shadcn Card
  - 6 FAQ items using shadcn Accordion (collapsible)
  - Social media links row (Instagram, YouTube, Twitter, Facebook)
  - Framer Motion animations throughout (fadeUp, staggerContainer)
  - Fully responsive design (mobile-first)
  - Brand color classes and font classes used consistently
- Added ~100 new translation keys per locale (ES/EN) for contact page
- Updated navigation store: added 'contact' to ViewType union
- Updated page.tsx: imported ContactPage, added case to ViewRouter, added title

Stage Summary:
- Contact page fully functional with 6 sections
- Contact API validates and processes form submissions
- All text bilingual (ES/EN) with ~100 new translation keys
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean, all routes 200 OK
- Contact API tested: success response for valid data, 400 for invalid/missing fields

---
Task ID: 4-b
Agent: Frontend Developer
Task: Create Technology page component for MANNY CANÓ e-commerce site

Work Log:
- Created Technology page component at src/components/manny-cano/technology-page.tsx
- Followed exact same pattern as About page (animation helpers, breadcrumb, framer motion, useI18n, useNavigationStore)
- Built 6 visual sections: Hero, Leather Curing Process (4-step timeline), Pro-Fit System (two-column), Materials Comparison (table with checkmarks/X), Innovation Lab (dark overlay with 3 pillars), CTA
- Added 52 technology.* translation keys per locale (ES/EN) to src/lib/i18n.tsx
- Used real product images: mc-pro-glove-detail.jpg (hero), mc-glove-main.jpg (pro-fit), mc-gloves-collection-turf.jpg (innovation)
- Used shadcn/ui components: Card, Badge, Button, Table/TableBody/TableCell/TableHead/TableHeader/TableRow
- Used lucide-react icons: Eye, Droplets, Scissors, Hand, CheckCircle, XCircle, Cpu, MessageSquare, Leaf, ChevronRight
- All text internationalized with useI18n() hook
- Responsive design with mobile-first approach

Stage Summary:
- Technology page component complete with 6 sections and full bilingual support
- 52 new translation keys added (104 total across ES/EN)
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean

---
Task ID: 4-c
Agent: Full-Stack Developer
Task: Create Blog listing page, Blog post page, and Blog API

Work Log:
- Created Blog API route (src/app/api/blog/route.ts):
  - GET endpoint returning 6 blog posts with full bilingual content (EN/ES)
  - Posts cover: glove care, DR baseball academies, bat selection, catcher gear, Dominican pipeline history, training tips
  - Each post has 3-4 paragraphs of content in both English and Spanish
  - Uses real product images from /img/products/ directory
  - Categories: Equipment, Training, Culture, Tips
  - Structured data: id, slug, title, titleEs, excerpt, excerptEs, content, contentEs, author, date, readTime, category, image, tags
- Created Blog listing page (src/components/manny-cano/blog-page.tsx):
  - Breadcrumb navigation (Home > Blog)
  - Hero section with dark navy overlay and background image
  - Featured post displayed as large two-column card (image + content side-by-side)
  - Category filter tabs (All, Equipment, Training, Culture, Tips) with sticky positioning
  - Grid of remaining posts: 2-col mobile, 3-col desktop
  - Each post card: image, category badge, title, excerpt, author, date, read time
  - Loading skeleton states and empty state handling
  - Load More pagination button
  - Framer Motion animations (fadeUp, staggerContainer, useInView)
  - Navigation to blog post via navigate('blogPost', { slug })
- Created Blog post page (src/components/manny-cano/blog-post-page.tsx):
  - Breadcrumb navigation (Home > Blog > Post Title)
  - Full article layout: category badge, title, meta info (author, date, read time)
  - Featured 16:9 aspect ratio image
  - HTML content rendered with styled typography (paragraphs, h3 subheadings)
  - Share button with Web Share API / clipboard fallback
  - Tags section with hashtag display
  - Author bio card with avatar initial, name, and description
  - Related posts section (3 cards, prioritized by same category)
  - Back to Blog button (top + bottom)
  - Not found state with helpful messaging
  - Loading skeleton for post
- Updated navigation store: added 'blog' and 'blogPost' to ViewType union
- Updated page.tsx: imported BlogPage and BlogPostPage, added cases to ViewRouter, added page titles
- Added 36 blog.* and blogPost.* translation keys per locale (ES/EN) to i18n.tsx

Stage Summary:
- Blog system fully functional with listing + detail views
- 6 blog posts with 3-4 paragraphs each in English and Spanish
- Blog listing with featured post, category filters, grid layout, and load more
- Blog post page with rich article layout, author bio, related posts, share functionality
- All navigation wired through Zustand store
- All text bilingual (ES/EN) with 36 new translation keys per locale
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean, all routes 200 OK
- Blog API tested: returns 6 posts with correct slugs

---
Task ID: 5
Agent: Frontend Developer
Task: Create Custom Glove Configurator page component (src/components/manny-cano/custom-glove-page.tsx)

Work Log:
- Created Custom Glove Configurator page at src/components/manny-cano/custom-glove-page.tsx
- Followed exact same pattern as About page (animation helpers, AnimatedSection, FadeUp, useI18n, useNavigationStore)
- Built interactive 6-step glove configurator with real-time SVG preview:
  - Step 1 (Style): Select glove type - Infield, Outfield, First Base, Catcher Mitt, Pitcher
  - Step 2 (Leather): Select leather type - Premium Roebuck ($499), Kip Leather ($599), Steerhide ($399)
  - Step 3 (Colors): Color pickers for 5 parts (Palm, Back, Web, Lacing, Wrist) with 8 color options each
  - Step 4 (Web): Select web pattern - I-Web, H-Web, Trapeze, Modified Trapeze, Single Post, Basket Web, Cross Bar
  - Step 5 (Personalize): Name (max 15 chars), Number (max 3 digits), Embroidery color (4 options), Position dropdown
  - Step 6 (Summary): Complete config overview, price calculation ($50 embroidery fee), Add to Cart + Save Design buttons
- Created detailed SVG glove illustration with 5 colorable parts that animate smoothly on color changes:
  - Palm area with gradient fill
  - Back of hand with finger outlines
  - Web area with 7 distinct pattern renders (I-Web lines, H-Web posts, Trapeze loops, Closed web for pitcher/catcher, Basket weave, Single post, Cross bar)
  - Lacing detail lines (dashed stitching along pocket, edge, and wrist)
  - Wrist strap with buckle and stitching details
  - Dynamic personalization text (name/number) in chosen embroidery color
- Two-column responsive layout: SVG preview (60%) + Config panel (40%), stacks on mobile
- Step indicator with icons (Hand, Settings, Palette, Layers, Type, CheckCircle)
- Navigation buttons: Previous, Next, Start Over
- Features strip: 4 badges (Handcrafted, 6-8 Week Delivery, Pro Warranty, Free Engraving)
- Add to Cart integration with useCartStore and toast notification
- Save Design button with toast feedback
- Added 66 configurator.* translation keys per locale (ES/EN) to src/lib/i18n.tsx
- Used shadcn/ui components: Card, Button, Badge, Input, Separator
- Used lucide-react icons: ChevronRight, ChevronLeft, RotateCcw, ShoppingCart, Save, Palette, Hand, Layers, Type, CheckCircle, Shield, Clock, Award, Settings
- CSS transitions on all color changes (0.5s ease) for smooth visual updates
- Framer Motion AnimatePresence for step content transitions

Stage Summary:
- Custom Glove Configurator page fully interactive with 6-step flow
- SVG glove visualization with 5 colorable parts and 7 web pattern styles
- Price calculation: leather base price + $50 embroidery fee when personalized
- All text bilingual (ES/EN) with 66 new translation keys per locale
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean, all routes 200 OK

---
Task ID: 6
Agent: Main Orchestrator
Task: Wire all new pages into navigation, footer, navbar, and hero CTAs

Work Log:
- Updated navigation-store.ts: Added 'athletes', 'technology', 'configurator' to ViewType union (now 12 view types total)
- Updated page.tsx: Imported AthletesPage, TechnologyPage, CustomGlovePage; added ViewRouter cases; added document titles for all new views
- Updated footer.tsx:
  - handleBrandLink() now routes footer.athletes → athletes, footer.technology → technology, footer.sustainability → about
  - Added handleCommunityLink() for footer.blog → blog
  - FAQ support link routes to contact page
- Updated navbar.tsx:
  - Added Users, Cpu, BookOpen, Mail icon imports
  - Mobile nav now includes 7 links: Our History, Athletes, Technology, Blog, Contact, Search, Cart
- Updated custom-promo.tsx: CTA button now navigates to 'configurator' instead of 'shop'
- Updated hero-section.tsx: "Design Your Glove" CTA now navigates to 'configurator' instead of anchor link

Stage Summary:
- All 12 views fully routed: home, shop, product, about, athletes, technology, contact, blog, blogPost, configurator, cart, checkout, search
- Footer links for Brand (History, Athletes, Technology, Sustainability) all functional
- Footer links for Community (Blog) functional
- Footer Support FAQ links to Contact page
- Mobile nav includes all brand/content pages
- Homepage CTAs (Hero + Custom Promo) navigate to configurator
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean

---
Task ID: R2+R5+R6
Agent: Frontend Developer
Task: Mobile Bottom Nav, Animated Announcement Bar, Transparent Navbar

Work Log:
- Created Mobile Bottom Navigation Bar (src/components/manny-cano/mobile-bottom-nav.tsx):
  - Nike-style fixed bottom nav with 5 tabs: Home, Shop, Custom, Search, Profile
  - Icons only with tiny labels, active tab highlighted in stadium-crimson
  - Uses useNavigationStore for active state and navigation
  - Only visible on mobile (md:hidden), safe area padding for iOS
  - Clean, minimal design with smooth transitions
- Updated Utility Bar (src/components/manny-cano/utility-bar.tsx):
  - Replaced static promo text with 3 rotating announcements (4-second interval)
  - Announcements: Free shipping, Pro warranty, Handcrafted in DR (with Truck, ShieldCheck, Globe icons)
  - Smooth slide-up/fade CSS animation between messages (no Framer Motion)
  - Kept ES/EN language toggle on the right side
  - Simplified layout: removed desktop-only links (size guide, warranty, track order) for cleaner look
  - Responsive: same bar on all screen sizes
- Improved Navbar (src/components/manny-cano/navbar.tsx):
  - Transparent background when on home view at top of page (text-white)
  - Transitions to white/95 with backdrop-blur after scrolling 100px (text-dugout-charcoal)
  - Smooth transition-all duration-300 for background change
  - Reduced nav height from h-16 to h-[60px] for sleeker look
  - Changed max-w-7xl to max-w-[1400px] for wider layout
  - Removed shadow-sm from default state, only shows shadow when scrolled
  - Uses scroll event listener + requestAnimationFrame for view-change sync
- Added i18n translation keys:
  - utility.announcement1, utility.announcement2, utility.announcement3 (ES + EN)
  - mobile.home, mobile.shop, mobile.custom (ES + EN)
- Updated page.tsx: imported MobileBottomNav, added it after Footer in the Home component return

Stage Summary:
- Mobile bottom nav provides Nike-style navigation on mobile screens
- Announcement bar cycles 3 promotional messages with smooth CSS animations
- Navbar transitions from transparent to solid on scroll when on home page
- All text bilingual (ES/EN) with 9 new translation keys per locale
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean, all routes 200 OK

---
Task ID: R1+R3+R4+R7
Agent: Main Orchestrator
Task: Minimalist redesign - Product cards, Cart drawer, Homepage, Category grid, Hero

Work Log:
- Redesigned Product Cards: Nike/Aesop style hover quick-add, 4:5 ratio, wishlist heart, discount badge
- Improved Cart Drawer: free shipping progress bar ($100 threshold), gift promo, cleaner layout
- Refined Featured Products: white bg, cleaner heading, better View All button
- Refined Category Grid: varied aspect ratios, lighter overlays
- Refined Hero Section: Apple-style, no scroll indicator, white primary CTA
- Streamlined Homepage: removed redundant Equipment Showcase and Tech Strip

Stage Summary:
- Site follows Nike/Apple/Aesop minimalist design philosophy
- Product cards premium with hover interactions
- Cart gamifies free shipping with progress bar
- Homepage has Apple-like rhythm
- Pushed to GitHub

---
Task ID: fix-blank-sections
Agent: Main Orchestrator
Task: Fix blank/empty areas on homepage caused by framer-motion isInView visibility bug

Work Log:
- Diagnosed blank area in "Línea Profesional" (Featured Products) section via VLM screenshot analysis
- Root cause: framer-motion `useInView` hook with `once: true` and negative margin was preventing product grid from becoming visible
- Products loaded successfully from API (200), but child motion.div items had `opacity: 0` in their `hidden` variant, which persisted until isInView triggered
- Fixed FeaturedProducts component: replaced isInView variant pattern with direct mount animations (opacity/y with staggered delays)
- Fixed CategoryGrid component: same fix, removed isInView dependency
- Fixed CustomPromo component: same fix, removed isInView dependency  
- Fixed Testimonials component: same fix, removed isInView dependency
- Fixed PressBar component: same fix, removed isInView dependency
- Cleaned up unused imports (useRef, useInView, scrollRef, scroll function)
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean

Stage Summary:
- All 5 homepage sections now use direct mount animations instead of isInView-variant gating
- Products and categories are always visible once loaded, regardless of scroll position
- Animations still provide smooth staggered entrance effects
- No more blank/empty areas on any homepage section

---
Task ID: fix-navbar-footer
Agent: Main Orchestrator
Task: Fix white-on-white navbar menu and add stamp-style logo to footer

Work Log:
- Diagnosed navbar issue: `isTransparent` was true on first render (before hero painted), causing white text on white background
- Fixed navbar: changed initial `scrolled` state from `false` to `true` — navbar starts solid (dark text on white bg), then transitions to transparent after hero loads and scrollY is checked
- Added `invert={isTransparent}` to navbar MCLogo — logo now appears white/dark depending on navbar state
- Removed unused `mounted` state/`mountedRef` to pass ESLint react-hooks/set-state-in-effect rule
- Redesigned footer logo as circular "stamp" seal:
  - Logo now sits in a circular container (100px mobile, 120px desktop) with cream background and dark border
  - Positioned with `-mt-10` to overlap the newsletter/footer border
  - Hover effect: scales up to 110% and border turns gold
  - Shadow adds depth for stamp impression effect
  - Footer tagline moved below stamp, centered
- ESLint: 0 errors, 0 warnings
- Dev server: compiled clean

Stage Summary:
- Navbar no longer shows invisible white-on-white text on page load
- Navbar logo inverts properly when transparent over dark hero
- Footer logo now appears as a circular "sello" stamp overlapping the newsletter/footer junction
- Hover on stamp logo: scales up + gold border effect
