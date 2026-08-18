import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import PageNavButtons from "../components/PageNavButtons";
import ContactForm from "../components/ContactForm";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../i18n/LanguageContext";

const planSlugs = ["landing-page", "multi-page", "e-komercija", "uzturesana", "google-riki"];

export default function Cenas() {
  const { lang, t, getLocalizedPath } = useLanguage();
  const location = useLocation();
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  useEffect(() => {
    document.title = t.seo.services.title;
  }, [t.seo.services.title]);

  useEffect(() => {
    if (location.hash) {
      const targetSlug = location.hash.replace("#", "");
      setHighlightedSlug(targetSlug);

      const scrollToTarget = () => {
        const elem = document.getElementById(targetSlug);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };

      const timer = setTimeout(scrollToTarget, 150);
      const clearHighlightTimer = setTimeout(() => {
        setHighlightedSlug(null);
      }, 3500);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearHighlightTimer);
      };
    }
  }, [location.hash, location.pathname]);

  const pricingPlans = t.pricingPlans;

  return (
    <div className="min-h-screen min-h-[100dvh] bg-black font-sans text-left text-white relative overflow-hidden">
      <SEOHead
        title={t.seo.services.title}
        description={t.seo.services.description}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://sageonmedia.eu/pakalpojumi#webpage",
            "url": "https://sageonmedia.eu/pakalpojumi",
            "name": t.seo.services.title,
            "description": t.seo.services.description,
            "isPartOf": { "@id": "https://sageonmedia.eu#website" }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": lang === "LV" ? "Sākums" : lang === "EN" ? "Home" : "Главная",
                "item": "https://sageonmedia.eu"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": lang === "LV" ? "Pakalpojumi un Cenas" : lang === "EN" ? "Services & Pricing" : "Услуги",
                "item": "https://sageonmedia.eu/pakalpojumi"
              }
            ]
          },
          ...pricingPlans.map(plan => ({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": plan.title,
            "description": plan.subtitle,
            "provider": {
              "@type": "Organization",
              "name": "Sageon Media",
              "url": "https://sageonmedia.eu"
            },
            ...(plan.price ? {
              "offers": {
                "@type": "Offer",
                "price": plan.price,
                "priceCurrency": "EUR"
              }
            } : {})
          }))
        ]}
      />
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

      {/* High-Performance Green Ambient Background Glows for Mobile & Desktop */}
      <div className="absolute -top-32 -left-20 w-[90vw] max-w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[12%] right-10 w-[90vw] max-w-[780px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[28%] -left-16 w-[90vw] max-w-[800px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[45%] right-16 w-[90vw] max-w-[820px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[62%] -right-24 w-[90vw] max-w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[80%] left-10 w-[90vw] max-w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute -bottom-40 left-1/3 w-[90vw] max-w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20 space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>{t.nav.services}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
            {lang === "LV" ? <>Cenu <span className="text-[#BAFC50]">piedāvājumi</span></> : lang === "EN" ? <>Pricing <span className="text-[#BAFC50]">Offers</span></> : <>Ценовые <span className="text-[#BAFC50]">предложения</span></>}
          </h1>
          <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto font-light text-center">
            {lang === "LV" 
              ? "Izvēlieties Jūsu biznesa mērķiem visatbilstošāko mājaslapas izstrādes vai uzturēšanas plānu. Nav nekādu slēptu izmaksu — visi nosacījumi ir skaidri un caurskatāmi." 
              : lang === "EN" 
                ? "Choose the plan that best fits your business goals. No hidden costs — transparent terms." 
                : "Выберите план, который лучше всего соответствует вашим бизнес-целям. Никаких скрытых платежей."}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => {
            const isBestChoice = plan.badge === "Labākā izvēle biznesam" || plan.badge === "Best choice for business" || plan.badge === "Лучший выбор для бизнеса";
            const isMultiPage = plan.title === "Multi-page";
            const mobileOrderClass = isMultiPage ? "order-first md:order-none" : "order-none";
            const slug = planSlugs[index] || `service-${index}`;
            const isTargeted = highlightedSlug === slug || location.hash === `#${slug}`;

            return (
              <div
                key={index}
                id={slug}
                className={`bg-[#18181b] border-2 transition-all duration-500 flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl group relative overflow-visible cursor-pointer h-full scroll-mt-28 ${
                  isTargeted 
                    ? "border-[#BAFC50] ring-4 ring-[#BAFC50]/40 shadow-2xl scale-[1.02]" 
                    : "border-zinc-800 hover:border-[#BAFC50]"
                } ${mobileOrderClass}`}
              >
                <div>
                {/* Header Section - Increased by 1.2mm on desktop */}
                <div className="p-6 border-b border-zinc-800 text-left space-y-3 relative h-[215px] sm:h-[calc(235px+1.2mm)] min-h-[215px] sm:min-h-[calc(235px+1.2mm)] flex flex-col justify-between overflow-visible">
                  <div>
                    <div className="flex items-center justify-between min-h-[26px]">
                      <span className={`px-2.5 py-1 font-sans text-xs uppercase tracking-wider font-bold rounded-lg ${
                        isBestChoice 
                          ? "bg-[#BAFC50] text-black font-extrabold shadow-sm" 
                          : "bg-zinc-800 text-zinc-200 border border-zinc-700/60"
                      }`}>
                        {isBestChoice ? "★ " : ""}{plan.badge}
                      </span>
                    </div>
                    
                    <div className="space-y-1 mt-2 h-[46px] sm:h-[50px] flex flex-col justify-start items-start">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-white leading-tight">{plan.title}</h3>
                      <p className="text-xs sm:text-sm font-normal text-zinc-300 line-clamp-1">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Highly visible high-contrast pricing tag container with payment term placed underneath */}
                  <div className="pt-7 pb-1 mt-2 border-l-4 border-[#BAFC50] pl-3.5 min-h-[68px] sm:min-h-[calc(72px+1.2mm)] flex flex-col justify-center relative overflow-visible">
                    {plan.originalPrice ? (
                      <div className="relative w-full overflow-visible">
                        {/* New price positioned ~1mm directly above the white price */}
                        <div className="absolute -top-[calc(1.4rem+1mm)] sm:-top-[calc(1.5rem+1mm)] left-0 sm:left-[2cm] flex items-center text-[#BAFC50] font-black z-20">
                          <span className="text-2xl sm:text-3xl lg:text-3xl font-black tracking-tight text-[#BAFC50]">{plan.price}</span>
                        </div>
                        {/* Struck-through old price in white */}
                        <div className="flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-black text-[#BAFC50] shrink-0">€</span>
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white line-through decoration-red-500 decoration-2 sm:decoration-[3px] shrink-0">
                            {plan.originalPrice}
                          </span>
                        </div>
                        {/* Subtitle / Payment period placed under the white price */}
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold font-sans text-zinc-300 mt-1 whitespace-nowrap">
                          / {plan.period}
                        </div>
                      </div>
                    ) : plan.price ? (
                      <div className="relative w-full overflow-visible">
                        <div className="flex items-baseline gap-1">
                          {plan.pricePrefix && (
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#BAFC50] mr-0.5 shrink-0">
                              {plan.pricePrefix}
                            </span>
                          )}
                          <span className="text-base sm:text-lg font-black text-[#BAFC50] shrink-0">€</span>
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white shrink-0">{plan.price}</span>
                        </div>
                        {/* Subtitle / Payment period placed under the white price */}
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold font-sans text-zinc-300 mt-1 whitespace-nowrap">
                          / {plan.period}
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full overflow-visible">
                        <span className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-wider font-sans text-[#BAFC50] block">
                          {plan.period}
                        </span>
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold font-sans text-zinc-400 mt-1 whitespace-nowrap">
                          / individuāls risinājums
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="p-4 sm:px-6 pt-1.5 pb-0 sm:pt-2 sm:pb-0 space-y-1 sm:space-y-1.5 text-left text-xs sm:text-sm text-zinc-200 font-normal">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5">
                      <div className="p-0.5 bg-[#BAFC50]/20 text-[#BAFC50] mt-0.5 shrink-0 rounded-sm">
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

                {/* CTA Action Button directly below bullet points with 1.3mm bottom margin */}
                <div className="p-4 sm:px-6 pt-0 pb-[1.3mm] sm:pt-0 sm:pb-[1.3mm] mt-auto">
                  <Link
                    to={getLocalizedPath("contact")}
                    className={`w-full py-3.5 px-4 font-bold tracking-wider text-sm uppercase transition-all duration-300 rounded-full text-center block cursor-pointer shadow-sm hover:shadow-md ${
                      plan.highlight
                        ? "bg-[#BAFC50] hover:bg-[#a8f235] text-black font-extrabold"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white hover:text-[#BAFC50]"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
            </div>
          );
        })}
        </div>

        {/* VAT Notice */}
        <p className="text-center text-xs text-zinc-400/80 font-light select-text -mt-9 mb-8">
          {lang === "LV" 
            ? "Maksājumiem PVN šobrīd netiek piemērots" 
            : lang === "EN" 
              ? "VAT is currently not applied to payments" 
              : "НДС в настоящее время к платежам не применяется"}
        </p>

        {/* Dynamic Contact Form for Pricing Proposal Request */}
        <div className="border border-zinc-800 overflow-hidden shadow-md rounded-2xl">
          <ContactForm 
            title={lang === "LV" ? "Saņemt cenas piedāvājumu" : lang === "EN" ? "Get a Pricing Offer" : "Получить предложение по цене"} 
            subtitle={t.contactForm.defaultSubtitle} 
          />
        </div>

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}
