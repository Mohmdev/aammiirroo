import React from 'react'
import Link from 'next/link'
import { Media as MediaComponent } from '@/components/Media'
import { isArtistObject, isMediaObject } from '../typeGuards'
import { cn } from '@/utilities/cn'

import type { Track } from '@/payload-types'

interface TrackCardProps extends React.HTMLAttributes<HTMLDivElement> {
  track: Track
  className?: string
}

export const TrackCard = ({ track, className, ...props }: TrackCardProps) => {
  const image = track?.image || null
  const title = track?.title || null
  const artistNames =
    track?.artist
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
            fill={true}
            size="33vw"
            className={cn(
              'relative',
              'aspect-9/10',
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
