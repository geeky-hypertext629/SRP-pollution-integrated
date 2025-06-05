import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Hero: React.FC = () => {

  const navigate = useNavigate();

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-80 h-80 bg-teal-100 rounded-full opacity-40 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium animate-fade-in">
              Eco-friendly navigation reinvented
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Smart Routes for a <span className="text-blue-600">Greener</span> Journey
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Leverage machine learning to plan routes optimized for minimal pollution
              and traffic, ensuring a healthier and smoother journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1" onClick={()=>navigate('map')}>
                Get Started Free
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-medium py-3 px-8 rounded-full transition-all shadow-sm hover:shadow">
                Watch Demo
              </button>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required • Free 14-day trial
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-1 animate-fade-in-up">
              <div className="relative bg-gray-100 rounded-xl aspect-[4/3] overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7412095/pexels-photo-7412095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Map interface showing route planning" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <MapPin size={24} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Eco-Route Suggestion</p>
                      <p className="text-xs text-gray-500">34% less pollution • 5 min longer</p>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-teal-500 text-white p-3 rounded-full shadow-lg transform rotate-12 animate-pulse">
              <Navigation size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;