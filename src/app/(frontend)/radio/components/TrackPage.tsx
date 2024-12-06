'use client'

import React, { Fragment } from 'react'
import { Media as MediaComponent } from '@/components/Media'
import { cn } from '@/utilities/cn'
import type { Media, Track, Genre, Artist } from '@/payload-types'

interface TrackCardProps {
  track: Partial<Track> & {
    image?: Media | number | null
    genres?: (Genre | number)[] | null
    artists?: (Artist | number)[] | null
  }
}

export const TrackPage: React.FC<TrackCardProps> = ({ track }) => {
  const { title, image, genres, generalDetails, properties, artists } = track

  const hasArtists = artists && Array.isArray(artists) && artists.length > 0
  const hasGenres = genres && Array.isArray(genres) && genres.length > 0

  const description = generalDetails?.description
  const recordLabel = generalDetails?.recordLabel
  const releaseDate = generalDetails?.releaseDate

  const duration = properties?.duration
  const bpm = properties?.bpm
  const key = properties?.key

  return (
    <article className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-2">
        <div className="relative">
          {!image && <div className="">No image</div>}
          {image && typeof image !== 'number' && <MediaComponent resource={image} size="33vw" />}
        </div>
        <div className="flex flex-col gap-4 items-start justify-start">
          <div className="flex flex-row flex-wrap gap-3 items-center justify-between">
            {bpm && <p className="prose">{bpm}</p>}
            {key && <p className="prose">{key}</p>}
            {duration && <p className="prose">{duration}</p>}
          </div>
          <div className="flex flex-row flex-wrap gap-3 items-center justify-between">
            {recordLabel && <p className="prose">{recordLabel}</p>}
            {releaseDate && <p className="prose">{releaseDate}</p>}
          </div>
        </div>
      </div>
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
