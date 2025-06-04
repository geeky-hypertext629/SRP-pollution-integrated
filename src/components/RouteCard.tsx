import React from 'react';
import { Clock, Navigation2 } from 'lucide-react';
import { RouteWithPollution } from '../types';
import { AQI_LEVELS } from '../config';

interface RouteCardProps {
  route: RouteWithPollution;
  isSelected: boolean;
  onClick: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, isSelected, onClick }) => {
  const { distance, duration, pollutionData } = route;
  
  // Format distance (from meters to km/miles)
  const formattedDistance = (distance / 1000).toFixed(1) + ' km';
  
  // Format duration (from seconds to minutes/hours)
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  // Calculate average pollution components
  const averageComponents = pollutionData.segments.reduce(
    (acc, segment) => {
      const components = segment.pollutionData.components;
      Object.keys(components).forEach(key => {
        acc[key] = (acc[key] || 0) + components[key];
      });
      return acc;
    },
    {} as Record<string, number>
  );

  Object.keys(averageComponents).forEach(key => {
    averageComponents[key] /= pollutionData.segments.length;
  });

  // Get AQI level information
  const aqiRounded = Math.round(pollutionData.averageAqi);
  const aqiInfo = AQI_LEVELS[aqiRounded as keyof typeof AQI_LEVELS] || AQI_LEVELS[1];

  // Create AQI bar segments
  const createAqiBar = () => {
    return (
      <div className="flex h-2 w-full rounded-full overflow-hidden">
        {[1, 2, 3, 4, 5].map((level) => (
          <div 
            key={level}
            className={`flex-1 ${level <= aqiRounded ? 'opacity-100' : 'opacity-30'}`}
            style={{ backgroundColor: AQI_LEVELS[level as keyof typeof AQI_LEVELS].color }}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className={`p-4 rounded-lg mb-3 transition-all cursor-pointer ${
        isSelected 
          ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
          : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <Navigation2 className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-medium">Route {formattedDistance}</h3>
        </div>
        <div className="flex items-center text-gray-700">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{formatDuration(duration)}</span>
        </div>
      </div>
      
      <div className="mb-3">
        {createAqiBar()}
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <div>
          <span 
            className="text-sm font-medium px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: aqiInfo.color + '33',
              color: aqiInfo.color 
            }}
          >
            AQI: {aqiRounded} - {aqiInfo.level}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {pollutionData.maxAqi > aqiRounded ? (
            <span>Peaks at AQI {Math.round(pollutionData.maxAqi)}</span>
          ) : (
            <span>Consistent air quality</span>
          )}
        </div>
      </div>

      <div className="text-xs space-y-1 border-t pt-2 mt-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="font-medium">PM2.5:</span>{' '}
            {averageComponents.pm2_5.toFixed(1)} µg/m³
          </div>
          <div>
            <span className="font-medium">PM10:</span>{' '}
            {averageComponents.pm10.toFixed(1)} µg/m³
          </div>
          <div>
            <span className="font-medium">NO₂:</span>{' '}
            {averageComponents.no2.toFixed(1)} µg/m³
          </div>
          <div>
            <span className="font-medium">SO₂:</span>{' '}
            {averageComponents.so2.toFixed(1)} µg/m³
          </div>
          <div>
            <span className="font-medium">O₃:</span>{' '}
            {averageComponents.o3.toFixed(1)} µg/m³
          </div>
          <div>
            <span className="font-medium">CO:</span>{' '}
            {averageComponents.co.toFixed(1)} µg/m³
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;