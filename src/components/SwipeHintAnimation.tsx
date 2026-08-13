import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Hand } from "lucide-react";

interface SwipeHintAnimationProps {
  lang?: string;
  className?: string;
}

export default function SwipeHintAnimation({ lang = "LV", className = "" }: SwipeHintAnimationProps) {
  const label = "Swipe";

  return (
    <div 
      className={`md:hidden inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[38px] rounded-full bg-[#18181b]/95 border border-[#BAFC50]/50 text-zinc-200 shadow-md backdrop-blur-sm select-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center text-[#BAFC50]">
        <motion.div
          animate={{ x: [-4, 4, -4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-0.5"
        >
          <ChevronLeft className="h-3.5 w-3.5 opacity-60" />
          <Hand className="h-4 w-4 rotate-[-10deg]" />
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
        </motion.div>
      </div>
      <span className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-200">
        {label}
      </span>
    </div>
  );
}
