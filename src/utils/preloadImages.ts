// Global Image Preloading Utility for Instant Image Display
const HERO_CRITICAL = [
  "/Logo-new.webp",
  "/Hero.webp",
];

const SECONDARY_IMAGES = [
  "/portfolio.webp",
  "/demontaza24-portfolio.webp",
  "/velobiedriba-portfolio.webp",
  "/Avangart-portfolio.webp",
  "/Avenuegroup-portfolio.webp",
  "/latvijas-restarts-portfolio.webp",
  "/enzimi-portfolio.webp",
  "/Travel-with-martins.webp",
  "/beauty-portfolio.webp"
];

const preloadedSet = new Set<string>();

export function preloadImages(urls: string[] = HERO_CRITICAL) {
  if (typeof window === "undefined") return;

  urls.forEach((url) => {
    if (!url || preloadedSet.has(url)) return;
    preloadedSet.add(url);

    try {
      const img = new Image();
      img.src = url;
    } catch (e) {
      // Ignore preloader errors
    }
  });
}

// Safely schedule preloading after main thread initial mount
if (typeof window !== "undefined") {
  const schedulePreload = () => {
    // Always preload hero LCP assets first
    preloadImages(HERO_CRITICAL);

    // On mobile devices, DO NOT preload secondary images to preserve bandwidth and lower TBT
    const isMobile = window.innerWidth < 768 || ("ontouchstart" in window);
    if (!isMobile) {
      setTimeout(() => {
        preloadImages(SECONDARY_IMAGES);
      }, 3500);
    }
  };

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(schedulePreload, { timeout: 3500 });
  } else {
    setTimeout(schedulePreload, 1000);
  }
}

