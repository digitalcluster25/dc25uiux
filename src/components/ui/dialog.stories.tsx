import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from './button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog'

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Открыть диалог</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактировать профиль</DialogTitle>
            <DialogDescription>
              Внесите изменения в свой профиль здесь. Нажмите сохранить когда закончите.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Имя
              </label>
              <input
                id="name"
                defaultValue="Петр Петров"
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Логин
              </label>
              <input
                id="username"
                defaultValue="@petrov"
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const AlertDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Удалить аккаунт</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Вы уверены?</DialogTitle>
            <DialogDescription>
              Это действие нельзя отменить. Это навсегда удалит ваш аккаунт
              и удалит ваши данные с наших серверов.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}