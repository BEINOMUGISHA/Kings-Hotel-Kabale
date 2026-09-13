import React from 'react';
import { Compass, Ship, Mountain, MapPin, CheckCircle2, Car, Shield } from 'lucide-react';
import { HOTEL_IMAGES } from '../data/hotelData';

interface SafariExcursionsProps {
  onOpenBooking: () => void;
}

export const SafariExcursions: React.FC<SafariExcursionsProps> = ({ onOpenBooking }) => {
  const experiences = [
    {
      title: "Lake Bunyonyi Island Boat Cruises",
      subtitle: "15 Minutes from Kings Hotel (11.8 km)",
      description: "Explore the 29 mystical islands of Africa's second-deepest lake. Take a motorized cruise or authentic dugout canoe to Punishment Island (Akampene), Bushara Island, and Kyahugye Island for zebra and waterbuck viewing.",
      highlights: [
        "Safe, bilharzia-free freshwater lake",
        "Traditional wooden canoe paddling",
        "Birdwatcher's paradise (over 200 bird species)",
        "Hotel transport & local guide arrangement"
      ]
    },
    {
      title: "Bwindi Mountain Gorilla Trekking Hub",
      subtitle: "Ruhija & Rushaga Sectors (1.5 - 2 hrs drive)",
      description: "Kings Hotel serves as an ideal comfortable overnight base before early morning gorilla tracking in Bwindi Impenetrable National Park. We prepare early breakfast packs and connect you with licensed 4x4 safari chauffeurs.",
      highlights: [
        "Early 5:30 AM traveler breakfast packs",
        "Packed gourmet lunches for the jungle trek",
        "Reliable 4WD vehicle transfers on call",
        "Post-trek hot rainfall showers & relaxation"
      ]
    },
    {
      title: "Bakiga Cultural Heritage & Market Walk",
      subtitle: "Walking distance to Kabale Central Market",
      description: "Immerse yourself in the authentic culture of the Bakiga people. Tour Kabale central municipal market, visit local craftsmen weaving colorful raffia baskets, and discover the history of the Kigezi highlands.",
      highlights: [
        "Kabale Central Market fresh produce walk",
        "Traditional basket weavers & craft markets",
        "Panoramic viewpoints atop Makanga Hill",
        "Local guide accompanied tours"
      ]
    }
  ];

  return (
    <section id="safari" className="py-20 bg-stone-100 text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            Highland Adventures & Safaris
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            Your Gateway to Lake Bunyonyi & Bwindi Gorillas
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Known affectionately as the "Switzerland of Africa," Kabale is surrounded by terraced green hills, misty volcanic peaks, and serene waters. At Kings Hotel, we take care of your accommodation and safari transit logistics.
          </p>
        </div>

        {/* Feature Banner: Lake Bunyonyi High-Res Scenic Visual */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 border border-stone-200">
          <div className="h-80 sm:h-96 w-full">
            <img
              src={HOTEL_IMAGES.lakeBunyonyi}
              alt="Panoramic scenic landscape of Lake Bunyonyi near Kings Hotel Kabale"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl text-white">
              <span className="bg-amber-500 text-stone-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                11.8 km from Kings Hotel
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Lake Bunyonyi — Place of Many Little Birds</h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1">
                Enjoy serene morning mist and tranquil boat rides on Africa's second deepest lake, just 15 minutes drive from our lobby.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className="bg-white hover:bg-stone-100 text-stone-900 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-xl shrink-0 transition-all active:scale-95"
            >
              Plan Your Trip With Us
            </button>
          </div>
        </div>

        {/* 3 Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 mb-4">
                  {idx === 0 ? <Ship className="w-5 h-5" /> : idx === 1 ? <Mountain className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                </div>

                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                  {exp.subtitle}
                </span>
                <h4 className="font-serif text-xl font-bold text-stone-900 mb-3">
                  {exp.title}
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {exp.description}
                </p>

                <div className="space-y-2 border-t border-stone-100 pt-4 mb-6">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full text-center py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-amber-50 text-stone-800 hover:text-amber-900 text-xs font-semibold border border-stone-200 transition-colors"
                >
                  Inquire Safari Booking
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
