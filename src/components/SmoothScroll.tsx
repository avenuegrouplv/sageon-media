import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Only initialize Lenis on desktop non-touch devices
    const isTouchOrMobile =
      typeof window !== "undefined" &&
      ((window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024);

    if (isTouchOrMobile) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
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
        // Ignore destroy error if already disposed
      }
      (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
