import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { PRIORITY_SERVICES } from '../data/servicesData';
import { ServiceIcon } from '../components/hive/HoneycombGrid3D';
import { BwiseBeeCharacter } from '../components/hive/BwiseBeeCharacter';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialServiceSlug = searchParams.get('service');
  const initialTopic = searchParams.get('topic');

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    initialServiceSlug ? [initialServiceSlug] : ['web-development']
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('$25k – $50k');
  const [message, setMessage] = useState(initialTopic || '');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialServiceSlug && !selectedSlugs.includes(initialServiceSlug)) {
      setSelectedSlugs((prev) => [...prev, initialServiceSlug]);
    }
  }, [initialServiceSlug]);

  const toggleServiceSelection = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-honeycomb-pattern pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Hive Contact Info & Mascot */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Connect With the Hive
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.1]">
              Let&apos;s Architect Your Next Digital Breakthrough
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Select the priority Beehive studios your project requires, and our specialist architects will prepare a tailored roadmap, wireframe preview, and growth forecast within 24 hours.
            </p>

            {/* Studio Contact Card */}
            <div className="rounded-3xl bg-white p-6 border border-stone-200/80 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Direct Studio Desk
                  </p>
                  <p className="text-sm font-extrabold text-stone-900">hello@bwiseagency.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Global Strategy Hotline
                  </p>
                  <p className="text-sm font-extrabold text-stone-900">+1 (888) 555-9811</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Flagship Beehive Hubs
                  </p>
                  <p className="text-sm font-extrabold text-stone-900">
                    San Francisco • London • Bengaluru • Dubai
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Response SLA
                  </p>
                  <p className="text-sm font-extrabold text-stone-900">
                    Under 4 Business Hours (24/7 Hive Coverage)
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Bee Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#F9E4B7] to-[#E8BE70] p-6 border border-amber-300/80 flex items-center gap-4 shadow-md">
              <BwiseBeeCharacter className="w-28 h-28 shrink-0" />
              <div>
                <h3 className="text-base font-extrabold text-stone-900">
                  Not sure which service studio to pick?
                </h3>
                <p className="text-xs text-stone-800 mt-1 leading-relaxed">
                  Return to our interactive 3D Beehive on the home page and let our guide bee walk you through each room!
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-950 underline mt-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Interactive Beehive
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Project & Priority Service Configurator Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_24px_60px_rgba(26,22,18,0.08)] border border-stone-200/80">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-5"
                >
                  <div className="mx-auto w-36 h-36">
                    <BwiseBeeCharacter className="w-full h-full" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Brief Received by the Bwise Hive!
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    Thank You, {fullName || 'Partner'}!
                  </h2>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Your inquiry for{' '}
                    <strong className="text-stone-900">
                      {selectedSlugs
                        .map((s) => PRIORITY_SERVICES.find((p) => p.slug === s)?.title)
                        .filter(Boolean)
                        .join(', ') || 'Bwise Digital Solutions'}
                    </strong>{' '}
                    has been routed to our specialist studio leads. We will reach out to{' '}
                    <strong className="text-stone-900">{email}</strong> shortly.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                    <Link
                      to="/"
                      className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition"
                    >
                      Return to Interactive Beehive
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                      1. Select Your Priority Hive Services
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Click one or more of our 12 specialized studios below:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3.5">
                      {PRIORITY_SERVICES.map((svc) => {
                        const active = selectedSlugs.includes(svc.slug);
                        return (
                          <button
                            key={svc.id}
                            type="button"
                            onClick={() => toggleServiceSelection(svc.slug)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                              active
                                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                : 'bg-[#FAF8F5] hover:bg-amber-50 text-stone-800 border-stone-200/80'
                            }`}
                          >
                            <ServiceIcon
                              name={svc.iconName}
                              className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-amber-600'}`}
                            />
                            <span className="truncate">{svc.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-4">
                      2. Your Project Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Technologies"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm text-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Estimated Investment Range
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm text-stone-900"
                        >
                          <option value="$10k – $25k">$10k – $25k</option>
                          <option value="$25k – $50k">$25k – $50k</option>
                          <option value="$50k – $100k">$50k – $100k</option>
                          <option value="$100k+ Enterprise">$100k+ Enterprise</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Project Goals &amp; Requirements *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about the digital product, growth goals, or timeline you have in mind..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm text-stone-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#F5A646] to-[#E08319] hover:from-[#F29A30] hover:to-[#CC720E] text-white font-extrabold text-sm sm:text-base shadow-[0_12px_30px_rgba(224,131,25,0.35)] flex items-center justify-center gap-2 transition hover:scale-[1.01] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Launch Project Consultation</span>
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
