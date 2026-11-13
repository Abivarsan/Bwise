import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { assetUrl } from '../utils/assets';

interface CaseStudy {
  id: string;
  number: string;
  client: string;
  sector: string;
  categoryFilter: 'fintech' | 'healthtech' | 'commerce' | 'enterprise';
  year: string;
  timeline: string;
  image: string;
  imageAlt: string;
  headline: string;
  summary: string;
  heroMetric: { value: string; label: string };
  metrics: { value: string; label: string }[];
  deliverables: string[];
  flagship?: boolean;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aetherpay',
    number: '01',
    client: 'AetherPay Global',
    sector: 'FinTech & Cross-Border Treasury',
    categoryFilter: 'fintech',
    year: '2025',
    timeline: '16 Weeks',
    image: '/assets/pages/portfolio/aetherpay-fintech.jpg',
    imageAlt: 'AetherPay institutional treasury terminal across desktop and mobile',
    headline: 'Re-architecting institutional FX settlement across 42 currencies.',
    summary:
      'Replaced six legacy banking portals with a single keyboard-first WebSocket trading desk and biometric mobile approval app.',
    heroMetric: { value: '$4.8B+', label: 'Annualized Settlement Volume' },
    metrics: [
      { value: '+184%', label: 'Activation Velocity' },
      { value: '1.1s', label: 'FX Quote Latency' },
      { value: '99.99%', label: 'Core Ledger Uptime' },
    ],
    deliverables: ['React + TypeScript', 'Swift & Kotlin', 'WebSockets', 'SOC2 Type II'],
    flagship: true,
  },
  {
    id: 'vellum-health',
    number: '02',
    client: 'Vellum Diagnostics',
    sector: 'HealthTech & Clinical AI',
    categoryFilter: 'healthtech',
    year: '2025',
    timeline: '14 Weeks',
    image: '/assets/pages/portfolio/vellum-medtech.jpg',
    imageAlt: 'Clinician reviewing Vellum Diagnostics AI radiology triage workstation',
    headline: 'Cutting diagnostic triage time in half for 1,900+ radiologists.',
    summary:
      'Zero-footprint DICOM browser viewer paired with HIPAA-compliant generative search across 14,000 clinical oncology pages.',
    heroMetric: { value: '-52%', label: 'Median Case Review Time' },
    metrics: [
      { value: '+310%', label: 'Organic & AI Citations' },
      { value: '1,900+', label: 'Daily Active Clinicians' },
      { value: '100%', label: 'HIPAA Audit Pass' },
    ],
    deliverables: ['Next.js & WebGL', 'Clinical AI Triage', 'Technical SEO & GEO'],
  },
  {
    id: 'kora-botanicals',
    number: '03',
    client: 'Kōra Atelier Paris',
    sector: 'Luxury Direct-to-Consumer',
    categoryFilter: 'commerce',
    year: '2024',
    timeline: '12 Weeks',
    image: '/assets/pages/portfolio/kora-botanicals.jpg',
    imageAlt: 'Kora Atelier botanical skincare flagship e-commerce experience',
    headline: 'A tactile headless flagship that tripled mobile checkout conversion.',
    summary:
      'Bespoke monogram typography, sub-second edge storefront, and interactive AI skin-ritual diagnostic across 14 markets.',
    heroMetric: { value: '3.4x', label: 'Mobile Checkout Conversion' },
    metrics: [
      { value: '+68%', label: 'Average Order Value' },
      { value: '0.6s', label: 'Global Edge Load' },
      { value: '4.6x', label: 'Paid Social ROAS' },
    ],
    deliverables: ['Shopify Hydrogen', 'Brand Identity', 'Paid Social Studio'],
  },
  {
    id: 'nexus-grid',
    number: '04',
    client: 'Nexus Grid Systems',
    sector: 'Industrial IoT & Clean Energy',
    categoryFilter: 'enterprise',
    year: '2024',
    timeline: '18 Weeks',
    image: '/assets/pages/portfolio/nexus-industrial-iot.jpg',
    imageAlt: 'Field engineer inspecting solar microgrid telemetry on ruggedized tablet',
    headline: 'Real-time predictive maintenance for 8,400 distributed microgrids.',
    summary:
      'Offline-first field tablet app and 60fps WebGL digital twin streaming 1.2M sensor events per minute.',
    heroMetric: { value: '-41%', label: 'Unplanned Grid Downtime' },
    metrics: [
      { value: '$19.4M', label: 'Annual O&M Savings' },
      { value: '60fps', label: 'WebGL Digital Twin' },
      { value: '8,400', label: 'Connected Sites' },
    ],
    deliverables: ['React Native', 'WebGL Telemetry', 'Predictive AI Alerts'],
  },
  {
    id: 'solstice-resorts',
    number: '05',
    client: 'Solstice Private Havens',
    sector: 'Ultra-Luxury Hospitality',
    categoryFilter: 'commerce',
    year: '2024',
    timeline: '10 Weeks',
    image: '/assets/pages/portfolio/solstice-hospitality.jpg',
    imageAlt: 'Solstice architectural resort overlooking ocean horizon at dusk',
    headline: 'Shifting $62M in villa bookings from third-party OTAs to direct.',
    summary:
      'Cinematic villa-composer booking flow with multi-currency private aviation add-ons and AI search concierge.',
    heroMetric: { value: '+215%', label: 'Direct Villa Bookings' },
    metrics: [
      { value: '$14,200', label: 'Average Direct Booking' },
      { value: '-38%', label: 'OTA Commission Bleed' },
      { value: '94%', label: 'Repeat Guest Rate' },
    ],
    deliverables: ['Custom Booking Engine', 'GEO Concierge', 'Editorial Video'],
  },
];

const FILTERS = [
  { id: 'all', label: 'All Case Studies' },
  { id: 'fintech', label: 'FinTech & Banking' },
  { id: 'healthtech', label: 'HealthTech & AI' },
  { id: 'commerce', label: 'Luxury & Commerce' },
  { id: 'enterprise', label: 'Industrial & IoT' },
] as const;

export const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]['id']>('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy>(CASE_STUDIES[0]);
  const { openConsultationModal } = useConsultationModal();

  const filteredStudies =
    activeFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.categoryFilter === activeFilter);

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden text-stone-900 pt-24 sm:pt-28 pb-20">
      <HiveCornerDecorations />

      {/* =====================================================================
          1. CONCISE VISUAL HEADER & FILTER PILLS
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Production Shipments
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 mt-2.5">
              Systems Built to Perform in the Wild.
            </h1>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((filter) => {
              const isCurrent = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 scale-[1.02]'
                      : 'bg-white/90 hover:bg-amber-50 text-stone-700 border border-amber-200/80'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. INTERACTIVE SPOTLIGHT VIEWER (LARGE REALISTIC PHOTOGRAPHY + KPIs)
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStudy.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="rounded-[32px] bg-white/95 border-2 border-amber-300/80 shadow-[0_24px_65px_rgba(245,158,11,0.14)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: High-Resolution Realistic Photography */}
              <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[440px] bg-stone-950 overflow-hidden group">
                <img
                  src={assetUrl(selectedStudy.image)}
                  alt={selectedStudy.imageAlt}
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-extrabold shadow-sm">
                    Case #{selectedStudy.number} · {selectedStudy.sector}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-400 text-stone-950 text-xs font-extrabold shadow-md">
                    Shipped in {selectedStudy.timeline}
                  </span>
                </div>

                {/* Bottom Floating Hero Metric */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                      {selectedStudy.client}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5 max-w-xl">
                      {selectedStudy.headline}
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-white/95 backdrop-blur-md px-4 py-2.5 text-stone-900 border border-amber-300 shadow-lg">
                    <p className="text-xl sm:text-2xl font-extrabold text-amber-700 leading-none">
                      {selectedStudy.heroMetric.value}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-600 mt-1">
                      {selectedStudy.heroMetric.label}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Concise Summary, 3 Visual KPI Cards & Action */}
              <div className="lg:col-span-5 p-6 sm:p-9 flex flex-col justify-between bg-gradient-to-br from-white via-[#FFFDF8] to-[#FFF8E7]/80">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/90 px-3 py-1 rounded-full">
                      Spotlight Outcome
                    </span>
                    <span className="text-xs font-bold text-stone-400">{selectedStudy.year}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                      {selectedStudy.client}
                    </h3>
                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                      {selectedStudy.summary}
                    </p>
                  </div>

                  {/* 3 Visual KPI Cards */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {selectedStudy.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl bg-white p-3.5 border border-amber-200/80 shadow-2xs text-center"
                      >
                        <p className="text-lg sm:text-xl font-extrabold text-amber-700 tracking-tight">
                          {m.value}
                        </p>
                        <p className="text-[10px] font-bold text-stone-600 mt-1 leading-tight">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Deliverable Tags */}
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 mb-2">
                      Deployed Architecture &amp; Pods
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedStudy.deliverables.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFF8E7] text-stone-800 text-xs font-semibold border border-amber-200/80"
                        >
                          <CheckCircle2 className="w-3 h-3 text-amber-600" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-amber-200/70 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={openConsultationModal}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#D97706] text-[#14111B] text-xs sm:text-sm font-extrabold shadow-md transition hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Build a Similar System</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* =====================================================================
          3. INTERACTIVE VISUAL CASE STUDY GALLERY CARDS
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            Click Any Case Study to Inspect Telemetry ({filteredStudies.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => {
            const isSelected = selectedStudy.id === study.id;
            return (
              <motion.div
                layout
                key={study.id}
                onClick={() => {
                  setSelectedStudy(study);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`group rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col border ${
                  isSelected
                    ? 'bg-white border-amber-500 ring-2 ring-amber-400/30 shadow-[0_20px_50px_rgba(245,158,11,0.18)] -translate-y-1'
                    : 'bg-white/95 border-amber-200/80 hover:border-amber-400 shadow-[0_12px_30px_rgba(26,22,18,0.05)] hover:shadow-[0_18px_45px_rgba(245,158,11,0.14)] hover:-translate-y-1'
                }`}
              >
                <div className="relative h-56 overflow-hidden bg-stone-900">
                  <img
                    src={assetUrl(study.image)}
                    alt={study.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-extrabold uppercase tracking-wider">
                      {study.sector}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-[11px] font-extrabold shadow-xs">
                      {study.heroMetric.value}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <p className="text-[11px] font-bold text-amber-300">{study.client}</p>
                    <h3 className="text-base font-extrabold leading-snug line-clamp-2 mt-0.5">
                      {study.headline}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {study.summary}
                  </p>

                  <div className="mt-4 pt-3.5 border-t border-amber-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {study.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <p className="text-xs font-extrabold text-amber-700">{m.value}</p>
                          <p className="text-[10px] text-stone-500">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-700 group-hover:translate-x-0.5 transition-transform">
                      Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          4. CONCISE VISUAL CTA BANNER
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 mt-14">
        <div className="rounded-[32px] bg-gradient-to-r from-[#F9E2AE]/90 via-[#FFF8E7]/95 to-[#F9E4B7]/90 border-2 border-amber-300/80 p-8 sm:p-12 shadow-[0_18px_50px_rgba(245,158,11,0.16)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
              Next Flagship Case Study
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Have a high-stakes product or growth target on your roadmap?
            </h2>
          </div>
          <button
            type="button"
            onClick={openConsultationModal}
            className="px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold shadow-md transition hover:scale-105 shrink-0 cursor-pointer"
          >
            Book a Free Consultation →
          </button>
        </div>
      </section>
    </div>
  );
};
