import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { BwiseBeeCharacter } from '../components/hive/BwiseBeeCharacter';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { assetUrl } from '../utils/assets';

const HIVE_PILLARS = [
  {
    number: '01',
    title: 'Software & Digital Marketing Under One Roof',
    summary:
      'Our web & mobile developers, UI/UX designers, and digital marketers collaborate in one Jaffna studio so your brand and technology move together.',
    metric: 'Unified Execution',
    icon: Layers,
  },
  {
    number: '02',
    title: 'Modern Tech & Search Visibility',
    summary:
      'We build fast, responsive web and mobile apps paired with technical SEO and AI search optimization (GEO) so customers find you first.',
    metric: 'Web, Mobile & AI',
    icon: Cpu,
  },
  {
    number: '03',
    title: 'Creative Branding & Measurable Growth',
    summary:
      'From unique logo design and brand identity to targeted social media campaigns on Facebook, Instagram, and LinkedIn.',
    metric: 'Results-Driven',
    icon: TrendingUp,
  },
];

const LEADERSHIP_PODS = [
  {
    pod: 'Studio Pod 01',
    name: 'Web & Mobile Software Engineering',
    leadRole: 'Full-Stack & Mobile Developers',
    summary: 'Custom websites, web applications, iOS/Android mobile apps, and thorough QA testing.',
    image: '/assets/pages/careers/engineering-pairing.jpg',
    tags: ['Web Development', 'Mobile Apps', 'QA & Testing'],
  },
  {
    pod: 'Studio Pod 02',
    name: 'SEO, AI & Generative Search',
    leadRole: 'Search & AI Specialists',
    summary: 'Search Engine Optimisation (SEO), AI workflow integration, and Generative Engine Optimisation (GEO).',
    image: '/assets/pages/careers/architecture-whiteboard.jpg',
    tags: ['Technical SEO', 'AI Optimization', 'GEO Visibility'],
  },
  {
    pod: 'Studio Pod 03',
    name: 'Social Media & Content Marketing',
    leadRole: 'Digital Marketing Specialists',
    summary: 'Data-driven social media advertising, consistent page management, and engaging visual/video content.',
    image: '/assets/pages/portfolio/kora-botanicals.jpg',
    tags: ['Facebook & Instagram Ads', 'Page Management', 'Content Creation'],
  },
  {
    pod: 'Studio Pod 04',
    name: 'Brand Identity, Logo & Analytics',
    leadRole: 'Creative Designers & Analysts',
    summary: 'Memorable logo design, cohesive brand guidelines, and clear digital performance reporting.',
    image: '/assets/pages/portfolio/studio-craft-process.jpg',
    tags: ['Unique Logo Design', 'Brand Handling', 'Digital Analytics'],
  },
];

const STUDIO_GALLERY = [
  {
    image: '/assets/pages/careers/hive-studio-hero.jpg',
    title: 'Collaborative Software & Creative Studio',
    location: 'Jaffna, Sri Lanka',
  },
  {
    image: '/assets/pages/careers/design-critique.jpg',
    title: 'Brand Identity, UI/UX & Social Creative',
    location: 'BWise Creative Wing · Jaffna',
  },
  {
    image: '/assets/pages/portfolio/studio-craft-process.jpg',
    title: 'Full-Stack Web & Mobile Engineering',
    location: 'BWise Engineering Pod · Jaffna',
  },
];

const OFFICIAL_SOCIALS = [
  {
    name: 'LinkedIn (@bwiselk)',
    href: 'https://www.linkedin.com/company/bwiselk/',
  },
  {
    name: 'Facebook (BWise)',
    href: 'https://www.facebook.com/profile.php?id=61592147020833',
  },
  {
    name: 'Instagram (@bwise.lk)',
    href: 'https://www.instagram.com/bwise.lk/?hl=en',
  },
];

export const AboutPage: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const { openConsultationModal } = useConsultationModal();

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden pt-24 sm:pt-28 pb-20">
      <HiveCornerDecorations
        className="hidden 2xl:block"
        leftClassName="top-6 2xl:-left-44"
        rightClassName="top-10 2xl:-right-52"
        opacityClassName="opacity-15"
      />

      {/* =====================================================================
          1. VISUAL HERO + JAFFNA STUDIO MOSAIC
         ===================================================================== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Concise Story */}
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/70 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Based in Jaffna, Sri Lanka
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.1]">
              Where Software Engineering Meets{' '}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                Creative Digital Growth.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              <strong>BWise (`bwise.lk`)</strong> is a Software Development &amp; Digital Marketing Agency headquartered in <strong>Jaffna, Sri Lanka</strong>. Inspired by the precision of a beehive, our 12 specialized studio cells bring together full-stack developers, mobile engineers, brand designers, and digital marketers to help businesses build modern software and grow their digital presence.
            </p>

            {/* Compact Highlights Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {[
                { value: 'Jaffna', label: 'Sri Lanka HQ' },
                { value: '12', label: 'Specialist Studios' },
                { value: '3', label: 'Core Divisions' },
                { value: '360°', label: 'Tech & Marketing' },
              ].map((st) => (
                <div
                  key={st.label}
                  className="rounded-2xl bg-white/90 border border-amber-200/80 p-3.5 shadow-2xs"
                >
                  <p className="text-xl sm:text-2xl font-extrabold text-amber-700">{st.value}</p>
                  <p className="text-[11px] font-bold text-stone-600 mt-0.5">{st.label}</p>
                </div>
              ))}
            </div>

            {/* Official Social Links */}
            <div className="pt-1">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 mb-2">
                Connect With BWise on Social Media
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {OFFICIAL_SOCIALS.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-amber-500 text-stone-800 hover:text-white text-xs font-bold border border-amber-200/90 shadow-2xs transition"
                  >
                    <span>{soc.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={openConsultationModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#D97706] text-[#14111B] text-xs sm:text-sm font-extrabold shadow-md transition hover:scale-105 cursor-pointer"
              >
                <span>Talk to Our Jaffna Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/services?category=software-solutions#software-solutions"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-amber-50 text-stone-800 text-xs sm:text-sm font-bold border border-amber-300/80 transition"
              >
                Explore Our Services
              </Link>
            </div>
          </div>

          {/* Right Interactive Studio Photo Switcher */}
          <div className="lg:col-span-6">
            <div className="rounded-[32px] bg-white/95 p-4 border-2 border-amber-300/80 shadow-[0_24px_60px_rgba(245,158,11,0.15)]">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 group">
                <img
                  key={STUDIO_GALLERY[activePhotoIdx].image}
                  src={assetUrl(STUDIO_GALLERY[activePhotoIdx].image)}
                  alt={STUDIO_GALLERY[activePhotoIdx].title}
                  fetchPriority="high"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[11px] font-extrabold">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {STUDIO_GALLERY[activePhotoIdx].location}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                      Inside BWise
                    </p>
                    <h3 className="text-lg font-extrabold">{STUDIO_GALLERY[activePhotoIdx].title}</h3>
                  </div>
                </div>
              </div>

              {/* Thumbnail Selector Strip */}
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                {STUDIO_GALLERY.map((item, idx) => {
                  const isCurrent = idx === activePhotoIdx;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-amber-500 ring-2 ring-amber-400/30 scale-[1.02]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={assetUrl(item.image)}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. 3 CONCISE HIVE ARCHITECTURE PILLARS
         ===================================================================== */}
      <section className="bg-white/90 backdrop-blur-xs py-16 border-y border-amber-200/70">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Our Approach
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                Why Businesses Choose the BWise Beehive
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md">
              Instead of juggling separate developers, designers, and social media freelancers, you get one coordinated team in Jaffna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIVE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="group rounded-3xl p-6 bg-[#FAF8F5] border border-amber-200/80 hover:border-amber-400 hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold">
                      {pillar.metric}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-stone-900">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. 4 VISUAL SPECIALIST PODS
         ===================================================================== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Our In-House Teams
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Four Specialist Pods Working Together
            </h2>
          </div>
          <Link
            to="/careers"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-amber-700 hover:text-amber-800"
          >
            Join Our Team in Jaffna <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEADERSHIP_PODS.map((pod) => (
            <div
              key={pod.pod}
              className="group rounded-3xl bg-white/95 border border-amber-200/80 hover:border-amber-400 overflow-hidden shadow-[0_12px_35px_rgba(26,22,18,0.05)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)] transition-all duration-300 flex flex-col sm:flex-row"
            >
              <div className="sm:w-48 h-48 sm:h-auto relative overflow-hidden bg-stone-900 shrink-0">
                <img
                  src={assetUrl(pod.image)}
                  alt={pod.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] font-extrabold uppercase">
                    {pod.pod}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-700">{pod.leadRole}</span>
                  <h3 className="text-lg font-extrabold text-stone-900 mt-0.5">{pod.name}</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{pod.summary}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-amber-100">
                  {pod.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FFF8E7] text-stone-800 text-[11px] font-semibold border border-amber-200/70"
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-600" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. CONCISE BOTTOM CTA BANNER
         ===================================================================== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="rounded-[32px] bg-gradient-to-r from-[#F9E2AE]/90 via-[#FFF8E7]/95 to-[#F9E4B7]/90 border-2 border-amber-300/80 p-8 sm:p-12 shadow-[0_18px_50px_rgba(245,158,11,0.16)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="hidden sm:block shrink-0">
              <BwiseBeeCharacter className="w-24 h-24 drop-shadow-md" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Partner With BWise · Jaffna, Sri Lanka
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                Ready to build your software or scale your brand?
              </h2>
            </div>
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
