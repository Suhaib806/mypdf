'use client';

import { useState } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from '@/components/image-to-pdf/FileUploader';
import ConversionOptions from '@/components/image-to-pdf/ConversionOptions';
import ResultDisplay from '@/components/image-to-pdf/ResultDisplay';
import ProgressBar from '@/components/merge-pdf/ProgressBar';
import ErrorDisplay from '@/components/merge-pdf/ErrorDisplay';
import useImagesToPdf from '@/hooks/useImagesToPdf';
import { formatFileSize } from '@/utils/fileUtils';

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const {
    isLoading,
    error,
    uploadProgress,
    result,
    conversionOptions,
    convertImagesToPdf,
    updateConversionOptions,
    setError
  } = useImagesToPdf();

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setError(null);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleOptionsChange = (options: any) => {
    updateConversionOptions(options);
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please select at least one image file');
      return;
    }

    await convertImagesToPdf(files);
  };

  return (
    <div>
      <Header />
      
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
            Convert Images to PDF
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Convert your images into a PDF document
          </p>

          <div className="mt-8 mb-0 space-y-4 rounded-lg p-8 shadow-lg bg-white">
            <FileUploader
              onFilesSelected={handleFilesSelected}
              maxFiles={20}
              maxSize={50 * 1024 * 1024}
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']}
            />
            
            {files.length > 0 && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Selected Images ({files.length})</h2>
                  <button
                    onClick={handleRemoveAllFiles}
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Remove All
                  </button>
                </div>
                <ul className="divide-y divide-gray-200">
                  {files.map((file, index) => (
                    <li key={index} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-indigo-600 mr-2" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        <span className="text-sm text-gray-700 truncate max-w-xs">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-4">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <ConversionOptions
              options={conversionOptions}
              onOptionsChange={handleOptionsChange}
            />

            {error && <ErrorDisplay error={error} />}

            {isLoading && (
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
                    />
                  </div>
                  <div className="text-center mt-2 text-sm text-gray-600">
                    {isLoading ? 'Processing...' : `${uploadProgress}%`}
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleConvert}
              disabled={isLoading || files.length === 0}
              className={`inline-block rounded-lg ${
                isLoading || files.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } px-5 py-3 text-sm font-medium text-white w-full`}
            >
              {isLoading ? 'Processing...' : 'Convert to PDF'}
            </button>

            {result && <ResultDisplay result={result} />}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 