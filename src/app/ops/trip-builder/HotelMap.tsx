'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapHotel {
  id: string;
  name: string;
  lat: number;
  lon: number;
  priceLabel: string;
  selected: boolean;
}

export interface OsmPick {
  name: string;
  lat: number;
  lon: number;
  website?: string;
  kind?: string;
}

interface HotelMapProps {
  hotels: MapHotel[];
  onSelectHotel: (id: string) => void;
  onPickOsmHotel: (pick: OsmPick) => void;
}

// Free tile providers (attribution required, shown on-map).
const TILE_STYLES: Record<string, { url: string; attribution: string; maxZoom: number }> = {
  'OpenStreetMap': {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  },
  'Topo (relief)': {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors, SRTM · © OpenTopoMap (CC-BY-SA)',
    maxZoom: 17,
  },
  'Light (CARTO)': {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap contributors · © CARTO',
    maxZoom: 20,
  },
  'Dark (CARTO)': {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap contributors · © CARTO',
    maxZoom: 20,
  },
  'Satellite (Esri)': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Imagery © Esri & contributors',
    maxZoom: 19,
  },
};

const OVERPASS = 'https://overpass-api.de/api/interpreter';

export default function HotelMap({ hotels, onSelectHotel, onPickOsmHotel }: HotelMapProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const curatedLayerRef = useRef<L.LayerGroup | null>(null);
  const osmLayerRef = useRef<L.LayerGroup | null>(null);
  const seenOsmIds = useRef<Set<number>>(new Set());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cbRef = useRef({ onSelectHotel, onPickOsmHotel });
  cbRef.current = { onSelectHotel, onPickOsmHotel };

  const [style, setStyle] = useState<keyof typeof TILE_STYLES>('OpenStreetMap');
  const [osmCount, setOsmCount] = useState(0);
  const [loadingOsm, setLoadingOsm] = useState(false);

  /* init map once */
  useEffect(() => {
    if (!divRef.current || mapRef.current) return;
    const map = L.map(divRef.current, {
      center: [45.2975, 6.5795],
      zoom: 15,
      scrollWheelZoom: true,
    });
    mapRef.current = map;
    const t = TILE_STYLES['OpenStreetMap'];
    tileRef.current = L.tileLayer(t.url, { attribution: t.attribution, maxZoom: t.maxZoom }).addTo(map);
    curatedLayerRef.current = L.layerGroup().addTo(map);
    osmLayerRef.current = L.layerGroup().addTo(map);

    const loadOsm = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        if (map.getZoom() < 12) return; // too wide — Overpass would explode
        const b = map.getBounds();
        const bbox = `${b.getSouth()},${b.getWest()},${b.getNorth()},${b.getEast()}`;
        const q = `[out:json][timeout:15];(
          node["tourism"~"hotel|hostel|guest_house|apartment|chalet"](${bbox});
          way["tourism"~"hotel|hostel|guest_house|apartment|chalet"](${bbox});
        );out center 80;`;
        setLoadingOsm(true);
        try {
          const res = await fetch(`${OVERPASS}?data=${encodeURIComponent(q)}`);
          if (!res.ok) return;
          const json = await res.json();
          for (const el of json.elements ?? []) {
            if (seenOsmIds.current.has(el.id)) continue;
            seenOsmIds.current.add(el.id);
            const lat = el.lat ?? el.center?.lat;
            const lon = el.lon ?? el.center?.lon;
            if (lat == null || lon == null) continue;
            const tags = el.tags ?? {};
            const name: string = tags.name ?? 'Unnamed accommodation';
            const website: string | undefined =
              tags.website ?? tags['contact:website'] ?? undefined;
            const kind: string = tags.tourism ?? 'hotel';
            const stars: string = tags.stars ? ` · ${tags.stars}★` : '';

            const marker = L.marker([lat, lon], {
              icon: L.divIcon({
                className: '',
                html: `<div style="width:12px;height:12px;border-radius:9999px;background:#64748b;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6],
              }),
            });
            const popup = document.createElement('div');
            popup.style.cssText = 'font-size:13px;min-width:180px';
            popup.innerHTML = `<b>${name}</b><br><span style="color:#6e6e73">${kind}${stars}</span><br>` +
              (website ? `<a href="${website}" target="_blank" rel="noreferrer" style="color:#4f46e5">website ↗</a><br>` : '');
            const btn = document.createElement('button');
            btn.textContent = 'Use this hotel →';
            btn.style.cssText =
              'margin-top:6px;background:#4f46e5;color:#fff;border:none;border-radius:9999px;padding:5px 12px;font-size:12px;cursor:pointer';
            btn.onclick = () => cbRef.current.onPickOsmHotel({ name, lat, lon, website, kind });
            popup.appendChild(btn);
            marker.bindPopup(popup);
            osmLayerRef.current?.addLayer(marker);
          }
          setOsmCount(seenOsmIds.current.size);
        } catch {
          /* Overpass hiccup — try again on next move */
        } finally {
          setLoadingOsm(false);
        }
      }, 700);
    };

    map.on('moveend', loadOsm);
    loadOsm(); // initial load

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* switch tile style */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    tileRef.current?.remove();
    const t = TILE_STYLES[style];
    tileRef.current = L.tileLayer(t.url, { attribution: t.attribution, maxZoom: t.maxZoom }).addTo(map);
  }, [style]);

  /* curated hotel markers (price chips) */
  useEffect(() => {
    const layer = curatedLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    for (const h of hotels) {
      const marker = L.marker([h.lat, h.lon], {
        zIndexOffset: 1000,
        icon: L.divIcon({
          className: '',
          html: `<div style="transform:translate(-50%,-100%);white-space:nowrap;background:${h.selected ? '#4f46e5' : '#ffffff'};color:${h.selected ? '#ffffff' : '#1d1d1f'};border:1.5px solid ${h.selected ? '#4f46e5' : 'rgba(0,0,0,.18)'};border-radius:9999px;padding:4px 10px;font-size:12px;font-weight:600;box-shadow:0 4px 14px rgba(0,0,0,.25)">${h.name} · ${h.priceLabel}</div>`,
          iconSize: [0, 0],
        }),
      });
      marker.on('click', () => cbRef.current.onSelectHotel(h.id));
      layer.addLayer(marker);
    }
  }, [hotels]);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-4 py-2.5">
        <p className="text-sm font-semibold">
          🗺️ Hotels on the map
          <span className="ml-2 text-xs font-normal text-[#a1a1a6]">
            {loadingOsm ? 'loading area…' : `${osmCount} OSM properties loaded — pan to load more`}
          </span>
        </p>
        <label className="flex items-center gap-2 text-xs font-medium text-[#6e6e73]">
          Map style
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as keyof typeof TILE_STYLES)}
            className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm"
          >
            {Object.keys(TILE_STYLES).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <div ref={divRef} className="h-[420px] w-full" />
      <p className="border-t border-black/5 px-4 py-2 text-[11px] text-[#a1a1a6]">
        White chips: our priced catalog — click to select. Gray dots: live OpenStreetMap
        accommodations loaded for the visible area — click one and &ldquo;Use this hotel&rdquo; to
        take it as a custom option, then enter the negotiated price.
      </p>
    </div>
  );
}
