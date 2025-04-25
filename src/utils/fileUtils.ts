export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 100MB total (updated)

export const validateFiles = (fileList: File[]) => {
  const totalSize = fileList.reduce((acc, file) => acc + file.size, 0);
  
  if (totalSize > MAX_TOTAL_SIZE) {
    throw new Error(`Total file size exceeds ${MAX_TOTAL_SIZE / (1024 * 1024)}MB limit`);
  }
  
  for (const file of fileList) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File ${file.name} exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
    }
    if (file.type !== 'application/pdf') {
      throw new Error(`File ${file.name} is not a PDF`);
    }
  }
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}; 