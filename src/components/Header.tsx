import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Language, PageKey } from "../i18n/types";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  const location = useLocation();
  const { lang, t, switchLanguage, getLocalizedPath } = useLanguage();

  // Detect scroll to style header with requestAnimationFrame throttling and state checks
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
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

  const isHome = location.pathname === "/" || location.pathname === "/en" || location.pathname === "/ru";
  const isTransparent = isHome && !isScrolled;

  const langDisplayCode = lang === "LV" ? "LV" : lang === "EN" ? "EN" : "RU";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isTransparent
          ? "bg-transparent border-transparent py-4"
          : "bg-[#0a0a0a]/95 backdrop-blur-md py-2 shadow-md border-zinc-800/80"
      }`}
    >
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex justify-between items-center relative">
        
        {/* LOGO AREA */}
        <Link to={getLocalizedPath("home")} className="flex items-center gap-3 group shrink-0">
          <div className="relative flex items-center justify-center w-[200px] h-[70px] md:w-[230px] md:h-[84px] bg-transparent">
            {/* Colored Original Logo */}
            <img 
              src="/Logo-new.webp" 
              alt="Sageon Media Logo" 
              loading="eager"
              fetchPriority="high"
              decoding="async"
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
                        : isTransparent
                          ? "text-white/80 hover:text-[#BAFC50]"
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

        {/* RIGHT AREA: LANGUAGE DROPDOWN */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <div className="relative">
            <button
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

        {/* MOBILE TRIGGER */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors border rounded-xl cursor-pointer touch-manipulation ${
              isTransparent 
                ? "text-white hover:text-white border-white/20" 
                : "text-slate-200 hover:text-white border-zinc-800"
            }`}
            aria-label="Izvēlne"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#121212]/98 backdrop-blur-xl border-b border-zinc-800 shadow-2xl transition-all duration-300 py-4 px-5 space-y-4 z-[60] max-h-[80vh] overflow-y-auto">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block font-business text-sm font-medium uppercase tracking-widest py-1.5 ${
                    location.pathname === link.path
                      ? "text-[#BAFC50]"
                      : "text-slate-200 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="border-zinc-800/80" />

          {/* Languages selection list on Mobile */}
          <div className="space-y-2">
            <p className="text-xs font-business tracking-widest uppercase text-slate-400 flex items-center gap-1.5 font-bold">
              <Globe className="h-3.5 w-3.5 text-[#BAFC50]" />
              {lang === "LV" ? "Valoda" : lang === "EN" ? "Language" : "Язык"}
            </p>
            <div className="flex gap-2.5">
              {([
                { code: "LV" as Language, name: "LV" },
                { code: "EN" as Language, name: "EN" },
                { code: "RU" as Language, name: "RU" },
              ]).map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelectLanguage(item.code)}
                  className={`px-3.5 py-1.5 border font-business text-xs font-bold tracking-widest transition-colors rounded-xl cursor-pointer touch-manipulation ${
                    lang === item.code
                      ? "border-[#BAFC50] text-[#BAFC50] bg-[#BAFC50]/10"
                      : "border-zinc-800 text-slate-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
