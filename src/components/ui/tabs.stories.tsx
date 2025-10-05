import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Аккаунт</TabsTrigger>
        <TabsTrigger value="password">Пароль</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Аккаунт</h3>
          <p className="text-sm text-gray-500">
            Управляйте настройками вашего аккаунта здесь.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium">Имя</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue="Петр Петров"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Пароль</h3>
          <p className="text-sm text-gray-500">
            Измените свой пароль здесь.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium">Текущий пароль</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <label className="text-sm font-medium">Новый пароль</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Обзор</TabsTrigger>
        <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        <TabsTrigger value="reports">Отчеты</TabsTrigger>
        <TabsTrigger value="notifications">Уведомления</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Обзор</h3>
          <p className="text-sm text-gray-500">
            Общая информация о вашем проекте.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium">Всего пользователей</h4>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium">Активные сессии</h4>
              <p className="text-2xl font-bold">567</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Аналитика</h3>
          <p className="text-sm text-gray-500">
            Детальная аналитика вашего проекта.
          </p>
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">График аналитики</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Отчеты</h3>
          <p className="text-sm text-gray-500">
            Создавайте и управляйте отчетами.
          </p>
          <div className="space-y-2">
            <div className="p-3 border border-gray-200 rounded-lg">
              <h4 className="font-medium">Еженедельный отчет</h4>
              <p className="text-sm text-gray-500">Создан 2 дня назад</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <h4 className="font-medium">Месячный отчет</h4>
              <p className="text-sm text-gray-500">Создан 1 неделю назад</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Уведомления</h3>
          <p className="text-sm text-gray-500">
            Настройте уведомления для вашего аккаунта.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Email уведомления</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Push уведомления</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <span>SMS уведомления</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
}