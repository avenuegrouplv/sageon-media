interface StylizedCrossIconProps {
  isOpen: boolean;
}

export default function StylizedCrossIcon({ isOpen }: StylizedCrossIconProps) {
  return (
    <div
      className={`relative w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-300 shrink-0 ${
        isOpen
          ? "bg-[#BAFC50] text-black shadow-[0_0_14px_rgba(186,252,80,0.4)] border border-[#BAFC50]"
          : "bg-zinc-800/90 text-[#BAFC50] border border-zinc-700/70 group-hover:border-[#BAFC50]/60 group-hover:bg-zinc-800"
      }`}
    >
      <svg
        className={`w-4 h-4 transition-transform duration-300 ease-out ${
          isOpen ? "rotate-135 scale-110" : "rotate-0 scale-100"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Main stylized cross lines */}
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
        {/* Center decorative accent dot */}
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}
