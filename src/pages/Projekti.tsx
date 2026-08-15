import { useState, useEffect } from "react";
import { FolderGit2, X } from "lucide-react";
import PageNavButtons from "../components/PageNavButtons";
import PortfolioLaptopCard from "../components/PortfolioLaptopCard";
import ContactForm from "../components/ContactForm";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../i18n/LanguageContext";

export default function Projekti() {
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
      <div className="absolute -top-32 -right-20 w-[850px] h-[500px] -rotate-12 rounded-[60%_40%_70%_30%] bg-gradient-to-br from-[#BAFC50]/[0.09] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[10%] -left-16 w-[750px] h-[450px] rotate-6 rounded-[40%_60%_30%_70%] bg-gradient-to-tr from-[#38b000]/[0.07] via-[#BAFC50]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[22%] right-10 w-[780px] h-[460px] -rotate-6 rounded-[50%_50%_40%_60%] bg-gradient-to-l from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[35%] -left-20 w-[820px] h-[480px] rotate-12 rounded-[60%_40%_50%_50%] bg-gradient-to-r from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[48%] -right-16 w-[750px] h-[450px] rotate-6 rounded-[40%_60%_30%_70%] bg-gradient-to-bl from-[#BAFC50]/[0.07] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="absolute top-[60%] -left-24 w-[900px] h-[550px] rotate-12 rounded-[50%_50%_70%_30%] bg-gradient-to-tr from-[#38b000]/[0.09] via-[#BAFC50]/[0.05] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[72%] right-10 w-[800px] h-[480px] -rotate-12 rounded-[60%_40%_50%_50%] bg-gradient-to-bl from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="hidden sm:block absolute top-[85%] left-10 w-[800px] h-[480px] rotate-6 rounded-[50%_50%_60%_40%] bg-gradient-to-tr from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 right-1/4 w-[850px] h-[500px] -rotate-6 rounded-[35%_65%_45%_55%] bg-gradient-to-tl from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[200px] pointer-events-none z-0" />
      
      {/* Mobile Glows */}
      <div className="sm:hidden absolute top-[5%] -left-12 w-72 h-56 -rotate-12 rounded-[50%_50%_60%_40%] bg-gradient-to-r from-[#BAFC50]/[0.09] via-[#38b000]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[18%] -right-12 w-72 h-56 rotate-12 rounded-[40%_60%_50%_50%] bg-gradient-to-l from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[32%] -left-12 w-72 h-56 rotate-6 rounded-[50%_50%_40%_60%] bg-gradient-to-r from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[46%] -right-12 w-72 h-56 -rotate-6 rounded-[40%_60%_50%_50%] bg-gradient-to-l from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[60%] -left-12 w-72 h-56 -rotate-6 rounded-[50%_50%_40%_60%] bg-gradient-to-r from-[#BAFC50]/[0.08] via-[#38b000]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[74%] -right-12 w-72 h-56 rotate-12 rounded-[40%_60%_50%_50%] bg-gradient-to-l from-[#38b000]/[0.08] via-[#BAFC50]/[0.04] to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="sm:hidden absolute top-[88%] -left-12 w-72 h-56 -rotate-12 rounded-[50%_50%_60%_40%] bg-gradient-to-r from-[#BAFC50]/[0.07] via-[#38b000]/[0.03] to-transparent blur-[110px] pointer-events-none z-0" />

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-[1380px] mx-auto px-2 sm:px-4 items-stretch">
          {portfolioCards.map((card) => (
            <div key={card.id} className="h-full flex flex-col">
              <PortfolioLaptopCard
                title={card.title}
                brand={card.brand}
                displayLink={card.displayLink}
                image={card.image}
                link={card.link}
                description={card.description}
                isPlaceholder={card.isPlaceholder}
                tags={card.tags}
              />
            </div>
          ))}

          {/* Empty/Placeholder laptop */}
          <div key={emptyPortfolioCard.id} className="h-full flex flex-col">
            <PortfolioLaptopCard
              title={emptyPortfolioCard.title}
              displayLink={emptyPortfolioCard.displayLink}
              link={emptyPortfolioCard.link}
              isPlaceholder={true}
              subtitle={emptyPortfolioCard.subtitle}
              description={emptyPortfolioCard.description}
            />
          </div>
        </div>

        {/* Dynamic Contact Form for Pricing Proposal Request */}
        <div className="border border-zinc-800 overflow-hidden shadow-md rounded-2xl">
          <ContactForm 
            title={lang === "LV" ? "Saņemt cenas piedāvājumu" : lang === "EN" ? "Get a Pricing Offer" : "Получить предложение по цене"} 
            subtitle={t.contactForm.defaultSubtitle} 
          />
        </div>

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}
