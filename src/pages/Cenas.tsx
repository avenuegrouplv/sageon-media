import { useEffect } from "react";
import { Check, Sparkles, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import PageNavButtons from "../components/PageNavButtons";
import ContactForm from "../components/ContactForm";
import SEOHead from "../components/SEOHead";

export default function Cenas() {
  useEffect(() => {
    document.title = "Pakalpojumi & Cenas | Sageon Media";
  }, []);
  const pricingPlans = [
    {
      title: "Landing Page",
      subtitle: "Vienas lapas mājaslapa vai reprezentācija",
      price: "490",
      period: "vienreizējs maksājums",
      badge: "Populārs jauniem projektiem",
      features: [
        "Unikāls UI/UX dizains",
        "Responsīvs dizains visām ierīcēm (Mobile-first)",
        "Vienas lapas mājaslapa līdz 5 sadaļām divās valodās",
        "Viena attēla pievienošana katrā sadaļā",
        "Viena hero attēla pievienošana mājaslapas augšdaļā",
        "WhatsApp saziņas integrācija",
        "Kontaktformas integrācija",
        "Sociālo tīklu integrācija",
        "Pamata SEO optimizācija",
        "Search Console pieslēgšana",
        "CTA elementu izstrāde",
        "Mājaslapas satura izstrāde (papildus samaksa)",
        "Tehniskais atbalsts domēna un e-pasta pieslēgšanā",
        "Izstrādes laiks: 5-7 darba dienas"
      ],
      cta: "Pieteikt Landing lapu",
      highlight: false
    },
    {
      title: "Multi-page",
      subtitle: "Pilnvērtīga uzņēmuma biznesa mājaslapa",
      price: "1290",
      period: "vienreizējs maksājums",
      badge: "Labākā izvēle biznesam",
      features: [
        "Unikāls UI/UX dizains",
        "Responsīvs dizains visām ierīcēm (Mobile-first)",
        "Mājaslapa līdz 8 lapām divās valodās",
        "Attēlu pievienošana (kopā līdz 20 attēliem)",
        "Galerijas pievienošana (papildus samaksa)",
        "WhatsApp saziņas integrācija",
        "Kontaktformas integrācija",
        "Sociālo tīklu integrācija",
        "Pamata SEO optimizācija",
        "Search Console pieslēgšana",
        "CTA elementu izstrāde",
        "Mājaslapas satura izstrāde",
        "Tehniskais atbalsts domēna un e-pasta pieslēgšanā",
        "Satura vadības sistēmas (CMS) integrācija",
        "Izstrādes laiks: 2-3 nedēļas"
      ],
      cta: "Pieteikt biznesa lapu",
      highlight: true
    },
    {
      title: "E-Komercija",
      subtitle: "Profesionāls un pelnošs interneta veikals",
      price: "1950",
      period: "vienreizējs maksājums",
      badge: "Pilna tirdzniecības sistēma",
      features: [
        "Unikāls UI/UX dizains",
        "Responsīvs dizains visām ierīcēm (Mobile-first)",
        "Katalogs līdz 90 precēm divās valodās",
        "Maksājumu sistēmas integrācija (Stripe, PayPal u.c.)",
        "Attēlu pievienošana (skaits pēc vienošanās)",
        "WhatsApp saziņas integrācija",
        "Kontaktformas integrācija",
        "Sociālo tīklu integrācija",
        "Pamata SEO optimizācija",
        "Search Console pieslēgšana",
        "CTA elementu izstrāde",
        "Mājaslapas satura izstrāde",
        "Tehniskais atbalsts domēna un e-pasta pieslēgšanā",
        "Satura vadības sistēmas (CMS) integrācija",
        "Izstrādes laiks: 3-5 nedēļas"
      ],
      cta: "Pieteikt e-komercijas lapu",
      highlight: false
    },
    {
      title: "Uzturēšana",
      subtitle: "Mēneša abonēšanas maksa",
      price: "49",
      period: "mēneša abonēšanas maksa",
      badge: "Miers un drošība Jums",
      features: [
        "Satura izmaiņas līdz 1 stundai mēnesī",
        "Mājaslapas ātrdarbības analīze",
        "Search Console datu uzraudzība",
        "Google Analytics datu analīze",
        "Mājaslapas SSL sertifikāta uzraudzība",
        "Tehnisko kļūdu novēršana",
        "Konsultācijas un tehniskais atbalsts",
        "Abonements atceļams jebkurā laikā"
      ],
      cta: "Pieteikt uzturēšanu",
      highlight: false
    },
    {
      title: "Google pakalpojumi",
      subtitle: "Pilns Google rīku komplekts biznesam",
      price: "",
      period: "Pēc vienošanās",
      badge: "Google rīki",
      features: [
        "Google Business Profile izveide vai konfigurācija",
        "Google Search Console konfigurēšana",
        "Google Analytics 4 konfigurēšana",
        "Google Tag Manager integrācija",
        "Google Maps integrācija mājaslapā",
        "Sitemap.xml konfigurēšana",
        "Robots.txt konfigurēšana",
        "Domēna verifikācija Google pakalpojumos",
        "Mājaslapas iesniegšana Google indeksācijai"
      ],
      cta: "Pieteikt Google pakalpojumus",
      highlight: false
    },
    {
      title: "Individuāli risinājumi",
      subtitle: "Pielāgota funkcionalitāte pēc pieprasījuma",
      price: "",
      period: "Pēc vienošanās",
      badge: "Pielāgota izstrāde",
      features: [
        "Pielāgotu funkciju izstrāde pēc klienta vajadzībām",
        "Cenu kalkulatoru integrācija",
        "Rezervāciju un kalendāru sistēmu integrācija",
        "Daudzsoļu pieteikumu formas",
        "Dokumentu augšupielādes izstrāde",
        "Klientu portālu izstrāde",
        "API integrācijas ar ārējām sistēmām",
        "AI čatbotu un virtuālo asistentu integrācija",
        "Citu individuālu risinājumu izstrāde pēc vienošanās"
      ],
      cta: "Pieteikt funkciju izstrādi",
      highlight: false
    },
    {
      title: "SEO optimizācija",
      subtitle: "Organiskās meklēšanas optimizācija",
      price: "",
      period: "Pēc vienošanās",
      badge: "SEO optimizācija",
      features: [
        "Atslēgvārdu izpēte galvenajām lapām",
        "Meta virsrakstu optimizācija",
        "Meta aprakstu optimizācija",
        "Attēlu ALT atribūtu optimizācija",
        "Canonical URL pārbaude",
        "Sociālo tīklu metadatu optimizācija",
        "Iekšējo saišu pārbaude un optimizācija",
        "Pamata tehniskā SEO analīze",
        "Mājaslapas ātrdarbības analīze"
      ],
      cta: "Pieteikt SEO optimizāciju",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-black font-sans text-left text-white relative overflow-hidden">
      <SEOHead
        title="Pakalpojumi & Cenas | Sageon Media"
        description="Izvēlieties sev piemērotāko mājaslapu izstrādes un digitālo pakalpojumu plānu. Landing lapas, multi-page biznesa vietnes, e-komercija un tehniskā uzturēšana."
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://sageon.media/pakalpojumi#webpage",
            "url": "https://sageon.media/pakalpojumi",
            "name": "Pakalpojumi & Cenas | Sageon Media",
            "description": "Izvēlieties sev piemērotāko mājaslapu izstrādes un digitālo pakalpojumu plānu.",
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
                "name": "Pakalpojumi un Cenas",
                "item": "https://sageon.media/pakalpojumi"
              }
            ]
          },
          ...pricingPlans.map(plan => ({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": plan.title,
            "description": plan.subtitle,
            "provider": {
              "@type": "Organization",
              "name": "Sageon Media",
              "url": "https://sageon.media"
            },
            ...(plan.price ? {
              "offers": {
                "@type": "Offer",
                "price": plan.price,
                "priceCurrency": "EUR"
              }
            } : {})
          }))
        ]}
      />
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

      {/* Irregular Green Ambient Background Glows */}
      <div className="absolute -top-32 -left-20 w-[750px] h-[750px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/2 -right-24 w-[800px] h-[800px] bg-gradient-to-bl from-[#38b000]/28 via-[#BAFC50]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 left-1/3 w-[750px] h-[750px] bg-gradient-to-tr from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-20 md:py-28 space-y-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>Mūsu pakalpojumi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
            Cenu <span className="text-[#BAFC50]">piedāvājumi</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto font-light text-center">
            Izvēlieties Jūsu biznesa mērķiem visatbilstošāko mājaslapas izstrādes vai uzturēšanas plānu. Nav nekādu slēptu izmaksu — visi nosacījumi ir skaidri un caurskatāmi.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => {
            const isBestChoice = plan.badge === "Labākā izvēle biznesam";
            return (
              <div
                key={index}
                className={`bg-[#18181b] border-2 transition-all duration-300 flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl group relative overflow-hidden ${
                  isBestChoice 
                    ? "border-[#BAFC50]/70 ring-1 ring-[#BAFC50]/30 shadow-[#BAFC50]/10 hover:border-[#BAFC50]" 
                    : "border-zinc-800 hover:border-[#BAFC50]"
                }`}
              >
                <div>
                  {/* Header Section */}
                  <div className="p-6 border-b border-zinc-800 text-left space-y-4 relative">
                    <div className="flex items-center justify-between min-h-[28px]">
                      <span className={`px-2.5 py-1 font-sans text-xs uppercase tracking-wider font-bold rounded-lg ${
                        isBestChoice 
                          ? "bg-[#BAFC50] text-black font-extrabold shadow-sm" 
                          : "bg-zinc-800 text-zinc-200 border border-zinc-700/60"
                      }`}>
                        {isBestChoice ? "★ " : ""}{plan.badge}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 h-[88px] min-h-[88px] flex flex-col justify-start items-start pt-1">
                      {plan.title === "Multi-page" ? (
                        <h3 className="text-2xl font-extrabold tracking-tight uppercase leading-tight px-3 py-1 rounded-lg bg-[#BAFC50]/20 border border-[#BAFC50] text-[#BAFC50] shadow-sm inline-block">
                          {plan.title}
                        </h3>
                      ) : (
                        <h3 className="text-2xl font-bold tracking-tight uppercase text-white leading-tight">{plan.title}</h3>
                      )}
                      <p className="text-sm font-normal text-zinc-300">
                        {plan.subtitle}
                      </p>
                    </div>

                    {/* Highly visible high-contrast pricing tag container */}
                    <div className="pt-3 pb-2 mt-2 border-l-4 border-[#BAFC50] pl-3.5 flex items-center gap-1.5 h-[56px] min-h-[56px]">
                      {plan.price ? (
                        <>
                          <span className="text-lg font-black text-[#BAFC50]">€</span>
                          <span className="text-5xl font-black tracking-tight text-white">{plan.price}</span>
                          <span className="text-xs uppercase tracking-wider font-semibold font-sans ml-2 text-zinc-300">
                            / {plan.period}
                          </span>
                        </>
                      ) : (
                        <span className="text-base md:text-lg font-extrabold uppercase tracking-wider font-sans text-[#BAFC50] self-center">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                {/* Features List */}
                <ul className="p-6 space-y-3.5 text-left text-sm text-zinc-200 font-normal">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5">
                      <div className="p-0.5 bg-[#BAFC50]/20 text-[#BAFC50] mt-0.5 shrink-0 rounded-sm">
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action Button */}
              <div className="p-6 pt-0">
                <Link
                  to="/kontakti"
                  className={`w-full py-3.5 px-4 font-bold tracking-wider text-sm uppercase transition-all duration-300 rounded-full text-center block cursor-pointer shadow-sm hover:shadow-md ${
                    plan.highlight
                      ? "bg-[#BAFC50] hover:bg-[#a8f235] text-black shadow-lg shadow-[#BAFC50]/20 font-extrabold"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white hover:text-[#BAFC50]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          );
        })}
        </div>

        {/* Dynamic Contact Form for Pricing Proposal Request */}
        <div className="border border-zinc-800 overflow-hidden shadow-md rounded-2xl">
          <ContactForm 
            title="Saņemt cenas piedāvājumu" 
            subtitle="Droši sazinies ar mums, zvani vai raksti, un mēs atbildēsim uz visiem Taviem jautājumiem." 
          />
        </div>

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}
