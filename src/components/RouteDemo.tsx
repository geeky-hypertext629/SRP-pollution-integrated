import React, { useState } from 'react';
import { Map, Navigation, Timer, Wind } from 'lucide-react';

const RouteDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'standard' | 'eco' | 'fast'>('standard');

  const routeOptions = {
    standard: {
      time: '28 min',
      distance: '14.2 km',
      pollution: 'Medium',
      traffic: 'Moderate',
      color: 'blue'
    },
    eco: {
      time: '32 min',
      distance: '15.8 km',
      pollution: 'Low',
      traffic: 'Light',
      color: 'green'
    },
    fast: {
      time: '24 min',
      distance: '12.6 km',
      pollution: 'High',
      traffic: 'Heavy',
      color: 'red'
    }
  };

  const currentRoute = routeOptions[activeTab];

  return (
    <section id="demo" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See It in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare different route options based on your priorities: time, pollution, or traffic.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-3/5 relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/4321565/pexels-photo-4321565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Interactive map showing routes" 
                  className="object-cover w-full h-full"
                />
                <div className={`absolute inset-0 bg-${currentRoute.color}-500/20 mix-blend-multiply transition-colors duration-300`}></div>
                
                {/* Route indicator - this would be animated in a real app */}
                <div className={`absolute top-1/4 left-1/4 right-1/3 h-1 bg-${currentRoute.color}-500 rounded-full transition-colors duration-300`}></div>
                <div className={`absolute top-1/4 right-1/3 bottom-1/3 w-1 bg-${currentRoute.color}-500 rounded-full transition-colors duration-300`}></div>
                <div className={`absolute bottom-1/3 right-1/3 right-1/4 h-1 bg-${currentRoute.color}-500 rounded-full transition-colors duration-300`}></div>
                
                {/* Start and end points */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg">
              <Map size={24} />
            </div>
          </div>
          
          <div className="lg:w-2/5 space-y-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex border-b">
                <RouteTab 
                  isActive={activeTab === 'standard'} 
                  onClick={() => setActiveTab('standard')}
                  label="Standard"
                  color="blue"
                />
                <RouteTab 
                  isActive={activeTab === 'eco'} 
                  onClick={() => setActiveTab('eco')}
                  label="Eco-friendly"
                  color="green"
                />
                <RouteTab 
                  isActive={activeTab === 'fast'} 
                  onClick={() => setActiveTab('fast')}
                  label="Fastest"
                  color="red"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Estimated time</p>
                    <p className="text-2xl font-bold text-gray-900 flex items-center">
                      <Timer size={20} className="mr-2 text-gray-500" />
                      {currentRoute.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total distance</p>
                    <p className="text-2xl font-bold text-gray-900">{currentRoute.distance}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Pollution level</p>
                    <p className={`text-lg font-medium flex items-center ${
                      currentRoute.pollution === 'Low' 
                        ? 'text-green-600' 
                        : currentRoute.pollution === 'Medium' 
                          ? 'text-yellow-600' 
                          : 'text-red-600'
                    }`}>
                      <Wind size={18} className="mr-2" />
                      {currentRoute.pollution}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Traffic conditions</p>
                    <p className={`text-lg font-medium ${
                      currentRoute.traffic === 'Light' 
                        ? 'text-green-600' 
                        : currentRoute.traffic === 'Moderate' 
                          ? 'text-yellow-600' 
                          : 'text-red-600'
                    }`}>
                      {currentRoute.traffic}
                    </p>
                  </div>
                </div>
                
                <hr className="my-4" />
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Route details:</h4>
                  <RouteStep number="1" description="Start from 403 Oak Avenue" time="0 min" />
                  <RouteStep number="2" description="Turn right onto Main Street" time="2 min" />
                  <RouteStep number="3" description="Continue onto Highway 1" time="8 min" />
                  <RouteStep number="4" description="Take exit 15 toward Downtown" time="18 min" />
                  <RouteStep number="5" description="Arrive at 221B Tech Plaza" time={currentRoute.time} />
                </div>
                
                <button className={`mt-4 w-full py-3 rounded-lg font-medium text-white bg-${activeTab === 'standard' ? 'blue' : activeTab === 'eco' ? 'green' : 'red'}-600 hover:bg-${activeTab === 'standard' ? 'blue' : activeTab === 'eco' ? 'green' : 'red'}-700 transition-colors duration-300`}>
                  Select This Route
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface RouteTabProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  color: string;
}

const RouteTab: React.FC<RouteTabProps> = ({ isActive, onClick, label, color }) => {
  return (
    <button 
      className={`flex-1 py-3 text-center font-medium transition-colors duration-200 ${
        isActive 
          ? `text-${color}-600 border-b-2 border-${color}-600` 
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

interface RouteStepProps {
  number: string;
  description: string;
  time: string;
}

const RouteStep: React.FC<RouteStepProps> = ({ number, description, time }) => {
  return (
    <div className="flex items-center">
      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-3">
        {number}
      </div>
      <p className="flex-1 text-gray-700">{description}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  );
};

export default RouteDemo;