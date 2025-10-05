import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import { Progress } from './progress'
import { Button } from './button'

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Индикаторы прогресса для отображения выполнения задач.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Значение прогресса (0-100)'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 33
  }
}

export const DifferentValues: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-sm font-medium mb-2">25%</p>
        <Progress value={25} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">50%</p>
        <Progress value={50} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">75%</p>
        <Progress value={75} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">100%</p>
        <Progress value={100} />
      </div>
    </div>
  )
}

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])

    return (
      <div className="space-y-4 w-80">
        <div>
          <p className="text-sm font-medium mb-2">Загрузка файлов...</p>
          <Progress value={progress} />
        </div>
      </div>
    )
  }
}

export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0)

    const handleProgress = (value: number) => {
      setProgress(Math.max(0, Math.min(100, value)))
    }

    return (
      <div className="space-y-4 w-80">
        <div>
          <p className="text-sm font-medium mb-2">Прогресс: {progress}%</p>
          <Progress value={progress} />
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={() => handleProgress(progress - 10)}
            disabled={progress <= 0}
          >
            -10%
          </Button>
          <Button 
            size="sm" 
            onClick={() => handleProgress(progress + 10)}
            disabled={progress >= 100}
          >
            +10%
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setProgress(0)}
          >
            Сброс
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setProgress(100)}
          >
            Завершить
          </Button>
        </div>
      </div>
    )
  }
}

export const WithSteps: Story = {
  render: () => {
    const steps = [
      { name: 'Подготовка', progress: 100 },
      { name: 'Загрузка', progress: 75 },
      { name: 'Обработка', progress: 45 },
      { name: 'Завершение', progress: 0 }
    ]

    return (
      <div className="space-y-6 w-96">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">{step.name}</p>
              <p className="text-xs text-gray-500">{step.progress}%</p>
            </div>
            <Progress value={step.progress} />
          </div>
        ))}
      </div>
    )
  }
}
