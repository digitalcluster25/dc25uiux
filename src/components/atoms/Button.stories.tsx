import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Базовый компонент кнопки с различными вариантами стилей и размеров.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Вариант стиля кнопки'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Размер кнопки'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Отключена ли кнопка'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Показывать ли индикатор загрузки'
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button'
  }
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button'
  }
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button'
  }
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button'
  }
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
