import { useState, useEffect } from "react";
import { FolderGit2, Sparkles, X } from "lucide-react";
import PageNavButtons from "../components/PageNavButtons";
import PortfolioLaptopCard from "../components/PortfolioLaptopCard";
import ContactForm from "../components/ContactForm";
import SEOHead from "../components/SEOHead";

const MOCK_PORTFOLIO_CARDS = [
  {
    id: 1,
    title: "Komercīpašumu un privātīpašumu apsaimniekošana I Juridiskā pārvaldība",
    brand: "Avenue Group",
    displayLink: "https://avenuegroup.lv",
    category: "Būvniecība un Nekustamie Īpašumi",
    tech: "React, Tailwind, Premium Web dizains",
    description: "Avenue Group ir nekustamo īpašumu pārvaldības un juridisko pakalpojumu platforma. Mājaslapa nodrošina pārskatāmu pakalpojumu katalogu, atsauksmes un elastīgas saziņas iespējas jaunām sadarbībām. Tās dizains izceļ uzņēmuma uzticamību un profesionālo pieredzi.",
    placeholderColor: "from-blue-500/10 to-slate-500/10",
    image: "/Avenuegroup-portfolio.webp",
    link: "https://avenuegroup.lv"
  },
  {
    id: 2,
    title: "Vairāk ceļo un vairāk nopelni",
    brand: "Travel with Martins",
    displayLink: "https://travelwithmartins.com",
    category: "Ceļojumu aģentūra un Emuārs",
    tech: "React, Ceļojumu emuāru platforma",
    description: "Travel with Martins ir personīgā ceļojumu emuāra un konsultāciju platforma. Tā palīdz lietotājiem plānot un organizēt neizmirstamus braucienus, sniedzot praktiskus padomus un iedvesmojošus ceļvežus. Vietne veidota ar uzsvaru uz vizuāli bagātu saturu un ērtu pieteikumu noformēšanu.",
    placeholderColor: "from-blue-500/10 to-slate-500/10",
    image: "/Travel-with-Martins-portfolio.webp",
    link: "https://travelwithmartins.com"
  },
  {
    id: 3,
    title: "Premium dizaina mēbeles I Ekskluzīvas koka kāpnes",
    brand: "Avangart",
    displayLink: "https://avangart.lv",
    category: "Dizains un Ražošana",
    tech: "React, Premium Web katalogs",
    description: "Avangart ir ekskluzīvs mēbeļu un koka kāpņu ražošanas uzņēmuma digitālais katalogs. Mājaslapa kalpo kā vizuālā galerija ar detalizētiem fotouzņēmumiem un produktu aprakstiem. Tās dizains atspoguļo augstākās kvalitātes meistardarbu, eleganci un individuālu pieeju.",
    placeholderColor: "from-blue-500/10 to-slate-500/10",
    image: "/Avangart-portfolio.webp",
    link: "https://avangart.lv"
  }
];

const EMPTY_PORTFOLIO_CARDS = [
  {
    id: 101,
    title: "Tava Jaunā Mājaslapa",
    subtitle: "Piesaki sava biznesa mājaslapas izstrādi un sasniedz klientus efektīvāk.",
    description: "Šeit var atrasties Tava uzņēmuma jaunā un mūsdienīgā mājaslapa. Mēs izstrādāsim unikālu dizainu, kas piesaistīs klientus un veicinās pārdošanu. Piesaki savu projektu jau šodien un padari savu zīmolu pamanāmu digitālajā vidē.",
    displayLink: "tavaprojekts.lv",
    link: "/kontakti"
  },
  {
    id: 102,
    title: "Piesaki Izstrādi",
    subtitle: "Mēs izveidosim ātru, drošu un estētisku risinājumu tieši tavām vajadzībām.",
    description: "Izveido mērķtiecīgu un uzticamu web risinājumu savam biznesam. Mēs nodrošinām pilnu izstrādes ciklu no skices līdz gatavai lapai ar ātrdarbības optimizāciju. Padari savu zīmolu pamanāmu un ērti sasniedzamu katram apmeklētājam.",
    displayLink: "biznesam.lv",
    link: "/kontakti"
  },
  {
    id: 103,
    title: "Tavs Web Risinājums",
    subtitle: "Sazinies ar mums, lai apspriestu savu ideju un saņemtu bezmaksas konsultāciju.",
    description: "Gatavs risinājums Tavam jaunajam projektam vai tiešsaistes pakalpojumam. Nodrošinām responsīvu dizainu, SEO optimizāciju un nevainojamu darbību visās ierīcēs. Sazinies ar mums un saņem bezmaksas konsultāciju par savu ieceri.",
    displayLink: "jaunslapa.lv",
    link: "/kontakti"
  }
];

export default function Darbi() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Mūsu Darbi & Portfolio | Sageon Media";
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans text-left text-white relative overflow-hidden">
      <SEOHead
        title="Mūsu Darbi & Portfolio | Sageon Media"
        description="Apskatiet Sageon Media izstrādāto mājaslapu portfolio un veiktos projektus. Mūsdienīgs tīmekļa dizains, augsta ātrdarbība un meklētāju optimizācija."
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://sageon.media/portfolio#webpage",
            "url": "https://sageon.media/portfolio",
            "name": "Mūsu Darbi & Portfolio | Sageon Media",
            "description": "Apskatiet Sageon Media izstrādāto mājaslapu portfolio un veiktos projektus.",
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
                "name": "Portfolio",
                "item": "https://sageon.media/portfolio"
              }
            ]
          }
        ]}
      />
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

      {/* Irregular Green Ambient Background Glows */}
      <div className="absolute -top-32 -right-20 w-[750px] h-[750px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/2 -left-24 w-[800px] h-[800px] bg-gradient-to-tr from-[#38b000]/28 via-[#BAFC50]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 right-1/4 w-[750px] h-[750px] bg-gradient-to-tl from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-20 md:py-28 space-y-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
            <FolderGit2 className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>Mūsu Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
            Mūsu <span className="text-[#BAFC50]">nesenie projekti</span>
          </h1>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-14 max-w-[1700px] mx-auto px-2 sm:px-4">
          {MOCK_PORTFOLIO_CARDS.map((card) => (
            <PortfolioLaptopCard
              key={card.id}
              title={card.title}
              brand={card.brand}
              displayLink={card.displayLink}
              image={card.image}
              link={card.link}
              description={card.description}
            />
          ))}

          {/* Empty/Placeholder laptops */}
          {EMPTY_PORTFOLIO_CARDS.map((card) => (
            <PortfolioLaptopCard
              key={card.id}
              title={card.title}
              displayLink={card.displayLink}
              link={card.link}
              isPlaceholder={true}
              subtitle={card.subtitle}
              description={card.description}
            />
          ))}
        </div>

        {/* Informative Callout */}
        <div className="bg-[#18181b] p-6 md:p-8 text-center space-y-3 border border-zinc-800 max-w-3xl mx-auto rounded-2xl shadow-sm">
          <div className="inline-flex p-2 bg-[#BAFC50]/10 text-[#BAFC50] mb-1 rounded-lg">
            <Sparkles className="h-5 w-5 text-[#BAFC50]" />
          </div>
          <p className="text-sm md:text-base text-white font-bold tracking-tight">
            Mēs izstrādājam unikālas un ātras mājaslapas. Sazinieties ar mums jau šodien!
          </p>
        </div>

        {/* Dynamic Contact Form for Pricing Proposal Request */}
        <div className="border border-zinc-800 overflow-hidden shadow-md rounded-2xl">
          <ContactForm 
            title="Saņemt cenas piedāvājumu" 
            subtitle="Droši sazinies ar mums, zvani vai raksti, un mēs atbildēsim uz visiem Taviem jautājumiem." 
          />
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <div className="relative max-w-4xl w-full flex flex-col items-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-[#BAFC50] transition-colors flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-widest cursor-pointer"
              >
                Aizvērt <X className="h-5 w-5" />
              </button>
              <img
                src={selectedImage}
                alt="Darba palielināts priekšskatījums"
                className="w-full h-auto max-h-[80vh] object-contain border border-zinc-800"
              />
            </div>
          </div>
        )}

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}
