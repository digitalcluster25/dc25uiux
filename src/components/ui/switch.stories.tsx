import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switch } from './switch'
import { Label } from './label'

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Переключатели для включения/выключения опций.'
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false)
    
    return (
      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
        <Label htmlFor="airplane-mode">Режим полета</Label>
      </div>
    )
  }
}

export const WithLabel: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [autoSave, setAutoSave] = useState(true)
    
    return (
      <div className="space-y-4 w-64">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Уведомления</Label>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Темная тема</Label>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-save">Автосохранение</Label>
          <Switch
            id="auto-save"
            checked={autoSave}
            onCheckedChange={setAutoSave}
          />
        </div>
      </div>
    )
  }
}

export const Disabled: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false)
    
    return (
      <div className="space-y-4 w-64">
        <div className="flex items-center justify-between">
          <Label htmlFor="enabled">Включен</Label>
          <Switch
            id="enabled"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="disabled" className="text-gray-500">
            Отключен
          </Label>
          <Switch
            id="disabled"
            disabled
            checked={false}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="disabled-checked" className="text-gray-500">
            Отключен (включен)
          </Label>
          <Switch
            id="disabled-checked"
            disabled
            checked={true}
          />
        </div>
      </div>
    )
  }
}

export const Settings: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      twoFactor: false,
      publicProfile: true,
      emailUpdates: false
    })

    const updateSetting = (key: string, value: boolean) => {
      setSettings(prev => ({ ...prev, [key]: value }))
    }

    return (
      <div className="space-y-6 w-80">
        <h3 className="text-lg font-semibold">Настройки аккаунта</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications">Уведомления</Label>
              <p className="text-sm text-gray-500">Получать уведомления о новых сообщениях</p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(value) => updateSetting('notifications', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode">Темная тема</Label>
              <p className="text-sm text-gray-500">Использовать темную тему интерфейса</p>
            </div>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(value) => updateSetting('darkMode', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-save">Автосохранение</Label>
              <p className="text-sm text-gray-500">Автоматически сохранять изменения</p>
            </div>
            <Switch
              id="auto-save"
              checked={settings.autoSave}
              onCheckedChange={(value) => updateSetting('autoSave', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Двухфакторная аутентификация</Label>
              <p className="text-sm text-gray-500">Дополнительная защита аккаунта</p>
            </div>
            <Switch
              id="two-factor"
              checked={settings.twoFactor}
              onCheckedChange={(value) => updateSetting('twoFactor', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="public-profile">Публичный профиль</Label>
              <p className="text-sm text-gray-500">Сделать профиль видимым для всех</p>
            </div>
            <Switch
              id="public-profile"
              checked={settings.publicProfile}
              onCheckedChange={(value) => updateSetting('publicProfile', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-updates">Email обновления</Label>
              <p className="text-sm text-gray-500">Получать обновления по email</p>
            </div>
            <Switch
              id="email-updates"
              checked={settings.emailUpdates}
              onCheckedChange={(value) => updateSetting('emailUpdates', value)}
            />
          </div>
        </div>
      </div>
    )
  }
}
