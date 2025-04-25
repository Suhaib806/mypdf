"use client";

import { useRef, useState, useCallback } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from "@/components/pdf-to-word/FileUploader";
import ConversionOptions from "@/components/pdf-to-word/ConversionOptions";
import ResultDisplay from "@/components/pdf-to-word/ResultDisplay";
import ErrorDisplay from "@/components/merge-pdf/ErrorDisplay";
import ProgressBar from "@/components/merge-pdf/ProgressBar";
import { validateFiles } from "@/utils/fileUtils";
import usePdfToWord from "@/hooks/usePdfToWord";
import { WordFormat } from "@/components/pdf-to-word/ConversionOptions";

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const {
    isLoading,
    error,
    uploadProgress,
    result,
    format,
    preserveFormatting,
    convertToWord,
    setFormat,
    setPreserveFormatting,
    setError
  } = usePdfToWord();

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
      // Handle file removal
      setFile(null);
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
  }, [setError]);

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

  const handleFormatChange = (format: WordFormat) => {
    setFormat(format);
  };

  const handlePreserveFormattingChange = (preserve: boolean) => {
    setPreserveFormatting(preserve);
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }
    
    await convertToWord(file);
  };

  return (
    <div>
      <Header />
      
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
            PDF to Word Converter
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Convert your PDF documents to editable Microsoft Word files
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

            {file && (
              <ConversionOptions 
                format={format}
                onFormatChange={handleFormatChange}
                preserveFormatting={preserveFormatting}
                onPreserveFormattingChange={handlePreserveFormattingChange}
              />
            )}

            <ProgressBar
              progress={uploadProgress}
              isLoading={isLoading}
            />

            <ErrorDisplay error={error} />

            <ResultDisplay result={result} />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleConvert}
                disabled={isLoading || !file}
                className={`inline-block rounded-lg ${
                  isLoading || !file
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } px-5 py-3 text-sm font-medium text-white w-full`}
              >
                {isLoading ? 'Converting...' : 'Convert to Word'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 