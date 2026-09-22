export function withViewTransition(run: () => void): void {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => void
  }
  if (doc.startViewTransition)
    doc.startViewTransition(run)
  else
    run()
}
