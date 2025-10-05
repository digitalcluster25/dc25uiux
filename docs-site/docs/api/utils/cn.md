# cn Utility

Утилита для объединения CSS классов с поддержкой условной логики.

## Импорт

```tsx
import { cn } from '@/utils/cn'
```

## Типы

```tsx
type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | ClassValue[] 
  | Record<string, boolean>

function cn(...inputs: ClassValue[]): string
```

## Параметры

### `...inputs: ClassValue[]`
CSS классы для объединения. Поддерживаются:
- Строки
- Числа
- Булевы значения
- `undefined` и `null`
- Массивы
- Объекты с булевыми значениями

## Возвращаемое значение

### `string`
Объединенная строка CSS классов.

## Примеры использования

### Базовое объединение

```tsx
import { cn } from '@/utils/cn'

function BasicExample() {
  return (
    <div className={cn('base-class', 'additional-class')}>
      Content
    </div>
  )
}
```

### Условные классы

```tsx
import { cn } from '@/utils/cn'

function ConditionalExample({ isActive, variant }: Props) {
  return (
    <div 
      className={cn(
        'base-class',
        isActive && 'active-class',
        variant === 'primary' && 'primary-class'
      )}
    >
      Content
    </div>
  )
}
```

### Объектная нотация

```tsx
import { cn } from '@/utils/cn'

function ObjectExample({ isActive, isDisabled }: Props) {
  return (
    <div 
      className={cn('base-class', {
        'active-class': isActive,
        'disabled-class': isDisabled,
        'hover-class': !isDisabled
      })}
    >
      Content
    </div>
  )
}
```

### Массивы

```tsx
import { cn } from '@/utils/cn'

function ArrayExample({ classes }: Props) {
  return (
    <div 
      className={cn('base-class', [
        'array-class-1',
        'array-class-2',
        classes
      ])}
    >
      Content
    </div>
  )
}
```

### Смешанное использование

```tsx
import { cn } from '@/utils/cn'

function MixedExample({ 
  isActive, 
  variant, 
  className, 
  customClasses 
}: Props) {
  return (
    <div 
      className={cn(
        'base-class',
        isActive && 'active-class',
        {
          'primary-class': variant === 'primary',
          'secondary-class': variant === 'secondary'
        },
        customClasses,
        className
      )}
    >
      Content
    </div>
  )
}
```

## Интеграция с компонентами

### Button компонент

```tsx
import { cn } from '@/utils/cn'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'base-button',
        {
          'primary-button': variant === 'primary',
          'secondary-button': variant === 'secondary',
          'outline-button': variant === 'outline',
          'small-button': size === 'sm',
          'medium-button': size === 'md',
          'large-button': size === 'lg',
          'disabled-button': disabled
        },
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
}
```

### Card компонент

```tsx
import { cn } from '@/utils/cn'

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}

function Card({ 
  variant = 'default', 
  padding = 'md',
  className,
  children 
}: CardProps) {
  return (
    <div
      className={cn(
        'base-card',
        {
          'default-card': variant === 'default',
          'elevated-card': variant === 'elevated',
          'outlined-card': variant === 'outlined',
          'padding-sm': padding === 'sm',
          'padding-md': padding === 'md',
          'padding-lg': padding === 'lg'
        },
        className
      )}
    >
      {children}
    </div>
  )
}
```

## Работа с Tailwind CSS

### Условные классы Tailwind

```tsx
import { cn } from '@/utils/cn'

function TailwindExample({ isDark, isLarge }: Props) {
  return (
    <div 
      className={cn(
        'p-4 rounded-lg transition-colors',
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
        isLarge ? 'text-lg' : 'text-base',
        'hover:bg-gray-100 dark:hover:bg-gray-800'
      )}
    >
      Content
    </div>
  )
}
```

### Responsive классы

```tsx
import { cn } from '@/utils/cn'

function ResponsiveExample({ isMobile }: Props) {
  return (
    <div 
      className={cn(
        'grid gap-4',
        isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      )}
    >
      Content
    </div>
  )
}
```

## Продвинутые примеры

### Компонент с множественными вариантами

```tsx
import { cn } from '@/utils/cn'

interface AlertProps {
  variant?: 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  className?: string
}

function Alert({ 
  variant = 'info', 
  size = 'md', 
  closable = false,
  className,
  children 
}: AlertProps) {
  return (
    <div
      className={cn(
        'alert-base',
        {
          // Variants
          'alert-success': variant === 'success',
          'alert-warning': variant === 'warning',
          'alert-error': variant === 'error',
          'alert-info': variant === 'info',
          
          // Sizes
          'alert-sm': size === 'sm',
          'alert-md': size === 'md',
          'alert-lg': size === 'lg',
          
          // States
          'alert-closable': closable
        },
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Динамические классы

```tsx
import { cn } from '@/utils/cn'

function DynamicExample({ 
  color, 
  intensity, 
  className 
}: Props) {
  const colorClasses = {
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white'
  }

  const intensityClasses = {
    light: 'opacity-50',
    normal: 'opacity-75',
    strong: 'opacity-100'
  }

  return (
    <div
      className={cn(
        'p-4 rounded-lg',
        colorClasses[color],
        intensityClasses[intensity],
        className
      )}
    >
      Dynamic content
    </div>
  )
}
```

### Композиция классов

```tsx
import { cn } from '@/utils/cn'

function CompositionExample({ 
  baseClasses, 
  conditionalClasses, 
  overrideClasses,
  className 
}: Props) {
  return (
    <div
      className={cn(
        baseClasses,
        conditionalClasses,
        overrideClasses,
        className
      )}
    >
      Content
    </div>
  )
}
```

## Оптимизация производительности

### Мемоизация

```tsx
import { cn } from '@/utils/cn'
import { useMemo } from 'react'

function MemoizedExample({ isActive, variant, className }: Props) {
  const classes = useMemo(() => 
    cn(
      'base-class',
      isActive && 'active-class',
      variant === 'primary' && 'primary-class',
      className
    ), 
    [isActive, variant, className]
  )

  return <div className={classes}>Content</div>
}
```

### Предварительное вычисление

```tsx
import { cn } from '@/utils/cn'

// Предварительно вычисленные классы
const BUTTON_CLASSES = {
  primary: cn('btn', 'btn-primary'),
  secondary: cn('btn', 'btn-secondary'),
  outline: cn('btn', 'btn-outline')
}

function PrecomputedExample({ variant }: Props) {
  return (
    <button className={BUTTON_CLASSES[variant]}>
      Button
    </button>
  )
}
```

## Лучшие практики

### 1. Всегда используйте cn для условных классов

```tsx
// ❌ Плохо
<div className={`base-class ${isActive ? 'active-class' : ''}`}>

// ✅ Хорошо
<div className={cn('base-class', isActive && 'active-class')}>
```

### 2. Группируйте связанные классы

```tsx
// ✅ Хорошо
className={cn(
  'base-class',
  {
    'active-class': isActive,
    'disabled-class': isDisabled
  },
  className
)}
```

### 3. Используйте объектную нотацию для множественных условий

```tsx
// ✅ Хорошо
className={cn('base-class', {
  'primary-class': variant === 'primary',
  'secondary-class': variant === 'secondary',
  'large-class': size === 'lg'
})}
```

### 4. Предоставляйте className prop для кастомизации

```tsx
// ✅ Хорошо
interface Props {
  className?: string
  // ... другие пропсы
}

function Component({ className, ...props }: Props) {
  return (
    <div className={cn('base-class', className)} {...props} />
  )
}
```

## Совместимость

- React 18+
- TypeScript 4.9+
- Все современные браузеры
- Tailwind CSS 3.0+

## Связанные утилиты

- [`clsx`](https://github.com/lukeed/clsx) - Базовая библиотека для объединения классов
- [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) - Объединение Tailwind классов

---

**Далее:** Изучите [css-var-generator](./css-var-generator.md) или [component-installer](./component-installer.md).
