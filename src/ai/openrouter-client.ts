import OpenAI from 'openai'

export interface ComponentRecommendation {
  components: string[]
  architecture: 'atom' | 'molecule' | 'organism'
  reasoning: string
  alternatives: string[]
  codeExample: string
  confidence: number
}

export interface AIQuery {
  description: string
  context?: string
  preferences?: {
    complexity?: 'simple' | 'medium' | 'complex'
    style?: 'minimal' | 'rich' | 'custom'
    framework?: 'react' | 'vue' | 'angular'
  }
}

export class OpenRouterRecommender {
  private client: OpenAI
  private availableComponents: string[]
  private systemPrompt: string

  constructor(apiKey: string, components: string[] = []) {
    this.client = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://dc25-uiux.vercel.app',
        'X-Title': 'DC25 UI/UX AI Assistant'
      }
    })
    
    this.availableComponents = components
    this.systemPrompt = this.buildSystemPrompt()
  }

  private buildSystemPrompt(): string {
    return `Ты - эксперт по React компонентам и UI/UX дизайну. 
Твоя задача - анализировать запросы пользователей и рекомендовать подходящие компоненты из библиотеки DC25 UI/UX.

Доступные компоненты:
${this.availableComponents.map(comp => `- ${comp}`).join('\n')}

Принципы Atomic Design:
- Atoms: Базовые элементы (Button, Input, Label, Badge)
- Molecules: Простые комбинации (SearchBar, FilterGroup, ComponentCard)
- Organisms: Сложные секции (Header, Footer, ComponentGrid)

Всегда отвечай в формате JSON:
{
  "components": ["список", "рекомендуемых", "компонентов"],
  "architecture": "atom|molecule|organism",
  "reasoning": "объяснение выбора",
  "alternatives": ["альтернативные", "варианты"],
  "codeExample": "пример кода компонента",
  "confidence": 0.95
}

Используй только доступные компоненты из списка выше.`
  }

  async recommendComponents(query: AIQuery): Promise<ComponentRecommendation> {
    try {
      const userPrompt = this.buildUserPrompt(query)
      
      const response = await this.client.chat.completions.create({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: this.systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: 'json_object' }
      })

      const content = response.choices[0]?.message?.content
      if (!content) {
        throw new Error('No response from AI')
      }

      const result = JSON.parse(content) as ComponentRecommendation
      
      // Валидация результата
      return this.validateRecommendation(result)
      
    } catch (error) {
      console.error('OpenRouter API error:', error)
      return this.getFallbackRecommendation(query.description)
    }
  }

  private buildUserPrompt(query: AIQuery): string {
    let prompt = `Запрос: ${query.description}`
    
    if (query.context) {
      prompt += `\nКонтекст: ${query.context}`
    }
    
    if (query.preferences) {
      prompt += `\nПредпочтения:`
      if (query.preferences.complexity) {
        prompt += `\n- Сложность: ${query.preferences.complexity}`
      }
      if (query.preferences.style) {
        prompt += `\n- Стиль: ${query.preferences.style}`
      }
      if (query.preferences.framework) {
        prompt += `\n- Фреймворк: ${query.preferences.framework}`
      }
    }
    
    return prompt
  }

  private validateRecommendation(result: ComponentRecommendation): ComponentRecommendation {
    // Проверяем, что все рекомендованные компоненты существуют
    const validComponents = result.components.filter(comp => 
      this.availableComponents.includes(comp)
    )
    
    if (validComponents.length === 0) {
      return this.getFallbackRecommendation('')
    }
    
    return {
      ...result,
      components: validComponents,
      confidence: Math.min(result.confidence || 0.8, 0.95)
    }
  }

  private getFallbackRecommendation(description: string): ComponentRecommendation {
    // Fallback на основе ключевых слов
    const keywords = description.toLowerCase()
    
    if (keywords.includes('кнопка') || keywords.includes('button')) {
      return {
        components: ['Button'],
        architecture: 'atom',
        reasoning: 'Базовый компонент кнопки для взаимодействия',
        alternatives: ['Badge', 'Toggle'],
        codeExample: `<Button variant="default">Нажми меня</Button>`,
        confidence: 0.7
      }
    }
    
    if (keywords.includes('поле') || keywords.includes('input') || keywords.includes('форма')) {
      return {
        components: ['Input', 'Label', 'Button'],
        architecture: 'molecule',
        reasoning: 'Компоненты для создания формы ввода',
        alternatives: ['Textarea', 'Select'],
        codeExample: `
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
<Button type="submit">Отправить</Button>`,
        confidence: 0.7
      }
    }
    
    // Дефолтная рекомендация
    return {
      components: ['Button', 'Input'],
      architecture: 'atom',
      reasoning: 'Базовые компоненты для начала разработки',
      alternatives: ['Badge', 'Label'],
      codeExample: `<Button>Нажми меня</Button>`,
      confidence: 0.5
    }
  }

  // Дополнительные методы для расширенной функциональности
  async analyzeCode(code: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: 'Ты эксперт по React коду. Анализируй предоставленный код и дай рекомендации по улучшению.'
          },
          {
            role: 'user',
            content: `Проанализируй этот React код:\n\`\`\`tsx\n${code}\n\`\`\``
          }
        ],
        temperature: 0.5,
        max_tokens: 800
      })

      return response.choices[0]?.message?.content || 'Не удалось проанализировать код'
    } catch (error) {
      console.error('Code analysis error:', error)
      return 'Ошибка при анализе кода'
    }
  }

  async generateComponent(description: string, props?: Record<string, any>): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: `Ты эксперт по React компонентам. Генерируй TypeScript React компоненты в стиле DC25 UI/UX библиотеки.
            
Используй:
- TypeScript интерфейсы для пропсов
- Tailwind CSS для стилизации
- Компоненты из shadcn/ui
- Функциональные компоненты с хуками

Формат ответа: только код компонента без объяснений.`
          },
          {
            role: 'user',
            content: `Создай компонент: ${description}${props ? `\nПропсы: ${JSON.stringify(props)}` : ''}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })

      return response.choices[0]?.message?.content || 'Не удалось сгенерировать компонент'
    } catch (error) {
      console.error('Component generation error:', error)
      return 'Ошибка при генерации компонента'
    }
  }

  async suggestImprovements(component: string): Promise<string[]> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: 'Ты эксперт по React компонентам. Предлагай улучшения для компонентов.'
          },
          {
            role: 'user',
            content: `Предложи улучшения для компонента: ${component}`
          }
        ],
        temperature: 0.6,
        max_tokens: 600
      })

      const content = response.choices[0]?.message?.content || ''
      return content.split('\n').filter(line => line.trim().length > 0)
    } catch (error) {
      console.error('Improvements suggestion error:', error)
      return ['Не удалось получить предложения по улучшению']
    }
  }
}
