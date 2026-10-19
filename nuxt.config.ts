// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  /* redirect */
  routeRules: {
    '/': {
      redirect: {
        to: '/materials',
        statusCode: 302,
      },
    },
  },

  /* Подключение модулей */
  modules: ['nuxt-svgo-loader', 'nuxt-tiptap-editor', 'nuxt-viewport'],

  viewport: {
    breakpoints: {
      xs: 402,
      s: 760,
      m: 1024,
      l: 1280,
      xl: 1440,
    },

    defaultBreakpoints: {
      desktop: 'm',
      mobile: 'xs',
      tablet: 's',
    },

    fallbackBreakpoint: 'xs',

    feature: 'minWidth',
  },

  /* alias */
  alias: {
    '@styles': fileURLToPath(new URL('./app/assets/styles', import.meta.url)),
  },

  /* Глобальные стили */
  css: [
    '~/assets/styles/tokens.less',
    '~/assets/styles/variables.less',
    '~/assets/styles/fonts.less',
    '~/assets/styles/main.less',
    '~/assets/styles/helpers.less',
    '~/assets/styles/containers.less',
  ],
})
