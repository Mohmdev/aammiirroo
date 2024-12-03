import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Audio: CollectionConfig = {
  slug: 'audio',
  admin: {
    group: 'Uploads',
    description: 'Upload and manage audio files',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'artist',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      type: 'text', // TODO: Will be populated via hook
      admin: {
        readOnly: true,
        width: '40%',
      },
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: [
      'audio/mpeg', // .mp3
      'audio/wav', // .wav
      'audio/aac', // .aac
      'audio/ogg', // .ogg
      'audio/flac', // .flac
    ],
  },
  hooks: {
    beforeChange: [
      // TODO
      // Here we could add hook to extract audio metadata
      // like duration, actual BPM, etc using a library like music-metadata
    ],
  },
}
