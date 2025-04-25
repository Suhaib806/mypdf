import React from 'react';

interface ProgressBarProps {
  progress: number;
  isLoading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-indigo-600">Uploading...</span>
        <span className="text-sm font-medium text-indigo-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar; 