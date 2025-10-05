import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Helper functions
export const createMockComponent = (name: string) => {
  const MockComponent = ({ children, ...props }: any) => (
    <div data-testid={`mock-${name}`} {...props}>
      {children}
    </div>
  )
  MockComponent.displayName = `Mock${name}`
  return MockComponent
}

export const createMockFunction = () => vi.fn()

export const waitForNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

export const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
  permissions: [],
  preferences: {
    theme: { mode: 'light', preset: 'default' },
    language: 'ru',
    timezone: 'Europe/Moscow',
    notifications: { email: true, push: false, inApp: true }
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
  ...overrides
})

export const createMockComponent = (overrides = {}) => ({
  id: 'button',
  name: 'Button',
  description: 'Кнопка для действий',
  category: 'form' as const,
  installed: false,
  dependencies: [],
  ...overrides
})
