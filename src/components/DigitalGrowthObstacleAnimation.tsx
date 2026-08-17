import { motion } from "motion/react";

interface DigitalGrowthObstacleAnimationProps {
  className?: string;
}

export default function DigitalGrowthObstacleAnimation({ className = "" }: DigitalGrowthObstacleAnimationProps) {
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
          rotate: [0, -90, -180, -270, -360],
        }}
        transition={{
          duration: 22,
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
            duration: 2.6,
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
          {/* Outer Shield / Barrier boundary outline */}
          <motion.path
            d="M22 6 L34 11 V20 C34 28 28 34 22 37 C16 34 10 28 10 20 V11 L22 6 Z"
            stroke="#BAFC50"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#BAFC50"
            fillOpacity="0.08"
            animate={{
              strokeOpacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated Lock Shackle (Unlocking motion) */}
          <motion.path
            d="M17 19 V15 C17 12.2 19.2 10 22 10 C24.8 10 27 12.2 27 15 V19"
            stroke="#BAFC50"
            strokeWidth="2.2"
            strokeLinecap="round"
            animate={{
              y: [0, -4, 0],
              rotate: [0, -12, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Lock Body transforming into Keyhole & Success Checkmark */}
          <motion.rect
            x="15"
            y="19"
            width="14"
            height="11"
            rx="2.5"
            fill="#18181b"
            stroke="#BAFC50"
            strokeWidth="2"
          />

          {/* Center Keyhole turning to glowing Checkmark */}
          <motion.path
            d="M18.5 24.5 L21 26.5 L27 19.5"
            stroke="#BAFC50"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              pathLength: [0.2, 1, 0.2],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Burst Rays Breaking Through Obstacles */}
          <motion.g
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <line x1="22" y1="2" x2="22" y2="4" stroke="#BAFC50" strokeWidth="2" strokeLinecap="round" />
            <line x1="38" y1="22" x2="36" y2="22" stroke="#BAFC50" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="22" x2="8" y2="22" stroke="#BAFC50" strokeWidth="2" strokeLinecap="round" />
          </motion.g>

          {/* Glowing Sparkle */}
          <motion.g
            transform="translate(32, 10)"
            animate={{
              rotate: [0, 180, 360],
              scale: [0.7, 1.2, 0.7],
            }}
            transition={{
              duration: 3,
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
          style={{ left: "22%", bottom: "12%" }}
          animate={{
            y: [-4, -36],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.1,
          }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]"
          style={{ right: "22%", bottom: "15%" }}
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
