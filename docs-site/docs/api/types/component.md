# Component Types

TypeScript определения для компонентов DC25 UI/UX.

## Импорт

```tsx
import type { Component, ComponentFilter, ComponentCategory } from '@/types/component'
```

## Основные типы

### `Component`

```tsx
interface Component {
  id: string
  name: string
  description: string
  category: ComponentCategory
  tags: string[]
  installed: boolean
  dependencies: string[]
  files: string[]
  examples?: ComponentExample[]
  props?: ComponentProps[]
  variants?: ComponentVariant[]
}
```

### `ComponentFilter`

```tsx
interface ComponentFilter {
  search: string
  category: string
  tags: string[]
  installed: boolean | null
}
```

### `ComponentCategory`

```tsx
type ComponentCategory = 
  | 'atoms'
  | 'molecules' 
  | 'organisms'
  | 'templates'
  | 'ui'
```

## Дополнительные типы

### `ComponentExample`

```tsx
interface ComponentExample {
  id: string
  title: string
  description: string
  code: string
  preview?: string
}
```

### `ComponentProps`

```tsx
interface ComponentProps {
  name: string
  type: string
  required: boolean
  defaultValue?: any
  description: string
}
```

### `ComponentVariant`

```tsx
interface ComponentVariant {
  name: string
  description: string
  classes: string
  props?: Record<string, any>
}
```

## Примеры использования

### Базовое использование

```tsx
import type { Component } from '@/types/component'

function ComponentCard({ component }: { component: Component }) {
  return (
    <div>
      <h3>{component.name}</h3>
      <p>{component.description}</p>
      <span>Категория: {component.category}</span>
      <span>Установлено: {component.installed ? 'Да' : 'Нет'}</span>
    </div>
  )
}
```

### Фильтрация компонентов

```tsx
import type { Component, ComponentFilter } from '@/types/component'

function ComponentFilter({ 
  components, 
  filter, 
  onFilterChange 
}: {
  components: Component[]
  filter: ComponentFilter
  onFilterChange: (filter: ComponentFilter) => void
}) {
  const filteredComponents = components.filter(component => {
    // Поиск по названию и описанию
    const matchesSearch = component.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                         component.description.toLowerCase().includes(filter.search.toLowerCase())
    
    // Фильтр по категории
    const matchesCategory = !filter.category || component.category === filter.category
    
    // Фильтр по тегам
    const matchesTags = filter.tags.length === 0 || 
                       filter.tags.some(tag => component.tags.includes(tag))
    
    // Фильтр по статусу установки
    const matchesInstalled = filter.installed === null || 
                            component.installed === filter.installed
    
    return matchesSearch && matchesCategory && matchesTags && matchesInstalled
  })

  return (
    <div>
      {filteredComponents.map(component => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  )
}
```

### Работа с примерами

```tsx
import type { Component, ComponentExample } from '@/types/component'

function ComponentExamples({ component }: { component: Component }) {
  if (!component.examples) {
    return <div>Примеры не найдены</div>
  }

  return (
    <div>
      <h3>Примеры использования</h3>
      {component.examples.map(example => (
        <div key={example.id}>
          <h4>{example.title}</h4>
          <p>{example.description}</p>
          <pre><code>{example.code}</code></pre>
        </div>
      ))}
    </div>
  )
}
```

### Работа с пропсами

```tsx
import type { Component, ComponentProps } from '@/types/component'

function ComponentPropsTable({ component }: { component: Component }) {
  if (!component.props) {
    return <div>Пропсы не определены</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Тип</th>
          <th>Обязательный</th>
          <th>По умолчанию</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        {component.props.map(prop => (
          <tr key={prop.name}>
            <td>{prop.name}</td>
            <td>{prop.type}</td>
            <td>{prop.required ? 'Да' : 'Нет'}</td>
            <td>{prop.defaultValue || '-'}</td>
            <td>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

### Работа с вариантами

```tsx
import type { Component, ComponentVariant } from '@/types/component'

function ComponentVariants({ component }: { component: Component }) {
  if (!component.variants) {
    return <div>Варианты не определены</div>
  }

  return (
    <div>
      <h3>Варианты</h3>
      {component.variants.map(variant => (
        <div key={variant.name}>
          <h4>{variant.name}</h4>
          <p>{variant.description}</p>
          <div className={variant.classes}>
            Предварительный просмотр
          </div>
        </div>
      ))}
    </div>
  )
}
```

## Утилитарные типы

### `ComponentWithExamples`

```tsx
type ComponentWithExamples = Component & {
  examples: ComponentExample[]
}
```

### `ComponentWithProps`

```tsx
type ComponentWithProps = Component & {
  props: ComponentProps[]
}
```

### `ComponentWithVariants`

```tsx
type ComponentWithVariants = Component & {
  variants: ComponentVariant[]
}
```

### `InstalledComponent`

```tsx
type InstalledComponent = Component & {
  installed: true
}
```

### `UninstalledComponent`

```tsx
type UninstalledComponent = Component & {
  installed: false
}
```

## Продвинутые примеры

### Типизированный компонент

```tsx
import type { Component, ComponentProps } from '@/types/component'

interface TypedComponentProps {
  component: Component
  onInstall: (componentId: string) => void
  onDemo: (componentId: string) => void
}

function TypedComponent({ component, onInstall, onDemo }: TypedComponentProps) {
  return (
    <div>
      <h3>{component.name}</h3>
      <p>{component.description}</p>
      
      {component.installed ? (
        <button onClick={() => onDemo(component.id)}>
          Демо
        </button>
      ) : (
        <button onClick={() => onInstall(component.id)}>
          Установить
        </button>
      )}
    </div>
  )
}
```

### Генерация типов

```tsx
import type { Component, ComponentProps } from '@/types/component'

function generateComponentTypes(component: Component): string {
  if (!component.props) {
    return `interface ${component.name}Props {}`
  }

  const propsInterface = component.props
    .map(prop => {
      const optional = prop.required ? '' : '?'
      const defaultValue = prop.defaultValue ? ` // default: ${prop.defaultValue}` : ''
      return `  ${prop.name}${optional}: ${prop.type}${defaultValue}`
    })
    .join('\n')

  return `interface ${component.name}Props {\n${propsInterface}\n}`
}
```

### Валидация компонента

```tsx
import type { Component } from '@/types/component'

function validateComponent(component: Component): string[] {
  const errors: string[] = []

  if (!component.id) {
    errors.push('ID компонента обязателен')
  }

  if (!component.name) {
    errors.push('Название компонента обязательно')
  }

  if (!component.description) {
    errors.push('Описание компонента обязательно')
  }

  if (!component.category) {
    errors.push('Категория компонента обязательна')
  }

  if (!Array.isArray(component.tags)) {
    errors.push('Теги должны быть массивом')
  }

  if (typeof component.installed !== 'boolean') {
    errors.push('Статус установки должен быть булевым значением')
  }

  return errors
}
```

## Константы

### Категории компонентов

```tsx
export const COMPONENT_CATEGORIES = [
  'atoms',
  'molecules',
  'organisms',
  'templates',
  'ui'
] as const

export type ComponentCategory = typeof COMPONENT_CATEGORIES[number]
```

### Статусы установки

```tsx
export const INSTALLATION_STATUS = {
  INSTALLED: 'installed',
  NOT_INSTALLED: 'not_installed',
  PENDING: 'pending',
  ERROR: 'error'
} as const

export type InstallationStatus = typeof INSTALLATION_STATUS[keyof typeof INSTALLATION_STATUS]
```

## Лучшие практики

### 1. Используйте строгую типизацию

```tsx
// ✅ Хорошо
function ComponentCard({ component }: { component: Component }) {
  // ...
}

// ❌ Плохо
function ComponentCard({ component }: { component: any }) {
  // ...
}
```

### 2. Проверяйте наличие свойств

```tsx
// ✅ Хорошо
if (component.examples && component.examples.length > 0) {
  // Работа с примерами
}

// ❌ Плохо
component.examples.forEach(example => {
  // Может вызвать ошибку
})
```

### 3. Используйте утилитарные типы

```tsx
// ✅ Хорошо
function renderComponent(component: ComponentWithExamples) {
  // component.examples гарантированно существует
}

// ❌ Плохо
function renderComponent(component: Component) {
  if (component.examples) {
    // Нужна дополнительная проверка
  }
}
```

### 4. Валидируйте данные

```tsx
// ✅ Хорошо
function processComponent(component: unknown): Component {
  const errors = validateComponent(component as Component)
  if (errors.length > 0) {
    throw new Error(`Ошибки валидации: ${errors.join(', ')}`)
  }
  return component as Component
}
```

## Совместимость

- TypeScript 4.9+
- React 18+
- Все современные браузеры

## Связанные типы

- [`theme`](./theme.md) - Типы тем
- [`api`](./api.md) - API типы

---

**Далее:** Изучите [типы тем](./theme.md) или [API типы](./api.md).
