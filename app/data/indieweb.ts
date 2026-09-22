import { links } from './links'
import { siteMeta } from './meta'

export const indieweb = {
  webmention: 'https://webmention.io/h3y6e.com/webmention',
  pingback: 'https://webmention.io/h3y6e.com/xmlrpc',
  blogFeed: 'https://blog.h3y6e.com/feed',
  fediverseCreator: '@h3y6e@fedibird.com',
  photo: `${siteMeta.url}/logos/logo.png`,
  email: 'mailto:while.soaks0d@icloud.com',
} as const

export function identityLinks() {
  return links.filter(link =>
    link.rel?.split(/\s+/).includes('me'),
  )
}

export function sameAsUrls() {
  return identityLinks()
    .map(link => link.link)
    .filter(href => !href.startsWith('mailto:'))
}
