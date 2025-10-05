import { ReactNode, useEffect, useState } from 'react'
import { loadDisplayComponents, loadFeedbackComponents, loadFormComponents, loadLayoutComponents, loadNavigationComponents, loadOverlayComponents } from '../utils/lazy-components'

interface DynamicComponentLoaderProps {
  category: 'form' | 'layout' | 'navigation' | 'overlay' | 'feedback' | 'display'
  children: (components: any) => ReactNode
  fallback?: ReactNode
}

const loaderMap = {
  form: loadFormComponents,
  layout: loadLayoutComponents,
  navigation: loadNavigationComponents,
  overlay: loadOverlayComponents,
  feedback: loadFeedbackComponents,
  display: loadDisplayComponents,
}

export default function DynamicComponentLoader({ 
  category, 
  children, 
  fallback = <div>Загрузка компонентов...</div> 
}: DynamicComponentLoaderProps) {
  const [components, setComponents] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadComponents = async () => {
      try {
        setLoading(true)
        const loader = loaderMap[category]
        const loadedComponents = await loader()
        setComponents(loadedComponents)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    loadComponents()
  }, [category])

  if (loading) {
    return <>{fallback}</>
  }

  if (error) {
    return <div className="text-red-500">Ошибка загрузки компонентов: {error.message}</div>
  }

  if (!components) {
    return <div>Компоненты не найдены</div>
  }

  return <>{children(components)}</>
}
