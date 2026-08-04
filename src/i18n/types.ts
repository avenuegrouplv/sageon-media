export type Language = "LV" | "EN" | "RU";

export type PageKey = "home" | "portfolio" | "services" | "faq" | "blog" | "contact";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  brand: string;
  displayLink: string;
  description: string;
  image: string;
  link: string;
  isPlaceholder: boolean;
  tags?: string[];
}

export interface PricingPlan {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  badge: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Translations {
  nav: {
    home: string;
    portfolio: string;
    services: string;
    faq: string;
    blog: string;
    contact: string;
    ctaContact: string;
  };
  seo: {
    home: { title: string; description: string };
    portfolio: { title: string; description: string };
    services: { title: string; description: string };
    faq: { title: string; description: string };
    blog: { title: string; description: string };
    contact: { title: string; description: string };
  };
  home: {
    hero: {
      title1: string;
      title2: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      badge: string;
    };
    targetAudience: string;
    portfolioTitle: string;
    portfolioSubtitle: string;
    portfolioViewAll: string;
    whyChooseUsTitle: string;
    whyChooseUsSubtitle: string;
    pillars: { title: string; desc: string }[];
    processTitle: string;
    processSubtitle: string;
    processSteps: { step: string; title: string; desc: string }[];
    pricingTitle: string;
    pricingSubtitle: string;
    guaranteeTitle: string;
    guaranteeText: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    faqPreviewTitle: string;
    faqPreviewSubtitle: string;
    faqPreviewMore: string;
  };
  portfolioPage: {
    title: string;
    subtitle: string;
    allCategories: string;
    visitWebsite: string;
  };
  servicesPage: {
    title: string;
    subtitle: string;
    customSolutionTitle: string;
    customSolutionText: string;
    customSolutionCta: string;
  };
  faqPage: {
    title: string;
    subtitle: string;
    notFoundText: string;
    askQuestionBtn: string;
  };
  blogPage: {
    title: string;
    subtitle: string;
    readMore: string;
    backToArticles: string;
    shareArticle: string;
    readTimeLabel: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    locationLabel: string;
    hoursValue: string;
    locationValue: string;
  };
  contactForm: {
    defaultTitle: string;
    defaultSubtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    messageLabel: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMessage: string;
    serviceOptions: {
      landing: string;
      multi: string;
      ecommerce: string;
      maintenance: string;
      other: string;
    };
  };
  footer: {
    description: string;
    navTitle: string;
    servicesTitle: string;
    contactsTitle: string;
    rights: string;
    privacy: string;
    cookies: string;
  };
  cookies: {
    bannerText: string;
    privacyLinkText: string;
    acceptBtn: string;
    declineBtn: string;
    detailsBtn: string;
  };
  portfolioItems: PortfolioItem[];
  pricingPlans: PricingPlan[];
  faqItems: FaqItem[];
  blogPosts: BlogPost[];
}
