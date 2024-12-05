import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Genre } from '@/payload-types'

export const revalidateGenre: CollectionAfterChangeHook<Genre> = ({ doc, req: { payload } }) => {
  const path = `/radio/genres/${doc.slug}`

  payload.logger.info(`Revalidating genre at path: ${path}`)
  revalidatePath(path)

  return doc
}
