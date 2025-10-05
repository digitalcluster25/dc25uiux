// Расширенные типы для системы тем
export interface ColorPalette {
  light: string
  dark: string
}

export interface ThemeColors {
  primary: ColorPalette
  secondary: ColorPalette
  accent: ColorPalette
  background: ColorPalette
  surface: ColorPalette
  text: ColorPalette
  textSecondary: ColorPalette
  border: ColorPalette
  success: ColorPalette
  warning: ColorPalette
  error: ColorPalette
  info: ColorPalette
}

export interface BorderRadius {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

export interface Typography {
  fontFamily: string
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
  fontWeight: {
    light: string
    normal: string
    medium: string
    semibold: string
    bold: string
  }
  lineHeight: {
    tight: string
    normal: string
    relaxed: string
  }
}

export interface Spacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
}

export interface Shadows {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface ThemeConfig {
  colors: ThemeColors
  borderRadius: BorderRadius
  typography: Typography
  spacing: Spacing
  shadows: Shadows
}

export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemePreset = 'default' | 'dark' | 'blue' | 'purple' | 'green' | 'orange'

export interface ThemeContextType {
  theme: ThemeConfig
  mode: ThemeMode
  preset: ThemePreset
  setMode: (mode: ThemeMode) => void
  setPreset: (preset: ThemePreset) => void
  updateTheme: (updates: Partial<ThemeConfig>) => void
  resetTheme: () => void
  isDark: boolean
}

export interface CSSVariables {
  [key: string]: string
}

export interface ThemeExport {
  css: string
  json: string
  tailwind: string
}
