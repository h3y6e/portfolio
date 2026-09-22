export default defineNuxtPlugin((nuxtApp) => {
  const enable = () => {
    document.documentElement.dataset.smoothScroll = ''
  }

  requestAnimationFrame(enable)
  nuxtApp.hook('app:mounted', enable)
})
