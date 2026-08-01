import { useState, useRef, useEffect, ReactNode } from "react";
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
import { FAQ_DATA } from "./Buj";
import { BLOG_POSTS } from "./Blogs";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Komercīpašumu un privātīpašumu apsaimniekošana I Juridiskā pārvaldība",
    brand: "Avenue Group",
    displayLink: "https://avenuegroup.lv",
    description: "Avenue Group ir nekustamo īpašumu pārvaldības un juridisko pakalpojumu platforma. Mājaslapa nodrošina pārskatāmu pakalpojumu katalogu, atsauksmes un elastīgas saziņas iespējas jaunām sadarbībām. Tās dizains izceļ uzņēmuma uzticamību un profesionālo pieredzi.",
    image: "/Avenuegroup-portfolio.webp",
    link: "https://avenuegroup.lv",
    isPlaceholder: false
  },
  {
    id: 2,
    title: "Vairāk ceļo un vairāk nopelni",
    brand: "Travel with Martins",
    displayLink: "https://travelwithmartins.com",
    description: "Travel with Martins ir personīgā ceļojumu emuāra un konsultāciju platforma. Tā palīdz lietotājiem plānot un organizēt neizmirstamus braucienus, sniedzot praktiskus padomus un iedvesmojošus ceļvežus. Vietne veidota ar uzsvaru uz vizuāli bagātu saturu un ērtu pieteikumu noformēšanu.",
    image: "/Travel-with-Martins-portfolio.webp",
    link: "https://travelwithmartins.com",
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
    title: "Tava Jaunā Mājaslapa",
    subtitle: "Piesaki sava biznesa mājaslapas izstrādi un sasniedz klientus efektīvāk.",
    description: "Šeit var atrasties Tava uzņēmuma jaunā un mūsdienīgā mājaslapa. Mēs izstrādāsim unikālu dizainu, kas piesaistīs klientus un veicinās pārdošanu. Piesaki savu projektu jau šodien un padari savu zīmolu pamanāmu digitālajā vidē.",
    displayLink: "tavaprojekts.lv",
    link: "/kontakti",
    isPlaceholder: true
  },
  {
    id: 5,
    title: "Piesaki Izstrādi",
    subtitle: "Mēs izveidosim ātru, drošu un estētisku risinājumu tieši tavām vajadzībām.",
    description: "Izveido mērķtiecīgu un uzticamu web risinājumu savam biznesam. Mēs nodrošinām pilnu izstrādes ciklu no skices līdz gatavai lapai ar ātrdarbības optimizāciju. Padari savu zīmolu pamanāmu un ērti sasniedzamu katram apmeklētājam.",
    displayLink: "biznesam.lv",
    link: "/kontakti",
    isPlaceholder: true
  },
  {
    id: 6,
    title: "Tavs Web Risinājums",
    subtitle: "Sazinies ar mums, lai apspriestu savu ideju un saņemtu bezmaksas konsultāciju.",
    description: "Gatavs risinājums Tavam jaunajam projektam vai tiešsaistes pakalpojumam. Nodrošinām responsīvu dizainu, SEO optimizāciju un nevainojamu darbību visās ierīcēs. Sazinies ar mums un saņem bezmaksas konsultāciju par savu ieceri.",
    displayLink: "jaunslapa.lv",
    link: "/kontakti",
    isPlaceholder: true
  }
];

function LazyLoadSection({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full transition-all duration-700 ease-out cv-auto ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Sageon Media | Mājaslapu izstrāde un digitālie risinājumi";
  }, []);

  // Take first 4 FAQ items for the Home page as requested
  const homeFaqs = FAQ_DATA.slice(0, 4);

  // Infinite Carousel State
  const [activeIndex, setActiveIndex] = useState(5);
  const [disableTransition, setDisableTransition] = useState(false);

  // Reset transition state after seamless jump
  useEffect(() => {
    if (disableTransition) {
      const timer = setTimeout(() => {
        setDisableTransition(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [disableTransition]);

  const handleTransitionEnd = () => {
    // There are 5 cards in BLOG_POSTS. Set 1 is 0..4, Set 2 is 5..9, Set 3 is 10..14.
    if (activeIndex >= 10) {
      setDisableTransition(true);
      setActiveIndex(5);
    } else if (activeIndex <= 4) {
      setDisableTransition(true);
      setActiveIndex(9);
    }
  };

  const scrollBlog = (direction: 'left' | 'right') => {
    if (disableTransition) return;
    
    if (direction === 'right') {
      setActiveIndex((prev) => prev + 1);
    } else {
      setActiveIndex((prev) => prev - 1);
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

  const handlePortfolioTransitionEnd = () => {
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

  const handlePricingTransitionEnd = () => {
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

  const pricingPlans = [
    {
      title: "Landing Page",
      subtitle: "Vienas lapas mājaslapa vai reprezentācija",
      price: "490",
      period: "vienreizējs maksājums",
      badge: "Populārs jauniem projektiem",
      features: [
        "Unikāls UI/UX dizains",
        "Responsīvs dizains visām ierīcēm (Mobile-first)",
        "Vienas lapas mājaslapa līdz 5 sadaļām divās valodās",
        "Viena attēla pievienošana katrā sadaļā",
        "Viena hero attēla pievienošana mājaslapas augšdaļā",
        "WhatsApp saziņas integrācija",
        "Kontaktformas integrācija",
        "Sociālo tīklu integrācija",
        "Pamata SEO optimizācija",
        "Search Console pieslēgšana",
        "CTA elementu izstrāde",
        "Mājaslapas satura izstrāde (papildus samaksa)",
        "Tehniskais atbalsts domēna un e-pasta pieslēgšanā",
        "Izstrādes laiks: 5-7 darba dienas"
      ],
      cta: "Pieteikt Landing lapu",
      highlight: false,
      icon: <Zap className="h-5 w-5 text-amber-500" />
    },
    {
      title: "Multi-page",
      subtitle: "Pilnvērtīga uzņēmuma biznesa mājaslapa",
      price: "1290",
      period: "vienreizējs maksājums",
      badge: "Labākā izvēle biznesam",
      features: [
        "Unikāls UI/UX dizains",
        "Responsīvs dizains visām ierīcēm (Mobile-first)",
        "Mājaslapa līdz 8 lapām divās valodās",
        "Attēlu pievienošana (kopā līdz 20 attēliem)",
        "Galerijas pievienošana (papildus samaksa)",
        "WhatsApp saziņas integrācija",
        "Kontaktformas integrācija",
        "Sociālo tīklu integrācija",
        "Pamata SEO optimizācija",
        "Search Console pieslēgšana",
        "CTA elementu izstrāde",
        "Mājaslapas satura izstrāde",
        "Tehniskais atbalsts domēna un e-pasta pieslēgšanā",
        "Satura vadības sistēmas (CMS) integrācija",
        "Izstrādes laiks: 2-3 nedēļas"
      ],
      cta: "Pieteikt biznesa lapu",
      highlight: true,
      icon: <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "E-Komercija",
      subtitle: "Profesionāls un pelnošs interneta veikals",
      price: "1950",
      period: "vienreizējs maksājums",
      badge: "Pilna tirdzniecības sistēma",
      features: [
        "Unikāls UI/UX dizains",
        "Responsīvs dizains visām ierīcēm (Mobile-first)",
        "Katalogs līdz 90 precēm divās valodās",
        "Maksājumu sistēmas integrācija (Stripe, PayPal u.c.)",
        "Attēlu pievienošana (skaits pēc vienošanās)",
        "WhatsApp saziņas integrācija",
        "Kontaktformas integrācija",
        "Sociālo tīklu integrācija",
        "Pamata SEO optimizācija",
        "Search Console pieslēgšana",
        "CTA elementu izstrāde",
        "Mājaslapas satura izstrāde",
        "Tehniskais atbalsts domēna un e-pasta pieslēgšanā",
        "Satura vadības sistēmas (CMS) integrācija",
        "Izstrādes laiks: 3-5 nedēļas"
      ],
      cta: "Pieteikt e-komercijas lapu",
      highlight: false,
      icon: <Sparkles className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Uzturēšana",
      subtitle: "Mēneša abonēšanas maksa",
      price: "49",
      period: "mēneša abonēšanas maksa",
      badge: "Miers un drošība Jums",
      features: [
        "Satura izmaiņas līdz 1 stundai mēnesī",
        "Mājaslapas ātrdarbības analīze",
        "Search Console datu uzraudzība",
        "Google Analytics datu analīze",
        "Mājaslapas SSL sertifikāta uzraudzība",
        "Tehnisko kļūdu novēršana",
        "Konsultācijas un tehniskais atbalsts",
        "Abonements atceļams jebkurā laikā"
      ],
      cta: "Pieteikt uzturēšanu",
      highlight: false,
      icon: <ShieldCheck className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Google pakalpojumi",
      subtitle: "Pilns Google rīku komplekts biznesam",
      price: "",
      period: "Pēc vienošanās",
      badge: "Google rīki",
      features: [
        "Google Business Profile izveide vai konfigurācija",
        "Google Search Console konfigurēšana",
        "Google Analytics 4 konfigurēšana",
        "Google Tag Manager integrācija",
        "Google Maps integrācija mājaslapā",
        "Sitemap.xml konfigurēšana",
        "Robots.txt konfigurēšana",
        "Domēna verifikācija Google pakalpojumos",
        "Mājaslapas iesniegšana Google indeksācijai"
      ],
      cta: "Pieteikt Google pakalpojumus",
      highlight: false,
      icon: <Globe className="h-5 w-5 text-emerald-500" />
    },
    {
      title: "Individuāli risinājumi",
      subtitle: "Pielāgota funkcionalitāte pēc pieprasījuma",
      price: "",
      period: "Pēc vienošanās",
      badge: "Pielāgota izstrāde",
      features: [
        "Pielāgotu funkciju izstrāde pēc klienta vajadzībām",
        "Cenu kalkulatoru integrācija",
        "Rezervāciju un kalendāru sistēmu integrācija",
        "Daudzsoļu pieteikumu formas",
        "Dokumentu augšupielādes izstrāde",
        "Klientu portālu izstrāde",
        "API integrācijas ar ārējām sistēmām",
        "AI čatbotu un virtuālo asistentu integrācija",
        "Citu individuālu risinājumu izstrāde pēc vienošanās"
      ],
      cta: "Pieteikt funkciju izstrādi",
      highlight: false,
      icon: <Settings className="h-5 w-5 text-[#BAFC50]" />
    },
    {
      title: "SEO optimizācija",
      subtitle: "Organiskās meklēšanas optimizācija",
      price: "",
      period: "Pēc vienošanās",
      badge: "SEO optimizācija",
      features: [
        "Atslēgvārdu izpēte galvenajām lapām",
        "Meta virsrakstu optimizācija",
        "Meta aprakstu optimizācija",
        "Attēlu ALT atribūtu optimizācija",
        "Canonical URL pārbaude",
        "Sociālo tīklu metadatu optimizācija",
        "Iekšējo saišu pārbaude un optimizācija",
        "Pamata tehniskā SEO analīze",
        "Mājaslapas ātrdarbības analīze"
      ],
      cta: "Pieteikt SEO optimizāciju",
      highlight: false,
      icon: <Search className="h-5 w-5 text-amber-400" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-[#BAFC50] selection:text-black overflow-hidden">
      <SEOHead
        title="Sageon Media | Mājaslapu izstrāde un digitālie risinājumi"
        description="Sageon Media piedāvā profesionālu mājaslapu izstrādi, adaptīvu dizainu, e-veikalus un SEO optimizāciju jūsu biznesa izaugsmei."
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://sageon.media#organization",
            "name": "Sageon Media",
            "url": "https://sageon.media",
            "logo": "https://sageon.media/Logo-new.webp",
            "email": "sageon.media@gmail.com",
            "telephone": "+371 26739899"
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://sageon.media#website",
            "url": "https://sageon.media",
            "name": "Sageon Media",
            "description": "Profesionāla mājaslapu izstrāde un digitālie risinājumi jūsu biznesam."
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://sageon.media#webpage",
            "url": "https://sageon.media",
            "name": "Sageon Media | Mājaslapu izstrāde un digitālie risinājumi",
            "description": "Sageon Media piedāvā profesionālu mājaslapu izstrādi, adaptīvu dizainu, e-veikalus un SEO optimizāciju jūsu biznesa izaugsmei.",
            "isPartOf": { "@id": "https://sageon.media#website" }
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

      {/* 2. INTRO BLOCK: Ko mēs piedāvājam */}
      <LazyLoadSection>
        <section 
          className="pt-2 sm:pt-8 md:pt-24 pb-16 md:pb-24 bg-transparent overflow-visible relative z-10"
        >
          {/* Ambient Irregular Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-48 right-1/4 w-[750px] h-[650px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
          <div className="absolute -bottom-52 -left-20 w-[700px] h-[650px] bg-gradient-to-tr from-[#38b000]/28 via-[#BAFC50]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

          <div className="px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 w-full max-w-[1700px] mx-auto space-y-12 relative z-10">
            
            {/* SECTION 1: Intro Text & 5 Problem Cards */}
            <div className="space-y-12">
              {/* Main Section Header */}
              <div className="text-center space-y-4 max-w-5xl mx-auto mb-12 md:mb-20">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Ko mēs piedāvājam</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Mājaslapa, kas strādā Jūsu biznesa labā
                </h2>
              </div>

              {/* Zig-Zag 3-Row Feature Block */}
              <div className="space-y-12 md:space-y-16 max-w-[1600px] mx-auto">
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
                    <picture className="relative z-10 w-full flex items-center justify-center">
                      <source media="(max-width: 639px)" srcSet="/Web-izstrades-agentura2-480.webp" type="image/webp" />
                      <source media="(min-width: 640px)" srcSet="/Web-izstrades-agentura2-780.webp" type="image/webp" />
                      <img 
                        src="/Web-izstrades-agentura2-780.webp" 
                        alt="Mājaslapas izstrāde tavam biznesam" 
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={380}
                        className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </picture>
                  </div>
                </div>

                {/* Row 2: Image Left, Text Right */}
                <div 
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-2 md:py-4"
                >
                  <div className="lg:col-span-5 order-last lg:order-first relative group flex items-center justify-center">
                    <div className="absolute w-[100%] h-[100%] bg-[#BAFC50]/40 rounded-full blur-[80px] pointer-events-none z-0" />
                    <picture className="relative z-10 w-full flex items-center justify-center">
                      <source media="(max-width: 639px)" srcSet="/individuals-dizains-musdienu-tehnologijas-480.webp" type="image/webp" />
                      <source media="(max-width: 1023px)" srcSet="/individuals-dizains-musdienu-tehnologijas-768.webp" type="image/webp" />
                      <source media="(min-width: 1024px)" srcSet="/individuals-dizains-musdienu-tehnologijas-1200.webp" type="image/webp" />
                      <img 
                        src="/individuals-dizains-musdienu-tehnologijas-1200.webp" 
                        alt="Individuāls dizains un mobilā pielāgotība" 
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={380}
                        className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </picture>
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
                    <picture className="relative z-10 w-full flex items-center justify-center">
                      <source media="(max-width: 639px)" srcSet="/uznemuma-digitala-vizitkarte-480.webp" type="image/webp" />
                      <source media="(max-width: 1023px)" srcSet="/uznemuma-digitala-vizitkarte-768.webp" type="image/webp" />
                      <source media="(min-width: 1024px)" srcSet="/uznemuma-digitala-vizitkarte-1200.webp" type="image/webp" />
                      <img 
                        src="/uznemuma-digitala-vizitkarte-1200.webp" 
                        alt="Struktūra un rezultāts — uzņēmuma digitālā vizītkarte" 
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={400}
                        className="w-full h-auto max-h-[400px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </picture>
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
                        to="/kontakti"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BAFC50] hover:bg-[#a8f235] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#BAFC50]/20 hover:scale-[1.02]"
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
          <div className="px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 w-full max-w-[1700px] mx-auto space-y-10 relative z-10">
            {/* Sub-block: Kas kavē Jūsu izaugsmi */}
            <div 
              className="text-center space-y-4 max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Kas stāv ceļā Jūsu izaugsmei</span>
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight">
                Kas kavē Jūsu izaugsmi digitālajā vidē?
              </h3>
              <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                Jūsu uzņēmuma mājaslapa ir izveidota, taču tā nepiesaista jaunus klientus un neveicina pieprasījuma pieaugumu? Mūsdienās ar vienkāršu interneta vizītkarti vairs nepietiek — mājaslapai ir jākļūst par efektīvu uzņēmuma izaugsmes digitālās vides instrumentu. Ja atpazīstat kādu no zemāk minētajām situācijām, iespējams, ir pienācis laiks pārmaiņām.
              </p>
            </div>

            {/* Creative 5-Card Balanced Grid Layout */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 max-w-[1700px] mx-auto pt-2"
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
                  <h4 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Mājaslapa nerada uzticību
                  </h4>
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
                  <h4 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Apmeklētāji nekļūst par klientiem
                  </h4>
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
                  <h4 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Uzņēmumu grūti atrast Google
                  </h4>
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
                  <h4 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Mājaslapa ielādējas lēni
                  </h4>
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
                  <h4 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    Piedāvājums nav pietiekami pārliecinošs
                  </h4>
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
          <div className="px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 w-full max-w-[1700px] mx-auto space-y-10 relative z-10">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-left max-w-[1600px] mx-auto">
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

      {/* KĀ NOTIEK SADARBĪBA SECTION */}
      <LazyLoadSection>
        <section 
          className="py-16 md:py-24 bg-transparent px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 relative overflow-hidden z-10"
        >
          {/* Ambient Glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#BAFC50]/12 via-[#38b000]/12 to-transparent rounded-full blur-[160px] pointer-events-none z-0" />

          <div className="w-full max-w-[1700px] mx-auto space-y-16 relative z-10">
            
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
                      Kad iecerētās mājaslapas koncepts ir saskaņots, mēs uzsākam tās izstrādi. Šajā posmā tiek veikta attiecīgās nozares tirgus izpēte, konkurentu analīze, mājaslapas struktūras un funkcionalitātes izstrāde, kā arī satura sagatavošana, lai radītu pārdomātu un modernu digitālo vizītkarti.
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

      {/* 3. MŪSU DARBI: Preview Block */}
      <LazyLoadSection>
        <section 
          className="pt-8 pb-8 md:pt-10 md:pb-10 bg-transparent px-6 md:px-12 relative overflow-visible z-10"
        >
          {/* Ambient Irregular Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-48 -left-24 w-[750px] h-[750px] bg-gradient-to-br from-[#BAFC50]/28 via-[#38b000]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
          <div className="absolute -bottom-52 -right-24 w-[800px] h-[700px] bg-gradient-to-tl from-[#38b000]/32 via-[#BAFC50]/25 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

          <div className="w-full max-w-[1700px] mx-auto space-y-8 relative z-10">
            
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
                {[...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS].map((item, index) => (
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
                      subtitle={item.subtitle}
                      description={item.description}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls (< > and Skatīt visus button) below Portfolio cards on the right */}
            <div className="flex justify-end items-center gap-3 mt-6">
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
                to="/portfolio"
              />
            </div>

          </div>
        </section>
      </LazyLoadSection>

      {/* 4. CENAS UN PAKALPOJUMI */}
      <LazyLoadSection>
        <section 
          className="pt-8 pb-16 md:pt-10 md:pb-20 bg-transparent px-6 md:px-12 relative overflow-visible z-10"
        >
          {/* Ambient Irregular Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-48 -left-36 w-[750px] h-[750px] bg-gradient-to-r from-[#BAFC50]/28 via-[#38b000]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
          <div className="absolute -bottom-52 -right-28 w-[700px] h-[700px] bg-gradient-to-tl from-[#38b000]/30 via-[#BAFC50]/24 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

          <div className="w-full max-w-[1700px] mx-auto space-y-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4">
              <div className="space-y-2 text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Sadarbības iespējas
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
            <div className="flex justify-end items-center gap-3 mt-6">
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
                to="/pakalpojumi"
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
                Neatradi atbildi uz savu jautājumu? Droši sazinies ar mums, zvani vai raksti, un mēs atbildēsim uz visiem jautājumiem.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <CtaButton text="Lasīt citus BUJ" to="/buj" />
                <CtaButton text="Uzdod savu jautājumu" to="/kontakti" />
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

          <div className="w-full max-w-[1700px] mx-auto space-y-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4">
              <div className="space-y-2 text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Noderīga informācija
                </h2>
              </div>
            </div>

            {/* State-controlled Infinite Carousel Slider */}
            <div className="overflow-hidden w-full relative">
              <div 
                onTransitionEnd={handleTransitionEnd}
                className={`flex blog-carousel-track ${disableTransition ? "" : "transition-transform duration-500 ease-out"}`}
                style={{ 
                  transform: `translateX(calc(-${activeIndex} * (100% / var(--visible-count))))`,
                }}
              >
                {[...BLOG_POSTS, ...BLOG_POSTS, ...BLOG_POSTS].map((post, index) => (
                  <div 
                    key={`${post.id}-${index}`} 
                    className="w-full sm:w-1/2 lg:w-1/3 p-3 flex-shrink-0 flex"
                  >
                    <Link
                      to="/blogs"
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
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 space-y-3">
                          <h4 className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-[#BAFC50] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h4>
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
            <div className="flex justify-end items-center gap-3 mt-6">
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
                to="/blogs"
              />
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* 7. KONTAKTI & SAZIŅAS FORMA */}
      <LazyLoadSection>
        <ContactForm 
          title="Pieteikt mājaslapas izstrādi vai konsultāciju" 
          subtitle="Droši sazinies ar mums, zvani vai raksti, un mēs atbildēsim uz visiem Taviem jautājumiem."
        />
      </LazyLoadSection>

    </div>
  );
}
