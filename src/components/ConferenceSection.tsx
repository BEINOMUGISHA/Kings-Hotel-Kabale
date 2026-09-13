import React from 'react';
import { Users, Presentation, Wifi, Coffee, Sparkles, CheckCircle } from 'lucide-react';

interface ConferenceSectionProps {
  onOpenBooking: () => void;
}

export const ConferenceSection: React.FC<ConferenceSectionProps> = ({ onOpenBooking }) => {
  const features = [
    { title: "Capacity up to 200 Pax", desc: "Flexible theater, U-shape, classroom, and banquet layout configurations." },
    { title: "HD Projector & Sound", desc: "Modern AV projection screens, wireless handheld microphones, and audio mixer." },
    { title: "Fiber High-Speed Wi-Fi", desc: "Dedicated high-bandwidth connectivity for video conferences and delegate access." },
    { title: "Full Event Catering", desc: "Morning tea breaks with Kigezi Arabica coffee, hot snacks, and 3-course buffet lunches." },
  ];

  return (
    <section id="conferences" className="py-20 bg-white text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text & Features (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5 text-amber-700" />
              Conferences & Banqueting
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              Modern Event Venues in Kabale Town
            </h2>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-8">
              Kings Hotel offers fully equipped conference halls and executive meeting spaces for NGO workshops, corporate training retreats, governmental forums, and celebratory banquets in Southwestern Uganda.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    {i === 0 ? <Users className="w-4 h-4" /> : i === 1 ? <Presentation className="w-4 h-4" /> : i === 2 ? <Wifi className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">{f.title}</h3>
                    <p className="text-xs text-stone-600 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Request Conference Proposal</span>
                <span>→</span>
              </button>
              <span className="text-xs text-stone-500 font-medium">
                Custom delegate accommodation & conference packages available
              </span>
            </div>
          </div>

          {/* Quick Specifications Card (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl relative">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Event Packages
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              Full-Day & Half-Day Delegate Rates
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-stone-300 mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span>Full Day Conference Package</span>
                <span className="font-bold text-amber-400 font-mono">From 65,000 UGX / pax</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span>Half Day Conference Package</span>
                <span className="font-bold text-amber-400 font-mono">From 45,000 UGX / pax</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span>Evening Banquet / Wedding Reception</span>
                <span className="font-bold text-amber-400 font-mono">Tailored Quote</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-400 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Includes writing pads, pens, mints, and bottled mineral water</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Standby generator for uninterrupted power supply</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Ample secure parking for over 40 delegate vehicles</span>
              </div>
            </div>

            <a
              href="tel:+256772477435"
              className="w-full block text-center py-2.5 px-4 bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-white rounded-xl text-xs font-semibold border border-stone-700 transition-colors"
            >
              Call Conference Coordinator: +256 772 477435
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
