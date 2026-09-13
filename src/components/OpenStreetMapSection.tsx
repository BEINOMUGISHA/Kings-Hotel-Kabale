import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Copy, 
  Check, 
  Compass, 
  Phone, 
  Clock, 
  Star, 
  Car, 
  Layers, 
  Map as MapIcon, 
  Maximize2, 
  RotateCcw, 
  Eye, 
  Info,
  ShieldCheck,
  Mountain
} from 'lucide-react';
import { HOTEL_INFO, NEARBY_POINTS_OF_INTEREST, HOTEL_IMAGES } from '../data/hotelData';
import { NearbyPointOfInterest } from '../types';

type TileProviderId = 'carto_voyager' | 'osm_standard' | 'topo' | 'satellite';

interface TileProvider {
  id: TileProviderId;
  name: string;
  url: string;
  attribution: string;
  maxZoom: number;
  subdomains?: string[];
}

const TILE_PROVIDERS: TileProvider[] = [
  {
    id: 'carto_voyager',
    name: 'Voyager (Clean)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c', 'd'],
  },
  {
    id: 'osm_standard',
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c'],
  },
  {
    id: 'topo',
    name: 'Topographic (Hills)',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OSM</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    maxZoom: 17,
    subdomains: ['a', 'b', 'c'],
  },
  {
    id: 'satellite',
    name: 'Satellite (Aerial)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  },
];

export const OpenStreetMapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const circlesLayerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const [activeTab, setActiveTab] = useState<'map' | 'points' | 'streetview'>('map');
  const [activeTileId, setActiveTileId] = useState<TileProviderId>('carto_voyager');
  const [selectedPoi, setSelectedPoi] = useState<NearbyPointOfInterest | null>(null);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [showRadiusCircles, setShowRadiusCircles] = useState(false);

  const hotelCoords: [number, number] = [HOTEL_INFO.coordinates.lat, HOTEL_INFO.coordinates.lng];

  // Initialize and manage Leaflet map instance
  useEffect(() => {
    if (activeTab !== 'map' || !mapContainerRef.current) return;

    // Destroy existing instance if container changed or remounting
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: hotelCoords,
      zoom: 14,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false, // Prevents unintended page-scroll trap on mobile
    });

    mapInstanceRef.current = map;

    // Custom zoom control positioned at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial Tile Layer
    const selectedProvider = TILE_PROVIDERS.find((p) => p.id === activeTileId) || TILE_PROVIDERS[0];
    const initialTileLayer = L.tileLayer(selectedProvider.url, {
      attribution: selectedProvider.attribution,
      maxZoom: selectedProvider.maxZoom,
      subdomains: selectedProvider.subdomains || 'abc',
    }).addTo(map);
    tileLayerRef.current = initialTileLayer;

    // Initialize Radius / Exploration Circles LayerGroup
    const circlesLayer = L.layerGroup();
    circlesLayerRef.current = circlesLayer;

    // 1.0 km Kabale Town walking proximity circle
    L.circle(hotelCoords, {
      radius: 1000,
      color: '#f59e0b',
      fillColor: '#f59e0b',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '4, 6',
    }).bindTooltip('1 km Walkable Town Vicinity', { direction: 'top', className: 'text-xs' }).addTo(circlesLayer);

    // 12.0 km Lake Bunyonyi scenic driving radius
    L.circle(hotelCoords, {
      radius: 12000,
      color: '#06b6d4',
      fillColor: '#06b6d4',
      fillOpacity: 0.04,
      weight: 1.5,
      dashArray: '6, 8',
    }).bindTooltip('12 km Lake Bunyonyi Excursion Radius', { direction: 'top', className: 'text-xs' }).addTo(circlesLayer);

    // Clear marker references
    markersRef.current.clear();

    // ==========================================
    // 1. KINGS HOTEL CUSTOM PULSING GOLD MARKER
    // ==========================================
    const hotelIcon = L.divIcon({
      className: 'custom-hotel-marker',
      html: `
        <div class="relative flex flex-col items-center group cursor-pointer" style="transform: translate(-50%, -100%);">
          <!-- Outer Pulsing Glow Aura -->
          <div class="absolute -top-1 w-12 h-12 bg-amber-500/30 rounded-full animate-ping pointer-events-none"></div>
          
          <!-- Marker Badge -->
          <div class="relative z-10 w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-2xl shadow-amber-500/60 border-2 border-stone-900 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
            <div class="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-amber-400 font-bold text-lg">
              👑
            </div>
          </div>

          <!-- Bottom Pointed Arrow -->
          <div class="w-2.5 h-2.5 bg-amber-500 transform rotate-45 -mt-1.5 z-0 border-r border-b border-stone-900"></div>

          <!-- Permanent Label Pill -->
          <div class="mt-1 px-2.5 py-0.5 rounded-full bg-stone-950/95 border border-amber-500/50 shadow-xl backdrop-blur-sm whitespace-nowrap">
            <span class="text-[11px] font-bold text-amber-300 flex items-center gap-1 tracking-tight">
              Kings Hotel Kabale
            </span>
          </div>
        </div>
      `,
      iconSize: [44, 52],
      iconAnchor: [22, 48],
      popupAnchor: [0, -48],
    });

    const hotelPopupContent = `
      <div class="w-72 bg-stone-950 text-stone-100 rounded-2xl overflow-hidden font-sans">
        <div class="relative h-32 w-full overflow-hidden bg-stone-900">
          <img src="${HOTEL_IMAGES.facade}" alt="Kings Hotel Kabale" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
          <div class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-500/30">
            👑 Kings Hotel Kabale
          </div>
          <div class="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
            <span class="text-amber-400 font-bold font-mono">★ 4.2 Google Reviews</span>
            <span class="text-emerald-400 font-semibold text-[11px]">Open 24/7</span>
          </div>
        </div>
        <div class="p-3.5 space-y-2.5">
          <div>
            <p class="text-[11px] text-stone-400 font-medium">Kigongi, Kabale Municipality, Uganda</p>
            <p class="text-xs text-stone-200 mt-0.5 leading-snug">Comfortable accommodation, restaurant, solar hot showers, and Lake Bunyonyi safari gateway.</p>
          </div>
          <div class="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
            <a 
              href="${HOTEL_INFO.googleDirectionsUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex-1 text-center bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>🧭 Directions</span>
            </a>
            <a 
              href="tel:${HOTEL_INFO.phonePrimary}"
              class="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold py-1.5 px-3 rounded-lg border border-stone-700 transition-colors"
            >
              📞 Call
            </a>
          </div>
        </div>
      </div>
    `;

    const hotelMarker = L.marker(hotelCoords, { icon: hotelIcon })
      .bindPopup(hotelPopupContent, { maxWidth: 320, className: 'custom-leaflet-popup' })
      .addTo(map);

    markersRef.current.set('hotel', hotelMarker);

    // ==========================================
    // 2. NEARBY POI CUSTOM MARKERS
    // ==========================================
    NEARBY_POINTS_OF_INTEREST.forEach((poi) => {
      // Color-coding and icons based on category
      const isBunyonyi = poi.id === 'lake-bunyonyi';
      const isBwindi = poi.id === 'bwindi-gorillas';
      const isMarket = poi.id === 'kabale-market';
      const isBorder = poi.id === 'katuna-border';

      let emoji = '📍';
      let bgColor = 'from-blue-500 to-blue-600';
      let textColor = 'text-blue-400';
      let borderColor = 'border-blue-400/40';

      if (isBunyonyi) {
        emoji = '🛶';
        bgColor = 'from-cyan-500 to-teal-600';
        textColor = 'text-cyan-300';
        borderColor = 'border-cyan-400/50';
      } else if (isBwindi) {
        emoji = '🦍';
        bgColor = 'from-emerald-500 to-green-700';
        textColor = 'text-emerald-300';
        borderColor = 'border-emerald-400/50';
      } else if (isMarket) {
        emoji = '🛒';
        bgColor = 'from-amber-500 to-orange-600';
        textColor = 'text-amber-300';
        borderColor = 'border-amber-400/50';
      } else if (isBorder) {
        emoji = '🛂';
        bgColor = 'from-indigo-500 to-purple-600';
        textColor = 'text-indigo-300';
        borderColor = 'border-indigo-400/50';
      }

      const poiIcon = L.divIcon({
        className: 'custom-poi-marker',
        html: `
          <div class="flex flex-col items-center group cursor-pointer" style="transform: translate(-50%, -100%);">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br ${bgColor} p-0.5 shadow-lg border border-stone-900 flex items-center justify-center transform transition-transform duration-200 group-hover:scale-110">
              <div class="w-full h-full bg-stone-900/90 rounded-[10px] flex items-center justify-center text-sm">
                ${emoji}
              </div>
            </div>
            <div class="w-2 h-2 bg-stone-900 transform rotate-45 -mt-1 z-0"></div>
            <div class="mt-0.5 px-2 py-0.5 rounded-full bg-stone-900/90 border ${borderColor} shadow-md whitespace-nowrap">
              <span class="text-[10px] font-bold ${textColor}">
                ${poi.name.split(' ')[0]} (${poi.distance})
              </span>
            </div>
          </div>
        `,
        iconSize: [32, 40],
        iconAnchor: [16, 36],
        popupAnchor: [0, -36],
      });

      const poiPopupContent = `
        <div class="w-64 bg-stone-950 text-stone-100 rounded-xl p-3.5 font-sans">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-base">${emoji}</span>
            <h4 class="font-bold text-xs text-white">${poi.name}</h4>
          </div>
          <div class="text-[11px] font-semibold text-amber-400 mb-2">
            ${poi.distance} • ${poi.driveTime} from Kings Hotel
          </div>
          <p class="text-xs text-stone-300 leading-relaxed">${poi.description}</p>
          <div class="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
            <span class="text-stone-400">${poi.category}</span>
            <a 
              href="https://www.google.com/maps/dir/?api=1&origin=-1.250556,29.988056&destination=${poi.lat},${poi.lng}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-0.5"
            >
              <span>Navigate →</span>
            </a>
          </div>
        </div>
      `;

      const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon })
        .bindPopup(poiPopupContent, { maxWidth: 280, className: 'custom-leaflet-popup' })
        .addTo(map);

      marker.on('click', () => {
        setSelectedPoi(poi);
      });

      markersRef.current.set(poi.id, marker);
    });

    // Invalidate map size after short tick to ensure container fills layout smoothly
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [activeTab]);

  // Handle tile layer change
  const handleTileChange = (providerId: TileProviderId) => {
    setActiveTileId(providerId);
    if (!mapInstanceRef.current) return;

    const provider = TILE_PROVIDERS.find((p) => p.id === providerId);
    if (!provider) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newLayer = L.tileLayer(provider.url, {
      attribution: provider.attribution,
      maxZoom: provider.maxZoom,
      subdomains: provider.subdomains || 'abc',
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  };

  // Toggle Exploration / Radius circles
  const handleToggleRadius = () => {
    const nextState = !showRadiusCircles;
    setShowRadiusCircles(nextState);

    if (!mapInstanceRef.current || !circlesLayerRef.current) return;

    if (nextState) {
      circlesLayerRef.current.addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.removeLayer(circlesLayerRef.current);
    }
  };

  // Recenter map on Kings Hotel
  const handleRecenterHotel = () => {
    setSelectedPoi(null);
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(hotelCoords, 14, { duration: 1.2 });
    const hotelMarker = markersRef.current.get('hotel');
    if (hotelMarker) {
      hotelMarker.openPopup();
    }
  };

  // Fly to specific POI
  const handleFlyToPoi = (poi: NearbyPointOfInterest) => {
    setSelectedPoi(poi);
    if (activeTab !== 'map') {
      setActiveTab('map');
    }
    setTimeout(() => {
      if (!mapInstanceRef.current) return;
      mapInstanceRef.current.flyTo([poi.lat, poi.lng], 13, { duration: 1.2 });
      const marker = markersRef.current.get(poi.id);
      if (marker) {
        marker.openPopup();
      }
    }, 100);
  };

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(HOTEL_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2500);
  };

  const openStreetMapWebUrl = `https://www.openstreetmap.org/?mlat=${HOTEL_INFO.coordinates.lat}&mlon=${HOTEL_INFO.coordinates.lng}#map=16/${HOTEL_INFO.coordinates.lat}/${HOTEL_INFO.coordinates.lng}`;

  return (
    <section id="location" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            OpenStreetMap & Live Leaflet Navigation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Find Us in Kigongi, Kabale
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Conveniently situated just off the main Kabale-Mbarara Road opposite the Police Barracks. Free and open-source interactive OpenStreetMap with terrain topography, local transit times, and turn-by-turn routing to Lake Bunyonyi and Bwindi Gorillas.
          </p>
        </div>

        {/* Navigation & Exploration Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { setActiveTab('map'); setSelectedPoi(null); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'map' 
                  ? 'bg-amber-500 text-stone-950 shadow-md' 
                  : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-750'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              Interactive OpenStreetMap
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('points')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'points' 
                  ? 'bg-amber-500 text-stone-950 shadow-md' 
                  : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-750'
              }`}
            >
              <Compass className="w-4 h-4" />
              Nearby Excursions & Distances
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('streetview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'streetview' 
                  ? 'bg-amber-500 text-stone-950 shadow-md' 
                  : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-750'
              }`}
            >
              <Layers className="w-4 h-4" />
              Street & Entrance Guide
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={HOTEL_INFO.googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Turn-by-Turn GPS Directions</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Main Grid: Leaflet Map Viewer (Left 7 Cols) + Intelligence Card (Right 5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Viewer / Embed Container */}
          <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Map Top Bar */}
            <div className="bg-stone-900/95 px-4 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-white">Kings Hotel Kabale</span>
                <span className="text-stone-400 hidden sm:inline">• Lat: {HOTEL_INFO.coordinates.lat}, Lng: {HOTEL_INFO.coordinates.lng}</span>
              </div>

              {/* Layer switchers & Actions */}
              <div className="flex items-center gap-2">
                {/* Tile Selector */}
                {activeTab === 'map' && (
                  <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700 text-[11px]">
                    {TILE_PROVIDERS.map((provider) => (
                      <button
                        key={provider.id}
                        type="button"
                        onClick={() => handleTileChange(provider.id)}
                        className={`px-2 py-1 rounded transition-colors font-medium ${
                          activeTileId === provider.id
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                        title={provider.name}
                      >
                        {provider.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCopyPlusCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                  title="Copy Google Plus Code"
                >
                  {copiedPlusCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                  <span className="font-mono">{HOTEL_INFO.plusCode}</span>
                </button>
              </div>
            </div>

            {/* Interactive Map Surface */}
            <div className="relative w-full h-[460px] sm:h-[520px] bg-stone-950 overflow-hidden">
              
              {activeTab === 'streetview' ? (
                /* Street & Entrance Visual Gallery */
                <div className="relative w-full h-full flex flex-col md:flex-row">
                  <div className="relative flex-1 h-1/2 md:h-full overflow-hidden group">
                    <img
                      src={HOTEL_IMAGES.streetView}
                      alt="Kings Hotel Kabale Real Street View & Entrance Gate"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        Gated Entrance
                      </span>
                      <h4 className="font-serif text-base font-bold mt-1 text-white">Kigongi Road Security Gate</h4>
                      <p className="text-xs text-stone-300 mt-0.5">Directly opposite Kabale Police Barracks with 24/7 security guard and enclosed walled compound.</p>
                      <a
                        href={openStreetMapWebUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline mt-2 font-semibold"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Inspect on OpenStreetMap</span>
                      </a>
                    </div>
                  </div>
                  <div className="relative flex-1 h-1/2 md:h-full overflow-hidden group border-t md:border-t-0 md:border-l border-stone-800">
                    <img
                      src={HOTEL_IMAGES.facade}
                      alt="Kings Hotel Kabale Building Facade"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        Main Facade
                      </span>
                      <h4 className="font-serif text-base font-bold mt-1 text-white">Multi-Storey Hotel & Balconies</h4>
                      <p className="text-xs text-stone-300 mt-0.5">50 en-suite guestrooms, restaurant terrace, and mountain views across the Kabale valley.</p>
                      <a
                        href={HOTEL_INFO.googleDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline mt-2 font-semibold"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Navigate to Hotel</span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'points' ? (
                /* Excursions & POI Interactive Cards */
                <div className="w-full h-full p-6 overflow-y-auto bg-stone-950 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">Nearby Landmarks & Transit Points</h3>
                      <p className="text-xs text-stone-400">Click any destination to fly to its coordinates on the live OpenStreetMap.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('map')}
                      className="text-xs bg-amber-500 text-stone-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-amber-400 transition-colors"
                    >
                      <MapIcon className="w-3.5 h-3.5" />
                      <span>Back to Map</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {NEARBY_POINTS_OF_INTEREST.map((poi) => (
                      <div
                        key={poi.id}
                        className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 p-4 rounded-xl transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                              {poi.name}
                            </h4>
                            <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                              {poi.distance}
                            </span>
                          </div>
                          <p className="text-[11px] text-emerald-400 font-medium mt-1">
                            {poi.driveTime} from Kings Hotel
                          </p>
                          <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                            {poi.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                          <span className="text-[10px] text-stone-500">{poi.category}</span>
                          <button
                            type="button"
                            onClick={() => handleFlyToPoi(poi)}
                            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                          >
                            <Compass className="w-3.5 h-3.5" />
                            <span>Fly to Location</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Live OpenStreetMap Leaflet Canvas */
                <div className="relative w-full h-full">
                  <div ref={mapContainerRef} className="w-full h-full" />

                  {/* Floating Action Controls on Top-Left of Map */}
                  <div className="absolute top-3 left-3 z-[25] flex flex-col gap-2">
                    {/* Recenter button */}
                    <button
                      type="button"
                      onClick={handleRecenterHotel}
                      className="bg-stone-900/90 hover:bg-stone-800 text-white p-2 rounded-xl shadow-lg border border-stone-700 backdrop-blur-md transition-transform active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
                      title="Recenter on Kings Hotel"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Recenter Hotel</span>
                    </button>

                    {/* Toggle Exploration Radii */}
                    <button
                      type="button"
                      onClick={handleToggleRadius}
                      className={`p-2 rounded-xl shadow-lg border backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-semibold ${
                        showRadiusCircles
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                          : 'bg-stone-900/90 text-stone-300 hover:text-white border-stone-700'
                      }`}
                      title="Toggle 1km & 12km exploration radius"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{showRadiusCircles ? 'Hide Radii' : 'Show Radii'}</span>
                    </button>
                  </div>

                  {/* OpenStreetMap Floating Badge */}
                  <div className="absolute bottom-3 left-3 z-[25] bg-stone-950/90 backdrop-blur-md border border-stone-800 px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2 text-[11px] text-stone-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>OpenStreetMap Leaflet Engine</span>
                    <a
                      href={openStreetMapWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-0.5 ml-1"
                    >
                      <span>OSM.org</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Quick-Jump POI Ribbon */}
            <div className="bg-stone-900 p-3 border-t border-stone-800 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
              <span className="text-stone-400 whitespace-nowrap font-medium text-[11px]">Quick Distances:</span>
              {NEARBY_POINTS_OF_INTEREST.map((poi) => (
                <button
                  key={poi.id}
                  type="button"
                  onClick={() => handleFlyToPoi(poi)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedPoi?.id === poi.id 
                      ? 'bg-amber-500 text-stone-950 font-bold shadow' 
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  <span>{poi.name.split(' ')[0]}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 font-mono">{poi.distance}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Place Intelligence & Contact Profile (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Verified Place Profile Card */}
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6 shadow-xl relative">
              
              {/* Top OpenStreetMap & Hospitality Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Verified Location
                    </span>
                    <span className="text-[10px] font-medium text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                      Alt: ~1,870m
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Kings Hotel Kabale</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Accommodation • Restaurant • Conference Centre</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center justify-end gap-1 text-amber-400">
                    <Star className="w-5 h-5 fill-amber-400" />
                    <span className="text-xl font-bold font-mono">4.2</span>
                  </div>
                  <p className="text-[11px] text-stone-400">154+ Verified reviews</p>
                </div>
              </div>

              {/* Verified Details Checklist */}
              <div className="space-y-3.5 text-xs text-stone-300 border-t border-stone-800/80 pt-4">
                
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block text-[11px]">Physical Address:</span>
                    <span className="font-medium text-stone-200">
                      Off Kabale-Mbarara Road, Opposite Police Barracks, Kigongi, Kabale Municipality, Southwestern Uganda
                    </span>
                  </div>
                </div>

                {/* Telephone Numbers */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block text-[11px]">Direct Front Desk Phones:</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-0.5">
                      <a href={`tel:${HOTEL_INFO.phonePrimary}`} className="text-amber-400 hover:underline font-mono font-medium">
                        {HOTEL_INFO.phonePrimary}
                      </a>
                      <a href={`tel:${HOTEL_INFO.phoneSecondary}`} className="text-stone-300 hover:underline font-mono">
                        {HOTEL_INFO.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Front Desk & Check-in Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block text-[11px]">Reception & Hospitality Hours:</span>
                    <span className="text-stone-200 font-medium">24 Hours Front Desk • Check-in: 12:00 PM • Check-out: 10:00 AM</span>
                  </div>
                </div>

                {/* OpenStreetMap Coordinates & Plus Code */}
                <div className="flex items-start gap-3">
                  <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-stone-400 block text-[11px]">GPS Coordinates & Plus Code:</span>
                    <div className="flex items-center justify-between mt-0.5">
                      <code className="text-amber-300 font-mono bg-stone-900 px-2 py-0.5 rounded border border-stone-800 text-[11px]">
                        -1.250556, 29.988056 ({HOTEL_INFO.plusCode})
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyPlusCode}
                        className="text-[11px] text-stone-400 hover:text-white underline ml-2"
                      >
                        {copiedPlusCode ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Direct GPS Action Buttons */}
              <div className="mt-6 pt-4 border-t border-stone-800 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={HOTEL_INFO.googleDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Turn-by-Turn GPS Directions</span>
                </a>
                <a
                  href={openStreetMapWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>OpenStreetMap</span>
                </a>
              </div>

            </div>

            {/* Travel Time & Proximity Guide */}
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 shadow-lg">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-3">
                <Car className="w-4 h-4" />
                Transit Distances from Kings Hotel
              </h4>
              <div className="space-y-2.5 text-xs">
                
                <div 
                  onClick={() => handleFlyToPoi(NEARBY_POINTS_OF_INTEREST[0])}
                  className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60 hover:bg-stone-800/80 border border-stone-800/60 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-semibold text-white flex items-center gap-1">
                      <span>Lake Bunyonyi (Canoes & 29 Islands)</span>
                    </p>
                    <p className="text-[11px] text-stone-400">Africa's 2nd deepest lake • bilharzia-free</p>
                  </div>
                  <span className="text-amber-400 font-bold font-mono">11.8 km (15 mins)</span>
                </div>

                <div 
                  onClick={() => handleFlyToPoi(NEARBY_POINTS_OF_INTEREST[1])}
                  className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60 hover:bg-stone-800/80 border border-stone-800/60 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-semibold text-white">Kabale Central Market & Town</p>
                    <p className="text-[11px] text-stone-400">Shopping, banks, craft markets, pharmacies</p>
                  </div>
                  <span className="text-amber-400 font-bold font-mono">800 m (3 mins)</span>
                </div>

                <div 
                  onClick={() => handleFlyToPoi(NEARBY_POINTS_OF_INTEREST[2])}
                  className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60 hover:bg-stone-800/80 border border-stone-800/60 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-semibold text-white flex items-center gap-1">
                      <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Bwindi Gorillas (Ruhija Gate)</span>
                    </p>
                    <p className="text-[11px] text-stone-400">Mountain Gorilla Tracking Base</p>
                  </div>
                  <span className="text-amber-400 font-bold font-mono">48 km (1.5 hrs)</span>
                </div>

                <div 
                  onClick={() => handleFlyToPoi(NEARBY_POINTS_OF_INTEREST[4])}
                  className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60 hover:bg-stone-800/80 border border-stone-800/60 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-semibold text-white">Katuna Rwanda Border (Gatuna)</p>
                    <p className="text-[11px] text-stone-400">Direct highway link to Kigali</p>
                  </div>
                  <span className="text-amber-400 font-bold font-mono">22 km (25 mins)</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

// Re-export as GoogleMapsSection for backward compatibility with existing imports
export const GoogleMapsSection = OpenStreetMapSection;
