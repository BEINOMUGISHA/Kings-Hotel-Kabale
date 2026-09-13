import React, { useState } from 'react';
import { Utensils, Coffee, Wine, Sparkles, Clock, Compass, Eye, CheckCircle2, Flame, MapPin, Star, ExternalLink } from 'lucide-react';
import { MENU_ITEMS, HOTEL_IMAGES, HOTEL_INFO, GALLERY_PHOTOS } from '../data/hotelData';
import { MenuItem } from '../types';

interface DiningSectionProps {
  currency: 'USD' | 'UGX';
  onOpenPhotoLightbox?: (index: number) => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ currency, onOpenPhotoLightbox }) => {
  const [activeMenuTab, setActiveMenuTab] = useState<'all' | 'local_kigezi' | 'continental' | 'breakfast' | 'beverages'>('all');
  const [activeDishModal, setActiveDishModal] = useState<MenuItem | null>(null);

  const filteredMenu = activeMenuTab === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeMenuTab);

  const formatPrice = (item: MenuItem) => {
    if (currency === 'USD') {
      return `$${item.priceUSD}`;
    }
    return `${item.priceUGX.toLocaleString()} UGX`;
  };

  // Find gallery index for a given image to trigger full lightbox
  const handlePhotoClick = (imageUrl?: string) => {
    if (!imageUrl || !onOpenPhotoLightbox) return;
    const galleryIndex = GALLERY_PHOTOS.findIndex((p) => p.imageUrl === imageUrl);
    if (galleryIndex !== -1) {
      onOpenPhotoLightbox(galleryIndex);
    } else {
      // Default to dietary category first photo
      const dietaryIndex = GALLERY_PHOTOS.findIndex((p) => p.category === 'Dietary');
      onOpenPhotoLightbox(dietaryIndex !== -1 ? dietaryIndex : 0);
    }
  };

  // Signature food highlights for the visual grid
  const signatureDishes = [
    {
      name: "Lake Bunyonyi Fresh Crayfish Platter",
      category: "Lake Bunyonyi Specialty",
      priceUSD: 11,
      priceUGX: 42000,
      image: HOTEL_IMAGES.crayfishPlatter,
      tag: "Chef's Signature",
      badge: "Caught Fresh in Lake Bunyonyi",
      description: "Tender freshwater crayfish sauteed in aromatic garlic butter and garden herbs, served with golden hand-cut fries and lemon wedges.",
      highlights: ["Garlic herb butter glaze", "Hand-cut crispy fries", "Locally harvested daily"]
    },
    {
      name: "Whole Pan-Fried Nile Tilapia",
      category: "Kigezi Catch of the Day",
      priceUSD: 10,
      priceUGX: 38000,
      image: HOTEL_IMAGES.friedTilapia,
      tag: "Most Popular",
      badge: "Pan-Fried to Order",
      description: "Crispy skin whole Nile tilapia seasoned in mountain spices, served with fresh Ugandan kachumbari tomato salsa and steamed matooke.",
      highlights: ["Whole fish cooked fresh", "Zesty kachumbari salsa", "Choice of matooke or fries"]
    },
    {
      name: "Bakiga Heritage Meal (Eshabwe & Kalo)",
      category: "Traditional Kigezi Delicacy",
      priceUSD: 9,
      priceUGX: 34000,
      image: HOTEL_IMAGES.eshabweKalo,
      tag: "Cultural Classic",
      badge: "Authentic Bakiga Recipe",
      description: "Ceremonial clarified butter ghee sauce (Eshabwe) served with steaming hot dark Kalo millet bread and tender braised beef stew.",
      highlights: ["Authentic Eshabwe ghee sauce", "Organic hot Kalo millet bread", "Slow-cooked tender beef"]
    },
    {
      name: "Kings Sizzling Goat Nyama Choma",
      category: "Terrace Bar Charcoal Grill",
      priceUSD: 10,
      priceUGX: 38000,
      image: HOTEL_IMAGES.goatNyamaChoma,
      tag: "Evening Favorite",
      badge: "Slow-Chargrilled Over Coals",
      description: "Succulent marinated goat meat chargrilled over hot coals, accompanied by roasted sweet plantains (gonja) and spicy chili dipping sauce.",
      highlights: ["Smoky charcoal flame grill", "Roasted sweet gonja plantain", "Fresh chili pepper dip"]
    },
    {
      name: "Full Kings Royal Breakfast",
      category: "Complimentary Room Breakfast",
      priceUSD: 7,
      priceUGX: 26000,
      image: HOTEL_IMAGES.royalBreakfast,
      tag: "Included with Stay",
      badge: "Served Daily from 6:30 AM",
      description: "Eggs cooked to order, grilled beef sausages, buttered toast, sauteed mushrooms, fresh pineapple & papaya slices, and hot spiced African tea.",
      highlights: ["Farm-fresh eggs to order", "Tropical fruit slices", "Fresh highland tea & coffee"]
    },
    {
      name: "Kings Authentic Chalkboard Menu",
      category: "Verified Google Maps Property Photo",
      priceUSD: 0,
      priceUGX: 0,
      image: HOTEL_IMAGES.restaurantMenu,
      tag: "Google Maps Verified",
      badge: "Real Restaurant Chalkboard",
      description: "The official dining and dietary chalkboard menu inside Kings Hotel Kabale restaurant, showing transparent local pricing and daily specials.",
      highlights: ["Katogo & English breakfasts", "Whole tilapia & local stew", "Transparent UGX pricing"]
    }
  ];

  return (
    <section id="dining" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Utensils className="w-3.5 h-3.5" />
            Culinary Excellence & Real Dining
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Kings Royal Restaurant & Terrace Bar
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Taste the authentic flavors of Southwestern Uganda. Inspect genuine photos of foods served daily at Kings Hotel Kabale—from fresh Lake Bunyonyi crayfish and whole pan-fried tilapia to savory goat nyama choma and traditional Bakiga heritage meals.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Verified Google Maps Dietary Photos
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Breakfast: 6:30 AM – 10:30 AM
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              All-Day Kitchen & 24/7 Room Service
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FEATURED SERVED DISHES SPOTLIGHT (Visual Food Grid from Google Maps Page) */}
        {/* ========================================================================= */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Mouthwatering Highlights</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Foods Served at Kings Hotel Kabale
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                As photographed and featured on our Google Maps profile and served fresh in our dining hall.
              </p>
            </div>

            <a
              href={HOTEL_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-xs text-amber-400 hover:text-amber-300 border border-stone-700 transition-colors w-fit"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>View Google Maps Menu & Photos</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureDishes.map((dish, idx) => (
              <div
                key={idx}
                className="group bg-stone-950/90 rounded-2xl border border-stone-800 hover:border-amber-500/50 overflow-hidden transition-all duration-300 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-amber-500/5"
              >
                {/* Food Image Container */}
                <div 
                  className="relative h-56 overflow-hidden cursor-pointer bg-stone-900"
                  onClick={() => handlePhotoClick(dish.image)}
                  title="Click to view full photo"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-stone-700 shadow-md">
                      {dish.tag}
                    </span>
                    {dish.priceUSD > 0 && (
                      <span className="px-3 py-1 rounded-lg bg-amber-500 text-stone-950 text-xs font-bold font-mono shadow-md">
                        {currency === 'USD' ? `$${dish.priceUSD}` : `${dish.priceUGX.toLocaleString()} UGX`}
                      </span>
                    )}
                  </div>

                  {/* Quick Enlarge Prompt on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/30">
                    <span className="px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/50 text-amber-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Enlarge Photo</span>
                    </span>
                  </div>

                  {/* Subtitle tag at image bottom */}
                  <div className="absolute bottom-2 left-3 right-3">
                    <span className="text-[10px] font-medium tracking-wide text-stone-300 bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800/80 inline-block">
                      {dish.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {dish.name}
                    </h4>
                    <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="mt-4 pt-3 border-t border-stone-800/80 space-y-1.5">
                      {dish.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-stone-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400 font-medium">
                      Freshly Prepared to Order
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePhotoClick(dish.image)}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>HD View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESTAURANT AMBIENCE & CHALKBOARD SHOWCASE (2 Columns) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Authentic Dining Chalkboard Menu */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-800 group shadow-2xl bg-stone-950">
            <div 
              className="h-72 sm:h-80 overflow-hidden cursor-pointer"
              onClick={() => handlePhotoClick(HOTEL_IMAGES.restaurantMenu)}
              title="Click to zoom into restaurant menu board"
            >
              <img
                src={HOTEL_IMAGES.restaurantMenu}
                alt="Kings Hotel Kabale restaurant and dining menu board"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Authentic Google Maps Photo</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">Restaurant Chalkboard & Daily Specials</h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Our genuine restaurant dining board as posted by guests and management on Google Maps. Serving traditional Katogo, fresh whole tilapia, African spiced tea, chips, and refreshing sodas at transparent local rates.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> Breakfast: 6:30 AM – 10:30 AM</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> Dinner: 6:00 PM – 10:30 PM</span>
              </div>
            </div>
          </div>

          {/* Terrace Lounge & Mountain Air */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-800 group shadow-2xl bg-stone-950">
            <div 
              className="h-72 sm:h-80 overflow-hidden cursor-pointer"
              onClick={() => handlePhotoClick(HOTEL_IMAGES.facade)}
              title="Click to view terrace photo"
            >
              <img
                src={HOTEL_IMAGES.facade}
                alt="Kings Hotel Kabale exterior and outdoor terrace lounge"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Highland Atmosphere</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">Terrace Lounge & Evening Bar</h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Unwind in the crisp evening air with cold Bell Lager, Nile Special, or our signature Uganda Waragi Kigezi Mist cocktail while enjoying gentle breeze from the surrounding Kabale hills.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1.5"><Wine className="w-3.5 h-3.5 text-amber-400" /> Bar Hours: 11:00 AM – Midnight</span>
                <span className="flex items-center gap-1.5"><Coffee className="w-3.5 h-3.5 text-amber-400" /> Fresh Highland Coffee</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE MENU EXPLORER WITH DISH THUMBNAILS */}
        {/* ========================================================================= */}
        <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Featured A La Carte & Daily Menu
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                Prices shown in {currency}. Freshly prepared to order with local ingredients.
              </p>
            </div>

            {/* Menu Category Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-stone-900 p-1.5 rounded-2xl">
              {[
                { id: 'all', label: 'Full Menu' },
                { id: 'local_kigezi', label: 'Lake Bunyonyi & Kigezi' },
                { id: 'continental', label: 'Grills & Continental' },
                { id: 'breakfast', label: 'Royal Breakfast' },
                { id: 'beverages', label: 'Bar & Coffees' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveMenuTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeMenuTab === tab.id
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid with Food Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 p-4 rounded-2xl transition-colors flex flex-col sm:flex-row items-start gap-4 justify-between group"
              >
                {/* Dish Photo Thumbnail (if available) */}
                {item.imageUrl && (
                  <div 
                    className="w-full sm:w-28 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 relative bg-stone-950 cursor-pointer"
                    onClick={() => handlePhotoClick(item.imageUrl)}
                    title="Click to view food image in high resolution"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-1 right-1 bg-stone-950/80 p-1 rounded-md text-amber-400">
                      <Eye className="w-3 h-3" />
                    </div>
                  </div>
                )}

                {/* Dish Description & Pricing */}
                <div className="flex-1 flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h4>
                        {item.tag && (
                          <span className="inline-block mt-1 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm sm:text-base font-bold text-amber-400 font-mono">
                          {formatPrice(item)}
                        </span>
                      </div>
                    </div>
                    <p className="text-stone-400 text-xs leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>

                  {item.imageUrl && (
                    <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                      <span>Google Maps Verified Dish</span>
                      <button
                        type="button"
                        onClick={() => handlePhotoClick(item.imageUrl)}
                        className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Enlarge Photo</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dining Note */}
          <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Special dietary requests (vegetarian, halal, gluten-free, early breakfast packs) accommodated upon request.</span>
            </div>
            <span className="text-amber-400 font-semibold">24/7 In-Room Dining Service Available</span>
          </div>

        </div>

      </div>
    </section>
  );
};
