import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Automatically scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Naviģēt uz lapas augšdaļu"
      title="Uz augšu"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#BAFC50] text-black shadow-lg flex items-center justify-center cursor-pointer border border-black/10"
    >
      <ArrowUp className="h-5 w-5 stroke-[2.8]" />
    </button>
  );
}
