import React, { Fragment } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import PageClient from './page.client'
import TrackCard from './TrackCard'

import { Pagination } from '@/components/Pagination'
import { PageRange } from '@/components/PageRange'
// import useClickableCard from '@/utilities/useClickableCard'
// import { cn } from '@/utilities/cn'
// import { Media } from '@/components/Media'
// import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const tracks = await payload.find({
    collection: 'tracks',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      image: true,
      slug: true,
      type: true,
      sourceType: true,
      genres: true,
      artists: true,
      properties: {
        bpm: true,
        duration: true,
      },
      generalDetails: {
        description: true,
        releaseDate: true,
        recordLabel: true,
      },
    },
  })

  // Card
  // const { card, link } = useClickableCard({})
  //
  // Data
  // Get genres from the first track or set to empty array
  // const genres = tracks.docs[0]?.genres || []
  // const hasGenres = genres && Array.isArray(genres) && genres.length > 0

  // const trackTitle = tracks.docs[0]?.title || ''

  // const trackSlug = tracks.docs[0]?.slug || ''
  // const href = `/radio/${trackSlug}`
  // //
  // const trackDescription = tracks.docs[0]?.generalDetails?.description || ''
  // const sanitizedDescription = trackDescription?.replace(/\s/g, ' ') // replace non-breaking space with white space

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      {/*  */}
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Radio</h1>
        </div>
      </div>
      {/*  */}
      <h4>Radio page content</h4>
      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={tracks.page}
          limit={12}
          totalDocs={tracks.totalDocs}
        />
      </div>

      {/* Tracks Archive */}

      {/* <CollectionArchive posts={tracks.docs} /> */}
      <div className="container">
        <div>
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
            {tracks.docs?.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <div className="col-span-4" key={index}>
                    {/* Error on `track` */}
                    <TrackCard track={result} />
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>

      {/*  */}
      <div className="container">
        {tracks.totalPages > 1 && tracks.page && (
          <Pagination page={tracks.page} totalPages={tracks.totalPages} />
        )}
      </div>
      {/*  */}
    </div>
  )
}
