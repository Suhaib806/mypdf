import React from 'react';
import { pdfService } from '@/services/api';

interface ResultDisplayProps {
  result: {
    url: string;
    filename: string;
  };
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Conversion Complete!</h2>
      <div className="space-y-4">
        <p className="text-gray-600">
          Your PDF has been created successfully. Click the button below to download.
        </p>
        <div className="flex justify-center">
          <a
            href={result.url}
            download={result.filename}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center space-x-2"
          >
            <span>Download PDF</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 