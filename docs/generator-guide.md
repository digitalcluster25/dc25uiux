# Генератор кода компонентов

Руководство по использованию генератора кода компонентов DC25 UI/UX.

## Обзор

Генератор кода компонентов позволяет быстро создавать React TypeScript компоненты с полной структурой файлов, тестами, Storybook историями и типами.

## Доступные генераторы

### 1. Yeoman Generator (Рекомендуется)

Полнофункциональный генератор с интерактивным интерфейсом.

```bash
# Установка
npm install -g generator-dc25-uiux

# Использование
yo dc25-uiux
```

### 2. Custom Script

Альтернативный скрипт для случаев, когда Yeoman недоступен.

```bash
# Использование
node scripts/generate-component.js --component="Button" --type="atom" --template="advanced"
```

### 3. NPM Scripts

Удобные команды для быстрой генерации.

```bash
# Генерация компонента
npm run generate:component -- --component="Button" --type="atom"

# Генерация атома
npm run generate:atom -- --component="Button"

# Генерация молекулы
npm run generate:molecule -- --component="SearchBar"

# Генерация организма
npm run generate:organism -- --component="Header"
```

## Типы компонентов

### Atom (Атом)
Базовые строительные блоки UI.

**Характеристики:**
- Простые, переиспользуемые компоненты
- Минимальная логика
- Высокая переиспользуемость

**Примеры:** Button, Input, Label, Badge, Icon

**Структура файлов:**
```
src/components/atoms/
├── Button.tsx
├── __tests__/
│   └── Button.test.tsx
└── index.ts

src/stories/
└── Button.stories.tsx

src/types/
└── button.ts
```

### Molecule (Молекула)
Простые комбинации атомов.

**Характеристики:**
- Объединяют несколько атомов
- Имеют определенную функциональность
- Средняя сложность

**Примеры:** SearchBar, FilterGroup, ComponentCard, FormField

**Структура файлов:**
```
src/components/molecules/
├── SearchBar.tsx
├── __tests__/
│   └── SearchBar.test.tsx
└── index.ts

src/stories/
└── SearchBar.stories.tsx

src/types/
└── searchbar.ts

src/hooks/
└── useSearchBar.ts (опционально)
```

### Organism (Организм)
Сложные компоненты, объединяющие молекулы и атомы.

**Характеристики:**
- Полные секции UI
- Сложная логика
- Интеграция с внешними системами

**Примеры:** Header, Footer, ComponentGrid, DataTable

**Структура файлов:**
```
src/components/organisms/
├── Header.tsx
├── __tests__/
│   └── Header.test.tsx
└── index.ts

src/stories/
└── Header.stories.tsx

src/types/
└── header.ts

src/hooks/
└── useHeader.ts (опционально)
```

## Шаблоны компонентов

### Basic (Базовый)
Простой компонент с минимальной функциональностью.

**Особенности:**
- Базовая структура
- Простые пропсы
- Минимальное стилирование

**Использование:**
```bash
node scripts/generate-component.js --component="Badge" --type="atom" --template="basic"
```

### Advanced (Продвинутый)
Компонент с расширенными возможностями.

**Особенности:**
- Варианты и размеры
- Состояния (loading, disabled)
- Сложная стилизация
- Поддержка хуков

**Использование:**
```bash
node scripts/generate-component.js --component="Button" --type="atom" --template="advanced" --with-variants
```

### Form (Формы)
Компонент для работы с формами.

**Особенности:**
- Валидация
- Состояния ошибок
- Поддержка label и placeholder
- Интеграция с формами

**Использование:**
```bash
node scripts/generate-component.js --component="Input" --type="atom" --template="form" --with-variants
```

### Layout (Макет)
Компонент для организации макета.

**Особенности:**
- Flexbox утилиты
- Направление и выравнивание
- Отступы и промежутки
- Адаптивность

**Использование:**
```bash
node scripts/generate-component.js --component="Flex" --type="molecule" --template="layout" --with-variants
```

## Опции генерации

### Основные опции

| Опция | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `--component` | String | - | Название компонента (обязательно) |
| `--type` | String | `atom` | Тип компонента |
| `--template` | String | `basic` | Шаблон компонента |

### Дополнительные опции

| Опция | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `--no-tests` | Boolean | `false` | Не создавать тесты |
| `--no-story` | Boolean | `false` | Не создавать Storybook истории |
| `--no-props` | Boolean | `false` | Не создавать интерфейс пропсов |
| `--with-variants` | Boolean | `false` | Создать варианты |
| `--with-hooks` | Boolean | `false` | Создать кастомные хуки |

## Примеры использования

### 1. Простой атом

```bash
node scripts/generate-component.js --component="Badge" --type="atom" --template="basic"
```

**Результат:**
- `src/components/atoms/Badge.tsx`
- `src/components/atoms/__tests__/Badge.test.tsx`
- `src/stories/Badge.stories.tsx`
- `src/types/badge.ts`

### 2. Продвинутая кнопка

```bash
node scripts/generate-component.js --component="Button" --type="atom" --template="advanced" --with-variants
```

**Результат:**
- `src/components/atoms/Button.tsx` (с вариантами)
- `src/components/atoms/__tests__/Button.test.tsx`
- `src/stories/Button.stories.tsx` (с вариантами)
- `src/types/button.ts` (с вариантами)

### 3. Форма ввода

```bash
node scripts/generate-component.js --component="Input" --type="atom" --template="form" --with-variants
```

**Результат:**
- `src/components/atoms/Input.tsx` (с валидацией)
- `src/components/atoms/__tests__/Input.test.tsx`
- `src/stories/Input.stories.tsx` (с состояниями)
- `src/types/input.ts` (с вариантами)

### 4. Макет компонент

```bash
node scripts/generate-component.js --component="Flex" --type="molecule" --template="layout" --with-variants --with-hooks
```

**Результат:**
- `src/components/molecules/Flex.tsx` (с Flexbox утилитами)
- `src/components/molecules/__tests__/Flex.test.tsx`
- `src/stories/Flex.stories.tsx` (с вариантами)
- `src/types/flex.ts` (с вариантами)
- `src/hooks/useFlex.ts` (кастомный хук)

### 5. Сложный организм

```bash
node scripts/generate-component.js --component="DataTable" --type="organism" --template="advanced" --with-variants --with-hooks
```

**Результат:**
- `src/components/organisms/DataTable.tsx` (сложная логика)
- `src/components/organisms/__tests__/DataTable.test.tsx`
- `src/stories/DataTable.stories.tsx` (с вариантами)
- `src/types/datatable.ts` (с вариантами)
- `src/hooks/useDataTable.ts` (кастомный хук)

## Структура генерируемых файлов

### Компонент

```typescript
// src/components/{type}s/ComponentName.tsx
import React from 'react';
import { cn } from '@/utils/cn';

export interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
  // Custom props
}

export default function ComponentName({ 
  className,
  children,
  ...props 
}: ComponentNameProps) {
  return (
    <div
      data-testid="componentname"
      className={cn(
        // Styling
        className
      )}
      {...props}
    >
      {children || 'ComponentName'}
    </div>
  );
}
```

### Тесты

```typescript
// src/components/{type}s/__tests__/ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(<ComponentName />);
    expect(screen.getByTestId('componentname')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<ComponentName className={customClass} />);
    expect(screen.getByTestId('componentname')).toHaveClass(customClass);
  });
});
```

### Storybook

```typescript
// src/stories/ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src/components/{type}s/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: '{type}s/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
```

### Типы

```typescript
// src/types/componentname.ts
export interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
  // Custom props
}

export interface ComponentNameVariants {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}
```

### Хуки

```typescript
// src/hooks/useComponentName.ts
import { useState, useEffect } from 'react';

export interface UseComponentNameOptions {
  // Hook options
}

export interface UseComponentNameReturn {
  // Return values
}

export function useComponentName(options?: UseComponentNameOptions): UseComponentNameReturn {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Hook logic
  }, []);

  return {
    // Return values
  };
}
```

## Автоматические обновления

Генератор автоматически обновляет:

### 1. Индекс компонентов

```typescript
// src/components/index.ts
export { ComponentName } from './{type}s';
```

### 2. Реестр компонентов

```json
// src/data/components-registry.json
{
  "components": [
    {
      "id": "componentname",
      "name": "ComponentName",
      "category": "{type}s",
      "description": "ComponentName component generated by script",
      "tags": ["{type}", "{template}"],
      "installed": true,
      "props": ["ComponentNameProps"],
      "variants": ["ComponentNameVariants"],
      "hooks": ["useComponentName"]
    }
  ]
}
```

## Лучшие практики

### 1. Именование компонентов

- Используйте PascalCase
- Будьте описательными
- Следуйте принципам Atomic Design

```bash
# ✅ Хорошо
Button, Input, SearchBar, DataTable

# ❌ Плохо
btn, input, search, table
```

### 2. Выбор типа

- **Atom**: Простые элементы (Button, Input)
- **Molecule**: Группы элементов (SearchBar, FormField)
- **Organism**: Сложные секции (Header, DataTable)

### 3. Выбор шаблона

- **Basic**: Простые компоненты
- **Advanced**: Компоненты с вариантами
- **Form**: Элементы форм
- **Layout**: Компоненты макета

### 4. Структура файлов

- Группируйте связанные файлы
- Используйте консистентные имена
- Следуйте принятым соглашениям

### 5. Тестирование

- Покрывайте все варианты
- Тестируйте пропсы
- Включайте accessibility тесты

## Troubleshooting

### Частые проблемы

**1. Ошибка валидации имени**
```
❌ Название компонента должно начинаться с заглавной буквы
```
**Решение:** Используйте PascalCase (например, `MyComponent`)

**2. Файл уже существует**
```
❌ Файл уже существует
```
**Решение:** Выберите другое имя или удалите существующие файлы

**3. Неверный тип компонента**
```
❌ Неверный тип компонента: invalid
```
**Решение:** Используйте один из: `atom`, `molecule`, `organism`

**4. Неверный шаблон**
```
❌ Неверный шаблон: invalid
```
**Решение:** Используйте один из: `basic`, `advanced`, `form`, `layout`

### Получение помощи

- Проверьте [документацию компонентов](./component-guidelines.md)
- Посмотрите примеры существующих компонентов
- Задайте вопрос в репозитории проекта

## Интеграция с IDE

### VSCode

Добавьте в `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Generate Component",
      "type": "shell",
      "command": "node",
      "args": ["scripts/generate-component.js"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

### WebStorm

Создайте External Tool:

1. Settings → Tools → External Tools
2. Add New Tool
3. Name: `Generate Component`
4. Program: `node`
5. Arguments: `scripts/generate-component.js`
6. Working Directory: `$ProjectFileDir$`

## Полезные ссылки

- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [React Component Patterns](https://reactpatterns.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Storybook Documentation](https://storybook.js.org/docs/)
- [Testing Library](https://testing-library.com/docs/)

---

**Совет:** Используйте `npm run generate:component -- --help` для получения справки по опциям.
