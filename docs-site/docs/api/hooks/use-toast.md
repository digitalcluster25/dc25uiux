# useToast Hook

Хук для отображения уведомлений (toast) в приложении.

## Импорт

```tsx
import { useToast } from '@/hooks/use-toast'
```

## Типы

```tsx
interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: 'default' | 'destructive'
  duration?: number
}

interface ToastAction {
  altText: string
  action: () => void
}

interface ToastProps {
  title?: string
  description?: string
  action?: ToastAction
  variant?: 'default' | 'destructive'
  duration?: number
}

interface UseToastReturn {
  toast: (props: ToastProps) => void
  dismiss: (toastId?: string) => void
  toasts: Toast[]
}
```

## Возвращаемые значения

### `toast(props: ToastProps): void`
Функция для отображения уведомления.

### `dismiss(toastId?: string): void`
Функция для закрытия уведомления.

### `toasts: Toast[]`
Массив активных уведомлений.

## Параметры ToastProps

### `title?: string`
Заголовок уведомления.

### `description?: string`
Описание уведомления.

### `action?: ToastAction`
Действие для уведомления:
```tsx
interface ToastAction {
  altText: string  // Текст для кнопки
  action: () => void  // Функция действия
}
```

### `variant?: 'default' | 'destructive'`
Вариант стилизации:
- `'default'` - Обычное уведомление
- `'destructive'` - Уведомление об ошибке

### `duration?: number`
Длительность отображения в миллисекундах (по умолчанию 5000).

## Примеры использования

### Базовое уведомление

```tsx
import { useToast } from '@/hooks/use-toast'

function BasicToast() {
  const { toast } = useToast()

  const showToast = () => {
    toast({
      title: "Уведомление",
      description: "Это базовое уведомление",
    })
  }

  return (
    <button onClick={showToast}>
      Показать уведомление
    </button>
  )
}
```

### Уведомление с действием

```tsx
import { useToast } from '@/hooks/use-toast'

function ActionToast() {
  const { toast } = useToast()

  const showActionToast = () => {
    toast({
      title: "Файл удален",
      description: "Файл был перемещен в корзину",
      action: {
        altText: "Отменить",
        action: () => {
          // Логика отмены удаления
          console.log("Удаление отменено")
        }
      }
    })
  }

  return (
    <button onClick={showActionToast}>
      Удалить файл
    </button>
  )
}
```

### Уведомление об ошибке

```tsx
import { useToast } from '@/hooks/use-toast'

function ErrorToast() {
  const { toast } = useToast()

  const showError = () => {
    toast({
      title: "Ошибка",
      description: "Произошла ошибка при сохранении",
      variant: "destructive"
    })
  }

  return (
    <button onClick={showError}>
      Показать ошибку
    </button>
  )
}
```

### Кастомная длительность

```tsx
import { useToast } from '@/hooks/use-toast'

function CustomDurationToast() {
  const { toast } = useToast()

  const showLongToast = () => {
    toast({
      title: "Долгое уведомление",
      description: "Это уведомление будет отображаться 10 секунд",
      duration: 10000
    })
  }

  return (
    <button onClick={showLongToast}>
      Долгое уведомление
    </button>
  )
}
```

### Программное закрытие

```tsx
import { useToast } from '@/hooks/use-toast'

function DismissToast() {
  const { toast, dismiss } = useToast()

  const showDismissibleToast = () => {
    const toastId = toast({
      title: "Закрываемое уведомление",
      description: "Это уведомление можно закрыть программно",
    })

    // Закрыть через 3 секунды
    setTimeout(() => {
      dismiss(toastId)
    }, 3000)
  }

  return (
    <button onClick={showDismissibleToast}>
      Показать закрываемое уведомление
    </button>
  )
}
```

## Интеграция с формами

### Успешное сохранение

```tsx
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

function FormExample() {
  const { toast } = useToast()
  const [data, setData] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await saveData(data)
      toast({
        title: "Успешно сохранено",
        description: "Данные были успешно сохранены",
      })
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Введите данные"
      />
      <button type="submit">Сохранить</button>
    </form>
  )
}
```

### Валидация

```tsx
import { useToast } from '@/hooks/use-toast'

function ValidationExample() {
  const { toast } = useToast()

  const validateForm = (formData: any) => {
    if (!formData.email) {
      toast({
        title: "Ошибка валидации",
        description: "Email обязателен для заполнения",
        variant: "destructive"
      })
      return false
    }

    if (!formData.password) {
      toast({
        title: "Ошибка валидации", 
        description: "Пароль обязателен для заполнения",
        variant: "destructive"
      })
      return false
    }

    return true
  }

  return (
    <button onClick={() => validateForm({})}>
      Валидировать форму
    </button>
  )
}
```

## Интеграция с API

### Загрузка данных

```tsx
import { useToast } from '@/hooks/use-toast'

function ApiExample() {
  const { toast } = useToast()

  const loadData = async () => {
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      
      toast({
        title: "Данные загружены",
        description: `Загружено ${data.length} записей`,
      })
    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить данные",
        variant: "destructive"
      })
    }
  }

  return (
    <button onClick={loadData}>
      Загрузить данные
    </button>
  )
}
```

### Копирование в буфер обмена

```tsx
import { useToast } from '@/hooks/use-toast'

function CopyExample() {
  const { toast } = useToast()

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Скопировано",
        description: "Текст скопирован в буфер обмена",
      })
    } catch (error) {
      toast({
        title: "Ошибка копирования",
        description: "Не удалось скопировать текст",
        variant: "destructive"
      })
    }
  }

  return (
    <button onClick={() => copyToClipboard("Hello World")}>
      Копировать текст
    </button>
  )
}
```

## Продвинутые примеры

### Цепочка уведомлений

```tsx
import { useToast } from '@/hooks/use-toast'

function ChainToast() {
  const { toast } = useToast()

  const showChain = () => {
    toast({
      title: "Начало процесса",
      description: "Процесс запущен",
    })

    setTimeout(() => {
      toast({
        title: "Промежуточный этап",
        description: "Процесс выполняется",
      })
    }, 2000)

    setTimeout(() => {
      toast({
        title: "Завершение",
        description: "Процесс завершен успешно",
      })
    }, 4000)
  }

  return (
    <button onClick={showChain}>
      Запустить цепочку
    </button>
  )
}
```

### Условные уведомления

```tsx
import { useToast } from '@/hooks/use-toast'

function ConditionalToast() {
  const { toast } = useToast()

  const handleAction = (success: boolean) => {
    if (success) {
      toast({
        title: "Успех",
        description: "Операция выполнена успешно",
      })
    } else {
      toast({
        title: "Ошибка",
        description: "Операция не выполнена",
        variant: "destructive"
      })
    }
  }

  return (
    <div>
      <button onClick={() => handleAction(true)}>
        Успешная операция
      </button>
      <button onClick={() => handleAction(false)}>
        Ошибочная операция
      </button>
    </div>
  )
}
```

## Настройка Toaster

Для отображения уведомлений необходимо добавить компонент `Toaster` в корень приложения:

```tsx
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <div>
      {/* Ваше приложение */}
      <Toaster />
    </div>
  )
}
```

## Стилизация

Уведомления автоматически используют текущую тему приложения. Для кастомизации стилей используйте CSS переменные:

```css
:root {
  --toast-background: hsl(var(--background));
  --toast-foreground: hsl(var(--foreground));
  --toast-border: hsl(var(--border));
  --toast-destructive: hsl(var(--destructive));
}
```

## Производительность

- Уведомления автоматически удаляются после истечения времени
- Максимум 5 уведомлений одновременно
- Старые уведомления автоматически закрываются при превышении лимита

## Совместимость

- React 18+
- TypeScript 4.9+
- Все современные браузеры

## Связанные компоненты

- [`Toast`](../../components/ui/toast.md) - Компонент уведомления
- [`Toaster`](../../components/ui/toaster.md) - Контейнер уведомлений

---

**Далее:** Изучите [утилиты](../utils/cn.md) или [типы](../types/component.md).
