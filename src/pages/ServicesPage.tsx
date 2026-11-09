import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  ChevronRight,
  Star,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { PRIORITY_SERVICES, PriorityService, getServiceBySlug } from '../data/servicesData';
import { ServiceIcon } from '../components/hive/HoneycombGrid3D';
import { BwiseBeeCharacter } from '../components/hive/BwiseBeeCharacter';

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active service from `?service=<slug>` or `#<slug>` hash
  const querySlug = searchParams.get('service');
  const hashSlug = location.hash ? location.hash.replace('#', '') : null;
  const initialService = getServiceBySlug(querySlug || hashSlug);

  const [activeService, setActiveService] = useState<PriorityService>(initialService);

  useEffect(() => {
    const slug = searchParams.get('service') || (location.hash ? location.hash.replace('#', '') : null);
    if (slug) {
      const matched = getServiceBySlug(slug);
      setActiveService(matched);
      // Smoothly scroll to the service overview section when arriving from the Beehive S4 room
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchParams, location.hash]);

  const handleSelectService = (service: PriorityService) => {
    setActiveService(service);
    setSearchParams({ service: service.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { detail } = activeService;

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden">
      {/* Decorative Left & Right Honeycomb Line Art (matching S5.jpg & S6.jpg edges) */}
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

      {/* Interactive 12-Service Honeycomb Switcher Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-amber-200/60 sticky top-20 z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              12 Hive Studios:
            </span>
            {PRIORITY_SERVICES.map((svc) => {
              const isCurrent = svc.id === activeService.id;
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => handleSelectService(svc)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 scale-[1.02]'
                      : 'bg-stone-100/90 hover:bg-amber-50 text-stone-700 hover:text-amber-800 border border-stone-200/70'
                  }`}
                >
                  <ServiceIcon name={svc.iconName} className="w-3.5 h-3.5" />
                  <span>{svc.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: SERVICE OVERVIEW HERO (Exact Layout of Reference/S5.jpg)
         ===================================================================== */}
      <section id="service-detail" className="max-w-[1220px] mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-12">
        <motion.div
          key={activeService.slug}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center"
        >
          {/* Left Column: Breadcrumb Pills, Title, Overview Paragraph, Dual Buttons (S5.jpg top-left) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#FBE8C8] text-[#B86B14] text-xs font-bold tracking-wide">
                Services
              </span>
              <span className="px-3.5 py-1 rounded-full bg-[#FDF2DF] text-[#9A5810] text-xs font-bold tracking-wide border border-amber-300/50">
                {activeService.title}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.1]">
              {detail.overviewTitle}
            </h1>

            <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed">
              {detail.overviewDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to={`/contact?service=${activeService.slug}`}
                className="px-7 py-3 rounded-full bg-gradient-to-b from-[#F5A646] to-[#E08319] hover:from-[#F29A30] hover:to-[#CC720E] text-white text-sm font-bold shadow-[0_10px_24px_rgba(224,131,25,0.35)] transition-all hover:-translate-y-0.5"
              >
                Learn more
              </Link>
              <a
                href="#process-delivery"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white hover:bg-amber-50 text-stone-800 text-sm font-semibold border border-stone-300 transition"
              >
                <span>Read more</span>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </a>
            </div>
          </div>

          {/* Right Column: Honey-Gold Showcase Card with Desktop Monitor + Smartphone Mockup (S5.jpg top-right) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Warm Golden Rounded Backdrop Card */}
            <div className="relative w-full max-w-[620px] rounded-[34px] bg-gradient-to-br from-[#EFE0C4] via-[#E8CE9D] to-[#DFB874] p-6 sm:p-10 shadow-[0_24px_60px_rgba(180,120,40,0.16)] border border-amber-200/70">
              {/* Floating 3D Golden Hexagon on Left Edge (matching S5.jpg) */}
              <div className="hidden sm:block absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-14 clip-hexagon bg-gradient-to-b from-amber-300 to-amber-500 shadow-lg pointer-events-none" />
              {/* Floating White 3D Hexagon on Right Edge (matching S5.jpg) */}
              <div className="hidden sm:block absolute -right-5 top-1/2 -translate-y-1/4 w-12 h-14 clip-hexagon bg-white shadow-lg pointer-events-none" />

              {/* Desktop Monitor Mockup */}
              <div className="relative mx-auto w-full max-w-[460px]">
                <div className="rounded-2xl bg-[#18181B] p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-stone-700">
                  {/* Screen Content */}
                  <div className="rounded-xl bg-[#FAF8F5] overflow-hidden aspect-[16/10] p-4 sm:p-5 flex flex-col justify-between relative">
                    {/* Mini Navbar inside Screen */}
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                        <span className="text-[10px] font-extrabold text-stone-900">Bwise Studio</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[8px] font-bold">
                        {activeService.shortTitle}
                      </span>
                    </div>

                    {/* Screen Main Body */}
                    <div className="grid grid-cols-12 gap-3 items-center my-auto py-2">
                      <div className="col-span-7 space-y-1.5">
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[8px] font-bold uppercase">
                          {activeService.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-stone-900 leading-tight">
                          {detail.desktopMockupHeadline}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] text-stone-500 leading-snug line-clamp-2">
                          {detail.desktopMockupSubtext}
                        </p>
                        <div className="pt-1">
                          <span className="inline-block px-2.5 py-1 rounded-full bg-amber-500 text-white text-[8px] font-bold">
                            Active Blueprint
                          </span>
                        </div>
                      </div>

                      {/* Mini 3D Bee Card inside the Monitor (matching S5.jpg monitor screen) */}
                      <div className="col-span-5 rounded-xl bg-gradient-to-br from-stone-900 to-stone-800 p-2.5 flex flex-col items-center justify-center text-center shadow-md border border-amber-400/30">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 mb-1">
                          <ServiceIcon name={activeService.iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-[9px] font-bold text-amber-300 leading-tight">
                          {activeService.s4Room.kpiHighlight}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Mini Metrics Strip */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200/70">
                      {activeService.s4Room.whiteboardModules.map((mod, idx) => (
                        <div key={idx} className="bg-white rounded-md px-2 py-1 border border-stone-200/60 truncate">
                          <p className="text-[8px] font-bold text-stone-700 truncate">{mod}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Monitor Metallic Stand */}
                <div className="mx-auto w-20 h-5 bg-gradient-to-b from-stone-400 to-stone-300" />
                <div className="mx-auto w-32 h-2 rounded-full bg-stone-400 shadow" />

                {/* Overlapping Mobile Smartphone Mockup on Bottom-Left (matching S5.jpg) */}
                <div className="absolute -bottom-3 -left-2 sm:-left-6 w-[92px] sm:w-[116px] rounded-[20px] bg-[#18181B] p-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.4)] border border-stone-700">
                  <div className="w-8 h-1 bg-stone-700 rounded-full mx-auto mb-1" />
                  <div className="rounded-[14px] bg-white p-2 space-y-1.5 aspect-[9/16] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-[7px] font-bold text-stone-400">BWISE</span>
                    </div>
                    <div className="space-y-1 my-auto">
                      <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200/60 text-center">
                        <ServiceIcon name={activeService.iconName} className="w-4 h-4 text-amber-600 mx-auto mb-0.5" />
                        <p className="text-[8px] font-extrabold text-stone-900 leading-tight">
                          {detail.mobileMockupStat}
                        </p>
                      </div>
                      <div className="h-2 rounded bg-stone-100 w-full" />
                      <div className="h-2 rounded bg-stone-100 w-4/5" />
                    </div>
                    <div className="w-full py-1 rounded-full bg-amber-500 text-white text-[7px] font-bold text-center">
                      Verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================================
          SECTION 2: PROBLEMS WE SOLVE & MODERN TECH AND TOOLS (S5.jpg middle)
         ===================================================================== */}
      <section className="max-w-[1220px] mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: "What problems do we solve?" + 3D Isometric Graphic (S5.jpg middle-left) */}
          <div className="lg:col-span-6 bg-white/85 backdrop-blur-sm rounded-[28px] p-6 sm:p-8 shadow-[0_14px_40px_rgba(26,22,18,0.05)] border border-stone-200/70 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="space-y-4 flex-1">
              <h2 className="text-2xl sm:text-[26px] font-extrabold text-stone-900 leading-tight">
                What problems do we solve?
              </h2>
              <ul className="space-y-3.5">
                {detail.problemsSolved.map((prob, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-stone-800 leading-snug">
                        {prob.title}
                      </p>
                      <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                        {prob.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3D Isometric Platform Illustration (matching S5.jpg middle-left graphic) */}
            <div className="w-40 h-40 sm:w-44 sm:h-44 shrink-0 relative flex items-center justify-center">
              <div className="absolute inset-2 rounded-3xl bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-amber-400/20 rotate-6" />
              <div className="relative w-36 h-36 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-4 text-white shadow-[0_18px_35px_rgba(79,70,229,0.32)] flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <ServiceIcon name={activeService.iconName} className="w-4 h-4 text-amber-300" />
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[9px] font-extrabold">
                    SOLVED
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 my-auto py-2">
                  <div className="h-7 rounded bg-white/20" />
                  <div className="h-7 rounded bg-amber-400/40" />
                  <div className="h-7 rounded bg-emerald-400/40" />
                  <div className="h-7 rounded bg-white/20" />
                </div>
                <p className="text-[10px] font-bold text-indigo-100 truncate">
                  {activeService.hiveCell.roomInteriorLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Right Card: "Modern tech and tools" with Quote Accent, 5 Stars & Tilted UI Grid (S5.jpg middle-right) */}
          <div className="lg:col-span-6 bg-[#FBF6EE] rounded-[28px] p-6 sm:p-8 shadow-[0_14px_40px_rgba(180,120,40,0.08)] border border-amber-200/60 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6 justify-between">
            {/* Large Subtle Opening Quote Mark like S5.jpg */}
            <div
              className="absolute -top-3 left-6 text-7xl font-serif text-amber-300/45 select-none pointer-events-none leading-none"
              aria-hidden="true"
            >
              “
            </div>

            <div className="relative z-10 space-y-3.5 flex-1">
              <h2 className="text-2xl sm:text-[26px] font-extrabold text-stone-900 leading-tight">
                Modern tech and tools
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {detail.modernTechSummary}
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {detail.techStack.map((tool, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white text-stone-800 text-[11px] font-semibold border border-amber-200/80 shadow-2xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* 5 Golden Stars + Closing Quote (matching S5.jpg) */}
              <div className="pt-2 flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-stone-700">{detail.ratingScore}</span>
                <span className="text-lg font-serif font-bold text-stone-500 ml-1">”</span>
              </div>
            </div>

            {/* Tilted UI Screen Showcase Collage on Right (matching S5.jpg middle-right) */}
            <div className="w-44 h-44 sm:w-48 sm:h-44 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 p-3 shadow-lg overflow-hidden relative group">
              <div className="grid grid-cols-2 gap-2 transform -rotate-12 scale-105 group-hover:rotate-0 transition-transform duration-500">
                {detail.techStack.slice(0, 4).map((tech, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-white/95 p-2 shadow-sm flex flex-col justify-between h-20"
                  >
                    <div className="w-4 h-4 rounded bg-amber-100 text-amber-700 flex items-center justify-center text-[9px] font-bold">
                      0{idx + 1}
                    </div>
                    <p className="text-[9px] font-extrabold text-stone-800 leading-tight line-clamp-2">
                      {tech}
                    </p>
                    <div className="h-1 w-full rounded bg-amber-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: PREVIOUS PROJECTS & PROCESS DELIVERY (S5.jpg & S6.jpg)
         ===================================================================== */}
      <section id="process-delivery" className="max-w-[1220px] mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: "Previous projects" 2x2 Portfolio Grid (matching S5.jpg & S6.jpg top-left) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-[26px] font-extrabold text-stone-900">
                Previous projects
              </h2>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                Verified Impact
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {detail.previousProjects.map((proj, idx) => {
                const isDarkCard = proj.theme === 'dark' || proj.theme === 'slate';
                return (
                  <div
                    key={idx}
                    className={`group rounded-2xl p-4 shadow-md border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[168px] ${
                      isDarkCard
                        ? 'bg-[#181824] text-white border-stone-800'
                        : proj.theme === 'amber'
                        ? 'bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] text-stone-900 border-amber-200'
                        : 'bg-white text-stone-900 border-stone-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isDarkCard
                            ? 'bg-white/10 text-amber-300'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {proj.category}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                    </div>

                    <div className="my-2">
                      <h3 className="text-sm font-extrabold leading-snug">{proj.title}</h3>
                      <p
                        className={`text-[11px] mt-1 line-clamp-2 ${
                          isDarkCard ? 'text-stone-300' : 'text-stone-600'
                        }`}
                      >
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-current/10 flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-amber-500">
                        {proj.metrics}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold">
                        Case Study
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Pagination Dots (matching S6.jpg below Previous Projects) */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span className="w-2 h-2 rounded-full bg-amber-200" />
            </div>
          </div>

          {/* Right Column: "Process Delivery" Connected Step Cards (matching S6.jpg right & bottom) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-[26px] font-extrabold text-stone-900">
                Process Delivery
              </h2>
              <span className="text-xs font-semibold text-stone-500">
                6-Stage Hive Execution Protocol
              </span>
            </div>

            {/* Connected Workflow Cards Grid with Golden Arrows */}
            <div className="bg-[#FBF6EE]/90 rounded-[30px] p-5 sm:p-7 border border-amber-200/60 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {detail.processDelivery.map((step, index) => (
                  <div key={step.stepNumber} className="relative flex items-stretch">
                    <div className="w-full bg-white rounded-2xl p-4 shadow-[0_8px_24px_rgba(26,22,18,0.05)] border border-stone-200/60 hover:border-amber-400 transition flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-100/90 text-amber-600 flex items-center justify-center font-extrabold text-xs">
                            {step.stepNumber}
                          </div>
                          {index < detail.processDelivery.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-amber-500 hidden sm:block" />
                          )}
                        </div>
                        <h3 className="text-sm font-extrabold text-stone-900 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-xs text-stone-500 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: COMPLETE DIRECTORY OF ALL 12 PRIORITY SERVICES
         ===================================================================== */}
      <section className="max-w-[1220px] mx-auto px-4 sm:px-8 py-12 border-t border-stone-200/70">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            Complete Bwise Hive Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
            Explore All 12 Priority Beehive Studios
          </h2>
          <p className="text-sm text-stone-600 mt-1.5">
            Click any service studio below to load its interactive blueprint, tech stack, case studies, and delivery process above.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRIORITY_SERVICES.map((svc) => {
            const isSelected = svc.id === activeService.id;
            return (
              <div
                key={svc.id}
                id={svc.slug}
                onClick={() => handleSelectService(svc)}
                className={`group rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-500 shadow-lg scale-[1.02]'
                    : 'bg-white hover:bg-amber-50/60 text-stone-900 border-stone-200/80 hover:border-amber-400 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white'
                      } transition-colors`}
                    >
                      <ServiceIcon name={svc.iconName} className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      Studio #{svc.id}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold leading-snug mb-1.5">{svc.title}</h3>
                  <p
                    className={`text-xs leading-relaxed line-clamp-2 ${
                      isSelected ? 'text-amber-50' : 'text-stone-500'
                    }`}
                  >
                    {svc.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-xs font-bold">
                  <span>{isSelected ? 'Currently Viewing' : 'View Studio Details'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: "LET'S BUILD SOMETHING TOGETHER / RETURN TO HIVE" (S6.jpg)
         ===================================================================== */}
      <section className="relative bg-gradient-to-b from-[#F5E8D0] to-[#EFE0C2] py-16 sm:py-20 px-4 sm:px-8 overflow-hidden border-t border-amber-300/40">
        {/* Subtle Honeycomb Geometry Pattern on Left & Right (matching S6.jpg bottom) */}
        <div className="max-w-[1180px] mx-auto relative z-10 text-center">
          <p className="text-lg sm:text-xl font-semibold text-stone-800 mb-5">
            Return to hive navigation?
          </p>

          {/* Glowing Glassmorphic Pill Banner: "Let's Build Something Together" (matching S6.jpg) */}
          <div className="relative inline-block w-full max-w-[760px] mx-auto">
            <div className="relative z-10 rounded-[44px] bg-gradient-to-r from-[#F9E2AE]/90 via-[#FFF8E7]/95 to-[#F9E4B7]/90 px-6 sm:px-14 py-7 sm:py-9 shadow-[0_20px_60px_rgba(234,141,40,0.28),inset_0_0_25px_rgba(255,255,255,0.9)] border-2 border-amber-300/80">
              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-stone-900 tracking-tight leading-[1.12]">
                Let&apos;s Build Something
                <span className="block mt-1">Together</span>
              </h2>
            </div>

            {/* Two Floating Bee Emblem Cards on Dashed Orbital Arc (matching S6.jpg) */}
            <div className="hidden md:flex absolute -right-8 -top-6 w-16 h-16 rounded-2xl bg-white shadow-lg border border-amber-200 items-center justify-center rotate-12 z-20 animate-float-slow">
              <BwiseBeeCharacter variant="worker" className="w-12 h-12" />
            </div>
            <div
              className="hidden md:flex absolute -right-4 -bottom-8 w-16 h-16 rounded-2xl bg-white shadow-lg border border-amber-200 items-center justify-center -rotate-6 z-20 animate-float-slow"
              style={{ animationDelay: '1.4s' }}
            >
              <BwiseBeeCharacter variant="worker" className="w-12 h-12" />
            </div>
          </div>

          {/* Hovering 3D Bwise Guide Bee on the Right (matching S6.jpg right side) */}
          <div className="hidden lg:block absolute right-2 -top-12 z-20 pointer-events-none">
            <BwiseBeeCharacter className="w-64 h-64 xl:w-72 xl:h-72" flipHorizontal />
          </div>

          {/* Primary Action Button: "Return to Hive" + Secondary "Book Strategy Call" */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-b from-[#F5A646] to-[#E08319] hover:from-[#F29A30] hover:to-[#CC720E] text-white text-sm sm:text-base font-bold shadow-[0_10px_25px_rgba(224,131,25,0.4)] transition-all hover:scale-105 cursor-pointer"
            >
              Return to Hive
            </button>
            <Link
              to={`/contact?service=${activeService.slug}`}
              className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-stone-900 text-sm sm:text-base font-bold shadow-sm border border-amber-300/80 transition"
            >
              Start a {activeService.shortTitle} Project →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
