import { motion } from "motion/react";

interface FastWebsiteSolutionAnimationProps {
  className?: string;
}

export default function FastWebsiteSolutionAnimation({ className = "" }: FastWebsiteSolutionAnimationProps) {
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
          duration: 18,
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
            duration: 2.4,
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
          {/* Browser Window Outline */}
          <rect
            x="7"
            y="9"
            width="30"
            height="24"
            rx="4"
            fill="#18181b"
            stroke="#BAFC50"
            strokeWidth="2"
          />

          {/* Browser Header Bar */}
          <line x1="7" y1="16" x2="37" y2="16" stroke="#BAFC50" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx="11" cy="12.5" r="1.2" fill="#BAFC50" />
          <circle cx="15" cy="12.5" r="1.2" fill="#BAFC50" fillOpacity="0.6" />
          <circle cx="19" cy="12.5" r="1.2" fill="#BAFC50" fillOpacity="0.3" />

          {/* Speed / Time Clock Icon Overlay */}
          <motion.circle
            cx="17"
            cy="24.5"
            r="5"
            stroke="#BAFC50"
            strokeWidth="1.8"
            fill="#121215"
            animate={{
              scale: [0.95, 1.1, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Clock Hand Rotating Fast */}
          <motion.line
            x1="17"
            y1="24.5"
            x2="17"
            y2="21.5"
            stroke="#BAFC50"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{
              rotate: [0, 360],
            }}
            style={{ originX: "17px", originY: "24.5px" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* High Speed Lightning Bolt (Shooting across website) */}
          <motion.path
            d="M27 18 L23 25 H28 L24 32"
            stroke="#BAFC50"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#BAFC50"
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.9, 1.15, 0.9],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Speed Motion Lines */}
          <motion.path
            d="M32 20 H36 M30 24 H35 M31 28 H34"
            stroke="#BAFC50"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{
              strokeDasharray: ["0,10", "10,0", "0,10"],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Glowing Sparkle */}
          <motion.g
            transform="translate(34, 8)"
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
          style={{ left: "20%", bottom: "10%" }}
          animate={{
            y: [-4, -36],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.2,
          }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]"
          style={{ right: "24%", bottom: "14%" }}
          animate={{
            y: [-4, -36],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.8,
          }}
        />
      </div>
    </div>
  );
}
