import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ onSubmit, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSubmit(inputText.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
          Item Name
        </label>
        <input
          type="text"
          id="itemName"
          placeholder="e.g., plastic bottle, banana peel, battery"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-500">
          Enter the name of the waste item you want to sort.
        </p>
      </div>

      <button
        type="submit"
        className={`w-full mt-4 py-3 px-4 rounded-md font-medium transition-colors ${
          inputText.trim() && !isLoading
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!inputText.trim() || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader className="h-5 w-5 animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Search className="h-5 w-5" />
            Identify Waste Item
          </span>
        )}
      </button>
    </form>
  );
};