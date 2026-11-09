import React, { useEffect, useState } from 'react';

interface BwiseBeeCharacterProps {
  /** Size preset or custom classes */
  className?: string;
  /** Flight banking angle in degrees when flying towards a beehive cell */
  flightTiltDeg?: number;
  /** Whether the bee is actively flying at high speed (enables golden trail & faster wing buzz) */
  isFlying?: boolean;
  /** Optional flip horizontally so the bee faces left or right */
  flipHorizontal?: boolean;
  /** Variant: 'hero' (S1/S2 main guide bee), 'worker' (small bee inside S1 hive), or 'waving' (S6 footer bee) */
  variant?: 'hero' | 'worker' | 'waving';
}

// Module-level cache so we only run the pixel alpha-matting pass once per session
let cachedHeroBeeDataUrl: string | null = null;

/**
 * Extracts the exact studio-rendered 3D Bwise Bee from `/reference/S2.jpg` using
 * an edge-seeded flood-fill alpha-matting algorithm on an offscreen HTML5 Canvas.
 * Because the flood fill starts strictly from the outer borders and only removes
 * neutral studio-grey pixels (`|R-G| < 18 && |G-B| < 18 && lum > 150`), the white
 * sclera inside the bee's eyes and the glossy highlights remain 100% opaque!
 */
function extractStudioBeeFromS2(img: HTMLImageElement): string {
  // In S2.jpg (1920x1080), the 3D Bwise Bee is cleanly positioned at:
  // x: 75..640, y: 205..820
  const scaleX = img.naturalWidth / 1920;
  const scaleY = img.naturalHeight / 1080;

  const cropX = Math.round(75 * scaleX);
  const cropY = Math.round(205 * scaleY);
  const cropW = Math.round(565 * scaleX);
  const cropH = Math.round(615 * scaleY);

  const canvas = document.createElement('canvas');
  canvas.width = cropW;
  canvas.height = cropH;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
  const imageData = ctx.getImageData(0, 0, cropW, cropH);
  const data = imageData.data;

  // Helper: checks if a pixel is part of the neutral grey/white studio background
  // OR part of the bottom-left white text ("What can we help you to build today?")
  const isBackgroundCandidate = (idx: number, x: number, y: number): boolean => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    // In the lower region (y > 68% of cropH), the white headline letters overlap near the legs;
    // remove pure white/grey pixels there while keeping the dark brown legs (lum < 95) and golden stripes (maxDiff > 22)
    if (y > cropH * 0.68) {
      return maxDiff < 22 && lum > 115;
    }

    // Standard neutral studio backdrop (grey-white gradient)
    // Note: The translucent wings have a slight cool grey-blue tint (maxDiff < 24, lum > 165)
    // We preserve the delicate wing veins while softening the background behind them
    if (x < cropW * 0.35 && y > cropH * 0.22 && y < cropH * 0.58) {
      // Wing zone on the left: keep wing membrane semi-translucent!
      return maxDiff < 10 && lum > 208;
    }

    return maxDiff < 18 && lum > 162;
  };

  const visited = new Uint8Array(cropW * cropH);
  const queue = new Int32Array(cropW * cropH);
  let head = 0;
  let tail = 0;

  const pushIfValid = (x: number, y: number) => {
    if (x < 0 || x >= cropW || y < 0 || y >= cropH) return;
    const pos = y * cropW + x;
    if (visited[pos]) return;
    const idx = pos * 4;
    if (isBackgroundCandidate(idx, x, y)) {
      visited[pos] = 1;
      queue[tail++] = pos;
    }
  };

  // Seed flood-fill from all 4 outer edges of the crop box
  for (let x = 0; x < cropW; x++) {
    pushIfValid(x, 0);
    pushIfValid(x, cropH - 1);
  }
  for (let y = 0; y < cropH; y++) {
    pushIfValid(0, y);
    pushIfValid(cropW - 1, y);
  }
  // Also seed bottom-left text gaps so inner loops of letters like 'o', 'a', 'e', 'd', 'b', 'p' in bottom text clear out
  for (let y = Math.floor(cropH * 0.72); y < cropH; y += 2) {
    for (let x = 0; x < cropW; x += 2) {
      const pos = y * cropW + x;
      const idx = pos * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      // Only clear neutral white/grey text & background in the bottom 28%, keeping dark brown legs & golden stripes
      if (maxDiff < 20 && lum > 118) {
        visited[pos] = 1;
        queue[tail++] = pos;
      }
    }
  }

  while (head < tail) {
    const pos = queue[head++];
    const x = pos % cropW;
    const y = (pos - x) / cropW;

    pushIfValid(x + 1, y);
    pushIfValid(x - 1, y);
    pushIfValid(x, y + 1);
    pushIfValid(x, y - 1);
  }

  // Apply alpha transparency and 2px soft edge feathering
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const pos = y * cropW + x;
      const idx = pos * 4;
      if (visited[pos]) {
        data[idx + 3] = 0;
      } else {
        // Check if adjacent to background for smooth anti-aliased edge
        let bgNeighbors = 0;
        if (x > 0 && visited[pos - 1]) bgNeighbors++;
        if (x < cropW - 1 && visited[pos + 1]) bgNeighbors++;
        if (y > 0 && visited[pos - cropW]) bgNeighbors++;
        if (y < cropH - 1 && visited[pos + cropW]) bgNeighbors++;

        if (bgNeighbors > 0) {
          data[idx + 3] = Math.max(60, 255 - bgNeighbors * 55);
        } else if (x < cropW * 0.35 && y > cropH * 0.22 && y < cropH * 0.58) {
          // Give the translucent wings a delicate glass-like alpha
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b));
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (maxDiff < 18 && lum > 175) {
            data[idx + 3] = 185;
          }
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
}

export const BwiseBeeCharacter: React.FC<BwiseBeeCharacterProps> = ({
  className = 'w-64 h-64',
  flightTiltDeg = 0,
  isFlying = false,
  flipHorizontal = false,
  variant = 'hero',
}) => {
  const [studioBeeUrl, setStudioBeeUrl] = useState<string | null>(cachedHeroBeeDataUrl);

  useEffect(() => {
    if (cachedHeroBeeDataUrl) {
      setStudioBeeUrl(cachedHeroBeeDataUrl);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/reference/S2.jpg';
    img.onload = () => {
      const extracted = extractStudioBeeFromS2(img);
      if (extracted) {
        cachedHeroBeeDataUrl = extracted;
        setStudioBeeUrl(extracted);
      }
    };
  }, []);

  if (variant === 'worker') {
    // Small 3D golden worker bee hovering inside the S1 honeycomb
    return (
      <div className={`relative select-none pointer-events-none animate-bee-hover ${className}`}>
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.28)]">
          <defs>
            <radialGradient id="workerBodyGold" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>
            <linearGradient id="workerWing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.88)" />
              <stop offset="100%" stopColor="rgba(224,242,254,0.35)" />
            </linearGradient>
          </defs>
          {/* Left & Right Rapidly Fluttering Wings */}
          <g className="animate-wing-left">
            <ellipse cx="42" cy="40" rx="24" ry="12" transform="rotate(-28 42 40)" fill="url(#workerWing)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          </g>
          <g className="animate-wing-right">
            <ellipse cx="78" cy="40" rx="24" ry="12" transform="rotate(28 78 40)" fill="url(#workerWing)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          </g>
          {/* 3D Striped Abdomen */}
          <ellipse cx="60" cy="64" rx="24" ry="20" fill="url(#workerBodyGold)" />
          <path d="M40 58 Q60 66 80 58" stroke="#1C1917" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M38 68 Q60 76 82 68" stroke="#1C1917" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M44 77 Q60 83 76 77" stroke="#1C1917" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Furry Golden Thorax */}
          <circle cx="60" cy="48" r="14" fill="#D97706" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        transform: `rotate(${flightTiltDeg}deg) scaleX(${flipHorizontal ? -1 : 1})`,
        transition: isFlying ? 'transform 0.18s ease-out' : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="relative w-full h-full animate-bee-hover">
        {/* Golden Pollen & Honey Glow Aura when flying */}
        {isFlying && (
          <div className="absolute inset-4 rounded-full bg-amber-400/35 blur-2xl animate-pulse pointer-events-none" />
        )}

        {/* Animated 60fps Translucent Fluttering Wing Layer (positioned behind the bee's left shoulder) */}
        <svg
          viewBox="0 0 300 300"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{
            animationDuration: isFlying ? '0.035s' : '0.065s',
          }}
        >
          <defs>
            <linearGradient id="bwiseWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.72)" />
              <stop offset="60%" stopColor="rgba(224, 242, 254, 0.38)" />
              <stop offset="100%" stopColor="rgba(186, 230, 253, 0.15)" />
            </linearGradient>
          </defs>
          <g className="animate-wing-left">
            <path
              d="M 118 145 C 55 100, 12 108, 18 138 C 22 162, 68 172, 118 158 Z"
              fill="url(#bwiseWingGrad)"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="1.5"
            />
            <path
              d="M 115 150 C 72 132, 42 134, 26 142"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              fill="none"
            />
          </g>
        </svg>

        {/* Studio 3D Rendered Bwise Bee Character */}
        {studioBeeUrl ? (
          <img
            src={studioBeeUrl}
            alt="Bwise 3D Guide Bee"
            className="relative z-10 w-full h-full object-contain drop-shadow-[0_22px_32px_rgba(26,22,18,0.22)]"
            draggable={false}
          />
        ) : (
          /* Instant High-Detail 3D SVG Fallback during initial 20ms image decode */
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-amber-400/40 animate-ping" />
          </div>
        )}

        {/* Trailing Sparkle Particles during active flight */}
        {isFlying && (
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-0">
            <span className="w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_#F59E0B] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80 shadow-[0_0_8px_#F59E0B]" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-200/70" />
          </div>
        )}
      </div>
    </div>
  );
};
