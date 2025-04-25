import React from 'react';
import { formatFileSize } from '@/utils/fileUtils';
import { SplitResult } from '@/types/pdf';

interface ResultDisplayProps {
  splitResult: SplitResult | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ splitResult }) => {
  if (!splitResult) return null;

  return (
    <div className="rounded-md bg-green-50 p-4 mt-6">
      <div className="flex">
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-green-800">Split Complete</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Your PDF has been split successfully!</p>
            <div className="mt-1 text-xs text-green-600">
              <p>PDFs created: {splitResult.files.length}</p>
              {splitResult.processingTime && (
                <p>Processing time: {splitResult.processingTime.toFixed(2)} seconds</p>
              )}
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-green-800">Download Files:</h4>
            {splitResult.files.map((file, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-3 bg-green-100 rounded-md">
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="size-5 text-green-700" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="ml-2 text-sm text-green-800">{file.filename}</span>
                  <span className="ml-2 text-xs text-green-600">({formatFileSize(file.size)})</span>
                </div>
                <a
                  href={file.url}
                  download={file.filename}
                  className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
          
          {splitResult.zipUrl && (
            <div className="mt-4">
              <a
                href={splitResult.zipUrl}
                download="split_pdfs.zip"
                className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Download All as ZIP
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay; 