import type { Metadata } from 'next'

// import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
// import RichText from '@/components/RichText'
// import { Media as MediaComponent } from '@/components/Media'

import type { Track } from '@/payload-types'

// import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import TrackCard from '../components/TrackCard'

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

  // const { title, slug, image, genres, generalDetails } = track

  // const hasGenres = genres && Array.isArray(genres) && genres.length > 0
  // const href = `/radio/${slug}`
  // const description = generalDetails?.description
  // const sanitizedDescription = description?.replace(/\s/g, ' ')

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* <PostHero post={post} /> */}

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {/* <RichText className="max-w-[48rem] mx-auto" data={track.content} enableGutter={false} /> */}
          {/* {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )} */}
          <p>This is a track page. And fuck you.</p>
          <TrackCard track={track} />
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
