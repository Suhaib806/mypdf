import React from 'react';
import { formatFileSize } from '@/utils/fileUtils';
import { SplitResult } from '@/types/pdf';

interface ResultDisplayProps {
  splitResult: SplitResult | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ splitResult }) => {
  if (!splitResult) return null;

  return (
    <div className="rounded-lg bg-green-50 p-4 sm:p-6 mt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-sm sm:text-base font-medium text-green-800">Split Complete</h3>
          <div className="mt-1 text-sm text-green-700">
            <p>Your PDF has been split successfully!</p>
            <div className="mt-1 text-xs sm:text-sm text-green-600">
              <p>PDFs created: {splitResult.files.length}</p>
              {splitResult.processingTime && (
                <p>Processing time: {splitResult.processingTime.toFixed(2)} seconds</p>
              )}
            </div>
          </div>
        </div>
        
        <a
          href={splitResult.zipUrl}
          download="split_pdfs.zip"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors duration-200"
        >
          Download All
        </a>
      </div>
      
      <div className="mt-4 space-y-2">
        <h4 className="text-sm sm:text-base font-medium text-green-800">Individual Files:</h4>
        
        <div className="space-y-2">
          {splitResult.files.map((file, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 py-2 px-3 bg-green-100 rounded-lg">
              <div className="flex items-center gap-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="size-5 sm:size-6 text-green-700" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <div>
                  <span className="text-sm sm:text-base text-green-800 font-medium block">
                    {file.filename}
                  </span>
                  <span className="text-xs sm:text-sm text-green-600">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>
              <a
                href={file.url}
                download={file.filename}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors duration-200"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay; 