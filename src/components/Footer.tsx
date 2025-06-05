import React from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin size={24} className="text-blue-400" />
              <span className="text-xl font-bold">Smart Route Planner</span>
            </div>
            <p className="text-gray-400 mb-6">
              Leveraging AI to create cleaner, more efficient routes for a healthier planet and smoother journeys.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={20} />} href="#" />
              <SocialLink icon={<Twitter size={20} />} href="#" />
              <SocialLink icon={<Instagram size={20} />} href="#" />
              <SocialLink icon={<Linkedin size={20} />} href="#" />
              <SocialLink icon={<Github size={20} />} href="#" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Features</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">API</FooterLink>
              <FooterLink href="#">Integration</FooterLink>
              <FooterLink href="#">Documentation</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Case Studies</FooterLink>
              <FooterLink href="#">Webinars</FooterLink>
              <FooterLink href="#">Press Kit</FooterLink>
              <FooterLink href="#">Help Center</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-3" />
                <a href="mailto:info@smartrouteplanner.com" className="text-gray-400 hover:text-white transition-colors">
                  info@smartrouteplanner.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="text-gray-400 mr-3" />
                <a href="tel:+15555555555" className="text-gray-400 hover:text-white transition-colors">
                  +1 (555) 555-5555
                </a>
              </li>
              <li className="text-gray-400 mt-3">
                123 Tech Plaza, Suite 400<br />
                San Francisco, CA 94105
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Smart Route Planner. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => {
  return (
    <a 
      href={href} 
      className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors"
      aria-label="Social media"
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <a href={href} className="text-gray-400 hover:text-white transition-colors">
        {children}
      </a>
    </li>
  );
};

export default Footer;