import { PdfServiceResponse, PdfSplitResponse, PdfToWordResponse } from '@/types/pdf';
import { WordFormat } from '@/components/pdf-to-word/ConversionOptions';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const pdfService = {
  /**
   * Merge multiple PDF files into one
   */
  async mergePdfs(files: File[], onProgress?: (progress: number) => void): Promise<PdfServiceResponse> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', `${API_URL}/merge-pdf`, true);
    
    // Set up progress tracking
    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };
    }
    
    // Create a promise to handle the response
    const response = new Promise<PdfServiceResponse>((resolve, reject) => {
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.statusText || 'Failed to merge PDF files'));
        }
      };
      xhr.onerror = function() {
        reject(new Error('Network error occurred'));
      };
    });
    
    xhr.send(formData);
    return response;
  },
  
  /**
   * Split a PDF file based on specified options
   */
  async splitPdf(
    file: File, 
    options: {
      method: 'all' | 'range' | 'specific';
      ranges?: string;
      pages?: string;
    },
    onProgress?: (progress: number) => void
  ): Promise<PdfSplitResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('method', options.method);
    
    if (options.ranges) {
      formData.append('ranges', options.ranges);
    }
    
    if (options.pages) {
      formData.append('pages', options.pages);
    }
    
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', `${API_URL}/split-pdf`, true);
    
    // Set up progress tracking
    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };
    }
    
    // Create a promise to handle the response
    const response = new Promise<PdfSplitResponse>((resolve, reject) => {
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.statusText || 'Failed to split PDF file'));
        }
      };
      xhr.onerror = function() {
        reject(new Error('Network error occurred'));
      };
    });
    
    xhr.send(formData);
    return response;
  },
  
  /**
   * Get the number of pages in a PDF file
   */
  async getPdfPageCount(file: File): Promise<number> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_URL}/page-count`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to get PDF page count');
    }
    
    const data = await response.json();
    return data.page_count;
  },
  
  /**
   * Get the download URL for a processed file
   */
  getDownloadUrl(sessionId: string, filename: string): string {
    return `${API_URL}/download/${sessionId}/${filename}`;
  },
  
  /**
   * Get the download URL for a ZIP archive of multiple files
   */
  getZipDownloadUrl(sessionId: string): string {
    return `${API_URL}/download-zip/${sessionId}`;
  },
  
  /**
   * Format file size in human-readable format
   */
  formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  },
  
  /**
   * Convert PDF to Word document
   */
  async convertPdfToWord(
    file: File, 
    options: {
      format: WordFormat;
      preserveFormatting: boolean;
    },
    onProgress?: (progress: number) => void
  ): Promise<PdfToWordResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', options.format);
    formData.append('preserve_formatting', options.preserveFormatting.toString());
    
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', `${API_URL}/pdf-to-word`, true);
    
    // Set up progress tracking
    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };
    }
    
    // Create a promise to handle the response
    const response = new Promise<PdfToWordResponse>((resolve, reject) => {
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.statusText || 'Failed to convert PDF to Word'));
        }
      };
      xhr.onerror = function() {
        reject(new Error('Network error occurred'));
      };
    });
    
    xhr.send(formData);
    return response;
  },
}; 