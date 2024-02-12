import {viteBundler} from '@vuepress/bundler-vite';
import theme from "./theme.js";
import {defineUserConfig} from 'vuepress';

export default defineUserConfig({
    base: "/rpg_java/",
    bundler: viteBundler(),
    theme,
    lang: 'es-ES',
    title: 'RPG Java',
    description: 'Juego RPG de acción en 2D con scroll lateral.',
    head: [['link', {rel: 'icon', href: '/images/favicon.ico'}]],
})
