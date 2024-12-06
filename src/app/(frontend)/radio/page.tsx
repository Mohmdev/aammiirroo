import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageClient from './page.client'
import { TrackGrid } from './components/TrackGrid'
import { Pagination } from '@/components/Pagination'
import { PageRange } from '@/components/PageRange'
import type { Metadata } from 'next/types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const tracks = await queryTracks()

  return (
    <div className="py-16">
      <PageClient />

      <div className="container mb-8 flex flex-row flex-wrap gap-4 items-center justify-between">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Radio</h1>
        </div>
        <PageRange
          collection="tracks"
          currentPage={tracks.page}
          limit={12}
          totalDocs={tracks.totalDocs}
        />
      </div>

      <TrackGrid tracks={tracks.docs} />

      <div className="container">
        {tracks.totalPages > 1 && tracks.page && (
          <Pagination page={tracks.page} totalPages={tracks.totalPages} />
        )}
      </div>
    </div>
  )
}

const queryTracks = cache(async () => {
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
    // Populate only the fields listed below
    select: {
      title: true,
      slug: true,
      image: true,
      genres: true,
    },
  })

  return results || null
})

export function generateMetadata(): Metadata {
  return {
    title: `Radio`,
  }
}
