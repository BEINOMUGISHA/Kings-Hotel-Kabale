import React, { useState, useEffect } from 'react';
import { Crown, Phone, MapPin, Menu, X, Calendar, Compass, Utensils, BedDouble, Users, MessageCircle } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  currency: 'USD' | 'UGX';
  setCurrency: (currency: 'USD' | 'UGX') => void;
  onOpenBooking: () => void;
  onOpenManagementBrief?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  setCurrency,
  onOpenBooking,
  onOpenManagementBrief,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Rooms & Suites', href: '#rooms' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Dining & Terrace', href: '#dining' },
    { name: 'Lake Bunyonyi & Safaris', href: '#safari' },
    { name: 'Conferences', href: '#conferences' },
    { name: 'Location & Map', href: '#location' },
    { name: 'Reviews', href: '#reviews' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Utility Contact Bar */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>Kigongi, Off Kabale-Mbarara Rd • 11.8 km to Lake Bunyonyi</span>
            </span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span className="hidden md:inline text-stone-400">
              Solar Hot Showers • 50 Rooms with Balconies • 200 Pax Conference Hall
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${HOTEL_INFO.phonePrimary}`}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-mono font-medium transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{HOTEL_INFO.phonePrimary}</span>
            </a>

            {/* Currency Toggle */}
            <div className="flex items-center bg-stone-800 border border-stone-700 rounded-full p-0.5 text-[10px]">
              <button
                type="button"
                onClick={() => setCurrency('UGX')}
                className={`px-2 py-0.5 rounded-full transition-all font-semibold ${
                  currency === 'UGX'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                UGX
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded-full transition-all font-semibold ${
                  currency === 'USD'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                USD
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md text-stone-900 shadow-md py-3.5 border-b border-stone-200'
          : 'bg-gradient-to-b from-stone-950/80 via-stone-950/40 to-transparent text-white py-4 sm:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Elegant Royal Crest Logo */}
            <a href="#overview" className="flex items-center gap-3 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled
                  ? 'bg-stone-900 text-amber-400 shadow-sm'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300'
              }`}>
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight block ${
                  isScrolled ? 'text-stone-900' : 'text-white'
                }`}>
                  KINGS HOTEL
                </span>
                <span className={`text-[10px] tracking-widest uppercase font-semibold block ${
                  isScrolled ? 'text-amber-800' : 'text-amber-300'
                }`}>
                  Kabale • Uganda
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide uppercase">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`transition-colors py-1 relative group ${
                    isScrolled
                      ? 'text-stone-700 hover:text-amber-800'
                      : 'text-stone-200 hover:text-amber-300'
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Kings%20Hotel%20Reception!%20I%20would%20like%20to%20inquire%20about%20room%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-colors ${
                  isScrolled
                    ? 'border-stone-300 text-stone-700 hover:bg-stone-100'
                    : 'border-white/20 text-stone-200 hover:bg-white/10'
                }`}
                title="Direct WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Direct</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={onOpenBooking}
                className="bg-amber-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
              >
                Book
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg ${
                  isScrolled ? 'text-stone-800 hover:bg-stone-100' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 text-stone-100 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-stone-300 hover:text-amber-400 py-1.5 border-b border-stone-800"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Room (Direct Rate)</span>
              </button>

              <a
                href={`tel:${HOTEL_INFO.phonePrimary}`}
                className="w-full text-center py-2.5 rounded-xl border border-stone-700 text-stone-300 text-xs font-mono"
              >
                Call: {HOTEL_INFO.phonePrimary}
              </a>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
};
