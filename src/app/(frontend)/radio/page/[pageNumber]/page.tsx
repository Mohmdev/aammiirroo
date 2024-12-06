import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { TrackGrid } from '../../components/TrackGrid'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const tracks = await payload.find({
    collection: 'tracks',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false /* not needed here. */,
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

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Radio</h1>
        </div>
      </div>
      <h4>Radio page content</h4>
      <div className="container mb-8">
        <PageRange
          collection="tracks"
          currentPage={tracks.page}
          limit={12}
          totalDocs={tracks.totalDocs}
        />
      </div>

      <TrackGrid tracks={tracks.docs} />

      <div className="container">
        {tracks?.page && tracks?.totalPages > 1 && (
          <Pagination page={tracks.page} totalPages={tracks.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Radio Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'tracks',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
