import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { revalidateArtist } from './hooks/revalidateArtist'
import { populateAuthors } from '../../../hooks/populateAuthors'

export const Artists: CollectionConfig = {
  slug: 'artists',
  labels: {
    singular: 'Artist',
    plural: 'Artists',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Radio',
    useAsTitle: 'title',
    defaultColumns: ['photo', 'title', 'Tracks', 'SoundCloud', 'Beatport'],
  },
  defaultPopulate: {
    title: true,
    slug: true,
    photo: true,
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
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'tabs',
      tabs: [
        // Tracks
        {
          label: 'Tracks',
          fields: [
            {
              name: 'Tracks',
              type: 'join',
              collection: 'tracks',
              on: 'artist',
            },
          ],
        },
        // Details
        {
          label: 'Meta',
          fields: [
            {
              name: 'bio',
              type: 'textarea',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'SoundCloud',
                  label: 'SoundCloud',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'Beatport',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'Spotify',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'Bandcamp',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'YouTube',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'facebook',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'twitter',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'instagram',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'website',
                  type: 'text',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
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
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
    // publishedAt field with auto-populate `beforeChange` hook
    // TODO: Make this a reusable field
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
  ],
  hooks: {
    afterChange: [revalidateArtist],
    afterRead: [populateAuthors],
  },
}
