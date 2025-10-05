# Theme Config

Конфигурация системы тем DC25 UI/UX.

## Импорт

```tsx
import { themePresets, defaultTheme, generateTheme } from '@/config/theme.config'
import type { ThemeConfig, ThemePreset } from '@/types/theme'
```

## Пресеты тем

### `themePresets`

```tsx
export const themePresets: Record<ThemePreset, ThemeConfig> = {
  default: { /* конфигурация по умолчанию */ },
  dark: { /* темная тема */ },
  blue: { /* синяя тема */ },
  purple: { /* фиолетовая тема */ },
  green: { /* зеленая тема */ },
  orange: { /* оранжевая тема */ }
}
```

### `defaultTheme`

```tsx
export const defaultTheme: ThemeConfig = themePresets.default
```

## Функции

### `generateTheme(options: ThemeOptions): ThemeConfig`

Генерирует новую тему на основе опций.

```tsx
interface ThemeOptions {
  primaryColor: string
  secondaryColor?: string
  borderRadius?: 'sm' | 'md' | 'lg'
  fontFamily?: string
}
```

## Примеры использования

### Использование пресетов

```tsx
import { themePresets } from '@/config/theme.config'

function ThemeSelector() {
  const [selectedPreset, setSelectedPreset] = useState<ThemePreset>('default')

  const applyPreset = (preset: ThemePreset) => {
    const theme = themePresets[preset]
    // Применение темы
    setSelectedPreset(preset)
  }

  return (
    <div>
      {Object.keys(themePresets).map(preset => (
        <button
          key={preset}
          onClick={() => applyPreset(preset as ThemePreset)}
          className={selectedPreset === preset ? 'active' : ''}
        >
          {preset}
        </button>
      ))}
    </div>
  )
}
```

### Генерация кастомной темы

```tsx
import { generateTheme } from '@/config/theme.config'

function CustomThemeGenerator() {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')
  const [fontFamily, setFontFamily] = useState('Inter')

  const customTheme = generateTheme({
    primaryColor,
    fontFamily,
    borderRadius: 'md'
  })

  const applyCustomTheme = () => {
    // Применение кастомной темы
    console.log('Кастомная тема:', customTheme)
  }

  return (
    <div>
      <label>
        Основной цвет:
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </label>
      
      <label>
        Семейство шрифтов:
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
        </select>
      </label>

      <button onClick={applyCustomTheme}>
        Применить кастомную тему
      </button>
    </div>
  )
}
```

### Расширение существующей темы

```tsx
import { themePresets, generateTheme } from '@/config/theme.config'

function ExtendedTheme() {
  const baseTheme = themePresets.blue
  
  const extendedTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: {
        light: '#1d4ed8',
        dark: '#3b82f6'
      }
    }
  }

  return (
    <div>
      <h3>Расширенная тема</h3>
      <pre>{JSON.stringify(extendedTheme, null, 2)}</pre>
    </div>
  )
}
```

## Конфигурация пресетов

### Default Theme

```tsx
const defaultTheme: ThemeConfig = {
  colors: {
    background: { light: '#ffffff', dark: '#0a0a0a' },
    foreground: { light: '#0a0a0a', dark: '#fafafa' },
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

### Dark Theme

```tsx
const darkTheme: ThemeConfig = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: { light: '#0a0a0a', dark: '#ffffff' },
    foreground: { light: '#fafafa', dark: '#0a0a0a' },
    primary: { light: '#60a5fa', dark: '#3b82f6' },
    primaryForeground: { light: '#000000', dark: '#ffffff' },
    secondary: { light: '#1e293b', dark: '#f1f5f9' },
    secondaryForeground: { light: '#f1f5f9', dark: '#0f172a' },
    muted: { light: '#1e293b', dark: '#f1f5f9' },
    mutedForeground: { light: '#94a3b8', dark: '#64748b' },
    accent: { light: '#1e293b', dark: '#f1f5f9' },
    accentForeground: { light: '#f1f5f9', dark: '#0f172a' },
    destructive: { light: '#f87171', dark: '#ef4444' },
    destructiveForeground: { light: '#000000', dark: '#ffffff' },
    border: { light: '#334155', dark: '#e2e8f0' },
    input: { light: '#334155', dark: '#e2e8f0' },
    ring: { light: '#60a5fa', dark: '#3b82f6' }
  }
}
```

### Blue Theme

```tsx
const blueTheme: ThemeConfig = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: { light: '#2563eb', dark: '#3b82f6' },
    primaryForeground: { light: '#ffffff', dark: '#ffffff' },
    ring: { light: '#2563eb', dark: '#3b82f6' }
  }
}
```

## Продвинутые примеры

### Создание нового пресета

```tsx
import { generateTheme } from '@/config/theme.config'

const customPreset: ThemeConfig = generateTheme({
  primaryColor: '#8b5cf6',
  secondaryColor: '#f3f4f6',
  borderRadius: 'lg',
  fontFamily: 'Roboto'
})

// Добавление в themePresets
export const extendedThemePresets = {
  ...themePresets,
  custom: customPreset
}
```

### Динамическая генерация тем

```tsx
import { generateTheme } from '@/config/theme.config'

function createBrandTheme(brandColor: string): ThemeConfig {
  return generateTheme({
    primaryColor: brandColor,
    borderRadius: 'md',
    fontFamily: 'Inter'
  })
}

// Использование
const brandTheme = createBrandTheme('#ff6b6b')
```

### Валидация конфигурации

```tsx
import type { ThemeConfig } from '@/types/theme'

function validateThemeConfig(theme: ThemeConfig): string[] {
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

### Экспорт/импорт тем

```tsx
import { themePresets } from '@/config/theme.config'

function exportTheme(preset: ThemePreset): string {
  const theme = themePresets[preset]
  return JSON.stringify(theme, null, 2)
}

function importTheme(themeJson: string): ThemeConfig {
  try {
    const theme = JSON.parse(themeJson)
    const errors = validateThemeConfig(theme)
    
    if (errors.length > 0) {
      throw new Error(`Ошибки валидации: ${errors.join(', ')}`)
    }
    
    return theme
  } catch (error) {
    throw new Error(`Ошибка импорта темы: ${error.message}`)
  }
}
```

## Лучшие практики

### 1. Используйте пресеты как основу

```tsx
// ✅ Хорошо
const customTheme = {
  ...themePresets.default,
  colors: {
    ...themePresets.default.colors,
    primary: { light: '#custom', dark: '#custom' }
  }
}

// ❌ Плохо
const customTheme = {
  colors: { /* все цвета с нуля */ }
}
```

### 2. Валидируйте конфигурации

```tsx
// ✅ Хорошо
function applyTheme(theme: ThemeConfig) {
  const errors = validateThemeConfig(theme)
  if (errors.length > 0) {
    throw new Error(`Ошибки валидации: ${errors.join(', ')}`)
  }
  // Применение темы
}
```

### 3. Используйте функции генерации

```tsx
// ✅ Хорошо
const theme = generateTheme({
  primaryColor: '#3b82f6',
  borderRadius: 'md'
})

// ❌ Плохо
const theme = {
  colors: { /* ручное создание */ }
}
```

### 4. Документируйте кастомные темы

```tsx
// ✅ Хорошо
/**
 * Кастомная тема для бренда
 * Основной цвет: #8b5cf6
 * Радиус: средний
 * Шрифт: Inter
 */
const brandTheme = generateTheme({
  primaryColor: '#8b5cf6',
  borderRadius: 'md',
  fontFamily: 'Inter'
})
```

## Совместимость

- TypeScript 4.9+
- React 18+
- Все современные браузеры
- CSS Custom Properties support

## Связанные утилиты

- [`useTheme`](../hooks/use-theme.md) - Хук для управления темами
- [`css-var-generator`](../utils/css-var-generator.md) - Генерация CSS переменных
- [`types/theme`](../types/theme.md) - Типы тем

---

**Далее:** Вернитесь к [обзору API](../overview.md) или изучите [хуки](../hooks/use-theme.md).
