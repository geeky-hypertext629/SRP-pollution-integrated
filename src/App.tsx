// App.tsx
import { Routes, Route } from 'react-router-dom'
import MapPage from './MapPage'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={
        <ProtectedRoute>
          <MapPage />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
