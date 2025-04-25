import { useState } from "react";
import { pdfService } from "@/services/api";
import { SplitResult } from "@/types/pdf";

type SplitMethod = 'all' | 'range' | 'specific';

export default function usePdfSplitter() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('all');
  const [pageRange, setPageRange] = useState<string>('');
  const [specificPages, setSpecificPages] = useState<string>('');

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setTotalPages(0);
      return;
    }
    
    try {
      // Get PDF page count
      setIsLoading(true);
      const pageCount = await pdfService.getPdfPageCount(file);
      setTotalPages(pageCount);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to read PDF");
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const splitPdf = async (file: File) => {
    if (!file) {
      setError("Please select a PDF file to split");
      return;
    }

    if (totalPages === 0) {
      setError("Cannot determine the number of pages in the PDF");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSplitResult(null);
    setUploadProgress(0);

    try {
      let options: {
        method: SplitMethod;
        ranges?: string;
        pages?: string;
      } = {
        method: splitMethod
      };

      if (splitMethod === 'range') {
        options.ranges = pageRange;
      } else if (splitMethod === 'specific') {
        options.pages = specificPages;
      }

      const result = await pdfService.splitPdf(file, options, (progress) => {
        setUploadProgress(progress);
      });
      
      // Process the response into a more usable format
      setSplitResult({
        processingTime: result.processing_time,
        files: result.result_files.map((filePath: string, index: number) => ({
          filename: filePath.split('/').pop() || `split_${index + 1}.pdf`,
          size: 0, // We'll get the actual size from the backend response
          url: pdfService.getDownloadUrl(result.session_id, filePath.split('/').pop() || `split_${index + 1}.pdf`)
        })),
        zipUrl: pdfService.getZipDownloadUrl(result.session_id)
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while splitting the PDF");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    splitResult,
    uploadProgress,
    totalPages,
    splitMethod,
    pageRange,
    specificPages,
    handleFileChange,
    splitPdf,
    setSplitMethod,
    setPageRange,
    setSpecificPages,
    setError
  };
} 