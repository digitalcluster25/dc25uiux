# Руководство по созданию компонентов

## 🎯 Общие принципы

### 1. Единственная ответственность
Каждый компонент должен решать одну конкретную задачу.

```tsx
// ✅ Хорошо
const Button = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
)

// ❌ Плохо
const ButtonWithModal = ({ children, onClick, showModal }) => (
  <>
    <button onClick={onClick}>{children}</button>
    {showModal && <Modal />}
  </>
)
```

### 2. Переиспользуемость
Компоненты должны быть универсальными и работать в разных контекстах.

```tsx
// ✅ Хорошо
const Input = ({ label, error, ...props }) => (
  <div>
    {label && <Label>{label}</Label>}
    <input {...props} />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </div>
)

// ❌ Плохо
const LoginInput = () => (
  <input placeholder="Введите email" type="email" />
)
```

### 3. Предсказуемость
Поведение компонента должно быть предсказуемым и документированным.

## 🧩 Уровни компонентов

### Atoms (Атомы)

**Характеристики:**
- Минимальная функциональность
- Высокая переиспользуемость
- Нет внутреннего состояния (кроме UI состояния)
- Не зависят от других компонентов

**Пример:**
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick
}) => {
  const baseClasses = 'font-medium transition-colors focus:outline-none'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700'
  }
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### Molecules (Молекулы)

**Характеристики:**
- Комбинация атомов
- Конкретная функциональность
- Может содержать простую логику
- Переиспользуемы в разных контекстах

**Пример:**
```tsx
interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Поиск...',
  onSearch,
  className
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
    </form>
  )
}
```

### Organisms (Организмы)

**Характеристики:**
- Сложные компоненты
- Содержат бизнес-логику
- Могут управлять состоянием
- Часто уникальны для контекста

**Пример:**
```tsx
interface ComponentGridProps {
  components: Component[]
  onInstall: (id: string) => void
  onDemo: (id: string) => void
}

export const ComponentGrid: React.FC<ComponentGridProps> = ({
  components,
  onInstall,
  onDemo
}) => {
  const [filteredComponents, setFilteredComponents] = useState(components)

  const handleSearch = (query: string) => {
    const filtered = components.filter(component =>
      component.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredComponents(filtered)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-3 gap-4">
        {filteredComponents.map(component => (
          <ComponentCard
            key={component.id}
            component={component}
            onInstall={onInstall}
            onDemo={onDemo}
          />
        ))}
      </div>
    </div>
  )
}
```

## 📝 Соглашения по коду

### Именование

**Компоненты:**
```tsx
// ✅ PascalCase
const UserProfile = () => {}
const SearchBar = () => {}
const ComponentGrid = () => {}
```

**Props:**
```tsx
// ✅ camelCase
interface ButtonProps {
  isLoading: boolean
  onClick: () => void
  children: React.ReactNode
}
```

**CSS классы:**
```tsx
// ✅ kebab-case (Tailwind)
className="bg-blue-600 text-white hover:bg-blue-700"
```

### Структура файлов

```
components/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   └── index.ts
├── molecules/
│   ├── SearchBar/
│   │   ├── SearchBar.tsx
│   │   ├── SearchBar.test.tsx
│   │   ├── SearchBar.stories.tsx
│   │   └── index.ts
│   └── index.ts
└── index.ts
```

### Импорты

```tsx
// ✅ Группировка и сортировка
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button, Input } from '@/components/atoms'
import { SearchBar } from '@/components/molecules'
import { ComponentGrid } from '@/components/organisms'

import { Component } from '@/types/component'
import { useTheme } from '@/hooks/useTheme'
```

## 🧪 Тестирование

### Unit тесты для Atoms
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Integration тесты для Molecules
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('calls onSearch with query when form is submitted', () => {
    const handleSearch = jest.fn()
    render(<SearchBar onSearch={handleSearch} />)
    
    const input = screen.getByPlaceholderText('Поиск...')
    fireEvent.change(input, { target: { value: 'test query' } })
    fireEvent.submit(screen.getByRole('form'))
    
    expect(handleSearch).toHaveBeenCalledWith('test query')
  })
})
```

## 📚 Storybook

### Stories для компонентов
```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}
```

## 🎨 Стилизация

### Tailwind CSS
```tsx
// ✅ Используйте утилиты Tailwind
const Button = ({ variant, children }) => (
  <button className={`
    px-4 py-2 rounded-lg font-medium transition-colors
    ${variant === 'primary' 
      ? 'bg-blue-600 text-white hover:bg-blue-700' 
      : 'bg-gray-600 text-white hover:bg-gray-700'
    }
  `}>
    {children}
  </button>
)
```

### CSS переменные для тем
```tsx
// ✅ Используйте CSS переменные
const Button = ({ children }) => (
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    {children}
  </button>
)
```

## 🔧 Инструменты

### ESLint правила
```json
{
  "extends": [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
```

### Prettier конфигурация
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 📋 Чек-лист для новых компонентов

- [ ] Компонент следует принципам Atomic Design
- [ ] Единственная ответственность
- [ ] Переиспользуемость
- [ ] TypeScript типизация
- [ ] JSDoc документация
- [ ] Unit тесты
- [ ] Storybook stories
- [ ] Доступность (a11y)
- [ ] Responsive дизайн
- [ ] Темная тема поддержка
