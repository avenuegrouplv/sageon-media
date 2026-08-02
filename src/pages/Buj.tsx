import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle } from "lucide-react";
import PageNavButtons from "../components/PageNavButtons";
import StylizedCrossIcon from "../components/StylizedCrossIcon";
import CtaButton from "../components/CtaButton";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../i18n/LanguageContext";

export default function Buj() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang, t, getLocalizedPath } = useLanguage();

  useEffect(() => {
    document.title = t.seo.faq.title;
  }, [t.seo.faq.title]);

  const faqItems = t.faqItems;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-left text-white relative overflow-hidden">
      <SEOHead
        title={t.seo.faq.title}
        description={t.seo.faq.description}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://sageonmedia.eu/buj#webpage",
            "url": "https://sageonmedia.eu/buj",
            "name": t.seo.faq.title,
            "description": t.seo.faq.description,
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
                "name": "FAQ",
                "item": "https://sageonmedia.eu/buj"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]}
      />
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

      {/* Irregular Green Ambient Background Glows */}
      <div className="absolute -top-32 -right-20 w-[750px] h-[750px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/2 -left-24 w-[800px] h-[800px] bg-gradient-to-tr from-[#38b000]/28 via-[#BAFC50]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 right-1/4 w-[750px] h-[750px] bg-gradient-to-tl from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20 space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
            <HelpCircle className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>{t.nav.faq}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
            {lang === "LV" ? <>Biežāk uzdotie <span className="text-[#BAFC50]">jautājumi</span></> : lang === "EN" ? <>Frequently Asked <span className="text-[#BAFC50]">Questions</span></> : <>Часто задаваемые <span className="text-[#BAFC50]">вопросы</span></>}
          </h1>
          <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto font-light text-center">
            {t.faqPage.subtitle}
          </p>
        </div>

        {/* FAQ Accordions with smooth animations */}
        <div className="space-y-4 mt-12">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#18181b] border border-zinc-800 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left p-5 md:p-6 cursor-pointer focus:outline-none group select-none"
                >
                  <span className="font-bold text-white text-sm md:text-base group-hover:text-[#BAFC50] transition-colors pr-2">
                    {faq.question}
                  </span>
                  <StylizedCrossIcon isOpen={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-7 text-xs md:text-sm text-white border-t border-zinc-800 pt-4 leading-relaxed font-normal whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* FAQ bottom text & button (no frame) */}
        <div className="text-center space-y-5 pt-10 max-w-2xl mx-auto">
          <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
            {t.faqPage.notFoundText}
          </p>
          <div className="flex items-center justify-center pt-2">
            <CtaButton text={t.faqPage.askQuestionBtn} to={getLocalizedPath("contact")} />
          </div>
        </div>

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}
