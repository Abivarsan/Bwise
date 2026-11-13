import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BwiseLogo } from './BwiseLogo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkUnderneath, setIsDarkUnderneath] = useState(false);

  const location = useLocation();
  const mobileMenuId = useId();
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

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

  // Detect whether the surface beneath the CTA button is light or dark to adapt glow intensity
  useEffect(() => {
    let rafId: number | null = null;

    const checkBackground = () => {
      if (!ctaButtonRef.current) return;
      const rect = ctaButtonRef.current.getBoundingClientRect();
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

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 pt-3.5 sm:pt-5 pointer-events-none">
      {/* Floating Centered Dark Glassmorphic Pill Capsule */}
      <div
        className="pointer-events-auto relative mx-auto flex h-14 sm:h-[60px] w-full lg:w-fit max-w-[calc(100vw-2rem)] items-center justify-between gap-3 lg:gap-4 xl:gap-7 rounded-full bg-[#14111B]/72 backdrop-blur-xl backdrop-saturate-150 pl-4 sm:pl-6 pr-2 sm:pr-2.5 py-2 shadow-[0_16px_42px_rgba(12,10,20,0.28),inset_0_1px_0_rgba(255,255,255,0.10)]"
        style={{ border: '1px solid rgba(255, 255, 255, 0.15)' }}
      >
        {/* Brand Logo — Increased visual separation from Services tab */}
        <Link
          to="/"
          onClick={handleLogoHomeClick}
          className="shrink-0 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-full group flex items-center mr-3 sm:mr-4 lg:mr-7 xl:mr-10"
          aria-label="BWise Home"
        >
          <BwiseLogo
            lightText
            className="h-8 sm:h-9 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Primary Site Navigation: 1. Services (Direct Link), 2. Portfolio, 3. Industries, 4. About Us, 5. Careers, 6. Contact */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-3 xl:gap-5">
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
                          ? 'text-white font-semibold bg-white/[0.12] ring-1 ring-white/15'
                          : 'text-stone-300/90 font-medium hover:text-white hover:bg-white/[0.06]'
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
            <Link
              ref={ctaButtonRef}
              to="/contact"
              className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:brightness-105 text-[#14111B] font-bold px-5 py-2 text-[13px] whitespace-nowrap transition-all duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                isDarkUnderneath
                  ? 'shadow-[0_0_12px_rgba(245,158,11,0.30),0_2px_8px_rgba(0,0,0,0.35)] ring-1 ring-amber-400/40'
                  : 'shadow-[0_0_24px_rgba(245,158,11,0.70),0_4px_16px_rgba(234,141,40,0.50)] ring-1 ring-amber-400/80'
              }`}
            >
              Book a Free Consultation
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

      {/* Mobile/Tablet Floating Glassmorphic Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id={mobileMenuId}
          className="pointer-events-auto lg:hidden mx-auto mt-2.5 max-w-[calc(100dvw-2rem)] max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-3xl bg-[#14111B]/85 backdrop-blur-xl px-4 pt-3.5 pb-5 space-y-3 shadow-[0_24px_60px_rgba(0,0,0,0.5)] text-stone-100"
          style={{ border: '1px solid rgba(255, 255, 255, 0.15)' }}
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
                          ? 'bg-white/[0.14] text-white ring-1 ring-white/15'
                          : 'text-stone-300 hover:bg-white/[0.06] hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="pt-2 border-t border-white/10">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:brightness-105 text-[#14111B] text-xs font-bold shadow-[0_0_16px_rgba(245,158,11,0.40)] transition-all"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
