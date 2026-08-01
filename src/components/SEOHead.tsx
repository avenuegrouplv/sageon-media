import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: object | object[];
}

export default function SEOHead({
  title,
  description,
  keywords = "mājaslapu izstrāde, tīmekļa vietnes, web izstrāde, SEO optimizācija, e-veikali, dizains",
  ogImage = "/Logo-new.webp",
  ogType = "website",
  schema,
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = `https://sageon.media${location.pathname === "/" ? "" : location.pathname}`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `https://sageon.media${ogImage}`;

  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (selector: string, attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update link tags
    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Standard Meta Tags
    updateMeta('meta[name="description"]', "name", "description", description);
    updateMeta('meta[name="keywords"]', "name", "keywords", keywords);

    // Canonical Link
    updateLink("canonical", canonicalUrl);

    // Open Graph
    updateMeta('meta[property="og:title"]', "property", "og:title", title);
    updateMeta('meta[property="og:description"]', "property", "og:description", description);
    updateMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    updateMeta('meta[property="og:image"]', "property", "og:image", fullOgImage);
    updateMeta('meta[property="og:type"]', "property", "og:type", ogType);
    updateMeta('meta[property="og:locale"]', "property", "og:locale", "lv_LV");

    // Twitter Cards
    updateMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    updateMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    updateMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    updateMeta('meta[name="twitter:image"]', "name", "twitter:image", fullOgImage);

    // Dynamic JSON-LD Schema
    const scriptId = "dynamic-seo-schema";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (scriptElement) {
      scriptElement.remove();
    }

    if (schema) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = "application/ld+json";
      scriptElement.innerHTML = JSON.stringify(schema);
      document.head.appendChild(scriptElement);
    }

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [title, description, keywords, canonicalUrl, fullOgImage, ogType, schema]);

  return null;
}
