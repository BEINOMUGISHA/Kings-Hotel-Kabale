/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoomsSection } from './components/RoomsSection';
import { PackagesSection } from './components/PackagesSection';
import { DiningSection } from './components/DiningSection';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { OpenStreetMapSection } from './components/OpenStreetMapSection';
import { GoogleMapsGallerySection } from './components/GoogleMapsGallerySection';
import { SafariExcursions } from './components/SafariExcursions';
import { ConferenceSection } from './components/ConferenceSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingModal } from './components/BookingModal';
import { ManagerPitchDrawer } from './components/ManagerPitchDrawer';
import { InteractiveGalleryModal } from './components/InteractiveGalleryModal';
import { Room, HotelPackage } from './types';

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
        <ManagerPitchDrawer
          onOpenBookingDemo={handleOpenBooking}
          isOpen={isManagementBriefOpen}
          onOpen={() => setIsManagementBriefOpen(true)}
          onClose={() => setIsManagementBriefOpen(false)}
        />
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
        <OpenStreetMapSection />

        {/* Accommodation (50 En-suite Rooms & Suites) */}
        <RoomsSection
          currency={currency}
          onSelectRoomForBooking={handleSelectRoomForBooking}
        />

        {/* Google Maps Verified Photo Gallery (Complete Image Collection) */}
        <GoogleMapsGallerySection
          onOpenPhotoLightbox={(index) => {
            setSelectedPhotoIndex(index);
            setIsGalleryOpen(true);
          }}
          onOpenBooking={handleOpenBooking}
        />

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
        <SafariExcursions onOpenBooking={handleOpenBooking} />

        {/* Conference & Event Facilities */}
        <ConferenceSection onOpenBooking={handleOpenBooking} />

        {/* Google Maps Verified Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer onOpenManagementBrief={() => setIsManagementBriefOpen(true)} />

      {/* Interactive Booking & Reservation Pass Generator Modal */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          selectedRoom={selectedRoom}
          selectedPackage={selectedPackage}
          currency={currency}
          initialSearchParams={searchParams}
        />
      )}

      {/* HD Photographic Walkthrough Gallery Lightbox */}
      {isGalleryOpen && (
        <InteractiveGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          onOpenBooking={handleOpenBooking}
          initialPhotoIndex={selectedPhotoIndex}
        />
      )}

      {/* 24/7 Front Desk WhatsApp Concierge Floating Assistant */}
      <FloatingConcierge />
    </div>
  );
}
