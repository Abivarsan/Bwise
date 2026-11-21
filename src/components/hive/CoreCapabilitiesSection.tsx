import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Reveal, StaggerGroup, StaggerItem } from '../motion/ScrollReveal';
import { soundFX } from '../../utils/soundEffects';

/** Card 1: Glowing golden organic 3D wireframe mesh icon */
const DesignFrameworkIcon: React.FC = () => (
  <svg
    className="w-12 h-12 drop-shadow-[0_0_14px_rgba(245,158,11,0.55)]"
    viewBox="0 0 56 56"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="meshGold" x1="6" y1="8" x2="50" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="55%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    {/* Organic twisted wireframe surface */}
    <path
      d="M12 20 C16 9, 32 10, 42 18 C50 25, 45 42, 34 45 C22 48, 8 33, 12 20 Z"
      stroke="url(#meshGold)"
      strokeWidth="1.4"
      fill="rgba(245,158,11,0.08)"
    />
    <path d="M13 24 C22 18, 34 19, 44 25" stroke="url(#meshGold)" strokeWidth="0.9" opacity="0.85" />
    <path d="M14 30 C23 25, 34 27, 43 33" stroke="url(#meshGold)" strokeWidth="0.9" opacity="0.85" />
    <path d="M18 36 C25 32, 33 34, 40 39" stroke="url(#meshGold)" strokeWidth="0.9" opacity="0.75" />
    <path d="M21 13 C18 22, 20 35, 25 45" stroke="url(#meshGold)" strokeWidth="0.9" opacity="0.8" />
    <path d="M29 12 C27 23, 29 35, 34 44" stroke="url(#meshGold)" strokeWidth="0.9" opacity="0.8" />
    <path d="M37 15 C36 25, 37 34, 40 41" stroke="url(#meshGold)" strokeWidth="0.9" opacity="0.75" />
    {/* Glowing junction dots */}
    <circle cx="29" cy="24" r="1.8" fill="#FEF08A" />
    <circle cx="21" cy="30" r="1.5" fill="#FBBF24" />
    <circle cx="37" cy="31" r="1.5" fill="#FBBF24" />
  </svg>
);

/** Card 2: Glowing golden isometric 3D wireframe cube-structure icon */
const BackendCubeIcon: React.FC = () => (
  <svg
    className="w-12 h-12 drop-shadow-[0_0_14px_rgba(245,158,11,0.55)]"
    viewBox="0 0 56 56"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="cubeGold" x1="10" y1="8" x2="46" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="55%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* Outer isometric cube */}
    <polygon
      points="28,8 46,18 46,38 28,48 10,38 10,18"
      stroke="url(#cubeGold)"
      strokeWidth="1.5"
      fill="rgba(245,158,11,0.08)"
    />
    <polyline points="10,18 28,28 46,18" stroke="url(#cubeGold)" strokeWidth="1.3" />
    <line x1="28" y1="28" x2="28" y2="48" stroke="url(#cubeGold)" strokeWidth="1.3" />
    {/* Internal 3x3 lattice subdivisions */}
    <polyline points="16,14.6 34,24.6 34,44.6" stroke="url(#cubeGold)" strokeWidth="0.85" opacity="0.75" />
    <polyline points="22,11.3 40,21.3 40,41.3" stroke="url(#cubeGold)" strokeWidth="0.85" opacity="0.75" />
    <polyline points="40,14.6 22,24.6 22,44.6" stroke="url(#cubeGold)" strokeWidth="0.85" opacity="0.75" />
    <polyline points="34,11.3 16,21.3 16,41.3" stroke="url(#cubeGold)" strokeWidth="0.85" opacity="0.75" />
    <polyline points="10,25 28,35 46,25" stroke="url(#cubeGold)" strokeWidth="0.85" opacity="0.75" />
    <polyline points="10,31.5 28,41.5 46,31.5" stroke="url(#cubeGold)" strokeWidth="0.85" opacity="0.75" />
    <circle cx="28" cy="28" r="2" fill="#FEF08A" />
  </svg>
);

/** Card 3: Glowing golden organic particle/leaf growth wireframe icon */
const GrowthLeafIcon: React.FC = () => (
  <svg
    className="w-12 h-12 drop-shadow-[0_0_14px_rgba(245,158,11,0.55)]"
    viewBox="0 0 56 56"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="leafGold" x1="10" y1="10" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="55%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    {/* Rising organic twin wings/leaves */}
    <path
      d="M28 45 C16 40, 10 29, 12 18 C21 19, 27 26, 28 36"
      stroke="url(#leafGold)"
      strokeWidth="1.5"
      fill="rgba(245,158,11,0.10)"
    />
    <path
      d="M28 45 C40 40, 46 29, 44 18 C35 19, 29 26, 28 36"
      stroke="url(#leafGold)"
      strokeWidth="1.5"
      fill="rgba(245,158,11,0.10)"
    />
    {/* Inner wireframe veins */}
    <path d="M28 42 C20 35, 16 28, 15 21" stroke="url(#leafGold)" strokeWidth="0.9" opacity="0.8" />
    <path d="M28 42 C36 35, 40 28, 41 21" stroke="url(#leafGold)" strokeWidth="0.9" opacity="0.8" />
    {/* Ascending central golden particle sprout */}
    <circle cx="28" cy="14" r="3.2" stroke="url(#leafGold)" strokeWidth="1.3" fill="rgba(254,240,138,0.35)" />
    <circle cx="28" cy="23" r="2" fill="#FBBF24" />
    <circle cx="21" cy="12" r="1.3" fill="#FDE68A" opacity="0.85" />
    <circle cx="35" cy="12" r="1.3" fill="#FDE68A" opacity="0.85" />
    <line x1="28" y1="17.5" x2="28" y2="45" stroke="url(#leafGold)" strokeWidth="1.1" strokeDasharray="2 2" />
  </svg>
);

const CAPABILITY_MODULES = [
  {
    id: 'design',
    code: '01 // UI & SYSTEMS',
    title: 'Digital design framework',
    route: '/services?category=software-solutions#ui-ux-design',
    Icon: DesignFrameworkIcon,
    showMicroUiBars: true,
  },
  {
    id: 'backend',
    code: '02 // ARCHITECTURE',
    title: 'Scalable backend systems',
    route: '/services?category=software-solutions#software-solutions',
    Icon: BackendCubeIcon,
    showMicroUiBars: false,
  },
  {
    id: 'growth',
    code: '03 // GROWTH & AI',
    title: 'Digital growth and automation',
    route: '/services?category=social-media-marketing#social-media-marketing',
    Icon: GrowthLeafIcon,
    showMicroUiBars: false,
  },
];

export const CoreCapabilitiesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="core-capabilities"
      className="relative z-10 w-full pt-4 pb-16 sm:pb-20 scroll-mt-24 overflow-hidden"
    >
      {/* Faint Golden Wireframe Terrain Mesh Accents Sweeping Along Lower Left & Right Edges */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-56 pointer-events-none opacity-45"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="floorMeshGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.65" />
            <stop offset="28%" stopColor="#F59E0B" stopOpacity="0.06" />
            <stop offset="72%" stopColor="#F59E0B" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M0 ${42 + i * 24} Q 260 ${85 + i * 18}, 540 ${135 + i * 12} T 1140 ${110 + i * 14} T 1440 ${38 + i * 24}`}
            stroke="url(#floorMeshGrad)"
            strokeWidth="0.9"
          />
        ))}
      </svg>

      {/* Corner Amber-Gold Light Blooms */}
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-amber-500/18 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-amber-500/18 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Heading Row + Hairline + Micro Tracking Dots */}
        <Reveal className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-tech text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-slate-300 shrink-0">
              OUR CORE CAPABILITIES
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/15 via-white/8 to-transparent" />
          </div>

          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
        </Reveal>

        {/* Three Horizontal Frosted Glassmorphic Capability Modules */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6" stagger={0.1}>
          {CAPABILITY_MODULES.map((mod, idx) => {
            const IconComp = mod.Icon;
            return (
              <StaggerItem key={mod.id} distance={22}>
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClickChime(520 + idx * 60);
                    navigate(mod.route);
                  }}
                  className="group relative w-full text-left rounded-2xl glass-cyber-card border border-white/12 hover:border-amber-400/55 p-5 sm:p-6 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)] cursor-pointer overflow-hidden"
                >
                  {/* Subtle Top Sheen */}
                  <div
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Tiny Amber Tracking Dots in Top-Right Corner */}
                  <div className="absolute top-4 right-4 flex items-center gap-1" aria-hidden="true">
                    <span className="w-1 h-1 rounded-full bg-slate-500" />
                    <span className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
                  </div>

                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Glowing Golden Wireframe Icon Frame */}
                    <div className="w-16 h-16 rounded-xl bg-[#090E1B]/90 border border-amber-400/25 group-hover:border-amber-400/60 flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] group-hover:scale-105 transition-all duration-300">
                      <IconComp />
                    </div>

                    {/* Label & Title */}
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400 group-hover:text-amber-300/90 transition-colors">
                        {mod.code}
                      </p>
                      <h3 className="font-tech text-base sm:text-[17px] font-semibold text-white group-hover:text-amber-200 transition-colors leading-snug mt-1">
                        {mod.title}
                      </h3>
                    </div>

                    {/* Micro UI Equalizer Details on Card One (matching reference) */}
                    {mod.showMicroUiBars && (
                      <div
                        className="hidden sm:flex flex-col gap-1.5 w-14 shrink-0 pt-3 opacity-75 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      >
                        {[
                          { tag: 'UI', pct: '78%', amber: false },
                          { tag: 'UX', pct: '92%', amber: false },
                          { tag: '3D', pct: '64%', amber: true },
                        ].map((row) => (
                          <div key={row.tag} className="flex items-center gap-1.5">
                            <span className="text-[8px] font-mono text-slate-500 w-3">{row.tag}</span>
                            <div className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  row.amber ? 'bg-amber-400' : 'bg-slate-400/70'
                                }`}
                                style={{ width: row.pct }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
};
