import { Component } from '../../types/component'
import { ComponentCard } from '../molecules'

interface ComponentGridProps {
  components: Component[]
  onInstall: (componentId: string) => void
  onDemo: (componentId: string) => void
  onCopyCode: (componentId: string) => void
}

export default function ComponentGrid({ 
  components, 
  onInstall, 
  onDemo, 
  onCopyCode 
}: ComponentGridProps) {
  if (components.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709M12 3v18m0 0l-4-4m4 4l4-4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Компоненты не найдены
        </h3>
        <p className="text-gray-500">
          Попробуйте изменить фильтры или поисковый запрос
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {components.map((component) => (
        <ComponentCard
          key={component.id}
          component={component}
          onInstall={onInstall}
          onDemo={onDemo}
          onCopyCode={onCopyCode}
        />
      ))}
    </div>
  )
}
