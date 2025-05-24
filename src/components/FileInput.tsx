import React, { useState, useRef } from 'react';
import { Upload, Loader, Image } from 'lucide-react';

interface FileInputProps {
  onSubmit: (file: File) => void;
  isLoading: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({ onSubmit, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && !isLoading) {
      onSubmit(selectedFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
          ${preview ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        
        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative mb-4 w-full max-h-64 overflow-hidden rounded-lg">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain" 
              />
            </div>
            <p className="text-sm text-gray-500 mb-2">{selectedFile?.name}</p>
            <p className="text-xs text-gray-400">Click to change image</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <Upload className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-gray-700 font-medium mb-1">Click to upload an image</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`w-full mt-4 py-3 px-4 rounded-md font-medium transition-colors ${
          selectedFile && !isLoading
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!selectedFile || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader className="h-5 w-5 animate-spin" />
            Processing...
          </span>
        ) : preview ? (
          <span className="flex items-center justify-center gap-2">
            <Image className="h-5 w-5" />
            Identify Waste Item
          </span>
        ) : (
          'Upload an Image'
        )}
      </button>
    </form>
  );
};