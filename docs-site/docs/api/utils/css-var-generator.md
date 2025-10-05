# CSS Variables Generator

Утилита для генерации CSS переменных из конфигурации темы.

## Импорт

```tsx
import { generateCSSVariables, applyCSSVariables } from '@/utils/css-var-generator'
```

## Типы

```tsx
interface CSSVariables {
  [key: string]: string
}

function generateCSSVariables(
  theme: ThemeConfig, 
  isDark: boolean
): CSSVariables

function applyCSSVariables(variables: CSSVariables): void
```

## Функции

### `generateCSSVariables(theme: ThemeConfig, isDark: boolean): CSSVariables`

Генерирует объект CSS переменных из конфигурации темы.

**Параметры:**
- `theme: ThemeConfig` - Конфигурация темы
- `isDark: boolean` - Флаг темной темы

**Возвращает:**
- `CSSVariables` - Объект с CSS переменными

### `applyCSSVariables(variables: CSSVariables): void`

Применяет CSS переменные к документу.

**Параметры:**
- `variables: CSSVariables` - Объект CSS переменных

## Примеры использования

### Базовое использование

```tsx
import { generateCSSVariables, applyCSSVariables } from '@/utils/css-var-generator'
import { useTheme } from '@/hooks/useTheme'

function ThemeApplier() {
  const { theme, isDark } = useTheme()

  useEffect(() => {
    const cssVars = generateCSSVariables(theme, isDark)
    applyCSSVariables(cssVars)
  }, [theme, isDark])

  return <div>Приложение с примененной темой</div>
}
```

### Кастомная тема

```tsx
import { generateCSSVariables, applyCSSVariables } from '@/utils/css-var-generator'

function CustomThemeExample() {
  const customTheme = {
    colors: {
      background: { light: '#ffffff', dark: '#000000' },
      foreground: { light: '#000000', dark: '#ffffff' },
      primary: { light: '#3b82f6', dark: '#60a5fa' }
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem'
    }
  }

  const applyCustomTheme = () => {
    const cssVars = generateCSSVariables(customTheme, false)
    applyCSSVariables(cssVars)
  }

  return (
    <button onClick={applyCustomTheme}>
      Применить кастомную тему
    </button>
  )
}
```

### Динамическое изменение темы

```tsx
import { generateCSSVariables, applyCSSVariables } from '@/utils/css-var-generator'
import { useState } from 'react'

function DynamicThemeExample() {
  const [isDark, setIsDark] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')

  const theme = {
    colors: {
      background: { light: '#ffffff', dark: '#0a0a0a' },
      foreground: { light: '#0a0a0a', dark: '#fafafa' },
      primary: { light: primaryColor, dark: primaryColor }
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem'
    }
  }

  useEffect(() => {
    const cssVars = generateCSSVariables(theme, isDark)
    applyCSSVariables(cssVars)
  }, [isDark, primaryColor])

  return (
    <div>
      <button onClick={() => setIsDark(!isDark)}>
        Переключить тему
      </button>
      <input
        type="color"
        value={primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
      />
    </div>
  )
}
```

## Структура генерируемых переменных

### Цвета

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #0f172a;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --accent-foreground: #0f172a;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #3b82f6;
}
```

### Радиусы

```css
:root {
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}
```

### Тени

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

## Интеграция с компонентами

### Компонент с CSS переменными

```tsx
import { generateCSSVariables, applyCSSVariables } from '@/utils/css-var-generator'

function ThemedComponent({ theme, isDark }: Props) {
  const [cssVars, setCssVars] = useState({})

  useEffect(() => {
    const variables = generateCSSVariables(theme, isDark)
    setCssVars(variables)
  }, [theme, isDark])

  return (
    <div style={cssVars} className="themed-component">
      <h1>Заголовок</h1>
      <p>Текст с примененными CSS переменными</p>
    </div>
  )
}
```

### Стили с CSS переменными

```css
.themed-component {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.themed-component h1 {
  color: var(--primary);
}

.themed-component p {
  color: var(--muted-foreground);
}
```

## Продвинутые примеры

### Предварительный просмотр темы

```tsx
import { generateCSSVariables, applyCSSVariables } from '@/utils/css-var-generator'

function ThemePreview({ theme, isDark }: Props) {
  const previewRef = useRef<HTMLDivElement>(null)

  const applyPreviewTheme = () => {
    if (previewRef.current) {
      const cssVars = generateCSSVariables(theme, isDark)
      Object.entries(cssVars).forEach(([key, value]) => {
        previewRef.current!.style.setProperty(key, value)
      })
    }
  }

  useEffect(() => {
    applyPreviewTheme()
  }, [theme, isDark])

  return (
    <div ref={previewRef} className="theme-preview">
      <h2>Предварительный просмотр</h2>
      <button>Кнопка</button>
      <input placeholder="Поле ввода" />
    </div>
  )
}
```

### Экспорт CSS переменных

```tsx
import { generateCSSVariables } from '@/utils/css-var-generator'

function ExportTheme({ theme, isDark }: Props) {
  const exportCSS = () => {
    const cssVars = generateCSSVariables(theme, isDark)
    const cssString = Object.entries(cssVars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')

    const fullCSS = `:root {\n${cssString}\n}`
    
    // Создание и скачивание файла
    const blob = new Blob([fullCSS], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'theme.css'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button onClick={exportCSS}>
      Экспортировать CSS
    </button>
  )
}
```

### Импорт CSS переменных

```tsx
import { parseCSSVariables } from '@/utils/css-var-generator'

function ImportTheme({ onThemeImport }: Props) {
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const cssContent = e.target?.result as string
        const cssVars = parseCSSVariables(cssContent)
        onThemeImport(cssVars)
      }
      reader.readAsText(file)
    }
  }

  return (
    <input
      type="file"
      accept=".css"
      onChange={handleFileImport}
    />
  )
}
```

## Оптимизация производительности

### Мемоизация

```tsx
import { generateCSSVariables } from '@/utils/css-var-generator'
import { useMemo } from 'react'

function OptimizedThemeApplier({ theme, isDark }: Props) {
  const cssVars = useMemo(() => 
    generateCSSVariables(theme, isDark), 
    [theme, isDark]
  )

  useEffect(() => {
    applyCSSVariables(cssVars)
  }, [cssVars])

  return <div>Оптимизированный компонент</div>
}
```

### Батчинг обновлений

```tsx
import { generateCSSVariables, applyCSSVariables } from '@/utils/css-var-generator'

function BatchedThemeUpdater({ themes, isDark }: Props) {
  const updateAllThemes = () => {
    const allCssVars = themes.reduce((acc, theme) => {
      const cssVars = generateCSSVariables(theme, isDark)
      return { ...acc, ...cssVars }
    }, {})

    applyCSSVariables(allCssVars)
  }

  return (
    <button onClick={updateAllThemes}>
      Обновить все темы
    </button>
  )
}
```

## Лучшие практики

### 1. Всегда используйте useEffect для применения переменных

```tsx
// ✅ Хорошо
useEffect(() => {
  const cssVars = generateCSSVariables(theme, isDark)
  applyCSSVariables(cssVars)
}, [theme, isDark])
```

### 2. Мемоизируйте генерацию переменных

```tsx
// ✅ Хорошо
const cssVars = useMemo(() => 
  generateCSSVariables(theme, isDark), 
  [theme, isDark]
)
```

### 3. Используйте CSS переменные в стилях

```css
/* ✅ Хорошо */
.component {
  background-color: var(--background);
  color: var(--foreground);
}
```

### 4. Предоставляйте fallback значения

```css
/* ✅ Хорошо */
.component {
  background-color: var(--background, #ffffff);
  color: var(--foreground, #000000);
}
```

## Совместимость

- React 18+
- TypeScript 4.9+
- Все современные браузеры
- CSS Custom Properties support

## Связанные утилиты

- [`useTheme`](../hooks/use-theme.md) - Хук для управления темами
- [`theme-config`](../config/theme-config.md) - Конфигурация тем

---

**Далее:** Изучите [component-installer](./component-installer.md) или [типы](../types/component.md).
