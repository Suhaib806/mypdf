import { useState } from "react";
import { pdfService } from "@/services/api";
import { PdfServiceResponse } from "@/types/pdf";

export default function usePdfCompressor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [compressResult, setCompressResult] = useState<PdfServiceResponse | null>(null);

  const compressPdf = async (file: File, quality: string) => {
    setIsLoading(true);
    setError(null);
    setResultUrl(null);
    setCompressResult(null);
    setUploadProgress(0);

    try {
      const result = await pdfService.compressPdf(file, quality, (progress) => {
        setUploadProgress(progress);
      });
      
      const filename = result.file_path.split('/').pop() || 'compressed.pdf';
      console.log('Compression result:', result);
      console.log('Extracted filename:', filename);
      
      const downloadUrl = pdfService.getDownloadUrl(result.session_id, filename);
      console.log('Download URL:', downloadUrl);
      
      setResultUrl(downloadUrl);
      setCompressResult(result);
    } catch (err) {
      console.error('Compression error:', err);
      setError(err instanceof Error ? err.message : "An error occurred while compressing PDF");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    resultUrl,
    uploadProgress,
    compressResult,
    compressPdf,
    setError
  };
} 