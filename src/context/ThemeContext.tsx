import React, { createContext, useContext, ReactNode } from 'react'
import { ThemeConfig, ThemeMode, ThemePreset } from '../config/theme.config'
import { useTheme } from '../hooks/useTheme'

interface ThemeContextType {
  theme: ThemeConfig
  mode: ThemeMode
  preset: ThemePreset
  setMode: (mode: ThemeMode) => void
  setPreset: (preset: ThemePreset) => void
  updateTheme: (updates: Partial<ThemeConfig>) => void
  resetTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useTheme()

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}
