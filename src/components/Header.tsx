import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Phone, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { Language, PageKey } from "../i18n/types";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const { lang, t, switchLanguage, getLocalizedPath } = useLanguage();

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
        style={{ transform: "translateZ(0)" }}
        className="fixed top-0 left-0 w-full z-50 py-2.5 sm:py-3 bg-[#0a0a0a]/95 sm:backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.85)] transform-gpu will-change-transform"
      >
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex justify-between items-center relative">
          
          {/* LOGO AREA */}
          <Link 
            to={getLocalizedPath("home")} 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 shrink-0 py-0.5"
          >
            <img 
              src="/logo.webp" 
              alt="Sageon Media" 
              width={180}
              height={52}
              loading="eager"
              decoding="async"
              className="h-[37px] sm:h-[45px] md:h-[52px] w-auto object-contain"
            />
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

      {/* MOBILE MENU DROPDOWN (COMPACT & CLEAN, NOT FULLSCREEN BLOATED) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 top-[52px] sm:top-[64px] bg-black/80 backdrop-blur-sm z-[9998] cursor-pointer"
            />

            {/* Compact Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              className="lg:hidden fixed top-[52px] sm:top-[64px] left-0 right-0 w-full bg-[#121215]/98 backdrop-blur-xl z-[9999] border-b border-zinc-800 shadow-2xl px-4 py-3.5 sm:px-6"
            >
              <div className="w-full max-w-md mx-auto space-y-3">
                {/* Navigation Links - Clean typographic list without card styling */}
                <ul className="divide-y divide-zinc-800/60">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <li key={link.key}>
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between font-business text-[13.5px] sm:text-sm font-normal uppercase tracking-wider py-3 px-2 rounded-lg transition-all duration-150 touch-manipulation active:bg-zinc-800/60 ${
                            isActive
                              ? "text-[#BAFC50] font-medium bg-[#BAFC50]/5"
                              : "text-zinc-300 hover:text-white"
                          }`}
                        >
                          <span>{link.name}</span>
                          {isActive ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#BAFC50]" />
                          ) : (
                            <ArrowRight className="h-3.5 w-3.5 text-zinc-600" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Bottom Bar: Language Switcher (small without glow) + Contact */}
                <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                  {/* Small Language Buttons without glow */}
                  <div className="flex items-center gap-1.5">
                    {([
                      { code: "LV" as Language, short: "LV" },
                      { code: "EN" as Language, short: "EN" },
                      { code: "RU" as Language, short: "RU" },
                    ]).map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleSelectLanguage(item.code)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer touch-manipulation active:scale-95 ${
                          lang === item.code
                            ? "bg-[#BAFC50]/15 text-[#BAFC50] border border-[#BAFC50]/50"
                            : "bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-white"
                        }`}
                      >
                        {item.short}
                      </button>
                    ))}
                  </div>

                  {/* Compact Direct Contact */}
                  <a
                    href="tel:+37126739899"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#BAFC50] hover:text-[#BAFC50]/80 transition-colors py-1.5 px-2 rounded-lg bg-zinc-900/60 border border-zinc-800"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#BAFC50]" />
                    <span>+371 26739899</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
