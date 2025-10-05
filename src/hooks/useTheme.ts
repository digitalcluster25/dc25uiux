import { useState, useEffect, useCallback } from 'react'
import { ThemeConfig, ThemeMode, ThemePreset, themePresets } from '../config/theme.config'
import { generateCSSVariables, applyCSSVariables } from '../utils/css-var-generator'

interface UseThemeReturn {
  theme: ThemeConfig
  mode: ThemeMode
  preset: ThemePreset
  setMode: (mode: ThemeMode) => void
  setPreset: (preset: ThemePreset) => void
  updateTheme: (updates: Partial<ThemeConfig>) => void
  resetTheme: () => void
  isDark: boolean
}

export function useTheme(): UseThemeReturn {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode')
    return (saved as ThemeMode) || 'system'
  })

  const [preset, setPresetState] = useState<ThemePreset>(() => {
    const saved = localStorage.getItem('theme-preset')
    return (saved as ThemePreset) || 'default'
  })

  const [customTheme, setCustomTheme] = useState<ThemeConfig | null>(() => {
    const saved = localStorage.getItem('theme-custom')
    return saved ? JSON.parse(saved) : null
  })

  // Определяем, темная ли тема
  const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  // Получаем текущую тему
  const theme = customTheme || themePresets[preset]

  // Применяем тему при изменении
  useEffect(() => {
    const cssVars = generateCSSVariables(theme, isDark)
    applyCSSVariables(cssVars)
  }, [theme, isDark])

  // Слушаем изменения системной темы
  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        const cssVars = generateCSSVariables(theme, mediaQuery.matches)
        applyCSSVariables(cssVars)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [mode, theme])

  // Сохраняем настройки в localStorage
  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  useEffect(() => {
    localStorage.setItem('theme-preset', preset)
  }, [preset])

  useEffect(() => {
    if (customTheme) {
      localStorage.setItem('theme-custom', JSON.stringify(customTheme))
    } else {
      localStorage.removeItem('theme-custom')
    }
  }, [customTheme])

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
  }, [])

  const setPreset = useCallback((newPreset: ThemePreset) => {
    setPresetState(newPreset)
    setCustomTheme(null) // Сбрасываем кастомную тему при выборе пресета
  }, [])

  const updateTheme = useCallback((updates: Partial<ThemeConfig>) => {
    setCustomTheme(prev => {
      const baseTheme = customTheme || themePresets[preset]
      return {
        ...baseTheme,
        ...updates,
        colors: {
          ...baseTheme.colors,
          ...updates.colors
        },
        borderRadius: {
          ...baseTheme.borderRadius,
          ...updates.borderRadius
        },
        typography: {
          ...baseTheme.typography,
          ...updates.typography
        },
        spacing: {
          ...baseTheme.spacing,
          ...updates.spacing
        },
        shadows: {
          ...baseTheme.shadows,
          ...updates.shadows
        }
      }
    })
  }, [customTheme, preset])

  const resetTheme = useCallback(() => {
    setCustomTheme(null)
    setPreset('default')
    setMode('system')
  }, [])

  return {
    theme,
    mode,
    preset,
    setMode,
    setPreset,
    updateTheme,
    resetTheme,
    isDark
  }
}
