import React, { useState } from 'react';

export type WordFormat = 'docx' | 'doc';

interface ConversionOptionsProps {
  onConvert: (options: { format: WordFormat; preserveFormatting: boolean }) => void;
}

const ConversionOptions: React.FC<ConversionOptionsProps> = ({ onConvert }) => {
  const [format, setFormat] = useState<WordFormat>('docx');
  const [preserveFormatting, setPreserveFormatting] = useState(true);

  const handleConvert = () => {
    onConvert({ format, preserveFormatting });
  };

  return (
    <div className="mt-6 space-y-6">
      <div>
        <label className="text-base font-medium text-gray-900">Output Format</label>
        <div className="mt-2 space-y-4">
          <div className="flex items-center">
            <input
              id="docx"
              name="format"
              type="radio"
              checked={format === 'docx'}
              onChange={() => setFormat('docx')}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="docx" className="ml-3 block text-sm font-medium text-gray-700">
              DOCX (Modern Word format)
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="doc"
              name="format"
              type="radio"
              checked={format === 'doc'}
              onChange={() => setFormat('doc')}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="doc" className="ml-3 block text-sm font-medium text-gray-700">
              DOC (Legacy Word format)
            </label>
          </div>
        </div>
      </div>

      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="preserve-formatting"
            name="preserve-formatting"
            type="checkbox"
            checked={preserveFormatting}
            onChange={(e) => setPreserveFormatting(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="preserve-formatting" className="font-medium text-gray-900">
            Preserve Formatting
          </label>
          <p className="text-gray-500">Maintain the original layout and styling of the PDF</p>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handleConvert}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Convert to Word
        </button>
      </div>
    </div>
  );
};

export default ConversionOptions; 