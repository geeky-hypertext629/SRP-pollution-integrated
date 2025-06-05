import React from 'react';
import { Wind, Activity, Layers, Zap, Cloud, TrendingUp } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Smart Route Planner?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform offers unique features that traditional navigation apps don't provide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Wind className="text-blue-600" size={28} />}
            title="Pollution-Aware Navigation"
            description="Get routes that prioritize areas with lower pollution levels for a healthier travel experience."
          />
          
          <FeatureCard 
            icon={<Activity className="text-teal-600" size={28} />}
            title="Traffic Optimization"
            description="Avoid congested roads with traffic-aware routing derived from predictive ML models."
          />
          
          <FeatureCard 
            icon={<Layers className="text-green-600" size={28} />}
            title="Smart Predictions"
            description="Explore routes based on accurate predictions using pollution and traffic data—without relying on real-time APIs."
          />
          
          <FeatureCard 
            icon={<Zap className="text-yellow-600" size={28} />}
            title="Energy Efficiency"
            description="Optimize routes for electric vehicles to maximize battery life and find charging stations along the way."
          />
          
          <FeatureCard 
            icon={<Cloud className="text-indigo-600" size={28} />}
            title="Air Quality Alerts"
            description="Receive real-time notifications about air quality changes along your planned route."
          />
          
          <FeatureCard 
            icon={<TrendingUp className="text-purple-600" size={28} />}
            title="Carbon Footprint Tracking"
            description="Monitor and reduce your carbon emissions with detailed tracking and eco-friendly suggestions."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-gray-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Features;