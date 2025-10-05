# Changelog Guide

Руководство по работе с changelog в проекте DC25 UI/UX.

## Автоматическая генерация

### Команды

```bash
# Генерация changelog для новых коммитов
npm run changelog

# Генерация полного changelog
npm run changelog:full

# Валидация коммитов
npm run changelog:validate

# Интерактивный коммит
npm run commit
```

### GitHub Actions

Changelog автоматически обновляется при:
- Push в ветку `main`
- Создании Pull Request

## Conventional Commits

Проект использует [Conventional Commits](https://www.conventionalcommits.org/) стандарт.

### Формат

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Типы коммитов

| Тип | Описание | Пример |
|-----|----------|---------|
| `feat` | Новая функциональность | `feat: add Button component` |
| `fix` | Исправление ошибки | `fix: resolve theme switching issue` |
| `docs` | Изменения в документации | `docs: update API documentation` |
| `style` | Изменения форматирования | `style: format code with prettier` |
| `refactor` | Рефакторинг кода | `refactor: reorganize component structure` |
| `perf` | Улучшения производительности | `perf: optimize bundle size` |
| `test` | Добавление или изменение тестов | `test: add unit tests for Button` |
| `build` | Изменения в системе сборки | `build: update vite configuration` |
| `ci` | Изменения в CI/CD | `ci: add GitHub Actions workflow` |
| `chore` | Прочие изменения | `chore: update dependencies` |
| `revert` | Откат изменений | `revert: remove experimental feature` |

### Scope (опционально)

Указывает область изменений:

```
feat(components): add new Button component
fix(theme): resolve dark mode issue
docs(api): update useTheme documentation
```

### Body (опционально)

Подробное описание изменений:

```
feat: add new Button component

- Support for multiple variants (primary, secondary, outline)
- Size options (sm, md, lg)
- Disabled state handling
- Accessibility improvements
```

### Footer (опционально)

Метаданные коммита:

```
feat: add new Button component

Closes #123
Breaking change: Button API updated
```

## Примеры

### Хорошие коммиты

```bash
# Новая функциональность
git commit -m "feat: add ThemeCustomizer component"

# Исправление ошибки
git commit -m "fix: resolve PWA installation prompt"

# Документация
git commit -m "docs: update component guidelines"

# Рефакторинг
git commit -m "refactor: extract theme logic to custom hook"

# Тесты
git commit -m "test: add unit tests for SearchBar component"

# С областью изменений
git commit -m "feat(components): add new Card component"
git commit -m "fix(theme): resolve color contrast issue"
git commit -m "docs(api): update useTheme hook documentation"
```

### Плохие коммиты

```bash
# ❌ Неясное описание
git commit -m "fix stuff"
git commit -m "update"
git commit -m "changes"

# ❌ Неверный тип
git commit -m "added button"
git commit -m "fixed bug"
git commit -m "updated docs"

# ❌ Слишком длинное описание
git commit -m "feat: add new Button component with multiple variants including primary secondary outline ghost destructive sizes sm md lg disabled state hover effects focus states accessibility improvements keyboard navigation screen reader support"
```

## Структура CHANGELOG.md

### Заголовок

```markdown
# Changelog

Все значимые изменения в проекте DC25 UI/UX будут документированы в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и проект следует [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
```

### Секции

```markdown
## [Unreleased]

### Added
- Новая функциональность

### Changed
- Изменения в существующей функциональности

### Fixed
- Исправления ошибок

### Removed
- Удаленная функциональность

## [1.0.0] - 2025-01-27

### Added
- Полноценная UI/UX библиотека
- 33 компонента shadcn/ui
- Atomic Design архитектура
```

## Лучшие практики

### 1. Используйте интерактивный коммит

```bash
# ✅ Хорошо
npm run commit

# ❌ Плохо
git commit -m "fix stuff"
```

### 2. Пишите понятные описания

```bash
# ✅ Хорошо
feat: add dark mode support to ThemeCustomizer

# ❌ Плохо
feat: add stuff
```

### 3. Группируйте связанные изменения

```bash
# ✅ Хорошо
feat: add Button component with variants

# ❌ Плохо
feat: add Button
feat: add Button variants
feat: add Button sizes
```

### 4. Используйте scope для больших проектов

```bash
# ✅ Хорошо
feat(components): add new Card component
fix(theme): resolve color contrast issue

# ❌ Плохо
feat: add new Card component
fix: resolve color contrast issue
```

### 5. Валидируйте коммиты

```bash
# Проверка перед коммитом
npm run changelog:validate
```

## Интеграция с IDE

### VSCode

Добавьте в `.vscode/settings.json`:

```json
{
  "git.inputValidation": "always",
  "git.inputValidationLength": 100,
  "git.inputValidationSubjectLength": 50
}
```

### WebStorm

Настройте шаблоны коммитов:

```
feat: $MESSAGE$
fix: $MESSAGE$
docs: $MESSAGE$
style: $MESSAGE$
refactor: $MESSAGE$
perf: $MESSAGE$
test: $MESSAGE$
build: $MESSAGE$
ci: $MESSAGE$
chore: $MESSAGE$
```

## Troubleshooting

### Ошибка commitlint

```
⧗   input: fix stuff
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
```

**Решение:** Используйте правильный формат:
```bash
git commit -m "fix: resolve specific issue"
```

### Ошибка генерации changelog

```
❌ Ошибка генерации changelog: Command failed
```

**Решение:** Проверьте наличие коммитов:
```bash
git log --oneline
npm run changelog:validate
```

### Пустой changelog

**Причина:** Нет новых коммитов с последнего тега.

**Решение:** Создайте тег или добавьте новые коммиты:
```bash
git tag v1.0.0
git push --tags
```

## Полезные ссылки

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Commitizen](https://commitizen.github.io/cz-cli/)
- [Commitlint](https://commitlint.js.org/)

---

**Совет:** Используйте `npm run commit` для интерактивного создания коммитов в правильном формате.
