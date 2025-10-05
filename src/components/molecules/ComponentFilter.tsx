import { ComponentCategory } from '../../types/component'

interface ComponentFilterProps {
  category: ComponentCategory | ''
  status: 'all' | 'installed' | 'available'
  onCategoryChange: (category: ComponentCategory | '') => void
  onStatusChange: (status: 'all' | 'installed' | 'available') => void
}

export default function ComponentFilter({ 
  category, 
  status, 
  onCategoryChange, 
  onStatusChange 
}: ComponentFilterProps) {
  const categories = [
    { value: '', label: 'Все категории' },
    { value: 'form', label: 'Формы' },
    { value: 'layout', label: 'Макет' },
    { value: 'navigation', label: 'Навигация' },
    { value: 'feedback', label: 'Обратная связь' },
    { value: 'overlay', label: 'Наложения' },
    { value: 'display', label: 'Отображение' }
  ]

  const statuses = [
    { value: 'all', label: 'Все статусы' },
    { value: 'installed', label: 'Установленные' },
    { value: 'available', label: 'Доступные' }
  ]

  return (
    <div className="flex gap-2">
      <select 
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as ComponentCategory | '')}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      
      <select 
        value={status}
        onChange={(e) => onStatusChange(e.target.value as 'all' | 'installed' | 'available')}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {statuses.map((stat) => (
          <option key={stat.value} value={stat.value}>
            {stat.label}
          </option>
        ))}
      </select>
    </div>
  )
}
