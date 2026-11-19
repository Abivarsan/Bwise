import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  GraduationCap,
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
    id: 'retail-ecommerce',
    number: '01',
    name: 'Retail, E-Commerce & Consumer Brands',
    shortName: 'Retail & E-Commerce',
    tagline: 'Online stores, payment/inventory integration & high-converting social media ads.',
    icon: ShoppingBag,
    image: '/assets/pages/industries/luxury-ecommerce.jpg',
    imageAlt: 'Modern e-commerce storefront and brand packaging showcase',
    complianceBadges: ['Custom Web Stores', 'Payment Gateways', 'Meta & TikTok Ads'],
    lead: 'We help retail and D2C businesses in Sri Lanka and abroad launch fast online stores, sync inventory, and scale sales through targeted Facebook, Instagram, and Google campaigns.',
    capabilities: [
      { title: 'E-Commerce Web & Mobile Stores', outcome: 'Seamless checkout, cart recovery & mobile-first UI' },
      { title: 'Social Commerce & Paid Ads', outcome: 'Targeted product catalog ads driving daily orders' },
      { title: 'Brand Packaging & Logo Identity', outcome: 'Memorable visual identity that stands out on shelves & feeds' },
    ],
    benchmarks: [
      { metric: '3.2x', label: 'Online Checkout Velocity' },
      { metric: '+180%', label: 'Social Ad Engagement' },
    ],
    recommendedServices: [
      { label: 'Web Development', slug: 'web-development', categorySlug: 'software-solutions' },
      { label: 'Social Media Advertising', slug: 'social-media-advertising', categorySlug: 'social-media-marketing' },
      { label: 'Unique Logo Design', slug: 'unique-logo-design', categorySlug: 'digital-strategy-ideas' },
    ],
  },
  {
    id: 'education-edtech',
    number: '02',
    name: 'Education, Academies & EdTech Platforms',
    shortName: 'Education & EdTech',
    tagline: 'Learning management portals, student mobile apps & enrollment marketing.',
    icon: GraduationCap,
    image: '/assets/pages/industries/fintech-banking.jpg',
    imageAlt: 'Digital learning portal and analytics dashboard for education providers',
    complianceBadges: ['LMS & Student Portals', 'Mobile Learning Apps', 'Lead Generation'],
    lead: 'From private academies and training institutes in Jaffna to international EdTech startups, we build interactive learning portals and run student enrollment campaigns.',
    capabilities: [
      { title: 'Student & Course Management Portals', outcome: 'Online admissions, video lessons & progress tracking' },
      { title: 'Enrollment Social & Search Campaigns', outcome: 'High-intent student & parent lead generation' },
      { title: 'Interactive Educational Content', outcome: 'Engaging video reels, carousels & search articles' },
    ],
    benchmarks: [
      { metric: '+210%', label: 'Student Course Inquiries' },
      { metric: '24/7', label: 'Self-Serve Portal Access' },
    ],
    recommendedServices: [
      { label: 'Web Development', slug: 'web-development', categorySlug: 'software-solutions' },
      { label: 'Content Marketing', slug: 'content-marketing', categorySlug: 'social-media-marketing' },
      { label: 'Social Media Management', slug: 'social-media-management', categorySlug: 'social-media-marketing' },
    ],
  },
  {
    id: 'healthcare-wellness',
    number: '03',
    name: 'Healthcare, Clinics & Wellness Centers',
    shortName: 'Healthcare & Wellness',
    tagline: 'Patient appointment portals, clinic mobile apps & local search authority.',
    icon: HeartPulse,
    image: '/assets/pages/industries/healthcare-medtech.jpg',
    imageAlt: 'Clinician reviewing patient appointment portal and digital records on tablet',
    complianceBadges: ['Appointment Booking', 'Secure Patient Data', 'Local SEO & GEO'],
    lead: 'We build easy-to-use patient booking websites, clinic management dashboards, and trustworthy medical search profiles so patients can find and book care effortlessly.',
    capabilities: [
      { title: 'Online Appointment & Telehealth Portals', outcome: 'Automated SMS/WhatsApp reminders & doctor schedules' },
      { title: 'Local Search & Google Maps SEO', outcome: 'Top visibility when patients search for specialists nearby' },
      { title: 'Patient Education & Social Presence', outcome: 'Clear, empathetic health content & community trust' },
    ],
    benchmarks: [
      { metric: '-55%', label: 'Reception Phone Overhead' },
      { metric: '+195%', label: 'Direct Online Bookings' },
    ],
    recommendedServices: [
      { label: 'Mobile App Development', slug: 'mobile-app-development', categorySlug: 'software-solutions' },
      { label: 'Search Engine Optimisation', slug: 'search-engine-optimisation', categorySlug: 'software-solutions' },
      { label: 'Application Testing', slug: 'application-testing', categorySlug: 'software-solutions' },
    ],
  },
  {
    id: 'startups-saas',
    number: '04',
    name: 'Startups, SMEs & Software Enterprises',
    shortName: 'Startups & SMEs',
    tagline: 'MVP engineering, AI workflow integration & full-funnel B2B digital growth.',
    icon: Layers,
    image: '/assets/pages/industries/enterprise-saas.jpg',
    imageAlt: 'Software engineering and product team collaborating in studio',
    complianceBadges: ['Full-Stack MVPs', 'AI & Automation', 'Dedicated Pods'],
    lead: 'We partner with founders and growing SMEs to design, build, test, and market custom SaaS products, internal business dashboards, and AI-powered customer workflows.',
    capabilities: [
      { title: 'Custom Web & Cloud Applications', outcome: 'Scalable React, Node.js & cloud-native architectures' },
      { title: 'AI Agents & Workflow Automation', outcome: 'Smart chatbots and automated customer support/lead triage' },
      { title: 'B2B LinkedIn & Search Growth', outcome: 'Authority content, SEO, and Generative Engine Optimisation' },
    ],
    benchmarks: [
      { metric: '2-Week', label: 'Agile Release Sprints' },
      { metric: '100%', label: 'QA-Tested Deployments' },
    ],
    recommendedServices: [
      { label: 'AI Optimization', slug: 'artificial-intelligence-optimization', categorySlug: 'software-solutions' },
      { label: 'Generative Engine Optimisation', slug: 'generative-engine-optimisation', categorySlug: 'software-solutions' },
      { label: 'Digital Analytics', slug: 'digital-analytics', categorySlug: 'digital-strategy-ideas' },
    ],
  },
  {
    id: 'real-estate-construction',
    number: '05',
    name: 'Real Estate, Property & Construction',
    shortName: 'Real Estate & Property',
    tagline: 'Property listing platforms, buyer lead generation & corporate brand identity.',
    icon: Building2,
    image: '/assets/pages/industries/proptech-realestate.jpg',
    imageAlt: 'Modern architectural model and interactive property listing showcase',
    complianceBadges: ['Property Portals', 'Lead Capture CRM', 'Local & Global SEO'],
    lead: 'We create interactive property showcase websites, virtual inquiry funnels, and targeted digital campaigns connecting developers and agencies with local and diaspora buyers.',
    capabilities: [
      { title: 'Interactive Property Listing Portals', outcome: 'Filterable listings, map views & instant WhatsApp/email leads' },
      { title: 'Targeted Buyer Lead Campaigns', outcome: 'High-intent social & search ads for local & overseas buyers' },
      { title: 'Developer & Project Branding', outcome: 'Premium logos, brochures & digital project launches' },
    ],
    benchmarks: [
      { metric: '+175%', label: 'Qualified Buyer Leads' },
      { metric: 'Fast', label: 'Mobile Property Browsing' },
    ],
    recommendedServices: [
      { label: 'Web Development', slug: 'web-development', categorySlug: 'software-solutions' },
      { label: 'Brand Management', slug: 'brand-management', categorySlug: 'digital-strategy-ideas' },
      { label: 'Social Media Advertising', slug: 'social-media-advertising', categorySlug: 'social-media-marketing' },
    ],
  },
  {
    id: 'hospitality-tourism',
    number: '06',
    name: 'Hospitality, Hotels, Travel & Restaurants',
    shortName: 'Hospitality & Travel',
    tagline: 'Direct booking websites, visual storytelling & engaging social media management.',
    icon: Plane,
    image: '/assets/pages/industries/hospitality-aviation.jpg',
    imageAlt: 'Boutique hotel and hospitality brand digital booking experience',
    complianceBadges: ['Direct Booking Web', 'Visual Content Studio', 'Review & Social Growth'],
    lead: 'We help hotels, resorts, tour operators, and restaurants attract travelers and diners through direct booking websites, mouth-watering visual content, and search visibility.',
    capabilities: [
      { title: 'Commission-Free Direct Booking Sites', outcome: 'Room/table reservations & tour package inquiry flows' },
      { title: 'Instagram, Facebook & Video Storytelling', outcome: 'Reels, photography & active guest community management' },
      { title: 'Travel SEO & AI Discovery', outcome: 'Capture travelers searching for Sri Lanka & regional stays' },
    ],
    benchmarks: [
      { metric: '+215%', label: 'Direct Booking Inquiries' },
      { metric: '360°', label: 'Social & Search Visibility' },
    ],
    recommendedServices: [
      { label: 'Social Media Management', slug: 'social-media-management', categorySlug: 'social-media-marketing' },
      { label: 'Web Development', slug: 'web-development', categorySlug: 'software-solutions' },
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
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Industries We Empower
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 mt-2.5">
              Tailored Software &amp; Digital Growth by Sector.
            </h1>
          </div>
          <p className="text-sm sm:text-base text-stone-600 max-w-md">
            From Jaffna and across Sri Lanka to global markets, we build custom digital solutions tailored to your industry.
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
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-12 relative z-10">
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
              <div className="lg:col-span-6 relative min-h-[360px] sm:min-h-[420px] bg-stone-950 overflow-hidden group">
                <img
                  src={assetUrl(activeSector.image)}
                  alt={activeSector.imageAlt}
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent" />

                {/* Top Deliverable Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-5 sm:left-5 sm:right-5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {activeSector.complianceBadges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[10px] sm:text-[11px] font-extrabold shadow-xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bottom Benchmark Counters */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 grid grid-cols-2 gap-2.5 sm:gap-3">
                  {activeSector.benchmarks.map((b) => (
                    <div
                      key={b.label}
                      className="rounded-2xl bg-white/95 backdrop-blur-md p-3 sm:p-4 border border-amber-200 shadow-lg"
                    >
                      <p className="text-xl sm:text-3xl font-extrabold text-amber-700 leading-none">
                        {b.metric}
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-bold text-stone-600 mt-1 leading-tight">
                        {b.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Concise Overview, 3 Visual Capability Cards & Studio Links */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-[#FFFDF8] to-[#FFF8E7]/75">
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
                      Industry Focus #{activeSector.number}
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
                      Recommended BWise Studios for {activeSector.shortName}
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#D97706] text-[#14111B] text-xs sm:text-sm font-extrabold shadow-md transition hover:scale-105 cursor-pointer"
                  >
                    <span>Discuss Your {activeSector.shortName} Project</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <Link
                    to="/portfolio"
                    className="text-xs font-extrabold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 mx-auto sm:mx-0"
                  >
                    View Project Showcases <ArrowUpRight className="w-3.5 h-3.5" />
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
          4. COMPACT QUALITY & DELIVERY COMMITMENT BAR
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="rounded-[28px] bg-gradient-to-r from-[#F9E2AE]/85 via-[#FFF8E7]/95 to-[#F9E4B7]/85 border-2 border-amber-300/80 p-6 sm:p-8 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                Reliable Engineering &amp; Transparent Digital Marketing
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                100% client code &amp; brand ownership · Dedicated QA testing · Ongoing post-launch support from Jaffna
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['Responsive Web & Mobile', 'QA Tested', 'SEO & AI Ready', 'Custom Branding', 'Analytics Reporting'].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-white text-stone-800 text-xs font-extrabold border border-amber-300/80 shadow-2xs"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
