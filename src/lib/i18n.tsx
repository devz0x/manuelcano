'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Locale = 'es' | 'en';

interface Translations {
  [key: string]: string;
}

// Translation dictionary - contains ALL text strings for the entire site
const translations: Record<Locale, Translations> = {
  es: {
    // Utility Bar
    'utility.freeShipping': 'ENVÍO GRATIS EN COMPRAS DE $100+',
    'utility.freeShippingHighlight': '$100+',
    'utility.sizeGuide': 'Guía de Tallas',
    'utility.warranty': 'Garantía Pro',
    'utility.trackOrder': 'Rastrear Pedido',

    // Navigation categories
    'nav.gloves': 'Guantes',
    'nav.bats': 'Bates',
    'nav.catcher': 'Catcher',
    'nav.balls': 'Pelotas',
    'nav.bags': 'Mochilas',
    'nav.accessories': 'Accesorios',

    // Nav subcategories - Guantes
    'nav.byPosition': 'Por Posición',
    'nav.infield': 'Infield',
    'nav.outfield': 'Outfield',
    'nav.pitcher': 'Pitcher',
    'nav.firstBase': 'Primera Base',
    'nav.catcherMitt': 'Catcher (Mascotas)',
    'nav.bySeries': 'Por Serie',
    'nav.professional': 'Profesional',
    'nav.heritage': 'Heritage',
    'nav.diamond': 'Diamante',
    'nav.cantera': 'Cantera',

    // Nav subcategories - Bates
    'nav.byMaterial': 'Por Material',
    'nav.wood': 'Madera',
    'nav.aluminum': 'Aluminio',
    'nav.composite': 'Compuesto',
    'nav.byCert': 'Por Certificación',
    'nav.bbcor': 'BBCOR',
    'nav.usssa': 'USSSA',
    'nav.usa': 'USA',

    // Nav subcategories - Catcher
    'nav.completeSets': 'Equipos Completos',
    'nav.proSet': 'Set Profesional',
    'nav.canteraSet': 'Set Cantera',
    'nav.individualPieces': 'Piezas Individuales',
    'nav.mask': 'Mascara',
    'nav.chestProtector': 'Pechera',
    'nav.legGuards': 'Espinilleras',
    'nav.catcherGlove': 'Guante de Catcher',
    'nav.kneeSavers': 'Rodilleras',

    // Nav subcategories - Pelotas
    'nav.byUse': 'Por Uso',
    'nav.game': 'Partido',
    'nav.practice': 'Práctica',
    'nav.training': 'Entrenamiento',
    'nav.byQuantity': 'Por Cantidad',
    'nav.dozen': '1 Docena',
    'nav.threeDozen': '3 Docenas',
    'nav.bucket': 'Balde',

    // Nav subcategories - Mochilas
    'nav.byType': 'Por Tipo',
    'nav.batPack': 'Bat Pack',
    'nav.catcherBag': 'Catcher Bag',
    'nav.rollerBag': 'Roller Bag',
    'nav.dayPack': 'Mochila de Día',
    'nav.gymBag': 'Gym Bag',

    // Nav subcategories - Accesorios
    'nav.batting': 'Bateo',
    'nav.battingGloves': 'Batting Gloves',
    'nav.batWeights': 'Pesos de Bate',
    'nav.care': 'Cuidado',
    'nav.leatherOil': 'Aceite de Cuero',
    'nav.conditioner': 'Condicionador',
    'nav.brush': 'Cepillo',
    'nav.apparel': 'Vestimenta',
    'nav.tshirts': 'Camisetas',
    'nav.pants': 'Pantalones',
    'nav.hoodies': 'Sudaderas',
    'nav.caps': 'Gorras',

    // Hero
    'hero.tagline': 'Hecho en la cuna del béisbol.',
    'hero.headline': 'Del Play al Stadium.',
    'hero.subheadline': 'Equipamiento de nivel profesional, forjado en la tierra que le ha dado al béisbol más leyendas que ningún otro lugar del mundo.',
    'hero.cta1': 'Ver Línea Profesional',
    'hero.cta2': 'Diseñar Mi Guante',

    // Categories
    'categories.title': 'Compra por Categoría',

    // Featured Products
    'products.title': 'Línea Profesional',
    'products.subtitle': 'Cuero curado a mano. Especificaciones MLB. La misma pieza que confiarías a tu carrera.',
    'products.viewAll': 'Ver toda la línea',
    'products.addToCart': 'Agregar al Carrito',
    'products.moreSold': 'MÁS VENDIDO',
    'products.new': 'NUEVO',
    'products.premium': 'PREMIUM',
    'products.reviews': 'reseñas',

    // Brand Story
    'story.label': 'Nuestra historia',
    'story.headline': 'La isla que cambió el béisbol.',
    'story.body': 'República Dominicana ha producido más jugadores activos en MLB per cápita que cualquier país del planeta. No es casualidad. Es cultura. Cuando construyes equipamiento aquí, construyes con esa exigencia en la sangre.',
    'story.stat1Value': '800+',
    'story.stat1Label': 'Dominicanos en MLB históricos',
    'story.stat2Value': '11%',
    'story.stat2Label': 'del roster MLB es dominicano',
    'story.stat3Value': '1956',
    'story.stat3Label': 'primer dominicano en MLB',
    'story.cta': 'Conoce nuestra historia',

    // Custom Promo
    'custom.label': 'Custom Pro-Fit',
    'custom.headline': 'Diseña tu guante. Pieza por pieza.',
    'custom.body': 'Más de 40 partes personalizables: cuero, web, palma, lacing, color, bordados. Entrega en 6-8 semanas. Construido para tus manos.',
    'custom.price': '$299 - $799',
    'custom.cta': 'Empezar diseño',

    // Tech
    'tech.title': 'Por qué Manny Canó se siente diferente',
    'tech.feature1Title': 'Cuero Premium Curado',
    'tech.feature1Desc': '12 meses de curado natural antes de cortar.',
    'tech.feature2Title': 'Costura Doble Reforzada',
    'tech.feature2Desc': 'Cada lacing pasa por 4 controles de tensión.',
    'tech.feature3Title': 'Pro-Fit System',
    'tech.feature3Desc': 'Patrones ajustados a la mano del jugador latino.',
    'tech.feature4Title': 'Garantía Pro 1 Año',
    'tech.feature4Desc': 'Defectos de fábrica cubiertos. Sin letra chica.',

    // Testimonials
    'testimonials.title': 'Lo que dice el clubhouse',
    'testimonials.quote1': 'El mejor break-in que he sentido en años. Pocket perfecto desde el día 30.',
    'testimonials.author1': 'Pedro M.',
    'testimonials.role1': 'AAA, Sistema Yankees',
    'testimonials.quote2': 'Mi pelao usa el Cantera USA -10 y mejoró su average 80 puntos en una temporada.',
    'testimonials.author2': 'Carlos R.',
    'testimonials.role2': 'Coach LMD U-12',
    'testimonials.quote3': 'El peto Profesional aguanta foul tips como ningún otro que haya tenido.',
    'testimonials.author3': 'Rafael S.',
    'testimonials.role3': 'Catcher liga semipro',

    // Press
    'press.title': 'Como se ha visto en',

    // Cart
    'cart.title': 'Tu Carrito',
    'cart.item': 'artículo',
    'cart.items': 'artículos',
    'cart.empty': 'Tu carrito está vacío',
    'cart.emptyDesc': 'Explora nuestra selección de equipamiento profesional.',
    'cart.continueShopping': 'Seguir Comprando',
    'cart.total': 'Total',
    'cart.viewCart': 'Ver Carrito',
    'cart.checkout': 'Checkout',
    'cart.shippingNote': 'Envío calculado en el checkout',
    'cart.size': 'Talla',
    'cart.color': 'Color',
    'cart.added': 'agregado al carrito',

    // Mobile Nav
    'mobile.menu': 'Menú',
    'mobile.account': 'Mi Cuenta',
    'mobile.search': 'Buscar',
    'mobile.cart': 'Carrito',

    // Footer
    'footer.newsletterTitle': 'Entra al Roster.',
    'footer.newsletterDesc': 'Drops de productos, lanzamientos de atletas y descuentos exclusivos.',
    'footer.subscribe': 'Suscribirme',
    'footer.subscribed': '¡Bienvenido al Roster!',
    'footer.subscribedDesc': 'Te suscribiste exitosamente. Revisa tu correo.',
    'footer.tagline': 'Equipamiento de béisbol profesional. Diseñado en República Dominicana.',
    'footer.shop': 'Comprar',
    'footer.brand': 'La Marca',
    'footer.support': 'Soporte',
    'footer.community': 'Comunidad',
    'footer.ourHistory': 'Nuestra Historia',
    'footer.athletes': 'Atletas',
    'footer.technology': 'Tecnología',
    'footer.sustainability': 'Sustentabilidad',
    'footer.sizeGuide': 'Guía de Tallas',
    'footer.gloveCare': 'Cuidado del Guante',
    'footer.shipping': 'Envíos',
    'footer.returns': 'Devoluciones',
    'footer.warranty': 'Garantía',
    'footer.faq': 'FAQ',
    'footer.canteraProgram': 'Programa Cantera',
    'footer.sponsorship': 'Patrocinio',
    'footer.showcases': 'Showcases',
    'footer.blog': 'Blog',
    'footer.rewards': 'MC Rewards',
    'footer.trustPayment': 'Pago Seguro',
    'footer.trustShipping': 'Envío USA',
    'footer.trustReturns': 'Devoluciones 30 días',
    'footer.trustWarranty': 'Garantía Pro',
    'footer.copyright': '© 2026 Manny Canó. Todos los derechos reservados.',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
  },
  en: {
    // Utility Bar
    'utility.freeShipping': 'FREE SHIPPING ON ORDERS $100+',
    'utility.freeShippingHighlight': '$100+',
    'utility.sizeGuide': 'Size Guide',
    'utility.warranty': 'Pro Warranty',
    'utility.trackOrder': 'Track Order',

    // Navigation categories
    'nav.gloves': 'Gloves',
    'nav.bats': 'Bats',
    'nav.catcher': 'Catcher',
    'nav.balls': 'Balls',
    'nav.bags': 'Bags',
    'nav.accessories': 'Accessories',

    // Nav subcategories - Gloves
    'nav.byPosition': 'By Position',
    'nav.infield': 'Infield',
    'nav.outfield': 'Outfield',
    'nav.pitcher': 'Pitcher',
    'nav.firstBase': 'First Base',
    'nav.catcherMitt': 'Catcher Mitts',
    'nav.bySeries': 'By Series',
    'nav.professional': 'Professional',
    'nav.heritage': 'Heritage',
    'nav.diamond': 'Diamond',
    'nav.cantera': 'Cantera',

    // Nav subcategories - Bats
    'nav.byMaterial': 'By Material',
    'nav.wood': 'Wood',
    'nav.aluminum': 'Aluminum',
    'nav.composite': 'Composite',
    'nav.byCert': 'By Certification',
    'nav.bbcor': 'BBCOR',
    'nav.usssa': 'USSSA',
    'nav.usa': 'USA',

    // Nav subcategories - Catcher
    'nav.completeSets': 'Complete Sets',
    'nav.proSet': 'Pro Set',
    'nav.canteraSet': 'Cantera Set',
    'nav.individualPieces': 'Individual Pieces',
    'nav.mask': 'Helmet / Mask',
    'nav.chestProtector': 'Chest Protector',
    'nav.legGuards': 'Leg Guards',
    'nav.catcherGlove': 'Catcher Glove',
    'nav.kneeSavers': 'Knee Savers',

    // Nav subcategories - Balls
    'nav.byUse': 'By Use',
    'nav.game': 'Game',
    'nav.practice': 'Practice',
    'nav.training': 'Training',
    'nav.byQuantity': 'By Quantity',
    'nav.dozen': '1 Dozen',
    'nav.threeDozen': '3 Dozens',
    'nav.bucket': 'Bucket',

    // Nav subcategories - Bags
    'nav.byType': 'By Type',
    'nav.batPack': 'Bat Pack',
    'nav.catcherBag': 'Catcher Bag',
    'nav.rollerBag': 'Roller Bag',
    'nav.dayPack': 'Day Pack',
    'nav.gymBag': 'Gym Bag',

    // Nav subcategories - Accessories
    'nav.batting': 'Batting',
    'nav.battingGloves': 'Batting Gloves',
    'nav.batWeights': 'Bat Weights',
    'nav.care': 'Care',
    'nav.leatherOil': 'Leather Oil',
    'nav.conditioner': 'Conditioner',
    'nav.brush': 'Brush',
    'nav.apparel': 'Apparel',
    'nav.tshirts': 'T-Shirts',
    'nav.pants': 'Pants',
    'nav.hoodies': 'Hoodies',
    'nav.caps': 'Caps',

    // Hero
    'hero.tagline': 'Made in the cradle of baseball.',
    'hero.headline': 'From the Sandlot to the Stadium.',
    'hero.subheadline': 'Professional-grade equipment, forged in the land that has produced more baseball legends per square mile than anywhere else on Earth.',
    'hero.cta1': 'Shop Pro Line',
    'hero.cta2': 'Design Your Glove',

    // Categories
    'categories.title': 'Shop by Category',

    // Featured Products
    'products.title': 'Pro Line',
    'products.subtitle': 'Hand-curated leather. MLB specs. The same piece you would trust your career to.',
    'products.viewAll': 'View full collection',
    'products.addToCart': 'Add to Cart',
    'products.moreSold': 'BESTSELLER',
    'products.new': 'NEW',
    'products.premium': 'PREMIUM',
    'products.reviews': 'reviews',

    // Brand Story
    'story.label': 'Our Story',
    'story.headline': 'The island that changed baseball.',
    'story.body': 'The Dominican Republic has produced more active MLB players per capita than any country on the planet. It is no coincidence. It is culture. When you build equipment here, you build with that demand in your blood.',
    'story.stat1Value': '800+',
    'story.stat1Label': 'Dominicans in MLB history',
    'story.stat2Value': '11%',
    'story.stat2Label': 'of MLB roster is Dominican',
    'story.stat3Value': '1956',
    'story.stat3Label': 'First Dominican in MLB',
    'story.cta': 'Read our story',

    // Custom Promo
    'custom.label': 'Custom Pro-Fit',
    'custom.headline': 'Design your glove. Piece by piece.',
    'custom.body': 'Over 40 customizable parts: leather, web, palm, lacing, color, embroidery. Delivery in 6-8 weeks. Built for your hands.',
    'custom.price': '$299 - $799',
    'custom.cta': 'Start designing',

    // Tech
    'tech.title': 'Why Manny Canó feels different',
    'tech.feature1Title': 'Premium Curated Leather',
    'tech.feature1Desc': '12 months of natural curing before cutting.',
    'tech.feature2Title': 'Double Reinforced Stitching',
    'tech.feature2Desc': 'Every lacing goes through 4 tension controls.',
    'tech.feature3Title': 'Pro-Fit System',
    'tech.feature3Desc': 'Patterns tailored to the Latino player hand.',
    'tech.feature4Title': '1-Year Pro Warranty',
    'tech.feature4Desc': 'Factory defects covered. No fine print.',

    // Testimonials
    'testimonials.title': 'What the clubhouse says',
    'testimonials.quote1': 'Best break-in I have felt in years. Perfect pocket from day 30.',
    'testimonials.author1': 'Pedro M.',
    'testimonials.role1': 'AAA, Yankees System',
    'testimonials.quote2': 'My kid uses the Cantera USA -10 and improved his average 80 points in one season.',
    'testimonials.author2': 'Carlos R.',
    'testimonials.role2': 'Coach LMD U-12',
    'testimonials.quote3': 'The Pro chest protector holds up against foul tips like nothing I have ever had.',
    'testimonials.author3': 'Rafael S.',
    'testimonials.role3': 'Semi-pro Catcher',

    // Press
    'press.title': 'As seen in',

    // Cart
    'cart.title': 'Your Cart',
    'cart.item': 'item',
    'cart.items': 'items',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Explore our selection of professional equipment.',
    'cart.continueShopping': 'Continue Shopping',
    'cart.total': 'Total',
    'cart.viewCart': 'View Cart',
    'cart.checkout': 'Checkout',
    'cart.shippingNote': 'Shipping calculated at checkout',
    'cart.size': 'Size',
    'cart.color': 'Color',
    'cart.added': 'added to cart',

    // Mobile Nav
    'mobile.menu': 'Menu',
    'mobile.account': 'My Account',
    'mobile.search': 'Search',
    'mobile.cart': 'Cart',

    // Footer
    'footer.newsletterTitle': 'Join the Roster.',
    'footer.newsletterDesc': 'Product drops, athlete launches, and exclusive discounts.',
    'footer.subscribe': 'Subscribe',
    'footer.subscribed': 'Welcome to the Roster!',
    'footer.subscribedDesc': 'You subscribed successfully. Check your email.',
    'footer.tagline': 'Professional baseball equipment. Designed in the Dominican Republic.',
    'footer.shop': 'Shop',
    'footer.brand': 'The Brand',
    'footer.support': 'Support',
    'footer.community': 'Community',
    'footer.ourHistory': 'Our History',
    'footer.athletes': 'Athletes',
    'footer.technology': 'Technology',
    'footer.sustainability': 'Sustainability',
    'footer.sizeGuide': 'Size Guide',
    'footer.gloveCare': 'Glove Care',
    'footer.shipping': 'Shipping',
    'footer.returns': 'Returns',
    'footer.warranty': 'Warranty',
    'footer.faq': 'FAQ',
    'footer.canteraProgram': 'Cantera Program',
    'footer.sponsorship': 'Sponsorship',
    'footer.showcases': 'Showcases',
    'footer.blog': 'Blog',
    'footer.rewards': 'MC Rewards',
    'footer.trustPayment': 'Secure Payment',
    'footer.trustShipping': 'USA Shipping',
    'footer.trustReturns': '30-Day Returns',
    'footer.trustWarranty': 'Pro Warranty',
    'footer.copyright': '© 2026 Manny Canó. All rights reserved.',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
  },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es');

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
