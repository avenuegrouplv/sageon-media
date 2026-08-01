import { Link } from "react-router-dom";
import { Plus, ExternalLink } from "lucide-react";

interface PortfolioLaptopCardProps {
  key?: string | number;
  title: string;
  brand?: string;
  displayLink: string;
  image?: string;
  link: string;
  isPlaceholder?: boolean;
  subtitle?: string;
  category?: string;
  description?: string;
}

export default function PortfolioLaptopCard({
  title,
  brand,
  displayLink,
  image,
  link,
  isPlaceholder = false,
  subtitle,
  description,
}: PortfolioLaptopCardProps) {
  const cleanDomain = displayLink.replace("https://", "").replace("http://", "");

  const content = (
    <div className="group block relative select-none w-full transition-all duration-150 ease-out p-2 sm:p-4 cursor-pointer">
      {/* Tablet Graphic Container using /Portfolio2-1-1.webp (897x553) */}
      <div className="relative w-full aspect-[897/553] my-2 sm:my-4">
        
        {/* Website Content Screen Area inside tablet frame cutout (Placed behind tablet frame at z-10) */}
        <div 
          className="absolute z-10 overflow-hidden bg-black flex flex-col justify-between rounded-t-[8px] sm:rounded-t-[12px] md:rounded-t-[14px] rounded-b-none"
          style={{
            top: '2.17%',
            left: '1.34%',
            width: '97.32%',
            height: '88.97%',
          }}
        >
          {!isPlaceholder && image ? (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={image}
                alt={title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-center">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-800/90 group-hover:bg-[#BAFC50] border border-zinc-700 group-hover:border-[#BAFC50] flex items-center justify-center transition-all duration-150 ease-out shadow-md">
                <Plus className="h-5 w-5 text-[#BAFC50] group-hover:text-black transition-colors duration-150 ease-out" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />
            </div>
          )}
        </div>

        {/* The Device Frame Image (Placed on top at z-20) */}
        <img
          src="/Portfolio2-1-1.webp"
          alt={title}
          width={897}
          height={553}
          loading="lazy"
          className="w-full h-full object-contain pointer-events-none select-none relative z-20 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_20px_40px_rgba(186,252,80,0.15)] transition-all duration-300"
        />
      </div>

      {/* Domain Address Pill Badge below Tablet - Positioned snug directly under tablet body */}
      <div className="mt-1 sm:mt-2 relative z-30 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#BAFC50] group-hover:text-black transition-all duration-150 ease-out py-1.5 px-4 rounded-full bg-zinc-900/95 border border-zinc-800 group-hover:border-[#BAFC50] group-hover:bg-[#BAFC50] shadow-lg backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#BAFC50] group-hover:bg-black transition-colors duration-150 ease-out animate-pulse shrink-0" />
          <span className="tracking-wide">
            {isPlaceholder || cleanDomain.includes("tavaprojekts") || cleanDomain.includes("biznesam") || cleanDomain.includes("jaunslapa") 
              ? "Pieteikt projektu" 
              : cleanDomain}
          </span>
          <ExternalLink className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150 ease-out text-[#BAFC50] group-hover:text-black" />
        </div>
      </div>
    </div>
  );

  if (isPlaceholder || link.startsWith("/")) {
    return (
      <Link to={link || "/kontakti"} className="block w-full">
        {content}
      </Link>
    );
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full">
      {content}
    </a>
  );
}
