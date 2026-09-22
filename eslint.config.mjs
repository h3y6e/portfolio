import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  unocss: true,
  formatters: true,
  ignores: [
    'aube-lock.yaml',
    '**/aube-lock.yaml',
  ],
})
