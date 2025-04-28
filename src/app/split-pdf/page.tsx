"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from "@/components/split-pdf/FileUploader";
import PageOptions from "@/components/split-pdf/PageOptions";
import ResultDisplay from "@/components/split-pdf/ResultDisplay";
import ErrorDisplay from "@/components/merge-pdf/ErrorDisplay";
import ProgressBar from "@/components/merge-pdf/ProgressBar";
import { validateFiles, formatFileSize } from "@/utils/fileUtils";
import { SplitResult } from "@/types/pdf";
import { pdfService } from "@/services/api";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
  const [splitMethod, setSplitMethod] = useState<'all' | 'range' | 'specific'>('all');
  const [pageRange, setPageRange] = useState('');
  const [specificPages, setSpecificPages] = useState('');

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      try {
        validateFiles([files[0]]);
        setFile(files[0]);
        setError(null);
      } catch (err) {
        setFile(null);
        setError(err instanceof Error ? err.message : "Invalid file");
      }
    } else {
      setFile(null);
      setSplitResult(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setSplitResult(null);
  };

  const handleSplitMethodChange = (method: 'all' | 'range' | 'specific') => {
    setSplitMethod(method);
  };

  const handlePageRangeChange = (range: string) => {
    setPageRange(range);
  };

  const handleSpecificPagesChange = (pages: string) => {
    setSpecificPages(pages);
  };

  const handleSplit = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await pdfService.splitPdf(
        file,
        {
          method: splitMethod,
          ranges: splitMethod === 'range' ? pageRange : undefined,
          pages: splitMethod === 'specific' ? specificPages : undefined
        },
        (progress: number) => {
          setUploadProgress(progress);
        }
      );
      
      setSplitResult({
        processingTime: response.processing_time,
        files: response.result_files.map((filePath: string, index: number) => {
          const filename = filePath.split('/').pop() || `split_${index + 1}.pdf`;
          return {
            filename,
            size: 0,
            url: pdfService.getDownloadUrl(response.session_id, filename)
          };
        }),
        zipUrl: pdfService.getZipDownloadUrl(response.session_id)
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to split PDF");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
            Split PDF Files
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Extract pages from your PDF document
          </p>

          <div className="mt-8 mb-0 space-y-4 rounded-lg p-8 shadow-lg bg-white">
            <FileUploader
              onFilesSelected={handleFilesSelected}
              maxFiles={1}
              maxSize={50 * 1024 * 1024}
              acceptedFileTypes={['.pdf']}
            />

            {file && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-indigo-600" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <div className="ml-2">
                      <span className="text-sm text-gray-700 truncate max-w-xs block">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <PageOptions
              totalPages={0}
              splitMethod={splitMethod}
              pageRange={pageRange}
              specificPages={specificPages}
              onSplitMethodChange={handleSplitMethodChange}
              onPageRangeChange={handlePageRangeChange}
              onSpecificPagesChange={handleSpecificPagesChange}
            />

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

            <button
              type="button"
              onClick={handleSplit}
              disabled={isLoading || !file}
              className={`inline-block rounded-lg ${
                isLoading || !file
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } px-5 py-3 text-sm font-medium text-white w-full`}
            >
              {isLoading ? 'Processing...' : 'Split PDF'}
            </button>

            {splitResult && <ResultDisplay splitResult={splitResult} />}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 