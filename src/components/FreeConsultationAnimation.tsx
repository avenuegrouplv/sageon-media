import { motion } from "motion/react";

interface FreeConsultationAnimationProps {
  className?: string;
}

export default function FreeConsultationAnimation({ className = "" }: FreeConsultationAnimationProps) {
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
          duration: 21,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#bafc5008_1px,transparent_1px),linear-gradient(to_bottom,#bafc5008_1px,transparent_1px)] bg-[size:10px_10px]" />
      </motion.div>

      {/* Inner main container */}
      <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#BAFC50]/60 bg-[#121215] flex items-center justify-center shadow-md shadow-black/80 overflow-hidden">
        
        {/* Animated Background Pulse Ring */}
        <motion.div
          className="absolute w-12 h-12 rounded-full border border-[#BAFC50]/40"
          animate={{
            scale: [0.7, 1.35, 0.7],
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
          {/* Main Speech / Consultation Bubble */}
          <motion.path
            d="M12 11 H32 C35.3 11 38 13.7 38 17 V25 C38 28.3 35.3 31 32 31 H22 L15 37 V31 H12 C8.7 31 6 28.3 6 25 V17 C6 13.7 8.7 11 12 11 Z"
            fill="#18181b"
            stroke="#BAFC50"
            strokeWidth="2"
            strokeLinejoin="round"
            animate={{
              strokeOpacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Glowing Lightbulb Idea / Advisory Spark Inside Bubble */}
          <motion.path
            d="M22 15 C19.2 15 17 17.2 17 20 C17 21.8 18 23.3 19.5 24.2 V26.5 H24.5 V24.2 C26 23.3 27 21.8 27 20 C27 17.2 24.8 15 22 15 Z"
            stroke="#BAFC50"
            strokeWidth="1.8"
            fill="#BAFC50"
            fillOpacity="0.25"
            animate={{
              scale: [0.92, 1.08, 0.92],
              fillOpacity: [0.15, 0.45, 0.15],
            }}
            style={{ originX: "22px", originY: "20px" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Lightbulb Filament / Base */}
          <line x1="20" y1="28.5" x2="24" y2="28.5" stroke="#BAFC50" strokeWidth="1.8" strokeLinecap="round" />

          {/* Radiating Consultation Waves */}
          <motion.path
            d="M14 17 C12.5 18.5 12.5 21.5 14 23 M30 17 C31.5 18.5 31.5 21.5 30 23"
            stroke="#BAFC50"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.9, 1.1, 0.9],
            }}
            style={{ originX: "22px", originY: "20px" }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Glowing Sparkle Peak */}
          <motion.g
            transform="translate(34, 9)"
            animate={{
              rotate: [0, 180, 360],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M0 -5 L1.2 -1.2 L5 0 L1.2 1.2 L0 5 L-1.2 1.2 L-5 0 L-1.2 -1.2 Z"
              fill="#FFFFFF"
            />
          </motion.g>
        </svg>

        {/* Ambient upward floating energy particles */}
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#BAFC50] shadow-[0_0_6px_#BAFC50]"
          style={{ left: "22%", bottom: "10%" }}
          animate={{
            y: [-4, -36],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.1,
          }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]"
          style={{ right: "22%", bottom: "14%" }}
          animate={{
            y: [-4, -36],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.7,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.9,
          }}
        />
      </div>
    </div>
  );
}
