import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Phone, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { Language, PageKey } from "../i18n/types";
import ResponsiveImage from "./ResponsiveImage";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const { lang, t, switchLanguage, getLocalizedPath } = useLanguage();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Track scroll position to toggle header style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollPos > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setIsOpen(false);
    setLangDropdownOpen(false);
  }, [location.pathname]);

  const navLinks: { key: PageKey; name: string; path: string }[] = [
    { key: "home", name: t.nav.home, path: getLocalizedPath("home") },
    { key: "portfolio", name: t.nav.portfolio, path: getLocalizedPath("portfolio") },
    { key: "services", name: t.nav.services, path: getLocalizedPath("services") },
    { key: "faq", name: t.nav.faq, path: getLocalizedPath("faq") },
    { key: "blog", name: t.nav.blog, path: getLocalizedPath("blog") },
    { key: "contact", name: t.nav.contact, path: getLocalizedPath("contact") },
  ];

  const handleSelectLanguage = (targetLang: Language) => {
    switchLanguage(targetLang);
    setLangDropdownOpen(false);
    setIsOpen(false);
  };

  const langDisplayCode = lang === "LV" ? "LV" : lang === "EN" ? "EN" : "RU";

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 py-2.5 sm:py-3 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-zinc-800/60 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
      >
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex justify-between items-center relative">
          
          {/* LOGO AREA */}
          <Link 
            to={getLocalizedPath("home")} 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="relative flex items-center justify-center w-[180px] h-[58px] sm:w-[200px] sm:h-[70px] md:w-[230px] md:h-[84px] bg-transparent">
              {/* Colored Original Logo */}
              <ResponsiveImage 
                src="/Logo-new.webp" 
                alt="Sageon Media Logo" 
                widths={[240, 480, 800]}
                sizes="230px"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                width={230}
                height={84}
                className="w-full h-full object-contain rounded-none" 
              />
            </div>
          </Link>

          {/* CENTERED DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.key}>
                    <Link
                      to={link.path}
                      className={`font-business text-[13.8px] font-normal tracking-widest uppercase transition-colors relative py-1 ${
                        isActive
                          ? "text-[#BAFC50] font-medium"
                          : "text-slate-200/80 hover:text-[#BAFC50]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT AREA: LANGUAGE DROPDOWN (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2.5 px-4.5 py-2 bg-[#18181b]/90 hover:bg-zinc-800 border border-[#BAFC50]/50 hover:border-[#BAFC50] text-[#BAFC50] text-sm font-bold tracking-wider uppercase rounded-full transition-all duration-300 shadow-md cursor-pointer hover:shadow-[#BAFC50]/15"
              >
                <Globe className="h-4.5 w-4.5 text-[#BAFC50]" />
                <span className="text-sm tracking-widest">{langDisplayCode}</span>
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center border border-[#BAFC50]/40 ml-0.5">
                  <ChevronDown className={`h-3.5 w-3.5 text-[#BAFC50] transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
                </div>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#18181b] border border-[#BAFC50]/40 shadow-2xl py-1.5 z-50 rounded-2xl overflow-hidden backdrop-blur-xl">
                  {([
                    { code: "LV" as Language, label: "Latviešu" },
                    { code: "EN" as Language, label: "English" },
                    { code: "RU" as Language, label: "Русский" },
                  ]).map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleSelectLanguage(item.code)}
                      className={`w-full text-left px-4 py-2.5 font-sans text-xs sm:text-sm font-bold tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-between ${
                        lang === item.code ? "text-[#BAFC50]" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {lang === item.code && <span className="w-2 h-2 rounded-full bg-[#BAFC50]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MOBILE TRIGGER (BIG TOUCH TARGET) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 sm:p-3 min-w-[46px] min-h-[46px] flex items-center justify-center transition-all border rounded-xl cursor-pointer touch-manipulation text-white bg-zinc-900/90 hover:bg-zinc-800 border-zinc-700/80 active:scale-95 shadow-md"
              aria-label={isOpen ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-[#BAFC50]" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE FULL-SCREEN / SLIDE OVERLAY (ALWAYS ABOVE EVERYTHING) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-[64px] sm:top-[74px] left-0 w-full h-[calc(100dvh-64px)] sm:h-[calc(100dvh-74px)] bg-[#0a0a0a]/98 backdrop-blur-2xl z-[9999] flex flex-col justify-between p-5 sm:p-6 overflow-y-auto border-t border-zinc-800"
          >
            <div className="space-y-4">
              {/* Navigation Links */}
              <ul className="space-y-1.5 pt-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.key}>
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between font-business text-base font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all min-h-[48px] touch-manipulation ${
                          isActive
                            ? "text-black bg-[#BAFC50] shadow-[0_0_20px_rgba(186,252,80,0.3)]"
                            : "text-zinc-200 bg-zinc-900/60 hover:bg-zinc-800 hover:text-white border border-zinc-800/80"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight className={`h-4 w-4 ${isActive ? "text-black" : "text-zinc-500"}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Language Switcher */}
              <div className="pt-3 border-t border-zinc-800/80">
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5 font-semibold">
                  {lang === "LV" ? "Valoda / Language:" : lang === "EN" ? "Language:" : "Язык:"}
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {([
                    { code: "LV" as Language, name: "Latviešu", short: "LV" },
                    { code: "EN" as Language, name: "English", short: "EN" },
                    { code: "RU" as Language, name: "Русский", short: "RU" },
                  ]).map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleSelectLanguage(item.code)}
                      className={`py-2.5 px-3 border font-business text-xs font-bold tracking-widest transition-all rounded-xl cursor-pointer touch-manipulation flex flex-col items-center justify-center gap-0.5 min-h-[46px] ${
                        lang === item.code
                          ? "border-[#BAFC50] text-[#BAFC50] bg-[#BAFC50]/15 shadow-[0_0_12px_rgba(186,252,80,0.2)]"
                          : "border-zinc-800 text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <span className="text-sm font-black">{item.short}</span>
                      <span className="text-[10px] text-zinc-400 font-normal">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons on Mobile */}
            <div className="pt-4 pb-6 border-t border-zinc-800/80 space-y-2 mt-4">
              <a
                href="tel:+37126739899"
                className="flex items-center justify-center gap-2.5 w-full py-3 px-4 bg-zinc-900 border border-[#BAFC50]/40 text-[#BAFC50] text-sm font-bold uppercase tracking-wider rounded-xl transition-all active:scale-[0.98] min-h-[46px]"
              >
                <Phone className="h-4 w-4 text-[#BAFC50]" />
                <span>+371 26739899</span>
              </a>
              <a
                href="mailto:info@sageonmedia.eu"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-normal rounded-xl transition-all"
              >
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                <span>info@sageonmedia.eu</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
