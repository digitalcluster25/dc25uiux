import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  useEffect(() => {
    if (needRefresh) {
      setShowUpdatePrompt(true)
    }
  }, [needRefresh])

  const handleUpdate = () => {
    updateServiceWorker(true)
    setShowUpdatePrompt(false)
  }

  const handleDismiss = () => {
    setNeedRefresh(false)
    setShowUpdatePrompt(false)
  }

  if (!showUpdatePrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Доступно обновление</CardTitle>
          <CardDescription className="text-xs">
            Новая версия приложения готова к установке
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleUpdate}
              className="flex-1"
            >
              Обновить
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDismiss}
              className="flex-1"
            >
              Позже
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
