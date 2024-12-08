import React from 'react'
import { TrackArtwork } from './TrackArtwork'
import type { Track } from '@/payload-types'

export const TrackList = async ({ tracksPromise }) => {
  const { docs: tracks } = await tracksPromise // Await the promise passed as props

  if (!tracks) {
    return null
  }

  return (
    <div className="flex space-x-4 pb-4">
      {tracks.map((track: Track) => (
        <TrackArtwork key={track.id} track={track} />
      ))}
    </div>
  )
}
