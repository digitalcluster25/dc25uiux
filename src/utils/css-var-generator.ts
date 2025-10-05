import { ThemeConfig } from '../config/theme.config'

export interface CSSVariables {
  [key: string]: string
}

export function generateCSSVariables(theme: ThemeConfig, isDark: boolean): CSSVariables {
  const vars: CSSVariables = {}

  // Цвета
  Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
    const value = isDark ? colorValue.dark : colorValue.light
    vars[`--color-${colorName}`] = value
    vars[`--color-${colorName}-rgb`] = hexToRgb(value)
  })

  // Радиусы скругления
  Object.entries(theme.borderRadius).forEach(([size, value]) => {
    vars[`--radius-${size}`] = value
  })

  // Типографика
  vars['--font-family'] = theme.typography.fontFamily
  
  Object.entries(theme.typography.fontSize).forEach(([size, value]) => {
    vars[`--font-size-${size}`] = value
  })

  Object.entries(theme.typography.fontWeight).forEach(([weight, value]) => {
    vars[`--font-weight-${weight}`] = value
  })

  Object.entries(theme.typography.lineHeight).forEach(([height, value]) => {
    vars[`--line-height-${height}`] = value
  })

  // Отступы
  Object.entries(theme.spacing).forEach(([size, value]) => {
    vars[`--spacing-${size}`] = value
  })

  // Тени
  Object.entries(theme.shadows).forEach(([size, value]) => {
    vars[`--shadow-${size}`] = value
  })

  // Дополнительные переменные для удобства
  vars['--color-background'] = isDark ? theme.colors.background.dark : theme.colors.background.light
  vars['--color-surface'] = isDark ? theme.colors.surface.dark : theme.colors.surface.light
  vars['--color-text'] = isDark ? theme.colors.text.dark : theme.colors.text.light
  vars['--color-text-secondary'] = isDark ? theme.colors.textSecondary.dark : theme.colors.textSecondary.light
  vars['--color-border'] = isDark ? theme.colors.border.dark : theme.colors.border.light

  return vars
}

export function applyCSSVariables(variables: CSSVariables): void {
  const root = document.documentElement
  
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}

export function removeCSSVariables(variables: CSSVariables): void {
  const root = document.documentElement
  
  Object.keys(variables).forEach((property) => {
    root.style.removeProperty(property)
  })
}

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `${r}, ${g}, ${b}`
  }
  return '0, 0, 0'
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function generateTailwindConfig(theme: ThemeConfig): string {
  const config = {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: 'var(--color-primary)',
            light: 'var(--color-primary-light)',
            dark: 'var(--color-primary-dark)'
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)',
            light: 'var(--color-secondary-light)',
            dark: 'var(--color-secondary-dark)'
          },
          accent: {
            DEFAULT: 'var(--color-accent)',
            light: 'var(--color-accent-light)',
            dark: 'var(--color-accent-dark)'
          },
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          error: 'var(--color-error)',
          info: 'var(--color-info)'
        },
        borderRadius: {
          'xs': 'var(--radius-xs)',
          'sm': 'var(--radius-sm)',
          'md': 'var(--radius-md)',
          'lg': 'var(--radius-lg)',
          'xl': 'var(--radius-xl)',
          'full': 'var(--radius-full)'
        },
        fontFamily: {
          sans: ['var(--font-family)']
        },
        fontSize: {
          'xs': 'var(--font-size-xs)',
          'sm': 'var(--font-size-sm)',
          'base': 'var(--font-size-base)',
          'lg': 'var(--font-size-lg)',
          'xl': 'var(--font-size-xl)',
          '2xl': 'var(--font-size-2xl)',
          '3xl': 'var(--font-size-3xl)',
          '4xl': 'var(--font-size-4xl)'
        },
        spacing: {
          'xs': 'var(--spacing-xs)',
          'sm': 'var(--spacing-sm)',
          'md': 'var(--spacing-md)',
          'lg': 'var(--spacing-lg)',
          'xl': 'var(--spacing-xl)',
          '2xl': 'var(--spacing-2xl)',
          '3xl': 'var(--spacing-3xl)'
        },
        boxShadow: {
          'sm': 'var(--shadow-sm)',
          'md': 'var(--shadow-md)',
          'lg': 'var(--shadow-lg)',
          'xl': 'var(--shadow-xl)',
          '2xl': 'var(--shadow-2xl)'
        }
      }
    }
  }

  return JSON.stringify(config, null, 2)
}

export function exportThemeAsCSS(theme: ThemeConfig, isDark: boolean): string {
  const variables = generateCSSVariables(theme, isDark)
  
  let css = ':root {\n'
  Object.entries(variables).forEach(([property, value]) => {
    css += `  ${property}: ${value};\n`
  })
  css += '}\n\n'

  // Добавляем классы для темной темы
  css += '.dark {\n'
  const darkVariables = generateCSSVariables(theme, true)
  Object.entries(darkVariables).forEach(([property, value]) => {
    if (property.includes('color-')) {
      css += `  ${property}: ${value};\n`
    }
  })
  css += '}\n'

  return css
}

export function exportThemeAsJSON(theme: ThemeConfig): string {
  return JSON.stringify(theme, null, 2)
}
