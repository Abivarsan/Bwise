import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  Compass,
  Cpu,
  Globe,
  Hexagon,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { BwiseBeeCharacter } from '../components/hive/BwiseBeeCharacter';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { PRIORITY_SERVICES } from '../data/servicesData';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      icon: Hexagon,
      title: 'Structural Efficiency',
      description:
        'In nature, the hexagonal honeycomb achieves maximum structural strength with minimal material waste. We organize our engineering and marketing sprints the exact same way—zero bloat, maximum velocity.',
    },
    {
      icon: Cpu,
      title: 'Swarm Intelligence & AI',
      description:
        'Our 12 specialized studios share live telemetry across SEO, Generative Engine Optimization (GEO), Paid Media, and Software Engineering so insights in one room immediately strengthen every other channel.',
    },
    {
      icon: Target,
      title: 'Measurable Commercial Nectar',
      description:
        'We reject vanity metrics. Every design system, code deployment, and media campaign is engineered around verified pipeline attribution, customer lifetime value, and net revenue growth.',
    },
  ];

  const leadershipPods = [
    {
      role: 'Strategy & Growth Pod',
      lead: 'Elena Rostova — Chief Strategy Officer',
      studios: ['Digital Strategy Ideas', 'Social Media Advertising', 'Digital Analytics'],
      highlight: 'Former VP of Growth scaling 4 SaaS unicorns from Series A to IPO.',
    },
    {
      role: 'Search & AI Intelligence Pod',
      lead: 'Dr. Marcus Vance — Head of AI & Search',
      studios: ['Search Engine Optimisation', 'Generative Engine Optimisation', 'Artificial Intelligence Optimization'],
      highlight: 'Pioneered LLM citation frameworks and enterprise RAG agent architectures.',
    },
    {
      role: 'Creative & Brand Equity Pod',
      lead: 'Aria Thorne — Executive Creative Director',
      studios: ['Content Marketing', 'Social Media Management', 'Brand Handling', 'Unique Logo Designing'],
      highlight: 'Multi-award-winning identity architect with 15+ years in global brand design.',
    },
    {
      role: 'Full-Stack & Mobile Engineering Pod',
      lead: 'Devon K. Sterling — Principal Systems Architect',
      studios: ['Web Development', 'Mobile App Development'],
      highlight: 'Architected high-concurrency web & mobile platforms serving 40M+ monthly users.',
    },
  ];

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden">
      {/* Decorative Honeycomb/Pentagon Line Art at Top-Left & Top-Right Edges */}
      <HiveCornerDecorations />

      {/* Hero Banner */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 space-y-5"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              About Bwise Agency
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.1]">
              Built Like a Beehive. Engineered for Digital Dominance.
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              Founded on the principle that modern digital growth requires seamless collaboration between creative storytelling, algorithmic search intelligence, and rock-solid software engineering, <strong>Bwise</strong> brings 12 specialized studios together inside one unified Hive architecture.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#F5A646] to-[#E08319] hover:from-[#F29A30] hover:to-[#CC720E] text-white text-sm font-bold shadow-[0_10px_25px_rgba(224,131,25,0.35)] transition"
              >
                Explore Our 12 Studios
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-amber-50 text-stone-800 text-sm font-bold border border-stone-300 transition"
              >
                Meet Our Team →
              </Link>
            </div>
          </motion.div>

          {/* Right Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full rounded-[32px] bg-gradient-to-br from-[#F9E4B7] via-[#F2CE89] to-[#E3A84B] p-8 shadow-xl border border-amber-300/70 flex flex-col items-center text-center">
              <BwiseBeeCharacter className="w-52 h-52" />
              <h3 className="text-xl font-extrabold text-stone-900 mt-2">
                The Bwise Hive Philosophy
              </h3>
              <p className="text-xs sm:text-sm text-stone-800 mt-1.5 leading-relaxed">
                Every bee in a hive has a clear mission, communicates in real time, and builds upon the same geometric foundation. That is how we deliver complex digital products on time, every time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="bg-white py-16 border-y border-stone-200/70">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Our Core DNA
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
              Why the Honeycomb Is Our Blueprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#FAF8F5] p-7 border border-stone-200/80 hover:border-amber-400 transition-all shadow-xs"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center mb-5 shadow-md shadow-amber-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-stone-900 mb-2">{pillar.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Functional Department Pods */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              Specialist Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
              4 Interdisciplinary Pods. {PRIORITY_SERVICES.length} Dedicated Studios.
            </h2>
          </div>
          <Link to="/" className="text-sm font-bold text-amber-700 hover:text-amber-800 underline">
            Launch Interactive Beehive Map →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadershipPods.map((pod, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold">
                    Pod 0{idx + 1}
                  </span>
                  <Users className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-extrabold text-stone-900">{pod.role}</h3>
                <p className="text-xs font-bold text-amber-700 mt-1">{pod.lead}</p>
                <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                  {pod.highlight}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Connected Hive Rooms:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {pod.studios.map((st, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-stone-200 text-xs font-semibold text-stone-800"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
