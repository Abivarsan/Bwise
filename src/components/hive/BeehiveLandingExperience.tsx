import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Sparkles, Compass, Volume2, VolumeX, Play, RotateCcw } from 'lucide-react';
import { PRIORITY_SERVICES, PriorityService } from '../../data/servicesData';
import { BwiseBeeCharacter } from './BwiseBeeCharacter';
import { HoneycombGrid3D, ServiceIcon } from './HoneycombGrid3D';
import { HoneycombTunnelCanvas } from './HoneycombTunnelCanvas';
import { BeehiveInteriorRoom } from './BeehiveInteriorRoom';
import { soundFX } from '../../utils/soundEffects';

export type HiveAnimationStage = 'S1' | 'S2' | 'S3' | 'TUNNEL' | 'S4';

// S1 resting coordinates for the 3D Guide Bee (positioned on the left without covering the popup card)
const S1_BEE_REST_X = 11;
const S1_BEE_REST_Y = 50;

export const BeehiveLandingExperience: React.FC = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState<HiveAnimationStage>('S1');
  const [selectedService, setSelectedService] = useState<PriorityService | null>(null);
  const [hoveredServiceId, setHoveredServiceId] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(soundFX.isMuted);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Bee position state (% of stage container) animated smoothly by GSAP
  const [beePos, setBeePos] = useState<{ x: number; y: number; scale: number; tilt: number; isFlying: boolean }>({
    x: S1_BEE_REST_X,
    y: S1_BEE_REST_Y,
    scale: 1,
    tilt: 0,
    isFlying: false,
  });

  const beeProxyRef = useRef({ x: S1_BEE_REST_X, y: S1_BEE_REST_Y, scale: 1, tilt: 0 });
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

  // Clean up any active GSAP timeline on unmount
  useEffect(() => {
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
   * Triggers the complete multi-stage choreography when a user selects any of the 12 Priority Services:
   * S1 (Popup click) -> S2 (Beehive reveals 12 architectural rooms & Bee takes off)
   * -> S3 (Bee flies to the selected pentagonal/hexagonal room & camera zooms in)
   * -> TUNNEL (3D Honeycomb Warp Fly-Through)
   * -> S4 (Interior Beehive Conference Room with Whiteboard & Consultant Bee)
   * -> Automatic navigation to the selected service section under `/services`
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

      // Step 1: Transition to S2 (Beehive Navigation View - matching S2.jpg)
      tl.call(() => {
        setStage('S2');
        setBeePos((prev) => ({ ...prev, isFlying: true }));
      });

      // Bee slightly lifts and prepares for flight in S2 while the 12 rooms reveal
      tl.to(beeProxyRef.current, {
        x: 13,
        y: 46,
        scale: 0.96,
        tilt: 8,
        duration: 0.7,
        ease: 'power2.inOut',
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

      // Step 2: Transition to S3 (Selected Beehive Section Zoom & Curved Bee Flight - matching S3.jpg)
      tl.call(() => {
        setStage('S3');
        soundFX.playBeeFlightSwoosh(1.35);
      });

      // Calculate where the bee hovers beside the selected cell in S3
      const targetX = Math.max(24, Math.min(72, service.hiveCell.beeTargetX - 11));
      const targetY = Math.max(24, Math.min(74, service.hiveCell.beeTargetY - 4));

      // Midpoint arc for a natural curved flight path
      const midX = (13 + targetX) / 2;
      const midY = Math.min(13, targetY) - 10;

      tl.to(beeProxyRef.current, {
        x: midX,
        y: midY,
        scale: 0.88,
        tilt: 16,
        duration: 0.55,
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
        tilt: -4,
        duration: 0.75,
        ease: 'back.out(1.3)',
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

      // Settle hover right next to the glowing selected room cell (S3.jpg state)
      tl.call(() => {
        setBeePos((prev) => ({ ...prev, tilt: 0, isFlying: false }));
      });

      // Hold on S3 for 1.05s so user clearly sees the bee guiding them to the highlighted cell (S3.jpg)
      tl.to({}, { duration: 1.05 });

      // Step 3: Dive into the selected cell -> 3D Honeycomb Warp Tunnel (00:03-00:04 in video)
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
    if (selectedService) {
      soundFX.speak(selectedService.s4Room.voiceNarration);
    }
  }, [selectedService]);

  // Called when S4 Interior Room completes -> Navigate to the relevant service section under Services page (S5 & S6)
  const handleProceedToServicesPage = useCallback(() => {
    const targetSlug = selectedService ? selectedService.slug : PRIORITY_SERVICES[8].slug;
    navigate(`/services?service=${targetSlug}#${targetSlug}`);
  }, [navigate, selectedService]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden flex flex-col justify-between select-none"
      style={{
        background:
          stage === 'S2'
            ? 'linear-gradient(90deg, #E2E2E4 0%, #E5E5E7 39.5%, #F2F2F3 39.6%, #F5F5F6 100%)'
            : 'radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F7F5F0 58%, #EFECE6 100%)',
      }}
    >
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
          onProceedToServicePage={handleProceedToServicesPage}
          onReturnToHive={resetToS1}
        />
      ) : (
        /* Stages S1, S2, and S3: Main Interactive Bee & 3D Beehive Stage */
        <div className="relative flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 pb-16 flex flex-col lg:flex-row items-center justify-between">
          {/* Animated 3D Bwise Guide Bee that flies dynamically from S1/S2 position to the selected S3 Hive Room */}
          <div
            className="hidden lg:block absolute z-40 pointer-events-none"
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
                animate={{ opacity: 1, scale: 1, x: 115, y: 45 }}
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
              className="w-28 h-28 shrink-0"
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

          {/* Left / Center Interaction Column */}
          <div
            className={`relative z-30 w-full transition-all duration-500 ${
              stage === 'S1'
                ? 'lg:w-[48%] xl:w-[45%] lg:ml-[21%] xl:ml-[19%] lg:mr-auto flex flex-col items-center lg:items-start justify-center min-h-[420px]'
                : 'lg:w-[44%] flex flex-col items-center lg:items-start justify-center min-h-[420px]'
            }`}
          >
            <AnimatePresence mode="wait">
              {stage === 'S1' && (
                /* S1 Speech Bubble Popup Card with the 12 Priority Services (matching S1.jpg) */
                <motion.div
                  key="s1-popup"
                  initial={{ opacity: 0, y: 18, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[440px] xl:max-w-[470px] bg-white rounded-[26px] p-5 sm:p-6 shadow-[0_24px_60px_rgba(26,22,18,0.11)] border border-stone-200/70"
                >
                  {/* Speech bubble tail pointing left toward the Bwise Bee (matching S1.jpg) */}
                  <div
                    className="hidden lg:block absolute -left-3.5 top-[44%] -translate-y-1/2 w-7 h-7 bg-white rotate-45 border-l border-b border-stone-200/70 rounded-bl-sm"
                    aria-hidden="true"
                  />

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

                  {/* 12 Priority Services Pill Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
                    {PRIORITY_SERVICES.map((service, idx) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => startServiceFlightSequence(service)}
                        onMouseEnter={() => {
                          setHoveredServiceId(service.id);
                          soundFX.playClickChime(440 + idx * 22);
                        }}
                        onMouseLeave={() => setHoveredServiceId(null)}
                        className={`group flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full border text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          hoveredServiceId === service.id
                            ? 'border-amber-500 bg-amber-50/90 text-stone-950 shadow-sm -translate-y-0.5'
                            : 'border-stone-800/80 bg-white hover:border-amber-500 hover:bg-amber-50/50 text-stone-900'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <ServiceIcon name={service.iconName} className="w-3 h-3" />
                        </span>
                        <span className="truncate">{service.title}</span>
                      </button>
                    ))}
                  </div>

                  <p className="mt-3.5 text-[11px] text-stone-500 flex items-center justify-between">
                    <span>Select any service to watch our Bee guide you into the Hive</span>
                    <span className="font-bold text-amber-600">12 Studios</span>
                  </p>
                </motion.div>
              )}

              {stage === 'S2' && (
                /* S2 Lower-Left Bold Question Typography (matching S2.jpg bottom-left text) */
                <motion.div
                  key="s2-caption"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="hidden lg:flex flex-col items-start justify-end w-full h-[460px] pl-10 pb-4 pointer-events-none"
                >
                  <h2 className="text-4xl xl:text-[44px] font-extrabold text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.28)] leading-[1.12] tracking-tight max-w-[340px]">
                    What can we help you to build today?
                  </h2>
                  <p className="mt-3 text-sm font-medium text-stone-700 bg-white/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm pointer-events-auto">
                    Click any hexagonal studio room in the Beehive →
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: The Interactive 3D Beehive (S1 Golden Cluster -> S2 12 Rooms -> S3 Zoomed Target Room) */}
          <div
            className={`relative z-20 flex items-center justify-center transition-all duration-700 ${
              stage === 'S3'
                ? 'w-full lg:w-[68%] lg:-ml-[14%]'
                : 'w-full lg:w-[54%]'
            }`}
          >
            <HoneycombGrid3D
              stage={stage === 'S1' || stage === 'S2' || stage === 'S3' ? stage : 'S2'}
              selectedService={selectedService}
              hoveredServiceId={hoveredServiceId}
              onSelectService={startServiceFlightSequence}
              onHoverService={setHoveredServiceId}
              mouseTilt={mouseTilt}
            />
          </div>
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
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
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
