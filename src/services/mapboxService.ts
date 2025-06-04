import axios from 'axios';
import polyline from '@mapbox/polyline';
import { MAPBOX_API_BASE_URL } from '../config';
import { Coordinates, Location, Route } from '../types';

class MapboxService {
  private accessToken: string;

  constructor() {
    this.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  }

  async searchLocation(query: string): Promise<Location[]> {
    try {
      const response = await axios.get(
        `${MAPBOX_API_BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
        {
          params: {
            access_token: this.accessToken,
            types: 'address,poi,place',
            limit: 5
          }
        }
      );

      return response.data.features.map((feature: any) => ({
        coordinates: {
          lng: feature.center[0],
          lat: feature.center[1]
        },
        name: feature.text,
        placeName: feature.place_name
      }));
    } catch (error) {
      console.error('Error searching location:', error);
      return [];
    }
  }

  async getRoutes(
    origin: Coordinates,
    destination: Coordinates,
    alternatives = true
  ): Promise<Route[]> {
    try {
      const response = await axios.get(
        `${MAPBOX_API_BASE_URL}/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`,
        {
          params: {
            access_token: this.accessToken,
            alternatives,
            geometries: 'polyline',
            steps: true,
            overview: 'full'
          }
        }
      );

      return response.data.routes.map((route: any, index: number) => ({
        id: `route-${index}`,
        geometry: route.geometry,
        distance: route.distance,
        duration: route.duration,
        legs: route.legs
      }));
    } catch (error) {
      console.error('Error getting routes:', error);
      return [];
    }
  }

  decodePolyline(encodedPolyline: string): Coordinates[] {
    const decodedPoints = polyline.decode(encodedPolyline);
    return decodedPoints.map((point) => ({
      lat: point[0],
      lng: point[1]
    }));
  }

  getRouteCoordinateSamples(route: Route, numSamples = 10): Coordinates[] {
    const decodedPoints = this.decodePolyline(route.geometry);
    
    if (decodedPoints.length <= numSamples) {
      return decodedPoints;
    }

    const result: Coordinates[] = [];
    const interval = Math.floor(decodedPoints.length / numSamples);
    
    for (let i = 0; i < decodedPoints.length; i += interval) {
      result.push(decodedPoints[i]);
      if (result.length >= numSamples) break;
    }
    
    // Always include the last point
    if (result[result.length - 1] !== decodedPoints[decodedPoints.length - 1]) {
      result.push(decodedPoints[decodedPoints.length - 1]);
    }
    
    return result;
  }
}

export default new MapboxService();