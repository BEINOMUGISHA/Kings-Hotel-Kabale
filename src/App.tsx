/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoomsSection } from './components/RoomsSection';
import { PackagesSection } from './components/PackagesSection';
import { DiningSection } from './components/DiningSection';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { Room, HotelPackage } from './types';

// Code-split below-the-fold heavy modules & interactive modals
const OpenStreetMapSection = lazy(() =>
  import('./components/OpenStreetMapSection').then((m) => ({ default: m.OpenStreetMapSection }))
);
const GoogleMapsGallerySection = lazy(() =>
  import('./components/GoogleMapsGallerySection').then((m) => ({ default: m.GoogleMapsGallerySection }))
);
const SafariExcursions = lazy(() =>
  import('./components/SafariExcursions').then((m) => ({ default: m.SafariExcursions }))
);
const ConferenceSection = lazy(() =>
  import('./components/ConferenceSection').then((m) => ({ default: m.ConferenceSection }))
);
const ReviewsSection = lazy(() =>
  import('./components/ReviewsSection').then((m) => ({ default: m.ReviewsSection }))
);
const BookingModal = lazy(() =>
  import('./components/BookingModal').then((m) => ({ default: m.BookingModal }))
);
const ManagerPitchDrawer = lazy(() =>
  import('./components/ManagerPitchDrawer').then((m) => ({ default: m.ManagerPitchDrawer }))
);
const InteractiveGalleryModal = lazy(() =>
  import('./components/InteractiveGalleryModal').then((m) => ({ default: m.InteractiveGalleryModal }))
);

const SectionLoader: React.FC = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [currency, setCurrency] = useState<'USD' | 'UGX'>('UGX');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [isManagementBriefOpen, setIsManagementBriefOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<HotelPackage | null>(null);
  const [searchParams, setSearchParams] = useState<{
    checkIn: string;
    checkOut: string;
    guests: number;
    category: string;
  } | null>(null);

  const handleOpenBooking = () => {
    setSelectedPackage(null);
    setIsBookingOpen(true);
  };

  const handleSelectRoomForBooking = (room: Room) => {
    setSelectedPackage(null);
    setSelectedRoom(room);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (pkg: HotelPackage) => {
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
  };

  const handleSearchAvailability = (params: {
    checkIn: string;
    checkOut: string;
    guests: number;
    category: string;
  }) => {
    setSearchParams(params);
    const roomsElem = document.getElementById('rooms');
    if (roomsElem) {
      roomsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Fixed Navigation */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onOpenBooking={handleOpenBooking}
        onOpenManagementBrief={() => setIsManagementBriefOpen(true)}
      />

      {/* Manager Value Pitch Deck (Loaded on-demand) */}
      {isManagementBriefOpen && (
        <Suspense fallback={null}>
          <ManagerPitchDrawer
            onOpenBookingDemo={handleOpenBooking}
            isOpen={isManagementBriefOpen}
            onOpen={() => setIsManagementBriefOpen(true)}
            onClose={() => setIsManagementBriefOpen(false)}
          />
        </Suspense>
      )}

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero with Direct Availability Search & Live Highland Weather */}
        <Hero
          onSearchAvailability={handleSearchAvailability}
          onOpenGallery={() => setIsGalleryOpen(true)}
          currency={currency}
        />

        {/* Interactive OpenStreetMap Leaflet & Location Showcase */}
        <Suspense fallback={<SectionLoader />}>
          <OpenStreetMapSection />
        </Suspense>

        {/* Accommodation (50 En-suite Rooms & Suites) */}
        <RoomsSection
          currency={currency}
          onSelectRoomForBooking={handleSelectRoomForBooking}
        />

        {/* Google Maps Verified Photo Gallery (Complete Image Collection) */}
        <Suspense fallback={<SectionLoader />}>
          <GoogleMapsGallerySection
            onOpenPhotoLightbox={(index) => {
              setSelectedPhotoIndex(index);
              setIsGalleryOpen(true);
            }}
            onOpenBooking={handleOpenBooking}
          />
        </Suspense>

        {/* Curated Kigezi Stay & Safari Packages */}
        <PackagesSection
          currency={currency}
          onSelectPackage={handleSelectPackage}
          onOpenGallery={() => setIsGalleryOpen(true)}
        />

        {/* Kings Royal Restaurant & Garden Terrace Bar */}
        <DiningSection
          currency={currency}
          onOpenPhotoLightbox={(index) => {
            setSelectedPhotoIndex(index);
            setIsGalleryOpen(true);
          }}
        />

        {/* Safari & Tour Base (Lake Bunyonyi & Bwindi Gorillas) */}
        <Suspense fallback={<SectionLoader />}>
          <SafariExcursions onOpenBooking={handleOpenBooking} />
        </Suspense>

        {/* Conference & Event Facilities */}
        <Suspense fallback={<SectionLoader />}>
          <ConferenceSection onOpenBooking={handleOpenBooking} />
        </Suspense>

        {/* Google Maps Verified Reviews */}
        <Suspense fallback={<SectionLoader />}>
          <ReviewsSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onOpenManagementBrief={() => setIsManagementBriefOpen(true)} />

      {/* Interactive Booking & Reservation Pass Generator Modal (Loaded on-demand) */}
      {isBookingOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            selectedRoom={selectedRoom}
            selectedPackage={selectedPackage}
            currency={currency}
            initialSearchParams={searchParams}
          />
        </Suspense>
      )}

      {/* HD Photographic Walkthrough Gallery Lightbox (Loaded on-demand) */}
      {isGalleryOpen && (
        <Suspense fallback={null}>
          <InteractiveGalleryModal
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            onOpenBooking={handleOpenBooking}
            initialPhotoIndex={selectedPhotoIndex}
          />
        </Suspense>
      )}

      {/* 24/7 Front Desk WhatsApp Concierge Floating Assistant */}
      <FloatingConcierge />
    </div>
  );
}
