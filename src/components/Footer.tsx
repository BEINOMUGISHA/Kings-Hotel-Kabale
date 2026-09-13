import React from 'react';
import { Crown, MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FooterProps {
  onOpenManagementBrief?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenManagementBrief }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight text-white block">
                  KINGS HOTEL
                </span>
                <span className="text-[10px] tracking-widest uppercase text-amber-400 font-medium">
                  Kabale Municipality • Uganda
                </span>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed">
              Your regal hospitality sanctuary in the Kigezi highlands. Offering 50 comfortable en-suite rooms with hill-view balconies, Royal Restaurant, and safari base for Lake Bunyonyi and Bwindi Gorillas.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-amber-400 font-mono bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-800 inline-block">
              Altitude: ~2,000m ASL • Switzerland of Africa
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-amber-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-amber-400 transition-colors">Hotel Overview</a></li>
              <li><a href="#rooms" className="hover:text-amber-400 transition-colors">Rooms & Suites (50 Rooms)</a></li>
              <li><a href="#dining" className="hover:text-amber-400 transition-colors">Kings Royal Restaurant & Bar</a></li>
              <li><a href="#safari" className="hover:text-amber-400 transition-colors">Lake Bunyonyi Excursions</a></li>
              <li><a href="#conferences" className="hover:text-amber-400 transition-colors">Conferences & Banqueting</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">Google Maps Location & Directions</a></li>
              <li><a href="#reviews" className="hover:text-[#00AA6C] transition-colors">TripAdvisor & Google Reviews</a></li>
              <li>
                <a
                  href={HOTEL_INFO.tripadvisorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#00AA6C] hover:underline"
                >
                  <span>Kings Hotel on TripAdvisor</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Location & Coordinates */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-amber-400">
              Google Maps Location
            </h4>
            <p className="text-stone-400 leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{HOTEL_INFO.address}</span>
            </p>
            <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Plus Code:</span>
                <span className="font-mono text-amber-300">{HOTEL_INFO.plusCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Coordinates:</span>
                <span className="font-mono text-stone-300">{HOTEL_INFO.coordinates.lat}, {HOTEL_INFO.coordinates.lng}</span>
              </div>
            </div>
            <a
              href={HOTEL_INFO.googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium"
            >
              <span>Open Directions in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Col 4: Contact & Front Desk */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-amber-400">
              Reservations & Inquiries
            </h4>
            <div className="space-y-2 text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phonePrimary}`} className="text-stone-200 hover:text-amber-400 font-mono">
                  {HOTEL_INFO.phonePrimary} (Primary)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phoneSecondary}`} className="text-stone-200 hover:text-amber-400 font-mono">
                  {HOTEL_INFO.phoneSecondary} (WhatsApp)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${HOTEL_INFO.reservationsEmail}`} className="text-stone-200 hover:text-amber-400">
                  {HOTEL_INFO.reservationsEmail}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Front Desk: 24 Hours / 7 Days</span>
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-stone-500 block mb-1.5">Payment Methods Accepted:</span>
              <span className="bg-stone-900 border border-stone-800 text-stone-300 px-2.5 py-1 rounded text-[11px] font-medium mr-1.5">
                MTN Mobile Money
              </span>
              <span className="bg-stone-900 border border-stone-800 text-stone-300 px-2.5 py-1 rounded text-[11px] font-medium mr-1.5">
                Airtel Money
              </span>
              <span className="bg-stone-900 border border-stone-800 text-stone-300 px-2.5 py-1 rounded text-[11px] font-medium">
                Cash (UGX / USD)
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} Kings Hotel Kabale, Uganda. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-4">
            <span>Kabale Municipality • Kigezi Sub-Region</span>
            <span>•</span>
            <span>Gateway to Lake Bunyonyi & Bwindi Gorillas</span>
            {onOpenManagementBrief && (
              <>
                <span>•</span>
                <button
                  type="button"
                  onClick={onOpenManagementBrief}
                  className="text-stone-400 hover:text-amber-400 transition-colors underline underline-offset-2"
                >
                  Management Brief (ROI & Direct Revenue)
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
