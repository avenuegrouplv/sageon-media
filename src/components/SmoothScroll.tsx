import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Enable Lenis smooth scroll on desktop
    const isTouchOrMobile =
      typeof window !== "undefined" &&
      ((window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024);

    if (isTouchOrMobile) {
      return;
    }

    const rootEl = document.getElementById("root");

    const lenis = new Lenis({
      wrapper: window,
      content: rootEl || document.documentElement,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      autoResize: true,
    });

    (window as any).lenis = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      try {
        lenis.destroy();
      } catch (e) {
        // Ignore
      }
      (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
