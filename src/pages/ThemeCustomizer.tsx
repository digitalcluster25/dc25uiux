import { Suspense } from 'react'
import { LazyThemeCustomizer } from '../utils/lazy-components'

export default function ThemeCustomizerPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-8">Загрузка редактора темы...</div>}>
      <LazyThemeCustomizer />
    </Suspense>
  )
}
