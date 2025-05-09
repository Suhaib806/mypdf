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

  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-green-800">Success</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Your Word document has been converted to PDF successfully!</p>
            <div className="mt-1 text-xs text-green-600">
              <p>Output size: {formatFileSize(result.outputSize)}</p>
              <p>Processing time: {result.processingTime.toFixed(2)} seconds</p>
            </div>
          </div>
          <div className="mt-4">
            <a
              href={result.downloadUrl}
              download="converted.pdf"
              className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay; 