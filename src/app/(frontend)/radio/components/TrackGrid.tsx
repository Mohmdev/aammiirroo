import React from 'react'
import type { Track } from '@/payload-types'
import TrackCard from './TrackCard'

interface TrackGridProps {
  tracks: Partial<Track>[]
}

export const TrackGrid: React.FC<TrackGridProps> = ({ tracks }) => {
  return (
    <div className="container">
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {tracks?.map((track, index) => {
            if (typeof track === 'object' && track !== null) {
              return (
                <div className="col-span-4" key={index}>
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

export default TrackGrid
