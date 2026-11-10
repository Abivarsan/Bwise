import React, { useEffect, useState } from 'react';
import { assetUrl } from '../../utils/assets';

interface BwiseBeeCharacterProps {
  /** Size preset or custom classes */
  className?: string;
  /** Flight banking angle in degrees when flying towards a beehive cell */
  flightTiltDeg?: number;
  /** Whether the bee is actively flying at high speed (enables golden trail & faster wing buzz) */
  isFlying?: boolean;
  /** Optional flip horizontally so the bee faces left or right */
  flipHorizontal?: boolean;
  /** Variant: 'hero' (S1/S2 main guide bee), 'worker' (small bee inside S1 hive), or 'waving' (S6 footer bee) */
  variant?: 'hero' | 'worker' | 'waving';
}

// Static transparent 3D Bwise Bee mascot asset generated from the pristine studio reference S1
// with intact legs, feet, antennae, and translucent wings
const FULL_BEE_ASSET_URL = assetUrl('/assets/branding/bwise-bee-full.png');

export const BwiseBeeCharacter: React.FC<BwiseBeeCharacterProps> = ({
  className = 'w-64 h-64',
  flightTiltDeg = 0,
  isFlying = false,
  flipHorizontal = false,
  variant = 'hero',
}) => {
  const [beeImgSrc, setBeeImgSrc] = useState<string>(FULL_BEE_ASSET_URL);

  if (variant === 'worker') {
    // Small 3D golden worker bee hovering inside the S1 honeycomb
    return (
      <div className={`relative select-none pointer-events-none animate-bee-hover ${className}`}>
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.28)]">
          <defs>
            <radialGradient id="workerBodyGold" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>
            <linearGradient id="workerWing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.88)" />
              <stop offset="100%" stopColor="rgba(224,242,254,0.35)" />
            </linearGradient>
          </defs>
          {/* Left & Right Rapidly Fluttering Wings */}
          <g className="animate-wing-left">
            <ellipse cx="42" cy="40" rx="24" ry="12" transform="rotate(-28 42 40)" fill="url(#workerWing)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          </g>
          <g className="animate-wing-right">
            <ellipse cx="78" cy="40" rx="24" ry="12" transform="rotate(28 78 40)" fill="url(#workerWing)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          </g>
          {/* 3D Striped Abdomen */}
          <ellipse cx="60" cy="64" rx="24" ry="20" fill="url(#workerBodyGold)" />
          <path d="M40 58 Q60 66 80 58" stroke="#1C1917" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M38 68 Q60 76 82 68" stroke="#1C1917" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M44 77 Q60 83 76 77" stroke="#1C1917" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Furry Golden Thorax */}
          <circle cx="60" cy="48" r="14" fill="#D97706" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        transform: `rotate(${flightTiltDeg}deg) scaleX(${flipHorizontal ? -1 : 1})`,
        transition: isFlying ? 'transform 0.18s ease-out' : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="relative w-full h-full animate-bee-hover">
        {/* Golden Pollen & Honey Glow Aura when flying */}
        {isFlying && (
          <div className="absolute inset-4 rounded-full bg-amber-400/35 blur-2xl animate-pulse pointer-events-none" />
        )}

        {/* Animated 60fps Translucent Fluttering Wing Layer (positioned behind the bee's left shoulder) */}
        <svg
          viewBox="0 0 300 300"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{
            animationDuration: isFlying ? '0.035s' : '0.065s',
          }}
        >
          <defs>
            <linearGradient id="bwiseWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.72)" />
              <stop offset="60%" stopColor="rgba(224, 242, 254, 0.38)" />
              <stop offset="100%" stopColor="rgba(186, 230, 253, 0.15)" />
            </linearGradient>
          </defs>
          <g className="animate-wing-left">
            <path
              d="M 118 145 C 55 100, 12 108, 18 138 C 22 162, 68 172, 118 158 Z"
              fill="url(#bwiseWingGrad)"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="1.5"
            />
            <path
              d="M 115 150 C 72 132, 42 134, 26 142"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              fill="none"
            />
          </g>
        </svg>

        {/* Studio 3D Rendered Bwise Bee Character with complete legs, feet, and translucent wings */}
        <img
          src={beeImgSrc}
          alt="Bwise 3D Guide Bee"
          className="relative z-10 w-full h-full object-contain drop-shadow-[0_22px_32px_rgba(26,22,18,0.22)]"
          draggable={false}
          loading="eager"
          decoding="async"
        />

        {/* Trailing Sparkle Particles during active flight */}
        {isFlying && (
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-0">
            <span className="w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_#F59E0B] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80 shadow-[0_0_8px_#F59E0B]" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-200/70" />
          </div>
        )}
      </div>
    </div>
  );
};
