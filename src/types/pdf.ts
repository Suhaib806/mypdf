export interface MergeResult {
  outputSize: number;
  processingTime: number;
}

export interface PdfServiceResponse {
  session_id: string;
  output_size: number;
  processing_time: number;
}

export interface SplitResultFile {
  filename: string;
  size: number;
  url: string;
}

export interface SplitResult {
  processingTime: number;
  files: SplitResultFile[];
  zipUrl: string;
}

export interface PdfSplitResponse {
  session_id: string;
  processing_time: number;
  result_files: string[];
  total_pages: number;
  message: string;
}

export interface PdfToWordResponse {
  session_id: string;
  processing_time: number;
  output_size: number;
  format: string;
} 