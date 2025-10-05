import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'DC25 UI/UX',
  tagline: 'Полноценная UI/UX библиотека на базе shadcn/ui с гарантированной работоспособностью',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://dc25-uiux.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dc25', // Usually your GitHub org/user name.
  projectName: 'uiux', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dc25/uiux/tree/main/docs-site/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dc25/uiux/tree/main/docs-site/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
  ],

  themeConfig:
    {
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'DC25 UI/UX',
        logo: {
          alt: 'DC25 UI/UX Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Документация',
          },
          {
            type: 'docSidebar',
            sidebarId: 'componentsSidebar',
            position: 'left',
            label: 'Компоненты',
          },
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API',
          },
          {to: '/blog', label: 'Блог', position: 'left'},
          {
            href: 'https://github.com/dc25/uiux',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Документация',
            items: [
              {
                label: 'Введение',
                to: '/docs/intro',
              },
              {
                label: 'Быстрый старт',
                to: '/docs/getting-started',
              },
              {
                label: 'Архитектура',
                to: '/docs/architecture',
              },
            ],
          },
          {
            title: 'Компоненты',
            items: [
              {
                label: 'Atoms',
                to: '/docs/components/atoms',
              },
              {
                label: 'Molecules',
                to: '/docs/components/molecules',
              },
              {
                label: 'Organisms',
                to: '/docs/components/organisms',
              },
            ],
          },
          {
            title: 'Сообщество',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/dc25/uiux',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/dc25',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/dc25',
              },
            ],
          },
          {
            title: 'Больше',
            items: [
              {
                label: 'Блог',
                to: '/blog',
              },
              {
                label: 'Примеры',
                href: 'https://dc25-uiux.vercel.app/examples',
              },
              {
                label: 'Storybook',
                href: 'https://dc25-uiux.vercel.app/storybook',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DC25 UI/UX. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'diff', 'json', 'jsx', 'tsx'],
      },
    } satisfies Preset.ThemeConfig,
};

export default config;