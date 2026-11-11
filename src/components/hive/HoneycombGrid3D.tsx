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
import { assetUrl } from '../../utils/assets';

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
  hasActiveCategory?: boolean;
  stage?: 'S1' | 'S2' | 'S3';
  delay?: number;
  onSelect?: (service: PriorityService) => void;
  onHover?: (serviceId: number | null) => void;
}

/**
 * Renders a double-sided 3D hexagonal/pentagonal honeycomb cell.
 * Front face: Studio-grade golden honey chamber (matching Reference/S1.jpg).
 * Back face: Interactive studio cell showcasing realistic service photography
 * with category differentiation and glassmorphic hover name reveal.
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
  hasActiveCategory = false,
  stage = 'S1',
  delay,
  onSelect,
  onHover,
}) => {
  const isInteractive = stage === 'S2' && !!service;
  const staggerDelay = delay !== undefined ? delay : isFlipped ? row * 0.07 + col * 0.05 : 0;

  // Determine highlighted vs muted category styling
  const isHighlightedCategory = !hasActiveCategory || isCategoryMatch;

  return (
    <div
      className={`relative w-[124px] h-[142px] sm:w-[148px] sm:h-[168px] lg:w-[166px] lg:h-[188px] select-none transition-all duration-300 ${
        isInteractive ? 'hover:z-50' : ''
      } ${isSelected ? 'z-40' : ''} ${className}`}
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

        {/* BACK FACE: Service Face with Realistic Image (Stage S2 & S3) or Golden Chamber for decorative caps */}
        {service ? (
          <div
            className={`absolute inset-0 w-full h-full backface-hidden preserve-3d transition-all duration-300 ${
              isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } ${
              isSelected
                ? 'scale-110 z-30'
                : isDimmed
                ? 'opacity-30 scale-95'
                : isHighlightedCategory
                ? 'opacity-100'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* 3D Extruded Depth Side Wall */}
            <div
              className="absolute inset-0 clip-hexagon pointer-events-none transition-all duration-300"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 55%, #B45309 100%)'
                  : isHighlightedCategory
                  ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 55%, #92400E 100%)'
                  : 'linear-gradient(135deg, #475569 0%, #334155 55%, #0F172A 100%)',
                transform: 'translate3d(10px, 8px, -16px)',
              }}
            />

            <button
              type="button"
              disabled={!isInteractive}
              aria-label={`Select ${service.title} service`}
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
              className={`group w-full h-full relative clip-hexagon focus:outline-none transition-all duration-300 text-left ${
                isInteractive ? 'cursor-pointer hover:scale-108 hover:z-50' : 'cursor-default'
              }`}
            >
              {/* Outer Bezel Frame (Radiant Gold for Active Category, Muted Slate for Other Categories) */}
              <div
                className={`w-full h-full clip-hexagon p-[5px] sm:p-[6px] transition-all duration-300 ${
                  isSelected
                    ? 'shadow-[0_0_40px_rgba(245,158,11,0.95)]'
                    : isHighlightedCategory
                    ? 'shadow-[0_0_20px_rgba(245,158,11,0.55)] group-hover:shadow-[0_0_32px_rgba(251,191,36,0.9)]'
                    : 'shadow-md group-hover:shadow-[0_0_28px_rgba(251,191,36,0.8)]'
                }`}
                style={{
                  background: isSelected
                    ? 'linear-gradient(160deg, #FFFFFF 0%, #FEF08A 35%, #F59E0B 75%, #B45309 100%)'
                    : isHighlightedCategory
                    ? 'linear-gradient(160deg, #FEF08A 0%, #F59E0B 48%, #B45309 100%)'
                    : 'linear-gradient(160deg, #CBD5E1 0%, #64748B 50%, #334155 100%)',
                }}
              >
                {/* Inner Studio Chamber with Realistic Photography */}
                <div className="relative w-full h-full clip-hexagon overflow-hidden bg-stone-950">
                  {/* Realistic High-Quality Photograph */}
                  <img
                    src={assetUrl(service.serviceImage)}
                    alt={service.title}
                    loading="eager"
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-112 ${
                      isSelected
                        ? 'scale-105 brightness-100 contrast-105'
                        : isHighlightedCategory
                        ? 'brightness-95 contrast-105 saturate-110 group-hover:brightness-110'
                        : 'grayscale-[55%] brightness-[0.65] contrast-95 group-hover:grayscale-0 group-hover:brightness-105 group-hover:saturate-110'
                    }`}
                  />

                  {/* Subtle Perimeter Rim Lighting & Shading */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: isSelected
                        ? 'radial-gradient(circle at 50% 50%, transparent 35%, rgba(245, 158, 11, 0.45) 100%)'
                        : isHighlightedCategory
                        ? 'linear-gradient(180deg, rgba(251,191,36,0.18) 0%, transparent 35%, rgba(12,10,9,0.5) 100%)'
                        : 'linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.2) 50%, rgba(12,10,9,0.7) 100%)',
                    }}
                  />

                  {/* Glowing Inner Border highlight for matching category cells */}
                  {isHighlightedCategory && hasActiveCategory && !isSelected && (
                    <div className="absolute inset-[3px] clip-hexagon border border-amber-300/60 pointer-events-none" />
                  )}

                  {/* Subtle Amber Glow Indicator Dot on Active Category Match when not hovered */}
                  {isCategoryMatch && hasActiveCategory && !isSelected && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
                      <span className="block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#FBBF24] animate-pulse" />
                    </div>
                  )}

                  {/* Glassmorphic Hover Overlay revealing Service Name, Icon & Action */}
                  <div
                    className={`absolute inset-0 clip-hexagon flex flex-col items-center justify-center p-2.5 text-center transition-all duration-300 ${
                      isSelected
                        ? 'opacity-100 bg-stone-950/65 backdrop-blur-[2px]'
                        : 'opacity-0 group-hover:opacity-100 bg-stone-950/78 backdrop-blur-[3px]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center mb-1.5 shadow-md transition-transform duration-300 ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 scale-110 shadow-[0_0_16px_rgba(251,191,36,0.85)]'
                          : 'bg-gradient-to-br from-amber-300 to-amber-500 text-stone-950 scale-90 group-hover:scale-100'
                      }`}
                    >
                      <ServiceIcon name={service.iconName} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    <span className="text-[11.5px] sm:text-[13px] font-black text-white leading-[1.15] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] max-w-[92%] line-clamp-3">
                      {service.title}
                    </span>

                    <span className="mt-1 px-2 py-0.5 rounded-full text-[8.5px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-400/40 whitespace-nowrap">
                      {isSelected ? 'Selected Pod' : 'Explore →'}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        ) : (
          /* Ambient Golden Chamber for decorative caps */
          <div
            className={`absolute inset-0 w-full h-full backface-hidden preserve-3d transition-opacity duration-300 pointer-events-none ${
              isFlipped ? (hasActiveCategory ? 'opacity-50' : 'opacity-90') : 'opacity-0'
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
  const hasActiveCategory = Boolean(selectedCategorySlug);

  // Measure viewport so all 5 honeycomb rows (12 services + crown + base) fit cleanly in S2
  const [viewport, setViewport] = React.useState<{ w: number; h: number }>({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  React.useEffect(() => {
    const updateViewport = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Unscaled 5-row height & width by Tailwind breakpoint (<640, 640-1023, >=1024)
  const baseGridHeight = viewport.w >= 1024 ? 824 : viewport.w >= 640 ? 730 : 624;
  const baseGridWidth = viewport.w >= 1024 ? 854 : viewport.w >= 640 ? 764 : 508;
  const s2HeightScale = (viewport.h - 210) / baseGridHeight;
  const s2WidthScale = (viewport.w - 40) / baseGridWidth;
  const s2Scale = Math.min(0.84, Math.max(0.54, Math.min(s2HeightScale, s2WidthScale)));
  const s2CollapseMarginPx = stage === 'S2' ? -Math.round(((1 - s2Scale) * baseGridHeight) / 2) : 0;

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
      return `translate3d(${colOffset}%, ${rowOffset}%, 160px) rotateY(${tiltY * 0.3}deg) rotateX(${tiltX * 0.3}deg) scale(1.36)`;
    }

    if (stage === 'S2') {
      return `rotateY(${-2 + tiltY * 0.45}deg) rotateX(${1.5 + tiltX * 0.45}deg) scale(${s2Scale.toFixed(3)})`;
    }

    // Default S1: Tilted 3D isometric golden cluster matching Reference/S1.jpg
    return `rotateY(${-18 + tiltY}deg) rotateX(${5 + tiltX}deg) scale(0.88)`;
  };

  const selectedRow = selectedService?.hiveCell.row;

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
        className="relative preserve-3d transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: getStageTransform(),
          marginTop: s2CollapseMarginPx ? `${s2CollapseMarginPx}px` : undefined,
          marginBottom: s2CollapseMarginPx ? `${s2CollapseMarginPx}px` : undefined,
        }}
      >
        {/* Top Golden Crown Cap Cell (matching top of S1.jpg & S2.jpg) */}
        <div className="flex justify-center -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-0 pointer-events-none">
          <HoneycombCell isFlipped={isFlipped} hasActiveCategory={hasActiveCategory} stage={stage} delay={0.04} />
        </div>

        {/* Row 0: 4 Honeycomb Cells */}
        <div
          className={`flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative transition-all duration-300 ${
            isS3 && selectedRow === 0 ? 'z-30' : 'z-10 hover:z-40'
          }`}
        >
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
              hasActiveCategory={hasActiveCategory}
              stage={stage}
              onSelect={onSelectService}
              onHover={onHoverService}
            />
          ))}
        </div>

        {/* Row 1 (Offset Honeycomb Row): Left Cell + 4 Center/Right Cells */}
        <div
          className={`flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative -ml-[62px] sm:-ml-[74px] lg:-ml-[83px] transition-all duration-300 ${
            isS3 && selectedRow === 1 ? 'z-30' : 'z-20 hover:z-40'
          }`}
        >
          {/* Left Decorative Cell (matching S1.jpg geometry) */}
          <HoneycombCell
            className="hidden sm:block opacity-90 pointer-events-none"
            isFlipped={isFlipped}
            hasActiveCategory={hasActiveCategory}
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
              hasActiveCategory={hasActiveCategory}
              stage={stage}
              onSelect={onSelectService}
              onHover={onHoverService}
            />
          ))}
        </div>

        {/* Row 2: 4 Honeycomb Cells */}
        <div
          className={`flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative transition-all duration-300 ${
            isS3 && selectedRow === 2 ? 'z-30' : 'z-10 hover:z-40'
          }`}
        >
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
              hasActiveCategory={hasActiveCategory}
              stage={stage}
              onSelect={onSelectService}
              onHover={onHoverService}
            />
          ))}
        </div>

        {/* Bottom Golden Base Cell */}
        <div className="flex justify-center relative z-0 pointer-events-none">
          <HoneycombCell isFlipped={isFlipped} hasActiveCategory={hasActiveCategory} stage={stage} delay={0.24} />
        </div>

        {/* Soft Studio Floor Shadow underneath the floating 3D Beehive */}
        <div className="mx-auto mt-6 w-3/4 h-7 rounded-full bg-stone-900/12 blur-xl pointer-events-none" />
      </div>
    </div>
  );
};
