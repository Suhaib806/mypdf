"use client";

import { useState } from 'react';
import FileUploader from '@/components/pdf-to-word/FileUploader';
import ConversionOptions from '@/components/pdf-to-word/ConversionOptions';
import ResultDisplay from '@/components/pdf-to-word/ResultDisplay';
import { pdfService } from '@/services/api';
import { WordFormat } from '@/components/pdf-to-word/ConversionOptions';

export default function PdfToWord() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    processingTime: number;
    outputSize: number;
    downloadUrl: string;
    format: WordFormat;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setError(null);
    }
  };

  const handleConvert = async (options: { format: WordFormat; preserveFormatting: boolean }) => {
    if (!selectedFile) {
      setError('Please select a PDF file first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setUploadProgress(0);

    try {
      const response = await pdfService.convertPdfToWord(
        selectedFile,
        options,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      setResult({
        processingTime: response.processing_time,
        outputSize: response.output_size,
        downloadUrl: pdfService.getDownloadUrl(response.session_id, `converted.${response.format}`),
        format: response.format as WordFormat
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert PDF to Word');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Convert PDF to Word
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Transform your PDF documents into editable Word files
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <FileUploader
                onFilesSelected={handleFilesSelected}
                maxFiles={1}
                maxSize={50 * 1024 * 1024} // 50MB
                acceptedFileTypes={['.pdf']}
              />

              {selectedFile && (
                <div className="mt-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {selectedFile.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                      />
                    </div>
                    <div className="text-center mt-2 text-sm text-gray-600">
                      Converting... {uploadProgress}%
                    </div>
                  </div>
                </div>
              )}

              {selectedFile && !isLoading && (
                <ConversionOptions onConvert={handleConvert} />
              )}
            </div>
          </div>

          {result && <ResultDisplay result={result} />}
        </div>
      </div>
    </div>
  );
} 