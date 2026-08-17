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

  return (
    <div className="sm:hidden w-full relative px-1 py-1 mb-2">
      <div 
        className="relative overflow-hidden w-full select-none touch-pan-y min-h-[745px]"
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
            <div className="bg-[#18181b] border-2 border-zinc-800 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden card-gpu h-[735px] min-h-[735px]">
              <div>
                {/* Header Section */}
                <div className="p-4 sm:p-5 border-b border-zinc-800/80 text-left space-y-2.5 relative overflow-visible">
                  <div className="flex items-center justify-between min-h-[26px]">
                    <span className={`px-2.5 py-1 font-sans text-xs uppercase tracking-wider font-bold rounded-lg ${
                      isBestChoice 
                        ? "bg-[#BAFC50] text-black font-extrabold shadow-sm" 
                        : "bg-zinc-800 text-zinc-200 border border-zinc-700/60"
                    }`}>
                      {isBestChoice ? "★ " : ""}{plan.badge}
                    </span>
                  </div>
                  
                  <div className="space-y-1 h-[54px] min-h-[54px] flex flex-col justify-start items-start pt-0.5">
                    <h3 className="text-xl font-bold tracking-tight uppercase text-white leading-tight">{plan.title}</h3>
                    <p className="text-xs font-normal text-zinc-300 line-clamp-2">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Highly visible pricing tag */}
                  <div className="pt-9 pb-2 mt-5 border-l-4 border-[#BAFC50] pl-3.5 min-h-[72px] flex items-center relative overflow-visible">
                    {plan.originalPrice ? (
                      <div className="flex items-center relative">
                        {/* New price positioned directly above the old price */}
                        <div className="absolute -top-8 left-9 flex items-center gap-0.5 text-[#BAFC50] font-black z-20">
                          <span className="text-lg font-black text-[#BAFC50]">€</span>
                          <span className="text-4xl font-black tracking-tight text-[#BAFC50]">{plan.price}</span>
                        </div>
                        {/* Struck-through old price */}
                        <span className="text-lg font-black text-[#BAFC50]">€</span>
                        <span className="text-4xl font-black tracking-tight text-white line-through decoration-red-500 decoration-2">
                          {plan.originalPrice}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold font-sans ml-1.5 text-zinc-300">
                          / {plan.period}
                        </span>
                      </div>
                    ) : plan.price ? (
                      <div className="flex items-baseline gap-1">
                        {plan.pricePrefix && (
                          <span className="text-xs font-bold uppercase tracking-wider text-[#BAFC50] mr-0.5">
                            {plan.pricePrefix}
                          </span>
                        )}
                        <span className="text-lg font-black text-[#BAFC50]">€</span>
                        <span className="text-4xl font-black tracking-tight text-white">{plan.price}</span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold font-sans ml-1 text-zinc-300">
                          / {plan.period}
                        </span>
                      </div>
                    ) : (
                      <span className="text-base font-extrabold uppercase tracking-wider font-sans text-[#BAFC50] self-center">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="p-4 sm:p-5 space-y-2 text-left text-xs text-zinc-200 font-normal">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <div className="p-0.5 bg-[#BAFC50]/20 text-[#BAFC50] mt-0.5 shrink-0 rounded-sm">
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="p-4 sm:p-5 pt-2 pb-[1.2mm]">
                <Link
                  to={servicesPath}
                  className={`w-full py-3 px-4 font-bold tracking-wider text-xs uppercase transition-all duration-300 rounded-full text-center block shadow-sm ${
                    plan.highlight
                      ? "bg-[#BAFC50] text-black shadow-lg shadow-[#BAFC50]/20 font-extrabold"
                      : "bg-zinc-800 text-white"
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
        className="relative overflow-hidden w-full select-none touch-pan-y"
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
            className="w-full transform-gpu will-change-transform"
          >
            <div className="w-full flex flex-col">
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
        className="relative overflow-hidden w-full select-none touch-pan-y min-h-[380px]"
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
              className="w-full bg-[#18181b] border border-zinc-800 p-4 sm:p-5 pb-[calc(1rem+2.2mm)] sm:pb-[calc(1.25rem+2.2mm)] overflow-hidden shadow-xl rounded-2xl flex flex-col justify-between h-[370px] min-h-[370px] card-gpu"
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
                <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3 h-[3.25rem] min-h-[3.25rem] block">
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
      <div className="flex items-center justify-between pt-2 px-1 relative z-20">
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
