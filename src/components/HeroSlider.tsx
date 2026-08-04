import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Phone, Mail } from "lucide-react";
import CtaButton from "./CtaButton";
import { useLanguage } from "../i18n/LanguageContext";

const DYNAMIC_PHRASES = {
  LV: [
    "palīdz uzņēmumiem iegūt vairāk klientu",
    "pārvērš apmeklētājus par klientiem",
    "strādā Jūsu biznesa labā",
    "palīdz Jūsu biznesam augt",
    "palīdz piesaistīt vairāk jaunu klientu",
    "veicina Jūsu uzņēmuma izaugsmi",
    "palīdz pārdot vairāk",
    "stiprina Jūsu zīmolu un uzticamību",
    "veido uzticību jau no pirmā iespaida"
  ],
  EN: [
    "help businesses acquire more customers",
    "turn visitors into real purchases or inquiries",
    "work for your business",
    "help your business grow",
    "help attract more new clients",
    "convert visitors into clients",
    "drive company growth",
    "help you sell more",
    "strengthen your brand & trust",
    "build trust from first impression"
  ],
  RU: [
    "помогают компаниям получать больше клиентов",
    "превращают посетителей в реальные покупки и заявки",
    "работают на ваш бизнес",
    "помогают вашему бизнесу расти",
    "помогают привлекать больше новых клиентов",
    "превращают посетителей в клиентов",
    "способствуют росту компании",
    "помогают продавать больше",
    "укрепляют доверие к бренду",
    "создают доверие с первого взгляда"
  ]
};

export default function HeroSlider() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const { lang, getLocalizedPath } = useLanguage();

  const phrases = DYNAMIC_PHRASES[lang] || DYNAMIC_PHRASES.LV;

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <section id="hero-section" className="relative w-full min-h-[80vh] lg:min-h-[88vh] bg-transparent text-white overflow-visible flex items-center pt-20 sm:pt-24 pb-4 sm:pb-10 md:pb-16">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-15 pointer-events-none overflow-hidden" />
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[#BAFC50]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-[#BAFC50]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-4">
        
        {/* Centered Phone & Email Pill Badges */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-2 sm:-mt-18 lg:-mt-24 pb-6 md:pb-8">
          <a
            href="tel:+37126739899"
            className="flex items-center gap-2 px-4 py-2 bg-[#18181b]/90 hover:bg-zinc-800 border border-[#BAFC50]/40 hover:border-[#BAFC50] text-white text-[11.7px] sm:text-[12.7px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md"
          >
            <Phone className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>+371 26739899</span>
          </a>
          <a
            href="mailto:info@sageonmedia.eu"
            className="flex items-center gap-2 px-4 py-2 bg-[#18181b]/90 hover:bg-zinc-800 border border-[#BAFC50]/40 hover:border-[#BAFC50] text-white text-[12px] sm:text-[13px] font-medium rounded-full transition-all duration-300 shadow-md"
          >
            <Mail className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span className="normal-case font-normal">info@sageonmedia.eu</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center pt-2">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Agency Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181b] border border-[#BAFC50]/30 text-[#BAFC50] font-sans text-xs font-extrabold tracking-wider uppercase shadow-[0_0_15px_rgba(186,252,80,0.15)]"
            >
              <Sparkles className="h-4 w-4 text-[#BAFC50]" />
              <span>
                {lang === "LV" 
                  ? "Web Izstrādes Aģentūra" 
                  : lang === "EN" 
                    ? "Web Development Agency" 
                    : "Агентство веб-разработки"}
              </span>
            </motion.div>

            {/* Headline with Static & Dynamic Rotating Text */}
            <div className="space-y-3 w-full">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.85rem] font-black uppercase tracking-wide leading-[1.25] [word-spacing:0.12em] text-white text-center lg:text-left">
                {lang === "LV" 
                  ? "Mēs izstrādājam modernas mājaslapas, kas..." 
                  : lang === "EN" 
                    ? "We develop modern websites that..." 
                    : "Мы разрабатываем современные сайты, которые..."}
              </h1>
              
              <div className="h-[80px] sm:h-[90px] md:h-[100px] lg:h-[105px] xl:h-[110px] flex items-center justify-center lg:justify-start overflow-hidden relative w-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${lang}-${phraseIndex}`}
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.35rem] font-extrabold text-[#BAFC50] tracking-normal leading-tight block drop-shadow-[0_0_20px_rgba(186,252,80,0.35)] text-center lg:text-left"
                  >
                    {phrases[phraseIndex % phrases.length]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
            >
              <CtaButton
                text={lang === "LV" ? "saņemt bezmaksas konsultāciju" : lang === "EN" ? "Get Free Consultation" : "Получить бесплатную консультацию"}
                to={getLocalizedPath("contact")}
              />
              <CtaButton
                text={lang === "LV" ? "apskatīt cenas" : lang === "EN" ? "View Pricing" : "Посмотреть цены"}
                to={getLocalizedPath("services")}
              />
            </motion.div>
          </motion.div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center translate-x-0 lg:translate-x-0 mt-4 mb-2 lg:my-0">
            <div className="absolute w-[140%] sm:w-[150%] h-[130%] sm:h-[140%] -bottom-12 sm:-bottom-16 bg-gradient-to-tr from-[#38b000]/55 via-[#BAFC50]/50 to-emerald-900/20 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none z-0" />
            <div className="absolute w-[90%] sm:w-[100%] h-[70%] sm:h-[80%] -bottom-8 sm:-bottom-10 bg-[#BAFC50]/40 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none z-0" />

            <div className="relative z-10 w-full flex flex-col items-center justify-center">
              <img
                src="/Hero.webp"
                alt="Sageon Media Web Agency"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={1180}
                height={720}
                className="w-full h-auto object-contain max-w-[540px] lg:max-w-[940px] xl:max-w-[1100px] drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] translate-x-0 lg:translate-x-[180px] translate-y-0 lg:translate-y-[38px] scale-100 lg:scale-[1.40] origin-center mx-auto py-2 sm:py-0"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
