import { Component } from '../../types/component'
import { Badge, Button } from '../atoms'

interface ComponentCardProps {
  component: Component
  onInstall: (componentId: string) => void
  onDemo: (componentId: string) => void
  onCopyCode: (componentId: string) => void
}

export default function ComponentCard({ 
  component, 
  onInstall, 
  onDemo, 
  onCopyCode 
}: ComponentCardProps) {
  const getCategoryVariant = (category: string) => {
    const variants = {
      form: 'info' as const,
      layout: 'success' as const,
      navigation: 'warning' as const,
      feedback: 'error' as const,
      overlay: 'default' as const,
      display: 'default' as const
    }
    return variants[category as keyof typeof variants] || 'default'
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      form: 'Формы',
      layout: 'Макет',
      navigation: 'Навигация',
      feedback: 'Обратная связь',
      overlay: 'Наложения',
      display: 'Отображение'
    }
    return labels[category as keyof typeof labels] || category
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {component.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={getCategoryVariant(component.category)}>
              {getCategoryLabel(component.category)}
            </Badge>
            <Badge variant={component.installed ? 'success' : 'default'}>
              {component.installed ? 'Установлен' : 'Доступен'}
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {component.description}
      </p>

      {component.dependencies && component.dependencies.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Зависимости:</p>
          <div className="flex flex-wrap gap-1">
            {component.dependencies.map((dep) => (
              <Badge key={dep} variant="default" size="sm">
                {dep}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {component.props && component.props.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Props:</p>
          <div className="flex flex-wrap gap-1">
            {component.props.map((prop) => (
              <Badge key={prop} variant="secondary" size="sm">
                {prop}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {component.variants && component.variants.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Варианты:</p>
          <div className="flex flex-wrap gap-1">
            {component.variants.map((variant) => (
              <Badge key={variant} variant="outline" size="sm">
                {variant}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {component.hooks && component.hooks.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Хуки:</p>
          <div className="flex flex-wrap gap-1">
            {component.hooks.map((hook) => (
              <Badge key={hook} variant="destructive" size="sm">
                {hook}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={() => onDemo(component.id)}
          className="flex-1"
        >
          Демо
        </Button>
        {component.installed ? (
          <Button
            onClick={() => onCopyCode(component.id)}
            variant="outline"
            className="flex-1"
          >
            Код
          </Button>
        ) : (
          <Button
            onClick={() => onInstall(component.id)}
            variant="outline"
            className="flex-1"
          >
            Установить
          </Button>
        )}
      </div>
    </div>
  )
}