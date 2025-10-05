// Re-export всех типов для удобного импорта
export * from './component'
export * from './theme'
export * from './api'
export * from './common'

// Общие типы
export type ID = string | number

export interface BaseEntity {
  id: ID
  createdAt: Date
  updatedAt: Date
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, any>
}

// Типы для форм
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: RegExp
    custom?: (value: any) => string | null
  }
}

export interface FormState<T = Record<string, any>> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
}

// Типы для навигации
export interface NavItem {
  label: string
  path: string
  icon?: React.ComponentType
  children?: NavItem[]
  badge?: string | number
}

export interface BreadcrumbItem {
  label: string
  path?: string
}

// Типы для уведомлений
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Типы для модальных окон
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
}

// Типы для загрузки
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface AsyncState<T> extends LoadingState {
  data: T | null
}

// Типы для поиска и фильтрации
export interface SearchParams {
  query: string
  filters: Record<string, any>
  sort: {
    field: string
    order: 'asc' | 'desc'
  }
  pagination: {
    page: number
    limit: number
  }
}

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  name: string
  label: string
  options: FilterOption[]
  type: 'single' | 'multiple' | 'range'
}

// Типы для событий
export interface CustomEvent<T = any> {
  type: string
  payload: T
  timestamp: number
}

// Типы для конфигурации
export interface AppConfig {
  api: {
    baseUrl: string
    timeout: number
  }
  theme: {
    defaultMode: 'light' | 'dark' | 'system'
    defaultPreset: string
  }
  features: {
    enableAnalytics: boolean
    enableNotifications: boolean
    enableDarkMode: boolean
  }
}

// Типы для аналитики
export interface AnalyticsEvent {
  name: string
  properties: Record<string, any>
  timestamp: number
  userId?: string
  sessionId?: string
}

// Типы для кэширования
export interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

export interface CacheConfig {
  defaultTTL: number
  maxSize: number
  strategy: 'lru' | 'fifo' | 'ttl'
}
