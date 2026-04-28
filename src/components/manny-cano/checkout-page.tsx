'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Check,
  CheckCircle2,
  CreditCard,
  ChevronRight,
  Home,
  Loader2,
  Lock,
  ShoppingBag,
  Truck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCartStore } from '@/lib/store';
import { useNavigationStore } from '@/lib/navigation-store';
import { useI18n } from '@/lib/i18n';
import { toast } from 'sonner';

/* ------------------------------------------------------------------ */
/*  Price formatter (USD)                                               */
/* ------------------------------------------------------------------ */

function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/* ------------------------------------------------------------------ */
/*  Generate order number                                               */
/* ------------------------------------------------------------------ */

function generateOrderNumber(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `#MC-${num}`;
}

/* ------------------------------------------------------------------ */
/*  Form data types                                                     */
/* ------------------------------------------------------------------ */

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface PaymentFormData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
  sameAsShipping: boolean;
}

type ShippingMethod = 'standard' | 'express';

/* ------------------------------------------------------------------ */
/*  Checkout Page                                                       */
/* ------------------------------------------------------------------ */

export function CheckoutPage() {
  const { t } = useI18n();
  const navigate = useNavigationStore((s) => s.navigate);
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.total);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');

  const [shipping, setShipping] = useState<ShippingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });

  const [payment, setPayment] = useState<PaymentFormData>({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
    sameAsShipping: true,
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  /* ---- Derived totals ---- */
  const subtotal = total();
  const shippingCost = shippingMethod === 'express' ? 14.99 : subtotal >= 100 ? 0 : 9.99;
  const taxEstimate = subtotal * 0.08;
  const orderTotal = subtotal + shippingCost;

  const isEmpty = items.length === 0;

  /* ---- Redirect if cart empty ---- */
  if (isEmpty && !orderPlaced) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="font-body text-tobacco-leather">
          {t('checkout.emptyCart') || 'Your cart is empty. Add some items before checking out.'}
        </p>
        <Button
          onClick={() => navigate('shop')}
          className="mt-4 bg-stadium-crimson font-headline uppercase tracking-wide text-white hover:bg-stadium-crimson/90"
        >
          {t('cartPage.continueShopping') || 'Continue Shopping'}
        </Button>
      </div>
    );
  }

  /* ---- Order Success State ---- */
  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Animated Checkmark */}
          <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-field-green/10">
            <CheckCircle2 className="size-16 text-field-green" />
          </div>

          <h1 className="mb-2 font-headline text-3xl uppercase tracking-wider text-diamond-navy lg:text-4xl">
            {t('checkout.successTitle') || 'Order Placed Successfully!'}
          </h1>

          <p className="mt-2 font-body text-base text-tobacco-leather">
            {t('checkout.successOrderNumber') || 'Order Number'}:{' '}
            <span className="font-headline text-lg font-semibold text-diamond-navy">
              {orderNumber}
            </span>
          </p>

          <p className="mt-4 font-body text-base text-tobacco-leather">
            {t('checkout.successThankYou') || 'Thank you for choosing Manny Canó'}
          </p>

          {/* Success Image */}
          <div className="mx-auto mt-8 overflow-hidden rounded-lg border border-bone-cream">
            <Image
              src="/img/checkout/order-success.jpg"
              alt={t('checkout.successAlt') || 'Order success'}
              width={640}
              height={320}
              className="h-48 w-full object-cover sm:h-64"
            />
          </div>

          <Button
            onClick={() => navigate('home')}
            className="mt-8 bg-stadium-crimson px-8 py-6 font-headline text-base uppercase tracking-wide text-white hover:bg-stadium-crimson/90"
          >
            {t('checkout.continueShopping') || 'Continue Shopping'}
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    );
  }

  /* ---- Form validation ---- */
  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};

    // Shipping fields
    if (!shipping.firstName.trim()) newErrors.firstName = true;
    if (!shipping.lastName.trim()) newErrors.lastName = true;
    if (!shipping.email.trim()) newErrors.email = true;
    if (!shipping.phone.trim()) newErrors.phone = true;
    if (!shipping.address.trim()) newErrors.address = true;
    if (!shipping.city.trim()) newErrors.city = true;
    if (!shipping.state.trim()) newErrors.state = true;
    if (!shipping.zip.trim()) newErrors.zip = true;
    if (!shipping.country) newErrors.country = true;

    // Payment fields
    if (!payment.sameAsShipping) {
      // Billing fields validation would go here
    }
    if (!payment.cardNumber.trim()) newErrors.cardNumber = true;
    if (!payment.expiry.trim()) newErrors.expiry = true;
    if (!payment.cvv.trim()) newErrors.cvv = true;
    if (!payment.nameOnCard.trim()) newErrors.nameOnCard = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---- Place Order handler ---- */
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error(t('checkout.validationError') || 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    clearCart();
    setIsSubmitting(false);
    setOrderPlaced(true);

    toast.success(
      t('checkout.orderSuccess') || `Order ${newOrderNumber} placed successfully!`
    );
  };

  /* ---- Helpers ---- */
  const updateShipping = (field: keyof ShippingFormData, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updatePayment = (field: keyof PaymentFormData, value: string | boolean) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
    if (typeof field === 'string' && errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const inputErrorClass = (field: string) =>
    errors[field] ? 'border-stadium-crimson ring-stadium-crimson/20' : '';

  /* ---- Main Checkout Form ---- */
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('home')}
              className="cursor-pointer font-body text-sm text-tobacco-leather transition-colors hover:text-diamond-navy"
            >
              <Home className="mr-1 size-4" />
              {t('checkout.breadcrumbHome') || 'Home'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('cart')}
              className="cursor-pointer font-body text-sm text-tobacco-leather transition-colors hover:text-diamond-navy"
            >
              {t('checkout.breadcrumbCart') || 'Cart'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-body text-sm font-medium text-dugout-charcoal">
              {t('checkout.title') || 'Checkout'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <h1 className="mb-8 font-headline text-3xl uppercase tracking-wider text-diamond-navy lg:text-4xl">
        {t('checkout.title') || 'Checkout'}
      </h1>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Forms */}
        <div className="space-y-8 lg:col-span-2">
          {/* Shipping Information */}
          <section className="rounded-lg border border-bone-cream bg-white p-6">
            <div className="mb-6 flex items-center gap-2">
              <Truck className="size-5 text-gold-glove" />
              <h2 className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
                {t('checkout.shippingInfo') || 'Shipping Information'}
              </h2>
            </div>

            <div className="space-y-4">
              {/* First Name / Last Name */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-body text-sm text-dugout-charcoal">
                    {t('checkout.firstName') || 'First Name'} <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={shipping.firstName}
                    onChange={(e) => updateShipping('firstName', e.target.value)}
                    className={`font-body ${inputErrorClass('firstName')}`}
                    placeholder={t('checkout.firstNamePlaceholder') || 'John'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-body text-sm text-dugout-charcoal">
                    {t('checkout.lastName') || 'Last Name'} <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={shipping.lastName}
                    onChange={(e) => updateShipping('lastName', e.target.value)}
                    className={`font-body ${inputErrorClass('lastName')}`}
                    placeholder={t('checkout.lastNamePlaceholder') || 'Doe'}
                  />
                </div>
              </div>

              {/* Email / Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body text-sm text-dugout-charcoal">
                    {t('checkout.email') || 'Email'} <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={shipping.email}
                    onChange={(e) => updateShipping('email', e.target.value)}
                    className={`font-body ${inputErrorClass('email')}`}
                    placeholder={t('checkout.emailPlaceholder') || 'john@example.com'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-body text-sm text-dugout-charcoal">
                    {t('checkout.phone') || 'Phone'} <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={shipping.phone}
                    onChange={(e) => updateShipping('phone', e.target.value)}
                    className={`font-body ${inputErrorClass('phone')}`}
                    placeholder={t('checkout.phonePlaceholder') || '(555) 123-4567'}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="font-body text-sm text-dugout-charcoal">
                  {t('checkout.address') || 'Address'} <span className="text-stadium-crimson">*</span>
                </Label>
                <Input
                  id="address"
                  value={shipping.address}
                  onChange={(e) => updateShipping('address', e.target.value)}
                  className={`font-body ${inputErrorClass('address')}`}
                  placeholder={t('checkout.addressPlaceholder') || '123 Main Street'}
                />
              </div>

              {/* Apt/Suite */}
              <div className="space-y-2">
                <Label htmlFor="apt" className="font-body text-sm text-dugout-charcoal">
                  {t('checkout.apt') || 'Apt / Suite'}
                </Label>
                <Input
                  id="apt"
                  value={shipping.apt}
                  onChange={(e) => updateShipping('apt', e.target.value)}
                  className="font-body"
                  placeholder={t('checkout.aptPlaceholder') || 'Apt 4B'}
                />
              </div>

              {/* City / State */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-body text-sm text-dugout-charcoal">
                    {t('checkout.city') || 'City'} <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={shipping.city}
                    onChange={(e) => updateShipping('city', e.target.value)}
                    className={`font-body ${inputErrorClass('city')}`}
                    placeholder={t('checkout.cityPlaceholder') || 'New York'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="font-body text-sm text-dugout-charcoal">
                    {t('checkout.state') || 'State'} <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Input
                    id="state"
                    value={shipping.state}
                    onChange={(e) => updateShipping('state', e.target.value)}
                    className={`font-body ${inputErrorClass('state')}`}
                    placeholder={t('checkout.statePlaceholder') || 'NY'}
                  />
                </div>
              </div>

              {/* ZIP Code */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="zip" className="font-body text-sm text-dugout-charcoal">
                    {t('checkout.zip') || 'ZIP Code'} <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Input
                    id="zip"
                    value={shipping.zip}
                    onChange={(e) => updateShipping('zip', e.target.value)}
                    className={`font-body ${inputErrorClass('zip')}`}
                    placeholder={t('checkout.zipPlaceholder') || '10001'}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm text-dugout-charcoal">
                    {t('checkout.country') || 'Country'} <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Select
                    value={shipping.country}
                    onValueChange={(value) => updateShipping('country', value)}
                  >
                    <SelectTrigger className={`w-full font-body ${inputErrorClass('country')}`}>
                      <SelectValue placeholder={t('checkout.countryPlaceholder') || 'Select country'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="DO">República Dominicana</SelectItem>
                      <SelectItem value="PR">Puerto Rico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Method */}
          <section className="rounded-lg border border-bone-cream bg-white p-6">
            <div className="mb-6 flex items-center gap-2">
              <Truck className="size-5 text-gold-glove" />
              <h2 className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
                {t('checkout.shippingMethod') || 'Shipping Method'}
              </h2>
            </div>

            <RadioGroup
              value={shippingMethod}
              onValueChange={(value) => setShippingMethod(value as ShippingMethod)}
              className="space-y-3"
            >
              {/* Standard */}
              <label
                htmlFor="shipping-standard"
                className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                  shippingMethod === 'standard'
                    ? 'border-diamond-navy bg-bone-cream/50'
                    : 'border-bone-cream hover:border-tobacco-leather/30'
                }`}
              >
                <RadioGroupItem value="standard" id="shipping-standard" />
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="size-5 text-tobacco-leather" />
                    <div>
                      <p className="font-body text-sm font-medium text-dugout-charcoal">
                        {t('checkout.standardShipping') || 'Standard Shipping'}
                      </p>
                      <p className="font-body text-xs text-tobacco-leather">
                        {t('checkout.standardDays') || '5-7 business days'}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-headline text-sm font-semibold ${
                      subtotal >= 100 ? 'text-field-green' : 'text-dugout-charcoal'
                    }`}
                  >
                    {subtotal >= 100
                      ? (t('checkout.free') || 'FREE')
                      : formatPrice(9.99)}
                  </span>
                </div>
              </label>

              {/* Express */}
              <label
                htmlFor="shipping-express"
                className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                  shippingMethod === 'express'
                    ? 'border-diamond-navy bg-bone-cream/50'
                    : 'border-bone-cream hover:border-tobacco-leather/30'
                }`}
              >
                <RadioGroupItem value="express" id="shipping-express" />
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="size-5 text-tobacco-leather" />
                    <div>
                      <p className="font-body text-sm font-medium text-dugout-charcoal">
                        {t('checkout.expressShipping') || 'Express Shipping'}
                      </p>
                      <p className="font-body text-xs text-tobacco-leather">
                        {t('checkout.expressDays') || '2-3 business days'}
                      </p>
                    </div>
                  </div>
                  <span className="font-headline text-sm font-semibold text-dugout-charcoal">
                    {formatPrice(14.99)}
                  </span>
                </div>
              </label>
            </RadioGroup>
          </section>

          {/* Payment Information */}
          <section className="rounded-lg border border-bone-cream bg-white p-6">
            <div className="mb-6 flex items-center gap-2">
              <CreditCard className="size-5 text-gold-glove" />
              <h2 className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
                {t('checkout.paymentInfo') || 'Payment Information'}
              </h2>
            </div>

            {/* Same as shipping */}
            <div className="mb-6 flex items-center gap-3 rounded-md bg-bone-cream/50 p-3">
              <Checkbox
                id="sameAsShipping"
                checked={payment.sameAsShipping}
                onCheckedChange={(checked) =>
                  updatePayment('sameAsShipping', checked === true)
                }
              />
              <Label
                htmlFor="sameAsShipping"
                className="cursor-pointer font-body text-sm text-dugout-charcoal"
              >
                {t('checkout.sameAsShipping') || 'Billing address same as shipping address'}
              </Label>
            </div>

            {/* Demo notice */}
            <div className="mb-6 flex items-center gap-2 rounded-md border border-gold-glove/30 bg-gold-glove/5 p-3">
              <Lock className="size-4 flex-shrink-0 text-gold-glove" />
              <p className="font-body text-xs text-tobacco-leather">
                {t('checkout.demoNotice') ||
                  'This is a demo — no real payment will be processed.'}
              </p>
            </div>

            <div className="space-y-4">
              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="font-body text-sm text-dugout-charcoal">
                  {t('checkout.cardNumber') || 'Card Number'} <span className="text-stadium-crimson">*</span>
                </Label>
                <div className="relative">
                  <CreditCard className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-tobacco-leather/40" />
                  <Input
                    id="cardNumber"
                    value={payment.cardNumber}
                    onChange={(e) =>
                      updatePayment('cardNumber', formatCardNumber(e.target.value))
                    }
                    className={`pl-10 font-body ${inputErrorClass('cardNumber')}`}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                  />
                </div>
              </div>

              {/* Expiry / CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="font-body text-sm text-dugout-charcoal">
                    {t('checkout.expiry') || 'Expiry Date'} <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Input
                    id="expiry"
                    value={payment.expiry}
                    onChange={(e) =>
                      updatePayment('expiry', formatExpiry(e.target.value))
                    }
                    className={`font-body ${inputErrorClass('expiry')}`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="font-body text-sm text-dugout-charcoal">
                    CVV <span className="text-stadium-crimson">*</span>
                  </Label>
                  <Input
                    id="cvv"
                    value={payment.cvv}
                    onChange={(e) =>
                      updatePayment('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))
                    }
                    className={`font-body ${inputErrorClass('cvv')}`}
                    placeholder="123"
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>

              {/* Name on Card */}
              <div className="space-y-2">
                <Label htmlFor="nameOnCard" className="font-body text-sm text-dugout-charcoal">
                  {t('checkout.nameOnCard') || 'Name on Card'} <span className="text-stadium-crimson">*</span>
                </Label>
                <Input
                  id="nameOnCard"
                  value={payment.nameOnCard}
                  onChange={(e) => updatePayment('nameOnCard', e.target.value)}
                  className={`font-body ${inputErrorClass('nameOnCard')}`}
                  placeholder={t('checkout.nameOnCardPlaceholder') || 'John Doe'}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right: Order Summary (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6 rounded-lg border border-bone-cream bg-white p-6">
            <h2 className="font-headline text-lg uppercase tracking-wider text-diamond-navy">
              {t('checkout.orderSummary') || 'Order Summary'}
            </h2>

            {/* Cart Items (compact) */}
            <div className="max-h-64 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative size-12 flex-shrink-0 overflow-hidden rounded-md bg-bone-cream">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <ShoppingBag className="size-5 text-tobacco-leather/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="truncate text-sm font-medium text-dugout-charcoal">
                      {item.name}
                    </p>
                    <p className="font-body text-xs text-tobacco-leather">
                      {t('checkout.qty') || 'Qty'}: {item.quantity}
                    </p>
                  </div>
                  <p className="flex-shrink-0 font-body text-sm font-semibold text-dugout-charcoal">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="bg-bone-cream" />

            {/* Price Breakdown */}
            <div className="space-y-3 font-body">
              <div className="flex items-center justify-between text-sm">
                <span className="text-tobacco-leather">
                  {t('checkout.subtotal') || 'Subtotal'}
                </span>
                <span className="font-medium text-dugout-charcoal">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-tobacco-leather">
                  {t('checkout.shipping') || 'Shipping'}
                </span>
                <span
                  className={`font-medium ${shippingCost === 0 ? 'text-field-green' : 'text-dugout-charcoal'}`}
                >
                  {shippingCost === 0
                    ? (t('checkout.free') || 'FREE')
                    : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-tobacco-leather">
                  {t('checkout.taxEstimate') || 'Estimated Tax (8%)'}
                </span>
                <span className="font-medium text-dugout-charcoal">
                  {formatPrice(taxEstimate)}
                </span>
              </div>
            </div>

            <Separator className="bg-bone-cream" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="font-headline text-base uppercase tracking-wide text-diamond-navy">
                {t('checkout.total') || 'Total'}
              </span>
              <span className="font-headline text-xl font-bold text-diamond-navy">
                {formatPrice(orderTotal)}
              </span>
            </div>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full bg-stadium-crimson py-6 font-headline text-base uppercase tracking-wide text-white hover:bg-stadium-crimson/90 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  {t('checkout.processing') || 'Processing...'}
                </>
              ) : (
                <>
                  <Check className="mr-2 size-4" />
                  {t('checkout.placeOrder') || 'Place Order'}
                </>
              )}
            </Button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 text-center">
              <Lock className="size-3 text-tobacco-leather/50" />
              <p className="font-body text-[10px] text-tobacco-leather/60">
                {t('checkout.secureCheckout') ||
                  '256-bit SSL encrypted checkout'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
