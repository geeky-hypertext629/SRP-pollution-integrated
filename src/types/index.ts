export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  coordinates: Coordinates;
  name: string;
  placeName?: string;
}

export interface Route {
  id: string;
  geometry: string; // encoded polyline
  distance: number;
  duration: number;
  legs: RouteLeg[];
}

export interface RouteLeg {
  distance: number;
  duration: number;
  steps: RouteStep[];
}

export interface RouteStep {
  distance: number;
  duration: number;
  geometry: string;
  maneuver: {
    instruction: string;
    type: string;
  };
}

export interface AirPollutionData {
  main: {
    aqi: number; // Air Quality Index
  };
  components: {
    co: number; // Carbon monoxide (μg/m3)
    no: number; // Nitrogen monoxide (μg/m3)
    no2: number; // Nitrogen dioxide (μg/m3)
    o3: number; // Ozone (μg/m3)
    so2: number; // Sulphur dioxide (μg/m3)
    pm2_5: number; // Fine particles matter (μg/m3)
    pm10: number; // Coarse particulate matter (μg/m3)
    nh3: number; // Ammonia (μg/m3)
  };
}

export interface RouteWithPollution extends Route {
  pollutionData: {
    averageAqi: number;
    maxAqi: number;
    segments: {
      coordinates: Coordinates;
      aqi: number;
      pollutionData: AirPollutionData;
    }[];
  };
}