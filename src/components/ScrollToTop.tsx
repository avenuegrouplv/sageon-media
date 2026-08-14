import { useEffect, useState, useCallback, type MouseEvent, type TouchEvent } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);

  // Check cookie banner visibility
  useEffect(() => {
    const handleToggle = (e: CustomEvent<{ isVisible: boolean }> | Event) => {
      const customEv = e as CustomEvent<{ isVisible: boolean }>;
      if (customEv.detail && typeof customEv.detail.isVisible === "boolean") {
        setIsCookieBannerVisible(customEv.detail.isVisible);
      } else {
        setIsCookieBannerVisible(document.documentElement.dataset.cookieBanner === "true");
      }
    };

    setIsCookieBannerVisible(document.documentElement.dataset.cookieBanner === "true");
    window.addEventListener("cookieBannerToggle", handleToggle as EventListener);
    return () => {
      window.removeEventListener("cookieBannerToggle", handleToggle as EventListener);
    };
  }, []);

  // Track scroll position to show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      setIsVisible(scrollPos > 160);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Automatically scroll to top on route change
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    }
  }, [pathname]);

  const scrollToTop = useCallback((e?: MouseEvent | TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.15 });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          onTouchEnd={scrollToTop}
          aria-label="Naviģēt uz lapas augšdaļu"
          title="Uz augšu"
          className={`fixed right-4 sm:right-6 z-[9990] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#BAFC50] text-black shadow-[0_4px_25px_rgba(186,252,80,0.5)] flex items-center justify-center cursor-pointer border-2 border-black/10 hover:scale-105 active:scale-90 transition-transform duration-200 touch-manipulation group ${
            isCookieBannerVisible ? "bottom-[180px] sm:bottom-[100px]" : "bottom-5 sm:bottom-6"
          }`}
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3] text-black group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
