import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite';
import Tailwind from '@tailwindcss/vite'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notes",
  description: "Notes",
  srcDir: 'pages',
  lang: 'zh-CN',
  base: '/notes',
  vite: {
    plugins: [AutoImport({ imports: ['vue', 'vue-router'] }), Tailwind()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../', import.meta.url)),
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Tools', link: 'https://yornqiu.github.io/tools/', target: '_self' },
    ],

    sidebar: [
      {
        text: 'Linux',
        items: [
          { text: '基本命令', link: '/linux/basic' },
          { text: '高级命令', link: '/linux/advanced' },
          { text: 'Vim', link: '/linux/vim' },
          { text: '其他', link: '/linux/other' },
        ]
      },
      {
        text: '数据库',
        items: [
          { text: '基础', link: '/db/basic' },
          { text: 'MySQL', link: '/db/mysql' },
          { text: 'PostgreSQL', link: '/db/postgresql' },
          { text: 'MongoDB', link: '/db/mongodb' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: '正则表达式', link: '/regex' },
          { text: 'HTTP 状态码', link: '/http-status-code' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yornqiu/notes' }
    ]
  }
})
