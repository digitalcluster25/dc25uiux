# Semantic Versioning Guide

Руководство по семантическому версионированию в проекте DC25 UI/UX.

## Обзор

Проект использует [Semantic Versioning (SemVer)](https://semver.org/) для управления версиями релизов. Это обеспечивает предсказуемость изменений и совместимость.

## Формат версии

Версии следуют формату: `MAJOR.MINOR.PATCH`

- **MAJOR** (X.0.0) - Breaking changes (несовместимые изменения)
- **MINOR** (0.X.0) - New features (новые функции, обратно совместимые)
- **PATCH** (0.0.X) - Bug fixes (исправления ошибок, обратно совместимые)

## Правила версионирования

### MAJOR версия (X.0.0)

Увеличивается при:
- Breaking changes в API
- Удаление функций
- Изменение поведения по умолчанию
- Изменение формата данных

**Примеры:**
```
1.0.0 -> 2.0.0
- Удален компонент OldButton
- Изменен API ThemeProvider
- Breaking change в useTheme hook
```

### MINOR версия (0.X.0)

Увеличивается при:
- Добавление новых функций
- Добавление новых компонентов
- Расширение существующего API
- Новые возможности

**Примеры:**
```
1.0.0 -> 1.1.0
- Добавлен компонент Card
- Новый пропс в Button
- Добавлена поддержка темной темы
```

### PATCH версия (0.0.X)

Увеличивается при:
- Исправления ошибок
- Улучшения производительности
- Обновления документации
- Рефакторинг без изменения API

**Примеры:**
```
1.0.0 -> 1.0.1
- Исправлена ошибка в Button
- Улучшена производительность
- Обновлена документация
```

## Инструменты

### 1. Standard Version

Автоматическое создание релизов на основе conventional commits:

```bash
# Patch релиз
npm run version:patch

# Minor релиз
npm run version:minor

# Major релиз
npm run version:major
```

### 2. Semantic Release

Полностью автоматические релизы с GitHub интеграцией:

```bash
# Dry run
npm run release:dry-run

# Автоматический релиз
npm run release
```

### 3. Custom Release Script

Удобный скрипт для управления релизами:

```bash
# Проверка статуса
npm run release:check

# Dry run
npm run release:dry

# Создание релиза
npm run release:patch
npm run release:minor
npm run release:major
```

## Conventional Commits

Проект использует [Conventional Commits](https://www.conventionalcommits.org/) для автоматического определения типа релиза.

### Типы коммитов и версии

| Тип коммита | Версия | Описание |
|-------------|--------|----------|
| `feat` | MINOR | Новая функциональность |
| `fix` | PATCH | Исправление ошибки |
| `perf` | PATCH | Улучшение производительности |
| `refactor` | PATCH | Рефакторинг кода |
| `docs` | - | Документация (не влияет на версию) |
| `style` | - | Форматирование (не влияет на версию) |
| `test` | - | Тесты (не влияет на версию) |
| `build` | - | Система сборки (не влияет на версию) |
| `ci` | - | CI/CD (не влияет на версию) |
| `chore` | - | Прочие изменения (не влияет на версию) |

### Breaking Changes

Для MAJOR версии используйте `BREAKING CHANGE:` в footer коммита:

```
feat: redesign Button component

BREAKING CHANGE: Button API completely changed. 
Old props no longer supported.
```

## Процесс релиза

### 1. Подготовка

```bash
# Проверка статуса
npm run release:check

# Убедитесь, что все изменения закоммичены
git status
```

### 2. Создание релиза

```bash
# Patch релиз (1.0.0 -> 1.0.1)
npm run release:patch

# Minor релиз (1.0.0 -> 1.1.0)
npm run release:minor

# Major релиз (1.0.0 -> 2.0.0)
npm run release:major
```

### 3. Автоматизация

GitHub Actions автоматически:
- Создает релиз при push в main
- Генерирует changelog
- Создает GitHub release
- Отправляет уведомления

## Конфигурация

### .releaserc.json

Конфигурация semantic-release:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

### .versionrc.json

Конфигурация standard-version:

```json
{
  "types": {
    "feat": { "section": "🚀 Features" },
    "fix": { "section": "🐛 Bug Fixes" },
    "perf": { "section": "⚡ Performance Improvements" }
  }
}
```

## Примеры

### Patch релиз

```bash
# Коммиты
git commit -m "fix: resolve Button hover state issue"
git commit -m "perf: optimize theme switching"

# Создание релиза
npm run release:patch

# Результат: 1.0.0 -> 1.0.1
```

### Minor релиз

```bash
# Коммиты
git commit -m "feat: add new Card component"
git commit -m "feat: add dark theme support"

# Создание релиза
npm run release:minor

# Результат: 1.0.0 -> 1.1.0
```

### Major релиз

```bash
# Коммиты
git commit -m "feat: redesign Button API

BREAKING CHANGE: Button component API completely changed"

# Создание релиза
npm run release:major

# Результат: 1.0.0 -> 2.0.0
```

## Лучшие практики

### 1. Используйте conventional commits

```bash
# ✅ Хорошо
git commit -m "feat: add new Button variant"
git commit -m "fix: resolve theme switching issue"

# ❌ Плохо
git commit -m "update button"
git commit -m "fix stuff"
```

### 2. Группируйте связанные изменения

```bash
# ✅ Хорошо
git commit -m "feat: add Card component with variants"

# ❌ Плохо
git commit -m "feat: add Card"
git commit -m "feat: add Card variants"
git commit -m "feat: add Card sizes"
```

### 3. Документируйте breaking changes

```bash
# ✅ Хорошо
git commit -m "feat: redesign Button API

BREAKING CHANGE: Button component API completely changed.
Old props no longer supported."

# ❌ Плохо
git commit -m "feat: redesign Button API"
```

### 4. Тестируйте перед релизом

```bash
# Проверка
npm run release:check
npm run release:dry

# Тестирование
npm run test:run
npm run build
```

### 5. Используйте pre-release версии

```bash
# Alpha версия
npm run version:prerelease -- --prerelease alpha

# Beta версия
npm run version:prerelease -- --prerelease beta
```

## Troubleshooting

### Ошибка "No commits for release"

**Причина:** Нет новых коммитов с последнего релиза.

**Решение:**
```bash
# Проверка коммитов
npm run release:check

# Создание коммита
git commit -m "feat: add new feature"
```

### Ошибка "Working directory not clean"

**Причина:** Есть незакоммиченные изменения.

**Решение:**
```bash
# Проверка статуса
git status

# Коммит изменений
git add .
git commit -m "chore: update dependencies"
```

### Ошибка "No valid commits found"

**Причина:** Коммиты не соответствуют conventional commits.

**Решение:**
```bash
# Проверка коммитов
npm run changelog:validate

# Исправление коммитов
git commit --amend -m "feat: add new feature"
```

## Полезные ссылки

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Standard Version](https://github.com/conventional-changelog/standard-version)
- [Semantic Release](https://github.com/semantic-release/semantic-release)
- [Keep a Changelog](https://keepachangelog.com/)

---

**Совет:** Используйте `npm run release:check` для проверки статуса перед созданием релиза.
