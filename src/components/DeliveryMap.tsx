import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DeliveryMapProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

export const DeliveryMap = ({ onLocationSelect }: DeliveryMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number; address: string} | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      zoom: 12,
      center: [-74.006, 40.7128], // Default to NYC
    });

    // Add click handler
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      
      // Remove existing marker
      if (marker.current) {
        marker.current.remove();
      }
      
      // Add new marker
      marker.current = new mapboxgl.Marker({
        color: '#ffffff'
      })
        .setLngLat([lng, lat])
        .addTo(map.current!);

      // Reverse geocoding to get address (simplified)
      const location = {
        lat,
        lng,
        address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` // Simplified address
      };
      
      setSelectedLocation(location);
      onLocationSelect(location);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, onLocationSelect]);

  return (
    <div className="space-y-4">
      {!mapboxToken ? (
        <div className="space-y-4">
          <Label htmlFor="mapbox-token">Enter your Mapbox Public Token</Label>
          <Input
            id="mapbox-token"
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="bg-input border-border"
          />
          <p className="text-sm text-muted-foreground">
            Get your token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="w-full h-64 rounded-lg border border-border" />
          {selectedLocation && (
            <div className="p-3 bg-accent rounded-lg">
              <p className="text-sm font-medium">Selected Location:</p>
              <p className="text-xs text-muted-foreground">{selectedLocation.address}</p>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Click on the map to select your delivery location
          </p>
        </>
      )}
    </div>
  );
};