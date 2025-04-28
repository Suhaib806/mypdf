import React, { useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatFileSize } from '@/utils/fileUtils';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedFileTypes?: string[];
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  maxFiles = 1,
  maxSize = 50 * 1024 * 1024, // 50MB
  acceptedFileTypes = ['.pdf']
}) => {
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: acceptedFileTypes.reduce((acc, type) => ({
      ...acc,
      [type]: []
    }), {}),
    multiple: false
  });

  return (
    <div
      ref={dropZoneRef}
      className="flex justify-center transition-colors duration-200"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="w-full max-w-xl p-8 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors duration-200">
        {isDragActive ? (
          <p className="text-blue-500">Drop the PDF file here...</p>
        ) : (
          <div>
            <p className="text-gray-600">
              Drag and drop a PDF file here, or click to select a file
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Maximum file size: {formatFileSize(maxSize)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader; 