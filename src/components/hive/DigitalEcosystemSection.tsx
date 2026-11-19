import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '../motion/ScrollReveal';
import { soundFX } from '../../utils/soundEffects';

/** Small glowing golden 7-cell honeycomb cluster icon matching the reference card badges */
const HoneycombClusterBadge: React.FC = () => (
  <svg
    className="w-10 h-10 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.55)]"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
  >
    {[
      [24, 24],
      [24, 12],
      [24, 36],
      [13.6, 18],
      [34.4, 18],
      [13.6, 30],
      [34.4, 30],
    ].map(([cx, cy], idx) => {
      const r = 5.4;
      const pts = Array.from({ length: 6 }, (_, k) => {
        const a = (Math.PI / 3) * k - Math.PI / 6;
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      }).join(' ');
      return (
        <polygon
          key={idx}
          points={pts}
          fill={idx === 0 ? 'rgba(251, 191, 36, 0.28)' : 'rgba(245, 158, 11, 0.14)'}
          stroke={idx === 0 ? '#FDE68A' : '#F59E0B'}
          strokeWidth="1.2"
        />
      );
    })}
  </svg>
);

type EcosystemCanvasKind = 'mesh' | 'waves' | 'orb';

const EcosystemCanvas: React.FC<{ kind: EcosystemCanvasKind }> = ({ kind }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 360;
    let height = 200;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 200);
      height = Math.max(rect.height, 140);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    // Precompute orb Fibonacci sphere particles for 'orb' kind
    const orbParticles =
      kind === 'orb'
        ? Array.from({ length: 190 }, (_, i) => {
            const phi = Math.acos(1 - (2 * (i + 0.5)) / 190);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            return {
              x: Math.sin(phi) * Math.cos(theta),
              y: Math.cos(phi),
              z: Math.sin(phi) * Math.sin(theta),
              bright: i % 5 === 0,
            };
          })
        : [];

    const drawMesh = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cols = 20;
      const rows = 11;
      const projected: { x: number; y: number; h: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        projected[r] = [];
        const v = r / (rows - 1); // depth 0 (back) -> 1 (front)
        for (let c = 0; c < cols; c++) {
          const u = c / (cols - 1);
          const wave =
            Math.sin(u * 6.2 + t * 1.15 + v * 3.0) * 18 +
            Math.cos(v * 5.2 - t * 0.9 + u * 2.4) * 12 +
            Math.sin((u + v) * 8.0 - t * 0.7) * 6;

          const perspective = 0.65 + v * 0.55;
          const baseX = width * 0.24 + (u - 0.1) * width * 0.96 * perspective;
          const baseY = height * 0.26 + v * height * 0.64 - wave * (0.55 + v * 0.45);
          projected[r][c] = { x: baseX, y: baseY, h: wave };
        }
      }

      ctx.lineWidth = 0.95;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = projected[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        const alpha = 0.16 + (r / rows) * 0.48;
        ctx.strokeStyle = `rgba(245, 158, 11, ${alpha.toFixed(2)})`;
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = projected[r][c];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.22)';
        ctx.stroke();
      }

      // Luminous crest vertex dots
      for (let r = 1; r < rows; r += 2) {
        for (let c = 1; c < cols; c += 2) {
          const pt = projected[r][c];
          const glow = pt.h > 8 ? 0.9 : 0.42;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.h > 8 ? 1.8 : 1.15, 0, Math.PI * 2);
          ctx.fillStyle = pt.h > 8 ? `rgba(255, 243, 196, ${glow})` : `rgba(245, 158, 11, ${glow})`;
          ctx.fill();
        }
      }
    };

    const drawWaves = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const midY = height * 0.56;
      const layerCount = 9;

      for (let l = 0; l < layerCount; l++) {
        const frac = l / (layerCount - 1);
        const isAmber = l >= 3;
        ctx.beginPath();

        for (let x = width * 0.14; x <= width; x += 4) {
          const nx = (x - width * 0.14) / (width * 0.86);
          const env = Math.sin(nx * Math.PI) ** 1.25;
          const amp = (28 + Math.sin(nx * 5.5 - t * 1.1) * 16) * env;
          const freq = Math.sin(nx * 13.5 - t * (1.35 + frac * 0.35) + l * 0.32);
          const harmonic = Math.cos(nx * 24 - t * 1.8 + l * 0.45) * 0.28;
          const y = midY + (freq + harmonic) * amp + (frac - 0.5) * 18;
          if (x === width * 0.14) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        if (isAmber) {
          const grad = ctx.createLinearGradient(width * 0.14, 0, width, 0);
          grad.addColorStop(0, 'rgba(245, 158, 11, 0.05)');
          grad.addColorStop(0.55, `rgba(251, 191, 36, ${(0.25 + frac * 0.55).toFixed(2)})`);
          grad.addColorStop(1, 'rgba(234, 88, 12, 0.18)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = l === layerCount - 1 ? 1.8 : 1.05;
        } else {
          ctx.strokeStyle = `rgba(148, 163, 184, ${(0.14 + frac * 0.2).toFixed(2)})`;
          ctx.lineWidth = 0.9;
        }
        ctx.stroke();
      }

      // Highlight glowing amber peak nodes on the main wave
      for (let k = 0; k < 4; k++) {
        const nx = 0.32 + k * 0.16;
        const x = width * 0.14 + nx * width * 0.86;
        const env = Math.sin(nx * Math.PI) ** 1.25;
        const amp = (28 + Math.sin(nx * 5.5 - t * 1.1) * 16) * env;
        const y = midY + Math.sin(nx * 13.5 - t * 1.7 + 2.56) * amp + 8;

        const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
        g.addColorStop(0, 'rgba(255, 248, 220, 0.95)');
        g.addColorStop(0.4, 'rgba(245, 158, 11, 0.45)');
        g.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawOrb = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.68;
      const cy = height * 0.52;
      const radius = Math.min(width, height) * 0.36;

      // Subtle background floating translucent hexagons
      const hexBg = [
        { x: cx - radius * 1.35, y: cy - radius * 0.35, r: 24, rot: t * 0.12 },
        { x: cx + radius * 1.12, y: cy + radius * 0.45, r: 19, rot: -t * 0.15 },
      ];
      for (const hb of hexBg) {
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (Math.PI / 3) * k + hb.rot;
          const hx = hb.x + hb.r * Math.cos(a);
          const hy = hb.y + hb.r * Math.sin(a);
          if (k === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(245, 158, 11, 0.06)';
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.22)';
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      }

      // Warm radial glow core
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.55);
      halo.addColorStop(0, 'rgba(245, 158, 11, 0.24)');
      halo.addColorStop(0.6, 'rgba(234, 88, 12, 0.06)');
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.55, 0, Math.PI * 2);
      ctx.fill();

      // Subtle tilted orbital ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.24, radius * 0.42, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Rotate Fibonacci particle sphere
      const rotY = t * 0.48;
      const rotX = 0.28 + Math.sin(t * 0.35) * 0.12;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (const p of orbParticles) {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const depth = (z2 + 1.2) / 2.2;
        const sx = cx + x1 * radius;
        const sy = cy + y2 * radius;
        const size = (p.bright ? 2.0 : 1.25) * (0.6 + depth * 0.65);
        const alpha = 0.15 + depth * 0.8;

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = p.bright
          ? `rgba(255, 246, 210, ${alpha.toFixed(2)})`
          : `rgba(245, 158, 11, ${alpha.toFixed(2)})`;
        ctx.fill();
      }
    };

    const render = (t: number) => {
      if (kind === 'mesh') drawMesh(t);
      else if (kind === 'waves') drawWaves(t);
      else drawOrb(t);
    };

    render(0);

    let animId = 0;
    let time = 0;
    let last = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (!isVisible) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;
      render(time);
    };

    if (!prefersReduced) {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
    };
  }, [kind]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

const ECOSYSTEM_CARDS: {
  slug: string;
  title: string;
  subtitle: string;
  kind: EcosystemCanvasKind;
}[] = [
  {
    slug: 'software-solutions',
    title: 'Software Architecture',
    subtitle: '3D visual mesh',
    kind: 'mesh',
  },
  {
    slug: 'social-media-marketing',
    title: 'Data-Driven Marketing',
    subtitle: 'Fluctuating data waves',
    kind: 'waves',
  },
  {
    slug: 'digital-strategy-ideas',
    title: 'Creative Innovation',
    subtitle: 'Interactive 3D geometry',
    kind: 'orb',
  },
];

export const DigitalEcosystemSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="digital-ecosystem"
      className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 pt-2 pb-16 sm:pb-20 scroll-mt-24"
    >
      <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
        <h2 className="font-tech text-2xl sm:text-[28px] font-semibold tracking-tight text-white">
          Our Digital Ecosystem
        </h2>
        <span className="text-xs font-tech uppercase tracking-[0.2em] text-amber-400/80">
          3 Core Divisions · 12 Connected Pods
        </span>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6" stagger={0.1}>
        {ECOSYSTEM_CARDS.map((card, idx) => (
          <StaggerItem key={card.slug} distance={24}>
            <button
              type="button"
              onClick={() => {
                soundFX.playClickChime(520 + idx * 60);
                navigate(`/services?category=${card.slug}#${card.slug}`);
              }}
              className="group relative w-full h-[210px] sm:h-[225px] text-left rounded-2xl glass-cyber-card border border-white/12 hover:border-amber-400/55 overflow-hidden transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(245,158,11,0.16)] cursor-pointer flex flex-col justify-between p-5 sm:p-6"
            >
              {/* Subtle top-edge frosted glass sheen */}
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Live Animated Card Canvas */}
              <EcosystemCanvas kind={card.kind} />

              {/* Diagonal readability gradient over left side so typography stays razor-sharp */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#080C17]/90 via-[#080C17]/40 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Top Row: Mini Glowing Honeycomb Badge + Hover Arrow */}
              <div className="relative z-10 flex items-start justify-between">
                <HoneycombClusterBadge />
                <span className="w-8 h-8 rounded-full bg-white/[0.06] group-hover:bg-amber-400 text-slate-300 group-hover:text-stone-950 border border-white/10 group-hover:border-amber-300 flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

              {/* Bottom Title & Descriptor */}
              <div className="relative z-10">
                <h3 className="font-tech text-lg sm:text-[19px] font-semibold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{card.subtitle}</p>
              </div>
            </button>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
};
