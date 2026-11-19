import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Code2,
  Palette,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  GraduationCap,
  Laptop,
  Banknote,
  AlertCircle,
} from 'lucide-react';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { ParallaxImage, Reveal, StaggerGroup, StaggerItem } from '../components/motion/ScrollReveal';
import { assetUrl } from '../utils/assets';

type RoleDepartment = 'All' | 'Engineering' | 'Design' | 'Marketing';

interface RoleQualification {
  title: string;
  desc: string;
}

interface OpenRole {
  id: string;
  title: string;
  department: Exclude<RoleDepartment, 'All'>;
  pod: string;
  badge: string;
  location: string;
  workMode: string;
  type: string;
  stipend: string;
  summary: string;
  eligibility: string;
  qualifications: RoleQualification[];
  stack: string[];
  applyUrl: string;
  deadlineNotice: string;
  socialNotice: string;
  posterImage: string;
}

const OPEN_ROLES: OpenRole[] = [
  {
    id: 'fullstack-developer-intern',
    title: 'Fullstack Developer Intern',
    department: 'Engineering',
    pod: 'Software Solutions · Web & Cloud Pod',
    badge: 'Intern',
    location: '100% Remote · Sri Lanka',
    workMode: '100% Remote',
    type: 'Internship',
    stipend: 'LKR 25,000 / Month',
    summary:
      'Ready to turn your coding skills into real-world experience? Bwise Digital Marketing & Software Solutions is looking for a passionate and motivated Fullstack Developer Intern to join our growing team! Gain practical experience, work on real projects, and grow your development skills with Bwise.',
    eligibility:
      'Recent graduates and 4th-year undergraduate students are welcome to apply!',
    qualifications: [
      {
        title: 'Front-End Fundamentals',
        desc: 'Basic understanding of front-end (HTML, CSS, JavaScript).',
      },
      {
        title: 'Back-End & Frameworks',
        desc: 'Familiarity with React, Node.js, Laravel or similar frameworks.',
      },
      {
        title: 'Databases',
        desc: 'Understanding and knowledge of databases (MySQL / MongoDB).',
      },
      {
        title: 'Version Control & APIs',
        desc: 'Basic knowledge of REST APIs, Git & GitHub.',
      },
      {
        title: 'Problem-Solving & Teamwork',
        desc: 'Strong problem-solving skills and willingness to learn and work in a team.',
      },
    ],
    stack: [
      'HTML5 & CSS3',
      'JavaScript',
      'React',
      'Node.js',
      'Laravel',
      'MySQL',
      'MongoDB',
      'REST APIs',
      'Git & GitHub',
    ],
    applyUrl: 'https://lnkd.in/gt2bASV7',
    deadlineNotice: 'Applications are open for 14 days from the date of this post.',
    socialNotice:
      "Applicants must follow Bwise's official Facebook, LinkedIn, and Instagram pages as part of the application requirements.",
    posterImage: '/assets/pages/careers/fullstack-developer-intern-hiring.jpg',
  },
];

const CULTURE_CARDS = [
  {
    title: 'Heart of Jaffna Tech Community',
    desc: 'Build global-standard software and creative campaigns right from our collaborative studio in Jaffna, Sri Lanka.',
  },
  {
    title: 'Hands-On Modern Tech Stack',
    desc: 'Work with React, TypeScript, mobile frameworks, AI search optimization (GEO), and modern creative tools.',
  },
  {
    title: 'Supportive Mentorship & Growth',
    desc: 'Continuous learning, peer code/design reviews, and clear career progression from intern to lead.',
  },
  {
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
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-14 relative z-10">
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              We Are Hiring · 1 Active Opening (100% Remote)
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 mt-2.5">
              Build Your Career With BWise.
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-stone-600 max-w-md">
              Join our growing team with 100% remote positions and our collaborative tech studio in Jaffna, Sri Lanka.
            </p>
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-950 hover:bg-amber-500 text-white hover:text-stone-950 text-xs font-extrabold transition shrink-0"
            >
              View Open Roles <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        {/* 3-Photo Studio Documentary Mosaic */}
        <StaggerGroup className="grid grid-cols-1 lg:grid-cols-12 gap-5" stagger={0.1}>
          <StaggerItem className="lg:col-span-7 relative rounded-[28px] overflow-hidden bg-stone-900 aspect-[16/10] shadow-lg border-2 border-amber-300/70 group">
            <ParallaxImage
              src={assetUrl('/assets/pages/careers/hive-studio-hero.jpg')}
              alt="BWise engineers and designers collaborating in Jaffna studio"
              fetchPriority="high"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-end justify-between gap-2 text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  BWise Studio Culture
                </span>
                <p className="text-sm sm:text-lg font-extrabold mt-0.5">
                  Jaffna, Sri Lanka · On-Site &amp; Hybrid Pods
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[11px] sm:text-xs font-extrabold shrink-0">
                Software &amp; Digital Agency
              </span>
            </div>
          </StaggerItem>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <StaggerItem className="relative rounded-[24px] overflow-hidden bg-stone-900 aspect-[16/9] border border-amber-200/80 group">
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
            </StaggerItem>

            <StaggerItem className="relative rounded-[24px] overflow-hidden bg-stone-900 aspect-[16/9] border border-amber-200/80 group">
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
            </StaggerItem>
          </div>
        </StaggerGroup>
      </section>

      {/* =====================================================================
          2. 4 VISUAL CULTURE & PERK CARDS
         ===================================================================== */}
      <section className="bg-white/90 backdrop-blur-xs py-14 border-y border-amber-200/70">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
            {CULTURE_CARDS.map((card) => (
              <StaggerItem
                key={card.title}
                className="p-6 rounded-3xl bg-[#FAF8F5] border border-amber-200/80 hover:border-amber-400 hover:bg-white transition-[background-color,border-color,translate] duration-300 hover:-translate-y-1 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-stone-900 leading-snug">
                    {card.title}
                  </h2>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{card.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* =====================================================================
          3. STREAMLINED INTERACTIVE OPEN ROLES BOARD
         ===================================================================== */}
      <section id="open-positions" className="max-w-[1320px] mx-auto px-4 sm:px-8 pt-16 scroll-mt-24 relative z-10">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Active Openings · Hiring Now
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mt-1">
              Find Your Seat in the Hive
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Engineering', 'Design', 'Marketing'] as RoleDepartment[]).map((dept) => {
              const isSelected = selectedDept === dept;
              const count =
                dept === 'All'
                  ? OPEN_ROLES.length
                  : OPEN_ROLES.filter((role) => role.department === dept).length;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm'
                      : 'bg-white hover:bg-amber-50 text-stone-700 border border-amber-200/80'
                  }`}
                >
                  <span>{dept}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/25 text-white'
                        : count > 0
                        ? 'bg-amber-100 text-amber-800 font-extrabold'
                        : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Roles List or Empty State */}
        <Reveal delay={0.08}>
        {filteredRoles.length === 0 ? (
          <div className="rounded-3xl border border-amber-200/90 bg-white/95 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-950">
              No Active Openings in {selectedDept} Right Now
            </h3>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              We do not have open vacancies in {selectedDept} today, but we are actively accepting applications for our{' '}
              <strong className="text-stone-900">
                Fullstack Developer Intern (100% Remote · LKR 25,000/mo)
              </strong>{' '}
              in Engineering.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedDept('Engineering')}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-extrabold hover:shadow-md transition cursor-pointer"
              >
                View Engineering Opening (1)
              </button>
              <button
                type="button"
                onClick={() => setSelectedDept('All')}
                className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition cursor-pointer"
              >
                View All Openings
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
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
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[11px] font-black uppercase tracking-wider shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-950 animate-pulse" />
                          {role.badge}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                          <Code2 className="w-3 h-3" />
                          {role.department}
                        </span>
                        <span className="text-xs font-semibold text-stone-500">{role.pod}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight">
                        {role.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1.5 rounded-full">
                        <Laptop className="w-3.5 h-3.5 text-amber-600" />
                        {role.workMode}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-950 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-2xs">
                        <Banknote className="w-4 h-4 text-amber-700" />
                        {role.stipend}
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
                        <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-amber-100 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FFFDF9]">
                          {/* Left Column: Summary, Eligibility, Qualifications, Tech Stack */}
                          <div className="lg:col-span-7 space-y-4">
                            <p className="text-sm text-stone-700 font-medium leading-relaxed">
                              {role.summary}
                            </p>

                            {/* Eligibility Box */}
                            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/50 to-orange-50/60 border border-amber-300 shadow-2xs flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-xs">
                                <GraduationCap className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
                                  Eligibility
                                </span>
                                <p className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5">
                                  {role.eligibility}
                                </p>
                              </div>
                            </div>

                            {/* Key Qualifications */}
                            <div className="space-y-2 pt-1">
                              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 block">
                                🎯 What We're Looking For (Key Qualifications)
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {role.qualifications.map((q, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3 rounded-2xl bg-white border border-amber-200/80 shadow-2xs text-xs text-stone-800 flex items-start gap-2.5 hover:border-amber-300 transition"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                      <strong className="block font-bold text-stone-900">
                                        {q.title}
                                      </strong>
                                      <span className="text-stone-600 leading-relaxed text-[11px] block mt-0.5">
                                        {q.desc}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Skills & Tech Stack */}
                            <div className="pt-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block mb-2">
                                Skills &amp; Technologies
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {role.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-lg bg-[#FFF8E7] text-stone-800 text-xs font-semibold border border-amber-200/80"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Column: Poster Thumbnail, Social Requirement, Apply Button */}
                          <div className="lg:col-span-5 flex flex-col justify-between gap-5 bg-gradient-to-b from-white to-[#FFFDF9] p-5 sm:p-6 rounded-3xl border border-amber-200/90 shadow-sm">
                            {/* Visual Poster Card */}
                            <div className="relative rounded-2xl overflow-hidden border border-amber-300/80 shadow-xs bg-stone-950 aspect-[16/10] sm:aspect-[16/9] group">
                              <img
                                src={assetUrl(role.posterImage)}
                                alt="BWise Fullstack Developer Intern Hiring Announcement Poster"
                                loading="lazy"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex flex-col justify-end p-3.5 text-white">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                                  Official Recruitment Announcement
                                </span>
                                <p className="text-xs font-extrabold text-stone-100">
                                  Fullstack Developer Intern · 100% Remote
                                </p>
                              </div>
                            </div>

                            {/* Notices & Prerequisite */}
                            <div className="space-y-3 p-4 rounded-2xl bg-[#FFF8E7] border border-amber-300/70 text-xs text-stone-800">
                              <div className="flex items-start gap-2 text-stone-700">
                                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                                <span className="font-semibold text-[11px] leading-relaxed">
                                  {role.deadlineNotice}
                                </span>
                              </div>
                              <div className="border-t border-amber-200/70 pt-2.5">
                                <div className="flex items-start gap-2">
                                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                                  <p className="font-bold text-[11px] text-stone-900 leading-snug">
                                    {role.socialNotice}
                                  </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pl-6">
                                  <a
                                    href="https://www.linkedin.com/company/bwiselk/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-stone-800 text-[10px] font-bold border border-amber-300 hover:bg-amber-500 hover:text-white transition"
                                  >
                                    LinkedIn <ArrowUpRight className="w-2.5 h-2.5" />
                                  </a>
                                  <a
                                    href="https://www.facebook.com/profile.php?id=61592147020833"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-stone-800 text-[10px] font-bold border border-amber-300 hover:bg-amber-500 hover:text-white transition"
                                  >
                                    Facebook <ArrowUpRight className="w-2.5 h-2.5" />
                                  </a>
                                  <a
                                    href="https://www.instagram.com/bwise.lk/?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-stone-800 text-[10px] font-bold border border-amber-300 hover:bg-amber-500 hover:text-white transition"
                                  >
                                    Instagram <ArrowUpRight className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            </div>

                            {/* Call To Action */}
                            <div className="space-y-2">
                              <a
                                href={role.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 text-center cursor-pointer"
                              >
                                <span>Apply Now – Online Applications Only</span>
                                <ArrowUpRight className="w-4 h-4" />
                              </a>
                              <p className="text-[10px] text-center text-stone-500 font-medium">
                                Apply through the link only · External application form opens in new tab
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
        </Reveal>

        {/* Social Media Recruitment Strip */}
        <Reveal className="mt-10 rounded-3xl bg-white/95 border border-amber-200/90 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
        </Reveal>
      </section>
    </div>
  );
};
