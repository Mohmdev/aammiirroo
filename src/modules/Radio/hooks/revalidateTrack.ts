import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Track } from '@/payload-types'

export const revalidateTrack: CollectionAfterChangeHook<Track> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/radio/${doc.slug}`

      payload.logger.info(`Revalidating track at path: ${path}`)

      revalidatePath(path)
      revalidateTag('radio-sitemap')
    }

    // If the track was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/radio/${previousDoc.slug}`

      payload.logger.info(`Revalidating old track at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('radio-sitemap')
    }
  }
  return doc
}

export const revalidateTrackDelete: CollectionAfterDeleteHook<Track> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/radio/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('radio-sitemap')
  }

  return doc
}
