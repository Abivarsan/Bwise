import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE } from '../motion/ScrollReveal';
import { soundFX } from '../../utils/soundEffects';

const HiveSphereWebGL = lazy(() =>
  import('./HiveSphereWebGL').then((m) => ({ default: m.HiveSphereWebGL }))
);

const AMBIENT_SPARKS = [
  { left: '2.5%', top: '18%', size: 3, delay: '0s', opacity: 0.7 },
  { left: '4%', top: '34%', size: 2, delay: '1.1s', opacity: 0.5 },
  { left: '1.8%', top: '58%', size: 3.5, delay: '0.6s', opacity: 0.8 },
  { left: '5%', top: '76%', size: 2, delay: '1.8s', opacity: 0.55 },
  { left: '3%', top: '89%', size: 2.5, delay: '0.3s', opacity: 0.65 },
  { left: '96.5%', top: '16%', size: 2.5, delay: '0.8s', opacity: 0.65 },
  { left: '95%', top: '38%', size: 3.5, delay: '0.2s', opacity: 0.8 },
  { left: '97.5%', top: '62%', size: 2, delay: '1.5s', opacity: 0.55 },
  { left: '95.8%', top: '81%', size: 3, delay: '0.9s', opacity: 0.75 },
  { left: '98%', top: '91%', size: 2, delay: '1.9s', opacity: 0.5 },
];

export const IntelligentHiveHero: React.FC = () => {
  const navigate = useNavigate();

  const handleLaunchHive = () => {
    soundFX.playClickChime(659.25);
    const el = document.getElementById('digital-ecosystem');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/services?category=software-solutions#software-solutions');
    }
  };

  return (
    <section className="relative w-full overflow-hidden pt-24 sm:pt-28 lg:pt-30 pb-10 lg:pb-14">
      {/* Subtle Digital Tech Grid + Wireframe Background Accents */}
      <div className="absolute inset-0 cyber-grid-overlay opacity-70 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 72% 48%, rgba(245,158,11,0.16) 0%, rgba(234,88,12,0.04) 34%, transparent 62%)',
        }}
      />

      {/* Ambient Golden Margin Sparks */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none" aria-hidden="true">
        {AMBIENT_SPARKS.map((sp, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-amber-400 animate-cyber-dot"
            style={{
              left: sp.left,
              top: sp.top,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              opacity: sp.opacity,
              animationDelay: sp.delay,
              boxShadow: '0 0 10px rgba(251, 191, 36, 0.9)',
            }}
          />
        ))}
      </div>

      {/* Subtle Edge Scroll Indicators scoped inside the dark hero section only */}
      <div
        className="hidden xl:flex absolute left-3.5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2 pointer-events-none opacity-65"
        aria-hidden="true"
      >
        <span className="w-[3px] h-9 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.45)]" />
      </div>
      <div
        className="hidden xl:flex absolute right-3.5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2 pointer-events-none opacity-65"
        aria-hidden="true"
      >
        <span className="w-[3px] h-9 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.45)]" />
      </div>

      {/* =====================================================================
          MAIN 2-COLUMN HERO STAGE
         ===================================================================== */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        {/* -----------------------------------------------------------------
            LEFT COLUMN: CYBERNETIC HEADLINE, SUBTEXT & CTAs
           ----------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:col-span-5 xl:col-span-5 space-y-5 sm:space-y-6 text-left"
        >
          {/* Wide Geometric Cyber Headline */}
          <h1 className="font-cyber font-extrabold uppercase tracking-[0.03em] leading-[1.08] text-[30px] xs:text-[36px] sm:text-[44px] xl:text-[50px]">
            <span className="block text-white drop-shadow-[0_2px_16px_rgba(255,255,255,0.12)]">
              BUILT WISE.
            </span>
            <span className="block mt-1 bg-gradient-to-r from-[#FFE8A3] via-[#FBBF24] to-[#EA580C] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(245,158,11,0.42)]">
              DRIVEN BY
            </span>
            <span className="block bg-gradient-to-r from-[#FFE082] via-[#F59E0B] to-[#EA580C] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(245,158,11,0.42)]">
              INTELLIGENCE.
            </span>
          </h1>

          {/* Supportive Subtext */}
          <p className="text-sm sm:text-[15.5px] text-slate-400 leading-relaxed max-w-[470px]">
            We engineer high-performance software, custom digital marketing, and immersive web
            solutions. Made to scale, designed to impact.
          </p>

          {/* Primary & Ghost Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={handleLaunchHive}
              className="px-6 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#EA580C] hover:brightness-110 text-[#090D18] font-tech font-bold text-sm shadow-[0_0_28px_rgba(245,158,11,0.48),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              Launch the Hive
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClickChime(523.25);
                navigate('/portfolio');
              }}
              className="px-6 sm:px-7 py-3 rounded-xl bg-[#0D1322]/75 hover:bg-amber-500/10 text-slate-100 font-tech font-semibold text-sm border border-amber-500/65 hover:border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.12)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Explore Case Studies
            </button>
          </div>
        </motion.div>

        {/* -----------------------------------------------------------------
            RIGHT COLUMN: INTERACTIVE 3D WEBGL HONEYCOMB SPHERE
           ----------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
          className="lg:col-span-7 xl:col-span-7 relative flex flex-col items-center justify-center"
        >
          {/* Main 3D Stage */}
          <div className="relative w-full h-[340px] sm:h-[440px] lg:h-[500px] xl:h-[540px] flex items-center justify-center">
            {/* Faint Technical Orbital Compass Rings (Desktop/Tablet) */}
            <svg
              className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none z-[2]"
              viewBox="0 0 700 520"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="350"
                cy="260"
                r="225"
                stroke="rgba(148, 163, 184, 0.12)"
                strokeWidth="1"
              />
              <circle
                cx="350"
                cy="260"
                r="242"
                stroke="rgba(245, 158, 11, 0.10)"
                strokeWidth="1"
                strokeDasharray="3 8"
              />
            </svg>

            {/* Three.js WebGL Interactive Honeycomb Sphere */}
            <Suspense
              fallback={
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-amber-400/30 bg-[radial-gradient(circle,rgba(245,158,11,0.22)_0%,transparent_70%)] animate-pulse" />
              }
            >
              <HiveSphereWebGL className="w-full h-full z-[5]" />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
