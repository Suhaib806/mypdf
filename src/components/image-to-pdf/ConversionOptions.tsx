interface ConversionOptionsProps {
  options: {
    quality: string;
    pageSize: string;
    orientation: string;
  };
  onOptionsChange: (options: any) => void;
}

export default function ConversionOptions({
  options,
  onOptionsChange,
}: ConversionOptionsProps) {
  const handleChange = (key: string, value: string) => {
    onOptionsChange({ ...options, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Conversion Options</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quality
          </label>
          <select
            value={options.quality}
            onChange={(e) => handleChange('quality', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Size
          </label>
          <select
            value={options.pageSize}
            onChange={(e) => handleChange('pageSize', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
            <option value="legal">Legal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Orientation
          </label>
          <select
            value={options.orientation}
            onChange={(e) => handleChange('orientation', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>
      </div>
    </div>
  );
} 