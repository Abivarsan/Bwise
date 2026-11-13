import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Code2,
  Cpu,
  Globe2,
  MapPin,
  Palette,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { assetUrl } from '../utils/assets';

type RoleDepartment = 'All' | 'Engineering' | 'Design' | 'Growth';

interface OpenRole {
  id: string;
  title: string;
  department: Exclude<RoleDepartment, 'All'>;
  pod: string;
  location: string;
  compensation: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

const OPEN_ROLES: OpenRole[] = [
  {
    id: 'staff-fullstack-engineer',
    title: 'Staff Full-Stack Systems Engineer',
    department: 'Engineering',
    pod: 'Studio #09 · Web & Cloud Architecture',
    location: 'Toronto / Hybrid or Remote (UTC-5 to UTC+2)',
    compensation: '$165,000 – $195,000 CAD + Profit Share',
    summary:
      'Architect and ship sub-second React/Next.js platforms and real-time distributed backends for enterprise clients.',
    highlights: [
      'Own system architecture from discovery to production CI/CD',
      'Build real-time WebSocket, GraphQL, and edge-cached web systems',
      'Collaborate directly with design and SEO/GEO leads in a 5-person pod',
    ],
    stack: ['TypeScript', 'React 19 / Next.js', 'Node.js / Go', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'senior-ai-geo-engineer',
    title: 'Senior AI & Generative Engine (GEO) Engineer',
    department: 'Engineering',
    pod: 'Studio #05 & #08 · AI & Generative Search',
    location: 'Remote Global (Async-First)',
    compensation: '$150,000 – $180,000 USD Equivalent',
    summary:
      'Build production RAG pipelines, autonomous AI agents, and structured citation graphs across ChatGPT, Perplexity, and Gemini.',
    highlights: [
      'Ship low-latency tool-calling AI agents with strict accuracy evals',
      'Architect entity knowledge graphs that lift brand citation share',
      'Maintain real-time LLM citation telemetry pipelines',
    ],
    stack: ['Python', 'TypeScript', 'OpenAI / Anthropic / Gemini', 'Vector DBs'],
  },
  {
    id: 'principal-product-designer',
    title: 'Principal Brand & Product Designer',
    department: 'Design',
    pod: 'Studio #11 & #12 · Brand & Design Systems',
    location: 'London / Toronto / Remote',
    compensation: '$140,000 – $170,000 USD Equivalent',
    summary:
      'Craft tactile digital flagships, geometric brand identities, and tokenized Figma-to-code design systems.',
    highlights: [
      'Lead visual identity, typography, and motion choreography',
      'Deliver production-ready Figma token libraries paired with React',
      'Co-design interactive 3D/WebGL storytelling moments',
    ],
    stack: ['Figma Tokens', 'Editorial Typography', 'Motion / Rive', 'Design Systems'],
  },
  {
    id: 'senior-mobile-engineer',
    title: 'Senior iOS & Cross-Platform Mobile Engineer',
    department: 'Engineering',
    pod: 'Studio #10 · Mobile App Engineering',
    location: 'Colombo / Toronto / Remote',
    compensation: 'Competitive Global Base + Annual Pod Bonus',
    summary:
      'Build 60fps mobile experiences with biometric security and offline-first sync for FinTech and HealthTech.',
    highlights: [
      'Develop React Native and native Swift/Kotlin modules',
      'Implement hardware-backed passkey & biometric security',
      'Maintain automated Maestro/Detox device-farm QA pipelines',
    ],
    stack: ['React Native', 'Swift / SwiftUI', 'Kotlin', 'Offline Sync', 'CI/CD'],
  },
  {
    id: 'growth-paid-social-lead',
    title: 'Performance Creative & Paid Social Strategist',
    department: 'Growth',
    pod: 'Studio #03 · Social Media Advertising',
    location: 'Toronto / New York / Remote',
    compensation: '$115,000 – $145,000 + Performance Tier',
    summary:
      'Lead high-velocity paid social experimentation and server-side attribution across Meta, TikTok, and LinkedIn.',
    highlights: [
      'Manage $100k–$1M+/mo paid acquisition budgets with ROAS rigor',
      'Direct weekly creative hook & landing page sprints with designers',
      'Partner with Analytics Studio on multi-touch warehouse attribution',
    ],
    stack: ['Meta CAPI', 'TikTok & LinkedIn Ads', 'Creative Testing', 'GA4 / BigQuery'],
  },
];

const CULTURE_CARDS = [
  {
    icon: Clock,
    title: '4-Hour Uninterrupted Deep Work',
    desc: 'Async-first written RFCs and Looms protect daily maker time for code and craft.',
  },
  {
    icon: Cpu,
    title: 'Direct Principal Autonomy',
    desc: 'Small 4–5 person pods talk directly with technical founders—zero middle-management layers.',
  },
  {
    icon: Sparkles,
    title: 'Frontier AI & Hardware Budget',
    desc: 'M4 Max MacBooks, studio displays, and unlimited frontier AI model & tooling access.',
  },
  {
    icon: Globe2,
    title: 'Global Hubs + Profit Share',
    desc: 'Top-decile base pay plus quarterly studio profit pools across Toronto, London, and Colombo.',
  },
];

export const CareersPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<RoleDepartment>('All');
  const [expandedRole, setExpandedRole] = useState<string | null>(OPEN_ROLES[0].id);

  const filteredRoles =
    selectedDept === 'All'
      ? OPEN_ROLES
      : OPEN_ROLES.filter((role) => role.department === selectedDept);

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden text-stone-900 pt-24 sm:pt-28 pb-20">
      <HiveCornerDecorations />

      {/* =====================================================================
          1. VISUAL STUDIO HERO + 3-PHOTO DOCUMENTARY MOSAIC
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              {OPEN_ROLES.length} Open Roles · Hiring Now
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 mt-2.5">
              Do the Best Work of Your Career.
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-stone-600 max-w-md">
              We are a collective of principal engineers, designers, and growth operators shipping category-defining software without agency theater.
            </p>
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-950 hover:bg-amber-500 text-white hover:text-stone-950 text-xs font-extrabold transition shrink-0"
            >
              View Open Roles <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3-Photo Studio Documentary Mosaic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 relative rounded-[28px] overflow-hidden bg-stone-900 aspect-[16/10] shadow-lg border-2 border-amber-300/70 group">
            <img
              src={assetUrl('/assets/pages/careers/hive-studio-hero.jpg')}
              alt="BWise architects and designers collaborating around studio table"
              fetchPriority="high"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  Cross-Functional Pods
                </span>
                <p className="text-base sm:text-lg font-extrabold mt-0.5">
                  Toronto · Colombo · London · Remote
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-extrabold">
                94% 3-Year Retention
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <div className="relative rounded-[24px] overflow-hidden bg-stone-900 aspect-[16/9] border border-amber-200/80 group">
              <img
                src={assetUrl('/assets/pages/careers/engineering-pairing.jpg')}
                alt="Two senior engineers pairing at dual-monitor workstation"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Engineering Craft
                </p>
                <p className="text-sm font-extrabold">Direct Principal Pairing</p>
              </div>
            </div>

            <div className="relative rounded-[24px] overflow-hidden bg-stone-900 aspect-[16/9] border border-amber-200/80 group">
              <img
                src={assetUrl('/assets/pages/careers/design-critique.jpg')}
                alt="Brand and product designers reviewing typography and interface tokens"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Design &amp; Growth
                </p>
                <p className="text-sm font-extrabold">Weekly Live Critiques</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. 4 VISUAL CULTURE & PERK CARDS
         ===================================================================== */}
      <section className="bg-white/90 backdrop-blur-xs py-14 border-y border-amber-200/70">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="p-5 rounded-3xl bg-[#FAF8F5] border border-amber-200/80 hover:border-amber-400 hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center mb-3 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-stone-900">
                    {card.title}
                  </h2>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. STREAMLINED INTERACTIVE OPEN ROLES BOARD
         ===================================================================== */}
      <section id="open-positions" className="max-w-[1320px] mx-auto px-4 sm:px-8 pt-16 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Open Positions
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mt-1">
              Find Your Seat in the Hive
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Engineering', 'Design', 'Growth'] as RoleDepartment[]).map((dept) => {
              const isSelected = selectedDept === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm'
                      : 'bg-white hover:bg-amber-50 text-stone-700 border border-amber-200/80'
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3.5">
          {filteredRoles.map((role) => {
            const isOpen = expandedRole === role.id;
            return (
              <div
                key={role.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-amber-400 shadow-[0_18px_45px_rgba(245,158,11,0.14)]'
                    : 'bg-white/95 border-amber-200/80 hover:border-amber-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedRole(isOpen ? null : role.id)}
                  className="w-full p-5 sm:p-6 text-left flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                        {role.department === 'Engineering' && <Code2 className="w-3 h-3" />}
                        {role.department === 'Design' && <Palette className="w-3 h-3" />}
                        {role.department === 'Growth' && <TrendingUp className="w-3 h-3" />}
                        {role.department}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">{role.pod}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-stone-950">
                      {role.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 lg:shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-600">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {role.location}
                    </span>
                    <span className="text-xs font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      {role.compensation}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'bg-amber-500 text-white rotate-180' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-amber-100 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FFFDF9]">
                        <div className="lg:col-span-8 space-y-3">
                          <p className="text-sm text-stone-700 font-medium leading-relaxed">
                            {role.summary}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                            {role.highlights.map((item, i) => (
                              <div
                                key={i}
                                className="p-3 rounded-2xl bg-white border border-amber-200/70 text-xs text-stone-700 flex items-start gap-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200/80">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 mb-2">
                              Core Stack
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {role.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 rounded-lg bg-[#FFF8E7] text-stone-800 text-xs font-semibold border border-amber-200/70"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <a
                            href={`mailto:careers@bwisedigital.com?subject=${encodeURIComponent(
                              `Application: ${role.title} (${role.pod})`
                            )}`}
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#D97706] text-[#14111B] text-xs font-extrabold shadow-sm transition"
                          >
                            Apply for This Role
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
