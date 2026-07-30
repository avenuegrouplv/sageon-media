import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, MessageSquare, Globe } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("LV");
  
  const location = useLocation();
  const navigate = useNavigate();

  // Detect scroll to style header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setIsOpen(false);
    setLangDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Sākums", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Cenas", path: "/cenas" },
    { name: "BUJ", path: "/buj" },
    { name: "Blogs", path: "/blogs" },
    { name: "Kontakti", path: "/kontakti" },
  ];

  const handleContactClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const contactSec = document.getElementById("contact-section");
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/kontakti");
      }
    } else {
      navigate("/kontakti");
    }
  };

  const selectLanguage = (lang: string) => {
    setCurrentLang(lang);
    setLangDropdownOpen(false);
  };

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isTransparent
          ? "bg-transparent border-transparent py-4"
          : "bg-[#0a0a0a]/95 backdrop-blur-md py-2 shadow-md border-zinc-800/80"
      }`}
    >
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex justify-between items-center relative">
        
        {/* LOGO AREA */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative flex items-center justify-center w-[200px] h-[70px] md:w-[230px] md:h-[84px] bg-transparent">
            {/* Colored Original Logo */}
            <img 
              src="/Logo-new.webp" 
              alt="Sageon Agency Logo" 
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
                <li key={link.name}>
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
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#18181b]/90 hover:bg-zinc-800 border border-[#BAFC50]/40 hover:border-[#BAFC50] text-[#BAFC50] text-[12.7px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 shadow-sm cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-[#BAFC50]" />
              <span>{currentLang}</span>
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center border border-[#BAFC50]/30 ml-0.5">
                <ChevronDown className={`h-3 w-3 text-[#BAFC50] transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#18181b] border border-[#BAFC50]/30 shadow-2xl py-1 z-50 rounded-2xl overflow-hidden backdrop-blur-xl">
                {["LV", "ENG", "RUS"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => selectLanguage(lang)}
                    className={`w-full text-left px-4 py-2 font-sans text-xs font-bold tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-between ${
                      currentLang === lang ? "text-[#BAFC50]" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <span>{lang === "LV" ? "Latviešu" : lang === "ENG" ? "English" : "Русский"}</span>
                    {currentLang === lang && <span className="w-1.5 h-1.5 rounded-full bg-[#BAFC50]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE TRIGGER */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors border rounded-xl cursor-pointer ${
              isTransparent 
                ? "text-white hover:text-white border-white/20" 
                : "text-slate-200 hover:text-white border-zinc-800"
            }`}
            aria-label="Izvēlne"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#121212]/98 backdrop-blur-md border-b border-zinc-800 shadow-xl transition-all duration-300 py-6 px-6 space-y-6 z-50">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`block font-business text-sm font-normal uppercase tracking-widest py-1.5 ${
                    location.pathname === link.path
                      ? "text-[#BAFC50] font-medium"
                      : "text-slate-200 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="border-zinc-800" />

          {/* Languages selection list on Mobile */}
          <div className="space-y-2">
            <p className="text-xs font-business tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-[#BAFC50]" />
              Valoda
            </p>
            <div className="flex gap-3">
              {["LV", "ENG", "RUS"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => selectLanguage(lang)}
                  className={`px-3 py-1.5 border font-business text-xs font-normal tracking-widest transition-colors rounded-xl cursor-pointer ${
                    currentLang === lang
                      ? "border-[#BAFC50] text-[#BAFC50] font-medium bg-[#BAFC50]/10"
                      : "border-zinc-800 text-slate-300 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
