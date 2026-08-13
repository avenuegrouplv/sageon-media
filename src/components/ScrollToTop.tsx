import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const { pathname } = useLocation();
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

  // Automatically scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [pathname]);

  const scrollToTop = () => {
    try {
      const topEl = document.getElementById("top-anchor");
      if (topEl) {
        topEl.scrollIntoView({ behavior: "smooth", block: "start" });
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
      const rootEl = document.getElementById("root");
      if (rootEl) {
        rootEl.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    } catch (e) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Naviģēt uz lapas augšdaļu"
      title="Uz augšu"
      className={`fixed right-6 z-[10000] w-12 h-12 rounded-full bg-[#BAFC50] text-black shadow-xl flex items-center justify-center cursor-pointer border border-black/10 transition-all duration-300 ${
        isCookieBannerVisible ? "bottom-[142px] sm:bottom-[92px]" : "bottom-6"
      }`}
    >
      <ArrowUp className="h-5 w-5 stroke-[2.8]" />
    </button>
  );
}
