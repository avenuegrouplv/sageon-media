import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Mail, MapPin, X, ArrowUp, Sparkles } from "lucide-react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"cookies" | "privacy" | null>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-black text-slate-300 relative z-10 font-sans border-0 border-transparent">
      {/* HORIZONTAL FLOATING GREEN MARQUEE TICKER BANNER ON BOUNDARY */}
      <div className="w-full bg-[#BAFC50] text-black py-3 sm:py-3.5 overflow-hidden border-y border-[#BAFC50]/80 select-none shadow-[0_0_25px_rgba(186,252,80,0.25)] relative z-20">
        <div className="animate-marquee flex whitespace-nowrap items-center text-xs sm:text-sm font-black tracking-widest uppercase">
          <div className="flex items-center gap-8 sm:gap-10 px-6">
            <span>MĀJASLAPU IZSTRĀDE UN DIZAINS</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
            <span>RESPONSĪVS UN ĀTRS KODS</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
            <span>SEO OPTIMIZĀCIJA BIZNESAM</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
            <span>INDIVIDUĀLI TĪMEKĻA RISINĀJUMI</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
            <span>MĀJASLAPU UZTURĒŠANA & ATBALSTS</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
          </div>
          <div className="flex items-center gap-8 sm:gap-10 px-6">
            <span>MĀJASLAPU IZSTRĀDE UN DIZAINS</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
            <span>RESPONSĪVS UN ĀTRS KODS</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
            <span>SEO OPTIMIZĀCIJA BIZNESAM</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
            <span>INDIVIDUĀLI TĪMEKĻA RISINĀJUMI</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
            <span>MĀJASLAPU UZTURĒŠANA & ATBALSTS</span>
            <Sparkles className="h-4 w-4 text-black fill-black shrink-0 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="pt-8 pb-28 sm:pt-10 sm:pb-36">
        {/* TOP SECTION: Seko Mums on Left, Nav Links (Row 1) & Contacts (Row 2) on Right */}
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-zinc-800/60">
          
          {/* Left Column: Seko Mums with Icons */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-[#BAFC50]">
              Seko mums
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 bg-[#18181b] hover:bg-[#BAFC50] hover:text-black text-white transition-all duration-300 border border-zinc-800 rounded-xl shadow-sm"
                aria-label="Facebook lapa"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 bg-[#18181b] hover:bg-[#BAFC50] hover:text-black text-white transition-all duration-300 border border-zinc-800 rounded-xl shadow-sm"
                aria-label="Instagram profils"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Navigation Links in Row 1 & Contacts in Row 2 (Strictly 2 rows) */}
          <div className="flex flex-col items-center md:items-end space-y-3 text-center md:text-right">
            
            {/* Row 1: Nav links in strictly ONE single horizontal row */}
            <div className="flex items-center justify-center md:justify-end gap-x-2.5 sm:gap-x-4 text-xs sm:text-sm font-semibold text-slate-300 whitespace-nowrap overflow-x-auto max-w-full">
              {[
                { name: "Sākums", path: "/" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "Cenas", path: "/cenas" },
                { name: "BUJ", path: "/buj" },
                { name: "Blogs", path: "/blogs" },
                { name: "Kontakti", path: "/kontakti" }
              ].map((link, idx, arr) => (
                <div key={link.name} className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                  <Link
                    to={link.path}
                    className="hover:text-[#BAFC50] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  {idx < arr.length - 1 && <span className="text-slate-600 font-light">|</span>}
                </div>
              ))}
            </div>

            {/* Row 2: Contacts (+371 26739899 | sageon.agency@gmail.com) in strictly ONE single horizontal row */}
            <div className="flex flex-row items-center justify-center md:justify-end gap-x-3 sm:gap-x-5 text-xs sm:text-sm text-slate-400 whitespace-nowrap">
              <p className="flex items-center gap-1.5 sm:gap-2">
                <Phone className="h-3.5 w-3.5 text-[#BAFC50]" />
                <span className="font-medium text-slate-200">+371 26739899</span>
              </p>
              <span className="text-slate-600 font-light">|</span>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#BAFC50]" />
                <a href="mailto:sageon.agency@gmail.com" className="hover:text-[#BAFC50] transition-colors font-medium text-slate-200">
                  sageon.agency@gmail.com
                </a>
              </p>
            </div>

          </div>

        </div>

        {/* LOGO & BOTTOM COPYRIGHT SECTOR */}
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-8 flex flex-col items-center gap-6">
          {/* Centered Logo */}
          <Link to="/" className="flex items-center justify-center group shrink-0">
            <div className="flex items-center justify-center w-[190px] h-[70px] sm:w-[220px] sm:h-[75px] bg-transparent">
              <img 
                src="/Logo-new.webp" 
                alt="Sageon Agency Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </Link>

          {/* Absolute Bottom Row: Copyright on Left, Policies on Right */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-zinc-800/50 text-xs text-slate-500">
            <div className="text-center sm:text-left">
              <span>2026 © SageOn Media I Visas tiesības aizsargātas</span>
            </div>

            <div className="flex items-center gap-6 font-medium text-center sm:text-right">
              <button
                onClick={() => setActiveModal("cookies")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Sīkdatņu politika
              </button>
              <button
                onClick={() => setActiveModal("privacy")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privātuma politika
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DIALOGS FOR POLICIES */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-sageon-deep border border-sageon-accent/60 p-6 md:p-8 max-w-lg w-full rounded-none relative shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              aria-label="Aizvērt"
            >
              <X className="h-5 w-5" />
            </button>

            {activeModal === "cookies" ? (
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-bold tracking-tight text-white uppercase font-sans border-b border-blue-500/20 pb-2">
                  Sīkdatņu politika
                </h3>
                <div className="text-xs text-slate-400 space-y-3 leading-relaxed overflow-y-auto max-h-[60vh] pr-2">
                  <p className="font-semibold text-slate-300">Kas ir sīkdatnes?</p>
                  <p>
                    Sīkdatnes (cookies) ir nelielas teksta datnes, kas tiek saglabātas Jūsu ierīcē (datorā vai mobilajā tālrunī), kad apmeklējat mēsu tīmekļa vietni. Tās palīdz vietnei atpazīt Jūsu ierīci un atcerēties informāciju par Jūsu darbībām vai izvēlēm.
                  </p>
                  <p className="font-semibold text-slate-300">Kā mēs izmantojam sīkdatnes?</p>
                  <p>
                    Mēs izmantojam nepieciešamās sīkdatnes, lai nodrošinātu mājaslapas pamata funkcionalitāti, drošību un ātrdarbību. Tāpat mēs varam izmantot analītiskās sīkdatnes, lai saprastu, kā apmeklētāji mijiedarbojas ar lapu, un uzlabotu tās saturu.
                  </p>
                  <p className="font-semibold text-slate-300">Kā kontrolēt sīkdatnes?</p>
                  <p>
                    Jūs varat pilnībā kontrolēt un dzēst sīkdatnes savas pārlūkprogrammas iestatījumos. Taču lūdzam ņemt vērā, ka dažu sīkdatņu atspējošana var ietekmēt vietnes pareizu darbību un lietojamību.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-bold tracking-tight text-white uppercase font-sans border-b border-blue-500/20 pb-2">
                  Privātuma politika
                </h3>
                <div className="text-xs text-slate-400 space-y-3 leading-relaxed overflow-y-auto max-h-[60vh] pr-2">
                  <p className="font-semibold text-slate-300">Personas datu apstrāde</p>
                  <p>
                    Sageon Agency rūpējas par Jūsu privātumu un datu aizsardzību. Kad Jūs aizpildāt un iesniedzat mūsu saziņas formu, mēs iegūstam tādus datus kā Jūsu Vārds, E-pasts un pašu ziņojumu.
                  </p>
                  <p className="font-semibold text-slate-300">Datu apstrādes mērķis</p>
                  <p>
                    Iesniegtie dati tiek izmantoti tikai un vienīgi, lai sazinātos ar Jums, atbildētu uz Jūsu pieprasījumu, sagatavotu cenu piedāvājumu un sniegtu kvalitatīvu pakalpojumu. Jūsu dati nekad netiks nodoti trešajām personām bez Jūsu nepārprotamas piekrišanas.
                  </p>
                  <p className="font-semibold text-slate-300">Datu glabāšana</p>
                  <p>
                    Mēs glabājam personas datus tik ilgi, cik tas ir nepieciešams attiecīgā saziņas vai biznesa procesa nodrošināšanai, ievērojot spēkā esošos normatīvos aktus un Vispārīgo datu aizsardzības regulu (GDPR).
                  </p>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-sageon-accent/60 mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wider text-xs uppercase rounded-none transition-colors cursor-pointer"
              >
                Aizvērt
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
