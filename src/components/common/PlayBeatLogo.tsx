import React from 'react';

interface PlayBeatLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  className?: string;
  showText?: boolean;
}

export const PlayBeatLogo: React.FC<PlayBeatLogoProps> = ({
  size = 'md',
  className = '',
  showText = true
}) => {
  // Dimensions for emblem
  const emblemSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20',
    icon: 'w-8 h-8'
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
    icon: 'text-base'
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.25em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.3em]',
    lg: 'text-[10px] sm:text-[11px] tracking-[0.35em]',
    xl: 'text-xs tracking-[0.4em]',
    icon: 'text-[9px]'
  };

  // Bespoke Vector Emblem: Obsidian hexagon badge with glowing electric-yellow 3D lightning bolt & cyan cyber-accents
  const renderEmblem = () => (
    <div className={`relative flex items-center justify-center flex-none ${emblemSizes[size]}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(250,204,21,0.5)] transition-transform duration-200 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Hexagon Shield */}
        <polygon
          points="50,6 88,28 88,72 50,94 12,72 12,28"
          fill="url(#shieldBg)"
          stroke="url(#shieldBorder)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner ambient rim */}
        <polygon
          points="50,12 82,31 82,69 50,88 18,69 18,31"
          fill="none"
          stroke="url(#shieldInnerGlow)"
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* Dynamic Electric Yellow Lightning Bolt (⚡) */}
        {/* Main 3D multi-faceted lightning bolt */}
        <path
          d="M55 18 L30 52 H48 L42 82 L72 44 H52 L62 18 Z"
          fill="url(#boltGradPrimary)"
          filter="url(#lightningGlow)"
        />

        {/* Highlight facet for dimensional bevel */}
        <path
          d="M55 18 L30 52 H48 L42 82 L49 53 H67 Z"
          fill="url(#boltHighlight)"
          opacity="0.6"
        />

        {/* Micro Play Triangle Accent in bottom-right */}
        <polygon
          points="70,58 70,68 78,63"
          fill="#38bdf8"
          opacity="0.85"
        />

        {/* Gradients and Filters Definition */}
        <defs>
          {/* Hexagon Shield Background */}
          <linearGradient id="shieldBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a1638" />
            <stop offset="50%" stopColor="#040b1e" />
            <stop offset="100%" stopColor="#020512" />
          </linearGradient>

          {/* Glowing Border: Solar Yellow to Electric Cyan */}
          <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#facc15" />
            <stop offset="75%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          {/* Inner Accent Rim */}
          <linearGradient id="shieldInnerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#facc15" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
          </linearGradient>

          {/* Primary Lightning Gradient */}
          <linearGradient id="boltGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fff066" />
            <stop offset="60%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Bevel Highlight Gradient */}
          <linearGradient id="boltHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.2" />
          </linearGradient>

          {/* Neon Glow Filter */}
          <filter id="lightningGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#facc15" floodOpacity="0.8" />
          </filter>
        </defs>
      </svg>
    </div>
  );

  if (size === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderEmblem()}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {renderEmblem()}

      {showText && (
        <div className="leading-tight flex flex-col justify-center">
          <div className={`${titleSizes[size]} font-black tracking-tight text-white uppercase font-syne flex items-center`}>
            <span>PLAY</span>
            <span className="text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">BEAT</span>
          </div>
          <div className={`${subSizes[size]} font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1`}>
            <span className="text-[#facc15] font-black">—</span>
            <span className="text-slate-200">DIGITAL</span>
            <span className="text-[#facc15] font-black">—</span>
          </div>
        </div>
      )}
    </div>
  );
};
