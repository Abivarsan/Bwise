import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, ArrowRight, CheckCircle2, ChevronDown, MapPin } from 'lucide-react';

type DepartmentFilter = 'all' | 'engineering-ai' | 'design-creative' | 'growth-strategy';

interface OpenRole {
  id: string;
  code: string;
  title: string;
  department: DepartmentFilter;
  departmentLabel: string;
  studio: string;
  location: string;
  type: string;
  summary: string;
  first90Days: string[];
  craftRequirements: string[];
  stackTags: string[];
}

const assetUrl = (relativePath: string) =>
  `${import.meta.env.BASE_URL}${relativePath.replace(/^\//, '')}`;

const OPEN_ROLES: OpenRole[] = [
  {
    id: 'senior-fullstack-architect',
    code: 'ENG-01',
    title: 'Senior Full-Stack Systems Architect',
    department: 'engineering-ai',
    departmentLabel: 'Engineering & AI',
    studio: 'Software & Web Applications Studio',
    location: 'Colombo / Hybrid or Remote (GMT+1 to GMT+8)',
    type: 'Full-Time • Senior / Lead',
    summary:
      'Lead the end-to-end architecture of high-throughput financial, clinical, and enterprise web platforms from initial data-model design to multi-region production deployment.',
    first90Days: [
      'Architect and ship a production core module within an active client pod (TypeScript, React 19, Node.js / Go, Postgres).',
      'Establish observability, OpenTelemetry tracing, and sub-second API latency budgets across staging and production.',
      'Mentor mid-level engineers through pair programming and clear Architectural Decision Records (ADRs).',
    ],
    craftRequirements: [
      '5+ years shipping production distributed systems, relational data models, and modern React/TypeScript frontends.',
      'Deep familiarity with PostgreSQL query optimization, event-driven queues, and cloud infrastructure (AWS or GCP).',
      'Bias toward clarity, automated testing, and speaking directly with technical client stakeholders.',
    ],
    stackTags: ['TypeScript', 'React 19', 'Node.js / Go', 'PostgreSQL', 'AWS / Docker'],
  },
  {
    id: 'staff-applied-ai-engineer',
    code: 'ENG-02',
    title: 'Staff Applied AI & LLM Systems Engineer',
    department: 'engineering-ai',
    departmentLabel: 'Engineering & AI',
    studio: 'AI & Automation Studio',
    location: 'Remote-First / Colombo Studio',
    type: 'Full-Time • Staff',
    summary:
      'Design deterministic, citation-backed retrieval pipelines, agentic workflows, and evaluation harnesses that turn frontier foundation models into reliable enterprise software.',
    first90Days: [
      'Deploy an audited RAG and tool-calling pipeline with automated regression evals and strict latency/cost guardrails.',
      'Partner with our UI/UX studio to design streaming, human-in-the-loop interfaces that make AI confidence transparent.',
      'Codify internal reusable templates for vector indexing, structured output validation, and PII redaction.',
    ],
    craftRequirements: [
      'Proven track record taking LLM/ML workflows beyond prototypes into audited, high-uptime production environments.',
      'Strong software engineering foundation in Python and TypeScript, plus experience with pgvector, embeddings, and eval frameworks.',
      'Obsession with deterministic evaluation, security boundaries, and eliminating model hallucinations.',
    ],
    stackTags: ['Python', 'TypeScript', 'LLM Evals & RAG', 'pgvector', 'Private VPC AI'],
  },
  {
    id: 'principal-product-designer',
    code: 'DES-01',
    title: 'Principal Product Designer — Design Systems & Complex Workflows',
    department: 'design-creative',
    departmentLabel: 'Design & Creative',
    studio: 'UI/UX & Product Design Studio',
    location: 'Colombo / Hybrid or Remote',
    type: 'Full-Time • Principal',
    summary:
      'Shape the tactile interaction language, tokenized multi-brand design systems, and high-density operational interfaces across our flagship software and mobile products.',
    first90Days: [
      'Lead product discovery and interaction architecture for a flagship FinTech or MedTech platform alongside our engineering lead.',
      'Deliver a tokenized Figma component library synced directly with our frontend Storybook and Tailwind CSS tokens.',
      'Conduct live usability sessions with end-users (clinicians, financial operators, or consumers) to validate workflow speed.',
    ],
    craftRequirements: [
      'Portfolio demonstrating shipped, data-dense web or mobile software—not just marketing landing pages or Dribbble shots.',
      'Mastery of Figma variables, auto-layout, accessible color contrast (WCAG AA/AAA), and micro-interaction prototyping.',
      'Ability to collaborate in the browser alongside frontend engineers to sweat typography, spacing, and motion.',
    ],
    stackTags: ['Figma Systems', 'Interaction Design', 'Design Tokens', 'Prototyping', 'WCAG Accessibility'],
  },
  {
    id: 'senior-mobile-engineer',
    code: 'ENG-03',
    title: 'Senior Mobile Engineer (React Native & Native iOS/Android)',
    department: 'engineering-ai',
    departmentLabel: 'Engineering & AI',
    studio: 'Mobile Applications Studio',
    location: 'Colombo / Hybrid or Remote',
    type: 'Full-Time • Senior',
    summary:
      'Craft 60fps, offline-resilient mobile applications with biometric security, native animations, and rock-solid hardware integrations.',
    first90Days: [
      'Own the mobile release pipeline and native performance profiling for a consumer or clinical companion application.',
      'Implement offline-first local database synchronization and hardware passkey/biometric authentication flows.',
      'Collaborate with motion designers to ship fluid gesture-driven transitions.',
    ],
    craftRequirements: [
      '4+ years building and shipping production apps to the Apple App Store and Google Play Store.',
      'Deep command of React Native (New Architecture / Reanimated) and comfort dropping into Swift/Kotlin when native APIs demand it.',
      'Experience with local SQLite/WatermelonDB sync, push notification reliability, and automated CI/CD (Fastlane / EAS).',
    ],
    stackTags: ['React Native', 'Swift / Kotlin', 'Reanimated', 'Offline Sync', 'Biometric Auth'],
  },
  {
    id: 'senior-brand-art-director',
    code: 'DES-02',
    title: 'Senior Brand & Motion Art Director',
    department: 'design-creative',
    departmentLabel: 'Design & Creative',
    studio: 'Branding & Creative Design Studio',
    location: 'Colombo Studio / Hybrid',
    type: 'Full-Time • Senior',
    summary:
      'Define distinctive visual identities, editorial photography direction, and kinetic motion systems for ambitious technology and luxury consumer brands.',
    first90Days: [
      'Direct the visual identity, typography system, and photography guidelines for two global brand transformations.',
      'Create kinetic web motion studies and art-directed launch films in collaboration with our video and web studios.',
      'Elevate the visual craft bar across all BWise studio touchpoints and client lookbooks.',
    ],
    craftRequirements: [
      'Exceptional editorial eye across typography, grid systems, art direction, and real-world brand applications.',
      'Fluency in Adobe Creative Suite, Figma, and motion/3D tools (After Effects, Rive, Blender, or Cinema 4D).',
      'Strong narrative sensibility—every visual decision is rooted in brand positioning rather than fleeting decoration.',
    ],
    stackTags: ['Brand Identity', 'Art Direction', 'Editorial Typography', 'Motion / Rive', 'Film Direction'],
  },
  {
    id: 'technical-seo-growth-lead',
    code: 'GRW-01',
    title: 'Technical SEO & Organic Growth Engineering Lead',
    department: 'growth-strategy',
    departmentLabel: 'Growth & Strategy',
    studio: 'SEO & Digital Strategy Studio',
    location: 'Remote-First / Colombo Studio',
    type: 'Full-Time • Lead',
    summary:
      'Bridge technical web architecture, programmatic content systems, and conversion telemetry to build compounding organic search moats for global clients.',
    first90Days: [
      'Audit and re-architect technical crawlability, structured schema, and Core Web Vitals across 3 flagship client properties.',
      'Partner with our content and engineering pods to launch high-intent programmatic and editorial search hubs.',
      'Build transparent revenue-attribution dashboards connecting organic search visibility directly to pipeline and checkout.',
    ],
    craftRequirements: [
      'Proven history scaling non-brand organic traffic and revenue for competitive SaaS, FinTech, or global D2C brands.',
      'Deep technical fluency in SSR/SSG rendering, log-file analysis, JSON-LD schema, hreflang, and Search Console APIs.',
      'Analytical rigor with SQL/GA4/BigQuery and zero tolerance for low-quality AI content spam.',
    ],
    stackTags: ['Technical SEO', 'Programmatic Architecture', 'Schema / JSON-LD', 'Core Web Vitals', 'Revenue Attribution'],
  },
];

const DEPARTMENT_TABS: { id: DepartmentFilter; label: string }[] = [
  { id: 'all', label: 'All Studios (6)' },
  { id: 'engineering-ai', label: 'Engineering & AI (3)' },
  { id: 'design-creative', label: 'Design & Creative (2)' },
  { id: 'growth-strategy', label: 'Growth & Strategy (1)' },
];

export const CareersPage: React.FC = () => {
  const [department, setDepartment] = useState<DepartmentFilter>('all');
  const [expandedRole, setExpandedRole] = useState<string>(OPEN_ROLES[0].id);

  const visibleRoles =
    department === 'all' ? OPEN_ROLES : OPEN_ROLES.filter((role) => role.department === department);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* =====================================================================
          1. DOCUMENTARY STUDIO PHOTO MOSAIC HERO ("INSIDE THE HIVE")
         ===================================================================== */}
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 border-b border-stone-200/80">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 sm:mb-14">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Careers at BWise • Life Inside the Hive</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-stone-950 leading-[1.06]">
                A studio for builders who care deeply about{' '}
                <span className="text-stone-500 font-normal">the work that actually ships.</span>
              </h1>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                We built BWise as an antidote to bloated agencies and feature-factory burnout. Here, senior engineers, product designers, and growth strategists work in small, autonomous pods with direct ownership from architectural whiteboard to production.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#open-roles"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  <span>Explore 6 Open Roles</span>
                  <ArrowDownRight className="w-4 h-4 text-amber-400" />
                </a>
                <span className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  Colombo Studio • London • Remote-First
                </span>
              </div>
            </div>
          </div>

          {/* Asymmetric Documentary Photo Mosaic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            {/* Primary LCP Studio Hero Image */}
            <figure className="lg:col-span-7 overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 flex flex-col justify-between">
              <img
                src={assetUrl('assets/pages/careers/hive-studio-hero.jpg')}
                alt="BWise engineers and designers collaborating around laptops and architectural notes in a sunlit studio"
                fetchPriority="high"
                width={1600}
                height={1000}
                className="w-full h-[280px] sm:h-[420px] object-cover"
              />
              <figcaption className="px-5 py-3.5 bg-stone-900 text-stone-300 text-xs flex items-center justify-between gap-4">
                <span>Cross-disciplinary pod sprint review — Engineering, Product Design & Growth under one roof</span>
                <span className="text-amber-400 font-mono shrink-0">01 / Studio Floor</span>
              </figcaption>
            </figure>

            {/* Right Stacked Documentary Photos */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              <figure className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-900">
                <img
                  src={assetUrl('assets/pages/careers/engineering-pairing.jpg')}
                  alt="Two systems engineers pairing on distributed ledger code at a dual-monitor desk"
                  width={1200}
                  height={800}
                  className="w-full h-[190px] sm:h-[195px] object-cover"
                />
                <figcaption className="px-4 py-2.5 bg-stone-900 text-stone-300 text-xs flex items-center justify-between">
                  <span>Systems pairing & live code review</span>
                  <span className="text-amber-400 font-mono">02 / Engineering</span>
                </figcaption>
              </figure>

              <figure className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-900">
                <img
                  src={assetUrl('assets/pages/careers/design-critique.jpg')}
                  alt="Product designers and brand strategists critiquing typography and layout prints"
                  width={1200}
                  height={800}
                  className="w-full h-[190px] sm:h-[195px] object-cover"
                />
                <figcaption className="px-4 py-2.5 bg-stone-900 text-stone-300 text-xs flex items-center justify-between">
                  <span>Weekly typography & interaction critique</span>
                  <span className="text-amber-400 font-mono">03 / Design Craft</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. "HOW WE WORK" — DOCUMENTARY PHOTO ESSAY (NO GENERIC ICON CARDS)
         ===================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#14111B] text-white border-b border-white/10">
        <div className="max-w-[1240px] mx-auto space-y-16 sm:space-y-24">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400 block mb-3">
              Our Operating Rhythm
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12]">
              How we protect maker time, elevate craft, and avoid agency bureaucracy.
            </h2>
          </div>

          {/* Essay Chapter I */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 border-t border-white/15">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                Principle 01 / Small Autonomous Pods
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                No chains of account managers playing telephone between you and the problem.
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Every BWise engagement is run by a tight-knit pod of 4 to 7 senior builders—a systems architect, product designer, frontend/mobile engineers, and growth lead. You help shape the technical direction directly with the founders and VPs whose products we build.
              </p>
              <blockquote className="pl-4 border-l-2 border-amber-400 text-xs sm:text-sm text-stone-300 italic">
                “In my first month at BWise, I co-designed a clinical FHIR pipeline with a hospital CMIO and saw it go live across 40 wards. Zero red tape—just focused engineering.”
                <footer className="mt-1.5 not-italic font-bold text-white">
                  — Lead Systems Architect, Software Solutions Studio
                </footer>
              </blockquote>
            </div>

            <div className="lg:col-span-6">
              <figure className="overflow-hidden rounded-2xl border border-white/15 bg-stone-900">
                <img
                  src={assetUrl('assets/pages/careers/architecture-whiteboard.jpg')}
                  alt="BWise pod mapping system architecture and user flows in a studio workshop"
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="w-full h-[260px] sm:h-[360px] object-cover"
                />
                <figcaption className="px-5 py-3 bg-[#1B1725] text-xs text-stone-300 flex items-center justify-between">
                  <span>Direct architecture workshop — zero middle-management handoffs</span>
                  <span className="text-amber-400 font-mono">Pod Autonomy</span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Essay Chapter II */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 border-t border-white/15">
            <div className="lg:col-span-6 lg:order-2 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                Principle 02 / Uninterrupted Deep Work
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Async-first communication and long blocks of quiet focus time every day.
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Great software and enduring brand systems aren’t built in back-to-back status meetings. We default to written RFCs, Loom walkthroughs, and protected 4-hour daily maker blocks so you can enter flow state and finish your work at a sustainable hour.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10 text-xs sm:text-sm">
                <div>
                  <p className="font-bold text-amber-400">Top-of-Market Compensation</p>
                  <p className="text-stone-400 mt-1">
                    Competitive base salary benchmarked globally, plus annual studio profit-sharing bonuses.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-amber-400">Hardware & Craft Budget</p>
                  <p className="text-stone-400 mt-1">
                    Apple M-series Max workstation, 4K studio display, and $2,000/yr for books, courses, and conferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <figure className="overflow-hidden rounded-2xl border border-white/15 bg-stone-900">
                <img
                  src={assetUrl('assets/pages/careers/quiet-deep-work.jpg')}
                  alt="Sunlit architectural studio space designed for quiet deep work and focus"
                  loading="lazy"
                  width={1400}
                  height={900}
                  className="w-full h-[260px] sm:h-[360px] object-cover"
                />
                <figcaption className="px-5 py-3 bg-[#1B1725] text-xs text-stone-300 flex items-center justify-between">
                  <span>Protected daily maker blocks & calm studio acoustics</span>
                  <span className="text-amber-400 font-mono">Deep Craft</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE OPEN POSITIONS LEDGER (#open-roles)
         ===================================================================== */}
      <section id="open-roles" className="py-16 sm:py-24 px-4 sm:px-8 scroll-mt-24">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-300">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700 block mb-2">
                Open Positions Directory
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950">
                Join one of our 12 specialized studios
              </h2>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter open roles by department">
              {DEPARTMENT_TABS.map((tab) => {
                const isActive = department === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setDepartment(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-stone-950 text-white shadow-xs'
                        : 'bg-stone-200/75 text-stone-700 hover:bg-stone-300/75 hover:text-stone-950'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expandable Editorial Roles Ledger */}
          <div className="divide-y divide-stone-300/90">
            <AnimatePresence mode="popLayout">
              {visibleRoles.map((role) => {
                const isExpanded = expandedRole === role.id;
                return (
                  <motion.div
                    key={role.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="py-6 sm:py-8"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedRole(isExpanded ? '' : role.id)}
                      aria-expanded={isExpanded}
                      className="w-full text-left flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5 text-xs">
                          <span className="font-mono font-bold text-amber-700">{role.code}</span>
                          <span className="text-stone-400">•</span>
                          <span className="font-bold text-stone-700">{role.studio}</span>
                          <span className="text-stone-400">•</span>
                          <span className="text-stone-500">{role.type}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-stone-950 group-hover:text-amber-700 transition-colors">
                          {role.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between lg:justify-end gap-6">
                        <span className="text-xs sm:text-sm font-medium text-stone-600 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          {role.location}
                        </span>
                        <span
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                            isExpanded
                              ? 'bg-stone-950 text-white border-stone-950 rotate-180'
                              : 'border-stone-300 text-stone-700 group-hover:border-stone-950'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </div>
                    </button>

                    {/* Expanded Role Brief */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-stone-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-6">
                          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">{role.summary}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2.5">
                              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-950">
                                Your First 90 Days
                              </h4>
                              <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                                {role.first90Days.map((item) => (
                                  <li key={item} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-2.5">
                              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-950">
                                Craft & Experience We Look For
                              </h4>
                              <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                                {role.craftRequirements.map((req) => (
                                  <li key={req} className="flex items-start gap-2">
                                    <span className="text-amber-600 font-bold">•</span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Stack & Direct Application Action */}
                        <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-stone-900 text-white space-y-6">
                          <div className="space-y-3">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                              Core Tools & Craft Stack
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {role.stackTags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-stone-200"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-stone-400 pt-2 leading-relaxed">
                              Our hiring process respects your time: a 30-minute conversation with a studio lead, a paid or real-world architecture/craft walkthrough (never whiteboard trick puzzles), and a final pod chat.
                            </p>
                          </div>

                          <Link
                            to={`/contact?role=${encodeURIComponent(role.title)}`}
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm transition-all"
                          >
                            <span>Apply for {role.code}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Open / Fellowship Application Banner */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                Open Craft Application
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold">
                Don’t see your exact title listed? Send us your favorite shipped work.
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                We are always eager to meet exceptional systems engineers, product designers, technical writers, and growth operators. Share a link to something you built and why you’re proud of it.
              </p>
            </div>
            <Link
              to="/contact?role=Open+Craft+Application"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-100 text-stone-950 font-bold text-sm transition-all"
            >
              <span>Introduce Yourself</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
