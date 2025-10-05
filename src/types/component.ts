export interface Component {
  id: string
  name: string
  description: string
  category: ComponentCategory
  installed: boolean
  dependencies?: string[]
  // Дополнительные поля для сгенерированных компонентов
  props?: string[]
  variants?: string[]
  hooks?: string[]
  tags?: string[]
}

export type ComponentCategory = 
  | 'form'
  | 'layout' 
  | 'navigation'
  | 'feedback'
  | 'overlay'
  | 'display'

export interface ComponentsRegistry {
  components: Component[]
}

export interface ComponentFilter {
  search: string
  category: ComponentCategory | ''
  status: 'all' | 'installed' | 'available'
}

export interface ComponentInstallCommand {
  componentId: string
  command: string
  dependencies: string[]
}
