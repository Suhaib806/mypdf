'use client';

import { useState } from 'react';
import { pdfService } from '@/services/api';
import toast from 'react-hot-toast';
import Header from "@/components/header";
import Footer from "@/components/footer";
import FileUploader from '@/components/add-watermark/FileUploader';
import WatermarkSettings from '@/components/add-watermark/WatermarkSettings';
import ProgressBar from '@/components/add-watermark/ProgressBar';
import ErrorDisplay from '@/components/add-watermark/ErrorDisplay';
import ResultDisplay from '@/components/add-watermark/ResultDisplay';

export default function AddWatermarkPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [opacity, setOpacity] = useState(0.5);
  const [position, setPosition] = useState('center');
  const [scale, setScale] = useState(1.0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{ sessionId: string; filename: string; outputSize?: number; processingTime?: number } | null>(null);

  const handlePdfSelect = (file: File) => {
    setPdfFile(file);
    setError(null);
    setResult(null);
  };

  const handleImageSelect = (file: File) => {
    setWatermarkImage(file);
    setError(null);
    setResult(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = async () => {
    if (!pdfFile || !watermarkImage) {
      setError('Please select both PDF and watermark image');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      const response = await pdfService.addWatermark(
        pdfFile,
        watermarkImage,
        opacity,
        position,
        scale,
        (progress) => setProgress(progress)
      );

      setResult({
        sessionId: response.session_id,
        filename: 'watermarked.pdf',
        outputSize: response.output_size || 0,
        processingTime: response.processing_time || 0
      });

      toast.success('Watermark added successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add watermark';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = async () => {
    if (!result) return;

    try {
      const downloadUrl = pdfService.getDownloadUrl(result.sessionId, result.filename);
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to download PDF';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <Header />
      
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-center text-black sm:text-3xl">
            Add Watermark to PDF
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Add a custom watermark to your PDF document
          </p>

          <div className="mt-8 mb-0 space-y-4 rounded-lg p-8 shadow-lg bg-white">
            <div className="grid grid-cols-1 gap-8">
              {/* PDF Upload */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Upload PDF</h2>
                <FileUploader
                  onFileSelect={handlePdfSelect}
                  acceptedFileTypes={{ 'application/pdf': ['.pdf'] }}
                  fileType="pdf"
                />
                {pdfFile && <p className="text-green-600">{pdfFile.name}</p>}
              </div>

              {/* Watermark Image Upload */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Upload Watermark Image</h2>
                <FileUploader
                  onFileSelect={handleImageSelect}
                  acceptedFileTypes={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                  fileType="image"
                  previewUrl={previewUrl}
                />
                {watermarkImage && <p className="text-green-600">{watermarkImage.name}</p>}
              </div>
            </div>

            {/* Watermark Settings */}
            <div className="mt-8">
              <WatermarkSettings
                opacity={opacity}
                position={position}
                scale={scale}
                onOpacityChange={setOpacity}
                onPositionChange={setPosition}
                onScaleChange={setScale}
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                    <div
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
                    />
                  </div>
                  <div className="text-center mt-2 text-sm text-gray-600">
                    {isProcessing ? 'Processing...' : `${progress}%`}
                  </div>
                </div>
              </div>
            )}

            {!result && (
              <button
                onClick={handleSubmit}
                disabled={isProcessing || !pdfFile || !watermarkImage}
                className={`inline-block rounded-lg ${
                  isProcessing || !pdfFile || !watermarkImage
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } px-5 py-3 text-sm font-medium text-white w-full`}
              >
                {isProcessing ? 'Processing...' : 'Add Watermark'}
              </button>
            )}

            {result && (
              <ResultDisplay
                sessionId={result.sessionId}
                filename={result.filename}
                onDownload={handleDownload}
                outputSize={result.outputSize}
                processingTime={result.processingTime}
              />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
