import { Room, MenuItem, GoogleReview, TripAdvisorReview, NearbyPointOfInterest, GalleryItem } from '../types';

export const HOTEL_INFO = {
  name: "Kings Hotel Kabale",
  tagline: "Your Regal Gateway in the Switzerland of Africa",
  locationName: "Kigongi, Off Kabale-Mbarara Road",
  address: "Off Kabale Mbarara Road, Opposite Police Barracks, Kigongi, Kabale Municipality, Uganda",
  city: "Kabale",
  region: "Kigezi Sub-Region, Western Uganda",
  country: "Uganda",
  coordinates: {
    lat: -1.250556,
    lng: 29.988056,
  },
  plusCode: "PJXX+96 Kabale, Uganda",
  phonePrimary: "+256 772 477435",
  phoneSecondary: "+256 701 477435",
  landline: "+256 486 422000",
  whatsappNumber: "+256772477435",
  email: "info@kingshotelkabale.com",
  reservationsEmail: "reservations@kingshotelkabale.com",
  googleMapsRating: 4.2,
  googleMapsReviewCount: 154,
  googleMapsUrl: "https://www.google.com/maps/place/Kings+Hotel+Kabale/@-1.250556,29.988056,16z",
  googleDirectionsUrl: "https://www.google.com/maps/dir//Kings+Hotel+Kabale+Uganda",
  tripadvisorRating: 4.5,
  tripadvisorReviewCount: 88,
  tripadvisorRank: "#3 of 28 Accommodations in Kabale",
  tripadvisorUrl: "https://www.tripadvisor.com/Search?q=Kings+Hotel+Kabale+Uganda",
  checkInTime: "12:00 PM",
  checkOutTime: "10:00 AM",
  totalRooms: 50,
  currencyRate: 3750, // UGX per 1 USD
};

// Helper to resolve public assets correctly whether hosted at root domain, custom domain, subpath, or GitHub Pages
const resolveAsset = (path: string): string => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const HOTEL_IMAGES = {
  facade: resolveAsset("hotel-photos/kings_facade_real.jpg"),
  streetView: resolveAsset("hotel-photos/kings_street_view_real.jpg"),
  roomBed: resolveAsset("hotel-photos/kings_room_bed_real.jpg"),
  restaurantMenu: resolveAsset("hotel-photos/kings_restaurant_menu_real.jpg"),
  bathroomToilet: resolveAsset("hotel-photos/kings_bathroom_toilet_real.jpg"),
  waterHeaterShower: resolveAsset("hotel-photos/kings_water_heater_shower_real.jpg"),
  lakeBunyonyi: resolveAsset("hotel-photos/lake_bunyonyi_real.jpg"),
  bunyonyiIslands: resolveAsset("hotel-photos/bunyonyi_kabale_islands_real.jpg"),
  kabaleTownView: resolveAsset("hotel-photos/kabale_town_view_real.jpg"),
  kabaleMainStreet: resolveAsset("hotel-photos/kabale_main_street_real.jpg"),
  kabaleMorningHills: resolveAsset("hotel-photos/kabale_morning_hills_real.jpg"),
  // Served Culinary Delicacies from Google Maps & Hotel Restaurant
  crayfishPlatter: resolveAsset("hotel-photos/food/crayfish_platter.jpg"),
  friedTilapia: resolveAsset("hotel-photos/food/fried_tilapia.jpg"),
  eshabweKalo: resolveAsset("hotel-photos/food/eshabwe_kalo.jpg"),
  goatNyamaChoma: resolveAsset("hotel-photos/food/goat_nyama_choma.jpg"),
  royalBreakfast: resolveAsset("hotel-photos/food/royal_breakfast.jpg"),
  diningAmbience: resolveAsset("hotel-photos/food/kings_dining_ambience.jpg"),
};

export const ROOMS_DATA: Room[] = [
  {
    id: "exec-suite",
    name: "Royal Executive Suite",
    category: "Suite",
    priceUSD: 85,
    priceUGX: 320000,
    capacity: "2 Adults + 1 Child",
    bedType: "King-size Bed",
    sizeSqM: 42,
    imageUrl: HOTEL_IMAGES.roomBed,
    description: "Our most spacious haven at Kings Hotel Kabale, featuring an en-suite bathroom with water heater shower, private balcony facing the peaceful Kabale surroundings, and DSTV.",
    popularBadge: "Most Requested",
    amenities: [
      "Guaranteed Hot Water (Electric Water Heater)",
      "En-suite Tiled Bathroom & Shower",
      "Private Balcony with Hill & Town View",
      "Complimentary Full Ugandan Breakfast",
      "High-Speed Free Wi-Fi",
      "Satellite TV (DSTV)",
      "Mosquito Netting & Wardrobe",
      "24/7 Front Desk & Room Service"
    ]
  },
  {
    id: "deluxe-double",
    name: "Deluxe Double Room",
    category: "Deluxe",
    priceUSD: 55,
    priceUGX: 205000,
    capacity: "2 Guests",
    bedType: "Queen-size Bed",
    sizeSqM: 30,
    imageUrl: HOTEL_IMAGES.roomBed,
    description: "Designed for couples, business travelers, and safari transit guests visiting Kabale. Features comfortable bedding, hot water shower, work desk, and private balcony.",
    popularBadge: "Guest Favorite",
    amenities: [
      "Electric Water Heater Hot Shower",
      "Clean En-suite Private Bathroom",
      "Private Balcony / Window View",
      "Complimentary Hot Breakfast",
      "Free Fast Wi-Fi",
      "Television with Satellite Channels",
      "Work Desk & Chair",
      "Mosquito Netting & Daily Fresh Linens"
    ]
  },
  {
    id: "standard-twin",
    name: "Comfort Twin Room",
    category: "Twin",
    priceUSD: 50,
    priceUGX: 185000,
    capacity: "2 Guests",
    bedType: "Two Single Beds",
    sizeSqM: 28,
    imageUrl: HOTEL_IMAGES.roomBed,
    description: "Ideal for safari companions, gorilla trekkers, or friends traveling together through Southwestern Uganda. Equipped with twin beds, hot water shower, and en-suite amenities.",
    amenities: [
      "Two Separate Single Beds",
      "Hot Water Shower System",
      "En-suite Private Toilet & Washbasin",
      "Complimentary Breakfast Included",
      "Free Wi-Fi Access",
      "Television",
      "Mosquito Protection",
      "Secure Luggage Storage"
    ]
  },
  {
    id: "standard-single",
    name: "Standard Single Room",
    category: "Single",
    priceUSD: 35,
    priceUGX: 130000,
    capacity: "1 Guest",
    bedType: "Single Bed",
    sizeSqM: 20,
    imageUrl: HOTEL_IMAGES.roomBed,
    description: "An economical, peaceful room for solo business travelers, NGO staff, and transit visitors passing through Kabale towards Lake Bunyonyi or Rwanda.",
    amenities: [
      "Single Orthopaedic Bed",
      "En-suite Hot Water Shower",
      "Complimentary Morning Breakfast",
      "Free Wi-Fi",
      "Reading Lamp & Power Outlets",
      "TV with Local & DSTV Channels",
      "Clean Towels & Toiletries"
    ]
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "bunyonyi-crayfish",
    name: "Lake Bunyonyi Fresh Crayfish Platter",
    category: "local_kigezi",
    description: "Succulent freshwater crayfish sourced daily from Lake Bunyonyi, sauteed with garlic butter, fresh garden herbs, and served with chips or steamed rice.",
    priceUSD: 11,
    priceUGX: 42000,
    imageUrl: HOTEL_IMAGES.crayfishPlatter,
    tag: "Chef's Signature"
  },
  {
    id: "kigezi-tilapia",
    name: "Whole Pan-Fried Nile Tilapia",
    category: "local_kigezi",
    description: "Crispy skin whole tilapia seasoned in aromatic spices, served with fresh tomato salsa (kachumbari), lemon wedges, and your choice of matooke or fries.",
    priceUSD: 10,
    priceUGX: 38000,
    imageUrl: HOTEL_IMAGES.friedTilapia,
    tag: "Popular"
  },
  {
    id: "traditional-eshabwe",
    name: "Bakiga Heritage Meal (Eshabwe & Kalo)",
    category: "local_kigezi",
    description: "Authentic Kigezi ghee sauce (Eshabwe) served with hot millet bread (Kalo), steamed matooke, and savory braised tender beef stew.",
    priceUSD: 9,
    priceUGX: 34000,
    imageUrl: HOTEL_IMAGES.eshabweKalo,
    tag: "Cultural Classic"
  },
  {
    id: "kings-breakfast",
    name: "Full Kings Royal English Breakfast",
    category: "breakfast",
    description: "Two eggs prepared to order, beef sausages, baked beans, sauteed mushrooms, grilled tomatoes, buttered toast, fresh tropical fruit slices, and African spiced milk tea or brewed Kigezi Arabica coffee.",
    priceUSD: 7,
    priceUGX: 26000,
    imageUrl: HOTEL_IMAGES.royalBreakfast,
    tag: "Included with Room"
  },
  {
    id: "nyama-choma",
    name: "Kings Sizzling Goat Nyama Choma",
    category: "continental",
    description: "Marinated tender goat cuts slowly chargrilled to perfection over charcoal, accompanied by roasted sweet plantains (gonja) and spicy chili dip.",
    priceUSD: 10,
    priceUGX: 38000,
    imageUrl: HOTEL_IMAGES.goatNyamaChoma,
    tag: "Terrace Bar Favorite"
  },
  {
    id: "kigezi-coffee",
    name: "Freshly Ground Kigezi Highland Coffee",
    category: "beverages",
    description: "Locally harvested volcanic soil Arabica beans from the slopes of Muhabura and Kabale hills, French-pressed to aromatic perfection.",
    priceUSD: 2.5,
    priceUGX: 9000
  },
  {
    id: "uganda-waragi-cocktail",
    name: "Kigezi Mist Cocktail",
    category: "beverages",
    description: "Premium Uganda Waragi infused with freshly crushed passion fruit, lime juice, ginger beer, and fresh mint leaves.",
    priceUSD: 5,
    priceUGX: 18000,
    tag: "Signature Drink"
  }
];

export const GOOGLE_REVIEWS_DATA: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Tuhirirwe Brian",
    authorLocation: "Kampala, Uganda",
    rating: 5,
    relativeTime: "2 months ago",
    text: "Kings Hotel is easily one of the most reliable and peaceful places to stay in Kabale town. Located in Kigongi just off the main road, it is very quiet at night. The staff welcomed us warmly after our long drive from Kampala. Hot water was readily available, the Wi-Fi was fast, and the garden terrace in the evening is unmatched!",
    userType: "Business",
    likesCount: 14
  },
  {
    id: "rev-2",
    author: "Sarah Jenkins & Mark",
    authorLocation: "Brighton, United Kingdom",
    rating: 5,
    relativeTime: "3 weeks ago",
    text: "We stayed at Kings Hotel Kabale as our transit base before tracking gorillas in Bwindi (Ruhija sector) and visiting Lake Bunyonyi. Outstanding hospitality! The manager helped organize our local driver and boat cruise on Lake Bunyonyi. The fresh crayfish dinner at their restaurant was delicious.",
    userType: "Safari tourist",
    likesCount: 21
  },
  {
    id: "rev-3",
    author: "Emmanuel Nsabimana",
    authorLocation: "Kigali, Rwanda",
    rating: 4,
    relativeTime: "1 month ago",
    text: "Very convenient location when crossing from Gatuna/Katuna border into Uganda. Secure fenced parking for vehicles with 24/7 security guard. Comfortable double room with a nice balcony view of the green terraced hills. Good value for money.",
    userType: "Solo traveler",
    likesCount: 8
  },
  {
    id: "rev-4",
    author: "Grace Asiimwe",
    authorLocation: "Mbarara, Uganda",
    rating: 5,
    relativeTime: "4 months ago",
    text: "We held our regional health NGO workshop in their conference hall. The catering was on time, the projector setup worked without glitches, and their team was very attentive to our delegates. Highly recommended for corporate events in Kabale!",
    userType: "Business",
    likesCount: 12
  }
];

export const TRIPADVISOR_REVIEWS_DATA: TripAdvisorReview[] = [
  {
    id: "ta-1",
    author: "David & Chloe M.",
    authorLocation: "Melbourne, Australia",
    contributionsCount: 47,
    helpfulVotes: 23,
    bubbleRating: 5,
    title: "Quiet, comfortable stay & ideal launchpad for Bwindi Gorilla trekking!",
    text: "We booked Kings Hotel for two nights on our Southwestern Uganda safari circuit. The hotel is located in Kigongi, just tucked off the main Kabale-Mbarara road, meaning it was peaceful and free from highway noise. The room had a comfortable bed, warm blankets (Kabale gets pleasantly cool at night!), and the electric water heater provided instant hot showers. The front desk staff went above and beyond arranging our transport for the Lake Bunyonyi canoe excursion. Wonderful local hospitality!",
    dateOfStay: "Stayed August 2026",
    tripType: "Couples",
    managementResponse: {
      responderName: "Kings Hotel Management",
      responderTitle: "General Manager",
      date: "August 2026",
      text: "Dear David and Chloe, thank you so much for choosing Kings Hotel Kabale! We are delighted that you enjoyed the peaceful atmosphere, hot showers, and your Lake Bunyonyi experience. We hope to welcome you back on your next Ugandan safari journey!"
    }
  },
  {
    id: "ta-2",
    author: "Anika Lindqvist",
    authorLocation: "Stockholm, Sweden",
    contributionsCount: 68,
    helpfulVotes: 34,
    bubbleRating: 5,
    title: "Warm hot showers, secure gated parking, and wonderful local food",
    text: "After a 9-hour journey from Entebbe, arriving at Kings Hotel was a relief. As solo female travelers traveling together with friends, safety was our top priority. The 24/7 security guard at the gate and enclosed compound made us feel completely secure. Don't miss ordering the freshly caught Lake Bunyonyi crayfish with garlic butter at their restaurant—it was one of the culinary highlights of our trip. Great value for money in Kabale.",
    dateOfStay: "Stayed July 2026",
    tripType: "Friends"
  },
  {
    id: "ta-3",
    author: "Jean-Paul Karemera",
    authorLocation: "Kigali, Rwanda",
    contributionsCount: 22,
    helpfulVotes: 9,
    bubbleRating: 5,
    title: "Perfect stopover 25 minutes from Gatuna / Katuna border",
    text: "I travel regularly between Kigali and Kampala for business consulting. Kings Hotel is my preferred overnight stop in Kabale. It is only about 22 km from the border, check-in is swift, and the Wi-Fi is strong enough for Zoom calls and evening work. The morning breakfast of fresh eggs, tea, and fruit had me ready for the road. Highly recommended.",
    dateOfStay: "Stayed June 2026",
    tripType: "Business",
    managementResponse: {
      responderName: "Kings Hotel Reception",
      responderTitle: "Guest Relations Team",
      date: "June 2026",
      text: "Muraho Jean-Paul! Thank you for your continued loyalty and kind review. We are proud to serve as your dependable Kabale stopover and look forward to welcoming you on your next cross-border trip."
    }
  },
  {
    id: "ta-4",
    author: "Patrick Mukasa",
    authorLocation: "Kampala, Uganda",
    contributionsCount: 31,
    helpfulVotes: 14,
    bubbleRating: 4,
    title: "Affordable, clean, and strategic location in Kabale town",
    text: "Good value hotel in Kigongi with generous parking for safari 4WDs. The rooms are clean, towels are fresh, and the balcony provides a nice view of the terraced hills in the morning. Staff are polite and attentive. The restaurant serves generous portions of local matooke and fish. Will certainly stay again when visiting Kigezi.",
    dateOfStay: "Stayed May 2026",
    tripType: "Solo"
  },
  {
    id: "ta-5",
    author: "The Henderson Family",
    authorLocation: "Nairobi, Kenya",
    contributionsCount: 19,
    helpfulVotes: 8,
    bubbleRating: 5,
    title: "Great family base for exploring Lake Bunyonyi & Southwestern Uganda",
    text: "Traveled with our two teenage kids on a road trip from Kenya. Kings Hotel offered comfortable interconnected rooms and the kitchen accommodated our children's food preferences effortlessly. The manager gave us great tips for visiting Bushara Island on Lake Bunyonyi. A genuinely welcoming family-friendly hotel in Kabale.",
    dateOfStay: "Stayed April 2026",
    tripType: "Family"
  }
];

export const NEARBY_POINTS_OF_INTEREST: NearbyPointOfInterest[] = [
  {
    id: "lake-bunyonyi",
    name: "Lake Bunyonyi (29 Islands)",
    category: "Nature & Safari",
    distance: "11.8 km",
    driveTime: "15 mins drive",
    description: "Africa's second deepest lake, famous for its magical mist, safe bilharzia-free swimming, canoeing, and 29 terraced islands including Punishment Island and Bushara.",
    lat: -1.2889,
    lng: 29.9142,
  },
  {
    id: "kabale-market",
    name: "Kabale Central Market & Town Center",
    category: "Transit & Town",
    distance: "800 meters",
    driveTime: "3 mins drive / 10 mins walk",
    description: "The bustling cultural and commercial hub of Kabale municipality, filled with vibrant fresh produce stalls, handmade Kigezi baskets, and craft vendors.",
    lat: -1.2520,
    lng: 29.9890,
  },
  {
    id: "bwindi-gorillas",
    name: "Bwindi Impenetrable National Park (Ruhija)",
    category: "Nature & Safari",
    distance: "48 km",
    driveTime: "1.5 hours scenic drive",
    description: "UNESCO World Heritage Site sheltering half of the world's endangered mountain gorillas. Kings Hotel offers convenient morning transit for booked trekking permits.",
    lat: -1.0475,
    lng: 29.7788,
  },
  {
    id: "kabale-golf-club",
    name: "Kabale Golf Club",
    category: "Culture & Leisure",
    distance: "1.5 km",
    driveTime: "4 mins drive",
    description: "Historic 9-hole golf course located on Makanga hill offering crisp cool mountain air and sweeping vistas across the Kabale valley.",
    lat: -1.2580,
    lng: 29.9930,
  },
  {
    id: "katuna-border",
    name: "Katuna / Gatuna Rwanda Border",
    category: "Transit & Town",
    distance: "22 km",
    driveTime: "25 mins drive",
    description: "The primary international border crossing connecting Kabale, Uganda to Kigali, Rwanda. Ideal stopover point for cross-border travelers.",
    lat: -1.4172,
    lng: 30.0092,
  }
];

export const CURATED_PACKAGES = [
  {
    id: "lake-bunyonyi-getaway",
    title: "Lake Bunyonyi 2-Night Romantic & Scenic Getaway",
    duration: "3 Days / 2 Nights",
    priceUSD: 190,
    priceUGX: 710000,
    badge: "Most Popular Vacation",
    description: "The ultimate Kigezi escape. Stay in our Royal Suite, take a private motorized boat cruise to Punishment and Bushara Islands, and enjoy a candlelit crayfish dinner with highland wine.",
    inclusions: [
      "2 Nights in Royal Executive Suite with Balcony View",
      "Daily Royal Buffet Breakfast with fresh tropical fruits",
      "Private return transfer & motorized Lake Bunyonyi boat cruise",
      "3-Course Lake Bunyonyi Freshwater Crayfish Dinner for two",
      "Complimentary high-speed Wi-Fi and late checkout at 1:00 PM"
    ],
    imageUrl: HOTEL_IMAGES.lakeBunyonyi,
  },
  {
    id: "gorilla-trekking-base",
    title: "Bwindi Mountain Gorilla Trekker's Transit Pack",
    duration: "2 Days / 1 Night",
    priceUSD: 110,
    priceUGX: 410000,
    badge: "Safari Operator Recommended",
    description: "Designed specifically for wildlife lovers and safari groups tracking gorillas in Ruhija or Rushaga sectors. Rest deeply before and after the trek with all logistics covered.",
    inclusions: [
      "1 Night in Deluxe Double Room with solar hot rain shower",
      "Early riser 5:30 AM hot breakfast before departure",
      "Chef-packed gourmet safari picnic lunch for the rainforest",
      "Luggage storage and post-trek refreshing shower access",
      "Direct coordination with licensed 4x4 safari chauffeurs"
    ],
    imageUrl: HOTEL_IMAGES.kabaleMorningHills,
  },
  {
    id: "corporate-retreat",
    title: "Executive Conference & Team Retreat Package",
    duration: "Full-Day Delegate Pass",
    priceUSD: 25,
    priceUGX: 950000,
    badge: "NGO & Government Preferred",
    description: "Host seamless workshops, board meetings, and strategy symposiums in Kabale town with top-tier technology and exquisite Ugandan catering.",
    inclusions: [
      "Full access to 200-seat AV-equipped Conference Hall",
      "Mid-morning & afternoon tea breaks with Kigezi highland Arabica",
      "3-Course buffet lunch with local and continental delicacies",
      "Dedicated fiber Wi-Fi network and standby backup generator",
      "Free delegate stationery, flip charts, and bottled mineral water"
    ],
    imageUrl: HOTEL_IMAGES.facade,
  }
];

export const GALLERY_PHOTOS: GalleryItem[] = [
  {
    id: "gal-dietary-menu",
    title: "Kings Hotel Authentic Restaurant & Dietary Menu",
    category: "Dietary",
    imageUrl: HOTEL_IMAGES.restaurantMenu,
    description: "Authentic chalkboard dining and dietary menu at Kings Hotel Kabale restaurant featuring fresh local meals, Katogo breakfast, whole tilapia fish, snacks, and beverage pricing in UGX.",
    tag: "Authentic Dietary & Dining",
    verifiedBadge: "Verified Google Maps Property Photo",
    highlights: [
      "Fresh Tilapia Fish & Kigezi local specialties",
      "Traditional Katogo breakfast & hot African tea",
      "Sizzling beef, chicken, chips & snacks",
      "Transparent UGX restaurant pricing"
    ],
  },
  {
    id: "gal-dietary-crayfish",
    title: "Lake Bunyonyi Fresh Garlic Butter Crayfish Platter",
    category: "Dietary",
    imageUrl: HOTEL_IMAGES.crayfishPlatter,
    description: "Signature freshwater crayfish sourced fresh from nearby Lake Bunyonyi, sauteed with garlic herb butter, fresh garden greens, lemon, and served with golden chips at Kings Restaurant.",
    tag: "Lake Bunyonyi Specialty",
    verifiedBadge: "Verified Google Maps Dining Photo",
    highlights: [
      "Freshly caught Lake Bunyonyi crayfish",
      "Sauteed in rich aromatic garlic butter",
      "Garnished with fresh lemons & garden parsley",
      "Served with hand-cut chips or steamed rice"
    ],
  },
  {
    id: "gal-dietary-tilapia",
    title: "Whole Pan-Fried Nile Tilapia with Kachumbari",
    category: "Dietary",
    imageUrl: HOTEL_IMAGES.friedTilapia,
    description: "Crispy skin whole Nile tilapia fish prepared fresh upon guest order, seasoned with local Kigezi herbs and paired with Ugandan kachumbari tomato-onion salad and matooke.",
    tag: "Fresh Fish Special",
    verifiedBadge: "Verified Google Maps Dining Photo",
    highlights: [
      "Whole freshwater Nile tilapia pan-fried to crisp perfection",
      "Zesty fresh kachumbari tomato and red onion salsa",
      "Served with steamed matooke or golden fries",
      "A traveler favorite at Kings Hotel Kabale"
    ],
  },
  {
    id: "gal-dietary-eshabwe",
    title: "Bakiga Heritage Meal (Eshabwe, Kalo & Beef Stew)",
    category: "Dietary",
    imageUrl: HOTEL_IMAGES.eshabweKalo,
    description: "Traditional southwestern Ugandan delicacy: rich creamy clarified butter ghee sauce (Eshabwe) served alongside hot millet bread (Kalo) and slow-simmered tender beef stew.",
    tag: "Traditional Kigezi Cuisine",
    verifiedBadge: "Verified Google Maps Dining Photo",
    highlights: [
      "Authentic Bakiga ceremonial Eshabwe ghee sauce",
      "Hot organic Kalo (millet bread)",
      "Tender braised Ugandan beef in rich gravy",
      "Experience genuine Southwestern Ugandan cultural heritage"
    ],
  },
  {
    id: "gal-dietary-nyamachoma",
    title: "Kings Sizzling Goat Nyama Choma with Gonja",
    category: "Dietary",
    imageUrl: HOTEL_IMAGES.goatNyamaChoma,
    description: "Succulent charcoal-grilled goat meat cuts seasoned with mountain herbs, served on a sizzling platter with roasted sweet plantains (gonja) and piquant chili dipping sauce.",
    tag: "Terrace Bar Grill",
    verifiedBadge: "Verified Google Maps Dining Photo",
    highlights: [
      "Tender slow-grilled goat cuts with aromatic smoke finish",
      "Roasted ripe plantains (gonja)",
      "Spicy fresh chili dip and onion rings",
      "Best enjoyed on the breezy evening terrace lounge"
    ],
  },
  {
    id: "gal-dietary-breakfast",
    title: "Full Kings Royal Breakfast with Tropical Fruits",
    category: "Dietary",
    imageUrl: HOTEL_IMAGES.royalBreakfast,
    description: "Complimentary breakfast served to hotel room guests: farm-fresh eggs, grilled sausages, buttered toast, sauteed mushrooms, fresh papaya & pineapple, and hot spiced African milk tea.",
    tag: "Complimentary Guest Breakfast",
    verifiedBadge: "Verified Google Maps Dining Photo",
    highlights: [
      "Prepared hot to order every morning from 6:30 AM",
      "Eggs, sausages, toast, baked beans & sauteed mushrooms",
      "Sweet fresh tropical fruit platter",
      "Locally brewed Kigezi highland Arabica coffee or spiced tea"
    ],
  },
  {
    id: "gal-bedroom-setup",
    title: "En-Suite Guest Bedroom & Bedding Setup",
    category: "Bedroom",
    imageUrl: HOTEL_IMAGES.roomBed,
    description: "Authentic guest bedroom at Kings Hotel Kabale featuring sturdy wooden bed frame, clean white linens, reading lamp, bedside electric switches, and protective mosquito netting.",
    tag: "Comfortable Bedroom",
    verifiedBadge: "Verified Google Maps Property Photo",
    highlights: [
      "Hardwood bed frame with comfortable mattress",
      "Protective all-around mosquito netting",
      "Bedside reading light and phone charging sockets",
      "Warm blankets for cool Kabale mountain nights"
    ],
  },
  {
    id: "gal-hospitality-bath",
    title: "Private En-Suite Bathroom & Flush Toilet",
    category: "Hospitality",
    imageUrl: HOTEL_IMAGES.bathroomToilet,
    description: "Spotless ceramic-tiled private guest bathroom with modern porcelain flush toilet, wash basin, mirror, and daily housekeeping sanitation inside Kings Hotel Kabale.",
    tag: "Hospitality & Sanitation",
    verifiedBadge: "Verified Google Maps Property Photo",
    highlights: [
      "Private ceramic-tiled en-suite washroom",
      "Modern porcelain flush toilet system",
      "Wall-mounted vanity mirror and basin",
      "Sanitized and restocked daily"
    ],
  },
  {
    id: "gal-hospitality-shower",
    title: "Instant Electric Water Heater Shower Unit",
    category: "Hospitality",
    imageUrl: HOTEL_IMAGES.waterHeaterShower,
    description: "Dedicated in-room electric water heater shower unit installed in guest bathrooms, guaranteeing instant steaming hot water even during cold Kabale highland mornings.",
    tag: "Hospitality Comfort",
    verifiedBadge: "Verified Google Maps Property Photo",
    highlights: [
      "Instant electric shower water heater",
      "Steaming hot water on demand 24/7",
      "Ideal for crisp Kabale highland mornings",
      "Independent in-room temperature control"
    ],
  },
  {
    id: "gal-hospitality-facade",
    title: "Kings Hotel Multi-Storey Building & Balconies",
    category: "Hospitality",
    imageUrl: HOTEL_IMAGES.facade,
    description: "Official exterior facade of Kings Hotel Kabale Limited in Kigongi, showcasing the multi-level hotel architecture, blue and cream guest balconies, and mountain backdrop.",
    tag: "Property & Architecture",
    verifiedBadge: "Verified Google Maps Property Photo",
    highlights: [
      "Multi-level hotel accommodation",
      "Private guest room balconies",
      "Highland mountain valley backdrop",
      "Peaceful location in Kigongi"
    ],
  },
  {
    id: "gal-hospitality-entrance",
    title: "Street Access, Gated Compound & Secure Parking",
    category: "Hospitality",
    imageUrl: HOTEL_IMAGES.streetView,
    description: "Street-level front entrance of Kings Hotel Kabale along Kigongi road opposite the Police Barracks, featuring gated access and secure vehicle parking for safari 4WDs.",
    tag: "Hospitality & Security",
    verifiedBadge: "Verified Google Maps Property Photo",
    highlights: [
      "Direct street access off Kabale-Mbarara corridor",
      "Enclosed compound with security gates",
      "24/7 guarded parking for guest & safari vehicles",
      "Opposite Kabale Police Barracks in Kigongi"
    ],
  },
];

