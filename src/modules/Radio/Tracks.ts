import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populateAuthors } from '@/hooks/populateAuthors'
import type { CollectionConfig } from 'payload'
import { revalidateTrack, revalidateTrackDelete } from './hooks/revalidateTrack'

export const Tracks: CollectionConfig<'tracks'> = {
  slug: 'tracks',
  labels: {
    singular: 'Track',
    plural: 'Tracks',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Radio',
    defaultColumns: ['image', 'title', 'artist', 'genres', 'recordLabel', 'bpm', 'key', 'duration'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    slug: true,
    title: true,
    type: true,
    artist: true,
    genres: true,
    image: true,
    generalDetails: {
      recordLabel: true,
      releaseDate: true,
      description: true,
    },
    properties: {
      bpm: true,
      key: true,
      duration: true,
    },
  },
  hooks: {
    afterChange: [revalidateTrack],
    afterRead: [populateAuthors],
    afterDelete: [revalidateTrackDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'tabs',
      tabs: [
        // Metadata
        {
          label: 'Metadata',
          fields: [
            // Row 1
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  defaultValue: 'track',
                  options: [
                    { label: 'Track', value: 'track' },
                    { label: 'Set', value: 'set' },
                  ],
                  admin: {
                    width: '20%',
                  },
                },
                {
                  name: 'artist',
                  label: {
                    singular: 'Artist',
                    plural: 'Artists',
                  },
                  type: 'relationship',
                  relationTo: 'artists',
                  hasMany: true,
                  admin: {
                    width: '40%',
                  },
                },
                {
                  name: 'genres',
                  label: {
                    singular: 'Genre',
                    plural: 'Genres',
                  },
                  type: 'relationship',
                  relationTo: 'genres',
                  hasMany: true,
                  admin: {
                    width: '40%',
                  },
                },
              ],
            },
            // Row 2
            {
              type: 'row',
              fields: [
                // Column 1 70%
                {
                  type: 'group',
                  name: 'generalDetails',
                  admin: {
                    width: '70%',
                  },
                  fields: [
                    {
                      name: 'recordLabel',
                      type: 'text',
                    },
                    {
                      name: 'releaseDate',
                      type: 'date',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                    },
                  ],
                },
                // Column 2 30%
                {
                  type: 'group',
                  name: 'properties',
                  admin: {
                    width: '30%',
                  },
                  fields: [
                    {
                      name: 'bpm',
                      type: 'number',
                      label: 'BPM',
                      min: 0,
                      max: 200,
                    },
                    {
                      name: 'key',
                      type: 'select',
                      options: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
                    },
                    {
                      name: 'duration',
                      type: 'number', // Could also use 'text' if formatting as 'mm:ss'
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Source
        {
          label: 'Source',
          fields: [
            {
              name: 'sourceType',
              type: 'select',
              options: [
                { label: 'Internal Upload (S3)', value: 'internal' },
                { label: 'SoundCloud', value: 'soundcloud' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Spotify', value: 'spotify' },
                { label: 'Beatport', value: 'beatport' },
                { label: 'Bandcamp', value: 'bandcamp' },
              ],
            },
            // Conditional Fields Based on Source Type
            {
              name: 'internalUpload',
              type: 'upload',
              relationTo: 'audio',
              admin: {
                condition: (data) => data.sourceType === 'internal',
              },
            },
            {
              name: 'trackLink',
              type: 'text',
              admin: {
                condition: (data) => data.sourceType !== 'internal',
              },
            },
            {
              name: 'embedTrack',
              type: 'text',
              admin: {
                condition: (data) => data.sourceType !== 'internal',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          hidden: true,
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
}
