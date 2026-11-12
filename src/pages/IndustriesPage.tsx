import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface IndustrySector {
  id: string;
  code: string;
  name: string;
  shortName: string;
  headline: string;
  lead: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  complianceStandards: string[];
  operationalRealities: { title: string; detail: string }[];
  bwiseStudios: { name: string; slug: string; categorySlug: string }[];
  benchmark: {
    stat: string;
    label: string;
    context: string;
  };
}

const assetUrl = (relativePath: string) =>
  `${import.meta.env.BASE_URL}${relativePath.replace(/^\//, '')}`;

const INDUSTRIES: IndustrySector[] = [
  {
    id: 'fintech-banking',
    code: 'SECTOR 01',
    name: 'FinTech & Institutional Banking',
    shortName: 'FinTech & Banking',
    headline: 'High-velocity ledgers, multi-currency treasury platforms, and biometric wealth experiences.',
    lead: 'Financial institutions cannot afford eventual consistency or fragile frontends. We engineer deterministic payment cores, automated KYB/AML onboarding engines, and executive mobile banking apps built for regulatory scrutiny.',
    image: assetUrl('assets/pages/industries/fintech-banking.jpg'),
    imageAlt: 'Modern financial district architecture representing institutional banking and fintech infrastructure',
    imageCaption: 'Institutional treasury, payment orchestration, and compliant digital banking architectures.',
    complianceStandards: ['PCI-DSS Level 1', 'SOC2 Type II', 'ISO 20022', 'PSD2 / Open Banking'],
    operationalRealities: [
      {
        title: 'Deterministic Double-Entry Core Ledgers',
        detail: 'Event-sourced ledger architectures with zero rounding drift across 35+ fiat and digital settlement rails.',
      },
      {
        title: 'Frictionless KYB/AML & Risk Scoring',
        detail: 'Automated document verification and real-time transaction sanction screening that cuts onboarding from weeks to hours.',
      },
      {
        title: 'Biometric Mobile & Web Cockpits',
        detail: 'Hardware-attested passkey and biometric sign-off flows designed for CFOs, traders, and retail account holders.',
      },
    ],
    bwiseStudios: [
      { name: 'Software Development', slug: 'software-development', categorySlug: 'software-solutions' },
      { name: 'Cybersecurity', slug: 'cybersecurity', categorySlug: 'software-solutions' },
      { name: 'Mobile Applications', slug: 'mobile-applications', categorySlug: 'software-solutions' },
    ],
    benchmark: {
      stat: '$2.4B+',
      label: 'Annualized cross-border volume engineered on BWise ledger systems',
      context: '42ms global p99 settlement commit across European & APAC clearing corridors',
    },
  },
  {
    id: 'healthcare-medtech',
    code: 'SECTOR 02',
    name: 'Healthcare, MedTech & Clinical Systems',
    shortName: 'Healthcare & MedTech',
    headline: 'Bedside clinician workspaces, interoperable FHIR data pipelines, and audited diagnostic AI.',
    lead: 'In clinical environments, software latency and cluttered interfaces directly contribute to physician burnout. We build zero-latency hospital workspaces, patient telemetry portals, and HIPAA-compliant AI triage tools.',
    image: assetUrl('assets/pages/industries/healthcare-medtech.jpg'),
    imageAlt: 'Clinicians and medical researchers operating advanced digital diagnostic equipment in a modern hospital lab',
    imageCaption: 'Point-of-care clinical software, HL7/FHIR interoperability, and diagnostic AI workflows.',
    complianceStandards: ['HIPAA / HITECH', 'HL7 FHIR R4', 'FDA SaMD Class II Ready', 'GDPR Health Data'],
    operationalRealities: [
      {
        title: 'EHR & Diagnostic Interoperability',
        detail: 'Streaming HL7 FHIR R4 pipelines unifying Epic, Cerner, PACS imaging, and bedside IoT vitals into a single clinician view.',
      },
      {
        title: 'Citation-Backed Clinical AI Summarization',
        detail: 'Private-VPC language models that synthesize patient histories with mandatory inline links to the underlying lab or note.',
      },
      {
        title: 'Accessible Patient & Telehealth Portals',
        detail: 'WCAG AAA compliant scheduling, remote monitoring, and post-operative recovery companions on iOS, Android, and Web.',
      },
    ],
    bwiseStudios: [
      { name: 'AI & Automation', slug: 'ai-automation', categorySlug: 'software-solutions' },
      { name: 'UI/UX & Product Design', slug: 'ui-ux-design', categorySlug: 'software-solutions' },
      { name: 'Data & Analytics', slug: 'data-analytics', categorySlug: 'digital-strategy-ideas' },
    ],
    benchmark: {
      stat: '61%',
      label: 'Reduction in clinician shift-handoff documentation time',
      context: 'Verified across 42 acute-care hospital departments and 1,400+ medical staff',
    },
  },
  {
    id: 'luxury-ecommerce',
    code: 'SECTOR 03',
    name: 'Luxury Retail & Global E-Commerce',
    shortName: 'Luxury & E-Commerce',
    headline: 'Sub-second headless storefronts, sensory brand worlds, and compounding organic search authority.',
    lead: 'Modern retail winners pair editorial desirability with ruthless technical speed. Our creative directors, frontend architects, and SEO strategists build global D2C flagships that convert without discounting.',
    image: assetUrl('assets/pages/industries/luxury-ecommerce.jpg'),
    imageAlt: 'Contemporary luxury flagship retail interior with warm architectural lighting and curated merchandise',
    imageCaption: 'Omnichannel luxury retail, edge-cached headless commerce, and international organic acquisition.',
    complianceStandards: ['Global Multi-Currency Tax/Duties', 'Core Web Vitals < 0.8s LCP', 'Omnichannel POS Sync'],
    operationalRealities: [
      {
        title: 'Edge-Rendered Headless Storefronts',
        detail: 'Instant page transitions, localized pricing across 20+ currencies, and bespoke product configurators that never stall.',
      },
      {
        title: 'Editorial Art Direction & Motion Systems',
        detail: 'Tactile photography direction, 3D packaging showcases, and brand identity systems crafted for high-margin positioning.',
      },
      {
        title: 'Programmatic & Editorial Search Dominance',
        detail: 'Technical schema architecture and high-intent buyer guides that reduce reliance on volatile paid-social ad auctions.',
      },
    ],
    bwiseStudios: [
      { name: 'Branding & Creative Design', slug: 'branding-creative-design', categorySlug: 'social-media-marketing' },
      { name: 'Web Applications', slug: 'web-applications', categorySlug: 'software-solutions' },
      { name: 'SEO Optimization', slug: 'seo-optimization', categorySlug: 'digital-strategy-ideas' },
    ],
    benchmark: {
      stat: '+218%',
      label: 'Non-brand organic search revenue growth within 9 months',
      context: 'Paired with a 4.8% D2C checkout conversion rate across 18 international markets',
    },
  },
  {
    id: 'enterprise-saas',
    code: 'SECTOR 04',
    name: 'B2B SaaS & Enterprise Cloud',
    shortName: 'SaaS & Cloud',
    headline: 'Multi-tenant cloud platforms, embedded AI workflows, and developer-grade design systems.',
    lead: 'We help seed-to-Series-D software companies and enterprise technology leaders ship category-defining products, modernize monolithic architectures, and build self-serve growth loops.',
    image: assetUrl('assets/pages/industries/enterprise-saas.jpg'),
    imageAlt: 'High-density enterprise server and cloud infrastructure operations center',
    imageCaption: 'Multi-tenant SaaS architecture, design systems, and product-led growth engineering.',
    complianceStandards: ['SOC2 / ISO 27001', 'Multi-Tenant RBAC & SSO', 'Zero-Downtime CI/CD', 'OpenTelemetry'],
    operationalRealities: [
      {
        title: 'Tokenized Multi-Product Design Systems',
        detail: 'Accessible, keyboard-first component libraries in Figma and React/TypeScript that unify complex enterprise suites.',
      },
      {
        title: 'Elastic Cloud & Kubernetes Infrastructure',
        detail: 'Multi-region AWS/GCP infrastructure-as-code with automated tenant isolation, usage metering, and cost governance.',
      },
      {
        title: 'Product-Led Acquisition & Funnel Telemetry',
        detail: 'Interactive product tours, documentation hubs, and organic developer marketing that accelerate enterprise pipeline.',
      },
    ],
    bwiseStudios: [
      { name: 'Cloud & DevOps', slug: 'cloud-devops', categorySlug: 'software-solutions' },
      { name: 'UI/UX & Product Design', slug: 'ui-ux-design', categorySlug: 'software-solutions' },
      { name: 'Digital Strategy & Consulting', slug: 'digital-strategy-consulting', categorySlug: 'digital-strategy-ideas' },
    ],
    benchmark: {
      stat: '99.995%',
      label: 'Multi-region production availability across managed cloud workloads',
      context: 'With 3.4x faster feature release velocity after design-system and CI/CD modernization',
    },
  },
  {
    id: 'proptech-realestate',
    code: 'SECTOR 05',
    name: 'PropTech, Real Estate & Smart Spaces',
    shortName: 'PropTech & Real Estate',
    headline: 'Spatial property selectors, IoT building telemetry, and investor portfolio portals.',
    lead: 'From commercial developments and smart industrial facilities to luxury residential portfolios, we connect physical assets with interactive digital leasing, IoT energy management, and investor reporting.',
    image: assetUrl('assets/pages/industries/proptech-realestate.jpg'),
    imageAlt: 'Modern architectural residence with floor-to-ceiling glass and integrated smart building design',
    imageCaption: 'Interactive architectural showcases, smart-building IoT telemetry, and tenant ecosystems.',
    complianceStandards: ['BMS / BACnet IoT Integration', 'Spatial 3D WebGL', 'Automated Lease & KYC Workflows'],
    operationalRealities: [
      {
        title: 'Interactive Spatial Floorplans & Digital Twins',
        detail: 'Browser-native 3D floorplan explorers with real-time unit availability, natural light simulation, and instant reservation.',
      },
      {
        title: 'Smart-Building Energy & HVAC Telemetry',
        detail: 'Unified dashboards ingesting thousands of environmental and occupancy sensors to cut commercial energy waste.',
      },
      {
        title: 'Investor & Tenant Lifecycle Portals',
        detail: 'End-to-end digital lease execution, maintenance dispatch, and real-time asset yield reporting.',
      },
    ],
    bwiseStudios: [
      { name: 'Web Applications', slug: 'web-applications', categorySlug: 'software-solutions' },
      { name: 'Data & Analytics', slug: 'data-analytics', categorySlug: 'digital-strategy-ideas' },
      { name: 'Content & Video Production', slug: 'content-video-production', categorySlug: 'social-media-marketing' },
    ],
    benchmark: {
      stat: '2.9x',
      label: 'Increase in qualified off-plan residential & commercial lease inquiries',
      context: 'Driven by interactive spatial unit selectors and targeted performance campaigns',
    },
  },
  {
    id: 'hospitality-aviation',
    code: 'SECTOR 06',
    name: 'Hospitality, Aviation & Modern Travel',
    shortName: 'Hospitality & Travel',
    headline: 'Direct reservation engines, private charter dispatch, and seamless mobile guest companions.',
    lead: 'We help boutique hotel groups, aviation operators, and destination brands reclaim direct guest relationships from third-party aggregators through high-converting booking flows and effortless mobile service.',
    image: assetUrl('assets/pages/industries/hospitality-aviation.jpg'),
    imageAlt: 'Architectural luxury hotel courtyard and waterfront sanctuary at twilight',
    imageCaption: 'Direct PMS booking integration, mobile guest key & concierge apps, and destination brand storytelling.',
    complianceStandards: ['Opera / Mews PMS Sync', 'Global Payment Orchestration', 'Mobile Digital Key & Passbook'],
    operationalRealities: [
      {
        title: 'Commission-Free Direct Booking Engines',
        detail: 'Real-time room, villa, and charter availability synced directly with property management systems in under 200ms.',
      },
      {
        title: 'Pre-Arrival Itinerary & Concierge Apps',
        detail: 'Native iOS/Android guest companions for contactless check-in, digital room keys, dining reservations, and bespoke excursions.',
      },
      {
        title: 'Cinematic Destination Film & Social Demand',
        detail: 'Editorial video production and full-funnel search/social acquisition targeting high-lifetime-value travelers.',
      },
    ],
    bwiseStudios: [
      { name: 'Mobile Applications', slug: 'mobile-applications', categorySlug: 'software-solutions' },
      { name: 'Digital Marketing', slug: 'digital-marketing', categorySlug: 'social-media-marketing' },
      { name: 'Content & Video Production', slug: 'content-video-production', categorySlug: 'social-media-marketing' },
    ],
    benchmark: {
      stat: '74%',
      label: 'Direct reservation share achieved for multi-property hospitality partners',
      context: 'Saving millions in annual OTA commissions while lifting ancillary guest spend by 64%',
    },
  },
];

export const IndustriesPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(INDUSTRIES[0].id);
  const activeSector = INDUSTRIES.find((item) => item.id === selectedId) ?? INDUSTRIES[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* =====================================================================
          1. EDITORIAL HERO + REALISTIC 3-PANEL SECTOR TRIPTYCH
         ===================================================================== */}
      <section className="pt-8 sm:pt-12 pb-14 sm:pb-20 px-4 sm:px-8 border-b border-stone-200/80">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 sm:mb-14">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Industry Verticals & Domain Depth</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-stone-950 leading-[1.06]">
                Domain fluency where{' '}
                <span className="text-stone-500 font-normal">regulation, scale, and craft intersect.</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Every industry carries its own non-negotiables—whether that is deterministic double-entry accounting in FinTech, HL7 FHIR clinical safety in Healthcare, or sub-second global edge speed in Luxury Retail. Our studios bring battle-tested architectural patterns to six core verticals.
              </p>
            </div>
          </div>

          {/* Realistic Photographic Triptych */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
            {/* Primary LCP Panel */}
            <figure className="md:col-span-6 relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 group">
              <img
                src={INDUSTRIES[0].image}
                alt={INDUSTRIES[0].imageAlt}
                fetchPriority="high"
                width={1500}
                height={1000}
                className="w-full h-[260px] sm:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 p-5 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                    Regulated Infrastructure
                  </span>
                  <p className="text-base sm:text-lg font-extrabold">FinTech & Institutional Banking</p>
                </div>
                <span className="text-xs font-semibold text-stone-300">PCI-DSS • ISO 20022</span>
              </figcaption>
            </figure>

            {/* Secondary Panel */}
            <figure className="md:col-span-3 relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 group">
              <img
                src={INDUSTRIES[1].image}
                alt={INDUSTRIES[1].imageAlt}
                width={1500}
                height={1000}
                className="w-full h-[220px] sm:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 p-5 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                  Clinical Precision
                </span>
                <p className="text-base font-extrabold">Healthcare & MedTech</p>
              </figcaption>
            </figure>

            {/* Tertiary Panel */}
            <figure className="md:col-span-3 relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 group">
              <img
                src={INDUSTRIES[2].image}
                alt={INDUSTRIES[2].imageAlt}
                width={1500}
                height={1000}
                className="w-full h-[220px] sm:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 p-5 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                  Global Flagships
                </span>
                <p className="text-base font-extrabold">Luxury & E-Commerce</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. INTERACTIVE SECTOR DOSSIER EXPLORER (DARK OBSIDIAN STAGE)
         ===================================================================== */}
      <section className="bg-[#14111B] text-white py-14 sm:py-24 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-10 border-b border-white/15">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400 block mb-2">
                Interactive Sector Dossier
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Select an industry to inspect our technical & creative playbook
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm">
              Each vertical combines specialized engineering architecture, regulatory compliance, and domain-specific growth execution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: 6-Vertical Selector List */}
            <div className="lg:col-span-4 space-y-2" role="tablist" aria-label="Industry verticals">
              {INDUSTRIES.map((sector) => {
                const isSelected = sector.id === activeSector.id;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedId(sector.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-white text-stone-950 border-white shadow-lg'
                        : 'bg-white/[0.04] text-stone-300 border-white/10 hover:bg-white/[0.09] hover:text-white'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-1 ${
                          isSelected ? 'text-amber-700' : 'text-amber-400/80'
                        }`}
                      >
                        {sector.code}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold block leading-snug">
                        {sector.name}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-stone-950 translate-x-0.5' : 'text-stone-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Live Sector Showcase Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSector.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-white/15 bg-[#1B1725] overflow-hidden shadow-2xl"
                >
                  {/* Large Realistic Sector Photograph */}
                  <figure className="relative">
                    <img
                      src={activeSector.image}
                      alt={activeSector.imageAlt}
                      loading="lazy"
                      width={1500}
                      height={900}
                      className="w-full h-[240px] sm:h-[340px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1725] via-[#1B1725]/30 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400 text-stone-950">
                        {activeSector.code} • {activeSector.shortName}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeSector.complianceStandards.map((std) => (
                          <span
                            key={std}
                            className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/70 backdrop-blur-md text-stone-200 border border-white/15"
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                  </figure>

                  {/* Dossier Body */}
                  <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                        {activeSector.headline}
                      </h3>
                      <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                        {activeSector.lead}
                      </p>
                    </div>

                    {/* 3 Operational Challenges Solved */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                        What We Engineer & Solve in {activeSector.shortName}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {activeSector.operationalRealities.map((item) => (
                          <div key={item.title} className="space-y-1.5">
                            <h4 className="text-sm font-bold text-white flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <span>{item.title}</span>
                            </h4>
                            <p className="text-xs text-stone-400 leading-relaxed pl-6">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sector Benchmark + Deployed Studios */}
                    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                          Verified Sector Benchmark
                        </p>
                        <div className="flex items-baseline gap-3 mt-1">
                          <span className="text-3xl font-extrabold text-white">{activeSector.benchmark.stat}</span>
                          <span className="text-xs sm:text-sm font-semibold text-stone-200">
                            {activeSector.benchmark.label}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-1">{activeSector.benchmark.context}</p>
                      </div>

                      <Link
                        to={`/contact?industry=${activeSector.id}`}
                        className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-stone-100 text-stone-950 font-bold text-xs sm:text-sm transition-all"
                      >
                        <span>Discuss {activeSector.shortName}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Studios Links */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold text-stone-400">Primary BWise Studios:</span>
                        {activeSector.bwiseStudios.map((st) => (
                          <Link
                            key={st.slug}
                            to={`/services?category=${st.categorySlug}&service=${st.slug}#${st.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                          >
                            <span>{st.name}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/portfolio"
                        className="text-xs font-bold text-stone-300 hover:text-white underline underline-offset-4"
                      >
                        View Related Case Studies →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ALL 6 VERTICALS — EDITORIAL PHOTOGRAPHIC FIELD GUIDE
         ===================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 block mb-2">
              Sector-by-Sector Reference
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 leading-tight">
              Built for the real-world environments where your customers and teams operate.
            </h2>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {INDUSTRIES.slice(3).map((sector, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={sector.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-12 border-t border-stone-300/80"
                >
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <figure className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 shadow-lg">
                      <img
                        src={sector.image}
                        alt={sector.imageAlt}
                        loading="lazy"
                        width={1500}
                        height={950}
                        className="w-full h-[260px] sm:h-[380px] object-cover transition-transform duration-700 hover:scale-[1.02]"
                      />
                      <figcaption className="px-5 py-3 bg-stone-900 text-stone-300 text-xs flex items-center justify-between gap-4">
                        <span>{sector.imageCaption}</span>
                        <span className="text-amber-400 font-mono shrink-0">{sector.code}</span>
                      </figcaption>
                    </figure>
                  </div>

                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-5`}>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700">
                      {sector.code} • {sector.name}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 leading-tight">
                      {sector.headline}
                    </h3>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{sector.lead}</p>

                    <ul className="space-y-2.5 pt-2">
                      {sector.operationalRealities.map((op) => (
                        <li key={op.title} className="text-xs sm:text-sm text-stone-700 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span>
                            <strong className="text-stone-950">{op.title}:</strong> {op.detail}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(sector.id);
                          window.scrollTo({ top: 520, behavior: 'smooth' });
                        }}
                        className="text-xs font-extrabold uppercase tracking-wider text-stone-950 hover:text-amber-700 underline underline-offset-4 cursor-pointer"
                      >
                        Open Full {sector.shortName} Dossier ↑
                      </button>
                      <Link
                        to={`/contact?industry=${sector.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-700 hover:text-amber-900"
                      >
                        <span>Consult with Domain Lead</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CROSS-INDUSTRY ENGINEERING & COMPLIANCE STANDARDS LEDGER
         ===================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-stone-900 text-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/15">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400 mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise Governance & Reliability</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                Non-negotiable engineering standards across every vertical we touch.
              </h2>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-all"
            >
              <span>Schedule a Technical Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-400">01 / Security Posture</p>
              <p className="text-lg font-extrabold text-white mt-2">Zero-Trust by Default</p>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                End-to-end envelope encryption, hardware-attested IAM, automated dependency auditing, and SOC2/HIPAA-aligned deployment pipelines.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-400">02 / High Availability</p>
              <p className="text-lg font-extrabold text-white mt-2">99.99% Multi-Region SLA</p>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Active-active cloud topology, automated failover drills, and real-time OpenTelemetry observability across every critical service.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-400">03 / Performance</p>
              <p className="text-lg font-extrabold text-white mt-2">Sub-Second User Experience</p>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Strict Core Web Vitals budgets, edge caching, and native 60fps mobile rendering verified on real-world cellular networks.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-400">04 / Continuity</p>
              <p className="text-lg font-extrabold text-white mt-2">Clean Handover & Enablement</p>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Comprehensive architectural decision records (ADRs), runbooks, and side-by-side enablement for your internal engineering and marketing teams.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
