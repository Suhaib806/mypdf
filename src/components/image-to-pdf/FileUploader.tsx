import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes: string[];
  multiple?: boolean;
}

export default function FileUploader({
  onFilesSelected,
  acceptedFileTypes,
  multiple = false,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <div className="text-4xl mb-4">📷</div>
        <p className="text-lg font-medium">
          {isDragActive
            ? 'Drop the images here'
            : 'Drag and drop images here, or click to select files'}
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: JPG, PNG, GIF, BMP, WEBP
        </p>
      </div>
    </div>
  );
} 