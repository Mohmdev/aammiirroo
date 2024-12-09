import React from 'react'
import Link from 'next/link'
import { Media as MediaComponent } from '@/components/Media'
import { ContextMenuRadio } from './ContextMenuRadio'
import { Music2Icon } from 'lucide-react'
import { cn } from '@/utilities/cn'

import { isArtistObject, isMediaObject } from '../typeGuards'
import type { Track } from '@/payload-types'

interface TrackCardProps extends React.HTMLAttributes<HTMLDivElement> {
  track: Track
  className?: string
  aspectRatio?: 'portrait' | 'square'
}

export const TrackCard = ({
  track,
  className,
  aspectRatio = 'portrait',
  ...props
}: TrackCardProps) => {
  const image = track?.image || null
  const title = track?.title || null
  const artistNames =
    track?.artist
      ?.map((artist) => (isArtistObject(artist) ? artist.title : ''))
      .filter(Boolean)
      .join(', ') || null

  const slug = track?.slug || null
  const href = `/radio/${slug}`

  const aspectRatios = {
    portrait: 'aspect-9/10',
    square: 'aspect-square',
  }
  const selectedAspect = aspectRatios[aspectRatio]

  return (
    <div className={cn('w-[250px] space-y-3 select-none', className)} {...props}>
      {/* Image */}
      <div className="overflow-hidden rounded-md">
        <ContextMenuRadio>
          <Link href={href}>
            {!image && (
              <div
                className={cn(
                  selectedAspect,
                  'flex items-center justify-center text-muted-foreground bg-muted',
                )}
              >
                <Music2Icon />
              </div>
            )}
            {isMediaObject(image) && (
              <MediaComponent
                resource={image}
                fill={true}
                size="33vw"
                className={cn(
                  'relative',
                  selectedAspect,
                  'h-auto w-auto object-cover',
                  'transition-transform hover:scale-105',
                )}
              />
            )}
          </Link>
        </ContextMenuRadio>
      </div>
      {/* Info */}
      <div className="space-y-1 text-sm">
        <h4 className="font-medium leading-none">
          <Link href={href}>
            {!title && 'Unknown Track'}
            {title && title}
          </Link>
        </h4>
        <p className="text-xs text-muted-foreground">
          {!artistNames && 'Unknown Artist'}
          {artistNames && artistNames}
        </p>
      </div>
    </div>
  )
}
