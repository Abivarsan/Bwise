import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Cpu,
  Globe2,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react';
import { getServiceBySlug } from '../data/servicesData';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { assetUrl } from '../utils/assets';

const STUDIO_TRACKS = [
  {
    slug: 'software-solutions',
    title: 'Software Solutions',
    subtitle: 'Web, Mobile, QA, SEO & AI Optimization',
    icon: Cpu,
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    subtitle: 'Paid Social, Community & Content Systems',
    icon: Megaphone,
  },
  {
    slug: 'digital-strategy-ideas',
    title: 'Digital Strategy Ideas',
    subtitle: 'Brand Architecture, Logo & Executive BI',
    icon: Lightbulb,
  },
  {
    slug: 'full-hive-scope',
    title: 'Multi-Studio / Custom Pod',
    subtitle: 'Cross-functional engineering & growth squad',
    icon: Sparkles,
  },
];

const GLOBAL_HUBS = [
  { city: 'Toronto', role: 'North America HQ', status: 'Active Studio' },
  { city: 'London', role: 'EMEA Strategy Hub', status: 'Active Studio' },
  { city: 'Colombo', role: 'Engineering Center', status: '24/5 Delivery' },
];

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialServiceParam = searchParams.get('service');
  const initialMatched = initialServiceParam ? getServiceBySlug(initialServiceParam) : null;

  const [selectedTrack, setSelectedTrack] = useState<string>(
    initialMatched ? initialMatched.categorySlug : 'software-solutions'
  );
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$25k – $50k',
    goals: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const activeTrackObj =
    STUDIO_TRACKS.find((t) => t.slug === selectedTrack) || STUDIO_TRACKS[0];

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden pt-24 sm:pt-28 pb-20">
      <HiveCornerDecorations />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        {/* =====================================================================
            CONCISE HEADER
           ===================================================================== */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Principal Briefing
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mt-2.5">
            Start Your Project With the Hive.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: VISUAL STUDIO CARD & DIRECT CHANNELS
             ===================================================================== */}
          <div className="lg:col-span-5 space-y-5">
            {/* Realistic Studio Visual Card */}
            <div className="rounded-[28px] overflow-hidden bg-stone-900 border-2 border-amber-300/80 shadow-[0_18px_45px_rgba(245,158,11,0.14)] group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={assetUrl('/assets/pages/careers/hive-studio-hero.jpg')}
                  alt="BWise Strategy & Engineering Studio"
                  fetchPriority="high"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[11px] font-extrabold">
                    <Clock className="w-3.5 h-3.5" />
                    Response Under 4 Business Hours
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                    No Sales Gatekeepers
                  </p>
                  <h2 className="text-lg font-extrabold mt-0.5">
                    You Speak Directly With Our Principal Architects
                  </h2>
                </div>
              </div>

              {/* Global Studio Hubs Strip */}
              <div className="p-4 bg-white grid grid-cols-3 gap-2">
                {GLOBAL_HUBS.map((hub) => (
                  <div
                    key={hub.city}
                    className="p-2.5 rounded-xl bg-[#FFF8E7] border border-amber-200/80 text-center"
                  >
                    <div className="flex items-center justify-center gap-1 text-xs font-extrabold text-stone-900">
                      <Globe2 className="w-3 h-3 text-amber-600" />
                      {hub.city}
                    </div>
                    <p className="text-[10px] font-semibold text-stone-500 mt-0.5">{hub.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <a
                href="mailto:hello@bwisedigital.com"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/95 border border-amber-200/80 hover:border-amber-400 shadow-2xs transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Direct Studio Desk
                  </p>
                  <p className="text-sm font-extrabold text-stone-900">hello@bwisedigital.com</p>
                </div>
              </a>

              <a
                href="tel:+18005552947"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/95 border border-amber-200/80 hover:border-amber-400 shadow-2xs transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Client Strategy Line
                  </p>
                  <p className="text-sm font-extrabold text-stone-900">+1 (800) 555-BWISE</p>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/95 border border-amber-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Global Delivery Hubs
                  </p>
                  <p className="text-sm font-extrabold text-stone-900">
                    Toronto · London · Colombo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: STREAMLINED INTERACTIVE BRIEFING FORM
             ===================================================================== */}
          <div className="lg:col-span-7">
            <div className="bg-white/95 rounded-[32px] p-6 sm:p-10 shadow-[0_24px_60px_rgba(26,22,18,0.06)] border-2 border-amber-200/80">
              {submitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    Your Briefing Request Is Locked In!
                  </h2>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Our <strong className="text-amber-700">{activeTrackObj.title}</strong> lead is reviewing your brief and will reply within 4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 4 Visual Studio Track Selector Cards */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-3">
                      1. Select Your Studio Division
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {STUDIO_TRACKS.map((track) => {
                        const Icon = track.icon;
                        const isChosen = track.slug === selectedTrack;
                        return (
                          <button
                            key={track.slug}
                            type="button"
                            onClick={() => setSelectedTrack(track.slug)}
                            className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/25 shadow-xs'
                                : 'bg-[#FAF8F5] border-stone-200 hover:border-amber-300'
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                isChosen
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-white text-amber-600 border border-amber-200'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-extrabold text-stone-900">
                                {track.title}
                              </p>
                              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                                {track.subtitle}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Company / Website
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Corp (https://...)"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Estimated Investment Range
                      </label>
                      <select
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                      >
                        <option>$10k – $25k</option>
                        <option>$25k – $50k</option>
                        <option>$50k – $100k</option>
                        <option>$100k+ Enterprise Scope</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Project Goals &amp; Timeline *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={`Tell our ${activeTrackObj.title} pod about your key milestones...`}
                      value={formState.goals}
                      onChange={(e) => setFormState({ ...formState, goals: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#D97706] text-[#14111B] text-sm font-extrabold shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition hover:scale-[1.01] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Launch Studio Briefing</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
