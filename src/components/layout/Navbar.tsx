import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BwiseLogo } from './BwiseLogo';
import { useConsultationModal } from '../../context/ConsultationModalContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Default to true on homepage initial paint so glass immediately differentiates against #000 hero
  const [isDarkUnderneath, setIsDarkUnderneath] = useState(() => location.pathname === '/');

  const { openConsultationModal } = useConsultationModal();

  const mobileMenuId = useId();
  const pillRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const isServicesActive = location.pathname.startsWith('/services');

  const orderedNavLinks = [
    { label: 'Services', to: '/services?category=software-solutions#software-solutions' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Industries', to: '/industries' },
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ];

  const handleLogoHomeClick = () => {
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  // Escape key closes mobile menu and restores focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Detect whether the surface beneath the navbar pill is light or dark across desktop & mobile
  useEffect(() => {
    let rafId: number | null = null;

    const checkBackground = () => {
      if (!pillRef.current) return;
      const rect = pillRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      if (typeof document !== 'undefined' && document.elementsFromPoint) {
        const elements = document.elementsFromPoint(x, y);
        for (const el of elements) {
          if (el instanceof HTMLElement && !el.closest('header')) {
            if (el.closest('[data-theme="dark"]')) {
              setIsDarkUnderneath(true);
              return;
            }

            let cur: HTMLElement | null = el;
            while (cur && cur !== document.documentElement) {
              const bg = window.getComputedStyle(cur).backgroundColor;
              if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
                const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (m) {
                  const r = parseInt(m[1], 10);
                  const g = parseInt(m[2], 10);
                  const b = parseInt(m[3], 10);
                  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
                  setIsDarkUnderneath(yiq < 130);
                  return;
                }
              }
              cur = cur.parentElement;
            }
          }
        }
      }
      setIsDarkUnderneath(false);
    };

    const handleScrollOrResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkBackground);
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    checkBackground();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [location.pathname]);

  // Tactile multi-layer thick glass optical styles adapting cleanly to dark vs. light backdrops
  const pillGlassStyle: React.CSSProperties = isDarkUnderneath
    ? {
        background:
          'linear-gradient(180deg, rgba(60, 60, 68, 0.78) 0%, rgba(35, 35, 42, 0.74) 50%, rgba(24, 24, 30, 0.84) 100%)',
        border: '1.5px solid rgba(255, 255, 255, 0.26)',
        boxShadow: [
          '0 20px 48px rgba(0, 0, 0, 0.85)',
          '0 0 0 1px rgba(255, 255, 255, 0.06)',
          '0 0 36px rgba(255, 255, 255, 0.08)',
          '0 2px 28px rgba(245, 158, 11, 0.12)',
          'inset 0 1.5px 0 rgba(255, 255, 255, 0.36)',
          'inset 0 14px 26px -14px rgba(255, 255, 255, 0.22)',
          'inset 0 0 0 1px rgba(255, 255, 255, 0.09)',
          'inset 0 -2px 3px rgba(0, 0, 0, 0.65)',
        ].join(', '),
      }
    : {
        background:
          'linear-gradient(180deg, rgba(36, 33, 44, 0.84) 0%, rgba(22, 19, 30, 0.82) 100%)',
        border: '1.5px solid rgba(255, 255, 255, 0.22)',
        boxShadow: [
          '0 18px 42px rgba(12, 10, 20, 0.30)',
          'inset 0 1.5px 0 rgba(255, 255, 255, 0.28)',
          'inset 0 10px 20px -12px rgba(255, 255, 255, 0.16)',
          'inset 0 0 0 1px rgba(255, 255, 255, 0.07)',
          'inset 0 -1.5px 2px rgba(0, 0, 0, 0.50)',
        ].join(', '),
      };

  const drawerGlassStyle: React.CSSProperties = isDarkUnderneath
    ? {
        background:
          'linear-gradient(180deg, rgba(46, 46, 54, 0.90) 0%, rgba(24, 24, 30, 0.94) 100%)',
        border: '1.5px solid rgba(255, 255, 255, 0.24)',
        boxShadow: [
          '0 26px 64px rgba(0, 0, 0, 0.82)',
          '0 0 32px rgba(255, 255, 255, 0.06)',
          'inset 0 1.5px 0 rgba(255, 255, 255, 0.30)',
          'inset 0 0 0 1px rgba(255, 255, 255, 0.07)',
          'inset 0 -2px 4px rgba(0, 0, 0, 0.55)',
        ].join(', '),
      }
    : {
        background:
          'linear-gradient(180deg, rgba(30, 26, 38, 0.88) 0%, rgba(18, 15, 25, 0.92) 100%)',
        border: '1.5px solid rgba(255, 255, 255, 0.20)',
        boxShadow: [
          '0 24px 60px rgba(0, 0, 0, 0.50)',
          'inset 0 1.5px 0 rgba(255, 255, 255, 0.24)',
          'inset 0 -1.5px 2px rgba(0, 0, 0, 0.45)',
        ].join(', '),
      };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 pt-3.5 sm:pt-5 pointer-events-none">
      {/* Floating Centered Thick Frosted Glassmorphic Pill Capsule */}
      <div
        ref={pillRef}
        className="pointer-events-auto relative overflow-hidden mx-auto flex h-14 sm:h-[64px] w-full lg:w-fit max-w-[calc(100vw-2rem)] items-center justify-between gap-3 lg:gap-4 xl:gap-7 rounded-full backdrop-blur-2xl backdrop-saturate-150 pl-5 sm:pl-6 pr-2.5 sm:pr-3 py-2 transition-[background,box-shadow,border-color] duration-300"
        style={pillGlassStyle}
      >
        {/* Top Specular Glass Refraction Highlight Edge */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent"
        />

        {/* Subtle Bottom Warm Studio Bounce Catch-Light over Dark Hero */}
        {isDarkUnderneath && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-14 right-14 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/35 to-transparent"
          />
        )}

        {/* Brand Logo — Increased visual separation from Services tab */}
        <Link
          to="/"
          onClick={handleLogoHomeClick}
          className="relative z-10 shrink-0 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-full group flex items-center mr-3 sm:mr-4 lg:mr-7 xl:mr-10"
          aria-label="BWise Home"
        >
          <BwiseLogo
            lightText
            className="h-8 sm:h-9 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Primary Site Navigation: 1. Services (Direct Link), 2. Portfolio, 3. Industries, 4. About Us, 5. Careers, 6. Contact */}
        <nav aria-label="Primary" className="relative z-10 hidden lg:flex items-center gap-3 xl:gap-5">
          <ul className="flex items-center gap-0.5 xl:gap-1.5">
            {orderedNavLinks.map((item) => {
              const isServices = item.label === 'Services';
              const isCurrentActive = isServices
                ? isServicesActive
                : location.pathname === item.to;

              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-flex items-center lg:px-2.5 xl:px-3.5 py-2 rounded-full text-[13.5px] xl:text-sm whitespace-nowrap transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                        isCurrentActive || isActive
                          ? 'text-white font-semibold bg-white/[0.16] ring-1 ring-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]'
                          : 'text-white/85 font-medium hover:text-white hover:bg-white/[0.10]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Right CTA: Primary Solid Prominent Pill matching BWise Logo Yellow with Adaptive Glow */}
          <div className="flex items-center shrink-0 pl-1">
            <button
              type="button"
              onClick={openConsultationModal}
              className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:brightness-105 text-[#14111B] font-bold px-5 py-2.5 text-[13px] whitespace-nowrap transition-all duration-300 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                isDarkUnderneath
                  ? 'shadow-[0_0_16px_rgba(245,158,11,0.38),0_2px_10px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-amber-300/50'
                  : 'shadow-[0_0_24px_rgba(245,158,11,0.70),0_4px_16px_rgba(234,141,40,0.50),inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-amber-400/80'
              }`}
            >
              Book a Free Consultation
            </button>
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
          className="relative z-10 lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/25 bg-white/[0.09] hover:bg-white/[0.16] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile/Tablet Floating Thick Frosted Glassmorphic Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id={mobileMenuId}
          className="pointer-events-auto lg:hidden mx-auto mt-2.5 max-w-[calc(100dvw-2rem)] max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-3xl backdrop-blur-2xl backdrop-saturate-150 px-4 pt-3.5 pb-5 space-y-3 text-stone-100"
          style={drawerGlassStyle}
        >
          <ul className="flex flex-col space-y-1">
            {orderedNavLinks.map((item) => {
              const isServices = item.label === 'Services';
              const isCurrentActive = isServices
                ? isServicesActive
                : location.pathname === item.to;

              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${
                        isCurrentActive || isActive
                          ? 'bg-white/[0.16] text-white ring-1 ring-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.20)]'
                          : 'text-white/85 hover:bg-white/[0.08] hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="pt-2.5 border-t border-white/15">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultationModal();
              }}
              className="block w-full text-center py-2.5 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:brightness-105 text-[#14111B] text-xs font-bold shadow-[0_0_16px_rgba(245,158,11,0.40),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all cursor-pointer"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
