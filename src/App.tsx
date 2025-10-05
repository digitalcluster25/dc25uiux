import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageTemplate } from './components'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import PWAUpdatePrompt from './components/PWAUpdatePrompt'
import { ThemeProvider } from './context/ThemeContext'

// Lazy loading для страниц
const Home = lazy(() => import('./pages/Home'))
const Library = lazy(() => import('./pages/Library'))
const ThemeCustomizerPage = lazy(() => import('./pages/ThemeCustomizer'))
const Examples = lazy(() => import('./pages/Examples'))
const Documentation = lazy(() => import('./pages/Documentation'))
const AIAssistantPage = lazy(() => import('./pages/AIAssistant'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Компонент загрузки
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
)

function App() {
  return (
    <ThemeProvider>
      <PageTemplate>
        <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/theme" element={<ThemeCustomizerPage />} />
              <Route path="/examples" element={<Examples />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/ai" element={<AIAssistantPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
      </PageTemplate>
      
      {/* PWA компоненты */}
      <PWAUpdatePrompt />
      <PWAInstallPrompt />
    </ThemeProvider>
  )
}

export default App
