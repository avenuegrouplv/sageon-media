import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUp, Home } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function PageNavButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, getLocalizedPath } = useLanguage();

  const handleScrollToTop = () => {
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

  const homePath = getLocalizedPath("home");

  const handleGoHome = () => {
    if (location.pathname === homePath) {
      handleScrollToTop();
    } else {
      navigate(homePath);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }
  };

  const upText = lang === "LV" ? "Uz augšu" : lang === "EN" ? "To top" : "Наверх";
  const homeText = lang === "LV" ? "Uz sākumu" : lang === "EN" ? "Home" : "На главную";

  return (
    <div className="flex justify-center items-center gap-4 py-8 border-t border-slate-200/40 dark:border-slate-800/20 my-10 max-w-xl mx-auto">
      {/* Uz augšu */}
      <button
        onClick={handleScrollToTop}
        className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 cursor-pointer transition-all duration-200 rounded-xl shadow-sm hover:shadow-md"
      >
        <ArrowUp className="h-3.5 w-3.5" />
        {upText}
      </button>

      {/* Uz sākumu */}
      <button
        onClick={handleGoHome}
        className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-transparent hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 cursor-pointer transition-all duration-200 rounded-xl shadow-sm hover:shadow-md"
      >
        <Home className="h-3.5 w-3.5" />
        {homeText}
      </button>
    </div>
  );
}
