import React from 'react';

interface PageOptionsProps {
  totalPages: number;
  splitMethod: 'all' | 'range' | 'specific';
  pageRange: string;
  specificPages: string;
  onSplitMethodChange: (method: 'all' | 'range' | 'specific') => void;
  onPageRangeChange: (range: string) => void;
  onSpecificPagesChange: (pages: string) => void;
}

const PageOptions: React.FC<PageOptionsProps> = ({
  totalPages,
  splitMethod,
  pageRange,
  specificPages,
  onSplitMethodChange,
  onPageRangeChange,
  onSpecificPagesChange
}) => {
  if (totalPages === 0) return null;

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-base sm:text-lg font-medium text-gray-900">Split Options</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="split-all"
            type="radio"
            checked={splitMethod === 'all'}
            onChange={() => onSplitMethodChange('all')}
            className="size-4 sm:size-5 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="split-all" className="ml-2 text-sm sm:text-base text-gray-700">
            Extract all pages (1 page per PDF)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="split-range"
            type="radio"
            checked={splitMethod === 'range'}
            onChange={() => onSplitMethodChange('range')}
            className="size-4 sm:size-5 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="split-range" className="ml-2 text-sm sm:text-base text-gray-700">
            Split by page range
          </label>
        </div>
        
        {splitMethod === 'range' && (
          <div className="pl-6 mt-2 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label htmlFor="page-range" className="block text-sm sm:text-base text-gray-600 whitespace-nowrap">
                Page Range:
              </label>
              <input
                id="page-range"
                type="text"
                value={pageRange}
                onChange={(e) => onPageRangeChange(e.target.value)}
                placeholder="e.g. 1-3,4-7,8-10"
                className="block w-full sm:w-64 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base px-3 py-2"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Format: 1-3,4-7,8-10 (creates 3 PDFs)
            </p>
          </div>
        )}
        
        <div className="flex items-center">
          <input
            id="split-specific"
            type="radio"
            checked={splitMethod === 'specific'}
            onChange={() => onSplitMethodChange('specific')}
            className="size-4 sm:size-5 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="split-specific" className="ml-2 text-sm sm:text-base text-gray-700">
            Extract specific pages
          </label>
        </div>
        
        {splitMethod === 'specific' && (
          <div className="pl-6 mt-2 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label htmlFor="specific-pages" className="block text-sm sm:text-base text-gray-600 whitespace-nowrap">
                Pages:
              </label>
              <input
                id="specific-pages"
                type="text"
                value={specificPages}
                onChange={(e) => onSpecificPagesChange(e.target.value)}
                placeholder="e.g. 1,3,5,7-10"
                className="block w-full sm:w-64 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm sm:text-base px-3 py-2"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Format: 1,3,5,7-10 (combines to 1 PDF)
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-3 sm:p-4 mt-4">
        <p className="text-xs sm:text-sm text-indigo-800">
          Total pages in document: <span className="font-medium">{totalPages}</span>
        </p>
      </div>
    </div>
  );
};

export default PageOptions; 