'use client';

import React, { useState } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from '@/components/unlock-pdf/FileUploader';
import ErrorDisplay from '@/components/unlock-pdf/ErrorDisplay';
import ResultDisplay from '@/components/unlock-pdf/ResultDisplay';
import ProgressBar from '@/components/unlock-pdf/ProgressBar';
import { usePdfUnlocker } from '@/hooks/usePdfUnlocker';
import { formatFileSize } from '@/utils/fileUtils';

export default function UnlockPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { unlockPdf, loading, error, resultUrl, uploadProgress } = usePdfUnlocker();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleUnlock = async () => {
    if (!selectedFile) {
      return;
    }
    await unlockPdf(selectedFile);
  };

  return (
    <div>
      <Header />
      
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-center text-black sm:text-3xl">
            Remove PDF Password
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Remove password protection from your PDF files
          </p>

          <div className="mt-8 mb-0 space-y-4 rounded-lg p-8 shadow-lg bg-white">
            <FileUploader onFileSelect={handleFileSelect} />
            
            {selectedFile && (
              <div className="mt-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleUnlock}
                    disabled={loading || !selectedFile}
                    className={`inline-block rounded-lg ${
                      loading || !selectedFile
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } px-5 py-3 text-sm font-medium text-white w-full`}
                  >
                    {loading ? 'Removing Password...' : 'Remove Password'}
                  </button>
                </div>
              </div>
            )}
            
            {loading && (
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
                    />
                  </div>
                  <div className="text-center mt-2 text-sm text-gray-600">
                    {loading ? 'Processing...' : `${uploadProgress}%`}
                  </div>
                </div>
              </div>
            )}
            
            {error && <ErrorDisplay error={error} />}
            
            {resultUrl && <ResultDisplay resultUrl={resultUrl} />}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 