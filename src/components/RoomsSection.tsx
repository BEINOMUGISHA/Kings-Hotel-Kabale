import React, { useState } from 'react';
import { BedDouble, Users, Check, Eye, Calendar, ArrowRight, X, Maximize2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { ROOMS_DATA, HOTEL_IMAGES } from '../data/hotelData';
import { Room } from '../types';

interface RoomsSectionProps {
  currency: 'USD' | 'UGX';
  onSelectRoomForBooking: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ currency, onSelectRoomForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inspectingRoom, setInspectingRoom] = useState<Room | null>(null);

  const categories = ['All', 'Suite', 'Deluxe', 'Twin', 'Single'];

  const filteredRooms = selectedCategory === 'All'
    ? ROOMS_DATA
    : ROOMS_DATA.filter((r) => r.category === selectedCategory);

  const formatPrice = (room: Room) => {
    if (currency === 'USD') {
      return `$${room.priceUSD}`;
    }
    return `${room.priceUGX.toLocaleString()} UGX`;
  };

  return (
    <section id="rooms" className="py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest block mb-2">
              Accommodation in Kigongi, Kabale
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900">
              Rooms & Hill-View Suites
            </h2>
            <p className="text-stone-600 mt-3 text-base font-light leading-relaxed">
              All 50 guestrooms at Kings Hotel Kabale are en-suite and feature private balconies opening to gentle Kigezi breezes, solar-heated rainfall showers, and complimentary full English breakfast each morning.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-200/70 p-1.5 rounded-xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-300/60'
                }`}
              >
                {cat === 'All' ? 'All Rooms (50)' : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Room Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Popular Badge */}
                {room.popularBadge && (
                  <div className="absolute top-4 left-4 bg-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-sm uppercase tracking-wider">
                    {room.popularBadge}
                  </div>
                )}

                {/* Price Tag Overlay */}
                <div className="absolute bottom-4 right-4 bg-stone-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-lg text-right border border-stone-700">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">From</span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-amber-300">
                    {formatPrice(room)}
                  </span>
                  <span className="text-[10px] text-stone-400 ml-1">/ night</span>
                </div>
              </div>

              {/* Room Details Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {room.name}
                    </h3>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {room.description}
                  </p>

                  {/* Specifications Pill Row */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 mb-5 pb-5 border-b border-stone-100">
                    <span className="flex items-center gap-1.5 font-medium">
                      <BedDouble className="w-3.5 h-3.5 text-amber-700" />
                      {room.bedType}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-amber-700" />
                      {room.capacity}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="font-medium">
                      {room.sizeSqM} m²
                    </span>
                  </div>

                  {/* Top Amenities List */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 mb-6">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <li key={amenity} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => onSelectRoomForBooking(room)}
                    className="flex-grow bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve Room</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectingRoom(room)}
                    className="px-4 py-3 rounded-xl border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Direct Booking Assurance Note */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">Direct Booking Guarantee</p>
              <p className="text-xs text-stone-600">
                Book directly on this official site or via front desk WhatsApp to avoid 20% third-party booking commissions. Free cancellation up to 24 hours before check-in.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">
            50 Rooms • Kigongi, Kabale
          </span>
        </div>

      </div>

      {/* Room Inspection Modal */}
      {inspectingRoom && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setInspectingRoom(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
              {inspectingRoom.name}
            </h3>
            <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider mb-4">
              {inspectingRoom.bedType} • {inspectingRoom.capacity} • {inspectingRoom.sizeSqM} m²
            </p>

            {/* Real Kings Hotel Photo Showcase */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Real Kings Hotel Verified Room & Hospitality Photos
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 shadow-sm">
                  <img
                    src={inspectingRoom.imageUrl}
                    alt="Kings Hotel Bedroom and bed setup"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 bg-stone-900/90 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                    Bedroom & Bedding
                  </span>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 shadow-sm">
                  <img
                    src={HOTEL_IMAGES.bathroomToilet}
                    alt="Kings Hotel En-suite tiled bathroom and toilet"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 bg-stone-900/90 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                    En-Suite Bathroom
                  </span>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 shadow-sm">
                  <img
                    src={HOTEL_IMAGES.waterHeaterShower}
                    alt="Kings Hotel Instant electric water heater shower"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 bg-stone-900/90 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                    Instant Hot Shower
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed mb-6">
              {inspectingRoom.description}
            </p>

            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
              Room Amenities & Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 mb-6">
              {inspectingRoom.amenities.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <div>
                <span className="text-xs text-stone-500">Official Rate:</span>
                <p className="font-serif text-2xl font-bold text-amber-700">
                  {formatPrice(inspectingRoom)}
                  <span className="text-xs font-normal text-stone-500"> / night</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const r = inspectingRoom;
                  setInspectingRoom(null);
                  onSelectRoomForBooking(r);
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                Book This Room Now
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
