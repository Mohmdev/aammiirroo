'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'
import { Media as MediaComponent } from '@/components/Media'
import useClickableCard from '@/utilities/useClickableCard'
import { cn } from '@/utilities/cn'
import type { Media, Track, Genre, Artist } from '@/payload-types'

interface TrackCardProps {
  track: Partial<Track> & {
    image?: Media | number | null
    genres?: (Genre | number)[] | null
    artists?: (Artist | number)[] | null
  }
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const { card, link } = useClickableCard({})

  const { title, slug, image, genres, artists, properties } = track

  const href = `/radio/${slug}`

  const hasGenres = genres && Array.isArray(genres) && genres.length > 0

  const hasArtists = artists && Array.isArray(artists) && artists.length > 0

  const duration = properties?.duration
  const bpm = properties?.bpm

  return (
    <article
      className={cn(
        'h-9 w-full',
        'border border-border rounded-lg',
        'overflow-hidden bg-card hover:cursor-pointer',
      )}
      ref={card.ref}
    >
      <div className="flex flex-row justify-between items-center gap-4 w-full h-full">
        {/* Track Image */}
        <div className="relative h-full aspect-square">
          {!image && <div className="">No image</div>}
          {image && typeof image !== 'number' && <MediaComponent resource={image} size="33vw" />}
        </div>
        {/* Track Artist + Title */}
        <div className="flex flex-row items-center justify-between gap-1">
          <span></span>
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
          <span>-</span>
          {/*  */}
          <span>
            {title && (
              <div className="prose">
                <h3>
                  <Link className="not-prose" href={href} ref={link.ref}>
                    {title}
                  </Link>
                </h3>
              </div>
            )}
          </span>
        </div>
        <div className="flex flex-row flex-wrap gap-3 items-center justify-between">
          {bpm && <p className="prose">{bpm}</p>}
          {duration && <p className="prose">{duration}</p>}
        </div>
        {/* Genres */}
        {hasGenres && (
          <div className="uppercase text-sm mb-4 max-w-1/3">
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
      </div>
    </article>
  )
}
