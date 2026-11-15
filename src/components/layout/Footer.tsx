import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Mail, MapPin } from 'lucide-react';
import { BwiseLogo } from './BwiseLogo';
import { getServicesByCategory } from '../../data/servicesData';

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/bwiselk/',
    label: 'Follow BWise on LinkedIn',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61592147020833',
    label: 'Follow BWise on Facebook',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/bwise.lk/?hl=en',
    label: 'Follow BWise on Instagram',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
      </svg>
    ),
  },
];

export const Footer: React.FC = () => {
  return (
    <footer data-theme="dark" className="bg-[#161310] text-stone-300 border-t border-amber-500/20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand, Jaffna HQ & Official Socials */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block focus:outline-none focus-visible:outline-2 focus-visible:outline-amber-400 rounded-lg"
              aria-label="BWise Home"
            >
              <BwiseLogo className="h-12" lightText />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              BWise is a Software Development &amp; Digital Marketing Agency based in Jaffna, Sri Lanka—organized like a connected Beehive where engineering, creative design, and growth teams build impactful digital products.
            </p>
            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Jaffna, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@bwise.lk" className="hover:text-amber-300 transition">
                  info@bwise.lk
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>bwise.lk · Serving Sri Lanka &amp; Global Clients</span>
              </div>
            </div>

            {/* Official Social Media Links */}
            <div className="pt-2 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-amber-500 text-stone-300 hover:text-stone-950 border border-stone-800 hover:border-amber-400 text-xs font-bold transition-all"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Software Solutions Studios (1-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Software Solutions
            </h3>
            <ul className="space-y-2 text-sm">
              {getServicesByCategory('software-solutions').map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services?category=${service.categorySlug}&service=${service.slug}#${service.slug}`}
                    className="text-stone-400 hover:text-amber-300 transition inline-flex items-center gap-1 group"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Marketing & Strategy Studios (8-13) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Marketing &amp; Brand Studios
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ...getServicesByCategory('social-media-marketing'),
                ...getServicesByCategory('digital-strategy-ideas'),
              ].map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services?category=${service.categorySlug}&service=${service.slug}#${service.slug}`}
                    className="text-stone-400 hover:text-amber-300 transition inline-flex items-center gap-1 group"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Explore BWise
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="text-stone-400 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-stone-400 hover:text-white transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-stone-400 hover:text-white transition">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-stone-400 hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} BWise (bwise.lk) · Jaffna, Sri Lanka. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/company/bwiselk/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61592147020833"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/bwise.lk/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
