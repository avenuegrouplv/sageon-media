import { useEffect } from "react";
import { MapPin, MessageSquare, Clock, Building2 } from "lucide-react";
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
          <span>{lang === "LV" ? "Sazināties ar mums" : lang === "EN" ? "Get in Touch" : "Связаться с нами"}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
          {lang === "LV" ? <>Mēs esam viena <span className="text-[#BAFC50]">klikšķa attālumā</span></> : lang === "EN" ? <>We are one <span className="text-[#BAFC50]">click away</span></> : <>Мы на расстоянии <span className="text-[#BAFC50]">одного клика</span></>}
        </h1>
        <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto font-light text-center">
          {lang === "LV" 
            ? "Aizpildiet zemāk esošo formu vai izmantojiet tiešo kontaktinformāciju. Esam gatavi apspriest Jūsu nākamā projekta ideju un izveidot tam piemērotāko risinājumu!" 
            : lang === "EN" 
              ? "Fill out the form below or use direct contact details. We are ready to discuss your next project idea and create the right solution!" 
              : "Заполните форму ниже или используйте прямые контакты. Мы готовы обсудить идею вашего проекта и создать лучшее решение!"}
        </p>
      </div>

      {/* Main reusable Contact form without duplicate header text */}
      <ContactForm hideHeader={true} />

      {/* Extra business information card for contact page */}
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 md:py-12">
        <div className="border border-zinc-800/80 bg-[#111114]/90 p-6 md:p-8 rounded-2xl shadow-xl text-zinc-300 text-xs md:text-sm font-light">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Column 1: Company Information */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] font-sans flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#BAFC50]" />
                {lang === "LV" ? "Uzņēmuma rekvizīti" : lang === "EN" ? "Company Information" : "Реквизиты компании"}
              </h3>
              <div className="space-y-1 text-zinc-200 leading-relaxed font-normal">
                <div>SIA &ldquo;Avenue Group&rdquo;</div>
                <div>{lang === "LV" ? "Reģ.Nr. 40203647938" : lang === "EN" ? "Reg. No. 40203647938" : "Рег. № 40203647938"}</div>
                <div>{lang === "LV" ? "Juridiskā adrese:" : lang === "EN" ? "Legal address:" : "Юридический адрес:"}</div>
                <div>Rīga, Brīvības gatve 386/2-5A, LV-1024</div>
              </div>
            </div>

            {/* Column 2: Working Hours */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] font-sans flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#BAFC50]" />
                {lang === "LV" ? "Darba laiks" : lang === "EN" ? "Working Hours" : "Рабочее время"}
              </h3>
              <p className="leading-relaxed">
                {lang === "LV" 
                  ? <>Esam pieejami un atbildam uz e-pastiem katru darba dienu no <strong className="text-white font-semibold">9:00 līdz 18:00</strong>. Nedēļas nogalēs saņemtās ziņas apstrādājam pirmdienas rītā.</>
                  : lang === "EN"
                    ? <>We are available and respond to emails every business day from <strong className="text-white font-semibold">9:00 to 18:00</strong>. Messages received on weekends are processed on Monday morning.</>
                    : <>Мы доступны и отвечаем на письма каждый рабочий день с <strong className="text-white font-semibold">9:00 до 18:00</strong>. Сообщения, полученные в выходные, обрабатываются в понедельник утром.</>}
              </p>
            </div>

            {/* Column 3: Location & Collaboration */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white uppercase tracking-wider text-[11px] font-sans flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#BAFC50]" />
                {lang === "LV" ? "Lokācija & Sadarbība" : lang === "EN" ? "Location & Collaboration" : "Локация и сотрудничество"}
              </h3>
              <p className="leading-relaxed">
                {lang === "LV"
                  ? <>Mēs strādājam attālināti ar klientiem visā <strong className="text-white font-semibold">Latvijā un Eiropā</strong>.</>
                  : lang === "EN"
                    ? <>We work remotely with clients throughout <strong className="text-white font-semibold">Latvia and Europe</strong>.</>
                    : <>Мы работаем удаленно с клиентами по всей <strong className="text-white font-semibold">Латвии и Европе</strong>.</>}
              </p>
            </div>
          </div>
        </div>

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}
