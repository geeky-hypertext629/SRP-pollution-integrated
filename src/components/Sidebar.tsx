import React from 'react';
import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import SearchBar from './SearchBar';
import RouteCard from './RouteCard';
import { Location, RouteWithPollution } from '../types';
import { AQI_LEVELS } from '../config';

interface SidebarProps {
  origin: Location | null;
  destination: Location | null;
  routes: RouteWithPollution[];
  selectedRouteId: string | null;
  isLoading: boolean;
  onOriginSelect: (location: Location) => void;
  onDestinationSelect: (location: Location) => void;
  onRouteSelect: (routeId: string) => void;
  onSwapLocations: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  origin,
  destination,
  routes,
  selectedRouteId,
  isLoading,
  onOriginSelect,
  onDestinationSelect,
  onRouteSelect,
  onSwapLocations,
}) => {
  // Calculate average pollution components for selected route
  const getAveragePollutants = (route: RouteWithPollution) => {
    const components = route.pollutionData.segments.reduce(
      (acc, segment) => {
        const pollutants = segment.pollutionData.components;
        Object.keys(pollutants).forEach(key => {
          acc[key] = (acc[key] || 0) + pollutants[key];
        });
        return acc;
      },
      {} as Record<string, number>
    );

    Object.keys(components).forEach(key => {
      components[key] /= route.pollutionData.segments.length;
    });

    return components;
  };

  // Render pollution legend
  const renderAqiLegend = () => {
    return (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Air Quality Index (AQI)</h3>
        <div className="space-y-1">
          {Object.entries(AQI_LEVELS).map(([key, { level, color }]) => (
            <div key={key} className="flex items-center text-xs">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: color }}
              />
              <span className="font-medium" style={{ color }}>
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white shadow-lg p-4 overflow-y-auto flex flex-col">
      <h1 className="text-2xl font-bold mb-6">EcoRoute Navigator</h1>
      
      {/* Search inputs */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center">
          <div className="mr-2">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <SearchBar 
            placeholder="Search origin" 
            onLocationSelect={onOriginSelect}
            initialValue={origin?.placeName || ''}
          />
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={onSwapLocations} 
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700"
          >
            <ArrowRight className="w-4 h-4 transform rotate-90" />
          </button>
        </div>
        
        <div className="flex items-center">
          <div className="mr-2">
            <Navigation className="w-5 h-5 text-red-600" />
          </div>
          <SearchBar 
            placeholder="Search destination" 
            onLocationSelect={onDestinationSelect}
            initialValue={destination?.placeName || ''}
          />
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="py-8 flex flex-col items-center justify-center text-gray-500">
          <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-3"></div>
          <p>Calculating routes and checking air quality...</p>
        </div>
      )}
      
      {/* No routes state */}
      {!isLoading && routes.length === 0 && origin && destination && (
        <div className="py-8 text-center text-gray-500">
          <p>No routes found between these locations.</p>
          <p className="text-sm mt-2">Try selecting different locations.</p>
        </div>
      )}
      
      {/* Initial state - no searches yet */}
      {!isLoading && routes.length === 0 && (!origin || !destination) && (
        <div className="py-8 text-center text-gray-500">
          <p>Search for locations to see routes and air quality.</p>
        </div>
      )}
      
      {/* Routes list */}
      {!isLoading && routes.length > 0 && (
        <div className="mb-4">
          <h2 className="font-medium mb-3">Available Routes</h2>
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              isSelected={route.id === selectedRouteId}
              onClick={() => onRouteSelect(route.id)}
            />
          ))}
        </div>
      )}
      
      {/* Selected route details */}
      {!isLoading && selectedRouteId && (
        <div className="mt-auto">
          <h2 className="font-medium mb-2">Route Details</h2>
          {routes
            .filter(route => route.id === selectedRouteId)
            .map(route => {
              const selectedRoute = routes.find(r => r.id === selectedRouteId);
              if (!selectedRoute) return null;
              
              const avgPollutants = getAveragePollutants(route);
              
              return (
                <div key={route.id} className="text-sm space-y-2">
                  <div>
                    <p>Distance: {(route.distance / 1000).toFixed(1)} km</p>
                    <p>Duration: {Math.floor(route.duration / 60)} min</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <p className="font-medium mb-1">Average Air Quality</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <div>PM2.5: {avgPollutants.pm2_5.toFixed(1)} µg/m³</div>
                      <div>PM10: {avgPollutants.pm10.toFixed(1)} µg/m³</div>
                      <div>NO₂: {avgPollutants.no2.toFixed(1)} µg/m³</div>
                      <div>SO₂: {avgPollutants.so2.toFixed(1)} µg/m³</div>
                      <div>O₃: {avgPollutants.o3.toFixed(1)} µg/m³</div>
                      <div>CO: {avgPollutants.co.toFixed(1)} µg/m³</div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Click on route markers to see detailed pollution data
                  </p>
                </div>
              );
            })}
            
          {/* AQI Legend */}
          {renderAqiLegend()}
        </div>
      )}
    </div>
  );
};

export default Sidebar;