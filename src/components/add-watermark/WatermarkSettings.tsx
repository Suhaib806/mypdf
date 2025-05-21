interface WatermarkSettingsProps {
  opacity: number;
  position: string;
  scale: number;
  onOpacityChange: (value: number) => void;
  onPositionChange: (value: string) => void;
  onScaleChange: (value: number) => void;
}

export default function WatermarkSettings({
  opacity,
  position,
  scale,
  onOpacityChange,
  onPositionChange,
  onScaleChange
}: WatermarkSettingsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Watermark Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Opacity */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Opacity: {opacity}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Position
          </label>
          <select
            value={position}
            onChange={(e) => onPositionChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="center">Center</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>

        {/* Scale */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Scale: {scale}x
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => onScaleChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
} 