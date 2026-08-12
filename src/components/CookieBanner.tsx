import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie } from "lucide-react";
import CookieModal from "./CookieModal";
import PrivacyModal from "./PrivacyModal";
import { useLanguage } from "../i18n/LanguageContext";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.documentElement.dataset.cookieBanner = isVisible ? "true" : "false";
    window.dispatchEvent(new CustomEvent("cookieBannerToggle", { detail: { isVisible } }));
  }, [isVisible]);

  useEffect(() => {
    const handleOpenBanner = () => {
      setIsVisible(true);
    };
    window.addEventListener("openCookieBanner", handleOpenBanner);

    try {
      const consent = localStorage.getItem("sageon_cookie_consent_v2");
      if (!consent) {
        setIsVisible(true);
      }
    } catch (e) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener("openCookieBanner", handleOpenBanner);
    };
  }, []);

  const handleAcceptAll = () => {
    try {
      const val = JSON.stringify({ necessary: true, analytics: true, functional: true, marketing: true });
      localStorage.setItem("sageon_cookie_consent_v2", val);
      sessionStorage.setItem("sageon_cookie_consent_v2", val);
    } catch (e) {
      console.warn("storage write error", e);
    }
    setIsVisible(false);
  };

  const handleDeclineOptional = () => {
    try {
      const val = JSON.stringify({ necessary: true, analytics: false, functional: false, marketing: false });
      localStorage.setItem("sageon_cookie_consent_v2", val);
      sessionStorage.setItem("sageon_cookie_consent_v2", val);
    } catch (e) {
      console.warn("storage write error", e);
    }
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#121215]/98 backdrop-blur-xl border-t border-zinc-800/90 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] text-white py-[14.08px] sm:py-[16.9px] px-4 sm:px-6 md:px-10 lg:px-12"
          >
            <div className="w-full max-w-[1380px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 md:gap-8">
              
              {/* Left / Main Content Area: Cookie Notice Text */}
              <div className="flex items-center gap-2.5 order-1 md:order-1 flex-1 max-w-4xl lg:max-w-5xl">
                <div className="p-1.5 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-lg shrink-0 hidden sm:flex">
                  <Cookie className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-[13px] md:text-sm text-zinc-300 font-light leading-snug sm:leading-relaxed">
                    <span className="font-bold text-white font-sans mr-1.5 inline-flex items-center gap-1">
                      <Cookie className="h-3.5 w-3.5 text-[#BAFC50] sm:hidden inline" />
                      {lang === "LV" ? "Sīkdatņu paziņojums:" : lang === "EN" ? "Cookie Notice:" : "Уведомление о cookie:"}
                    </span>
                    {t.cookies.bannerText}{" "}
                    <button
                      type="button"
                      onClick={() => setIsPrivacyOpen(true)}
                      className="text-zinc-300 font-light hover:text-white cursor-pointer transition-colors inline underline decoration-zinc-600 underline-offset-2"
                    >
                      {t.cookies.privacyLinkText}
                    </button>
                  </p>
                </div>
              </div>

              {/* Right Side: 3 Horizontal Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 order-2 md:order-2 md:ml-auto w-full sm:w-auto justify-end">
                {/* Button 1: Pieņemt visas */}
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-3.5 sm:px-5 py-[11.26px] sm:py-[14.08px] bg-[#BAFC50] hover:bg-[#a6ed38] text-black font-sans font-bold text-[11.5px] sm:text-sm tracking-wide rounded-full shadow-md hover:shadow-[#BAFC50]/20 transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation flex-1 sm:flex-none text-center whitespace-nowrap"
                >
                  {t.cookies.acceptBtn}
                </button>

                {/* Button 2: Pielāgot */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3.5 sm:px-5 py-[11.26px] sm:py-[14.08px] bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 font-sans font-semibold text-[11.5px] sm:text-sm tracking-wide rounded-full transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation flex-1 sm:flex-none text-center whitespace-nowrap"
                >
                  {t.cookies.detailsBtn}
                </button>

                {/* Button 3: Noraidīt */}
                <button
                  type="button"
                  onClick={handleDeclineOptional}
                  className="px-3.5 sm:px-5 py-[11.26px] sm:py-[14.08px] bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 font-sans font-semibold text-[11.5px] sm:text-sm tracking-wide rounded-full transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation flex-1 sm:flex-none text-center whitespace-nowrap"
                >
                  {t.cookies.declineBtn}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Cookie Customization Modal */}
      <CookieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSavePreferences={() => setIsVisible(false)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
}

