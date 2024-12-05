'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'
import { Media as MediaComponent } from '@/components/Media'
import useClickableCard from '@/utilities/useClickableCard'
import { cn } from '@/utilities/cn'
import type { Media, Track, Genre } from '@/payload-types'

interface TrackCardProps {
  track: Partial<Track> & {
    image?: Media | number | null
    genres?: (Genre | number)[] | null
  }
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const { card, link } = useClickableCard({})

  const { title, slug, image, genres, generalDetails } = track

  const hasGenres = genres && Array.isArray(genres) && genres.length > 0
  const href = `/radio/${slug}`
  const description = generalDetails?.description
  const sanitizedDescription = description?.replace(/\s/g, ' ')

  return (
    <article
      className={cn('border border-border rounded-md overflow-hidden bg-card hover:cursor-pointer')}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!image && <div className="">No image</div>}
        {image && typeof image !== 'number' && <MediaComponent resource={image} size="33vw" />}
      </div>
      <div className="p-4">
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
        {title && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {title}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2">
            <p>{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}

export default TrackCard
