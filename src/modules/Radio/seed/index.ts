import { Payload } from 'payload'
import { seedGenres } from './seedGenres'
import { seedArtists } from './seedArtists'
import { seedTracks } from './seedTracks'

export const seedRadioContent = async (payload: Payload): Promise<void> => {
  try {
    payload.logger.info('↪ Seeding Radio...')

    payload.logger.info('Seeding Artists...')
    await seedArtists(payload)
    payload.logger.info('✔️')

    payload.logger.info('Seeding Genres...')
    await seedGenres(payload)
    payload.logger.info('✔️')

    payload.logger.info('Seeding Tracks...')
    await seedTracks(payload)
    payload.logger.info('✔️')

    payload.logger.info('✔️ Successfully seeded Radio')
  } catch (error) {
    payload.logger.error('❌ Error seeding Radio:')
    payload.logger.error(error)
    throw error
  }
}
