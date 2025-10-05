import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'
import SearchBar from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент поисковой строки с иконкой и обработкой событий.'
      }
    }
  },
  tags: ['autodocs'],
  args: {
    onSearch: () => console.log('Search triggered')
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Плейсхолдер поисковой строки'
    },
    onSearch: {
      description: 'Обработчик поиска'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Поиск...'
  }
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Поиск компонентов...'
  }
}

export const InContainer: Story = {
  render: (args) => (
    <div className="w-80 p-4 bg-white border border-gray-200 rounded-lg">
      <SearchBar {...args} />
    </div>
  )
}

export const WithFilter: Story = {
  render: (args) => (
    <div className="w-96 p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex gap-2">
        <div className="flex-1">
          <SearchBar {...args} />
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-lg">
          <option>Все категории</option>
          <option>Формы</option>
          <option>Макет</option>
          <option>Навигация</option>
        </select>
      </div>
    </div>
  )
}
