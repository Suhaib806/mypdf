'use client';

import { useState } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from '@/components/compress-pdf/FileUploader';
import CompressionSettings from '@/components/compress-pdf/CompressionSettings';
import ResultDisplay from '@/components/compress-pdf/ResultDisplay';
import usePdfCompressor from '@/hooks/usePdfCompressor';

export default function CompressPdfPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [quality, setQuality] = useState('medium');
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    isLoading,
    error,
    resultUrl,
    uploadProgress,
    compressResult,
    compressPdf
  } = usePdfCompressor();

  const handlePdfSelect = (file: File) => {
    setPdfFile(file);
    setFileError(null);
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      setFileError('Please select a PDF file');
      return;
    }
    await compressPdf(pdfFile, quality);
  };

  return (
    <div>
      <Header />
      
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-center text-black sm:text-3xl">
            Compress PDF
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Reduce the size of your PDF files while maintaining quality
          </p>

          <div className="mt-8 mb-0 space-y-4 rounded-lg p-8 shadow-lg bg-white">
            {/* PDF Upload */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Upload PDF</h2>
              <FileUploader
                onFileSelect={handlePdfSelect}
                acceptedFileTypes={{ 'application/pdf': ['.pdf'] }}
                fileType="pdf"
              />
              {pdfFile && <p className="text-green-600">{pdfFile.name}</p>}
            </div>

            {/* Compression Settings */}
            <div className="mt-8">
              <CompressionSettings
                quality={quality}
                onQualityChange={setQuality}
              />
            </div>

            {(error || fileError) && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error || fileError}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
              onClick={handleSubmit}
              disabled={isLoading || !pdfFile}
              className={`inline-block rounded-lg ${
                isLoading || !pdfFile
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } px-5 py-3 text-sm font-medium text-white w-full`}
            >
              {isLoading ? 'Processing...' : 'Compress PDF'}
            </button>

            {resultUrl && <ResultDisplay resultUrl={resultUrl} compressResult={compressResult} />}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 