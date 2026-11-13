import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Cpu, Sparkles, TrendingUp, Users } from 'lucide-react';
import { BeehiveLandingExperience } from '../components/hive/BeehiveLandingExperience';
import { BwiseBeeCharacter } from '../components/hive/BwiseBeeCharacter';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { assetUrl } from '../utils/assets';

const STUDIO_SHOWCASES = [
  {
    slug: 'software-solutions',
    badge: 'Studio 01',
    title: 'Software Solutions',
    tagline: 'Cloud-native platforms, mobile ecosystems & autonomous AI agents.',
    kpi: '99.98% Uptime SLA',
    metricDelta: '3.2x Faster Releases',
    image: '/assets/pages/industries/enterprise-saas.jpg',
    icon: Code2,
    highlights: ['Web & Mobile Engineering', 'AI Agents & Chatbots', 'Enterprise BI & Analytics'],
  },
  {
    slug: 'social-media-marketing',
    badge: 'Studio 02',
    title: 'Social Media Marketing',
    tagline: 'Precision paid social acquisition, community stewardship & compounding content.',
    kpi: '4.4x Blended ROAS',
    metricDelta: '+240% Audience Growth',
    image: '/assets/pages/portfolio/kora-botanicals.jpg',
    icon: TrendingUp,
    highlights: ['Social Media Advertising', 'Community Management', 'Content Marketing'],
  },
  {
    slug: 'digital-strategy-ideas',
    badge: 'Studio 03',
    title: 'Digital Strategy Ideas',
    tagline: 'Category-defining brand architecture, signature visual identity & executive BI.',
    kpi: '$180M+ Attributed',
    metricDelta: 'Real-Time Revenue BI',
    image: '/assets/pages/careers/design-critique.jpg',
    icon: Users,
    highlights: ['Brand Management', 'Unique Logo Design', 'Digital Analytics'],
  },
];

const HIVE_VISUAL_TABS = [
  {
    id: 'studio',
    label: '3D Strategy Room',
    badge: 'Interactive Hive Briefing',
    title: 'Live Architecture & Growth Telemetry in One Room',
    caption: 'Designers, engineers, and growth leads share a single real-time workspace.',
    image: '/reference/S4.jpg',
    stats: [
      { label: 'Pod Velocity', value: '2-Week Sprints' },
      { label: 'Attribution', value: 'Real-Time BI' },
    ],
  },
  {
    id: 'pairing',
    label: 'Principal Engineering',
    badge: 'Hands-On Execution',
    title: 'Direct Access to the Builders Shipping Your Product',
    caption: 'No account-manager telephone game—collaborate directly with principal architects.',
    image: '/assets/pages/careers/hive-studio-hero.jpg',
    stats: [
      { label: 'Code Quality', value: 'Zero-Downtime CI/CD' },
      { label: 'Retention', value: '96% Multi-Year' },
    ],
  },
  {
    id: 'fintech',
    label: 'Enterprise Outcomes',
    badge: 'Production Scale',
    title: 'Engineered for High-Trust Regulated & Global Brands',
    caption: 'From multi-currency FinTech ledgers to global luxury commerce flagships.',
    image: '/assets/pages/portfolio/aetherpay-fintech.jpg',
    stats: [
      { label: 'Pipeline', value: '$180M+ Generated' },
      { label: 'Global Reach', value: '18 Markets' },
    ],
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeVisualTab, setActiveVisualTab] = useState(0);

  const agencyStats = [
    { value: '12', label: 'Specialized Beehive Studios', detail: 'Unified under one roof' },
    { value: '340+', label: 'Enterprise Digital Launches', detail: 'Across 18 global markets' },
    { value: '4.9★', label: 'Client Satisfaction Score', detail: '96% multi-year retention' },
    { value: '$180M+', label: 'Client Pipeline Generated', detail: 'Verified analytics attribution' },
  ];

  const currentTab = HIVE_VISUAL_TABS[activeVisualTab];

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden">
      {/* =====================================================================
          HERO: S1 -> S2 -> S3 -> 3D TUNNEL -> S4 INTERACTIVE BEE & BEEHIVE
         ===================================================================== */}
      <BeehiveLandingExperience />

      {/* =====================================================================
          AGENCY IMPACT METRICS STRIP
         ===================================================================== */}
      <section className="bg-gradient-to-r from-[#F9E4B7]/65 via-[#FFF8E7] to-[#F5E8D0]/75 text-stone-900 py-10 border-y border-amber-300/60">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {agencyStats.map((stat, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-white/75 backdrop-blur-xs border border-amber-300/60 px-5 py-4 shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-300 hover:-translate-y-0.5"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-amber-700 tracking-tight group-hover:scale-105 transition-transform origin-left">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-stone-900 mt-1">{stat.label}</p>
                <p className="text-xs text-stone-600 mt-0.5">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE 3-STUDIO VISUAL SHOWCASE
         ===================================================================== */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <HiveCornerDecorations />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Connected Studio Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2.5 tracking-tight">
                Three Core Divisions. Twelve Specialist Pods.
              </h2>
            </div>
            <Link
              to="/services?category=software-solutions#software-solutions"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-700 hover:text-amber-800 group"
            >
              Explore All 12 Studios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {STUDIO_SHOWCASES.map((studio) => {
              const Icon = studio.icon;
              return (
                <div
                  key={studio.slug}
                  onClick={() => navigate(`/services?category=${studio.slug}#${studio.slug}`)}
                  className="group relative bg-white/95 rounded-3xl overflow-hidden border border-amber-200/90 hover:border-amber-400 shadow-[0_14px_35px_rgba(26,22,18,0.06)] hover:shadow-[0_24px_55px_rgba(245,158,11,0.18)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col"
                >
                  {/* Realistic Photography Header with Interactive Telemetry Overlay */}
                  <div className="relative h-60 overflow-hidden bg-stone-900">
                    <img
                      src={assetUrl(studio.image)}
                      alt={studio.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />

                    {/* Top Floating Studio Pill */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                        {studio.badge}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-amber-400/95 text-stone-950 text-[11px] font-extrabold shadow-sm">
                        {studio.kpi}
                      </span>
                    </div>

                    {/* Bottom Visual Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                          {studio.metricDelta}
                        </p>
                        <h3 className="text-xl font-extrabold tracking-tight mt-0.5">
                          {studio.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-md group-hover:rotate-6 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Concise Body & Interactive Sub-Studio Pills */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {studio.tagline}
                    </p>

                    <div className="mt-5 pt-4 border-t border-amber-100/90 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {studio.highlights.map((chip) => (
                          <span
                            key={chip}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#FFF8E7] text-stone-800 border border-amber-200/80"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-extrabold text-amber-700 group-hover:text-amber-800">
                          Enter Studio Wing
                        </span>
                        <span className="w-8 h-8 rounded-full bg-amber-50 group-hover:bg-amber-500 text-amber-700 group-hover:text-white flex items-center justify-center transition-all">
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE VISUAL HIVE EXPERIENCE SWITCHER
         ===================================================================== */}
      <section className="bg-white/85 backdrop-blur-xs py-16 border-y border-amber-200/70">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Interactive Controls (Concise & Tactile) */}
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                Live Studio Lookbook
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                See How Our Connected Hive Ships Faster
              </h2>

              <div className="space-y-3 pt-1">
                {HIVE_VISUAL_TABS.map((tab, idx) => {
                  const isActive = idx === activeVisualTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveVisualTab(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#FFF8E7] via-amber-50/90 to-[#F9E4B7]/60 border-amber-400 shadow-[0_10px_25px_rgba(245,158,11,0.14)] -translate-y-0.5'
                          : 'bg-[#FAF8F5]/80 border-stone-200/80 hover:border-amber-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
                          0{idx + 1} · {tab.label}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full transition-all ${
                            isActive ? 'bg-amber-500 scale-125' : 'bg-stone-300'
                          }`}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-stone-900 mt-1">
                        {tab.title}
                      </h3>
                      {isActive && (
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {tab.caption}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition shadow-xs"
                >
                  View Case Studies <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/services?category=software-solutions#software-solutions"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition"
                >
                  Explore 12 Studios
                </Link>
              </div>
            </div>

            {/* Right Interactive Visual Frame */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(245,158,11,0.16)] border-2 border-amber-300/80 bg-stone-900 group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    key={currentTab.image}
                    src={assetUrl(currentTab.image)}
                    alt={currentTab.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/15 to-transparent" />

                  {/* Floating Telemetry Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-amber-400 text-stone-950 text-xs font-extrabold shadow-md">
                      {currentTab.badge}
                    </span>
                  </div>

                  {/* Floating Bottom Metrics Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-amber-200 shadow-lg">
                    <div>
                      <p className="text-xs font-extrabold text-stone-900">{currentTab.title}</p>
                      <p className="text-[11px] text-stone-600">{currentTab.caption}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {currentTab.stats.map((st) => (
                        <div key={st.label} className="border-l-2 border-amber-400 pl-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            {st.label}
                          </p>
                          <p className="text-xs font-extrabold text-amber-700">{st.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BOTTOM CALL TO ACTION BANNER (Matching S6.jpg)
         ===================================================================== */}
      <section className="relative bg-gradient-to-b from-[#F5E8D0] to-[#EFE0C2] py-16 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-[1180px] mx-auto relative z-10 text-center">
          <p className="text-base sm:text-lg font-semibold text-stone-700 mb-4">
            Ready to accelerate your digital growth?
          </p>
          <div className="relative inline-block w-full max-w-[720px] mx-auto rounded-[44px] bg-gradient-to-r from-[#F9E2AE]/90 via-[#FFF8E7]/95 to-[#F9E4B7]/90 px-6 sm:px-14 py-7 shadow-[0_20px_60px_rgba(234,141,40,0.25)] border-2 border-amber-300/80">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Let&apos;s Build Something Together
            </h2>
          </div>

          <div className="hidden lg:block absolute right-4 -top-10 pointer-events-none">
            <BwiseBeeCharacter className="w-56 h-56" flipHorizontal />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-full bg-gradient-to-b from-[#F5A646] to-[#E08319] hover:from-[#F29A30] hover:to-[#CC720E] text-white text-sm sm:text-base font-bold shadow-lg transition hover:scale-105 cursor-pointer"
            >
              Return to Top Hive
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-sm sm:text-base font-bold shadow-md transition"
            >
              Schedule a Consultation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
