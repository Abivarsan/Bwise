import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRIORITY_SERVICES, PriorityService } from '../../data/servicesData';

interface ConnectingLightBeamsProps {
  hoveredServiceId: number | null;
  /** Positions of service buttons (normalized 0..100% or pixels within container) */
  containerWidth?: number;
  containerHeight?: number;
}

// Map each of the 12 priority services to their target cell coordinates on the right honeycomb matrix
// (Coordinates are % within the container: Left panel ends ~48%, Honeycomb starts ~52% to ~95%)
const BEAM_COORDINATES: Record<
  number,
  {
    start: { x: number; y: number }; // button right edge (% of container)
    end: { x: number; y: number };   // target hexagon center (% of container)
    ctrl1: { x: number; y: number }; // cubic bezier control point 1
    ctrl2: { x: number; y: number }; // cubic bezier control point 2
  }
> = {
  1: { // Digital Strategy
    start: { x: 44, y: 34 },
    end: { x: 57, y: 28 },
    ctrl1: { x: 49, y: 32 },
    ctrl2: { x: 53, y: 28 },
  },
  2: { // SEO
    start: { x: 44, y: 34 },
    end: { x: 70, y: 15 },
    ctrl1: { x: 53, y: 25 },
    ctrl2: { x: 62, y: 17 },
  },
  3: { // Social Media Agency
    start: { x: 44, y: 41 },
    end: { x: 52, y: 44 },
    ctrl1: { x: 47, y: 42 },
    ctrl2: { x: 49, y: 44 },
  },
  4: { // Social Media Management
    start: { x: 44, y: 41 },
    end: { x: 65, y: 29 },
    ctrl1: { x: 51, y: 36 },
    ctrl2: { x: 58, y: 30 },
  },
  5: { // Generative Engineering
    start: { x: 44, y: 48 },
    end: { x: 74, y: 28 },
    ctrl1: { x: 54, y: 42 },
    ctrl2: { x: 65, y: 32 },
  },
  6: { // Content Marketing
    start: { x: 44, y: 48 },
    end: { x: 83, y: 29 },
    ctrl1: { x: 57, y: 44 },
    ctrl2: { x: 72, y: 34 },
  },
  7: { // Digital Analytics
    start: { x: 44, y: 55 },
    end: { x: 57, y: 60 },
    ctrl1: { x: 48, y: 56 },
    ctrl2: { x: 52, y: 59 },
  },
  8: { // AI Optimization
    start: { x: 44, y: 55 },
    end: { x: 78, y: 44 },
    ctrl1: { x: 55, y: 52 },
    ctrl2: { x: 68, y: 46 },
  },
  9: { // Web Development
    start: { x: 44, y: 62 },
    end: { x: 65, y: 74 },
    ctrl1: { x: 51, y: 65 },
    ctrl2: { x: 58, y: 72 },
  },
  10: { // Mobile App Development
    start: { x: 44, y: 62 },
    end: { x: 74, y: 59 },
    ctrl1: { x: 54, y: 62 },
    ctrl2: { x: 65, y: 60 },
  },
  11: { // Brand Handling
    start: { x: 44, y: 69 },
    end: { x: 65, y: 88 },
    ctrl1: { x: 50, y: 74 },
    ctrl2: { x: 57, y: 84 },
  },
  12: { // Unique Logo Design
    start: { x: 44, y: 69 },
    end: { x: 83, y: 59 },
    ctrl1: { x: 57, y: 68 },
    ctrl2: { x: 72, y: 63 },
  },
};

/**
 * Interactive Glowing Light Trails (Idea 5)
 * Renders glowing golden light ribbons that dynamically connect the hovered service
 * button on the left card to the corresponding honeycomb node on the right.
 */
export const ConnectingLightBeams: React.FC<ConnectingLightBeamsProps> = ({
  hoveredServiceId,
}) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-visible hidden lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Luminous Golden Beam Gradient */}
        <linearGradient id="goldenBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(254, 240, 138, 0.4)" />
          <stop offset="35%" stopColor="rgba(251, 191, 36, 0.95)" />
          <stop offset="80%" stopColor="rgba(245, 158, 11, 0.98)" />
          <stop offset="100%" stopColor="rgba(254, 240, 138, 0.6)" />
        </linearGradient>

        {/* Soft Ambient Trace Gradient */}
        <linearGradient id="subtleTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(254, 240, 138, 0.15)" />
          <stop offset="50%" stopColor="rgba(245, 158, 11, 0.25)" />
          <stop offset="100%" stopColor="rgba(254, 240, 138, 0.12)" />
        </linearGradient>

        {/* Intense Outer Glow Filter */}
        <filter id="beamGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient faint traces always subtly visible for all 12 nodes (atmospheric wind/light traces) */}
      {Object.entries(BEAM_COORDINATES).map(([idStr, coords]) => {
        const id = Number(idStr);
        const isActive = hoveredServiceId === id;
        const d = `M ${coords.start.x} ${coords.start.y} C ${coords.ctrl1.x} ${coords.ctrl1.y}, ${coords.ctrl2.x} ${coords.ctrl2.y}, ${coords.end.x} ${coords.end.y}`;

        return (
          <g key={id}>
            {/* Subtle background ambient strand */}
            <path
              d={d}
              fill="none"
              stroke="url(#subtleTraceGrad)"
              strokeWidth="0.4"
              strokeDasharray="2 3"
              opacity={hoveredServiceId ? (isActive ? 0.9 : 0.15) : 0.35}
              vectorEffect="non-scaling-stroke"
            />

            {/* Active Highlighted Luminous Ribbon when button/cell is hovered */}
            {isActive && (
              <g filter="url(#beamGlow)">
                {/* Outer Golden Aura Blur */}
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(251, 191, 36, 0.55)"
                  strokeWidth="2.2"
                  vectorEffect="non-scaling-stroke"
                  opacity={0.85}
                />
                {/* Core Golden Beam */}
                <path
                  d={d}
                  fill="none"
                  stroke="url(#goldenBeamGrad)"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Animated Inner Traveling Dash / Light Pulse */}
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.95)"
                  strokeWidth="0.6"
                  className="animate-beam-dash"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Sparkling Star at Source Button Endpoint */}
                <circle
                  cx={coords.start.x}
                  cy={coords.start.y}
                  r="0.7"
                  fill="#FFFBEB"
                  stroke="#F59E0B"
                  strokeWidth="0.3"
                />

                {/* Glowing Star Sparkle at Target Honeycomb Node Endpoint */}
                <circle
                  cx={coords.end.x}
                  cy={coords.end.y}
                  r="0.9"
                  fill="#FFFBEB"
                  stroke="#F59E0B"
                  strokeWidth="0.4"
                />
                {/* 4-point golden sparkle star on target node */}
                <path
                  d={`M ${coords.end.x} ${coords.end.y - 1.6} L ${coords.end.x + 0.4} ${coords.end.y - 0.4} L ${coords.end.x + 1.6} ${coords.end.y} L ${coords.end.x + 0.4} ${coords.end.y + 0.4} L ${coords.end.x} ${coords.end.y + 1.6} L ${coords.end.x - 0.4} ${coords.end.y + 0.4} L ${coords.end.x - 1.6} ${coords.end.y} L ${coords.end.x - 0.4} ${coords.end.y - 0.4} Z`}
                  fill="#F59E0B"
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};
