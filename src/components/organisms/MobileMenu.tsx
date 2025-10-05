import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  if (!isOpen) return null

  return (
    <div className="md:hidden mt-4">
      <div className="flex flex-col space-y-2">
        <Link 
          to="/" 
          className={`hover:opacity-80 transition-opacity py-2 ${isActive('/') ? 'border-b-2 border-white' : ''}`}
          onClick={onClose}
        >
          Главная
        </Link>
        <Link 
          to="/library" 
          className={`hover:opacity-80 transition-opacity py-2 ${isActive('/library') ? 'border-b-2 border-white' : ''}`}
          onClick={onClose}
        >
          Библиотека
        </Link>
      </div>
    </div>
  )
}
