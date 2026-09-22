import { defineVitestProject } from '@nuxt/test-utils/config'
import { playwright } from '@vitest/browser-playwright'
import { defaultExclude, defineConfig } from 'vitest/config'

const browserPattern = '**/*.browser.test.ts'

const browserProject = await defineVitestProject({
  test: {
    name: 'browser',
    include: [browserPattern],
    setupFiles: ['./test/setup/browser.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        {
          browser: 'chromium',
          viewport: { width: 1280, height: 720 },
        },
      ],
    },
  },
})

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: [
            'app/**/*.test.ts',
            'shared/**/*.test.ts',
            'scripts/**/*.test.ts',
          ],
          exclude: [browserPattern, ...defaultExclude],
          environment: 'node',
        },
      },
      {
        ...browserProject,
        optimizeDeps: {
          ...browserProject.optimizeDeps,
          holdUntilCrawlEnd: true,
          include: [
            ...new Set([
              ...(browserProject.optimizeDeps?.include ?? []),
              'vitest',
              'vitest/browser',
              'vitest/internal/browser',
              'vitest/internal/traces',
              '@vitest/browser/client',
              'vitest-browser-vue',
              '@vue/test-utils',
              '@vueuse/core',
            ]),
          ],
        },
      },
    ],
  },
})
