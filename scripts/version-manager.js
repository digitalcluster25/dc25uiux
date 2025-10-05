#!/usr/bin/env node

/**
 * Менеджер версий для DC25 UI/UX
 * Управляет версионированием и релизами
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

// Получение текущей версии
const getCurrentVersion = () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    return packageJson.version
  } catch (error) {
    log('❌ Ошибка чтения package.json', 'red')
    return '0.0.0'
  }
}

// Получение истории версий
const getVersionHistory = () => {
  try {
    const tags = execSync('git tag --list --sort=-version:refname', { encoding: 'utf8' })
    return tags.trim().split('\n').filter(tag => tag.trim())
  } catch (error) {
    return []
  }
}

// Анализ изменений между версиями
const analyzeChanges = (fromVersion, toVersion) => {
  try {
    const commits = execSync(`git log ${fromVersion}..${toVersion} --oneline`, { encoding: 'utf8' })
    const lines = commits.trim().split('\n').filter(line => line.trim())
    
    const changes = {
      feat: [],
      fix: [],
      perf: [],
      refactor: [],
      docs: [],
      style: [],
      test: [],
      build: [],
      ci: [],
      chore: [],
      other: []
    }
    
    lines.forEach(line => {
      if (line.match(/^[a-f0-9]+ feat:/)) {
        changes.feat.push(line)
      } else if (line.match(/^[a-f0-9]+ fix:/)) {
        changes.fix.push(line)
      } else if (line.match(/^[a-f0-9]+ perf:/)) {
        changes.perf.push(line)
      } else if (line.match(/^[a-f0-9]+ refactor:/)) {
        changes.refactor.push(line)
      } else if (line.match(/^[a-f0-9]+ docs:/)) {
        changes.docs.push(line)
      } else if (line.match(/^[a-f0-9]+ style:/)) {
        changes.style.push(line)
      } else if (line.match(/^[a-f0-9]+ test:/)) {
        changes.test.push(line)
      } else if (line.match(/^[a-f0-9]+ build:/)) {
        changes.build.push(line)
      } else if (line.match(/^[a-f0-9]+ ci:/)) {
        changes.ci.push(line)
      } else if (line.match(/^[a-f0-9]+ chore:/)) {
        changes.chore.push(line)
      } else {
        changes.other.push(line)
      }
    })
    
    return changes
  } catch (error) {
    log('❌ Ошибка анализа изменений', 'red')
    return null
  }
}

// Показ истории версий
const showVersionHistory = () => {
  log('📚 История версий DC25 UI/UX', 'bright')
  console.log('')
  
  const currentVersion = getCurrentVersion()
  const versions = getVersionHistory()
  
  log(`📦 Текущая версия: ${currentVersion}`, 'blue')
  console.log('')
  
  if (versions.length === 0) {
    log('❌ Версии не найдены', 'red')
    return
  }
  
  log('🏷️  Доступные версии:', 'blue')
  versions.forEach((version, index) => {
    const isCurrent = version === `v${currentVersion}`
    const marker = isCurrent ? '👉' : '  '
    const color = isCurrent ? 'green' : 'reset'
    log(`${marker} ${version}`, color)
  })
  
  console.log('')
  log('📊 Статистика:', 'blue')
  log(`  Всего версий: ${versions.length}`, 'cyan')
  log(`  Текущая версия: v${currentVersion}`, 'cyan')
  log(`  Последняя версия: ${versions[0]}`, 'cyan')
}

// Показ изменений между версиями
const showChanges = (fromVersion, toVersion) => {
  log(`📊 Изменения между ${fromVersion} и ${toVersion}`, 'bright')
  console.log('')
  
  const changes = analyzeChanges(fromVersion, toVersion)
  if (!changes) return
  
  const sections = [
    { key: 'feat', title: '🚀 Features', color: 'green' },
    { key: 'fix', title: '🐛 Bug Fixes', color: 'red' },
    { key: 'perf', title: '⚡ Performance', color: 'yellow' },
    { key: 'refactor', title: '♻️ Refactoring', color: 'blue' },
    { key: 'docs', title: '📚 Documentation', color: 'cyan' },
    { key: 'style', title: '💄 Styles', color: 'magenta' },
    { key: 'test', title: '🧪 Tests', color: 'green' },
    { key: 'build', title: '🏗️ Build', color: 'yellow' },
    { key: 'ci', title: '👷 CI/CD', color: 'blue' },
    { key: 'chore', title: '🔧 Chores', color: 'cyan' },
    { key: 'other', title: '📝 Other', color: 'reset' }
  ]
  
  sections.forEach(section => {
    const items = changes[section.key]
    if (items.length > 0) {
      log(`${section.title} (${items.length})`, section.color)
      items.forEach(item => {
        log(`  ${item}`, 'reset')
      })
      console.log('')
    }
  })
  
  const totalChanges = Object.values(changes).reduce((sum, arr) => sum + arr.length, 0)
  log(`📈 Всего изменений: ${totalChanges}`, 'bright')
}

// Предложение следующей версии
const suggestNextVersion = () => {
  log('🔮 Предложение следующей версии', 'bright')
  console.log('')
  
  const currentVersion = getCurrentVersion()
  const versions = getVersionHistory()
  
  if (versions.length === 0) {
    log('❌ Нет истории версий для анализа', 'red')
    return
  }
  
  const lastVersion = versions[0]
  const changes = analyzeChanges(lastVersion, 'HEAD')
  
  if (!changes) return
  
  const hasBreakingChanges = changes.other.some(change => 
    change.includes('BREAKING CHANGE') || change.includes('breaking change')
  )
  
  const hasNewFeatures = changes.feat.length > 0
  const hasBugFixes = changes.fix.length > 0
  const hasPerformance = changes.perf.length > 0
  
  log(`📦 Текущая версия: ${currentVersion}`, 'blue')
  log(`🏷️  Последний тег: ${lastVersion}`, 'blue')
  console.log('')
  
  if (hasBreakingChanges) {
    log('💥 Обнаружены breaking changes', 'red')
    log('   Рекомендуется: MAJOR версия', 'red')
    log(`   Следующая версия: ${incrementVersion(currentVersion, 'major')}`, 'red')
  } else if (hasNewFeatures) {
    log('✨ Обнаружены новые функции', 'green')
    log('   Рекомендуется: MINOR версия', 'green')
    log(`   Следующая версия: ${incrementVersion(currentVersion, 'minor')}`, 'green')
  } else if (hasBugFixes || hasPerformance) {
    log('🔧 Обнаружены исправления', 'yellow')
    log('   Рекомендуется: PATCH версия', 'yellow')
    log(`   Следующая версия: ${incrementVersion(currentVersion, 'patch')}`, 'yellow')
  } else {
    log('📝 Только документация и стили', 'cyan')
    log('   Рекомендуется: без релиза', 'cyan')
  }
  
  console.log('')
  log('📊 Статистика изменений:', 'blue')
  log(`  🚀 Features: ${changes.feat.length}`, 'green')
  log(`  🐛 Fixes: ${changes.fix.length}`, 'red')
  log(`  ⚡ Performance: ${changes.perf.length}`, 'yellow')
  log(`  ♻️ Refactoring: ${changes.refactor.length}`, 'blue')
  log(`  📚 Documentation: ${changes.docs.length}`, 'cyan')
  log(`  💄 Styles: ${changes.style.length}`, 'magenta')
  log(`  🧪 Tests: ${changes.test.length}`, 'green')
  log(`  🏗️ Build: ${changes.build.length}`, 'yellow')
  log(`  👷 CI/CD: ${changes.ci.length}`, 'blue')
  log(`  🔧 Chores: ${changes.chore.length}`, 'cyan')
  log(`  📝 Other: ${changes.other.length}`, 'reset')
}

// Увеличение версии
const incrementVersion = (version, type) => {
  const [major, minor, patch] = version.split('.').map(Number)
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    default:
      return version
  }
}

// Показ помощи
const showHelp = () => {
  log('📚 DC25 UI/UX - Менеджер версий', 'bright')
  console.log('')
  log('Использование:', 'blue')
  console.log('  node scripts/version-manager.js [команда] [опции]')
  console.log('')
  log('Команды:', 'blue')
  console.log('  history              - Показать историю версий')
  console.log('  changes <from> <to>  - Показать изменения между версиями')
  console.log('  suggest              - Предложить следующую версию')
  console.log('  current              - Показать текущую версию')
  console.log('  help                 - Показать эту справку')
  console.log('')
  log('Примеры:', 'blue')
  console.log('  node scripts/version-manager.js history')
  console.log('  node scripts/version-manager.js changes v1.0.0 v1.1.0')
  console.log('  node scripts/version-manager.js suggest')
  console.log('  node scripts/version-manager.js current')
  console.log('')
  log('Опции:', 'yellow')
  console.log('  --help, -h           - Показать справку')
  console.log('  --version, -v        - Показать версию')
}

// Главная функция
const main = () => {
  const args = process.argv.slice(2)
  const command = args[0] || 'help'
  
  switch (command) {
    case 'history':
      showVersionHistory()
      break
    case 'changes':
      const fromVersion = args[1]
      const toVersion = args[2]
      if (!fromVersion || !toVersion) {
        log('❌ Укажите версии для сравнения', 'red')
        log('Пример: node scripts/version-manager.js changes v1.0.0 v1.1.0', 'blue')
        return
      }
      showChanges(fromVersion, toVersion)
      break
    case 'suggest':
      suggestNextVersion()
      break
    case 'current':
      log(`📦 Текущая версия: ${getCurrentVersion()}`, 'blue')
      break
    case 'help':
    case '--help':
    case '-h':
      showHelp()
      break
    case '--version':
    case '-v':
      log(`📦 Версия менеджера: 1.0.0`, 'blue')
      break
    default:
      log(`❌ Неизвестная команда: ${command}`, 'red')
      showHelp()
      break
  }
}

// Запуск
if (require.main === module) {
  main()
}

module.exports = {
  getCurrentVersion,
  getVersionHistory,
  analyzeChanges,
  showVersionHistory,
  showChanges,
  suggestNextVersion,
  incrementVersion
}
