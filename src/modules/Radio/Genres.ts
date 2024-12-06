import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { revalidateGenre } from './hooks/revalidateGenre'
import { anyone } from '@/access/anyone'

export const Genres: CollectionConfig<'genres'> = {
  slug: 'genres',
  labels: {
    singular: 'Genre',
    plural: 'Genres',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Radio',
    useAsTitle: 'title',
    defaultColumns: ['title', 'image', 'Artists', 'Tracks', 'description', 'slug'],
  },
  defaultPopulate: {
    title: true,
    slug: true,
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
        {
          label: 'Tracks',
          fields: [
            {
              name: 'tracks',
              label: {
                singular: 'Track',
                plural: 'Tracks',
              },
              type: 'join',
              collection: 'tracks',
              on: 'genres',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Artists',
          fields: [
            {
              name: 'artists',
              label: {
                singular: 'Artist',
                plural: 'Artists',
              },
              type: 'join',
              collection: 'artists',
              on: 'genres',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'description',
              type: 'textarea',
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
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateGenre],
  },
}
