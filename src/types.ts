export interface Room {
  id: string;
  name: string;
  category: 'Suite' | 'Deluxe' | 'Twin' | 'Single';
  priceUSD: number;
  priceUGX: number;
  capacity: string;
  bedType: string;
  sizeSqM: number;
  imageUrl: string;
  description: string;
  amenities: string[];
  popularBadge?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'breakfast' | 'local_kigezi' | 'continental' | 'beverages';
  description: string;
  priceUSD: number;
  priceUGX: number;
  imageUrl?: string;
  tag?: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  authorLocation?: string;
  rating: number;
  relativeTime: string;
  text: string;
  userType: 'Solo traveler' | 'Couple' | 'Business' | 'Safari tourist' | 'Family';
  likesCount: number;
}

export interface TripAdvisorReview {
  id: string;
  author: string;
  authorLocation?: string;
  contributionsCount: number;
  helpfulVotes: number;
  bubbleRating: number; // 1 to 5
  title: string;
  text: string;
  dateOfStay: string;
  tripType: 'Couples' | 'Solo' | 'Business' | 'Friends' | 'Family';
  managementResponse?: {
    responderName: string;
    responderTitle: string;
    date: string;
    text: string;
  };
}

export interface NearbyPointOfInterest {
  id: string;
  name: string;
  category: 'Nature & Safari' | 'Transit & Town' | 'Culture & Leisure';
  distance: string;
  driveTime: string;
  description: string;
  lat: number;
  lng: number;
}

export interface BookingDetails {
  room: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export interface HotelPackage {
  id: string;
  title: string;
  duration: string;
  priceUSD: number;
  priceUGX: number;
  badge: string;
  description: string;
  inclusions: string[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Dietary' | 'Bedroom' | 'Hospitality' | string;
  imageUrl: string;
  description: string;
  highlights?: string[];
  tag?: string;
  verifiedBadge?: string;
}

