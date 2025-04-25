"use client";

import { useRef, useState, useCallback } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from "@/components/split-pdf/FileUploader";
import PageOptions from "@/components/split-pdf/PageOptions";
import ResultDisplay from "@/components/split-pdf/ResultDisplay";
import ErrorDisplay from "@/components/merge-pdf/ErrorDisplay";
import ProgressBar from "@/components/merge-pdf/ProgressBar";
import { validateFiles } from "@/utils/fileUtils";
import { SplitResult } from "@/types/pdf";
import { pdfService } from "@/services/api";
import os from "os";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [splitMethod, setSplitMethod] = useState<'all' | 'range' | 'specific'>('all');
  const [pageRange, setPageRange] = useState('');
  const [specificPages, setSpecificPages] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        validateFiles([e.target.files[0]]);
        setFile(e.target.files[0]);
        setError(null);
      } catch (err) {
        setFile(null);
        setError(err instanceof Error ? err.message : "Invalid file");
      }
    } else {
      // Handle file removal - reset all relevant state
      setFile(null);
      setSplitResult(null);
      setTotalPages(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-indigo-500', 'bg-indigo-100');
    }
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      try {
        validateFiles([e.dataTransfer.files[0]]);
        setFile(e.dataTransfer.files[0]);
        setError(null);
      } catch (err) {
        setFile(null);
        setError(err instanceof Error ? err.message : "Invalid file");
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('border-indigo-500', 'bg-indigo-100');
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-indigo-500', 'bg-indigo-100');
    }
  }, []);

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
          // Extract the filename from the full path
          const filename = filePath.split('/').pop() || `split_${index + 1}.pdf`;
          return {
            filename,
            size: 0, // We'll get the actual size from the backend response
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
              fileInputRef={fileInputRef}
              dropZoneRef={dropZoneRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onFileChange={handleFileChange}
              selectedFile={file}
            />

            <PageOptions
              totalPages={totalPages}
              splitMethod={splitMethod}
              pageRange={pageRange}
              specificPages={specificPages}
              onSplitMethodChange={handleSplitMethodChange}
              onPageRangeChange={handlePageRangeChange}
              onSpecificPagesChange={handleSpecificPagesChange}
            />

            <ProgressBar
              progress={uploadProgress}
              isLoading={isLoading}
            />

            <ErrorDisplay error={error} />

            <ResultDisplay splitResult={splitResult} />

            <div className="flex items-center justify-between">
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
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 