'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function BrandStory() {
  const { t } = useI18n();

  return (
    <section className="relative w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Image - Left (60%) */}
        <div className="relative w-full lg:w-[60%] min-h-[400px] lg:min-h-[600px]">
          <Image
            src="/img/story/sandlot-santo-domingo.jpg"
            alt="Campo de béisbol en Santo Domingo"
            fill
            className="object-cover rounded-none lg:rounded-l-lg shadow-lg"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>

        {/* Content - Right (40%) */}
        <div className="w-full lg:w-[40%] bg-white py-12 px-6 sm:py-16 sm:px-8 lg:px-12">
          {/* Label */}
          <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
            {t('story.label')}
          </p>

          {/* Headline */}
          <h2 className="mt-4 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
            {t('story.headline')}
          </h2>

          {/* Body */}
          <p className="mt-6 text-base leading-relaxed text-dugout-charcoal/80">
            {t('story.body')}
          </p>

          {/* Stats Row */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gold-glove/20 pt-8">
            <div>
              <p className="font-headline text-3xl font-bold text-stadium-crimson md:text-4xl lg:text-5xl">
                {t('story.stat1Value')}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-tobacco-leather sm:text-sm">
                {t('story.stat1Label')}
              </p>
            </div>
            <div>
              <p className="font-headline text-3xl font-bold text-stadium-crimson md:text-4xl lg:text-5xl">
                {t('story.stat2Value')}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-tobacco-leather sm:text-sm">
                {t('story.stat2Label')}
              </p>
            </div>
            <div>
              <p className="font-headline text-3xl font-bold text-stadium-crimson md:text-4xl lg:text-5xl">
                {t('story.stat3Value')}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-tobacco-leather sm:text-sm">
                {t('story.stat3Label')}
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 font-headline uppercase tracking-wider text-diamond-navy transition-colors hover:text-stadium-crimson"
          >
            {t('story.cta')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
