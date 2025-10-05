#!/usr/bin/env node

/**
 * Скрипт для управления релизами
 * Поддерживает semantic versioning и автоматическую генерацию changelog
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

const exec = (command, options = {}) => {
  try {
    return execSync(command, { 
      stdio: 'inherit', 
      encoding: 'utf8',
      ...options 
    })
  } catch (error) {
    log(`❌ Ошибка выполнения команды: ${command}`, 'red')
    process.exit(1)
  }
}

// Проверка наличия изменений
const checkChanges = () => {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' })
    if (status.trim()) {
      log('⚠️  Обнаружены незакоммиченные изменения:', 'yellow')
      console.log(status)
      return false
    }
    return true
  } catch (error) {
    log('❌ Ошибка проверки статуса git', 'red')
    return false
  }
}

// Проверка наличия тегов
const checkTags = () => {
  try {
    const tags = execSync('git tag --list', { encoding: 'utf8' })
    return tags.trim().split('\n').filter(tag => tag.trim())
  } catch (error) {
    return []
  }
}

// Получение текущей версии из package.json
const getCurrentVersion = () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    return packageJson.version
  } catch (error) {
    log('❌ Ошибка чтения package.json', 'red')
    return '0.0.0'
  }
}

// Проверка conventional commits
const checkCommits = () => {
  try {
    const commits = execSync('git log --oneline', { encoding: 'utf8' })
    const lines = commits.trim().split('\n')
    
    const conventionalCommits = lines.filter(line => {
      return /^(feat|fix|perf|refactor|docs|style|test|build|ci|chore|revert)(\(.+\))?: .+/.test(line)
    })
    
    log(`📝 Всего коммитов: ${lines.length}`, 'blue')
    log(`✅ Conventional commits: ${conventionalCommits.length}`, 'green')
    log(`❌ Нестандартные коммиты: ${lines.length - conventionalCommits.length}`, 'red')
    
    if (conventionalCommits.length === 0) {
      log('⚠️  Нет коммитов для релиза', 'yellow')
      return false
    }
    
    return true
  } catch (error) {
    log('❌ Ошибка проверки коммитов', 'red')
    return false
  }
}

// Создание релиза
const createRelease = (type = 'patch') => {
  log(`🚀 Создание ${type} релиза...`, 'cyan')
  
  // Проверки
  if (!checkChanges()) {
    log('❌ Сначала закоммитьте все изменения', 'red')
    return
  }
  
  if (!checkCommits()) {
    log('❌ Нет коммитов для релиза', 'red')
    return
  }
  
  // Получение текущей версии
  const currentVersion = getCurrentVersion()
  log(`📦 Текущая версия: ${currentVersion}`, 'blue')
  
  try {
    // Создание релиза с standard-version
    exec(`npx standard-version --release-as ${type}`)
    
    // Получение новой версии
    const newVersion = getCurrentVersion()
    log(`✅ Релиз создан: ${newVersion}`, 'green')
    
    // Пуш тегов
    exec('git push --follow-tags origin main')
    
    log('🎉 Релиз успешно создан и отправлен!', 'green')
    
  } catch (error) {
    log('❌ Ошибка создания релиза', 'red')
    process.exit(1)
  }
}

// Dry run
const dryRun = () => {
  log('🔍 Dry run - проверка изменений...', 'cyan')
  
  if (!checkChanges()) {
    log('❌ Сначала закоммитьте все изменения', 'red')
    return
  }
  
  if (!checkCommits()) {
    log('❌ Нет коммитов для релиза', 'red')
    return
  }
  
  try {
    exec('npx standard-version --dry-run')
    log('✅ Dry run завершен успешно', 'green')
  } catch (error) {
    log('❌ Ошибка dry run', 'red')
    process.exit(1)
  }
}

// Показ помощи
const showHelp = () => {
  log('📚 DC25 UI/UX - Управление релизами', 'bright')
  console.log('')
  log('Использование:', 'blue')
  console.log('  node scripts/release.js [команда]')
  console.log('')
  log('Команды:', 'blue')
  console.log('  patch     - Создать patch релиз (1.0.0 -> 1.0.1)')
  console.log('  minor     - Создать minor релиз (1.0.0 -> 1.1.0)')
  console.log('  major     - Создать major релиз (1.0.0 -> 2.0.0)')
  console.log('  dry-run   - Проверить изменения без создания релиза')
  console.log('  check     - Проверить статус проекта')
  console.log('  help      - Показать эту справку')
  console.log('')
  log('Примеры:', 'blue')
  console.log('  node scripts/release.js patch')
  console.log('  node scripts/release.js minor')
  console.log('  node scripts/release.js dry-run')
  console.log('')
  log('Требования:', 'yellow')
  console.log('  - Все изменения должны быть закоммичены')
  console.log('  - Коммиты должны следовать conventional commits')
  console.log('  - Проект должен быть в чистом состоянии')
}

// Проверка статуса
const checkStatus = () => {
  log('🔍 Проверка статуса проекта...', 'cyan')
  
  const currentVersion = getCurrentVersion()
  log(`📦 Текущая версия: ${currentVersion}`, 'blue')
  
  const tags = checkTags()
  log(`🏷️  Тегов: ${tags.length}`, 'blue')
  
  if (tags.length > 0) {
    log(`📋 Последний тег: ${tags[tags.length - 1]}`, 'blue')
  }
  
  const hasChanges = !checkChanges()
  if (hasChanges) {
    log('⚠️  Есть незакоммиченные изменения', 'yellow')
  } else {
    log('✅ Рабочая директория чистая', 'green')
  }
  
  const hasCommits = checkCommits()
  if (hasCommits) {
    log('✅ Есть коммиты для релиза', 'green')
  } else {
    log('❌ Нет коммитов для релиза', 'red')
  }
}

// Главная функция
const main = () => {
  const command = process.argv[2] || 'help'
  
  switch (command) {
    case 'patch':
      createRelease('patch')
      break
    case 'minor':
      createRelease('minor')
      break
    case 'major':
      createRelease('major')
      break
    case 'dry-run':
      dryRun()
      break
    case 'check':
      checkStatus()
      break
    case 'help':
    default:
      showHelp()
      break
  }
}

// Запуск
if (require.main === module) {
  main()
}

module.exports = {
  createRelease,
  dryRun,
  checkStatus,
  checkChanges,
  checkCommits,
  getCurrentVersion
}
