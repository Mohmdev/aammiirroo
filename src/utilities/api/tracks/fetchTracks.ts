import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const fetchTracks = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const results = await payload.find({
    collection: 'tracks',
    overrideAccess: false,
    pagination: false,
    // Query all published tracks
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 1,
    populate: {
      artists: {
        title: true,
      },
    },
    select: {
      title: true,
      slug: true,
      image: true,
      artist: true,
      genres: true,
    },
  })

  return results || { docs: [] } // Ensure fallback
})
