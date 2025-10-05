import { useState } from 'react'
import { generateInstallCommand, getInstallCommandsWithDependencies, copyToClipboard, showToast } from '../../utils/component-installer'

interface InstallDialogProps {
  componentId: string
  componentName: string
  isOpen: boolean
  onClose: () => void
}

export default function InstallDialog({ 
  componentId, 
  componentName, 
  isOpen, 
  onClose 
}: InstallDialogProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  
  if (!isOpen) return null

  const installCommand = generateInstallCommand(componentId)
  const allCommands = getInstallCommandsWithDependencies(componentId)
  const hasDependencies = installCommand.dependencies.length > 0

  const handleCopyCommand = async (command: string, index: number) => {
    try {
      await copyToClipboard(command)
      setCopiedIndex(index)
      showToast('Команда скопирована в буфер обмена!')
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      showToast('Ошибка при копировании', 'error')
    }
  }

  const handleCopyAll = async () => {
    const allCommandsText = allCommands.join('\n')
    try {
      await copyToClipboard(allCommandsText)
      showToast('Все команды скопированы!')
    } catch (error) {
      showToast('Ошибка при копировании', 'error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Установка компонента {componentName}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {hasDependencies && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Зависимости</h3>
            <p className="text-sm text-yellow-700 mb-2">
              Этот компонент требует установки зависимостей:
            </p>
            <div className="flex flex-wrap gap-2">
              {installCommand.dependencies.map((dep) => (
                <span key={dep} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                  {dep}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Команды для установки:</h3>
            {allCommands.length > 1 && (
              <button
                onClick={handleCopyAll}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Копировать все
              </button>
            )}
          </div>

          {allCommands.map((command, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <code className="flex-1 text-sm font-mono text-gray-800">
                {command}
              </code>
              <button
                onClick={() => handleCopyCommand(command, index)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  copiedIndex === index
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {copiedIndex === index ? 'Скопировано' : 'Копировать'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Инструкция:</h3>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Откройте терминал в корневой папке вашего проекта</li>
            <li>Выполните команды по порядку (сначала зависимости, затем компонент)</li>
            <li>Импортируйте компонент в вашем коде</li>
          </ol>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
