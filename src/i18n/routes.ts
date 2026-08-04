import { Language, PageKey } from "./types";

export const ROUTE_MAP: Record<Language, Record<PageKey, string>> = {
  LV: {
    home: "/",
    portfolio: "/projekti",
    services: "/pakalpojumi",
    faq: "/buj",
    blog: "/blogs",
    contact: "/kontakti",
  },
  EN: {
    home: "/en",
    portfolio: "/en/projects",
    services: "/en/services",
    faq: "/en/faq",
    blog: "/en/blog",
    contact: "/en/contact",
  },
  RU: {
    home: "/ru",
    portfolio: "/ru/proekty",
    services: "/ru/uslugi",
    faq: "/ru/voprosy",
    blog: "/ru/blog",
    contact: "/ru/kontakty",
  },
};

// Map any path to pageKey and Language
export function getPageKeyAndLangFromPath(pathname: string): { lang: Language; pageKey: PageKey } {
  const cleanPath = pathname.replace(/\/$/, "") || "/";

  // Check EN
  if (cleanPath === "/en") return { lang: "EN", pageKey: "home" };
  if (cleanPath.startsWith("/en/projects") || cleanPath.startsWith("/en/portfolio")) return { lang: "EN", pageKey: "portfolio" };
  if (cleanPath.startsWith("/en/services")) return { lang: "EN", pageKey: "services" };
  if (cleanPath.startsWith("/en/faq")) return { lang: "EN", pageKey: "faq" };
  if (cleanPath.startsWith("/en/blog")) return { lang: "EN", pageKey: "blog" };
  if (cleanPath.startsWith("/en/contact")) return { lang: "EN", pageKey: "contact" };

  // Check RU
  if (cleanPath === "/ru") return { lang: "RU", pageKey: "home" };
  if (cleanPath.startsWith("/ru/proekty") || cleanPath.startsWith("/ru/portfolio")) return { lang: "RU", pageKey: "portfolio" };
  if (cleanPath.startsWith("/ru/uslugi")) return { lang: "RU", pageKey: "services" };
  if (cleanPath.startsWith("/ru/voprosy")) return { lang: "RU", pageKey: "faq" };
  if (cleanPath.startsWith("/ru/blog")) return { lang: "RU", pageKey: "blog" };
  if (cleanPath.startsWith("/ru/kontakty")) return { lang: "RU", pageKey: "contact" };

  // Default LV
  if (cleanPath === "/projekti" || cleanPath === "/portfolio" || cleanPath === "/darbi") return { lang: "LV", pageKey: "portfolio" };
  if (cleanPath === "/pakalpojumi" || cleanPath === "/cenas") return { lang: "LV", pageKey: "services" };
  if (cleanPath === "/buj") return { lang: "LV", pageKey: "faq" };
  if (cleanPath === "/blogs") return { lang: "LV", pageKey: "blog" };
  if (cleanPath === "/kontakti") return { lang: "LV", pageKey: "contact" };

  return { lang: "LV", pageKey: "home" };
}
