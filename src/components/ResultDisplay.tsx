import React from 'react';
import { WasteResult, BinType } from '../types/waste';
import { ArrowLeft, Recycle, Trash2, Leaf } from 'lucide-react';

interface ResultDisplayProps {
  result: WasteResult;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const getBinIcon = (binType: BinType) => {
    switch (binType) {
      case 'recycle':
        return <Recycle className="h-12 w-12 text-blue-500" />;
      case 'compost':
        return <Leaf className="h-12 w-12 text-green-500" />;
      case 'trash':
      default:
        return <Trash2 className="h-12 w-12 text-gray-500" />;
    }
  };

  const getBinColor = (binType: BinType) => {
    switch (binType) {
      case 'recycle':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'compost':
        return 'bg-green-100 border-green-200 text-green-800';
      case 'trash':
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const getBinTitle = (binType: BinType) => {
    switch (binType) {
      case 'recycle':
        return 'Recyclable';
      case 'compost':
        return 'Compostable';
      case 'trash':
      default:
        return 'General Waste';
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={onReset}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Try another item</span>
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          We identified your item as:
        </h2>
        <p className="text-xl text-gray-700">{result.itemName}</p>
      </div>

      <div className={`p-6 rounded-lg border ${getBinColor(result.binType)}`}>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <div className="p-4 rounded-full bg-white">
            {getBinIcon(result.binType)}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">
              This goes in the {getBinTitle(result.binType)} bin
            </h3>
            <p>{result.description}</p>
          </div>
        </div>
      </div>

      {result.tip ? (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-1">Pro Tip</h4>
          <p className="text-yellow-700">{result.tip}</p>
        </div>
      ) : null}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-1">Did you know?</h4>
        <p className="text-gray-600">{result.fact || 'No fact available for this item.'}</p>
      </div>
    </div>
  );
};