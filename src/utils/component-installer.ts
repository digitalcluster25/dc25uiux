import { Component, ComponentInstallCommand } from '../types/component'

export function generateInstallCommand(componentId: string): ComponentInstallCommand {
  const command = `npx shadcn-ui@latest add ${componentId}`
  
  // Определяем зависимости для каждого компонента
  const dependencies: string[] = getComponentDependencies(componentId)
  
  return {
    componentId,
    command,
    dependencies
  }
}

export function getComponentDependencies(componentId: string): string[] {
  // Маппинг зависимостей для компонентов
  const dependencyMap: Record<string, string[]> = {
    'alert-dialog': ['button'],
    'calendar': ['button'],
    'carousel': ['button'],
    'combobox': ['button', 'command'],
    'command': ['dialog'],
    'context-menu': ['dropdown-menu'],
    'data-table': ['table', 'button', 'input'],
    'date-picker': ['calendar', 'popover'],
    'dialog': ['button'],
    'drawer': ['button'],
    'dropdown-menu': ['button'],
    'form': ['input', 'button'],
    'input-otp': ['input'],
    'menubar': ['dropdown-menu'],
    'navigation-menu': ['button'],
    'pagination': ['button'],
    'radio-group': ['label'],
    'select': ['button'],
    'sheet': ['button'],
    'sidebar': ['button', 'scroll-area'],
    'tabs': ['button'],
    'toggle-group': ['toggle']
  }
  
  return dependencyMap[componentId] || []
}

export function getInstallCommandsWithDependencies(componentId: string): string[] {
  const dependencies = getComponentDependencies(componentId)
  const commands: string[] = []
  
  // Сначала устанавливаем зависимости
  dependencies.forEach(dep => {
    commands.push(`npx shadcn-ui@latest add ${dep}`)
  })
  
  // Затем сам компонент
  commands.push(`npx shadcn-ui@latest add ${componentId}`)
  
  return commands
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  } else {
    // Fallback для старых браузеров
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    return new Promise((resolve, reject) => {
      if (document.execCommand('copy')) {
        resolve()
      } else {
        reject(new Error('Failed to copy'))
      }
      document.body.removeChild(textArea)
    })
  }
}

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  // Простая реализация toast уведомления
  const toast = document.createElement('div')
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`
  toast.textContent = message
  
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.remove()
  }, 3000)
}
