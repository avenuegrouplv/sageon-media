// Global Image Preloading Utility for Instant Image Display
const CRITICAL_IMAGES = [
  "/portfolio.webp",
  "/Logo-new.webp",
  "/Hero.webp",
  "/demontaza24-portfolio.webp",
  "/velobiedriba-portfolio.webp",
  "/Avangart-portfolio.webp",
  "/Avenuegroup-portfolio.webp",
  "/latvijas-restarts-portfolio.webp",
  "/travel-with-martins-portfolio.webp",
  "/Iedod-savam-biznesam-jaunu-uzravienu.webp",
  "/dizains-mobile-first.webp",
  "/Web-izstrades-agentura.webp",
  "/individuals-dizains-musdienu-tehnologijas.webp",
  "/Majaslapa-tavam-biznesam.webp",
  "/blog/seo.webp",
  "/blog/design.webp",
  "/blog/speed.webp",
  "/blog/conversion.webp",
  "/blog/security.webp",
  "/blog/future.webp"
];

const preloadedSet = new Set<string>();

export function preloadImages(urls: string[] = CRITICAL_IMAGES) {
  if (typeof window === "undefined") return;

  urls.forEach((url) => {
    if (!url || preloadedSet.has(url)) return;
    preloadedSet.add(url);

    const img = new Image();
    img.src = url;
    if ("fetchPriority" in img) {
      (img as unknown as { fetchPriority: string }).fetchPriority = "high";
    }
  });
}

// Auto-run preloader immediately when script is imported
preloadImages();
