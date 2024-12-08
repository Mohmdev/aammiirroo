import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageClient from './page.client'
import type { Metadata } from 'next/types'

// components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/new-york/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/new-york/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/new-york/button'
import { PlusCircle } from 'lucide-react'
import { TracksGridArchive } from './components/TracksGridArchive'
//

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const tracks = await queryTracks()

  return (
    <div className="container h-full">
      <PageClient />
      <Tabs defaultValue="track" className="h-full space-y-6">
        {/* Tabs list */}
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="track" className="relative">
              Track
            </TabsTrigger>
            <TabsTrigger value="Set">Set</TabsTrigger>
            <TabsTrigger value="live" disabled>
              Live (coming soon)
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto mr-4">
            <Button>
              <PlusCircle />
              Add music
            </Button>
          </div>
        </div>
        {/* Content */}
        <TabsContent value="track" className="border-none p-0 outline-hidden">
          {/* Row 1 - Normal listing */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Listen Now</h2>
              <p className="text-sm text-muted-foreground">Top picks for you. Updated daily.</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <TracksGridArchive tracks={tracks.docs} className="" />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          {/* Row 2  */}
          <div className="mt-6 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
            <p className="text-sm text-muted-foreground">Your personal playlists. Updated daily.</p>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <TracksGridArchive tracks={tracks.docs} className="" />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    // <div className="py-16">
    //   <PageClient />

    //   <div className="container mb-8 flex flex-row flex-wrap gap-4 items-center justify-between">
    //     <div className="prose dark:prose-invert max-w-none">
    //       <h1>Radio</h1>
    //     </div>
    //     <PageRange
    //       collection="tracks"
    //       currentPage={tracks.page}
    //       limit={12}
    //       totalDocs={tracks.totalDocs}
    //     />
    //   </div>

    //   <TrackGrid tracks={tracks.docs} />

    //   <div className="container">
    //     {tracks.totalPages > 1 && tracks.page && (
    //       <Pagination page={tracks.page} totalPages={tracks.totalPages} />
    //     )}
    //   </div>
    // </div>
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
      artist: true,
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
