import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle } from "lucide-react";
import PageNavButtons from "../components/PageNavButtons";
import StylizedCrossIcon from "../components/StylizedCrossIcon";
import CtaButton from "../components/CtaButton";
import SEOHead from "../components/SEOHead";

export const FAQ_DATA = [
  {
    question: "Kādus pakalpojumus Jūs piedāvājiet?",
    answer: "Mēs izstrādājam dažādas sarežģītības biznesa mājaslapas, piedāvājam individuālos risinājumus, kā arī nodrošinam SEO optimizāciju un tehnisko atbalstu pēc projekta pabeigšanas."
  },
  {
    question: "Cik ilgā laikā notiek mājaslapas izstrāde?",
    answer: "Mājaslapas izstrādes laiks ir atkarīgs no projekta sarežģītības, satura sagatavotības un nepieciešamās funkcionalitātes. Landing lapas (vienas lapas mājaslapas) izstrāde parasti aizņem 5–7 darba dienas, savukārt daudzlapu (multi-page) uzņēmuma mājaslapas izstrādei nepieciešamas aptuveni divas līdz trīs nedēļas, pie nosacījuma, ka klients aktīvi iesaistās un iesniedz mums visu nepieciešamo informāciju."
  },
  {
    question: "Kas nepieciešams no manas puses pirms projekta uzsākšanas?",
    answer: "Lai varētu uzsākt darbu, parasti nepieciešams uzņēmuma logo (ja tāds ir), kontaktinformācija, informācija par piedāvātajiem pakalpojumiem, kā arī vēlmes attiecībā uz mājaslapas dizainu un funkcionalitāti. Ja daļa materiālu vēl nav sagatavota, mēs palīdzēsim noteikt piemērotāko risinājumu un izplānot turpmāko darba procesu."
  },
  {
    question: "Kā notiek sadarbības uzsākšana?",
    answer: "Uzsākot jebkuru projektu, mēs vispirms uzklausām Jūsu vēlmes un ieceres, kā arī izrunājam piemērotākos risinājumus. Kad projekta struktūra un pārējās detaļas ir konceptuāli saskaņotas, mēs parakstām sadarbības līgumu.\n\nApmaksa tiek sadalīta divās daļās: 50 % avansa maksājums pirms darba uzsākšanas un gala maksājums pēc tam, kad mājaslapa ir pilnībā pabeigta.\n\nPēc gala maksājuma samaksas mājaslapa tiek publicēta uz Jūsu domēna."
  },
  {
    question: "Vai Jūs palīdziet sagatavot arī mājaslapas saturu?",
    answer: "Jā, mēs varam palīdzēt izveidot profesionālu un pārliecinošu saturu, kas būs pielāgots Jūsu uzņēmuma darbības nozarei un mērķauditorijai. Mūsu mērķis ir radīt saturu, kas ne tikai informē, bet arī veicina klientu uzticību un mudina ar Jums sazināties."
  },
  {
    question: "Vai mājaslapa būs pilnībā pielāgota mobilajiem telefoniem?",
    answer: "Jā, visas mūsu izstrādātās mājaslapas tiek projektētas pēc \"Mobile First\" principa. Tas nozīmē, ka mājaslapas funkcionalitāte un saturs ir pilnībā pielāgoti viedtālruņiem, planšetēm un datoriem, nodrošinot ērtu lietošanu visās ierīcēs un uzlabo SEO rezultātus Google meklētājā."
  },
  {
    question: "Kādas ir ikmēneša mājaslapas hostinga izmaksas?",
    answer: "Mājaslapas hostinga izmaksas parasti ir no €8 līdz €18 mēnesī, atkarībā no izvēlētā plāna un hostinga pakalpojumu sniedzēja. Šajās izmaksās nav iekļauti papildu pakalpojumi vai trešo pušu digitālie risinājumi, kas mājaslapai var tikt pieslēgti atsevišķi."
  },
  {
    question: "Vai būs iespējams pašam veikt izmaiņas mājaslapas saturā?",
    answer: "Jā, pēc projekta nodošanas mēs izveidojam viegli lietojamu satura vadības sistēmu (CMS), kā arī sagatavojam pamācību, lai Jūs varētu patstāvīgi mainīt tekstus, pievienot jaunus attēlus vai bloga rakstus bez programmēšanas zināšanām. CMS izveide ir iekļauta cenā Multi-page un sarežģītākos projektos."
  },
  {
    question: "Vai Jūs nodrošiniet mājaslapas SEO optimizāciju?",
    answer: "Jā, katras mūsu izstrādātās mājaslapas standartā ietilpst pamata SEO optimizācija. Tas nozīmē, ka mēs optimizējam mājaslapas ātrdarbību, izveidojam loģisku virsrakstu struktūru, pievienojam meta aprakstus, kā arī izveidojam un pieslēdzam Google Search Console."
  },
  {
    question: "Vai Jūs palīdziet ar domēna reģistrēšanu un pieslēgšanu?",
    answer: "Jā, mēs palīdzam gan ar domēna reģistrēšanu, gan tā pieslēgšanu mājaslapai, kā arī sniedzam konsultācijas visos ar to saistītajos jautājumos. Mēs parūpējamies, lai visi nepieciešamie tehniskie ieraksti būtu pareizi konfigurēti un mājaslapa būtu gatava drošai publicēšanai."
  },
  {
    question: "Vai mājaslapai būs drošības sertifikāts (SSL)?",
    answer: "Jā, visām mūsu izstrādātajām mājaslapām ir SSL drošības sertifikāti, kas nodrošina drošu datu pārraidi starp mājaslapu un tās apmeklētājiem. Tas ir svarīgi gan lietotāju drošībai un uzticībai, gan arī Google meklētāja prasību izpildei."
  },
  {
    question: "Vai nākotnē mājaslapu būs iespējams papildināt ar jaunām funkcijām?",
    answer: "Jā, mājaslapas tiek izstrādātas tā, lai tās būtu iespējams attīstīt arī nākotnē. Vajadzības gadījumā iespējams pievienot papildu sadaļas, vairākas valodas, blogu, klientu atsauksmes, soctīklu publikācijas, e-veikalu, maksājumu risinājumus un citas funkcijas atbilstoši Jūsu uzņēmuma vajadzībām."
  },
  {
    question: "Vai pēc projekta pabeigšanas mājaslapa piederēs man?",
    answer: "Jā, pēc projekta pabeigšanas un pilnas apmaksas Jūs kļūstat par mājaslapas īpašnieku. Jums tiek nodots mājaslapas pirmkods, pilna piekļuve satura vadības sistēmai (CMS), ja tāda ir pieslēgta, kā arī citiem ar mājaslapu saistītajiem resursiem, ja tādi ir, lai Jūs nākotnē varētu tos brīvi pārvaldīt."
  },
  {
    question: "Vai pēc mājaslapas nodošanas būs pieejams tehniskais atbalsts?",
    answer: "Jā, pēc projekta pabeigšanas mēs varam turpināt uzturēt Jūsu mājaslapu, nodrošināt tehnisko atbalstu, sekot līdzi tās ātrdarbībai, kā arī nepieciešamības gadījumā veikt izmaiņas mājaslapas saturā. Šim nolūkam mēs piedāvājam pakalpojumu Uzturēšana."
  }
];

export default function Buj() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Biežāk Uzdotie Jautājumi (BUJ) | Sageon Media";
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-left text-white relative overflow-hidden">
      <SEOHead
        title="Biežāk Uzdotie Jautājumi (BUJ) | Sageon Media"
        description="Atbildes uz biežāk uzdotajiem jautājumiem par mājaslapu izstrādi, izmaksām, izstrādes laiku, SEO un tehnisko atbalstu no Sageon Media."
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://sageon.media/buj#webpage",
            "url": "https://sageon.media/buj",
            "name": "Biežāk Uzdotie Jautājumi (BUJ) | Sageon Media",
            "description": "Atbildes uz biežāk uzdotajiem jautājumiem par mājaslapu izstrādi un pakalpojumiem.",
            "isPartOf": { "@id": "https://sageon.media#website" }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Sākums",
                "item": "https://sageon.media"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "BUJ",
                "item": "https://sageon.media/buj"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQ_DATA.map(faq => ({
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

      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-20 md:py-28 space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
            <HelpCircle className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>Atbildes uz jautājumiem</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
            Biežāk uzdotie <span className="text-[#BAFC50]">jautājumi</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto font-light text-center">
            Viss, kas Jums jāzina par sadarbību, tīmekļa vietņu izstrādi, uzturēšanu un tehniskajām niansēm, lai pieņemtu drošu lēmumu.
          </p>
        </div>

        {/* 7 FAQ Accordions with smooth animations */}
        <div className="space-y-4 mt-12">
          {FAQ_DATA.map((faq, index) => {
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
            Neatradi atbildi uz savu jautājumu? Droši sazinies ar mums, zvani vai raksti, un mēs atbildēsim uz visiem jautājumiem.
          </p>
          <div className="flex items-center justify-center pt-2">
            <CtaButton text="Uzdod savu jautājumu" to="/kontakti" />
          </div>
        </div>

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}
