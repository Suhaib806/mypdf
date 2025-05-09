"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from '@/components/word-to-pdf/FileUploader';
import ResultDisplay from '@/components/word-to-pdf/ResultDisplay';
import useWordToPdf from '@/hooks/useWordToPdf';

export default function WordToPdf() {
  const {
    selectedFile,
    isLoading,
    error,
    result,
    uploadProgress,
    handleFilesSelected,
    handleConvert,
    removeFile
  } = useWordToPdf();

  return (
    <div>
      <Header />
      
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
            Convert Word to PDF
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Transform your Word documents into PDF files
          </p>

          <div className="mt-8 mb-0 space-y-4 rounded-lg p-8 shadow-lg bg-white">
            <FileUploader
              onFilesSelected={handleFilesSelected}
              maxFiles={1}
              maxSize={50 * 1024 * 1024}
              acceptedFileTypes={['.doc', '.docx']}
            />

            {selectedFile && (
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
                  onClick={removeFile}
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4">
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
              disabled={!selectedFile || isLoading}
              className={`inline-block rounded-lg ${
                !selectedFile || isLoading
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