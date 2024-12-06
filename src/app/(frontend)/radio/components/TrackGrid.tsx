import React from 'react'
import type { Track } from '@/payload-types'
import { TrackCard } from './TrackCard'

interface TrackGridProps {
  tracks: Partial<Track>[]
}

export const TrackGrid: React.FC<TrackGridProps> = ({ tracks }) => {
  return (
    <div className="container">
      <div>
        <div className="grid grid-cols-1 gap-y-2">
          {tracks?.map((track, index) => {
            if (typeof track === 'object' && track !== null) {
              return (
                <div className="" key={index}>
                  <TrackCard track={track} />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
