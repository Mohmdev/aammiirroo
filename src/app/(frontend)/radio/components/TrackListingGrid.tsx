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
      {tracks?.map((track, index) => {
        if (typeof track === 'object' && track !== null) {
          return (
            <div key={index} className="w-max h-max">
              <TrackArtwork
                track={track}
                width={width}
                height={height}
                aspectRatio="square"
                className=""
              />
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
