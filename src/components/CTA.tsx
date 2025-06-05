import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const CTA: React.FC = () => {

    const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready for Smarter, Cleaner Journeys?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their daily commutes with our AI-powered route planning technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
            <StatCard 
              value="45%" 
              label="Reduction in pollution exposure" 
            />
            <StatCard 
              value="28min" 
              label="Average time saved daily" 
            />
            <StatCard 
              value="30+" 
              label="Tons of CO₂ saved monthly" 
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1" onClick={()=>navigate('/map')}>
              Get Started Free
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-full transition-all flex items-center justify-center group">
              Watch Demo
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <p className="mt-6 text-blue-200 text-sm">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/15 transition-colors">
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-blue-100">{label}</p>
    </div>
  );
};

export default CTA;