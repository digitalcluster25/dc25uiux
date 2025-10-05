import type { Meta, StoryObj } from '@storybook/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'
import { Badge } from './badge'
import { Button } from './button'

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Таблицы для отображения структурированных данных.'
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  {
    id: 1,
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    role: 'Администратор',
    status: 'Активен',
    lastLogin: '2024-01-15'
  },
  {
    id: 2,
    name: 'Петр Петров',
    email: 'petr@example.com',
    role: 'Пользователь',
    status: 'Активен',
    lastLogin: '2024-01-14'
  },
  {
    id: 3,
    name: 'Мария Сидорова',
    email: 'maria@example.com',
    role: 'Модератор',
    status: 'Неактивен',
    lastLogin: '2024-01-10'
  },
  {
    id: 4,
    name: 'Алексей Козлов',
    email: 'alexey@example.com',
    role: 'Пользователь',
    status: 'Активен',
    lastLogin: '2024-01-13'
  }
]

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Последний вход</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.status === 'Активен' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Редактировать
                  </Button>
                  <Button size="sm" variant="destructive">
                    Удалить
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export const Simple: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Продукт</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Количество</TableHead>
            <TableHead>Сумма</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Ноутбук</TableCell>
            <TableCell>₽50,000</TableCell>
            <TableCell>1</TableCell>
            <TableCell>₽50,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Мышь</TableCell>
            <TableCell>₽2,000</TableCell>
            <TableCell>2</TableCell>
            <TableCell>₽4,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Клавиатура</TableCell>
            <TableCell>₽3,000</TableCell>
            <TableCell>1</TableCell>
            <TableCell>₽3,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium" colSpan={3}>
              <strong>Итого</strong>
            </TableCell>
            <TableCell>
              <strong>₽57,000</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export const Striped: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Задача</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Приоритет</TableHead>
            <TableHead>Срок</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { task: 'Создать дизайн', status: 'Выполнено', priority: 'Высокий', deadline: '2024-01-10' },
            { task: 'Написать код', status: 'В работе', priority: 'Высокий', deadline: '2024-01-20' },
            { task: 'Тестирование', status: 'Планируется', priority: 'Средний', deadline: '2024-01-25' },
            { task: 'Документация', status: 'Планируется', priority: 'Низкий', deadline: '2024-01-30' },
          ].map((item, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <TableCell className="font-medium">{item.task}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    item.status === 'Выполнено' ? 'default' :
                    item.status === 'В работе' ? 'secondary' : 'outline'
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    item.priority === 'Высокий' ? 'destructive' :
                    item.priority === 'Средний' ? 'default' : 'secondary'
                  }
                >
                  {item.priority}
                </Badge>
              </TableCell>
              <TableCell>{item.deadline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
