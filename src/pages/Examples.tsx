import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Switch } from '../components/ui/switch'
import { Slider } from '../components/ui/slider'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Separator } from '../components/ui/separator'

export default function Examples() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    notifications: true,
    volume: [50],
    progress: 75
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Примеры использования компонентов
          </h1>
          <p className="text-gray-600">
            Интерактивные примеры всех доступных компонентов shadcn/ui
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Форма */}
          <Card>
            <CardHeader>
              <CardTitle>Форма с валидацией</CardTitle>
              <CardDescription>
                Пример формы с различными типами полей
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Сообщение</Label>
                <Textarea
                  id="message"
                  placeholder="Введите ваше сообщение"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(value) => handleInputChange('notifications', value)}
                />
                <Label htmlFor="notifications">Получать уведомления</Label>
              </div>

              <Button className="w-full">Отправить</Button>
            </CardContent>
          </Card>

          {/* Настройки */}
          <Card>
            <CardHeader>
              <CardTitle>Настройки</CardTitle>
              <CardDescription>
                Пример панели настроек с различными элементами
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Громкость: {formData.volume[0]}%</Label>
                <Slider
                  value={formData.volume}
                  onValueChange={(value) => handleInputChange('volume', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Прогресс загрузки: {formData.progress}%</Label>
                <Progress value={formData.progress} />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Статусы</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Активен</Badge>
                  <Badge variant="secondary">Ожидание</Badge>
                  <Badge variant="outline">Завершено</Badge>
                  <Badge variant="destructive">Ошибка</Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Пользователи</h4>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Иван Иванов" />
                    <AvatarFallback>ИИ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Иван Иванов</p>
                    <p className="text-xs text-gray-500">ivan@example.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Вкладки */}
          <Card>
            <CardHeader>
              <CardTitle>Вкладки</CardTitle>
              <CardDescription>
                Пример использования компонента Tabs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Аккаунт</TabsTrigger>
                  <TabsTrigger value="password">Пароль</TabsTrigger>
                  <TabsTrigger value="settings">Настройки</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Аккаунт</h3>
                    <p className="text-sm text-gray-600">
                      Управляйте настройками вашего аккаунта и профиля.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="password" className="mt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Пароль</h3>
                    <p className="text-sm text-gray-600">
                      Измените ваш пароль здесь. После сохранения вы будете разлогинены.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Настройки</h3>
                    <p className="text-sm text-gray-600">
                      Управляйте общими настройками приложения.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Аккордеон */}
          <Card>
            <CardHeader>
              <CardTitle>Аккордеон</CardTitle>
              <CardDescription>
                Пример использования компонента Accordion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Что такое React?</AccordionTrigger>
                  <AccordionContent>
                    React — это JavaScript-библиотека для создания пользовательских интерфейсов, 
                    особенно веб-приложений.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Что такое TypeScript?</AccordionTrigger>
                  <AccordionContent>
                    TypeScript — это язык программирования, разработанный Microsoft, который 
                    является надмножеством JavaScript.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Что такое Tailwind CSS?</AccordionTrigger>
                  <AccordionContent>
                    Tailwind CSS — это utility-first CSS фреймворк, который позволяет быстро 
                    создавать пользовательские интерфейсы.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Уведомления */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>
                Примеры различных типов уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertTitle>Информация</AlertTitle>
                  <AlertDescription>
                    Это информационное уведомление с важной информацией.
                  </AlertDescription>
                </Alert>
                
                <Alert variant="destructive">
                  <AlertTitle>Ошибка</AlertTitle>
                  <AlertDescription>
                    Произошла ошибка при выполнении операции.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
