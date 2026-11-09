import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { BwiseLogo } from './BwiseLogo';
import { PRIORITY_SERVICES } from '../../data/servicesData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#161310] text-stone-300 border-t border-amber-500/20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <BwiseLogo className="h-12" lightText />
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Bwise is a full-service Digital Marketing &amp; Software Solutions agency organized like a high-precision Beehive—where 12 specialized studios collaborate to scale your brand, search visibility, AI capabilities, and software products.
            </p>
            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>hello@bwiseagency.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (888) 555-9811</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hive Innovation Tower, Suite 1200, San Francisco &amp; London</span>
              </div>
            </div>
          </div>

          {/* Column 2: Priority Services (1-6) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Strategy, Search &amp; AI Studios
            </h3>
            <ul className="space-y-2 text-sm">
              {PRIORITY_SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services?service=${service.slug}#${service.slug}`}
                    className="text-stone-400 hover:text-amber-300 transition inline-flex items-center gap-1 group"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Priority Services (7-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Analytics, Engineering &amp; Brand
            </h3>
            <ul className="space-y-2 text-sm">
              {PRIORITY_SERVICES.slice(6, 12).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services?service=${service.slug}#${service.slug}`}
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
              Explore Hive
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-stone-400 hover:text-white transition">
                  Interactive Beehive (Home)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-400 hover:text-white transition">
                  About Us &amp; Philosophy
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-stone-400 hover:text-white transition">
                  All 12 Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-400 hover:text-white transition">
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Bwise Digital Marketing &amp; Software Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-stone-300 transition">
              Hive Architecture
            </Link>
            <Link to="/services" className="hover:text-stone-300 transition">
              Service Studios
            </Link>
            <Link to="/contact" className="hover:text-stone-300 transition">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
