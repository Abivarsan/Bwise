import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EASE } from '../motion/ScrollReveal';
import { soundFX } from '../../utils/soundEffects';

const FluidFluxWebGL = lazy(() =>
  import('./FluidFluxWebGL').then((m) => ({ default: m.FluidFluxWebGL }))
);

const AMBIENT_SPARKS = [
  { left: '3%', top: '20%', size: 2.5, delay: '0s', opacity: 0.6 },
  { left: '5%', top: '65%', size: 2, delay: '1.2s', opacity: 0.45 },
  { left: '95%', top: '24%', size: 3, delay: '0.5s', opacity: 0.7 },
  { left: '96.5%', top: '72%', size: 2.5, delay: '1.6s', opacity: 0.55 },
  { left: '48%', top: '12%', size: 2, delay: '0.8s', opacity: 0.45 },
];

export const FluidIntelligenceHero: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreTech = () => {
    soundFX.playClickChime(587.33);
    const el = document.getElementById('core-capabilities');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/services?category=software-solutions#software-solutions');
    }
  };

  return (
    <section className="relative w-full overflow-hidden pt-24 sm:pt-28 lg:pt-30 pb-8 lg:pb-12">
      {/* Delicate Tech Grid Overlay + Corner Amber & Deep Navy Lighting */}
      <div className="absolute inset-0 cyber-grid-overlay opacity-60 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 52% 58% at 72% 48%, rgba(245,158,11,0.16) 0%, rgba(30,58,138,0.14) 44%, transparent 72%)',
        }}
      />

      {/* Ambient Floating Amber Particles */}
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
              boxShadow: '0 0 10px rgba(251, 191, 36, 0.85)',
            }}
          />
        ))}
      </div>

      {/* =====================================================================
          MAIN 2-COLUMN HERO STAGE
         ===================================================================== */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
        {/* -----------------------------------------------------------------
            LEFT COLUMN: HIGH-CONTRAST TYPOGRAPHY, PILL CTAs & TECH LINE
           ----------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:col-span-5 space-y-5 sm:space-y-6 text-left"
        >
          {/* Uppercase Golden Tech Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-300/95 text-[10px] sm:text-[11px] font-tech font-semibold uppercase tracking-[0.2em]">
            <span>NEXT-GEN CREATIVE &amp; ENGINEERING</span>
          </div>

          {/* Extremely Bold High-Contrast Modern Sans-Serif Headline */}
          <h1 className="font-extrabold uppercase tracking-[-0.02em] leading-[1.02] text-[40px] sm:text-[54px] xl:text-[64px]">
            <span className="block text-white">SHAPING</span>
            <span className="block text-white">DIGITAL</span>
            <span className="block bg-gradient-to-r from-[#EA8C1E] via-[#FBBF24] to-[#FEF08A] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(245,158,11,0.42)]">
              INTELLIGENCE.
            </span>
          </h1>

          {/* Medium-Gray Supportive Subtext */}
          <p className="text-sm sm:text-[15.5px] text-slate-400 leading-relaxed max-w-[460px]">
            We engineer fluid digital experiences, bespoke software, and high-impact marketing to
            scale your vision. Designed with precision, driven by code.
          </p>

          {/* Pill Call-to-Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={() => {
                soundFX.playClickChime(659.25);
                navigate('/portfolio');
              }}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#FDE047] hover:brightness-105 text-[#090D18] font-tech font-bold text-sm shadow-[0_0_28px_rgba(245,158,11,0.48),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span>View Showcase</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleExploreTech}
              className="px-6 sm:px-7 py-3 rounded-full bg-[#0C1220]/75 hover:bg-amber-500/10 text-slate-100 font-tech font-medium text-sm border border-amber-400/65 hover:border-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.14)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Explore Our Tech Stack
            </button>
          </div>

          {/* Tech Stack Indicator */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400 font-tech">
            <span className="text-slate-500">Powered by</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <span>React</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <svg className="w-3.5 h-3.5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z" />
              </svg>
              <span>Tailwind</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.4" />
                <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)" />
              </svg>
              <span>Three.js</span>
            </span>
          </div>
        </motion.div>

        {/* -----------------------------------------------------------------
            RIGHT COLUMN: 3D INTERACTIVE WEBGL FLUID FLUX + MICRO-HUD OVERLAYS
           ----------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          className="lg:col-span-7 relative flex flex-col items-center justify-center"
        >
          <div className="relative w-full h-[340px] sm:h-[460px] lg:h-[520px] xl:h-[550px] flex items-center justify-center">
            {/* Micro-HUD Technical Dotted Tracking Lines & Brackets (sm+) */}
            <svg
              className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none z-[8]"
              viewBox="0 0 720 520"
              fill="none"
              aria-hidden="true"
            >
              {/* Top-left FLOW // ACTIVE leader line */}
              <line x1="115" y1="68" x2="215" y2="68" stroke="rgba(148,163,184,0.28)" strokeWidth="1" strokeDasharray="2 4" />
              <circle cx="218" cy="68" r="2.5" fill="#FBBF24" />

              {/* Upper-left WebGL Shaders pointer */}
              <polyline points="172,118 225,118 258,154" stroke="rgba(251,191,36,0.42)" strokeWidth="1" strokeDasharray="2 4" />
              <circle cx="258" cy="154" r="3" fill="#FBBF24" />
              <circle cx="110" cy="108" r="3" fill="#F59E0B" opacity="0.85" />

              {/* Left vertical technical scale line */}
              <line x1="42" y1="130" x2="42" y2="395" stroke="rgba(148,163,184,0.16)" strokeWidth="1" strokeDasharray="3 6" />
              <circle cx="42" cy="215" r="3" fill="#E2E8F0" opacity="0.7" />
              <circle cx="42" cy="285" r="2" fill="#F59E0B" opacity="0.8" />

              {/* Right vertical tick & Dynamic Physics pointer */}
              <line x1="678" y1="150" x2="678" y2="380" stroke="rgba(148,163,184,0.16)" strokeWidth="1" strokeDasharray="3 6" />
              <line x1="678" y1="295" x2="678" y2="335" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
              <polyline points="548,370 492,370 456,336" stroke="rgba(251,191,36,0.42)" strokeWidth="1" strokeDasharray="2 4" />
              <circle cx="456" cy="336" r="3" fill="#FBBF24" />

              {/* Bottom-right DATA // INTEGRITY tracking curve & spectrum baseline */}
              <polyline points="518,430 462,430 412,388" stroke="rgba(251,191,36,0.36)" strokeWidth="1" strokeDasharray="2 4" />
              <circle cx="412" cy="388" r="2.5" fill="#FBBF24" />
            </svg>

            {/* Real-Time Three.js GLSL WebGL Fluid Ribbons & 4,200 GPU Particles */}
            <Suspense
              fallback={
                <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.25)_0%,rgba(30,58,138,0.22)_50%,transparent_72%)] blur-lg animate-pulse" />
              }
            >
              <FluidFluxWebGL className="w-full h-full z-[5]" />
            </Suspense>

            {/* Micro-HUD Digital Labels (sm+ desktop/tablet) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="hidden sm:inline-flex absolute top-[10%] left-[4%] z-10 items-center gap-2 px-3 py-1 rounded-md bg-[#0B101D]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-[0.14em] text-slate-300 pointer-events-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] animate-cyber-dot" />
              <span>FLOW // ACTIVE</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
              className="hidden sm:inline-flex absolute top-[19%] left-[12%] z-10 items-center gap-2 px-3 py-1.5 rounded-md glass-hud-pill border border-white/12 text-[11px] font-tech text-slate-200 pointer-events-none"
            >
              <span>WebGL Shaders</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54, ease: EASE }}
              className="hidden sm:inline-flex absolute bottom-[26%] right-[4%] z-10 items-center gap-2 px-3 py-1.5 rounded-md glass-hud-pill border border-white/12 text-[11px] font-tech text-slate-200 pointer-events-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
              <span>Dynamic Physics</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.66, ease: EASE }}
              className="hidden sm:flex flex-col gap-1.5 absolute bottom-[8%] right-[3%] z-10 px-3 py-2 rounded-lg bg-[#0B101D]/85 backdrop-blur-md border border-white/10 pointer-events-none"
            >
              <div className="flex items-center justify-between gap-4 text-[10px] font-mono tracking-[0.12em] text-slate-300">
                <span>DATA // INTEGRITY</span>
                <span className="text-amber-400">99.9%</span>
              </div>
              {/* Micro signal spectrum bars matching reference bottom-right HUD */}
              <div className="flex items-end gap-[3px] h-3.5">
                {[35, 58, 42, 85, 64, 95, 52, 76, 48, 88, 62, 40, 72, 90, 50].map((h, i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-amber-600/60 to-amber-300/90"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Responsive Mobile Micro-HUD Strip (< sm) */}
          <div className="grid grid-cols-2 gap-2 w-full sm:hidden mt-1">
            {['FLOW // ACTIVE', 'WebGL Shaders', 'Dynamic Physics', 'DATA // INTEGRITY'].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-2 rounded-lg glass-hud-pill border border-white/10 text-[10px] font-mono tracking-wider text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] shrink-0" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
