// Dont delete this. This can be a starting point of a basic grid archive.

'use client'

import React, { Fragment } from 'react'
import { cn } from '@/utilities/cn'

import type { Track } from '@/payload-types'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import { Media as MediaComponent } from '@/components/Media'
import classes from './TracksGridArchive.module.scss'

interface TracksGridArchiveProps {
  tracks: Partial<Track>[]
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
  className?: string
}

export function TracksGridArchive({
  tracks,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: TracksGridArchiveProps) {
  const { card, link } = useClickableCard({})

  return (
    <div {...props} className={classes.archiveContainer}>
      <div className={classes.trackGrid}>
        {tracks?.map((track, index) => {
          if (typeof track === 'object' && track !== null) {
            const { title, slug, image, artist: artists, genres } = track

            const href = `/radio/${slug}`
            const hasArtists = artists && Array.isArray(artists) && artists.length > 0
            const hasGenres = genres && Array.isArray(genres) && genres.length > 0

            return (
              <article
                key={index}
                ref={card.ref}
                className={cn(classes.trackCard, classes.stacked)}
              >
                {/*  */}
                <Link
                  href={href}
                  ref={link.ref}
                  // How to add 2 or more classes
                  className={classes.trackCard__imgWrapper}
                >
                  {!image && <div>No Artwork</div>}
                  {image && typeof image !== 'number' && (
                    <MediaComponent
                      resource={image}
                      objectFit="cover"
                      className={cn('flex w-full h-full transition-all hover:scale-105')}
                    />
                  )}
                </Link>
                <div className={classes.trackCard__content}>
                  <Link
                    href={href}
                    ref={link.ref}
                    className={cn('not-prose text-sm', classes.trackCard__content__title)}
                  >
                    {title && <h3 className="prose font-normal leading-none">{title}</h3>}
                  </Link>
                  {/*  */}

                  {hasArtists && (
                    <p
                      className={cn(
                        'prose text-xs text-muted-foreground',
                        classes.trackCard__content__artist,
                      )}
                    >
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
                    </p>
                  )}
                  {/* Genres */}
                  {hasGenres && (
                    <div className={cn('text-sm', classes.trackCard__content__genre)}>
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
          return null
        })}
      </div>
    </div>
  )
}
