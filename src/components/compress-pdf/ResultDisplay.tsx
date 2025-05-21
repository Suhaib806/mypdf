import React from 'react';
import { PdfServiceResponse } from '@/types/pdf';
import { formatFileSize } from '@/utils/fileUtils';

interface ResultDisplayProps {
  resultUrl: string | null;
  compressResult: PdfServiceResponse | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultUrl, compressResult }) => {
  if (!resultUrl) return null;

  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-green-800">Success</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Your PDF has been compressed successfully!</p>
            {compressResult && (
              <div className="mt-1 text-xs text-green-600">
                <p>Output size: {formatFileSize(compressResult.output_size)}</p>
                <p>Processing time: {compressResult.processing_time.toFixed(2)} seconds</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <a
              href={resultUrl}
              download="compressed.pdf"
              className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Download Compressed PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay; 