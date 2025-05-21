export interface MergeResult {
  outputSize: number;
  processingTime: number;
}

export interface PdfServiceResponse {
  message: string;
  file_path: string;
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
  message: string;
  total_pages: number;
  result_files: string[];
  session_id: string;
  processing_time: number;
}

export interface PdfToWordResponse {
  message: string;
  file_path: string;
  session_id: string;
  output_size: number;
  processing_time: number;
} 