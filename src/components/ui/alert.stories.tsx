import type { Meta, StoryObj } from '@storybook/react'
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './alert'

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Информация</AlertTitle>
      <AlertDescription>
        Это информационное сообщение для пользователя.
      </AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert className="border-green-200 bg-green-50 text-green-800">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Успешно!</AlertTitle>
      <AlertDescription>
        Ваша операция выполнена успешно.
      </AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Предупреждение</AlertTitle>
      <AlertDescription>
        Пожалуйста, проверьте введенные данные перед продолжением.
      </AlertDescription>
    </Alert>
  ),
}

export const Error: Story = {
  render: () => (
    <Alert className="border-red-200 bg-red-50 text-red-800">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Ошибка</AlertTitle>
      <AlertDescription>
        Произошла ошибка при выполнении операции. Попробуйте еще раз.
      </AlertDescription>
    </Alert>
  ),
}

export const WithoutTitle: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription>
        Простое сообщение без заголовка.
      </AlertDescription>
    </Alert>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Заголовок без иконки</AlertTitle>
      <AlertDescription>
        Сообщение без иконки для минималистичного вида.
      </AlertDescription>
    </Alert>
  ),
}
