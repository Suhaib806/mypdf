import React from 'react';
import { formatFileSize } from '@/utils/fileUtils';

interface ResultDisplayProps {
  resultUrl: string;
  originalSize?: number;
  outputSize?: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultUrl, originalSize, outputSize }) => {
  return (
    <div className="mt-6 rounded-lg bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Success!</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Your PDF has been successfully unlocked.</p>
            {originalSize && outputSize && (
              <p className="mt-1">
                Original size: {formatFileSize(originalSize)} → New size: {formatFileSize(outputSize)}
              </p>
            )}
          </div>
          <div className="mt-4">
            <a
              href={resultUrl}
              download
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Download Unlocked PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay; 