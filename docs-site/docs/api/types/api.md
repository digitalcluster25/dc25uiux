# API Types

TypeScript определения для API взаимодействий DC25 UI/UX.

## Импорт

```tsx
import type { 
  ApiResponse, 
  ApiError, 
  ApiRequest,
  PaginatedResponse,
  SortOptions,
  FilterOptions
} from '@/types/api'
```

## Основные типы

### `ApiResponse<T>`

```tsx
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
  timestamp: string
}
```

### `ApiError`

```tsx
interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  stack?: string
}
```

### `ApiRequest`

```tsx
interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  headers?: Record<string, string>
  body?: any
  params?: Record<string, any>
}
```

## Дополнительные типы

### `PaginatedResponse<T>`

```tsx
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}
```

### `SortOptions`

```tsx
interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}
```

### `FilterOptions`

```tsx
interface FilterOptions {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like' | 'ilike'
  value: any
}
```

## Примеры использования

### Базовое API взаимодействие

```tsx
import type { ApiResponse, ApiError } from '@/types/api'

async function fetchComponents(): Promise<ApiResponse<Component[]>> {
  try {
    const response = await fetch('/api/components')
    const data = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Ошибка загрузки компонентов'
        },
        timestamp: new Date().toISOString()
      }
    }
    
    return {
      success: true,
      data: data.components,
      message: 'Компоненты загружены успешно',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Ошибка сети',
        details: { originalError: error }
      },
      timestamp: new Date().toISOString()
    }
  }
}
```

### Работа с пагинацией

```tsx
import type { PaginatedResponse, SortOptions, FilterOptions } from '@/types/api'

interface ComponentListParams {
  page?: number
  limit?: number
  sort?: SortOptions
  filters?: FilterOptions[]
  search?: string
}

async function fetchComponentsList(
  params: ComponentListParams
): Promise<ApiResponse<PaginatedResponse<Component>>> {
  try {
    const queryParams = new URLSearchParams()
    
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.sort) {
      queryParams.append('sort', `${params.sort.field}:${params.sort.direction}`)
    }
    if (params.search) queryParams.append('search', params.search)
    
    if (params.filters) {
      params.filters.forEach(filter => {
        queryParams.append(`filter[${filter.field}][${filter.operator}]`, filter.value)
      })
    }
    
    const response = await fetch(`/api/components?${queryParams}`)
    const data = await response.json()
    
    return {
      success: true,
      data: {
        data: data.components,
        pagination: data.pagination
      },
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: 'Ошибка загрузки списка компонентов'
      },
      timestamp: new Date().toISOString()
    }
  }
}
```

### Создание компонента

```tsx
import type { ApiResponse, ApiRequest } from '@/types/api'

async function createComponent(
  componentData: Partial<Component>
): Promise<ApiResponse<Component>> {
  const request: ApiRequest = {
    method: 'POST',
    url: '/api/components',
    headers: {
      'Content-Type': 'application/json'
    },
    body: componentData
  }
  
  try {
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(request.body)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: data.message || 'Ошибка создания компонента'
        },
        timestamp: new Date().toISOString()
      }
    }
    
    return {
      success: true,
      data: data.component,
      message: 'Компонент создан успешно',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Ошибка сети'
      },
      timestamp: new Date().toISOString()
    }
  }
}
```

### Обновление компонента

```tsx
import type { ApiResponse } from '@/types/api'

async function updateComponent(
  id: string,
  updates: Partial<Component>
): Promise<ApiResponse<Component>> {
  try {
    const response = await fetch(`/api/components/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: data.message || 'Ошибка обновления компонента'
        },
        timestamp: new Date().toISOString()
      }
    }
    
    return {
      success: true,
      data: data.component,
      message: 'Компонент обновлен успешно',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Ошибка сети'
      },
      timestamp: new Date().toISOString()
    }
  }
}
```

### Удаление компонента

```tsx
import type { ApiResponse } from '@/types/api'

async function deleteComponent(id: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`/api/components/${id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      const data = await response.json()
      return {
        success: false,
        error: {
          code: 'DELETE_ERROR',
          message: data.message || 'Ошибка удаления компонента'
        },
        timestamp: new Date().toISOString()
      }
    }
    
    return {
      success: true,
      message: 'Компонент удален успешно',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Ошибка сети'
      },
      timestamp: new Date().toISOString()
    }
  }
}
```

## Продвинутые примеры

### API клиент с ретраями

```tsx
import type { ApiResponse, ApiRequest } from '@/types/api'

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl
    this.defaultHeaders = defaultHeaders
  }

  async request<T>(
    request: ApiRequest,
    retries: number = 3
  ): Promise<ApiResponse<T>> {
    let lastError: Error

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}${request.url}`, {
          method: request.method,
          headers: {
            ...this.defaultHeaders,
            ...request.headers
          },
          body: request.body ? JSON.stringify(request.body) : undefined
        })

        const data = await response.json()

        if (!response.ok) {
          return {
            success: false,
            error: {
              code: 'API_ERROR',
              message: data.message || 'Ошибка API',
              details: { status: response.status }
            },
            timestamp: new Date().toISOString()
          }
        }

        return {
          success: true,
          data: data,
          timestamp: new Date().toISOString()
        }
      } catch (error) {
        lastError = error as Error
        
        if (attempt === retries) {
          break
        }
        
        // Экспоненциальная задержка
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        )
      }
    }

    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: `Ошибка после ${retries} попыток: ${lastError.message}`
      },
      timestamp: new Date().toISOString()
    }
  }
}
```

### Кэширование API ответов

```tsx
import type { ApiResponse } from '@/types/api'

class CachedApiClient {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map()

  async get<T>(
    url: string,
    ttl: number = 300000 // 5 минут
  ): Promise<ApiResponse<T>> {
    const cacheKey = `GET:${url}`
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return {
        success: true,
        data: cached.data,
        message: 'Данные из кэша',
        timestamp: new Date().toISOString()
      }
    }

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: 'FETCH_ERROR',
            message: 'Ошибка загрузки данных'
          },
          timestamp: new Date().toISOString()
        }
      }

      // Сохранение в кэш
      this.cache.set(cacheKey, {
        data: data,
        timestamp: Date.now(),
        ttl: ttl
      })

      return {
        success: true,
        data: data,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Ошибка сети'
        },
        timestamp: new Date().toISOString()
      }
    }
  }

  clearCache(): void {
    this.cache.clear()
  }

  invalidateCache(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    }
  }
}
```

### Обработка ошибок

```tsx
import type { ApiError } from '@/types/api'

function handleApiError(error: ApiError): string {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Ошибка сети. Проверьте подключение к интернету.'
    case 'FETCH_ERROR':
      return 'Ошибка загрузки данных. Попробуйте еще раз.'
    case 'CREATE_ERROR':
      return 'Ошибка создания. Проверьте введенные данные.'
    case 'UPDATE_ERROR':
      return 'Ошибка обновления. Проверьте введенные данные.'
    case 'DELETE_ERROR':
      return 'Ошибка удаления. Элемент может быть уже удален.'
    case 'VALIDATION_ERROR':
      return 'Ошибка валидации. Проверьте введенные данные.'
    case 'AUTH_ERROR':
      return 'Ошибка авторизации. Войдите в систему.'
    case 'PERMISSION_ERROR':
      return 'Недостаточно прав для выполнения операции.'
    default:
      return error.message || 'Неизвестная ошибка.'
  }
}
```

## Утилитарные типы

### `ApiResponseData<T>`

```tsx
type ApiResponseData<T> = T extends ApiResponse<infer U> ? U : never
```

### `ApiErrorCode`

```tsx
type ApiErrorCode = 
  | 'NETWORK_ERROR'
  | 'FETCH_ERROR'
  | 'CREATE_ERROR'
  | 'UPDATE_ERROR'
  | 'DELETE_ERROR'
  | 'VALIDATION_ERROR'
  | 'AUTH_ERROR'
  | 'PERMISSION_ERROR'
  | 'API_ERROR'
```

### `HttpMethod`

```tsx
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
```

### `FilterOperator`

```tsx
type FilterOperator = 
  | 'eq' | 'ne' 
  | 'gt' | 'gte' 
  | 'lt' | 'lte' 
  | 'in' | 'nin' 
  | 'like' | 'ilike'
```

## Константы

### Коды ошибок

```tsx
export const API_ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  FETCH_ERROR: 'FETCH_ERROR',
  CREATE_ERROR: 'CREATE_ERROR',
  UPDATE_ERROR: 'UPDATE_ERROR',
  DELETE_ERROR: 'DELETE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  API_ERROR: 'API_ERROR'
} as const
```

### HTTP методы

```tsx
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const
```

## Лучшие практики

### 1. Всегда обрабатывайте ошибки

```tsx
// ✅ Хорошо
const response = await fetchComponents()
if (!response.success) {
  console.error('Ошибка:', response.error?.message)
  return
}
// Работа с данными

// ❌ Плохо
const response = await fetchComponents()
// Может быть ошибка
```

### 2. Используйте типизированные ответы

```tsx
// ✅ Хорошо
async function getComponent(id: string): Promise<ApiResponse<Component>> {
  // ...
}

// ❌ Плохо
async function getComponent(id: string): Promise<any> {
  // ...
}
```

### 3. Предоставляйте обратную связь

```tsx
// ✅ Хорошо
const response = await updateComponent(id, updates)
if (response.success) {
  toast({ title: "Успешно обновлено" })
} else {
  toast({ title: "Ошибка", description: response.error?.message })
}
```

### 4. Используйте кэширование

```tsx
// ✅ Хорошо
const cachedResponse = await apiClient.get('/api/components', 300000)
if (cachedResponse.success) {
  // Данные из кэша или API
}
```

## Совместимость

- TypeScript 4.9+
- React 18+
- Все современные браузеры
- Fetch API support

## Связанные типы

- [`component`](./component.md) - Типы компонентов
- [`theme`](./theme.md) - Типы тем

---

**Далее:** Изучите [конфигурацию](../config/theme-config.md) или вернитесь к [обзору API](../overview.md).
