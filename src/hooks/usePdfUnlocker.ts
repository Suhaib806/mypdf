import { useState } from 'react';
import { pdfService } from '@/services/api';

export const usePdfUnlocker = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const unlockPdf = async (file: File) => {
    setLoading(true);
    setError(null);
    setResultUrl(null);
    setUploadProgress(0);

    try {
      const result = await pdfService.unlockPdf(file, (progress) => {
        setUploadProgress(progress);
      });

      const downloadUrl = pdfService.getDownloadUrl(result.session_id, result.file_path);
      setResultUrl(downloadUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove PDF password');
    } finally {
      setLoading(false);
    }
  };

  return {
    unlockPdf,
    loading,
    error,
    resultUrl,
    uploadProgress,
  };
}; 