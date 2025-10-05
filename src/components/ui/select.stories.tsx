import type { Meta, StoryObj } from '@storybook/react'
import { Check, ChevronDown } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select'

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Выберите тему" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Светлая</SelectItem>
        <SelectItem value="dark">Темная</SelectItem>
        <SelectItem value="system">Системная</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Выберите действие" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="edit">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Редактировать
          </div>
        </SelectItem>
        <SelectItem value="delete">
          <div className="flex items-center gap-2">
            <ChevronDown className="h-4 w-4" />
            Удалить
          </div>
        </SelectItem>
        <SelectItem value="share">Поделиться</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Отключено" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Опция 1</SelectItem>
        <SelectItem value="option2">Опция 2</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Scrollable: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Выберите страну" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ru">Россия</SelectItem>
        <SelectItem value="us">США</SelectItem>
        <SelectItem value="uk">Великобритания</SelectItem>
        <SelectItem value="de">Германия</SelectItem>
        <SelectItem value="fr">Франция</SelectItem>
        <SelectItem value="jp">Япония</SelectItem>
        <SelectItem value="cn">Китай</SelectItem>
        <SelectItem value="in">Индия</SelectItem>
        <SelectItem value="br">Бразилия</SelectItem>
        <SelectItem value="au">Австралия</SelectItem>
        <SelectItem value="ca">Канада</SelectItem>
        <SelectItem value="mx">Мексика</SelectItem>
      </SelectContent>
    </Select>
  ),
}
