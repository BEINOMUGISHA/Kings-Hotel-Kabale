import React, { useState } from 'react';
import { Camera, ExternalLink, Maximize2, MapPin, Star, Sparkles, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_PHOTOS, HOTEL_INFO } from '../data/hotelData';

interface GoogleMapsGallerySectionProps {
  onOpenPhotoLightbox: (index: number) => void;
  onOpenBooking: () => void;
}

export const GoogleMapsGallerySection: React.FC<GoogleMapsGallerySectionProps> = ({
  onOpenPhotoLightbox,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { name: 'All', label: 'All Real Hotel Photos', count: GALLERY_PHOTOS.length },
    { name: 'Dietary', label: 'Dietary & Dining', count: GALLERY_PHOTOS.filter((p) => p.category === 'Dietary').length },
    { name: 'Bedroom', label: 'Bedroom & Suites', count: GALLERY_PHOTOS.filter((p) => p.category === 'Bedroom').length },
    { name: 'Hospitality', label: 'Hospitality & Facilities', count: GALLERY_PHOTOS.filter((p) => p.category === 'Hospitality').length },
  ].filter(cat => cat.count > 0 || cat.name === 'All');

  const displayedPhotos = activeCategory === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Kings Hotel Images Only · Verified Google Maps Collection</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Dietary, Bedroom & Hospitality Gallery
            </h2>

            <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
              Explore authentic, unedited photography of Kings Hotel Kabale Limited in Kigongi. Inspect our freshly prepared dining and dietary chalkboard menu, comfortable en-suite bedrooms, instant hot shower water heater systems, and secure compound.
            </p>
          </div>

          {/* Google Maps Reputation Badge & Fullscreen Trigger */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={HOTEL_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-800 border border-stone-700 text-xs font-medium text-stone-200 hover:text-white transition-all shadow-sm"
              title="View original Google Maps listing"
            >
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="ml-1 font-bold text-white">4.2</span>
              </div>
              <span className="text-stone-400">({HOTEL_INFO.googleMapsReviewCount} reviews)</span>
              <span className="text-stone-500">•</span>
              <span className="font-semibold text-amber-400 flex items-center gap-1">
                Google Maps <ExternalLink className="w-3 h-3" />
              </span>
            </a>

            <button
              type="button"
              onClick={() => onOpenPhotoLightbox(0)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Open Lightbox</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(cat.name)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeCategory === cat.name
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'bg-stone-800/70 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700/60'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  activeCategory === cat.name
                    ? 'bg-stone-950 text-amber-400'
                    : 'bg-stone-700 text-stone-300'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Image Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPhotos.map((photo, index) => {
            // Find global index in GALLERY_PHOTOS
            const globalIndex = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);

            return (
              <div
                key={photo.id}
                onClick={() => onOpenPhotoLightbox(globalIndex >= 0 ? globalIndex : index)}
                className="group relative bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className="px-2.5 py-1 rounded-md bg-stone-900/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-stone-700/60 shadow">
                      {photo.category}
                    </span>
                    {photo.tag && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/90 text-stone-950 text-[10px] font-semibold tracking-tight shadow">
                        {photo.tag}
                      </span>
                    )}
                  </div>

                  {/* Hover Quick View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-stone-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xl border border-amber-500/40 transform scale-95 group-hover:scale-100 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Enlarge Photo</span>
                    </div>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-stone-950">
                  <div>
                    <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1.5 line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>

                    {/* Highlights bullet points */}
                    {photo.highlights && photo.highlights.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-stone-800/60 space-y-1">
                        {photo.highlights.slice(0, 2).map((hl, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{photo.verifiedBadge || "Verified Google Maps Photo"}</span>
                    </span>
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                      View <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Direct Reservation Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Direct Hotel Reservations
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Experience Kings Hotel Kabale Firsthand
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              Enjoy guaranteed best rates, complimentary English breakfast buffet, and personal assistance for Lake Bunyonyi and Bwindi gorilla tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95"
            >
              Book Your Stay
            </button>
            <a
              href={`https://wa.me/${HOTEL_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Kings%20Hotel!%20I%20am%20viewing%20your%20Google%20Maps%20photo%20gallery%20and%20would%20like%20to%20inquire%20about%20booking.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>WhatsApp Inquiries</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
