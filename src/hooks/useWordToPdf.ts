import { useState } from 'react';
import { pdfService } from '@/services/api';
import { WordFormat } from '@/components/word-to-pdf/ConversionOptions';

interface ConversionResult {
  processingTime: number;
  outputSize: number;
  downloadUrl: string;
  format: WordFormat;
}

export default function useWordToPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setError(null);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select a Word file first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setUploadProgress(0);

    try {
      const response = await pdfService.convertWordToPdf(
        selectedFile,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      setResult({
        processingTime: response.processing_time,
        outputSize: response.output_size,
        downloadUrl: pdfService.getDownloadUrl(response.session_id, 'converted.pdf'),
        format: 'docx' as WordFormat
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert Word to PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  return {
    selectedFile,
    isLoading,
    error,
    result,
    uploadProgress,
    handleFilesSelected,
    handleConvert,
    removeFile
  };
} 