import { useState, useRef, useEffect, ReactNode, TouchEvent, TransitionEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Sparkles, 
  Laptop, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Zap,
  Globe,
  ShieldCheck,
  Check,
  Calendar,
  Clock,
  Search,
  Settings,
  Target,
  Lock,
  AlertCircle,
  HelpCircle,
  XCircle,
  Plus,
  ShieldAlert,
  TrendingDown
} from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import ContactForm from "../components/ContactForm";
import CtaButton from "../components/CtaButton";
import PortfolioLaptopCard from "../components/PortfolioLaptopCard";
import StylizedCrossIcon from "../components/StylizedCrossIcon";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../i18n/LanguageContext";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Vairāk ceļo un vairāk nopelni",
    brand: "Travel with Martins",
    displayLink: "https://travelwithmartins.com",
    description: "Travel with Martins ir personīgā ceļojumu emuāra un konsultāciju platforma. Tā palīdz lietotājiem plānot un organizēt neizmirstamus braucienus, sniedzot praktiskus padomus un iedvesmojošus ceļvežus. Vietne veidota ar uzsvaru uz vizuāli bagātu saturu un ērtu pieteikumu noformēšanu.",
    image: "/Travel-with-Martins-portfolio.webp",
    link: "https://travelwithmartins.com",
    isPlaceholder: false
  },
  {
    id: 2,
    title: "Komercīpašumu un privātīpašumu apsaimniekošana I Juridiskā pārvaldība",
    brand: "Avenue Group",
    displayLink: "https://avenuegroup.lv",
    description: "Avenue Group ir nekustamo īpašumu pārvaldības un juridisko pakalpojumu platforma. Mājaslapa nodrošina pārskatāmu pakalpojumu katalogu, atsauksmes un elastīgas saziņas iespējas jaunām sadarbībām. Tās dizains izceļ uzņēmuma uzticamību un profesionālo pieredzi.",
    image: "/Avenuegroup-portfolio.webp",
    link: "https://avenuegroup.lv",
    isPlaceholder: false
  },
  {
    id: 3,
    title: "Premium dizaina mēbeles I Ekskluzīvas koka kāpnes",
    brand: "Avangart",
    displayLink: "https://avangart.lv",
    description: "Avangart ir ekskluzīvs mēbeļu un koka kāpņu ražošanas uzņēmuma digitālais katalogs. Mājaslapa kalpo kā vizuālā galerija ar detalizētiem fotouzņēmumiem un produktu aprakstiem. Tās dizains atspoguļo augstākās kvalitātes meistardarbu, eleganci un individuālu pieeju.",
    image: "/Avangart-portfolio.webp",
    link: "https://avangart.lv",
    isPlaceholder: false
  },
  {
    id: 4,
    title: "Enzimi I Fermentatīvie produkti un ekoloģiskie risinājumi",
    brand: "enzimi.lv",
    displayLink: "https://enzimi.lv",
    description: "Enzimi ir fermentatīvo produktu un ekoloģisko risinājumu platforma. Mājaslapa nodrošina pārskatāmu produktu katalogu, tehniskos aprakstus un ērtu saziņu ar speciālistiem.",
    image: "",
    link: "https://enzimi.lv",
    isPlaceholder: false
  },
  {
    id: 5,
    title: "Latvijas Restarts I Sabiedriskā un biznesa platforma",
    brand: "Latvijas Restarts",
    displayLink: "https://latvijasrestarts.lv",
    description: "Latvijas Restarts ir sabiedrisko un biznesa iniciatīvu platforma, kas nodrošina informācijas apmaiņu, rakstus un pieteikumu iesniegšanu ilgtspējīgai izaugsmei.",
    image: "",
    link: "https://latvijasrestarts.lv",
    isPlaceholder: false
  },
  {
    id: 6,
    title: "Demontāža 24 I Būvju un ēku demontāžas pakalpojumi",
    brand: "Demontāža 24",
    displayLink: "https://demontaza24.eu",
    description: "Demontāža 24 ir specializēts būvju, ēku un metāla konstrukciju demontāžas pakalpojumu dienests. Mājaslapa nodrošina ātru pakalpojumu pieteikšanu un servisa aprakstus.",
    image: "",
    link: "https://demontaza24.eu",
    isPlaceholder: false
  }
];

function LazyLoadSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { lang, t, getLocalizedPath } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = t.seo.home.title;
  }, [t.seo.home.title]);

  // Take first 4 FAQ items for the Home page
  const homeFaqs = (t.faqItems || []).slice(0, 4);
  const blogPostsList = t.blogPosts || [];
  const portfolioItemsList = t.portfolioItems || PORTFOLIO_ITEMS;

  // Infinite Carousel State
  const [activeIndex, setActiveIndex] = useState(blogPostsList.length || 3);
  const [disableTransition, setDisableTransition] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isBlogAnimatingRef = useRef(false);

  // Reset transition state after seamless jump
  useEffect(() => {
    if (disableTransition) {
      const timer = setTimeout(() => {
        setDisableTransition(false);
        isBlogAnimatingRef.current = false;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [disableTransition]);

  const handleTransitionEnd = (e: TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    const total = blogPostsList.length;
    if (activeIndex >= 2 * total) {
      setDisableTransition(true);
      setActiveIndex((prev) => prev - total);
    } else if (activeIndex < total) {
      setDisableTransition(true);
      setActiveIndex((prev) => prev + total);
    } else {
      isBlogAnimatingRef.current = false;
    }
  };

  const scrollBlog = (direction: 'left' | 'right') => {
    if (disableTransition || isBlogAnimatingRef.current) return;
    isBlogAnimatingRef.current = true;
    
    if (direction === 'right') {
      setActiveIndex((prev) => prev + 1);
    } else {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      scrollBlog('right');
    } else if (distance < -minSwipeDistance) {
      scrollBlog('left');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Infinite Portfolio Carousel State
  const [portfolioIndex, setPortfolioIndex] = useState(6);
  const [disablePortfolioTransition, setDisablePortfolioTransition] = useState(false);

  useEffect(() => {
    if (disablePortfolioTransition) {
      const timer = setTimeout(() => {
        setDisablePortfolioTransition(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [disablePortfolioTransition]);

  const handlePortfolioTransitionEnd = (e: TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (portfolioIndex >= 12) {
      setDisablePortfolioTransition(true);
      setPortfolioIndex(6);
    } else if (portfolioIndex <= 5) {
      setDisablePortfolioTransition(true);
      setPortfolioIndex(11);
    }
  };

  const scrollPortfolio = (direction: 'left' | 'right') => {
    if (disablePortfolioTransition) return;
    if (direction === 'right') {
      setPortfolioIndex((prev) => prev + 1);
    } else {
      setPortfolioIndex((prev) => prev - 1);
    }
  };

  // Infinite Pricing Carousel State
  const [pricingIndex, setPricingIndex] = useState(0);
  const [disablePricingTransition, setDisablePricingTransition] = useState(false);

  useEffect(() => {
    if (disablePricingTransition) {
      const timer = setTimeout(() => {
        setDisablePricingTransition(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [disablePricingTransition]);

  const handlePricingTransitionEnd = (e: TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (pricingIndex >= 8) {
      setDisablePricingTransition(true);
      setPricingIndex(4);
    } else if (pricingIndex < 0) {
      setDisablePricingTransition(true);
      setPricingIndex(4);
    }
  };

  const scrollPricing = (direction: 'left' | 'right') => {
    if (disablePricingTransition) return;
    if (direction === 'right') {
      setPricingIndex((prev) => prev + 1);
    } else {
      setPricingIndex((prev) => prev - 1);
    }
  };

  const planIcons = [
    <Zap className="h-5 w-5 text-amber-500" />,
    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    <Sparkles className="h-5 w-5 text-purple-500" />,
    <ShieldCheck className="h-5 w-5 text-blue-500" />,
    <Globe className="h-5 w-5 text-emerald-500" />,
    <Settings className="h-5 w-5 text-[#BAFC50]" />,
    <Search className="h-5 w-5 text-amber-400" />
  ];

  const pricingPlans = (t.pricingPlans || []).map((plan, idx) => ({
    ...plan,
    icon: planIcons[idx % planIcons.length]
  }));

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-[#BAFC50] selection:text-black overflow-hidden">
      <SEOHead
        title={t.seo.home.title}
        description={t.seo.home.description}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://sageonmedia.eu#organization",
            "name": "Sageon Media",
            "url": "https://sageonmedia.eu",
            "logo": "https://sageonmedia.eu/Logo-new.webp",
            "email": "sageon.media@gmail.com",
            "telephone": "+371 26739899",
            "priceRange": "$$",
            "knowsLanguage": ["lv", "en", "ru"],
            "areaServed": [
              { "@type": "Country", "name": "Latvia" },
              { "@type": "Place", "name": "Worldwide" }
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+371 26739899",
              "email": "sageon.media@gmail.com",
              "contactType": "customer service",
              "availableLanguage": ["lv", "en", "ru"]
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://sageonmedia.eu#website",
            "url": "https://sageonmedia.eu",
            "name": "Sageon Media",
            "description": "Profesionāla mājaslapu izstrāde un digitālie risinājumi jūsu biznesam."
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://sageonmedia.eu#webpage",
            "url": "https://sageonmedia.eu",
            "name": "Sageon Media | Mājaslapu izstrāde un digitālie risinājumi",
            "description": "Sageon Media piedāvā profesionālu mājaslapu izstrādi, adaptīvu dizainu, e-veikalus un SEO optimizāciju jūsu biznesa izaugsmei.",
            "isPartOf": { "@id": "https://sageonmedia.eu#website" }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": homeFaqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]}
      />
      {/* Seamless Continuous Full-Page Grid Pattern & Fluid Green Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

      {/* Irregular Glowing Green Orbs Flowing Seamlessly From Top to Bottom */}
      <div className="absolute top-[2%] -left-[10%] w-[750px] h-[750px] bg-gradient-to-br from-[#BAFC50]/22 via-[#38b000]/16 to-transparent rounded-full blur-[170px] pointer-events-none z-0" />
      <div className="absolute top-[14%] -right-[5%] w-[850px] h-[800px] bg-gradient-to-bl from-[#38b000]/26 via-[#BAFC50]/18 to-transparent rounded-full blur-[190px] pointer-events-none z-0" />
      <div className="absolute top-[28%] left-[5%] w-[800px] h-[750px] bg-gradient-to-tr from-[#BAFC50]/24 via-[#38b000]/18 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-[42%] -right-[10%] w-[900px] h-[850px] bg-gradient-to-tl from-[#38b000]/28 via-[#BAFC50]/20 to-transparent rounded-full blur-[200px] pointer-events-none z-0" />
      <div className="absolute top-[56%] -left-[8%] w-[850px] h-[800px] bg-gradient-to-br from-[#BAFC50]/22 via-[#38b000]/18 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-[70%] right-[2%] w-[800px] h-[750px] bg-gradient-to-bl from-[#38b000]/25 via-[#BAFC50]/22 to-transparent rounded-full blur-[185px] pointer-events-none z-0" />
      <div className="absolute top-[84%] -left-[5%] w-[850px] h-[850px] bg-gradient-to-tr from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[190px] pointer-events-none z-0" />

      {/* 1. HERO SLIDER (Loads instantly) */}
      <HeroSlider />

      {/* CALLOUT BANNER 1: Pirms "Ko mēs piedāvājam" */}
      <LazyLoadSection>
        <div className="px-4 sm:px-6 md:px-10 lg:px-12 w-full max-w-[1380px] mx-auto pt-8 sm:pt-12 pb-4 relative z-10">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-[#BAFC50]/40 p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#BAFC50]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center mx-auto">
              <div className="space-y-3 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
                <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase mb-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Ko mēs piedāvājam</span>
                </div>
                <p className="text-base sm:text-lg md:text-xl font-medium text-white leading-relaxed">
                  Vai Jums ir nepieciešams mūsdienīga mājaslapa biznesam, bet nevēlaties pārmaksāt un gaidīt nedēļām ilgi? <span className="text-[#BAFC50] font-bold">Mums ir Jums ko piedāvāt.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </LazyLoadSection>

      {/* 2. INTRO BLOCK: Ko mēs piedāvājam */}
      <LazyLoadSection>
        <section 
          className="pt-2 sm:pt-8 md:pt-24 pb-16 md:pb-24 bg-transparent overflow-visible relative z-10"
        >
          {/* Ambient Irregular Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-48 right-1/4 w-[750px] h-[650px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
          <div className="absolute -bottom-52 -left-20 w-[700px] h-[650px] bg-gradient-to-tr from-[#38b000]/28 via-[#BAFC50]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

          <div className="px-4 sm:px-6 md:px-10 lg:px-12 w-full max-w-[1380px] mx-auto space-y-12 relative z-10">
            
            {/* SECTION 1: Intro Text & 5 Problem Cards */}
            <div className="space-y-12">
              {/* Zig-Zag 3-Row Feature Block */}
              <div className="space-y-12 md:space-y-16 max-w-[1380px] mx-auto">
                {/* Row 1: Text Left, Image Right */}
                <div 
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-2 md:py-4"
                >
                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      Mājaslapas izstrāde
                    </h3>
                    <p className="text-base md:text-xl text-zinc-200 font-light leading-relaxed">
                      Mēs izstrādājam ātras un mūsdienīgas mājaslapas, kas precīzi izceļ Jūsu zīmolu un palīdz ātrāk sasniegt nospraustos biznesa mērķus. Katrs projekts tiek veidots, ņemot vērā Jūsu uzņēmuma vajadzības un nākotnes attīstības perspektīvas. Rezultātā Jūs iegūstiet profesionālu digitālo vizītkarti, kas kalpo ilgtermiņā un aug kopā ar Jūsu biznesu.
                    </p>
                  </div>
                  <div className="lg:col-span-5 relative group flex items-center justify-center">
                    <div className="absolute w-[100%] h-[100%] bg-[#BAFC50]/40 rounded-full blur-[80px] pointer-events-none z-0" />
                    <img 
                      src="/Iedod-savam-biznesam-jaunu-uzravienu.webp" 
                      alt="Iedod savam biznesam jaunu uzrāvienu" 
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={380}
                      className="relative z-10 w-[88%] h-auto max-h-[335px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>

                {/* Row 2: Image Left, Text Right */}
                <div 
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-2 md:py-4"
                >
                  <div className="lg:col-span-5 order-last lg:order-first relative group flex items-center justify-center">
                    <div className="absolute w-[100%] h-[100%] bg-[#BAFC50]/40 rounded-full blur-[80px] pointer-events-none z-0" />
                    <img 
                      src="/individuals-dizains-musdienu-tehnologijas.webp" 
                      alt="Individuāls dizains un mūsdienu tehnoloģijas" 
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={380}
                      className="relative z-10 w-[88%] h-auto max-h-[335px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      Dizains & Mobile first
                    </h3>
                    <p className="text-base md:text-xl text-zinc-200 font-light leading-relaxed">
                      Katram projektam mēs veidojam individuālu dizainu, kas atspoguļo Jūsu uzņēmuma identitāti un rada profesionālu pirmo iespaidu. Ikviens vizuālais elements vai sadaļa tiek pielāgots datoriem, planšetēm un viedtālruņiem. Tas Jūsu mājaslapas apmeklētājiem nodrošina vienotu, vizuāli pievilcīgu un patīkamu lietošanas pieredzi neatkarīgi no izmantotās ierīces.
                    </p>
                  </div>
                </div>

                {/* Row 3: Text Left, Image Right */}
                <div 
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-2 md:py-4"
                >
                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      Struktūra & rezultāts
                    </h3>
                    <p className="text-base md:text-xl text-zinc-200 font-light leading-relaxed">
                      Mājaslapu struktūru mēs plānojam tā, lai tās apmeklētāji ātri atrastu visu nepieciešamo informāciju un dabiski nonāktu līdz vēlamajai darbībai. Skaidra navigācija, pārdomāts satura izvietojums un efektīvi uzaicinājumi rīkoties palīdz veidot uzticību Jūsu klientu vidū un palielināt pieprasījumu, pieteikumu vai pārdošanas rezultātus.
                    </p>
                  </div>
                  <div className="lg:col-span-5 relative group flex items-center justify-center">
                    <div className="absolute w-[100%] h-[100%] bg-[#BAFC50]/45 rounded-full blur-[80px] pointer-events-none z-0" />
                    <img 
                      src="/Web-izstrades-agentura.webp" 
                      alt="Web izstrādes aģentūra — struktūra un rezultāts" 
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={400}
                      className="relative z-10 w-[88%] h-auto max-h-[350px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>

                {/* Closing quote / CTA block */}
                <div 
                  className="pt-6 text-center max-w-4xl mx-auto"
                >
                  <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900/90 via-[#18181b] to-zinc-900/90 border border-[#BAFC50]/35 hover:border-[#BAFC50]/70 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)] shadow-[#BAFC50]/5 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BAFC50] to-transparent opacity-70" />
                    
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase mb-3">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Bezmaksas Konsultācija</span>
                    </div>

                    <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight leading-snug">
                      Jūsu ideja — mūsu pieredze un apņemšanās to realizēt vislabākajā veidā.
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-light mt-2.5 max-w-2xl mx-auto leading-relaxed">
                      Sazinieties ar mums, lai bez maksas pārrunātu Jūsu ideju un noskaidrotu, kādu risinājumu varam izveidot tieši Jūsu biznesam.
                    </p>
                    
                    <div className="mt-5">
                      <Link
                        to={getLocalizedPath("contact")}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BAFC50] hover:bg-[#a8f235] text-black font-extrabold text-xs uppercase tracking-wider transition-colors duration-300 shadow-md shadow-[#BAFC50]/20"
                      >
                        <span>Pieteikties konsultācijai</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* 2B. KAS STĀV CEĻĀ JŪSU IZAUGSMEI */}
      <LazyLoadSection>
        <section 
          className="py-16 md:py-24 bg-transparent overflow-visible relative z-10"
        >
          <div className="px-4 sm:px-6 md:px-10 lg:px-12 w-full max-w-[1380px] mx-auto space-y-10 relative z-10">
            {/* Sub-block: Kas kavē Jūsu izaugsmi */}
            <div 
              className="text-center space-y-4 max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Kas stāv ceļā Jūsu izaugsmei</span>
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight">
                Kas kavē Jūsu izaugsmi digitālajā vidē?
              </h2>
              <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                Jūsu uzņēmuma mājaslapa ir izveidota, taču tā nepiesaista jaunus klientus un neveicina pieprasījuma pieaugumu? Mūsdienās ar vienkāršu interneta vizītkarti vairs nepietiek — mājaslapai ir jākļūst par efektīvu uzņēmuma izaugsmes digitālās vides instrumentu. Ja atpazīstat kādu no zemāk minētajām situācijām, iespējams, ir pienācis laiks pārmaiņām.
              </p>
            </div>

            {/* Creative 5-Card Balanced Grid Layout */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 max-w-[1380px] mx-auto pt-2"
            >
              {/* Point 1 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      01 / Iemesls
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Mājaslapa nerada uzticību
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    Novecojis dizains, neskaidra informācija vai sarežģīta lietošana var radīt negatīvu pirmo iespaidu un atturēt potenciālos klientus no saziņas.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      02 / Iemesls
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <TrendingDown className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Apmeklētāji nekļūst par klientiem
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    Ja mājaslapā nav skaidras struktūras un pārliecinoša aicinājuma rīkoties, apmeklētāji aiziet, neveicot pirkumu vai nesazinoties ar uzņēmumu.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      03 / Iemesls
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <Search className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Uzņēmumu grūti atrast Google
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    Bez kvalitatīvas SEO optimizācijas potenciālie klienti pirmos atrod Jūsu konkurentus, nevis Jūsu uzņēmumu.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      04 / Iemesls
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Mājaslapa ielādējas lēni
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    Lēna mājaslapas ielāde pasliktina lietotāju pieredzi, samazina reklāmu efektivitāti un negatīvi ietekmē pozīcijas Google meklētājā.
                  </p>
                </div>
              </div>

              {/* Point 5 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl sm:col-span-2 lg:col-span-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      05 / Iemesls
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Piedāvājums nav pietiekami pārliecinošs
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    Ja mājaslapā nav skaidri parādītas uzņēmuma priekšrocības un ieguvumi klientam, tad klientam ir grūtāk pieņemt lēmumu par sadarbību.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* 2C. KĀPĒC IZVĒLĒTIES MŪS */}
      <LazyLoadSection>
        <section 
          className="py-16 md:py-24 bg-transparent overflow-visible relative z-10"
        >
          <div className="px-4 sm:px-6 md:px-10 lg:px-12 w-full max-w-[1380px] mx-auto space-y-10 relative z-10">
            {/* SECTION 2: Kāpēc izvēlēties mūs & Kāpēc uzņēmumi izvēlas mūsu pakalpojumus? */}
            <div className="space-y-10">
              <div className="text-center space-y-3 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Kāpēc izvēlēties mūs</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Kāpēc uzņēmumi izvēlas mūsu pakalpojumus?
                </h2>
                <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed pt-1">
                  Mūsu mērķis nav vienkārši izveidot mājaslapu. Mēs radām digitālu risinājumu, kas stiprina uzņēmuma tēlu, palīdz piesaistīt jaunus klientus un aug kopā ar biznesu.
                </p>
              </div>

              {/* 4 Solution Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-left max-w-[1380px] mx-auto">
                {/* Card 1 */}
                <div className="group flex items-start gap-5 p-7 bg-[#18181b] border border-zinc-800 hover:border-[#BAFC50]/50 rounded-2xl shadow-md transition-all duration-300">
                  <div className="p-3.5 bg-zinc-800 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                    <Target className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg md:text-xl uppercase tracking-wide group-hover:text-[#BAFC50] transition-colors">
                      Skaidra biznesa stratēģija
                    </h3>
                    <p className="text-base text-zinc-200 font-normal mt-2.5 leading-relaxed">
                      Katrs projekts tiek veidots ar konkrētu mērķi — palīdzēt uzņēmumam iegūt vairāk pieprasījumu un veicināt biznesa izaugsmi.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group flex items-start gap-5 p-7 bg-[#18181b] border border-zinc-800 hover:border-[#BAFC50]/50 rounded-2xl shadow-md transition-all duration-300">
                  <div className="p-3.5 bg-zinc-800 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                    <Settings className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg md:text-xl uppercase tracking-wide group-hover:text-[#BAFC50] transition-colors">
                      Individuāla pieeja
                    </h3>
                    <p className="text-base text-zinc-200 font-normal mt-2.5 leading-relaxed">
                      Katrs uzņēmums ir atšķirīgs, tāpēc risinājumus mēs pielāgojam tieši Jūsu biznesa nozarei, auditorijai un mērķiem.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group flex items-start gap-5 p-7 bg-[#18181b] border border-zinc-800 hover:border-[#BAFC50]/50 rounded-2xl shadow-md transition-all duration-300">
                  <div className="p-3.5 bg-zinc-800 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                    <Zap className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg md:text-xl uppercase tracking-wide group-hover:text-[#BAFC50] transition-colors">
                      Mūsdienīgi risinājumi
                    </h3>
                    <p className="text-base text-zinc-200 font-normal mt-2.5 leading-relaxed">
                      Mēs izmantojam jaunākās tehnoloģijas, lai mājaslapa būtu ātra, responsīva, intuitīva un viegli pārskatāma.
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="group flex items-start gap-5 p-7 bg-[#18181b] border border-zinc-800 hover:border-[#BAFC50]/50 rounded-2xl shadow-md transition-all duration-300">
                  <div className="p-3.5 bg-zinc-800 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                    <TrendingUp className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg md:text-xl uppercase tracking-wide group-hover:text-[#BAFC50] transition-colors">
                      Ilgtermiņa sadarbība
                    </h3>
                    <p className="text-base text-zinc-200 font-normal mt-2.5 leading-relaxed">
                      Mēs ne tikai izstrādājam mājaslapu, bet arī palīdzam tai attīstīties un pielāgoties uzņēmuma izaugsmei.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* CALLOUT BANNER 2: Virs "Sadarbības posmi" */}
      <LazyLoadSection>
        <div className="px-4 sm:px-6 md:px-10 lg:px-12 w-full max-w-[1380px] mx-auto pt-8 sm:pt-12 pb-4 relative z-10">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-[#BAFC50]/40 p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#BAFC50]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
              <div>
                <p className="text-base sm:text-lg md:text-xl font-medium text-zinc-100 leading-relaxed">
                  Neatkarīgi no tā, vai darbojaties tirdzniecības, ražošanas, būvniecības, pārtikas nozarē vai sniedzat jebkāda veida pakalpojumus, mēs piedāvājam izstrādāt tādu mājaslapu, kas strādās Jūsu biznesa labā, tajā skaitā - ietaupīs Jūsu laiku, uzlabos klientu apkalpošanu un uzticību, kā arī veicinās uzņēmuma izaugsmi un konkurētspēju.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  to="/kontakti"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#BAFC50] hover:bg-[#a6ed38] text-black font-sans font-bold text-sm sm:text-base tracking-wide rounded-full shadow-lg shadow-[#BAFC50]/20 hover:shadow-[#BAFC50]/40 transition-colors duration-300"
                >
                  <span>Pieteikties konsultācijai</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </LazyLoadSection>

      {/* KĀ NOTIEK SADARBĪBA SECTION */}
      <LazyLoadSection>
        <section 
          className="py-16 md:py-24 bg-transparent px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 relative overflow-hidden z-10"
        >
          {/* Ambient Glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#BAFC50]/12 via-[#38b000]/12 to-transparent rounded-full blur-[160px] pointer-events-none z-0" />

          <div className="w-full max-w-[1380px] mx-auto space-y-16 relative z-10">
            
            {/* Header */}
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Sadarbības posmi</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Kā notiek sadarbība
              </h2>
              <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
                Pārskatāms, strukturēts un lietotājam ērts izstrādes process no pirmās idejas līdz gatavam rezultātam un ilgtermiņa atbalstam.
              </p>
            </div>

            {/* 4 Process Steps (Borderless with sleek visual details) */}
            <div className="relative">
              {/* Desktop Horizontal Connecting Accent Line */}
              <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#BAFC50]/5 via-[#BAFC50]/30 to-[#BAFC50]/5 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative z-10">
                
                {/* Step 1 */}
                <div className="group relative flex flex-col items-start space-y-4 p-2 transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#18181b]/80 border border-zinc-800 text-[#BAFC50] font-mono font-extrabold text-2xl shadow-lg group-hover:border-[#BAFC50]/60 group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                      <div className="absolute inset-0 bg-[#BAFC50]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <span className="relative z-10">01</span>
                    </div>
                    <span className="hidden lg:block text-xs font-mono text-zinc-500 group-hover:text-[#BAFC50] transition-colors uppercase tracking-widest font-semibold">Posms 1</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#BAFC50] transition-colors tracking-tight">
                      1. Pirmā saruna
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                      Viss sākas ar sarunu par Jūsu topošās mājaslapas mērķiem, biznesa darbības virzienu un Jūsu vēlmēm. Ja Jums jau ir savas idejas par mājaslapas struktūru, sadaļām vai piedāvātajiem pakalpojumiem - lieliski, tās tad arī kopīgi pārrunāsim, lai labāk izprastu Jūsu vajadzības un izvēlētos piemērotāko risinājumu.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group relative flex flex-col items-start space-y-4 p-2 transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#18181b]/80 border border-zinc-800 text-[#BAFC50] font-mono font-extrabold text-2xl shadow-lg group-hover:border-[#BAFC50]/60 group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                      <div className="absolute inset-0 bg-[#BAFC50]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <span className="relative z-10">02</span>
                    </div>
                    <span className="hidden lg:block text-xs font-mono text-zinc-500 group-hover:text-[#BAFC50] transition-colors uppercase tracking-widest font-semibold">Posms 2</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#BAFC50] transition-colors tracking-tight">
                      2. Projekta izstrādes process
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                      Kad iecerētās mājaslapas koncepts ir saskaņots, mēs uzsākam tās izstrādi. Šajā posmā tiek veikta attiecīgās nozares tirgus izpēte, konkurentu analīze, mājaslapas struktūras un funkcionalitātes izstrāde, kā arī satura sagatavošana, lai radītu mūsdienīgu, pārdomātu un modernu Jūsu biznesa digitālo vizītkarti.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group relative flex flex-col items-start space-y-4 p-2 transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#18181b]/80 border border-zinc-800 text-[#BAFC50] font-mono font-extrabold text-2xl shadow-lg group-hover:border-[#BAFC50]/60 group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                      <div className="absolute inset-0 bg-[#BAFC50]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <span className="relative z-10">03</span>
                    </div>
                    <span className="hidden lg:block text-xs font-mono text-zinc-500 group-hover:text-[#BAFC50] transition-colors uppercase tracking-widest font-semibold">Posms 3</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#BAFC50] transition-colors tracking-tight">
                      3. Projekta saskaņošana un nodošana
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                      Šajā posmā Jūs saņemsiet pabeigtu mājaslapas projektu, kuru varēsiet pārskatīt un iesniegt savus komentārus vai ierosinājumus par nepieciešamajiem uzlabojumiem. Pēc visu saskaņoto izmaiņu veikšanas mājaslapa tiek publicēta uz Jūsu domēna un nodota Jūsu rīcībā.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="group relative flex flex-col items-start space-y-4 p-2 transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#18181b]/80 border border-zinc-800 text-[#BAFC50] font-mono font-extrabold text-2xl shadow-lg group-hover:border-[#BAFC50]/60 group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                      <div className="absolute inset-0 bg-[#BAFC50]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <span className="relative z-10">04</span>
                    </div>
                    <span className="hidden lg:block text-xs font-mono text-zinc-500 group-hover:text-[#BAFC50] transition-colors uppercase tracking-widest font-semibold">Posms 4</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#BAFC50] transition-colors tracking-tight">
                      4. Tehniskais atbalsts un uzturēšana
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                      Pēc mājaslapas nodošanas nepieciešamības gadījumā mēs varam turpināt nodrošināt mājaslapas tehnisko atbalstu un uzturēšanu, kā arī veikt nepieciešamos satura atjauninājumus, funkcionalitātes izmaiņas un citus papildinājumus, atbilstoši Jūsu uzņēmuma vajadzībām.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      </LazyLoadSection>

      {/* 3. PAKALPOJUMI */}
      <LazyLoadSection>
        <section 
          className="pt-8 pb-16 md:pt-10 md:pb-20 bg-transparent px-6 md:px-12 relative overflow-visible z-10"
        >
          {/* Ambient Irregular Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-48 -left-36 w-[750px] h-[750px] bg-gradient-to-r from-[#BAFC50]/28 via-[#38b000]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
          <div className="absolute -bottom-52 -right-28 w-[700px] h-[700px] bg-gradient-to-tl from-[#38b000]/30 via-[#BAFC50]/24 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

          <div className="w-full max-w-[1380px] mx-auto space-y-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4">
              <div className="space-y-2 text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Piedāvātie pakalpojumi
                </h2>
              </div>
            </div>

            {/* 4 core pricing models comparison carousel track */}
            <div className="overflow-hidden w-full relative">
              <div 
                onTransitionEnd={handlePricingTransitionEnd}
                className={`flex pricing-carousel-track ${disablePricingTransition ? "" : "transition-transform duration-500 ease-out"}`}
                style={{ 
                  transform: `translateX(calc(-${pricingIndex} * (100% / var(--visible-count))))`,
                }}
              >
                {[...pricingPlans, ...pricingPlans, ...pricingPlans].map((plan, index) => {
                  const isBestChoice = plan.badge === "Labākā izvēle biznesam";
                  return (
                    <div 
                      key={`${plan.title}-${index}`} 
                      className="w-full sm:w-1/2 lg:w-1/4 p-3 flex-shrink-0 flex flex-col justify-between"
                    >
                      <Link
                        to="/pakalpojumi"
                        className={`bg-[#18181b] border-2 transition-all duration-300 flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl group relative overflow-hidden cursor-pointer h-full ${
                          isBestChoice 
                            ? "border-[#BAFC50]/70 ring-1 ring-[#BAFC50]/30 shadow-[#BAFC50]/10 hover:border-[#BAFC50]" 
                            : "border-zinc-800 hover:border-[#BAFC50]"
                        }`}
                      >
                        <div>
                          {/* Header Section */}
                          <div className="p-6 border-b border-zinc-800/80 text-left space-y-4 relative">
                            <div className="flex items-center justify-between min-h-[28px]">
                              <span className={`px-2.5 py-1 font-sans text-xs uppercase tracking-wider font-bold rounded-lg ${
                                isBestChoice 
                                  ? "bg-[#BAFC50] text-black font-extrabold shadow-sm" 
                                  : "bg-zinc-800 text-zinc-200 border border-zinc-700/60"
                              }`}>
                                {isBestChoice ? "★ " : ""}{plan.badge}
                              </span>
                            </div>
                            
                            <div className="space-y-1.5 h-[88px] min-h-[88px] flex flex-col justify-start items-start pt-1">
                              {plan.title === "Multi-page" ? (
                                <h3 className="text-2xl font-extrabold tracking-tight uppercase leading-tight px-3 py-1 rounded-lg bg-[#BAFC50]/20 border border-[#BAFC50] text-[#BAFC50] group-hover:bg-[#BAFC50] group-hover:text-black transition-all shadow-sm inline-block">
                                  {plan.title}
                                </h3>
                              ) : (
                                <h3 className="text-2xl font-bold tracking-tight uppercase text-white leading-tight group-hover:text-[#BAFC50] transition-colors">{plan.title}</h3>
                              )}
                              <p className="text-sm font-normal text-zinc-300">
                                {plan.subtitle}
                              </p>
                            </div>

                            {/* Highly visible high-contrast pricing tag container */}
                            <div className="pt-3 pb-2 mt-2 border-l-4 border-[#BAFC50] pl-3.5 flex items-center gap-1.5 h-[56px] min-h-[56px]">
                              {plan.price ? (
                                <>
                                  <span className="text-lg font-black text-[#BAFC50]">€</span>
                                  <span className="text-5xl font-black tracking-tight text-white">{plan.price}</span>
                                  <span className="text-xs uppercase tracking-wider font-semibold font-sans ml-2 text-zinc-300">
                                    / {plan.period}
                                  </span>
                                </>
                              ) : (
                                <span className="text-base md:text-lg font-extrabold uppercase tracking-wider font-sans text-[#BAFC50] self-center">
                                  {plan.period}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Features List */}
                          <ul className="p-6 space-y-3.5 text-left text-sm text-zinc-200 font-normal">
                            {plan.features.map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-start gap-2.5">
                                <div className="p-0.5 bg-[#BAFC50]/20 text-[#BAFC50] mt-0.5 shrink-0 rounded-sm">
                                  <Check className="h-4 w-4 stroke-[2.5]" />
                                </div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA Action Button */}
                        <div className="p-6 pt-0">
                          <span
                            className={`w-full py-3.5 px-4 font-bold tracking-wider text-sm uppercase transition-all duration-300 rounded-full text-center block shadow-sm hover:shadow-md btn-shimmer ${
                              plan.highlight
                                ? "bg-[#BAFC50] group-hover:bg-[#a8f235] text-black shadow-lg shadow-[#BAFC50]/20 font-extrabold"
                                : "bg-zinc-800 group-hover:bg-[#BAFC50] text-white group-hover:text-black"
                            }`}
                          >
                            {plan.cta}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls (< > and Uzzināt vairāk button) below Pricing cards on the right */}
            <div className="flex justify-end items-center gap-3 mt-6 pr-3 sm:pr-6 md:pr-10 lg:pr-14">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scrollPricing('left')}
                  className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#BAFC50] transition-colors rounded-full cursor-pointer flex items-center justify-center shadow-sm"
                  aria-label="Iepriekšējā cena"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => scrollPricing('right')}
                  className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#BAFC50] transition-colors rounded-full cursor-pointer flex items-center justify-center shadow-sm"
                  aria-label="Nākamā cena"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <CtaButton
                text="Uzzināt vairāk"
                to={getLocalizedPath('services')}
              />
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* 4. MŪSU DARBI: Preview Block */}
      <LazyLoadSection>
        <section 
          className="pt-8 pb-8 md:pt-10 md:pb-10 bg-transparent px-6 md:px-12 relative overflow-visible z-10"
        >
          {/* Ambient Irregular Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-48 -left-24 w-[750px] h-[750px] bg-gradient-to-br from-[#BAFC50]/28 via-[#38b000]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
          <div className="absolute -bottom-52 -right-24 w-[800px] h-[700px] bg-gradient-to-tl from-[#38b000]/32 via-[#BAFC50]/25 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

          <div className="w-full max-w-[1380px] mx-auto space-y-8 relative z-10">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4">
              <div className="space-y-2 text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Ieskats mūsu nesenajos projektos
                </h2>
              </div>
            </div>

            {/* Portfolio Carousel Track */}
            <div className="overflow-hidden w-full relative">
              <div 
                onTransitionEnd={handlePortfolioTransitionEnd}
                className={`flex blog-carousel-track ${disablePortfolioTransition ? "" : "transition-transform duration-500 ease-out"}`}
                style={{ 
                  transform: `translateX(calc(-${portfolioIndex} * (100% / var(--visible-count))))`,
                }}
              >
                {[...portfolioItemsList, ...portfolioItemsList, ...portfolioItemsList].map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`} 
                    className="w-full sm:w-1/2 lg:w-1/3 p-3 flex-shrink-0 flex flex-col justify-between"
                  >
                    <PortfolioLaptopCard
                      title={item.title}
                      brand={item.brand}
                      displayLink={item.displayLink}
                      image={item.image}
                      link={item.link}
                      isPlaceholder={item.isPlaceholder}
                      description={item.description}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls (< > and Skatīt visus button) below Portfolio cards on the right */}
            <div className="flex justify-end items-center gap-3 mt-6 pr-3 sm:pr-6 md:pr-10 lg:pr-14">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scrollPortfolio('left')}
                  className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#BAFC50] transition-colors rounded-full cursor-pointer flex items-center justify-center shadow-sm"
                  aria-label="Iepriekšējais darbs"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => scrollPortfolio('right')}
                  className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#BAFC50] transition-colors rounded-full cursor-pointer flex items-center justify-center shadow-sm"
                  aria-label="Nākamais darbs"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <CtaButton
                text="Skatīt visus"
                to={getLocalizedPath('portfolio')}
              />
            </div>

          </div>
        </section>
      </LazyLoadSection>

      {/* 5. BUJ / FAQ: Preview Block */}
      <LazyLoadSection>
        <section 
          className="py-16 md:py-20 bg-transparent px-6 md:px-12 relative overflow-visible text-left z-10"
        >
          {/* Ambient Irregular Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -bottom-52 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-t from-[#38b000]/32 via-[#BAFC50]/25 to-transparent rounded-full blur-[190px] pointer-events-none z-0" />
          <div className="absolute -top-48 -left-24 w-[650px] h-[650px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[170px] pointer-events-none z-0" />

          <div className="w-full max-w-5xl xl:max-w-6xl mx-auto space-y-10 relative z-10">
            
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Biežāk uzdotie jautājumi
              </h2>
              <p className="text-xs md:text-sm text-zinc-300 font-light max-w-md mx-auto text-center">
                Pirmās atbildes, lai palīdzētu Jums ātri izprast mūsu sadarbības principus.
              </p>
            </div>

            {/* First 3 FAQ Items shown here as requested */}
            <div className="space-y-4">
              {homeFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between text-left p-5 focus:outline-none group select-none cursor-pointer"
                    >
                      <span className="font-bold text-white text-sm md:text-base group-hover:text-[#BAFC50] transition-colors pr-2">
                        {faq.question}
                      </span>
                      <StylizedCrossIcon isOpen={isOpen} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-xs md:text-sm text-white border-t border-zinc-800 pt-3 leading-relaxed font-normal whitespace-pre-line">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* FAQ bottom text & buttons (no frame) */}
            <div className="text-center space-y-5 pt-8 max-w-2xl mx-auto">
              <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                Neatradi atbildi uz savu jautājumu? Droši sazinieties ar mums, zvaniet vai rakstiet, un mēs atbildēsim uz visiem Jūsu jautājumiem.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <CtaButton text="Lasīt citus BUJ" to={getLocalizedPath('faq')} />
                <CtaButton text="Uzdod savu jautājumu" to={getLocalizedPath('contact')} />
              </div>
            </div>

          </div>
        </section>
      </LazyLoadSection>

      {/* 6. BLOGS: Preview Block */}
      <LazyLoadSection>
        <section 
          className="py-16 md:py-20 bg-transparent px-6 md:px-12 relative overflow-visible z-10"
        >
          {/* Ambient Irregular Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-48 -right-36 w-[800px] h-[800px] bg-gradient-to-bl from-[#BAFC50]/30 via-[#38b000]/24 to-transparent rounded-full blur-[190px] pointer-events-none z-0" />
          <div className="absolute -bottom-52 -left-24 w-[700px] h-[700px] bg-gradient-to-tr from-[#38b000]/30 via-[#BAFC50]/24 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

          <div className="w-full max-w-[1380px] mx-auto space-y-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4">
              <div className="space-y-2 text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Noderīga informācija
                </h2>
              </div>
            </div>

            {/* State-controlled Infinite Carousel Slider */}
            <div 
              className="overflow-hidden w-full relative touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                onTransitionEnd={handleTransitionEnd}
                className={`flex blog-carousel-track ${disableTransition ? "" : "transition-transform duration-500 ease-out"}`}
                style={{ 
                  transform: `translateX(calc(-${activeIndex} * (100% / var(--visible-count))))`,
                }}
              >
                {[...blogPostsList, ...blogPostsList, ...blogPostsList].map((post, index) => (
                  <div 
                    key={`${post.id}-${index}`} 
                    className="w-full sm:w-1/2 lg:w-1/3 p-3 flex-shrink-0 flex"
                  >
                    <Link
                      to={`${getLocalizedPath('blog')}?id=${post.id}`}
                      className="w-full bg-[#18181b] border border-zinc-800 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer rounded-2xl"
                    >
                      <div>
                        <div className="relative aspect-video overflow-hidden bg-zinc-900">
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "/Web-izstrades-agentura.webp";
                            }}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 space-y-3">
                          <h3 className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-[#BAFC50] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-zinc-400 font-light line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                      <div className="px-5 pb-5 pt-1 text-[10px] font-bold text-[#BAFC50] uppercase tracking-wider flex items-center gap-1">
                        Lasīt rakstu <ArrowRight className="h-3 w-3" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls (< > and Lasīt visu blogu button) below Blog cards on the right */}
            <div className="flex justify-end items-center gap-3 mt-6 pr-3 sm:pr-6 md:pr-10 lg:pr-14">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scrollBlog('left')}
                  className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#BAFC50] transition-colors rounded-full cursor-pointer flex items-center justify-center shadow-sm"
                  aria-label="Iepriekšējais raksts"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => scrollBlog('right')}
                  className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#BAFC50] transition-colors rounded-full cursor-pointer flex items-center justify-center shadow-sm"
                  aria-label="Nākamais raksts"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <CtaButton
                text="Lasīt blogu"
                to={getLocalizedPath('blog')}
              />
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* 7. KONTAKTI & SAZIŅAS FORMA */}
      <LazyLoadSection>
        <ContactForm 
          title="Pieteikt mājaslapas izstrādi vai konsultāciju" 
          subtitle="Droši sazinieties ar mums, zvaniet vai rakstiet, un mēs atbildēsim uz visiem Jūsu jautājumiem."
        />
      </LazyLoadSection>

    </div>
  );
}
