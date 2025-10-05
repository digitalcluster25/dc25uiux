import { Code, Lightbulb, Loader2, RefreshCw, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useAIAssistant } from '../../hooks/useAIAssistant'
import { Alert, AlertDescription } from '../ui/alert'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface AIAssistantProps {
  openrouterApiKey?: string
  kilocodeApiKey?: string
  className?: string
}

export default function AIAssistant({ 
  openrouterApiKey, 
  kilocodeApiKey, 
  className 
}: AIAssistantProps) {
  const [query, setQuery] = useState('')
  const [context, setContext] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [analysisResult, setAnalysisResult] = useState('')
  const [improvements, setImprovements] = useState<string[]>([])

  const {
    loading,
    error,
    response,
    recommendComponents,
    analyzeCode,
    generateComponent,
    suggestImprovements,
    clearCache,
    getCacheStats,
    isConfigured
  } = useAIAssistant({
    openrouterApiKey,
    kilocodeApiKey,
    defaultProvider: 'hybrid',
    fallbackToRules: true,
    cacheEnabled: true
  })

  const handleRecommend = async () => {
    if (!query.trim()) return
    
    await recommendComponents(query, context)
  }

  const handleAnalyze = async () => {
    if (!generatedCode.trim()) return
    
    try {
      const result = await analyzeCode(generatedCode)
      setAnalysisResult(result)
    } catch (err) {
      console.error('Analysis error:', err)
    }
  }

  const handleGenerate = async () => {
    if (!query.trim()) return
    
    try {
      const result = await generateComponent(query)
      setGeneratedCode(result)
    } catch (err) {
      console.error('Generation error:', err)
    }
  }

  const handleSuggestImprovements = async () => {
    if (!query.trim()) return
    
    try {
      const result = await suggestImprovements(query)
      setImprovements(result)
    } catch (err) {
      console.error('Improvements error:', err)
    }
  }

  const cacheStats = getCacheStats()

  if (!isConfigured) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Помощник
          </CardTitle>
          <CardDescription>
            Настройте API ключи для использования AI функций
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Для работы AI помощника необходимо настроить API ключи OpenRouter или KiloCode.
              Без ключей доступен только базовый режим с правилами.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Основной интерфейс */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Помощник для компонентов
          </CardTitle>
          <CardDescription>
            Описывайте что вам нужно, и AI подберет подходящие компоненты
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Поле запроса */}
          <div className="space-y-2">
            <Label htmlFor="query">Опишите что вам нужно</Label>
            <Input
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Например: форма входа с полями email и пароль"
              onKeyPress={(e) => e.key === 'Enter' && handleRecommend()}
            />
          </div>

          {/* Контекст */}
          <div className="space-y-2">
            <Label htmlFor="context">Контекст (опционально)</Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Дополнительная информация о проекте или требованиях"
              rows={3}
            />
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-2">
            <Button 
              onClick={handleRecommend} 
              disabled={loading || !query.trim()}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Анализирую...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Рекомендовать
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !query.trim()}
              variant="outline"
            >
              <Code className="mr-2 h-4 w-4" />
              Генерировать код
            </Button>
            
            <Button 
              onClick={handleSuggestImprovements} 
              disabled={loading || !query.trim()}
              variant="outline"
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              Улучшения
            </Button>
          </div>

          {/* Ошибка */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Результат рекомендаций */}
      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Рекомендации</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {response.provider === 'openrouter' ? 'OpenRouter' : 
                   response.provider === 'kilocode' ? 'KiloCode' : 'Fallback'}
                </Badge>
                {response.cached && <Badge variant="secondary">Кэш</Badge>}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Рекомендуемые компоненты */}
            <div>
              <Label className="text-sm font-medium">Рекомендуемые компоненты:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {response.recommendations.components.map((component, index) => (
                  <Badge key={index} variant="default">
                    {component}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Архитектура */}
            <div>
              <Label className="text-sm font-medium">Архитектура:</Label>
              <Badge variant="outline" className="ml-2">
                {response.recommendations.architecture}
              </Badge>
            </div>

            {/* Объяснение */}
            <div>
              <Label className="text-sm font-medium">Объяснение:</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {response.recommendations.reasoning}
              </p>
            </div>

            {/* Альтернативы */}
            {response.recommendations.alternatives && response.recommendations.alternatives.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Альтернативы:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {response.recommendations.alternatives.map((alt, index) => (
                    <Badge key={index} variant="secondary">
                      {alt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Пример кода */}
            {response.recommendations.codeExample && (
              <div>
                <Label className="text-sm font-medium">Пример кода:</Label>
                <pre className="bg-muted p-3 rounded-md text-sm mt-2 overflow-x-auto">
                  <code>{response.recommendations.codeExample}</code>
                </pre>
              </div>
            )}

            {/* Уверенность */}
            <div>
              <Label className="text-sm font-medium">Уверенность:</Label>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(response.recommendations.confidence || 0) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round((response.recommendations.confidence || 0) * 100)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Сгенерированный код */}
      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Сгенерированный код
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
              <code>{generatedCode}</code>
            </pre>
            <Button onClick={handleAnalyze} variant="outline" size="sm">
              <Code className="mr-2 h-4 w-4" />
              Анализировать код
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Результат анализа */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>Анализ кода</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{analysisResult}</p>
          </CardContent>
        </Card>
      )}

      {/* Предложения по улучшению */}
      {improvements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Предложения по улучшению
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {improvements.map((improvement, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Статистика кэша */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Статистика</span>
            <Button onClick={clearCache} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Очистить кэш
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Размер кэша: {cacheStats.size} / {cacheStats.maxSize}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
