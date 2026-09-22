import { defineLink } from 'unhead'
import { identityLinks, indieweb, sameAsUrls } from '~/data/indieweb'
import { siteMeta } from '~/data/meta'

export default defineNuxtPlugin(() => {
  const meLinkTags = identityLinks()
    .filter(link => !link.link.startsWith('mailto:'))
    .map(link => defineLink({
      rel: link.rel!,
      href: link.link,
    }))

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': siteMeta.author,
    'alternateName': ['heyhoe', 'へいほぅ', 'h3y6e'],
    'url': siteMeta.url,
    'image': indieweb.photo,
    'email': indieweb.email,
    'sameAs': sameAsUrls(),
  }

  useHead({
    meta: [
      { name: 'fediverse:creator', content: indieweb.fediverseCreator },
    ],
    link: [
      { rel: 'webmention', href: indieweb.webmention },
      { rel: 'pingback', href: indieweb.pingback },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: indieweb.blogFeed,
        title: 'Blog',
      },
      {
        rel: 'alternate',
        type: 'text/plain',
        href: '/humans.txt',
        title: 'humans.txt',
      },
      ...meLinkTags,
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(personLd),
      },
    ],
  })
})
