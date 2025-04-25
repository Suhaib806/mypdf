import React from 'react';

export type WordFormat = 'docx' | 'doc';

interface ConversionOptionsProps {
  format: WordFormat;
  onFormatChange: (format: WordFormat) => void;
  preserveFormatting: boolean;
  onPreserveFormattingChange: (preserve: boolean) => void;
}

const ConversionOptions: React.FC<ConversionOptionsProps> = ({
  format,
  onFormatChange,
  preserveFormatting,
  onPreserveFormattingChange
}) => {
  return (
    <div className="mt-6">
      <h3 className="font-medium text-gray-900 mb-3">Conversion Options</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-700 block mb-2">Output Format</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                id="format-docx"
                type="radio"
                checked={format === 'docx'}
                onChange={() => onFormatChange('docx')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="format-docx" className="ml-2 text-sm text-gray-700">
                DOCX (Microsoft Word 2007+)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="format-doc"
                type="radio"
                checked={format === 'doc'}
                onChange={() => onFormatChange('doc')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="format-doc" className="ml-2 text-sm text-gray-700">
                DOC (Microsoft Word 97-2003)
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center">
            <input
              id="preserve-formatting"
              type="checkbox"
              checked={preserveFormatting}
              onChange={(e) => onPreserveFormattingChange(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
            />
            <label htmlFor="preserve-formatting" className="ml-2 text-sm text-gray-700">
              Preserve original formatting (layout, images, tables)
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            This option helps maintain the original document's appearance but may reduce editability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversionOptions; 