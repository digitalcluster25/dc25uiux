import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Аватары пользователей с поддержкой изображений и fallback.'
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  )
}

export const WithNames: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Иван Иванов" />
        <AvatarFallback>ИИ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="Петр Петров" />
        <AvatarFallback>ПП</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>МС</AvatarFallback>
      </Avatar>
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-20 w-20">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}

export const UserList: Story = {
  render: () => {
    const users = [
      { name: 'Иван Иванов', email: 'ivan@example.com', avatar: 'https://github.com/shadcn.png' },
      { name: 'Петр Петров', email: 'petr@example.com', avatar: 'https://github.com/vercel.png' },
      { name: 'Мария Сидорова', email: 'maria@example.com', avatar: '' },
      { name: 'Алексей Козлов', email: 'alexey@example.com', avatar: '' },
    ]

    return (
      <div className="space-y-4 w-80">
        {users.map((user, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
