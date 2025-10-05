import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
            DC25 UI/UX
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`hover:opacity-80 transition-opacity ${isActive('/') ? 'border-b-2 border-white' : ''}`}
            >
              Главная
            </Link>
            <Link 
              to="/library" 
              className={`hover:opacity-80 transition-opacity ${isActive('/library') ? 'border-b-2 border-white' : ''}`}
            >
              Библиотека
            </Link>
            <Link 
              to="/theme" 
              className={`hover:opacity-80 transition-opacity ${isActive('/theme') ? 'border-b-2 border-white' : ''}`}
            >
              Тема
            </Link>
            <Link 
              to="/examples" 
              className={`hover:opacity-80 transition-opacity ${isActive('/examples') ? 'border-b-2 border-white' : ''}`}
            >
              Примеры
            </Link>
            <Link 
              to="/docs" 
              className={`hover:opacity-80 transition-opacity ${isActive('/docs') ? 'border-b-2 border-white' : ''}`}
            >
              Документация
            </Link>
            <Link 
              to="/ai" 
              className={`hover:opacity-80 transition-opacity ${isActive('/ai') ? 'border-b-2 border-white' : ''} flex items-center gap-1`}
            >
              <span className="text-purple-300">🤖</span>
              AI Помощник
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:opacity-80 transition-opacity"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="hover:opacity-80 transition-opacity py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/library" 
                className="hover:opacity-80 transition-opacity py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Библиотека
              </Link>
              <Link 
                to="/theme" 
                className="hover:opacity-80 transition-opacity py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Тема
              </Link>
              <Link 
                to="/examples" 
                className="hover:opacity-80 transition-opacity py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Примеры
              </Link>
              <Link 
                to="/docs" 
                className="hover:opacity-80 transition-opacity py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Документация
              </Link>
              <Link 
                to="/ai" 
                className="hover:opacity-80 transition-opacity py-2 flex items-center gap-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-purple-300">🤖</span>
                AI Помощник
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}