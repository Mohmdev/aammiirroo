import React from 'react'
import { cn } from '@/utilities/cn'
import { TrackArtwork } from './TrackArtwork'
import type { Track } from '@/payload-types'

interface TrackListingGridProps {
  tracks: Partial<Track>[]
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
  className?: string
}

export function TrackListingGrid({
  tracks,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: TrackListingGridProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <div className="flex space-x-4 pb-4">
        {tracks?.map((track, index) => {
          if (typeof track === 'object' && track !== null) {
            return (
              <div key={index}>
                <TrackArtwork track={track} />
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
