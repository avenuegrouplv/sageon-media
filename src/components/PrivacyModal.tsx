import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Mail, Phone, ExternalLink } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  useEffect(() => {
    if (isOpen) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.stop();
      }
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        if (lenis) {
          lenis.start();
        }
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
            data-lenis-prevent
            className="relative w-full max-w-2xl bg-[#121215] border border-zinc-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl z-10 max-h-[85vh] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Privātuma politika
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
            <div 
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="py-5 overflow-y-auto space-y-6 pr-2 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed flex-1 scrollbar-thin scrollbar-thumb-zinc-700"
            >
              
              {/* Section 1 */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">1.</span> Ievads
                </h4>
                <p>
                  Datu pārzinis un vietnes administrators SIA &quot;XXXXXX&quot;, reģ. Nr. XXXXXXX, juridiskā adrese: Rīga, XXXXXXX (turpmāk – &quot;mēs&quot;, &quot;mūsu&quot; vai &quot;Uzņēmums&quot;), apņemas aizsargāt un ievērot Jūsu tiesības uz privātumu. Šajā Privātuma politikā ir skaidrots, kā mēs apkopojam, izmantojam, glabājam un aizsargājam Jūsu personas datus saskaņā ar Eiropas Parlamenta un Padomes Regulu (ES) 2016/679 (Vispārīgā datu aizsardzības regula jeb GDPR) un Latvijas Republikas piemērojamajiem normatīvajiem aktiem.
                </p>
                <p>
                  Lūdzam iepazīties ar šo Privātuma politiku pirms mūsu mājaslapas un pakalpojumu izmantošanas. Izmantojot mūsu mājaslapu un pakalpojumus, Jūs apliecināt, ka esat iepazinies ar šo Privātuma politiku.
                </p>

                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2 mt-3">
                  <h5 className="font-semibold text-white text-xs sm:text-sm text-[#BAFC50]">
                    Kontaktinformācija:
                  </h5>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs text-zinc-300">
                    <a href="mailto:info@sageonmedia.eu" className="flex items-center gap-2 hover:text-[#BAFC50] transition-colors">
                      <Mail className="h-3.5 w-3.5 text-[#BAFC50]" />
                      <span>E-pasts: info@sageonmedia.eu</span>
                    </a>
                    <a href="tel:26739899" className="flex items-center gap-2 hover:text-[#BAFC50] transition-colors">
                      <Phone className="h-3.5 w-3.5 text-[#BAFC50]" />
                      <span>Tālr. 26739899</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">2.</span> Juridiskais pamats
                </h4>
                <p>
                  Personas datu apstrādātājs – Latvijas Republikas Uzņēmumu reģistra Komercreģistrā reģistrētas juridiskas personas, kas Sabiedrības uzdevumā iegūst un apstrādā Klienta datus, lai nodrošinātu Pakalpojumu sniegšanu Sabiedrības vārdā. Personas datu apstrādātājs veic datu apstrādi ievērojot Sabiedrības norādījumus un izmantojot tehniskus un organizatoriskus pasākumus apstrādā Klientu datus tādā apmērā un kārtībā, kā to prasa un atļauj Latvijas Republikas un Eiropas Savienības normatīvie akti. Piemērojamie normatīvie akti – Eiropas Parlamenta un padomes Regula Nr.2016/679 par fizisku personu aizsardzību attiecībā uz personas datu apstrādi un šādu datu brīvu apriti (2016. gada 27.aprīlis); Fizisko personu datu apstrādes likums.
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">3.</span> Kādus personas datus mēs vācam
                </h4>
                <p>Mēs varam apkopot un apstrādāt šādu informāciju par Jums:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-300">
                  <li>
                    <strong className="text-zinc-100 font-semibold">Kontaktinformācija:</strong> vārds, uzņēmuma nosaukums, e-pasta adrese, tālruņa numurs
                  </li>
                  <li>
                    <strong className="text-zinc-100 font-semibold">Tehniskā informācija:</strong> IP adrese, pārlūkprogrammas veids, ierīces informācija, apmeklējuma laiks un datums
                  </li>
                  <li>
                    <strong className="text-zinc-100 font-semibold">Lietošanas dati:</strong> informācija par to, kā Jūs izmantojat mūsu mājas lapu un pakalpojumus
                  </li>
                  <li>
                    <strong className="text-zinc-100 font-semibold">Saziņas dati:</strong> Jūsu ziņojumu un komunikācijas saturs ar mūsu uzņēmumu
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">4.</span> Kā mēs izmantojam Jūsu datus
                </h4>
                <p>Mēs izmantojam Jūsu personas datus šādiem mērķiem:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-300">
                  <li>Lai sniegtu Jums pieprasītos pakalpojumus un atbildētu uz Jūsu pieprasījumiem</li>
                  <li>Lai sazinātos ar Jums par mūsu pakalpojumiem un piedāvājumiem</li>
                  <li>Lai uzlabotu mūsu mājas lapu un pakalpojumu kvalitāti</li>
                  <li>Lai izpildītu juridiskās saistības un aizsargātu savas likumīgās intereses</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">5.</span> Juridiskais pamats datu apstrādei
                </h4>
                <p>Mēs apstrādājam Jūsu personas datus, pamatojoties uz:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-300">
                  <li><strong className="text-zinc-100 font-semibold">Jūsu piekrišanu</strong> – kad Jūs aizpildāt mūsu kontaktformu un piekrītat datu apstrādes noteikumiem</li>
                  <li><strong className="text-zinc-100 font-semibold">Līguma izpildi</strong> – lai sniegtu Jums pieprasītos pakalpojumus</li>
                  <li><strong className="text-zinc-100 font-semibold">Likumīgas intereses</strong> – lai uzlabotu mūsu pakalpojumus un aizsargātu uzņēmumu</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">6.</span> Datu uzglabāšana un drošība
                </h4>
                <p>
                  Mēs uzglabājam Jūsu personas datus tikai tik ilgi, cik tas ir nepieciešams šajā politikā norādīto mērķu sasniegšanai vai saskaņā ar likumu.
                </p>
                <p>
                  Mēs izmantojam atbilstošus tehniskos un organizatoriskos drošības pasākumus, lai aizsargātu Jūsu datus pret nesankcionētu piekļuvi, izmantošanu vai izpaušanu:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1 text-zinc-300">
                  <li>SSL šifrēšana datu pārsūtīšanai</li>
                  <li>Ierobežota piekļuve personas datiem</li>
                  <li>Regulāras drošības pārbaudes un atjauninājumi</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">7.</span> Jūsu tiesības
                </h4>
                <p>Saskaņā ar GDPR Jums ir šādas tiesības attiecībā uz Saviem personas datiem:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-300">
                  <li><strong className="text-zinc-100 font-semibold">Piekļuves tiesības</strong> – pieprasīt piekļuvi Saviem personas datiem</li>
                  <li><strong className="text-zinc-100 font-semibold">Labošanas tiesības</strong> – labot neprecīzus vai nepilnīgus datus</li>
                  <li><strong className="text-zinc-100 font-semibold">Dzēšanas tiesības</strong> – pieprasīt Savu datu dzēšanu (&quot;tiesības tikt aizmirstam&quot;)</li>
                  <li><strong className="text-zinc-100 font-semibold">Ierobežošanas tiesības</strong> – ierobežot Savu datu apstrādi</li>
                  <li><strong className="text-zinc-100 font-semibold">Pārnesamības tiesības</strong> – saņemt Savus datus strukturētā formātā</li>
                  <li><strong className="text-zinc-100 font-semibold">Iebildumu tiesības</strong> – iebilst pret Savu datu apstrādi</li>
                  <li><strong className="text-zinc-100 font-semibold">Atsaukt piekrišanu</strong> – jebkurā laikā atsaukt Savu piekrišanu datu apstrādei</li>
                </ul>
                <p className="pt-1 text-zinc-400">
                  Lai izmantotu Savas tiesības, lūdzu, sazinieties ar mums, izmantojot kontaktinformāciju, kas norādīta šīs politikas sākumā.
                </p>
              </div>

              {/* Section 8 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">8.</span> Sīkdatnes (Cookies)
                </h4>
                <p>
                  Mūsu mājas lapa izmanto sīkdatnes, lai uzlabotu Jūsu lietošanas pieredzi un analizētu mājas lapas apmeklējumu. Sīkdatnes ir mazi teksta faili, kas tiek saglabāti Jūsu ierīcē.
                </p>
                <p>
                  Mēs izmantojam nepieciešamās sīkdatnes (nodrošina pamata funkcionalitāti) un analītikas sīkdatnes (palīdz saprast, kā apmeklētāji izmanto lapu). Jūs varat pārvaldīt sīkdatnes Savā pārlūkprogrammā.
                </p>
              </div>

              {/* Section 9 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">9.</span> Trešo pušu pakalpojumi
                </h4>
                <p>
                  Mēs varam izmantot uzticamus trešo pušu pakalpojumu sniedzējus, piemēram, mājas lapas mitināšanas pakalpojumus, e-pasta sūtīšanas pakalpojumus un analītikas rīkus (Google Analytics). Šie sniedzēji piekļūst datiem tikai tiktāl, cik tas nepieciešams to uzdevumu veikšanai.
                </p>
              </div>

              {/* Section 10 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">10.</span> Izmaiņas privātuma politikā
                </h4>
                <p>
                  Mēs paturam tiesības jebkurā laikā atjaunināt šo privātuma politiku. Izmaiņas stāsies spēkā, tiklīdz atjauninātā politika tiks publicēta mūsu mājas lapā.
                </p>
              </div>

              {/* Section 11 */}
              <div className="space-y-3 pt-2 border-t border-zinc-800">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">11.</span> Sūdzības
                </h4>
                <p>
                  Ja Jums ir sūdzības, lūdzu, vispirms sazinieties ar mums. Jums ir arī tiesības iesniegt sūdzību Datu valsts inspekcijā:
                </p>

                <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl space-y-2 text-xs">
                  <h5 className="font-bold text-white text-sm text-[#BAFC50]">
                    Datu valsts inspekcija
                  </h5>
                  <p className="text-zinc-300">
                    <strong className="text-white">Adrese:</strong> Blaumaņa iela 11/13-15, Rīga, LV-1011
                  </p>
                  <p className="text-zinc-300">
                    <strong className="text-white">E-pasts:</strong>{" "}
                    <a href="mailto:info@dvi.gov.lv" className="text-[#BAFC50] hover:underline">
                      info@dvi.gov.lv
                    </a>
                  </p>
                  <p className="text-zinc-300">
                    <strong className="text-white">Tālrunis:</strong> +371 67 22 31 31
                  </p>
                  <p className="text-zinc-300 flex items-center gap-1.5 pt-1">
                    <strong className="text-white">Mājas lapa:</strong>{" "}
                    <a
                      href="https://www.dvi.gov.lv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#BAFC50] hover:underline inline-flex items-center gap-1"
                    >
                      www.dvi.gov.lv
                      <ExternalLink className="h-3 w-3" />
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
