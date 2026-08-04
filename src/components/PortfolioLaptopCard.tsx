import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Plus, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, Clock, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface PortfolioLaptopCardProps {
  key?: string | number;
  title: string;
  brand?: string;
  displayLink: string;
  image?: string;
  link: string;
  isPlaceholder?: boolean;
  subtitle?: string;
  category?: string;
  description?: string;
  tags?: string[];
  isInDevelopment?: boolean;
}

export default function PortfolioLaptopCard({
  title,
  displayLink,
  image,
  link,
  isPlaceholder = false,
  subtitle,
  description,
  tags,
  isInDevelopment = false,
}: PortfolioLaptopCardProps) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const cleanDomain = displayLink.replace("https://", "").replace("http://", "");

  const isDevelopment = 
    isInDevelopment ||
    cleanDomain.toLowerCase().includes("demontaza") || 
    link.toLowerCase().includes("demontaza") || 
    title.toLowerCase().includes("demontāž") ||
    title.toLowerCase().includes("demontaza") ||
    cleanDomain.toLowerCase().includes("velobiedriba") ||
    link.toLowerCase().includes("velobiedriba") ||
    title.toLowerCase().includes("velobiedrīb") ||
    title.toLowerCase().includes("velobiedriba");

  const isVelobiedriba =
    cleanDomain.toLowerCase().includes("velobiedriba") ||
    link.toLowerCase().includes("velobiedriba") ||
    title.toLowerCase().includes("velobiedrīb") ||
    title.toLowerCase().includes("velobiedriba") ||
    (image ? image.toLowerCase().includes("velobiedriba") : false);

  const isPlaceholderCard = isPlaceholder || cleanDomain.includes("tavaprojekts") || cleanDomain.includes("biznesam") || cleanDomain.includes("jaunslapa");

  const statusText = isPlaceholderCard
    ? (lang === "EN" ? "Apply for Project" : lang === "RU" ? "Заказать проект" : "Pieteikt projektu")
    : isDevelopment
    ? (lang === "EN" ? "In Development" : lang === "RU" ? "В разработке" : "Izstrādes stadijā")
    : (lang === "EN" ? "Completed Project" : lang === "RU" ? "Завершенный проект" : "Pabeigts projekts");

  // Default localized tag labels for deliverables if custom tags not passed
  const defaultTagLabels = lang === "EN" ? [
    "Custom UI/UX",
    "Brand Logo",
    "Service Descriptions",
    "Mobile First"
  ] : lang === "RU" ? [
    "Уникальный UI/UX",
    "Логотип бренда",
    "Описания услуг",
    "Адаптивность"
  ] : [
    "Unikāls UI/UX",
    "Zīmola logo",
    "Pakalpojumu apraksti",
    "Mobile First"
  ];

  const activeTags = tags && tags.length > 0 ? tags : defaultTagLabels;

  const openTarget = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (isDevelopment) {
      setShowModal(true);
      return;
    }
    if (isPlaceholder || link.startsWith("/")) {
      navigate(link || "/kontakti");
    } else if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // If the user was highlighting/selecting text, do NOT open the link or modal
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      return;
    }
    openTarget(e);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group flex flex-col h-full w-full select-text cursor-pointer rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#18181b]/95 via-[#141417]/95 to-[#0e0e11]/98 border border-zinc-800/80 hover:border-[#BAFC50]/60 p-3.5 sm:p-5 transition-all duration-75 ease-out shadow-xl hover:shadow-[0_16px_40px_rgba(186,252,80,0.15)] relative overflow-hidden justify-between"
      >
        {/* Top Accent Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BAFC50]/30 to-transparent group-hover:via-[#BAFC50] transition-all duration-75" />

        {/* 1. Device Mockup Section */}
        <div className="relative w-full aspect-[897/535] mb-2 sm:mb-3">
          {/* Screen inside tablet cutout */}
          <div 
            className="absolute z-10 overflow-hidden bg-black flex flex-col justify-between rounded-t-[8px] sm:rounded-t-[12px] md:rounded-t-[14px] rounded-b-none"
            style={{
              top: '2.65%',
              left: '1.7%',
              width: '96.6%',
              height: '89.25%',
            }}
          >
            {!isPlaceholder && image ? (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-zinc-950">
                <img
                  src={image}
                  alt={title}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-top ${
                    isVelobiedriba 
                      ? "scale-[1.05] origin-top" 
                      : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none" />
              </div>
            ) : isPlaceholder ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800/90 group-hover:bg-[#BAFC50] border border-zinc-700 group-hover:border-[#BAFC50] flex items-center justify-center transition-all duration-75 shadow-md">
                  <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-[#BAFC50] group-hover:text-black transition-colors duration-75" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-2 select-text cursor-text">
                  {subtitle || (lang === "EN" ? "Apply for project" : lang === "RU" ? "Заказать проект" : "Piesaki savu projektu")}
                </p>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />
              </div>
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col items-center justify-center p-4 text-center">
                <div className="p-3 bg-[#BAFC50]/10 border border-[#BAFC50]/30 rounded-full text-[#BAFC50] mb-2 shadow-sm">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono font-semibold text-white tracking-wider uppercase select-text cursor-text">{title}</span>
                <span className="text-[10px] text-zinc-400 mt-0.5 select-text cursor-text">{cleanDomain}</span>
              </div>
            )}
          </div>

          {/* Laptop/Tablet Frame */}
          <img
            src="/portfolio.webp"
            alt=""
            aria-hidden="true"
            width={897}
            height={535}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-contain pointer-events-none select-none relative z-20 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_16px_36px_rgba(186,252,80,0.18)] transition-all duration-75"
          />
        </div>

        {/* 2. Unified Description Section directly connected */}
        <div className="flex-1 flex flex-col justify-between space-y-3 pt-1">
          <div className="space-y-2.5">
            {/* Top Row: Domain Badge in Top-Left + Status in Top-Right */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {/* Top-Left Corner: Domain Address Badge */}
              <button
                type="button"
                onClick={(e) => openTarget(e)}
                className="group/btn inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#BAFC50] hover:text-black bg-zinc-900/90 border border-zinc-700/80 hover:border-[#BAFC50] hover:bg-[#BAFC50] shadow-sm py-1 px-3 rounded-full transition-all duration-150 cursor-pointer active:scale-95 z-30"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#BAFC50] group-hover/btn:bg-black transition-colors duration-150 animate-pulse shrink-0" />
                <span className="tracking-wide select-none">
                  {isPlaceholderCard 
                    ? (lang === "EN" ? "Apply for Project" : lang === "RU" ? "Заказать проект" : "Pieteikt projektu")
                    : cleanDomain}
                </span>
                <ExternalLink className="h-3 w-3 opacity-80 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-150 text-[#BAFC50] group-hover/btn:text-black" />
              </button>

              {/* Top-Right Corner: Project Status */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                {isDevelopment ? (
                  <>
                    <Clock className="h-3.5 w-3.5 text-rose-400/80" />
                    <span className="text-rose-300/90 font-medium select-text cursor-text">{statusText}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-3.5 w-3.5 text-[#BAFC50]" />
                    <span className="text-zinc-300 font-medium select-text cursor-text">{statusText}</span>
                  </>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#BAFC50] transition-colors duration-75 tracking-tight leading-snug pt-1 select-text cursor-text">
              {title}
            </h3>

            {/* Detailed Description */}
            {description && (
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed select-text cursor-text">
                {description}
              </p>
            )}
          </div>

          {/* Deliverables Badges / Tags */}
          <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5 sm:gap-2">
            {activeTags.map((tag, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-zinc-200 bg-zinc-900/90 border border-zinc-700/60 rounded-md px-2.5 py-1 group-hover:border-zinc-500 transition-colors duration-75 select-text cursor-text"
              >
                {idx === 0 ? (
                  <Sparkles className="h-3 w-3 text-[#BAFC50] shrink-0" />
                ) : (
                  <CheckCircle2 className="h-3 w-3 text-[#BAFC50] shrink-0" />
                )}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup for In Development projects */}
      {showModal && createPortal(
        <div 
          onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-[#18181b] border border-zinc-700/90 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl overflow-hidden"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BAFC50] to-transparent" />

            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
              aria-label="Aizvērt"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#BAFC50]/10 border border-[#BAFC50]/30 flex items-center justify-center text-[#BAFC50] shadow-inner">
              <Clock className="h-7 w-7 text-[#BAFC50]" />
            </div>

            {/* Message */}
            <div>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {lang === "EN" 
                  ? "This website is currently in development and has not been connected to a domain yet." 
                  : lang === "RU" 
                    ? "Этот веб-сайт находится в стадии разработки и еще не привязан к домену." 
                    : "Šī mājaslapa šobrīd atrodas izstrādes stadijā un domēnam vēl nav pievienota"}
              </p>
            </div>

            {/* Close Action Button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-3 px-5 bg-[#BAFC50] hover:bg-[#a8f235] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all duration-150 shadow-lg shadow-[#BAFC50]/15 cursor-pointer"
            >
              {lang === "EN" ? "Close" : lang === "RU" ? "Понятно" : "Labi"}
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

