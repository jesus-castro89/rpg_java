import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  base: "/rpg_java/",
  bundler: viteBundler(),
  theme: defaultTheme(),
})
