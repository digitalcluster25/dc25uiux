import { useState } from 'react'
import { useThemeContext } from '../../context/ThemeContext'
import { ThemePreset } from '../../config/theme.config'
import ColorPicker from './ColorPicker'
import ThemePreview from './ThemePreview'
import { exportThemeAsCSS, exportThemeAsJSON } from '../../utils/css-var-generator'

export default function ThemeCustomizer() {
  const { 
    theme, 
    mode, 
    preset, 
    setMode, 
    setPreset, 
    updateTheme, 
    resetTheme, 
    isDark 
  } = useThemeContext()

  const [activeTab, setActiveTab] = useState<'presets' | 'colors' | 'typography' | 'spacing'>('presets')
  const [showExport, setShowExport] = useState(false)

  const presets: { value: ThemePreset; label: string }[] = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'dark', label: 'Темная' },
    { value: 'blue', label: 'Синяя' },
    { value: 'purple', label: 'Фиолетовая' },
    { value: 'green', label: 'Зеленая' },
    { value: 'orange', label: 'Оранжевая' }
  ]

  const handleColorChange = (colorType: string, variant: 'light' | 'dark', value: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [colorType]: {
          ...theme.colors[colorType as keyof typeof theme.colors],
          [variant]: value
        }
      }
    })
  }

  const handleExport = () => {
    const css = exportThemeAsCSS(theme, isDark)
    const json = exportThemeAsJSON(theme)
    
    // Создаем файлы для скачивания
    const cssBlob = new Blob([css], { type: 'text/css' })
    const jsonBlob = new Blob([json], { type: 'application/json' })
    
    const cssUrl = URL.createObjectURL(cssBlob)
    const jsonUrl = URL.createObjectURL(jsonBlob)
    
    const cssLink = document.createElement('a')
    cssLink.href = cssUrl
    cssLink.download = 'theme.css'
    cssLink.click()
    
    const jsonLink = document.createElement('a')
    jsonLink.href = jsonUrl
    jsonLink.download = 'theme.json'
    jsonLink.click()
    
    URL.revokeObjectURL(cssUrl)
    URL.revokeObjectURL(jsonUrl)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Настройка темы
        </h1>
        <p className="text-gray-600">
          Персонализируйте внешний вид вашего приложения
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Панель настроек */}
        <div className="space-y-6">
          {/* Режим темы */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Режим темы</h3>
            <div className="flex gap-2">
              {[
                { value: 'light', label: 'Светлая' },
                { value: 'dark', label: 'Темная' },
                { value: 'system', label: 'Системная' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMode(option.value as any)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    mode === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Пресеты */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Пресеты</h3>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((presetOption) => (
                <button
                  key={presetOption.value}
                  onClick={() => setPreset(presetOption.value)}
                  className={`p-3 rounded text-sm font-medium transition-colors ${
                    preset === presetOption.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {presetOption.label}
                </button>
              ))}
            </div>
          </div>

          {/* Цвета */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Цвета</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                  label="Основной (светлая)"
                  value={theme.colors.primary.light}
                  onChange={(value) => handleColorChange('primary', 'light', value)}
                />
                <ColorPicker
                  label="Основной (темная)"
                  value={theme.colors.primary.dark}
                  onChange={(value) => handleColorChange('primary', 'dark', value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                  label="Акцент (светлая)"
                  value={theme.colors.accent.light}
                  onChange={(value) => handleColorChange('accent', 'light', value)}
                />
                <ColorPicker
                  label="Акцент (темная)"
                  value={theme.colors.accent.dark}
                  onChange={(value) => handleColorChange('accent', 'dark', value)}
                />
              </div>
            </div>
          </div>

          {/* Действия */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Действия</h3>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Экспорт темы
              </button>
              <button
                onClick={resetTheme}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>

        {/* Предпросмотр */}
        <div>
          <ThemePreview theme={theme} isDark={isDark} />
        </div>
      </div>
    </div>
  )
}
