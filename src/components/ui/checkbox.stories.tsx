import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './checkbox'
import { Label } from './label'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Принять условия использования</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="newsletter" defaultChecked />
      <Label htmlFor="newsletter">Подписаться на рассылку</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked">Отключенный (не выбран)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" defaultChecked disabled />
        <Label htmlFor="disabled-checked">Отключенный (выбран)</Label>
      </div>
    </div>
  ),
}

export const WithForm: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      email: true,
      sms: false,
      push: true,
    })

    const handleChange = (key: keyof typeof preferences) => {
      setPreferences(prev => ({
        ...prev,
        [key]: !prev[key],
      }))
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Настройки уведомлений</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="email"
              checked={preferences.email}
              onCheckedChange={() => handleChange('email')}
            />
            <Label htmlFor="email">Email уведомления</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sms"
              checked={preferences.sms}
              onCheckedChange={() => handleChange('sms')}
            />
            <Label htmlFor="sms">SMS уведомления</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="push"
              checked={preferences.push}
              onCheckedChange={() => handleChange('push')}
            />
            <Label htmlFor="push">Push уведомления</Label>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Выбрано: {Object.entries(preferences).filter(([_, checked]) => checked).length} из 3
        </div>
      </div>
    )
  },
}

export const Indeterminate: Story = {
  render: () => {
    const [items, setItems] = useState({
      item1: false,
      item2: false,
      item3: false,
    })

    const allChecked = Object.values(items).every(Boolean)
    const someChecked = Object.values(items).some(Boolean)
    const indeterminate = someChecked && !allChecked

    const handleAllChange = () => {
      const newValue = !allChecked
      setItems({
        item1: newValue,
        item2: newValue,
        item3: newValue,
      })
    }

    const handleItemChange = (key: keyof typeof items) => {
      setItems(prev => ({
        ...prev,
        [key]: !prev[key],
      }))
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={allChecked}
            ref={(el) => {
              if (el) el.indeterminate = indeterminate
            }}
            onCheckedChange={handleAllChange}
          />
          <Label htmlFor="select-all" className="font-medium">
            Выбрать все
          </Label>
        </div>
        <div className="ml-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="item1"
              checked={items.item1}
              onCheckedChange={() => handleItemChange('item1')}
            />
            <Label htmlFor="item1">Элемент 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="item2"
              checked={items.item2}
              onCheckedChange={() => handleItemChange('item2')}
            />
            <Label htmlFor="item2">Элемент 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="item3"
              checked={items.item3}
              onCheckedChange={() => handleItemChange('item3')}
            />
            <Label htmlFor="item3">Элемент 3</Label>
          </div>
        </div>
      </div>
    )
  },
}
