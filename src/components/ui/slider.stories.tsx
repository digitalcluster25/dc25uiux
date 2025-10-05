import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Слайдеры для выбора значений в диапазоне.'
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState([50])
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Значение: {value[0]}</p>
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    )
  }
}

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState([20, 80])
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">
            Диапазон: {value[0]} - {value[1]}
          </p>
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    )
  }
}

export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState([2])
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Шаг: {value[0]}</p>
          <Slider
            value={value}
            onValueChange={setValue}
            max={10}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    )
  }
}

export const PriceRange: Story = {
  render: () => {
    const [value, setValue] = useState([1000, 5000])
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">
            Цена: ₽{value[0].toLocaleString()} - ₽{value[1].toLocaleString()}
          </p>
          <Slider
            value={value}
            onValueChange={setValue}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
        </div>
      </div>
    )
  }
}

export const Volume: Story = {
  render: () => {
    const [value, setValue] = useState([70])
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Громкость: {value[0]}%</p>
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    )
  }
}

export const MultipleSliders: Story = {
  render: () => {
    const [brightness, setBrightness] = useState([80])
    const [contrast, setContrast] = useState([60])
    const [saturation, setSaturation] = useState([70])
    
    return (
      <div className="w-80 space-y-6">
        <div>
          <p className="text-sm font-medium mb-2">Яркость: {brightness[0]}%</p>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Контрастность: {contrast[0]}%</p>
          <Slider
            value={contrast}
            onValueChange={setContrast}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Насыщенность: {saturation[0]}%</p>
          <Slider
            value={saturation}
            onValueChange={setSaturation}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    )
  }
}
