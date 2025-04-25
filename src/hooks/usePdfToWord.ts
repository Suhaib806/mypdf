import { useState } from "react";
import { pdfService } from "@/services/api";
import { WordFormat } from "@/components/pdf-to-word/ConversionOptions";

interface ConversionResult {
  processingTime: number;
  outputSize: number;
  downloadUrl: string;
  format: WordFormat;
}

export default function usePdfToWord() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [format, setFormat] = useState<WordFormat>('docx');
  const [preserveFormatting, setPreserveFormatting] = useState<boolean>(true);

  const convertToWord = async (file: File) => {
    if (!file) {
      setError("Please select a PDF file to convert");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setUploadProgress(0);

    try {
      const response = await pdfService.convertPdfToWord(
        file, 
        { 
          format, 
          preserveFormatting
        }, 
        (progress) => {
          setUploadProgress(progress);
        }
      );
      
      setResult({
        processingTime: response.processing_time,
        outputSize: response.output_size,
        downloadUrl: pdfService.getDownloadUrl(response.session_id, `converted.${format}`),
        format: format
      });
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

  return {
    isLoading,
    error,
    uploadProgress,
    result,
    format,
    preserveFormatting,
    convertToWord,
    setFormat,
    setPreserveFormatting,
    setError
  };
} 