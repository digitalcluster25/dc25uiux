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

export const defaultThemeConfig: ThemeConfig = {
  colors: {
    primary: {
      light: '#3b82f6',
      dark: '#1d4ed8'
    },
    secondary: {
      light: '#64748b',
      dark: '#334155'
    },
    accent: {
      light: '#8b5cf6',
      dark: '#7c3aed'
    },
    background: {
      light: '#ffffff',
      dark: '#0f172a'
    },
    surface: {
      light: '#f8fafc',
      dark: '#1e293b'
    },
    text: {
      light: '#0f172a',
      dark: '#f1f5f9'
    },
    textSecondary: {
      light: '#64748b',
      dark: '#94a3b8'
    },
    border: {
      light: '#e2e8f0',
      dark: '#334155'
    },
    success: {
      light: '#10b981',
      dark: '#059669'
    },
    warning: {
      light: '#f59e0b',
      dark: '#d97706'
    },
    error: {
      light: '#ef4444',
      dark: '#dc2626'
    },
    info: {
      light: '#06b6d4',
      dark: '#0891b2'
    }
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  }
}

export const darkThemeConfig: ThemeConfig = {
  ...defaultThemeConfig,
  colors: {
    primary: {
      light: '#60a5fa',
      dark: '#3b82f6'
    },
    secondary: {
      light: '#94a3b8',
      dark: '#64748b'
    },
    accent: {
      light: '#a78bfa',
      dark: '#8b5cf6'
    },
    background: {
      light: '#0f172a',
      dark: '#020617'
    },
    surface: {
      light: '#1e293b',
      dark: '#0f172a'
    },
    text: {
      light: '#f1f5f9',
      dark: '#ffffff'
    },
    textSecondary: {
      light: '#94a3b8',
      dark: '#cbd5e1'
    },
    border: {
      light: '#334155',
      dark: '#475569'
    },
    success: {
      light: '#34d399',
      dark: '#10b981'
    },
    warning: {
      light: '#fbbf24',
      dark: '#f59e0b'
    },
    error: {
      light: '#f87171',
      dark: '#ef4444'
    },
    info: {
      light: '#22d3ee',
      dark: '#06b6d4'
    }
  }
}

export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemePreset = 'default' | 'dark' | 'blue' | 'purple' | 'green' | 'orange'

export const themePresets: Record<ThemePreset, ThemeConfig> = {
  default: defaultThemeConfig,
  dark: darkThemeConfig,
  blue: {
    ...defaultThemeConfig,
    colors: {
      ...defaultThemeConfig.colors,
      primary: {
        light: '#3b82f6',
        dark: '#1d4ed8'
      },
      accent: {
        light: '#06b6d4',
        dark: '#0891b2'
      }
    }
  },
  purple: {
    ...defaultThemeConfig,
    colors: {
      ...defaultThemeConfig.colors,
      primary: {
        light: '#8b5cf6',
        dark: '#7c3aed'
      },
      accent: {
        light: '#a855f7',
        dark: '#9333ea'
      }
    }
  },
  green: {
    ...defaultThemeConfig,
    colors: {
      ...defaultThemeConfig.colors,
      primary: {
        light: '#10b981',
        dark: '#059669'
      },
      accent: {
        light: '#34d399',
        dark: '#10b981'
      }
    }
  },
  orange: {
    ...defaultThemeConfig,
    colors: {
      ...defaultThemeConfig.colors,
      primary: {
        light: '#f97316',
        dark: '#ea580c'
      },
      accent: {
        light: '#fb923c',
        dark: '#f97316'
      }
    }
  }
}
