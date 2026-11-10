import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Search,
  Megaphone,
  MessageSquare,
  Cog,
  FileCheck,
  TrendingUp,
  Cpu,
  Monitor,
  Smartphone,
  Tag,
  PenTool,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PRIORITY_SERVICES, PriorityService } from '../../data/servicesData';
import { BwiseBeeCharacter } from './BwiseBeeCharacter';

interface NaturalSkiesHoneycombGridProps {
  selectedService: PriorityService | null;
  hoveredServiceId: number | null;
  onSelectService: (service: PriorityService) => void;
  onHoverService: (serviceId: number | null) => void;
  mouseTilt?: { x: number; y: number };
}

// Icon mapper for service icons
const ServiceNodeIcon: React.FC<{ name: PriorityService['iconName']; className?: string }> = ({
  name,
  className = 'w-6 h-6',
}) => {
  switch (name) {
    case 'Lightbulb':
      return <Lightbulb className={className} />;
    case 'Search':
      return <Search className={className} />;
    case 'Megaphone':
      return <Megaphone className={className} />;
    case 'MessageSquare':
      return <MessageSquare className={className} />;
    case 'Cog':
      return <Cog className={className} />;
    case 'FileCheck':
      return <FileCheck className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Monitor':
      return <Monitor className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Tag':
      return <Tag className={className} />;
    case 'PenTool':
      return <PenTool className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

/**
 * 3D Miniature Studio Diorama elements inside each golden glass cell
 * (Inspired by image_10.png: tiny golden studio furniture, honey jars, screens & trees)
 */
const CellDioramaIllustration: React.FC<{ serviceId: number }> = ({ serviceId }) => {
  switch (serviceId) {
    case 1: // Strategy - Idea pedestal
    case 2: // SEO - Radar / Search beacon
      return (
        <svg viewBox="0 0 80 50" className="w-14 h-9 opacity-85 pointer-events-none drop-shadow">
          <ellipse cx="40" cy="40" rx="28" ry="8" fill="#F59E0B" opacity="0.6" />
          <rect x="36" y="22" width="8" height="18" rx="2" fill="#FEF08A" />
          <circle cx="40" cy="18" r="10" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M40 10 L40 6 M34 14 L30 11 M46 14 L50 11" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 5: // Generative Eng / AI
    case 8: // Artificial Intelligence
      return (
        <svg viewBox="0 0 80 50" className="w-14 h-9 opacity-85 pointer-events-none drop-shadow">
          <ellipse cx="40" cy="40" rx="26" ry="8" fill="#D97706" opacity="0.6" />
          <rect x="26" y="16" width="28" height="20" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="30" y="20" width="20" height="12" rx="2" fill="#78350F" />
          <circle cx="40" cy="26" r="3.5" fill="#38BDF8" className="animate-pulse" />
        </svg>
      );
    case 9: // Web Dev
    case 10: // Mobile App
      return (
        <svg viewBox="0 0 80 50" className="w-14 h-9 opacity-85 pointer-events-none drop-shadow">
          <ellipse cx="40" cy="42" rx="26" ry="7" fill="#F59E0B" opacity="0.55" />
          <rect x="25" y="16" width="30" height="20" rx="3" fill="#FFFBEB" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="28" y="19" width="24" height="14" rx="1.5" fill="#F59E0B" opacity="0.8" />
          <rect x="36" y="36" width="8" height="6" fill="#B45309" />
        </svg>
      );
    default: // Classic Golden Honey Jar / Honeycomb pedestal
      return (
        <svg viewBox="0 0 80 50" className="w-13 h-9 opacity-85 pointer-events-none drop-shadow">
          <ellipse cx="40" cy="40" rx="24" ry="7" fill="#D97706" opacity="0.5" />
          <path d="M30 20 Q40 16 50 20 L48 38 Q40 42 32 38 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.2" />
          <ellipse cx="40" cy="20" rx="10" ry="3.5" fill="#FEF08A" />
          <ellipse cx="40" cy="26" rx="7" ry="2.5" fill="#F59E0B" />
        </svg>
      );
  }
};

/**
 * Translucent Floating Glass Honeycomb Island (Idea 5)
 */
export const NaturalSkiesHoneycombGrid: React.FC<NaturalSkiesHoneycombGridProps> = ({
  selectedService,
  hoveredServiceId,
  onSelectService,
  onHoverService,
  mouseTilt = { x: 0, y: 0 },
}) => {
  // Hive cluster layout matching image_10.png:
  // Top: SEO (2)
  // Row 2: Digital Strategy (1), Social Media (4), Content Marketing (6)
  // Row 3: Social Media Agency (3), Center Bee Hub, Generative Engine (5), Unique Logo (12)
  // Row 4: Digital Analytics (7), AI Optimization (8), Mobile App (10)
  // Bottom: Web Dev (9), Brand Handling (11)
  const topRow = [PRIORITY_SERVICES[1]]; // SEO (top center)
  const row2 = [PRIORITY_SERVICES[0], PRIORITY_SERVICES[3], PRIORITY_SERVICES[5]];
  const row3Left = [PRIORITY_SERVICES[2]];
  const row3Right = [PRIORITY_SERVICES[4], PRIORITY_SERVICES[11]];
  const row4 = [PRIORITY_SERVICES[6], PRIORITY_SERVICES[7], PRIORITY_SERVICES[9]];
  const bottomRow = [PRIORITY_SERVICES[8], PRIORITY_SERVICES[10]];

  const renderHexNode = (service: PriorityService, bobDelay = 0) => {
    const isHovered = hoveredServiceId === service.id;
    const isSelected = selectedService?.id === service.id;

    return (
      <div
        key={service.id}
        className="relative group p-1"
        onMouseEnter={() => onHoverService(service.id)}
        onMouseLeave={() => onHoverService(null)}
      >
        <motion.div
          animate={{
            y: [-4, 4, -4],
            scale: isHovered || isSelected ? 1.08 : 1,
          }}
          transition={{
            y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: bobDelay },
            scale: { duration: 0.28, ease: 'easeOut' },
          }}
          className="relative cursor-pointer"
          onClick={() => onSelectService(service)}
        >
          {/* Outer Glass Hexagon Container */}
          <div
            className={`w-[110px] h-[126px] sm:w-[124px] sm:h-[142px] xl:w-[136px] xl:h-[156px] clip-hexagon transition-all duration-300 relative flex items-center justify-center ${
              isHovered || isSelected
                ? 'shadow-[0_0_36px_rgba(245,158,11,0.85)] filter brightness-110'
                : 'shadow-[0_16px_32px_rgba(217,119,6,0.22)]'
            }`}
            style={{
              background: isHovered || isSelected
                ? 'linear-gradient(145deg, #FEF08A 0%, #F59E0B 50%, #B45309 100%)'
                : 'linear-gradient(145deg, rgba(254, 240, 138, 0.85) 0%, rgba(245, 158, 11, 0.75) 45%, rgba(180, 83, 9, 0.85) 100%)',
            }}
          >
            {/* Inner Glass Cavity filled with Liquid Amber Honey */}
            <div
              className="w-[93%] h-[93%] clip-hexagon relative flex flex-col items-center justify-center overflow-hidden transition-all duration-300"
              style={{
                background:
                  'radial-gradient(circle at 50% 25%, rgba(254, 249, 195, 0.75) 0%, rgba(251, 191, 36, 0.45) 45%, rgba(180, 83, 9, 0.7) 100%)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Top Glass Specular Light Reflection (Crystal Edge Sheen) */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/60 blur-[3px] rounded-full pointer-events-none" />

              {/* Liquid Honey Waves inside the cell */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-[48%] transition-all duration-500 pointer-events-none ${
                  isHovered || isSelected
                    ? 'bg-gradient-to-t from-amber-600/90 via-amber-500/80 to-amber-400/50'
                    : 'bg-gradient-to-t from-amber-600/60 via-amber-500/50 to-amber-300/30'
                }`}
              />

              {/* 3D Miniature Studio Diorama Illustration */}
              <div className="relative z-10 -mt-2">
                <CellDioramaIllustration serviceId={service.id} />
              </div>

              {/* Service Icon & Badge */}
              <div className="relative z-10 flex items-center justify-center gap-1 mt-0.5">
                <div
                  className={`p-1 rounded-full transition-colors ${
                    isHovered || isSelected
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white/80 text-amber-800'
                  }`}
                >
                  <ServiceNodeIcon name={service.iconName} className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Service Abbreviated Label */}
              <span className="relative z-10 text-[10px] xl:text-[11px] font-bold text-stone-900 tracking-tight text-center px-2 line-clamp-1 drop-shadow-sm mt-0.5">
                {service.title.split(' ')[0]}
              </span>

              {/* Active Golden Corner Particle Spark */}
              {(isHovered || isSelected) && (
                <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#F59E0B] animate-ping" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Floating Glassmorphic 3D Tooltip Preview Window */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 w-52 pointer-events-none"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2.5 shadow-[0_18px_38px_rgba(26,22,18,0.22)] border border-amber-300/80 text-center">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Studio #{service.id}</span>
                </div>
                <p className="text-xs font-extrabold text-stone-900 truncate">
                  {service.title}
                </p>
                <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50/80 py-0.5 px-2 rounded-full">
                  <span>Explore Room</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      className="relative select-none flex flex-col items-center justify-center py-4"
      style={{
        transform: `translate3d(${mouseTilt.x * 12}px, ${mouseTilt.y * 10}px, 0)`,
        transition: 'transform 0.45s ease-out',
      }}
    >
      {/* Soft Ambient Golden Island Glow under the entire cluster */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-amber-400/35 via-amber-300/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Floating Mini Worker Drone Bees flitting around the hive edges (image_10.png) */}
      <motion.div
        animate={{
          x: [-6, 6, -6],
          y: [-8, 8, -8],
          rotate: [-4, 6, -4],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-6 left-[18%] z-20 pointer-events-none"
      >
        <BwiseBeeCharacter variant="worker" className="w-12 h-12 drop-shadow-md" />
      </motion.div>

      <motion.div
        animate={{
          x: [8, -8, 8],
          y: [-6, 6, -6],
          rotate: [6, -4, 6],
        }}
        transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[22%] -right-4 z-20 pointer-events-none"
      >
        <BwiseBeeCharacter variant="worker" className="w-11 h-11 drop-shadow-md" />
      </motion.div>

      <motion.div
        animate={{
          x: [-5, 7, -5],
          y: [6, -7, 6],
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-4 -left-6 z-20 pointer-events-none"
      >
        <BwiseBeeCharacter variant="worker" className="w-10 h-10 drop-shadow-md" />
      </motion.div>

      <motion.div
        animate={{
          x: [6, -6, 6],
          y: [-7, 7, -7],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-16 right-[12%] z-20 pointer-events-none"
      >
        <BwiseBeeCharacter variant="worker" className="w-12 h-12 drop-shadow-md" />
      </motion.div>

      {/* =====================================================================
          ORGANIC HONEYCOMB MATRIX ARCHIPELAGO (Matching image_10.png layout)
         ===================================================================== */}
      {/* Row 1: Top Apex Cell (SEO) */}
      <div className="flex justify-center -mb-7 sm:-mb-8 xl:-mb-9 relative z-10">
        {topRow.map((svc) => renderHexNode(svc, 0.2))}
      </div>

      {/* Row 2: 3 Honeycomb Cells */}
      <div className="flex justify-center -mb-7 sm:-mb-8 xl:-mb-9 gap-1 relative z-11">
        {row2.map((svc, idx) => renderHexNode(svc, idx * 0.4))}
      </div>

      {/* Row 3: 4 Cells (including Central Pulsing Bwise Bee Hub) */}
      <div className="flex items-center justify-center -mb-7 sm:-mb-8 xl:-mb-9 gap-1 relative z-12">
        {/* Left cell in row 3 */}
        {row3Left.map((svc) => renderHexNode(svc, 0.6))}

        {/* -------------------------------------------------------------
            CENTER HUB CELL: Glowing Bwise Bee Core (Heart of the Hive)
           ------------------------------------------------------------- */}
        <div className="relative group p-1 z-30">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[110px] h-[126px] sm:w-[124px] sm:h-[142px] xl:w-[136px] xl:h-[156px] clip-hexagon relative flex items-center justify-center shadow-[0_0_36px_rgba(245,158,11,0.7)] animate-honey-glow"
            style={{
              background: 'linear-gradient(145deg, #FEF08A 0%, #F59E0B 45%, #B45309 100%)',
            }}
          >
            <div
              className="w-[93%] h-[93%] clip-hexagon relative flex flex-col items-center justify-center overflow-hidden"
              style={{
                background:
                  'radial-gradient(circle at 50% 30%, rgba(254, 240, 138, 0.95) 0%, rgba(245, 158, 11, 0.8) 55%, rgba(180, 83, 9, 0.95) 100%)',
              }}
            >
              {/* Luminous Pulsing Bwise Bee Mascot inside Hub */}
              <div className="relative z-10 scale-90 sm:scale-100 flex flex-col items-center">
                <BwiseBeeCharacter variant="worker" className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" />
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-950 bg-white/70 px-2 py-0.5 rounded-full shadow-sm mt-0.5">
                  Bwise Hub
                </span>
              </div>

              {/* Glowing Corona */}
              <div className="absolute inset-0 bg-radial-[at_50%_50%] from-white/40 via-transparent to-transparent pointer-events-none animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Right cells in row 3 */}
        {row3Right.map((svc, idx) => renderHexNode(svc, (idx + 2) * 0.4))}
      </div>

      {/* Row 4: 3 Honeycomb Cells */}
      <div className="flex justify-center -mb-7 sm:-mb-8 xl:-mb-9 gap-1 relative z-11">
        {row4.map((svc, idx) => renderHexNode(svc, (idx + 1) * 0.35))}
      </div>

      {/* Row 5: Bottom 2 Honeycomb Cells */}
      <div className="flex justify-center gap-1 relative z-10">
        {bottomRow.map((svc, idx) => renderHexNode(svc, (idx + 3) * 0.3))}
      </div>
    </div>
  );
};
