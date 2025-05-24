import React from 'react';
import { ImageIcon, Type } from 'lucide-react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-gray-200">
      <button
        className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
          activeTab === 'photo'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('photo')}
      >
        <ImageIcon className="h-4 w-4" />
        <span>Upload Photo</span>
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
          activeTab === 'text'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('text')}
      >
        <Type className="h-4 w-4" />
        <span>Enter Text</span>
      </button>
    </div>
  );
};