import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Sparkles, Cpu, Megaphone, Lightbulb, ArrowRight } from 'lucide-react';
import { MAIN_SERVICE_CATEGORIES } from '../../data/servicesData';
import { BwiseBeeCharacter } from './BwiseBeeCharacter';
import { HoneycombGrid3D } from './HoneycombGrid3D';
import { NaturalSkiesSkybox } from './NaturalSkiesSkybox';
import { soundFX } from '../../utils/soundEffects';

// S1 resting coordinates for the 3D Guide Bee (positioned matching Reference/S1.jpg)
// Bee sits comfortably on the left, gesturing towards the speech bubble with zero card overlap
const S1_BEE_REST_X = 11.5;
const S1_BEE_REST_Y = 39;
const S1_BEE_START_X = -16;

export const BeehiveLandingExperience: React.FC = () => {
  const navigate = useNavigate();

  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isGuideVisible, setIsGuideVisible] = useState<boolean>(false);

  // Bee position state (% of stage container) animated smoothly by GSAP
  // Starts off-screen to the left on first visit for the entrance flight
  const [beePos, setBeePos] = useState<{ x: number; y: number; scale: number; tilt: number; isFlying: boolean }>({
    x: S1_BEE_START_X,
    y: S1_BEE_REST_Y,
    scale: 1,
    tilt: 10,
    isFlying: true,
  });

  const beeProxyRef = useRef({ x: S1_BEE_START_X, y: S1_BEE_REST_Y, scale: 1, tilt: 10 });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Subtle 3D mouse parallax across the studio stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseTilt({ x: nx, y: ny });
  };

  // Coordinated landing page entrance choreography matching Reference/S1.jpg:
  // 1. Bee flies smoothly in from the left
  // 2. 3D HoneycombGrid enters from the right
  // 3. Once bee reaches final position, speech bubble card emerges with the 3 main core solutions
  useEffect(() => {
    const entranceTl = gsap.timeline({
      delay: 0.15,
    });
    timelineRef.current = entranceTl;

    soundFX.playBeeFlightSwoosh(1.1);

    entranceTl.to(beeProxyRef.current, {
      x: S1_BEE_REST_X,
      y: S1_BEE_REST_Y,
      scale: 1,
      tilt: 0,
      duration: 1.1,
      ease: 'power3.out',
      onUpdate: () => {
        setBeePos({
          x: beeProxyRef.current.x,
          y: beeProxyRef.current.y,
          scale: beeProxyRef.current.scale,
          tilt: beeProxyRef.current.tilt,
          isFlying: true,
        });
      },
    });

    entranceTl.call(() => {
      setBeePos((prev) => ({ ...prev, isFlying: false, tilt: 0 }));
      setIsGuideVisible(true);
      soundFX.playClickChime(587.33);
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const handleCategoryClick = (categorySlug: string, idx: number) => {
    soundFX.playClickChime(520 + idx * 60);
    navigate(`/services?category=${categorySlug}#${categorySlug}`);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Natural Skies Skybox */}
      <NaturalSkiesSkybox mouseTilt={mouseTilt} />

      {/* Main Interactive 3D Bee & Honeycomb Stage */}
      <div className="relative flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 pb-10 flex flex-col lg:flex-row items-center justify-between">
        {/* Animated 3D Bwise Guide Bee resting on the left (matching Reference/S1.jpg) */}
        <div
          className="hidden lg:block absolute z-20 pointer-events-none"
          style={{
            left: `${beePos.x}%`,
            top: `${beePos.y}%`,
            transform: `translate(-50%, -50%) scale(${beePos.scale})`,
          }}
        >
          <BwiseBeeCharacter
            className="w-[290px] h-[310px] xl:w-[340px] xl:h-[360px]"
            flightTiltDeg={beePos.tilt}
            isFlying={beePos.isFlying}
          />
        </div>

        {/* Mobile/Tablet Bee Header (visible on smaller viewports) */}
        <div className="lg:hidden flex items-center gap-3 mb-4 w-full max-w-[440px]">
          <BwiseBeeCharacter
            className="w-24 h-24 sm:w-28 sm:h-28 shrink-0"
            flightTiltDeg={beePos.tilt}
            isFlying={beePos.isFlying}
          />
          <div className="bg-white/95 rounded-2xl p-3.5 shadow-md border border-stone-200/80">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-0.5">
              Welcome to the Bwise Hive
            </p>
            <h2 className="text-base font-extrabold text-stone-900">
              What can we help you to build today?
            </h2>
          </div>
        </div>

        {/* Left / Center Interaction Column: Speech Bubble Card */}
        <div className="relative z-30 transition-all duration-500 w-full lg:w-[48%] xl:w-[45%] lg:ml-[25%] xl:ml-[23%] lg:mr-auto flex flex-col items-center lg:items-start justify-start min-h-[420px] lg:-translate-y-16 xl:-translate-y-20">
          <AnimatePresence mode="wait">
            {isGuideVisible && (
              /* S1 Speech Bubble Popup Card with the 3 Main Service Categories (matching Reference/S1.jpg) */
              <motion.div
                key="s1-popup"
                initial={{
                  opacity: 0,
                  scale: 0.18,
                  x: -30,
                  y: 15,
                  transformOrigin: 'bottom left',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  transformOrigin: 'bottom left',
                }}
                exit={{ opacity: 0, y: -14, scale: 0.92 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative w-full max-w-[440px] xl:max-w-[470px] bg-white rounded-[28px] lg:rounded-bl-none p-5 sm:p-6 shadow-[0_24px_60px_rgba(26,22,18,0.11)] border border-stone-200/80"
              >
                {/* Authentic Bottom-Left Speech Bubble Tail (matching Reference S1) */}
                <div
                  className="hidden lg:block absolute -left-[30px] bottom-0 w-[32px] h-[40px] pointer-events-none z-10"
                  aria-hidden="true"
                >
                  <svg
                    width="32"
                    height="40"
                    viewBox="0 0 32 40"
                    fill="none"
                    className="overflow-visible"
                  >
                    {/* Tail body seamless with the card */}
                    <path
                      d="M32 0 C28 12, 18 28, 0 39.5 L32 39.5 Z"
                      fill="#FFFFFF"
                    />
                    {/* Seamless seam cover over card border */}
                    <rect x="30" y="0" width="3" height="40" fill="#FFFFFF" />
                    {/* Top curved border line of the tail */}
                    <path
                      d="M32 0 C28 12, 18 28, 0 39.5"
                      stroke="#E7E5E4"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    {/* Bottom horizontal line continuing into the card bottom border */}
                    <path
                      d="M0 39.5 L32 39.5"
                      stroke="#E7E5E4"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    Core Digital Solutions
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClickChime(587.33);
                      navigate('/services');
                    }}
                    className="text-[11px] font-semibold text-stone-500 hover:text-amber-600 transition cursor-pointer"
                  >
                    Explore All Services →
                  </button>
                </div>

                <h1 className="text-xl sm:text-[22px] font-extrabold text-stone-900 leading-snug mb-4">
                  What can we help you to build today?
                </h1>

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
                        onMouseLeave={() => {
                          setHoveredCategorySlug(null);
                        }}
                        className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? 'border-amber-500 bg-amber-50/95 shadow-[0_12px_28px_rgba(245,158,11,0.18)] -translate-y-0.5'
                            : 'border-stone-200/90 bg-stone-50/60 hover:border-amber-400 hover:bg-amber-50/50 shadow-xs'
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
                              {category.slug === 'software-solutions' && 'Web • Mobile • UI/UX • QA Testing • SEO • GEO • AIO'}
                              {category.slug === 'social-media-marketing' && 'Advertising • Management • Content Marketing'}
                              {category.slug === 'digital-strategy-ideas' && 'Brand Management • Logo Design • Digital Analytics'}
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
            )}
          </AnimatePresence>
        </div>

        {/* Honeycomb Display: Right-aligned 3D Golden Honeycomb (matching Reference/S1.jpg) */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] w-full lg:w-[54%] lg:-translate-x-8 xl:-translate-x-10 lg:-translate-y-6 xl:-translate-y-8"
        >
          <HoneycombGrid3D
            stage="S1"
            mouseTilt={mouseTilt}
          />
        </motion.div>
      </div>
    </section>
  );
};
