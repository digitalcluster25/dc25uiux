# useTheme Hook

Хук для управления темами приложения.

## Импорт

```tsx
import { useTheme } from '@/hooks/useTheme'
```

## Типы

```tsx
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

type ThemeMode = 'light' | 'dark' | 'system'
type ThemePreset = 'default' | 'dark' | 'blue' | 'purple' | 'green' | 'orange'
```

## Возвращаемые значения

### `theme: ThemeConfig`
Текущая конфигурация темы.

### `mode: ThemeMode`
Текущий режим темы:
- `'light'` - Светлая тема
- `'dark'` - Темная тема  
- `'system'` - Системная тема

### `preset: ThemePreset`
Текущий пресет темы:
- `'default'` - Базовая тема
- `'dark'` - Темная тема
- `'blue'` - Синяя тема
- `'purple'` - Фиолетовая тема
- `'green'` - Зеленая тема
- `'orange'` - Оранжевая тема

### `isDark: boolean`
Определяет, активна ли темная тема.

### `setMode(mode: ThemeMode): void`
Устанавливает режим темы.

### `setPreset(preset: ThemePreset): void`
Устанавливает пресет темы.

### `updateTheme(updates: Partial<ThemeConfig>): void`
Обновляет конфигурацию темы.

### `resetTheme(): void`
Сбрасывает тему к значениям по умолчанию.

## Примеры использования

### Базовое использование

```tsx
import { useTheme } from '@/hooks/useTheme'

function ThemeExample() {
  const { mode, setMode, isDark } = useTheme()

  return (
    <div>
      <p>Текущий режим: {mode}</p>
      <p>Темная тема: {isDark ? 'Да' : 'Нет'}</p>
      <button onClick={() => setMode('light')}>
        Светлая тема
      </button>
      <button onClick={() => setMode('dark')}>
        Темная тема
      </button>
      <button onClick={() => setMode('system')}>
        Системная тема
      </button>
    </div>
  )
}
```

### Переключение темы

```tsx
import { useTheme } from '@/hooks/useTheme'

function ThemeToggle() {
  const { mode, setMode, isDark } = useTheme()

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark')
  }

  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️ Светлая' : '🌙 Темная'}
    </button>
  )
}
```

### Работа с пресетами

```tsx
import { useTheme } from '@/hooks/useTheme'

function PresetSelector() {
  const { preset, setPreset } = useTheme()

  const presets = [
    { id: 'default', name: 'Базовая', color: '#3b82f6' },
    { id: 'dark', name: 'Темная', color: '#1f2937' },
    { id: 'blue', name: 'Синяя', color: '#2563eb' },
    { id: 'purple', name: 'Фиолетовая', color: '#7c3aed' },
    { id: 'green', name: 'Зеленая', color: '#059669' },
    { id: 'orange', name: 'Оранжевая', color: '#ea580c' },
  ]

  return (
    <div className="grid grid-cols-3 gap-2">
      {presets.map((presetOption) => (
        <button
          key={presetOption.id}
          onClick={() => setPreset(presetOption.id as any)}
          className={`p-2 rounded ${
            preset === presetOption.id ? 'ring-2 ring-blue-500' : ''
          }`}
          style={{ backgroundColor: presetOption.color }}
        >
          {presetOption.name}
        </button>
      ))}
    </div>
  )
}
```

### Кастомизация темы

```tsx
import { useTheme } from '@/hooks/useTheme'

function ThemeCustomizer() {
  const { theme, updateTheme } = useTheme()

  const updatePrimaryColor = (color: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        primary: {
          light: color,
          dark: color,
        }
      }
    })
  }

  return (
    <div>
      <label>
        Основной цвет:
        <input
          type="color"
          value={theme.colors.primary.light}
          onChange={(e) => updatePrimaryColor(e.target.value)}
        />
      </label>
    </div>
  )
}
```

### Сброс темы

```tsx
import { useTheme } from '@/hooks/useTheme'

function ThemeReset() {
  const { resetTheme } = useTheme()

  return (
    <button 
      onClick={resetTheme}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Сбросить тему
    </button>
  )
}
```

## Интеграция с компонентами

### Условный рендеринг

```tsx
import { useTheme } from '@/hooks/useTheme'

function ThemedComponent() {
  const { isDark } = useTheme()

  return (
    <div className={isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      <h1>Заголовок</h1>
      <p>Содержимое компонента</p>
    </div>
  )
}
```

### CSS переменные

```tsx
import { useTheme } from '@/hooks/useTheme'
import { generateCSSVariables } from '@/utils/css-var-generator'

function CSSVariableExample() {
  const { theme, isDark } = useTheme()
  
  const cssVars = generateCSSVariables(theme, isDark)

  return (
    <div style={cssVars}>
      <p>Этот текст использует CSS переменные темы</p>
    </div>
  )
}
```

## Состояние и персистентность

Хук автоматически сохраняет состояние в `localStorage`:

- `theme-mode` - Режим темы
- `theme-preset` - Пресет темы  
- `theme-custom` - Кастомная конфигурация

## Слушатели системной темы

При режиме `'system'` хук автоматически отслеживает изменения системной темы:

```tsx
// Автоматически обновляется при изменении системной темы
const { mode, isDark } = useTheme()

if (mode === 'system') {
  // isDark будет обновляться автоматически
}
```

## Ошибки и исключения

### Неверный режим темы
```tsx
// ❌ Неправильно
setMode('invalid-mode') // TypeScript ошибка

// ✅ Правильно  
setMode('light' | 'dark' | 'system')
```

### Неверный пресет
```tsx
// ❌ Неправильно
setPreset('invalid-preset') // TypeScript ошибка

// ✅ Правильно
setPreset('default' | 'dark' | 'blue' | 'purple' | 'green' | 'orange')
```

## Производительность

Хук оптимизирован для производительности:

- Мемоизация вычислений
- Ленивая инициализация
- Минимальные ре-рендеры

## Совместимость

- React 18+
- TypeScript 4.9+
- Все современные браузеры

## Связанные хуки

- [`useToast`](./use-toast.md) - Уведомления
- [`useLocalStorage`](../utils/use-local-storage.md) - Локальное хранилище

---

**Далее:** Изучите [useToast](./use-toast.md) или [утилиты](../utils/cn.md).
