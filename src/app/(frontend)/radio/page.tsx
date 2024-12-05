import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageClient from './page.client'
import { Pagination } from '@/components/Pagination'

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
      bpm: true,
      sourceType: true,
    },
  })

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
        {/* <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        /> */}
      </div>

      {/* <CollectionArchive posts={posts.docs} /> */}

      <div className="container">
        {tracks.totalPages > 1 && tracks.page && (
          <Pagination page={tracks.page} totalPages={tracks.totalPages} />
        )}
      </div>
      {/*  */}
    </div>
  )
}
