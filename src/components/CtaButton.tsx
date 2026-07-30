import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface CtaButtonProps {
  text: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export default function CtaButton({
  text,
  to,
  onClick,
  className = "",
  fullWidth = false,
}: CtaButtonProps) {
  const content = (
    <div
      className={`group relative inline-flex items-center justify-between overflow-hidden rounded-full bg-[#BAFC50] hover:bg-[#a8f235] px-6 py-2.5 sm:py-3 font-sans font-extrabold text-black text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ease-out cursor-pointer shadow-md hover:shadow-[0_0_25px_rgba(186,252,80,0.5)] ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      <span className="flex-1 text-center font-extrabold text-[#000000]">
        {text}
      </span>
      {/* Perfect black circle on the right side */}
      <div className="relative -mr-2.5 ml-3 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#000000] shadow-sm">
        <ArrowUpRight className="h-4 w-4 stroke-[2.2] text-[#BAFC50]" />
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={fullWidth ? "block w-full" : "inline-block"}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={fullWidth ? "block w-full" : "inline-block"}
    >
      {content}
    </button>
  );
}
