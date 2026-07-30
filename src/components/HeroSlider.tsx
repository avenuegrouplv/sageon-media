import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Phone, Mail } from "lucide-react";
import CtaButton from "./CtaButton";

const DYNAMIC_PHRASES = [
  "strādā Jūsu biznesa labā",
  "palīdz Jūsu biznesam augt",
  "piesaista jaunus klientus",
  "pārvērš apmeklētājus par klientiem",
  "veicina Jūsu uzņēmuma izaugsmi",
  "rada reālus biznesa rezultātus",
  "strādā 24/7, lai piesaistītu klientus",
  "palīdz pārdot vairāk",
  "stiprina Jūsu zīmolu un uzticamību",
  "veido uzticību jau no pirmā iespaida"
];

export default function HeroSlider() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % DYNAMIC_PHRASES.length);
    }, 3200); // Rotate phrase every 3.2 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero-section" className="relative w-full min-h-[85vh] lg:min-h-[88vh] bg-transparent text-white overflow-visible flex items-center pt-24 pb-16">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-15 pointer-events-none overflow-hidden" />
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[#BAFC50]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-[#BAFC50]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-4">
        
        {/* Centered Phone & Email Pill Badges directly below top toolbar */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pb-6 md:pb-8">
          <a
            href="tel:+37126739899"
            className="flex items-center gap-2 px-4 py-2 bg-[#18181b]/90 hover:bg-zinc-800 border border-[#BAFC50]/40 hover:border-[#BAFC50] text-white text-[11.7px] sm:text-[12.7px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md"
          >
            <Phone className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>+371 26739899</span>
          </a>
          <a
            href="mailto:sageon.agency@gmail.com"
            className="flex items-center gap-2 px-4 py-2 bg-[#18181b]/90 hover:bg-zinc-800 border border-[#BAFC50]/40 hover:border-[#BAFC50] text-white text-[11.7px] sm:text-[12.7px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md"
          >
            <Mail className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>sageon.agency@gmail.com</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center pt-4">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left">
            {/* Agency Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181b] border border-[#BAFC50]/30 text-[#BAFC50] font-sans text-xs font-extrabold tracking-wider uppercase shadow-[0_0_15px_rgba(186,252,80,0.15)]">
              <Sparkles className="h-4 w-4 text-[#BAFC50]" />
              <span>Web Izstrādes AĢENTŪRA</span>
            </div>

            {/* Headline with Static & Dynamic Rotating Text */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-black uppercase tracking-tight leading-[1.15] text-white">
                Mēs radām mājaslapas, kas
              </h1>
              
              <div className="min-h-[70px] sm:min-h-[80px] md:min-h-[90px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] xl:text-[2.6rem] font-extrabold text-[#BAFC50] tracking-tight leading-tight block drop-shadow-[0_0_20px_rgba(186,252,80,0.35)]"
                  >
                    {DYNAMIC_PHRASES[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <CtaButton
                text="Apspriest projektu"
                to="/kontakti"
              />
              <CtaButton
                text="Uzzināt vairāk"
                to="/cenas"
              />
            </div>
          </div>

          {/* Right Image Column - Shifted 2cm to the left */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center -translate-x-10 sm:-translate-x-4 lg:translate-x-0 xl:translate-x-6">
            {/* Brighter & Vibrant Ambient Green Glow Bleeding Seamlessly Downward */}
            <div className="absolute w-[150%] h-[140%] -bottom-16 bg-gradient-to-tr from-[#38b000]/55 via-[#BAFC50]/50 to-emerald-900/20 rounded-full blur-[130px] pointer-events-none z-0" />
            <div className="absolute w-[100%] h-[80%] -bottom-10 bg-[#BAFC50]/40 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Laptop Image - Enlarged by another 20% */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 w-full flex flex-col items-center justify-center"
            >
              <img
                src="https://pub-8b5f837f405c4000a1344faa94e82086.r2.dev/Web-izstrades-agentura.webp"
                alt="Web Izstrādes Aģentūra - Sageon"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-w-[1050px] xl:max-w-[1180px] drop-shadow-[0_35px_60px_rgba(0,0,0,0.9)] scale-150 sm:scale-155 lg:scale-150 xl:scale-160 origin-center"
              />
              {/* Natural Ground Shadow */}
              <div className="w-[95%] h-7 bg-black/90 blur-xl rounded-full -mt-1 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
