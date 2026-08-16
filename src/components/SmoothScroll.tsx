import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // Pure native browser scrolling provides 0ms latency, zero hitching,
  // perfect native mouse wheel response, and fluid 60-120Hz scrolling on both desktop and mobile.
  return <>{children}</>;
}

