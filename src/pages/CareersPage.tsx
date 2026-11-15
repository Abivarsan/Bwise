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

type RoleDepartment = 'All' | 'Engineering' | 'Design' | 'Marketing';

interface OpenRole {
  id: string;
  title: string;
  department: Exclude<RoleDepartment, 'All'>;
  pod: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

const OPEN_ROLES: OpenRole[] = [
  {
    id: 'fullstack-software-engineer',
    title: 'Full-Stack Software Engineer',
    department: 'Engineering',
    pod: 'Software Solutions · Web & Cloud Pod',
    location: 'Jaffna, Sri Lanka (On-Site / Hybrid)',
    type: 'Full-Time',
    summary:
      'Build modern, responsive web applications, backend APIs, and scalable cloud solutions for local and international clients.',
    highlights: [
      'Develop full-stack web platforms using React, Next.js, TypeScript, and Node.js',
      'Integrate databases, REST/GraphQL APIs, and third-party payment/service gateways',
      'Collaborate directly with UI/UX designers and QA engineers in agile sprints',
    ],
    stack: ['React / Next.js', 'TypeScript', 'Node.js', 'PostgreSQL / MongoDB', 'Git'],
  },
  {
    id: 'associate-software-engineer',
    title: 'Associate Software Engineer (Web & Mobile)',
    department: 'Engineering',
    pod: 'Software Solutions · Web & Mobile Pod',
    location: 'Jaffna, Sri Lanka (On-Site / Hybrid)',
    type: 'Full-Time',
    summary:
      'Contribute to custom web and cross-platform mobile applications while growing your engineering craft alongside senior developers.',
    highlights: [
      'Build reusable UI components and mobile screens with React and React Native / Flutter',
      'Write clean, maintainable code and participate in peer code reviews',
      'Assist with API integration, performance tuning, and automated testing',
    ],
    stack: ['React', 'React Native / Flutter', 'JavaScript / TypeScript', 'REST APIs'],
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing & Social Media Executive',
    department: 'Marketing',
    pod: 'Social Media Marketing · Growth Pod',
    location: 'Jaffna, Sri Lanka (On-Site / Hybrid)',
    type: 'Full-Time',
    summary:
      'Plan, launch, and optimize high-performing social media campaigns, page management, and SEO/content strategies for client brands.',
    highlights: [
      'Manage client pages and paid ad campaigns across Facebook, Instagram, LinkedIn, and Google',
      'Coordinate monthly content calendars, short-form video reels, and copywriting',
      'Track campaign KPIs, lead generation, and ROI through clear analytics reports',
    ],
    stack: ['Meta Ads Manager', 'Instagram & LinkedIn', 'SEO & Content', 'Google Analytics'],
  },
  {
    id: 'ui-ux-brand-designer',
    title: 'UI/UX & Creative Brand Designer',
    department: 'Design',
    pod: 'Digital Strategy · Brand & Creative Pod',
    location: 'Jaffna, Sri Lanka (On-Site / Hybrid)',
    type: 'Full-Time',
    summary:
      'Craft memorable brand identities, custom logos, social media creatives, and intuitive web/mobile UI/UX prototypes.',
    highlights: [
      'Design modern web and mobile app interfaces in Figma from wireframe to prototype',
      'Create unique vector logos, brand guidelines, and engaging social media visuals',
      'Work closely with developers and marketers to keep brand quality consistent',
    ],
    stack: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Brand Identity', 'UI/UX Systems'],
  },
  {
    id: 'intern-software-marketing-qa',
    title: 'Intern – Full-Stack Development / Digital Marketing / QA',
    department: 'Engineering',
    pod: 'BWise Jaffna Studio · Mentored Track',
    location: 'Jaffna, Sri Lanka (On-Site / Hybrid)',
    type: 'Internship (6 Months)',
    summary:
      'Kickstart your tech or digital marketing career with hands-on mentorship on live client projects at our Jaffna studio.',
    highlights: [
      'Work on real production websites, mobile apps, QA test suites, or digital campaigns',
      'Receive direct guidance and weekly feedback from experienced engineers and marketers',
      'Opportunity to transition into a permanent full-time role upon completion',
    ],
    stack: ['Web & Mobile Basics', 'QA Testing', 'Digital Marketing', 'Team Collaboration'],
  },
];

const CULTURE_CARDS = [
  {
    icon: MapPin,
    title: 'Heart of Jaffna Tech Community',
    desc: 'Build global-standard software and creative campaigns right from our collaborative studio in Jaffna, Sri Lanka.',
  },
  {
    icon: Cpu,
    title: 'Hands-On Modern Tech Stack',
    desc: 'Work with React, TypeScript, mobile frameworks, AI search optimization (GEO), and modern creative tools.',
  },
  {
    icon: Clock,
    title: 'Supportive Mentorship & Growth',
    desc: 'Continuous learning, peer code/design reviews, and clear career progression from intern to lead.',
  },
  {
    icon: Globe2,
    title: 'Local & International Projects',
    desc: 'Deliver impactful digital products and marketing campaigns for businesses across Sri Lanka and worldwide.',
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
              Jaffna, Sri Lanka · Hiring Now
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 mt-2.5">
              Build Your Career With BWise in Jaffna.
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-stone-600 max-w-md">
              Join our growing team of software engineers, UI/UX designers, and digital marketers in Jaffna, Sri Lanka.
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
              alt="BWise engineers and designers collaborating in Jaffna studio"
              fetchPriority="high"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  BWise Studio Culture
                </span>
                <p className="text-base sm:text-lg font-extrabold mt-0.5">
                  Jaffna, Sri Lanka · On-Site &amp; Hybrid Pods
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-extrabold">
                Software &amp; Digital Agency
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <div className="relative rounded-[24px] overflow-hidden bg-stone-900 aspect-[16/9] border border-amber-200/80 group">
              <img
                src={assetUrl('/assets/pages/careers/engineering-pairing.jpg')}
                alt="Software engineers collaborating on web and mobile code"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Software Solutions
                </p>
                <p className="text-sm font-extrabold">Full-Stack, Mobile &amp; QA</p>
              </div>
            </div>

            <div className="relative rounded-[24px] overflow-hidden bg-stone-900 aspect-[16/9] border border-amber-200/80 group">
              <img
                src={assetUrl('/assets/pages/careers/design-critique.jpg')}
                alt="Brand designers and digital marketers reviewing campaign creatives"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Creative &amp; Marketing
                </p>
                <p className="text-sm font-extrabold">Branding, UI/UX &amp; Social Media</p>
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
              Open Positions in Jaffna
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mt-1">
              Find Your Seat in the Hive
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Engineering', 'Design', 'Marketing'] as RoleDepartment[]).map((dept) => {
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
                        {role.department === 'Marketing' && <TrendingUp className="w-3 h-3" />}
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
                      {role.type}
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
                              Skills &amp; Tools
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
                            href={`mailto:info@bwise.lk?subject=${encodeURIComponent(
                              `Career Application: ${role.title} - BWise Jaffna`
                            )}`}
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#D97706] text-[#14111B] text-xs font-extrabold shadow-sm transition"
                          >
                            Apply via Email
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

        {/* Social Media Recruitment Strip */}
        <div className="mt-10 rounded-3xl bg-white/95 border border-amber-200/90 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-stone-800">
              Follow BWise on social media for the latest hiring announcements, internship intakes, and studio updates in Jaffna:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="https://www.linkedin.com/company/bwiselk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#FFF8E7] hover:bg-amber-500 text-stone-900 hover:text-white text-xs font-extrabold border border-amber-300/80 transition"
            >
              LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61592147020833"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#FFF8E7] hover:bg-amber-500 text-stone-900 hover:text-white text-xs font-extrabold border border-amber-300/80 transition"
            >
              Facebook <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/bwise.lk/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#FFF8E7] hover:bg-amber-500 text-stone-900 hover:text-white text-xs font-extrabold border border-amber-300/80 transition"
            >
              Instagram <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
