import { useState } from "react";
import { pdfService } from "@/services/api";
import { MergeResult } from "@/types/pdf";

export default function usePdfMerger() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [mergeResult, setMergeResult] = useState<MergeResult | null>(null);

  const mergePdfs = async (files: File[]) => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultUrl(null);
    setMergeResult(null);
    setUploadProgress(0);

    try {
      const result = await pdfService.mergePdfs(files, (progress) => {
        setUploadProgress(progress);
      });
      
      setResultUrl(pdfService.getDownloadUrl(result.session_id, 'merged.pdf'));
      setMergeResult({
        outputSize: result.output_size,
        processingTime: result.processing_time
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while merging PDFs");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    resultUrl,
    uploadProgress,
    mergeResult,
    mergePdfs,
    setError
  };
} 