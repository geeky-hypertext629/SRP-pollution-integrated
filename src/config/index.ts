export const DEFAULT_MAP_CENTER = {
  lat: 40.7128,
  lng: -74.0060
};

export const DEFAULT_ZOOM = 12;

export const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';

export const MAPBOX_API_BASE_URL = 'https://api.mapbox.com';

export const OPENWEATHERMAP_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const AQI_LEVELS = {
  1: { level: 'Good', color: '#10B981', description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' },
  2: { level: 'Fair', color: '#FBBF24', description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern.' },
  3: { level: 'Moderate', color: '#F59E0B', description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' },
  4: { level: 'Poor', color: '#EF4444', description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' },
  5: { level: 'Very Poor', color: '#991B1B', description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' }
};

export const ROUTE_COLORS = [
  '#3B82F6', // Primary route (blue)
  '#8B5CF6', // Secondary route (purple)
  '#EC4899'  // Tertiary route (pink)
];