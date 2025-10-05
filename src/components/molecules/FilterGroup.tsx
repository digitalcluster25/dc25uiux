import { ReactNode } from 'react'

interface FilterGroupProps {
  children: ReactNode
  className?: string
}

export default function FilterGroup({ children, className = '' }: FilterGroupProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {children}
    </div>
  )
}

interface FilterSelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}

export function FilterSelect({ value, onChange, options, className = '' }: FilterSelectProps) {
  return (
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
