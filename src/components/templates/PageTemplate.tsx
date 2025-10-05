import { ReactNode } from 'react'
import { Header } from '../organisms'

interface PageTemplateProps {
  children: ReactNode
  className?: string
}

export default function PageTemplate({ children, className = '' }: PageTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
    </div>
  )
}
