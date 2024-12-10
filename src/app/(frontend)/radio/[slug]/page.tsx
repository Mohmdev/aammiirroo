import React from 'react'
import PageClient from './page.client'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { generateMeta } from '@/utilities/generateMeta'
import type { Metadata } from 'next'
import type { Track } from '@/payload-types'

import { fetchTrackBySlug } from '@/utilities/api/tracks/fetchTrackBySlug'
import { TrackPage } from '@/modules/Radio/templates/TrackPage'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const tracks = await payload.find({
    collection: 'tracks',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = tracks.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Track({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/radio/' + slug

  const track = await fetchTrackBySlug({ slug })
  if (!track) return <PayloadRedirects url={url} />

  return (
    <div className="container">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <TrackPage track={track} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const track = await fetchTrackBySlug({ slug })

  return generateMeta({ doc: track })
}
