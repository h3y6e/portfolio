import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-21',
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/font.css',
    '~/assets/css/main.css',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
    storageKey: 'theme',
  },
  app: {
    head: {
      title: 'h3y6e.com',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'description', content: 'heyhoe\'s portfolio' },
        { name: 'theme-color', content: '#121212' },
        { name: 'author', content: 'heyhoe' },
        { property: 'og:title', content: 'h3y6e.com' },
        { property: 'og:description', content: 'heyhoe\'s portfolio' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://h3y6e.com' },
        { property: 'og:image', content: 'https://h3y6e.com/logos/logo.png' },
        { property: 'og:locale', content: 'ja_JP' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'h3y6e.com' },
        { name: 'twitter:description', content: 'heyhoe\'s portfolio' },
        { name: 'twitter:image', content: 'https://h3y6e.com/logos/logo.png' },
        { name: 'twitter:creator', content: '@h3y6e' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/logos/logo.png' },
        { rel: 'author', href: '/humans.txt' },
      ],
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/fonts/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  runtimeConfig: {
    public: {
      githubUsername: 'h3y6e',
    },
  },
  typescript: {
    tsConfig: {
      include: [
        '../test/setup/**/*',
        '../scripts/**/*',
      ],
    },
  },
})
