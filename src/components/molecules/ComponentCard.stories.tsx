import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'
import { Component } from '../../types/component'
import ComponentCard from './ComponentCard'

const mockComponent: Component = {
  id: 'button',
  name: 'Button',
  description: 'Кнопки различных стилей и размеров для выполнения действий',
  category: 'form',
  installed: false,
  dependencies: []
}

const mockInstalledComponent: Component = {
  id: 'input',
  name: 'Input',
  description: 'Поля ввода с поддержкой валидации и различных типов',
  category: 'form',
  installed: true,
  dependencies: []
}

const mockComponentWithDependencies: Component = {
  id: 'dialog',
  name: 'Dialog',
  description: 'Модальные окна для отображения контента',
  category: 'overlay',
  installed: false,
  dependencies: ['button', 'input']
}

const meta: Meta<typeof ComponentCard> = {
  title: 'Molecules/ComponentCard',
  component: ComponentCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Карточка компонента с информацией о статусе установки и зависимостях.'
      }
    }
  },
  tags: ['autodocs'],
  args: {
    onInstall: () => console.log('Install triggered'),
    onDemo: () => console.log('Demo triggered'),
    onCopyCode: () => console.log('Copy code triggered')
  },
  argTypes: {
    component: {
      description: 'Данные компонента'
    },
    onInstall: {
      description: 'Обработчик установки'
    },
    onDemo: {
      description: 'Обработчик демонстрации'
    },
    onCopyCode: {
      description: 'Обработчик копирования кода'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    component: mockComponent
  }
}

export const Installed: Story = {
  args: {
    component: mockInstalledComponent
  }
}

export const WithDependencies: Story = {
  args: {
    component: mockComponentWithDependencies
  }
}

export const InGrid: Story = {
  render: (args) => (
    <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
      <ComponentCard {...args} component={mockComponent} />
      <ComponentCard {...args} component={mockInstalledComponent} />
      <ComponentCard {...args} component={mockComponentWithDependencies} />
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
}

export const AllCategories: Story = {
  render: (args) => {
    const components: Component[] = [
      { ...mockComponent, category: 'form' },
      { ...mockComponent, category: 'layout', name: 'Card' },
      { ...mockComponent, category: 'navigation', name: 'Navigation' },
      { ...mockComponent, category: 'feedback', name: 'Alert' },
      { ...mockComponent, category: 'overlay', name: 'Modal' },
      { ...mockComponent, category: 'display', name: 'Avatar' }
    ]

    return (
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {components.map((component, index) => (
          <ComponentCard key={index} {...args} component={component} />
        ))}
      </div>
    )
  },
  parameters: {
    layout: 'padded'
  }
}
