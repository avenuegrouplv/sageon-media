import { useEffect, useState, useCallback, type MouseEvent, type TouchEvent } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
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

  // Automatically scroll to top on route change (unless there is a hash target)
  useEffect(() => {
    if (!hash) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "instant"
        });
      }
    }
  }, [pathname, hash]);

  const scrollToTop = useCallback((e?: MouseEvent | TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: false, duration: 0.9 });
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      if (document.documentElement) {
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      if (document.body) {
        document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      if (document.scrollingElement) {
        document.scrollingElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={scrollToTop}
          onTouchEnd={scrollToTop}
          aria-label="Naviģēt uz lapas augšdaļu"
          title="Uz augšu"
          className={`fixed right-4 sm:right-6 z-[9990] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#BAFC50] hover:bg-[#a8f235] text-black shadow-lg shadow-black/40 flex items-center justify-center cursor-pointer border border-black/10 transition-colors duration-150 touch-manipulation ${
            isCookieBannerVisible ? "bottom-[180px] sm:bottom-[100px]" : "bottom-5 sm:bottom-6"
          }`}
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3] text-black" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
