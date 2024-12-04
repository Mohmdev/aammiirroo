import { Payload } from 'payload'
import { genres } from './genres'

export const seedGenres = async (payload: Payload): Promise<void> => {
  for (const genre of genres) {
    try {
      // Check if genre already exists
      const existingGenre = await payload.find({
        collection: 'genres',
        where: {
          title: {
            equals: genre.title,
          },
        },
      })

      if (existingGenre.docs.length === 0) {
        await payload.create({
          collection: 'genres',
          data: {
            id: genre.id,
            title: genre.title,
            slug: genre.slug,
            description: genre.description,
          },
        })
      } else {
        payload.logger.info(`"Genre ${genre.title}" already exists, skipping...`)
      }
    } catch (error) {
      payload.logger.error(`Error seeding genre "${genre.title}":`, error)
    }
  }
}
