# Theme Types

TypeScript определения для системы тем DC25 UI/UX.

## Импорт

```tsx
import type { 
  ThemeConfig, 
  ThemeMode, 
  ThemePreset, 
  ColorConfig, 
  TypographyConfig,
  SpacingConfig,
  ShadowConfig,
  BorderRadiusConfig
} from '@/types/theme'
```

## Основные типы

### `ThemeConfig`

```tsx
interface ThemeConfig {
  colors: ColorConfig
  borderRadius: BorderRadiusConfig
  typography: TypographyConfig
  spacing: SpacingConfig
  shadows: ShadowConfig
}
```

### `ThemeMode`

```tsx
type ThemeMode = 'light' | 'dark' | 'system'
```

### `ThemePreset`

```tsx
type ThemePreset = 'default' | 'dark' | 'blue' | 'purple' | 'green' | 'orange'
```

## Конфигурационные типы

### `ColorConfig`

```tsx
interface ColorConfig {
  background: {
    light: string
    dark: string
  }
  foreground: {
    light: string
    dark: string
  }
  primary: {
    light: string
    dark: string
  }
  primaryForeground: {
    light: string
    dark: string
  }
  secondary: {
    light: string
    dark: string
  }
  secondaryForeground: {
    light: string
    dark: string
  }
  muted: {
    light: string
    dark: string
  }
  mutedForeground: {
    light: string
    dark: string
  }
  accent: {
    light: string
    dark: string
  }
  accentForeground: {
    light: string
    dark: string
  }
  destructive: {
    light: string
    dark: string
  }
  destructiveForeground: {
    light: string
    dark: string
  }
  border: {
    light: string
    dark: string
  }
  input: {
    light: string
    dark: string
  }
  ring: {
    light: string
    dark: string
  }
}
```

### `BorderRadiusConfig`

```tsx
interface BorderRadiusConfig {
  sm: string
  md: string
  lg: string
}
```

### `TypographyConfig`

```tsx
interface TypographyConfig {
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
    '5xl': string
    '6xl': string
  }
  fontWeight: {
    thin: string
    light: string
    normal: string
    medium: string
    semibold: string
    bold: string
    extrabold: string
    black: string
  }
  lineHeight: {
    none: string
    tight: string
    snug: string
    normal: string
    relaxed: string
    loose: string
  }
  letterSpacing: {
    tighter: string
    tight: string
    normal: string
    wide: string
    wider: string
    widest: string
  }
}
```

### `SpacingConfig`

```tsx
interface SpacingConfig {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  8: string
  10: string
  12: string
  16: string
  20: string
  24: string
  32: string
  40: string
  48: string
  56: string
  64: string
}
```

### `ShadowConfig`

```tsx
interface ShadowConfig {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  inner: string
  none: string
}
```

## Примеры использования

### Базовое использование

```tsx
import type { ThemeConfig, ThemeMode } from '@/types/theme'

function ThemeProvider({ theme, mode }: { theme: ThemeConfig; mode: ThemeMode }) {
  return (
    <div style={{ 
      backgroundColor: theme.colors.background[mode === 'dark' ? 'dark' : 'light'],
      color: theme.colors.foreground[mode === 'dark' ? 'dark' : 'light']
    }}>
      Content
    </div>
  )
}
```

### Создание кастомной темы

```tsx
import type { ThemeConfig } from '@/types/theme'

const customTheme: ThemeConfig = {
  colors: {
    background: { light: '#ffffff', dark: '#000000' },
    foreground: { light: '#000000', dark: '#ffffff' },
    primary: { light: '#3b82f6', dark: '#60a5fa' },
    primaryForeground: { light: '#ffffff', dark: '#000000' },
    secondary: { light: '#f1f5f9', dark: '#1e293b' },
    secondaryForeground: { light: '#0f172a', dark: '#f1f5f9' },
    muted: { light: '#f1f5f9', dark: '#1e293b' },
    mutedForeground: { light: '#64748b', dark: '#94a3b8' },
    accent: { light: '#f1f5f9', dark: '#1e293b' },
    accentForeground: { light: '#0f172a', dark: '#f1f5f9' },
    destructive: { light: '#ef4444', dark: '#f87171' },
    destructiveForeground: { light: '#ffffff', dark: '#000000' },
    border: { light: '#e2e8f0', dark: '#334155' },
    input: { light: '#e2e8f0', dark: '#334155' },
    ring: { light: '#3b82f6', dark: '#60a5fa' }
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none'
  }
}
```

### Работа с цветами

```tsx
import type { ColorConfig } from '@/types/theme'

function ColorPalette({ colors }: { colors: ColorConfig }) {
  return (
    <div>
      <h3>Цветовая палитра</h3>
      <div>
        <h4>Светлая тема</h4>
        <div style={{ backgroundColor: colors.background.light }}>
          Background: {colors.background.light}
        </div>
        <div style={{ backgroundColor: colors.primary.light, color: colors.primaryForeground.light }}>
          Primary: {colors.primary.light}
        </div>
        <div style={{ backgroundColor: colors.secondary.light, color: colors.secondaryForeground.light }}>
          Secondary: {colors.secondary.light}
        </div>
      </div>
      <div>
        <h4>Темная тема</h4>
        <div style={{ backgroundColor: colors.background.dark }}>
          Background: {colors.background.dark}
        </div>
        <div style={{ backgroundColor: colors.primary.dark, color: colors.primaryForeground.dark }}>
          Primary: {colors.primary.dark}
        </div>
        <div style={{ backgroundColor: colors.secondary.dark, color: colors.secondaryForeground.dark }}>
          Secondary: {colors.secondary.dark}
        </div>
      </div>
    </div>
  )
}
```

### Работа с типографикой

```tsx
import type { TypographyConfig } from '@/types/theme'

function TypographyDemo({ typography }: { typography: TypographyConfig }) {
  return (
    <div style={{ fontFamily: typography.fontFamily }}>
      <h1 style={{ 
        fontSize: typography.fontSize['3xl'], 
        fontWeight: typography.fontWeight.bold 
      }}>
        Заголовок H1
      </h1>
      <h2 style={{ 
        fontSize: typography.fontSize['2xl'], 
        fontWeight: typography.fontWeight.semibold 
      }}>
        Заголовок H2
      </h2>
      <p style={{ 
        fontSize: typography.fontSize.base, 
        fontWeight: typography.fontWeight.normal,
        lineHeight: typography.lineHeight.normal
      }}>
        Обычный текст
      </p>
      <small style={{ 
        fontSize: typography.fontSize.sm, 
        fontWeight: typography.fontWeight.light 
      }}>
        Мелкий текст
      </small>
    </div>
  )
}
```

## Утилитарные типы

### `PartialThemeConfig`

```tsx
type PartialThemeConfig = Partial<ThemeConfig>
```

### `ThemeColorKey`

```tsx
type ThemeColorKey = keyof ColorConfig
```

### `ThemePresetKey`

```tsx
type ThemePresetKey = keyof typeof themePresets
```

### `ColorVariant`

```tsx
type ColorVariant = 'light' | 'dark'
```

## Продвинутые примеры

### Генератор тем

```tsx
import type { ThemeConfig, ColorConfig } from '@/types/theme'

function generateThemeFromColor(baseColor: string): ThemeConfig {
  const colors: ColorConfig = {
    background: { light: '#ffffff', dark: '#000000' },
    foreground: { light: '#000000', dark: '#ffffff' },
    primary: { light: baseColor, dark: baseColor },
    primaryForeground: { light: '#ffffff', dark: '#000000' },
    secondary: { light: '#f1f5f9', dark: '#1e293b' },
    secondaryForeground: { light: '#0f172a', dark: '#f1f5f9' },
    muted: { light: '#f1f5f9', dark: '#1e293b' },
    mutedForeground: { light: '#64748b', dark: '#94a3b8' },
    accent: { light: '#f1f5f9', dark: '#1e293b' },
    accentForeground: { light: '#0f172a', dark: '#f1f5f9' },
    destructive: { light: '#ef4444', dark: '#f87171' },
    destructiveForeground: { light: '#ffffff', dark: '#000000' },
    border: { light: '#e2e8f0', dark: '#334155' },
    input: { light: '#e2e8f0', dark: '#334155' },
    ring: { light: baseColor, dark: baseColor }
  }

  return {
    colors,
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem'
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900'
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2'
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
      }
    },
    spacing: {
      0: '0px',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none'
    }
  }
}
```

### Валидация темы

```tsx
import type { ThemeConfig } from '@/types/theme'

function validateTheme(theme: ThemeConfig): string[] {
  const errors: string[] = []

  // Проверка цветов
  Object.entries(theme.colors).forEach(([key, color]) => {
    if (!color.light || !color.dark) {
      errors.push(`Цвет ${key} должен иметь light и dark варианты`)
    }
  })

  // Проверка радиусов
  if (!theme.borderRadius.sm || !theme.borderRadius.md || !theme.borderRadius.lg) {
    errors.push('Все радиусы должны быть определены')
  }

  // Проверка типографики
  if (!theme.typography.fontFamily) {
    errors.push('Семейство шрифтов обязательно')
  }

  return errors
}
```

### Сравнение тем

```tsx
import type { ThemeConfig } from '@/types/theme'

function compareThemes(theme1: ThemeConfig, theme2: ThemeConfig): string[] {
  const differences: string[] = []

  // Сравнение цветов
  Object.entries(theme1.colors).forEach(([key, color1]) => {
    const color2 = theme2.colors[key as keyof typeof theme2.colors]
    if (color1.light !== color2.light) {
      differences.push(`Цвет ${key}.light отличается`)
    }
    if (color1.dark !== color2.dark) {
      differences.push(`Цвет ${key}.dark отличается`)
    }
  })

  // Сравнение радиусов
  Object.entries(theme1.borderRadius).forEach(([key, value1]) => {
    const value2 = theme2.borderRadius[key as keyof typeof theme2.borderRadius]
    if (value1 !== value2) {
      differences.push(`Радиус ${key} отличается`)
    }
  })

  return differences
}
```

## Константы

### Пресеты тем

```tsx
export const THEME_PRESETS = {
  default: 'default',
  dark: 'dark',
  blue: 'blue',
  purple: 'purple',
  green: 'green',
  orange: 'orange'
} as const

export type ThemePreset = typeof THEME_PRESETS[keyof typeof THEME_PRESETS]
```

### Режимы тем

```tsx
export const THEME_MODES = {
  light: 'light',
  dark: 'dark',
  system: 'system'
} as const

export type ThemeMode = typeof THEME_MODES[keyof typeof THEME_MODES]
```

## Лучшие практики

### 1. Используйте строгую типизацию

```tsx
// ✅ Хорошо
function ThemeProvider({ theme }: { theme: ThemeConfig }) {
  // ...
}

// ❌ Плохо
function ThemeProvider({ theme }: { theme: any }) {
  // ...
}
```

### 2. Проверяйте наличие свойств

```tsx
// ✅ Хорошо
if (theme.colors.primary.light) {
  // Работа с цветом
}

// ❌ Плохо
theme.colors.primary.light // Может быть undefined
```

### 3. Используйте утилитарные типы

```tsx
// ✅ Хорошо
function updateTheme(updates: PartialThemeConfig) {
  // Обновление части темы
}

// ❌ Плохо
function updateTheme(updates: any) {
  // Нет типизации
}
```

### 4. Валидируйте темы

```tsx
// ✅ Хорошо
function applyTheme(theme: ThemeConfig) {
  const errors = validateTheme(theme)
  if (errors.length > 0) {
    throw new Error(`Ошибки валидации темы: ${errors.join(', ')}`)
  }
  // Применение темы
}
```

## Совместимость

- TypeScript 4.9+
- React 18+
- Все современные браузеры

## Связанные типы

- [`component`](./component.md) - Типы компонентов
- [`api`](./api.md) - API типы

---

**Далее:** Изучите [API типы](./api.md) или [конфигурацию](../config/theme-config.md).
