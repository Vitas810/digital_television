// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  /* Подключение модулей */
  modules: ['nuxt-svgo-loader'],

  /* alias */
  alias: {
    '@styles': fileURLToPath(new URL('./app/assets/styles', import.meta.url)),
  },

  /* Глобальные стили */
  css: [
    '~/assets/styles/variables.less',
    '~/assets/styles/fonts.less',
    '~/assets/styles/main.less',
    '~/assets/styles/helpers.less',
    '~/assets/styles/containers.less',
  ],
})
