'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { pdfService } from '@/services/api';

interface ConversionOptions {
  quality: 'high' | 'low';
  dpi: number;
}

export default function PdfToJpgConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ConversionOptions>({
    quality: 'high',
    dpi: 300
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'application/pdf') {
        setFile(file);
        setError(null);
      } else {
        setError('Please upload a PDF file');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const handleConvert = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      const result = await pdfService.convertPdfToJpg(file, options);
      
      // Download the converted file
      const a = document.createElement('a');
      a.href = result.url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setFile(null);
    } catch (error) {
      console.error('Conversion error:', error);
      setError(error instanceof Error ? error.message : 'Failed to convert PDF to JPG');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">PDF to JPG Converter</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="text-green-600">
                <p>Selected file: {file.name}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setError(null);
                  }}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  {isDragActive
                    ? 'Drop the PDF file here'
                    : 'Drag and drop a PDF file here, or click to select'}
                </p>
                <p className="text-sm text-gray-500 mt-2">Only PDF files are supported</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Conversion Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Quality
              </label>
              <select
                value={options.quality}
                onChange={(e) => setOptions({ ...options, quality: e.target.value as 'high' | 'low' })}
                className="w-full p-2 border rounded-md"
                disabled={isConverting}
              >
                <option value="high">High Quality</option>
                <option value="low">Low Quality</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DPI (Resolution)
              </label>
              <select
                value={options.dpi}
                onChange={(e) => setOptions({ ...options, dpi: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-md"
                disabled={isConverting}
              >
                <option value="150">150 DPI</option>
                <option value="300">300 DPI</option>
                <option value="600">600 DPI</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleConvert}
            disabled={!file || isConverting}
            className={`px-6 py-3 rounded-md text-white font-medium ${
              !file || isConverting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isConverting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Converting...
              </span>
            ) : (
              'Convert to JPG'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 