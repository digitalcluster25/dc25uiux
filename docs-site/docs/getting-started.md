# Быстрый старт

Этот гайд поможет вам быстро начать работу с DC25 UI/UX библиотекой.

## Предварительные требования

- Node.js 18+ 
- npm или yarn
- Git

## Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/dc25/uiux.git
cd uiux
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск проекта

```bash
# Режим разработки
npm run dev

# Сборка проекта
npm run build

# Предварительный просмотр сборки
npm run preview
```

## Первые шаги

### 1. Создание компонента

Используйте CLI для создания нового компонента:

```bash
# Простой компонент
npm run generate Button atom

# Компонент с пропсами
npm run generate:advanced Input atom --props '[{"name":"placeholder","type":"string","required":true}]'
```

### 2. Использование компонентов

```tsx
import { Button, Card, Input } from '@/components'

function MyPage() {
  return (
    <Card className="p-6">
      <h1>Моя страница</h1>
      <Input placeholder="Введите текст" />
      <Button>Сохранить</Button>
    </Card>
  )
}
```

### 3. Настройка темы

```tsx
import { ThemeProvider } from '@/context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <MyPage />
    </ThemeProvider>
  )
}
```

## Доступные скрипты

### Разработка
```bash
npm run dev          # Запуск сервера разработки
npm run build        # Сборка проекта
npm run preview      # Предварительный просмотр
```

### Тестирование
```bash
npm run test         # Запуск тестов
npm run test:ui      # Тесты с UI
npm run test:run     # Запуск тестов один раз
npm run test:coverage # Покрытие тестами
```

### Storybook
```bash
npm run storybook    # Запуск Storybook
npm run build-storybook # Сборка Storybook
```

### Качество кода
```bash
npm run lint         # Проверка линтером
npm run lint:fix     # Исправление ошибок
npm run format       # Форматирование кода
```

### Генерация
```bash
npm run generate <name> [type]        # Создание компонента
npm run generate:advanced <name> [options] # Продвинутое создание
```

### Анализ
```bash
npm run analyze      # Анализ bundle size
```

## Структура проекта

```
dc25-uiux/
├── src/
│   ├── components/          # Компоненты
│   │   ├── atoms/          # Атомы (Button, Input, etc.)
│   │   ├── molecules/      # Молекулы (SearchBar, Card, etc.)
│   │   ├── organisms/      # Организмы (Header, Footer, etc.)
│   │   ├── templates/      # Шаблоны (PageTemplate)
│   │   └── ui/            # shadcn/ui компоненты
│   ├── pages/             # Страницы
│   ├── hooks/             # Кастомные хуки
│   ├── utils/             # Утилиты
│   ├── types/             # TypeScript типы
│   ├── config/            # Конфигурация
│   └── context/           # React контексты
├── docs-site/             # Docusaurus документация
├── .storybook/            # Конфигурация Storybook
├── scripts/               # CLI инструменты
└── docs/                  # Документация
```

## Конфигурация

### TypeScript

Проект использует TypeScript с строгой типизацией. Конфигурация находится в `tsconfig.json`.

### Tailwind CSS

Стилизация осуществляется через Tailwind CSS. Конфигурация в `tailwind.config.js`.

### ESLint и Prettier

Качество кода обеспечивается ESLint и Prettier. Конфигурации в соответствующих файлах.

## Примеры использования

### Простая форма

```tsx
import { useState } from 'react'
import { Button, Input, Label, Card } from '@/components'

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, email })
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
          />
        </div>
        <Button type="submit" className="w-full">
          Отправить
        </Button>
      </form>
    </Card>
  )
}
```

### Использование темы

```tsx
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components'

function ThemeToggle() {
  const { mode, setMode, isDark } = useTheme()

  return (
    <Button
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      variant="outline"
    >
      {isDark ? '☀️' : '🌙'} {mode}
    </Button>
  )
}
```

## Следующие шаги

1. 📖 Изучите [архитектуру проекта](./architecture.md)
2. 🎨 Настройте [систему тем](./theming.md)
3. 🧪 Настройте [тестирование](./testing.md)
4. 📚 Используйте [Storybook](./storybook.md)
5. 🔧 Изучите [CLI инструменты](./cli-tools.md)

## Получение помощи

- 📧 Email: support@dc25.com
- 💬 Discord: [dc25.dev/discord](https://discord.gg/dc25)
- 🐛 Issues: [GitHub Issues](https://github.com/dc25/uiux/issues)
- 📖 Документация: [docs.dc25.com](https://docs.dc25.com)

---

**Готовы начать?** Переходите к изучению [архитектуры проекта](./architecture.md) или сразу к [компонентам](../components/atoms/button.md).
