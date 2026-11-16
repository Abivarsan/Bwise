import React from 'react';

interface CyberBeeWireframeProps {
  className?: string;
  /** Banking tilt angle in degrees based on horizontal velocity / target */
  tiltDeg?: number;
  /** Whether the bee is actively hovering/building a node in the hive */
  isBuilding?: boolean;
}

/**
 * Interactive Cyber-Bee: A cybernetic, wireframe bee composed of glowing golden-amber
 * particle threads, holographic veined wings, and segmented wireframe rings.
 */
export const CyberBeeWireframe: React.FC<CyberBeeWireframeProps> = ({
  className = 'w-48 h-48',
  tiltDeg = 0,
  isBuilding = false,
}) => {
  // Deterministic particle coordinates along the head, thorax, and abdomen for the particle-thread look
  const bodyParticles = [
    // Head cluster
    { cx: 92, cy: 112, r: 1.8, delay: '0s' },
    { cx: 98, cy: 105, r: 1.4, delay: '0.2s' },
    { cx: 105, cy: 116, r: 2.0, delay: '0.4s' },
    { cx: 88, cy: 122, r: 1.5, delay: '0.1s' },
    { cx: 101, cy: 126, r: 1.6, delay: '0.5s' },
    // Thorax golden core
    { cx: 124, cy: 116, r: 2.2, delay: '0.15s' },
    { cx: 132, cy: 108, r: 1.9, delay: '0.35s' },
    { cx: 138, cy: 122, r: 2.4, delay: '0.05s' },
    { cx: 120, cy: 128, r: 1.7, delay: '0.45s' },
    { cx: 145, cy: 114, r: 2.0, delay: '0.25s' },
    { cx: 130, cy: 132, r: 1.8, delay: '0.6s' },
    // Abdomen glowing rings
    { cx: 162, cy: 126, r: 2.3, delay: '0.1s' },
    { cx: 170, cy: 118, r: 1.9, delay: '0.3s' },
    { cx: 176, cy: 134, r: 2.2, delay: '0.5s' },
    { cx: 156, cy: 138, r: 1.8, delay: '0.2s' },
    { cx: 186, cy: 128, r: 2.0, delay: '0.4s' },
    { cx: 192, cy: 140, r: 2.1, delay: '0.15s' },
    { cx: 172, cy: 146, r: 1.7, delay: '0.35s' },
    { cx: 202, cy: 136, r: 1.9, delay: '0.55s' },
    { cx: 208, cy: 148, r: 1.6, delay: '0.25s' },
    { cx: 184, cy: 152, r: 1.8, delay: '0.45s' },
    // Ambient floating spark dust around bee
    { cx: 68, cy: 96, r: 1.3, delay: '0.1s' },
    { cx: 74, cy: 142, r: 1.5, delay: '0.4s' },
    { cx: 112, cy: 158, r: 1.2, delay: '0.2s' },
    { cx: 152, cy: 168, r: 1.6, delay: '0.5s' },
    { cx: 222, cy: 132, r: 1.4, delay: '0.3s' },
    { cx: 216, cy: 162, r: 1.2, delay: '0.6s' },
    { cx: 148, cy: 86, r: 1.4, delay: '0.25s' },
  ];

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        transform: `rotate(${tiltDeg}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Ambient Golden Cyber-Aura */}
      <div
        className={`absolute inset-4 rounded-full bg-amber-500/25 blur-2xl transition-opacity duration-300 ${
          isBuilding ? 'opacity-95 scale-110' : 'opacity-65'
        }`}
      />

      {/* Active Node Construction Laser / Particle Thread Beam when hovering a hive cell */}
      {isBuilding && (
        <svg
          viewBox="0 0 260 240"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <linearGradient id="cyberBuildBeam" x1="40%" y1="55%" x2="10%" y2="98%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="105"
            y1="138"
            x2="32"
            y2="215"
            stroke="url(#cyberBuildBeam)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <line
            x1="125"
            y1="145"
            x2="42"
            y2="220"
            stroke="url(#cyberBuildBeam)"
            strokeWidth="1.5"
            strokeDasharray="2 5"
          />
          <circle cx="36" cy="218" r="5" fill="#FBBF24" opacity="0.75" className="animate-ping" />
        </svg>
      )}

      <svg
        viewBox="0 0 260 220"
        className="w-full h-full overflow-visible drop-shadow-[0_0_18px_rgba(245,158,11,0.55)]"
      >
        <defs>
          {/* Glowing Golden Wireframe Gradient */}
          <linearGradient id="cyberGoldWire" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Translucent Cyber-Wing Membrane Gradient */}
          <linearGradient id="cyberWingMembrane" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.42" />
            <stop offset="45%" stopColor="#BAE6FD" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.08" />
          </linearGradient>

          {/* Core Internal Glow */}
          <radialGradient id="cyberCoreGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
          </radialGradient>

          <filter id="cyberGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================
            1. BACK HOLOGRAPHIC WING (Upper Left Wing in Perspective)
           ============================================================ */}
        <g
          className="origin-[132px_104px] animate-wing-left"
          style={{ animationDuration: isBuilding ? '0.04s' : '0.07s' }}
        >
          <path
            d="M 132 104 C 126 62, 136 22, 154 14 C 170 8, 174 38, 162 72 C 154 90, 142 100, 132 104 Z"
            fill="url(#cyberWingMembrane)"
            stroke="#FDE68A"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />
          {/* Wing Cellular Wireframe Veins */}
          <path
            d="M 136 96 C 142 68, 148 40, 155 18 M 145 58 L 164 46 M 141 75 L 160 68 M 148 38 L 135 45"
            stroke="#FEF08A"
            strokeWidth="0.75"
            strokeOpacity="0.65"
            fill="none"
          />
        </g>

        {/* ============================================================
            2. FOREGROUND HOLOGRAPHIC WING (Right Swept Wing in Perspective)
           ============================================================ */}
        <g
          className="origin-[142px_106px] animate-wing-right"
          style={{ animationDuration: isBuilding ? '0.04s' : '0.07s' }}
        >
          <path
            d="M 140 106 C 168 72, 212 44, 236 46 C 248 48, 236 74, 204 94 C 182 106, 158 108, 140 106 Z"
            fill="url(#cyberWingMembrane)"
            stroke="#FDE68A"
            strokeWidth="1.3"
            strokeOpacity="0.9"
          />
          {/* Secondary Lower Hindwing Lobe */}
          <path
            d="M 146 108 C 172 96, 202 88, 214 96 C 220 102, 198 114, 174 114 C 160 114, 150 110, 146 108 Z"
            fill="url(#cyberWingMembrane)"
            stroke="#FBBF24"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
          {/* Detailed Polygon Wing Veins */}
          <path
            d="M 145 104 C 178 82, 208 62, 234 48 M 176 82 L 194 64 M 192 73 L 214 74 M 166 90 L 188 94 M 178 96 L 198 104"
            stroke="#FEF08A"
            strokeWidth="0.8"
            strokeOpacity="0.75"
            fill="none"
          />
        </g>

        {/* ============================================================
            3. ARTICULATED CYBERNETIC WIREFRAME LEGS
           ============================================================ */}
        <g stroke="url(#cyberGoldWire)" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Front Left Leg */}
          <path d="M 104 132 L 92 152 L 84 172 L 78 178" strokeWidth="1.8" />
          <circle cx="92" cy="152" r="2.2" fill="#FDE68A" />
          <circle cx="84" cy="172" r="1.8" fill="#FBBF24" />

          {/* Middle Leg */}
          <path d="M 128 138 L 122 162 L 118 186 L 114 194" strokeWidth="2" />
          <circle cx="122" cy="162" r="2.4" fill="#FDE68A" />
          <circle cx="118" cy="186" r="2" fill="#FBBF24" />

          {/* Rear Hind Leg */}
          <path d="M 154 142 L 162 168 L 172 190 L 178 196" strokeWidth="2" />
          <circle cx="162" cy="168" r="2.4" fill="#FDE68A" />
          <circle cx="172" cy="190" r="2" fill="#FBBF24" />
        </g>

        {/* ============================================================
            4. SEGMENTED 3D WIREFRAME & PARTICLE-THREAD BODY
           ============================================================ */}
        {/* Internal Golden Energy Core */}
        <ellipse cx="132" cy="120" rx="26" ry="20" fill="url(#cyberCoreGlow)" />
        <ellipse cx="178" cy="136" rx="38" ry="24" transform="rotate(18 178 136)" fill="url(#cyberCoreGlow)" />

        {/* ABDOMEN: Cybernetic Striped Rib-Rings & Mesh Threads */}
        <g transform="rotate(18 178 136)">
          {/* Outer Abdomen Silhouette Wire */}
          <ellipse
            cx="178"
            cy="136"
            rx="34"
            ry="20"
            fill="rgba(20, 16, 12, 0.55)"
            stroke="url(#cyberGoldWire)"
            strokeWidth="1.6"
          />
          {/* Glowing Golden Stripe Ribs */}
          <ellipse cx="156" cy="136" rx="7" ry="16" fill="none" stroke="#FBBF24" strokeWidth="2.2" />
          <ellipse cx="168" cy="136" rx="8" ry="19" fill="none" stroke="#FEF08A" strokeWidth="2.6" filter="url(#cyberGlowFilter)" />
          <ellipse cx="180" cy="136" rx="8" ry="19.5" fill="none" stroke="#F59E0B" strokeWidth="2.4" />
          <ellipse cx="192" cy="136" rx="7" ry="17" fill="none" stroke="#FEF08A" strokeWidth="2.4" filter="url(#cyberGlowFilter)" />
          <ellipse cx="203" cy="136" rx="5" ry="12" fill="none" stroke="#FBBF24" strokeWidth="1.8" />
          {/* Longitudinal Geodesic Wireframe Threads */}
          <path
            d="M 144 136 Q 178 122 212 136 M 144 136 Q 178 150 212 136 M 146 128 Q 178 136 210 128 M 146 144 Q 178 136 210 144"
            stroke="#FDE68A"
            strokeWidth="0.85"
            strokeOpacity="0.7"
            fill="none"
          />
        </g>

        {/* THORAX: Geodesic Golden Node Core */}
        <g>
          <ellipse
            cx="130"
            cy="120"
            rx="22"
            ry="18"
            transform="rotate(8 130 120)"
            fill="rgba(28, 22, 14, 0.65)"
            stroke="url(#cyberGoldWire)"
            strokeWidth="1.8"
          />
          {/* Geodesic Triangles inside Thorax */}
          <path
            d="M 112 116 L 128 104 L 146 114 L 142 132 L 124 136 L 112 116 Z M 128 104 L 132 122 L 146 114 M 112 116 L 132 122 L 124 136 M 132 122 L 142 132"
            stroke="#FEF08A"
            strokeWidth="1.1"
            strokeOpacity="0.8"
            fill="none"
          />
        </g>

        {/* HEAD & COMPOUND CYBER-EYES */}
        <g>
          <circle
            cx="96"
            cy="118"
            r="15"
            fill="rgba(24, 19, 14, 0.78)"
            stroke="url(#cyberGoldWire)"
            strokeWidth="1.7"
          />
          {/* Glowing Compound Eye Facets */}
          <ellipse
            cx="92"
            cy="115"
            rx="6.5"
            ry="8.5"
            transform="rotate(-12 92 115)"
            fill="rgba(251, 191, 36, 0.28)"
            stroke="#FEF08A"
            strokeWidth="1.4"
          />
          {/* Cross-hatch wireframe on eye */}
          <path
            d="M 88 111 L 96 119 M 88 118 L 96 112 M 92 108 L 92 122"
            stroke="#FEF08A"
            strokeWidth="0.7"
            strokeOpacity="0.8"
          />
          {/* Cyber Antennae with Glowing Node Tips */}
          <path
            d="M 86 106 C 78 92, 68 88, 60 90"
            stroke="#FDE68A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="60" cy="90" r="2.5" fill="#FEF08A" filter="url(#cyberGlowFilter)" />

          <path
            d="M 94 103 C 90 88, 82 80, 74 78"
            stroke="#FDE68A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="74" cy="78" r="2.5" fill="#FEF08A" filter="url(#cyberGlowFilter)" />
        </g>

        {/* ============================================================
            5. GLOWING PARTICLE THREAD NODES
           ============================================================ */}
        {bodyParticles.map((p, idx) => (
          <circle
            key={idx}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#FEF08A"
            filter="url(#cyberGlowFilter)"
            className="animate-pulse"
            style={{ animationDelay: p.delay }}
          />
        ))}
      </svg>
    </div>
  );
};
