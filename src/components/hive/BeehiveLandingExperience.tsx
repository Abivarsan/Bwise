import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Megaphone, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { MAIN_SERVICE_CATEGORIES } from '../../data/servicesData';
import { BwiseBeeCharacter } from './BwiseBeeCharacter';
import { NaturalSkiesSkybox } from './NaturalSkiesSkybox';
import { useConsultationModal } from '../../context/ConsultationModalContext';
import { soundFX } from '../../utils/soundEffects';

export const BeehiveLandingExperience: React.FC = () => {
  const navigate = useNavigate();
  const { openConsultationModal } = useConsultationModal();

  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle 3D mouse parallax across the skybox stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseTilt({ x: nx, y: ny });
  };

  // Interactive Golden Background Particle & Neural Thread Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 56 drifting golden amber particles
    const particles = Array.from({ length: 56 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45 - 0.12,
      r: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.55 + 0.25,
    }));

    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
        ctx.shadowColor = 'rgba(251, 191, 36, 0.7)';
        ctx.shadowBlur = 8;
        ctx.fill();

        // Connect nearby golden particles with faint warm amber threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000) {
            const lineAlpha = (1 - distSq / 10000) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(renderParticles);
    };

    animId = requestAnimationFrame(renderParticles);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCategoryClick = (categorySlug: string, idx: number) => {
    soundFX.playClickChime(520 + idx * 60);
    navigate(`/services?category=${categorySlug}#${categorySlug}`);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 pb-14 select-none"
    >
      {/* ===================================================================
          1. WARM SIGNATURE THEME: NATURAL SKIES SKYBOX & AMBIENT GLOWS
         =================================================================== */}
      <NaturalSkiesSkybox mouseTilt={mouseTilt} />

      {/* Interactive Golden Background Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* ===================================================================
          2. MAIN 2-COLUMN HERO STAGE
             LEFT: HERO HEADLINE & CTAS (WARM LIGHT THEME STYLING)
             RIGHT: 3D GUIDE BEE + CORE DIGITAL SOLUTIONS SPEECH BUBBLE CARD
         =================================================================== */}
      <div className="relative z-10 w-full max-w-[1420px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* -----------------------------------------------------------------
            LEFT COLUMN: "WE ENGINEER DIGITAL BEYOND LIMITS" (PRESERVED)
           ----------------------------------------------------------------- */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Connected Software & Marketing Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-[58px] font-black uppercase tracking-tight leading-[1.06] text-stone-900">
            <span className="block">WE ENGINEER</span>
            <span className="block bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(245,158,11,0.25)]">
              DIGITAL BEYOND
            </span>
            <span className="block">LIMITS</span>
          </h1>

          <p className="text-sm sm:text-base xl:text-[17px] text-stone-700 leading-relaxed max-w-[500px] font-normal">
            High-performance software development and growth-driven digital marketing. We build the
            connected ecosystems your business needs to scale.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => {
                soundFX.playClickChime(659.25);
                openConsultationModal();
              }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-105 text-stone-950 font-extrabold text-sm sm:text-base shadow-[0_12px_28px_rgba(245,158,11,0.35)] ring-1 ring-amber-300/80 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              Start Your Project
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClickChime(523.25);
                navigate('/portfolio');
              }}
              className="px-7 py-3.5 rounded-full bg-white/95 hover:bg-white text-stone-800 font-bold text-sm sm:text-base border border-stone-300/90 shadow-sm transition-all duration-300 hover:border-amber-400 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              View Our Work
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            RIGHT COLUMN: 3D GUIDE BEE + CORE DIGITAL SOLUTIONS CARD
           ----------------------------------------------------------------- */}
        <div className="lg:col-span-7 relative w-full flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3 sm:gap-4 xl:gap-6">
          {/* Animated 3D Bwise Guide Mascot Bee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0 flex items-center justify-center z-20 pointer-events-none -mb-3 sm:mb-0"
          >
            <BwiseBeeCharacter
              className="w-[190px] h-[200px] sm:w-[220px] sm:h-[235px] md:w-[245px] md:h-[260px] xl:w-[280px] xl:h-[295px]"
              flightTiltDeg={0}
              isFlying={false}
            />
          </motion.div>

          {/* Core Digital Solutions Speech Bubble Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[420px] sm:max-w-[440px] xl:max-w-[470px] bg-white rounded-[28px] p-5 sm:p-6 shadow-[0_24px_60px_rgba(26,22,18,0.11)] border border-stone-200/90 z-10"
          >
            {/* Authentic Speech Bubble Tail pointing towards the 3D Guide Bee */}
            <div
              className="hidden sm:block absolute -left-[23px] bottom-8 w-[24px] h-[32px] pointer-events-none z-10"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[-2px_2px_4px_rgba(0,0,0,0.06)]"
              >
                {/* Solid white fill of the triangular tail */}
                <path
                  d="M24 0 C20 10, 12 22, 0 31 L24 31 Z"
                  fill="#FFFFFF"
                />
                <rect x="23" y="0" width="2" height="32" fill="#FFFFFF" />
                {/* Tail borders matching the card border */}
                <path
                  d="M24 0 C20 10, 12 22, 0 31"
                  stroke="#E7E5E4"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M0 31 L24 31"
                  stroke="#E7E5E4"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Card Header: Category Badge + Explore All Link */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Core Digital Solutions
              </span>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClickChime(587.33);
                  navigate('/services');
                }}
                className="text-[11px] font-semibold text-stone-500 hover:text-amber-600 transition flex items-center gap-1 cursor-pointer"
              >
                <span>Explore All Services</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Main Interactive Headline Question */}
            <h2 className="text-xl sm:text-[22px] font-extrabold text-stone-900 leading-snug mb-4">
              What can we help you to build today?
            </h2>

            {/* 3 Main Service Categories - Direct Navigation to Services Page */}
            <div className="flex flex-col gap-2.5">
              {MAIN_SERVICE_CATEGORIES.map((category, idx) => {
                const isHovered = hoveredCategorySlug === category.slug;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryClick(category.slug, idx)}
                    onMouseEnter={() => {
                      setHoveredCategorySlug(category.slug);
                      soundFX.playClickChime(480 + idx * 45);
                    }}
                    onMouseLeave={() => setHoveredCategorySlug(null)}
                    className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? 'border-amber-500 bg-amber-50/95 shadow-[0_10px_25px_rgba(245,158,11,0.18)] -translate-y-0.5'
                        : 'border-stone-200/90 bg-stone-50/70 hover:border-amber-400 hover:bg-amber-50/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        {category.slug === 'software-solutions' && <Cpu className="w-5 h-5" />}
                        {category.slug === 'social-media-marketing' && <Megaphone className="w-5 h-5" />}
                        {category.slug === 'digital-strategy-ideas' && <Lightbulb className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-extrabold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
                          {category.title}
                        </h3>
                        <p className="text-[11px] text-stone-500 truncate mt-0.5">
                          {category.slug === 'software-solutions' &&
                            'Web • Mobile • UI/UX • QA Testing • SEO • GEO • AIO'}
                          {category.slug === 'social-media-marketing' &&
                            'Advertising • Management • Content Marketing'}
                          {category.slug === 'digital-strategy-ideas' &&
                            'Brand Management • Logo Design • Digital Analytics'}
                        </p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-amber-500 text-stone-400 group-hover:text-white flex items-center justify-center shrink-0 ml-2 transition-all">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
