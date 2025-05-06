import { PdfServiceResponse, PdfSplitResponse, PdfToWordResponse } from '@/types/pdf';
import { WordFormat } from '@/components/pdf-to-word/ConversionOptions';

// Use the production URL if available, otherwise use localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pdf-production-ef1b.up.railway.app/api';



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

  /**
   * Convert images to PDF
   */
  async imagesToPdf(
    files: File[],
    options: {
      quality: string;
      pageSize: string;
      orientation: string;
    },
    onProgress?: (progress: number) => void
  ): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('quality', options.quality);
    formData.append('pageSize', options.pageSize);
    formData.append('orientation', options.orientation);
    
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', `${API_URL}/image-to-pdf`, true);
    
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
    const response = new Promise<{ url: string; filename: string }>((resolve, reject) => {
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = JSON.parse(xhr.responseText);
          if (!result.session_id || !result.filename) {
            reject(new Error('Invalid response from server: missing session_id or filename'));
            return;
          }
          resolve({
            url: pdfService.getDownloadUrl(result.session_id, result.filename),
            filename: result.filename
          });
        } else {
          reject(new Error(xhr.statusText || 'Failed to convert images to PDF'));
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
   * Convert PDF to JPG images
   */
  async convertPdfToJpg(
    file: File,
    options: {
      quality: 'high' | 'low';
      dpi: number;
    },
    onProgress?: (progress: number) => void
  ): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quality', options.quality);
    formData.append('dpi', options.dpi.toString());
    
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', `${API_URL}/pdf-to-jpg`, true);
    
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
    const response = new Promise<{ url: string; filename: string }>((resolve, reject) => {
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = JSON.parse(xhr.responseText);
          if (!result.session_id || !result.filename) {
            reject(new Error('Invalid response from server: missing session_id or filename'));
            return;
          }
          resolve({
            url: pdfService.getDownloadUrl(result.session_id, result.filename),
            filename: result.filename
          });
        } else {
          reject(new Error(xhr.statusText || 'Failed to convert PDF to JPG'));
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
   * Convert PowerPoint to PDF
   */
  async convertPowerPointToPdf(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', `${API_URL}/powerpoint-to-pdf`, true);
    
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
    const response = new Promise<{ url: string; filename: string }>((resolve, reject) => {
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = JSON.parse(xhr.responseText);
          if (!result.session_id || !result.filename) {
            reject(new Error('Invalid response from server: missing session_id or filename'));
            return;
          }
          resolve({
            url: pdfService.getDownloadUrl(result.session_id, result.filename),
            filename: result.filename
          });
        } else {
          reject(new Error(xhr.statusText || 'Failed to convert PowerPoint to PDF'));
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