import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Megaphone, Lightbulb, ArrowRight, Sparkles, Atom } from 'lucide-react';
import { MAIN_SERVICE_CATEGORIES } from '../../data/servicesData';
import { CyberBeeWireframe } from './CyberBeeWireframe';
import { useConsultationModal } from '../../context/ConsultationModalContext';
import { soundFX } from '../../utils/soundEffects';

interface HiveHexNode {
  id: string;
  label: string;
  subLabel: string;
  isIconNode?: boolean;
  /** Position in % on the isometric platform surface */
  leftPct: number;
  topPct: number;
  /** Route on /services when clicked */
  targetRoute: string;
  /** Parent core category slug */
  categorySlug: 'software-solutions' | 'social-media-marketing' | 'digital-strategy-ideas';
  /** Code snippet shown in the terminal widget when hovered */
  codeCall: string;
  /** Active telemetry metrics when hovered */
  growthStat: string;
  uptimeStat: string;
  projectsStat: string;
  /** Related sprint row index to highlight */
  sprintHighlightIdx: number;
}

const HIVE_HEX_NODES: HiveHexNode[] = [
  {
    id: 'core-web',
    label: 'Web',
    subLabel: 'React & Cloud',
    isIconNode: true,
    leftPct: 50,
    topPct: 22,
    targetRoute: '/services?category=software-solutions&service=web-development#web-development',
    categorySlug: 'software-solutions',
    codeCall: 'deployWebCore({ ssr: true })',
    growthStat: '+168%',
    uptimeStat: '99.99%',
    projectsStat: '18+',
    sprintHighlightIdx: 0,
  },
  {
    id: 'software',
    label: 'Software',
    subLabel: 'Full-Stack & Apps',
    leftPct: 28,
    topPct: 36,
    targetRoute: '/services?category=software-solutions#software-solutions',
    categorySlug: 'software-solutions',
    codeCall: 'buildSoftwareEcosystem()',
    growthStat: '+156%',
    uptimeStat: '99.9%',
    projectsStat: '15+',
    sprintHighlightIdx: 0,
  },
  {
    id: 'seo-geo',
    label: 'SEO / GEO',
    subLabel: 'Search & QA',
    leftPct: 72,
    topPct: 36,
    targetRoute: '/services?category=software-solutions&service=search-engine-optimisation#search-engine-optimisation',
    categorySlug: 'software-solutions',
    codeCall: 'optimizeSearchEngineAI()',
    growthStat: '+210%',
    uptimeStat: '99.9%',
    projectsStat: '14+',
    sprintHighlightIdx: 1,
  },
  {
    id: 'ui-ux',
    label: 'UI/UX',
    subLabel: 'Design Systems',
    leftPct: 50,
    topPct: 50,
    targetRoute: '/services?category=software-solutions&service=ui-ux-design#ui-ux-design',
    categorySlug: 'software-solutions',
    codeCall: 'renderDesignSystem3D()',
    growthStat: '+164%',
    uptimeStat: '99.9%',
    projectsStat: '12+',
    sprintHighlightIdx: 1,
  },
  {
    id: 'data',
    label: 'Data',
    subLabel: 'Digital Analytics',
    leftPct: 28,
    topPct: 64,
    targetRoute: '/services?category=digital-strategy-ideas&service=digital-analytics#digital-analytics',
    categorySlug: 'digital-strategy-ideas',
    codeCall: 'streamAnalyticsPipeline()',
    growthStat: '+175%',
    uptimeStat: '99.95%',
    projectsStat: '12+',
    sprintHighlightIdx: 2,
  },
  {
    id: 'ai',
    label: 'AI',
    subLabel: 'AIO & Agents',
    leftPct: 72,
    topPct: 64,
    targetRoute: '/services?category=software-solutions&service=artificial-intelligence-optimization#artificial-intelligence-optimization',
    categorySlug: 'software-solutions',
    codeCall: 'invokeNeuralAgentHive()',
    growthStat: '+192%',
    uptimeStat: '99.9%',
    projectsStat: '12+',
    sprintHighlightIdx: 2,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    subLabel: 'Social & Brand',
    leftPct: 50,
    topPct: 78,
    targetRoute: '/services?category=social-media-marketing#social-media-marketing',
    categorySlug: 'social-media-marketing',
    codeCall: 'scaleGrowthCampaigns()',
    growthStat: '+184%',
    uptimeStat: '99.9%',
    projectsStat: '20+',
    sprintHighlightIdx: 3,
  },
];

const LEFT_SPRINT_TASKS = [
  { id: 'l1', label: 'Deploying', badge: 'Deploying', dotColor: 'bg-emerald-400 shadow-[0_0_8px_#34D399]', badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
  { id: 'l2', label: 'Testing', badge: 'Deployed', dotColor: 'bg-amber-400 shadow-[0_0_8px_#FBBF24]', badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' },
  { id: 'l3', label: 'Deploying', badge: 'Testing', dotColor: 'bg-slate-400', badgeStyle: 'bg-rose-500/20 text-rose-300 border-rose-400/30' },
  { id: 'l4', label: 'Testing', badge: 'Testing', dotColor: 'bg-slate-500', badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
];

const RIGHT_SPRINT_TASKS = [
  { id: 'r1', label: 'Deploying', badge: 'Deploying', dotColor: 'bg-emerald-400 shadow-[0_0_8px_#34D399]', badgeStyle: 'bg-sky-500/25 text-sky-300 border-sky-400/35' },
  { id: 'r2', label: 'Testing', badge: '', dotColor: 'bg-amber-400 shadow-[0_0_8px_#FBBF24]', badgeStyle: '' },
  { id: 'r3', label: 'Deployed', badge: 'Testing', dotColor: 'bg-rose-400 shadow-[0_0_8px_#FB7185]', badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
];

export const BeehiveLandingExperience: React.FC = () => {
  const navigate = useNavigate();
  const { openConsultationModal } = useConsultationModal();

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const [isStatsHovered, setIsStatsHovered] = useState<boolean>(false);
  const [graphPhase, setGraphPhase] = useState<number>(0);
  const [activeSprintCycle, setActiveSprintCycle] = useState<number>(0);

  // Physics-based Cyber-Bee position (% inside the right isometric stage)
  // Default resting perch is upper-right above the hive matching the reference image
  const [beeState, setBeeState] = useState<{ x: number; y: number; tilt: number }>({
    x: 68,
    y: 23,
    tilt: -4,
  });
  const beeTargetRef = useRef<{ x: number; y: number }>({ x: 68, y: 23 });
  const beeCurrentRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 68,
    y: 23,
    vx: 0,
    vy: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiveStageRef = useRef<HTMLDivElement | null>(null);

  const activeNode = HIVE_HEX_NODES.find((n) => n.id === hoveredNodeId) || null;

  // Live fluctuating sparkline animation & sprint activity pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphPhase((prev) => (prev + 1) % 360);
    }, 90);
    const sprintTimer = setInterval(() => {
      setActiveSprintCycle((prev) => (prev + 1) % 4);
    }, 2600);
    return () => {
      clearInterval(interval);
      clearInterval(sprintTimer);
    };
  }, []);

  // Spring physics loop for the Cyber-Bee tracking cursor & hovered hex nodes
  useEffect(() => {
    let rafId: number;
    const updateBeePhysics = () => {
      const cur = beeCurrentRef.current;
      const tgt = beeTargetRef.current;

      const stiffness = 0.085;
      const damping = 0.78;

      const ax = (tgt.x - cur.x) * stiffness;
      const ay = (tgt.y - cur.y) * stiffness;

      cur.vx = (cur.vx + ax) * damping;
      cur.vy = (cur.vy + ay) * damping;
      cur.x += cur.vx;
      cur.y += cur.vy;

      const tilt = Math.max(-18, Math.min(18, cur.vx * 9 - 3));
      setBeeState({
        x: cur.x,
        y: cur.y,
        tilt,
      });

      rafId = requestAnimationFrame(updateBeePhysics);
    };

    rafId = requestAnimationFrame(updateBeePhysics);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Update bee target when hovering a hexagonal node
  useEffect(() => {
    if (activeNode) {
      // Bee flutters just above-right of the hovered node to "build" it
      beeTargetRef.current = {
        x: Math.min(78, Math.max(32, activeNode.leftPct + 12)),
        y: Math.min(54, Math.max(16, activeNode.topPct - 18)),
      };
    } else {
      beeTargetRef.current = { x: 68, y: 23 };
    }
  }, [activeNode]);

  // Background Golden Particle Dust & Thread WebGL/2D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const particles = Array.from({ length: 58 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45 - 0.15,
      r: Math.random() * 1.9 + 0.6,
      alpha: Math.random() * 0.65 + 0.2,
    }));

    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx.fill();

        // Connect nearby golden particles with faint cyber threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 9500) {
            const lineAlpha = (1 - distSq / 9500) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(renderParticles);
    };

    animId = requestAnimationFrame(renderParticles);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleHiveMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeNode || !hiveStageRef.current) return;
    const rect = hiveStageRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 100;
    const relY = ((e.clientY - rect.top) / rect.height) * 100;
    // Subtle magnetic attraction toward cursor when hovering over the right stage
    beeTargetRef.current = {
      x: 68 + (relX - 55) * 0.22,
      y: 23 + (relY - 45) * 0.18,
    };
  };

  const handleHiveMouseLeave = () => {
    if (!activeNode) {
      beeTargetRef.current = { x: 68, y: 23 };
    }
  };

  // Dynamic SVG sparkline path generator for the "Active Node" module
  const buildSparklinePath = (seedOffset: number, speedMultiplier: number) => {
    const phase = (graphPhase * (isStatsHovered || activeNode ? 2.2 : 1.0) * speedMultiplier + seedOffset) * 0.08;
    const pts: Array<[number, number]> = [];
    const baseHeights = [30, 26, 28, 21, 24, 15, 20, 12, 17, 8, 14];
    for (let i = 0; i < baseHeights.length; i++) {
      const x = (i / (baseHeights.length - 1)) * 120;
      const wave = Math.sin(phase + i * 0.85) * (isStatsHovered || activeNode ? 5.5 : 3.0);
      const y = Math.max(4, Math.min(36, baseHeights[i] + wave));
      pts.push([x, y]);
    }
    const lineD = pts.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
    const areaD = `${lineD} L 120 40 L 0 40 Z`;
    return { lineD, areaD };
  };

  const graphLeft = buildSparklinePath(0, 1);
  const graphRight = buildSparklinePath(45, 1.25);

  return (
    <section
      data-theme="dark"
      className="relative w-full min-h-screen bg-[#090B10] text-white overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 pb-14 select-none"
    >
      {/* ===================================================================
          1. FUTURISTIC DARK-MODE ARCHITECTURAL GRID & CODE WATERMARK CANVAS
         =================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      {/* Ambient Golden-Amber Volumetric Glows */}
      <div className="absolute top-[18%] left-[12%] w-[420px] h-[420px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[22%] right-[10%] w-[560px] h-[560px] rounded-full bg-amber-500/18 blur-[150px] pointer-events-none" />

      {/* Faint Background Code Syntax Watermarks on Left (matching reference image) */}
      <pre
        aria-hidden="true"
        className="hidden lg:block absolute top-24 left-12 font-mono text-[11px] leading-relaxed text-slate-400/[0.07] pointer-events-none select-none"
      >
        {`const HiveCluster = () => {\n  return (\n    <BWiseEcosystem\n      mode="cyber-physical"\n      nodes={12}\n    />\n  );\n};`}
      </pre>
      <pre
        aria-hidden="true"
        className="hidden lg:block absolute bottom-8 left-10 font-mono text-[11px] leading-relaxed text-slate-400/[0.08] pointer-events-none select-none"
      >
        {`const BWiseProject = () => {\n  const pipeline = new GrowthEngine("bwise.lk");\n  return pipeline.connect({\n    software: ["Web", "Mobile", "UI/UX", "AI"],\n    marketing: ["SEO", "Social", "Brand"]\n  });\n};`}
      </pre>

      {/* Interactive Golden Particle & Neural Thread Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* ===================================================================
          2. MAIN 2-COLUMN HERO STAGE (LEFT: COPY & CTAs | RIGHT: 3D HIVE)
         =================================================================== */}
      <div className="relative z-10 w-full max-w-[1420px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* -----------------------------------------------------------------
            LEFT COLUMN: HERO HEADLINE, SUBHEADLINE, CTAs & CORE DIVISIONS
           ----------------------------------------------------------------- */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Cyber-Physical Ecosystem</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl xl:text-[58px] font-black uppercase tracking-tight leading-[1.06] text-white"
            style={{
              textShadow: '0 0 38px rgba(245, 158, 11, 0.32)',
            }}
          >
            <span className="block">WE ENGINEER</span>
            <span className="block bg-gradient-to-r from-[#FFFFFF] via-[#FEF08A] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(251,191,36,0.45)]">
              DIGITAL BEYOND
            </span>
            <span className="block">LIMITS</span>
          </h1>

          <p className="text-sm sm:text-base xl:text-[17px] text-slate-300/90 leading-relaxed max-w-[500px] font-normal">
            High-performance software development and growth-driven digital marketing. We build the
            connected ecosystems your business needs to scale.
          </p>

          {/* Primary & Secondary Action Buttons (matching reference image) */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => {
                soundFX.playClickChime(659.25);
                openConsultationModal();
              }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FCD34D] via-[#F59E0B] to-[#D97706] hover:brightness-110 text-stone-950 font-extrabold text-sm sm:text-base shadow-[0_0_32px_rgba(245,158,11,0.55)] ring-1 ring-amber-300/80 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              Start Your Project
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClickChime(523.25);
                navigate('/portfolio');
              }}
              className="px-7 py-3.5 rounded-full bg-[#121621]/80 hover:bg-amber-500/15 text-white font-bold text-sm sm:text-base border border-amber-400/55 shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300 hover:border-amber-400 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              View Our Work
            </button>
          </div>

          {/* 3 Main Core Solutions Direct Navigation Bar (Links directly to corresponding section on Services page) */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400/90 mb-2.5">
              Core Solutions — Click to Open Division on Services Page
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {MAIN_SERVICE_CATEGORIES.map((category, idx) => {
                const isCatHovered =
                  hoveredCategorySlug === category.slug || activeNode?.categorySlug === category.slug;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      soundFX.playClickChime(520 + idx * 60);
                      navigate(`/services?category=${category.slug}#${category.slug}`);
                    }}
                    onMouseEnter={() => {
                      setHoveredCategorySlug(category.slug);
                      soundFX.playClickChime(480 + idx * 45);
                    }}
                    onMouseLeave={() => setHoveredCategorySlug(null)}
                    className={`group flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      isCatHovered
                        ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.28)] -translate-y-0.5'
                        : 'bg-white/[0.04] border-white/10 hover:border-amber-400/50 hover:bg-white/[0.07]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center shrink-0">
                        {category.slug === 'software-solutions' && <Cpu className="w-3.5 h-3.5" />}
                        {category.slug === 'social-media-marketing' && <Megaphone className="w-3.5 h-3.5" />}
                        {category.slug === 'digital-strategy-ideas' && <Lightbulb className="w-3.5 h-3.5" />}
                      </span>
                      <span className="text-xs font-extrabold text-white truncate">
                        {category.title}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            RIGHT COLUMN: "THE IMMERSIVE DIGITAL HIVE" 3D ISOMETRIC DASHBOARD
           ----------------------------------------------------------------- */}
        <div
          ref={hiveStageRef}
          onMouseMove={handleHiveMouseMove}
          onMouseLeave={handleHiveMouseLeave}
          className="lg:col-span-7 relative w-full h-[540px] sm:h-[610px] flex items-center justify-center"
        >
          {/* Top Floating Title Pill: "The Immersive Digital Hive" */}
          <div className="absolute top-1 sm:top-3 left-1/2 -translate-x-1/2 z-30">
            <div className="px-5 py-2 rounded-full bg-[#161B28]/90 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                The Immersive Digital Hive
              </span>
            </div>
          </div>

          {/* ===============================================================
              3D ISOMETRIC FLOOR TILES & GOLDEN CIRCUIT TRACES
             =============================================================== */}
          <div
            className="relative w-[330px] h-[330px] sm:w-[440px] sm:h-[440px] xl:w-[480px] xl:h-[480px] flex items-center justify-center"
            style={{
              perspective: '1200px',
            }}
          >
            {/* Isometric Rotated Base Plane */}
            <div
              className="relative w-full h-full rounded-[44px] transition-transform duration-500"
              style={{
                transform: 'rotateX(56deg) rotateZ(-45deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Outer Dark Isometric Floor Tile Grid */}
              <div
                className="absolute -inset-16 rounded-[52px] border border-amber-500/20"
                style={{
                  background: `
                    repeating-linear-gradient(0deg, rgba(245,158,11,0.12) 0px, rgba(245,158,11,0.12) 1px, transparent 1px, transparent 48px),
                    repeating-linear-gradient(90deg, rgba(245,158,11,0.12) 0px, rgba(245,158,11,0.12) 1px, transparent 1px, transparent 48px),
                    radial-gradient(circle at 50% 50%, rgba(245,158,11,0.22) 0%, rgba(15,19,29,0.95) 68%, rgba(9,11,16,0) 100%)
                  `,
                  boxShadow: '0 0 80px rgba(245, 158, 11, 0.22)',
                }}
              />

              {/* Tier 1: Outer Metallic Bevel Pedestal */}
              <div
                className="absolute inset-2 rounded-[42px] bg-gradient-to-br from-[#232733] via-[#141720] to-[#0D0F17] border-2 border-amber-400/50"
                style={{
                  boxShadow:
                    '14px 14px 0px #0B0D14, 24px 24px 45px rgba(0,0,0,0.85), inset 0 0 28px rgba(245,158,11,0.35)',
                }}
              />

              {/* Tier 2: Glowing Golden Circuit Conduit Track */}
              <div
                className="absolute inset-7 rounded-[34px] bg-gradient-to-br from-[#2C2416] via-[#191612] to-[#12100E] border-2 border-amber-400"
                style={{
                  boxShadow:
                    '8px 8px 0px #1C1610, 0 0 35px rgba(251, 191, 36, 0.55), inset 0 0 32px rgba(245, 158, 11, 0.45)',
                }}
              />

              {/* Translucent Golden Holographic Perimeter Wireframe Walls */}
              <div
                className="absolute inset-9 rounded-[28px] border border-amber-300/65 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(251,191,36,0.16) 0%, rgba(245,158,11,0.04) 50%, rgba(251,191,36,0.18) 100%)',
                  boxShadow: '0 0 24px rgba(251, 191, 36, 0.35)',
                }}
              />
            </div>

            {/* ===============================================================
                7 INTERACTIVE 3D ISOMETRIC HEXAGONAL NODE PEDESTALS
               =============================================================== */}
            <div className="absolute inset-0 z-20">
              {HIVE_HEX_NODES.map((node, idx) => {
                const isHovered =
                  hoveredNodeId === node.id || hoveredCategorySlug === node.categorySlug;

                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      soundFX.playClickChime(540 + idx * 45);
                      navigate(node.targetRoute);
                    }}
                    onMouseEnter={() => {
                      setHoveredNodeId(node.id);
                      soundFX.playClickChime(490 + idx * 35);
                    }}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    style={{
                      left: `${node.leftPct}%`,
                      top: `${node.topPct}%`,
                    }}
                    animate={{
                      y: isHovered ? -14 : 0,
                      scale: isHovered ? 1.09 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 w-[92px] h-[84px] sm:w-[118px] sm:h-[106px] cursor-pointer focus:outline-none"
                    aria-label={`Explore ${node.label} on Services page`}
                  >
                    {/* Base Isometric Glow Shadow under Hex Pedestal */}
                    <div
                      className={`absolute -inset-2 rounded-full blur-xl transition-opacity duration-300 ${
                        isHovered ? 'bg-amber-400/75 opacity-100' : 'bg-amber-500/30 opacity-60'
                      }`}
                    />

                    {/* 3D Extruded Isometric Hexagonal Pedestal SVG */}
                    <svg viewBox="0 0 120 110" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id={`hexTop-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={isHovered ? '#FEF08A' : '#FBBF24'} />
                          <stop offset="55%" stopColor={isHovered ? '#F59E0B' : '#D97706'} />
                          <stop offset="100%" stopColor={isHovered ? '#B45309' : '#78350F'} />
                        </linearGradient>
                        <linearGradient id={`hexSide-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#92400E" />
                          <stop offset="50%" stopColor="#451A03" />
                          <stop offset="100%" stopColor="#1C1917" />
                        </linearGradient>
                      </defs>

                      {/* Lower 3D Extrusion Skirt (Depth Wall) */}
                      <polygon
                        points="12,50 36,74 84,74 108,50 108,72 84,96 36,96 12,72"
                        fill={`url(#hexSide-${node.id})`}
                        stroke="#F59E0B"
                        strokeWidth="1.2"
                      />

                      {/* Glowing Golden Side Circuit Ribs */}
                      <line x1="36" y1="74" x2="36" y2="96" stroke="#FBBF24" strokeWidth="1.2" strokeOpacity="0.7" />
                      <line x1="84" y1="74" x2="84" y2="96" stroke="#FBBF24" strokeWidth="1.2" strokeOpacity="0.7" />
                      <polygon
                        points="12,60 36,84 84,84 108,60"
                        fill="none"
                        stroke="#FEF08A"
                        strokeWidth="1"
                        strokeOpacity={isHovered ? '0.95' : '0.5'}
                      />

                      {/* Top Isometric Hexagon Face */}
                      <polygon
                        points="36,24 84,24 108,50 84,74 36,74 12,50"
                        fill={`url(#hexTop-${node.id})`}
                        stroke={isHovered ? '#FEF9C3' : '#FDE68A'}
                        strokeWidth={isHovered ? '2.2' : '1.5'}
                      />

                      {/* Inner Isometric Bevel Ring */}
                      <polygon
                        points="40,30 80,30 100,50 80,68 40,68 20,50"
                        fill="rgba(20, 16, 10, 0.22)"
                        stroke="#FEF08A"
                        strokeWidth="1"
                        strokeOpacity="0.75"
                      />
                    </svg>

                    {/* Node Label / Icon Overlay on Top Face */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pb-3 pointer-events-none">
                      {node.isIconNode ? (
                        <Atom
                          className={`w-6 h-6 sm:w-7 sm:h-7 text-amber-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${
                            isHovered ? 'animate-spin' : ''
                          }`}
                          style={{ animationDuration: '6s' }}
                        />
                      ) : (
                        <span
                          className="text-[11px] sm:text-[13px] font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
                          style={{
                            transform: 'rotate(-12deg) skewX(12deg)',
                          }}
                        >
                          {node.label}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ===============================================================
              PHYSICS-TRACKED CYBERNETIC WIREFRAME BEE
             =============================================================== */}
          <div
            className="absolute z-30 pointer-events-none"
            style={{
              left: `${beeState.x}%`,
              top: `${beeState.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CyberBeeWireframe
              className="w-36 h-32 sm:w-48 sm:h-44 xl:w-52 xl:h-48"
              tiltDeg={beeState.tilt}
              isBuilding={!!activeNode}
            />
          </div>

          {/* ===============================================================
              WIDGET 1: CODE TERMINAL CARD (TOP-LEFT OF HIVE)
             =============================================================== */}
          <motion.div
            animate={{
              y: activeNode ? -4 : 0,
              borderColor: activeNode ? 'rgba(251, 191, 36, 0.55)' : 'rgba(255, 255, 255, 0.14)',
            }}
            className="hidden sm:block absolute top-12 left-0 xl:-left-4 z-30 w-[230px] sm:w-[255px] rounded-2xl bg-[#111521]/88 backdrop-blur-xl p-3.5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
          >
            {/* macOS Window Traffic Lights */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[10px] font-mono text-amber-400/80">
                {activeNode ? `${activeNode.id}.ts` : 'bwise.config.ts'}
              </span>
            </div>

            <pre className="font-mono text-[11px] leading-[1.55] text-slate-200 overflow-x-auto">
              <code>
                <span className="text-pink-400">const</span>{' '}
                <span className="text-sky-300">BWiseProject</span>{' '}
                <span className="text-amber-300">=</span> () <span className="text-pink-400">=&gt;</span> {'{\n'}
                {'  '}
                <span className="text-pink-400">return</span> (\n
                {'    '}
                <span className="text-emerald-300">return</span>{' '}
                <span className="text-amber-300">
                  {activeNode ? activeNode.codeCall : 'JavaScript()'}
                </span>
                ;\n
                {'  '});\n
                {'};'}
              </code>
            </pre>
          </motion.div>

          {/* ===============================================================
              WIDGET 2: BOTTOM-LEFT "SPRINT ACTIVITY" TASK TRACKER
             =============================================================== */}
          <motion.div
            animate={{
              y: activeNode ? -3 : 0,
            }}
            className="absolute bottom-2 left-0 sm:left-2 xl:-left-2 z-30 w-[185px] sm:w-[210px] rounded-2xl bg-[#131722]/88 backdrop-blur-xl p-3.5 border border-amber-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-extrabold text-white tracking-tight">
                Sprint Activity
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>

            <div className="space-y-1.5">
              {LEFT_SPRINT_TASKS.map((task, idx) => {
                const isHighlighted =
                  activeNode?.sprintHighlightIdx === idx || (!activeNode && activeSprintCycle === idx);
                return (
                  <div
                    key={task.id}
                    onClick={() => setActiveSprintCycle(idx)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                      isHighlighted
                        ? 'bg-amber-500/15 border-amber-400/50 text-white'
                        : 'bg-white/[0.03] border-white/[0.06] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${task.dotColor}`} />
                      <span className="font-semibold">{task.label}</span>
                    </div>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${task.badgeStyle}`}
                    >
                      {task.badge}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ===============================================================
              WIDGET 3: MIDDLE-RIGHT "SPRINT ACTIVITY" TASK TRACKER
             =============================================================== */}
          <motion.div
            animate={{
              y: activeNode ? -4 : 0,
            }}
            className="hidden sm:block absolute top-[38%] right-0 xl:-right-4 z-30 w-[195px] sm:w-[215px] rounded-2xl bg-[#131722]/88 backdrop-blur-xl p-3.5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-extrabold text-white tracking-tight">
                Sprint Activity
              </span>
              <span className="text-[10px] font-mono text-emerald-400">LIVE</span>
            </div>

            <div className="space-y-1.5">
              {RIGHT_SPRINT_TASKS.map((task, idx) => {
                const isHighlighted =
                  activeNode?.sprintHighlightIdx === idx || (!activeNode && activeSprintCycle === idx);
                return (
                  <div
                    key={task.id}
                    onClick={() => setActiveSprintCycle(idx)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                      isHighlighted
                        ? 'bg-amber-500/15 border-amber-400/50 text-white'
                        : 'bg-white/[0.03] border-white/[0.06] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${task.dotColor}`} />
                      <span className="font-semibold">{task.label}</span>
                    </div>
                    {task.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${task.badgeStyle}`}
                      >
                        {task.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ===============================================================
              WIDGET 4: BOTTOM-RIGHT "ACTIVE NODE" LIVE TELEMETRY & GRAPHS
             =============================================================== */}
          <motion.div
            onMouseEnter={() => setIsStatsHovered(true)}
            onMouseLeave={() => setIsStatsHovered(false)}
            animate={{
              y: activeNode || isStatsHovered ? -4 : 0,
              borderColor:
                activeNode || isStatsHovered
                  ? 'rgba(251, 191, 36, 0.6)'
                  : 'rgba(255, 255, 255, 0.15)',
            }}
            className="absolute bottom-1 right-0 sm:right-2 xl:-right-2 z-30 w-[235px] sm:w-[275px] rounded-2xl bg-[#131722]/90 backdrop-blur-xl p-3.5 sm:p-4 border border-white/15 shadow-[0_22px_55px_rgba(0,0,0,0.75)] cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-white tracking-tight">
                  Active Node
                </span>
                {activeNode && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                    {activeNode.label}
                  </span>
                )}
              </div>
              <span className="text-slate-400 text-xs font-bold tracking-widest">•••</span>
            </div>

            {/* 3 Core Telemetry KPIs (+156% Growth, 99.9% Uptime, 12+ Live Projects) */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <p className="text-sm sm:text-base font-black text-amber-400 tracking-tight">
                  {activeNode ? activeNode.growthStat : '+156%'}
                </p>
                <p className="text-[10px] text-slate-300 font-medium">Growth</p>
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-amber-300 tracking-tight">
                  {activeNode ? activeNode.uptimeStat : '99.9%'}
                </p>
                <p className="text-[10px] text-slate-300 font-medium">Uptime</p>
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-white tracking-tight">
                  {activeNode ? activeNode.projectsStat : '12+'}
                </p>
                <p className="text-[10px] text-slate-300 font-medium">Live Projects</p>
              </div>
            </div>

            {/* Dual Fluctuating Sparkline Mini-Graphs */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-black/35 border border-white/[0.07] p-1.5">
                <svg viewBox="0 0 120 40" className="w-full h-7 overflow-visible">
                  <defs>
                    <linearGradient id="sparkArea1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={graphLeft.areaD} fill="url(#sparkArea1)" />
                  <path
                    d={graphLeft.lineD}
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="rounded-lg bg-black/35 border border-white/[0.07] p-1.5">
                <svg viewBox="0 0 120 40" className="w-full h-7 overflow-visible">
                  <defs>
                    <linearGradient id="sparkArea2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={graphRight.areaD} fill="url(#sparkArea2)" />
                  <path
                    d={graphRight.lineD}
                    fill="none"
                    stroke="#FDE68A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
