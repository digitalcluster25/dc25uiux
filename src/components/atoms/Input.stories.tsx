import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Базовый компонент поля ввода с поддержкой меток, ошибок и вспомогательного текста.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Метка поля'
    },
    error: {
      control: { type: 'text' },
      description: 'Сообщение об ошибке'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Вспомогательный текст'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Отключено ли поле'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Обязательное ли поле'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Плейсхолдер'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Введите текст...'
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Имя пользователя',
    placeholder: 'Введите имя...'
  }
}

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
    helperText: 'Мы не передаем ваш email третьим лицам'
  }
}

export const WithError: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    error: 'Пароль должен содержать минимум 8 символов'
  }
}

export const Required: Story = {
  args: {
    label: 'Обязательное поле',
    required: true,
    placeholder: 'Это поле обязательно для заполнения'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Отключенное поле',
    disabled: true,
    placeholder: 'Это поле отключено'
  }
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Обычное поле"
        placeholder="Введите текст..."
      />
      <Input
        label="С вспомогательным текстом"
        placeholder="Введите email..."
        helperText="Мы не передаем ваш email третьим лицам"
      />
      <Input
        label="С ошибкой"
        placeholder="Введите пароль..."
        error="Пароль должен содержать минимум 8 символов"
      />
      <Input
        label="Отключенное поле"
        placeholder="Это поле отключено"
        disabled
      />
    </div>
  )
}
