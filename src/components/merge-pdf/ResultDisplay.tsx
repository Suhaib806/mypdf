import React from 'react';
import { MergeResult } from '@/types/pdf';
import { formatFileSize } from '@/utils/fileUtils';

interface ResultDisplayProps {
  resultUrl: string | null;
  mergeResult: MergeResult | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultUrl, mergeResult }) => {
  if (!resultUrl) return null;

  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-green-800">Success</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Your PDFs have been merged successfully!</p>
            {mergeResult && (
              <div className="mt-1 text-xs text-green-600">
                <p>Output size: {formatFileSize(mergeResult.outputSize)}</p>
                <p>Processing time: {mergeResult.processingTime.toFixed(2)} seconds</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <a
              href={resultUrl}
              download="merged.pdf"
              className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Download Merged PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay; 