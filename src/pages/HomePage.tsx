import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle2, Layers, ShieldCheck, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { BeehiveLandingExperience } from '../components/hive/BeehiveLandingExperience';
import { PRIORITY_SERVICES } from '../data/servicesData';
import { ServiceIcon } from '../components/hive/HoneycombGrid3D';
import { BwiseBeeCharacter } from '../components/hive/BwiseBeeCharacter';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const agencyStats = [
    { value: '12', label: 'Specialized Beehive Studios', detail: 'Unified under one roof' },
    { value: '340+', label: 'Enterprise Digital Launches', detail: 'Across 18 global markets' },
    { value: '4.9★', label: 'Client Satisfaction Score', detail: '96% multi-year retention' },
    { value: '$180M+', label: 'Client Pipeline Generated', detail: 'Verified analytics attribution' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* =====================================================================
          HERO: S1 -> S2 -> S3 -> 3D TUNNEL -> S4 INTERACTIVE BEE & BEEHIVE
         ===================================================================== */}
      <BeehiveLandingExperience />

      {/* =====================================================================
          AGENCY IMPACT METRICS STRIP
         ===================================================================== */}
      <section className="bg-[#161310] text-white py-12 border-y border-amber-500/20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {agencyStats.map((stat, idx) => (
              <div key={idx} className="text-center lg:text-left border-l-2 border-amber-500/40 pl-5">
                <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base font-bold text-white mt-1">{stat.label}</p>
                <p className="text-xs text-stone-400 mt-0.5">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE 12 PRIORITY SERVICES DIRECTORY OVERVIEW
         ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Architectural Precision
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
              12 Priority Studios. One Connected Beehive.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-stone-600 max-w-md">
            Every hexagonal room inside the Bwise Hive houses a dedicated specialist pod—combining strategic marketing, AI search optimization, and full-stack software engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PRIORITY_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => navigate(`/services?service=${service.slug}#${service.slug}`)}
              className="group bg-white rounded-3xl p-6 border border-stone-200/80 hover:border-amber-400 shadow-[0_10px_30px_rgba(26,22,18,0.04)] hover:shadow-[0_20px_45px_rgba(245,158,11,0.14)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                    <ServiceIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-stone-400 group-hover:text-amber-600">
                    #{String(service.id).padStart(2, '0')}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  {service.category}
                </span>

                <h3 className="text-lg font-extrabold text-stone-900 mt-2.5 group-hover:text-amber-700 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {service.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-500">
                  {service.s4Room.kpiHighlight}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-600 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          WHY THE BEEHIVE MODEL WORKS (DESIGN + ENGINEERING SYNERGY)
         ===================================================================== */}
      <section className="bg-white py-20 border-y border-stone-200/70">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                The Bwise Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Why Ambitious Brands Choose Our Connected Hive Architecture
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Traditional agencies operate in disconnected silos—your web developers never speak to your SEO strategists, and your paid media buyers don&apos;t coordinate with your AI engineers. Inside the Bwise Beehive, every studio cell shares real-time telemetry, creative insights, and attribution data.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    icon: Zap,
                    title: 'Cross-Pollinated Growth',
                    desc: 'SEO, GEO, Paid Social, and Content studios share live keyword and conversion signals daily.',
                  },
                  {
                    icon: Layers,
                    title: 'Full-Stack Execution',
                    desc: 'From unique logo crafting to high-scale web, mobile, and AI agent engineering.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Verified Revenue BI',
                    desc: 'Every campaign and code deployment is tied directly to pipeline and net margin.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Dedicated Studio Pods',
                    desc: 'Direct access to senior architects, designers, and growth engineers in every room.',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-2.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-extrabold text-stone-900">{item.title}</h3>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Visual Showcase: Inside the Hive Conference Studio */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-300/50 bg-stone-900">
                <img
                  src="/reference/S4.jpg"
                  alt="Inside the Bwise Beehive Strategy Studio"
                  className="w-full h-auto object-cover"
                />
                <div className="p-6 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Collaborative Hive Studio
                    </span>
                    <h4 className="text-base font-extrabold">
                      Interactive Requirements &amp; Wireframe Briefing
                    </h4>
                  </div>
                  <Link
                    to="/services"
                    className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shrink-0 transition"
                  >
                    Enter Services Studio →
                  </Link>
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
