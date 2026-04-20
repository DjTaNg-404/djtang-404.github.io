import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';
const baseUrl = process.env.BASE_URL ?? '/';
const githubRepoUrl =
  process.env.GITHUB_REPO_URL ?? 'https://github.com/DjTaNg-404/djtang-404.github.io';

const config: Config = {
  title: 'DjTang (子棠)',
  tagline: 'DjTang 的产品实验与技术沉淀',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: {
          showReadingTime: true,
          blogTitle: '随笔',
          blogDescription: '记录个人开发与生活思考',
          postsPerPage: 10,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'DjTang (子棠)',
      logo: {
        alt: '子棠',
        src: 'img/logo.jpg',
        style: { borderRadius: '50%', height: '32px', width: '32px' },
      },
      items: [
        {to: '/', label: '首页', position: 'left', exact: true},
        {to: '/products', label: '产品', position: 'left'},
        {to: '/docs/intro', label: '技术文档', position: 'left'},
        {to: '/blog', label: '随笔', position: 'left'},
        {to: '/about', label: '关于我', position: 'left'},
        {
          href: githubRepoUrl,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: '内容',
          items: [
            {label: '产品', to: '/products'},
            {label: '技术文档', to: '/docs/intro'},
            {label: '随笔', to: '/blog'},
          ],
        },
        {
          title: '更多',
          items: [
            {label: '关于我', to: '/about'},
          ],
        },
        {
          title: '代码',
          items: [
            {label: 'GitHub', href: githubRepoUrl},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} djtang. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
