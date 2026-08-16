import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Phone, Mail, X } from "lucide-react";
import CookieModal from "./CookieModal";
import PrivacyModal from "./PrivacyModal";
import { useLanguage } from "../i18n/LanguageContext";
import { PageKey } from "../i18n/types";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"cookies" | "privacy" | null>(null);
  const [showSocialNotice, setShowSocialNotice] = useState(false);
  const { lang, t, getLocalizedPath } = useLanguage();

  const navLinks: { key: PageKey; name: string; path: string }[] = [
    { key: "home", name: t.nav.home, path: getLocalizedPath("home") },
    { key: "portfolio", name: t.nav.portfolio, path: getLocalizedPath("portfolio") },
    { key: "services", name: t.nav.services, path: getLocalizedPath("services") },
    { key: "faq", name: t.nav.faq, path: getLocalizedPath("faq") },
    { key: "blog", name: t.nav.blog, path: getLocalizedPath("blog") },
    { key: "contact", name: t.nav.contact, path: getLocalizedPath("contact") },
  ];

  const popularServices = [
    { name: t.pricingPlans[0]?.title || "Landing Page", slug: "landing-page" },
    { name: t.pricingPlans[1]?.title || "Multi-page", slug: "multi-page" },
    { name: t.pricingPlans[2]?.title || "E-Komercija", slug: "e-komercija" },
    { name: t.pricingPlans[3]?.title || "Uzturēšana", slug: "uzturesana" },
  ];

  const handleServiceClick = (slug: string) => {
    const elem = document.getElementById(slug);
    if (elem) {
      if (window.__lenis) {
        window.__lenis.scrollTo(elem, { offset: -100, duration: 1.2 });
      } else {
        elem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <footer className="bg-black text-slate-300 relative z-10 font-sans border-0 border-transparent">
      <div className="pt-8 pb-8 md:pt-4 md:pb-3">
        {/* TOP SECTION: Desktop (Left: Popular Services + Follow Us side-by-side, Right: Nav Links & Contacts) | Mobile (Nav links -> 2-row Popular Services -> Contacts -> Follow Us) */}
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pb-6 md:pb-0">
          
          {/* DESKTOP VIEW (md:flex) */}
          <div className="hidden md:flex justify-between items-start gap-8">
            {/* Left Group: Popular Services + Follow Us side-by-side */}
            <div className="flex items-start gap-8 lg:gap-14">
              {/* Popular Services Column */}
              <div className="flex flex-col items-start space-y-2.5">
                <span className="text-xs sm:text-[13px] font-sans font-extrabold tracking-wider uppercase text-[#BAFC50] drop-shadow-[0_0_8px_rgba(186,252,80,0.25)]">
                  {lang === "LV" ? "Populārākie pakalpojumi" : lang === "EN" ? "Popular Services" : "Популярные услуги"}
                </span>
                <ul className="flex flex-col items-start space-y-1.5 text-xs sm:text-sm text-slate-300 font-medium">
                  {popularServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        to={`${getLocalizedPath("services")}#${service.slug}`}
                        onClick={() => handleServiceClick(service.slug)}
                        className="hover:text-[#BAFC50] transition-colors duration-200 block py-0.5"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow Us (aligned at the same top baseline, right next to Popular Services) */}
              <div className="flex flex-col items-start space-y-2.5">
                <span className="text-xs sm:text-[13px] font-sans font-bold tracking-wider uppercase text-[#BAFC50]">
                  {lang === "LV" ? "Seko mums" : lang === "EN" ? "Follow us" : "Подписывайтесь"}
                </span>
                <div className="flex items-center pt-0.5">
                  <button
                    type="button"
                    onClick={() => setShowSocialNotice(true)}
                    className="p-2.5 bg-[#18181b] hover:bg-[#BAFC50] hover:text-black text-white transition-all duration-300 border border-zinc-800 rounded-xl shadow-sm cursor-pointer"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Nav links & Contacts */}
            <div className="flex flex-col items-end space-y-3.5 text-right">
              {/* Desktop Nav Links */}
              <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm font-semibold text-slate-300">
                {navLinks.map((link, idx, arr) => (
                  <div key={link.key} className="flex items-center gap-4">
                    <Link
                      to={link.path}
                      className="hover:text-[#BAFC50] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                    {idx < arr.length - 1 && <span className="text-slate-600 font-light select-none">|</span>}
                  </div>
                ))}
              </div>

              {/* Contacts */}
              <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-400">
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

          {/* MOBILE VIEW (md:hidden: Nav links -> 2-row Popular Services -> Contacts -> Follow Us) */}
          <div className="flex flex-col items-center justify-center space-y-5 text-center w-full md:hidden">
            
            {/* 1. Mobile Nav Links (2 rows) */}
            <div className="flex flex-col items-center justify-center gap-2 text-xs font-semibold text-slate-300 w-full">
              {/* Row 1: Sākums | Projekti | Pakalpojumi | BUJ */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-nowrap">
                {navLinks.slice(0, 4).map((link, idx) => (
                  <div key={link.key} className="flex items-center gap-2 sm:gap-3">
                    <Link
                      to={link.path}
                      className="hover:text-[#BAFC50] transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                    {idx < 3 && <span className="text-slate-600 font-light select-none">|</span>}
                  </div>
                ))}
              </div>

              {/* Row 2: Blogs | Kontakti */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                {navLinks.slice(4, 6).map((link, idx) => (
                  <div key={link.key} className="flex items-center gap-2.5 sm:gap-3">
                    <Link
                      to={link.path}
                      className="hover:text-[#BAFC50] transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                    {idx < 1 && <span className="text-slate-600 font-light select-none">|</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Mobile Popular Services in 2 Rows (Below Nav links, Above Contacts) */}
            <div className="flex flex-col items-center justify-center space-y-2 w-full pt-1 pb-1">
              <span className="text-xs font-sans font-extrabold tracking-wider uppercase text-[#BAFC50] drop-shadow-[0_0_8px_rgba(186,252,80,0.25)]">
                {lang === "LV" ? "Populārākie pakalpojumi" : lang === "EN" ? "Popular Services" : "Популярные услуги"}
              </span>
              
              <div className="flex flex-col items-center justify-center gap-1.5 text-xs font-medium text-slate-300">
                {/* Row 1: Landing Page | Multi-page */}
                <div className="flex items-center justify-center gap-2.5">
                  <Link
                    to={`${getLocalizedPath("services")}#${popularServices[0].slug}`}
                    onClick={() => handleServiceClick(popularServices[0].slug)}
                    className="hover:text-[#BAFC50] transition-colors duration-200"
                  >
                    {popularServices[0].name}
                  </Link>
                  <span className="text-slate-600 font-light select-none">|</span>
                  <Link
                    to={`${getLocalizedPath("services")}#${popularServices[1].slug}`}
                    onClick={() => handleServiceClick(popularServices[1].slug)}
                    className="hover:text-[#BAFC50] transition-colors duration-200"
                  >
                    {popularServices[1].name}
                  </Link>
                </div>

                {/* Row 2: E-Komercija | Uzturēšana */}
                <div className="flex items-center justify-center gap-2.5">
                  <Link
                    to={`${getLocalizedPath("services")}#${popularServices[2].slug}`}
                    onClick={() => handleServiceClick(popularServices[2].slug)}
                    className="hover:text-[#BAFC50] transition-colors duration-200"
                  >
                    {popularServices[2].name}
                  </Link>
                  <span className="text-slate-600 font-light select-none">|</span>
                  <Link
                    to={`${getLocalizedPath("services")}#${popularServices[3].slug}`}
                    onClick={() => handleServiceClick(popularServices[3].slug)}
                    className="hover:text-[#BAFC50] transition-colors duration-200"
                  >
                    {popularServices[3].name}
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Mobile Contacts (Phone & Email) */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-400">
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

            {/* 4. Mobile Follow Us with FB Icon */}
            <div className="flex flex-col items-center justify-center space-y-2 pt-1">
              <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-[#BAFC50]">
                {lang === "LV" ? "Seko mums" : lang === "EN" ? "Follow us" : "Подписывайтесь"}
              </span>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowSocialNotice(true)}
                  className="p-2.5 bg-[#18181b] hover:bg-[#BAFC50] hover:text-black text-white transition-all duration-300 border border-zinc-800 rounded-xl shadow-sm cursor-pointer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* LOGO & BOTTOM COPYRIGHT SECTOR */}
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 md:pt-0 flex flex-col items-center gap-6 md:gap-0">
          {/* Centered Logo */}
          <Link to={getLocalizedPath("home")} className="flex items-center justify-center shrink-0 py-2 md:py-0 md:-mt-5">
            <img 
              src="/logo.webp" 
              alt="Sageon Media" 
              className="h-[37px] sm:h-[45px] md:h-[52px] w-auto object-contain"
            />
          </Link>

          {/* MOBILE CALL BUTTONS: WhatsApp & Direct Phone Call */}
          <div className="w-full max-w-md mx-auto pt-4 pb-2 block md:hidden">
            <div className="grid grid-cols-2 gap-3 w-full">
              <a
                href="https://wa.me/37126739899"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-full bg-[#18181b] border-2 border-[#25D366] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#25D366]/15 active:scale-[0.98] group"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 fill-[#25D366] shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="text-white font-extrabold tracking-wider">WhatsApp</span>
              </a>
              <a
                href="tel:+37126739899"
                className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-full bg-[#18181b] border-2 border-[#BAFC50] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#BAFC50]/15 active:scale-[0.98] group"
                aria-label="Zvanīt"
              >
                <Phone className="w-5 h-5 text-[#BAFC50] shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-white font-extrabold tracking-wider">{lang === "EN" ? "Call Us" : lang === "RU" ? "Позвонить" : "Zvanīt"}</span>
              </a>
            </div>
          </div>

          {/* Absolute Bottom Row: Copyright on Left, Policies on Right */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 md:pt-2 pb-2 md:pb-0 text-xs sm:text-sm text-zinc-300">
            <div className="text-center sm:text-left font-medium">
              <span>2026 © SageOn Media I {t.footer.rights}</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 font-medium text-center sm:text-right">
              <button
                onClick={() => setActiveModal("cookies")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.footer.cookies}
              </button>
              <span className="text-zinc-600 font-normal select-none">|</span>
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

      {/* POPUP NOTIFICATION FOR FACEBOOK */}
      {showSocialNotice && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="bg-[#18181b] border border-[#BAFC50]/40 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowSocialNotice(false)}
              className="absolute top-3 right-3 text-zinc-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Aizvērt"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 flex items-center justify-center mx-auto text-[#BAFC50]">
              <Facebook className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Facebook
              </h3>
              <p className="text-sm text-zinc-200 font-medium leading-relaxed">
                {lang === "EN" ? "Currently unavailable" : lang === "RU" ? "В настоящее время недоступно" : "Šobrīd nav pieejama"}
              </p>
            </div>
            <button
              onClick={() => setShowSocialNotice(false)}
              className="w-full py-2.5 bg-[#BAFC50] hover:bg-[#a6ed38] text-black font-extrabold text-xs uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer shadow-md shadow-[#BAFC50]/20"
            >
              {lang === "EN" ? "Close" : lang === "RU" ? "Закрыть" : "Aizvērt"}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
