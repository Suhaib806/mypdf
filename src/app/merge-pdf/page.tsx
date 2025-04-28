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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Merge PDF Files
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Combine multiple PDF files into a single document
          </p>
        </div>

        <div className="mt-8 mb-0 space-y-4 rounded-lg p-6 sm:p-8 shadow-lg bg-white">
          <FileUploader
            onFilesSelected={handleFilesSelected}
            maxFiles={20}
            maxSize={50 * 1024 * 1024} // 50MB
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
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${uploadProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                  />
                </div>
                <div className="text-center mt-2 text-sm text-gray-600">
                  Uploading... {uploadProgress}%
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={handleMerge}
              disabled={files.length < 2 || isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                files.length < 2 || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? 'Merging...' : 'Merge PDFs'}
            </button>
          </div>
        </div>

        {resultUrl && <ResultDisplay resultUrl={resultUrl} mergeResult={mergeResult} />}
      </div>
    </div>
  );
} 