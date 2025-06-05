// App.tsx
import { Routes, Route } from 'react-router-dom'
import MapPage from './MapPage'
import Home from './Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  )
}

export default App
