import React from 'react'
import { TrackCard } from './TrackCard'
import type { Track } from '@/payload-types'
import { fetchTracks } from '@/utilities/api/tracks/fetchTracks'

export const TracksList = async () => {
  const { docs: tracks } = await fetchTracks()

  if (!tracks) {
    return null
  }

  return (
    <>
      {tracks.map((track: Track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </>
  )
}
