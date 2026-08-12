import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Mail, Phone } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const { lang } = useLanguage();
  const isEn = lang === "EN";
  const isRu = lang === "RU";

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
                    {isEn ? "Privacy Policy" : isRu ? "Политика конфиденциальности" : "Privātuma politika"}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    {isEn ? "Last updated: January 2026" : isRu ? "Последнее обновление: январь 2026" : "Pēdējo reizi atjaunots: 2026. gada janvārī"}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label={isEn ? "Close" : isRu ? "Закрыть" : "Aizvērt"}
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
                  <span className="text-[#BAFC50]">1.</span> {isEn ? "Introduction" : isRu ? "Введение" : "Ievads"}
                </h4>
                <p>
                  {isEn 
                    ? "Data controller and site administrator SIA \"Avenue Group\", Reg. No. 40203647938, legal address: Riga, Brīvības gatve 386/2-5A (hereinafter – \"we\", \"our\" or \"Company\"), is committed to protecting and respecting your right to privacy. This Privacy Policy explains how we collect, use, store, and protect your personal data in accordance with Regulation (EU) 2016/679 (GDPR) and applicable regulations."
                    : isRu
                      ? "Контроллер данных и администратор сайта SIA \"Avenue Group\", Рег. № 40203647938, юридический адрес: Рига, Brīvības gatve 386/2-5A (далее — \"мы\", \"наш\" или \"Компания\"), обязуется защищать и уважать ваше право на конфиденциальность. Данная политика объясняет порядок сбора, использования и защиты персональных данных согласно GDPR."
                      : "Datu pārzinis un vietnes administrators SIA \"Avenue Group\", Reģ.Nr. 40203647938, juridiskā adrese: Rīga, Brīvības gatve 386/2-5A (turpmāk – \"mēs\", \"mūsu\" vai \"Uzņēmums\"), apņemas aizsargāt un ievērot Jūsu tiesības uz privātumu. Šajā Privātuma politikā ir skaidrots, kā mēs apkopojam, izmantojam, glabājam un aizsargājam Jūsu personas datus saskaņā ar Eiropas Parlamenta un Padomes Regulu (ES) 2016/679 (Vispārīgā datu aizsardzības regula jeb GDPR) un Latvijas Republikas piemērojamajiem normatīvajiem aktiem."}
                </p>

                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2 mt-3">
                  <h5 className="font-semibold text-white text-xs sm:text-sm text-[#BAFC50]">
                    {isEn ? "Contact Details:" : isRu ? "Контактная информация:" : "Kontaktinformācija:"}
                  </h5>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs text-zinc-300">
                    <a href="mailto:info@sageonmedia.eu" className="flex items-center gap-2 hover:text-[#BAFC50] transition-colors">
                      <Mail className="h-3.5 w-3.5 text-[#BAFC50]" />
                      <span>{isEn ? "Email:" : isRu ? "Эл. почта:" : "E-pasts:"} info@sageonmedia.eu</span>
                    </a>
                    <a href="tel:26739899" className="flex items-center gap-2 hover:text-[#BAFC50] transition-colors">
                      <Phone className="h-3.5 w-3.5 text-[#BAFC50]" />
                      <span>{isEn ? "Phone:" : isRu ? "Тел.:" : "Tālr."} +371 26739899</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">2.</span> {isEn ? "Legal Framework" : isRu ? "Правовая основа" : "Juridiskais pamats"}
                </h4>
                <p>
                  {isEn 
                    ? "Personal data processor – legal entities registered in the Commercial Register of the Republic of Latvia that process Client data on behalf of the Company to provide services. Applicable laws include Regulation (EU) 2016/679 (GDPR) and national data protection laws."
                    : isRu
                      ? "Обработчик персональных данных — юридические лица, зарегистрированные в коммерческом реестре Латвийской Республики, обрабатывающие данные клиентов по поручению Компании для предоставления услуг в соответствии с GDPR."
                      : "Personas datu apstrādātājs – Latvijas Republikas Uzņēmumu reģistra Komercreģistrā reģistrētas juridiskas personas, kas Sabiedrības uzdevumā iegūst un apstrādā Klienta datus, lai nodrošinātu Pakalpojumu sniegšanu Sabiedrības vārdā."}
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">3.</span> {isEn ? "Data We Collect" : isRu ? "Какие данные мы собираем" : "Kādus personas datus mēs vācam"}
                </h4>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-300">
                  <li>
                    <strong className="text-zinc-100 font-semibold">{isEn ? "Contact Info:" : isRu ? "Контактные данные:" : "Kontaktinformācija:"}</strong> {isEn ? "Name, company name, email address, phone number" : isRu ? "Имя, название компании, e-mail, телефон" : "vārds, uzņēmuma nosaukums, e-pasta adrese, tālruņa numurs"}
                  </li>
                  <li>
                    <strong className="text-zinc-100 font-semibold">{isEn ? "Technical Data:" : isRu ? "Технические данные:" : "Tehniskā informācija:"}</strong> {isEn ? "IP address, browser type, device details, visit time" : isRu ? "IP-адрес, тип браузера, сведения об устройстве" : "IP adrese, pārlūkprogrammas veids, ierīces informācija"}
                  </li>
                  <li>
                    <strong className="text-zinc-100 font-semibold">{isEn ? "Usage Data:" : isRu ? "Данные об использовании:" : "Lietošanas dati:"}</strong> {isEn ? "Information on how you navigate our website and services" : isRu ? "Информация об использовании сайта и услуг" : "informācija par to, kā Jūs izmantojat mūsu mājas lapu"}
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">4.</span> {isEn ? "How We Use Your Data" : isRu ? "Как мы используем ваши данные" : "Kā mēs izmantojam Jūsu datus"}
                </h4>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-300">
                  <li>{isEn ? "To provide requested services and answer inquiries" : isRu ? "Для предоставления запрашиваемых услуг и ответов на запросы" : "Lai sniegtu Jums pieprasītos pakalpojumus un atbildētu uz Jūsu pieprasījumiem"}</li>
                  <li>{isEn ? "To communicate regarding service offers and updates" : isRu ? "Для связи по поводу услуг и предложений" : "Lai sazinātos ar Jums par mūsu pakalpojumiem un piedāvājumiem"}</li>
                  <li>{isEn ? "To improve website quality and service user experience" : isRu ? "Для улучшения качества нашего сайта и услуг" : "Lai uzlabotu mūsu mājas lapu un pakalpojumu kvalitāti"}</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">5.</span> {isEn ? "Your Rights" : isRu ? "Ваши права" : "Jūsu tiesības"}
                </h4>
                <p>{isEn ? "Under GDPR, you have the right to access, rectify, erase, or restrict processing of your personal data." : isRu ? "В соответствии с GDPR вы имеете право на доступ, исправление, удаление и ограничение обработки ваших данных." : "Saskaņā ar GDPR Jums ir tiesības pieprasīt piekļuvi, labot, dzēst vai ierobežot Savu personas datu apstrādi."}</p>
              </div>

            </div>

            {/* Footer / Action */}
            <div className="pt-4 border-t border-zinc-800/80 flex justify-end shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#BAFC50] hover:bg-[#a6ed38] text-black font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer shadow-md active:scale-95"
              >
                {isEn ? "Understand & Close" : isRu ? "Понятно, закрыть" : "Sapratu un aizvērt"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

