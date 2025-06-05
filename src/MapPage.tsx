import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import { Location, RouteWithPollution } from './types';
import mapboxService from './services/mapboxService';
import weatherService from './services/weatherService';

function MapPage() {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [routes, setRoutes] = useState<RouteWithPollution[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOriginSelect = (location: Location) => {
    setOrigin(location);
  };

  const handleDestinationSelect = (location: Location) => {
    setDestination(location);
  };

  const handleRouteSelect = (routeId: string) => {
    setSelectedRouteId(routeId);
  };

  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleMapClick = (coordinates: { lat: number; lng: number }) => {
    // Implement map click functionality if needed
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!origin || !destination) {
        setRoutes([]);
        setSelectedRouteId(null);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch routes from MapBox
        const routesData = await mapboxService.getRoutes(
          origin.coordinates,
          destination.coordinates,
          true // Get alternative routes
        );

        if (routesData.length === 0) {
          setRoutes([]);
          setSelectedRouteId(null);
          return;
        }

        // Enhance routes with pollution data
        const enhancedRoutesPromises = routesData.map(route => 
          weatherService.enhanceRouteWithPollutionData(route)
        );

        const enhancedRoutes = await Promise.all(enhancedRoutesPromises);
        
        // Sort routes by duration (fastest first)
        enhancedRoutes.sort((a, b) => a.duration - b.duration);
        
        setRoutes(enhancedRoutes);
        setSelectedRouteId(enhancedRoutes[0].id);
      } catch (error) {
        console.error('Error fetching routes:', error);
        setRoutes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutes();
  }, [origin, destination]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-96 h-full max-h-screen z-10 md:block">
        <Sidebar
          origin={origin}
          destination={destination}
          routes={routes}
          selectedRouteId={selectedRouteId}
          isLoading={isLoading}
          onOriginSelect={handleOriginSelect}
          onDestinationSelect={handleDestinationSelect}
          onRouteSelect={handleRouteSelect}
          onSwapLocations={handleSwapLocations}
        />
      </div>

      {/* Map Container */}
      <div className="hidden md:block flex-grow h-full relative">
        <Map
          origin={origin}
          destination={destination}
          routes={routes}
          selectedRouteId={selectedRouteId}
          onMapClick={handleMapClick}
          onRouteSelect={handleRouteSelect}
        />
      </div>
      
      {/* Mobile Layout Toggle */}
      <div className="fixed bottom-4 right-4 md:hidden z-20">
        <button className="bg-white p-3 rounded-full shadow-lg">
          <span className="sr-only">Toggle Map</span>
          {/* Icon here */}
        </button>
      </div>
    </div>
  );
}

export default MapPage;