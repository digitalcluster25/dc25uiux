#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class ComponentGenerator {
  constructor() {
    this.projectRoot = process.cwd()
    this.srcPath = path.join(this.projectRoot, 'src')
    this.componentsPath = path.join(this.srcPath, 'components')
  }

  generateComponent(name, type = 'atom', options = {}) {
    const componentName = this.capitalizeFirst(name)
    const componentPath = this.getComponentPath(type, componentName)
    
    // Создаем директорию если не существует
    this.ensureDirExists(componentPath)
    
    // Генерируем файлы компонента
    this.generateComponentFile(componentPath, componentName, options)
    this.generateIndexFile(componentPath, componentName)
    this.generateTestFile(componentPath, componentName, type)
    this.generateStoryFile(componentPath, componentName, type)
    
    // Обновляем barrel файлы
    this.updateBarrelFiles(type, componentName)
    
    console.log(`✅ Компонент ${componentName} успешно создан в ${componentPath}`)
  }

  getComponentPath(type, componentName) {
    const typeMap = {
      'atom': 'atoms',
      'molecule': 'molecules', 
      'organism': 'organisms',
      'template': 'templates'
    }
    
    return path.join(this.componentsPath, typeMap[type] || 'atoms', componentName)
  }

  generateComponentFile(componentPath, componentName, options) {
    const { props = [], children = true, forwardRef = false } = options
    
    const propsInterface = this.generatePropsInterface(componentName, props, children)
    const componentContent = this.generateComponentContent(componentName, props, children, forwardRef)
    
    const fileContent = `${propsInterface}

${componentContent}`
    
    fs.writeFileSync(
      path.join(componentPath, `${componentName}.tsx`),
      fileContent
    )
  }

  generatePropsInterface(componentName, props, children) {
    const propsList = props.map(prop => {
      const { name, type, required = false, defaultValue } = prop
      const optional = required ? '' : '?'
      const defaultComment = defaultValue ? ` // default: ${defaultValue}` : ''
      return `  ${name}${optional}: ${type}${defaultComment}`
    }).join('\n')

    const childrenProp = children ? '  children?: React.ReactNode' : ''
    const separator = props.length > 0 && children ? '\n' : ''
    
    return `import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ${componentName}Props {
${propsList}${separator}${childrenProp}
  className?: string
}`
  }

  generateComponentContent(componentName, props, children, forwardRef) {
    const propsList = props.map(prop => prop.name).join(', ')
    const childrenParam = children ? ', children' : ''
    const allProps = props.length > 0 || children ? `{ ${propsList}${childrenParam}, className, ...props }` : '{ className, ...props }'
    
    const componentSignature = forwardRef 
      ? `export const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(({ ${allProps} }, ref) => {`
      : `export function ${componentName}({ ${allProps} }: ${componentName}Props) {`
    
    const componentBody = `  return (
    <div 
      ${forwardRef ? 'ref={ref}' : ''}
      className={cn(
        '${this.getDefaultClasses(componentName)}',
        className
      )}
      {...props}
    >
      ${children ? '{children}' : '// Component content'}
    </div>
  )`
    
    const closing = forwardRef ? '})' : '}'
    
    return `${componentSignature}
${componentBody}
${closing}

${componentName}.displayName = '${componentName}'`
  }

  generateIndexFile(componentPath, componentName) {
    const content = `export { ${componentName} } from './${componentName}'
export type { ${componentName}Props } from './${componentName}'`
    
    fs.writeFileSync(
      path.join(componentPath, 'index.ts'),
      content
    )
  }

  generateTestFile(componentPath, componentName, type) {
    const content = `import { render, screen } from '@testing-library/react'
import { ${componentName} } from './${componentName}'

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName}>Test content</${componentName}>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<${componentName} className="custom-class">Test</${componentName}>)
    expect(screen.getByText('Test')).toHaveClass('custom-class')
  })

  ${this.generateAdditionalTests(componentName, type)}
})`
    
    fs.writeFileSync(
      path.join(componentPath, '__tests__', `${componentName}.test.tsx`),
      content
    )
  }

  generateStoryFile(componentPath, componentName, type) {
    const content = `import type { Meta, StoryObj } from '@storybook/react'
import { ${componentName} } from './${componentName}'

const meta: Meta<typeof ${componentName}> = {
  title: '${this.getStoryTitle(type)}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${this.getComponentDescription(componentName, type)}'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Дополнительные CSS классы'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '${componentName} content'
  }
}

export const WithCustomClass: Story = {
  args: {
    className: 'bg-blue-100 p-4 rounded-lg',
    children: 'Styled ${componentName}'
  }
}`
    
    fs.writeFileSync(
      path.join(componentPath, `${componentName}.stories.tsx`),
      content
    )
  }

  updateBarrelFiles(type, componentName) {
    const typeMap = {
      'atom': 'atoms',
      'molecule': 'molecules',
      'organism': 'organisms', 
      'template': 'templates'
    }
    
    const barrelPath = path.join(this.componentsPath, typeMap[type], 'index.ts')
    
    if (fs.existsSync(barrelPath)) {
      let content = fs.readFileSync(barrelPath, 'utf8')
      
      // Добавляем экспорт если его нет
      const exportLine = `export * from './${componentName}'`
      if (!content.includes(exportLine)) {
        content += `\n${exportLine}`
        fs.writeFileSync(barrelPath, content)
      }
    }
  }

  getDefaultClasses(componentName) {
    // Базовые классы в зависимости от типа компонента
    const baseClasses = {
      'Button': 'px-4 py-2 rounded-md font-medium transition-colors',
      'Input': 'border border-gray-300 rounded-md px-3 py-2',
      'Card': 'border border-gray-200 rounded-lg shadow-sm',
      'Badge': 'px-2 py-1 rounded-full text-xs font-medium',
      'Alert': 'border rounded-lg p-4',
      'default': 'block'
    }
    
    return baseClasses[componentName] || baseClasses.default
  }

  getStoryTitle(type) {
    const typeMap = {
      'atom': 'Atoms',
      'molecule': 'Molecules', 
      'organism': 'Organisms',
      'template': 'Templates'
    }
    
    return typeMap[type] || 'Atoms'
  }

  getComponentDescription(componentName, type) {
    return `${componentName} компонент уровня ${type}`
  }

  generateAdditionalTests(componentName, type) {
    const tests = {
      'atom': `it('handles click events', () => {
    const handleClick = jest.fn()
    render(<${componentName} onClick={handleClick}>Click me</${componentName}>)
    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })`,
      'molecule': `it('composes multiple atoms correctly', () => {
    render(<${componentName}>Complex component</${componentName}>)
    expect(screen.getByText('Complex component')).toBeInTheDocument()
  })`,
      'organism': `it('renders complex layout', () => {
    render(<${componentName}>Layout component</${componentName}>)
    expect(screen.getByText('Layout component')).toBeInTheDocument()
  })`,
      'template': `it('renders page template', () => {
    render(<${componentName}>Page template</${componentName}>)
    expect(screen.getByText('Page template')).toBeInTheDocument()
  })`
    }
    
    return tests[type] || ''
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  ensureDirExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    
    // Создаем директорию для тестов
    const testDir = path.join(dirPath, '__tests__')
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true })
    }
  }
}

// CLI интерфейс
if (require.main === module) {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log(`
DC25 UI/UX Component Generator

Usage:
  node scripts/cli/generator.js <name> [type] [options]

Arguments:
  name    Component name (required)
  type    Component type: atom, molecule, organism, template (default: atom)

Examples:
  node scripts/cli/generator.js Button atom
  node scripts/cli/generator.js SearchBar molecule
  node scripts/cli/generator.js Header organism
  node scripts/cli/generator.js PageTemplate template
`)
    process.exit(1)
  }

  const [name, type = 'atom'] = args
  const generator = new ComponentGenerator()
  
  try {
    generator.generateComponent(name, type)
    console.log('\n🎉 Компонент успешно создан!')
    console.log('\nСледующие шаги:')
    console.log('1. Откройте созданный компонент в редакторе')
    console.log('2. Настройте пропсы и логику компонента')
    console.log('3. Запустите Storybook для просмотра: npm run storybook')
    console.log('4. Запустите тесты: npm test')
  } catch (error) {
    console.error('❌ Ошибка при создании компонента:', error.message)
    process.exit(1)
  }
}

module.exports = ComponentGenerator
