import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Cookie, Mail } from "lucide-react";

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookieModal({ isOpen, onClose }: CookieModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#121215] border border-zinc-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl z-10 max-h-[85vh] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl">
                  <Cookie className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Sīkdatņu politika
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    Pēdējo reizi atjaunots: 2026. gada janvārī
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Aizvērt"
                className="p-2 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="py-5 overflow-y-auto space-y-6 pr-2 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed flex-1 scrollbar-thin scrollbar-thumb-zinc-700">
              
              {/* Section 1 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">1.</span> Kas ir sīkdatnes?
                </h4>
                <p>
                  Sīkdatnes (cookies) ir mazi teksta faili, ko tīmekļa vietne saglabā Jūsu datorā vai mobilajā ierīcē, kad Jūs to apmeklējat. Katrā nākamajā apmeklējuma reizē sīkdatnes tiek nosūtītas atpakaļ uz izcelsmes vietni vai trešās puses vietni, kas atpazīst attiecīgo sīkdatni.
                </p>
                <p>
                  Sīkdatnes darbojas kā konkrētas vietnes atmiņa, ļaujot vietnei atcerēties Jūsu iestatījumus un darbības (piemēram, valodu, fontu izmērus un citus attēlošanas iestatījumus), lai Jums tie nebūtu jāievada no jauna katru reizi.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">2.</span> Kāpēc mēs izmantojam sīkdatnes?
                </h4>
                <p>
                  <strong className="text-white font-semibold">SageOn Media</strong> izmanto sīkdatnes šādiem mērķiem:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-300">
                  <li>
                    <strong className="text-zinc-100 font-semibold">Vietnes funkcionalitātes nodrošināšanai:</strong> Lai tīmekļa vietne varētu darboties un nodrošināt pamatfunkcijas.
                  </li>
                  <li>
                    <strong className="text-zinc-100 font-semibold">Lietošanas pieredzes uzlabošanai:</strong> Lai atcerētos Jūsu izvēles un sniegtu personalizētāku saturu.
                  </li>
                  <li>
                    <strong className="text-zinc-100 font-semibold">Analītikai un statistikai:</strong> Lai saprastu, kā apmeklētāji mijiedarbojas ar vietni (kuras lapas apmeklē visbiežāk, cik ilgi uzturas vietnē), kas palīdz mums uzlabot vietnes struktūru un saturu.
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">3.</span> Izmantoto sīkdatņu veidi
                </h4>
                
                <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl space-y-1.5">
                  <h5 className="font-semibold text-white text-xs sm:text-sm text-[#BAFC50]">
                    Nepieciešamās sīkdatnes
                  </h5>
                  <p className="text-xs text-zinc-300">
                    Šīs sīkdatnes ir būtiskas, lai vietne varētu darboties. Bez tām dažas vietnes daļas var nedarboties pareizi. Tās parasti tiek iestatītas tikai reaģējot uz Jūsu veiktajām darbībām, piemēram, aizpildot kontaktformas.
                  </p>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl space-y-1.5">
                  <h5 className="font-semibold text-white text-xs sm:text-sm text-[#BAFC50]">
                    Analītikas sīkdatnes
                  </h5>
                  <p className="text-xs text-zinc-300">
                    Mēs izmantojam trešo pušu rīkus (piemēram, Google Analytics), lai apkopotu anonīmu informāciju par apmeklētāju skaitu un populārākajām lapām. Šie dati mums palīdz uzlabot lietotāju pieredzi.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">4.</span> Kā pārvaldīt un izdzēst sīkdatnes?
                </h4>
                <p>
                  Lielākā daļa pārlūkprogrammu ir iestatītas tā, lai automātiski pieņemtu sīkdatnes. Jūs varat jebkurā laikā mainīt Savas pārlūkprogrammas iestatījumus, lai bloķētu sīkdatnes vai saņemtu brīdinājumu, kad tās tiek sūtītas.
                </p>
                <p className="font-medium text-white pt-1">
                  Instrukcijas populārākajām pārlūkprogrammām:
                </p>

                {/* 4 Browser Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#BAFC50]/40 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white transition-all duration-200 group"
                  >
                    <span>Google Chrome</span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#BAFC50] transition-colors" />
                  </a>

                  <a
                    href="https://support.apple.com/lv-lv/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#BAFC50]/40 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white transition-all duration-200 group"
                  >
                    <span>Safari</span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#BAFC50] transition-colors" />
                  </a>

                  <a
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#BAFC50]/40 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white transition-all duration-200 group"
                  >
                    <span>Mozilla Firefox</span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#BAFC50] transition-colors" />
                  </a>

                  <a
                    href="https://support.microsoft.com/lv-lv/topic/168dab11-0753-043d-7c16-ede5947798d2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#BAFC50]/40 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white transition-all duration-200 group"
                  >
                    <span>MS Edge</span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#BAFC50] transition-colors" />
                  </a>
                </div>

                <p className="text-zinc-400 italic pt-2">
                  <strong className="text-zinc-300 not-italic font-semibold">Ievērojiet:</strong> Ja Jūs bloķēsiet sīkdatnes, dažas mūsu tīmekļa vietnes funkcijas var nebūt pieejamas vai darboties nepilnīgi.
                </p>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#BAFC50] shrink-0" />
                  <p className="text-xs text-zinc-300">
                    Ja Jums ir jautājumi par mūsu sīkdatņu politiku, lūdzu, sazinieties ar mums, rakstot uz:{" "}
                    <a
                      href="mailto:sageon.media@gmail.com"
                      className="text-[#BAFC50] hover:underline font-medium"
                    >
                      sageon.media@gmail.com
                    </a>
                  </p>
                </div>
              </div>

            </div>

            {/* Footer / Action */}
            <div className="pt-4 border-t border-zinc-800/80 flex justify-end shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#BAFC50] hover:bg-[#a6ed38] text-black font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer shadow-md active:scale-95"
              >
                Sapratu un aizvērt
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
