import { Payload } from 'payload'
import { tracks } from './tracks'

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
        await payload.create({
          collection: 'tracks',
          data: {
            id: track.id,
            title: track.title as string,
            slug: track.slug as string,
            type: track.type,
            artist: track.artist as number[],
            genres: track.genres as number[],
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
            image: (track.image as number) || null,
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
