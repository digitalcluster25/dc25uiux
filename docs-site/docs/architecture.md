# Архитектура

DC25 UI/UX построена на принципах **Atomic Design** и современных практиках веб-разработки.

## Принципы архитектуры

### 🏗️ Atomic Design

Проект следует методологии Atomic Design Брэда Фроста:

- **Atoms (Атомы)** - Базовые элементы интерфейса
- **Molecules (Молекулы)** - Группы атомов, выполняющие конкретную функцию
- **Organisms (Организмы)** - Сложные компоненты из молекул и атомов
- **Templates (Шаблоны)** - Макеты страниц без контента
- **Pages (Страницы)** - Конкретные экземпляры шаблонов с реальным контентом

### 🎯 Разделение ответственности

- **Компоненты** - Только UI логика
- **Хуки** - Бизнес-логика и состояние
- **Утилиты** - Вспомогательные функции
- **Типы** - TypeScript определения
- **Конфигурация** - Настройки и константы

## Структура проекта

```
src/
├── components/           # Компоненты по Atomic Design
│   ├── atoms/           # Атомы
│   │   ├── Button/      # Кнопка
│   │   ├── Input/       # Поле ввода
│   │   ├── Label/       # Метка
│   │   └── Badge/       # Значок
│   ├── molecules/       # Молекулы
│   │   ├── SearchBar/   # Поисковая строка
│   │   ├── FilterGroup/ # Группа фильтров
│   │   ├── ComponentCard/ # Карточка компонента
│   │   └── ThemeCustomizer/ # Редактор темы
│   ├── organisms/       # Организмы
│   │   ├── Header/      # Заголовок
│   │   ├── Footer/      # Подвал
│   │   └── ComponentGrid/ # Сетка компонентов
│   ├── templates/       # Шаблоны
│   │   └── PageTemplate/ # Шаблон страницы
│   └── ui/             # shadcn/ui компоненты
├── pages/              # Страницы приложения
├── hooks/              # Кастомные хуки
├── utils/              # Утилиты
├── types/              # TypeScript типы
├── config/             # Конфигурация
└── context/            # React контексты
```

## Компоненты

### Atoms (Атомы)

Базовые элементы интерфейса, которые нельзя разбить на меньшие части.

```tsx
// Button.tsx
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
  children: React.ReactNode
  className?: string
}

export function Button({ variant = 'default', size = 'default', children, className }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  )
}
```

**Примеры атомов:**
- Button - Кнопка
- Input - Поле ввода
- Label - Метка
- Badge - Значок
- Avatar - Аватар
- Progress - Прогресс-бар

### Molecules (Молекулы)

Группы атомов, выполняющие конкретную функцию.

```tsx
// SearchBar.tsx
interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
}

export function SearchBar({ placeholder = 'Поиск...', onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="submit">Поиск</Button>
    </form>
  )
}
```

**Примеры молекул:**
- SearchBar - Поисковая строка
- FilterGroup - Группа фильтров
- ComponentCard - Карточка компонента
- ThemeCustomizer - Редактор темы
- InstallDialog - Диалог установки

### Organisms (Организмы)

Сложные компоненты из молекул и атомов.

```tsx
// Header.tsx
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            DC25 UI/UX
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/">Главная</Link>
            <Link to="/library">Библиотека</Link>
            <Link to="/theme">Тема</Link>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            ☰
          </button>
        </nav>
      </div>
    </header>
  )
}
```

**Примеры организмов:**
- Header - Заголовок с навигацией
- Footer - Подвал сайта
- ComponentGrid - Сетка компонентов
- Navigation - Навигационное меню

### Templates (Шаблоны)

Макеты страниц без контента.

```tsx
// PageTemplate.tsx
interface PageTemplateProps {
  children: React.ReactNode
}

export function PageTemplate({ children }: PageTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

## Хуки

Кастомные хуки для управления состоянием и бизнес-логикой.

### useTheme

```tsx
// useTheme.ts
export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>('system')
  const [preset, setPreset] = useState<ThemePreset>('default')
  const [customTheme, setCustomTheme] = useState<ThemeConfig | null>(null)

  const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const theme = customTheme || themePresets[preset]

  useEffect(() => {
    const cssVars = generateCSSVariables(theme, isDark)
    applyCSSVariables(cssVars)
  }, [theme, isDark])

  return {
    theme,
    mode,
    preset,
    setMode,
    setPreset,
    updateTheme,
    resetTheme,
    isDark
  }
}
```

## Утилиты

Вспомогательные функции для работы с компонентами.

### cn (classNames)

```tsx
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### CSS Variables Generator

```tsx
// utils/css-var-generator.ts
export function generateCSSVariables(theme: ThemeConfig, isDark: boolean): Record<string, string> {
  return {
    '--background': isDark ? theme.colors.background.dark : theme.colors.background.light,
    '--foreground': isDark ? theme.colors.foreground.dark : theme.colors.foreground.light,
    // ... остальные переменные
  }
}
```

## Типы

TypeScript определения для всех компонентов и утилит.

### Component Types

```tsx
// types/component.ts
export interface Component {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  installed: boolean
  dependencies: string[]
  files: string[]
}

export interface ComponentFilter {
  search: string
  category: string
  tags: string[]
  installed: boolean | null
}
```

### Theme Types

```tsx
// types/theme.ts
export interface ThemeConfig {
  colors: {
    background: { light: string; dark: string }
    foreground: { light: string; dark: string }
    primary: { light: string; dark: string }
    // ... остальные цвета
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
  }
  typography: {
    fontFamily: string
    fontSize: Record<string, string>
    fontWeight: Record<string, string>
  }
  spacing: Record<string, string>
  shadows: Record<string, string>
}
```

## Конфигурация

### Theme Config

```tsx
// config/theme.config.ts
export const themePresets: Record<ThemePreset, ThemeConfig> = {
  default: {
    colors: {
      background: { light: '#ffffff', dark: '#0a0a0a' },
      foreground: { light: '#0a0a0a', dark: '#fafafa' },
      // ... остальные цвета
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem'
    },
    // ... остальная конфигурация
  },
  // ... остальные пресеты
}
```

## Паттерны

### Композиция компонентов

```tsx
// Использование композиции
function UserProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Профиль пользователя</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/user.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h3>Иван Иванов</h3>
            <p>ivan@example.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Условный рендеринг

```tsx
function ConditionalComponent({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null
  
  return (
    <div className="p-4">
      {children}
    </div>
  )
}
```

### Обработка состояний

```tsx
function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Skeleton />
  if (error) return <Alert variant="destructive">{error.message}</Alert>
  if (!data) return <div>Нет данных</div>

  return <div>{/* Рендер данных */}</div>
}
```

## Лучшие практики

### 1. Именование компонентов

- Используйте PascalCase для компонентов
- Описывайте назначение в названии
- Группируйте по функциональности

### 2. Пропсы

- Делайте пропсы опциональными где возможно
- Используйте TypeScript для типизации
- Предоставляйте значения по умолчанию

### 3. Стилизация

- Используйте Tailwind CSS классы
- Применяйте cn() для объединения классов
- Следуйте дизайн-системе

### 4. Тестирование

- Покрывайте компоненты тестами
- Тестируйте различные состояния
- Используйте Storybook для демонстрации

## Расширение архитектуры

### Добавление нового компонента

1. Определите уровень (atom/molecule/organism)
2. Создайте структуру файлов
3. Добавьте TypeScript типы
4. Напишите тесты
5. Создайте Storybook story
6. Обновите barrel файлы

### Создание нового хука

1. Определите назначение хука
2. Создайте типы для параметров и возвращаемых значений
3. Реализуйте логику
4. Добавьте тесты
5. Экспортируйте из index.ts

---

**Далее:** Изучите [руководство по компонентам](./component-guidelines.md) или перейдите к [системе тем](./theming.md).
