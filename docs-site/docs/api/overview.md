# API Overview

DC25 UI/UX предоставляет полный API для работы с компонентами, темами и утилитами.

## Структура API

### Hooks
Кастомные React хуки для управления состоянием и бизнес-логикой:

- [`useTheme`](./hooks/use-theme.md) - Управление темами
- [`useToast`](./hooks/use-toast.md) - Уведомления

### Utils
Вспомогательные функции:

- [`cn`](./utils/cn.md) - Объединение CSS классов
- [`css-var-generator`](./utils/css-var-generator.md) - Генерация CSS переменных
- [`component-installer`](./utils/component-installer.md) - Установка компонентов

### Types
TypeScript определения:

- [`component`](./types/component.md) - Типы компонентов
- [`theme`](./types/theme.md) - Типы тем
- [`api`](./types/api.md) - API типы

### Config
Конфигурационные файлы:

- [`theme-config`](./config/theme-config.md) - Конфигурация тем

## Быстрый старт

### Импорт хуков

```tsx
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/use-toast'
```

### Импорт утилит

```tsx
import { cn } from '@/utils/cn'
import { generateCSSVariables } from '@/utils/css-var-generator'
import { installComponent } from '@/utils/component-installer'
```

### Импорт типов

```tsx
import type { Component, ComponentFilter } from '@/types/component'
import type { ThemeConfig, ThemeMode } from '@/types/theme'
```

## Примеры использования

### Работа с темами

```tsx
import { useTheme } from '@/hooks/useTheme'

function ThemeToggle() {
  const { mode, setMode, isDark } = useTheme()

  return (
    <button onClick={() => setMode(isDark ? 'light' : 'dark')}>
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
```

### Работа с уведомлениями

```tsx
import { useToast } from '@/hooks/use-toast'

function NotificationExample() {
  const { toast } = useToast()

  const showNotification = () => {
    toast({
      title: "Уведомление",
      description: "Это пример уведомления",
    })
  }

  return <button onClick={showNotification}>Показать уведомление</button>
}
```

### Объединение CSS классов

```tsx
import { cn } from '@/utils/cn'

function MyComponent({ className, variant }: Props) {
  return (
    <div 
      className={cn(
        'base-classes',
        variant === 'primary' && 'primary-classes',
        className
      )}
    >
      Content
    </div>
  )
}
```

## Лучшие практики

### 1. Типизация
Всегда используйте TypeScript типы для лучшей поддержки IDE:

```tsx
import type { ComponentProps } from '@/types/component'

interface MyComponentProps extends ComponentProps {
  customProp: string
}
```

### 2. Обработка ошибок
Всегда обрабатывайте возможные ошибки:

```tsx
import { installComponent } from '@/utils/component-installer'

async function handleInstall(componentId: string) {
  try {
    await installComponent(componentId)
    toast({ title: "Компонент установлен" })
  } catch (error) {
    toast({ 
      title: "Ошибка", 
      description: error.message,
      variant: "destructive"
    })
  }
}
```

### 3. Мемоизация
Используйте мемоизацию для оптимизации производительности:

```tsx
import { useMemo } from 'react'
import { generateCSSVariables } from '@/utils/css-var-generator'

function ThemedComponent({ theme, isDark }: Props) {
  const cssVars = useMemo(() => 
    generateCSSVariables(theme, isDark), 
    [theme, isDark]
  )

  return <div style={cssVars}>Content</div>
}
```

## Совместимость

### React
- React 18+
- React DOM 18+

### TypeScript
- TypeScript 4.9+
- Строгий режим

### Браузеры
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Поддержка

Если у вас есть вопросы по API:

- 📖 [Документация](../intro.md)
- 💬 [Discord](https://discord.gg/dc25)
- 🐛 [GitHub Issues](https://github.com/dc25/uiux/issues)
- 📧 support@dc25.com

---

**Далее:** Изучите [хуки](./hooks/use-theme.md) или [утилиты](./utils/cn.md).
