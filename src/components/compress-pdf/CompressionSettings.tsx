interface CompressionSettingsProps {
  quality: string;
  onQualityChange: (value: string) => void;
}

const CompressionSettings: React.FC<CompressionSettingsProps> = ({
  quality,
  onQualityChange
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Compression Settings</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Compression Quality
        </label>
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => onQualityChange('low')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              quality === 'low'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Low
          </button>
          <button
            type="button"
            onClick={() => onQualityChange('medium')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              quality === 'medium'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Medium
          </button>
          <button
            type="button"
            onClick={() => onQualityChange('high')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              quality === 'high'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            High
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {quality === 'low' && 'Maximum compression, lower quality'}
          {quality === 'medium' && 'Balanced compression and quality'}
          {quality === 'high' && 'Minimum compression, best quality'}
        </p>
      </div>
    </div>
  );
};

export default CompressionSettings; 