import { useState } from 'react'
import { hexToRgb, rgbToHex } from '../../utils/css-var-generator'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
  disabled?: boolean
}

export default function ColorPicker({ 
  value, 
  onChange, 
  label, 
  disabled = false 
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleColorChange = (newColor: string) => {
    onChange(newColor)
  }

  const presetColors = [
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#ec4899', // pink
    '#6366f1', // indigo
    '#14b8a6', // teal
    '#a855f7'  // violet
  ]

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-10 h-10 rounded-lg border-2 border-gray-300 
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'}
            transition-colors
          `}
          style={{ backgroundColor: value }}
          title={value}
        />
        
        <input
          type="text"
          value={value}
          onChange={(e) => handleColorChange(e.target.value)}
          disabled={disabled}
          className={`
            flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono
            ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
          `}
          placeholder="#000000"
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Предустановленные цвета
              </label>
              <div className="grid grid-cols-6 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      handleColorChange(color)
                      setIsOpen(false)
                    }}
                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Пользовательский цвет
              </label>
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Overlay для закрытия при клике вне */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
