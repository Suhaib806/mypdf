import React, { useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatFileSize } from '@/utils/fileUtils';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: Record<string, string[]>;
  fileType: 'pdf' | 'image';
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  acceptedFileTypes = { 'application/pdf': ['.pdf'] },
  fileType
}) => {
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: acceptedFileTypes,
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
          <p className="text-blue-500">Drop the file here...</p>
        ) : (
          <div>
            <p className="text-gray-600">
              Drag and drop a PDF file here, or click to select
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Maximum file size: 100MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader; 