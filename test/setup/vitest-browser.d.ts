export {}

declare module '@vitest/browser/context' {
  interface BrowserPage {
    [key: symbol]: unknown
  }
}
