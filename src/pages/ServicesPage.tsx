import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronRight,
  Star,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Megaphone,
  Lightbulb,
  Compass,
  ShieldCheck,
  Zap,
  RotateCcw,
} from 'lucide-react';
import {
  PriorityService,
  MAIN_SERVICE_CATEGORIES,
  ServiceCategory,
  MainCategorySlug,
  getMainCategoryBySlug,
  getServicesByCategory,
  getServiceBySlug,
} from '../data/servicesData';
import { ServiceIcon } from '../components/hive/HoneycombGrid3D';
import { BwiseBeeCharacter } from '../components/hive/BwiseBeeCharacter';
import { BwiseLogo } from '../components/layout/BwiseLogo';

/**
 * Single Dedicated Sub-Service Subsection Card
 * Displays:
 * 1. Overview & Dual Mockups (Monitor + Smartphone)
 * 2. Problems We Solve (3 cards) & Modern Tech and Tools
 * 3. Expandable Delivery Process (6 stages) & Client Case Studies
 */
const SubServiceSubsection: React.FC<{
  service: PriorityService;
  index: number;
  isFocused?: boolean;
}> = ({ service, index, isFocused = false }) => {
  const { detail } = service;
  const [showDeepDive, setShowDeepDive] = useState<boolean>(isFocused || index === 0);

  return (
    <motion.section
      id={service.slug}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`scroll-mt-36 rounded-[32px] p-6 sm:p-10 mb-12 border transition-all duration-300 ${
        isFocused
          ? 'bg-white shadow-[0_24px_70px_rgba(245,158,11,0.16)] border-amber-400 ring-2 ring-amber-400/20'
          : 'bg-white/95 backdrop-blur-sm shadow-[0_16px_45px_rgba(26,22,18,0.06)] border-stone-200/80 hover:border-amber-300'
      }`}
    >
      {/* =====================================================================
          SUB-SERVICE HEADER & STUDIO BADGES
         ===================================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200/70">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <ServiceIcon name={service.iconName} className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/90 px-2.5 py-0.5 rounded-full">
                Studio #{String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs text-stone-500 font-semibold">• {service.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-0.5">
              {service.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200/70">
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <span className="text-xs font-bold text-amber-900 ml-1">4.9/5.0</span>
          </div>

          <Link
            to={`/contact?service=${service.slug}`}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-sm transition hover:scale-105"
          >
            <span>Book Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* =====================================================================
          PRIMARY SHOWCASE: OVERVIEW (LEFT) + INTERACTIVE DUAL MOCKUPS (RIGHT)
         ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        {/* Left Column: Description, Tagline & Direct Bullet Highlights */}
        <div className="lg:col-span-6 space-y-4">
          <p className="text-base sm:text-lg font-bold text-amber-700 leading-snug">
            {service.tagline}
          </p>
          <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed">
            {detail.overviewDescription}
          </p>

          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/60 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                Verified Benchmark KPI
              </p>
              <p className="text-base sm:text-lg font-extrabold text-stone-900 mt-0.5">
                {service.s4Room.kpiHighlight}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white text-amber-800 text-xs font-bold border border-amber-200 shadow-2xs">
              {service.hiveCell.roomInteriorLabel}
            </span>
          </div>

          {/* Quick Problem Pills */}
          <div className="space-y-2 pt-1">
            <p className="text-xs font-extrabold text-stone-800 uppercase tracking-wider">
              Core Capabilities:
            </p>
            <div className="grid grid-cols-1 gap-2">
              {detail.problemsSolved.map((prob, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-stone-900 font-bold">{prob.title}:</strong>{' '}
                    {prob.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Honey-Gold Showcase Backdrop with Desktop Monitor + Smartphone Mockup */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full max-w-[540px] rounded-[30px] bg-gradient-to-br from-[#EFE0C4] via-[#E8CE9D] to-[#DFB874] p-5 sm:p-7 shadow-[0_20px_50px_rgba(180,120,40,0.14)] border border-amber-200/70">
            {/* Desktop Monitor Mockup */}
            <div className="relative mx-auto w-full max-w-[420px]">
              <div className="rounded-2xl bg-[#18181B] p-2 sm:p-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.32)] border border-stone-700">
                <div className="rounded-xl bg-[#FAF8F5] overflow-hidden aspect-[16/10] p-3 sm:p-4 flex flex-col justify-between relative">
                  {/* Mini Navbar inside Screen */}
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-1.5">
                    <BwiseLogo className="h-3.5" />
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[8px] font-bold">
                      {service.shortTitle}
                    </span>
                  </div>

                  {/* Screen Body */}
                  <div className="grid grid-cols-12 gap-2.5 items-center my-auto py-1.5">
                    <div className="col-span-7 space-y-1">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[8px] font-bold uppercase">
                        {service.category}
                      </span>
                      <h4 className="text-[11px] sm:text-xs font-extrabold text-stone-900 leading-tight">
                        {detail.desktopMockupHeadline}
                      </h4>
                      <p className="text-[8px] sm:text-[9px] text-stone-500 leading-snug line-clamp-2">
                        {detail.desktopMockupSubtext}
                      </p>
                    </div>

                    <div className="col-span-5 rounded-lg bg-gradient-to-br from-stone-900 to-stone-800 p-2 flex flex-col items-center justify-center text-center shadow-md border border-amber-400/30">
                      <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 mb-1">
                        <ServiceIcon name={service.iconName} className="w-4 h-4" />
                      </div>
                      <span className="text-[8px] font-bold text-amber-300 leading-tight">
                        {service.s4Room.kpiHighlight}
                      </span>
                    </div>
                  </div>

                  {/* Modules Strip */}
                  <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-stone-200/70">
                    {service.s4Room.whiteboardModules.map((mod, idx) => (
                      <div key={idx} className="bg-white rounded px-1.5 py-0.5 border border-stone-200/60 truncate">
                        <p className="text-[7px] font-bold text-stone-700 truncate">{mod}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monitor Stand */}
              <div className="mx-auto w-16 h-3.5 bg-gradient-to-b from-stone-400 to-stone-300" />
              <div className="mx-auto w-24 h-1.5 rounded-full bg-stone-400 shadow" />

              {/* Overlapping Smartphone Mockup */}
              <div className="absolute -bottom-2 -left-2 sm:-left-4 w-[84px] sm:w-[100px] rounded-[18px] bg-[#18181B] p-1.5 shadow-[0_14px_30px_rgba(0,0,0,0.38)] border border-stone-700">
                <div className="w-6 h-1 bg-stone-700 rounded-full mx-auto mb-1" />
                <div className="rounded-[12px] bg-white p-1.5 space-y-1 aspect-[9/16] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <BwiseLogo variant="emblem" className="h-2.5" />
                    <span className="text-[6px] font-bold text-stone-400">BWISE</span>
                  </div>
                  <div className="p-1 rounded bg-amber-50 border border-amber-200/60 text-center my-auto">
                    <ServiceIcon name={service.iconName} className="w-3.5 h-3.5 text-amber-600 mx-auto mb-0.5" />
                    <p className="text-[7px] font-extrabold text-stone-900 leading-tight">
                      {detail.mobileMockupStat}
                    </p>
                  </div>
                  <div className="w-full py-0.5 rounded-full bg-amber-500 text-white text-[6px] font-bold text-center">
                    Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          TECH STACK & TOOLS STRIP
         ===================================================================== */}
      <div className="mt-8 pt-6 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-stone-700 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Tech &amp; Tools:
          </span>
          {detail.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100/70 text-stone-800 text-xs font-semibold border border-stone-200/80 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowDeepDive(!showDeepDive)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-200/80 transition"
        >
          <span>{showDeepDive ? 'Collapse Delivery Details' : 'View Process & Case Studies'}</span>
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-200 ${showDeepDive ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      {/* =====================================================================
          DEEP DIVE: 6-STEP PROCESS DELIVERY & CLIENT CASE STUDIES
         ===================================================================== */}
      <AnimatePresence>
        {showDeepDive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-8 mt-6 border-t border-stone-200/70 space-y-8">
              {/* Process Delivery 6 Steps */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-stone-900 tracking-tight">
                      6-Stage Hive Execution Protocol
                    </h3>
                    <p className="text-xs text-stone-500">
                      Standardized sprint architecture for {service.title}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                    Sprint Delivery
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {detail.processDelivery.map((step, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl p-4 bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-400 transition shadow-2xs flex items-start gap-3"
                    >
                      <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {step.stepNumber}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-stone-900">{step.title}</h4>
                        <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Case Studies Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-stone-900 tracking-tight">
                      Featured {service.shortTitle} Case Studies
                    </h3>
                    <p className="text-xs text-stone-500">
                      Demonstrated client ROI and pipeline transformation
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {detail.previousProjects.map((proj, pIdx) => {
                    const isDark = proj.theme === 'dark' || proj.theme === 'slate';
                    return (
                      <div
                        key={pIdx}
                        className={`rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between min-h-[160px] ${
                          isDark
                            ? 'bg-[#181824] text-white border-stone-800'
                            : proj.theme === 'amber'
                            ? 'bg-amber-50/90 text-stone-900 border-amber-200'
                            : 'bg-white text-stone-900 border-stone-200/80'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                isDark ? 'bg-white/10 text-amber-300' : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {proj.category}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                          </div>
                          <h4 className="text-xs font-extrabold leading-snug">{proj.title}</h4>
                          <p
                            className={`text-[10px] mt-1 line-clamp-2 ${
                              isDark ? 'text-stone-300' : 'text-stone-600'
                            }`}
                          >
                            {proj.description}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-current/10 flex items-center justify-between mt-3">
                          <span className="text-[11px] font-extrabold text-amber-500">
                            {proj.metrics}
                          </span>
                          <span className="text-[9px] font-bold text-stone-400">Verified</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active category from `?category=<slug>` or map from `?service=<slug>`
  const queryCategory = searchParams.get('category');
  const queryService = searchParams.get('service');
  const hashSlug = location.hash ? location.hash.replace('#', '') : null;

  // Resolve active category
  let initialCategorySlug: MainCategorySlug = 'software-solutions';
  if (queryCategory && MAIN_SERVICE_CATEGORIES.some((c) => c.slug === queryCategory)) {
    initialCategorySlug = queryCategory as MainCategorySlug;
  } else if (queryService || hashSlug) {
    const matchedService = getServiceBySlug(queryService || hashSlug);
    initialCategorySlug = matchedService.categorySlug;
  }

  const [activeCategorySlug, setActiveCategorySlug] = useState<MainCategorySlug>(initialCategorySlug);
  const activeCategory = getMainCategoryBySlug(activeCategorySlug);
  const subServices = getServicesByCategory(activeCategorySlug);

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    const svc = searchParams.get('service');
    const hash = location.hash ? location.hash.replace('#', '') : null;

    if (cat && MAIN_SERVICE_CATEGORIES.some((c) => c.slug === cat)) {
      setActiveCategorySlug(cat as MainCategorySlug);
    } else if (svc || hash) {
      const matched = getServiceBySlug(svc || hash);
      setActiveCategorySlug(matched.categorySlug);
    }
  }, [searchParams, location.hash]);

  // Handle smooth scroll when landing on a specific sub-service
  useEffect(() => {
    const target = queryService || (location.hash ? location.hash.replace('#', '') : null);
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [queryService, location.hash, activeCategorySlug]);

  const handleSelectCategory = (catSlug: MainCategorySlug) => {
    setActiveCategorySlug(catSlug);
    setSearchParams({ category: catSlug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden pt-[76px] sm:pt-[88px] pb-20">
      {/* Decorative Honeycomb Line Art at Edges */}
      <div
        className="hidden xl:block absolute top-10 -left-20 w-72 h-96 opacity-25 pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 300" fill="none" stroke="#D97706" strokeWidth="1.5">
          <polygon points="60,10 100,32 100,78 60,100 20,78 20,32" />
          <polygon points="140,10 180,32 180,78 140,100 100,78 100,32" />
          <polygon points="100,78 140,100 140,146 100,168 60,146 60,100" />
          <polygon points="20,78 60,100 60,146 20,168 -20,146 -20,100" />
          <polygon points="60,146 100,168 100,214 60,236 20,214 20,168" />
        </svg>
      </div>
      <div
        className="hidden xl:block absolute top-16 -right-16 w-80 h-96 opacity-25 pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 300" fill="none" stroke="#D97706" strokeWidth="1.5">
          <polygon points="60,10 100,32 100,78 60,100 20,78 20,32" />
          <polygon points="140,10 180,32 180,78 140,100 100,78 100,32" />
          <polygon points="100,78 140,100 140,146 100,168 60,146 60,100" />
          <polygon points="140,146 180,168 180,214 140,236 100,214 100,168" />
        </svg>
      </div>

      {/* =====================================================================
          STICKY TOP CATEGORY SWITCHER BAR (3 Main Categories)
         ===================================================================== */}
      <div className="bg-white/90 backdrop-blur-md border-b border-amber-200/60 sticky top-[78px] sm:top-[88px] z-30 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 shrink-0 flex items-center gap-1.5 bg-amber-100/80 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Bwise Studios Directory
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline">|</span>
              <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
                Select a Common Service Section:
              </span>
            </div>

            {/* 3 Main Category Switcher Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {MAIN_SERVICE_CATEGORIES.map((cat) => {
                const isCurrent = cat.slug === activeCategorySlug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.slug)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 scale-[1.02]'
                        : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200/80 hover:border-amber-300'
                    }`}
                  >
                    {cat.slug === 'software-solutions' && <Cpu className="w-3.5 h-3.5" />}
                    {cat.slug === 'social-media-marketing' && <Megaphone className="w-3.5 h-3.5" />}
                    {cat.slug === 'digital-strategy-ideas' && <Lightbulb className="w-3.5 h-3.5" />}
                    <span>{cat.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isCurrent ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {cat.subServiceSlugs.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          COMMON SERVICE SECTION HERO BANNER
         ===================================================================== */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-8">
        <motion.div
          key={activeCategory.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[36px] bg-gradient-to-br from-white via-amber-50/50 to-amber-100/40 p-6 sm:p-10 border border-amber-200/80 shadow-[0_20px_55px_rgba(245,158,11,0.1)] relative overflow-hidden"
        >
          {/* Subtle Ambient Golden Glow */}
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-amber-300/25 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wide">
                  Common Service Section
                </span>
                <span className="px-3.5 py-1 rounded-full bg-white text-stone-800 text-xs font-bold border border-amber-300/60 shadow-2xs">
                  {activeCategory.badge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {activeCategory.title}
              </h1>

              <p className="text-base sm:text-lg font-bold text-amber-800 leading-snug">
                {activeCategory.tagline}
              </p>

              <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed">
                {activeCategory.description}
              </p>
            </div>

            {/* Floating Bee Mascot Graphic */}
            <div className="hidden lg:flex flex-col items-center justify-center shrink-0">
              <div className="relative">
                <BwiseBeeCharacter className="w-44 h-44 drop-shadow-xl" />
                <div className="mt-2 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-[11px] font-extrabold shadow-md">
                    {subServices.length} Specialized Studios
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Anchor Jump Pills to Specific Sub-Services */}
          <div className="mt-8 pt-6 border-t border-amber-200/70">
            <p className="text-xs font-extrabold uppercase tracking-wider text-stone-500 mb-3">
              Explore Sub-Services in {activeCategory.title}:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {subServices.map((sub, sIdx) => (
                <a
                  key={sub.id}
                  href={`#${sub.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(sub.slug);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      navigate(`/services?category=${activeCategory.slug}#${sub.slug}`, { replace: true });
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-amber-500 hover:text-white text-stone-700 text-xs font-bold border border-amber-200/80 shadow-2xs transition-all hover:scale-105"
                >
                  <ServiceIcon name={sub.iconName} className="w-3.5 h-3.5" />
                  <span>
                    {sIdx + 1}. {sub.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* =====================================================================
          ALL SUB-SERVICES AS DEDICATED SUBSECTIONS
         ===================================================================== */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {subServices.map((service, index) => {
          const isTargeted = Boolean(
            queryService === service.slug ||
            (location.hash && location.hash.replace('#', '') === service.slug)
          );
          return (
            <SubServiceSubsection
              key={service.id}
              service={service}
              index={index}
              isFocused={isTargeted}
            />
          );
        })}
      </div>

      {/* =====================================================================
          BOTTOM CALL TO ACTION BANNER (Matching S6.jpg)
         ===================================================================== */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 mt-12">
        <div className="relative rounded-[36px] bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 p-8 sm:p-14 text-white shadow-2xl border border-amber-400/30 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              Accelerate with Bwise
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to work with our {activeCategory.title} pod?
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Schedule an architectural discovery session with our senior engineers and growth strategists.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 text-xs sm:text-sm font-bold border border-white/15 transition cursor-pointer"
            >
              Back to Top
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/30 transition hover:scale-105"
            >
              Start Your Project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
