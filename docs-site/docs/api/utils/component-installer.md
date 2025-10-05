# Component Installer

Утилита для установки shadcn/ui компонентов.

## Импорт

```tsx
import { installComponent, getInstallCommand } from '@/utils/component-installer'
```

## Типы

```tsx
interface InstallOptions {
  componentId: string
  componentName: string
  dependencies?: string[]
}

interface InstallResult {
  success: boolean
  message: string
  command?: string
}

function installComponent(componentId: string): Promise<InstallResult>
function getInstallCommand(componentId: string): string
```

## Функции

### `installComponent(componentId: string): Promise<InstallResult>`

Устанавливает shadcn/ui компонент.

**Параметры:**
- `componentId: string` - ID компонента для установки

**Возвращает:**
- `Promise<InstallResult>` - Результат установки

### `getInstallCommand(componentId: string): string`

Возвращает команду для установки компонента.

**Параметры:**
- `componentId: string` - ID компонента

**Возвращает:**
- `string` - Команда установки

## Примеры использования

### Базовое использование

```tsx
import { installComponent } from '@/utils/component-installer'

function InstallExample() {
  const handleInstall = async (componentId: string) => {
    try {
      const result = await installComponent(componentId)
      if (result.success) {
        console.log('Компонент установлен:', result.message)
      } else {
        console.error('Ошибка установки:', result.message)
      }
    } catch (error) {
      console.error('Ошибка:', error)
    }
  }

  return (
    <button onClick={() => handleInstall('button')}>
      Установить Button
    </button>
  )
}
```

### С обработкой ошибок

```tsx
import { installComponent } from '@/utils/component-installer'
import { useToast } from '@/hooks/use-toast'

function InstallWithToast() {
  const { toast } = useToast()

  const handleInstall = async (componentId: string) => {
    try {
      const result = await installComponent(componentId)
      
      if (result.success) {
        toast({
          title: "Успешно установлено",
          description: result.message,
        })
      } else {
        toast({
          title: "Ошибка установки",
          description: result.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при установке",
        variant: "destructive"
      })
    }
  }

  return (
    <button onClick={() => handleInstall('dialog')}>
      Установить Dialog
    </button>
  )
}
```

### Получение команды установки

```tsx
import { getInstallCommand } from '@/utils/component-installer'

function CommandExample({ componentId }: Props) {
  const command = getInstallCommand(componentId)

  const copyCommand = () => {
    navigator.clipboard.writeText(command)
  }

  return (
    <div>
      <p>Команда для установки:</p>
      <code>{command}</code>
      <button onClick={copyCommand}>
        Копировать
      </button>
    </div>
  )
}
```

## Интеграция с компонентами

### InstallDialog компонент

```tsx
import { installComponent } from '@/utils/component-installer'
import { useState } from 'react'

function InstallDialog({ 
  componentId, 
  componentName, 
  isOpen, 
  onClose 
}: Props) {
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async () => {
    setIsInstalling(true)
    try {
      const result = await installComponent(componentId)
      if (result.success) {
        onClose()
      }
    } catch (error) {
      console.error('Ошибка установки:', error)
    } finally {
      setIsInstalling(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Установка {componentName}</DialogTitle>
          <DialogDescription>
            Установить компонент {componentName} в проект?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button 
            onClick={handleInstall}
            disabled={isInstalling}
          >
            {isInstalling ? 'Установка...' : 'Установить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### ComponentCard с установкой

```tsx
import { installComponent } from '@/utils/component-installer'
import { useState } from 'react'

function ComponentCard({ component }: Props) {
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async () => {
    setIsInstalling(true)
    try {
      const result = await installComponent(component.id)
      if (result.success) {
        // Обновить состояние компонента
        component.installed = true
      }
    } catch (error) {
      console.error('Ошибка установки:', error)
    } finally {
      setIsInstalling(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{component.name}</CardTitle>
        <CardDescription>{component.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {component.installed ? (
          <Badge variant="success">Установлено</Badge>
        ) : (
          <Button 
            onClick={handleInstall}
            disabled={isInstalling}
          >
            {isInstalling ? 'Установка...' : 'Установить'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
```

## Продвинутые примеры

### Массовая установка

```tsx
import { installComponent } from '@/utils/component-installer'
import { useState } from 'react'

function BulkInstall({ components }: Props) {
  const [installing, setInstalling] = useState<string[]>([])
  const [results, setResults] = useState<Record<string, boolean>>({})

  const handleBulkInstall = async () => {
    for (const component of components) {
      setInstalling(prev => [...prev, component.id])
      
      try {
        const result = await installComponent(component.id)
        setResults(prev => ({
          ...prev,
          [component.id]: result.success
        }))
      } catch (error) {
        setResults(prev => ({
          ...prev,
          [component.id]: false
        }))
      } finally {
        setInstalling(prev => prev.filter(id => id !== component.id))
      }
    }
  }

  return (
    <div>
      <button onClick={handleBulkInstall}>
        Установить все компоненты
      </button>
      
      <div>
        {components.map(component => (
          <div key={component.id}>
            {component.name}: {
              installing.includes(component.id) ? 'Установка...' :
              results[component.id] === true ? 'Установлено' :
              results[component.id] === false ? 'Ошибка' :
              'Ожидание'
            }
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Установка с зависимостями

```tsx
import { installComponent } from '@/utils/component-installer'
import { useState } from 'react'

function InstallWithDependencies({ component }: Props) {
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async () => {
    setIsInstalling(true)
    
    try {
      // Установка зависимостей
      if (component.dependencies) {
        for (const dep of component.dependencies) {
          await installComponent(dep)
        }
      }
      
      // Установка основного компонента
      const result = await installComponent(component.id)
      
      if (result.success) {
        console.log('Компонент и зависимости установлены')
      }
    } catch (error) {
      console.error('Ошибка установки:', error)
    } finally {
      setIsInstalling(false)
    }
  }

  return (
    <button 
      onClick={handleInstall}
      disabled={isInstalling}
    >
      {isInstalling ? 'Установка...' : 'Установить'}
    </button>
  )
}
```

### Проверка установки

```tsx
import { installComponent } from '@/utils/component-installer'
import { useState, useEffect } from 'react'

function InstallStatus({ componentId }: Props) {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkInstallation = async () => {
      try {
        // Проверка наличия файлов компонента
        const response = await fetch(`/src/components/ui/${componentId}.tsx`)
        setIsInstalled(response.ok)
      } catch (error) {
        setIsInstalled(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkInstallation()
  }, [componentId])

  if (isChecking) {
    return <div>Проверка...</div>
  }

  return (
    <div>
      Статус: {isInstalled ? 'Установлено' : 'Не установлено'}
    </div>
  )
}
```

## Обработка ошибок

### Типы ошибок

```tsx
interface InstallError extends Error {
  code: 'NETWORK_ERROR' | 'COMPONENT_NOT_FOUND' | 'INSTALLATION_FAILED'
  componentId: string
}

function handleInstallError(error: InstallError) {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Ошибка сети. Проверьте подключение к интернету.'
    case 'COMPONENT_NOT_FOUND':
      return `Компонент ${error.componentId} не найден.`
    case 'INSTALLATION_FAILED':
      return 'Ошибка установки. Попробуйте еще раз.'
    default:
      return 'Неизвестная ошибка.'
  }
}
```

### Retry логика

```tsx
import { installComponent } from '@/utils/component-installer'

async function installWithRetry(
  componentId: string, 
  maxRetries: number = 3
): Promise<InstallResult> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await installComponent(componentId)
      return result
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxRetries) {
        break
      }
      
      // Экспоненциальная задержка
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      )
    }
  }

  return {
    success: false,
    message: `Ошибка после ${maxRetries} попыток: ${lastError.message}`
  }
}
```

## Лучшие практики

### 1. Всегда обрабатывайте ошибки

```tsx
// ✅ Хорошо
try {
  const result = await installComponent(componentId)
  if (result.success) {
    // Успех
  } else {
    // Обработка ошибки
  }
} catch (error) {
  // Обработка исключения
}
```

### 2. Показывайте состояние загрузки

```tsx
// ✅ Хорошо
const [isInstalling, setIsInstalling] = useState(false)

const handleInstall = async () => {
  setIsInstalling(true)
  try {
    await installComponent(componentId)
  } finally {
    setIsInstalling(false)
  }
}
```

### 3. Предоставляйте обратную связь

```tsx
// ✅ Хорошо
const { toast } = useToast()

const handleInstall = async () => {
  try {
    const result = await installComponent(componentId)
    toast({
      title: result.success ? "Успешно" : "Ошибка",
      description: result.message,
      variant: result.success ? "default" : "destructive"
    })
  } catch (error) {
    toast({
      title: "Ошибка",
      description: "Произошла ошибка при установке",
      variant: "destructive"
    })
  }
}
```

### 4. Проверяйте зависимости

```tsx
// ✅ Хорошо
const handleInstall = async () => {
  // Установка зависимостей
  if (component.dependencies) {
    for (const dep of component.dependencies) {
      await installComponent(dep)
    }
  }
  
  // Установка основного компонента
  await installComponent(component.id)
}
```

## Совместимость

- React 18+
- TypeScript 4.9+
- Все современные браузеры
- Node.js 18+ (для CLI команд)

## Связанные утилиты

- [`component-installer`](./component-installer.md) - Установка компонентов
- [`types/component`](../types/component.md) - Типы компонентов

---

**Далее:** Изучите [типы](../types/component.md) или [конфигурацию](../config/theme-config.md).
