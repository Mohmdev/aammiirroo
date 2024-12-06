import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getRadioSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'tracks',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((track) => Boolean(track?.slug))
          .map((track) => ({
            loc: `${SITE_URL}/radio/${track?.slug}`,
            lastmod: track.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['radio-sitemap'],
  {
    tags: ['radio-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getRadioSitemap()

  return getServerSideSitemap(sitemap)
}
