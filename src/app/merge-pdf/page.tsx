"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from "@/components/merge-pdf/FileUploader";
import FileList from "@/components/merge-pdf/FileList";
import ResultDisplay from "@/components/merge-pdf/ResultDisplay";
import useFileManagement from "@/hooks/useFileManagement";
import usePdfMerger from "@/hooks/usePdfMerger";
import { formatFileSize } from "@/utils/fileUtils";

export default function MergePdf() {
  const {
    files,
    error: fileError,
    setError: setFileError,
    reorderFiles,
    removeFile,
    getTotalSize,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileChange,
    fileInputRef,
    dropZoneRef
  } = useFileManagement();

  const {
    isLoading,
    error,
    resultUrl,
    uploadProgress,
    mergeResult,
    mergePdfs
  } = usePdfMerger();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderFiles(result.source.index, result.destination.index);
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    // Clear any existing files and add the new ones
    selectedFiles.forEach(file => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      const input = document.createElement('input');
      input.type = 'file';
      input.files = dataTransfer.files;
      handleFileChange({ target: input } as React.ChangeEvent<HTMLInputElement>);
    });
    setFileError(null);
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
          <h1 className="text-2xl font-bold text-center text-black sm:text-3xl">
            Merge PDF Files
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Combine multiple PDF files into a single document
          </p>

          <div className="mt-8 mb-0 space-y-4 rounded-lg p-8 shadow-lg bg-white">
            <FileUploader
              onFilesSelected={handleFilesSelected}
              maxFiles={20}
              maxSize={50 * 1024 * 1024}
              acceptedFileTypes={['.pdf']}
            />

            <FileList
              files={files}
              onDragEnd={onDragEnd}
              onRemoveFile={removeFile}
              getTotalSize={getTotalSize}
            />

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
              type="button"
              onClick={handleMerge}
              disabled={files.length < 2 || isLoading}
              className={`inline-block rounded-lg ${
                files.length < 2 || isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } px-5 py-3 text-sm font-medium text-white w-full`}
            >
              {isLoading ? 'Processing...' : 'Merge PDFs'}
            </button>

            {resultUrl && <ResultDisplay resultUrl={resultUrl} mergeResult={mergeResult} />}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 