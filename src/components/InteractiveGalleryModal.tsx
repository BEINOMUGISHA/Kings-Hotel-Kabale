import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles, Calendar, Camera } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/hotelData';
import { GalleryItem } from '../types';

interface InteractiveGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  initialPhotoIndex?: number;
}

export const InteractiveGalleryModal: React.FC<InteractiveGalleryModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  initialPhotoIndex = 0,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(initialPhotoIndex);

  React.useEffect(() => {
    if (isOpen) {
      setActivePhotoIndex(initialPhotoIndex);
      setSelectedCategory('All');
    }
  }, [isOpen, initialPhotoIndex]);

  if (!isOpen) return null;

  const categories = [
    { key: 'All', label: 'All Photos' },
    { key: 'Dietary', label: 'Dietary & Dining' },
    { key: 'Bedroom', label: 'Bedroom & Suites' },
    { key: 'Hospitality', label: 'Hospitality & Facilities' },
  ];

  const filteredPhotos = selectedCategory === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const currentPhoto: GalleryItem = filteredPhotos[activePhotoIndex] || filteredPhotos[0];

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-950 border border-stone-800 rounded-3xl w-full max-w-5xl max-h-[96vh] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Header Bar */}
        <div className="p-4 sm:px-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Camera className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif text-lg font-bold">Kings Hotel Kabale Real Visual Gallery</h3>
              <p className="text-[11px] text-stone-400">Dietary, Bedroom & Hospitality · Verified Google Maps Images Only</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="px-4 sm:px-6 py-2.5 bg-stone-900/60 border-b border-stone-800/80 flex items-center gap-1.5 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.key);
                setActivePhotoIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat.key
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${selectedCategory === cat.key ? 'bg-stone-950 text-amber-400 font-bold' : 'bg-stone-800 text-stone-400'}`}>
                {cat.key === 'All' ? GALLERY_PHOTOS.length : GALLERY_PHOTOS.filter(p => p.category === cat.key).length}
              </span>
            </button>
          ))}
        </div>

        {/* Main Stage: Large Photo with Nav Arrows */}
        <div className="relative flex-1 bg-black min-h-[320px] sm:min-h-[460px] flex items-center justify-center overflow-hidden group">
          {currentPhoto && (
            <img
              src={currentPhoto.imageUrl}
              alt={currentPhoto.title}
              referrerPolicy="no-referrer"
              className="max-h-[50vh] sm:max-h-[60vh] w-full object-contain transition-all duration-300"
            />
          )}

          {/* Nav Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-xl"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-xl"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo Counter */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-mono text-stone-300 border border-white/10">
            {activePhotoIndex + 1} / {filteredPhotos.length}
          </div>
        </div>

        {/* Footer Photo Details & Quick Reserve */}
        <div className="p-4 sm:px-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {currentPhoto?.category}
              </span>
              {currentPhoto?.tag && (
                <span className="text-[10px] font-semibold text-stone-300">
                  • {currentPhoto.tag}
                </span>
              )}
              <span className="text-[10px] text-emerald-400 font-medium">
                • {currentPhoto?.verifiedBadge || 'Google Maps Verified Photo'}
              </span>
            </div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-white">
              {currentPhoto?.title}
            </h4>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              {currentPhoto?.description}
            </p>
            {currentPhoto?.highlights && currentPhoto.highlights.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                {currentPhoto.highlights.map((hl, i) => (
                  <span key={i} className="text-[11px] text-stone-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    {hl}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Stay at Kings Hotel</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="p-2 sm:px-6 bg-stone-950 border-t border-stone-800/80 flex items-center gap-2 overflow-x-auto">
          {filteredPhotos.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePhotoIndex(idx)}
              className={`relative h-14 w-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                activePhotoIndex === idx
                  ? 'border-amber-400 scale-105 shadow-md'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default InteractiveGalleryModal;
