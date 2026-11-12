import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, SlidersHorizontal } from 'lucide-react';

type DisciplineFilter = 'all' | 'software-cloud' | 'mobile-ai' | 'brand-experience' | 'growth-search';

interface CaseStudy {
  id: string;
  index: string;
  client: string;
  sector: string;
  year: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  disciplines: DisciplineFilter[];
  disciplineLabels: string[];
  studioLinks: { label: string; to: string }[];
  challenge: string;
  solution: string;
  architectureNotes: string[];
  metrics: { value: string; label: string; detail: string }[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
}

const assetUrl = (relativePath: string) =>
  `${import.meta.env.BASE_URL}${relativePath.replace(/^\//, '')}`;

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'vellum-health',
    index: '02',
    client: 'Vellum Health Systems',
    sector: 'Healthcare & Clinical AI • Zurich / Boston',
    year: '2025',
    title: 'Real-Time Diagnostic Triage & Bedside Clinician Workspace',
    subtitle:
      'Replacing fragmented legacy hospital terminals with a unified, HIPAA-compliant clinical intelligence suite used across 42 acute-care departments.',
    image: assetUrl('assets/pages/portfolio/vellum-medtech.jpg'),
    imageAlt: 'Clinician reviewing diagnostic imaging and patient telemetry on a modern tablet workstation',
    imageCaption: 'Bedside tablet & workstation interface deployed across 42 clinical units with sub-second HL7/FHIR sync.',
    disciplines: ['mobile-ai', 'software-cloud'],
    disciplineLabels: ['Applied AI & LLM', 'Custom Software', 'iOS / iPadOS Clinical App'],
    studioLinks: [
      { label: 'AI & Automation', to: '/services?category=software-solutions&service=ai-automation#ai-automation' },
      { label: 'Software Development', to: '/services?category=software-solutions&service=software-development#software-development' },
    ],
    challenge:
      'Attending physicians were losing 54 minutes per shift switching between three incompatible radiology, lab, and electronic health record (EHR) portals during critical patient handoffs.',
    solution:
      'BWise engineered a zero-latency iPadOS and web clinician workspace backed by a streaming FHIR event bus and an audited clinical summarization model that cites every lab value back to its source record.',
    architectureNotes: [
      'Bi-directional HL7 FHIR R4 streaming pipeline with end-to-end envelope encryption',
      'On-premise / private-VPC retrieval-augmented clinical synthesis with zero hallucination guardrails',
      'Offline-resilient iPadOS ward rounding mode with instant biometric clinician handoff',
    ],
    metrics: [
      { value: '61%', label: 'Faster Shift Handoff', detail: 'Measured across 1,400+ attending physicians & nurses' },
      { value: '99.99%', label: 'Clinical Uptime', detail: 'Zero unplanned downtime across 14 months in production' },
      { value: '< 180ms', label: 'Imaging & Lab Query', detail: 'Down from 4.2s on the legacy hospital portal' },
    ],
    quote: {
      text: 'BWise didn’t hand us a slide deck of wireframes—their engineers shadowed our night-shift ICU teams and shipped a clinical system our doctors actually trust.',
      author: 'Dr. Lukas Vance, MD',
      role: 'Chief Medical Information Officer, Vellum Health',
    },
  },
  {
    id: 'kora-botanicals',
    index: '03',
    client: 'Kora Atelier & Botanicals',
    sector: 'Luxury Skincare & Global D2C • Paris / Tokyo / New York',
    year: '2025',
    title: 'Tactile Editorial Flagship, Multi-Currency Headless Commerce & Organic Search Authority',
    subtitle:
      'Transforming a heritage apothecary into a borderless digital flagship with bespoke sensory storytelling and compounding organic acquisition.',
    image: assetUrl('assets/pages/portfolio/kora-botanicals.jpg'),
    imageAlt: 'Editorial luxury skincare and botanical formulations photographed on natural stone',
    imageCaption: 'Art direction, packaging photography system, and headless multi-region storefront across 18 markets.',
    disciplines: ['brand-experience', 'growth-search', 'software-cloud'],
    disciplineLabels: ['Brand Identity & Direction', 'Headless E-Commerce', 'International SEO'],
    studioLinks: [
      { label: 'Branding & Creative Design', to: '/services?category=social-media-marketing&service=branding-creative-design#branding-creative-design' },
      { label: 'Web Applications', to: '/services?category=software-solutions&service=web-applications#web-applications' },
      { label: 'SEO Optimization', to: '/services?category=digital-strategy-ideas&service=seo-optimization#seo-optimization' },
    ],
    challenge:
      'High paid-social customer acquisition costs were eroding margins while a slow, template-bound storefront failed to convey the physical craftsmanship of Kora’s formulations.',
    solution:
      'Our creative and engineering studios collaborated under one roof—shooting a tactile visual language, re-architecting the storefront on an edge-cached headless stack, and building a multilingual formulation encyclopedia that now ranks #1 for 340+ high-intent skincare queries.',
    architectureNotes: [
      'Edge-rendered storefront across 18 locales with localized duties, tax, and dynamic currency routing',
      'Interactive Regimen Diagnostic Engine matching skin biomarkers to bespoke formulation bundles',
      'Programmatic schema & editorial formulation atlas driving 3.1x non-brand organic revenue',
    ],
    metrics: [
      { value: '+218%', label: 'Organic Search Revenue', detail: 'Within 9 months of technical SEO & editorial rollout' },
      { value: '4.8%', label: 'D2C Checkout Conversion', detail: 'Up from 1.9% prior to the headless rebuild' },
      { value: '0.6s', label: 'Global Median LCP', detail: 'Measured via real-user Core Web Vitals telemetry' },
    ],
  },
  {
    id: 'nexus-industrial-iot',
    index: '04',
    client: 'Nexus Grid & Dynamics',
    sector: 'Clean Energy & Industrial Automation • Frankfurt / Nordic Grid',
    year: '2024',
    title: 'Autonomous Substation Telemetry & Predictive Maintenance Command Center',
    subtitle:
      'Ingesting 1.8 million sensor readings per second to predict transformer faults weeks before physical failure.',
    image: assetUrl('assets/pages/portfolio/nexus-industrial-iot.jpg'),
    imageAlt: 'Engineer inspecting industrial automation hardware and live telemetry diagnostics in a modern facility',
    imageCaption: 'Field-ready diagnostics & real-time time-series control plane operating across 310 regional substations.',
    disciplines: ['software-cloud', 'mobile-ai'],
    disciplineLabels: ['Cloud & Edge Infrastructure', 'Predictive ML Telemetry', 'Field Engineering Suite'],
    studioLinks: [
      { label: 'Cloud & DevOps', to: '/services?category=software-solutions&service=cloud-devops#cloud-devops' },
      { label: 'Data & Analytics', to: '/services?category=digital-strategy-ideas&service=data-analytics#data-analytics' },
    ],
    challenge:
      'Field engineers relied on manual weekly inspections and delayed CSV exports, leaving critical grid infrastructure vulnerable to costly thermal overload cascades.',
    solution:
      'BWise built an edge-to-cloud Rust and TypeScript telemetry pipeline paired with an acoustic and thermal anomaly detection model and a ruggedized field dispatch application.',
    architectureNotes: [
      'High-throughput MQTT & WebSocket ingestion handling 1.8M+ time-series points/sec',
      'Automated anomaly isolation that generates pre-populated work orders for field crews',
      'Zero-Trust hardware attestation and air-gapped fallback controls for critical substations',
    ],
    metrics: [
      { value: '38%', label: 'Reduction in Grid Outages', detail: 'Verified across first full winter peak-load cycle' },
      { value: '€14.2M', label: 'Avoided Equipment Loss', detail: 'Through early thermal & vibration fault detection' },
      { value: '1.8M/s', label: 'Sensor Events Processed', detail: 'Sub-second stream processing with zero packet drop' },
    ],
  },
  {
    id: 'solstice-hospitality',
    index: '05',
    client: 'Solstice Sanctuary Group',
    sector: 'Architectural Resorts & Private Aviation • Mediterranean / Alps',
    year: '2024',
    title: 'Direct Guest Reservation Engine, Digital Concierge & Editorial Visual World',
    subtitle:
      'Shifting 74% of bookings away from third-party OTAs into a high-margin direct reservation and bespoke itinerary platform.',
    image: assetUrl('assets/pages/portfolio/solstice-hospitality.jpg'),
    imageAlt: 'Sunlit architectural resort pool and contemporary Mediterranean hospitality sanctuary at dusk',
    imageCaption: 'Immersive architectural photography, direct reservation engine, and native guest companion app.',
    disciplines: ['brand-experience', 'software-cloud', 'growth-search'],
    disciplineLabels: ['Visual Storytelling', 'Custom Booking Engine', 'Performance Growth'],
    studioLinks: [
      { label: 'UI/UX & Product Design', to: '/services?category=software-solutions&service=ui-ux-design#ui-ux-design' },
      { label: 'Digital Marketing', to: '/services?category=social-media-marketing&service=digital-marketing#digital-marketing' },
    ],
    challenge:
      'Third-party booking platforms were capturing 18–22% commission per stay while stripping away the architectural serenity and personalized itinerary curation that defined Solstice properties.',
    solution:
      'We reimagined the entire guest journey—from editorial property films and interactive villa floorplans to a real-time multi-property PMS booking engine and pre-arrival mobile concierge.',
    architectureNotes: [
      'Direct two-way synchronization with Opera Cloud PMS and private charter scheduling APIs',
      'Interactive spatial villa selector with real-time sun-path and view previews',
      'Full-funnel search and high-net-worth paid acquisition attribution engine',
    ],
    metrics: [
      { value: '74%', label: 'Direct Booking Share', detail: 'Up from 31%, saving $3.8M annually in OTA commissions' },
      { value: '+64%', label: 'Ancillary Experience Spend', detail: 'Pre-arrival dining, wellness & transfer curation' },
      { value: '4.94★', label: 'Guest Digital Satisfaction', detail: 'Across 18,000+ completed mobile concierge stays' },
    ],
  },
];

const FILTER_OPTIONS: { id: DisciplineFilter; label: string }[] = [
  { id: 'all', label: 'All Selected Work' },
  { id: 'software-cloud', label: 'Software & Cloud' },
  { id: 'mobile-ai', label: 'Mobile & Applied AI' },
  { id: 'brand-experience', label: 'Brand & Experience' },
  { id: 'growth-search', label: 'Growth & Search' },
];

export const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<DisciplineFilter>('all');
  const [expandedArchitecture, setExpandedArchitecture] = useState<Record<string, boolean>>({
    'vellum-health': true,
  });

  const filteredStudies =
    activeFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((study) => study.disciplines.includes(activeFilter));

  const toggleArchitecture = (id: string) => {
    setExpandedArchitecture((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* =====================================================================
          1. EDITORIAL MASTHEAD
         ===================================================================== */}
      <section className="pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-8 border-b border-stone-200/80">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Selected Production Work • 2023 — 2026</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-stone-950 leading-[1.06]">
                Engineered for reality.{' '}
                <span className="text-stone-500 font-normal">Measured in production outcomes.</span>
              </h1>
            </div>
            <p className="text-sm sm:text-base text-stone-600 max-w-md leading-relaxed lg:pb-1">
              We don’t ship speculative concepts. Every system below was architected, designed, and deployed by cross-functional BWise pods working directly alongside our partners.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. FLAGSHIP CASE STUDY — FULL-BLEED OBSIDIAN SHOWCASE (INDEX 01)
         ===================================================================== */}
      <section className="bg-[#14111B] text-white py-12 sm:py-20 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto">
          {/* Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/15 text-xs uppercase tracking-[0.18em] text-stone-400">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-extrabold">Flagship Dossier — 01</span>
              <span>/</span>
              <span className="text-stone-200 font-semibold">AetherPay Global Treasury</span>
            </div>
            <div>FinTech & Multi-Currency Banking • London / Singapore • 2025</div>
          </div>

          {/* Large-Format Realistic Photography + Split Editorial Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Realistic Visual Showcase (LCP Hero Image) */}
            <div className="lg:col-span-7">
              <figure className="relative overflow-hidden rounded-2xl border border-white/15 bg-stone-900 shadow-[0_28px_70px_rgba(0,0,0,0.55)]">
                <img
                  src={assetUrl('assets/pages/portfolio/aetherpay-fintech.jpg')}
                  alt="AetherPay real-time cross-border treasury and liquidity terminal running in a multi-screen financial workspace"
                  fetchPriority="high"
                  width={1600}
                  height={1000}
                  className="w-full h-[300px] sm:h-[440px] lg:h-[500px] object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
                <figcaption className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 bg-[#1B1725]/95 border-t border-white/10 text-xs text-stone-300">
                  <span>Live multi-currency FX & treasury cockpit deployed across 28 institutional desks</span>
                  <span className="text-amber-400 font-semibold">PCI-DSS Level 1 • SOC2 Type II</span>
                </figcaption>
              </figure>
            </div>

            {/* Flagship Story & Architecture */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Core Ledger Engineering', 'Mobile Treasury App', 'UI/UX Systems', 'Zero-Trust Security'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/[0.07] text-stone-200 border border-white/10"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white leading-[1.15] mb-4">
                  Autonomous Cross-Border Treasury & Instant FX Settlement Engine
                </h2>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-5">
                  Corporate CFOs across Europe and APAC were waiting up to 72 hours for multi-currency correspondent bank settlements while losing basis points to opaque FX spreads.
                </p>

                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                  BWise embedded a 9-person engineering and product pod for 8 months—architecting an event-sourced double-entry ledger, an algorithmic liquidity router connected to 14 Tier-1 clearing rails, and a biometric executive approval app on iOS and Android.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                    Key Production Deliverables
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Deterministic double-entry ledger capable of 12,000+ concurrent transactions/sec</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Real-time automated reconciliation with SAP S/4HANA, NetSuite, and SWIFT ISO 20022</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Hardware-key biometric sign-off workflow for multi-million-dollar treasury sweeps</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact?project=aetherpay-similar"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-all"
                >
                  <span>Request Architecture Walkthrough</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services?category=software-solutions"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-300 hover:text-amber-300 transition-colors"
                >
                  <span>Explore Software Studios</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Verified Production Telemetry Ledger */}
          <div className="mt-10 sm:mt-14 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">$2.4B+</p>
              <p className="text-sm font-bold text-white mt-1">Annualized Settlement Volume</p>
              <p className="text-xs text-stone-400 mt-0.5">Processed across 38 currencies with zero ledger drift</p>
            </div>
            <div className="sm:border-l sm:border-white/15 sm:pl-8">
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">42ms</p>
              <p className="text-sm font-bold text-white mt-1">Global p99 Ledger Commit</p>
              <p className="text-xs text-stone-400 mt-0.5">Multi-region active-active deployment across EU & APAC</p>
            </div>
            <div className="sm:border-l sm:border-white/15 sm:pl-8">
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">+184%</p>
              <p className="text-sm font-bold text-white mt-1">Enterprise Onboarding Velocity</p>
              <p className="text-xs text-stone-400 mt-0.5">Automated KYB/AML verification cut from 11 days to 4 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. DISCIPLINE FILTER & FULL-WIDTH EDITORIAL CASE-STUDY SPREADS
         ===================================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-8">
        <div className="max-w-[1240px] mx-auto">
          {/* Interactive Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-stone-300">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-stone-500">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
              <span>Filter Archive by Discipline</span>
            </div>

            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter case studies by discipline">
              {FILTER_OPTIONS.map((opt) => {
                const isActive = activeFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(opt.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-stone-950 text-white shadow-sm'
                        : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70 hover:text-stone-950'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alternating Full-Width Editorial Spreads */}
          <div className="divide-y divide-stone-300/80">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, idx) => {
                const isReversed = idx % 2 === 1;
                const isOpen = !!expandedArchitecture[study.id];

                return (
                  <motion.article
                    key={study.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="py-12 sm:py-16"
                  >
                    {/* Spread Header */}
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
                          Case Dossier / {study.index}
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-stone-950">{study.client}</h3>
                      </div>
                      <span className="text-xs font-medium text-stone-500">
                        {study.sector} • {study.year}
                      </span>
                    </div>

                    {/* Split Visual & Editorial Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Large Realistic Photograph */}
                      <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                        <figure className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 shadow-lg">
                          <img
                            src={study.image}
                            alt={study.imageAlt}
                            loading="lazy"
                            width={1400}
                            height={900}
                            className="w-full h-[280px] sm:h-[400px] lg:h-[450px] object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                          />
                          <figcaption className="px-4 sm:px-5 py-3 bg-stone-900 text-stone-300 text-xs flex items-center justify-between gap-4">
                            <span>{study.imageCaption}</span>
                            <span className="text-amber-400 font-mono shrink-0">{study.year}</span>
                          </figcaption>
                        </figure>
                      </div>

                      {/* Narrative & Verified Outcomes */}
                      <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-5`}>
                        <div className="flex flex-wrap gap-1.5">
                          {study.disciplineLabels.map((lbl) => (
                            <span
                              key={lbl}
                              className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/12 text-amber-900 border border-amber-500/25"
                            >
                              {lbl}
                            </span>
                          ))}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 leading-tight">
                          {study.title}
                        </h2>

                        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{study.subtitle}</p>

                        <div className="space-y-3 pt-2 text-sm leading-relaxed">
                          <div>
                            <span className="font-bold text-stone-950">The Reality: </span>
                            <span className="text-stone-600">{study.challenge}</span>
                          </div>
                          <div>
                            <span className="font-bold text-stone-950">What We Shipped: </span>
                            <span className="text-stone-600">{study.solution}</span>
                          </div>
                        </div>

                        {/* Expandable Technical Blueprint */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => toggleArchitecture(study.id)}
                            aria-expanded={isOpen}
                            className="text-xs font-extrabold uppercase tracking-wider text-stone-900 hover:text-amber-700 inline-flex items-center gap-2 cursor-pointer border-b border-stone-900/30 pb-1 transition-colors"
                          >
                            <span>{isOpen ? 'Hide Technical Blueprint' : 'Inspect Technical Blueprint'}</span>
                            <span className="text-amber-600">{isOpen ? '−' : '+'}</span>
                          </button>

                          {isOpen && (
                            <div className="mt-3 p-4 rounded-xl bg-stone-900 text-stone-200 space-y-2 text-xs">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                                Production Architecture Highlights
                              </p>
                              <ul className="space-y-1.5">
                                {study.architectureNotes.map((note) => (
                                  <li key={note} className="flex items-start gap-2">
                                    <span className="text-amber-400 mt-0.5">•</span>
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Editorial Pull-Quote if available */}
                        {study.quote && (
                          <blockquote className="pl-4 border-l-2 border-amber-500 text-xs sm:text-sm italic text-stone-700">
                            “{study.quote.text}”
                            <footer className="mt-1 not-italic font-bold text-stone-900">
                              — {study.quote.author}, <span className="font-normal text-stone-500">{study.quote.role}</span>
                            </footer>
                          </blockquote>
                        )}

                        {/* Connected BWise Studios */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                            Studios Deployed:
                          </span>
                          {study.studioLinks.map((st) => (
                            <Link
                              key={st.label}
                              to={st.to}
                              className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-amber-700 underline underline-offset-4"
                            >
                              <span>{st.label}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Horizontal Outcome Strip */}
                    <div className="mt-8 pt-6 border-t border-stone-200/90 grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {study.metrics.map((m) => (
                        <div key={m.label} className="flex items-baseline gap-4 sm:block">
                          <p className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">{m.value}</p>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5">{m.label}</p>
                            <p className="text-xs text-stone-500">{m.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. DOCUMENTARY PROCESS REALITY & CONVERSION SECTION
         ===================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#161310] text-white">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400">
              How Our Work Ships
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Zero agency theater. Direct collaboration with the builders writing your code and shaping your brand.
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Every project in our portfolio was delivered by a dedicated pod combining systems architects, product designers, and growth strategists in one shared Slack and repository with your team.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-2 border-t border-white/15">
              <div>
                <p className="text-2xl font-extrabold text-amber-400">Weekly</p>
                <p className="text-xs text-stone-300 mt-1">
                  Production staging deployments from Week 2 onward—never months of dark-room mystery.
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-amber-400">100% IP</p>
                <p className="text-xs text-stone-300 mt-1">
                  Full source-code, design token, and infrastructure ownership transferred cleanly to your organization.
                </p>
              </div>
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-stone-100 text-stone-950 font-bold text-sm transition-all"
              >
                <span>Start a Project Brief</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/industries"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-sm transition-all"
              >
                <span>Explore Industries We Serve</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
              <img
                src={assetUrl('assets/pages/portfolio/studio-craft-process.jpg')}
                alt="BWise engineers and product designers mapping system architecture during a live sprint review"
                loading="lazy"
                width={1400}
                height={933}
                className="w-full h-[300px] sm:h-[380px] object-cover"
              />
              <figcaption className="px-5 py-3.5 bg-black/50 text-xs text-stone-300 flex items-center justify-between">
                <span>Architecture & product critique session — BWise Engineering & Brand Pod</span>
                <span className="text-amber-400 font-semibold">12 Specialized Studios</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
};
