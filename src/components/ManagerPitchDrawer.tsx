import React, { useState } from 'react';
import { Briefcase, TrendingUp, ShieldCheck, Smartphone, MapPin, DollarSign, CheckCircle2, X, ArrowRight, ExternalLink, Calendar, Users, Award, Percent } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface ManagerPitchDrawerProps {
  onOpenBookingDemo: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const ManagerPitchDrawer: React.FC<ManagerPitchDrawerProps> = ({
  onOpenBookingDemo,
  isOpen: controlledIsOpen,
  onClose,
  onOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (onOpen) onOpen();
    else setInternalIsOpen(true);
  };

  const handleClose = () => {
    if (onClose) onClose();
    else setInternalIsOpen(false);
  };

  return (
    <>
      {/* Discreet Executive Management Brief Trigger (Bottom-Left Pill) */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          type="button"
          onClick={handleOpen}
          className="group flex items-center gap-2.5 bg-stone-900/95 hover:bg-stone-900 text-stone-200 hover:text-white border border-stone-700 hover:border-amber-500/60 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          title="Management Brief: Revenue & Commission Analysis for Kings Hotel General Manager"
        >
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <Briefcase className="w-3.5 h-3.5 text-amber-400" />
          <span>Management Brief</span>
          <span className="text-[10px] bg-amber-600/30 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-500/30">
            ROI & Revenue
          </span>
        </button>
      </div>

      {/* Executive Pitch Slide-in Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-stone-900 border-l border-stone-800 text-stone-100 w-full max-w-2xl h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            
            <div>
              {/* Header */}
              <div className="flex items-start justify-between border-b border-stone-800 pb-5 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Executive Proposal for Kings Hotel Management</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Direct Booking & Revenue Strategy
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Prepared for: General Manager & Proprietor • Kings Hotel Kabale, Uganda
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Real Financial Breakdown (The Core Selling Point) */}
              <div className="bg-gradient-to-br from-amber-950/40 via-stone-950 to-stone-950 p-5 rounded-2xl border border-amber-500/30 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Percent className="w-4 h-4" /> Commission Savings Calculator
                  </span>
                  <span className="text-[11px] bg-emerald-950 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-700/50">
                    100% Direct Revenue
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center my-4">
                  <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 block">Lost on OTAs (18% - 22%)</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-red-400">
                      ~32.4M UGX
                    </span>
                    <span className="text-[10px] text-stone-500 block">per month (at 60% occupancy)</span>
                  </div>

                  <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                    <span className="text-[11px] text-stone-400 block">Direct Website Bookings</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-400">
                      0% Commission
                    </span>
                    <span className="text-[10px] text-emerald-500/80 block">Keep 100% of room rate</span>
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  Third-party platforms like Booking.com and Expedia charge between 18% to 22% on every booking. For a 50-room hotel like Kings Hotel in Kigongi, driving direct inquiries via this dedicated website keeps tens of millions of UGX in the business every year.
                </p>
              </div>

              {/* 4 Core Pillars to Pitch to the Manager */}
              <div className="space-y-4 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Why This Website Delivers Higher Profitability:
                </h4>

                {/* Pillar 1 */}
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Ugandan Guests Use WhatsApp & Mobile Money</h5>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Instead of complex credit card forms that cause 70% of Ugandan clients to abandon, our booking flow generates an official reservation voucher and immediately opens WhatsApp to <span className="font-mono text-amber-300">+256 772 477435</span> with MTN MoMo, Airtel Money, or cash on arrival.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Mbarara-Kabale-Katuna Highway Footfall</h5>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Integrated Google Maps API with verified coordinates <span className="font-mono text-amber-300">-1.250556, 29.988056</span> and Plus Code <span className="font-mono text-amber-300">PJXX+96</span> captures transit travelers driving towards Rwanda or Lake Bunyonyi looking for secure parking and a quiet overnight stay.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">High-Margin 200-Seat Conference Bookings</h5>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Kabale is a major NGO, government, and university workshop hub. The dedicated conference section promotes full-day delegate packages (65,000 UGX/pax), bringing in <span className="font-bold text-amber-400">13,000,000 UGX</span> per 200-delegate event in hall hire, tea breaks, and buffet catering.
                    </p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">4.2 ★ Google Reputation & High-Def Visual Proof</h5>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Features verified Google Maps reviews and high-resolution photography of all 50 rooms, the dining room, terrace bar, and Lake Bunyonyi excursions, immediately establishing trust with international safari travelers.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone-800 space-y-3">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    onOpenBookingDemo();
                  }}
                  className="flex-grow bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Test Live Booking Engine</span>
                </button>

                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Kings%20Hotel%20Manager!%20I%20am%20testing%20the%20official%20direct%20booking%20website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <span>Test WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-[11px] text-stone-500 text-center">
                Ready to deploy with zero upfront hardware costs • Compatible with all smartphones and laptops
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
