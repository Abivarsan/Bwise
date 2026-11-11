import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface NaturalSkiesSkyboxProps {
  mouseTilt?: { x: number; y: number };
}

/**
 * Cinematic Natural Skies Atmospheric Environment (Idea 5)
 * - Multi-tier golden sunrise skybox
 * - Drifting parallax cloud formations
 * - Shimmering ambient light particles & warm sunbeam glow
 */
export const NaturalSkiesSkybox: React.FC<NaturalSkiesSkyboxProps> = ({
  mouseTilt = { x: 0, y: 0 },
}) => {
  // Pre-generate stable random sparkling particles
  const sparkles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (i * 37) % 100,
      y: (i * 23 + 15) % 85,
      size: 3 + (i % 4) * 2,
      duration: 3.5 + (i % 5) * 1.2,
      delay: (i * 0.4) % 4,
      isStar: i % 3 === 0,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* =====================================================================
          1. CINEMATIC SKYBOX BASE GRADIENT (Morning Gold to Warm Amber Cream)
         ===================================================================== */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#FFFDF7] via-[#FFF3DC] to-[#FDE8C8]"
        style={{
          transform: `translate3d(${mouseTilt.x * -8}px, ${mouseTilt.y * -6}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      />

      {/* Radiant Sunrise Sun Flare & Golden Volumetric Core (Upper-Left / Center) */}
      <div
        className="absolute -top-[15%] left-[8%] w-[850px] h-[850px] rounded-full opacity-60 mix-blend-screen pointer-events-none blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(254, 240, 138, 0.95) 0%, rgba(251, 191, 36, 0.55) 35%, rgba(245, 158, 11, 0.15) 65%, transparent 80%)',
          transform: `translate3d(${mouseTilt.x * -16}px, ${mouseTilt.y * -12}px, 0)`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      {/* Secondary Warm Ambient Atmospheric Sheen */}
      <div className="absolute inset-0 bg-radial-[at_80%_40%] from-amber-300/25 via-transparent to-transparent pointer-events-none" />

      {/* =====================================================================
          2. MULTI-TIER PARALLAX DRIFTING CLOUD LAYERS (Continuous Flow)
         ===================================================================== */}
      {/* Tier 1: Background Deep Horizon Clouds (Slow drift) */}
      <div className="absolute -bottom-10 left-0 w-[200%] h-72 opacity-65 flex animate-cloud-drift-slow">
        <svg className="w-1/2 h-full shrink-0" viewBox="0 0 1440 280" preserveAspectRatio="none">
          <path
            d="M0,160 C180,120 320,180 480,140 C640,100 800,170 960,130 C1120,90 1280,150 1440,120 L1440,280 L0,280 Z"
            fill="url(#cloudGradDeep)"
          />
          <defs>
            <linearGradient id="cloudGradDeep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="40%" stopColor="rgba(254, 243, 199, 0.85)" />
              <stop offset="100%" stopColor="rgba(253, 230, 138, 0.4)" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="w-1/2 h-full shrink-0" viewBox="0 0 1440 280" preserveAspectRatio="none">
          <path
            d="M0,160 C180,120 320,180 480,140 C640,100 800,170 960,130 C1120,90 1280,150 1440,120 L1440,280 L0,280 Z"
            fill="url(#cloudGradDeep)"
          />
        </svg>
      </div>

      {/* Tier 2: Midground Fluffy Cumulus Clouds */}
      <div className="absolute top-[35%] -left-[10%] w-[220%] h-96 opacity-50 flex animate-cloud-drift-medium pointer-events-none">
        <svg className="w-1/2 h-full shrink-0" viewBox="0 0 1600 380" preserveAspectRatio="none">
          {/* Billowing cloud puffs */}
          <circle cx="280" cy="220" r="160" fill="rgba(255,255,255,0.72)" filter="blur(18px)" />
          <circle cx="560" cy="180" r="190" fill="rgba(255,255,255,0.78)" filter="blur(22px)" />
          <circle cx="920" cy="210" r="170" fill="rgba(255,255,255,0.7)" filter="blur(20px)" />
          <circle cx="1280" cy="190" r="200" fill="rgba(255,255,255,0.8)" filter="blur(24px)" />
          <circle cx="1520" cy="240" r="150" fill="rgba(255,255,255,0.65)" filter="blur(16px)" />
        </svg>
        <svg className="w-1/2 h-full shrink-0" viewBox="0 0 1600 380" preserveAspectRatio="none">
          <circle cx="280" cy="220" r="160" fill="rgba(255,255,255,0.72)" filter="blur(18px)" />
          <circle cx="560" cy="180" r="190" fill="rgba(255,255,255,0.78)" filter="blur(22px)" />
          <circle cx="920" cy="210" r="170" fill="rgba(255,255,255,0.7)" filter="blur(20px)" />
          <circle cx="1280" cy="190" r="200" fill="rgba(255,255,255,0.8)" filter="blur(24px)" />
          <circle cx="1520" cy="240" r="150" fill="rgba(255,255,255,0.65)" filter="blur(16px)" />
        </svg>
      </div>

      {/* Tier 3: Foreground Atmospheric Cloud Mist (Soft Bottom Cushion) */}
      <div className="absolute -bottom-8 left-0 right-0 h-44 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

      {/* =====================================================================
          4. FLOATING GOLDEN AMBIENT SPARKLES & STARS
         ===================================================================== */}
      {sparkles.map((sp) => (
        <motion.div
          key={sp.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sp.x}%`,
            top: `${sp.y}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.35, 0.95, 0.35],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: sp.duration,
            delay: sp.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {sp.isStar ? (
            /* 4-point golden sparkle star */
            <svg
              width={sp.size * 2.2}
              height={sp.size * 2.2}
              viewBox="0 0 24 24"
              fill="#F59E0B"
              className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
            >
              <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
            </svg>
          ) : (
            /* Soft golden circular pollen glow */
            <div
              className="rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]"
              style={{
                width: `${sp.size}px`,
                height: `${sp.size}px`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
