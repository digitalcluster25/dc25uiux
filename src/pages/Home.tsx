import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            DC25 UI/UX Library
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Современная библиотека компонентов на базе shadcn/ui с централизованным управлением стилями и семантичной архитектурой
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/library" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Посмотреть компоненты
            </Link>
            <a 
              href="https://github.com" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">🎨 Современный дизайн</h3>
            <p className="text-gray-600">
              Компоненты с актуальным дизайном, поддержкой темной темы и адаптивностью
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">⚡ Высокая производительность</h3>
            <p className="text-gray-600">
              Оптимизированные компоненты с минимальным bundle size и быстрой загрузкой
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">🔧 Легкая настройка</h3>
            <p className="text-gray-600">
              Централизованное управление стилями через конфигурационные файлы
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
