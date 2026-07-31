import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show cookie banner every time the page reloads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#121215]/98 backdrop-blur-xl border-t border-zinc-800/90 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] text-white py-4 sm:py-5 px-4 sm:px-6 md:px-10 lg:px-12"
        >
          <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            
            {/* Left / Main Content Area: Cookie Notice Text */}
            <div className="flex items-start gap-3 order-1 md:order-1 flex-1">
              <div className="p-2 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl shrink-0 mt-0.5 hidden sm:flex">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="font-bold text-white text-xs sm:text-sm font-sans tracking-tight flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-[#BAFC50] sm:hidden" />
                  <span>Sīkdatņu paziņojums:</span>
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  Šī interneta vietne izmanto sīkdatnes, lai uzlabotu lietošanas pieredzi un optimizētu tās darbību. Lietojot šo interneta vietni, Jūs piekrītat sīkdatņu lietošanai.
                </p>
              </div>
            </div>

            {/* Right Side: 3 Horizontal Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 order-2 md:order-2">
              {/* Button 1: Piekrītu */}
              <button
                onClick={handleAccept}
                className="px-5 py-2 sm:py-2.5 bg-[#BAFC50] hover:bg-[#a6ed38] text-black font-sans font-bold text-xs sm:text-sm tracking-wide rounded-full shadow-md hover:shadow-[#BAFC50]/20 transition-all duration-200 cursor-pointer active:scale-95"
              >
                Piekrītu
              </button>

              {/* Button 2: Noraidīt */}
              <button
                onClick={handleDecline}
                className="px-5 py-2 sm:py-2.5 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 font-sans font-semibold text-xs sm:text-sm tracking-wide rounded-full transition-all duration-200 cursor-pointer active:scale-95"
              >
                Noraidīt
              </button>

              {/* Button 3: Uzzināt vairāk */}
              <Link
                to="/buj"
                className="px-4 py-2 sm:py-2.5 text-zinc-300 hover:text-[#BAFC50] underline underline-offset-4 decoration-zinc-600 hover:decoration-[#BAFC50] font-sans font-medium text-xs sm:text-sm tracking-wide transition-colors duration-200"
              >
                Uzzināt vairāk
              </Link>
            </div>

            {/* Close Cross Button */}
            <button
              onClick={handleDecline}
              aria-label="Aizvērt"
              className="absolute top-3 right-3 text-zinc-500 hover:text-white p-1 rounded-full hover:bg-zinc-800/60 transition-colors cursor-pointer md:static order-3 shrink-0"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
