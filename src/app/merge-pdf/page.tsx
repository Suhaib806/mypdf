"use client";

import { DropResult } from "react-beautiful-dnd";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from "@/components/merge-pdf/FileUploader";
import FileList from "@/components/merge-pdf/FileList";
import ProgressBar from "@/components/merge-pdf/ProgressBar";
import ResultDisplay from "@/components/merge-pdf/ResultDisplay";
import ErrorDisplay from "@/components/merge-pdf/ErrorDisplay";
import useFileManagement from "@/hooks/useFileManagement";
import usePdfMerger from "@/hooks/usePdfMerger";

export default function MergePdf() {
  const {
    files,
    error: fileError,
    fileInputRef,
    dropZoneRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removeFile,
    reorderFiles,
    getTotalSize,
    setError: setFileError
  } = useFileManagement();

  const {
    isLoading,
    error: mergeError,
    resultUrl,
    uploadProgress,
    mergeResult,
    mergePdfs
  } = usePdfMerger();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderFiles(result.source.index, result.destination.index);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setFileError("Please select at least 2 PDF files to merge");
      return;
    }
    await mergePdfs(files);
  };

  return (
    <div>
      <Header />
      
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
            Merge PDF Files
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Combine multiple PDF files into a single document
          </p>

          <div className="mt-8 mb-0 space-y-4 rounded-lg p-6 sm:p-8 shadow-lg bg-white">
            <FileUploader
              fileInputRef={fileInputRef}
              dropZoneRef={dropZoneRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onFileChange={handleFileChange}
            />

            <FileList
              files={files}
              onDragEnd={onDragEnd}
              onRemoveFile={removeFile}
              getTotalSize={getTotalSize}
            />

            <ProgressBar
              progress={uploadProgress}
              isLoading={isLoading}
            />

            <ErrorDisplay error={fileError || mergeError} />

            <ResultDisplay
              resultUrl={resultUrl}
              mergeResult={mergeResult}
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleMerge}
                disabled={isLoading || files.length < 2}
                className={`inline-block rounded-lg ${
                  isLoading || files.length < 2
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } px-5 py-3 text-sm font-medium text-white w-full`}
              >
                {isLoading ? 'Processing...' : 'Merge PDFs'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 