'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronRight, Clock, User, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  titleEs: string;
  excerpt: string;
  excerptEs: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                    */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function FadeUp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Post Card                                                           */
/* ------------------------------------------------------------------ */

function PostCard({
  post,
  locale,
  onNavigate,
  index = 0,
  compact = false,
}: {
  post: BlogPost;
  locale: string;
  onNavigate: (slug: string) => void;
  index?: number;
  compact?: boolean;
}) {
  const title = locale === 'es' ? post.titleEs : post.title;
  const excerpt = locale === 'es' ? post.excerptEs : post.excerpt;
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'es' ? 'es-DO' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  const categoryColors: Record<string, string> = {
    Equipment: 'bg-gold-glove/20 text-tobacco-leather',
    Training: 'bg-emerald-100 text-emerald-700',
    Culture: 'bg-stadium-crimson/15 text-stadium-crimson',
    Tips: 'bg-diamond-navy/10 text-diamond-navy',
  };

  if (compact) {
    return (
      <FadeUp>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => onNavigate(post.slug)}
          className="group cursor-pointer overflow-hidden rounded-xl border border-bone-cream bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute left-3 top-3">
              <span
                className={`inline-block rounded-full px-3 py-1 font-headline text-xs uppercase tracking-wider ${
                  categoryColors[post.category] || 'bg-gray-100 text-gray-600'
                }`}
              >
                {post.category}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-headline text-lg leading-snug text-diamond-navy transition-colors group-hover:text-stadium-crimson line-clamp-2">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-dugout-charcoal/70 line-clamp-2">{excerpt}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-dugout-charcoal/50">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime} min
              </span>
            </div>
          </div>
        </motion.article>
      </FadeUp>
    );
  }

  /* Featured card (large) */
  return (
    <FadeUp>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onClick={() => onNavigate(post.slug)}
        className="group cursor-pointer overflow-hidden rounded-2xl border border-bone-cream bg-white shadow-sm transition-shadow hover:shadow-lg lg:flex"
      >
        <div className="relative h-64 w-full overflow-hidden lg:h-auto lg:w-1/2">
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute left-4 top-4">
            <span
              className={`inline-block rounded-full px-4 py-1.5 font-headline text-xs uppercase tracking-wider text-white ${
                post.category === 'Equipment'
                  ? 'bg-gold-glove'
                  : post.category === 'Training'
                    ? 'bg-emerald-600'
                    : post.category === 'Culture'
                      ? 'bg-stadium-crimson'
                      : 'bg-diamond-navy'
              }`}
            >
              {post.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 lg:w-1/2 lg:p-10">
          <div className="flex items-center gap-3 text-xs text-dugout-charcoal/50">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-diamond-navy transition-colors group-hover:text-stadium-crimson lg:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-dugout-charcoal/70 lg:text-base lg:line-clamp-3">
            {excerpt}
          </p>
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 font-headline text-sm uppercase tracking-wider text-stadium-crimson transition-colors group-hover:text-diamond-navy">
              Read Article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.article>
    </FadeUp>
  );
}

/* ------------------------------------------------------------------ */
/*  Blog Page                                                           */
/* ------------------------------------------------------------------ */

export function BlogPage() {
  const { t, locale } = useI18n();
  const { navigate } = useNavigationStore();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = ['All', 'Equipment', 'Training', 'Culture', 'Tips'];
    return cats.map((cat) => {
      const key = `blog.categories.${cat.toLowerCase()}`;
      return { value: cat, label: t(key) || cat };
    });
  }, [t]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleNavigate = (slug: string) => {
    navigate('blogPost', { slug });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(
      locale === 'es' ? 'es-DO' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' },
    );
  };

  return (
    <div className="min-h-screen font-body">
      {/* ============================================================ */}
      {/*  Breadcrumb                                                    */}
      {/* ============================================================ */}
      <div className="border-b border-bone-cream bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-dugout-charcoal/60 lg:px-8">
          <button
            onClick={() => navigate('home')}
            className="transition-colors hover:text-diamond-navy"
          >
            {t('blog.breadcrumb.home') || 'Home'}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-diamond-navy">{t('blog.breadcrumb.blog') || 'Blog'}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Hero Section                                                 */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-diamond-navy md:min-h-[55vh]">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/img/products/mc-gloves-collection-turf.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,26,47,0.85)] via-[rgba(10,26,47,0.7)] to-[rgba(10,26,47,0.9)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-headline text-sm uppercase tracking-[0.3em] text-gold-glove"
          >
            {t('blog.hero.label') || 'MANNY CANÓ JOURNAL'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            {t('blog.hero.headline') || 'Inside the Diamond'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-bone-cream/75 md:text-lg"
          >
            {t('blog.hero.subtitle') ||
              'Stories, tips, and insights from the world of Dominican baseball.'}
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Category Filter Tabs                                          */}
      {/* ============================================================ */}
      <div className="sticky top-[72px] z-30 border-b border-bone-cream bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setVisibleCount(5);
                }}
                className={`shrink-0 rounded-full px-5 py-2 font-headline text-xs uppercase tracking-wider transition-all ${
                  activeCategory === cat.value
                    ? 'bg-diamond-navy text-white shadow-sm'
                    : 'bg-bone-cream/60 text-dugout-charcoal/70 hover:bg-bone-cream hover:text-diamond-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Posts Content                                                */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-8">
            <div className="h-80 animate-pulse rounded-2xl bg-bone-cream lg:h-96" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-xl border border-bone-cream bg-white p-4">
                  <div className="mb-4 h-48 rounded-lg bg-bone-cream" />
                  <div className="mb-2 h-5 w-3/4 rounded bg-bone-cream" />
                  <div className="mb-4 h-4 w-full rounded bg-bone-cream" />
                  <div className="h-3 w-1/2 rounded bg-bone-cream" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No posts */}
        {!loading && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <BookOpen className="mb-4 h-16 w-16 text-bone-cream" />
            <h3 className="font-display text-xl font-bold text-diamond-navy">
              {t('blog.noPosts') || 'No posts found'}
            </h3>
            <p className="mt-2 text-sm text-dugout-charcoal/60">
              {t('blog.noPostsDesc') || 'Try selecting a different category.'}
            </p>
          </motion.div>
        )}

        {/* Featured post */}
        {!loading && featuredPost && (
          <div className="mb-12">
            <FadeUp className="mb-6">
              <h2 className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
                {t('blog.featured') || 'Featured'}
              </h2>
            </FadeUp>
            <PostCard
              post={featuredPost}
              locale={locale}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* Grid of remaining posts */}
        {!loading && remainingPosts.length > 0 && (
          <AnimatedSection>
            <FadeUp className="mb-6">
              <h2 className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
                {t('blog.latestPosts') || 'Latest Articles'}
              </h2>
            </FadeUp>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post, i) => (
                <PostCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  onNavigate={handleNavigate}
                  index={i}
                  compact
                />
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Load More */}
        {!loading && hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="rounded-full border-2 border-diamond-navy px-8 py-3 font-headline text-sm uppercase tracking-wider text-diamond-navy transition-all hover:bg-diamond-navy hover:text-white"
            >
              {t('blog.loadMore') || 'Load More'}
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
