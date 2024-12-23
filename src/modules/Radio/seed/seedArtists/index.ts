import { Payload } from 'payload'
import { fetchImageByURL } from '../fetchFile'
import { artists } from './artists'

export const seedArtists = async (payload: Payload): Promise<void> => {
  for (const artist of artists) {
    try {
      // Check if artist already exists
      const existingArtist = await payload.find({
        collection: 'artists',
        where: {
          title: {
            equals: artist.title,
          },
        },
      })

      if (existingArtist.docs.length === 0) {
        // 1. Fetch the image file
        const imageBuffer = await fetchImageByURL(artist.image)
        // const imageBuffer = await fetchLocalImage(artist.image)

        // 2. Create media document for artist image
        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            alt: `Photo of ${artist.title}`,
          },
          file: imageBuffer,
        })

        // 3. Create artist with media reference
        await payload.create({
          collection: 'artists',
          data: {
            _status: 'published',
            id: artist.id,
            title: artist.title,
            slug: artist.slug,
            image: mediaDoc.id, // Reference the media doc ID
            bio: artist.bio,
          },
        })

        // payload.logger.info(`Created artist "${artist.title}" with image`)
      } else {
        payload.logger.info(`"Artist ${artist.title}" already exists, skipping...`)
      }
    } catch (error) {
      payload.logger.error(`Error seeding artist "${artist.title}":`, error)
    }
  }
}
