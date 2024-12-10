'use client'

import React, { Fragment } from 'react'
import { Media as MediaComponent } from '@/components/Media'
import type { Track } from '@/payload-types'
import { isMediaObject } from '../typeGuards'
import { cn } from '@/utilities/cn'
import { Music2Icon } from 'lucide-react'
import { formatDuration } from '@/utilities/formatDuration'

interface Props {
  track: Track
}

export const TrackPage: React.FC<Props> = ({ track }) => {
  const { title, image, genres, generalDetails, properties, artist: artists } = track

  const { description, recordLabel, releaseDate } = generalDetails || {}
  const { duration, bpm, key } = properties || {}

  const formattedDuration = duration ? formatDuration(duration) : '00:00'

  const hasArtists = artists && Array.isArray(artists) && artists.length > 0
  const hasGenres = genres && Array.isArray(genres) && genres.length > 0

  return (
    <article className="flex flex-col gap-6 w-full">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="overflow-hidden rounded-md">
          {!image && (
            <div className={cn('flex items-center justify-center text-muted-foreground bg-muted')}>
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
                'aspect-square',
                'h-auto w-auto object-cover',
                'transition-transform hover:scale-105',
              )}
            />
          )}
        </div>
        <div className="flex flex-col py-4 px-3 gap-4 items-start justify-start">
          <div className="flex flex-row flex-wrap gap-3 items-center justify-between">
            {bpm && <p className="prose">{bpm}</p>}
            {key && <p className="prose">{key}</p>}
          </div>
          <div className="flex flex-col gap-4 items-start justify-start">
            <p className="prose">{formattedDuration}</p>
          </div>
          <div className="flex flex-row flex-wrap gap-3 items-center justify-between">
            {recordLabel && <p className="prose">{recordLabel}</p>}
            {releaseDate && <p className="prose">{releaseDate}</p>}
          </div>
        </div>
      </div>
      {/* Row 2 */}
      <div>
        {title && (
          <div className="prose">
            <h3>{title}</h3>
          </div>
        )}
        {hasArtists && (
          <div className="uppercase text-sm mb-4">
            {artists.map((artist, index) => {
              if (typeof artist === 'object' && artist !== null) {
                const artistTitle = artist.title || 'Untitled artist'
                const isLast = index === artists.length - 1

                return (
                  <Fragment key={index}>
                    {artistTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        )}
        {hasGenres && (
          <div className="uppercase text-sm mb-4">
            {genres.map((genre, index) => {
              if (typeof genre === 'object' && genre !== null) {
                const genreTitle = genre.title || 'Untitled genre'
                const isLast = index === genres.length - 1

                return (
                  <Fragment key={index}>
                    {genreTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        )}
        {description && (
          <div className="mt-2">
            <p>{description}</p>
          </div>
        )}
      </div>
    </article>
  )
}
