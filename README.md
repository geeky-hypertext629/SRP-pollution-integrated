# SRP Pollution Integrated

A web application for route planning with integrated pollution data, using Mapbox and OpenWeatherMap APIs. Built with React, TypeScript, Vite, and Tailwind CSS.

## Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm**
- **Mapbox Account** (for API key)
- **OpenWeatherMap Account** (for API key)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/geeky-hypertext629/SRP-pollution-integrated.git
   cd SRP-pollution-integrated
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory with the following content:

```
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
VITE_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

- Replace `your_mapbox_access_token` with your Mapbox API key.
- Replace `your_openweathermap_api_key` with your OpenWeatherMap API key.

## Usage

### Start the development server
```sh
npm run dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for production
```sh
npm run build
```

### Preview the production build
```sh
npm run preview
```

### Lint the code
```sh
npm run lint
```

## Project Structure
- `src/` - Source code (components, services, config, types)
- `src/services/mapboxService.ts` - Handles Mapbox API requests
- `src/services/weatherService.ts` - Handles OpenWeatherMap API requests
- `src/config/index.ts` - Configuration constants

## Notes
- Ensure your `.env` file is **not** committed to version control (it is in `.gitignore`).
- The app uses Vite, React, TypeScript, Tailwind CSS, Mapbox, and OpenWeatherMap.

---

Feel free to contribute or open issues for improvements! 