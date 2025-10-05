#!/usr/bin/env node

/**
 * Скрипт для генерации компонентов с помощью Yeoman
 * Альтернатива для случаев, когда npm link не работает
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Проверка аргументов
const args = process.argv.slice(2)
if (args.length === 0) {
  log('📚 DC25 UI/UX - Генератор компонентов', 'bright')
  console.log('')
  log('Использование:', 'blue')
  console.log('  node scripts/generate-component.js [опции]')
  console.log('')
  log('Опции:', 'blue')
  console.log('  --component, -c    Название компонента (обязательно)')
  console.log('  --type, -t         Тип компонента (atom, molecule, organism)')
  console.log('  --template, -p     Шаблон (basic, advanced, form, layout)')
  console.log('  --no-tests         Не создавать тесты')
  console.log('  --no-story         Не создавать Storybook истории')
  console.log('  --no-props         Не создавать интерфейс пропсов')
  console.log('  --with-variants    Создать варианты')
  console.log('  --with-hooks       Создать кастомные хуки')
  console.log('')
  log('Примеры:', 'blue')
  console.log('  node scripts/generate-component.js -c Button -t atom -p advanced')
  console.log('  node scripts/generate-component.js -c Input -t atom -p form --with-variants')
  console.log('  node scripts/generate-component.js -c Header -t organism -p layout --with-hooks')
  console.log('')
  process.exit(1)
}

// Парсинг аргументов
const options = {}
for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  const nextArg = args[i + 1]
  
  switch (arg) {
    case '--component':
    case '-c':
      options.component = nextArg
      i++
      break
    case '--type':
    case '-t':
      options.type = nextArg
      i++
      break
    case '--template':
    case '-p':
      options.template = nextArg
      i++
      break
  }
  
  // Обработка аргументов в формате --key=value
  if (arg.startsWith('--component=')) {
    options.component = arg.split('=')[1]
  } else if (arg.startsWith('--type=')) {
    options.type = arg.split('=')[1]
  } else if (arg.startsWith('--template=')) {
    options.template = arg.split('=')[1]
  }
  
  switch (arg) {
    case '--no-tests':
      options.noTests = true
      break
    case '--no-story':
      options.noStory = true
      break
    case '--no-props':
      options.noProps = true
      break
    case '--with-variants':
      options.withVariants = true
      break
    case '--with-hooks':
      options.withHooks = true
      break
  }
}

// Валидация
if (!options.component) {
  log('❌ Название компонента обязательно', 'red')
  log('Используйте: --component ComponentName', 'blue')
  process.exit(1)
}

// Проверка имени компонента
if (!/^[A-Z][a-zA-Z0-9]*$/.test(options.component)) {
  log('❌ Название компонента должно начинаться с заглавной буквы и содержать только буквы и цифры', 'red')
  process.exit(1)
}

// Установка значений по умолчанию
const config = {
  component: options.component,
  type: options.type || 'atom',
  template: options.template || 'basic',
  withTests: !options.noTests,
  withStory: !options.noStory,
  withProps: !options.noProps,
  withVariants: options.withVariants || false,
  withHooks: options.withHooks || false
}

// Проверка типов
const validTypes = ['atom', 'molecule', 'organism']
if (!validTypes.includes(config.type)) {
  log(`❌ Неверный тип компонента: ${config.type}`, 'red')
  log(`Допустимые типы: ${validTypes.join(', ')}`, 'blue')
  process.exit(1)
}

// Проверка шаблонов
const validTemplates = ['basic', 'advanced', 'form', 'layout']
if (!validTemplates.includes(config.template)) {
  log(`❌ Неверный шаблон: ${config.template}`, 'red')
  log(`Допустимые шаблоны: ${validTemplates.join(', ')}`, 'blue')
  process.exit(1)
}

// Показ конфигурации
log('🔧 Конфигурация генерации:', 'cyan')
console.log(`  Компонент: ${config.component}`)
console.log(`  Тип: ${config.type}`)
console.log(`  Шаблон: ${config.template}`)
console.log(`  Тесты: ${config.withTests ? 'Да' : 'Нет'}`)
console.log(`  Storybook: ${config.withStory ? 'Да' : 'Нет'}`)
console.log(`  Пропсы: ${config.withProps ? 'Да' : 'Нет'}`)
console.log(`  Варианты: ${config.withVariants ? 'Да' : 'Нет'}`)
console.log(`  Хуки: ${config.withHooks ? 'Да' : 'Нет'}`)
console.log('')

// Генерация компонента
try {
  log('🚀 Генерация компонента...', 'yellow')
  
  // Создание компонента
  createComponent(config)
  
  // Создание тестов
  if (config.withTests) {
    createTests(config)
  }
  
  // Создание Storybook истории
  if (config.withStory) {
    createStory(config)
  }
  
  // Создание типов
  if (config.withProps) {
    createTypes(config)
  }
  
  // Создание хуков
  if (config.withHooks) {
    createHooks(config)
  }
  
  // Обновление индексов
  updateIndexes(config)
  updateRegistry(config)
  
  log('🎉 Компонент успешно создан!', 'green')
  log('\n📁 Созданные файлы:', 'blue')
  log(`  - src/components/${config.type}s/${config.component}.tsx`, 'cyan')
  
  if (config.withTests) {
    log(`  - src/components/${config.type}s/__tests__/${config.component}.test.tsx`, 'cyan')
  }
  
  if (config.withStory) {
    log(`  - src/stories/${config.component}.stories.tsx`, 'cyan')
  }
  
  if (config.withProps) {
    log(`  - src/types/${config.component.toLowerCase()}.ts`, 'cyan')
  }
  
  if (config.withHooks) {
    log(`  - src/hooks/use${config.component}.ts`, 'cyan')
  }
  
  log('\n🚀 Следующие шаги:', 'yellow')
  log('  1. Проверьте созданные файлы', 'reset')
  log('  2. Настройте логику компонента', 'reset')
  log('  3. Добавьте специфичные пропсы и варианты', 'reset')
  log('  4. Запустите тесты: npm run test', 'reset')
  log('  5. Посмотрите в Storybook: npm run storybook', 'reset')
  
} catch (error) {
  log(`❌ Ошибка генерации: ${error.message}`, 'red')
  process.exit(1)
}

// Функции создания файлов
function createComponent(config) {
  const templatePath = path.join(__dirname, '..', 'generators', 'app', 'templates', `${config.template}-component.tsx.ejs`)
  const destinationPath = path.join('src', 'components', `${config.type}s`, `${config.component}.tsx`)
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Шаблон не найден: ${templatePath}`)
  }
  
  // Создание директории если не существует
  const dir = path.dirname(destinationPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  // Чтение шаблона
  let template = fs.readFileSync(templatePath, 'utf8')
  
  // Замена переменных в шаблоне
  template = template.replace(/<%= componentName %>/g, config.component)
  template = template.replace(/<%= componentType %>/g, config.type)
  template = template.replace(/<%= templateType %>/g, config.template)
  template = template.replace(/<%= propsInterface %>/g, `${config.component}Props`)
  template = template.replace(/<%= variantsInterface %>/g, `${config.component}Variants`)
  template = template.replace(/<%= hookName %>/g, `use${config.component}`)
  template = template.replace(/<%= withProps %>/g, config.withProps)
  template = template.replace(/<%= withVariants %>/g, config.withVariants)
  template = template.replace(/<%= withHooks %>/g, config.withHooks)
  
  // Удаление EJS тегов и условных блоков
  template = template.replace(/<% if \(withProps\) \{ %>[\s\S]*?<% } %>/g, config.withProps ? '$&' : '')
  template = template.replace(/<% if \(withVariants\) \{ %>[\s\S]*?<% } %>/g, config.withVariants ? '$&' : '')
  template = template.replace(/<% if \(withHooks\) \{ %>[\s\S]*?<% } %>/g, config.withHooks ? '$&' : '')
  
  // Удаление EJS тегов
  template = template.replace(/<%[^%]*%>/g, '')
  
  // Очистка лишних пустых строк
  template = template.replace(/\n\s*\n\s*\n/g, '\n\n')
  
  // Запись файла
  fs.writeFileSync(destinationPath, template)
}

function createTests(config) {
  const testContent = `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ${config.component} } from '../${config.component}';

describe('${config.component}', () => {
  it('renders without crashing', () => {
    render(<${config.component} />);
    expect(screen.getByTestId('${config.component.toLowerCase()}')).toBeInTheDocument();
  });

  ${config.withProps ? `
  it('renders with custom props', () => {
    const customProps = {
      // Add your test props here
    };
    render(<${config.component} {...customProps} />);
    expect(screen.getByTestId('${config.component.toLowerCase()}')).toBeInTheDocument();
  });
  ` : ''}

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<${config.component} className={customClass} />);
    expect(screen.getByTestId('${config.component.toLowerCase()}')).toHaveClass(customClass);
  });
});
`

  const testPath = path.join('src', 'components', `${config.type}s`, '__tests__', `${config.component}.test.tsx`)
  
  // Создание директории если не существует
  const dir = path.dirname(testPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  fs.writeFileSync(testPath, testContent)
}

function createStory(config) {
  const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${config.component} } from '../src/components/${config.type}s/${config.component}';

const meta: Meta<typeof ${config.component}> = {
  title: '${config.type}s/${config.component}',
  component: ${config.component},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ${config.withProps ? `
    // Add your argTypes here
    ` : ''}
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default args here
  },
};

${config.withVariants ? `
export const Variant1: Story = {
  args: {
    variant: 'variant1',
  },
};

export const Variant2: Story = {
  args: {
    variant: 'variant2',
  },
};
` : ''}

export const WithCustomProps: Story = {
  args: {
    // Add your custom props here
  },
};
`

  const storyPath = path.join('src', 'stories', `${config.component}.stories.tsx`)
  
  // Создание директории если не существует
  const dir = path.dirname(storyPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  fs.writeFileSync(storyPath, storyContent)
}

function createTypes(config) {
  const typesContent = `export interface ${config.component}Props {
  className?: string;
  children?: React.ReactNode;
  // Add your props here
}

${config.withVariants ? `
export interface ${config.component}Variants {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}
` : ''}
`

  const typesPath = path.join('src', 'types', `${config.component.toLowerCase()}.ts`)
  
  // Создание директории если не существует
  const dir = path.dirname(typesPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  fs.writeFileSync(typesPath, typesContent)
}

function createHooks(config) {
  const hookContent = `import { useState, useEffect } from 'react';

export interface Use${config.component}Options {
  // Add your hook options here
}

export interface Use${config.component}Return {
  // Add your hook return values here
}

export function use${config.component}(options?: Use${config.component}Options): Use${config.component}Return {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Add your hook logic here
  }, []);

  return {
    // Add your return values here
  };
}
`

  const hookPath = path.join('src', 'hooks', `use${config.component}.ts`)
  
  // Создание директории если не существует
  const dir = path.dirname(hookPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  fs.writeFileSync(hookPath, hookContent)
}

function updateIndexes(config) {
  // Обновление индекса компонентов
  const indexPath = path.join('src', 'components', 'index.ts')
  
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8')
    const newExport = `export { ${config.component} } from './${config.type}s';`
    
    if (!content.includes(newExport)) {
      fs.writeFileSync(indexPath, content + '\n' + newExport + '\n')
    }
  }
}

function updateRegistry(config) {
  // Обновление реестра компонентов
  const registryPath = path.join('src', 'data', 'components-registry.json')
  
  if (fs.existsSync(registryPath)) {
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'))
    
    const newComponent = {
      id: config.component.toLowerCase(),
      name: config.component,
      category: config.type === 'atom' ? 'atoms' : config.type === 'molecule' ? 'molecules' : 'organisms',
      description: `${config.component} component generated by script`,
      tags: [config.type, config.template],
      installed: true,
      props: config.withProps ? [`${config.component}Props`] : [],
      variants: config.withVariants ? [`${config.component}Variants`] : [],
      hooks: config.withHooks ? [`use${config.component}`] : []
    }
    
    registry.components.push(newComponent)
    
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2))
  }
}
