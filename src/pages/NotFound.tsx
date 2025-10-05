import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Страница не найдена
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          К сожалению, страница которую вы ищете не существует или была перемещена
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            На главную
          </Link>
          <Link 
            to="/library" 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Библиотека
          </Link>
        </div>
      </div>
    </div>
  )
}
