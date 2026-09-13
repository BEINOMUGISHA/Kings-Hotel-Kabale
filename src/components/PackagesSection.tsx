import React from 'react';
import { Sparkles, Check, Clock, Calendar, ArrowRight, Camera, ShieldCheck } from 'lucide-react';
import { CURATED_PACKAGES } from '../data/hotelData';
import { HotelPackage } from '../types';

interface PackagesSectionProps {
  currency: 'USD' | 'UGX';
  onSelectPackage: (pkg: HotelPackage) => void;
  onOpenGallery: () => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  currency,
  onSelectPackage,
  onOpenGallery,
}) => {
  const formatPrice = (pkg: HotelPackage) => {
    if (currency === 'USD') {
      return `$${pkg.priceUSD}`;
    }
    return `${pkg.priceUGX.toLocaleString()} UGX`;
  };

  return (
    <section id="packages" className="py-20 bg-stone-950 text-stone-100 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Special Offers & Safari Bundles
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Curated Kigezi Stay Packages
            </h2>
            <p className="text-stone-400 mt-3 text-base sm:text-lg">
              Designed to give you maximum value in Southwestern Uganda. Combine luxury hill-view accommodation with Lake Bunyonyi canoe safaris, gorilla tracking logistics, and corporate banquet catering.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenGallery}
            className="self-start md:self-auto inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-800 hover:border-amber-400/50 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all"
          >
            <Camera className="w-4 h-4" />
            <span>Explore 8+ HD Photo Gallery</span>
          </button>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CURATED_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-stone-900/90 rounded-3xl overflow-hidden border border-stone-800 hover:border-amber-500/40 shadow-2xl flex flex-col justify-between transition-all duration-300 group"
            >
              {/* Image & Badges */}
              <div className="relative h-60 overflow-hidden bg-stone-950">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {pkg.badge}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-stone-200 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pkg.duration}</span>
                  </span>

                  <div className="text-right bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                    <span className="text-lg font-bold font-serif text-amber-400">
                      {formatPrice(pkg)}
                    </span>
                    <span className="text-[10px] text-stone-300 block">all inclusive</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 mb-6 border-t border-stone-800 pt-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Package Inclusions:</span>
                    {pkg.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-stone-800/80">
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve Package with Front Desk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-center text-[10px] text-stone-500 mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Direct Booking Guarantee • No booking agent fees</span>
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
