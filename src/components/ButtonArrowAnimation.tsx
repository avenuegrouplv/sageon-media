import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface ButtonArrowAnimationProps {
  className?: string;
}

export default function ButtonArrowAnimation({ className = "" }: ButtonArrowAnimationProps) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 w-5 h-5 ${className}`}>
      {/* Outer concentric pulsing ripple ring 1 */}
      <motion.span
        className="absolute inset-0 -m-0.5 rounded-full bg-black/15 pointer-events-none"
        animate={{
          scale: [0.9, 1.4, 0.9],
          opacity: [0.35, 0, 0.35],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer concentric pulsing ripple ring 2 */}
      <motion.span
        className="absolute inset-0 -m-0.5 rounded-full border border-black/25 pointer-events-none"
        animate={{
          scale: [0.95, 1.55, 0.95],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />

      {/* Subtle glowing dark aura */}
      <motion.span
        className="absolute inset-0 rounded-full bg-black/10 pointer-events-none"
        animate={{
          scale: [0.95, 1.15, 0.95],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Static Arrow Icon */}
      <div className="relative z-10 flex items-center justify-center text-black">
        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
      </div>
    </div>
  );
}
