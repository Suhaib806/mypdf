import React from 'react';

interface FileUploaderProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  fileInputRef,
  dropZoneRef,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange,
  selectedFile
}) => {
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Create a synthetic event to pass to the onFileChange handler
    const syntheticEvent = {
      target: {
        files: null
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    onFileChange(syntheticEvent);
  };

  return (
    <div 
      ref={dropZoneRef}
      className="flex justify-center transition-colors duration-200"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <label
        htmlFor="file-upload-word"
        className="cursor-pointer rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50 px-6 py-10 text-center w-full"
      >
        {!selectedFile ? (
          <>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-indigo-500 mb-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              
              <p className="text-sm font-medium text-indigo-700 mb-1">
                PDF to Word Converter
              </p>
              
              <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                <label
                  htmlFor="file-upload-word"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 px-3 py-1"
                >
                  <span>Select PDF file</span>
                  <input 
                    id="file-upload-word" 
                    ref={fileInputRef}
                    type="file" 
                    accept=".pdf" 
                    className="sr-only" 
                    onChange={onFileChange} 
                  />
                </label>
                <p className="pl-1 flex items-center">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">PDF file only (max 10MB)</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="size-10 text-indigo-600 mb-3" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-sm font-medium text-gray-900 mb-1">{selectedFile.name}</span>
            <span className="text-xs text-gray-500">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="mt-3 text-sm text-red-600 hover:text-red-500 font-medium"
            >
              Remove
            </button>
          </div>
        )}
      </label>
    </div>
  );
};

export default FileUploader; 