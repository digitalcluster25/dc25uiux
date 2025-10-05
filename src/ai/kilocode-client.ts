export interface KiloCodeRecommendation {
  components: string[]
  architecture: 'atom' | 'molecule' | 'organism'
  reasoning: string
  alternatives: string[]
  codeExample: string
  confidence: number
  patterns: string[]
  bestPractices: string[]
}

export interface KiloCodeQuery {
  description: string
  context?: string
  codebase?: string
  requirements?: string[]
}

export class KiloCodeRecommender {
  private baseUrl: string
  private apiKey: string
  private availableComponents: string[]

  constructor(apiKey: string, components: string[] = []) {
    this.baseUrl = 'https://api.kilocode.com/v1'
    this.apiKey = apiKey
    this.availableComponents = components
  }

  async recommendComponents(query: KiloCodeQuery): Promise<KiloCodeRecommendation> {
    try {
      const response = await fetch(`${this.baseUrl}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Client': 'dc25-uiux'
        },
        body: JSON.stringify({
          query: query.description,
          context: query.context,
          codebase: query.codebase,
          requirements: query.requirements,
          availableComponents: this.availableComponents,
          framework: 'react',
          language: 'typescript'
        })
      })

      if (!response.ok) {
        throw new Error(`KiloCode API error: ${response.status}`)
      }

      const result = await response.json() as KiloCodeRecommendation
      
      // Валидация и обогащение результата
      return this.enrichRecommendation(result, query)
      
    } catch (error) {
      console.error('KiloCode API error:', error)
      return this.getFallbackRecommendation(query.description)
    }
  }

  private enrichRecommendation(result: KiloCodeRecommendation, query: KiloCodeQuery): KiloCodeRecommendation {
    // Добавляем паттерны и лучшие практики
    const enrichedResult = {
      ...result,
      patterns: this.suggestPatterns(result.components),
      bestPractices: this.suggestBestPractices(result.components, query),
      confidence: Math.min(result.confidence || 0.8, 0.95)
    }

    // Проверяем доступность компонентов
    const validComponents = result.components.filter(comp => 
      this.availableComponents.includes(comp)
    )

    if (validComponents.length === 0) {
      return this.getFallbackRecommendation(query.description)
    }

    return {
      ...enrichedResult,
      components: validComponents
    }
  }

  private suggestPatterns(components: string[]): string[] {
    const patterns: string[] = []

    if (components.includes('Button') && components.includes('Input')) {
      patterns.push('Form Pattern: Используйте Button и Input для создания форм')
    }

    if (components.includes('Dialog') && components.includes('Button')) {
      patterns.push('Modal Pattern: Используйте Dialog с Button для модальных окон')
    }

    if (components.includes('Table') && components.includes('Pagination')) {
      patterns.push('Data Display Pattern: Используйте Table с Pagination для отображения данных')
    }

    if (components.includes('SearchBar') && components.includes('FilterGroup')) {
      patterns.push('Search Pattern: Используйте SearchBar с FilterGroup для поиска и фильтрации')
    }

    return patterns
  }

  private suggestBestPractices(components: string[], query: KiloCodeQuery): string[] {
    const practices: string[] = []

    // Общие практики
    practices.push('Используйте TypeScript интерфейсы для пропсов')
    practices.push('Применяйте принципы Atomic Design')
    practices.push('Используйте Tailwind CSS для стилизации')

    // Специфичные практики
    if (components.includes('Button')) {
      practices.push('Button: Используйте варианты (primary, secondary, outline)')
      practices.push('Button: Добавляйте состояния loading и disabled')
    }

    if (components.includes('Input')) {
      practices.push('Input: Всегда добавляйте Label для доступности')
      practices.push('Input: Используйте валидацию и обработку ошибок')
    }

    if (components.includes('Dialog')) {
      practices.push('Dialog: Управляйте состоянием открытия/закрытия')
      practices.push('Dialog: Добавляйте обработку клавиши Escape')
    }

    if (components.includes('Table')) {
      practices.push('Table: Используйте сортировку и фильтрацию')
      practices.push('Table: Добавляйте пагинацию для больших данных')
    }

    return practices
  }

  private getFallbackRecommendation(description: string): KiloCodeRecommendation {
    const keywords = description.toLowerCase()
    
    if (keywords.includes('кнопка') || keywords.includes('button')) {
      return {
        components: ['Button'],
        architecture: 'atom',
        reasoning: 'Базовый компонент кнопки для взаимодействия с пользователем',
        alternatives: ['Badge', 'Toggle', 'Switch'],
        codeExample: `<Button variant="default" size="md">Нажми меня</Button>`,
        confidence: 0.7,
        patterns: ['Button Pattern: Используйте для действий пользователя'],
        bestPractices: [
          'Button: Используйте варианты (primary, secondary, outline)',
          'Button: Добавляйте состояния loading и disabled',
          'Button: Используйте семантические имена для действий'
        ]
      }
    }
    
    if (keywords.includes('поле') || keywords.includes('input') || keywords.includes('форма')) {
      return {
        components: ['Input', 'Label', 'Button'],
        architecture: 'molecule',
        reasoning: 'Компоненты для создания формы ввода данных',
        alternatives: ['Textarea', 'Select', 'Checkbox'],
        codeExample: `
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Введите email" />
  <Button type="submit">Отправить</Button>
</div>`,
        confidence: 0.7,
        patterns: ['Form Pattern: Используйте Input, Label и Button для форм'],
        bestPractices: [
          'Input: Всегда добавляйте Label для доступности',
          'Input: Используйте валидацию и обработку ошибок',
          'Form: Группируйте связанные поля'
        ]
      }
    }
    
    if (keywords.includes('таблица') || keywords.includes('table') || keywords.includes('данные')) {
      return {
        components: ['Table', 'Pagination', 'SearchBar'],
        architecture: 'organism',
        reasoning: 'Компоненты для отображения и управления данными',
        alternatives: ['Card', 'List', 'Grid'],
        codeExample: `
<div className="space-y-4">
  <SearchBar placeholder="Поиск..." />
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Название</TableHead>
        <TableHead>Статус</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Элемент 1</TableCell>
        <TableCell>Активен</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <Pagination />
</div>`,
        confidence: 0.7,
        patterns: ['Data Display Pattern: Используйте Table с Pagination для данных'],
        bestPractices: [
          'Table: Используйте сортировку и фильтрацию',
          'Table: Добавляйте пагинацию для больших данных',
          'Table: Делайте столбцы адаптивными'
        ]
      }
    }
    
    // Дефолтная рекомендация
    return {
      components: ['Button', 'Input'],
      architecture: 'atom',
      reasoning: 'Базовые компоненты для начала разработки',
      alternatives: ['Badge', 'Label', 'Card'],
      codeExample: `<Button>Начните здесь</Button>`,
      confidence: 0.5,
      patterns: ['Basic Pattern: Начните с простых компонентов'],
      bestPractices: [
        'Используйте TypeScript интерфейсы для пропсов',
        'Применяйте принципы Atomic Design',
        'Используйте Tailwind CSS для стилизации'
      ]
    }
  }

  // Дополнительные методы для расширенной функциональности
  async analyzeCodebase(codebase: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          codebase,
          framework: 'react',
          language: 'typescript'
        })
      })

      if (!response.ok) {
        throw new Error(`KiloCode analysis error: ${response.status}`)
      }

      const result = await response.json()
      return result.suggestions || []
    } catch (error) {
      console.error('Codebase analysis error:', error)
      return ['Не удалось проанализировать кодовую базу']
    }
  }

  async suggestRefactoring(component: string, code: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/refactor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          component,
          code,
          framework: 'react',
          language: 'typescript'
        })
      })

      if (!response.ok) {
        throw new Error(`KiloCode refactoring error: ${response.status}`)
      }

      const result = await response.json()
      return result.suggestions || []
    } catch (error) {
      console.error('Refactoring suggestion error:', error)
      return ['Не удалось получить предложения по рефакторингу']
    }
  }

  async generateTests(component: string, props: Record<string, any>): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/generate-tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          component,
          props,
          framework: 'react',
          testingLibrary: 'vitest',
          language: 'typescript'
        })
      })

      if (!response.ok) {
        throw new Error(`KiloCode test generation error: ${response.status}`)
      }

      const result = await response.json()
      return result.testCode || 'Не удалось сгенерировать тесты'
    } catch (error) {
      console.error('Test generation error:', error)
      return 'Ошибка при генерации тестов'
    }
  }

  async optimizePerformance(component: string, code: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          component,
          code,
          framework: 'react',
          language: 'typescript'
        })
      })

      if (!response.ok) {
        throw new Error(`KiloCode optimization error: ${response.status}`)
      }

      const result = await response.json()
      return result.optimizations || []
    } catch (error) {
      console.error('Performance optimization error:', error)
      return ['Не удалось получить предложения по оптимизации']
    }
  }
}
