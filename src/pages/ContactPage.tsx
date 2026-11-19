import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Globe2,
  Loader2,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { getServiceBySlug } from '../data/servicesData';
import { HiveCornerDecorations } from '../components/layout/HiveCornerDecorations';
import { ParallaxImage, Reveal, StaggerGroup, StaggerItem } from '../components/motion/ScrollReveal';
import { ToastNotification, ToastData } from '../components/ui/ToastNotification';
import { sendFormEmail } from '../utils/sendEmail';
import {
  buildInquiryEmailHTML,
  buildInquiryAutoReplyHTML,
} from '../utils/emailTemplates';
import { assetUrl } from '../utils/assets';

const STUDIO_TRACKS = [
  {
    slug: 'software-solutions',
    title: 'Software Solutions',
    subtitle: 'Web Dev, Mobile Apps, QA, SEO & AI',
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    subtitle: 'Social Ads, Page Management & Content',
  },
  {
    slug: 'digital-strategy-ideas',
    title: 'Digital Strategy & Branding',
    subtitle: 'Brand Handling, Logo Design & Analytics',
  },
  {
    slug: 'full-hive-scope',
    title: 'Full-Service Digital Package',
    subtitle: 'Combined software + marketing partnership',
  },
];

const STUDIO_PRESENCE = [
  { label: 'Jaffna, Sri Lanka', role: 'Headquarters & Studio' },
  { label: 'Islandwide', role: 'Sri Lanka Client Delivery' },
  { label: 'Global Remote', role: 'International Projects' },
];

const OFFICIAL_SOCIAL_CARDS = [
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/company/bwiselk',
    href: 'https://www.linkedin.com/company/bwiselk/',
  },
  {
    name: 'Facebook',
    handle: 'BWise Official Page',
    href: 'https://www.facebook.com/profile.php?id=61592147020833',
  },
  {
    name: 'Instagram',
    handle: '@bwise.lk',
    href: 'https://www.instagram.com/bwise.lk/?hl=en',
  },
];

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialServiceParam = searchParams.get('service');
  const initialMatched = initialServiceParam ? getServiceBySlug(initialServiceParam) : null;

  const [selectedTrack, setSelectedTrack] = useState<string>(
    initialMatched ? initialMatched.categorySlug : 'software-solutions'
  );
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [toast, setToast] = useState<ToastData | null>(null);
  const mountedAtRef = useRef<number>(Date.now());

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    scope: 'Custom Web / Mobile Application',
    customRequirement: '',
    goals: '',
  });

  const activeTrackObj =
    STUDIO_TRACKS.find((t) => t.slug === selectedTrack) || STUDIO_TRACKS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const effectiveRequirement =
      formState.scope === 'Other' && formState.customRequirement.trim()
        ? `Other — ${formState.customRequirement.trim()}`
        : formState.scope;

    const inquiryData = {
      serviceCategory: activeTrackObj.title,
      name: formState.name.trim(),
      email: formState.email.trim(),
      companyName: formState.company.trim(),
      primaryRequirement: effectiveRequirement,
      projectDetails: formState.goals.trim(),
    };

    const result = await sendFormEmail(
      {
        // Company notification template variables
        email_subject: `New ${activeTrackObj.title} Inquiry: ${inquiryData.name}`,
        email_html: buildInquiryEmailHTML(inquiryData),

        // Shared routing & fallback variables
        form_type: `${activeTrackObj.title} Inquiry`,
        user_name: inquiryData.name,
        user_email: inquiryData.email,
        reply_summary: `Thank you for reaching out to BWise regarding ${activeTrackObj.title} (${effectiveRequirement}). Our team has received your project goals and will respond within 24 hours.`,

        // User auto-reply template variables
        user_reply_subject: `We Received Your ${activeTrackObj.title} Inquiry – BWise`,
        user_reply_html: buildInquiryAutoReplyHTML(inquiryData),
      },
      {
        honeypot,
        formOpenedAt: mountedAtRef.current,
      }
    );

    setIsSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
      setToast({
        id: String(Date.now()),
        type: 'success',
        title: 'Project Inquiry Sent!',
        message: `Confirmation sent to ${inquiryData.email}. Our ${activeTrackObj.title} team will reply within 24 hours.`,
      });
    } else {
      setToast({
        id: String(Date.now()),
        type: result.isRateLimited ? 'warning' : 'error',
        title: result.isRateLimited ? 'Please Wait Before Retrying' : 'Email Delivery Notice',
        message:
          result.error || 'Unable to send inquiry right now. Please try again or email hello@bwise.lk.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-honeycomb-pattern relative overflow-hidden pt-24 sm:pt-28 pb-20">
      <ToastNotification toast={toast} onDismiss={() => setToast(null)} />
      <HiveCornerDecorations />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        {/* =====================================================================
            CONCISE HEADER
           ===================================================================== */}
        <Reveal className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            BWise · Jaffna, Sri Lanka
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mt-2.5">
            Let&apos;s Discuss Your Project.
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: VISUAL JAFFNA STUDIO CARD & OFFICIAL SOCIAL CHANNELS
             ===================================================================== */}
          <Reveal direction="left" className="lg:col-span-5 space-y-5">
            {/* Realistic Studio Visual Card */}
            <div className="rounded-[28px] overflow-hidden bg-stone-900 border-2 border-amber-300/80 shadow-[0_18px_45px_rgba(245,158,11,0.14)] group">
              <div className="relative h-56 overflow-hidden">
                <ParallaxImage
                  src={assetUrl('/assets/pages/careers/hive-studio-hero.jpg')}
                  alt="BWise Software & Digital Marketing Studio in Jaffna, Sri Lanka"
                  fetchPriority="high"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[11px] font-extrabold">
                    <Clock className="w-3.5 h-3.5" />
                    Fast Response From Our Jaffna Team
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                    Software &amp; Digital Agency
                  </p>
                  <h2 className="text-lg font-extrabold mt-0.5">
                    Collaborate Directly With Our Engineers &amp; Marketers
                  </h2>
                </div>
              </div>

              {/* Studio Presence Strip */}
              <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-3 gap-2">
                {STUDIO_PRESENCE.map((hub) => (
                  <div
                    key={hub.label}
                    className="p-2.5 rounded-xl bg-[#FFF8E7] border border-amber-200/80 text-center"
                  >
                    <div className="flex items-center justify-center gap-1 text-xs font-extrabold text-stone-900">
                      <Globe2 className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{hub.label}</span>
                    </div>
                    <p className="text-[10px] font-semibold text-stone-500 mt-0.5">{hub.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact & Location Channels */}
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3" stagger={0.08}>
              <StaggerItem distance={14} className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/95 border border-amber-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Headquarters Location
                  </p>
                  <p className="text-sm font-extrabold text-stone-900">Jaffna, Sri Lanka</p>
                </div>
              </StaggerItem>

              <StaggerItem distance={14}>
                <a
                  href="mailto:info@bwise.lk"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/95 border border-amber-200/80 hover:border-amber-400 shadow-2xs transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Official Email
                    </p>
                    <p className="text-sm font-extrabold text-stone-900">info@bwise.lk</p>
                  </div>
                </a>
              </StaggerItem>
            </StaggerGroup>

            {/* Official Social Media Cards */}
            <div className="rounded-2xl bg-white/95 border border-amber-200/80 p-4 shadow-2xs space-y-2.5">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">
                Connect on Official Social Media
              </p>
              <StaggerGroup className="grid grid-cols-1 gap-2" stagger={0.06}>
                {OFFICIAL_SOCIAL_CARDS.map((soc) => (
                  <StaggerItem key={soc.name} distance={12}>
                    <a
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] hover:bg-amber-50 border border-amber-200/70 hover:border-amber-400 transition group"
                    >
                      <div>
                        <p className="text-xs font-extrabold text-stone-900">{soc.name}</p>
                        <p className="text-[11px] text-stone-500">{soc.handle}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>

          {/* =====================================================================
              RIGHT COLUMN: STREAMLINED INTERACTIVE BRIEFING FORM
             ===================================================================== */}
          <Reveal direction="right" delay={0.1} className="lg:col-span-7">
            <div className="bg-white/95 rounded-[32px] p-6 sm:p-10 shadow-[0_24px_60px_rgba(26,22,18,0.06)] border-2 border-amber-200/80">
              {submitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    Thank You for Reaching Out to BWise!
                  </h2>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Our <strong className="text-amber-700">{activeTrackObj.title}</strong> team in Jaffna has received your inquiry and will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      mountedAtRef.current = Date.now();
                      setFormState({
                        name: '',
                        email: '',
                        company: '',
                        scope: 'Custom Web / Mobile Application',
                        customRequirement: '',
                        goals: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 4 Visual Studio Track Selector Cards */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-3">
                      1. How Can BWise Help You?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {STUDIO_TRACKS.map((track) => {
                        const isChosen = track.slug === selectedTrack;
                        return (
                          <button
                            key={track.slug}
                            type="button"
                            onClick={() => setSelectedTrack(track.slug)}
                            className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/25 shadow-xs'
                                : 'bg-[#FAF8F5] border-stone-200 hover:border-amber-300'
                            }`}
                          >
                            <p className="text-xs sm:text-sm font-extrabold text-stone-900">
                              {track.title}
                            </p>
                            <p className="text-[11px] text-stone-500 truncate mt-0.5">
                              {track.subtitle}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Primary Requirement
                      </label>
                      <select
                        value={formState.scope}
                        onChange={(e) => setFormState({ ...formState, scope: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="Custom Web / Mobile Application">Custom Web / Mobile Application</option>
                        <option value="Social Media Marketing & Ads">Social Media Marketing &amp; Ads</option>
                        <option value="Branding, Logo & Creative Design">Branding, Logo &amp; Creative Design</option>
                        <option value="SEO, AI Search (GEO) & Analytics">SEO, AI Search (GEO) &amp; Analytics</option>
                        <option value="Full-Service Digital Partnership">Full-Service Digital Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Custom Requirement Field if "Other" is chosen */}
                  {formState.scope === 'Other' && (
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Please Specify Your Requirement *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.customRequirement}
                        onChange={(e) =>
                          setFormState({ ...formState, customRequirement: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Project Details &amp; Goals *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formState.goals}
                      onChange={(e) => setFormState({ ...formState, goals: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-amber-500 resize-y"
                    />
                  </div>

                  {/* Hidden Spam Protection Honeypot Field (Off-Screen) */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="contact-website-url">Website</label>
                    <input
                      type="text"
                      id="contact-website-url"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#D97706] disabled:opacity-75 text-[#14111B] text-sm font-extrabold shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#14111B]" />
                        <span>Sending Inquiry to BWise...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Inquiry to BWise</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
