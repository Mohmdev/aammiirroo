import { Payload } from 'payload'
import { fetchImageByURL } from '../fetchFile'
import { artists } from './artists'

export const seedArtists = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding artists...')

  for (const artist of artists) {
    try {
      // Check if artist already exists
      const existingArtist = await payload.find({
        collection: 'artists',
        where: {
          name: {
            equals: artist.name,
          },
        },
      })

      if (existingArtist.docs.length === 0) {
        // 1. Fetch the image file
        const imageBuffer = await fetchImageByURL(artist.photo)
        // const imageBuffer = await fetchLocalImage(artist.photo)

        // 2. Create media document for artist photo
        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            alt: `Photo of ${artist.name}`,
          },
          file: imageBuffer,
        })

        // 3. Create artist with media reference
        await payload.create({
          collection: 'artists',
          data: {
            name: artist.name,
            slug: artist.slug,
            photo: mediaDoc.id, // Reference the media doc ID
            bio: artist.bio,
          },
        })

        payload.logger.info(`Created artist "${artist.name}" with photo`)
      } else {
        payload.logger.info(`Artist "${artist.name}" already exists, skipping...`)
      }
    } catch (error) {
      payload.logger.error(`Error seeding artist "${artist.name}":`, error)
    }
  }

  payload.logger.info('Seeded artists successfully!')
}
