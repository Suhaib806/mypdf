"use client";

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { pdfService } from '@/services/api';
import { formatFileSize } from '@/utils/fileUtils';

const PowerPointToPdf = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadInfo, setDownloadInfo] = useState<{ url: string; filename: string } | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.name.toLowerCase().endsWith('.pptx') || file.name.toLowerCase().endsWith('.ppt')) {
        setUploadedFile(file);
        setError(null);
        setDownloadInfo(null);
      } else {
        setError('Please upload a PowerPoint file (.ppt or .pptx)');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-powerpoint': ['.ppt']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const handleConvert = async () => {
    if (!uploadedFile) {
      setError('Please upload a PowerPoint file first');
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setError(null);
    setDownloadInfo(null);

    try {
      const result = await pdfService.convertPowerPointToPdf(
        uploadedFile,
        (progress) => {
          setProgress(progress);
        }
      );

      setIsLoading(false);
      setProgress(100);
      setDownloadInfo(result);
      toast.success('Conversion successful! Click the download button to get your PDF.');
    } catch (error) {
      console.error('Conversion error:', error);
      let errorMessage = error instanceof Error ? error.message : 'Failed to convert PowerPoint to PDF';
      
      if (errorMessage.includes('LibreOffice not found')) {
        errorMessage = 'LibreOffice is required for PowerPoint to PDF conversion. Please install LibreOffice from https://www.libreoffice.org/download/download/';
      }
      
      setError(errorMessage);
      toast.error('Conversion failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadInfo) {
      const a = document.createElement('a');
      a.href = downloadInfo.url;
      a.download = downloadInfo.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
        {error && (
          <div className="mb-4 p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}
        
        <div className="flex justify-center transition-colors duration-200">
          <div
            {...getRootProps()}
            className={`w-full p-4 sm:p-6 lg:p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
          >
            <input {...getInputProps()} />
            {uploadedFile ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="size-6 text-indigo-600" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium block">
                      {uploadedFile.name}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {formatFileSize(uploadedFile.size)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                    setError(null);
                    setDownloadInfo(null);
                    setProgress(0);
                  }}
                  className="text-sm font-medium text-red-600 hover:text-red-500 px-3 py-1 rounded-md hover:bg-red-50 transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-gray-600">
                  Drag and drop a PowerPoint file here, or click to select
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Supports .ppt and .pptx files up to 50MB
                </p>
              </div>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">Converting... {progress}%</p>
          </div>
        )}

        {!downloadInfo ? (
          <button
            onClick={handleConvert}
            disabled={!uploadedFile || isLoading}
            className={`mt-6 w-full py-2.5 sm:py-3 px-4 rounded-lg text-white font-medium text-sm sm:text-base
              ${!uploadedFile || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 transition-colors duration-200'
              }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Converting...
              </span>
            ) : (
              'Convert to PDF'
            )}
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-green-50 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-sm sm:text-base font-medium text-green-800">Success</h3>
                  <p className="mt-1 text-sm text-green-700">
                    Your PowerPoint has been converted successfully!
                  </p>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors duration-200"
                >
                  Download PDF
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                setUploadedFile(null);
                setDownloadInfo(null);
                setProgress(0);
              }}
              className="w-full py-2.5 sm:py-3 px-4 rounded-lg text-gray-600 font-medium text-sm sm:text-base border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              Convert Another File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerPointToPdf; 