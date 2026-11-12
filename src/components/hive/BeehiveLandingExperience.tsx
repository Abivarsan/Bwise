import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Sparkles, Compass, Volume2, VolumeX, Play, RotateCcw, Cpu, Megaphone, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PRIORITY_SERVICES, PriorityService, MAIN_SERVICE_CATEGORIES, ServiceCategory, getServicesByCategory } from '../../data/servicesData';
import { BwiseBeeCharacter } from './BwiseBeeCharacter';
import { HoneycombGrid3D, ServiceIcon } from './HoneycombGrid3D';
import { HoneycombTunnelCanvas } from './HoneycombTunnelCanvas';
import { BeehiveInteriorRoom } from './BeehiveInteriorRoom';
import { NaturalSkiesSkybox } from './NaturalSkiesSkybox';
import { soundFX } from '../../utils/soundEffects';

export type HiveAnimationStage = 'S1' | 'S2' | 'S3' | 'TUNNEL' | 'S4';

// S1 resting coordinates for the 3D Guide Bee (positioned matching Reference/S1.jpg)
// Bee sits comfortably on the left, gesturing towards the speech bubble with zero card overlap
const S1_BEE_REST_X = 11.5;
const S1_BEE_REST_Y = 39;
const S1_BEE_START_X = -16;

export const BeehiveLandingExperience: React.FC = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState<HiveAnimationStage>('S1');
  const [selectedService, setSelectedService] = useState<PriorityService | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [hoveredServiceId, setHoveredServiceId] = useState<number | null>(null);
  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(soundFX.isMuted);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isGuideVisible, setIsGuideVisible] = useState<boolean>(false);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

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

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  // Coordinated landing page entrance choreography matching Reference/S1.jpg:
  // 1. Bee flies smoothly in from the left
  // 2. 3D HoneycombGrid enters from the right
  // 3. Once bee reaches final position, guide emerges from behind bee's head as a speech bubble
  useEffect(() => {
    const entranceTl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        setHasEntered(true);
      },
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

  /**
   * Reset back to Stage S1 (Initial Landing Page Interaction)
   */
  const resetToS1 = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill();
    setStage('S1');
    setSelectedService(null);
    setSelectedCategory(null);
    setHoveredCategorySlug(null);
    setIsGuideVisible(true);
    gsap.to(beeProxyRef.current, {
      x: S1_BEE_REST_X,
      y: S1_BEE_REST_Y,
      scale: 1,
      tilt: 0,
      duration: 0.75,
      ease: 'power3.out',
      onUpdate: () => {
        setBeePos({
          x: beeProxyRef.current.x,
          y: beeProxyRef.current.y,
          scale: beeProxyRef.current.scale,
          tilt: beeProxyRef.current.tilt,
          isFlying: false,
        });
      },
    });
  }, []);

  /**
   * Triggers the transition when a user clicks one of the 3 Main Service Categories:
   * 1. Sets the selected category
   * 2. Moves stage to S2 (HoneycombGrid3D centers and flips all 12 services)
   * 3. Bee flies to upper-left observing vantage point
   */
  const startCategoryFlightSequence = useCallback(
    (category: ServiceCategory) => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      setSelectedCategory(category);
      setSelectedService(null);

      soundFX.playClickChime(659.25);
      soundFX.speak(`Welcome to the Bwise Hive! Let's explore our ${category.title} studios.`);

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Transition to S2: HoneycombGrid3D centers and pentagons flip open
      tl.call(() => {
        setStage('S2');
        setBeePos((prev) => ({ ...prev, isFlying: true }));
      });

      // Bee flies smoothly to upper-left observing hover
      tl.to(beeProxyRef.current, {
        x: 14,
        y: 28,
        scale: 0.95,
        tilt: 6,
        duration: 0.85,
        ease: 'power2.out',
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

      tl.call(() => {
        setBeePos((prev) => ({ ...prev, isFlying: false, tilt: 0 }));
      });
    },
    []
  );

  /**
   * Triggers the sequence when a user clicks any of the 12 Services displayed in the HoneycombGrid3D:
   * 1. Zoom into the selected pentagon (camera in HoneycombGrid3D)
   * 2. Bee flies along a curved arc and settles alongside the selected pentagon
   * 3. Settle pause (0.2s)
   * 4. Immediately trigger Honeycomb Warp Tunnel animation
   * 5. Emerge into S4 Interior Conference Room with Whiteboard & Consultant Bee
   */
  const startServiceFlightSequence = useCallback(
    (service: PriorityService) => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      setSelectedService(service);
      soundFX.playClickChime(659.25);
      soundFX.speak(`Welcome to the Bwise Hive! Let's explore our ${service.title} room.`);

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Step 1: Transition to S3 (Selected Beehive Section Zoom & Curved Bee Flight)
      tl.call(() => {
        setStage('S3');
        soundFX.playBeeFlightSwoosh(1.35);
      });

      // Calculate where the bee hovers beside the selected cell in S3
      const targetX = Math.max(22, Math.min(70, service.hiveCell.beeTargetX - 11 + (1.5 - service.hiveCell.col) * 3));
      const targetY = Math.max(22, Math.min(72, service.hiveCell.beeTargetY - 4 + (1 - service.hiveCell.row) * 3));

      // Midpoint arc for a natural curved flight path
      const currentX = beeProxyRef.current.x;
      const currentY = beeProxyRef.current.y;
      const midX = (currentX + targetX) / 2;
      const midY = Math.min(currentY, targetY) - 8;

      tl.to(beeProxyRef.current, {
        x: midX,
        y: midY,
        scale: 0.88,
        tilt: 14,
        duration: 0.45,
        ease: 'power2.in',
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

      tl.to(beeProxyRef.current, {
        x: targetX,
        y: targetY,
        scale: 0.84,
        tilt: -3,
        duration: 0.55,
        ease: 'back.out(1.2)',
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

      // Settle hover beside selected cell
      tl.call(() => {
        setBeePos((prev) => ({ ...prev, tilt: 0, isFlying: false }));
      });

      // Crisp settle pause (0.2s) - no unnecessary delays, smooth and coordinated
      tl.to({}, { duration: 0.2 });

      // Step 2: Dive into the selected cell -> 3D Honeycomb Warp Tunnel
      tl.call(() => {
        soundFX.playTunnelWarp(1.55);
        setStage('TUNNEL');
      });
    },
    []
  );

  // Called when the 3D Honeycomb Warp Tunnel completes -> Emerge into S4 Interior Room
  const handleTunnelComplete = useCallback(() => {
    setStage('S4');
    if (selectedCategory) {
      soundFX.speak(`Welcome to our ${selectedCategory.title} studio pod. Let us explore your requirements.`);
    } else if (selectedService) {
      soundFX.speak(selectedService.s4Room.voiceNarration);
    }
  }, [selectedService, selectedCategory]);

  // Called when S4 Interior Room completes -> Navigate to the relevant service section under Services page (S5 & S6)
  const handleProceedToServicesPage = useCallback(() => {
    if (selectedCategory) {
      navigate(`/services?category=${selectedCategory.slug}#${selectedCategory.slug}`);
    } else if (selectedService) {
      navigate(`/services?category=${selectedService.categorySlug}&service=${selectedService.slug}#${selectedService.slug}`);
    } else {
      navigate('/services');
    }
  }, [navigate, selectedService, selectedCategory]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between select-none"
      style={{
        background:
          stage === 'S1'
            ? 'transparent'
            : stage === 'S2'
              ? 'linear-gradient(90deg, #E2E2E4 0%, #E5E5E7 39.5%, #F2F2F3 39.6%, #F5F5F6 100%)'
              : 'radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F7F5F0 58%, #EFECE6 100%)',
      }}
    >
      {/* Background Natural Skies Skybox in Stage S1 (Idea 5) */}
      {stage === 'S1' && <NaturalSkiesSkybox mouseTilt={mouseTilt} />}

      {/* Full-Screen 3D Honeycomb Warp Tunnel Transition (Video 00:03–00:04) */}
      <AnimatePresence>
        {stage === 'TUNNEL' && (
          <HoneycombTunnelCanvas
            durationMs={1550}
            serviceTitle={selectedService?.title}
            onComplete={handleTunnelComplete}
          />
        )}
      </AnimatePresence>

      {/* Stage S4: Interior Beehive Conference Room (S4.jpg & Video 00:05–00:06) */}
      {stage === 'S4' && selectedService ? (
        <BeehiveInteriorRoom
          service={selectedService}
          category={selectedCategory}
          onProceedToServicePage={handleProceedToServicesPage}
          onReturnToHive={resetToS1}
        />
      ) : (
        /* Stages S1, S2, and S3: Main Interactive Bee & 3D Beehive Stage */
        <div
          className={`relative flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 pb-10 flex flex-col ${
            stage === 'S1' ? 'lg:flex-row items-center justify-between' : 'items-center justify-center'
          }`}
        >
          {/* Animated 3D Bwise Guide Bee that flies dynamically from S1/S2 position to the selected S3 Hive Room */}
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

            {/* Animated Cursor Pointer appearing on the selected cell in Stage S3 (matching S3.jpg) */}
            {stage === 'S3' && selectedService && !beePos.isFlying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 40, y: 20 }}
                animate={{ opacity: 1, scale: 1, x: 110, y: 40 }}
                className="absolute right-0 bottom-12 z-50 drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)]"
              >
                <svg width="44" height="44" viewBox="0 0 24 24" fill="white" stroke="#1C1917" strokeWidth="1.8">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z" />
                </svg>
              </motion.div>
            )}
          </div>

          {/* Mobile/Tablet Bee Header (visible on smaller viewports) */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <BwiseBeeCharacter
              className="w-24 h-24 sm:w-28 sm:h-28 shrink-0"
              flightTiltDeg={beePos.tilt}
              isFlying={beePos.isFlying}
            />
            <div className="bg-white/95 rounded-2xl p-3.5 shadow-md border border-stone-200/80">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-0.5">
                {stage === 'S1'
                  ? 'Welcome to the Bwise Hive'
                  : selectedCategory
                  ? selectedCategory.title
                  : 'All 12 Services'}
              </p>
              <h2 className="text-base font-extrabold text-stone-900">
                {stage === 'S1' ? 'What can we help you to build today?' : 'Select a service to enter its pod'}
              </h2>
            </div>
          </div>

          {/* S2 Clean Centered Header above Grid */}
          <AnimatePresence>
            {stage === 'S2' && (
              <motion.div
                key="s2-header"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-5 sm:mb-7 z-30"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-bold mb-2 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    {selectedCategory ? `${selectedCategory.title} Studios` : 'All 12 Hive Studios'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
                  Select a service to enter its dedicated hive pod
                </h2>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <p className="text-xs sm:text-sm text-stone-600 font-medium">
                    {selectedCategory
                      ? 'Matching studios highlighted • Click any cell to explore'
                      : 'Click any service cell to explore its dedicated solution pod'}
                  </p>
                  <button
                    type="button"
                    onClick={resetToS1}
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 underline underline-offset-2 transition cursor-pointer"
                  >
                    ← Change Category
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left / Center Interaction Column: Speech Bubble in Stage S1 */}
          <div
            className={`relative z-30 transition-all duration-500 ${
              stage === 'S1'
                ? 'w-full lg:w-[48%] xl:w-[45%] lg:ml-[25%] xl:ml-[23%] lg:mr-auto flex flex-col items-center lg:items-start justify-start min-h-[420px] lg:-translate-y-16 xl:-translate-y-20'
                : 'hidden'
            }`}
          >
            <AnimatePresence mode="wait">
              {stage === 'S1' && isGuideVisible && (
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
                      Bwise Interactive Guide
                    </span>
                    <button
                      type="button"
                      onClick={() => setStage('S2')}
                      className="text-[11px] font-semibold text-stone-500 hover:text-amber-600 transition cursor-pointer"
                    >
                      View Full Hive →
                    </button>
                  </div>

                  <h1 className="text-xl sm:text-[22px] font-extrabold text-stone-900 leading-snug mb-4">
                    What can we help you to build today?
                  </h1>

                  {/* 3 Main Service Categories (Interactive Guide Display) */}
                  <div className="flex flex-col gap-2.5">
                    {MAIN_SERVICE_CATEGORIES.map((category, idx) => {
                      const isHovered = hoveredCategorySlug === category.slug;
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => startCategoryFlightSequence(category)}
                          onMouseEnter={() => {
                            setHoveredCategorySlug(category.slug);
                            const servicesInCat = getServicesByCategory(category.slug);
                            setHoveredServiceId(servicesInCat[0]?.id || null);
                            soundFX.playClickChime(480 + idx * 45);
                          }}
                          onMouseLeave={() => {
                            setHoveredCategorySlug(null);
                            setHoveredServiceId(null);
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
                                {category.slug === 'software-solutions' && 'Web • Mobile • QA Testing • SEO • AIO • GEO'}
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

          {/* Honeycomb Display: Right-aligned in S1, Centered in S2 & S3 */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className={`relative z-20 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              stage === 'S1'
                ? 'w-full lg:w-[54%] lg:-translate-x-8 xl:-translate-x-10 lg:-translate-y-6 xl:-translate-y-8'
                : 'w-full max-w-[1200px] mx-auto translate-x-0 translate-y-0'
            }`}
          >
            <HoneycombGrid3D
              stage={stage === 'S1' || stage === 'S2' || stage === 'S3' ? stage : 'S2'}
              selectedService={selectedService}
              selectedCategorySlug={selectedCategory?.slug}
              hoveredServiceId={hoveredServiceId}
              hoveredCategorySlug={hoveredCategorySlug}
              onSelectService={startServiceFlightSequence}
              onHoverService={setHoveredServiceId}
              mouseTilt={mouseTilt}
            />
          </motion.div>
        </div>
      )}

      {/* Interactive Stage Control Bar & Audio Controls at Bottom of Hero */}
      <div className="relative z-40 max-w-[1360px] w-full mx-auto px-4 sm:px-8 pb-5 flex flex-wrap items-center justify-between gap-3">
        {/* Stage Progress Pills (S1 -> S2 -> S3 -> S4 -> S5) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow-md border border-stone-200/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2">
            Hive Flow:
          </span>
          {(
            [
              { id: 'S1', label: 'S1: Ask Bee' },
              { id: 'S2', label: 'S2: 12 Hive Rooms' },
              { id: 'S3', label: 'S3: Room Zoom' },
              { id: 'S4', label: 'S4: Inside Studio' },
            ] as const
          ).map((item) => {
            const isActive = stage === item.id || (stage === 'TUNNEL' && item.id === 'S3');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (timelineRef.current) timelineRef.current.kill();
                  if (item.id === 'S1') {
                    resetToS1();
                  } else if (item.id === 'S2') {
                    setStage('S2');
                    setBeePos({ x: 13, y: 48, scale: 1, tilt: 0, isFlying: false });
                  } else if (item.id === 'S3') {
                    const svc = selectedService || PRIORITY_SERVICES[5];
                    setSelectedService(svc);
                    setStage('S3');
                    setBeePos({
                      x: svc.hiveCell.beeTargetX - 11,
                      y: svc.hiveCell.beeTargetY - 4,
                      scale: 0.85,
                      tilt: 0,
                      isFlying: false,
                    });
                  } else if (item.id === 'S4') {
                    if (!selectedService) setSelectedService(PRIORITY_SERVICES[8]);
                    setStage('S4');
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${isActive
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-amber-50 hover:text-amber-700'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Quick Controls: Replay Demo, Audio Narration Toggle */}
        <div className="flex items-center gap-2">
          {stage !== 'S1' && (
            <button
              type="button"
              onClick={resetToS1}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white text-stone-700 text-xs font-bold shadow-sm border border-stone-200/80 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              Reset to S1
            </button>
          )}

          <button
            type="button"
            onClick={() => startServiceFlightSequence(selectedService || PRIORITY_SERVICES[8])}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 text-xs font-bold border border-amber-400/40 transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            Demo Flight ({selectedService ? selectedService.shortTitle : 'Web Dev'})
          </button>

          <button
            type="button"
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute Hive Audio' : 'Mute Hive Audio'}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 hover:bg-white text-stone-700 text-xs font-semibold shadow-sm border border-stone-200/80 transition cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-stone-400" />
                <span className="hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Voice On</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
