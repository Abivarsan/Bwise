import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles, Cpu, Megaphone, Lightbulb } from 'lucide-react';
import { BwiseLogo } from './BwiseLogo';
import { PRIORITY_SERVICES, MAIN_SERVICE_CATEGORIES } from '../../data/servicesData';
import { ServiceIcon } from '../hive/HoneycombGrid3D';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isHoverPreview, setIsHoverPreview] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const servicesDropdownId = useId();
  const mobileMenuId = useId();

  const servicesItemRef = useRef<HTMLLIElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const isServicesActive = location.pathname.startsWith('/services');

  const orderedNavLinks = [
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Industries', to: '/industries' },
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ];

  const handleLogoHomeClick = () => {
    setServicesDropdownOpen(false);
    setIsHoverPreview(false);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Close menus on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setIsHoverPreview(false);
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  // Escape key closes open menus and restores focus to their trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (servicesDropdownOpen) {
        setServicesDropdownOpen(false);
        setIsHoverPreview(false);
        servicesTriggerRef.current?.focus();
      } else if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [servicesDropdownOpen, mobileMenuOpen]);

  const handleServicesBlur = (e: React.FocusEvent<HTMLLIElement>) => {
    const nextFocus = e.relatedTarget as Node | null;
    if (nextFocus && servicesItemRef.current?.contains(nextFocus)) return;
    setServicesDropdownOpen(false);
    setIsHoverPreview(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 py-2 sm:py-2.5 pointer-events-none">
      {/* Floating Centered Dark Glassmorphic Capsule — Slightly Increased Height for Balanced Proportions */}
      <div className="pointer-events-auto relative mx-auto flex h-14 sm:h-[60px] w-full lg:w-fit max-w-[calc(100vw-1.5rem)] items-center justify-between gap-3 lg:gap-6 xl:gap-8 rounded-full bg-[#14111B]/90 backdrop-blur-xl backdrop-saturate-150 border border-white/15 pl-4 sm:pl-6 pr-2 sm:pr-2.5 py-2 shadow-[0_14px_40px_rgba(15,12,24,0.28),inset_0_1px_0_rgba(255,255,255,0.08)]">
        {/* Brand Logo — Navigates to Home section on click */}
        <Link
          to="/"
          onClick={handleLogoHomeClick}
          className="shrink-0 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-full group flex items-center"
          aria-label="BWise Home"
        >
          <BwiseLogo
            lightText
            className="h-8 sm:h-9 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Primary Site Navigation Tree: 1. Services, 2. Portfolio, 3. Industries, 4. About Us, 5. Careers, 6. Contact */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-4 xl:gap-6">
          <ul className="flex items-center gap-0.5 xl:gap-1.5">
            {/* 1. Services Interactive Dropdown */}
            <li
              ref={servicesItemRef}
              className="relative"
              onMouseEnter={() => {
                if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                  setServicesDropdownOpen(true);
                  setIsHoverPreview(true);
                }
              }}
              onMouseLeave={() => {
                if (isHoverPreview) {
                  setServicesDropdownOpen(false);
                  setIsHoverPreview(false);
                }
              }}
              onBlur={handleServicesBlur}
            >
              <button
                ref={servicesTriggerRef}
                type="button"
                aria-expanded={servicesDropdownOpen}
                aria-controls={servicesDropdownId}
                aria-current={isServicesActive ? 'page' : undefined}
                onClick={() => {
                  if (servicesDropdownOpen && isHoverPreview) {
                    setIsHoverPreview(false);
                  } else {
                    setServicesDropdownOpen((open) => !open);
                    setIsHoverPreview(false);
                  }
                }}
                className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-[13.5px] xl:text-sm whitespace-nowrap transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isServicesActive || servicesDropdownOpen
                    ? 'text-white font-semibold bg-white/[0.12] ring-1 ring-white/15'
                    : 'text-stone-300/90 font-medium hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-3.5 h-3.5 opacity-80 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mega-Menu Dropdown with invisible top pointer bridge (pt-3) */}
              {servicesDropdownOpen && (
                <div
                  id={servicesDropdownId}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px] max-w-[calc(100dvw-2rem)] z-50"
                >
                  <div className="bg-[#16131E]/95 backdrop-blur-xl rounded-3xl p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] border border-white/15 text-stone-100">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                        3 Main Service Categories
                      </span>
                      <Link
                        to="/services"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          setIsHoverPreview(false);
                        }}
                        className="text-xs font-bold text-stone-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
                      >
                        View All Services →
                      </Link>
                    </div>

                    {/* 3 Main Categories Featured Row */}
                    <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-white/10">
                      {MAIN_SERVICE_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setServicesDropdownOpen(false);
                            setIsHoverPreview(false);
                            navigate(`/services?category=${cat.slug}#${cat.slug}`);
                          }}
                          className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 text-left transition group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
                            {cat.slug === 'software-solutions' && <Cpu className="w-3.5 h-3.5" aria-hidden="true" />}
                            {cat.slug === 'social-media-marketing' && <Megaphone className="w-3.5 h-3.5" aria-hidden="true" />}
                            {cat.slug === 'digital-strategy-ideas' && <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />}
                          </div>
                          <p className="text-xs font-extrabold text-white leading-tight group-hover:text-amber-300 transition-colors">
                            {cat.title}
                          </p>
                          <span className="text-[10px] font-semibold text-amber-400/90">{cat.badge}</span>
                        </button>
                      ))}
                    </div>

                    {/* All 12 Priority Studios */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {PRIORITY_SERVICES.map((svc) => (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => {
                            setServicesDropdownOpen(false);
                            setIsHoverPreview(false);
                            navigate(`/services?category=${svc.categorySlug}&service=${svc.slug}#${svc.slug}`);
                          }}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/[0.08] text-left transition group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/[0.08] text-amber-400 group-hover:bg-amber-400 group-hover:text-stone-950 flex items-center justify-center shrink-0 transition-colors">
                            <ServiceIcon name={svc.iconName} className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-stone-100 truncate group-hover:text-amber-300 transition-colors">
                              {svc.title}
                            </p>
                            <p className="text-[10px] text-stone-400 truncate">{svc.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* 2. Portfolio, 3. Industries, 4. About Us, 5. Careers, 6. Contact */}
            {orderedNavLinks.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center px-3.5 py-2 rounded-full text-[13.5px] xl:text-sm whitespace-nowrap transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isActive
                        ? 'text-white font-semibold bg-white/[0.12] ring-1 ring-white/15'
                        : 'text-stone-300/90 font-medium hover:text-white hover:bg-white/[0.06]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right CTA Cluster matching reference screenshot: Outlined Pill + Solid White Pill */}
          <div className="flex items-center gap-2 shrink-0 pl-1">
            <Link
              to="/services"
              className="hidden xl:inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.12] text-white px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Studios
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white hover:bg-stone-100 text-[#14111B] px-4 sm:px-5 py-2 text-[13px] font-semibold whitespace-nowrap shadow-xs transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </nav>

        {/* Mobile/Tablet Hamburger Toggle inside the Floating Pill */}
        <button
          ref={mobileToggleRef}
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls={mobileMenuId}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.14] text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile/Tablet Floating Glassmorphic Navigation Drawer/Panel */}
      {mobileMenuOpen && (
        <div
          id={mobileMenuId}
          className="pointer-events-auto lg:hidden mx-auto mt-2.5 max-w-[calc(100dvw-1.5rem)] max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-3xl bg-[#14111B]/95 backdrop-blur-xl border border-white/15 px-4 pt-3.5 pb-5 space-y-4 shadow-[0_24px_60px_rgba(0,0,0,0.5)] text-stone-100"
        >
          <ul className="flex flex-col space-y-1">
            <li>
              <NavLink
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-white/[0.14] text-white ring-1 ring-white/15'
                      : 'text-stone-300 hover:bg-white/[0.06] hover:text-white'
                  }`
                }
              >
                Services
              </NavLink>
            </li>
            {orderedNavLinks.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-white/[0.14] text-white ring-1 ring-white/15'
                        : 'text-stone-300 hover:bg-white/[0.06] hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-white/10">
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">
              Main Service Categories
            </p>
            <div className="grid grid-cols-1 gap-1.5 mb-3">
              {MAIN_SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(`/services?category=${cat.slug}#${cat.slug}`);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-left text-xs font-bold text-white border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    {cat.slug === 'software-solutions' && <Cpu className="w-4 h-4 text-amber-400" aria-hidden="true" />}
                    {cat.slug === 'social-media-marketing' && <Megaphone className="w-4 h-4 text-amber-400" aria-hidden="true" />}
                    {cat.slug === 'digital-strategy-ideas' && <Lightbulb className="w-4 h-4 text-amber-400" aria-hidden="true" />}
                    <span>{cat.title}</span>
                  </div>
                  <span className="text-[10px] text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full">
                    {cat.badge}
                  </span>
                </button>
              ))}
            </div>

            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              All 12 Hive Studios
            </p>
            <div className="grid grid-cols-2 gap-1.5 max-h-44 overflow-y-auto">
              {PRIORITY_SERVICES.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(`/services?category=${svc.categorySlug}&service=${svc.slug}#${svc.slug}`);
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-left text-xs font-semibold text-stone-200"
                >
                  <ServiceIcon name={svc.iconName} className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{svc.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 rounded-full border border-white/20 bg-white/[0.05] text-white text-xs font-semibold"
            >
              Explore Studios
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 rounded-full bg-white text-[#14111B] text-xs font-bold shadow-md"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
