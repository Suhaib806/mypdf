import { useState, useCallback } from 'react';
import { saveAs } from 'file-saver';

interface UsePowerpointToPdfReturn {
  files: File[];
  setFiles: (files: File[]) => void;
  isConverting: boolean;
  error: string | null;
  convertToPdf: () => Promise<void>;
  removeFile: (index: number) => void;
  getTotalSize: () => number;
}

export const usePowerpointToPdf = (): UsePowerpointToPdfReturn => {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeFile = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  const getTotalSize = useCallback(() => {
    return files.reduce((total, file) => total + file.size, 0);
  }, [files]);

  const convertToPdf = useCallback(async () => {
    if (files.length === 0) {
      setError('Please upload a PowerPoint file first');
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('quality', 'high');

      const response = await fetch('/api/powerpoint-to-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to convert PowerPoint to PDF');
      }

      const data = await response.json();

      // Download the converted PDF
      const downloadResponse = await fetch(`/api/download/${data.session_id}/${data.filename}`);
      if (!downloadResponse.ok) {
        throw new Error('Failed to download the converted PDF');
      }

      const blob = await downloadResponse.blob();
      saveAs(blob, data.filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during conversion');
    } finally {
      setIsConverting(false);
    }
  }, [files]);

  return {
    files,
    setFiles,
    isConverting,
    error,
    convertToPdf,
    removeFile,
    getTotalSize
  };
}; 