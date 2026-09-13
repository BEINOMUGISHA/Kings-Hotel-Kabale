import React, { useState } from 'react';
import { MessageCircle, Phone, X, Send, Crown, CheckCircle, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const FloatingConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickTopics = [
    { label: "🛏️ Check Tonight's Room Rates", text: "Hello Kings Hotel Reception, what are your room rates and availability for tonight?" },
    { label: "📍 Driving Directions from Kabale Town", text: "Hello, could you share the driving directions to Kings Hotel in Kigongi from the main road?" },
    { label: "🚤 Lake Bunyonyi Boat Cruise Tour", text: "Hello Kings Hotel, I would like to book a boat cruise trip to Lake Bunyonyi during my stay." },
    { label: "👔 200 Pax Conference Hall Inquiry", text: "Hello, I would like to request a quote for hosting a conference meeting at Kings Hotel Kabale." },
  ];

  const handleSendToWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${HOTEL_INFO.whatsappNumber.replace('+', '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Concierge Pop-up Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-stone-900 border border-stone-800 text-stone-100 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-stone-950 p-4 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Crown className="w-5 h-5" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-stone-950" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-white">Kings Hotel Reception</h4>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online Now • Front Desk Kabale
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-stone-900/90 text-xs space-y-3">
            <div className="bg-stone-800/80 p-3 rounded-2xl text-stone-200 border border-stone-700/60">
              <p className="leading-relaxed">
                👋 <strong>Muraho! Welcome to Kings Hotel Kabale.</strong> How can we assist with your stay, dining, or safari plans today?
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                Tap for Instant WhatsApp Inquiry:
              </span>
              {quickTopics.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendToWhatsApp(topic.text)}
                  className="w-full text-left p-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/30 text-[11px] text-stone-200 transition-colors flex items-center justify-between group"
                >
                  <span>{topic.label}</span>
                  <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 border-t border-stone-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customMsg.trim()) {
                      handleSendToWhatsApp(customMsg);
                    }
                  }}
                  className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => handleSendToWhatsApp(customMsg || "Hello Kings Hotel, I would like to inquire about accommodation.")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-colors shrink-0"
                  aria-label="Send via WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Direct Call Alternative */}
            <div className="flex items-center justify-between pt-2 text-[10px] text-stone-400">
              <span>Or call directly:</span>
              <a
                href={`tel:${HOTEL_INFO.phonePrimary}`}
                className="text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{HOTEL_INFO.phonePrimary}</span>
              </a>
            </div>

          </div>

        </div>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-2 border-emerald-400/30"
        aria-label="Open WhatsApp Concierge"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-emerald-600" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-xs font-bold block leading-tight">Kings Hotel WhatsApp</span>
          <span className="text-[10px] text-emerald-100 block leading-tight font-medium">Chat with Front Desk (24/7)</span>
        </div>
      </button>

    </div>
  );
};
