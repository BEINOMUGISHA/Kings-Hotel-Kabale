import React, { useState } from 'react';
import { Star, MapPin, Calendar, Users, ShieldCheck, Wifi, Coffee, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO, HOTEL_IMAGES, ROOMS_DATA } from '../data/hotelData';

interface HeroProps {
  onSearchAvailability: (searchParams: { checkIn: string; checkOut: string; guests: number; category: string }) => void;
  onOpenGallery?: () => void;
  currency: 'USD' | 'UGX';
}

export const Hero: React.FC<HeroProps> = ({ onSearchAvailability, onOpenGallery, currency }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [category, setCategory] = useState('All');

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchAvailability({
      checkIn,
      checkOut,
      guests,
      category
    });
  };

  return (
    <section id="overview" className="relative pt-28 lg:pt-36 pb-20 bg-stone-900 text-white overflow-hidden">
      
      {/* Background Architectural Photograph with Warm Natural Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={HOTEL_IMAGES.facade}
          alt="Kings Hotel Kabale Uganda facade and terrace gardens in Kigongi"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Proof Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <a
            href="#reviews"
            className="inline-flex items-center gap-2 bg-stone-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-emerald-500/40 text-xs text-stone-200 hover:border-[#00AA6C] transition-colors shadow-sm group"
          >
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00AA6C] inline-block" />
              <span>TripAdvisor {HOTEL_INFO.tripadvisorRating} ★</span>
            </div>
            <span className="text-stone-600">|</span>
            <span className="font-medium text-emerald-200 group-hover:text-white transition-colors">88 Reviews · Travelers' Choice</span>
          </a>

          <a
            href={HOTEL_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-stone-700/80 text-xs text-stone-200 hover:border-amber-400 transition-colors shadow-sm"
          >
            <div className="flex items-center text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
              <span>{HOTEL_INFO.googleMapsRating}</span>
            </div>
            <span className="text-stone-500">|</span>
            <span className="font-medium text-stone-300">154+ Google Maps Reviews</span>
          </a>

          <div className="inline-flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-stone-700/80 text-xs text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Kigongi, Kabale • 15 Mins to Lake Bunyonyi</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-stone-700/80 text-xs text-amber-400 font-mono">
            <span>2,000m Altitude • Refreshing Mountain Breeze</span>
          </div>
        </div>

        {/* Editorial Headline & Subtitle */}
        <div className="max-w-3xl mb-12">
          <span className="text-amber-400 font-semibold uppercase tracking-widest text-xs block mb-3">
            Boutique Hospitality in Kigezi Highlands
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-5">
            Refined Highland Hospitality in the Heart of Kabale
          </h1>
          <p className="text-base sm:text-lg text-stone-200 font-light leading-relaxed max-w-2xl">
            Welcome to Kings Hotel. Set quietly in Kigongi off the Kabale-Mbarara corridor, we offer 50 en-suite guestrooms with private balconies overlooking terraced hills, fresh Lake Bunyonyi dining, and direct transit to Bwindi mountain gorillas.
          </p>
        </div>

        {/* Professional Integrated Reservation Booking Bar */}
        <div className="bg-white text-stone-900 rounded-2xl p-5 sm:p-6 shadow-2xl max-w-5xl border border-stone-200/90 mb-10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3.5 mb-4 gap-2">
            <div>
              <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>Check Room Rates & Direct Availability</span>
              </h2>
              <p className="text-xs text-stone-500">50 en-suite guestrooms • Best direct rate guarantee • Pay on arrival</p>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-600">
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Free English Breakfast
              </span>
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 24/7 Solar Hot Showers
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmitSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            
            {/* Check-In */}
            <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors">
              <label htmlFor="hero-check-in" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Check-In Date
              </label>
              <input
                id="hero-check-in"
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
                required
              />
            </div>

            {/* Check-Out */}
            <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors">
              <label htmlFor="hero-check-out" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Check-Out Date
              </label>
              <input
                id="hero-check-out"
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
                required
              />
            </div>

            {/* Room Type */}
            <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors">
              <label htmlFor="hero-room-type" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Room Category
              </label>
              <select
                id="hero-room-type"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
              >
                <option value="All">All Rooms (50)</option>
                <option value="Suite">Royal Suite (from $75 / 280,000 UGX)</option>
                <option value="Deluxe">Deluxe Double (from $55 / 200,000 UGX)</option>
                <option value="Twin">Comfort Twin (from $55 / 200,000 UGX)</option>
                <option value="Single">Standard Single (from $45 / 165,000 UGX)</option>
              </select>
            </div>

            {/* Guests */}
            <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors">
              <label htmlFor="hero-guests" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Guests
              </label>
              <select
                id="hero-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Group / Family</option>
              </select>
            </div>

            {/* Submit CTA */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Find Rooms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        </div>

        {/* Key Amenities Strip (Clean & Non-Gimmicky) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl text-xs text-stone-300">
          <div className="flex items-center gap-3 bg-stone-950/60 backdrop-blur-sm p-3 rounded-xl border border-stone-800">
            <Wifi className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="font-semibold text-white">Free Fast Wi-Fi</p>
              <p className="text-[11px] text-stone-400">In all 50 rooms & gardens</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-950/60 backdrop-blur-sm p-3 rounded-xl border border-stone-800">
            <Coffee className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="font-semibold text-white">English Breakfast</p>
              <p className="text-[11px] text-stone-400">Included with your stay</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-950/60 backdrop-blur-sm p-3 rounded-xl border border-stone-800">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="font-semibold text-white">Guarded Parking</p>
              <p className="text-[11px] text-stone-400">24/7 secure fenced compound</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-950/60 backdrop-blur-sm p-3 rounded-xl border border-stone-800">
            <Navigation className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="font-semibold text-white">Safari Logistics</p>
              <p className="text-[11px] text-stone-400">Lake Bunyonyi & Gorillas</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
