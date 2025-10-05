import { ThemeConfig } from '../../config/theme.config'

interface ThemePreviewProps {
  theme: ThemeConfig
  isDark?: boolean
  className?: string
}

export default function ThemePreview({ theme, isDark = false, className = '' }: ThemePreviewProps) {
  const bgColor = isDark ? theme.colors.background.dark : theme.colors.background.light
  const surfaceColor = isDark ? theme.colors.surface.dark : theme.colors.surface.light
  const textColor = isDark ? theme.colors.text.dark : theme.colors.text.light
  const primaryColor = isDark ? theme.colors.primary.dark : theme.colors.primary.light

  return (
    <div 
      className={`p-4 rounded-lg border ${className}`}
      style={{ 
        backgroundColor: bgColor,
        borderColor: isDark ? theme.colors.border.dark : theme.colors.border.light
      }}
    >
      <div className="space-y-3">
        {/* Заголовок */}
        <h3 
          className="text-lg font-semibold"
          style={{ color: textColor }}
        >
          Предпросмотр темы
        </h3>

        {/* Карточка */}
        <div 
          className="p-3 rounded-lg"
          style={{ 
            backgroundColor: surfaceColor,
            borderRadius: theme.borderRadius.lg
          }}
        >
          <div className="space-y-2">
            <div 
              className="h-2 rounded"
              style={{ 
                backgroundColor: primaryColor,
                borderRadius: theme.borderRadius.sm
              }}
            />
            <div 
              className="h-1 rounded w-3/4"
              style={{ 
                backgroundColor: isDark ? theme.colors.textSecondary.dark : theme.colors.textSecondary.light,
                borderRadius: theme.borderRadius.sm
              }}
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded text-sm font-medium"
            style={{ 
              backgroundColor: primaryColor,
              color: '#ffffff',
              borderRadius: theme.borderRadius.md
            }}
          >
            Основная
          </button>
          <button
            className="px-3 py-1 rounded text-sm font-medium border"
            style={{ 
              backgroundColor: 'transparent',
              color: textColor,
              borderColor: isDark ? theme.colors.border.dark : theme.colors.border.light,
              borderRadius: theme.borderRadius.md
            }}
          >
            Вторичная
          </button>
        </div>

        {/* Цветовая палитра */}
        <div className="grid grid-cols-4 gap-1">
          <div 
            className="h-4 rounded"
            style={{ 
              backgroundColor: primaryColor,
              borderRadius: theme.borderRadius.sm
            }}
            title="Primary"
          />
          <div 
            className="h-4 rounded"
            style={{ 
              backgroundColor: isDark ? theme.colors.secondary.dark : theme.colors.secondary.light,
              borderRadius: theme.borderRadius.sm
            }}
            title="Secondary"
          />
          <div 
            className="h-4 rounded"
            style={{ 
              backgroundColor: isDark ? theme.colors.success.dark : theme.colors.success.light,
              borderRadius: theme.borderRadius.sm
            }}
            title="Success"
          />
          <div 
            className="h-4 rounded"
            style={{ 
              backgroundColor: isDark ? theme.colors.error.dark : theme.colors.error.light,
              borderRadius: theme.borderRadius.sm
            }}
            title="Error"
          />
        </div>
      </div>
    </div>
  )
}
