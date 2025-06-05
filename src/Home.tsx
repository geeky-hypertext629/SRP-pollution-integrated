import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import RouteDemo from './components/RouteDemo';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import DeviceShowcase from './components/DeviceShowcase';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <RouteDemo />
        <Benefits />
        <Testimonials />
        <DeviceShowcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;