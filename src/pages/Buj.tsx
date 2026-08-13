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
      <div className="absolute -top-32 -right-20 w-[850px] h-[500px] -rotate-12 rounded-[50%_50%_70%_30%] bg-gradient-to-br from-[#BAFC50]/[0.09] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[10%] -left-16 w-[750px] h-[450px] rotate-6 rounded-[40%_60%_30%_70%] bg-gradient-to-tr from-[#BAFC50]/[0.07] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[22%] right-10 w-[780px] h-[460px] -rotate-6 rounded-[50%_50%_40%_60%] bg-gradient-to-l from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[35%] -right-16 w-[750px] h-[450px] -rotate-6 rounded-[55%_45%_60%_40%] bg-gradient-to-bl from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[48%] -left-20 w-[820px] h-[480px] rotate-12 rounded-[60%_40%_50%_50%] bg-gradient-to-r from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="absolute top-[60%] -left-24 w-[900px] h-[550px] rotate-12 rounded-[60%_40%_50%_50%] bg-gradient-to-br from-[#38b000]/[0.09] via-[#BAFC50]/[0.05] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[72%] right-10 w-[800px] h-[480px] -rotate-12 rounded-[45%_55%_65%_35%] bg-gradient-to-tl from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[85%] left-10 w-[800px] h-[480px] rotate-6 rounded-[50%_50%_60%_40%] bg-gradient-to-tr from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 right-1/4 w-[850px] h-[500px] -rotate-6 rounded-[35%_65%_45%_55%] bg-gradient-to-tl from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      
      {/* Mobile Glows */}
      <div className="sm:hidden absolute top-[5%] -right-12 w-72 h-56 rotate-12 rounded-[40%_60%_50%_50%] bg-gradient-to-l from-[#BAFC50]/[0.09] via-[#38b000]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[18%] -left-12 w-72 h-56 -rotate-12 rounded-[50%_50%_60%_40%] bg-gradient-to-r from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[32%] -right-12 w-72 h-56 rotate-6 rounded-[50%_50%_40%_60%] bg-gradient-to-l from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[46%] -left-12 w-72 h-56 -rotate-6 rounded-[40%_60%_50%_50%] bg-gradient-to-r from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[60%] -right-12 w-72 h-56 rotate-6 rounded-[40%_60%_50%_50%] bg-gradient-to-l from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[74%] -left-12 w-72 h-56 -rotate-12 rounded-[50%_50%_60%_40%] bg-gradient-to-r from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[88%] -right-12 w-72 h-56 rotate-12 rounded-[40%_60%_50%_50%] bg-gradient-to-l from-[#38b000]/[0.07] via-[#BAFC50]/[0.03] to-transparent blur-[110px] pointer-events-none z-0" />

      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20 space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
            <HelpCircle className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>{lang === "LV" ? "Biežāk uzdotie jautājumi" : t.nav.faq}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
            {lang === "LV" ? <>Te ir viss, kas Jūs <span className="text-[#BAFC50]">varētu interesēt</span></> : lang === "EN" ? <>Frequently Asked <span className="text-[#BAFC50]">Questions</span></> : <>Часто задаваемые <span className="text-[#BAFC50]">вопросы</span></>}
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
