import { KiloCodeQuery, KiloCodeRecommendation, KiloCodeRecommender } from './kilocode-client'
import { AIQuery, ComponentRecommendation, OpenRouterRecommender } from './openrouter-client'

export interface AIAssistantConfig {
  openrouterApiKey?: string
  kilocodeApiKey?: string
  defaultProvider: 'openrouter' | 'kilocode' | 'hybrid'
  fallbackToRules: boolean
  cacheEnabled: boolean
  maxCacheSize: number
}

export interface AIAssistantResponse {
  recommendations: ComponentRecommendation | KiloCodeRecommendation
  provider: 'openrouter' | 'kilocode' | 'fallback'
  cached: boolean
  timestamp: number
}

export class AIAssistant {
  private openrouterClient?: OpenRouterRecommender
  private kilocodeClient?: KiloCodeRecommender
  private config: AIAssistantConfig
  private cache: Map<string, AIAssistantResponse>
  private availableComponents: string[]

  constructor(config: AIAssistantConfig, components: string[] = []) {
    this.config = config
    this.availableComponents = components
    this.cache = new Map()

    // Инициализация клиентов
    if (config.openrouterApiKey) {
      this.openrouterClient = new OpenRouterRecommender(config.openrouterApiKey, components)
    }

    if (config.kilocodeApiKey) {
      this.kilocodeClient = new KiloCodeRecommender(config.kilocodeApiKey, components)
    }
  }

  async recommendComponents(
    description: string, 
    context?: string,
    preferences?: any
  ): Promise<AIAssistantResponse> {
    const cacheKey = this.generateCacheKey(description, context, preferences)
    
    // Проверяем кэш
    if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!
      return { ...cached, cached: true }
    }

    let response: AIAssistantResponse

    try {
      // Выбираем провайдера
      const provider = this.selectProvider()
      
      if (provider === 'openrouter' && this.openrouterClient) {
        response = await this.getOpenRouterRecommendation(description, context, preferences)
      } else if (provider === 'kilocode' && this.kilocodeClient) {
        response = await this.getKiloCodeRecommendation(description, context)
      } else {
        response = this.getFallbackRecommendation(description)
      }
    } catch (error) {
      console.error('AI Assistant error:', error)
      response = this.getFallbackRecommendation(description)
    }

    // Кэшируем результат
    if (this.config.cacheEnabled) {
      this.cacheResult(cacheKey, response)
    }

    return { ...response, cached: false, timestamp: Date.now() }
  }

  private selectProvider(): 'openrouter' | 'kilocode' | 'fallback' {
    if (this.config.defaultProvider === 'hybrid') {
      // Рандомный выбор для балансировки нагрузки
      return Math.random() > 0.5 ? 'openrouter' : 'kilocode'
    }
    
    if (this.config.defaultProvider === 'openrouter' && this.openrouterClient) {
      return 'openrouter'
    }
    
    if (this.config.defaultProvider === 'kilocode' && this.kilocodeClient) {
      return 'kilocode'
    }
    
    return 'fallback'
  }

  private async getOpenRouterRecommendation(
    description: string,
    context?: string,
    preferences?: any
  ): Promise<AIAssistantResponse> {
    if (!this.openrouterClient) {
      throw new Error('OpenRouter client not initialized')
    }

    const query: AIQuery = {
      description,
      context,
      preferences
    }

    const recommendations = await this.openrouterClient.recommendComponents(query)
    
    return {
      recommendations,
      provider: 'openrouter',
      cached: false,
      timestamp: Date.now()
    }
  }

  private async getKiloCodeRecommendation(
    description: string,
    context?: string
  ): Promise<AIAssistantResponse> {
    if (!this.kilocodeClient) {
      throw new Error('KiloCode client not initialized')
    }

    const query: KiloCodeQuery = {
      description,
      context
    }

    const recommendations = await this.kilocodeClient.recommendComponents(query)
    
    return {
      recommendations,
      provider: 'kilocode',
      cached: false,
      timestamp: Date.now()
    }
  }

  private getFallbackRecommendation(description: string): AIAssistantResponse {
    // Простое правило-основанное резервное решение
    const keywords = description.toLowerCase()
    
    let components: string[] = []
    let architecture: 'atom' | 'molecule' | 'organism' = 'atom'
    let reasoning = 'Базовые компоненты для начала разработки'
    let alternatives: string[] = []
    let codeExample = ''
    let confidence = 0.5

    if (keywords.includes('кнопка') || keywords.includes('button')) {
      components = ['Button']
      architecture = 'atom'
      reasoning = 'Компонент кнопки для взаимодействия с пользователем'
      alternatives = ['Badge', 'Toggle']
      codeExample = `<Button variant="default">Нажми меня</Button>`
      confidence = 0.7
    } else if (keywords.includes('поле') || keywords.includes('input') || keywords.includes('форма')) {
      components = ['Input', 'Label']
      architecture = 'molecule'
      reasoning = 'Компоненты для создания формы ввода'
      alternatives = ['Textarea', 'Select']
      codeExample = `
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="Введите email" />`
      confidence = 0.7
    } else if (keywords.includes('таблица') || keywords.includes('table') || keywords.includes('данные')) {
      components = ['Table', 'Pagination']
      architecture = 'organism'
      reasoning = 'Компоненты для отображения данных в таблице'
      alternatives = ['Card', 'List']
      codeExample = `
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Название</TableHead>
      <TableHead>Статус</TableHead>
    </TableRow>
  </TableHeader>
</Table>`
      confidence = 0.7
    } else {
      components = ['Button', 'Input']
      architecture = 'atom'
      reasoning = 'Базовые компоненты для начала разработки'
      alternatives = ['Badge', 'Label']
      codeExample = `<Button>Начните здесь</Button>`
      confidence = 0.5
    }

    const recommendations: ComponentRecommendation = {
      components,
      architecture,
      reasoning,
      alternatives,
      codeExample,
      confidence
    }

    return {
      recommendations,
      provider: 'fallback',
      cached: false,
      timestamp: Date.now()
    }
  }

  private generateCacheKey(description: string, context?: string, preferences?: any): string {
    const key = JSON.stringify({ description, context, preferences })
    return btoa(key).replace(/[^a-zA-Z0-9]/g, '')
  }

  private cacheResult(key: string, response: AIAssistantResponse): void {
    // Ограничиваем размер кэша
    if (this.cache.size >= this.config.maxCacheSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    
    this.cache.set(key, response)
  }

  // Дополнительные методы
  async analyzeCode(code: string): Promise<string> {
    if (this.openrouterClient) {
      try {
        return await this.openrouterClient.analyzeCode(code)
      } catch (error) {
        console.error('Code analysis error:', error)
      }
    }
    
    return 'Не удалось проанализировать код'
  }

  async generateComponent(description: string, props?: Record<string, any>): Promise<string> {
    if (this.openrouterClient) {
      try {
        return await this.openrouterClient.generateComponent(description, props)
      } catch (error) {
        console.error('Component generation error:', error)
      }
    }
    
    return 'Не удалось сгенерировать компонент'
  }

  async suggestImprovements(component: string): Promise<string[]> {
    if (this.openrouterClient) {
      try {
        return await this.openrouterClient.suggestImprovements(component)
      } catch (error) {
        console.error('Improvements suggestion error:', error)
      }
    }
    
    return ['Не удалось получить предложения по улучшению']
  }

  // Методы для работы с кэшем
  clearCache(): void {
    this.cache.clear()
  }

  getCacheStats(): { size: number; maxSize: number } {
    return {
      size: this.cache.size,
      maxSize: this.config.maxCacheSize
    }
  }

  // Методы для управления конфигурацией
  updateConfig(newConfig: Partial<AIAssistantConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  getConfig(): AIAssistantConfig {
    return { ...this.config }
  }

  // Методы для работы с компонентами
  updateAvailableComponents(components: string[]): void {
    this.availableComponents = components
    
    // Обновляем клиентов
    if (this.openrouterClient) {
      this.openrouterClient = new OpenRouterRecommender(
        this.config.openrouterApiKey || '',
        components
      )
    }
    
    if (this.kilocodeClient) {
      this.kilocodeClient = new KiloCodeRecommender(
        this.config.kilocodeApiKey || '',
        components
      )
    }
  }

  getAvailableComponents(): string[] {
    return [...this.availableComponents]
  }
}
