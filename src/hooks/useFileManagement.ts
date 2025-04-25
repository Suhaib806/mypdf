import { useState, useRef, useCallback, RefObject } from "react";
import { validateFiles, MAX_FILE_SIZE, MAX_TOTAL_SIZE } from "@/utils/fileUtils";
import { DropResult } from "react-beautiful-dnd";

// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB

// Export the return type of the hook to use in other components
export interface FileManagementResult {
  files: File[];
  error: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  dropZoneRef: RefObject<HTMLDivElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  removeFile: (index: number) => void;
  reorderFiles: (sourceIndex: number, destinationIndex: number) => void;
  getTotalSize: () => number;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function useFileManagement(): FileManagementResult {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      try {
        // Validate each file individually
        for (const file of fileList) {
          if (file.type !== 'application/pdf') {
            throw new Error(`File ${file.name} is not a PDF`);
          }
          if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File ${file.name} exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
          }
        }
        
        // Check total size with existing files
        const totalSize = files.reduce((acc, file) => acc + file.size, 0) + 
                         fileList.reduce((acc, file) => acc + file.size, 0);
        if (totalSize > MAX_TOTAL_SIZE) {
          throw new Error(`Total file size exceeds ${MAX_TOTAL_SIZE / (1024 * 1024)}MB limit`);
        }
        
        setFiles(prevFiles => [...prevFiles, ...fileList]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid file(s)");
      }
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-indigo-500', 'bg-indigo-100');
    }
    
    if (e.dataTransfer.files) {
      const fileList = Array.from(e.dataTransfer.files);
      try {
        // Validate each file individually
        for (const file of fileList) {
          if (file.type !== 'application/pdf') {
            throw new Error(`File ${file.name} is not a PDF`);
          }
          if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File ${file.name} exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
          }
        }
        
        // Check total size with existing files
        const totalSize = files.reduce((acc, file) => acc + file.size, 0) + 
                         fileList.reduce((acc, file) => acc + file.size, 0);
        if (totalSize > MAX_TOTAL_SIZE) {
          throw new Error(`Total file size exceeds ${MAX_TOTAL_SIZE / (1024 * 1024)}MB limit`);
        }
        
        setFiles(prevFiles => [...prevFiles, ...fileList]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid file(s)");
      }
    }
  }, [files]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('border-indigo-500', 'bg-indigo-100');
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-indigo-500', 'bg-indigo-100');
    }
  }, []);

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const reorderFiles = (sourceIndex: number, destinationIndex: number) => {
    if (sourceIndex === destinationIndex) return;
    
    const items = Array.from(files);
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    
    setFiles(items);
  };

  const getTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  return {
    files,
    error,
    fileInputRef,
    dropZoneRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removeFile,
    reorderFiles,
    getTotalSize,
    setError
  };
} 