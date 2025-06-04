import React, { useRef, useEffect, useState } from 'react';
import MapGL, { Marker, Layer, Source, NavigationControl, MapRef, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { MapPin, Navigation } from 'lucide-react';
import { DEFAULT_MAP_CENTER, DEFAULT_ZOOM, MAP_STYLE, ROUTE_COLORS, AQI_LEVELS } from '../config';
import { Coordinates, Location, RouteWithPollution } from '../types';
import mapboxService from '../services/mapboxService';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  origin: Location | null;
  destination: Location | null;
  routes: RouteWithPollution[];
  selectedRouteId: string | null;
  onMapClick?: (coordinates: Coordinates) => void;
  onRouteSelect?: (routeId: string) => void;
}

const Map: React.FC<MapProps> = ({
  origin,
  destination,
  routes,
  selectedRouteId,
  onMapClick,
  onRouteSelect
}) => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<{
    coordinates: Coordinates;
    aqi: number;
    components: any;
  } | null>(null);

  const [viewport, setViewport] = useState({
    latitude: DEFAULT_MAP_CENTER.lat,
    longitude: DEFAULT_MAP_CENTER.lng,
    zoom: DEFAULT_ZOOM,
  });

  useEffect(() => {
    if (origin && destination) {
      fitMapToMarkers();
    } else if (origin) {
      setViewport({
        ...viewport,
        latitude: origin.coordinates.lat,
        longitude: origin.coordinates.lng,
        zoom: 13,
      });
    } else if (destination) {
      setViewport({
        ...viewport,
        latitude: destination.coordinates.lat,
        longitude: destination.coordinates.lng,
        zoom: 13,
      });
    }
  }, [origin, destination]);

  const fitMapToMarkers = () => {
    if (!origin || !destination || !mapRef.current) return;

    try {
      const bounds = new mapboxgl.LngLatBounds()
        .extend([origin.coordinates.lng, origin.coordinates.lat])
        .extend([destination.coordinates.lng, destination.coordinates.lat]);

      // Also extend bounds with route points if available
      if (routes.length > 0 && selectedRouteId) {
        const selectedRoute = routes.find(r => r.id === selectedRouteId);
        if (selectedRoute) {
          const coordinates = mapboxService.decodePolyline(selectedRoute.geometry);
          coordinates.forEach(coord => {
            bounds.extend([coord.lng, coord.lat]);
          });
        }
      }

      mapRef.current.fitBounds(bounds, {
        padding: 100,
        duration: 1000
      });
    } catch (error) {
      console.error('Error fitting map to markers:', error);
    }
  };

  const handleMapClick = (event: mapboxgl.MapLayerMouseEvent) => {
    if (onMapClick) {
      onMapClick({
        lat: event.lngLat.lat,
        lng: event.lngLat.lng
      });
    }
  };

  const handleRouteClick = (routeId: string) => {
    if (onRouteSelect) {
      onRouteSelect(routeId);
    }
  };

  const getAqiColor = (aqi: number) => {
    return AQI_LEVELS[aqi as keyof typeof AQI_LEVELS]?.color || '#gray';
  };

  return (
    <div className="h-full w-full relative">
      <MapGL
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        initialViewState={viewport}
        mapStyle={MAP_STYLE}
        onClick={handleMapClick}
        attributionControl={false}
      >
        <NavigationControl position="top-right" />

        {/* Render Routes */}
        {routes.map((route, idx) => {
          const isSelected = route.id === selectedRouteId;
          const routeColor = isSelected ? ROUTE_COLORS[0] : ROUTE_COLORS[idx % ROUTE_COLORS.length];
          
          // Decode the polyline to get coordinates
          const coordinates = mapboxService.decodePolyline(route.geometry);
          
          // Create a GeoJSON object for the route
          const routeGeoJson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coordinates.map(coord => [coord.lng, coord.lat])
            }
          };

          return (
            <React.Fragment key={route.id}>
              <Source
                id={`route-${route.id}`}
                type="geojson"
                data={routeGeoJson as any}
              >
                <Layer
                  id={`route-${route.id}-outline`}
                  type="line"
                  paint={{
                    'line-color': '#000',
                    'line-width': isSelected ? 6 : 4,
                    'line-opacity': isSelected ? 0.8 : 0.5
                  }}
                  layout={{
                    'line-join': 'round',
                    'line-cap': 'round'
                  }}
                  onClick={() => handleRouteClick(route.id)}
                />
                <Layer
                  id={`route-${route.id}-line`}
                  type="line"
                  paint={{
                    'line-color': routeColor,
                    'line-width': isSelected ? 4 : 2,
                    'line-opacity': isSelected ? 1 : 0.7
                  }}
                  layout={{
                    'line-join': 'round',
                    'line-cap': 'round'
                  }}
                  onClick={() => handleRouteClick(route.id)}
                />
              </Source>

              {isSelected && route.pollutionData.segments.map((segment, segIdx) => (
                <Marker 
                  key={`segment-${route.id}-${segIdx}`}
                  longitude={segment.coordinates.lng} 
                  latitude={segment.coordinates.lat}
                  anchor="center"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo({
                      coordinates: segment.coordinates,
                      aqi: segment.aqi,
                      components: segment.pollutionData.components
                    });
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full border-2 border-white cursor-pointer transition-all"
                    style={{ backgroundColor: getAqiColor(segment.aqi) }}
                  />
                </Marker>
              ))}
            </React.Fragment>
          );
        })}

        {/* Origin Marker */}
        {origin && (
          <Marker
            longitude={origin.coordinates.lng}
            latitude={origin.coordinates.lat}
            anchor="bottom"
          >
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-blue-600" />
              <div className="bg-white text-xs px-2 py-1 rounded shadow-md -mt-1">
                {origin.name}
              </div>
            </div>
          </Marker>
        )}

        {/* Destination Marker */}
        {destination && (
          <Marker
            longitude={destination.coordinates.lng}
            latitude={destination.coordinates.lat}
            anchor="bottom"
          >
            <div className="flex flex-col items-center">
              <Navigation className="w-8 h-8 text-red-600" />
              <div className="bg-white text-xs px-2 py-1 rounded shadow-md -mt-1">
                {destination.name}
              </div>
            </div>
          </Marker>
        )}

        {/* Popup for AQI information */}
        {popupInfo && (
          <Popup
            longitude={popupInfo.coordinates.lng}
            latitude={popupInfo.coordinates.lat}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className="z-50"
          >
            <div className="p-2 max-w-[200px]">
              <h3 className="font-bold text-sm mb-1">Air Quality Index: {popupInfo.aqi}</h3>
              <p className="text-xs mb-2" style={{ color: getAqiColor(popupInfo.aqi) }}>
                {AQI_LEVELS[popupInfo.aqi as keyof typeof AQI_LEVELS]?.level}
              </p>
              <div className="text-xs space-y-1">
                <div>PM2.5: {popupInfo.components.pm2_5.toFixed(2)} µg/m³</div>
                <div>PM10: {popupInfo.components.pm10.toFixed(2)} µg/m³</div>
                <div>NO₂: {popupInfo.components.no2.toFixed(2)} µg/m³</div>
              </div>
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
};

export default Map;