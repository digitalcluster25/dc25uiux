// Общие типы для всего приложения
import { ReactNode } from 'react'

// Базовые типы
export type ID = string | number
export type Timestamp = number
export type UUID = string

// Типы для компонентов
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  id?: string
  'data-testid'?: string
}

export interface BaseInputProps extends BaseComponentProps {
  disabled?: boolean
  required?: boolean
  placeholder?: string
  error?: string
  helperText?: string
}

export interface BaseButtonProps extends BaseComponentProps {
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

// Типы для состояний
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
  lastUpdated: Timestamp | null
}

// Типы для событий
export interface BaseEvent {
  type: string
  timestamp: Timestamp
  source: string
}

export interface UserEvent extends BaseEvent {
  userId: string
  sessionId: string
  properties: Record<string, any>
}

// Типы для навигации
export interface RouteConfig {
  path: string
  component: React.ComponentType
  exact?: boolean
  protected?: boolean
  roles?: string[]
  title?: string
  meta?: Record<string, any>
}

export interface NavigationItem {
  label: string
  path: string
  icon?: React.ComponentType
  badge?: string | number
  children?: NavigationItem[]
  disabled?: boolean
  hidden?: boolean
}

// Типы для форм
export interface FormFieldConfig {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio'
  required?: boolean
  placeholder?: string
  defaultValue?: any
  options?: Array<{ value: string; label: string }>
  validation?: ValidationRule[]
  dependencies?: string[]
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'email' | 'url' | 'custom'
  value?: any
  message: string
  validator?: (value: any, formData: any) => boolean | string
}

export interface FormConfig {
  fields: FormFieldConfig[]
  submitLabel?: string
  resetLabel?: string
  validateOnChange?: boolean
  validateOnBlur?: boolean
}

// Типы для модальных окон
export interface ModalConfig {
  id: string
  component: React.ComponentType
  props?: Record<string, any>
  options?: {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    closable?: boolean
    backdrop?: boolean
    keyboard?: boolean
  }
}

// Типы для уведомлений
export interface NotificationConfig {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  closable?: boolean
}

// Типы для загрузки файлов
export interface FileUploadConfig {
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  onUpload: (files: File[]) => Promise<void>
  onProgress?: (progress: number) => void
  onError?: (error: string) => void
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Timestamp
}

// Типы для поиска
export interface SearchConfig {
  placeholder?: string
  debounceMs?: number
  minLength?: number
  maxResults?: number
  onSearch: (query: string) => Promise<SearchResult[]>
  onSelect: (result: SearchResult) => void
}

export interface SearchResult {
  id: string
  title: string
  description?: string
  category?: string
  url?: string
  icon?: React.ComponentType
}

// Типы для фильтрации
export interface FilterConfig {
  name: string
  label: string
  type: 'select' | 'multiselect' | 'range' | 'date' | 'boolean'
  options?: Array<{ value: string; label: string; count?: number }>
  defaultValue?: any
  onChange: (value: any) => void
}

// Типы для сортировки
export interface SortConfig {
  field: string
  direction: 'asc' | 'desc'
  label: string
}

// Типы для пагинации
export interface PaginationConfig {
  page: number
  limit: number
  total: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  pageSizeOptions?: number[]
}

// Типы для конфигурации приложения
export interface AppConfig {
  name: string
  version: string
  environment: 'development' | 'staging' | 'production'
  features: Record<string, boolean>
  limits: Record<string, number>
  integrations: Record<string, any>
}

// Типы для пользователя
export interface User {
  id: ID
  email: string
  name: string
  avatar?: string
  role: string
  permissions: string[]
  preferences: UserPreferences
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface UserPreferences {
  theme: {
    mode: 'light' | 'dark' | 'system'
    preset: string
  }
  language: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    inApp: boolean
  }
}

// Типы для сессии
export interface Session {
  id: string
  userId: ID
  device: string
  browser: string
  ip: string
  location?: {
    country: string
    city: string
  }
  createdAt: Timestamp
  lastActivity: Timestamp
  expiresAt: Timestamp
}

// Типы для ошибок
export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
  stack?: string
  timestamp: Timestamp
  userId?: ID
  sessionId?: string
}

// Типы для метрик
export interface PerformanceMetric {
  name: string
  value: number
  unit: string
  timestamp: Timestamp
  tags?: Record<string, string>
}

export interface BusinessMetric {
  name: string
  value: number
  period: 'day' | 'week' | 'month' | 'quarter' | 'year'
  timestamp: Timestamp
  breakdown?: Record<string, number>
}
