import React from 'react';
import { formatFileSize } from '@/utils/fileUtils';
import { WordFormat } from './ConversionOptions';

interface ConversionResult {
  processingTime: number;
  outputSize: number;
  downloadUrl: string;
  format: WordFormat;
}

interface ResultDisplayProps {
  result: ConversionResult | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  // Get the file extension based on the format
  const fileExtension = result.format === 'docx' ? 'docx' : 'doc';
  const fileName = `converted.${fileExtension}`;
  
  // Get the format name for display
  const formatName = result.format === 'docx' ? 'DOCX' : 'DOC';

  return (
    <div className="rounded-md bg-green-50 p-4 mt-6">
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
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-green-800">Conversion Complete</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Your PDF has been successfully converted to {formatName} format!</p>
            <div className="mt-1 text-xs text-green-600">
              <p>Output size: {formatFileSize(result.outputSize)}</p>
              <p>Processing time: {result.processingTime.toFixed(2)} seconds</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="bg-white rounded-md border border-green-300 p-3 flex items-center justify-between">
              <div className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-blue-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                <span className="ml-2 text-sm font-medium text-gray-900">{fileName}</span>
                <span className="ml-2 text-xs text-gray-500">({formatFileSize(result.outputSize)})</span>
              </div>
              <a
                href={result.downloadUrl}
                download={fileName}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Download Word Document
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay; 