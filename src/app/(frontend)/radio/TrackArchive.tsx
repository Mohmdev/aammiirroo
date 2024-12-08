import React, { Suspense } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/new-york/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/new-york/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/new-york/button'

import { PlusCircle } from 'lucide-react'
import { TrackList } from './TrackList'
import { TrackArtworkSkeleton } from './TrackArtwork'

export const TrackArchive = async ({ tracksPromise }) => {
  return (
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
      {/* --------------------------------- Content -------------------------------- */}
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
            <div className="flex space-x-4 pb-4">
              <Suspense
                fallback={
                  <div className="flex space-x-4 pb-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <TrackArtworkSkeleton key={i} />
                    ))}
                  </div>
                }
              >
                <TrackList tracksPromise={tracksPromise} />
              </Suspense>
            </div>
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
            <div className="flex space-x-4 pb-4">
              <TrackList tracksPromise={tracksPromise} />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </TabsContent>
    </Tabs>
  )
}