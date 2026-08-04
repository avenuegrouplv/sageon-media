import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpen, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PageNavButtons from "../components/PageNavButtons";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../i18n/LanguageContext";

export default function Blogs() {
  const { lang, t } = useLanguage();
  const blogPosts = t.blogPosts;
  const [activeArticle, setActiveArticle] = useState<typeof blogPosts[0] | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const articleId = searchParams.get("id");
    if (articleId) {
      const post = blogPosts.find(p => p.id === articleId);
      if (post) {
        setActiveArticle(post);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [searchParams, blogPosts]);

  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} | Sageon Media`;
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
    } else {
      document.title = t.seo.blog.title;
    }
  }, [activeArticle, t.seo.blog.title]);

  return (
    <div className="min-h-screen bg-black font-sans text-left text-white relative overflow-hidden">
      <SEOHead
        title={activeArticle ? `${activeArticle.title} | Sageon Media` : t.seo.blog.title}
        description={activeArticle ? activeArticle.excerpt : t.seo.blog.description}
        ogImage={activeArticle ? activeArticle.image : "/Logo-new.webp"}
        ogType={activeArticle ? "article" : "website"}
        schema={
          activeArticle ? [
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `https://sageonmedia.eu/blogs#${activeArticle.id}`,
              "headline": activeArticle.title,
              "description": activeArticle.excerpt,
              "image": activeArticle.image,
              "datePublished": "2026-07-17",
              "author": {
                "@type": "Organization",
                "name": "Sageon Media",
                "url": "https://sageonmedia.eu"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Sageon Media",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://sageonmedia.eu/Logo-new.webp"
                }
              },
              "mainEntityOfPage": `https://sageonmedia.eu/blogs`
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
                  "name": "Blogs",
                  "item": "https://sageonmedia.eu/blogs"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": activeArticle.title,
                  "item": `https://sageonmedia.eu/blogs`
                }
              ]
            }
          ] : [
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "@id": "https://sageonmedia.eu/blogs#blog",
              "name": "Sageon Media Blogs",
              "description": t.seo.blog.description,
              "blogPost": blogPosts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "image": post.image,
                "url": `https://sageonmedia.eu/blogs`
              }))
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
                  "name": "Blogs",
                  "item": "https://sageonmedia.eu/blogs"
                }
              ]
            }
          ]
        }
      />
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

      {/* Irregular Green Ambient Background Glows */}
      <div className="absolute -top-32 -left-20 w-[750px] h-[750px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/2 -right-24 w-[800px] h-[800px] bg-gradient-to-bl from-[#38b000]/28 via-[#BAFC50]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 left-1/3 w-[750px] h-[750px] bg-gradient-to-tr from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20 space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
            <BookOpen className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>{lang === "LV" ? "Noderīgi raksti & padomi" : lang === "EN" ? "Useful Articles & Tips" : "Полезные статьи и советы"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
            {lang === "LV" ? <>Noderīga <span className="text-[#BAFC50]">informācija</span></> : lang === "EN" ? <>Useful <span className="text-[#BAFC50]">Information</span></> : <>Полезная <span className="text-[#BAFC50]">информация</span></>}
          </h1>
          <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto font-light text-center">
            {lang === "LV" 
              ? "Noderīga informācija un praktiski padomi par mājaslapu izstrādi, dizainu, optimizāciju un drošību Jūsu biznesa izaugsmei." 
              : lang === "EN" 
                ? "Useful information and practical tips on website development, design, optimization, and security." 
                : "Полезная информация и практические советы по разработке, дизайну, оптимизации и безопасности сайтов."}
          </p>
        </div>

        {/* Blog Posts Grid - Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="bg-[#18181b] border border-zinc-800 overflow-hidden shadow-md flex flex-col justify-between group cursor-pointer rounded-2xl"
            >
              <div>
                {/* Image Area - Fixed compact height */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                  {/* Dark Image Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-10" />
                  
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/Web-izstrades-agentura.webp";
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Content Area */}
                <div className="p-5 space-y-3.5">
                  <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#BAFC50] transition-colors duration-200 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Action Row */}
              <div className="px-5 pb-5 pt-3 border-t border-zinc-800 mt-2 flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold text-[#BAFC50] uppercase tracking-widest flex items-center gap-1">
                  {lang === "LV" ? "Lasīt rakstu" : lang === "EN" ? "Read article" : "Читать статью"} <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Detailed Modal Reader */}
        <AnimatePresence>
          {activeArticle && (
            <div 
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                data-lenis-prevent
                className="bg-zinc-900 border border-zinc-800 max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl relative shadow-2xl flex flex-col justify-between"
              >
                {/* Header with image */}
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                    <img
                      src={activeArticle.image}
                      alt={activeArticle.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
                    
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="absolute top-4 right-4 bg-black/80 hover:bg-zinc-800 text-white p-2 border border-white/10 rounded-full transition-colors cursor-pointer"
                      aria-label={lang === "LV" ? "Aizvērt" : lang === "EN" ? "Close" : "Закрыть"}
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="absolute bottom-4 left-6 right-6">
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {activeArticle.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="px-6 py-6 text-zinc-300 space-y-4 text-xs md:text-sm font-light leading-relaxed whitespace-pre-wrap">
                    {activeArticle.content.replace(/\*\*/g, "").replace(/\*/g, "")}
                  </div>
                </div>

                {/* Footer bar of Modal */}
                <div className="px-6 py-4 bg-zinc-950/60 border-t border-zinc-800 flex justify-end items-center">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-5 py-2 bg-[#BAFC50] hover:bg-[#a8f235] text-black font-bold tracking-wider text-xs uppercase rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    {lang === "LV" ? "Aizvērt" : lang === "EN" ? "Close" : "Закрыть"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}

