import { Payload } from 'payload'
import { tracks } from './tracks'
import { fetchImageByURL } from '../fetchFile'

interface TrackProperties {
  id: number
  bpm?: number
  key?:
    | 'C#'
    | 'D'
    | 'F'
    | 'G'
    | 'E'
    | 'A#'
    | 'A'
    | 'D#'
    | 'G#'
    | 'B'
    | 'C'
    | 'F#'
    | null
    | undefined
  duration?: number
  type: 'track' | 'set' | null | undefined
}

export const seedTracks = async (payload: Payload): Promise<void> => {
  for (const track of tracks) {
    try {
      // Check if tracks exist
      const existingTrack = await payload.find({
        collection: 'tracks',
        where: {
          title: {
            equals: track.title,
          },
        },
      })

      if (existingTrack.docs.length === 0) {
        const imageBuffer = await fetchImageByURL(track.image as string)
        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            alt: `Photo of ${track.title}`,
          },
          file: imageBuffer,
        })

        await payload.create({
          collection: 'tracks',
          data: {
            id: track.id,
            title: track.title,
            slug: track.slug,
            type: track.type,
            artist: track.artist,
            genres: track.genres,
            properties: {
              bpm: track.properties?.bpm,
              key: track.properties?.key,
              duration: track.properties?.duration,
            },
            generalDetails: {
              recordLabel: track.generalDetails?.recordLabel,
              releaseDate: track.generalDetails?.releaseDate,
              description: track.generalDetails?.description,
            },
            sourceType: track.sourceType,
            trackLink: track.trackLink,
            image: mediaDoc.id,
          },
        })
      } else {
        payload.logger.info(`"Track ${track.title}" already exists, skipping...`)
      }
    } catch (error) {
      payload.logger.error(`Error seeding track "${track.title}":`, error)
    }
  }
}
