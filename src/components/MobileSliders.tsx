import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Check, ArrowRight } from "lucide-react";
import PortfolioLaptopCard from "./PortfolioLaptopCard";

interface PricingPlan {
  badge: string;
  title: string;
  subtitle: string;
  originalPrice?: string;
  price?: string;
  pricePrefix?: string;
  period: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

interface PortfolioItem {
  id: number;
  title: string;
  brand: string;
  displayLink: string;
  image: string;
  description: string;
  link: string;
  isPlaceholder?: boolean;
  tags?: string[];
}

interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  date?: string;
  readTime?: string;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

// 1. CENU KARTIŅU SLIDESHOW MOBILAJĀM IERĪCĒM
export function PricingMobileSlider({ 
  plans, 
  servicesPath,
  lang 
}: { 
  plans: PricingPlan[]; 
  servicesPath: string;
  lang: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const touchCurrentY = useRef<number | null>(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % plans.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  useEffect(() => {
    if (cardRef.current) {
      const h = cardRef.current.offsetHeight;
      if (h > 0 && h > maxHeight) {
        setMaxHeight(h);
      }
    }
  }, [currentIndex, maxHeight]);

  useEffect(() => {
    if (isPaused || plans.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % plans.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [isPaused, plans.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
      setIsPaused(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const endX = e?.changedTouches?.[0]?.clientX ?? touchCurrentX.current ?? touchStartX.current;
      const endY = e?.changedTouches?.[0]?.clientY ?? touchCurrentY.current ?? (touchStartY.current ?? 0);
      const diffX = touchStartX.current - endX;
      const diffY = (touchStartY.current ?? endY) - endY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
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

  const plan = plans[currentIndex];
  if (!plan) return null;
  const isBestChoice = plan.badge === "Labākā izvēle biznesam" || plan.badge === "Best choice for business" || plan.badge === "Лучший выбор для бизнеса";
  const isUzturesana = plan.title.toLowerCase().includes("uzturēšan") || plan.title.toLowerCase().includes("maintenance") || plan.title.toLowerCase().includes("поддержк") || currentIndex === 3;

  return (
    <div className="sm:hidden w-full relative px-0 py-1 mb-2">
      <div 
        className="relative overflow-hidden w-full select-none touch-pan-y min-h-[800px]"
        style={{ touchAction: "pan-y pinch-zoom" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="w-full transform-gpu will-change-transform h-full"
          >
            <div 
              ref={cardRef}
              className="bg-[#18181b] border-2 border-zinc-800 hover:border-[#BAFC50] transition-all duration-500 flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl group relative overflow-visible cursor-pointer scroll-mt-28 h-full min-h-[800px]"
            >
              <div className="flex flex-col flex-1">
                {/* Header Section */}
                <div className="p-6 border-b border-zinc-800 text-left space-y-3 relative h-[calc(220px+2mm)] sm:h-[calc(240px+3.2mm)] min-h-[calc(220px+2mm)] sm:min-h-[calc(240px+3.2mm)] flex flex-col justify-between overflow-visible">
                  <div>
                    <div className="flex items-center justify-between min-h-[26px]">
                      <span className={`px-2.5 py-1 font-sans text-xs uppercase tracking-wider font-bold rounded-lg ${
                        isBestChoice 
                          ? "bg-[#BAFC50] text-black font-extrabold shadow-sm" 
                          : "bg-zinc-800 text-zinc-200 border border-zinc-700/60"
                      }`}>
                        {isBestChoice ? "★ " : ""}{plan.badge}
                      </span>
                    </div>
                    
                    <div className="space-y-1 mt-2 min-h-[calc(48px+2mm)] sm:min-h-[calc(52px+2mm)] flex flex-col justify-start items-start">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-white leading-tight">{plan.title}</h3>
                      <p className="text-xs sm:text-sm font-normal text-zinc-300 py-[1mm] leading-normal select-text cursor-text">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Highly visible high-contrast pricing tag container with payment term placed underneath */}
                  <div className="pt-7 pb-1 mt-2 border-l-4 border-[#BAFC50] pl-3.5 min-h-[68px] sm:min-h-[calc(72px+1.2mm)] flex flex-col justify-center relative overflow-visible">
                    {plan.originalPrice ? (
                      <div className="relative w-full overflow-visible">
                        {/* New price positioned ~1mm directly above the white price */}
                        <div className="absolute -top-[calc(1.4rem+1mm)] sm:-top-[calc(1.5rem+1mm)] left-[1.2cm] sm:left-[2cm] flex items-center text-[#BAFC50] font-black z-20">
                          <span className="text-2xl sm:text-3xl lg:text-3xl font-black tracking-tight text-[#BAFC50]">{plan.price}</span>
                        </div>
                        {/* Struck-through old price in white */}
                        <div className="flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-black text-[#BAFC50] shrink-0">€</span>
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white line-through decoration-red-500 decoration-2 sm:decoration-[3px] shrink-0">
                            {plan.originalPrice}
                          </span>
                        </div>
                        {/* Subtitle / Payment period placed under the white price */}
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold font-sans text-zinc-300 mt-1 whitespace-nowrap">
                          / {plan.period}
                        </div>
                      </div>
                    ) : plan.price ? (
                      <div className="relative w-full overflow-visible">
                        <div className="flex items-baseline gap-1">
                          {plan.pricePrefix && (
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#BAFC50] mr-0.5 shrink-0">
                              {plan.pricePrefix}
                            </span>
                          )}
                          <span className="text-base sm:text-lg font-black text-[#BAFC50] shrink-0">€</span>
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white shrink-0">{plan.price}</span>
                        </div>
                        {/* Subtitle / Payment period placed under the white price */}
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold font-sans text-zinc-300 mt-1 whitespace-nowrap">
                          / {plan.period}
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full overflow-visible">
                        <span className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-wider font-sans text-[#BAFC50] block">
                          {plan.period}
                        </span>
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold font-sans text-zinc-400 mt-1 whitespace-nowrap">
                          / individuāls risinājums
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features List with uniform height across all plans including Uzturēšana */}
                <ul className="p-4 sm:px-6 pt-1.5 pb-0 sm:pt-2 sm:pb-0 space-y-1 sm:space-y-1.5 text-left text-xs sm:text-sm text-zinc-200 font-normal min-h-[470px] flex-1">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5">
                      <div className="p-0.5 bg-[#BAFC50]/20 text-[#BAFC50] mt-0.5 shrink-0 rounded-sm">
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button directly below bullet points with exact 0.5cm gap and 1.3mm bottom margin */}
              <div className="p-4 sm:px-6 pt-[0.5cm] pb-[1.3mm] sm:pt-[0.5cm] sm:pb-[1.3mm] mt-auto">
                <Link
                  to={servicesPath}
                  className={`w-full py-3.5 px-4 font-bold tracking-wider text-sm uppercase transition-all duration-300 rounded-full text-center block cursor-pointer shadow-sm hover:shadow-md ${
                    plan.highlight
                      ? "bg-[#BAFC50] hover:bg-[#a8f235] text-black font-extrabold"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white hover:text-[#BAFC50]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-3 px-1 relative z-20">
        {/* Left: Indicator dots positioned tightly next to each other */}
        <div className="flex items-center gap-0.5">
          {plans.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3500);
              }}
              aria-label={`Pāriet uz ${idx + 1}. cenu plānu`}
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              prevSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3500);
            }}
            aria-label="Iepriekšējais plāns"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              nextSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3500);
            }}
            aria-label="Nākamais plāns"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. PORTFOLIO KARTIŅU SLIDESHOW MOBILAJĀM IERĪCĒM
export function PortfolioMobileSlider({ 
  items 
}: { 
  items: PortfolioItem[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const touchCurrentY = useRef<number | null>(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
      setIsPaused(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const endX = e?.changedTouches?.[0]?.clientX ?? touchCurrentX.current ?? touchStartX.current;
      const endY = e?.changedTouches?.[0]?.clientY ?? touchCurrentY.current ?? (touchStartY.current ?? 0);
      const diffX = touchStartX.current - endX;
      const diffY = (touchStartY.current ?? endY) - endY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
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

  const item = items[currentIndex];
  if (!item) return null;

  return (
    <div className="sm:hidden w-full relative px-1 py-1 mb-2">
      <div 
        className="relative overflow-hidden w-full select-none touch-pan-y min-h-[500px]"
        style={{ touchAction: "pan-y pinch-zoom" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="w-full transform-gpu will-change-transform h-full"
          >
            <div className="w-full flex flex-col h-full min-h-[500px]">
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-3 px-1 relative z-20">
        {/* Left: Indicator dots positioned tightly next to each other */}
        <div className="flex items-center gap-0.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3500);
              }}
              aria-label={`Pāriet uz ${idx + 1}. projektu`}
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              prevSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3500);
            }}
            aria-label="Iepriekšējais projekts"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              nextSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3500);
            }}
            aria-label="Nākamais projekts"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. BLOGA / NODERĪGĀS INFORMĀCIJAS KARTIŅU SLIDESHOW MOBILAJĀM IERĪCĒM
export function BlogMobileSlider({ 
  posts,
  blogPath,
  lang
}: { 
  posts: BlogPost[];
  blogPath: string;
  lang: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const touchCurrentY = useRef<number | null>(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  useEffect(() => {
    if (isPaused || posts.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [isPaused, posts.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
      setIsPaused(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e?.touches?.[0] || e?.targetTouches?.[0];
    if (touch) {
      touchCurrentX.current = touch.clientX;
      touchCurrentY.current = touch.clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const endX = e?.changedTouches?.[0]?.clientX ?? touchCurrentX.current ?? touchStartX.current;
      const endY = e?.changedTouches?.[0]?.clientY ?? touchCurrentY.current ?? (touchStartY.current ?? 0);
      const diffX = touchStartX.current - endX;
      const diffY = (touchStartY.current ?? endY) - endY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
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

  const post = posts[currentIndex];
  if (!post) return null;

  return (
    <div className="sm:hidden w-full relative px-1 py-1 mb-2">
      <div 
        className="relative overflow-hidden w-full select-none touch-pan-y min-h-[calc(385px+2mm)]"
        style={{ touchAction: "pan-y pinch-zoom" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="w-full transform-gpu will-change-transform h-full"
          >
            <Link
              to={`${blogPath}?id=${post.id}`}
              className="w-full bg-[#18181b] border border-zinc-800 p-4 sm:p-5 pb-[calc(1rem+2.2mm)] sm:pb-[calc(1.25rem+2.2mm)] overflow-hidden shadow-xl rounded-2xl flex flex-col justify-between h-[calc(375px+2mm)] min-h-[calc(375px+2mm)] card-gpu"
            >
              <div className="space-y-2.5">
                {post.image && (
                  <div className="w-full aspect-[16/9] overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover select-none"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight leading-snug line-clamp-3 h-[3.45rem] min-h-[3.45rem] block">
                  {post.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3 h-[calc(3.45rem+2mm)] min-h-[calc(3.45rem+2mm)] block">
                  {post.excerpt}
                </p>
              </div>
              <div className="pt-2.5 border-t border-zinc-800/80 mt-2.5 text-[10px] font-bold text-[#BAFC50] uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1">
                  {lang === 'EN' ? "Read article" : lang === 'RU' ? "Читать статью" : "Lasīt rakstu"} <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-3 px-1 relative z-20">
        {/* Left: Indicator dots positioned tightly next to each other */}
        <div className="flex items-center gap-0.5">
          {posts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3500);
              }}
              aria-label={`Pāriet uz ${idx + 1}. rakstu`}
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              prevSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3500);
            }}
            aria-label="Iepriekšējais raksts"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              nextSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3500);
            }}
            aria-label="Nākamais raksts"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
