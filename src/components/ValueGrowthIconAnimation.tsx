import { motion } from "motion/react";

interface ValueGrowthIconAnimationProps {
  className?: string;
}

export default function ValueGrowthIconAnimation({ className = "" }: ValueGrowthIconAnimationProps) {
  return (
    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center pointer-events-none select-none mx-auto ${className}`}>
      {/* Outer ambient glow circle */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-[#BAFC50]/15 blur-xl"
        animate={{
          scale: [0.85, 1.15, 0.85],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating geometric outer ring */}
      <motion.div
        className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BAFC50]/30 bg-[#18181b]/90 backdrop-blur-md shadow-lg shadow-[#BAFC50]/10 flex items-center justify-center overflow-hidden"
        animate={{
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Subtle decorative grid lines inside card */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#bafc5008_1px,transparent_1px),linear-gradient(to_bottom,#bafc5008_1px,transparent_1px)] bg-[size:10px_10px]" />
      </motion.div>

      {/* Inner main container */}
      <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#BAFC50]/60 bg-[#121215] flex items-center justify-center shadow-md shadow-black/80 overflow-hidden">
        
        {/* Animated Background Pulse Ring */}
        <motion.div
          className="absolute w-12 h-12 rounded-full border border-[#BAFC50]/40"
          animate={{
            scale: [0.7, 1.3, 0.7],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dynamic Vector Artwork */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-20 overflow-visible"
        >
          {/* Animated Ascending Bar Chart (Growth) */}
          {/* Bar 1 */}
          <motion.rect
            x="8"
            y="26"
            width="5"
            height="10"
            rx="2.5"
            fill="#BAFC50"
            opacity="0.5"
            initial={{ height: 10, y: 26, opacity: 0.5 }}
            animate={{
              height: [8, 14, 8],
              y: [28, 22, 28],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0,
            }}
          />

          {/* Bar 2 */}
          <motion.rect
            x="16"
            y="20"
            width="5"
            height="16"
            rx="2.5"
            fill="#BAFC50"
            opacity="0.8"
            initial={{ height: 16, y: 20, opacity: 0.8 }}
            animate={{
              height: [12, 22, 12],
              y: [24, 14, 24],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />

          {/* Bar 3 */}
          <motion.rect
            x="24"
            y="14"
            width="5"
            height="22"
            rx="2.5"
            fill="#BAFC50"
            initial={{ height: 22, y: 14, opacity: 1 }}
            animate={{
              height: [16, 26, 16],
              y: [20, 10, 20],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />

          {/* Animated Growth Trend Arrow / Rocket Path Line */}
          <motion.path
            d="M6 32 L16 22 L24 24 L36 10"
            stroke="#BAFC50"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0.2, opacity: 0.4 }}
            animate={{
              pathLength: [0.3, 1, 0.3],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Arrowhead at the top right of the trend line */}
          <motion.path
            d="M30 10 H36 V16"
            stroke="#BAFC50"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Glowing Sparkle / Starburst at the peak (Symbolizing Value / Success) */}
          <motion.g
            transform="translate(36, 10)"
            animate={{
              rotate: [0, 180, 360],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z"
              fill="#FFFFFF"
            />
          </motion.g>

          {/* Secondary ambient sparkle star */}
          <motion.g
            transform="translate(12, 12)"
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.6, 1.1, 0.6],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <path
              d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z"
              fill="#BAFC50"
            />
          </motion.g>
        </svg>

        {/* Ambient upward floating energy particles */}
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#BAFC50] shadow-[0_0_6px_#BAFC50]"
          style={{ left: "25%", bottom: "10%" }}
          animate={{
            y: [-5, -35],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.3],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.2,
          }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]"
          style={{ right: "20%", bottom: "15%" }}
          animate={{
            y: [-5, -38],
            opacity: [0, 1, 0],
            scale: [0.5, 1.3, 0.3],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1.1,
          }}
        />
      </div>
    </div>
  );
}
