'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'
import { Media as MediaComponent } from '@/components/Media'
import useClickableCard from '@/utilities/useClickableCard'
import { cn } from '@/utilities/cn'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/new-york/context-menu'
import { PlusCircle } from 'lucide-react'

import type { Media, Track, Genre, Artist } from '@/payload-types'

const playlists = [
  'Recently Added',
  'Recently Played',
  'Top Songs',
  'Top Albums',
  'Top Artists',
  'Logic Discography',
  'Bedtime Beats',
  'Feeling Happy',
  'I miss Y2K Pop',
  'Runtober',
  'Mellow Days',
  'Eminem Essentials',
]

interface TrackArtworkProps {
  track: Partial<Track> & {
    image?: Media | number | null
    genres?: (Genre | number)[] | null
    artists?: (Artist | number)[] | null
  }
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
  className?: string
}

export const TrackArtwork = ({
  track,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: TrackArtworkProps) => {
  const { card, link } = useClickableCard({})

  const {
    title,
    slug,
    image,
    artists,
    //  genres,
    // properties
  } = track

  const href = `/radio/${slug}`
  const hasArtists = artists && Array.isArray(artists) && artists.length > 0
  // const hasGenres = genres && Array.isArray(genres) && genres.length > 0
  // const duration = properties?.duration
  // const bpm = properties?.bpm

  return (
    <article ref={card.ref} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link href={href} ref={link.ref} className="overflow-hidden rounded-md">
            {!image && <div>No Artwork</div>}
            {image && typeof image !== 'number' && (
              <MediaComponent
                resource={image}
                // size="33vw"
                width={width}
                height={height}
                className={cn(
                  'h-auto w-auto object-cover transition-all hover:scale-105',
                  aspectRatio === 'portrait' ? 'aspect-3/4' : 'aspect-square',
                )}
              />
            )}
          </Link>
          <Link href={href} ref={link.ref} className="not-prose space-y-1 text-sm">
            {title && <h3 className="prose font-normal leading-none">{title}</h3>}
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        {hasArtists && (
          <p className="prose text-xs text-muted-foreground">
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
        {/* {hasGenres && (
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
        )} */}
      </div>
    </article>
  )
}
