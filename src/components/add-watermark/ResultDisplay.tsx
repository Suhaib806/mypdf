import React from 'react';
import { formatFileSize } from '@/utils/fileUtils';

interface ResultDisplayProps {
  sessionId: string;
  filename: string;
  onDownload: () => void;
  outputSize?: number;
  processingTime?: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  sessionId, 
  filename, 
  onDownload,
  outputSize,
  processingTime 
}) => {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-green-800">Success</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Your PDF has been watermarked successfully!</p>
            {(outputSize || processingTime) && (
              <div className="mt-1 text-xs text-green-600">
                {outputSize && <p>Output size: {formatFileSize(outputSize)}</p>}
                {processingTime && <p>Processing time: {processingTime.toFixed(2)} seconds</p>}
              </div>
            )}
          </div>
          <div className="mt-4">
            <button
              onClick={onDownload}
              className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Download Watermarked PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay; 