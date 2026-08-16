import React, { useState, useRef, useEffect, ReactNode, TouchEvent, TransitionEvent } from "react";
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
import ValueGrowthIconAnimation from "../components/ValueGrowthIconAnimation";
import DigitalGrowthObstacleAnimation from "../components/DigitalGrowthObstacleAnimation";
import FastWebsiteSolutionAnimation from "../components/FastWebsiteSolutionAnimation";
import WorkflowStepsAnimation from "../components/WorkflowStepsAnimation";
import FreeConsultationAnimation from "../components/FreeConsultationAnimation";
import ButtonArrowAnimation from "../components/ButtonArrowAnimation";
import PortfolioLaptopCard from "../components/PortfolioLaptopCard";
import StylizedCrossIcon from "../components/StylizedCrossIcon";
import SwipeHintAnimation from "../components/SwipeHintAnimation";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../i18n/LanguageContext";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Lielāka brīvība | Ceļošana var kļūt par Tavu dzīvesveidu",
    brand: "Travel with Martins",
    displayLink: "https://travelwithmartins.com",
    image: "/Travel-with-martins-portfolio.webp",
    description: "Šī ir ceļojumu un konsultāciju mājaslapa, kura radīta ar mērķi piedāvāt cilvēkiem iespēju vairāk ceļot, kā arī mainīt savu skatījumu uz ceļošanu. Projekta ietvaros tika izstrādāts unikāls dizains, zīmola logo, mājaslapas saturs un pārdomāta informācijas arhitektūra.",
    link: "https://travelwithmartins.com",
    isPlaceholder: false,
    tags: ["SEO optimizācija", "Unikāls UI/UX", "Zīmola logo", "Pakalpojumu apraksti", "Mobile First", "Saturs", "Galamērķu apraksti"]
  },
  {
    id: 2,
    title: "Komercīpašumu apsaimniekošana | Juridiskā pārvaldība",
    brand: "Avenue Group",
    displayLink: "https://avenuegroup.lv",
    image: "/Avenuegroup-portfolio.webp",
    description: "Mājaslapa pārstāv nekustamo īpašumu apsaimniekošanas un juridisko pakalpojumu jomu, kuri tiek nodrošināti vienuviet. Šajā projektā tika izstrādāta mājaslapas struktūra, pakalpojumu apraksti, izveidots zīmols, kā arī radīts premium dizains.",
    link: "https://avenuegroup.lv",
    isPlaceholder: false,
    tags: ["SEO optimizācija", "Unikāls UI/UX", "CMS", "Stripe", "Zīmola logo", "Pakalpojumu apraksti", "Mobile First", "Bloga raksti"]
  },
  {
    id: 3,
    title: "Ekskluzīvas koka kāpnes | Premium klases mēbeles",
    brand: "Avangart",
    displayLink: "https://avangart.lv",
    image: "/avangart-portfolio.webp",
    description: "Ekskluzīvu koka kāpņu un augstas klases mēbeļu ražotāja mājaslapa. Šajā projektā tika izstrādāts unikāls dizains ar koka imitācijas elementiem, zīmola logo, sagatavots mājaslapas saturs, kā arī izvietota portfolio galerija ar jau īstenotajiem projektiem.",
    link: "https://avangart.lv",
    isPlaceholder: false,
    tags: ["SEO optimizācija", "Unikāls UI/UX", "Zīmola logo", "Pakalpojumu apraksti", "Mobile First", "Saturs", "Attēlu galerijas"]
  },
  {
    id: 4,
    title: "Latvijas Restarts | Par Latvijas nākotni",
    brand: "Latvijas Restarts",
    displayLink: "https://latvijasrestarts.lv",
    image: "/latvijas-restarts-portfolio.webp",
    description: "Biedrības mājaslapa, kas apvieno dažādu jomu profesionāļus sekmīgai krīžu pārvarēšanai un dinamiskai Latvijas attīstībai. Projekta gaitā tika izstrādāts unikāls dizains ar nacionālā karoga krāsas elementiem, izveidoti biedru profili un sadaļas ar jaunākajām aktualitātēm.",
    link: "https://latvijasrestarts.lv",
    isPlaceholder: false,
    tags: ["SEO optimizācija", "Unikāls UI/UX", "Biedru profili", "Mobile First"]
  },
  {
    id: 5,
    title: "Enzīmi | Dabiski fermentēti dzērieni Tavai veselībai",
    brand: "enzimi.lv",
    displayLink: "https://enzimi.lv",
    image: "/enzimi-portfolio.webp",
    description: "Šī ir fermentēto dzērienu mājražotāja mājaslapa, kurā izveidots produktu apraksts, produktu katalogs, kā arī citu ražotāja piedāvāto pakalpojumu sadaļa. Izstrādāts mājaslapas saturs, unikāls dizains un zīmola logo, atbilstoši klienta vīzijai.",
    link: "https://enzimi.lv",
    isPlaceholder: false,
    tags: ["Unikāls UI/UX", "Zīmola logo", "Produktu katalogs", "Produktu grozs", "Mobile First"]
  },
  {
    id: 6,
    title: "Demontāža 24 | Būvju un ēku demontāžas pakalpojumi",
    brand: "Demontāža 24",
    displayLink: "demontaza24",
    image: "/demontaza24-portfolio.webp",
    description: "Būvju un ēku demontāžas pakalpojumu sniedzēja mājaslapa. Projekta izstrādes gaitā izstrādāts mājaslapas saturs, pakalpojumu apraksti, zīmola logo, kā arī galerija ar pieejamo nomas tehniku un īstenotajiem projektiem. Darbs pie projekta izstrādes vēl turpinās.",
    link: "https://demontaza24.eu",
    isPlaceholder: false,
    tags: ["CMS", "Unikāls UI/UX", "Zīmola logo", "Pakalpojumu apraksti", "Mobile First"]
  },
  {
    id: 7,
    title: "Velobiedrība | Drošas velobraukšanas entuziasti",
    brand: "Velobiedrība",
    displayLink: "velobiedriba",
    image: "/velobiedriba-portfolio.webp",
    description: "Biedrība, kas apvieno velobraukšanas profesionāļus un entuziastus, kuri ir apvienojušies ar mērķi dalīties pieredzē un rīkot apmācības un pasākumus, lai popularizētu drošu velobraukšanu pa Latvijas ceļiem. Mājaslapas saturs ir izstrādes stadijā.",
    link: "https://velobiedriba.lv",
    isPlaceholder: false,
    tags: ["Unikāls UI/UX", "Galerija", "Mobile First", "Saturs"]
  },
  {
    id: 8,
    title: "Beauty Studio I Skaistumkopšanas pakalpojumi",
    brand: "Beauty studio",
    displayLink: "beautystudio",
    image: "/beauty-portfolio.webp",
    description: "Skaistumkopšanas pakalpojumu sniedzēja mājaslapa, ar izstrādātu unikālu dizainu un aprakstiem. Projektā integrēts iepirkumu grozs, kalendārs, pieteikumu forma.",
    link: "https://beautystudio.lv",
    isPlaceholder: false,
    tags: ["Unikāls UI/UX", "Mobile First", "Pirkumu grozs", "Kalendārs", "Pieteikumu forma"]
  }
];

function LazyLoadSection({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}

function ProblemCardsMobileSlider({ lang }: { lang: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const touchCurrentY = useRef<number | null>(null);

  const cards = [
    {
      num: lang === 'EN' ? "01 / Reason" : lang === 'RU' ? "01 / Причина" : "01 / Iemesls",
      Icon: ShieldAlert,
      title: lang === 'EN' ? "Website doesn't build trust" : lang === 'RU' ? "Сайт не вызывает доверия" : "Mājaslapa nerada uzticību",
      desc: lang === 'EN' 
        ? "Outdated design, unclear information, or complex navigation can create a negative first impression and deter potential clients."
        : lang === 'RU'
        ? "Устаревший дизайн, непонятная информация или сложная навигация создают негативное первое впечатление."
        : "Novecojis dizains, neskaidra informācija vai sarežģīta lietošana var radīt negatīvu pirmo iespaidu un atturēt potenciālos klientus no saziņas."
    },
    {
      num: lang === 'EN' ? "02 / Reason" : lang === 'RU' ? "02 / Причина" : "02 / Iemesls",
      Icon: TrendingDown,
      title: lang === 'EN' ? "Visitors don't convert to clients" : lang === 'RU' ? "Посетители не становятся клиентами" : "Apmeklētāji nekļūst par klientiem",
      desc: lang === 'EN'
        ? "Without a clear structure and compelling call to action, visitors leave without buying or reaching out."
        : lang === 'RU'
        ? "Без четкой структуры и убедительного призыва к действию посетители уходят без покупки или обращения."
        : "Ja mājaslapā nav skaidras struktūras un pārliecinoša aicinājuma rīkoties, apmeklētāji aiziet, neveicot pirkumu vai nesazinoties ar uzņēmumu."
    },
    {
      num: lang === 'EN' ? "03 / Reason" : lang === 'RU' ? "03 / Причина" : "03 / Iemesls",
      Icon: Search,
      title: lang === 'EN' ? "Hard to find on Google" : lang === 'RU' ? "Сложно найти в Google" : "Uzņēmumu grūti atrast Google",
      desc: lang === 'EN'
        ? "Without quality SEO optimization, potential clients find your competitors first."
        : lang === 'RU'
        ? "Без качественной SEO-оптимизации потенциальные клиенты сначала находят ваших конкурентов."
        : "Bez kvalitatīvas SEO optimizācijas potenciālie klienti pirmos atrod Jūsu konkurentus, nevis Jūsu uzņēmumu."
    },
    {
      num: lang === 'EN' ? "04 / Reason" : lang === 'RU' ? "04 / Причина" : "04 / Iemesls",
      Icon: Clock,
      title: lang === 'EN' ? "Website loads too slowly" : lang === 'RU' ? "Сайт загружается слишком медленно" : "Mājaslapa ielādējas pārāk lēni",
      desc: lang === 'EN'
        ? "Slow loading hurts user experience, reduces ad efficiency, and negatively impacts Google rankings."
        : lang === 'RU'
        ? "Медленная загрузка ухудшает пользовательский опыт, снижает эффективность рекламы и позиции в Google."
        : "Lēna mājaslapas ielāde pasliktina lietotāju pieredzi, samazina reklāmu efektivitāti un negatīvi ietekmē pozīcijas Google meklētājā."
    },
    {
      num: lang === 'EN' ? "05 / Reason" : lang === 'RU' ? "05 / Причина" : "05 / Iemesls",
      Icon: HelpCircle,
      title: lang === 'EN' ? <>Offer is not<br />convincing enough</> : lang === 'RU' ? <>Предложение недостаточно<br />убедительно</> : <>Piedāvājums nav<br />pārliecinošs</>,
      desc: lang === 'EN'
        ? "Without clearly showing company advantages and client benefits, it's harder for clients to decide."
        : lang === 'RU'
        ? "Если на сайте не показаны преимущества компании, клиенту сложнее принять решение."
        : "Ja mājaslapā nav skaidri parādītas uzņēmuma priekšrocības un ieguvumi klientam, tad klientam ir grūtāk pieņemt lēmumu par sadarbību."
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [isPaused, cards.length]);

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
      setIsPaused(true);
    }
  };

  const handleHeroTouchMove = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
    }
  };

  const handleHeroTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const endX = e?.changedTouches?.[0]?.clientX ?? touchCurrentX.current ?? touchStartX.current;
      const endY = e?.changedTouches?.[0]?.clientY ?? touchCurrentY.current ?? (touchStartY.current ?? 0);
      const diffX = touchStartX.current - endX;
      const diffY = (touchStartY.current ?? endY) - endY;
      
      if (Math.abs(diffX) > 20 && Math.abs(diffX) > Math.abs(diffY) * 0.6) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchCurrentX.current = null;
    touchCurrentY.current = null;
    setTimeout(() => setIsPaused(false), 3500);
  };

  const currentCard = cards[currentIndex];
  const IconComp = currentCard.Icon;

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <div className="sm:hidden w-full relative px-1 py-1 mb-2">
      <div 
        className="relative overflow-hidden w-full touch-pan-y select-none"
        style={{ touchAction: "pan-y" }}
        onTouchStart={handleHeroTouchStart}
        onTouchMove={handleHeroTouchMove}
        onTouchEnd={handleHeroTouchEnd}
        onTouchCancel={handleHeroTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full bg-[#141417]/95 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between min-h-[175px]"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-500/80 font-semibold uppercase tracking-wider">
                  {currentCard.num}
                </span>
                <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                  <IconComp className="h-4.5 w-4.5" />
                </div>
              </div>
              <h3 className="font-bold text-white text-base leading-snug tracking-tight">
                {currentCard.title}
              </h3>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {currentCard.desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls - positioned tightly right below the card */}
      <div className="flex items-center justify-between pt-2 px-1 relative z-20">
        {/* Left: Indicator dots positioned tightly next to each other */}
        <div className="flex items-center gap-0.5">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3500);
              }}
              aria-label={`Pāriet uz ${idx + 1}. kartiņu`}
              className="p-[2px] cursor-pointer flex items-center justify-center"
            >
              <span className={`h-2 rounded-full transition-all duration-300 block ${
                idx === currentIndex 
                  ? "w-6 bg-gradient-to-r from-amber-500 to-amber-400 border border-amber-300/50" 
                  : "w-2 bg-zinc-800 border border-zinc-700/80 hover:bg-zinc-700"
              }`} />
            </button>
          ))}
        </div>

        {/* Right: Prev & Next navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              prevSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3500);
            }}
            aria-label="Iepriekšējā kartiņa"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-500/50 active:scale-95 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              nextSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3500);
            }}
            aria-label="Nākamā kartiņa"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-500/50 active:scale-95 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
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

  const trustItems = lang === 'EN' ? [
    "Custom UI/UX Design",
    "Fast & SEO-Optimized Website",
    "Mobile-First Development",
    "Oriented toward results & client acquisition"
  ] : lang === 'RU' ? [
    "Индивидуальный UI/UX дизайн",
    "Быстрый и SEO-оптимизированный сайт",
    "Mobile-first разработка",
    "Ориентирован на результат и привлечение клиентов"
  ] : [
    "Individuāls UI/UX dizains",
    "Ātra un SEO optimizēta mājaslapa",
    "Mobile-first izstrāde",
    "Orientēta uz rezultātu un klientu piesaisti"
  ];

  // Infinite Carousel State (Blog / Noderīga informācija)
  const totalBlogPosts = blogPostsList.length || 4;
  const [activeIndex, setActiveIndex] = useState(totalBlogPosts * 2);
  const [disableTransition, setDisableTransition] = useState(false);
  const isBlogAnimatingRef = useRef(false);

  // Reset transition state after seamless jump using double rAF
  useEffect(() => {
    if (disableTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisableTransition(false);
          isBlogAnimatingRef.current = false;
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [disableTransition]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName && e.propertyName !== 'transform') return;
    isBlogAnimatingRef.current = false;
    const total = blogPostsList.length;
    if (!total) return;
    
    if (activeIndex >= 3 * total) {
      setDisableTransition(true);
      setActiveIndex((prev) => prev - total);
    } else if (activeIndex < 2 * total) {
      setDisableTransition(true);
      setActiveIndex((prev) => prev + total);
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
    setTimeout(() => {
      isBlogAnimatingRef.current = false;
    }, 380);
  };

  const blogTouchStartX = useRef<number | null>(null);
  const blogTouchStartY = useRef<number | null>(null);
  const blogTouchCurrentX = useRef<number | null>(null);
  const blogTouchCurrentY = useRef<number | null>(null);

  const handleBlogTouchStart = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      blogTouchStartX.current = touch.clientX;
      blogTouchStartY.current = touch.clientY;
      blogTouchCurrentX.current = touch.clientX;
      blogTouchCurrentY.current = touch.clientY;
    }
  };

  const handleBlogTouchMove = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      blogTouchCurrentX.current = touch.clientX;
      blogTouchCurrentY.current = touch.clientY;
    }
  };

  const handleBlogTouchEnd = (e: React.TouchEvent) => {
    if (blogTouchStartX.current !== null) {
      const endX = e?.changedTouches?.[0]?.clientX ?? blogTouchCurrentX.current ?? blogTouchStartX.current;
      const endY = e?.changedTouches?.[0]?.clientY ?? blogTouchCurrentY.current ?? (blogTouchStartY.current ?? 0);
      const diffX = blogTouchStartX.current - endX;
      const diffY = (blogTouchStartY.current ?? endY) - endY;

      if (Math.abs(diffX) > 20 && Math.abs(diffX) > Math.abs(diffY) * 0.6) {
        if (diffX > 0) {
          scrollBlog('right');
        } else {
          scrollBlog('left');
        }
      }
    }
    blogTouchStartX.current = null;
    blogTouchStartY.current = null;
    blogTouchCurrentX.current = null;
    blogTouchCurrentY.current = null;
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Infinite Portfolio Carousel State
  const totalPortfolioCount = portfolioItemsList.length;
  const [portfolioIndex, setPortfolioIndex] = useState(totalPortfolioCount);
  const [disablePortfolioTransition, setDisablePortfolioTransition] = useState(false);
  const isAnimatingPortfolioRef = useRef(false);

  const portfolioTouchStartX = useRef<number | null>(null);
  const portfolioTouchStartY = useRef<number | null>(null);
  const portfolioTouchCurrentX = useRef<number | null>(null);
  const portfolioTouchCurrentY = useRef<number | null>(null);

  const handlePortfolioTouchStart = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      portfolioTouchStartX.current = touch.clientX;
      portfolioTouchStartY.current = touch.clientY;
      portfolioTouchCurrentX.current = touch.clientX;
      portfolioTouchCurrentY.current = touch.clientY;
    }
  };

  const handlePortfolioTouchMove = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      portfolioTouchCurrentX.current = touch.clientX;
      portfolioTouchCurrentY.current = touch.clientY;
    }
  };

  const handlePortfolioTouchEnd = (e: React.TouchEvent) => {
    if (portfolioTouchStartX.current !== null) {
      const endX = e?.changedTouches?.[0]?.clientX ?? portfolioTouchCurrentX.current ?? portfolioTouchStartX.current;
      const endY = e?.changedTouches?.[0]?.clientY ?? portfolioTouchCurrentY.current ?? (portfolioTouchStartY.current ?? 0);
      const diffX = portfolioTouchStartX.current - endX;
      const diffY = (portfolioTouchStartY.current ?? endY) - endY;

      if (Math.abs(diffX) > 20 && Math.abs(diffX) > Math.abs(diffY) * 0.6) {
        if (diffX > 0) {
          scrollPortfolio('right');
        } else {
          scrollPortfolio('left');
        }
      }
    }
    portfolioTouchStartX.current = null;
    portfolioTouchStartY.current = null;
    portfolioTouchCurrentX.current = null;
    portfolioTouchCurrentY.current = null;
  };

  // Sync portfolioIndex if language or portfolio length changes
  useEffect(() => {
    setPortfolioIndex(portfolioItemsList.length);
  }, [portfolioItemsList.length]);

  useEffect(() => {
    if (disablePortfolioTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisablePortfolioTransition(false);
          isAnimatingPortfolioRef.current = false;
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [disablePortfolioTransition]);

  const handlePortfolioTransitionEnd = (e: TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName && e.propertyName !== 'transform') return;
    isAnimatingPortfolioRef.current = false;
    const total = portfolioItemsList.length;
    if (portfolioIndex >= 2 * total) {
      setDisablePortfolioTransition(true);
      setPortfolioIndex((prev) => prev - total);
    } else if (portfolioIndex < total) {
      setDisablePortfolioTransition(true);
      setPortfolioIndex((prev) => prev + total);
    }
  };

  const scrollPortfolio = (direction: 'left' | 'right') => {
    if (disablePortfolioTransition || isAnimatingPortfolioRef.current) return;
    isAnimatingPortfolioRef.current = true;
    if (direction === 'right') {
      setPortfolioIndex((prev) => prev + 1);
    } else {
      setPortfolioIndex((prev) => prev - 1);
    }
    setTimeout(() => {
      isAnimatingPortfolioRef.current = false;
    }, 360);
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

  const rawPlans = (t.pricingPlans || []).map((plan, idx) => ({
    ...plan,
    icon: planIcons[idx % planIcons.length]
  }));

  const pricingPlans = rawPlans;

  // Infinite Pricing Carousel State
  const [pricingIndex, setPricingIndex] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return 5; // Default to Multi-page card on mobile
    }
    return 4; // Default to Landing page on desktop
  });
  const [disablePricingTransition, setDisablePricingTransition] = useState(false);
  const isAnimatingPricingRef = useRef(false);

  const pricingTouchStartX = useRef<number | null>(null);
  const pricingTouchStartY = useRef<number | null>(null);
  const pricingTouchCurrentX = useRef<number | null>(null);
  const pricingTouchCurrentY = useRef<number | null>(null);

  const handlePricingTouchStart = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      pricingTouchStartX.current = touch.clientX;
      pricingTouchStartY.current = touch.clientY;
      pricingTouchCurrentX.current = touch.clientX;
      pricingTouchCurrentY.current = touch.clientY;
    }
  };

  const handlePricingTouchMove = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      pricingTouchCurrentX.current = touch.clientX;
      pricingTouchCurrentY.current = touch.clientY;
    }
  };

  const handlePricingTouchEnd = (e: React.TouchEvent) => {
    if (pricingTouchStartX.current !== null) {
      const endX = e?.changedTouches?.[0]?.clientX ?? pricingTouchCurrentX.current ?? pricingTouchStartX.current;
      const endY = e?.changedTouches?.[0]?.clientY ?? pricingTouchCurrentY.current ?? (pricingTouchStartY.current ?? 0);
      const diffX = pricingTouchStartX.current - endX;
      const diffY = (pricingTouchStartY.current ?? endY) - endY;

      if (Math.abs(diffX) > 20 && Math.abs(diffX) > Math.abs(diffY) * 0.6) {
        if (diffX > 0) {
          scrollPricing('right');
        } else {
          scrollPricing('left');
        }
      }
    }
    pricingTouchStartX.current = null;
    pricingTouchStartY.current = null;
    pricingTouchCurrentX.current = null;
    pricingTouchCurrentY.current = null;
  };

  // Sync pricingIndex if language or pricingPlans length changes
  useEffect(() => {
    setPricingIndex(pricingPlans.length);
  }, [pricingPlans.length]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
          setPricingIndex((prev) => (prev === pricingPlans.length ? pricingPlans.length + 1 : prev));
        } else {
          setPricingIndex((prev) => (prev === pricingPlans.length + 1 ? pricingPlans.length : prev));
        }
      }, 150);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [pricingPlans.length]);

  useEffect(() => {
    if (disablePricingTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisablePricingTransition(false);
          isAnimatingPricingRef.current = false;
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [disablePricingTransition]);

  const handlePricingTransitionEnd = (e: TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName && e.propertyName !== 'transform') return;
    isAnimatingPricingRef.current = false;
    const total = pricingPlans.length;
    if (pricingIndex >= 2 * total) {
      setDisablePricingTransition(true);
      setPricingIndex((prev) => prev - total);
    } else if (pricingIndex < total) {
      setDisablePricingTransition(true);
      setPricingIndex((prev) => prev + total);
    }
  };

  const scrollPricing = (direction: 'left' | 'right') => {
    if (disablePricingTransition || isAnimatingPricingRef.current) return;
    isAnimatingPricingRef.current = true;
    if (direction === 'right') {
      setPricingIndex((prev) => prev + 1);
    } else {
      setPricingIndex((prev) => prev - 1);
    }
    setTimeout(() => {
      isAnimatingPricingRef.current = false;
    }, 360);
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-[#BAFC50] selection:text-black overflow-x-hidden">
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
            "email": "info@sageonmedia.eu",
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
              "email": "info@sageonmedia.eu",
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
          }
        ]}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />

      {/* Ambient Lighting - Smooth, Rich Green Aura for BOTH Desktop & Mobile (zero lag, 120fps) */}
      <div className="absolute top-[2%] -left-[10%] w-[90vw] max-w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[18%] -right-[10%] w-[90vw] max-w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[38%] -left-[8%] w-[90vw] max-w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[58%] -right-[8%] w-[90vw] max-w-[850px] h-[540px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[78%] -left-[10%] w-[90vw] max-w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[92%] -right-[10%] w-[90vw] max-w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.16),rgba(186,252,80,0.09),transparent_70%)] pointer-events-none z-0" />

      {/* 1. HERO SLIDER (Loads instantly) */}
      <HeroSlider />

      {/* UZTICĪBAS JOSLA / TRUST BANNER */}
      <LazyLoadSection>
        <div className="w-full bg-transparent sm:bg-[#111115]/90 border-y border-zinc-800/40 sm:border-zinc-800/80 sm:backdrop-blur-md py-3 sm:py-6 px-3.5 sm:px-6 md:px-12 relative z-20 mt-3 sm:mt-12 md:mt-16 mb-3 sm:mb-12">
          <div className="w-full max-w-[1380px] mx-auto">
            {/* Desktop Layout */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-6 items-center justify-between">
              {trustItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 xl:gap-3 justify-center sm:justify-start lg:justify-center min-w-0">
                  <div className="w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-[#BAFC50]/15 border border-[#BAFC50]/40 flex items-center justify-center shrink-0 text-[#BAFC50]">
                    <Check className="h-3 w-3 xl:h-3.5 xl:w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs lg:text-[13px] xl:text-sm font-semibold text-zinc-100 tracking-tight whitespace-nowrap">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile Layout: Clean Transparent Glowing Cards (No Gray Box) */}
            <div className="grid sm:hidden grid-cols-2 gap-3">
              {trustItems.map((item, idx) => {
                const trustIcons = [Sparkles, Zap, ShieldCheck, TrendingUp];
                const IconComp = trustIcons[idx % trustIcons.length];
                return (
                  <div 
                    key={idx} 
                    className="relative group bg-transparent border border-[#BAFC50]/25 hover:border-[#BAFC50]/60 rounded-xl p-3 flex flex-col justify-between gap-2.5 overflow-hidden transition-all duration-300 active:scale-[0.98]"
                  >
                    <div className="absolute -right-2 -bottom-2 w-14 h-14 bg-[#BAFC50]/10 rounded-full blur-lg pointer-events-none" />
                    <div className="flex items-center justify-between w-full">
                      <div className="w-7 h-7 rounded-lg bg-[#BAFC50]/15 border border-[#BAFC50]/40 flex items-center justify-center shrink-0 text-[#BAFC50] shadow-[0_0_12px_rgba(186,252,80,0.2)]">
                        <IconComp className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                    </div>
                    <span className="text-[11.5px] font-semibold text-white leading-snug tracking-tight">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </LazyLoadSection>

      {/* KAS STĀV CEĻĀ JŪSU IZAUGSMEI */}
      <LazyLoadSection>
        <section 
          className="pt-8 sm:pt-18 md:pt-24 pb-3 sm:pb-6 mt-2 sm:mt-8 bg-transparent overflow-visible relative z-10"
        >
          {/* Ambient Organic Green Glow at section start */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[360px] -rotate-6 rounded-[50%_50%_60%_40%] bg-gradient-to-r from-[#BAFC50]/[0.16] via-[#38b000]/[0.09] to-transparent blur-[160px] pointer-events-none z-0 transform-gpu" />

          <div className="px-4 sm:px-6 md:px-10 lg:px-12 w-full max-w-[1380px] mx-auto space-y-10 relative z-10">
            {/* Sub-block: Kas kavē Jūsu izaugsmi */}
            <div 
              className="text-center space-y-4 max-w-5xl mx-auto flex flex-col items-center"
            >
              <DigitalGrowthObstacleAnimation className="mb-2" />
              <div className="inline-flex items-start sm:items-center justify-center gap-2 px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase text-center mx-auto">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-[#BAFC50] mt-[2px] sm:mt-0" />
                <span className="text-center">
                  {lang === 'EN' ? (
                    <>What stands in the way<br className="sm:hidden" /> of your digital growth</>
                  ) : lang === 'RU' ? (
                    <>Что стоит на пути<br className="sm:hidden" /> вашего цифрового роста</>
                  ) : (
                    <>Kas stāv ceļā Jūsu izaugsmei<br className="sm:hidden" /> digitālajā vidē</>
                  )}
                </span>
              </div>
              <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed">
                {lang === 'EN'
                  ? "Your business website is live, but it isn't attracting new clients or growing inquiries? Today, a simple online business card is no longer enough — a website must become an effective digital tool for business growth. If you recognize any of the situations below, it might be time for a change."
                  : lang === 'RU'
                  ? "Сайт вашей компании создан, но он не привлекает новых клиентов и не увеличивает количество заявок? Сегодня обычной визитки недостаточно — сайт должен стать эффективным инструментом цифрового роста. Если узнаете одну из ситуаций ниже, возможно, пришло время для изменений."
                  : "Jūsu uzņēmuma mājaslapa ir izveidota, taču tā nepiesaista jaunus klientus un neveicina pieprasījuma pieaugumu? Mūsdienās ar vienkāršu interneta vizītkarti vairs nepietiek — mājaslapai ir jākļūst par efektīvu uzņēmuma izaugsmes digitālās vides instrumentu. Ja atpazīstat kādu no zemāk minētajām situācijām, iespējams, ir pienācis laiks pārmaiņām."}
              </p>
            </div>

            {/* Mobile Slideshow */}
            <ProblemCardsMobileSlider lang={lang} />

            {/* Creative 5-Card Balanced Grid Layout (Desktop / Tablet) */}
            <div 
              className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 max-w-[1380px] mx-auto pt-2"
            >
              {/* Point 1 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      {lang === 'EN' ? "01 / Reason" : lang === 'RU' ? "01 / Причина" : "01 / Iemesls"}
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    {lang === 'EN' ? "Website doesn't build trust" : lang === 'RU' ? "Сайт не вызывает доверия" : "Mājaslapa nerada uzticību"}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    {lang === 'EN' 
                      ? "Outdated design, unclear information, or complex navigation can create a negative first impression and deter potential clients."
                      : lang === 'RU'
                      ? "Устаревший дизайн, непонятная информация или сложная навигация создают негативное первое впечатление."
                      : "Novecojis dizains, neskaidra informācija vai sarežģīta lietošana var radīt negatīvu pirmo iespaidu un atturēt potenciālos klientus no saziņas."}
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      {lang === 'EN' ? "02 / Reason" : lang === 'RU' ? "02 / Причина" : "02 / Iemesls"}
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <TrendingDown className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    {lang === 'EN' ? "Visitors don't convert to clients" : lang === 'RU' ? "Посетители не становятся клиентами" : "Apmeklētāji nekļūst par klientiem"}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    {lang === 'EN'
                      ? "Without a clear structure and compelling call to action, visitors leave without buying or reaching out."
                      : lang === 'RU'
                      ? "Без четкой структуры и убедительного призыва к действию посетители уходят без покупки или обращения."
                      : "Ja mājaslapā nav skaidras struktūras un pārliecinoša aicinājuma rīkoties, apmeklētāji aiziet, neveicot pirkumu vai nesazinoties ar uzņēmumu."}
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      {lang === 'EN' ? "03 / Reason" : lang === 'RU' ? "03 / Причина" : "03 / Iemesls"}
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <Search className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    {lang === 'EN' ? "Hard to find on Google" : lang === 'RU' ? "Сложно найти в Google" : "Uzņēmumu grūti atrast Google"}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    {lang === 'EN'
                      ? "Without quality SEO optimization, potential clients find your competitors first."
                      : lang === 'RU'
                      ? "Без качественной SEO-оптимизации потенциальные клиенты сначала находят ваших конкурентов."
                      : "Bez kvalitatīvas SEO optimizācijas potenciālie klienti pirmos atrod Jūsu konkurentus, nevis Jūsu uzņēmumu."}
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      {lang === 'EN' ? "04 / Reason" : lang === 'RU' ? "04 / Причина" : "04 / Iemesls"}
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    {lang === 'EN' ? "Website loads too slowly" : lang === 'RU' ? "Сайт загружается слишком медленно" : "Mājaslapa ielādējas pārāk lēni"}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    {lang === 'EN'
                      ? "Slow loading hurts user experience, reduces ad efficiency, and negatively impacts Google rankings."
                      : lang === 'RU'
                      ? "Медленная загрузка ухудшает пользовательский опыт, снижает эффективность рекламы и позиции в Google."
                      : "Lēna mājaslapas ielāde pasliktina lietotāju pieredzi, samazina reklāmu efektivitāti un negatīvi ietekmē pozīcijas Google meklētājā."}
                  </p>
                </div>
              </div>

              {/* Point 5 */}
              <div className="group relative bg-[#141417]/90 hover:bg-[#18181d] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-500/70 group-hover:text-amber-400 font-semibold uppercase tracking-wider">
                      {lang === 'EN' ? "05 / Reason" : lang === 'RU' ? "05 / Причина" : "05 / Iemesls"}
                    </span>
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-all duration-300">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                    {lang === 'EN' ? <>Offer is not<br />convincing enough</> : lang === 'RU' ? <>Предложение недостаточно<br />убедительно</> : <>Piedāvājums nav<br />pārliecinošs</>}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    {lang === 'EN'
                      ? "Without clearly showing company advantages and client benefits, it's harder for clients to decide."
                      : lang === 'RU'
                      ? "Если на сайте не показаны преимущества компании, клиенту сложнее принять решение."
                      : "Ja mājaslapā nav skaidri parādītas uzņēmuma priekšrocības un ieguvumi klientam, tad klientam ir grūtāk pieņemt lēmumu par sadarbību."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* CALLOUT BANNER 1: Pirms "Ko mēs piedāvājam" */}
      <LazyLoadSection>
        <div className="px-4 sm:px-6 md:px-10 lg:px-12 w-full max-w-[1380px] mx-auto py-8 sm:py-12 md:py-16 relative overflow-visible z-10">
          {/* Ambient Organic Green Glow at banner */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[300px] bg-gradient-to-r from-[#38b000]/[0.15] via-[#BAFC50]/[0.10] to-transparent rounded-full blur-[150px] pointer-events-none z-0 transform-gpu" />

          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-2 relative z-10">
            <div className="space-y-4 flex flex-col items-center justify-center text-center">
              <FastWebsiteSolutionAnimation className="mb-2" />
              <p className="text-base sm:text-lg md:text-xl font-medium text-white leading-relaxed">
                {lang === 'EN' ? (
                  <>
                    Do you need a modern website for your business without overpaying and waiting for weeks?{" "}
                    <span className="text-[#BAFC50] font-bold">
                      We can solve this in a relatively short time by developing a website that will not only save you time, but also attract more clients
                    </span>
                  </>
                ) : lang === 'RU' ? (
                  <>
                    Вам нужен современный сайт для бизнеса, но вы не хотите переплачивать и ждать неделями?{" "}
                    <span className="text-[#BAFC50] font-bold">
                      Мы можем решить это в относительно короткие сроки, разработав сайт, который не только сэкономит ваше время, но и привлечет больше клиентов
                    </span>
                  </>
                ) : (
                  <>
                    Vai Jums ir nepieciešama mūsdienīga mājaslapa biznesam, bet nevēlaties pārmaksāt un gaidīt nedēļām ilgi?{" "}
                    <span className="text-[#BAFC50] font-bold">
                      Mēs varam to atrisināt salīdzinoši īsā laikā, izstrādājot mājaslapu, kas ne tikai aiztaupīs Jums laiku, bet arī piesaistīs vairāk klientu
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </LazyLoadSection>

      {/* 2. INTRO BLOCK: Ko mēs piedāvājam */}
      <LazyLoadSection>
        <section 
          className="pt-2 sm:pt-4 md:pt-6 pb-12 md:pb-24 bg-transparent overflow-visible relative z-10"
        >
          {/* Ambient Formless Organic Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-36 right-1/4 w-[850px] h-[450px] -rotate-12 rounded-[60%_40%_70%_30%] bg-gradient-to-br from-[#BAFC50]/[0.15] via-[#38b000]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
          <div className="absolute -bottom-52 -left-20 w-[800px] h-[450px] rotate-12 rounded-[40%_60%_30%_70%] bg-gradient-to-tr from-[#38b000]/[0.14] via-[#BAFC50]/[0.07] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />

          <div className="px-4 sm:px-6 md:px-10 lg:px-12 w-full max-w-[1380px] mx-auto space-y-12 relative z-10">
            
            {/* SECTION 1: Intro Text & 5 Problem Cards */}
            <div className="space-y-12">
              {/* Zig-Zag 3-Row Feature Showcase Block */}
              <div className="space-y-16 sm:space-y-24 max-w-[1380px] mx-auto">
                {/* Row 1: Text Left, Image 1 Right (Mājaslapas izstrāde) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#BAFC50]/10 border border-[#BAFC50]/30 flex items-center justify-center text-[#BAFC50]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                      {lang === 'EN' ? "Website Development" : lang === 'RU' ? "Разработка сайтов" : "Mājaslapas izstrāde"}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed">
                      {lang === 'EN'
                        ? "We develop fast and modern websites that highlight your brand and help you achieve your business goals faster. Every project is built considering your company's needs and future growth perspectives. As a result, you get a professional digital showcase that serves long-term and grows with your business."
                        : lang === 'RU'
                        ? "Мы разрабатываем быстрые и современные сайты, которые подчеркивают ваш бренд и помогают быстрее достигать бизнес-целей. Каждый проект создается с учетом потребностей вашей компании и перспектив роста. В результате вы получаете профессиональную цифровую визитку, которая служит долгосрочно и растет вместе с вашим бизнесом."
                        : "Mēs izstrādājam ātras un mūsdienīgas mājaslapas, kas precīzi izceļ Jūsu zīmolu un palīdz ātrāk sasniegt nospraustos biznesa mērķus. Katrs projekts tiek veidots, ņemot vērā Jūsu uzņēmuma vajadzības un nākotnes attīstības perspektīvas. Rezultātā Jūs iegūstiet profesionālu digitālo vizītkarti, kas kalpo ilgtermiņā un aug kopā ar Jūsu biznesu."}
                    </p>
                  </div>
                  <div className="lg:col-span-6 flex items-center justify-center">
                    <img 
                      src="/iedod-savam-biznesam-jaunu-uzravienu-1.webp" 
                      alt={lang === 'EN' ? "Website Development" : lang === 'RU' ? "Разработка сайтов" : "Mājaslapas izstrāde"} 
                      className="w-full max-w-[423px] h-auto max-h-[294px] object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                </div>

                {/* Row 2: Image 2 Left, Text Right (Dizains & mobile first) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-1">
                    <img 
                      src="/majaslapa-tavam-biznesam.webp" 
                      alt={lang === 'EN' ? "Design & mobile first" : lang === 'RU' ? "Дизайн и mobile first" : "Dizains & mobile first"} 
                      className="w-full max-w-[423px] h-auto max-h-[294px] object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left order-1 lg:order-2">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#BAFC50]/10 border border-[#BAFC50]/30 flex items-center justify-center text-[#BAFC50]">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                      {lang === 'EN' ? "Design & mobile first" : lang === 'RU' ? "Дизайн и mobile first" : "Dizains & mobile first"}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed">
                      {lang === 'EN'
                        ? "For every project, we craft an individual design that reflects your company identity and creates a professional first impression. Every visual element and section is tailored for desktops, tablets, and smartphones, ensuring a unified, attractive user experience on any device."
                        : lang === 'RU'
                        ? "Для каждого проекта мы создаем индивидуальный дизайн, отражающий айдентику компании и создающий профессиональное первое впечатление. Все визуальные элементы и разделы адаптированы для компьютеров, планшетов и смартфонов, обеспечивая единый удобный опыт на любом устройстве."
                        : "Katram projektam mēs veidojam individuālu dizainu, kas atspoguļo Jūsu uzņēmuma identitāti un rada profesionālu pirmo iespaidu. Ikviens vizuālais elements vai sadaļa tiek pielāgots datoriem, planšetēm un viedtālruņiem. Tas Jūsu mājaslapas apmeklētājiem nodrošina vienotu, vizuāli pievilcīgu un patīkamu lietošanas pieredzi neatkarīgi no izmantotās ierīces."}
                    </p>
                  </div>
                </div>

                {/* Row 3: Text Left, Image 3 Right (Struktūra & rezultāts) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#BAFC50]/10 border border-[#BAFC50]/30 flex items-center justify-center text-[#BAFC50]">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                      {lang === 'EN' ? "Structure & Results" : lang === 'RU' ? "Структура и результат" : "Struktūra & rezultāts"}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed">
                      {lang === 'EN'
                        ? "We plan website structures so visitors quickly find all necessary information and naturally reach the desired action. Clear navigation, thoughtful layout, and effective calls to action build trust among your clients and increase demand, inquiries, or sales results."
                        : lang === 'RU'
                        ? "Мы планируем структуру сайта так, чтобы посетители быстро находили нужную информацию и естественно приходили к целевому действию. Понятная навигация, продуманное размещение контента и эффективные призывы к действию помогают завоевать доверие клиентов и увеличить продажи."
                        : "Mājaslapu struktūru mēs plānojam tā, lai tās apmeklētāji ātri atrastu visu nepieciešamo informāciju un dabiski nonāktu līdz vēlamajai darbībai. Skaidra navigācija, pārdomāts satura izvietojums un efektīvi uzaicinājumi rīkoties palīdz veidot uzticību Jūsu klientu vidū un palielināt pieprasījumu, pieteikumu vai pārdošanas rezultātus."}
                    </p>
                  </div>
                  <div className="lg:col-span-6 flex items-center justify-center w-full">
                    <img 
                      src="/atra-majaslapa-tava-biznesa-izaugsmei.webp" 
                      alt={lang === 'EN' ? "Structure & Results" : lang === 'RU' ? "Структура и результат" : "Struktūra & rezultāts"} 
                      className="w-full max-w-[423px] h-auto object-cover rounded-2xl shadow-lg block mx-auto"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Closing quote / CTA block */}
                <div 
                  className="pt-8 sm:pt-12 md:pt-14 pb-2 text-center max-w-4xl mx-auto flex flex-col items-center"
                >
                  <FreeConsultationAnimation className="mb-4 sm:mb-5" />
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase mb-5 sm:mb-6">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{lang === 'EN' ? "Free Consultation" : lang === 'RU' ? "Бесплатная консультация" : "Bezmaksas Konsultācija"}</span>
                  </div>

                  <p className="text-base sm:text-lg md:text-xl font-medium text-zinc-100 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8">
                    {lang === 'EN'
                      ? "Whether you need a new website, recommendations for your existing website, or improvements to it, we will help find the best solution for your business"
                      : lang === 'RU'
                      ? "Нужен ли вам новый сайт, рекомендации по существующему сайту или его улучшение, мы поможем найти лучшее решение для вашего бизнеса"
                      : "Neatkarīgi no tā, vai Jums ir nepieciešama jauna mājaslapa vai rekomendācijas par esošo mājaslapu vai tās uzlabošana, mēs palīdzēsim atrast piemērotāko risinājumu tieši Jūsu biznesam"}
                  </p>
                  
                  <div className="pt-1 flex justify-center">
                    <Link
                      to={getLocalizedPath("contact")}
                      className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#BAFC50] hover:bg-[#a6ed38] text-black font-sans font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#BAFC50]/20 hover:shadow-[#BAFC50]/40 transition-all duration-300"
                    >
                      <span>{lang === 'EN' ? "Apply for consultation" : lang === 'RU' ? "Записаться на консультацию" : "Pieteikties konsultācijai"}</span>
                      <ButtonArrowAnimation />
                    </Link>
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
          className="pt-4 pb-10 md:pt-6 md:pb-14 bg-transparent px-6 md:px-12 relative overflow-visible z-10"
        >
          {/* Ambient Formless Organic Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-36 -left-36 w-[850px] h-[500px] -rotate-12 rounded-[50%_50%_70%_30%] bg-gradient-to-br from-[#BAFC50]/[0.15] via-[#38b000]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
          <div className="absolute -bottom-52 -right-28 w-[800px] h-[500px] rotate-12 rounded-[30%_70%_50%_50%] bg-gradient-to-tl from-[#38b000]/[0.14] via-[#BAFC50]/[0.07] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />

          <div className="w-full max-w-[1380px] mx-auto space-y-8 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2 px-2 sm:px-3">
              <div className="space-y-2 text-left relative sm:left-[1.3cm]">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                  {lang === 'EN' ? (
                    <>Services &amp;<br className="hidden sm:inline" /> Pricing</>
                  ) : lang === 'RU' ? (
                    <>Услуги и<br className="hidden sm:inline" /> цены</>
                  ) : (
                    <>Piedāvātie pakalpojumi<br className="hidden sm:inline" /> un cenas</>
                  )}
                </h2>
              </div>

              {/* Action buttons on top right: Mobile swipe indicator + Uzzināt vairāk button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <SwipeHintAnimation lang={lang} />
                <CtaButton
                  text={lang === 'EN' ? "Learn More" : lang === 'RU' ? "Узнать больше" : "Uzzināt vairāk"}
                  to={getLocalizedPath('services')}
                />
              </div>
            </div>

            {/* Infinite Pricing Carousel Slider Container */}
            <div className="relative w-full md:px-14 lg:px-16">
              {/* Desktop Left Button */}
              <button 
                onClick={() => scrollPricing('left')}
                className="hidden md:flex absolute left-0 lg:left-1 top-1/2 -translate-y-1/2 z-30 p-2.5 lg:p-3 min-w-[44px] min-h-[44px] bg-[#18181b]/95 hover:bg-black border border-zinc-700/80 hover:border-[#BAFC50] text-zinc-300 hover:text-[#BAFC50] transition-all rounded-full cursor-pointer items-center justify-center shadow-xl backdrop-blur-md group"
                aria-label="Iepriekšējais pakalpojums"
              >
                <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Desktop Right Button */}
              <button 
                onClick={() => scrollPricing('right')}
                className="hidden md:flex absolute right-0 lg:right-1 top-1/2 -translate-y-1/2 z-30 p-2.5 lg:p-3 min-w-[44px] min-h-[44px] bg-[#18181b]/95 hover:bg-black border border-zinc-700/80 hover:border-[#BAFC50] text-zinc-300 hover:text-[#BAFC50] transition-all rounded-full cursor-pointer items-center justify-center shadow-xl backdrop-blur-md group"
                aria-label="Nākamais pakalpojums"
              >
                <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Slider Track */}
              <div 
                className="overflow-hidden w-full relative touch-pan-y select-none"
                style={{ touchAction: "pan-y" }}
                onTouchStart={handlePricingTouchStart}
                onTouchMove={handlePricingTouchMove}
                onTouchEnd={handlePricingTouchEnd}
                onTouchCancel={handlePricingTouchEnd}
              >
                <div 
                  onTransitionEnd={handlePricingTransitionEnd}
                  className={`flex pricing-carousel-track ${disablePricingTransition ? "" : "transition-transform duration-350 ease-out"}`}
                  style={{ 
                    transform: `translateX(calc(-${pricingIndex} * (100% / var(--visible-count))))`,
                  }}
                >
                  {[...pricingPlans, ...pricingPlans, ...pricingPlans].map((plan, index) => {
                    const isBestChoice = plan.badge === "Labākā izvēle biznesam" || plan.badge === "Best choice for business" || plan.badge === "Лучший выбор для бизнеса";
                    return (
                      <div 
                        key={`${plan.title}-${index}`} 
                        className="w-full sm:w-1/2 lg:w-1/4 p-2 sm:p-3 flex-shrink-0 flex flex-col justify-between"
                      >
                        <Link
                          to={getLocalizedPath('services')}
                          className="bg-[#18181b] border-2 border-zinc-800 hover:border-[#BAFC50] transition-all duration-300 flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl group relative overflow-hidden cursor-pointer h-full"
                        >
                          <div>
                            {/* Header Section */}
                            <div className="p-4 sm:p-6 border-b border-zinc-800/80 text-left space-y-3 sm:space-y-4 relative">
                              <div className="flex items-center justify-between min-h-[24px] sm:min-h-[28px]">
                                <span className={`px-2.5 py-1 font-sans text-xs uppercase tracking-wider font-bold rounded-lg ${
                                  isBestChoice 
                                    ? "bg-[#BAFC50] text-black font-extrabold shadow-sm" 
                                    : "bg-zinc-800 text-zinc-200 border border-zinc-700/60"
                                }`}>
                                  {isBestChoice ? "★ " : ""}{plan.badge}
                                </span>
                              </div>
                              
                              <div className="space-y-1 sm:space-y-1.5 h-auto sm:h-[88px] sm:min-h-[88px] flex flex-col justify-start items-start pt-1">
                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-white leading-tight group-hover:text-[#BAFC50] transition-colors">{plan.title}</h3>
                                <p className="text-xs sm:text-sm font-normal text-zinc-300">
                                  {plan.subtitle}
                                </p>
                              </div>

                              {/* Highly visible high-contrast pricing tag container */}
                              <div className="pt-4 sm:pt-6 pb-1.5 sm:pb-2 mt-8 sm:mt-1 border-l-4 border-[#BAFC50] pl-3 sm:pl-3.5 flex items-center gap-1.5 min-h-[50px] relative">
                                {plan.originalPrice ? (
                                  <div className="flex items-center gap-1 relative w-full">
                                    {/* New price (450) placed floating ABOVE the old price, increased by 50%, raised up by 2mm, shifted left by 1.3cm (now -6mm) */}
                                    <div className="absolute -top-8 sm:-top-6 left-8 sm:left-14 translate-x-[3mm] sm:-translate-x-[6mm] -translate-y-[1mm] sm:-translate-y-[2mm] flex items-center gap-0.5 text-[#BAFC50] font-black z-20">
                                      <span className="text-base sm:text-lg font-black text-[#BAFC50]">€</span>
                                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#BAFC50]">{plan.price}</span>
                                    </div>
                                    
                                    {/* Old price (890) in exact same size and visual style as other cards */}
                                    <span className="text-base sm:text-lg font-black text-[#BAFC50]">€</span>
                                    <span className="text-3xl sm:text-5xl font-black tracking-tight text-white line-through decoration-red-500 decoration-2 sm:decoration-[3px]">
                                      {plan.originalPrice}
                                    </span>
                                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold font-sans ml-1 sm:ml-2 text-zinc-300">
                                      / {plan.period}
                                    </span>
                                  </div>
                                ) : plan.price ? (
                                  <div className="flex items-center gap-1">
                                    {plan.pricePrefix && (
                                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#BAFC50] mr-0.5">
                                        {plan.pricePrefix}
                                      </span>
                                    )}
                                    <span className="text-base sm:text-lg font-black text-[#BAFC50]">€</span>
                                    <span className="text-3xl sm:text-5xl font-black tracking-tight text-white">{plan.price}</span>
                                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold font-sans ml-1 sm:ml-2 text-zinc-300">
                                      / {plan.period}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-wider font-sans text-[#BAFC50] self-center">
                                    {plan.period}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Features List */}
                            <ul className="p-4 sm:p-6 space-y-3.5 text-left text-sm text-zinc-200 font-normal">
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
                          <div className="p-4 sm:p-6 sm:pt-0 pt-2">
                            <span
                              className={`w-full py-2.5 sm:py-3.5 px-4 font-bold tracking-wider text-xs sm:text-sm uppercase transition-all duration-300 rounded-full text-center block shadow-sm hover:shadow-md btn-shimmer ${
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
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* 4. MŪSU DARBI: Preview Block */}
      <LazyLoadSection>
        <section 
          className="pt-4 pb-6 md:pt-6 md:pb-8 bg-transparent px-6 md:px-12 relative overflow-visible z-10"
        >
          {/* Ambient Formless Organic Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-36 -left-24 w-[850px] h-[500px] -rotate-12 rounded-[55%_45%_65%_35%] bg-gradient-to-br from-[#BAFC50]/[0.15] via-[#38b000]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
          <div className="absolute -bottom-52 -right-24 w-[850px] h-[500px] rotate-12 rounded-[35%_65%_45%_55%] bg-gradient-to-tl from-[#38b000]/[0.14] via-[#BAFC50]/[0.07] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />

          <div className="w-full max-w-[1380px] mx-auto space-y-8 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2 px-3">
              <div className="space-y-2 text-left relative sm:left-[1.3cm]">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  {lang === 'EN' ? "Insight into Our Recent Projects" : lang === 'RU' ? "Обзор наших недавних проектов" : "Ieskats mūsu nesenajos projektos"}
                </h2>
              </div>

              {/* Action buttons on top right: Mobile swipe indicator + Skatīt visus button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <SwipeHintAnimation lang={lang} />
                <CtaButton
                  text={lang === 'EN' ? "View All" : lang === 'RU' ? "Смотреть все" : "Skatīt visus"}
                  to={getLocalizedPath('portfolio')}
                />
              </div>
            </div>

            {/* Infinite Portfolio Carousel Slider Container */}
            <div className="relative w-full md:px-14 lg:px-16">
              {/* Desktop Left Button */}
              <button 
                onClick={() => scrollPortfolio('left')}
                className="hidden md:flex absolute left-0 lg:left-1 top-1/2 -translate-y-1/2 z-30 p-2.5 lg:p-3 min-w-[44px] min-h-[44px] bg-[#18181b]/95 hover:bg-black border border-zinc-700/80 hover:border-[#BAFC50] text-zinc-300 hover:text-[#BAFC50] transition-all rounded-full cursor-pointer items-center justify-center shadow-xl backdrop-blur-md group"
                aria-label="Iepriekšējais projekts"
              >
                <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Desktop Right Button */}
              <button 
                onClick={() => scrollPortfolio('right')}
                className="hidden md:flex absolute right-0 lg:right-1 top-1/2 -translate-y-1/2 z-30 p-2.5 lg:p-3 min-w-[44px] min-h-[44px] bg-[#18181b]/95 hover:bg-black border border-zinc-700/80 hover:border-[#BAFC50] text-zinc-300 hover:text-[#BAFC50] transition-all rounded-full cursor-pointer items-center justify-center shadow-xl backdrop-blur-md group"
                aria-label="Nākamais projekts"
              >
                <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Slider Track */}
              <div 
                className="overflow-hidden w-full relative touch-pan-y select-none"
                style={{ touchAction: "pan-y" }}
                onTouchStart={handlePortfolioTouchStart}
                onTouchMove={handlePortfolioTouchMove}
                onTouchEnd={handlePortfolioTouchEnd}
                onTouchCancel={handlePortfolioTouchEnd}
              >
                <div 
                  onTransitionEnd={handlePortfolioTransitionEnd}
                  className={`flex items-stretch portfolio-carousel-track ${disablePortfolioTransition ? "" : "transition-transform duration-350 ease-out"}`}
                  style={{ 
                    transform: `translateX(calc(-${portfolioIndex} * (100% / var(--visible-count))))`,
                  }}
                >
                  {[...portfolioItemsList, ...portfolioItemsList, ...portfolioItemsList].map((item, index) => (
                    <div 
                      key={`${item.id}-${index}`} 
                      className="w-full sm:w-1/2 lg:w-1/3 p-3 flex-shrink-0 flex flex-col h-full"
                    >
                      <PortfolioLaptopCard
                        title={item.title}
                        brand={item.brand}
                        displayLink={item.displayLink}
                        image={item.image}
                        link={item.link}
                        isPlaceholder={item.isPlaceholder}
                        description={item.description}
                        tags={item.tags}
                        hideStatusText={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      </LazyLoadSection>

      {/* 2C. KĀPĒC IZVĒLĒTIES MŪS */}
      <LazyLoadSection>
        <section 
          className="py-10 md:py-14 bg-transparent overflow-visible relative z-10"
        >
          {/* Ambient Organic Green Glow at section start */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[400px] -rotate-6 rounded-[50%_50%_60%_40%] bg-gradient-to-r from-[#BAFC50]/[0.15] via-[#38b000]/[0.08] to-transparent blur-[170px] pointer-events-none z-0 transform-gpu" />

          <div className="px-4 sm:px-6 md:px-10 lg:px-12 w-full max-w-[1380px] mx-auto space-y-10 relative z-10">
            {/* SECTION 2: Kāpēc izvēlēties mūs & Kāpēc uzņēmumi izvēlas mūsu pakalpojumus? */}
            <div className="space-y-10">
              <div className="text-center space-y-3 max-w-3xl mx-auto flex flex-col items-center">
                <ValueGrowthIconAnimation className="mb-2" />
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{lang === 'EN' ? "What You Will Get" : lang === 'RU' ? "Что вы получите" : "Ko Jūs iegūsiet"}</span>
                </div>
                <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed pt-1">
                  {lang === 'EN' 
                    ? "Our goal is not just to build a website. We create a digital solution that strengthens company image, attracts new clients and grows with your business."
                    : lang === 'RU' 
                      ? "Наша цель — не просто создать сайт. Мы создаем цифровое решение, которое укрепляет имидж, привлекает новых клиентов и растет вместе с бизнесом."
                      : "Mūsu mērķis nav vienkārši izveidot mājaslapu. Mēs radām digitālu risinājumu, kas stiprina uzņēmuma tēlu, palīdz piesaistīt jaunus klientus un aug kopā ar biznesu."}
                </p>
              </div>

              {/* Solution Bullet List - 6 Uniform Bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 text-left max-w-6xl mx-auto pt-4">
                {/* Bullet 1 - Skaidra biznesa stratēģija */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="p-3 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm">
                    <Target className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-white text-lg sm:text-xl uppercase tracking-wide">
                      {lang === 'EN' ? "Clear Strategy" : lang === 'RU' ? "Четкая стратегия" : "Skaidra stratēģija"}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                      {lang === 'EN' 
                        ? "Every project is created with a specific goal — to help your company grow, strengthen customer trust, and increase demand for your products or services." 
                        : lang === 'RU' 
                          ? "Каждый проект создается с конкретной целью — помочь вашей компании расти, укрепить доверие клиентов и увеличить спрос на ваши продукты или услуги." 
                          : "Katrs projekts tiek veidots ar konkrētu mērķi — palīdzēt Jūsu uzņēmumam augt, stiprināt klientu uzticību un palielināt pieprasījumu pēc Jūsu produktiem vai pakalpojumiem."}
                    </p>
                  </div>
                </div>

                {/* Bullet 2 - Individuāla pieeja */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="p-3 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm">
                    <Settings className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-white text-lg sm:text-xl uppercase tracking-wide">
                      {lang === 'EN' ? "Individual Approach" : lang === 'RU' ? "Индивидуальный подход" : "Individuāla pieeja"}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                      {lang === 'EN' 
                        ? "Every client is unique, so we tailor website content and digital solutions individually to each business, aligned with industry, goals, and needs." 
                        : lang === 'RU' 
                          ? "Каждый клиент уникален, поэтому мы адаптируем контент и цифровые решения индивидуально, в соответствии с отраслью, целями и потребностями." 
                          : "Katrs klients ir unikāls, tāpēc mājaslapas saturu un digitālos risinājumus mēs pielāgojam katram individuāli, atbilstoši darbības nozarei, mērķiem un vajadzībām."}
                    </p>
                  </div>
                </div>

                {/* Bullet 3 - Mūsdienīgi risinājumi */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="p-3 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-white text-lg sm:text-xl uppercase tracking-wide">
                      {lang === 'EN' ? "Modern Solutions" : lang === 'RU' ? "Современные решения" : "Mūsdienīgi risinājumi"}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                      {lang === 'EN' 
                        ? "We work with modern technologies and AI tools to ensure the website is fast, responsive, intuitive, and easy to use on any device." 
                        : lang === 'RU' 
                          ? "Мы работаем с современными технологиями и ИИ-инструментами, чтобы сайт был быстрым, адаптивным, интуитивным и удобным на любом устройстве." 
                          : "Mēs strādājam ar mūsdienīgām tehnoloģijām un MI rīkiem, lai mājaslapa būtu ātra, responsīva, intuitīva, viegli pārskatāma un ērti lietojama jebkurā ierīcē."}
                    </p>
                  </div>
                </div>

                {/* Bullet 4 - Ilgtermiņa sadarbība */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="p-3 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-white text-lg sm:text-xl uppercase tracking-wide">
                      {lang === 'EN' ? "Long-term Partnership" : lang === 'RU' ? "Долгосрочное сотрудничество" : "Ilgtermiņa sadarbība"}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                      {lang === 'EN' 
                        ? "We don't just build websites that attract new clients — we can also maintain them long-term and adapt them to company growth and market changes." 
                        : lang === 'RU' 
                          ? "Мы не только разрабатываем сайт, привлекающий новых клиентов, но и поддерживаем его в долгосрочной перспективе." 
                          : "Mēs ne tikai izstrādājam mājaslapu, kas piesaista jaunus klientus, bet varam arī uzturēt to ilgtermiņā, un pielāgot uzņēmuma izaugsmei un mainīgajai tirgus situācijai."}
                    </p>
                  </div>
                </div>

                {/* Bullet 5 - SEO un GEO optimizācija */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="p-3 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm">
                    <Search className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-white text-lg sm:text-xl uppercase tracking-wide">
                      {lang === 'EN' ? "SEO & GEO Optimization" : lang === 'RU' ? "SEO и GEO оптимизация" : "SEO un GEO optimizācija"}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                      {lang === 'EN' 
                        ? "Includes performance, technical SEO, and GEO (AI search agent) optimization during development to enhance visibility and achieve top rankings." 
                        : lang === 'RU' 
                          ? "Включает оптимизацию скорости, техническое SEO и GEO (ИИ-поиск) уже в процессе разработки для повышения видимости." 
                          : "Ietver ātrdarbības, tehniskā SEO un GEO optimizāciju jau mājaslapas izstrādes procesā, lai uzlabotu tās redzamību un sasniegtu labākas pozīcijas meklētājos."}
                    </p>
                  </div>
                </div>

                {/* Bullet 6 - Fokuss uz rezultātu */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="p-3 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 shadow-sm">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-white text-lg sm:text-xl uppercase tracking-wide whitespace-nowrap">
                      {lang === 'EN' ? "Focus on Results" : lang === 'RU' ? "Фокус на результат" : "Fokuss uz rezultātu"}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                      {lang === 'EN' 
                        ? "We don't create websites just for visual effect — every element is designed to capture attention, build trust, and drive potential client interest." 
                        : lang === 'RU' 
                          ? "Мы создаем сайты не только ради красивой картинки — каждый элемент продуман для привлечения внимания, доверия и интереса клиентов." 
                          : "Mēs neveidojam mājaslapas tikai vizuālam efektam — katrs elements tiek pārdomāts, lai piesaistītu uzmanību, radītu uzticību un veicinātu potenciālo klientu interesi."}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button close to Kāpēc izvēlēties mūs cards */}
              <div className="flex justify-center pt-2">
                <Link
                  to={getLocalizedPath("contact")}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#BAFC50] hover:bg-[#a6ed38] text-black font-sans font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#BAFC50]/20 hover:shadow-[#BAFC50]/40 transition-all duration-300"
                >
                  <span>{lang === 'EN' ? "Apply for consultation" : lang === 'RU' ? "Записаться на консультацию" : "Pieteikties konsultācijai"}</span>
                  <ButtonArrowAnimation />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* KĀ NOTIEK SADARBĪBA SECTION */}
      <LazyLoadSection>
        <section 
          className="py-10 md:py-14 bg-transparent px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 relative overflow-hidden z-10"
        >
          {/* Ambient Glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#BAFC50]/[0.16] via-[#38b000]/[0.10] to-transparent rounded-full blur-[160px] pointer-events-none z-0 transform-gpu" />

          <div className="w-full max-w-[1380px] mx-auto space-y-16 relative z-10">
            
            {/* Header */}
            <div className="text-center space-y-4 max-w-4xl mx-auto flex flex-col items-center">
              <WorkflowStepsAnimation className="mb-2" />
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{lang === 'EN' ? "Stages of Collaboration" : lang === 'RU' ? "Этапы сотрудничества" : "Sadarbības posmi"}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {lang === 'EN' ? "How We Work Together" : lang === 'RU' ? "Как проходит сотрудничество" : "Kā notiek sadarbība"}
              </h2>
              <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
                {lang === 'EN'
                  ? "A clear, structured, and user-friendly development process from initial idea to final result and long-term support."
                  : lang === 'RU'
                  ? "Понятный, структурированный и удобный процесс разработки от первой идеи до готового результата и поддержки."
                  : "Pārskatāms, strukturēts un lietotājam ērts izstrādes process no pirmās idejas līdz gatavam rezultātam un ilgtermiņa atbalstam."}
              </p>
            </div>

            {/* 4 Process Steps (Borderless with sleek visual details) */}
            <div className="relative">
              {/* Desktop Horizontal Connecting Accent Line */}
              <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#BAFC50]/5 via-[#BAFC50]/30 to-[#BAFC50]/5 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative z-10">
                
                {/* Step 1 */}
                <div className="group relative flex flex-col items-start space-y-4 p-2 transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#18181b]/80 border border-zinc-800 text-[#BAFC50] font-mono font-extrabold text-lg shadow-lg group-hover:border-[#BAFC50]/60 group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                      <div className="absolute inset-0 bg-[#BAFC50]/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <span className="relative z-10">01</span>
                    </div>
                    <span className="hidden lg:block text-xs font-mono text-zinc-500 group-hover:text-[#BAFC50] transition-colors uppercase tracking-widest font-semibold">
                      {lang === 'EN' ? "Stage 1" : lang === 'RU' ? "Этап 1" : "Posms 1"}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#BAFC50] transition-colors tracking-tight">
                      {lang === 'EN' ? "Initial Discussion" : lang === 'RU' ? "Первичная беседа" : "Pirmā saruna"}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                      {lang === 'EN'
                        ? "Everything starts with a conversation about your website goals, business direction, and preferences. If you have ideas regarding website structure or services, we will discuss them together to choose the best solution."
                        : lang === 'RU'
                        ? "Всё начинается с обсуждения целей вашего будущего сайта, направления бизнеса и ваших пожеланий. Если у вас уже есть идеи по структуре или разделам — отлично, мы их вместе обсудим!"
                        : "Viss sākas ar sarunu par Jūsu topošās mājaslapas mērķiem, biznesa darbības virzienu un Jūsu vēlmēm. Ja Jums jau ir savas idejas par mājaslapas struktūru, sadaļām vai piedāvātajiem pakalpojumiem - lieliski, tās tad arī kopīgi pārrunāsim, lai labāk izprastu Jūsu vajadzības un izvēlētos piemērotāko risinājumu."}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group relative flex flex-col items-start space-y-4 p-2 transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#18181b]/80 border border-zinc-800 text-[#BAFC50] font-mono font-extrabold text-lg shadow-lg group-hover:border-[#BAFC50]/60 group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                      <div className="absolute inset-0 bg-[#BAFC50]/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <span className="relative z-10">02</span>
                    </div>
                    <span className="hidden lg:block text-xs font-mono text-zinc-500 group-hover:text-[#BAFC50] transition-colors uppercase tracking-widest font-semibold">
                      {lang === 'EN' ? "Stage 2" : lang === 'RU' ? "Этап 2" : "Posms 2"}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#BAFC50] transition-colors tracking-tight">
                      {lang === 'EN' ? "Project Development" : lang === 'RU' ? "Процесс разработки" : "Projekta izstrādes process"}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                      {lang === 'EN'
                        ? "Once the concept is aligned, we begin development. In this stage, we conduct market research, competitor analysis, build the website structure and functionality, and prepare content to create a modern digital presence."
                        : lang === 'RU'
                        ? "Когда концепция сайта согласована, мы приступаем к разработке. Включает анализ рынка, конкурентов, работу над структурой, функционалом и подготовку контента."
                        : "Kad iecerētās mājaslapas koncepts ir saskaņots, mēs uzsākam tās izstrādi. Šajā posmā tiek veikta attiecīgās nozares tirgus izpēte, konkurentu analīze, mājaslapas struktūras un funkcionalitātes izstrāde, kā arī satura sagatavošana, lai radītu mūsdienīgu, pārdomātu un modernu Jūsu biznesa digitālo vizītkarti."}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group relative flex flex-col items-start space-y-4 p-2 transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#18181b]/80 border border-zinc-800 text-[#BAFC50] font-mono font-extrabold text-lg shadow-lg group-hover:border-[#BAFC50]/60 group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                      <div className="absolute inset-0 bg-[#BAFC50]/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <span className="relative z-10">03</span>
                    </div>
                    <span className="hidden lg:block text-xs font-mono text-zinc-500 group-hover:text-[#BAFC50] transition-colors uppercase tracking-widest font-semibold">
                      {lang === 'EN' ? "Stage 3" : lang === 'RU' ? "Этап 3" : "Posms 3"}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#BAFC50] transition-colors tracking-tight">
                      {lang === 'EN' ? "Approval & Handover" : lang === 'RU' ? "Согласование и сдача" : "Projekta saskaņošana un nodošana"}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                      {lang === 'EN'
                        ? "You receive a finished website draft to review and provide feedback for necessary adjustments. After applying agreed edits, the site is published on your domain and handed over to you."
                        : lang === 'RU'
                        ? "Вы получаете готовый проект сайта для проверки и комментариев. После внесения всех согласованных правок сайт публикуется на вашем домене."
                        : "Šajā posmā Jūs saņemsiet pabeigtu mājaslapas projektu, kuru varēsiet pārskatīt un iesniegt savus komentārus vai ierosinājumus par nepieciešamajiem uzlabojumiem. Pēc visu saskaņoto izmaiņu veikšanas mājaslapa tiek publicēta uz Jūsu domēna un nodota Jūsu rīcībā."}
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="group relative flex flex-col items-start space-y-4 p-2 transition-all duration-300">
                  <div className="flex items-center justify-between w-full">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#18181b]/80 border border-zinc-800 text-[#BAFC50] font-mono font-extrabold text-lg shadow-lg group-hover:border-[#BAFC50]/60 group-hover:bg-[#BAFC50] group-hover:text-black transition-all duration-300">
                      <div className="absolute inset-0 bg-[#BAFC50]/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <span className="relative z-10">04</span>
                    </div>
                    <span className="hidden lg:block text-xs font-mono text-zinc-500 group-hover:text-[#BAFC50] transition-colors uppercase tracking-widest font-semibold">
                      {lang === 'EN' ? "Stage 4" : lang === 'RU' ? "Этап 4" : "Posms 4"}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#BAFC50] transition-colors tracking-tight">
                      {lang === 'EN' ? "Support & Maintenance" : lang === 'RU' ? "Поддержка и обслуживание" : "Tehniskais atbalsts un uzturēšana"}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                      {lang === 'EN'
                        ? "After launch, we can continue providing technical support, maintenance, content updates, and feature additions tailored to your company's growing needs."
                        : lang === 'RU'
                        ? "После сдачи сайта мы можем продолжить техническую поддержку, обновление контента и добавление новых функций по мере роста вашей компании."
                        : "Pēc mājaslapas nodošanas nepieciešamības gadījumā mēs varam turpināt nodrošināt mājaslapas tehnisko atbalstu un uzturēšanu, kā arī veikt nepieciešamos satura atjauninājumus, funkcionalitātes izmaiņas un citus papildinājumus, atbilstoši Jūsu uzņēmuma vajadzībām."}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      </LazyLoadSection>

      {/* 5. BUJ / FAQ: Preview Block */}
      <LazyLoadSection>
        <section 
          className="py-10 md:py-14 bg-transparent px-6 md:px-12 relative overflow-visible text-left z-10"
        >
          {/* Ambient Formless Organic Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[950px] h-[450px] -rotate-6 rounded-[50%_50%_60%_40%] bg-gradient-to-r from-[#BAFC50]/[0.15] via-[#38b000]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
          <div className="absolute -bottom-52 -left-24 w-[750px] h-[450px] rotate-12 rounded-[60%_40%_50%_50%] bg-gradient-to-br from-[#38b000]/[0.14] via-[#BAFC50]/[0.07] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />

          <div className="w-full max-w-5xl xl:max-w-6xl mx-auto space-y-10 relative z-10">
            
            <div className="text-center space-y-3 flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {lang === 'EN' ? "Frequently Asked Questions" : lang === 'RU' ? "Часто задаваемые вопросы" : "Biežāk uzdotie jautājumi"}
              </h2>
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
                {lang === 'EN' 
                  ? "Didn't find the answer to your question? Feel free to contact us, call or write, and we will answer all your questions." 
                  : lang === 'RU' 
                  ? "Не нашли ответ на свой вопрос? Свяжитесь с нами, позвоните или напишите, и мы ответим на все вопросы." 
                  : "Neatradi atbildi uz savu jautājumu? Droši sazinieties ar mums, zvaniet vai rakstiet, un mēs atbildēsim uz visiem Jūsu jautājumiem."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <CtaButton text={lang === 'EN' ? "Read Other FAQs" : lang === 'RU' ? "Все вопросы" : "Lasīt citus BUJ"} to={getLocalizedPath('faq')} />
                <CtaButton text={lang === 'EN' ? "Ask Your Question" : lang === 'RU' ? "Задать вопрос" : "Uzdod savu jautājumu"} to={getLocalizedPath('contact')} />
              </div>
            </div>

          </div>
        </section>
      </LazyLoadSection>

      {/* 6. BLOGS: Preview Block */}
      <LazyLoadSection>
        <section 
          className="py-10 md:py-14 bg-transparent px-6 md:px-12 relative overflow-visible z-10"
        >
          {/* Ambient Formless Organic Green Glows Bleeding Seamlessly Across Sections */}
          <div className="absolute -top-32 -right-36 w-[850px] h-[500px] -rotate-12 rounded-[45%_55%_65%_35%] bg-gradient-to-bl from-[#BAFC50]/[0.15] via-[#38b000]/[0.08] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />
          <div className="absolute -bottom-52 -left-24 w-[800px] h-[500px] rotate-12 rounded-[55%_45%_35%_65%] bg-gradient-to-tr from-[#38b000]/[0.14] via-[#BAFC50]/[0.07] to-transparent blur-[180px] pointer-events-none z-0 transform-gpu" />

          <div className="w-full max-w-[1380px] mx-auto space-y-8 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 px-3">
              <div className="space-y-2 text-left relative sm:left-[1.3cm]">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  {lang === 'EN' ? "Useful Articles & Insights" : lang === 'RU' ? "Полезная информация" : "Noderīga informācija"}
                </h2>
              </div>

              {/* Action buttons on top right: Mobile swipe indicator + Lasīt blogu button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <SwipeHintAnimation lang={lang} />
                <CtaButton
                  text={lang === 'EN' ? "Read Blog" : lang === 'RU' ? "Читать блог" : "Lasīt blogu"}
                  to={getLocalizedPath('blog')}
                />
              </div>
            </div>

            {/* State-controlled Infinite Carousel Slider Container */}
            <div className="relative w-full md:px-14 lg:px-16">
              {/* Desktop Left Button */}
              <button 
                onClick={() => scrollBlog('left')}
                className="hidden md:flex absolute left-0 lg:left-1 top-1/2 -translate-y-1/2 z-30 p-2.5 lg:p-3 min-w-[44px] min-h-[44px] bg-[#18181b]/95 hover:bg-black border border-zinc-700/80 hover:border-[#BAFC50] text-zinc-300 hover:text-[#BAFC50] transition-all rounded-full cursor-pointer items-center justify-center shadow-xl backdrop-blur-md group"
                aria-label="Iepriekšējais raksts"
              >
                <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Desktop Right Button */}
              <button 
                onClick={() => scrollBlog('right')}
                className="hidden md:flex absolute right-0 lg:right-1 top-1/2 -translate-y-1/2 z-30 p-2.5 lg:p-3 min-w-[44px] min-h-[44px] bg-[#18181b]/95 hover:bg-black border border-zinc-700/80 hover:border-[#BAFC50] text-zinc-300 hover:text-[#BAFC50] transition-all rounded-full cursor-pointer items-center justify-center shadow-xl backdrop-blur-md group"
                aria-label="Nākamais raksts"
              >
                <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div 
                className="overflow-hidden w-full relative touch-pan-y select-none"
                style={{ touchAction: "pan-y" }}
                onTouchStart={handleBlogTouchStart}
                onTouchMove={handleBlogTouchMove}
                onTouchEnd={handleBlogTouchEnd}
                onTouchCancel={handleBlogTouchEnd}
              >
                <div 
                  onTransitionEnd={handleTransitionEnd}
                  className={`flex blog-carousel-track ${disableTransition ? "" : "transition-transform duration-350 ease-out"}`}
                  style={{ 
                    transform: `translateX(calc(-${activeIndex} * (100% / var(--visible-count))))`,
                  }}
                >
                  {[...blogPostsList, ...blogPostsList, ...blogPostsList, ...blogPostsList, ...blogPostsList].map((post, index) => (
                    <div 
                      key={`${post.id}-${index}`} 
                      className="w-full sm:w-1/2 lg:w-1/4 p-3 flex-shrink-0 flex"
                    >
                      <Link
                        to={`${getLocalizedPath('blog')}?id=${post.id}`}
                        className="w-full bg-[#18181b] border border-zinc-800 p-5 overflow-hidden shadow-md hover:shadow-xl hover:border-[#BAFC50]/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer rounded-2xl"
                      >
                        <div className="space-y-3">
                          {post.image && (
                            <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover select-none"
                                loading="eager"
                                decoding="async"
                              />
                            </div>
                          )}
                          <h3 className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-[#BAFC50] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-zinc-800/80 mt-4 text-[10px] font-bold text-[#BAFC50] uppercase tracking-wider flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            {lang === 'EN' ? "Read article" : lang === 'RU' ? "Читать статью" : "Lasīt rakstu"} <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazyLoadSection>

      {/* 7. KONTAKTI & SAZIŅAS FORMA */}
      <LazyLoadSection>
        <ContactForm 
          title={
            lang === 'EN' ? (
              <>
                Request Website Development, <br className="hidden sm:inline" />
                Free Existing Website Audit, or Consultation
              </>
            ) : lang === 'RU' ? (
              <>
                Заказать разработку сайта, <br className="hidden sm:inline" />
                бесплатный аудит существующего сайта или консультацию
              </>
            ) : (
              <>
                Pieteikt mājaslapas izstrādi, bezmaksas esošās <br />
                mājaslapas auditu vai konsultāciju
              </>
            )
          } 
          subtitle=""
        />
      </LazyLoadSection>

    </div>
  );
}
