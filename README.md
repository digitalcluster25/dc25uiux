# DC25 UI/UX

Библиотека компонентов shadcn/ui и UI/UX boilerplate для быстрой разработки современных интерфейсов.

## 📋 Описание

DC25 UI/UX — это современный boilerplate проект, созданный для ускорения разработки пользовательских интерфейсов. Проект включает в себя готовую библиотеку компонентов на основе shadcn/ui и предоставляет структурированную основу для создания красивых и функциональных веб-приложений.

## ✨ Возможности

- 🎨 **shadcn/ui компоненты** - Готовые компоненты с возможностью кастомизации
- ⚡ **Быстрая разработка** - Boilerplate структура для мгновенного старта
- 🎯 **Современный дизайн** - Принципы UI/UX дизайна с акцентом на удобство
- 📱 **Адаптивность** - Корректное отображение на всех устройствах
- 🎨 **Tailwind CSS** - Быстрая стилизация и уникальные дизайны
- 🚀 **Готовность к продакшену** - Протестированные компоненты

## 🛠 Технологический стек

### Frontend
- **shadcn/ui** - Компоненты пользовательского интерфейса
- **Tailwind CSS** - Utility-first CSS фреймворк
- **React** - Библиотека для создания пользовательских интерфейсов
- **TypeScript** - Типизированный JavaScript

### Инструменты
- **Vite** - Быстрый инструмент сборки
- **Git & GitHub** - Система контроля версий
- **ESLint & Prettier** - Линтинг и форматирование кода
- **PostCSS** - Обработка CSS

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+ 
- npm или yarn

### Установка

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/digitalcluster25/dc25uiux.git
   cd dc25uiux
   ```

2. **Установка зависимостей**
   ```bash
   npm install
   ```

3. **Запуск проекта**
   ```bash
   npm run dev
   ```

4. **Откройте браузер**
   ```
   http://localhost:5173
   ```

## 📁 Структура проекта

```
dc25uiux/
├── src/
│   ├── components/     # React компоненты
│   ├── lib/           # Утилиты и хелперы
│   ├── styles/        # Стили и CSS
│   └── index.css      # Основные стили
├── public/            # Статические файлы
├── components.json    # Конфигурация shadcn/ui
├── tailwind.config.js # Конфигурация Tailwind
├── vite.config.ts     # Конфигурация Vite
└── package.json       # Зависимости проекта
```

## 🎨 Добавление компонентов shadcn/ui

Проект настроен для работы с shadcn/ui. Для добавления новых компонентов:

```bash
npx shadcn-ui@latest add [component-name]
```

Примеры:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

## 📝 Доступные скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для продакшена
- `npm run preview` - Предварительный просмотр сборки
- `npm run lint` - Проверка кода линтером
- `npm run format` - Форматирование кода

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта! Для этого:

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под лицензией MIT - см. файл [LICENSE](LICENSE) для деталей.

## 👥 Авторы

- **Digital Cluster 25** - *Изначальная работа* - [digitalcluster25](https://github.com/digitalcluster25)

## 🙏 Благодарности

- [shadcn/ui](https://ui.shadcn.com/) - за отличные компоненты
- [Tailwind CSS](https://tailwindcss.com/) - за utility-first подход
- [Vite](https://vitejs.dev/) - за быструю сборку

## 📞 Поддержка

Если у вас есть вопросы или предложения, создайте [Issue](https://github.com/digitalcluster25/dc25uiux/issues) в репозитории.

---

⭐ Если проект был полезен, поставьте звезду!
