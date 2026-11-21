import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Megaphone, Monitor } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../motion/ScrollReveal';
import { useConsultationModal } from '../../context/ConsultationModalContext';
import { BwiseSculptureWebGL } from './BwiseSculptureWebGL';

const HERO_SERVICES = [
  {
    label: 'DIGITAL MARKETING',
    to: '/services?category=social-media-marketing#social-media-marketing',
    icon: Megaphone,
  },
  {
    label: 'SOFTWARE DEVELOPMENT',
    to: '/services?category=software-solutions#software-solutions',
    icon: Code2,
  },
  {
    label: 'DIGITAL EXPERIENCES',
    to: '/services?category=digital-strategy-ideas#digital-strategy-ideas',
    icon: Monitor,
  },
] as const;

export const CinematicBwiseHero: React.FC = () => {
  const { openConsultationModal } = useConsultationModal();
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number, y = 18) =>
    prefersReducedMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: EASE },
        };

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#000000] text-[#FFFFFF] flex flex-col justify-between overflow-x-clip">
      {/* Subtle controlled studio lighting strictly in BWise orange on pure black */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 46% 42% at 72% 54%, rgba(245, 158, 11, 0.08) 0%, rgba(234, 88, 12, 0.025) 46%, transparent 74%)',
        }}
      />

      {/* Subtle warm horizontal floor sheen grounding the bottom of the dark hero stage */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[78px] h-28"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 68% 100% at 64% 100%, rgba(245, 130, 12, 0.14) 0%, rgba(245, 158, 11, 0.04) 48%, transparent 78%)',
        }}
      />

      {/* =====================================================================
          MAIN HERO STAGE (2-Column Editorial Composition on Desktop)
         ===================================================================== */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-28 sm:pt-32 lg:pt-28 pb-4 sm:pb-6 lg:pb-2">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          {/* -----------------------------------------------------------------
              LEFT COLUMN: EXACT HEADLINE, SUBTEXT & DUAL PILL CTAs
             ----------------------------------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-6 text-left z-20 lg:pr-2">
            <motion.h1
              {...fadeUp(0.12, 20)}
              className="font-extrabold tracking-[-0.03em] leading-[1.06] text-[clamp(2.35rem,1.25rem+3.4vw,4.75rem)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="block text-[#FFFFFF]">Smart ideas.</span>
              <span className="block sm:whitespace-nowrap">
                <span className="text-[#F59E0B]">Stronger</span>{' '}
                <span className="text-[#FFFFFF]">futures.</span>
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.24, 14)}
              className="mt-5 sm:mt-7 text-[#DADADA] font-normal leading-[1.52] text-[clamp(1rem,0.92rem+0.38vw,1.28rem)] max-w-[36ch]"
            >
              Digital strategy, creative marketing and software built around your next move.
            </motion.p>

            {/* Primary & Secondary Pill CTAs — stay cleanly side-by-side from sm/lg upward */}
            <div className="mt-7 sm:mt-10 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
              <motion.div {...fadeUp(0.34, 12)}>
                <Link
                  to="/portfolio"
                  className="group inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 xl:px-7 py-3 rounded-full bg-[#F59E0B] hover:bg-[#FBBF24] text-[#000000] font-semibold text-[0.9rem] xl:text-[0.95rem] tracking-[-0.01em] whitespace-nowrap transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 active:scale-[0.97] hover:shadow-[0_10px_28px_rgba(245,158,11,0.28)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FFFFFF]"
                >
                  <span>Explore our work</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>

              <motion.div {...fadeUp(0.42, 12)}>
                <button
                  type="button"
                  onClick={openConsultationModal}
                  className="group inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 xl:px-7 py-3 rounded-full bg-transparent hover:bg-white/[0.08] text-[#FFFFFF] font-medium text-[0.9rem] xl:text-[0.95rem] tracking-[-0.01em] whitespace-nowrap border border-white/90 hover:border-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F59E0B]"
                >
                  <span>Start a conversation</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.85}
                    aria-hidden="true"
                  />
                </button>
              </motion.div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN: INTERACTIVE 3D METALLIC BWISE SCULPTURE
             ----------------------------------------------------------------- */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
            className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:-ml-4 xl:-ml-8 lg:-mr-4 xl:-mr-6"
          >
            <div className="relative w-full h-[330px] xs:h-[360px] sm:h-[430px] lg:h-[510px] xl:h-[580px] max-w-[740px]">
              <BwiseSculptureWebGL className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM HORIZONTAL SERVICES STRIP (3 Equal Columns + Hairline Dividers)
         ===================================================================== */}
      <motion.div
        {...fadeUp(0.48, 10)}
        className="relative z-20 w-full bg-[#000000] border-t border-white/[0.12]"
      >
        {/* Warm orange optical sheen along top border matching reference screenshot */}
        <div
          className="pointer-events-none absolute -top-px left-0 right-0 h-[1.5px]"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(90deg, rgba(245,158,11,0.06) 2%, rgba(255,196,92,0.85) 22%, rgba(245,158,11,0.35) 38%, rgba(255,255,255,0.12) 56%, rgba(245,158,11,0.34) 76%, rgba(245,158,11,0.05) 98%)',
          }}
        />
        <div
          className="pointer-events-none absolute -top-[4px] left-[12%] w-[26%] h-[8px] blur-[5px]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(245,158,11,0.55) 0%, transparent 75%)',
          }}
        />

        <nav
          aria-label="Core services"
          className="max-w-[1440px] mx-auto px-6 sm:pl-6 sm:pr-20 md:pl-8 md:pr-22 lg:pl-14 lg:pr-24 xl:px-20"
        >
          <ul className="grid grid-cols-1 sm:grid-cols-3 divide-y divide-white/[0.08] sm:divide-y-0">
            {HERO_SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <li
                  key={service.label}
                  className="relative flex items-center justify-center"
                >
                  {/* Short centered vertical hairline divider between desktop/tablet columns */}
                  {idx > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-6 w-px bg-white/[0.18]"
                    />
                  )}

                  <Link
                    to={service.to}
                    className="group w-full min-h-[52px] sm:min-h-[78px] py-3.5 sm:py-5 px-2 sm:px-2.5 lg:px-4 inline-flex items-center justify-center gap-2 lg:gap-3.5 text-[#E5E5E5] hover:text-[#FFFFFF] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#F59E0B]"
                  >
                    <Icon
                      className="w-[18px] h-[18px] lg:w-[21px] lg:h-[21px] shrink-0 text-[#F59E0B] transition-transform duration-200 group-hover:scale-110"
                      strokeWidth={1.65}
                      aria-hidden="true"
                    />
                    <span className="text-[0.68rem] md:text-[0.74rem] lg:text-[0.8125rem] xl:text-[0.875rem] font-medium uppercase tracking-[0.09em] md:tracking-[0.12em] lg:tracking-[0.16em] whitespace-nowrap leading-none">
                      {service.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.div>
    </section>
  );
};
