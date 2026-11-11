import React, { useEffect, useRef } from 'react';

interface HoneycombTunnelCanvasProps {
  /** Called automatically when the warp tunnel animation completes */
  onComplete?: () => void;
  /** Duration in milliseconds (matches the 00:03-00:04 tunnel rush in Sample Video Idea.mp4) */
  durationMs?: number;
  serviceTitle?: string;
}

/**
 * Reproduces the 3D Hexagonal Honeycomb Warp Tunnel from `Sample Video Idea.mp4` (00:03–00:04).
 * Renders concentric 3D hexagonal rings with glowing amber/gold honeycomb panels, radial speed lines,
 * and the Bwise Bee flying down the center into the illuminated room ahead.
 */
export const HoneycombTunnelCanvas: React.FC<HoneycombTunnelCanvasProps> = ({
  onComplete,
  durationMs = 1550,
  serviceTitle = 'Service Studio',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    // Pre-generate honeycomb cell color palette for the 6 tunnel walls
    const cellPalette = [
      '#F59E0B', // Warm Amber
      '#FBBF24', // Golden Honey
      '#FEF08A', // Bright Glow Yellow
      '#B45309', // Deep Honey Bronze
      '#78350F', // Rich Hive Wood
      '#D97706', // Burnt Gold
    ];

    const numRings = 16;
    const speedStreaks = Array.from({ length: 36 }, (_, i) => ({
      angle: (i / 36) * Math.PI * 2 + (i % 3) * 0.08,
      offset: (i * 0.17) % 1,
      length: 0.25 + (i % 4) * 0.08,
    }));

    const drawHexagon = (cx: number, cy: number, radius: number, rotation = 0) => {
      ctx.beginPath();
      for (let s = 0; s < 6; s++) {
        const angle = (s * Math.PI) / 3 + rotation;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxRadius = Math.hypot(w, h) * 0.72;

      // Warm dark amber tunnel background
      const bgGrad = ctx.createRadialGradient(cx, cy, maxRadius * 0.04, cx, cy, maxRadius);
      bgGrad.addColorStop(0, '#FFFBEB');
      bgGrad.addColorStop(0.16, '#FDE68A');
      bgGrad.addColorStop(0.38, '#B45309');
      bgGrad.addColorStop(1, '#291507');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Camera forward velocity increases exponentially for warp rush feel
      const cameraTravel = progress * 4.2;
      const tunnelRotation = Math.sin(progress * Math.PI) * 0.14;

      // Draw concentric 3D Hexagonal Tunnel Rings from back to front
      for (let i = numRings - 1; i >= 0; i--) {
        // Normalized depth z in (0..1], wrapping as camera rushes forward
        let z = ((i / numRings) - (cameraTravel % 1) + 1) % 1;
        if (z < 0.03) z += 1;

        const nextZ = Math.min(1.15, z + 1 / numRings);
        // Perspective projection: radius scales inversely/quadratically with depth
        const rInner = Math.pow(z, 2.05) * maxRadius + maxRadius * 0.045;
        const rOuter = Math.pow(nextZ, 2.05) * maxRadius + maxRadius * 0.045;

        // Draw each of the 6 trapezoidal wall panels of this tunnel ring
        for (let side = 0; side < 6; side++) {
          const a1 = (side * Math.PI) / 3 + tunnelRotation;
          const a2 = ((side + 1) * Math.PI) / 3 + tunnelRotation;

          const x1In = cx + Math.cos(a1) * rInner;
          const y1In = cy + Math.sin(a1) * rInner;
          const x2In = cx + Math.cos(a2) * rInner;
          const y2In = cy + Math.sin(a2) * rInner;

          const x1Out = cx + Math.cos(a1) * rOuter;
          const y1Out = cy + Math.sin(a1) * rOuter;
          const x2Out = cx + Math.cos(a2) * rOuter;
          const y2Out = cy + Math.sin(a2) * rOuter;

          // Subdivide each wall panel into 3 honeycomb sub-facets
          const subCols = 3;
          for (let c = 0; c < subCols; c++) {
            const t1 = c / subCols;
            const t2 = (c + 1) / subCols;

            const p1x = x1In + (x2In - x1In) * t1;
            const p1y = y1In + (y2In - y1In) * t1;
            const p2x = x1In + (x2In - x1In) * t2;
            const p2y = y1In + (y2In - y1In) * t2;
            const p3x = x1Out + (x2Out - x1Out) * t2;
            const p3y = y1Out + (y2Out - y1Out) * t2;
            const p4x = x1Out + (x2Out - x1Out) * t1;
            const p4y = y1Out + (y2Out - y1Out) * t1;

            const colorIndex = (i * 5 + side * 3 + c) % cellPalette.length;
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.lineTo(p3x, p3y);
            ctx.lineTo(p4x, p4y);
            ctx.closePath();

            ctx.fillStyle = cellPalette[colorIndex];
            ctx.globalAlpha = Math.min(0.92, 0.25 + z * 0.75);
            ctx.fill();

            ctx.lineWidth = Math.max(1.5, z * 5 * window.devicePixelRatio);
            ctx.strokeStyle = '#451A03';
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      // Draw bright golden-white radial warp speed streaks (exact match for 00:04 in Sample Video Idea.mp4)
      speedStreaks.forEach((streak) => {
        const sProg = (streak.offset + cameraTravel * 1.35) % 1;
        const rStart = Math.pow(sProg, 2) * maxRadius * 0.85 + maxRadius * 0.08;
        const rEnd = rStart + Math.pow(sProg, 1.6) * maxRadius * streak.length;

        const x1 = cx + Math.cos(streak.angle) * rStart;
        const y1 = cy + Math.sin(streak.angle) * rStart;
        const x2 = cx + Math.cos(streak.angle) * rEnd;
        const y2 = cy + Math.sin(streak.angle) * rEnd;

        const lineGrad = ctx.createLinearGradient(x1, y1, x2, y2);
        lineGrad.addColorStop(0, 'rgba(254, 240, 138, 0)');
        lineGrad.addColorStop(0.5, 'rgba(254, 249, 195, 0.92)');
        lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0.98)');

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = (2 + sProg * 4) * window.devicePixelRatio;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      // Draw bright hexagonal portal opening at the center (expanding at the end of the tunnel)
      const portalScale = progress > 0.65 ? 1 + Math.pow((progress - 0.65) / 0.35, 2.2) * 14 : 1;
      const portalRadius = maxRadius * 0.085 * portalScale;
      drawHexagon(cx, cy, portalRadius, tunnelRotation);
      ctx.fillStyle = '#FFFBEB';
      ctx.shadowColor = '#FEF08A';
      ctx.shadowBlur = 45 * window.devicePixelRatio;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw the 3D Bwise Bee from behind flying down the center of the tunnel (matching 00:04 in video)
      if (progress < 0.88) {
        const beeScale = (1 - progress * 0.32) * window.devicePixelRatio;
        const beeBobY = Math.sin(elapsed * 0.018) * 10 * window.devicePixelRatio;
        const beeX = cx;
        const beeY = cy + beeBobY + 18 * beeScale;

        ctx.save();
        ctx.translate(beeX, beeY);
        ctx.scale(beeScale, beeScale);

        // Rapidly fluttering translucent wings
        const wingAngle = Math.sin(elapsed * 0.09) * 0.42;
        ctx.save();
        ctx.translate(-32, -18);
        ctx.rotate(-0.35 + wingAngle);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
        ctx.beginPath();
        ctx.ellipse(-28, 0, 42, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(32, -18);
        ctx.rotate(0.35 - wingAngle);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
        ctx.beginPath();
        ctx.ellipse(28, 0, 42, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Bee Head & Antennae
        ctx.strokeStyle = '#1C1917';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-12, -45);
        ctx.quadraticCurveTo(-22, -68, -30, -64);
        ctx.moveTo(12, -45);
        ctx.quadraticCurveTo(22, -68, 30, -64);
        ctx.stroke();

        ctx.fillStyle = '#292018';
        ctx.beginPath();
        ctx.arc(0, -30, 26, 0, Math.PI * 2);
        ctx.fill();

        // Furry Golden Collar
        ctx.fillStyle = '#D97706';
        ctx.beginPath();
        ctx.ellipse(0, -10, 32, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Rear 3D Striped Abdomen (matching the exact circular golden/black ring view in 00:04)
        ctx.fillStyle = '#1C1917';
        ctx.beginPath();
        ctx.arc(0, 14, 38, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(0, 14, 30, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#292018';
        ctx.beginPath();
        ctx.arc(0, 14, 21, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      } else if (onComplete) {
        onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [durationMs, onComplete]);

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden flex items-center justify-center bg-amber-950">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-stone-950/75 backdrop-blur-md border border-amber-400/40 text-amber-100 text-sm font-semibold tracking-wide shadow-2xl flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
        Flying into the <span className="text-amber-300 font-bold">{serviceTitle}</span> Hive Studio...
      </div>
    </div>
  );
};
