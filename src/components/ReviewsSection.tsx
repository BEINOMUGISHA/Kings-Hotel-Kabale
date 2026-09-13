import React, { useState } from 'react';
import { Star, ThumbsUp, MapPin, ExternalLink, Award, CheckCircle, MessageSquare, PlusCircle, Check } from 'lucide-react';
import { GOOGLE_REVIEWS_DATA, TRIPADVISOR_REVIEWS_DATA, HOTEL_INFO } from '../data/hotelData';
import { TripAdvisorReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [platform, setPlatform] = useState<'tripadvisor' | 'google' | 'all'>('tripadvisor');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [votedIds, setVotedIds] = useState<Record<string, boolean>>({});
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewSubmitted, setNewReviewSubmitted] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [userTitle, setUserTitle] = useState('');
  const [userText, setUserText] = useState('');
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userTripType, setUserTripType] = useState<TripAdvisorReview['tripType']>('Couples');

  const tripAdvisorFilters = ['All', 'Couples', 'Friends', 'Business', 'Solo', 'Family'];
  const googleFilters = ['All', 'Safari tourist', 'Business', 'Solo traveler'];

  const handleHelpfulClick = (id: string, initialCount: number) => {
    if (votedIds[id]) return;
    setVotedIds((prev) => ({ ...prev, [id]: true }));
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userText) return;
    setNewReviewSubmitted(true);
    setTimeout(() => {
      setIsWriteReviewOpen(false);
      setNewReviewSubmitted(false);
      setUserTitle('');
      setUserText('');
      setUserName('');
      setUserCity('');
    }, 2200);
  };

  // TripAdvisor Green Bubble Component
  const TripAdvisorBubbles: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ rating, size = 'md' }) => {
    const bubbleSizes = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };
    return (
      <div className="flex items-center gap-1" title={`${rating} of 5 bubbles`}>
        {[1, 2, 3, 4, 5].map((bubble) => {
          const isFull = bubble <= rating;
          const isHalf = !isFull && bubble - 0.5 <= rating;
          return (
            <div
              key={bubble}
              className={`${bubbleSizes[size]} rounded-full border border-[#00AA6C] flex items-center justify-center ${
                isFull ? 'bg-[#00AA6C]' : isHalf ? 'bg-gradient-to-r from-[#00AA6C] 50% to-transparent 50%' : 'bg-transparent'
              }`}
            >
              {isFull && <div className="w-1 h-1 bg-white rounded-full" />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-20 bg-stone-100 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Platform Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00AA6C] animate-pulse" />
              Verified Guest Hospitality Reviews
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
              Traveler Reviews & Ratings
            </h2>
            <p className="text-stone-600 mt-2 text-base sm:text-lg max-w-2xl">
              Authentic feedback from international safari explorers, regional business travelers, and families who stayed at Kings Hotel Kabale.
            </p>
          </div>

          {/* Platform Switcher Buttons */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-stone-300 shadow-sm self-start lg:self-auto">
            <button
              type="button"
              onClick={() => {
                setPlatform('tripadvisor');
                setActiveFilter('All');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                platform === 'tripadvisor'
                  ? 'bg-[#00AA6C] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#00AA6C]" />
              </div>
              <span>TripAdvisor ({HOTEL_INFO.tripadvisorRating} ★ · 88)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPlatform('google');
                setActiveFilter('All');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                platform === 'google'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Google Maps ({HOTEL_INFO.googleMapsRating} ★ · 154)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPlatform('all');
                setActiveFilter('All');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                platform === 'all'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              All (242+)
            </button>
          </div>
        </div>

        {/* ================= TRIPADVISOR SECTION ================= */}
        {(platform === 'tripadvisor' || platform === 'all') && (
          <div className="mb-14">
            
            {/* TripAdvisor Travelers' Choice Banner Card */}
            <div className="bg-gradient-to-br from-[#004f32] to-[#002f1e] text-white rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-[#00AA6C]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left: Award & Score */}
                <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-emerald-800/80 pb-6 lg:pb-0 lg:pr-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-[#00AA6C]/20 border border-[#00AA6C]/40 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 mb-3">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Travelers' Choice Recommended</span>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-3 my-1">
                    <span className="text-5xl sm:text-6xl font-serif font-bold text-white tracking-tight">
                      {HOTEL_INFO.tripadvisorRating}
                    </span>
                    <div>
                      <TripAdvisorBubbles rating={HOTEL_INFO.tripadvisorRating} size="lg" />
                      <span className="text-xs text-emerald-200 mt-1 block font-medium">
                        Excellent · {HOTEL_INFO.tripadvisorReviewCount} reviews
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-100 font-medium mt-3">
                    {HOTEL_INFO.tripadvisorRank}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                    <a
                      href={HOTEL_INFO.tripadvisorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#00AA6C] hover:bg-[#00925c] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm"
                    >
                      <span>View on TripAdvisor</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsWriteReviewOpen(true)}
                      className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-white/20 transition-all"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Write a Review</span>
                    </button>
                  </div>
                </div>

                {/* Right: Detailed Metric Sub-Ratings & Traveler Breakdown */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  
                  {/* Sub-Ratings */}
                  <div className="space-y-2.5">
                    <h4 className="font-semibold text-emerald-200 uppercase tracking-wider text-[11px] mb-3">
                      TripAdvisor Sub-Ratings
                    </h4>
                    <div>
                      <div className="flex justify-between text-emerald-100 font-medium mb-1">
                        <span>Service & Hospitality</span>
                        <span className="font-mono text-amber-300 font-bold">4.7 / 5.0</span>
                      </div>
                      <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00AA6C] rounded-full" style={{ width: '94%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-emerald-100 font-medium mb-1">
                        <span>Value for Money</span>
                        <span className="font-mono text-amber-300 font-bold">4.6 / 5.0</span>
                      </div>
                      <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00AA6C] rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-emerald-100 font-medium mb-1">
                        <span>Location & Mountain Setting</span>
                        <span className="font-mono text-amber-300 font-bold">4.5 / 5.0</span>
                      </div>
                      <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00AA6C] rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-emerald-100 font-medium mb-1">
                        <span>Cleanliness & Fresh Linens</span>
                        <span className="font-mono text-amber-300 font-bold">4.4 / 5.0</span>
                      </div>
                      <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00AA6C] rounded-full" style={{ width: '88%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-emerald-100 font-medium mb-1">
                        <span>Sleep Quality & Quiet Kigongi Nights</span>
                        <span className="font-mono text-amber-300 font-bold">4.3 / 5.0</span>
                      </div>
                      <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00AA6C] rounded-full" style={{ width: '86%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Rating Distribution Bar */}
                  <div className="space-y-2 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40">
                    <h4 className="font-semibold text-emerald-200 uppercase tracking-wider text-[11px] mb-2">
                      TripAdvisor Traveler Ratings
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-emerald-300 font-medium">Excellent</span>
                      <div className="flex-1 h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00AA6C] rounded-full" style={{ width: '66%' }} />
                      </div>
                      <span className="w-8 text-right font-mono text-emerald-300">58</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-16 text-emerald-300 font-medium">Very Good</span>
                      <div className="flex-1 h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00AA6C] rounded-full" style={{ width: '25%' }} />
                      </div>
                      <span className="w-8 text-right font-mono text-emerald-300">22</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-16 text-emerald-300 font-medium">Average</span>
                      <div className="flex-1 h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '7%' }} />
                      </div>
                      <span className="w-8 text-right font-mono text-emerald-300">6</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-16 text-emerald-300 font-medium">Poor</span>
                      <div className="flex-1 h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-stone-500 rounded-full" style={{ width: '2%' }} />
                      </div>
                      <span className="w-8 text-right font-mono text-emerald-300">2</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-16 text-emerald-300 font-medium">Terrible</span>
                      <div className="flex-1 h-2 bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full" style={{ width: '0%' }} />
                      </div>
                      <span className="w-8 text-right font-mono text-emerald-300">0</span>
                    </div>

                    <p className="text-[11px] text-emerald-300/80 pt-1">
                      91% of guests recommend staying at Kings Hotel Kabale.
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* Filter Pills for TripAdvisor */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 text-xs">
              <span className="text-stone-500 font-medium">TripAdvisor Traveler Type:</span>
              {tripAdvisorFilters.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setActiveFilter(opt)}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    activeFilter === opt
                      ? 'bg-[#00AA6C] text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {opt === 'All' ? 'All TripAdvisor Reviews' : opt}
                </button>
              ))}
            </div>

            {/* TripAdvisor Reviews Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TRIPADVISOR_REVIEWS_DATA.filter(
                (r) => activeFilter === 'All' || r.tripType === activeFilter
              ).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Reviewer Info & Bubble Score */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-emerald-900 text-sm">
                          {rev.author.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-stone-900 text-sm">{rev.author}</h4>
                            <span className="w-3.5 h-3.5 rounded-full bg-[#00AA6C] text-white flex items-center justify-center text-[9px]" title="TripAdvisor Contributor">✓</span>
                          </div>
                          <p className="text-[11px] text-stone-500 flex items-center gap-1">
                            {rev.authorLocation && (
                              <>
                                <MapPin className="w-3 h-3 text-stone-400" />
                                <span>{rev.authorLocation} •</span>
                              </>
                            )}
                            <span>{rev.contributionsCount} contributions</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <TripAdvisorBubbles rating={rev.bubbleRating} size="md" />
                        <span className="text-[11px] text-stone-400 mt-1 block">{rev.dateOfStay}</span>
                      </div>
                    </div>

                    {/* Review Title */}
                    <h5 className="font-bold text-stone-900 text-base mb-2 leading-snug">
                      "{rev.title}"
                    </h5>

                    {/* Review Content */}
                    <p className="text-stone-700 text-sm leading-relaxed mb-4">
                      {rev.text}
                    </p>

                    {/* Official Management Response (If available) */}
                    {rev.managementResponse && (
                      <div className="mt-4 mb-2 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 text-xs text-stone-800">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                            <CheckCircle className="w-3.5 h-3.5 text-[#00AA6C]" />
                            <span>{rev.managementResponse.responderName}</span>
                            <span className="text-[10px] text-emerald-700 bg-emerald-200/60 px-1.5 py-0.5 rounded font-normal">
                              {rev.managementResponse.responderTitle}
                            </span>
                          </div>
                          <span className="text-[10px] text-stone-400">{rev.managementResponse.date}</span>
                        </div>
                        <p className="text-stone-600 leading-relaxed italic">
                          "{rev.managementResponse.text}"
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Card Footer: Trip Type & Helpful Votes */}
                  <div className="pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 mt-2">
                    <span className="bg-emerald-100/70 text-emerald-900 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-emerald-200/50">
                      Traveled as {rev.tripType}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleHelpfulClick(rev.id, rev.helpfulVotes)}
                      disabled={votedIds[rev.id]}
                      className={`inline-flex items-center gap-1.5 text-xs transition-colors px-2 py-1 rounded-lg ${
                        votedIds[rev.id]
                          ? 'text-[#00AA6C] font-semibold bg-emerald-50'
                          : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{helpfulVotes[rev.id] ?? rev.helpfulVotes} found helpful</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= GOOGLE MAPS SECTION ================= */}
        {(platform === 'google' || platform === 'all') && (
          <div className="mt-8">
            
            {platform === 'all' && (
              <div className="flex items-center justify-between border-t border-stone-300 pt-10 mb-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    Google Maps Reviews & Ratings
                  </h3>
                  <p className="text-stone-600 text-sm">
                    Verified ratings from local guides and international tourists on Google Maps
                  </p>
                </div>
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {platform === 'google' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Big Score (4 cols) */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 text-center border-b lg:border-b-0 lg:border-r border-stone-100">
                  <span className="text-6xl sm:text-7xl font-bold font-serif text-stone-900">
                    {HOTEL_INFO.googleMapsRating}
                  </span>
                  <div className="flex items-center gap-1.5 text-amber-500 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/40 text-amber-400/40'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-stone-500">
                    Based on {HOTEL_INFO.googleMapsReviewCount} Google Maps verified reviews
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    <CheckCircle className="w-3 h-3" /> Very Good Hospitality Rating
                  </span>
                </div>

                {/* Rating Dimension Bars (8 cols) */}
                <div className="lg:col-span-8 space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-stone-700 font-semibold mb-1">
                      <span>Location & Accessibility (Quiet Kigongi setting, close to road & Lake Bunyonyi)</span>
                      <span className="font-mono text-stone-900">4.5 / 5.0</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-700 font-semibold mb-1">
                      <span>Staff Friendliness & Customer Service</span>
                      <span className="font-mono text-stone-900">4.6 / 5.0</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-700 font-semibold mb-1">
                      <span>Food & Dining (Lake Bunyonyi Crayfish & Kigezi local dishes)</span>
                      <span className="font-mono text-stone-900">4.3 / 5.0</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '86%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-700 font-semibold mb-1">
                      <span>Value for Money & Secure Compound Parking</span>
                      <span className="font-mono text-stone-900">4.4 / 5.0</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Filter Pills for Google */}
            {platform === 'google' && (
              <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 text-xs">
                <span className="text-stone-500 font-medium">Google Filter:</span>
                {googleFilters.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setActiveFilter(opt)}
                    className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                      activeFilter === opt
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {opt === 'All' ? 'All Google Reviews' : opt}
                  </button>
                ))}
              </div>
            )}

            {/* Google Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GOOGLE_REVIEWS_DATA.filter(
                (r) => activeFilter === 'All' || platform === 'all' || r.userType === activeFilter
              ).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-bold text-amber-900 text-sm">
                          {rev.author.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm">{rev.author}</h4>
                          {rev.authorLocation && (
                            <p className="text-[11px] text-stone-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{rev.authorLocation}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] text-stone-400 mt-0.5 block">{rev.relativeTime}</span>
                      </div>
                    </div>

                    <p className="text-stone-700 text-sm leading-relaxed mb-4 italic">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md text-[11px] font-medium">
                      {rev.userType}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleHelpfulClick(rev.id, rev.likesCount)}
                      disabled={votedIds[rev.id]}
                      className={`inline-flex items-center gap-1.5 transition-colors text-xs ${
                        votedIds[rev.id] ? 'text-blue-600 font-semibold' : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{helpfulVotes[rev.id] ?? rev.likesCount} found helpful</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* ================= WRITE A REVIEW MODAL ================= */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#00AA6C] text-white flex items-center justify-center text-xs font-bold">
                  🦉
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Write a Review on Kings Hotel
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWriteReviewOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {newReviewSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-[#00AA6C] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  Thank You for Your Review!
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm">
                  Your feedback helps travelers discover Kings Hotel Kabale. Your review has been recorded.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                
                {/* Rating selection */}
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Your Overall Rating:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <div
                          className={`w-6 h-6 rounded-full border border-[#00AA6C] flex items-center justify-center ${
                            star <= userRating ? 'bg-[#00AA6C]' : 'bg-transparent'
                          }`}
                        >
                          {star <= userRating && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                    <span className="text-stone-500 font-medium ml-2">
                      {userRating === 5 ? 'Excellent' : userRating === 4 ? 'Very Good' : userRating === 3 ? 'Average' : 'Below Average'}
                    </span>
                  </div>
                </div>

                {/* Name and City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-[#00AA6C]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Your City / Country</label>
                    <input
                      type="text"
                      placeholder="e.g. London, UK"
                      value={userCity}
                      onChange={(e) => setUserCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-[#00AA6C]"
                    />
                  </div>
                </div>

                {/* Trip Type */}
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Trip Type</label>
                  <select
                    value={userTripType}
                    onChange={(e) => setUserTripType(e.target.value as TripAdvisorReview['tripType'])}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-[#00AA6C] bg-white"
                  >
                    <option value="Couples">Traveled as Couples</option>
                    <option value="Friends">Traveled with Friends</option>
                    <option value="Solo">Solo Traveler</option>
                    <option value="Business">Business Trip</option>
                    <option value="Family">Traveled with Family</option>
                  </select>
                </div>

                {/* Review Title */}
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fantastic stay and amazing Lake Bunyonyi advice!"
                    value={userTitle}
                    onChange={(e) => setUserTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-[#00AA6C]"
                  />
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Your Review *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell other travelers about your stay, rooms, food, hot water, and front desk hospitality..."
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-[#00AA6C]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteReviewOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#00AA6C] hover:bg-[#00925c] text-white font-bold shadow-md transition-all"
                  >
                    Submit Review
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
