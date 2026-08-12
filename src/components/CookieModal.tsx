import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Cookie, Mail, Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreferences?: () => void;
}

export default function CookieModal({ isOpen, onClose, onSavePreferences }: CookieModalProps) {
  const { lang } = useLanguage();
  const isEn = lang === "EN";
  const isRu = lang === "RU";

  const [analytics, setAnalytics] = useState(true);
  const [functional, setFunctional] = useState(true);
  const [marketing, setMarketing] = useState(false);

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

  const handleSave = (customAnalytics: boolean, customFunctional: boolean, customMarketing: boolean) => {
    try {
      const val = JSON.stringify({
        necessary: true,
        analytics: customAnalytics,
        functional: customFunctional,
        marketing: customMarketing,
      });
      localStorage.setItem("sageon_cookie_consent_v2", val);
      sessionStorage.setItem("sageon_cookie_consent_v2", val);
    } catch (e) {
      console.warn("localStorage write error", e);
    }
    if (onSavePreferences) onSavePreferences();
    onClose();
  };

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
            className="relative w-full max-w-2xl bg-[#121215] border border-zinc-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl z-10 max-h-[88vh] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] rounded-xl">
                  <Cookie className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {isEn ? "Cookie Settings & Policy" : isRu ? "Настройка и политика cookie" : "Sīkdatņu pielāgošana un politika"}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    {isEn ? "Manage your privacy preferences for each category" : isRu ? "Управляйте настройками конфиденциальности для каждой категории" : "Pārvaldiet savas privātuma izvēles katrai kategorijai"}
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
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">1.</span> {isEn ? "What are cookies?" : isRu ? "Что такое файлы cookie?" : "Kas ir sīkdatnes?"}
                </h4>
                <p>
                  {isEn 
                    ? "Cookies are small text files stored on your computer or mobile device when you visit a website. On subsequent visits, cookies are sent back to the originating site or a third-party site that recognizes the cookie."
                    : isRu
                      ? "Файлы cookie — это небольшие текстовые файлы, которые веб-сайт сохраняет на вашем компьютере или мобильном устройстве при посещении. При последующих визитах они отправляются обратно на исходный или сторонний сайт."
                      : "Sīkdatnes (cookies) ir mazi teksta faili, ko tīmekļa vietne saglabā Jūsu datorā vai mobilajā ierīcē, kad Jūs to apmeklējat. Katrā nākamajā apmeklējuma reizē sīkdatnes tiek nosūtītas atpakaļ uz izcelsmes vietni vai trešās puses vietni, kas atpazīst attiecīgo sīkdatni."}
                </p>
                <p>
                  {isEn
                    ? "Cookies act as a site memory, allowing the website to remember your settings and preferences (such as language, font size, and display options) so you don't have to re-enter them every time."
                    : isRu
                      ? "Файлы cookie служат памятью сайта, позволяя ему запоминать ваши настройки и действия (например, язык, размер шрифта), чтобы вам не нужно было вводить их заново."
                      : "Sīkdatnes darbojas kā konkrētas vietnes atmiņa, ļaujot vietnei atcerēties Jūsu iestatījumus un darbības (piemēram, valodu, fontu izmērus un citus attēlošanas iestatījumus), lai Jums tie nebūtu jāievada no jauna katru reizi."}
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">2.</span> {isEn ? "Why do we use cookies?" : isRu ? "Почему мы используем cookie?" : "Kāpēc mēs izmantojam sīkdatnes?"}
                </h4>
                <p>
                  <strong className="text-white font-semibold">Sageon Media</strong> {isEn ? "uses cookies for the following purposes:" : isRu ? "использует cookie для следующих целей:" : "izmanto sīkdatnes šādiem mērķiem:"}
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-zinc-300">
                  <li>
                    <strong className="text-zinc-100 font-semibold">{isEn ? "Website functionality:" : isRu ? "Функциональность сайта:" : "Vietnes funkcionalitātes nodrošināšanai:"}</strong> {isEn ? "To enable website operation and essential features." : isRu ? "Чтобы обеспечить работу сайта и его основные функции." : "Lai tīmekļa vietne varētu darboties un nodrošināt pamatfunkcijas."}
                  </li>
                  <li>
                    <strong className="text-zinc-100 font-semibold">{isEn ? "User experience enhancement:" : isRu ? "Улучшение пользовательского опыта:" : "Lietošanas pieredzes uzlabošanai:"}</strong> {isEn ? "To remember your preferences and deliver personalized content." : isRu ? "Чтобы запоминать ваши предпочтения и предоставлять персонализированный контент." : "Lai atcerētos Jūsu izvēles un sniegtu personalizētāku saturu."}
                  </li>
                  <li>
                    <strong className="text-zinc-100 font-semibold">{isEn ? "Analytics & statistics:" : isRu ? "Аналитика и статистика:" : "Analītikai un statistikai:"}</strong> {isEn ? "To understand how visitors interact with the site (pages visited, visit duration) to help us improve site structure." : isRu ? "Чтобы понимать, как посетители взаимодействуют с сайтом, что помогает нам улучшать его структуру." : "Lai saprastu, kā apmeklētāji mijiedarbojas ar vietni (kuras lapas apmeklē visbiežāk, cik ilgi uzturas vietnē), kas palīdz mums uzlabot vietnes struktūru un saturu."}
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">3.</span> {isEn ? "Cookie categories & customization" : isRu ? "Категории cookie и их настройка" : "Sīkdatņu kategorijas un to pielāgošana"}
                </h4>

                {/* 1. Necessary */}
                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#BAFC50]" />
                      {isEn ? "Necessary Cookies (Mandatory)" : isRu ? "Необходимые cookie (Обязательно)" : "Nepieciešamās sīkdatnes (Obligātas)"}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-[#BAFC50]/10 text-[#BAFC50] border border-[#BAFC50]/30 px-2.5 py-1 rounded-full">
                      {isEn ? "Always Active" : isRu ? "Всегда активны" : "Vienmēr aktīvas"}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {isEn 
                      ? "These cookies are required for basic website functions, security, and smooth operation (e.g. session maintenance, navigation, form handling). Without them the site cannot function properly."
                      : isRu
                        ? "Эти файлы cookie необходимы для базовых функций сайта, безопасности и бесперебойной работы. Без них сайт не сможет работать корректно."
                        : "Šīs sīkdatnes ir nepieciešamas vietnes pamata funkcijām, drošībai un nepārtrauktai darbībai (piemēram, sesijas uzturēšanai, navigācijai un kontaktformu apstrādei). Bez tām vietne nevar pareizi darboties."}
                  </p>
                </div>

                {/* 2. Analytics */}
                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm flex items-center gap-2">
                      {isEn ? "Analytics & Statistical Cookies" : isRu ? "Аналитические и статистические cookie" : "Analītiskās & Statistiskās sīkdatnes"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAnalytics(!analytics)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        analytics ? "bg-[#BAFC50]" : "bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out ${
                          analytics ? "translate-x-5 bg-black" : "translate-x-0 bg-zinc-300"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {isEn 
                      ? "Used by third-party analytics tools (e.g. Google Analytics) to gather anonymous statistical data about visitor numbers and popular pages."
                      : isRu
                        ? "Используются аналитическими инструментами (например, Google Analytics) для сбора анонимной статистики о посещаемости."
                        : "Izmanto trešo pušu analītikas rīkus (piemēram, Google Analytics), lai apkopotu anonīmu statistiku par apmeklētāju skaitu, populārākajām lapām un uzturēšanās ilgumu."}
                  </p>
                </div>

                {/* 3. Functional */}
                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm flex items-center gap-2">
                      {isEn ? "Functional Cookies" : isRu ? "Функциональные cookie" : "Funkcionālās sīkdatnes"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFunctional(!functional)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        functional ? "bg-[#BAFC50]" : "bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out ${
                          functional ? "translate-x-5 bg-black" : "translate-x-0 bg-zinc-300"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {isEn
                      ? "Allow the site to remember choices you make (such as language preferences or region) for a more tailored experience."
                      : isRu
                        ? "Позволяют сайту запоминать ваши предпочтения (например, выбор языка или региона) для удобства использования."
                        : "Ļauj vietnei atcerēties Jūsu veiktās izvēles (piemēram, valodas iestatījumus, fontu izmēru un reģionu), nodrošinot ērtāku un personalizētāku lietošanu."}
                  </p>
                </div>

                {/* 4. Marketing */}
                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm flex items-center gap-2">
                      {isEn ? "Marketing & Advertising Cookies" : isRu ? "Маркетинговые и рекламные cookie" : "Mārketinga & Reklāmas sīkdatnes"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setMarketing(!marketing)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        marketing ? "bg-[#BAFC50]" : "bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out ${
                          marketing ? "translate-x-5 bg-black" : "translate-x-0 bg-zinc-300"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {isEn 
                      ? "Used to deliver relevant announcements and offers aligned with your interests on social networks or partner sites."
                      : isRu
                        ? "Используются для показа объявлений и предложений, соответствующих вашим интересам."
                        : "Izmanto, lai rādītu Jūsu interesēm atbilstošākus paziņojumus un piedāvājumus sociālajos tīklos vai sadarbības partneru vietnēs."}
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-3 border-t border-zinc-800/80 pt-4">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-[#BAFC50]">4.</span> {isEn ? "How to manage and delete cookies?" : isRu ? "Как управлять и удалять cookie?" : "Kā pārvaldīt un dzēst sīkdatnes?"}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {isEn
                    ? "Most browsers are set to automatically accept cookies. You can change browser settings at any time to block cookies or receive alerts when cookies are sent."
                    : isRu
                      ? "Большинство браузеров автоматически принимают cookie. Вы можете изменить настройки браузера, чтобы заблокировать cookie или получать предупреждения."
                      : "Lielākā daļa pārlūkprogrammu ir iestatītas tā, lai automātiski pieņemtu sīkdatnes. Jūs varat jebkurā laikā mainīt Savas pārlūkprogrammas iestatījumus, lai bloķētu sīkdatnes vai saņemtu brīdinājumu, kad tās tiek sūtītas."}
                </p>

                {/* Browser Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#BAFC50]/40 rounded-xl text-xs font-medium text-zinc-300 hover:text-white transition-all"
                  >
                    <span>Google Chrome</span>
                    <ExternalLink className="h-3 w-3 text-zinc-500" />
                  </a>

                  <a
                    href="https://support.apple.com/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#BAFC50]/40 rounded-xl text-xs font-medium text-zinc-300 hover:text-white transition-all"
                  >
                    <span>Safari</span>
                    <ExternalLink className="h-3 w-3 text-zinc-500" />
                  </a>

                  <a
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#BAFC50]/40 rounded-xl text-xs font-medium text-zinc-300 hover:text-white transition-all"
                  >
                    <span>Mozilla Firefox</span>
                    <ExternalLink className="h-3 w-3 text-zinc-500" />
                  </a>

                  <a
                    href="https://support.microsoft.com/en-us/topic/168dab11-0753-043d-7c16-ede5947798d2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#BAFC50]/40 rounded-xl text-xs font-medium text-zinc-300 hover:text-white transition-all"
                  >
                    <span>MS Edge</span>
                    <ExternalLink className="h-3 w-3 text-zinc-500" />
                  </a>
                </div>

                <p className="text-zinc-400 italic text-xs pt-1">
                  <strong className="text-zinc-300 not-italic font-semibold">{isEn ? "Note:" : isRu ? "Обратите внимание:" : "Ievērojiet:"}</strong> {isEn ? "If you block cookies, some site features may become unavailable or work partially." : isRu ? "Если вы заблокируете cookie, некоторые функции сайта могут работать неполноценно." : "Ja Jūs bloķēsiet sīkdatnes, dažas mūsu tīmekļa vietnes funkcijas var nebūt pieejamas vai darboties nepilnīgi."}
                </p>

                <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center gap-3 mt-3">
                  <Mail className="h-4 w-4 text-[#BAFC50] shrink-0" />
                  <p className="text-xs text-zinc-300">
                    {isEn ? "Questions regarding our cookie policy? Please contact us:" : isRu ? "Вопросы по политике cookie? Свяжитесь с нами:" : "Ja Jums ir jautājumi par mūsu sīkdatņu politiku, lūdzu, sazinieties ar mums:"}{" "}
                    <a
                      href="mailto:info@sageonmedia.eu"
                      className="text-[#BAFC50] hover:underline font-medium"
                    >
                      info@sageonmedia.eu
                    </a>
                  </p>
                </div>
              </div>

            </div>

            {/* Footer / Action Buttons */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => handleSave(false, false, false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-xs rounded-full transition-all cursor-pointer"
              >
                {isEn ? "Decline" : isRu ? "Отклонить" : "Noraidīt"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSave(analytics, functional, marketing)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-zinc-700 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="h-3.5 w-3.5 text-[#BAFC50]" />
                  <span>{isEn ? "Save Selected" : isRu ? "Сохранить выбор" : "Saglabāt izvēlēto"}</span>
                </button>

                <button
                  onClick={() => handleSave(true, true, true)}
                  className="px-5 py-2 bg-[#BAFC50] hover:bg-[#a6ed38] text-black font-bold text-xs tracking-wider rounded-full transition-all duration-200 cursor-pointer shadow-md active:scale-95"
                >
                  {isEn ? "Accept All" : isRu ? "Принять все" : "Apstiprināt visas"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

