import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpen, ArrowRight, X, FileText, Sparkles } from "lucide-react";
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
    <div className="min-h-screen min-h-[100dvh] bg-black font-sans text-left text-white relative overflow-hidden">
      <SEOHead
        title={activeArticle ? `${activeArticle.title} | Sageon Media` : t.seo.blog.title}
        description={activeArticle ? activeArticle.excerpt : t.seo.blog.description}
        ogType={activeArticle ? "article" : "website"}
        schema={
          activeArticle ? [
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `https://sageonmedia.eu/blogs#${activeArticle.id}`,
              "headline": activeArticle.title,
              "description": activeArticle.excerpt,
              "datePublished": "2026-07-17",
              "author": {
                "@type": "Organization",
                "name": "Sageon Media",
                "url": "https://sageonmedia.eu"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Sageon Media"
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

      {/* High-Performance Green Ambient Background Glows for Mobile & Desktop */}
      <div className="absolute -top-32 -left-20 w-[90vw] max-w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[12%] right-10 w-[90vw] max-w-[780px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[28%] -left-16 w-[90vw] max-w-[800px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[45%] right-16 w-[90vw] max-w-[820px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[62%] -right-24 w-[90vw] max-w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[80%] left-10 w-[90vw] max-w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,176,0,0.15),rgba(186,252,80,0.08),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute -bottom-40 left-1/3 w-[90vw] max-w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(186,252,80,0.16),rgba(56,176,0,0.08),transparent_70%)] pointer-events-none z-0" />

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
              className="bg-[#18181b] border border-zinc-800 hover:border-[#BAFC50]/50 p-6 shadow-md flex flex-col justify-between group cursor-pointer rounded-2xl transition-colors duration-200 overflow-hidden"
            >
              <div className="space-y-3.5">
                {post.image && (
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
                    <img
                      src={post.image}
                      alt={post.title}
                      width={500}
                      height={312}
                      className="w-full h-full object-cover select-none"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#BAFC50] transition-colors duration-200 line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                
                <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Read Action Row */}
              <div className="pt-4 border-t border-zinc-800/80 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold text-[#BAFC50] uppercase tracking-widest flex items-center gap-1">
                  {lang === "LV" ? "Lasīt rakstu" : lang === "EN" ? "Read article" : "Читать статью"} <ArrowRight className="h-3 w-3" />
                </span>
                <span className="text-[10px] font-mono text-zinc-500">{post.date}</span>
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
                className="bg-zinc-900 border border-zinc-800 max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl relative shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                {/* Modal Header */}
                <div>
                  {activeArticle.image && (
                    <div className="w-full h-48 sm:h-56 overflow-hidden bg-zinc-900 border-b border-zinc-800">
                      <img
                        src={activeArticle.image}
                        alt={activeArticle.title}
                        className="w-full h-full object-cover select-none"
                      />
                    </div>
                  )}

                  <div className="relative p-6 sm:p-8 bg-zinc-900 border-b border-zinc-800">
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="absolute top-4 right-4 bg-zinc-800 hover:bg-zinc-700 text-white p-2 border border-white/10 rounded-full transition-colors cursor-pointer"
                      aria-label={lang === "LV" ? "Aizvērt" : lang === "EN" ? "Close" : "Закрыть"}
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="space-y-2 pr-8">
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

