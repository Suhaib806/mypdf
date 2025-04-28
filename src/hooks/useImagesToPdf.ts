import { useState } from "react";
import { pdfService } from "@/services/api";

interface ConversionOptions {
  quality: string;
  pageSize: string;
  orientation: string;
}

export default function useImagesToPdf() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [result, setResult] = useState<{ url: string; filename: string } | null>(null);
  const [conversionOptions, setConversionOptions] = useState<ConversionOptions>({
    quality: 'high',
    pageSize: 'a4',
    orientation: 'portrait'
  });

  const convertImagesToPdf = async (files: File[]) => {
    if (!files || files.length === 0) {
      setError("Please select at least one image file to convert");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setUploadProgress(0);

    try {
      const response = await pdfService.imagesToPdf(
        files, 
        conversionOptions, 
        (progress) => {
          setUploadProgress(progress);
        }
      );
      
      setResult(response);
    } catch (err) {
      let errorMessage = "An error occurred during conversion";
      if (err instanceof Error) {
        if (err.message === 'Network error occurred') {
          errorMessage = "Could not connect to the server. Please make sure the backend server is running at http://localhost:8000";
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConversionOptions = (options: Partial<ConversionOptions>) => {
    setConversionOptions(prev => ({ ...prev, ...options }));
  };

  return {
    isLoading,
    error,
    uploadProgress,
    result,
    conversionOptions,
    convertImagesToPdf,
    updateConversionOptions,
    setError
  };
} 