import React, { useState } from 'react';
import { FileInput } from './FileInput';
import { TextInput } from './TextInput';
import { ResultDisplay } from './ResultDisplay';
import { identifyWasteWithClarifai } from '../services/wasteService';
import { WasteResult } from '../types/waste';
import { Tabs } from './Tabs';
import { Recycle, Trash2, Leaf, Camera, Type as TypeIcon, ArrowRight } from 'lucide-react';

export const WasteSorter: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<WasteResult | null>(null);
  const [activeTab, setActiveTab] = useState<'photo' | 'text'>('photo');

  const handleImageSubmit = async (file: File) => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const wasteResult = await identifyWasteWithClarifai(file);
      setResult(wasteResult);
    } catch (error: any) {
      if (error.llmText) {
        setResult({
          itemName: 'Unknown',
          binType: 'trash',
          description: 'Could not parse AI response.',
          tip: '',
          fact: error.llmText
        });
      } else {
        console.error('Error processing image:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSubmit = async (text: string) => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const wasteResult = await identifyWasteWithClarifai(text);
      setResult(wasteResult);
    } catch (error) {
      console.error('Error processing text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetResult = () => {
    setResult(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sort Your Waste Smartly
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Make sustainable choices by knowing exactly which bin your waste belongs in
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {!result ? (
            <>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  What are you trying to sort?
                </h2>
                <p className="text-gray-600 mb-6">
                  Upload a photo of the item or type its name to find out which bin it belongs in.
                </p>
                
                <Tabs 
                  activeTab={activeTab} 
                  onTabChange={(tab) => setActiveTab(tab as 'photo' | 'text')} 
                />
                
                <div className="mt-6">
                  {activeTab === 'photo' ? (
                    <FileInput onSubmit={handleImageSubmit} isLoading={isLoading} />
                  ) : (
                    <TextInput onSubmit={handleTextSubmit} isLoading={isLoading} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <ResultDisplay result={result} onReset={resetResult} />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">How It Works</h3>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <Camera className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-blue-900">Upload a photo or describe your waste item</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <TypeIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-blue-900">Our system identifies the item type</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <ArrowRight className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-blue-900">Get instant guidance on proper disposal</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Recycle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium text-blue-900">Recyclables</h4>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium text-green-900">Compostables</h4>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <Trash2 className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-700">General Waste</h4>
            </div>
          </div>
        </div>
      </div>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h3>
          <p className="text-gray-600">
            Proper waste sorting can reduce landfill waste by up to 75% and significantly decrease greenhouse gas emissions.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resource Recovery</h3>
          <p className="text-gray-600">
            Recycling conserves natural resources and reduces energy consumption in manufacturing new products.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Benefits</h3>
          <p className="text-gray-600">
            Smart waste management creates cleaner communities and supports local recycling programs.
          </p>
        </div>
      </section>
    </div>
  );
};