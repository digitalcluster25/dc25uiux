import { Suspense, useMemo, useState } from 'react'
import { SearchBar } from '../components'
import componentsData from '../data/components-registry.json'
import { Component, ComponentFilter } from '../types/component'
import { LazyComponentGrid, LazyInstallDialog } from '../utils/lazy-components'

export default function Library() {
  const [filter, setFilter] = useState<ComponentFilter>({
    search: '',
    category: '',
    status: 'all'
  })
  const [installDialog, setInstallDialog] = useState<{
    isOpen: boolean
    componentId: string
    componentName: string
  }>({
    isOpen: false,
    componentId: '',
    componentName: ''
  })

  const components: Component[] = componentsData.components

  const filteredComponents = useMemo(() => {
    return components.filter(component => {
      // Поиск по названию и описанию
      const matchesSearch = filter.search === '' || 
        component.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        component.description.toLowerCase().includes(filter.search.toLowerCase())

      // Фильтр по категории
      const matchesCategory = filter.category === '' || component.category === filter.category

      // Фильтр по статусу
      const matchesStatus = filter.status === 'all' || 
        (filter.status === 'installed' && component.installed) ||
        (filter.status === 'available' && !component.installed)

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [components, filter])

  const handleInstall = (componentId: string) => {
    const component = components.find(c => c.id === componentId)
    if (component) {
      setInstallDialog({
        isOpen: true,
        componentId: component.id,
        componentName: component.name
      })
    }
  }

  const handleDemo = (componentId: string) => {
    // TODO: Реализовать демо компонентов
    console.log('Demo component:', componentId)
  }

  const handleCopyCode = (componentId: string) => {
    // TODO: Реализовать показ кода компонента
    console.log('Copy code for component:', componentId)
  }

  const handleCloseInstallDialog = () => {
    setInstallDialog({
      isOpen: false,
      componentId: '',
      componentName: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Библиотека компонентов
          </h1>
          <p className="text-gray-600">
            Выберите и установите компоненты shadcn/ui для вашего проекта
          </p>
        </div>

        {/* Фильтры и поиск */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Поиск компонентов..."
                onSearch={(search) => setFilter(prev => ({ ...prev, search }))}
              />
            </div>
            <div className="flex gap-4">
              <select 
                value={filter.category}
                onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Все категории</option>
                <option value="form">Формы</option>
                <option value="layout">Макет</option>
                <option value="navigation">Навигация</option>
                <option value="feedback">Обратная связь</option>
                <option value="overlay">Наложения</option>
                <option value="display">Отображение</option>
              </select>
              <select 
                value={filter.status}
                onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value as any }))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">Все статусы</option>
                <option value="installed">Установленные</option>
                <option value="available">Доступные</option>
              </select>
            </div>
          </div>
        </div>

          {/* Сетка компонентов */}
          <Suspense fallback={<div className="flex justify-center py-8">Загрузка компонентов...</div>}>
            <LazyComponentGrid
              components={filteredComponents}
              onInstall={handleInstall}
              onDemo={handleDemo}
              onCopyCode={handleCopyCode}
            />
          </Suspense>

          {/* Диалог установки */}
          <Suspense fallback={null}>
            <LazyInstallDialog
              componentId={installDialog.componentId}
              componentName={installDialog.componentName}
              isOpen={installDialog.isOpen}
              onClose={handleCloseInstallDialog}
            />
          </Suspense>
      </div>
    </div>
  )
}
