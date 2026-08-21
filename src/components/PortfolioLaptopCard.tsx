import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Plus, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, Clock, X, Globe, Layout, Smartphone } from "lucide-react";
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
  hideStatusText?: boolean;
}

export default function PortfolioLaptopCard({
  title,
  displayLink,
  image,
  link,
  isPlaceholder = false,
  subtitle,
  category,
  description,
  tags,
  isInDevelopment = false,
  hideStatusText = false,
}: PortfolioLaptopCardProps) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);

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
    title.toLowerCase().includes("velobiedriba") ||
    cleanDomain.toLowerCase().includes("beauty") ||
    link.toLowerCase().includes("beauty") ||
    title.toLowerCase().includes("beauty");

  const isPlaceholderCard = isPlaceholder || cleanDomain.includes("tavaprojekts") || cleanDomain.includes("biznesam") || cleanDomain.includes("jaunslapa");

  const getImageStyle = (): React.CSSProperties => {
    const target = `${image || ""} ${displayLink || ""} ${link || ""} ${title || ""}`.toLowerCase();

    // travel with martins pavirzi 0.25 cm pa kreisi un noversts downscale melnas joslas no labas un apaksas (-0.75cm top)
    if (target.includes("travel") || target.includes("martins")) {
      return {
        objectPosition: "-0.75cm top",
      };
    }

    // justiopro centrets saturs, redzams logo un bez melnam malam
    if (target.includes("justio")) {
      return {
        objectPosition: "center top",
      };
    }

    // avenuegroup veic zoom in par 3%, novers melno vertikalo joslu attela labaja mala
    if (target.includes("avenue")) {
      return {
        objectPosition: "-0.25cm top",
        transform: "scale(1.03)",
        transformOrigin: "left top",
      };
    }

    // avangart nemainits (-0.6cm top)
    if (target.includes("avangart")) {
      return {
        objectPosition: "-0.6cm top",
      };
    }

    // latvijas restarts 2% zoom out no 1.05 -> 1.03 (saglabajot nemainigu kreiso malu un -1.5cm top)
    if (target.includes("restarts")) {
      return {
        objectPosition: "-1.5cm top",
        transform: "scale(1.03)",
        transformOrigin: "left top",
      };
    }

    // enzimi 5% zoom in, lai noverstu melno vertikalo joslu labaja mala (-0.3cm top, scale 1.05, transformOrigin: left top)
    if (target.includes("enzim")) {
      return {
        objectPosition: "-0.3cm top",
        transform: "scale(1.05)",
        transformOrigin: "left top",
      };
    }

    // demontaza24 pavirzi par 0.4cm pa kreisi (-0.4cm - 0.4cm = -0.8cm top)
    if (target.includes("demontaza") || target.includes("demontāž")) {
      return {
        objectPosition: "-0.8cm top",
      };
    }

    // velobiedriba pavirzi par 0.5cm pa labi un noverstas melnas joslas (-1cm + 0.5cm = -0.5cm top)
    if (target.includes("velo")) {
      return {
        objectPosition: "-0.5cm top",
      };
    }

    // beautystudio pavirzi par 0.5 cm pa kreisi (0cm - 0.5cm = -0.5cm top)
    if (target.includes("beauty")) {
      return {
        objectPosition: "-0.5cm top",
      };
    }

    return {
      objectPosition: "-1cm top",
    };
  };

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

  const rawTags = tags && tags.length > 0 ? tags : defaultTagLabels;
  const filteredTags = rawTags.filter((t) => {
    const lower = t.toLowerCase().trim();
    return (
      lower !== "landing page" &&
      lower !== "multi-page" &&
      lower !== "multi page" &&
      lower !== "multipage"
    );
  });
  const activeTags = filteredTags.length > 0 ? filteredTags : defaultTagLabels;

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

  return (
    <>
      <div
        className="group flex flex-col h-full w-full select-text cursor-default rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#18181b]/95 via-[#141417]/95 to-[#0e0e11]/98 border border-zinc-800/80 hover:border-[#BAFC50]/60 p-4 pb-[1.2mm] sm:p-6 sm:pb-[1.2mm] transition-colors duration-150 ease-out relative overflow-hidden justify-between"
      >
        {/* Top Accent Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BAFC50]/30 to-transparent group-hover:via-[#BAFC50] transition-all duration-75" />

        {/* 1. Device Mockup Section (Pure CSS Device Window - purely visual, no navigation) */}
        <div className="relative w-full aspect-[16/10] mb-2 sm:mb-3 shrink-0 rounded-xl sm:rounded-2xl bg-[#0e0e11] border border-zinc-700/80 shadow-[0_12px_30px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between group-hover:border-[#BAFC50]/50 transition-colors duration-200">
          {/* Ambient Glow */}
          <div className="absolute -inset-4 sm:-inset-7 bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.2),rgba(186,252,80,0.15),transparent_75%)] pointer-events-none z-0 blur-[20px] opacity-70 group-hover:opacity-100 transition-opacity duration-200" />

          {/* Screen Content inside CSS window */}
          <div className="relative z-10 w-full h-full flex-1 overflow-hidden bg-gradient-to-br from-zinc-900/90 via-[#0a0a0c] to-black">
            {!isPlaceholder ? (
              image && !imgError ? (
                <div className="w-full h-full relative overflow-hidden bg-zinc-950 flex items-start justify-start">
                  <img
                    src={image}
                    alt={title}
                    width={560}
                    height={350}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={getImageStyle()}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between">
                  {/* Brand & Category Highlight */}
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[10px] font-mono font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>{category || "Web Project"}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight line-clamp-1 group-hover:text-[#BAFC50] transition-colors">
                      {title}
                    </h4>
                  </div>

                  {/* Interactive UI Mock Wireframe preview */}
                  <div className="my-2 p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1"><Layout className="w-3 h-3 text-[#BAFC50]" /> Responsive Web App</span>
                      <span className="text-emerald-400 font-bold">100% Score</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <div className="h-4 rounded bg-zinc-800/80 border border-zinc-700/40" />
                      <div className="h-4 rounded bg-[#BAFC50]/20 border border-[#BAFC50]/40" />
                      <div className="h-4 rounded bg-zinc-800/80 border border-zinc-700/40" />
                    </div>
                  </div>

                  {/* Bottom Tags / Domain */}
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-1"><Smartphone className="w-3 h-3 text-zinc-400" /> Mobile & Desktop</span>
                    <span className="text-white font-bold group-hover:text-[#BAFC50] transition-colors">{cleanDomain}</span>
                  </div>
                </div>
              )
            ) : (
              <div 
                onClick={(e) => openTarget(e)}
                className="w-full h-full flex flex-col items-center justify-center p-3 text-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-800/90 group-hover:bg-[#BAFC50] border border-zinc-700 group-hover:border-[#BAFC50] flex items-center justify-center transition-colors shadow-md mb-2">
                  <Plus className="h-5 w-5 text-[#BAFC50] group-hover:text-black transition-colors" />
                </div>
                <p className="text-xs text-zinc-300 font-medium">
                  {subtitle || (lang === "EN" ? "Apply for project" : lang === "RU" ? "Заказать проект" : "Piesaki savu projektu")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2. Unified Description Section directly connected */}
        <div className="flex flex-col pt-0.5 space-y-2">
          {/* Top Row: Domain Badge in Top-Left + Status in Top-Right */}
          <div className="flex items-center justify-between gap-2 shrink-0">
            {/* Top-Left Corner: Domain Address Badge */}
            <button
              type="button"
              onClick={(e) => openTarget(e)}
              className="group/btn inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#BAFC50] hover:text-black bg-zinc-900/90 border border-zinc-700/80 hover:border-[#BAFC50] hover:bg-[#BAFC50] shadow-sm py-1 px-3 rounded-full transition-all duration-150 cursor-pointer active:scale-95 z-30 shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-[#BAFC50] group-hover/btn:text-black transition-colors duration-150 shrink-0" />
              <span className="tracking-wide select-none truncate max-w-none">
                {isPlaceholderCard 
                  ? (lang === "EN" ? "Apply for Project" : lang === "RU" ? "Заказать проект" : "Pieteikt projektu")
                  : cleanDomain}
              </span>
              <ExternalLink className="h-3 w-3 opacity-80 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-150 text-[#BAFC50] group-hover/btn:text-black shrink-0" />
            </button>

            {/* Top-Right Corner: Project Status */}
            {!hideStatusText && (
              <div className={`flex items-center gap-1.5 text-xs font-mono shrink-0 ${isDevelopment ? 'text-[#d97757]' : 'text-zinc-300'}`}>
                {isDevelopment ? (
                  <Clock className="h-3.5 w-3.5 text-[#d97757] shrink-0" />
                ) : isPlaceholderCard ? (
                  <Plus className="h-3.5 w-3.5 text-[#BAFC50] shrink-0" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#BAFC50] shrink-0" />
                )}
                <span className={`font-medium select-text cursor-text whitespace-nowrap ${isDevelopment ? 'text-[#d97757]' : 'text-zinc-300'}`}>{statusText}</span>
              </div>
            )}
          </div>

          {/* Title - Fixed height so 1-line and 2-line titles are uniform */}
          <div className="flex items-start min-h-[48px] sm:min-h-[52px]">
            <h3 className="font-sans text-base sm:text-lg font-medium text-white group-hover:text-[#BAFC50] transition-colors duration-75 leading-snug select-text cursor-text tracking-normal line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Detailed Description - Fixed uniform height for all cards */}
          <div className="min-h-[80px] sm:min-h-[84px] flex items-start">
            {description ? (
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed select-text cursor-text line-clamp-4">
                {description}
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-zinc-500 italic select-text cursor-text line-clamp-4">
                {subtitle || ""}
              </p>
            )}
          </div>

          {/* Deliverables Badges / Tags - All 3 rows fully visible with uniform height */}
          <div className="mt-1 pt-2.5 sm:pt-3 border-t border-zinc-800/80 flex flex-wrap items-start content-start gap-1.5 sm:gap-2 min-h-[96px] sm:min-h-[104px]">
            {activeTags.map((tag, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-medium text-zinc-200 bg-zinc-900/90 border border-zinc-700/60 rounded-md px-2 sm:px-2.5 py-1 group-hover:border-zinc-500 transition-colors duration-75 select-text cursor-text whitespace-nowrap"
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

