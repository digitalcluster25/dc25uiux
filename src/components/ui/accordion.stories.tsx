import type { Meta, StoryObj } from '@storybook/react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Что такое React?</AccordionTrigger>
        <AccordionContent>
          React — это библиотека JavaScript для создания пользовательских интерфейсов.
          Она позволяет создавать интерактивные UI с помощью компонентов.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Что такое TypeScript?</AccordionTrigger>
        <AccordionContent>
          TypeScript — это язык программирования, разработанный Microsoft.
          Это надмножество JavaScript с добавлением статической типизации.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Что такое Tailwind CSS?</AccordionTrigger>
        <AccordionContent>
          Tailwind CSS — это utility-first CSS фреймворк для быстрого создания
          пользовательских интерфейсов.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Основы веб-разработки</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>HTML — разметка страницы</p>
            <p>CSS — стилизация</p>
            <p>JavaScript — интерактивность</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Frontend фреймворки</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>React — библиотека от Facebook</p>
            <p>Vue.js — прогрессивный фреймворк</p>
            <p>Angular — полноценный фреймворк от Google</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Инструменты разработки</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>VS Code — редактор кода</p>
            <p>Git — система контроля версий</p>
            <p>npm/yarn — менеджеры пакетов</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Настройки аккаунта</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span>Email уведомления</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Push уведомления</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <span>Публичный профиль</span>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Безопасность</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-2">
                Текущий пароль
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Введите текущий пароль"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Новый пароль
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Введите новый пароль"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Изменить пароль
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}