import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Mail } from "lucide-react";
import CookieModal from "./CookieModal";
import PrivacyModal from "./PrivacyModal";
import { useLanguage } from "../i18n/LanguageContext";
import { PageKey } from "../i18n/types";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"cookies" | "privacy" | null>(null);
  const { lang, t, getLocalizedPath } = useLanguage();

  const navLinks: { key: PageKey; name: string; path: string }[] = [
    { key: "home", name: t.nav.home, path: getLocalizedPath("home") },
    { key: "portfolio", name: t.nav.portfolio, path: getLocalizedPath("portfolio") },
    { key: "services", name: t.nav.services, path: getLocalizedPath("services") },
    { key: "faq", name: t.nav.faq, path: getLocalizedPath("faq") },
    { key: "blog", name: t.nav.blog, path: getLocalizedPath("blog") },
    { key: "contact", name: t.nav.contact, path: getLocalizedPath("contact") },
  ];

  return (
    <footer className="bg-black text-slate-300 relative z-10 font-sans border-0 border-transparent">
      <div className="pt-8 pb-8 sm:pt-10 sm:pb-10">
        {/* TOP SECTION: Follow Us on Left, Nav Links & Contacts on Right */}
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6 pb-6">
          
          {/* Left Column: Follow Us with Icons */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-[#BAFC50]">
              {lang === "LV" ? "Seko mums" : lang === "EN" ? "Follow us" : "Подписывайтесь"}
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 bg-[#18181b] hover:bg-[#BAFC50] hover:text-black text-white transition-all duration-300 border border-zinc-800 rounded-xl shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 bg-[#18181b] hover:bg-[#BAFC50] hover:text-black text-white transition-all duration-300 border border-zinc-800 rounded-xl shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Navigation Links in Row 1 & Contacts in Row 2 */}
          <div className="flex flex-col items-center md:items-end space-y-3 text-center md:text-right w-full md:w-auto">
            
            {/* Row 1: Nav links */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-2.5 sm:gap-x-4 gap-y-2 text-xs sm:text-sm font-semibold text-slate-300 max-w-full px-2 sm:px-0">
              {navLinks.map((link, idx, arr) => (
                <div key={link.key} className="flex items-center gap-2.5 sm:gap-4">
                  <Link
                    to={link.path}
                    className="hover:text-[#BAFC50] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  {idx < arr.length - 1 && <span className="text-slate-600 font-light">|</span>}
                </div>
              ))}
            </div>

            {/* Row 2: Contacts */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-3 sm:gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-400">
              <p className="flex items-center gap-1.5 sm:gap-2">
                <Phone className="h-3.5 w-3.5 text-[#BAFC50]" />
                <span className="font-medium text-slate-200">+371 26739899</span>
              </p>
              <span className="text-slate-600 font-light">|</span>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#BAFC50]" />
                <a href="mailto:info@sageonmedia.eu" className="hover:text-[#BAFC50] transition-colors font-medium text-slate-200">
                  info@sageonmedia.eu
                </a>
              </p>
            </div>

          </div>

        </div>

        {/* LOGO & BOTTOM COPYRIGHT SECTOR */}
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 flex flex-col items-center gap-6">
          {/* Centered Logo */}
          <Link to={getLocalizedPath("home")} className="flex items-center justify-center group shrink-0">
            <div className="flex items-center justify-center w-[190px] h-[70px] sm:w-[220px] sm:h-[75px] bg-transparent">
              <img 
                src="/Logo-new.webp" 
                alt="Sageon Media Logo" 
                loading="lazy"
                decoding="async"
                width={220}
                height={75}
                className="w-full h-full object-contain" 
              />
            </div>
          </Link>

          {/* Absolute Bottom Row: Copyright on Left, Policies on Right */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-16 sm:pt-20 pb-2 text-xs text-slate-500">
            <div className="text-center sm:text-left">
              <span>2026 © SageOn Media I {t.footer.rights}</span>
            </div>

            <div className="flex items-center gap-6 font-medium text-center sm:text-right">
              <button
                onClick={() => setActiveModal("cookies")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.footer.cookies}
              </button>
              <button
                onClick={() => setActiveModal("privacy")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.footer.privacy}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DIALOG FOR COOKIE POLICY */}
      <CookieModal
        isOpen={activeModal === "cookies"}
        onClose={() => setActiveModal(null)}
      />

      {/* MODAL DIALOG FOR PRIVACY POLICY */}
      <PrivacyModal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
      />
    </footer>
  );
}
