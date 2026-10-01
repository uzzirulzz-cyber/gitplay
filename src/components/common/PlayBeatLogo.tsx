import React from 'react';

interface PlayBeatLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

export const PlayBeatLogo: React.FC<PlayBeatLogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
  animated = true
}) => {
  // Dimensions for squircle emblem
  const squircleSizes = {
    sm: 'w-7 h-7 rounded-[9px]',
    md: 'w-9 h-9 sm:w-10 sm:h-10 rounded-[12px]',
    lg: 'w-12 h-12 sm:w-14 sm:h-14 rounded-[16px]',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 rounded-[22px]',
    icon: 'w-8 h-8 rounded-[10px]'
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
    icon: 'text-base'
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1.5 py-0.2',
    md: 'text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5',
    lg: 'text-xs px-2.5 py-0.5',
    xl: 'text-sm px-3 py-1',
    icon: 'text-[9px]'
  };

  const barWidths = {
    sm: 'w-[2.5px]',
    md: 'w-[3px] sm:w-[3.5px]',
    lg: 'w-[4px] sm:w-[5px]',
    xl: 'w-[6px] sm:w-[7px]',
    icon: 'w-[3px]'
  };

  const barGap = {
    sm: 'gap-[2px]',
    md: 'gap-[3px] sm:gap-[4px]',
    lg: 'gap-[4px] sm:gap-[5px]',
    xl: 'gap-[6px] sm:gap-[8px]',
    icon: 'gap-[3px]'
  };

  // Render the Squircle Soundwave Emblem with neon glow effects
  const renderEmblem = () => (
    <div
      className={`relative flex items-center justify-center flex-none group/logo cursor-pointer ${squircleSizes[size]} transition-all duration-300`}
    >
      {/* Outer ambient glow / bloom effect */}
      <div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600/40 via-pink-500/30 to-cyan-500/40 blur-md pointer-events-none transition-opacity duration-300 ${
          animated ? 'animate-pb-glow' : 'opacity-60'
        } group-hover/logo:opacity-100 group-hover/logo:blur-lg`}
      />

      {/* Squircle container with neon gradient border */}
      <div
        className={`relative w-full h-full flex items-center justify-center ${squircleSizes[size]} p-[1.5px] bg-gradient-to-tr from-[#9333ea] via-[#ec4899] to-[#06b6d4] shadow-[0_0_12px_rgba(168,85,247,0.45),0_0_24px_rgba(6,182,212,0.25)]`}
      >
        {/* Inner dark body */}
        <div
          className={`w-full h-full bg-[#080d1a] ${squircleSizes[size]} flex items-center justify-center relative overflow-hidden`}
        >
          {/* Subtle inner radial ambient light */}
          <div className="absolute inset-0 bg-radial from-purple-500/15 via-transparent to-transparent pointer-events-none" />

          {/* Equalizer Audio Sound Wave Bars (3 bars: Purple, Magenta/Pink, Cyan) */}
          <div
            className={`relative z-10 flex items-center justify-center ${barGap[size]} h-[64%] w-[64%]`}
          >
            {/* Bar 1: Purple (Left) */}
            <span
              className={`${barWidths[size]} rounded-full bg-gradient-to-t from-[#9333ea] to-[#c084fc] shadow-[0_0_6px_rgba(168,85,247,0.8)] transition-all ${
                animated ? 'animate-pb-eq-1' : 'h-[50%]'
              }`}
              style={!animated ? { height: '50%' } : undefined}
            />

            {/* Bar 2: Hot Pink / Magenta (Center - Taller) */}
            <span
              className={`${barWidths[size]} rounded-full bg-gradient-to-t from-[#db2777] to-[#f472b6] shadow-[0_0_8px_rgba(236,72,153,0.9)] transition-all ${
                animated ? 'animate-pb-eq-2' : 'h-[75%]'
              }`}
              style={!animated ? { height: '75%' } : undefined}
            />

            {/* Bar 3: Electric Cyan (Right) */}
            <span
              className={`${barWidths[size]} rounded-full bg-gradient-to-t from-[#0891b2] to-[#38bdf8] shadow-[0_0_6px_rgba(6,182,212,0.8)] transition-all ${
                animated ? 'animate-pb-eq-3' : 'h-[45%]'
              }`}
              style={!animated ? { height: '45%' } : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (size === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderEmblem()}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}
    >
      {renderEmblem()}

      {showText && (
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Main Brand Title: PlayBeat */}
          <span
            className={`${titleSizes[size]} font-bold tracking-tight text-white flex items-center transition-colors group-hover:text-slate-100`}
          >
            PlayBeat
          </span>

          {/* DIGITAL badge in purple-bordered monospace rounded box */}
          <span
            className={`${badgeSizes[size]} font-mono font-semibold tracking-wider text-[#d8b4fe] bg-[#1a1338]/85 border border-[#8b5cf6]/50 rounded-md shadow-[0_0_8px_rgba(139,92,246,0.25)] flex items-center justify-center transition-all group-hover:border-[#a855f7] group-hover:text-white group-hover:shadow-[0_0_12px_rgba(168,85,247,0.45)]`}
          >
            DIGITAL
          </span>
        </div>
      )}
    </div>
  );
};
