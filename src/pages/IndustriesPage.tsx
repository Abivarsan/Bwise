import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CreditCard,
  HeartPulse,
  Layers,
  Lock,
  Plane,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { assetUrl } from '../utils/assets';

interface IndustryDossier {
  id: string;
  number: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  imageAlt: string;
  complianceBadges: string[];
  lead: string;
  capabilities: { title: string; outcome: string }[];
  benchmarks: { metric: string; label: string }[];
  recommendedServices: { label: string; slug: string; categorySlug: string }[];
}

const INDUSTRIES: IndustryDossier[] = [
  {
    id: 'fintech',
    number: '01',
    name: 'FinTech, Banking & Institutional Wealth',
    shortName: 'FinTech & Banking',
    tagline: 'Low-latency trading interfaces, multi-currency ledgers & SOC2-compliant acquisition.',
    icon: CreditCard,
    image: '/assets/pages/industries/fintech-banking.jpg',
    imageAlt: 'Institutional financial analyst reviewing real-time FX liquidity dashboards',
    complianceBadges: ['SOC2 Type II', 'PCI-DSS Level 1', 'ISO 27001'],
    lead: 'We build sub-second WebSocket treasury desks, biometric mobile banking apps, and compliance-reviewed SEO/GEO engines that lower institutional CAC.',
    capabilities: [
      { title: 'Real-Time FX & Ledger UI', outcome: 'Sub-50ms order book & settlement rendering' },
      { title: 'Biometric Mobile Approvals', outcome: 'Hardware-backed passkey & multi-sig flows' },
      { title: 'Compliant Search Authority', outcome: 'FINRA/FCA-aligned technical SEO & GEO' },
    ],
    benchmarks: [
      { metric: '-44%', label: 'Qualified Institutional CAC' },
      { metric: '99.99%', label: 'Core Ledger Uptime' },
    ],
    recommendedServices: [
      { label: 'Web Development', slug: 'web-development', categorySlug: 'software-solutions' },
      { label: 'Mobile App Development', slug: 'mobile-app-development', categorySlug: 'software-solutions' },
      { label: 'Digital Analytics', slug: 'digital-analytics', categorySlug: 'digital-strategy-ideas' },
    ],
  },
  {
    id: 'healthcare',
    number: '02',
    name: 'HealthTech, Clinical AI & Diagnostics',
    shortName: 'HealthTech & AI',
    tagline: 'HIPAA-compliant clinician workstations, patient portals & medical search authority.',
    icon: HeartPulse,
    image: '/assets/pages/industries/healthcare-medtech.jpg',
    imageAlt: 'Physician reviewing diagnostic imaging and patient telemetry on clinical tablet',
    complianceBadges: ['HIPAA Compliant', 'HL7 / FHIR R4', 'WCAG 2.2 AA'],
    lead: 'We design zero-footprint browser imaging viewers, frictionless telehealth intake flows, and physician-reviewed medical schema that earns AI citations.',
    capabilities: [
      { title: 'Clinical Triage Workstations', outcome: '52% faster radiologist & physician case review' },
      { title: 'FHIR / EHR Interoperability', outcome: 'Zero-PHI-leakage Epic & Cerner integrations' },
      { title: 'Medical GEO & E-E-A-T', outcome: 'Verified citations across AI health answers' },
    ],
    benchmarks: [
      { metric: '-52%', label: 'Clinician Triage Time' },
      { metric: '+310%', label: 'Organic Patient Intake' },
    ],
    recommendedServices: [
      { label: 'AI Optimization', slug: 'artificial-intelligence-optimization', categorySlug: 'software-solutions' },
      { label: 'Application Testing', slug: 'application-testing', categorySlug: 'software-solutions' },
      { label: 'Search Engine Optimisation', slug: 'search-engine-optimisation', categorySlug: 'software-solutions' },
    ],
  },
  {
    id: 'luxury-commerce',
    number: '03',
    name: 'Luxury Retail & Direct-to-Consumer',
    shortName: 'Luxury & D2C',
    tagline: 'Sub-second headless flagships, editorial art direction & high-ROAS paid social.',
    icon: ShoppingBag,
    image: '/assets/pages/industries/luxury-ecommerce.jpg',
    imageAlt: 'Creative director inspecting luxury packaging and digital flagship lookbook',
    complianceBadges: ['Shopify Plus / Hydrogen', 'Global Multi-Currency', 'Edge CDN'],
    lead: 'We pair tactile editorial storytelling with sub-second edge commerce and algorithmic paid social studios that protect luxury brand equity.',
    capabilities: [
      { title: 'Sub-Second Edge Storefronts', outcome: '0.6s LCP across 30+ international markets' },
      { title: 'AI Clienteling & Guided Rituals', outcome: '+68% higher average order value (AOV)' },
      { title: 'Full-Funnel Paid Social Studio', outcome: '4.6x blended ROAS on Meta & TikTok' },
    ],
    benchmarks: [
      { metric: '3.4x', label: 'Mobile Checkout Conversion' },
      { metric: '+68%', label: 'Average Order Value Lift' },
    ],
    recommendedServices: [
      { label: 'Brand Management', slug: 'brand-management', categorySlug: 'digital-strategy-ideas' },
      { label: 'Social Media Advertising', slug: 'social-media-advertising', categorySlug: 'social-media-marketing' },
      { label: 'Unique Logo Design', slug: 'unique-logo-design', categorySlug: 'digital-strategy-ideas' },
    ],
  },
  {
    id: 'enterprise-saas',
    number: '04',
    name: 'Enterprise B2B SaaS & Cloud Infrastructure',
    shortName: 'Enterprise SaaS',
    tagline: 'Product-led growth engines, interactive sandboxes & generative AI citations.',
    icon: Layers,
    image: '/assets/pages/industries/enterprise-saas.jpg',
    imageAlt: 'Engineering and product leadership collaborating in glass-walled studio',
    complianceBadges: ['SOC2 Ready', 'OpenAPI / GraphQL', 'Multi-Region Edge'],
    lead: 'We help B2B SaaS leaders dominate ChatGPT/Perplexity software comparisons, launch interactive browser sandboxes, and tie every touchpoint to pipeline.',
    capabilities: [
      { title: 'Generative Engine Optimization', outcome: '#1 citation share in AI software queries' },
      { title: 'Interactive Product Sandboxes', outcome: 'Self-serve enterprise evaluation before sales' },
      { title: 'Multi-Touch Revenue BI', outcome: 'Closed-loop CRM & warehouse attribution' },
    ],
    benchmarks: [
      { metric: '+290%', label: 'AI Search Citation Share' },
      { metric: '3.8x', label: 'Enterprise Demo Pipeline' },
    ],
    recommendedServices: [
      { label: 'Generative Engine Optimisation', slug: 'generative-engine-optimisation', categorySlug: 'software-solutions' },
      { label: 'Content Marketing', slug: 'content-marketing', categorySlug: 'social-media-marketing' },
      { label: 'Digital Analytics', slug: 'digital-analytics', categorySlug: 'digital-strategy-ideas' },
    ],
  },
  {
    id: 'proptech',
    number: '05',
    name: 'PropTech, Commercial Real Estate & Smart Cities',
    shortName: 'PropTech & CRE',
    tagline: 'Interactive 3D property digital twins, investor portals & hyper-local search.',
    icon: Building2,
    image: '/assets/pages/industries/proptech-realestate.jpg',
    imageAlt: 'Architectural scale model and digital twin viewport in real estate development studio',
    complianceBadges: ['WebGL / Mapbox 3D', 'Yardi / MRI Sync', 'Automated QA'],
    lead: 'We replace static PDFs with interactive 3D stacking plans, real-time BMS telemetry portals, and programmatic local search across hundreds of properties.',
    capabilities: [
      { title: 'WebGL 3D Stacking Plans', outcome: '60fps interactive floorplate & sun-path tours' },
      { title: 'LP Investor Data Rooms', outcome: 'Automated distribution & K-1 document vaults' },
      { title: 'Hyper-Local Geo-Grid SEO', outcome: 'Top-3 map pack rankings across every market' },
    ],
    benchmarks: [
      { metric: '+175%', label: 'Direct Leasing Inquiries' },
      { metric: '-38%', label: 'Pre-Leasing Cycle Time' },
    ],
    recommendedServices: [
      { label: 'Web Development', slug: 'web-development', categorySlug: 'software-solutions' },
      { label: 'Search Engine Optimisation', slug: 'search-engine-optimisation', categorySlug: 'software-solutions' },
      { label: 'Brand Management', slug: 'brand-management', categorySlug: 'digital-strategy-ideas' },
    ],
  },
  {
    id: 'hospitality-aviation',
    number: '06',
    name: 'Hospitality, Private Aviation & Bespoke Travel',
    shortName: 'Hospitality & Aviation',
    tagline: 'Direct-booking engines, charter configurators & high-net-worth loyalty apps.',
    icon: Plane,
    image: '/assets/pages/industries/hospitality-aviation.jpg',
    imageAlt: 'Bespoke architectural resort lobby and private aviation concierge experience',
    complianceBadges: ['PMS / GDS Native', 'Multi-Lingual Edge', 'VIP Mobile Pass'],
    lead: 'We build commission-free direct booking engines, empty-leg jet charter configurators, and Digital Key companion apps for ultra-luxury hospitality.',
    capabilities: [
      { title: 'Direct Villa & Charter Booking', outcome: '3-step multi-currency itinerary checkout' },
      { title: 'VIP Companion Mobile App', outcome: 'Offline itineraries, Digital Key & WhatsApp concierge' },
      { title: 'UHNW Social & Editorial', outcome: 'High-intent private client acquisition' },
    ],
    benchmarks: [
      { metric: '+215%', label: 'Direct Booking Share' },
      { metric: '-38%', label: 'OTA Commission Fees' },
    ],
    recommendedServices: [
      { label: 'Mobile App Development', slug: 'mobile-app-development', categorySlug: 'software-solutions' },
      { label: 'Social Media Management', slug: 'social-media-management', categorySlug: 'social-media-marketing' },
      { label: 'Unique Logo Design', slug: 'unique-logo-design', categorySlug: 'digital-strategy-ideas' },
    ],
  },
];

export const IndustriesPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const { openConsultationModal } = useConsultationModal();
  const activeSector = INDUSTRIES.find((ind) => ind.id === activeId) || INDUSTRIES[0];

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden text-stone-900 pt-24 sm:pt-28 pb-20">
      <HiveCornerDecorations />

      {/* =====================================================================
          1. CONCISE HERO + 6-SECTOR VISUAL SELECTOR PILLS
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              6 Core Verticals
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 mt-2.5">
              Domain-Fluent Engineering &amp; Growth.
            </h1>
          </div>
          <p className="text-sm sm:text-base text-stone-600 max-w-md">
            Compliance-ready architectures, custom product interfaces, and search authority tailored to high-trust industries.
          </p>
        </div>

        {/* Interactive 6-Vertical Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-8">
          {INDUSTRIES.map((sector) => {
            const Icon = sector.icon;
            const isSelected = sector.id === activeId;
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => setActiveId(sector.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/25 -translate-y-0.5'
                    : 'bg-white/95 hover:bg-amber-50/70 text-stone-800 border-amber-200/80 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-extrabold ${
                      isSelected ? 'text-amber-100' : 'text-amber-700'
                    }`}
                  >
                    #{sector.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-amber-600'}`} />
                </div>
                <p className="text-xs font-extrabold leading-snug">{sector.shortName}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          2. INTERACTIVE VISUAL SECTOR DOSSIER
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="rounded-[32px] bg-white/95 border-2 border-amber-300/80 shadow-[0_24px_65px_rgba(245,158,11,0.14)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: Realistic Photography + Floating Benchmark Badges */}
              <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] bg-stone-950 overflow-hidden group">
                <img
                  src={assetUrl(activeSector.image)}
                  alt={activeSector.imageAlt}
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent" />

                {/* Top Compliance Badges */}
                <div className="absolute top-5 left-5 right-5 flex flex-wrap items-center gap-2">
                  {activeSector.complianceBadges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[11px] font-extrabold shadow-xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bottom Benchmark Counters */}
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3">
                  {activeSector.benchmarks.map((b) => (
                    <div
                      key={b.label}
                      className="rounded-2xl bg-white/95 backdrop-blur-md p-4 border border-amber-200 shadow-lg"
                    >
                      <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 leading-none">
                        {b.metric}
                      </p>
                      <p className="text-[11px] font-bold text-stone-600 mt-1">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Concise Overview, 3 Visual Capability Cards & Studio Links */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-[#FFFDF8] to-[#FFF8E7]/75">
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
                      Vertical #{activeSector.number}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                      {activeSector.name}
                    </h2>
                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                      {activeSector.lead}
                    </p>
                  </div>

                  {/* 3 Concise Capability Cards */}
                  <div className="space-y-2.5">
                    {activeSector.capabilities.map((cap) => (
                      <div
                        key={cap.title}
                        className="p-3.5 rounded-2xl bg-white border border-amber-200/80 hover:border-amber-400 transition flex items-start gap-3 shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-xs sm:text-sm font-extrabold text-stone-900">
                            {cap.title}
                          </h3>
                          <p className="text-xs text-stone-600 mt-0.5">{cap.outcome}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommended Studios */}
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 mb-2">
                      Connected Beehive Studios for {activeSector.shortName}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeSector.recommendedServices.map((svc) => (
                        <Link
                          key={svc.slug}
                          to={`/services?category=${svc.categorySlug}&service=${svc.slug}#${svc.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF8E7] hover:bg-amber-500 text-stone-800 hover:text-white text-xs font-bold border border-amber-200/80 transition"
                        >
                          <span>{svc.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-amber-200/70 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={openConsultationModal}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#D97706] text-[#14111B] text-xs sm:text-sm font-extrabold shadow-md transition hover:scale-105 cursor-pointer"
                  >
                    <span>Book {activeSector.shortName} Pod</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    to="/portfolio"
                    className="text-xs font-extrabold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
                  >
                    View Sector Case Studies <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* =====================================================================
          3. ALL 6 SECTORS QUICK VISUAL GRID
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((sector) => {
            const isCurrent = sector.id === activeId;
            return (
              <div
                key={sector.id}
                onClick={() => {
                  setActiveId(sector.id);
                  window.scrollTo({ top: 140, behavior: 'smooth' });
                }}
                className={`group rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 ${
                  isCurrent
                    ? 'bg-white border-amber-500 ring-2 ring-amber-400/25 shadow-lg'
                    : 'bg-white/90 border-amber-200/80 hover:border-amber-400 hover:-translate-y-1 shadow-xs'
                }`}
              >
                <div className="relative h-44 overflow-hidden bg-stone-900">
                  <img
                    src={assetUrl(sector.image)}
                    alt={sector.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-stone-900 text-[10px] font-extrabold">
                      #{sector.number} · {sector.shortName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-extrabold">
                      {sector.benchmarks[0].metric}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-sm font-extrabold leading-snug">{sector.name}</h3>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs text-stone-600 truncate pr-2">{sector.tagline}</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          4. COMPACT SECURITY & COMPLIANCE TRUST BAR
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="rounded-[28px] bg-gradient-to-r from-[#F9E2AE]/85 via-[#FFF8E7]/95 to-[#F9E4B7]/85 border-2 border-amber-300/80 p-6 sm:p-8 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                Enterprise-Ready Governance &amp; Security by Default
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                100% IP assignment on day one · Automated CI/CD security gates · 99.99% production SLA
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['SOC2 Type II', 'HIPAA / FHIR', 'PCI-DSS L1', 'WCAG 2.2 AA', 'ISO 27001'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-white text-stone-800 text-xs font-extrabold border border-amber-300/80 shadow-2xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
