# Введение

Добро пожаловать в **DC25 UI/UX** - полноценную UI/UX библиотеку на базе shadcn/ui с гарантированной работоспособностью.

## Что такое DC25 UI/UX?

DC25 UI/UX - это современная библиотека компонентов, построенная на принципах Atomic Design и использующая лучшие практики современной веб-разработки. Библиотека предоставляет:

- 🎨 **33 готовых компонента** shadcn/ui
- 🏗️ **Atomic Design архитектуру** (atoms, molecules, organisms, templates)
- 🎯 **TypeScript поддержку** с полной типизацией
- 🧪 **Тестирование** с Vitest и React Testing Library
- 📚 **Storybook** для демонстрации компонентов
- 🎨 **Систему тем** с 6 предустановленными вариантами
- ⚡ **PWA поддержку** с Service Worker
- 🔧 **CLI инструменты** для генерации компонентов
- 📖 **Полную документацию** с примерами

## Основные возможности

### ✨ Готовые компоненты
- Все компоненты shadcn/ui установлены и настроены
- Автоматическая типизация и валидация
- Консистентный дизайн и поведение

### 🎨 Система тем
- 6 предустановленных тем (default, dark, blue, purple, green, orange)
- Интерактивный редактор тем
- CSS переменные для кастомизации
- Поддержка темной/светлой темы

### 🏗️ Архитектура
- Atomic Design принципы
- Модульная структура
- Переиспользуемые компоненты
- Четкое разделение ответственности

### 🧪 Качество кода
- 100% TypeScript покрытие
- Автоматическое тестирование
- Линтинг и форматирование
- Pre-commit хуки

### ⚡ Производительность
- Lazy loading компонентов
- Code splitting по маршрутам
- PWA с кэшированием
- Оптимизированный bundle

## Быстрый старт

### Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/dc25/uiux.git
cd uiux

# Установите зависимости
npm install

# Запустите проект
npm run dev
```

### Использование компонентов

```tsx
import { Button, Card, Input } from '@/components'

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Введите текст" />
      <Button>Нажми меня</Button>
    </Card>
  )
}
```

### Настройка темы

```tsx
import { ThemeProvider } from '@/context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      {/* Ваше приложение */}
    </ThemeProvider>
  )
}
```

## Структура проекта

```
src/
├── components/           # Компоненты по Atomic Design
│   ├── atoms/           # Базовые компоненты
│   ├── molecules/       # Составные компоненты
│   ├── organisms/       # Сложные компоненты
│   ├── templates/       # Шаблоны страниц
│   └── ui/             # shadcn/ui компоненты
├── pages/              # Страницы приложения
├── hooks/              # Кастомные хуки
├── utils/              # Утилиты
├── types/              # TypeScript типы
├── config/             # Конфигурация
└── context/            # React контексты
```

## Что дальше?

- 📖 [Быстрый старт](./getting-started.md) - Начните работу с библиотекой
- 🏗️ [Архитектура](./architecture.md) - Узнайте о структуре проекта
- 🎨 [Компоненты](../components/atoms/button.md) - Изучите доступные компоненты
- 🧪 [Тестирование](./testing.md) - Настройте тестирование
- 📚 [Storybook](./storybook.md) - Используйте Storybook для разработки

## Поддержка

- 📧 Email: support@dc25.com
- 💬 Discord: [dc25.dev/discord](https://discord.gg/dc25)
- 🐛 Issues: [GitHub Issues](https://github.com/dc25/uiux/issues)
- 📖 Документация: [docs.dc25.com](https://docs.dc25.com)

## Лицензия

MIT License - см. [LICENSE](https://github.com/dc25/uiux/blob/main/LICENSE) для подробностей.

---

**DC25 UI/UX** - создано с ❤️ командой Digital Cluster 25