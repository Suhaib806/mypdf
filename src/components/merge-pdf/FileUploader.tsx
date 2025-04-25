import React from 'react';

interface FileUploaderProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  fileInputRef,
  dropZoneRef,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange
}) => {
  return (
    <div 
      ref={dropZoneRef}
      className="flex justify-center transition-colors duration-200"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <label
        htmlFor="file-upload"
        className="cursor-pointer rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50 px-6 py-10 text-center w-full"
      >
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload PDF files</span>
            <input 
              id="file-upload" 
              ref={fileInputRef}
              type="file" 
              multiple 
              accept=".pdf" 
              className="sr-only" 
              onChange={onFileChange} 
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PDF files only (max 100MB per file, 100MB total)</p>
      </label>
    </div>
  );
};

export default FileUploader; 