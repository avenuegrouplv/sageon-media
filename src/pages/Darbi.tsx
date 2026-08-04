import { useState, useEffect } from "react";
import { FolderGit2, Sparkles, X } from "lucide-react";
import PageNavButtons from "../components/PageNavButtons";
import PortfolioLaptopCard from "../components/PortfolioLaptopCard";
import ContactForm from "../components/ContactForm";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../i18n/LanguageContext";

export default function Darbi() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { lang, t, getLocalizedPath } = useLanguage();

  useEffect(() => {
    document.title = t.seo.portfolio.title;
  }, [t.seo.portfolio.title]);

  const portfolioCards = t.portfolioItems;

  const emptyPortfolioCard = {
    id: 101,
    title: lang === "LV" ? "Tava Jaunā Mājaslapa" : lang === "EN" ? "Your New Website" : "Ваш новый сайт",
    subtitle: lang === "LV" 
      ? "Piesaki sava biznesa mājaslapas izstrādi un sasniedz klientus efektīvāk." 
      : lang === "EN" 
        ? "Apply for your business website development and reach customers effectively." 
        : "Закажите разработку сайта для вашего бизнеса и привлекайте клиентов эффективнее.",
    description: lang === "LV" 
      ? "Šeit var atrasties Tava uzņēmuma jaunā un mūsdienīgā mājaslapa. Projekta ietvaros izstrādāsim unikālu dizainu, atpazīstamu logo un piesaistošus pakalpojumu aprakstus tavai nozarei." 
      : lang === "EN" 
        ? "Your company's modern new website can be here. We will craft a unique design, custom logo, and engaging service descriptions tailored to your industry." 
        : "Здесь может быть новый современный сайт вашей компании. Мы разработаем уникальный дизайн, логотип и описания услуг для вашей сферы.",
    displayLink: "tavaprojekts.lv",
    link: getLocalizedPath("contact")
  };

  return (
    <div className="min-h-screen bg-black font-sans text-left text-white relative overflow-hidden">
      <SEOHead
        title={t.seo.portfolio.title}
        description={t.seo.portfolio.description}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `https://sageonmedia.eu${getLocalizedPath('portfolio')}#webpage`,
            "url": `https://sageonmedia.eu${getLocalizedPath('portfolio')}`,
            "name": t.seo.portfolio.title,
            "description": t.seo.portfolio.description,
            "isPartOf": { "@id": "https://sageonmedia.eu#website" }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": lang === "LV" ? "Sākums" : lang === "EN" ? "Home" : "Главная",
                "item": "https://sageonmedia.eu"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": t.nav.portfolio,
                "item": `https://sageonmedia.eu${getLocalizedPath('portfolio')}`
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

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20 space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
            <FolderGit2 className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>{t.nav.portfolio}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
            {lang === "LV" ? <>Mūsu <span className="text-[#BAFC50]">nesenie projekti</span></> : lang === "EN" ? <>Our <span className="text-[#BAFC50]">Recent Projects</span></> : <>Наши <span className="text-[#BAFC50]">недавние проекты</span></>}
          </h1>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-[1380px] mx-auto px-2 sm:px-4">
          {portfolioCards.map((card) => (
            <PortfolioLaptopCard
              key={card.id}
              title={card.title}
              brand={card.brand}
              displayLink={card.displayLink}
              image={card.image}
              link={card.link}
              description={card.description}
              isPlaceholder={card.isPlaceholder}
              tags={card.tags}
            />
          ))}

          {/* Empty/Placeholder laptop */}
          <PortfolioLaptopCard
            key={emptyPortfolioCard.id}
            title={emptyPortfolioCard.title}
            displayLink={emptyPortfolioCard.displayLink}
            link={emptyPortfolioCard.link}
            isPlaceholder={true}
            subtitle={emptyPortfolioCard.subtitle}
            description={emptyPortfolioCard.description}
          />
        </div>

        {/* Informative Callout */}
        <div className="bg-[#18181b] p-6 md:p-8 text-center space-y-3 border border-zinc-800 max-w-3xl mx-auto rounded-2xl shadow-sm">
          <div className="inline-flex p-2 bg-[#BAFC50]/10 text-[#BAFC50] mb-1 rounded-lg">
            <Sparkles className="h-5 w-5 text-[#BAFC50]" />
          </div>
          <p className="text-sm md:text-base text-white font-bold tracking-tight">
            {lang === "LV" 
              ? "Mēs izstrādājam unikālas un ātras mājaslapas. Sazinieties ar mums jau šodien!" 
              : lang === "EN" 
                ? "We build unique and fast websites. Contact us today!" 
                : "Мы создаем уникальные и быстрые сайты. Свяжитесь с нами сегодня!"}
          </p>
        </div>

        {/* Dynamic Contact Form for Pricing Proposal Request */}
        <div className="border border-zinc-800 overflow-hidden shadow-md rounded-2xl">
          <ContactForm 
            title={lang === "LV" ? "Saņemt cenas piedāvājumu" : lang === "EN" ? "Get a Pricing Offer" : "Получить предложение по цене"} 
            subtitle={t.contactForm.defaultSubtitle} 
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
                {lang === "LV" ? "Aizvērt" : lang === "EN" ? "Close" : "Закрыть"} <X className="h-5 w-5" />
              </button>
              <img
                src={selectedImage}
                alt="Preview"
                loading="lazy"
                decoding="async"
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
