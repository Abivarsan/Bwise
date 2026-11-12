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
import { PriorityService, PRIORITY_SERVICES } from '../../data/servicesData';
import { BwiseBeeCharacter } from './BwiseBeeCharacter';

export interface HoneycombGrid3DProps {
  stage?: 'S1' | 'S2' | 'S3';
  selectedService?: PriorityService | null;
  selectedCategorySlug?: string | null;
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
  service?: PriorityService;
  row?: number;
  col?: number;
  isFlipped?: boolean;
  isSelected?: boolean;
  isDimmed?: boolean;
  isCategoryMatch?: boolean;
  stage?: 'S1' | 'S2' | 'S3';
  delay?: number;
  onSelect?: (service: PriorityService) => void;
  onHover?: (serviceId: number | null) => void;
}

/**
 * Renders a double-sided 3D hexagonal/pentagonal honeycomb cell.
 * Front face: Studio-grade golden honey chamber (matching Reference/S1.jpg).
 * Back face: Interactive service chamber displaying vector icon and title.
 */
const HoneycombCell: React.FC<HoneycombCellProps> = ({
  className = '',
  hasWorkerBee = false,
  service,
  row = 0,
  col = 0,
  isFlipped = false,
  isSelected = false,
  isDimmed = false,
  isCategoryMatch = false,
  stage = 'S1',
  delay,
  onSelect,
  onHover,
}) => {
  const isInteractive = stage === 'S2' && !!service;
  const staggerDelay = delay !== undefined ? delay : isFlipped ? row * 0.07 + col * 0.05 : 0;

  return (
    <div
      className={`relative w-[124px] h-[142px] sm:w-[148px] sm:h-[168px] lg:w-[166px] lg:h-[188px] select-none ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Flipper Container that smoothly rotates 180 degrees */}
      <div
        className="w-full h-full relative preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionDelay: `${staggerDelay}s`,
        }}
      >
        {/* FRONT FACE: Golden Honey Chamber (matching Reference/S1.jpg) */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden preserve-3d transition-opacity duration-300 ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
          style={{
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* 3D Extruded Back/Side Thickness Wall */}
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

        {/* BACK FACE: Service Face (Stage S2 & S3) or Golden Chamber for decorative caps */}
        {service ? (
          <div
            className={`absolute inset-0 w-full h-full backface-hidden preserve-3d transition-all duration-300 ${
              isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } ${
              isSelected
                ? 'scale-110 z-30'
                : isDimmed
                ? 'opacity-35 scale-95'
                : ''
            }`}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <button
              type="button"
              disabled={!isInteractive}
              onClick={() => {
                if (isInteractive && onSelect) {
                  onSelect(service);
                }
              }}
              onMouseEnter={() => {
                if (isInteractive && onHover) {
                  onHover(service.id);
                }
              }}
              onMouseLeave={() => {
                if (isInteractive && onHover) {
                  onHover(null);
                }
              }}
              className={`group w-full h-full relative focus:outline-none transition-transform duration-300 text-left ${
                isInteractive ? 'cursor-pointer hover:scale-108 hover:z-40' : 'cursor-default'
              }`}
            >
              {/* 3D Extruded Depth */}
              <div
                className="absolute inset-0 clip-hexagon pointer-events-none"
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 55%, #B45309 100%)'
                    : 'linear-gradient(135deg, #F59E0B 0%, #D97706 55%, #92400E 100%)',
                  transform: 'translate3d(12px, 8px, -18px)',
                }}
              />

              {/* Outer Golden Bezel Frame */}
              <div
                className={`absolute inset-0 clip-hexagon p-[4px] sm:p-[5px] transition-all duration-300 ${
                  isSelected
                    ? 'ring-4 ring-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.9)]'
                    : isCategoryMatch
                    ? 'shadow-[0_0_18px_rgba(245,158,11,0.5)]'
                    : ''
                }`}
                style={{
                  background: isSelected
                    ? 'linear-gradient(160deg, #FFFFFF 0%, #FEF08A 35%, #F59E0B 75%, #B45309 100%)'
                    : isCategoryMatch
                    ? 'linear-gradient(160deg, #FEF08A 0%, #F59E0B 50%, #92400E 100%)'
                    : 'linear-gradient(160deg, #FDE68A 0%, #F59E0B 50%, #B45309 100%)',
                }}
              >
                {/* Inner Recessed Studio Chamber */}
                <div
                  className="relative w-full h-full clip-hexagon overflow-hidden flex flex-col items-center justify-center p-2 text-center"
                  style={{
                    background: isSelected
                      ? 'radial-gradient(circle at 50% 25%, #451a03 0%, #291804 55%, #180d02 100%)'
                      : isCategoryMatch
                      ? 'radial-gradient(circle at 50% 25%, #2e1e07 0%, #1c1407 60%, #0d0903 100%)'
                      : 'radial-gradient(circle at 50% 25%, #292524 0%, #1c1917 65%, #0c0a09 100%)',
                    boxShadow: 'inset 0 6px 16px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {/* Subtle dot matrix grid background */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 50% 50%, #f59e0b 1px, transparent 1px)',
                      backgroundSize: '10px 10px',
                    }}
                  />

                  {/* Glassmorphic Icon Shield */}
                  <div
                    className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-stone-950 scale-110 shadow-[0_0_16px_rgba(251,191,36,0.85)]'
                        : 'bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 group-hover:scale-110 group-hover:from-amber-300 group-hover:to-amber-500 shadow-sm'
                    }`}
                  >
                    <ServiceIcon name={service.iconName} className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                  </div>

                  {/* Service Title */}
                  <span
                    className={`relative z-10 text-[11px] sm:text-xs font-black tracking-tight leading-tight px-1 max-w-[92%] transition-colors duration-200 line-clamp-2 ${
                      isSelected
                        ? 'text-amber-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                        : 'text-stone-100 group-hover:text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                    }`}
                  >
                    {service.shortTitle}
                  </span>

                  {/* Category Match Badge */}
                  {isCategoryMatch && (
                    <span className="relative z-10 mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Match
                    </span>
                  )}
                </div>
              </div>
            </button>
          </div>
        ) : (
          /* Ambient Golden Chamber for decorative caps */
          <div
            className={`absolute inset-0 w-full h-full backface-hidden preserve-3d transition-opacity duration-300 ${
              isFlipped ? 'opacity-90' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div
              className="absolute inset-0 clip-hexagon pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 55%, #92400E 100%)',
                transform: 'translate3d(12px, 8px, -18px)',
              }}
            />
            <div
              className="absolute inset-0 clip-hexagon p-[5px] sm:p-[6px]"
              style={{
                background: 'linear-gradient(160deg, #FEF08A 0%, #F59E0B 45%, #B45309 100%)',
              }}
            >
              <div className="relative w-full h-full clip-hexagon overflow-hidden bg-stone-900">
                <div
                  className="w-full h-full relative"
                  style={{
                    background:
                      'radial-gradient(circle at 35% 30%, #FEF08A 0%, #FBBF24 42%, #D97706 82%, #92400E 100%)',
                    boxShadow:
                      'inset 0 12px 24px rgba(146, 64, 14, 0.55), inset 0 -8px 18px rgba(254, 240, 138, 0.5)',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const HoneycombGrid3D: React.FC<HoneycombGrid3DProps> = ({
  stage = 'S1',
  selectedService,
  selectedCategorySlug,
  hoveredServiceId: _hoveredServiceId,
  hoveredCategorySlug: _hoveredCategorySlug,
  onSelectService,
  onHoverService,
  mouseTilt,
}) => {
  const isFlipped = stage === 'S2' || stage === 'S3';
  const isS3 = stage === 'S3';

  // Row 0 Services (4)
  const row0Services = React.useMemo(
    () => PRIORITY_SERVICES.filter((s) => s.hiveCell.row === 0).sort((a, b) => a.hiveCell.col - b.hiveCell.col),
    []
  );

  // Row 1 Services (4)
  const row1Services = React.useMemo(
    () => PRIORITY_SERVICES.filter((s) => s.hiveCell.row === 1).sort((a, b) => a.hiveCell.col - b.hiveCell.col),
    []
  );

  // Row 2 Services (4)
  const row2Services = React.useMemo(
    () => PRIORITY_SERVICES.filter((s) => s.hiveCell.row === 2).sort((a, b) => a.hiveCell.col - b.hiveCell.col),
    []
  );

  // Calculate 3D isometric camera transform driven by mouse movement and stage
  const getStageTransform = (): string => {
    const tiltX = mouseTilt.y * -4;
    const tiltY = mouseTilt.x * 5;

    if (stage === 'S3' && selectedService) {
      const colOffset = (1.5 - selectedService.hiveCell.col) * 16;
      const rowOffset = (1 - selectedService.hiveCell.row) * 18;
      return `translate3d(${colOffset}%, ${rowOffset}%, 180px) rotateY(${tiltY * 0.3}deg) rotateX(${tiltX * 0.3}deg) scale(1.42)`;
    }

    if (stage === 'S2') {
      return `rotateY(${-3 + tiltY * 0.5}deg) rotateX(${2 + tiltX * 0.5}deg) scale(1)`;
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
          <HoneycombCell isFlipped={isFlipped} stage={stage} delay={0.04} />
        </div>

        {/* Row 0: 4 Honeycomb Cells */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-10">
          {row0Services.map((service, colIdx) => (
            <HoneycombCell
              key={service.id}
              service={service}
              row={0}
              col={colIdx}
              isFlipped={isFlipped}
              isSelected={selectedService?.id === service.id}
              isDimmed={isS3 && selectedService?.id !== service.id}
              isCategoryMatch={selectedCategorySlug === service.categorySlug}
              stage={stage}
              onSelect={onSelectService}
              onHover={onHoverService}
            />
          ))}
        </div>

        {/* Row 1 (Offset Honeycomb Row): Left Cell + 4 Center/Right Cells */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-20 -ml-[62px] sm:-ml-[74px] lg:-ml-[83px]">
          {/* Left Decorative Cell (matching S1.jpg geometry) */}
          <HoneycombCell
            className="hidden sm:block opacity-90"
            isFlipped={isFlipped}
            stage={stage}
            delay={0.14}
          />
          {row1Services.map((service, colIdx) => (
            <HoneycombCell
              key={service.id}
              service={service}
              row={1}
              col={colIdx}
              hasWorkerBee={colIdx === 1} // S1 has small worker bee hovering inside cell
              isFlipped={isFlipped}
              isSelected={selectedService?.id === service.id}
              isDimmed={isS3 && selectedService?.id !== service.id}
              isCategoryMatch={selectedCategorySlug === service.categorySlug}
              stage={stage}
              onSelect={onSelectService}
              onHover={onHoverService}
            />
          ))}
        </div>

        {/* Row 2: 4 Honeycomb Cells */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-10">
          {row2Services.map((service, colIdx) => (
            <HoneycombCell
              key={service.id}
              service={service}
              row={2}
              col={colIdx}
              isFlipped={isFlipped}
              isSelected={selectedService?.id === service.id}
              isDimmed={isS3 && selectedService?.id !== service.id}
              isCategoryMatch={selectedCategorySlug === service.categorySlug}
              stage={stage}
              onSelect={onSelectService}
              onHover={onHoverService}
            />
          ))}
        </div>

        {/* Bottom Golden Base Cell */}
        <div className="flex justify-center relative z-0">
          <HoneycombCell isFlipped={isFlipped} stage={stage} delay={0.24} />
        </div>

        {/* Soft Studio Floor Shadow underneath the floating 3D Beehive */}
        <div className="mx-auto mt-6 w-3/4 h-7 rounded-full bg-stone-900/12 blur-xl pointer-events-none" />
      </div>
    </div>
  );
};
