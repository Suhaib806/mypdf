'use client';

import { useState } from 'react';
import FileUploader from '@/components/image-to-pdf/FileUploader';
import ConversionOptions from '@/components/image-to-pdf/ConversionOptions';
import ResultDisplay from '@/components/image-to-pdf/ResultDisplay';
import ProgressBar from '@/components/merge-pdf/ProgressBar';
import ErrorDisplay from '@/components/merge-pdf/ErrorDisplay';
import useImagesToPdf from '@/hooks/useImagesToPdf';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Convert Images to PDF</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <FileUploader
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']}
          multiple={true}
        />
        
        <ConversionOptions
          options={conversionOptions}
          onOptionsChange={handleOptionsChange}
        />

        {error && <ErrorDisplay error={error} />}

        {isLoading && <ProgressBar progress={uploadProgress} isLoading={isLoading} />}

        <div className="flex justify-center">
          <button
            onClick={handleConvert}
            disabled={isLoading || files.length === 0}
            className={`px-6 py-2 rounded-lg ${
              isLoading || files.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold`}
          >
            {isLoading ? 'Converting...' : 'Convert to PDF'}
          </button>
        </div>

        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
} 