import { useEffect } from "react";
import { MapPin, MessageSquare, Clock } from "lucide-react";
import ContactForm from "../components/ContactForm";
import PageNavButtons from "../components/PageNavButtons";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../i18n/LanguageContext";

export default function Kontakti() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = t.seo.contact.title;
  }, [t.seo.contact.title]);

  return (
    <div className="min-h-screen bg-black text-white font-sans text-left relative overflow-hidden">
      <SEOHead
        title={t.seo.contact.title}
        description={t.seo.contact.description}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://sageonmedia.eu/kontakti#webpage",
            "url": "https://sageonmedia.eu/kontakti",
            "name": t.seo.contact.title,
            "description": t.seo.contact.description,
            "isPartOf": { "@id": "https://sageonmedia.eu#website" }
          },
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://sageonmedia.eu#organization",
            "name": "Sageon Media",
            "url": "https://sageonmedia.eu",
            "logo": "https://sageonmedia.eu/Logo-new.webp",
            "email": "info@sageonmedia.eu",
            "telephone": "+371 26739899",
            "priceRange": "$$",
            "knowsLanguage": ["lv", "en", "ru"],
            "areaServed": [
              { "@type": "Country", "name": "Latvia" },
              { "@type": "Place", "name": "Worldwide" }
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Sākums",
                "item": "https://sageonmedia.eu"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Kontakti",
                "item": "https://sageonmedia.eu/kontakti"
              }
            ]
          }
        ]}
      />
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />
      
      {/* Intro section */}
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-16 md:pt-20 pb-2 space-y-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/30 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Sazināties ar mums</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
          Mēs esam viena <span className="text-[#BAFC50]">klikšķa attālumā</span>
        </h1>
        <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto font-light text-center">
          Aizpildiet zemāk esošo formu vai izmantojiet tiešo kontaktinformāciju. Esam gatavi apspriest Jūsu nākamā projekta ideju un izveidot tam piemērotāko risinājumu!
        </p>
      </div>

      {/* Main reusable Contact form without duplicate header text */}
      <ContactForm hideHeader={true} />

      {/* Extra business information card for contact page */}
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 dark:text-slate-400 text-xs md:text-sm font-light border border-slate-200/60 dark:border-sageon-accent/60 bg-white dark:bg-sageon-deep/40 p-6 md:p-8 rounded-2xl shadow-md">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-sans flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Darba laiks
            </h3>
            <p className="leading-relaxed">
              Esam pieejami un atbildam uz e-pastiem katru darba dienu no <strong className="text-slate-800 dark:text-slate-200 font-semibold">9:00 līdz 18:00</strong>. Nedēļas nogalēs saņemtās ziņas apstrādājam pirmdienas rītā.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-sans flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              Lokācija & Sadarbība
            </h3>
            <p className="leading-relaxed">
              Mēs strādājam attālināti ar klientiem visā <strong className="text-slate-800 dark:text-slate-200 font-semibold">Latvijā un Eiropā</strong>.
            </p>
          </div>
        </div>

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}
