import React from 'react'
import { TrackArtwork } from './TrackArtwork'

export const TrackList = async ({ tracksPromise }) => {
  const { docs: tracks } = await tracksPromise // Await the promise passed as props

  return (
    <div className="flex space-x-4 pb-4">
      {tracks.map((track) => (
        <TrackArtwork key={track.id} track={track} />
      ))}
    </div>
  )
}
