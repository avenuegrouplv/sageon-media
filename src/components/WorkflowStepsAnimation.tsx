import { motion } from "motion/react";

interface WorkflowStepsAnimationProps {
  className?: string;
}

export default function WorkflowStepsAnimation({ className = "" }: WorkflowStepsAnimationProps) {
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
          duration: 20,
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
          {/* Connecting Workflow Path Line */}
          <motion.path
            d="M9 22 C 16 12, 28 32, 35 22"
            stroke="#BAFC50"
            strokeWidth="2"
            strokeDasharray="3 3"
            animate={{
              strokeDashoffset: [24, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Node 1 (Initial Discussion) */}
          <motion.g
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0,
            }}
          >
            <circle cx="9" cy="22" r="4.5" fill="#121215" stroke="#BAFC50" strokeWidth="2" />
            <circle cx="9" cy="22" r="2" fill="#BAFC50" />
          </motion.g>

          {/* Node 2 (Development Process) */}
          <motion.g
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <circle cx="18" cy="15" r="4.5" fill="#121215" stroke="#BAFC50" strokeWidth="2" />
            <circle cx="18" cy="15" r="2" fill="#BAFC50" />
          </motion.g>

          {/* Node 3 (Approval & Launch) */}
          <motion.g
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          >
            <circle cx="26" cy="29" r="4.5" fill="#121215" stroke="#BAFC50" strokeWidth="2" />
            <circle cx="26" cy="29" r="2" fill="#BAFC50" />
          </motion.g>

          {/* Node 4 (Support & Checkmark Peak) */}
          <motion.g
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.8,
            }}
          >
            <circle cx="35" cy="22" r="5.5" fill="#BAFC50" stroke="#BAFC50" strokeWidth="1" />
            {/* Checkmark inside final node */}
            <path
              d="M32.5 22 L34.2 23.8 L37.5 20.2"
              stroke="#121215"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Flowing Energy Pulse Traveling along nodes */}
          <motion.circle
            r="3"
            fill="#FFFFFF"
            className="shadow-[0_0_8px_#ffffff]"
            animate={{
              cx: [9, 18, 26, 35],
              cy: [22, 15, 29, 22],
              opacity: [0.4, 1, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Glowing Sparkle Peak */}
          <motion.g
            transform="translate(36, 11)"
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
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.3,
          }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]"
          style={{ right: "20%", bottom: "12%" }}
          animate={{
            y: [-4, -36],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.7,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1.0,
          }}
        />
      </div>
    </div>
  );
}
