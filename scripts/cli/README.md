# DC25 UI/UX CLI Tools

Этот каталог содержит CLI инструменты для генерации компонентов и автоматизации разработки.

## Доступные инструменты

### 1. Базовый генератор компонентов (`generator.js`)

Простой генератор для создания базовых компонентов.

**Использование:**
```bash
npm run generate <name> [type]
```

**Примеры:**
```bash
npm run generate Button atom
npm run generate SearchBar molecule
npm run generate Header organism
npm run generate PageTemplate template
```

### 2. Продвинутый генератор (`advanced-generator.js`)

Расширенный генератор с поддержкой пропсов, вариантов и хуков.

**Использование:**
```bash
node scripts/cli/advanced-generator.js <name> [type] [options]
```

**Опции:**
- `--props <props>` - JSON строка с пропсами компонента
- `--variants <vars>` - JSON строка с вариантами стилизации
- `--hooks <hooks>` - JSON строка с кастомными хуками
- `--no-tests` - Пропустить генерацию тестов
- `--no-stories` - Пропустить генерацию stories
- `--no-barrel` - Пропустить обновление barrel файлов

**Примеры:**

Создание простого компонента:
```bash
node scripts/cli/advanced-generator.js Button atom
```

Создание компонента с пропсами:
```bash
node scripts/cli/advanced-generator.js Input atom --props '[{"name":"placeholder","type":"string","required":true,"description":"Placeholder text"}]'
```

Создание компонента с вариантами:
```bash
node scripts/cli/advanced-generator.js Alert organism --variants '[{"name":"success","classes":"bg-green-100 text-green-800"},{"name":"error","classes":"bg-red-100 text-red-800"}]'
```

Создание компонента с хуками:
```bash
node scripts/cli/advanced-generator.js SearchBar molecule --hooks '[{"name":"search","options":[{"name":"query","type":"string"}],"returns":[{"name":"results","type":"string[]"}]}]'
```

## Структура генерируемых файлов

Для каждого компонента создаются следующие файлы:

```
src/components/{type}/{ComponentName}/
├── {ComponentName}.tsx          # Основной компонент
├── index.ts                     # Barrel файл
├── {ComponentName}.stories.tsx  # Storybook stories
└── __tests__/
    └── {ComponentName}.test.tsx # Тесты
```

## Типы компонентов

- **atom** - Базовые компоненты (Button, Input, Badge)
- **molecule** - Составные компоненты (SearchBar, Card)
- **organism** - Сложные компоненты (Header, Footer)
- **template** - Шаблоны страниц (PageTemplate)

## Конфигурация пропсов

Пропсы описываются в JSON формате:

```json
[
  {
    "name": "placeholder",
    "type": "string",
    "required": true,
    "description": "Placeholder text",
    "defaultValue": "Enter text...",
    "controlType": "text"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disabled state",
    "defaultValue": false,
    "controlType": "boolean"
  }
]
```

## Конфигурация вариантов

Варианты стилизации описываются в JSON формате:

```json
[
  {
    "name": "primary",
    "classes": "bg-blue-500 text-white hover:bg-blue-600"
  },
  {
    "name": "secondary",
    "classes": "bg-gray-500 text-white hover:bg-gray-600"
  }
]
```

## Конфигурация хуков

Кастомные хуки описываются в JSON формате:

```json
[
  {
    "name": "search",
    "options": [
      {"name": "query", "type": "string"},
      {"name": "debounce", "type": "number"}
    ],
    "returns": [
      {"name": "results", "type": "string[]"},
      {"name": "loading", "type": "boolean"}
    ],
    "initialState": "[]",
    "effect": "// Search logic here",
    "dependencies": ["query"]
  }
]
```

## Интеграция с VSCode

Для удобства использования добавьте задачи в VSCode:

```json
{
  "label": "Generate Component",
  "type": "shell",
  "command": "npm",
  "args": ["run", "generate"],
  "group": "build"
}
```

## Расширение функциональности

Для добавления новых возможностей:

1. Отредактируйте соответствующий файл генератора
2. Добавьте новые опции в CLI интерфейс
3. Обновите документацию

## Примеры использования

### Создание кнопки с вариантами

```bash
node scripts/cli/advanced-generator.js Button atom --variants '[{"name":"primary","classes":"bg-blue-500 text-white"},{"name":"secondary","classes":"bg-gray-500 text-white"}]'
```

### Создание формы с валидацией

```bash
node scripts/cli/advanced-generator.js ContactForm molecule --props '[{"name":"onSubmit","type":"(data: FormData) => void","required":true}]' --hooks '[{"name":"form","options":[{"name":"schema","type":"z.ZodSchema"}],"returns":[{"name":"register","type":"Function"},{"name":"handleSubmit","type":"Function"}]}]'
```

### Создание навигационного меню

```bash
node scripts/cli/advanced-generator.js Navigation organism --props '[{"name":"items","type":"MenuItem[]","required":true},{"name":"activeItem","type":"string"}]' --variants '[{"name":"horizontal","classes":"flex-row"},{"name":"vertical","classes":"flex-col"}]'
```

## Troubleshooting

### Ошибка "Cannot find module"
Убедитесь, что вы находитесь в корневой директории проекта.

### Ошибка "Permission denied"
Выполните `chmod +x scripts/cli/*.js` для добавления прав на выполнение.

### Ошибка парсинга JSON
Проверьте корректность JSON синтаксиса в опциях командной строки.
