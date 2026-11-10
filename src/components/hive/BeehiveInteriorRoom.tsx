import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { PriorityService } from '../../data/servicesData';
import { ServiceIcon } from './HoneycombGrid3D';
import { BwiseLogo } from '../layout/BwiseLogo';
import { assetUrl } from '../../utils/assets';

interface BeehiveInteriorRoomProps {
  service: PriorityService;
  onProceedToServicePage: () => void;
  onReturnToHive: () => void;
}

/**
 * Reproduces Stage S4 (`Reference/S4.jpg` & Video `00:05–00:06`):
 * Inside the 3D Hexagonal Beehive Studio Conference Room with:
 * - Left interactive Whiteboard showing the Bwise logo and live wireframes for the selected service
 * - Presenting Bee hovering next to the whiteboard
 * - Specialist Consultant Bee with glasses & tablet at the hexagonal glass table
 * - Speech bubble popup asking about the selected service requirements, before automatically
 *   transitioning to the relevant section on the Services page (`S5` & `S6`).
 */
export const BeehiveInteriorRoom: React.FC<BeehiveInteriorRoomProps> = ({
  service,
  onProceedToServicePage,
  onReturnToHive,
}) => {
  const [countdownProgress, setCountdownProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatically navigate to the relevant section under the Services page after 3.6 seconds
  // (matching the reference video flow where S4 transitions smoothly into S5)
  useEffect(() => {
    if (isPaused) return;
    const duration = 3600;
    const intervalMs = 40;
    const step = (intervalMs / duration) * 100;

    const timer = setInterval(() => {
      setCountdownProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          onProceedToServicePage();
          return 100;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, onProceedToServicePage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.12 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-stone-900 py-6 px-4 sm:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Studio Room Frame matching S4.jpg */}
      <div className="relative w-full max-w-[1360px] aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.55)] border border-amber-400/30 bg-stone-950">
        {/* Authentic High-Res 3D Beehive Conference Room Scene from S4.jpg */}
        <img
          src={assetUrl('/reference/S4.jpg')}
          alt={`${service.title} Beehive Studio Room`}
          className="w-full h-full object-cover select-none"
          draggable={false}
        />

        {/* Animated Wing Shimmer over the Presenting Bee (left) & Consultant Bee (center-right) */}
        <div
          className="absolute left-[15.5%] top-[42%] w-[10%] h-[13%] rounded-full bg-white/30 blur-md animate-wing-left pointer-events-none"
          style={{ animationDuration: '0.055s' }}
        />
        <div
          className="absolute left-[63.5%] top-[58%] w-[9%] h-[10%] rounded-full bg-white/25 blur-md animate-wing-right pointer-events-none"
          style={{ animationDuration: '0.07s' }}
        />

        {/* Dynamic Service Badge on the Left Whiteboard Top-Right Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="hidden md:flex absolute left-[12.5%] top-[22.5%] w-[21%] items-center justify-between bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-stone-300/80 shadow-sm pointer-events-none"
        >
          <div className="flex items-center gap-2 truncate">
            <BwiseLogo variant="emblem" className="h-5 shrink-0" />
            <div className="truncate">
              <p className="text-[9px] uppercase tracking-wider font-bold text-amber-700 leading-none">
                Bwise Blueprint
              </p>
              <p className="text-[11px] font-extrabold text-stone-900 truncate">
                {service.shortTitle}
              </p>
            </div>
          </div>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
            {service.s4Room.kpiHighlight}
          </span>
        </motion.div>

        {/* Interactive Speech Bubble Card above the Glasses Consultant Bee (exact position of S4.jpg bubble) */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.45, type: 'spring', stiffness: 220 }}
          className="absolute left-[46%] sm:left-[48.5%] top-[10%] sm:top-[13.5%] w-[49%] sm:w-[32%] lg:w-[27%] bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] border border-amber-100 z-20"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Room #{service.id} • {service.shortTitle}
            </span>
          </div>

          <h3 className="text-xs sm:text-base lg:text-lg font-extrabold text-stone-900 leading-snug">
            {service.s4Room.consultantQuestion}
          </h3>

          {/* Key Service Blueprint Modules */}
          <div className="hidden sm:flex flex-col gap-1 mt-2.5 pt-2.5 border-t border-stone-100">
            {service.s4Room.whiteboardModules.map((mod, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{mod}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-3 sm:mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={onProceedToServicePage}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-500/25 transition-all cursor-pointer"
            >
              <span>Open {service.shortTitle} Section</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speech Bubble Pointer Triangle pointing to the Consultant Bee */}
          <div
            className="w-5 h-5 bg-white absolute -bottom-2.5 left-6 rotate-45 border-r border-b border-amber-100"
            aria-hidden="true"
          />
        </motion.div>

        {/* Bottom HUD Bar inside the S4 Room */}
        <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 flex flex-wrap items-center justify-between gap-3 bg-stone-950/80 backdrop-blur-md px-4 sm:px-6 py-3 rounded-2xl border border-white/15 text-white z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReturnToHive}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-amber-200 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Back to Beehive
            </button>
            <span className="text-xs sm:text-sm text-stone-300">
              Inside <strong className="text-amber-300">{service.title}</strong> Studio Room
            </span>
          </div>

          {/* Auto-Transition Progress Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-300 hidden sm:inline">
              {isPaused ? 'Paused (hovering) — Click to continue' : 'Opening Services Page...'}
            </span>
            <div className="w-28 sm:w-36 h-2 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-75"
                style={{ width: `${countdownProgress}%` }}
              />
            </div>
            <button
              type="button"
              onClick={onProceedToServicePage}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer"
            >
              Skip →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
