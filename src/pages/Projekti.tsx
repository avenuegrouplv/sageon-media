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
    link: getLocalizedPath("contact"),
    tags: lang === "EN" ? [
      "Custom UI/UX",
      "Brand Logo",
      "Service Descriptions",
      "Mobile First"
    ] : lang === "RU" ? [
      "Уникальный UI/UX",
      "Логотип бренда",
      "Описания услуг",
      "Адаптивность"
    ] : [
      "Unikāls UI/UX",
      "Zīmola logo",
      "Pakalpojumu apraksti",
      "Mobile First"
    ]
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-black font-sans text-left text-white relative overflow-hidden">
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

      {/* High-Performance Green Ambient Background Glows for Mobile & Desktop */}
      <div className="absolute -top-32 -right-20 w-[90vw] max-w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[12%] -left-16 w-[90vw] max-w-[780px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[28%] right-10 w-[90vw] max-w-[780px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[45%] -left-20 w-[90vw] max-w-[820px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[62%] right-10 w-[90vw] max-w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[80%] -left-16 w-[90vw] max-w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute -bottom-40 right-1/4 w-[90vw] max-w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />

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

        {/* Portfolio Cards Grid - Scaled down by 17% (max-w-[1145px] vs 1380px) with strictly uniform size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1145px] mx-auto px-2 sm:px-4 items-stretch justify-items-stretch">
          {portfolioCards.map((card) => (
            <div key={card.id} className="w-full h-full flex flex-col items-stretch">
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
          <div key={emptyPortfolioCard.id} className="w-full h-full flex flex-col items-stretch">
            <PortfolioLaptopCard
              title={emptyPortfolioCard.title}
              displayLink={emptyPortfolioCard.displayLink}
              link={emptyPortfolioCard.link}
              isPlaceholder={true}
              subtitle={emptyPortfolioCard.subtitle}
              description={emptyPortfolioCard.description}
              tags={emptyPortfolioCard.tags}
            />
          </div>
        </div>

        {/* Dynamic Contact Form for Pricing Proposal Request */}
        <div className="border border-zinc-800 overflow-hidden shadow-md rounded-2xl max-w-[1145px] mx-auto">
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
