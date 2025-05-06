import { useState, useCallback } from 'react';
import { saveAs } from 'file-saver';

interface UsePdfToJpgReturn {
  files: File[];
  setFiles: (files: File[]) => void;
  isConverting: boolean;
  error: string | null;
  convertToJpg: () => Promise<void>;
  removeFile: (index: number) => void;
  getTotalSize: () => number;
}

export const usePdfToJpg = (): UsePdfToJpgReturn => {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeFile = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  const getTotalSize = useCallback(() => {
    return files.reduce((total, file) => total + file.size, 0);
  }, [files]);

  const convertToJpg = useCallback(async () => {
    if (files.length === 0) {
      setError('Please upload a PDF file first');
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      const pdfFile = files[0];
      const fileArrayBuffer = await pdfFile.arrayBuffer();
      
      // Create a canvas to render the PDF page
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not get canvas context');
      }

      // Load the PDF into a PDF.js document
      const pdfjsLib = await import('pdfjs-dist');
      const pdfDocument = await pdfjsLib.getDocument(fileArrayBuffer).promise;
      
      // Convert each page to JPG
      for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        // Convert canvas to JPG
        const jpgBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, 'image/jpeg', 0.95);
        });
        
        // Save the JPG file
        saveAs(jpgBlob, `page_${i}.jpg`);
      }
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
    convertToJpg,
    removeFile,
    getTotalSize
  };
}; 