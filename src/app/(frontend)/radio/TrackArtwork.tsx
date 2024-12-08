import React from 'react'
import { cn } from '@/utilities/cn'
import { Media as MediaComponent } from '@/components/Media'

import type { Artist, Genre, Media, Track } from '@/payload-types'
import { isArtistObject, isMediaObject } from './helpers/typeguards'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

interface TrackArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  track: Partial<Track> & {
    title?: string
    slug?: string
    image?: (number | null) | Media
    artists?: (number | Artist)[] | null
    genres?: (number | Genre)[] | null
  }
  className?: string
  // aspectRatio?: 'portrait' | 'square'
  // width?: number
  // height?: number
}

export const TrackArtwork = ({
  track,
  className,
  ...props
  // aspectRatio = 'portrait',
  // width,
  // height,
}: TrackArtworkProps) => {
  const image = track?.image || null
  const title = track?.title || null
  const artistNames =
    track?.artists
      ?.map((artist) => (isArtistObject(artist) ? artist.title : ''))
      .filter(Boolean)
      .join(', ') || null

  const slug = track?.slug || null
  const href = `/radio/${slug}`

  return (
    <div className={cn('w-[250px] space-y-3', className)} {...props}>
      {/* Image */}
      <div className="overflow-hidden rounded-md">
        {!image && <div className="bg-gray-100 dark:bg-gray-800">No Artwork</div>}
        {isMediaObject(image) && (
          <MediaComponent
            resource={image}
            width={250}
            height={330}
            className={cn(
              'aspect-3/4', // portrait
              'h-auto w-auto object-cover',
              'transition-all hover:scale-105',
            )}
          />
        )}
      </div>
      {/* Info */}
      <div className="space-y-1 text-sm">
        <h4 className="font-medium leading-none">
          {!title && <Link href={href}>Unknown Track</Link>}
          {title && <Link href={href}>{title}</Link>}
        </h4>
        <p className="text-xs text-muted-foreground">
          {!artistNames && 'Unknown Artist'}
          {artistNames && artistNames}
        </p>
      </div>
    </div>
  )
}

export const TrackArtworkSkeleton = () => (
  <div className="w-[250px] space-y-3">
    <div className="overflow-hidden rounded-md">
      <Skeleton className="aspect-3/4 w-[250px]" />
    </div>
    <div className="space-y-1">
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-[100px]" />
    </div>
  </div>
)
