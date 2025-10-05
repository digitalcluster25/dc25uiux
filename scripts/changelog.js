#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class ChangelogGenerator {
  constructor() {
    this.projectRoot = process.cwd()
    this.changelogPath = path.join(this.projectRoot, 'CHANGELOG.md')
    this.packageJsonPath = path.join(this.projectRoot, 'package.json')
  }

  generateChangelog() {
    try {
      console.log('🔄 Генерация changelog...')
      
      // Получаем информацию о версии из package.json
      const packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'))
      const currentVersion = packageJson.version
      
      // Получаем последние коммиты
      const commits = this.getCommitsSinceLastTag()
      
      if (commits.length === 0) {
        console.log('ℹ️  Нет новых коммитов для добавления в changelog')
        return
      }
      
      // Группируем коммиты по типам
      const groupedCommits = this.groupCommitsByType(commits)
      
      // Генерируем новую секцию changelog
      const newSection = this.generateChangelogSection(currentVersion, groupedCommits)
      
      // Обновляем CHANGELOG.md
      this.updateChangelog(newSection)
      
      console.log('✅ Changelog успешно обновлен!')
      
    } catch (error) {
      console.error('❌ Ошибка генерации changelog:', error.message)
      process.exit(1)
    }
  }

  getCommitsSinceLastTag() {
    try {
      // Получаем последний тег
      let lastTag
      try {
        lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim()
      } catch (error) {
        // Если тегов нет, берем все коммиты
        lastTag = ''
      }
      
      // Получаем коммиты с последнего тега
      const command = lastTag 
        ? `git log ${lastTag}..HEAD --pretty=format:"%h|%s|%an|%ad" --date=short`
        : `git log --pretty=format:"%h|%s|%an|%ad" --date=short`
        
      const output = execSync(command, { encoding: 'utf8' })
      
      if (!output.trim()) {
        return []
      }
      
      return output.trim().split('\n').map(line => {
        const [hash, message, author, date] = line.split('|')
        return { hash, message, author, date }
      })
      
    } catch (error) {
      console.warn('⚠️  Не удалось получить коммиты:', error.message)
      return []
    }
  }

  groupCommitsByType(commits) {
    const groups = {
      feat: [],
      fix: [],
      docs: [],
      style: [],
      refactor: [],
      perf: [],
      test: [],
      build: [],
      ci: [],
      chore: [],
      revert: []
    }
    
    commits.forEach(commit => {
      const type = this.extractCommitType(commit.message)
      if (groups[type]) {
        groups[type].push(commit)
      }
    })
    
    return groups
  }

  extractCommitType(message) {
    // Извлекаем тип из conventional commit
    const match = message.match(/^(\w+)(?:\(.+\))?:/)
    return match ? match[1] : 'chore'
  }

  generateChangelogSection(version, groupedCommits) {
    const date = new Date().toISOString().split('T')[0]
    let section = `## [${version}] - ${date}\n\n`
    
    // Добавляем секции для каждого типа
    const typeLabels = {
      feat: '### Added',
      fix: '### Fixed',
      docs: '### Documentation',
      style: '### Style',
      refactor: '### Refactored',
      perf: '### Performance',
      test: '### Tests',
      build: '### Build',
      ci: '### CI/CD',
      chore: '### Chore',
      revert: '### Reverted'
    }
    
    Object.entries(groupedCommits).forEach(([type, commits]) => {
      if (commits.length > 0) {
        section += `${typeLabels[type]}\n`
        commits.forEach(commit => {
          const description = this.formatCommitDescription(commit.message)
          section += `- ${description}\n`
        })
        section += '\n'
      }
    })
    
    return section
  }

  formatCommitDescription(message) {
    // Удаляем тип и scope из сообщения
    const match = message.match(/^\w+(?:\(.+\))?:\s*(.+)/)
    return match ? match[1] : message
  }

  updateChangelog(newSection) {
    let changelogContent = ''
    
    // Читаем существующий changelog
    if (fs.existsSync(this.changelogPath)) {
      changelogContent = fs.readFileSync(this.changelogPath, 'utf8')
    } else {
      // Создаем базовый changelog
      changelogContent = `# Changelog

Все значимые изменения в проекте DC25 UI/UX будут документированы в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и проект следует [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`
    }
    
    // Вставляем новую секцию после заголовка
    const lines = changelogContent.split('\n')
    const insertIndex = lines.findIndex(line => line.startsWith('## ['))
    
    if (insertIndex === -1) {
      // Если нет существующих версий, добавляем в конец
      changelogContent += newSection
    } else {
      // Вставляем перед первой версией
      lines.splice(insertIndex, 0, newSection.trim())
      changelogContent = lines.join('\n')
    }
    
    // Записываем обновленный changelog
    fs.writeFileSync(this.changelogPath, changelogContent)
  }

  validateCommits() {
    try {
      console.log('🔍 Проверка коммитов...')
      
      const commits = this.getCommitsSinceLastTag()
      const invalidCommits = []
      
      commits.forEach(commit => {
        if (!this.isValidCommitMessage(commit.message)) {
          invalidCommits.push(commit)
        }
      })
      
      if (invalidCommits.length > 0) {
        console.warn('⚠️  Найдены коммиты с неверным форматом:')
        invalidCommits.forEach(commit => {
          console.warn(`  - ${commit.hash}: ${commit.message}`)
        })
        console.warn('\nИспользуйте conventional commits формат:')
        console.warn('  feat: add new feature')
        console.warn('  fix: resolve bug')
        console.warn('  docs: update documentation')
      } else {
        console.log('✅ Все коммиты соответствуют conventional commits')
      }
      
    } catch (error) {
      console.error('❌ Ошибка валидации коммитов:', error.message)
    }
  }

  isValidCommitMessage(message) {
    // Проверяем соответствие conventional commits
    const conventionalCommitRegex = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?:\s.+/
    return conventionalCommitRegex.test(message)
  }

  generateFullChangelog() {
    try {
      console.log('🔄 Генерация полного changelog...')
      
      const command = 'conventional-changelog -p angular -i CHANGELOG.md -s -r 0'
      execSync(command, { stdio: 'inherit' })
      
      console.log('✅ Полный changelog сгенерирован!')
      
    } catch (error) {
      console.error('❌ Ошибка генерации полного changelog:', error.message)
      process.exit(1)
    }
  }
}

// CLI интерфейс
if (require.main === module) {
  const args = process.argv.slice(2)
  const generator = new ChangelogGenerator()
  
  if (args.includes('--validate')) {
    generator.validateCommits()
  } else if (args.includes('--full')) {
    generator.generateFullChangelog()
  } else {
    generator.generateChangelog()
  }
}

module.exports = ChangelogGenerator
