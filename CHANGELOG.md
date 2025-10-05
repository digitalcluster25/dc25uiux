# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version) for commit
guidelines.

### 1.0.2 (2025-10-05)

### 🚀 Features

- Add Railway deployment configuration
  ([223ed0f](https://github.com/digitalcluster25/dc25uiux/commit/223ed0fb20b8eab36cb41bd6f3efa8ee112ead95))
- Add starter page and shadcn/ui boilerplate structure
  ([ebfc2c4](https://github.com/digitalcluster25/dc25uiux/commit/ebfc2c48bb95e51098c19358e1d4ef63b52c3f07))

### 🐛 Bug Fixes

- Add Express server for Railway deployment
  ([d39a5f9](https://github.com/digitalcluster25/dc25uiux/commit/d39a5f942d8a6cd1c53b2d8151bb22930ec42b8e))
- Update Railway deployment configuration
  ([4c2ff5f](https://github.com/digitalcluster25/dc25uiux/commit/4c2ff5f5b5ad1f59902ea7247b1e913aa6d4abd8))

## [1.0.0] - 2025-01-27

### Added

- Полноценная UI/UX библиотека на базе shadcn/ui
- 33 установленных компонента shadcn/ui
- Atomic Design архитектура (atoms, molecules, organisms, templates)
- Система тем с 6 предустановленными вариантами
- TypeScript поддержка с полной типизацией
- Тестирование с Vitest и React Testing Library
- Storybook для демонстрации компонентов
- PWA поддержка с Service Worker
- CLI инструменты для генерации компонентов
- VSCode сниппеты для быстрой разработки
- Интерактивная документация на Docusaurus
- API референс с полным описанием
- GitHub Actions для CI/CD
- Автоматическое тестирование и деплой
- Lazy loading для оптимизации производительности
- Code splitting по маршрутам
- Bundle size анализ
- Pre-commit хуки для качества кода
- ESLint, Prettier, Stylelint конфигурации
- Husky для git hooks

### Features

- **Компоненты**: 33 готовых компонента shadcn/ui
- **Темы**: 6 предустановленных тем (default, dark, blue, purple, green, orange)
- **Архитектура**: Atomic Design принципы
- **Типизация**: 100% TypeScript покрытие
- **Тестирование**: Автоматические тесты
- **Документация**: Полная документация с примерами
- **PWA**: Поддержка Progressive Web App
- **CLI**: Инструменты для генерации компонентов
- **VSCode**: Сниппеты для быстрой разработки
- **CI/CD**: Автоматизация тестов и деплоя

### Technical Details

- React 18+ с TypeScript
- Vite для сборки
- Tailwind CSS для стилизации
- React Router для маршрутизации
- Vitest для тестирования
- Storybook для демонстрации
- Docusaurus для документации
- GitHub Actions для CI/CD
- Railway для деплоя

## [0.1.0] - 2025-01-26

### Added

- Базовая структура проекта
- Настройка Vite + React + TypeScript
- Базовая конфигурация Tailwind CSS
- Первые компоненты shadcn/ui

---

## Типы изменений

- **Added** - для новых функций
- **Changed** - для изменений в существующей функциональности
- **Deprecated** - для функций, которые скоро будут удалены
- **Removed** - для удаленных функций
- **Fixed** - для исправления ошибок
- **Security** - для исправлений уязвимостей

## Формат коммитов

Проект использует [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Типы коммитов

- `feat`: новая функциональность
- `fix`: исправление ошибки
- `docs`: изменения в документации
- `style`: изменения форматирования
- `refactor`: рефакторинг кода
- `perf`: улучшения производительности
- `test`: добавление или изменение тестов
- `build`: изменения в системе сборки
- `ci`: изменения в CI/CD
- `chore`: прочие изменения
- `revert`: откат изменений

### Примеры

```
feat: add new Button component
fix: resolve theme switching issue
docs: update API documentation
style: format code with prettier
refactor: reorganize component structure
perf: optimize bundle size
test: add unit tests for Button
build: update vite configuration
ci: add GitHub Actions workflow
chore: update dependencies
```
