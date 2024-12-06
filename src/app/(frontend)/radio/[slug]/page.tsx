import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Track } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { TrackPage } from '../components/TrackPage'

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
  const track = await queryTrackBySlug({ slug })

  if (!track) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* <PostHero post={post} /> */}

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <p>This is a track page. And fuck you.</p>
          <TrackPage track={track} />
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const track = await queryTrackBySlug({ slug })

  return generateMeta({ doc: track })
}

const queryTrackBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'tracks',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
