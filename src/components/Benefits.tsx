import React from 'react';
import { Heart, Clock, Droplets, Leaf } from 'lucide-react';

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-70 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-50 rounded-full opacity-60 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits That Make a Difference
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Smart Route Planner doesn't just get you from A to B—it transforms how you travel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <BenefitItem 
              icon={<Heart className="text-red-500" />}
              title="Improved Health"
              description="By avoiding high-pollution areas, you can reduce exposure to harmful air contaminants by up to 60%, leading to better respiratory health."
            />
            
            <BenefitItem 
              icon={<Clock className="text-blue-500" />}
              title="Time Efficiency"
              description="Our AI predicts traffic patterns with 87% accuracy, helping you avoid congestion before it happens and saving an average of 25 minutes per day."
            />
            
            <BenefitItem 
              icon={<Droplets className="text-teal-500" />}
              title="Environmental Impact"
              description="Users collectively reduce carbon emissions by over 30 tons monthly by choosing eco-friendly routes that optimize fuel efficiency."
            />
            
            <BenefitItem 
              icon={<Leaf className="text-green-500" />}
              title="Sustainability"
              description="Join a community of eco-conscious travelers making a difference with every journey. Track your personal contribution to a greener planet."
            />
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-2">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Clean air and nature" 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Leaf size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Eco-impact Stats</p>
                    <p className="text-green-600 font-medium">-32% CO₂ emissions this month</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -top-10 -right-10 bg-white rounded-lg shadow-lg p-4 transform rotate-6 hidden md:block">
              <p className="text-sm font-medium text-gray-700">Your health impact:</p>
              <p className="text-xl font-bold text-green-600">+15% cleaner air</p>
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-lg p-4 transform -rotate-3 hidden md:block">
              <p className="text-sm font-medium text-gray-700">Community impact:</p>
              <p className="text-lg font-bold text-blue-600">30+ tons CO₂ saved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, description }) => {
  return (
    <div className="mb-10 flex items-start">
      <div className="mr-4 bg-gray-50 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Benefits;