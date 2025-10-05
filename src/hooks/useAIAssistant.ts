import { useCallback, useEffect, useMemo, useState } from 'react'
import { AIAssistant, AIAssistantConfig, AIAssistantResponse } from '../ai/ai-assistant'
import componentsData from '../data/components-registry.json'

export interface UseAIAssistantOptions {
  openrouterApiKey?: string
  kilocodeApiKey?: string
  defaultProvider?: 'openrouter' | 'kilocode' | 'hybrid'
  fallbackToRules?: boolean
  cacheEnabled?: boolean
  maxCacheSize?: number
}

export interface UseAIAssistantReturn {
  // Состояние
  loading: boolean
  error: string | null
  response: AIAssistantResponse | null
  
  // Методы
  recommendComponents: (description: string, context?: string, preferences?: any) => Promise<void>
  analyzeCode: (code: string) => Promise<string>
  generateComponent: (description: string, props?: Record<string, any>) => Promise<string>
  suggestImprovements: (component: string) => Promise<string[]>
  
  // Утилиты
  clearCache: () => void
  getCacheStats: () => { size: number; maxSize: number }
  isConfigured: boolean
}

export function useAIAssistant(options: UseAIAssistantOptions = {}): UseAIAssistantReturn {
  const [assistant, setAssistant] = useState<AIAssistant | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<AIAssistantResponse | null>(null)

  // Получаем список доступных компонентов (мемоизируем для избежания пересоздания)
  const availableComponents = useMemo(() => 
    componentsData.components
      .filter(comp => comp.installed)
      .map(comp => comp.name),
    []
  )

  // Инициализация AI Assistant
  useEffect(() => {
    const config: AIAssistantConfig = {
      openrouterApiKey: options.openrouterApiKey,
      kilocodeApiKey: options.kilocodeApiKey,
      defaultProvider: options.defaultProvider || 'hybrid',
      fallbackToRules: options.fallbackToRules ?? true,
      cacheEnabled: options.cacheEnabled ?? true,
      maxCacheSize: options.maxCacheSize || 100
    }

    const aiAssistant = new AIAssistant(config, availableComponents)
    setAssistant(aiAssistant)
  }, [
    options.openrouterApiKey,
    options.kilocodeApiKey,
    options.defaultProvider,
    options.fallbackToRules,
    options.cacheEnabled,
    options.maxCacheSize
  ])

  // Проверяем, настроен ли AI Assistant
  const isConfigured = Boolean(
    options.openrouterApiKey || options.kilocodeApiKey || options.fallbackToRules
  )

  // Рекомендация компонентов
  const recommendComponents = useCallback(async (
    description: string,
    context?: string,
    preferences?: any
  ) => {
    if (!assistant) {
      setError('AI Assistant не инициализирован')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await assistant.recommendComponents(description, context, preferences)
      setResponse(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при получении рекомендаций')
    } finally {
      setLoading(false)
    }
  }, [assistant])

  // Анализ кода
  const analyzeCode = useCallback(async (code: string): Promise<string> => {
    if (!assistant) {
      throw new Error('AI Assistant не инициализирован')
    }

    try {
      return await assistant.analyzeCode(code)
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Ошибка при анализе кода')
    }
  }, [assistant])

  // Генерация компонента
  const generateComponent = useCallback(async (
    description: string,
    props?: Record<string, any>
  ): Promise<string> => {
    if (!assistant) {
      throw new Error('AI Assistant не инициализирован')
    }

    try {
      return await assistant.generateComponent(description, props)
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Ошибка при генерации компонента')
    }
  }, [assistant])

  // Предложения по улучшению
  const suggestImprovements = useCallback(async (component: string): Promise<string[]> => {
    if (!assistant) {
      throw new Error('AI Assistant не инициализирован')
    }

    try {
      return await assistant.suggestImprovements(component)
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Ошибка при получении предложений')
    }
  }, [assistant])

  // Очистка кэша
  const clearCache = useCallback(() => {
    if (assistant) {
      assistant.clearCache()
    }
  }, [assistant])

  // Статистика кэша
  const getCacheStats = useCallback(() => {
    if (assistant) {
      return assistant.getCacheStats()
    }
    return { size: 0, maxSize: 0 }
  }, [assistant])

  return {
    // Состояние
    loading,
    error,
    response,
    
    // Методы
    recommendComponents,
    analyzeCode,
    generateComponent,
    suggestImprovements,
    
    // Утилиты
    clearCache,
    getCacheStats,
    isConfigured
  }
}
