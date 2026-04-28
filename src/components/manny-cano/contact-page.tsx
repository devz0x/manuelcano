'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Loader2,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useNavigationStore } from '@/lib/navigation-store';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    transition: { staggerChildren: 0.15 },
  },
};

/* ------------------------------------------------------------------ */
/*  Reusable animated section wrapper                                   */
/* ------------------------------------------------------------------ */

function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function FadeUp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Info Card                                                    */
/* ------------------------------------------------------------------ */

function ContactInfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <FadeUp>
      <Card className="border-bone-cream bg-white transition-shadow hover:shadow-md">
        <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stadium-crimson/10">
            <Icon className="h-6 w-6 text-stadium-crimson" />
          </div>
          <h3 className="font-headline text-sm uppercase tracking-wider text-dugout-charcoal/60">
            {label}
          </h3>
          <p className="text-sm font-medium text-diamond-navy">{value}</p>
        </CardContent>
      </Card>
    </FadeUp>
  );
}

/* ------------------------------------------------------------------ */
/*  Social Link                                                          */
/* ------------------------------------------------------------------ */

function SocialLink({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-glove/30 text-dugout-charcoal/60 transition-all hover:border-gold-glove hover:bg-gold-glove hover:text-white"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Page                                                         */
/* ------------------------------------------------------------------ */

export function ContactPage() {
  const { t } = useI18n();
  const { navigate } = useNavigationStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjectOptions = [
    { value: 'general', label: t('contact.form.subjects.general') },
    { value: 'order', label: t('contact.form.subjects.order') },
    { value: 'product', label: t('contact.form.subjects.product') },
    { value: 'warranty', label: t('contact.form.subjects.warranty') },
    { value: 'sponsorship', label: t('contact.form.subjects.sponsorship') },
    { value: 'partnership', label: t('contact.form.subjects.partnership') },
    { value: 'other', label: t('contact.form.subjects.other') },
  ];

  const faqItems = [
    {
      question: t('contact.faq.q1.question'),
      answer: t('contact.faq.q1.answer'),
    },
    {
      question: t('contact.faq.q2.question'),
      answer: t('contact.faq.q2.answer'),
    },
    {
      question: t('contact.faq.q3.question'),
      answer: t('contact.faq.q3.answer'),
    },
    {
      question: t('contact.faq.q4.question'),
      answer: t('contact.faq.q4.answer'),
    },
    {
      question: t('contact.faq.q5.question'),
      answer: t('contact.faq.q5.answer'),
    },
    {
      question: t('contact.faq.q6.question'),
      answer: t('contact.faq.q6.answer'),
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: t('contact.info.emailValue'),
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: t('contact.info.phoneValue'),
    },
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: t('contact.info.addressValue'),
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/mannycano', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@mannycano', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com/mannycano', label: 'Twitter / X' },
    { icon: Facebook, href: 'https://facebook.com/mannycano', label: 'Facebook' },
  ];

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.required');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast({
          title: t('contact.form.success'),
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        toast({
          title: t('contact.form.error'),
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: t('contact.form.error'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

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
            {t('contact.breadcrumb.home')}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-diamond-navy">{t('contact.breadcrumb.contact')}</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  1. Hero Section                                               */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden md:min-h-[60vh]">
        <Image
          src="/img/products/mc-gloves-collection-flat.jpg"
          alt="Manny Canó Contact"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,26,47,0.78)] via-[rgba(10,26,47,0.6)] to-[rgba(10,26,47,0.82)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-headline text-sm uppercase tracking-[0.3em] text-gold-glove"
          >
            {t('contact.hero.label')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            {t('contact.hero.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bone-cream/80 md:text-lg"
          >
            {t('contact.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Contact Form + Info                                        */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-white py-16 px-4 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* Left: Form */}
            <div className="w-full lg:w-[60%]">
              <FadeUp>
                <h2 className="font-display text-2xl font-bold text-diamond-navy md:text-3xl">
                  {t('contact.hero.headline')}
                </h2>
              </FadeUp>

              <FadeUp>
                <p className="mt-3 text-sm leading-relaxed text-dugout-charcoal/70">
                  {t('contact.hero.subtitle')}
                </p>
              </FadeUp>

              <FadeUp>
                <Separator className="my-6 bg-gold-glove/20" />
              </FadeUp>

              <FadeUp>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-diamond-navy">
                      {t('contact.form.name')}
                    </label>
                    <Input
                      type="text"
                      placeholder={t('contact.form.namePlaceholder')}
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="border-bone-cream bg-bone-cream/30 focus-visible:border-gold-glove focus-visible:ring-gold-glove/20"
                    />
                    {errors.name && (
                      <p className="text-xs text-stadium-crimson">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-diamond-navy">
                      {t('contact.form.email')}
                    </label>
                    <Input
                      type="email"
                      placeholder={t('contact.form.emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="border-bone-cream bg-bone-cream/30 focus-visible:border-gold-glove focus-visible:ring-gold-glove/20"
                    />
                    {errors.email && (
                      <p className="text-xs text-stadium-crimson">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-diamond-navy">
                      {t('contact.form.subject')}
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => handleChange('subject', value)}
                    >
                      <SelectTrigger className="w-full border-bone-cream bg-bone-cream/30 focus:ring-gold-glove/20">
                        <SelectValue placeholder={t('contact.form.selectSubject')} />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-diamond-navy">
                      {t('contact.form.message')}
                    </label>
                    <Textarea
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="border-bone-cream bg-bone-cream/30 focus-visible:border-gold-glove focus-visible:ring-gold-glove/20"
                    />
                    {errors.message && (
                      <p className="text-xs text-stadium-crimson">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-stadium-crimson font-headline text-sm uppercase tracking-wider text-white hover:bg-stadium-crimson/90 md:w-auto md:px-10"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('contact.form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </FadeUp>
            </div>

            {/* Right: Info */}
            <div className="w-full lg:w-[40%]">
              <FadeUp>
                <div className="space-y-6 rounded-xl border border-bone-cream bg-bone-cream/30 p-8">
                  <h3 className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
                    {t('contact.info.email')}
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stadium-crimson/10">
                        <Mail className="h-5 w-5 text-stadium-crimson" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-dugout-charcoal/50">
                          {t('contact.info.email')}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-diamond-navy">
                          {t('contact.info.emailValue')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stadium-crimson/10">
                        <Phone className="h-5 w-5 text-stadium-crimson" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-dugout-charcoal/50">
                          {t('contact.info.phone')}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-diamond-navy">
                          {t('contact.info.phoneValue')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stadium-crimson/10">
                        <MapPin className="h-5 w-5 text-stadium-crimson" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-dugout-charcoal/50">
                          {t('contact.info.address')}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-diamond-navy">
                          {t('contact.info.addressValue')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stadium-crimson/10">
                        <Clock className="h-5 w-5 text-stadium-crimson" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-dugout-charcoal/50">
                          {t('contact.info.hours')}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-diamond-navy">
                          {t('contact.info.hoursValue')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  3. Contact Info Cards                                          */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-bone-cream py-16 px-4 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contactInfo.map((info) => (
              <ContactInfoCard
                key={info.label}
                icon={info.icon}
                label={info.label}
                value={info.value}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  4. FAQ Accordion                                              */}
      {/* ============================================================ */}
      <AnimatedSection className="bg-white py-16 px-4 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeUp className="text-center">
            <p className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove">
              {t('contact.faq.label')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-diamond-navy md:text-4xl">
              {t('contact.faq.headline')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-glove" />
          </FadeUp>

          <FadeUp className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-bone-cream"
                >
                  <AccordionTrigger className="text-left font-headline text-sm uppercase tracking-wide text-diamond-navy hover:text-stadium-crimson hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-dugout-charcoal/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  5. Social Media Strip                                          */}
      {/* ============================================================ */}
      <section className="border-t border-bone-cream bg-diamond-navy py-12 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="font-headline text-xs uppercase tracking-[0.2em] text-gold-glove"
          >
            {t('contact.social.label')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 flex items-center justify-center gap-4"
          >
            {socialLinks.map((social) => (
              <SocialLink
                key={social.label}
                icon={social.icon}
                href={social.href}
                label={social.label}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
