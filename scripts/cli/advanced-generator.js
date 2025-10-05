#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class AdvancedComponentGenerator {
  constructor() {
    this.projectRoot = process.cwd()
    this.srcPath = path.join(this.projectRoot, 'src')
    this.componentsPath = path.join(this.srcPath, 'components')
  }

  generateComponent(config) {
    const {
      name,
      type = 'atom',
      props = [],
      children = true,
      forwardRef = false,
      variants = [],
      hooks = [],
      tests = true,
      stories = true,
      barrel = true
    } = config

    const componentName = this.capitalizeFirst(name)
    const componentPath = this.getComponentPath(type, componentName)
    
    console.log(`🚀 Создание компонента ${componentName}...`)
    
    // Создаем директорию если не существует
    this.ensureDirExists(componentPath)
    
    // Генерируем файлы компонента
    this.generateComponentFile(componentPath, componentName, { props, children, forwardRef, variants })
    this.generateIndexFile(componentPath, componentName, barrel)
    
    if (tests) {
      this.generateTestFile(componentPath, componentName, type, props)
    }
    
    if (stories) {
      this.generateStoryFile(componentPath, componentName, type, props, variants)
    }
    
    if (hooks.length > 0) {
      this.generateHookFiles(componentPath, componentName, hooks)
    }
    
    // Обновляем barrel файлы
    if (barrel) {
      this.updateBarrelFiles(type, componentName)
    }
    
    console.log(`✅ Компонент ${componentName} успешно создан в ${componentPath}`)
    this.printNextSteps(componentName, type)
  }

  generateComponentFile(componentPath, componentName, options) {
    const { props = [], children = true, forwardRef = false, variants = [] } = options
    
    const imports = this.generateImports(componentName, forwardRef, variants)
    const propsInterface = this.generatePropsInterface(componentName, props, children, variants)
    const componentContent = this.generateComponentContent(componentName, props, children, forwardRef, variants)
    
    const fileContent = `${imports}

${propsInterface}

${componentContent}`
    
    fs.writeFileSync(
      path.join(componentPath, `${componentName}.tsx`),
      fileContent
    )
  }

  generateImports(componentName, forwardRef, variants) {
    const imports = [
      "import { ReactNode } from 'react'",
      "import { cn } from '@/utils/cn'"
    ]
    
    if (forwardRef) {
      imports.unshift("import React from 'react'")
    }
    
    if (variants.length > 0) {
      imports.push("import { cva, type VariantProps } from 'class-variance-authority'")
    }
    
    return imports.join('\n')
  }

  generatePropsInterface(componentName, props, children, variants) {
    const propsList = props.map(prop => {
      const { name, type, required = false, defaultValue, description } = prop
      const optional = required ? '' : '?'
      const defaultComment = defaultValue ? ` // default: ${defaultValue}` : ''
      const descComment = description ? ` // ${description}` : ''
      return `  /** ${descComment} */\n  ${name}${optional}: ${type}${defaultComment}`
    }).join('\n\n')

    const childrenProp = children ? '  /** Содержимое компонента */\n  children?: React.ReactNode' : ''
    const separator = props.length > 0 && children ? '\n\n' : ''
    
    const variantProps = variants.length > 0 
      ? `\n\n  /** Варианты стилизации */\n  variant?: VariantProps<typeof ${componentName}Variants>['variant']`
      : ''
    
    return `interface ${componentName}Props${variants.length > 0 ? ' extends VariantProps<typeof ' + componentName + 'Variants>' : ''} {
${propsList}${separator}${childrenProp}${variantProps}

  /** Дополнительные CSS классы */
  className?: string
}`
  }

  generateComponentContent(componentName, props, children, forwardRef, variants) {
    const propsList = props.map(prop => prop.name).join(', ')
    const childrenParam = children ? ', children' : ''
    const variantParam = variants.length > 0 ? ', variant' : ''
    const allProps = props.length > 0 || children || variants.length > 0 
      ? `{ ${propsList}${childrenParam}${variantParam}, className, ...props }` 
      : '{ className, ...props }'
    
    const componentSignature = forwardRef 
      ? `export const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(({ ${allProps} }, ref) => {`
      : `export function ${componentName}({ ${allProps} }: ${componentName}Props) {`
    
    const variantClasses = variants.length > 0 
      ? `cn(${componentName}Variants({ variant }), className)`
      : `cn('${this.getDefaultClasses(componentName)}', className)`
    
    const componentBody = `  return (
    <div 
      ${forwardRef ? 'ref={ref}' : ''}
      className={${variantClasses}}
      {...props}
    >
      ${children ? '{children}' : '// Component content'}
    </div>
  )`
    
    const closing = forwardRef ? '})' : '}'
    
    const variantDefinition = variants.length > 0 
      ? `\n\nconst ${componentName}Variants = cva(
  '${this.getDefaultClasses(componentName)}',
  {
    variants: {
      variant: {
        ${variants.map(v => `'${v.name}': '${v.classes}'`).join(',\n        ')}
      }
    },
    defaultVariants: {
      variant: '${variants[0]?.name || 'default'}'
    }
  }
)`
      : ''
    
    return `${variantDefinition}

${componentSignature}
${componentBody}
${closing}

${componentName}.displayName = '${componentName}'`
  }

  generateHookFiles(componentPath, componentName, hooks) {
    hooks.forEach(hook => {
      const hookName = `use${this.capitalizeFirst(hook.name)}`
      const hookContent = `import { useState, useEffect } from 'react'

interface ${hookName}Options {
  ${hook.options?.map(opt => `${opt.name}: ${opt.type}`).join('\n  ') || '// Add options here'}
}

interface ${hookName}Return {
  ${hook.returns?.map(ret => `${ret.name}: ${ret.type}`).join('\n  ') || '// Add return values here'}
}

export function ${hookName}(options: ${hookName}Options): ${hookName}Return {
  const [state, setState] = useState(${hook.initialState || 'null'})

  useEffect(() => {
    ${hook.effect || '// Add effect logic here'}
  }, [${hook.dependencies?.join(', ') || ''}])

  return {
    ${hook.returns?.map(ret => `${ret.name}: state`).join(',\n    ') || '// Add return values here'}
  }
}`
      
      fs.writeFileSync(
        path.join(componentPath, `${hookName}.ts`),
        hookContent
      )
    })
  }

  generateTestFile(componentPath, componentName, type, props) {
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

  ${props.map(prop => this.generatePropTest(componentName, prop)).join('\n\n  ')}

  ${this.generateAdditionalTests(componentName, type)}
})`
    
    fs.writeFileSync(
      path.join(componentPath, '__tests__', `${componentName}.test.tsx`),
      content
    )
  }

  generatePropTest(componentName, prop) {
    return `it('handles ${prop.name} prop', () => {
    render(<${componentName} ${prop.name}={${prop.testValue || 'true'}}>Test</${componentName}>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })`
  }

  generateStoryFile(componentPath, componentName, type, props, variants) {
    const argTypes = {
      className: {
        control: { type: 'text' },
        description: 'Дополнительные CSS классы'
      }
    }

    // Добавляем argTypes для пропсов
    props.forEach(prop => {
      argTypes[prop.name] = {
        control: { type: prop.controlType || 'text' },
        description: prop.description || `${prop.name} prop`
      }
    })

    // Добавляем argTypes для вариантов
    if (variants.length > 0) {
      argTypes.variant = {
        control: { type: 'select' },
        options: variants.map(v => v.name),
        description: 'Вариант стилизации'
      }
    }

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
  argTypes: ${JSON.stringify(argTypes, null, 2)}
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '${componentName} content'
  }
}

${variants.map(variant => this.generateVariantStory(componentName, variant)).join('\n\n')}

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

  generateVariantStory(componentName, variant) {
    return `export const ${this.capitalizeFirst(variant.name)}: Story = {
  args: {
    variant: '${variant.name}',
    children: '${componentName} ${variant.name} variant'
  }
}`
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

  getDefaultClasses(componentName) {
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
      
      const exportLine = `export * from './${componentName}'`
      if (!content.includes(exportLine)) {
        content += `\n${exportLine}`
        fs.writeFileSync(barrelPath, content)
      }
    }
  }

  generateIndexFile(componentPath, componentName, barrel) {
    if (!barrel) return
    
    const content = `export { ${componentName} } from './${componentName}'
export type { ${componentName}Props } from './${componentName}'`
    
    fs.writeFileSync(
      path.join(componentPath, 'index.ts'),
      content
    )
  }

  printNextSteps(componentName, type) {
    console.log('\n🎉 Компонент успешно создан!')
    console.log('\n📋 Следующие шаги:')
    console.log('1. Откройте созданный компонент в редакторе')
    console.log('2. Настройте пропсы и логику компонента')
    console.log('3. Запустите Storybook для просмотра: npm run storybook')
    console.log('4. Запустите тесты: npm test')
    console.log('5. Добавьте компонент в документацию')
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  ensureDirExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    
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
DC25 UI/UX Advanced Component Generator

Usage:
  node scripts/cli/advanced-generator.js <name> [type] [options]

Arguments:
  name    Component name (required)
  type    Component type: atom, molecule, organism, template (default: atom)

Options:
  --props <props>     JSON string with component props
  --variants <vars>   JSON string with component variants
  --hooks <hooks>     JSON string with custom hooks
  --no-tests         Skip test file generation
  --no-stories       Skip story file generation
  --no-barrel        Skip barrel file updates

Examples:
  node scripts/cli/advanced-generator.js Button atom
  node scripts/cli/advanced-generator.js SearchBar molecule --props '[{"name":"placeholder","type":"string","required":true}]'
  node scripts/cli/advanced-generator.js Alert organism --variants '[{"name":"success","classes":"bg-green-100 text-green-800"}]'
`)
    process.exit(1)
  }

  const [name, type = 'atom'] = args
  
  // Парсим опции
  const options = {}
  for (let i = 2; i < args.length; i += 2) {
    const key = args[i].replace('--', '')
    const value = args[i + 1]
    
    if (key === 'props' || key === 'variants' || key === 'hooks') {
      try {
        options[key] = JSON.parse(value)
      } catch (e) {
        console.error(`❌ Ошибка парсинга ${key}:`, e.message)
        process.exit(1)
      }
    } else if (key === 'no-tests') {
      options.tests = false
      i-- // Не нужно пропускать следующий аргумент
    } else if (key === 'no-stories') {
      options.stories = false
      i-- // Не нужно пропускать следующий аргумент
    } else if (key === 'no-barrel') {
      options.barrel = false
      i-- // Не нужно пропускать следующий аргумент
    }
  }
  
  const generator = new AdvancedComponentGenerator()
  
  try {
    generator.generateComponent({
      name,
      type,
      ...options
    })
  } catch (error) {
    console.error('❌ Ошибка при создании компонента:', error.message)
    process.exit(1)
  }
}

module.exports = AdvancedComponentGenerator
