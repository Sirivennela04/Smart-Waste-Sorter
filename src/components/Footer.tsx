import React from 'react';
import { Github, Info, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-left">
            <h3 className="text-white font-semibold mb-4">About Smart Waste Sorter</h3>
            <p className="text-gray-400">
              Helping communities make better waste management decisions through smart technology and education.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/Sirivennela04/Smart-Waste-Sorter"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Github"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/Sirivennela04/Smart-Waste-Sorter/blob/main/README.md"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Information"
              >
                <Info className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <p>Made with love for a cleaner planet</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
