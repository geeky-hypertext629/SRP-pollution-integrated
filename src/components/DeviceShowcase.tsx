import React from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

const DeviceShowcase: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available on Every Device
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seamlessly switch between devices while maintaining your routes and preferences.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop mockup */}
          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="bg-gray-800 rounded-t-lg p-2 pb-0">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="bg-gray-800 p-2 rounded-b-lg shadow-xl">
              <img 
                src="https://images.pexels.com/photos/7412050/pexels-photo-7412050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Smart Route Planner on desktop" 
                className="rounded border border-gray-700"
              />
            </div>
          </div>
          
          {/* Mobile mockup */}
          <div className="absolute bottom-0 right-0 md:right-20 z-20 transform translate-y-1/4 hidden md:block">
            <div className="bg-gray-800 p-2 rounded-3xl shadow-xl w-40">
              <div className="bg-gray-800 rounded-3xl overflow-hidden border-4 border-gray-700">
                <img 
                  src="https://images.pexels.com/photos/7412069/pexels-photo-7412069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Smart Route Planner on mobile" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Tablet mockup */}
          <div className="absolute bottom-10 left-0 md:left-20 z-20 transform -translate-y-1/4 -rotate-6 hidden md:block">
            <div className="bg-gray-800 p-2 rounded-3xl shadow-xl w-56">
              <div className="bg-gray-800 rounded-2xl overflow-hidden border-4 border-gray-700">
                <img 
                  src="https://images.pexels.com/photos/7412103/pexels-photo-7412103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Smart Route Planner on tablet" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <DeviceFeature 
            icon={<Smartphone size={24} />}
            title="Mobile"
            description="Take Smart Route Planner with you on the go with our fully-featured mobile app for iOS and Android."
          />
          
          <DeviceFeature 
            icon={<Monitor size={24} />}
            title="Desktop"
            description="Plan your routes in advance with our powerful desktop interface, perfect for detailed trip planning."
          />
          
          <DeviceFeature 
            icon={<Tablet size={24} />}
            title="Tablet"
            description="Enjoy the best of both worlds with our tablet-optimized interface for planning on the go."
          />
        </div>
      </div>
    </section>
  );
};

interface DeviceFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DeviceFeature: React.FC<DeviceFeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors">
      <div className="inline-flex items-center justify-center bg-blue-100 p-3 rounded-full text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default DeviceShowcase;