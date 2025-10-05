import AIAssistant from '../components/ai/AIAssistant'

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            AI Помощник для компонентов
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Описывайте что вам нужно, и AI подберет подходящие компоненты из DC25 UI/UX библиотеки
          </p>
        </div>

        <AIAssistant 
          openrouterApiKey={import.meta.env.VITE_OPENROUTER_API_KEY}
          kilocodeApiKey={import.meta.env.VITE_KILOCODE_API_KEY}
        />
      </div>
    </div>
  )
}
