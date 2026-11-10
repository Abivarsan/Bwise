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
import { PRIORITY_SERVICES, PriorityService } from '../../data/servicesData';
import { BwiseBeeCharacter } from './BwiseBeeCharacter';
import { assetUrl } from '../../utils/assets';

interface HoneycombGrid3DProps {
  stage: 'S1' | 'S2' | 'S3';
  selectedService: PriorityService | null;
  hoveredServiceId: number | null;
  onSelectService: (service: PriorityService) => void;
  onHoverService: (serviceId: number | null) => void;
  mouseTilt: { x: number; y: number };
}

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

/**
 * Renders a single 3D hexagonal/pentagonal beehive cell.
 * In S1: renders warm translucent golden honey cells tilted in 3D isometric perspective.
 * In S2 & S3: renders the 3D recessed architectural studio room from S2.jpg/S3.jpg with
 * extruded golden walls, crisp vector iconography, and interactive glow states.
 */
const BeehiveRoomCell: React.FC<{
  service: PriorityService;
  stage: 'S1' | 'S2' | 'S3';
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (s: PriorityService) => void;
  onHover: (id: number | null) => void;
}> = ({ service, stage, isSelected, isHovered, onSelect, onHover }) => {
  const isS1 = stage === 'S1';
  const activeHighlight = isSelected || isHovered;

  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      aria-label={`Explore ${service.title} Beehive Room`}
      className={`group relative w-[124px] h-[142px] sm:w-[148px] sm:h-[168px] lg:w-[166px] lg:h-[188px] focus:outline-none transition-all duration-500 preserve-3d cursor-pointer ${
        isSelected && stage === 'S3'
          ? 'z-30 scale-110'
          : isHovered
          ? 'z-20 scale-105'
          : 'z-10 scale-100'
      }`}
    >
      {/* 3D Extruded Back/Side Thickness Wall (gives realistic 3D depth like S1.jpg & S2.jpg) */}
      <div
        className="absolute inset-0 clip-hexagon transition-transform duration-500 pointer-events-none"
        style={{
          background: isS1
            ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 55%, #92400E 100%)'
            : activeHighlight
            ? 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #B45309 100%)'
            : 'linear-gradient(135deg, #E5A93B 0%, #B47B26 55%, #6B4415 100%)',
          transform: isS1 ? 'translate3d(12px, 8px, -18px)' : 'translate3d(6px, 6px, -12px)',
        }}
      />

      {/* Outer Golden Bezel Frame */}
      <div
        className={`absolute inset-0 clip-hexagon p-[5px] sm:p-[6px] transition-all duration-500 ${
          activeHighlight ? 'animate-honey-glow' : ''
        }`}
        style={{
          background: isS1
            ? 'linear-gradient(160deg, #FEF08A 0%, #F59E0B 45%, #B45309 100%)'
            : activeHighlight
            ? 'linear-gradient(160deg, #FEF08A 0%, #FBBF24 50%, #D97706 100%)'
            : 'linear-gradient(160deg, #FCD34D 0%, #D97706 55%, #78350F 100%)',
        }}
      >
        {/* Inner Recessed 3D Room Chamber */}
        <div className="relative w-full h-full clip-hexagon overflow-hidden bg-stone-900">
          {isS1 ? (
            /* S1 Mode: Translucent Golden Honeycomb Chamber (matching S1.jpg right side) */
            <div
              className="w-full h-full transition-all duration-500 relative"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #FEF08A 0%, #FBBF24 42%, #D97706 82%, #92400E 100%)',
                boxShadow: 'inset 0 12px 24px rgba(146, 64, 14, 0.55), inset 0 -8px 18px rgba(254, 240, 138, 0.5)',
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
              {/* Subtle hover hint on S1 cell */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-950/65 backdrop-blur-[2px] p-2 text-center">
                <ServiceIcon name={service.iconName} className="w-6 h-6 text-amber-300 mb-1" />
                <span className="text-[10px] sm:text-xs font-bold text-white leading-tight">
                  {service.shortTitle}
                </span>
              </div>
            </div>
          ) : (
            /* S2 & S3 Mode: 3D Architectural Miniature Room Interior (matching S2.jpg & S3.jpg) */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-2.5 text-center select-none">
              {/* Authentic 3D Room Interior Texture mapped from S3.jpg / S2.jpg */}
              <div
                className="absolute inset-0 bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${assetUrl('/reference/S2.jpg')}')`,
                  backgroundSize: '860% 520%',
                  backgroundPosition: `${service.hiveCell.s2Crop.x}% ${service.hiveCell.s2Crop.y}%`,
                  filter: isSelected
                    ? 'brightness(1.08) contrast(1.08)'
                    : 'brightness(0.88) contrast(1.05)',
                }}
              />

              {/* Architectural Room Ceiling Light Beams & 3D Depth Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-400/90 via-amber-500/85 to-amber-600/95'
                    : `bg-gradient-to-b ${service.hiveCell.roomGradient} opacity-65 group-hover:opacity-50`
                }`}
              />

              {/* Top Left & Right Architectural Studio Ceiling LED Bars (like S2.jpg / S3.jpg) */}
              <div className="absolute top-[14%] left-[20%] w-[24%] h-[3px] bg-amber-100/90 rotate-[-28deg] rounded-full shadow-[0_0_8px_#FEF08A]" />
              <div className="absolute top-[14%] right-[20%] w-[24%] h-[3px] bg-amber-100/90 rotate-[28deg] rounded-full shadow-[0_0_8px_#FEF08A]" />

              {/* Inner Hexagonal Rim Glow */}
              <div
                className={`absolute inset-[5px] clip-hexagon border transition-colors duration-300 pointer-events-none ${
                  isSelected
                    ? 'border-yellow-100 border-2 shadow-[inset_0_0_25px_rgba(254,240,138,0.85)]'
                    : 'border-amber-200/35 group-hover:border-amber-300/80'
                }`}
              />

              {/* Crisp White Icon + Service Name (matching S2.jpg & S3.jpg) */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 px-1">
                <div
                  className={`p-2 rounded-xl transition-transform duration-300 ${
                    isSelected
                      ? 'bg-white/25 text-white scale-110 shadow-sm'
                      : 'bg-black/25 text-white/95 group-hover:scale-110 group-hover:bg-amber-500/30'
                  }`}
                >
                  <ServiceIcon
                    name={service.iconName}
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-bold tracking-tight text-white leading-[1.15] drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] max-w-[125px]">
                  {service.title}
                </span>

                {/* S3 Active Room Preview Micro-Copy */}
                {isSelected && stage === 'S3' && (
                  <span className="mt-0.5 text-[9px] font-medium text-amber-950 bg-amber-100/95 px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                    Entering Hive Room...
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export const HoneycombGrid3D: React.FC<HoneycombGrid3DProps> = ({
  stage,
  selectedService,
  hoveredServiceId,
  onSelectService,
  onHoverService,
  mouseTilt,
}) => {
  const row0 = PRIORITY_SERVICES.filter((s) => s.hiveCell.row === 0);
  const row1 = PRIORITY_SERVICES.filter((s) => s.hiveCell.row === 1);
  const row2 = PRIORITY_SERVICES.filter((s) => s.hiveCell.row === 2);

  // Calculate 3D camera zoom transform when in Stage S3 (zoomed into the selected cell)
  const getStageTransform = (): string => {
    const tiltX = mouseTilt.y * -5;
    const tiltY = mouseTilt.x * 6;

    if (stage === 'S1') {
      // S1: Tilted 3D isometric golden cluster on the right side (matching S1.jpg)
      return `rotateY(${-18 + tiltY}deg) rotateX(${5 + tiltX}deg) scale(0.88)`;
    }

    if (stage === 'S3' && selectedService) {
      // S3: Camera dollies in closely onto the selected cell (matching S3.jpg)
      const colOffset = (1.5 - selectedService.hiveCell.col) * 14;
      const rowOffset = (1 - selectedService.hiveCell.row) * 16;
      return `translate3d(${colOffset}%, ${rowOffset}%, 160px) rotateY(${tiltY * 0.4}deg) rotateX(${tiltX * 0.4}deg) scale(1.36)`;
    }

    // S2: Full front-facing 3D architectural honeycomb overview (matching S2.jpg)
    return `rotateY(${-4 + tiltY * 0.6}deg) rotateX(${2 + tiltX * 0.6}deg) scale(1)`;
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
          <div className="w-[124px] h-[142px] sm:w-[148px] sm:h-[168px] lg:w-[166px] lg:h-[188px] relative preserve-3d">
            <div
              className="absolute inset-0 clip-hexagon"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 60%, #92400E 100%)',
                transform: 'translate3d(10px, 6px, -14px)',
              }}
            />
            <div
              className="absolute inset-0 clip-hexagon p-[6px]"
              style={{
                background: 'linear-gradient(160deg, #FEF08A 0%, #F59E0B 50%, #B45309 100%)',
              }}
            >
              <div
                className="w-full h-full clip-hexagon relative"
                style={{
                  background:
                    'radial-gradient(circle at 40% 35%, #FEF08A 0%, #FBBF24 55%, #D97706 100%)',
                  boxShadow: 'inset 0 10px 22px rgba(146, 64, 14, 0.45)',
                }}
              >
                <div className="absolute inset-[15%] clip-hexagon border border-amber-100/70 bg-amber-300/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 0: 4 Service Cells (Digital Strategy, SEO, Social Ads, Social Management) */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-10">
          {row0.map((service) => (
            <BeehiveRoomCell
              key={service.id}
              service={service}
              stage={stage}
              isSelected={selectedService?.id === service.id}
              isHovered={hoveredServiceId === service.id}
              onSelect={onSelectService}
              onHover={onHoverService}
            />
          ))}
        </div>

        {/* Row 1 (Offset Honeycomb Row): Decorative Left Cap + 4 Service Cells (GEO, Content Marketing, Digital Analytics, AI Optimization) */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-20 -ml-[62px] sm:-ml-[74px] lg:-ml-[83px]">
          {/* Decorative Left Architectural Studio Wing Cell (matching S2.jpg left edge) */}
          <div className="hidden sm:block w-[124px] h-[142px] sm:w-[148px] sm:h-[168px] lg:w-[166px] lg:h-[188px] relative opacity-90 pointer-events-none">
            <div
              className="absolute inset-0 clip-hexagon p-[5px]"
              style={{
                background: 'linear-gradient(160deg, #D6B075 0%, #8C6239 60%, #4A3219 100%)',
              }}
            >
              <div
                className="w-full h-full clip-hexagon bg-stone-800 bg-no-repeat"
                style={{
                  backgroundImage: stage === 'S1' ? 'none' : `url('${assetUrl('/reference/S2.jpg')}')`,
                  backgroundSize: '860% 520%',
                  backgroundPosition: '35.5% 40.5%',
                  backgroundColor: stage === 'S1' ? '#F59E0B' : '#44403C',
                }}
              />
            </div>
          </div>

          {row1.map((service) => (
            <div key={service.id} className="relative">
              <BeehiveRoomCell
                service={service}
                stage={stage}
                isSelected={selectedService?.id === service.id}
                isHovered={hoveredServiceId === service.id}
                onSelect={onSelectService}
                onHover={onHoverService}
              />
              {/* In S1, the small worker bee hovers in the center cell (matching S1.jpg) */}
              {stage === 'S1' && service.slug === 'content-marketing' && (
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                  <BwiseBeeCharacter variant="worker" className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: 4 Service Cells (Web Development, Mobile App, Brand Handling, Unique Logo Designing) */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 -mb-[32px] sm:-mb-[38px] lg:-mb-[42px] relative z-10">
          {row2.map((service) => (
            <BeehiveRoomCell
              key={service.id}
              service={service}
              stage={stage}
              isSelected={selectedService?.id === service.id}
              isHovered={hoveredServiceId === service.id}
              onSelect={onSelectService}
              onHover={onHoverService}
            />
          ))}
        </div>

        {/* Bottom Golden Base Cell (matching bottom of S1.jpg & S2.jpg) */}
        <div className="flex justify-center relative z-0">
          <div
            onClick={() => onSelectService(PRIORITY_SERVICES[11])}
            className="w-[124px] h-[142px] sm:w-[148px] sm:h-[168px] lg:w-[166px] lg:h-[188px] relative preserve-3d cursor-pointer group"
          >
            <div
              className="absolute inset-0 clip-hexagon"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 60%, #92400E 100%)',
                transform: 'translate3d(10px, 8px, -14px)',
              }}
            />
            <div
              className="absolute inset-0 clip-hexagon p-[6px]"
              style={{
                background: 'linear-gradient(160deg, #FEF08A 0%, #F59E0B 50%, #B45309 100%)',
              }}
            >
              <div
                className="w-full h-full clip-hexagon flex flex-col items-center justify-center p-2 text-center relative"
                style={{
                  background:
                    'radial-gradient(circle at 40% 35%, #FEF08A 0%, #FBBF24 55%, #D97706 100%)',
                  boxShadow: 'inset 0 10px 22px rgba(146, 64, 14, 0.45)',
                }}
              >
                <div className="absolute inset-[14%] clip-hexagon border border-amber-100/70 bg-amber-300/25" />
                {stage !== 'S1' && (
                  <div className="relative z-10 flex flex-col items-center">
                    <LayoutGrid className="w-6 h-6 text-white drop-shadow mb-1" />
                    <span className="text-[11px] font-bold text-white drop-shadow">
                      UI/UX Designing
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Soft Studio Floor Shadow underneath the floating 3D Beehive */}
        <div className="mx-auto mt-6 w-3/4 h-7 rounded-full bg-stone-900/12 blur-xl pointer-events-none" />
      </div>
    </div>
  );
};
