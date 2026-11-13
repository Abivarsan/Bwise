import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Megaphone,
  Lightbulb,
  Zap,
  Activity,
} from 'lucide-react';
import {
  PriorityService,
  MAIN_SERVICE_CATEGORIES,
  MainCategorySlug,
  getMainCategoryBySlug,
  getServicesByCategory,
  getServiceBySlug,
} from '../data/servicesData';
import { ServiceIcon } from '../components/hive/HoneycombGrid3D';
import { BwiseBeeCharacter } from '../components/hive/BwiseBeeCharacter';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { assetUrl } from '../utils/assets';

const SERVICE_VISUAL_MAP: Record<string, string> = {
  'web-development': '/assets/pages/industries/enterprise-saas.jpg',
  'mobile-app-development': '/assets/pages/portfolio/aetherpay-fintech.jpg',
  'application-testing': '/assets/pages/careers/engineering-pairing.jpg',
  'search-engine-optimisation': '/assets/pages/industries/proptech-realestate.jpg',
  'artificial-intelligence-optimization': '/assets/pages/portfolio/nexus-industrial-iot.jpg',
  'generative-engine-optimisation': '/assets/pages/careers/architecture-whiteboard.jpg',
  'social-media-advertising': '/assets/pages/industries/luxury-ecommerce.jpg',
  'social-media-management': '/assets/pages/portfolio/solstice-hospitality.jpg',
  'content-marketing': '/assets/pages/portfolio/kora-botanicals.jpg',
  'brand-management': '/assets/pages/careers/design-critique.jpg',
  'unique-logo-design': '/assets/pages/portfolio/studio-craft-process.jpg',
  'digital-analytics': '/assets/pages/industries/fintech-banking.jpg',
};

const condenseSentence = (text: string): string => {
  const firstPeriod = text.indexOf('. ');
  return firstPeriod !== -1 ? text.slice(0, firstPeriod + 1) : text;
};

const SubServiceSubsection: React.FC<{
  service: PriorityService;
  index: number;
  isFocused?: boolean;
  onBookStudio: () => void;
}> = ({ service, index, isFocused = false, onBookStudio }) => {
  const { detail } = service;
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const photoPath = SERVICE_VISUAL_MAP[service.slug] || '/assets/pages/careers/hive-studio-hero.jpg';
  const isEven = index % 2 === 0;

  return (
    <motion.section
      id={service.slug}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.25) }}
      className={`group scroll-mt-36 rounded-[32px] p-6 sm:p-9 mb-10 border transition-all duration-300 ${
        isFocused
          ? 'bg-white shadow-[0_24px_70px_rgba(245,158,11,0.18)] border-amber-400 ring-2 ring-amber-400/25'
          : 'bg-white/95 backdrop-blur-xs shadow-[0_14px_40px_rgba(26,22,18,0.05)] border-amber-200/80 hover:border-amber-400 hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)]'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Showcase Column (Alternates Left/Right on Desktop for Visual Rhythm) */}
        <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative rounded-[26px] overflow-hidden bg-stone-900 border-2 border-amber-300/70 shadow-[0_18px_45px_rgba(26,22,18,0.14)] aspect-[16/11]">
            <img
              src={assetUrl(photoPath)}
              alt={service.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-stone-950/10" />

            {/* Top Floating Studio Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[11px] font-extrabold shadow-xs">
                <Activity className="w-3.5 h-3.5 text-amber-600" />
                {service.hiveCell.roomInteriorLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[11px] font-extrabold shadow-md">
                {detail.mobileMockupStat}
              </span>
            </div>

            {/* Bottom Interactive Telemetry Overlay */}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 backdrop-blur-md p-4 border border-amber-200/90 shadow-lg">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                    Verified Studio Benchmark
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-stone-900">
                    {service.s4Room.kpiHighlight}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ServiceIcon name={service.iconName} className="w-5 h-5" />
                </div>
              </div>

              {/* Interactive Module Selector Pills */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-amber-100">
                {service.s4Room.whiteboardModules.map((mod, mIdx) => {
                  const isSelected = activeModuleIdx === mIdx;
                  return (
                    <button
                      key={mIdx}
                      type="button"
                      onClick={() => setActiveModuleIdx(mIdx)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-bold truncate transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-white shadow-2xs'
                          : 'bg-[#FFF8E7] text-stone-700 hover:bg-amber-100'
                      }`}
                    >
                      {mod}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Concise Content & Interactive Capabilities Column */}
        <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full">
              Studio #{String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-xs font-bold text-stone-500">{service.category}</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {service.title}
            </h2>
            <p className="text-sm sm:text-base font-bold text-amber-700 mt-1.5 leading-snug">
              {service.tagline}
            </p>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              {condenseSentence(detail.overviewDescription)}
            </p>
          </div>

          {/* 3 Scannable Outcome Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {detail.problemsSolved.map((prob, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-amber-200/80 hover:border-amber-400 hover:-translate-y-0.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-600 mb-1.5" />
                <h3 className="text-xs font-extrabold text-stone-900 leading-snug">
                  {prob.title}
                </h3>
                <p className="text-[11px] text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                  {condenseSentence(prob.description)}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack & Action Bar */}
          <div className="pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mr-0.5" />
              {detail.techStack.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-lg bg-[#FFF8E7] text-stone-800 text-[11px] font-semibold border border-amber-200/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                to="/portfolio"
                className="px-3.5 py-2 rounded-full bg-stone-100 hover:bg-amber-100/80 text-stone-800 text-xs font-bold transition"
              >
                Case Studies
              </Link>
              <button
                type="button"
                onClick={onBookStudio}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#D97706] text-[#14111B] text-xs font-extrabold shadow-sm transition hover:scale-105 cursor-pointer"
              >
                <span>Book Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { openConsultationModal } = useConsultationModal();

  const queryCategory = searchParams.get('category');
  const queryService = searchParams.get('service');
  const hashSlug = location.hash ? location.hash.replace('#', '') : null;

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
      <HiveCornerDecorations />

      {/* =====================================================================
          STICKY TOP CATEGORY SWITCHER BAR (3 Main Categories)
         ===================================================================== */}
      <div className="bg-white/90 backdrop-blur-md border-b border-amber-200/60 sticky top-[78px] sm:top-[88px] z-30 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 shrink-0 flex items-center gap-1.5 bg-amber-100/80 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                12 Connected Studios
              </span>
            </div>

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
          CONCISE STUDIO DIVISION HERO BANNER
         ===================================================================== */}
      <div id={activeCategory.slug} className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-8 scroll-mt-28">
        <motion.div
          key={activeCategory.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-[32px] bg-gradient-to-br from-white via-amber-50/50 to-amber-100/40 p-6 sm:p-9 border border-amber-200/80 shadow-[0_18px_50px_rgba(245,158,11,0.1)] relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  {activeCategory.badge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                {activeCategory.title}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-stone-600 leading-relaxed">
                {activeCategory.tagline}
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center shrink-0">
              <BwiseBeeCharacter className="w-32 h-32 drop-shadow-lg" />
            </div>
          </div>

          {/* Interactive Sub-Service Jump Pills */}
          <div className="mt-6 pt-5 border-t border-amber-200/70 flex flex-wrap items-center gap-2">
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-amber-500 hover:text-white text-stone-700 text-xs font-bold border border-amber-200/80 shadow-2xs transition-all hover:scale-105"
              >
                <ServiceIcon name={sub.iconName} className="w-3.5 h-3.5" />
                <span>
                  {sIdx + 1}. {sub.title}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* =====================================================================
          VISUAL-FIRST SUB-SERVICE STUDIOS
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
              onBookStudio={openConsultationModal}
            />
          );
        })}
      </div>

      {/* =====================================================================
          CONCISE BOTTOM CTA BANNER
         ===================================================================== */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 mt-8">
        <div className="relative rounded-[32px] bg-gradient-to-r from-[#F9E2AE]/90 via-[#FFF8E7]/95 to-[#F9E4B7]/90 p-7 sm:p-10 text-stone-900 shadow-[0_18px_50px_rgba(245,158,11,0.16)] border-2 border-amber-300/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Ready to Launch?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              Deploy a dedicated {activeCategory.title} pod in under 10 days.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openConsultationModal}
              className="px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold shadow-md transition hover:scale-105 cursor-pointer"
            >
              Book a Free Consultation →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
