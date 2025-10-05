// Типы для API взаимодействия
export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  headers?: Record<string, string>
  timeout?: number
}

export interface ApiRequest<T = any> {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: T
  params?: Record<string, any>
  headers?: Record<string, string>
}

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
  meta?: {
    timestamp: number
    requestId: string
    version: string
  }
}

export interface ApiError {
  message: string
  code: string
  status: number
  details?: Record<string, any>
  timestamp: number
}

export interface ApiClient {
  get: <T>(endpoint: string, params?: Record<string, any>) => Promise<ApiResponse<T>>
  post: <T>(endpoint: string, data?: any) => Promise<ApiResponse<T>>
  put: <T>(endpoint: string, data?: any) => Promise<ApiResponse<T>>
  delete: <T>(endpoint: string) => Promise<ApiResponse<T>>
  patch: <T>(endpoint: string, data?: any) => Promise<ApiResponse<T>>
}

export interface ApiConfig {
  baseUrl: string
  timeout: number
  retries: number
  retryDelay: number
  headers: Record<string, string>
}

export interface ApiInterceptor {
  request?: (config: ApiRequest) => ApiRequest | Promise<ApiRequest>
  response?: (response: ApiResponse) => ApiResponse | Promise<ApiResponse>
  error?: (error: ApiError) => ApiError | Promise<ApiError>
}

// Типы для компонентов API
export interface ComponentApi {
  getAll: (params?: ComponentQueryParams) => Promise<ApiResponse<Component[]>>
  getById: (id: string) => Promise<ApiResponse<Component>>
  create: (data: CreateComponentData) => Promise<ApiResponse<Component>>
  update: (id: string, data: UpdateComponentData) => Promise<ApiResponse<Component>>
  delete: (id: string) => Promise<ApiResponse<void>>
  install: (id: string) => Promise<ApiResponse<InstallResult>>
}

export interface ComponentQueryParams {
  search?: string
  category?: string
  status?: 'all' | 'installed' | 'available'
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface CreateComponentData {
  name: string
  description: string
  category: string
  dependencies: string[]
}

export interface UpdateComponentData {
  name?: string
  description?: string
  category?: string
  dependencies?: string[]
  installed?: boolean
}

export interface InstallResult {
  componentId: string
  success: boolean
  message: string
  dependencies?: string[]
  commands: string[]
}

// Типы для темы API
export interface ThemeApi {
  getCurrent: () => Promise<ApiResponse<ThemeConfig>>
  update: (theme: Partial<ThemeConfig>) => Promise<ApiResponse<ThemeConfig>>
  reset: () => Promise<ApiResponse<ThemeConfig>>
  export: (format: 'css' | 'json' | 'tailwind') => Promise<ApiResponse<string>>
  import: (theme: ThemeConfig) => Promise<ApiResponse<ThemeConfig>>
}

// Типы для аналитики API
export interface AnalyticsApi {
  track: (event: AnalyticsEvent) => Promise<ApiResponse<void>>
  getEvents: (params?: AnalyticsQueryParams) => Promise<ApiResponse<AnalyticsEvent[]>>
  getMetrics: (params?: MetricsQueryParams) => Promise<ApiResponse<Metrics>>
}

export interface AnalyticsQueryParams {
  startDate: Date
  endDate: Date
  eventName?: string
  userId?: string
  page?: number
  limit?: number
}

export interface MetricsQueryParams {
  startDate: Date
  endDate: Date
  granularity: 'hour' | 'day' | 'week' | 'month'
  metrics: string[]
}

export interface Metrics {
  totalEvents: number
  uniqueUsers: number
  topEvents: Array<{
    name: string
    count: number
  }>
  timeSeries: Array<{
    timestamp: Date
    value: number
  }>
}
