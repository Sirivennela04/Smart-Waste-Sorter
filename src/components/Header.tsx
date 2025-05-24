import React from 'react';
import { Trash2, Recycle, Leaf } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex">
              <Recycle className="h-8 w-8 text-blue-500" />
              <Trash2 className="h-8 w-8 text-gray-500 -ml-2" />
              <Leaf className="h-8 w-8 text-green-500 -ml-2" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Smart Waste Sorter
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};