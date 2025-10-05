import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Основная документация
  tutorialSidebar: [
    'intro',
    'getting-started',
    'architecture',
  ],

  // Документация компонентов
  componentsSidebar: [
    {
      type: 'category',
      label: 'Компоненты',
      items: [
        'intro',
        'getting-started',
        'architecture',
      ],
    },
  ],

  // API документация
  apiSidebar: [
    {
      type: 'category',
      label: 'API',
      items: [
        'intro',
        'getting-started',
        'architecture',
      ],
    },
  ],
};

export default sidebars;