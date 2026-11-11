import React from 'react';
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
  LayoutGrid,
} from 'lucide-react';
import { PriorityService } from '../../data/servicesData';
import { BwiseBeeCharacter } from './BwiseBeeCharacter';

export interface HoneycombGrid3DProps {
  stage?: 'S1' | 'S2' | 'S3';
  selectedService?: PriorityService | null;
  hoveredServiceId?: number | null;
  hoveredCategorySlug?: string | null;
  onSelectService?: (service: PriorityService) => void;
  onHoverService?: (serviceId: number | null) => void;
  mouseTilt: { x: number; y: number };
}

/**
 * Common Service Icon component used across Navbar, ServicesPage, ContactPage, etc.
 */
export const ServiceIcon: React.FC<{ name: PriorityService['iconName']; className?: string }> = ({
  name,
  className = 'w-7 h-7',
}) => {
  switch (name) {
    case 'Lightbulb':
      return <Lightbulb className={className} strokeWidth={1.9} />;
    case 'Search':
      return <Search className={className} strokeWidth={1.9} />;
    case 'Megaphone':
      return <Megaphone className={className} strokeWidth={1.9} />;
    case 'MessageSquare':
      return <MessageSquare className={className} strokeWidth={1.9} />;
    case 'Cog':
      return <Cog className={className} strokeWidth={1.9} />;
    case 'FileCheck':
      return <FileCheck className={className} strokeWidth={1.9} />;
    case 'TrendingUp':
      return <TrendingUp className={className} strokeWidth={1.9} />;
    case 'Cpu':
      return <Cpu className={className} strokeWidth={1.9} />;
    case 'Monitor':
      return <Monitor className={className} strokeWidth={1.9} />;
    case 'Smartphone':
      return <Smartphone className={className} strokeWidth={1.9} />;
    case 'Tag':
      return <Tag className={className} strokeWidth={1.9} />;
    case 'PenTool':
      return <PenTool className={className} strokeWidth={1.9} />;
    default:
      return <LayoutGrid className={className} strokeWidth={1.9} />;
  }
};

interface HoneycombCellProps {
  className?: string;
  hasWorkerBee?: boolean;
}

/**
 * Renders a single 3D hexagonal/pentagonal honeycomb cell with consistent,
 * studio-grade golden honey chamber styling matching Reference/S1.jpg.
 */
const HoneycombCell: React.FC<HoneycombCellProps> = ({
  className = '',
  hasWorkerBee = false,
}) => {
  return (
    <div
      className={`relative w-[124px] h-[142px] sm:w-[148px] sm:h-[168px] lg:w-[166px] lg:h-[188px] select-none pointer-events-none preserve-3d ${className}`}
    >
      {/* 3D Extruded Back/Side Thickness Wall (gives realistic 3D depth matching S1.jpg) */}
      <div
        className="absolute inset-0 clip-hexagon pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 55%, #92400E 100%)',
          transform: 'translate3d(12px, 8px, -18px)',
        }}
      />

      {/* Outer Golden Bezel Frame */}
      <div
        className="absolute inset-0 clip-hexagon p-[5px] sm:p-[6px]"
        style={{
          background: 'linear-gradient(160deg, #FEF08A 0%, #F59E0B 45%, #B45309 100%)',
        }}
      >
        {/* Inner Recessed 3D Honey Chamber */}
        <div className="relative w-full h-full clip-hexagon overflow-hidden bg-stone-900">
          <div
            className="w-full h-full relative"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #FEF08A 0%, #FBBF24 42%, #D97706 82%, #92400E 100%)',
              boxShadow:
                'inset 0 12px 24px rgba(146, 64, 14, 0.55), inset 0 -8px 18px rgba(254, 240, 138, 0.5)',
            }}
          >
            {/* Recessed inner hexagonal bevel */}
            <div
              className="absolute inset-[14%] clip-hexagon border-2 border-amber-200/60"
              style={{
                background:
                  'linear-gradient(145deg, rgba(180, 83, 9, 0.45) 0%, rgba(251, 191, 36, 0.35) 60%, rgba(254, 243, 199, 0.6) 100%)',
                boxShadow: 'inset 0 6px 14px rgba(120, 53, 15, 0.5)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Small 3D Worker Bee hovering inside cell (matching Reference/S1.jpg) */}
      {hasWorkerBee && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <BwiseBeeCharacter variant="worker" className="w-20 h-20 sm:w-24 sm:h-24" />
        </div>
      )}
    </div>
  );
};

export const HoneycombGrid3D: React.FC<HoneycombGrid3DProps> = ({
  stage = 'S1',
  selectedService,
  mouseTilt,
}) => {
  // Calculate 3D isometric camera transform driven by mouse movement
  const getStageTransform = (): string => {
    const tiltX = mouseTilt.y * -5;
    const tiltY = mouseTilt.x * 6;

    if (stage === 'S3' && selectedService) {
      const colOffset = (1.5 - selectedService.hiveCell.col) * 14;
      const rowOffset = (1 - selectedService.hiveCell.row) * 16;
      return `translate3d(${colOffset}%, ${rowOffset}%, 160px) rotateY(${tiltY * 0.4}deg) rotateX(${tiltX * 0.4}deg) scale(1.36)`;
    }

    if (stage === 'S2') {
      return `rotateY(${-4 + tiltY * 0.6}deg) rotateX(${2 + tiltX * 0.6}deg) scale(1)`;
    }

    // Default S1: Tilted 3D isometric golden cluster matching Reference/S1.jpg
    return `rotateY(${-18 + tiltY}deg) rotateX(${5 + tiltX}deg) scale(0.88)`;
  };

  return (
    <div className="relative flex items-center justify-center perspective-hive select-none">
      {/* Floating Background 3D Geometric Hexagons (matching S1.jpg & S2.jpg ambient studio decor) */}
      <div className="absolute -top-10 left-12 w-16 h-18 clip-hexagon border-2 border-amber-300/50 bg-amber-100/20 animate-float-slow pointer-events-none" />
      <div
        className="absolute -bottom-8 left-1/4 w-12 h-14 clip-hexagon bg-gradient-to-br from-amber-300/40 to-amber-500/20 animate-float-slow pointer-events-none"
        style={{ animationDelay: '1.2s' }}
      />
      <div
        className="absolute top-6 -right-8 w-14 h-16 clip-hexagon bg-white/80 shadow-md animate-float-slow pointer-events-none"
        style={{ animationDelay: '2.1s' }}
      />
      <div
        className="absolute -bottom-10 right-10 w-8 h-9 clip-hexagon bg-gradient-to-b from-amber-400 to-amber-600 shadow-lg animate-float-slow pointer-events-none"
        style={{ animationDelay: '0.7s' }}
      />

      {/* Master 3D Beehive Honeycomb Matrix */}
      <div
        className="relative preserve-3d transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: getStageTransform(),
        }}
      >
        {/* Top Golden Crown Cap Cell (matching top of S1.jpg & S2.jpg) */}
        <div className="flex justify-center -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-0">
          <HoneycombCell />
        </div>

        {/* Row 0: 4 Honeycomb Cells */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-10">
          <HoneycombCell />
          <HoneycombCell />
          <HoneycombCell />
          <HoneycombCell />
        </div>

        {/* Row 1 (Offset Honeycomb Row): Left Cell + 4 Center/Right Cells */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-20 -ml-[62px] sm:-ml-[74px] lg:-ml-[83px]">
          {/* Left Decorative Cell (now with consistent golden honey styling) */}
          <HoneycombCell className="hidden sm:block opacity-90" />
          <HoneycombCell />
          {/* Center cell with ambient 3D worker bee hovering inside (matching S1.jpg) */}
          <HoneycombCell hasWorkerBee={true} />
          <HoneycombCell />
          <HoneycombCell />
        </div>

        {/* Row 2: 4 Honeycomb Cells */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-10">
          <HoneycombCell />
          <HoneycombCell />
          <HoneycombCell />
          <HoneycombCell />
        </div>

        {/* Bottom Golden Base Cell */}
        <div className="flex justify-center relative z-0">
          <HoneycombCell />
        </div>

        {/* Soft Studio Floor Shadow underneath the floating 3D Beehive */}
        <div className="mx-auto mt-6 w-3/4 h-7 rounded-full bg-stone-900/12 blur-xl pointer-events-none" />
      </div>
    </div>
  );
};
