import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, BedDouble, CheckCircle2, Phone, Send, ArrowRight, ShieldCheck, Crown, Printer, QrCode, Sparkles, MapPin } from 'lucide-react';
import { ROOMS_DATA, HOTEL_INFO } from '../data/hotelData';
import { Room, HotelPackage } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
  selectedPackage?: HotelPackage | null;
  currency: 'USD' | 'UGX';
  initialSearchParams?: {
    checkIn: string;
    checkOut: string;
    guests: number;
    category: string;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  selectedPackage,
  currency,
  initialSearchParams
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [currentRoom, setCurrentRoom] = useState<Room>(selectedRoom || ROOMS_DATA[0]);
  const [activePackage, setActivePackage] = useState<HotelPackage | null>(selectedPackage || null);
  const [checkIn, setCheckIn] = useState<string>(initialSearchParams?.checkIn || today);
  const [checkOut, setCheckOut] = useState<string>(initialSearchParams?.checkOut || tomorrow);
  const [guests, setGuests] = useState<number>(initialSearchParams?.guests || 2);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [addOnBunyonyi, setAddOnBunyonyi] = useState<boolean>(false);
  const [addOnGorillaLunch, setAddOnGorillaLunch] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  useEffect(() => {
    if (selectedRoom) {
      setCurrentRoom(selectedRoom);
      setActivePackage(null);
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedPackage) {
      setActivePackage(selectedPackage);
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (initialSearchParams) {
      if (initialSearchParams.checkIn) setCheckIn(initialSearchParams.checkIn);
      if (initialSearchParams.checkOut) setCheckOut(initialSearchParams.checkOut);
      if (initialSearchParams.guests) setGuests(initialSearchParams.guests);
      if (initialSearchParams.category && initialSearchParams.category !== 'All') {
        const found = ROOMS_DATA.find((r) => r.category === initialSearchParams.category);
        if (found) setCurrentRoom(found);
      }
    }
  }, [initialSearchParams]);

  if (!isOpen) return null;

  // Calculate nights
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 1;

  // Addon costs
  const bunyonyiCostUSD = 20;
  const bunyonyiCostUGX = 75000;
  const gorillaLunchCostUSD = 10;
  const gorillaLunchCostUGX = 35000;

  const basePricePerNight = currency === 'USD' ? currentRoom.priceUSD : currentRoom.priceUGX;
  let totalPrice = activePackage
    ? (currency === 'USD' ? activePackage.priceUSD : activePackage.priceUGX)
    : basePricePerNight * calculatedNights;

  if (addOnBunyonyi) {
    totalPrice += currency === 'USD' ? bunyonyiCostUSD : bunyonyiCostUGX;
  }
  if (addOnGorillaLunch) {
    totalPrice += currency === 'USD' ? gorillaLunchCostUSD : gorillaLunchCostUGX;
  }

  const formattedTotal = currency === 'USD' ? `$${totalPrice}` : `${totalPrice.toLocaleString()} UGX`;
  const formattedPerNight = currency === 'USD' ? `$${basePricePerNight}` : `${basePricePerNight.toLocaleString()} UGX`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'KHK-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRef(randomCode);
    setIsSubmitted(true);
  };

  const generateWhatsAppMessage = () => {
    const bookingItem = activePackage ? `Package: ${activePackage.title}` : `Room: ${currentRoom.name}`;
    const text = `*KINGS HOTEL KABALE RESERVATION REQUEST*%0A` +
      `*Booking Ref:* ${bookingRef || 'NEW'}%0A` +
      `*Item:* ${bookingItem}%0A` +
      `*Check-in:* ${checkIn}%0A` +
      `*Check-out:* ${checkOut} (${calculatedNights} night${calculatedNights > 1 ? 's' : ''})%0A` +
      `*Guests:* ${guests}%0A` +
      `*Add-ons:* ${addOnBunyonyi ? 'Lake Bunyonyi Boat Cruise (+), ' : ''}${addOnGorillaLunch ? 'Gorilla Safari Lunch (+), ' : ''}${!addOnBunyonyi && !addOnGorillaLunch ? 'None' : ''}%0A` +
      `*Total Quote:* ${formattedTotal}%0A` +
      `*Guest Name:* ${fullName}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Special Notes:* ${specialRequests || 'None'}`;
    return `https://wa.me/${HOTEL_INFO.whatsappNumber.replace('+', '')}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* High-End Official Booking Voucher (Irresistible to Manager & Guests) */
          <div className="p-6 sm:p-8">
            
            {/* Branded Card */}
            <div className="bg-stone-950 border border-amber-500/40 rounded-3xl p-6 relative overflow-hidden shadow-2xl mb-6">
              
              {/* Card Gold Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-serif text-lg font-bold text-white block">KINGS HOTEL KABALE</span>
                    <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">Official Reservation Pass</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block uppercase">Reference Number</span>
                  <span className="font-mono text-lg font-bold text-amber-400">{bookingRef}</span>
                </div>
              </div>

              {/* Guest & Stay Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-stone-800 text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase">Guest Name</span>
                  <span className="font-bold text-white">{fullName || 'Valued Guest'}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase">Check-In</span>
                  <span className="font-bold text-white">{checkIn} (12:00 PM)</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase">Check-Out</span>
                  <span className="font-bold text-white">{checkOut} (10:00 AM)</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase">Total Amount</span>
                  <span className="font-bold text-amber-400 font-mono text-sm">{formattedTotal}</span>
                </div>
              </div>

              {/* Accommodation & Inclusions */}
              <div className="py-3 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Item:</span>
                  <span className="text-white font-semibold">{activePackage ? activePackage.title : currentRoom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Stay Duration:</span>
                  <span className="text-stone-300">{calculatedNights} Night{calculatedNights > 1 ? 's' : ''} • {guests} Guest{guests > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Includes:</span>
                  <span className="text-emerald-400 font-medium">Daily Full English Breakfast & Solar Hot Rain Showers</span>
                </div>
                {(addOnBunyonyi || addOnGorillaLunch) && (
                  <div className="flex justify-between text-amber-300">
                    <span>Add-ons:</span>
                    <span>{addOnBunyonyi ? 'Lake Bunyonyi Cruise ' : ''}{addOnGorillaLunch ? 'Gorilla Safari Lunch' : ''}</span>
                  </div>
                )}
              </div>

              {/* Payment Methods Pill */}
              <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between text-[11px] text-stone-400 gap-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Guaranteed Direct Rate • Zero Pre-Payment Required</span>
                </span>
                <span className="font-mono text-stone-300">
                  Pay at Check-In: MTN MoMo • Airtel Money • Cash
                </span>
              </div>

            </div>

            {/* Direct Instant Action Buttons */}
            <div className="space-y-3">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Booking Pass to Front Desk on WhatsApp</span>
              </a>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${HOTEL_INFO.phonePrimary}`}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Front Desk (+256 772 477435)</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => { setIsSubmitted(false); onClose(); }}
                className="text-xs text-stone-500 hover:text-stone-300 underline"
              >
                Return to Website
              </button>
            </div>

          </div>
        ) : (
          /* Main Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            
            <div className="border-b border-stone-800 pb-4 mb-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Crown className="w-4 h-4" />
                <span>Direct Reservation Engine</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Book Your Stay at Kings Hotel Kabale
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                Best Rate Guaranteed • No Booking Fees • Free Cancellation • Complimentary Breakfast
              </p>
            </div>

            {/* Package vs Room Selector */}
            {activePackage ? (
              <div className="mb-4 bg-stone-950 border border-amber-500/40 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">Selected Package:</span>
                  <h4 className="font-serif text-sm font-bold text-white">{activePackage.title}</h4>
                  <span className="text-xs text-stone-400">{activePackage.duration}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePackage(null)}
                  className="text-xs text-amber-400 hover:text-white underline"
                >
                  Switch to Standard Room
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <label htmlFor="booking-select-room" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  Select Room Type
                </label>
                <select
                  id="booking-select-room"
                  value={currentRoom.id}
                  onChange={(e) => {
                    const r = ROOMS_DATA.find((item) => item.id === e.target.value);
                    if (r) setCurrentRoom(r);
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                >
                  {ROOMS_DATA.map((r) => (
                    <option key={r.id} value={r.id} className="bg-stone-900 text-white">
                      {r.name} ({currency === 'USD' ? `$${r.priceUSD}` : `${r.priceUGX.toLocaleString()} UGX`} / night)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Dates & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-2.5">
                <label htmlFor="booking-checkin" className="block text-[11px] font-semibold text-stone-400 uppercase mb-1">
                  Check-In Date
                </label>
                <input
                  id="booking-checkin"
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                  required
                />
              </div>

              <div className="bg-stone-950 border border-stone-800 rounded-xl p-2.5">
                <label htmlFor="booking-checkout" className="block text-[11px] font-semibold text-stone-400 uppercase mb-1">
                  Check-Out Date
                </label>
                <input
                  id="booking-checkout"
                  type="date"
                  value={checkOut}
                  min={checkIn || today}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                  required
                />
              </div>

              <div className="bg-stone-950 border border-stone-800 rounded-xl p-2.5">
                <label htmlFor="booking-guests" className="block text-[11px] font-semibold text-stone-400 uppercase mb-1">
                  Number of Guests
                </label>
                <select
                  id="booking-guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value={1} className="bg-stone-900 text-white">1 Adult</option>
                  <option value={2} className="bg-stone-900 text-white">2 Adults</option>
                  <option value={3} className="bg-stone-900 text-white">3 Guests</option>
                  <option value={4} className="bg-stone-900 text-white">4+ Family / Group</option>
                </select>
              </div>
            </div>

            {/* Popular Safari & Stay Add-ons (High Value for Hotel) */}
            <div className="mb-4 bg-stone-950/60 border border-stone-800 p-3 rounded-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Optional Kigezi Experience Add-ons:
              </span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 text-stone-300 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={addOnBunyonyi}
                    onChange={(e) => setAddOnBunyonyi(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4 bg-stone-900 border-stone-700"
                  />
                  <span>Add Lake Bunyonyi Motorized Island Boat Cruise (+{currency === 'USD' ? '$20' : '75,000 UGX'})</span>
                </label>

                <label className="flex items-center gap-2 text-stone-300 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={addOnGorillaLunch}
                    onChange={(e) => setAddOnGorillaLunch(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4 bg-stone-900 border-stone-700"
                  />
                  <span>Add Chef-Packed Safari Lunch for Bwindi Gorilla Trekking (+{currency === 'USD' ? '$10' : '35,000 UGX'})</span>
                </label>
              </div>
            </div>

            {/* Guest Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-2.5">
                <label htmlFor="booking-fullname" className="block text-[11px] font-semibold text-stone-400 uppercase mb-1">
                  Full Name
                </label>
                <input
                  id="booking-fullname"
                  type="text"
                  placeholder="e.g. David Mugisha"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none"
                  required
                />
              </div>

              <div className="bg-stone-950 border border-stone-800 rounded-xl p-2.5">
                <label htmlFor="booking-phone" className="block text-[11px] font-semibold text-stone-400 uppercase mb-1">
                  WhatsApp / Mobile Number
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  placeholder="e.g. +256 772 000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none font-mono"
                  required
                />
              </div>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-2.5 mb-4">
              <label htmlFor="booking-email" className="block text-[11px] font-semibold text-stone-400 uppercase mb-1">
                Email Address
              </label>
              <input
                id="booking-email"
                type="email"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none"
                required
              />
            </div>

            {/* Special Requests */}
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-2.5 mb-5">
              <label htmlFor="booking-special-requests" className="block text-[11px] font-semibold text-stone-400 uppercase mb-1">
                Special Requests or Dietary Requirements
              </label>
              <textarea
                id="booking-special-requests"
                rows={2}
                placeholder="Vegetarian meals, pickup from Kabale bus terminal, early 5 AM breakfast for gorillas, late check-in..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-transparent text-xs text-white focus:outline-none resize-none"
              />
            </div>

            {/* Price Summary */}
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block">
                  {calculatedNights} Night{calculatedNights > 1 ? 's' : ''} • Includes Breakfast Buffet
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Pay on Arrival via MTN MoMo / Airtel / Cash
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Estimated Total</span>
                <span className="text-2xl font-bold font-serif text-amber-400">
                  {formattedTotal}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs text-stone-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <span>Generate Official Reservation Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
