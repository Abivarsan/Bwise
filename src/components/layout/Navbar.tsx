import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles, Cpu, Megaphone, Lightbulb } from 'lucide-react';
import { BwiseLogo } from './BwiseLogo';
import { PRIORITY_SERVICES, MAIN_SERVICE_CATEGORIES } from '../../data/servicesData';
import { ServiceIcon } from '../hive/HoneycombGrid3D';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services', hasDropdown: true },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/60 transition-all">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo matching S1.jpg & S5.jpg */}
        <Link
          to="/"
          className="focus:outline-none group flex items-center gap-2"
          aria-label="Bwise Home"
        >
          <BwiseLogo className="h-10 sm:h-11 transition-transform duration-300 group-hover:scale-[1.02]" />
        </Link>

        {/* Desktop Navigation Links + "Let's Connect" Pill CTA (matching S1.jpg & S5.jpg) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 py-2 text-[15px] font-medium transition-colors ${
                      isActive
                        ? 'text-amber-600 font-semibold border-b-2 border-amber-500'
                        : 'text-stone-800 hover:text-amber-600'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </NavLink>

                {/* Mega-Menu Dropdown of all 12 Priority Services */}
                {servicesDropdownOpen && (
                  <div className="absolute right-0 lg:left-1/2 lg:-translate-x-1/2 top-full pt-2 w-[560px] z-50">
                    <div className="bg-white rounded-3xl p-5 shadow-[0_24px_60px_rgba(26,22,18,0.16)] border border-stone-200/80">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          3 Main Service Categories
                        </span>
                        <Link
                          to="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="text-xs font-bold text-stone-600 hover:text-amber-600"
                        >
                          View All Services →
                        </Link>
                      </div>

                      {/* 3 Main Categories Featured Row */}
                      <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-stone-100">
                        {MAIN_SERVICE_CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              navigate(`/services?category=${cat.slug}#${cat.slug}`);
                            }}
                            className="p-2.5 rounded-xl bg-amber-50/70 hover:bg-amber-100 border border-amber-200/80 text-left transition group cursor-pointer"
                          >
                            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center mb-1.5 shadow-2xs group-hover:scale-105 transition-transform">
                              {cat.slug === 'software-solutions' && <Cpu className="w-3.5 h-3.5" />}
                              {cat.slug === 'social-media-marketing' && <Megaphone className="w-3.5 h-3.5" />}
                              {cat.slug === 'digital-strategy-ideas' && <Lightbulb className="w-3.5 h-3.5" />}
                            </div>
                            <p className="text-xs font-extrabold text-stone-900 leading-tight group-hover:text-amber-800">
                              {cat.title}
                            </p>
                            <span className="text-[10px] font-bold text-amber-700">{cat.badge}</span>
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {PRIORITY_SERVICES.map((svc) => (
                          <button
                            key={svc.id}
                            type="button"
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              navigate(`/services?category=${svc.categorySlug}&service=${svc.slug}#${svc.slug}`);
                            }}
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-amber-50/90 text-left transition group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                              <ServiceIcon name={svc.iconName} className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-stone-900 truncate group-hover:text-amber-700">
                                {svc.title}
                              </p>
                              <p className="text-[10px] text-stone-500 truncate">{svc.category}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `py-2 text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'text-amber-600 font-semibold border-b-2 border-amber-500'
                      : 'text-stone-800 hover:text-amber-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}

          {/* Warm Amber "Let's Connect" Pill CTA matching S1.jpg & S5.jpg */}
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full bg-gradient-to-b from-[#F5A646] to-[#E68A20] hover:from-[#F29A30] hover:to-[#D67B12] text-white text-[15px] font-semibold shadow-[0_8px_20px_rgba(234,141,40,0.35)] hover:shadow-[0_10px_25px_rgba(234,141,40,0.5)] transition-all duration-200 active:scale-95"
          >
            Let&apos;s Connect
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 hover:bg-amber-50"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-base font-semibold ${
                    isActive ? 'bg-amber-50 text-amber-700' : 'text-stone-800 hover:bg-stone-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100">
            <p className="px-4 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
              Main Service Categories
            </p>
            <div className="grid grid-cols-1 gap-1.5 px-2 mb-3">
              {MAIN_SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(`/services?category=${cat.slug}#${cat.slug}`);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/80 hover:bg-amber-100 text-left text-xs font-bold text-stone-900 border border-amber-200/80"
                >
                  <div className="flex items-center gap-2">
                    {cat.slug === 'software-solutions' && <Cpu className="w-4 h-4 text-amber-600" />}
                    {cat.slug === 'social-media-marketing' && <Megaphone className="w-4 h-4 text-amber-600" />}
                    {cat.slug === 'digital-strategy-ideas' && <Lightbulb className="w-4 h-4 text-amber-600" />}
                    <span>{cat.title}</span>
                  </div>
                  <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    {cat.badge}
                  </span>
                </button>
              ))}
            </div>

            <p className="px-4 text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              All 12 Hive Studios
            </p>
            <div className="grid grid-cols-2 gap-1.5 px-2 max-h-48 overflow-y-auto">
              {PRIORITY_SERVICES.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(`/services?category=${svc.categorySlug}&service=${svc.slug}#${svc.slug}`);
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 hover:bg-amber-50 text-left text-xs font-semibold text-stone-800"
                >
                  <ServiceIcon name={svc.iconName} className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{svc.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 px-2">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-[#F5A646] to-[#E68A20] text-white font-bold shadow-md"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
