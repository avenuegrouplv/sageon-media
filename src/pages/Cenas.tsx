import { useEffect } from "react";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PageNavButtons from "../components/PageNavButtons";
import ContactForm from "../components/ContactForm";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../i18n/LanguageContext";

export default function Cenas() {
  const { lang, t, getLocalizedPath } = useLanguage();

  useEffect(() => {
    document.title = t.seo.services.title;
  }, [t.seo.services.title]);

  const pricingPlans = t.pricingPlans;

  return (
    <div className="min-h-screen bg-black font-sans text-left text-white relative overflow-hidden">
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

      {/* Irregular Green Ambient Background Glows */}
      <div className="absolute -top-32 -left-20 w-[750px] h-[750px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/2 -right-24 w-[800px] h-[800px] bg-gradient-to-bl from-[#38b000]/28 via-[#BAFC50]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 left-1/3 w-[750px] h-[750px] bg-gradient-to-tr from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => {
            const isBestChoice = plan.badge === "Labākā izvēle biznesam" || plan.badge === "Best choice for business" || plan.badge === "Лучший выбор для бизнеса";
            return (
              <div
                key={index}
                className={`bg-[#18181b] border-2 transition-all duration-300 flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl group relative overflow-hidden ${
                  isBestChoice 
                    ? "border-[#BAFC50]/70 ring-1 ring-[#BAFC50]/30 shadow-[#BAFC50]/10 hover:border-[#BAFC50]" 
                    : "border-zinc-800 hover:border-[#BAFC50]"
                }`}
              >
                <div>
                  {/* Header Section */}
                  <div className="p-6 border-b border-zinc-800 text-left space-y-4 relative">
                    <div className="flex items-center justify-between min-h-[28px]">
                      <span className={`px-2.5 py-1 font-sans text-xs uppercase tracking-wider font-bold rounded-lg ${
                        isBestChoice 
                          ? "bg-[#BAFC50] text-black font-extrabold shadow-sm" 
                          : "bg-zinc-800 text-zinc-200 border border-zinc-700/60"
                      }`}>
                        {isBestChoice ? "★ " : ""}{plan.badge}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 h-[88px] min-h-[88px] flex flex-col justify-start items-start pt-1">
                      {plan.title === "Multi-page" ? (
                        <h3 className="text-2xl font-extrabold tracking-tight uppercase leading-tight px-3 py-1 rounded-lg bg-[#BAFC50]/20 border border-[#BAFC50] text-[#BAFC50] shadow-sm inline-block">
                          {plan.title}
                        </h3>
                      ) : (
                        <h3 className="text-2xl font-bold tracking-tight uppercase text-white leading-tight">{plan.title}</h3>
                      )}
                      <p className="text-sm font-normal text-zinc-300">
                        {plan.subtitle}
                      </p>
                    </div>

                    {/* Highly visible high-contrast pricing tag container */}
                    <div className="pt-3 pb-2 mt-2 border-l-4 border-[#BAFC50] pl-3.5 flex items-center gap-1.5 h-[56px] min-h-[56px]">
                      {plan.price ? (
                        <>
                          <span className="text-lg font-black text-[#BAFC50]">€</span>
                          <span className="text-5xl font-black tracking-tight text-white">{plan.price}</span>
                          <span className="text-xs uppercase tracking-wider font-semibold font-sans ml-2 text-zinc-300">
                            / {plan.period}
                          </span>
                        </>
                      ) : (
                        <span className="text-base md:text-lg font-extrabold uppercase tracking-wider font-sans text-[#BAFC50] self-center">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                {/* Features List */}
                <ul className="p-6 space-y-3.5 text-left text-sm text-zinc-200 font-normal">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5">
                      <div className="p-0.5 bg-[#BAFC50]/20 text-[#BAFC50] mt-0.5 shrink-0 rounded-sm">
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action Button */}
              <div className="p-6 pt-0">
                <Link
                  to={getLocalizedPath("contact")}
                  className={`w-full py-3.5 px-4 font-bold tracking-wider text-sm uppercase transition-all duration-300 rounded-full text-center block cursor-pointer shadow-sm hover:shadow-md ${
                    plan.highlight
                      ? "bg-[#BAFC50] hover:bg-[#a8f235] text-black shadow-lg shadow-[#BAFC50]/20 font-extrabold"
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
