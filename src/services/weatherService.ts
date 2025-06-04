import axios from 'axios';
import { OPENWEATHERMAP_API_BASE_URL } from '../config';
import { AirPollutionData, Coordinates, Route, RouteWithPollution } from '../types';
import mapboxService from './mapboxService';

class WeatherService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  }

  async getAirPollution(coordinates: Coordinates): Promise<AirPollutionData | null> {
    try {
      const response = await axios.get(`${OPENWEATHERMAP_API_BASE_URL}/air_pollution`, {
        params: {
          lat: coordinates.lat,
          lon: coordinates.lng,
          appid: this.apiKey
        }
      });

      return response.data.list[0] as AirPollutionData;
    } catch (error) {
      console.error('Error getting air pollution data:', error);
      return null;
    }
  }

  async enhanceRouteWithPollutionData(route: Route): Promise<RouteWithPollution> {
    // Get coordinate samples along the route
    const sampleCoordinates = mapboxService.getRouteCoordinateSamples(route, 10);
    
    // Fetch pollution data for each coordinate
    const pollutionDataPromises = sampleCoordinates.map(coord => 
      this.getAirPollution(coord).then(data => ({ coordinates: coord, data }))
    );
    
    const pollutionResults = await Promise.all(pollutionDataPromises);
    
    // Process and aggregate the pollution data
    const segments = pollutionResults
      .filter(result => result.data !== null)
      .map(result => ({
        coordinates: result.coordinates,
        aqi: result.data!.main.aqi,
        pollutionData: result.data!
      }));
      
    // Calculate average and max AQI
    const averageAqi = segments.length > 0 
      ? segments.reduce((sum, segment) => sum + segment.aqi, 0) / segments.length 
      : 0;
    
    const maxAqi = segments.length > 0 
      ? Math.max(...segments.map(segment => segment.aqi)) 
      : 0;
    
    return {
      ...route,
      pollutionData: {
        averageAqi,
        maxAqi,
        segments
      }
    };
  }
}

export default new WeatherService();