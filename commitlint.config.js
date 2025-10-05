module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Новая функциональность
        'fix',      // Исправление ошибки
        'docs',     // Изменения в документации
        'style',    // Изменения форматирования (пробелы, точки с запятой и т.д.)
        'refactor', // Рефакторинг кода
        'perf',     // Улучшения производительности
        'test',     // Добавление или изменение тестов
        'build',    // Изменения в системе сборки
        'ci',       // Изменения в CI/CD
        'chore',    // Прочие изменения
        'revert'    // Откат изменений
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always']
  }
}
