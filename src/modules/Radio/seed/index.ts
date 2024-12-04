import { Payload } from 'payload'
import { seedGenres } from './seedGenres'
import { seedArtists } from './seedArtists'

export const seedRadioContent = async (payload: Payload): Promise<void> => {
  try {
    payload.logger.info('Starting Radio content seed...')

    // Execute seeds
    payload.logger.info('Seeding Genres...')
    await seedGenres(payload)
    payload.logger.info('Genres seeded successfully!')

    payload.logger.info('Seeding Artists...')
    await seedArtists(payload)
    payload.logger.info('Artists seeded successfully!')

    payload.logger.info('Radio content seed completed successfully!')
  } catch (error) {
    payload.logger.error('Error seeding Radio content:')
    payload.logger.error(error)
    throw error
  }
}
