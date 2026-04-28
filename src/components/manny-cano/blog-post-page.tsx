'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ChevronRight,
  Clock,
  User,
  Tag,
  ArrowLeft,
  Calendar,
  BookOpen,
  Share2,
} from 'lucide-react';
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
  content: string;
  contentEs: string;
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
    transition: { staggerChildren: 0.1 },
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
/*  Related Post Card                                                   */
/* ------------------------------------------------------------------ */

function RelatedPostCard({
  post,
  locale,
  onNavigate,
}: {
  post: BlogPost;
  locale: string;
  onNavigate: (slug: string) => void;
}) {
  const title = locale === 'es' ? post.titleEs : post.title;
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'es' ? 'es-DO' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' },
  );

  return (
    <FadeUp>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onClick={() => onNavigate(post.slug)}
        className="group cursor-pointer overflow-hidden rounded-xl border border-bone-cream bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-4">
          <p className="mb-2 font-headline text-xs uppercase tracking-wider text-gold-glove">
            {post.category}
          </p>
          <h4 className="font-headline text-base leading-snug text-diamond-navy transition-colors group-hover:text-stadium-crimson line-clamp-2">
            {title}
          </h4>
          <div className="mt-3 flex items-center gap-3 text-xs text-dugout-charcoal/50">
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

/* ------------------------------------------------------------------ */
/*  Blog Post Page                                                      */
/* ------------------------------------------------------------------ */

export function BlogPostPage() {
  const { t, locale } = useI18n();
  const { navigate, params } = useNavigationStore();

  const slug = params?.slug || '';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        const found = data.find((p) => p.slug === slug);
        setPost(found || null);
        if (found) {
          const related = data
            .filter((p) => p.id !== found.id)
            .sort((a, b) => {
              /* Prefer same category, then latest */
              if (a.category === found.category && b.category !== found.category) return -1;
              if (a.category !== found.category && b.category === found.category) return 1;
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            .slice(0, 3);
          setRelatedPosts(related);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post ? (locale === 'es' ? post.titleEs : post.title) : '',
          url: window.location.href,
        });
      } catch {
        /* User cancelled share */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage('Copied!');
      setTimeout(() => setShareMessage(''), 2000);
    }
  };

  const handleNavigate = (newSlug: string) => {
    navigate('blogPost', { slug: newSlug });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  /* Loading state */
  if (loading) {
    return (
      <div className="min-h-screen font-body">
        <div className="border-b border-bone-cream bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-dugout-charcoal/60 lg:px-8">
            <div className="h-4 w-16 animate-pulse rounded bg-bone-cream" />
            <ChevronRight className="h-3.5 w-3.5" />
            <div className="h-4 w-12 animate-pulse rounded bg-bone-cream" />
            <ChevronRight className="h-3.5 w-3.5" />
            <div className="h-4 w-40 animate-pulse rounded bg-bone-cream" />
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
          <div className="mb-6 h-4 w-32 animate-pulse rounded bg-bone-cream" />
          <div className="mb-4 h-10 w-3/4 animate-pulse rounded bg-bone-cream" />
          <div className="mb-8 h-60 animate-pulse rounded-xl bg-bone-cream" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-full animate-pulse rounded bg-bone-cream" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* Not found */
  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center font-body">
        <div className="text-center">
          <BookOpen className="mx-auto mb-4 h-16 w-16 text-bone-cream" />
          <h2 className="font-display text-2xl font-bold text-diamond-navy">
            {t('blogPost.notFound') || 'Post Not Found'}
          </h2>
          <p className="mt-2 text-sm text-dugout-charcoal/60">
            {t('blogPost.notFoundDesc') || 'The article you are looking for does not exist.'}
          </p>
          <button
            onClick={() => navigate('blog')}
            className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-diamond-navy px-6 py-2.5 font-headline text-sm uppercase tracking-wider text-diamond-navy transition-all hover:bg-diamond-navy hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('blogPost.backToBlog') || 'Back to Blog'}
          </button>
        </div>
      </div>
    );
  }

  const title = locale === 'es' ? post.titleEs : post.title;
  const content = locale === 'es' ? post.contentEs : post.content;
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
            {t('blogPost.breadcrumb.home') || 'Home'}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <button
            onClick={() => navigate('blog')}
            className="transition-colors hover:text-diamond-navy"
          >
            {t('blogPost.breadcrumb.blog') || 'Blog'}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="max-w-[200px] truncate font-medium text-diamond-navy md:max-w-none">
            {title}
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Article Header                                                */}
      {/* ============================================================ */}
      <article className="mx-auto max-w-4xl px-4 pt-10 lg:px-8 lg:pt-16">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('blog')}
          className="mb-8 inline-flex items-center gap-2 font-headline text-sm uppercase tracking-wider text-dugout-charcoal/60 transition-colors hover:text-diamond-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('blogPost.backToBlog') || 'Back to Blog'}
        </motion.button>

        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span
            className={`inline-block rounded-full px-4 py-1.5 font-headline text-xs uppercase tracking-wider ${
              categoryColors[post.category] || 'bg-gray-100 text-gray-600'
            }`}
          >
            {post.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 font-display text-3xl font-bold leading-tight text-diamond-navy md:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-bone-cream pb-6 text-sm text-dugout-charcoal/60"
        >
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {t('blogPost.by') || 'By'} {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {t('blogPost.published') || 'Published'} {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTime} {t('blogPost.readTime') || 'min read'}
          </span>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={post.image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/*  Article Body                                                  */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="prose-custom mt-10"
        >
          {/* Render HTML content with styled elements */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </motion.div>

        {/* ============================================================ */}
        {/*  Share Button                                                  */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-10 flex items-center gap-3 border-t border-bone-cream pt-6"
        >
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-bone-cream px-5 py-2.5 font-headline text-xs uppercase tracking-wider text-dugout-charcoal/70 transition-all hover:border-diamond-navy hover:text-diamond-navy"
          >
            <Share2 className="h-4 w-4" />
            {t('blogPost.share') || 'Share'}
          </button>
          {shareMessage && (
            <span className="text-sm font-medium text-emerald-600">{shareMessage}</span>
          )}
        </motion.div>

        {/* ============================================================ */}
        {/*  Tags                                                         */}
        {/* ============================================================ */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-gold-glove" />
          <span className="mr-1 font-headline text-xs uppercase tracking-wider text-dugout-charcoal/50">
            {t('blogPost.tags') || 'Tags'}:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-bone-cream/70 px-3 py-1 text-xs text-dugout-charcoal/70"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* ============================================================ */}
        {/*  Author Bio                                                    */}
        {/* ============================================================ */}
        <div className="mt-10 rounded-xl border border-bone-cream bg-white p-6 shadow-sm">
          <FadeUp>
            <p className="mb-3 font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
              {t('blogPost.authorBio') || 'About the Author'}
            </p>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-diamond-navy text-lg font-bold text-white">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-headline text-base font-semibold text-diamond-navy">
                  {post.author}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-dugout-charcoal/70">
                  {locale === 'es'
                    ? 'Escritor colaborador de Manny Canó. Apasionado por el béisbol dominicano y la artesanía del equipamiento profesional.'
                    : 'Contributing writer for Manny Canó. Passionate about Dominican baseball and the craft of professional equipment.'}
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ============================================================ */}
        {/*  Related Posts                                                */}
        {/* ============================================================ */}
        {relatedPosts.length > 0 && (
          <AnimatedSection className="mt-16 border-t border-bone-cream pt-10">
            <FadeUp className="mb-8">
              <h2 className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
                {t('blogPost.relatedPosts') || 'Related Articles'}
              </h2>
            </FadeUp>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <RelatedPostCard
                  key={rp.id}
                  post={rp}
                  locale={locale}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* ============================================================ */}
        {/*  Bottom CTA - Back to Blog                                     */}
        {/* ============================================================ */}
        <div className="mt-16 pb-16 text-center">
          <button
            onClick={() => navigate('blog')}
            className="inline-flex items-center gap-2 rounded-full border-2 border-diamond-navy px-8 py-3 font-headline text-sm uppercase tracking-wider text-diamond-navy transition-all hover:bg-diamond-navy hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('blogPost.backToBlog') || 'Back to Blog'}
          </button>
        </div>
      </article>

      {/* Inline styles for blog content */}
      <style jsx global>{`
        .blog-content p {
          margin-bottom: 1.25rem;
          font-size: 1.0625rem;
          line-height: 1.8;
          color: rgba(30, 30, 30, 0.78);
        }
        .blog-content h3 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-family: var(--font-headline);
          font-size: 1.375rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #0a1a2f;
        }
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
          color: rgba(30, 30, 30, 0.78);
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          font-size: 1.0625rem;
          line-height: 1.75;
        }
        .blog-content blockquote {
          border-left: 4px solid #c5a54e;
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: rgba(30, 30, 30, 0.65);
        }
        .blog-content a {
          color: #b91c1c;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content a:hover {
          color: #0a1a2f;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
