import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const AudioFiles: CollectionConfig = {
  slug: 'audio-files',
  admin: {
    group: 'Cloud Storage',
    useAsTitle: 'title',
    description: 'Upload and manage audio files',
    defaultColumns: ['title', 'artist', 'duration', 'updatedAt'],
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
      },
    },
    {
      label: 'BPM',
      name: 'bpm',
      type: 'number',
      min: 0,
      max: 250,
    },
    {
      name: 'key',
      type: 'select',
      options: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'releaseDate',
      type: 'date',
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/audio'),
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
