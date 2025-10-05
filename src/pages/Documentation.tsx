import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Separator } from '../components/ui/separator'

export default function Documentation() {
  const [selectedComponent, setSelectedComponent] = useState('button')

  const components = [
    { id: 'button', name: 'Button', category: 'Form', description: 'Кнопки для действий' },
    { id: 'input', name: 'Input', category: 'Form', description: 'Поля ввода' },
    { id: 'card', name: 'Card', category: 'Layout', description: 'Карточки контента' },
    { id: 'dialog', name: 'Dialog', category: 'Overlay', description: 'Модальные окна' },
    { id: 'tabs', name: 'Tabs', category: 'Navigation', description: 'Вкладки' },
    { id: 'accordion', name: 'Accordion', category: 'Layout', description: 'Аккордеоны' },
    { id: 'alert', name: 'Alert', category: 'Feedback', description: 'Уведомления' },
    { id: 'badge', name: 'Badge', category: 'Display', description: 'Метки' },
    { id: 'avatar', name: 'Avatar', category: 'Display', description: 'Аватары' },
    { id: 'progress', name: 'Progress', category: 'Feedback', description: 'Прогресс-бары' },
    { id: 'slider', name: 'Slider', category: 'Form', description: 'Слайдеры' },
    { id: 'switch', name: 'Switch', category: 'Form', description: 'Переключатели' }
  ]

  const categories = [...new Set(components.map(c => c.category))]

  const getComponentCode = (componentId: string) => {
    const codes = {
      button: `import { Button } from '@/components/ui/button'

<Button variant="default">Кнопка</Button>
<Button variant="secondary">Вторичная</Button>
<Button variant="outline">Контурная</Button>
<Button variant="ghost">Призрачная</Button>
<Button variant="destructive">Опасная</Button>`,
      
      input: `import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="example@email.com" />
</div>`,
      
      card: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Заголовок карточки</CardTitle>
    <CardDescription>Описание карточки</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Содержимое карточки</p>
  </CardContent>
</Card>`,
      
      dialog: `import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Открыть диалог</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Заголовок</DialogTitle>
      <DialogDescription>Описание диалога</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Подтвердить</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      
      tabs: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Аккаунт</TabsTrigger>
    <TabsTrigger value="password">Пароль</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Содержимое вкладки аккаунта</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Содержимое вкладки пароля</p>
  </TabsContent>
</Tabs>`,
      
      accordion: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Вопрос 1</AccordionTrigger>
    <AccordionContent>
      Ответ на вопрос 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Вопрос 2</AccordionTrigger>
    <AccordionContent>
      Ответ на вопрос 2
    </AccordionContent>
  </AccordionItem>
</Accordion>`
    }
    
    return codes[componentId] || 'Код не найден'
  }

  const getComponentProps = (componentId: string) => {
    const props = {
      button: [
        { name: 'variant', type: 'string', default: 'default', description: 'Вариант стиля кнопки' },
        { name: 'size', type: 'string', default: 'default', description: 'Размер кнопки' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Отключена ли кнопка' },
        { name: 'onClick', type: 'function', default: '-', description: 'Обработчик клика' }
      ],
      input: [
        { name: 'type', type: 'string', default: 'text', description: 'Тип поля ввода' },
        { name: 'placeholder', type: 'string', default: '-', description: 'Плейсхолдер' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Отключено ли поле' },
        { name: 'value', type: 'string', default: '-', description: 'Значение поля' }
      ],
      card: [
        { name: 'className', type: 'string', default: '-', description: 'Дополнительные CSS классы' }
      ]
    }
    
    return props[componentId] || []
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Документация компонентов
          </h1>
          <p className="text-gray-600">
            Полное руководство по использованию компонентов shadcn/ui
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковая панель с компонентами */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Компоненты</CardTitle>
                <CardDescription>
                  Выберите компонент для просмотра документации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category}>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">{category}</h4>
                      <div className="space-y-1 ml-2">
                        {components
                          .filter(c => c.category === category)
                          .map(component => (
                            <button
                              key={component.id}
                              onClick={() => setSelectedComponent(component.id)}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                selectedComponent === component.id
                                  ? 'bg-blue-100 text-blue-900'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              {component.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {components.find(c => c.id === selectedComponent)?.name}
                </CardTitle>
                <CardDescription>
                  {components.find(c => c.id === selectedComponent)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Обзор</TabsTrigger>
                    <TabsTrigger value="code">Код</TabsTrigger>
                    <TabsTrigger value="props">Свойства</TabsTrigger>
                    <TabsTrigger value="examples">Примеры</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-4">
                      <Alert>
                        <AlertTitle>Информация</AlertTitle>
                        <AlertDescription>
                          Компонент {components.find(c => c.id === selectedComponent)?.name} является частью библиотеки shadcn/ui и следует принципам дизайн-системы.
                        </AlertDescription>
                      </Alert>
                      
                      <div>
                        <h4 className="font-medium mb-2">Особенности</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          <li>Полная поддержка TypeScript</li>
                          <li>Адаптивный дизайн</li>
                          <li>Доступность (a11y)</li>
                          <li>Кастомизация через CSS переменные</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Установка</h4>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <code className="text-sm">
                            npx shadcn@latest add {selectedComponent}
                          </code>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Пример использования</h4>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm">
                            <code>{getComponentCode(selectedComponent)}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="props" className="mt-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Свойства компонента</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">Свойство</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Тип</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">По умолчанию</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Описание</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getComponentProps(selectedComponent).map((prop, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                                  {prop.name}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">
                                  {prop.type}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">
                                  {prop.default}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">
                                  {prop.description}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="examples" className="mt-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Примеры использования</h4>
                      <p className="text-sm text-gray-600">
                        Для просмотра интерактивных примеров перейдите на страницу{' '}
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a href="/examples">Примеры</a>
                        </Button>
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Часто задаваемые вопросы</CardTitle>
              <CardDescription>
                Ответы на популярные вопросы о компонентах
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Как установить компоненты?</AccordionTrigger>
                  <AccordionContent>
                    Используйте команду <code>npx shadcn@latest add [component-name]</code> для установки компонентов.
                    Например: <code>npx shadcn@latest add button</code>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Как кастомизировать стили?</AccordionTrigger>
                  <AccordionContent>
                    Компоненты используют CSS переменные для кастомизации. Вы можете переопределить их в вашем CSS файле или использовать утилиты Tailwind CSS.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Поддерживается ли TypeScript?</AccordionTrigger>
                  <AccordionContent>
                    Да, все компоненты полностью типизированы и поддерживают TypeScript из коробки.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Как добавить новые компоненты?</AccordionTrigger>
                  <AccordionContent>
                    Новые компоненты можно добавить через CLI shadcn/ui или создать вручную, следуя принципам дизайн-системы.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
